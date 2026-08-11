#!/usr/bin/env node
/*
 * IBSheet7 초기화 코드를 **실행해서** 설정 구조를 뽑아낸다.
 *
 * 왜 실행하는가
 *   v7 초기화는 결국 데이터(객체)다. 정규식으로 읽으면 줄바꿈·주석·조건분기·문자열 조립에
 *   전부 걸리는데, 실행하면 최종 값이 그대로 나온다. 사내 다른 변환 도구(웹앱)가 쓰던
 *   기법을 이식했다.
 *
 * 무엇을 하지 않는가
 *   - **변환하지 않는다.** v7 구조를 그대로 JSON 으로 덤프할 뿐이다.
 *     v7→v8 매핑은 engine/rules/migrate_rules.json 한 곳에만 둔다(단일 원본).
 *   - 특정 고객사 전용 기본값을 넣지 않는다.
 *
 * 안전
 *   node:vm 샌드박스에서 돌린다. 네트워크·파일·타이머는 주지 않는다.
 *   DOM·jQuery 는 아무 것도 하지 않는 스텁이다. 미정의 이름은 오류에서 잡아
 *   자동으로 스텁하고 재시도한다(최대 MAX_RETRY 회).
 *
 * 사용
 *   node engine/init_extract.js <파일> [--sheet <시트변수명>] [--json]
 */
"use strict";

const fs = require("fs");
const vm = require("vm");
const path = require("path");

const MAX_RETRY = 400;
// 미정의 식별자를 이 형태로 남겨 두면, 변환 단계에서 원래 이름을 되살릴 수 있다.
const MARK = (name) => "@@" + name + "@@";

/* v7 전역 상수(`ibsheetinfo.js`)를 **숫자로** 샌드박스에 넣는다.
 *
 * ★스텁(`@@이름@@`)으로 두면 **산술식이 깨진다.** 실제 고객 화면에
 *     MergeSheet : msHeaderOnly + msPrevColumnMerge      // 5 + 2 = 7
 *   이 있었는데, 문자열 이어붙이기가 되어 `"@@msHeaderOnly@@@@msPrevColumnMerge@@"` 가 됐다.
 *   확정표에 없는 값이 되어 **병합 설정이 조용히 버려졌다**(2026-08-05).
 *
 * 표는 규칙 파일의 `v7_constants` 가 원본이다 — 여기에 사본을 두지 않는다.
 */
function loadV7Constants() {
  try {
    const p = path.join(__dirname, "rules", "migrate_rules.json");
    const c = JSON.parse(fs.readFileSync(p, "utf8")).v7_constants || {};
    const out = {};
    for (const k of Object.keys(c)) {
      if (!k.startsWith("_") && typeof c[k] === "number") out[k] = c[k];
    }
    return out;
  } catch (_e) {
    return {};       // 규칙 파일을 못 읽으면 스텁으로 처리된다(값이 마커로 남는다)
  }
}
const V7_CONSTANTS = loadV7Constants();

/* 미정의 이름을 위한 **유연한 스텁**.
 *
 * 고객 코드는 같은 이름을 값으로도(`SearchMode: smLazyLoad`) 객체로도
 * (`Util.createHiddenTag(...)`) 쓴다. 처음엔 값이면 문자열, 함수면 빈 함수로
 * 따로 스텁했는데 `Util` 을 문자열로 만들어 두면 `Util.createHiddenTag` 가
 * 영원히 실패해 재시도 한도를 넘겼다.
 *
 * 그래서 하나로 합쳤다 — 호출해도, 속성을 읽어도, 더 깊이 들어가도 같은 스텁이
 * 돌아온다. 값으로 쓰이면 `@@이름@@` 으로 직렬화된다(JSON.toJSON / toString).
 */
// 초기화 호출이 들어 있는지 보는 표식. harvestCallbacks 와 findInitFunctions 가 함께 쓴다.
const INIT_MARK = /IBS_InitSheet\w*\s*\(|\.\s*(?:SetConfig|InitColumns|InitHeaders)\s*\(/;

/* 스텁이 **콜백을 받으면 모아 둔다.**
 *
 * ★고객 코드는 초기화를 남의 콜백 안에 넣는 일이 아주 많다 —
 *   `ocp.common.ajax.dyLoadJs([...], function(){ IBS_InitSheet(...) })`,
 *   `require([...], function(){...})`, `$.ajax({success: function(){...}})` 등.
 *   그 함수는 우리에게 스텁이라 **콜백이 영원히 실행되지 않고 추출이 0건**이 된다
 *   (전수 조사에서 추출 0건 48개 중 상당수가 이 형태였다, 2026-08-10).
 *   그래서 스텁 호출에 함수 인자가 오면 나중에 실행하려고 모아 둔다.
 *   객체 인자 안의 함수(`{success: fn}`)도 한 겹은 본다.
 */
let CALLBACK_SINK = null;      // makeSandbox 가 deferred 배열을 꽂아 준다

/* ★**초기화가 들어 있는 콜백만** 담는다.
 *
 *   처음엔 함수 인자를 전부 담았더니 **이벤트 핸들러까지 실행**돼 같은 시트 메서드가
 *   반복 호출됐다 — 정상이던 화면이 추출 20개 → **710개**로 폭증했다(2026-08-10).
 *   초기화 구조를 뽑는 게 목적이므로 본문에 초기화 호출이 있는 것만 본다.
 *   같은 함수를 두 번 담지도 않는다.
 */
function harvestCallbacks(args) {
  if (!CALLBACK_SINK) return;
  const take = (f) => {
    if (typeof f !== "function" || f[IS_STUB]) return;
    let src = "";
    try { src = Function.prototype.toString.call(f); } catch (_e) { return; }
    if (!INIT_MARK.test(src)) return;
    if (CALLBACK_SINK.indexOf(f) >= 0) return;
    CALLBACK_SINK.push(f);
  };
  for (const a of args) {
    if (typeof a === "function") take(a);
    else if (a && typeof a === "object" && !Array.isArray(a)) {
      for (const k of Object.keys(a)) {
        try { take(a[k]); } catch (_e) { /* getter 가 던지면 무시 */ }
      }
    }
  }
}

const IS_STUB = "@@isStub@@";

function flexStub(name) {
  const mark = MARK(name);
  const fn = function () { return flexStub(name); };
  fn.toJSON = () => mark;
  fn.toString = () => mark;
  fn.valueOf = () => mark;
  return new Proxy(fn, {
    get(target, prop) {
      if (prop === IS_STUB) return true;
      if (prop === "toJSON" || prop === "toString" || prop === "valueOf") return target[prop];
      if (prop === Symbol.toPrimitive) return () => mark;
      if (typeof prop === "symbol") return undefined;
      if (prop === "length" || prop === "name") return target[prop];
      return flexStub(name + "." + String(prop));
    },
    set() { return true; },
    has() { return true; },
    apply(_t, _this, args) {
      harvestCallbacks(args);
      return flexStub(name);
    },
  });
}

// ---------------------------------------------------------------------------
// 입력에서 스크립트 본문만 모은다 (JSP/HTML 이면 <script> 안쪽)
// ---------------------------------------------------------------------------
function collectScripts(src) {
  if (!/<script/i.test(src)) return src;
  /* ★호출 전에 `.js` 인지 확인할 것 — 아래 prepare() 참고.
   *   HTML 을 문자열로 조립하는 `.js` 파일이 흔한데, 그 안의 `"<script>"` 를 보고
   *   여기서 스크립트 블록만 잘라내면 **파일 대부분이 사라진다**
   *   (실제 고객 파일에서 35,126자 → 4,113자, 2026-08-10). */
  const out = [];
  const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(src)) !== null) {
    const body = m[1];
    // src 만 있는 태그, JSP 표현식 덩어리는 건너뛴다
    if (body.trim()) out.push(body);
  }
  return out.join("\n;\n");
}

/* JSP 스크립트릿·표현식·태그립을 걷어낸다.
 *
 * ★ 이걸 **`<script>` 추출보다 먼저** 해야 한다.
 *   `<script src="<c:url value='...'/>"></script>` 처럼 태그립이 속성 안에 있으면
 *   `<script[^>]*>` 가 태그립의 `>` 에서 잘려, 남은 `"></script>` 를 스크립트 본문으로
 *   읽어 `Invalid or unexpected token` 이 난다(실제 샘플에서 발생).
 */
/* 템플릿 리터럴(백틱) 구간을 찾는다.
 *
 * ★EL(`${...}`)과 **JS 템플릿 리터럴**이 표기가 같다. 구분하지 않고 바꾸면
 *   `` `${1 / dpr}` `` 같은 정상 JS 가 깨진다(실제 고객 파일에서 발생, 2026-08-10).
 */
function templateRanges(code) {
  const out = [];
  let i = 0;
  const n = code.length;
  while (i < n) {
    const c = code[i];
    if (c === "\\") { i += 2; continue; }
    if (c === '"' || c === "'") {
      const q = c;
      i++;
      while (i < n && code[i] !== q) i += (code[i] === "\\" ? 2 : 1);
      i++;
      continue;
    }
    if (c === "/" && code[i + 1] === "/") { while (i < n && code[i] !== "\n") i++; continue; }
    if (c === "/" && code[i + 1] === "*") {
      const k = code.indexOf("*/", i + 2);
      i = k < 0 ? n : k + 2;
      continue;
    }
    if (c === "`") {
      const start = i;
      i++;
      let depth = 0;
      while (i < n) {
        if (code[i] === "\\") { i += 2; continue; }
        if (code[i] === "{" && code[i - 1] === "$") depth++;
        else if (code[i] === "}" && depth) depth--;
        else if (code[i] === "`" && !depth) break;
        i++;
      }
      out.push([start, i]);
      i++;
      continue;
    }
    i++;
  }
  return out;
}

/* 문자열 리터럴 구간을 찾는다. `<%=…%>` 가 **문자열 안인지** 판정하는 데 쓴다.
 *
 * ★앞뒤 글자만 보면 안 된다. `"<%=pageName%>_data.xml"` 은 문자열 안이지만
 *   바로 뒤가 `_` 라 "밖" 으로 오판해 따옴표를 덧붙였고 `""…"_data.xml"` 이 됐다
 *   (실제 벤더 샘플에서 6건, 2026-08-10).
 * ★스크립트릿(`<% … %>`) 안의 Java 코드에도 따옴표가 있으므로, 판정 전에 그 구간을
 *   같은 길이의 공백으로 지운 사본에서 센다(위치가 어긋나지 않게 길이를 보존한다).
 */
function stringRanges(code) {
  const masked = code.replace(/<%[^=][\s\S]*?%>|<%%>/g, (s) => " ".repeat(s.length));
  const out = [];
  let i = 0;
  const n = masked.length;
  while (i < n) {
    const c = masked[i];
    if (c === "/" && masked[i + 1] === "/") { while (i < n && masked[i] !== "\n") i++; continue; }
    if (c === "/" && masked[i + 1] === "*") {
      const k = masked.indexOf("*/", i + 2);
      i = k < 0 ? n : k + 2;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      const q = c;
      const start = i;
      i++;
      while (i < n) {
        if (masked[i] === "\\") { i += 2; continue; }
        if (masked[i] === q) break;
        if (q !== "`" && masked[i] === "\n") break;      // 한 줄짜리 문자열이 안 닫힌 경우
        i++;
      }
      out.push([start, i]);
      i++;
      continue;
    }
    i++;
  }
  return out;
}

function stripJsp(code) {
  // ★문자열 범위는 **주석을 지운 뒤** 계산한다 — 앞 단계에서 길이가 바뀌면 위치가 어긋난다.
  const noComment = code.replace(/<%--[\s\S]*?--%>/g, "");
  const strRanges = stringRanges(noComment);
  const inString = (pos) => strRanges.some(([a, b]) => pos > a && pos <= b);

  const out = noComment
    /* ★표현식이 **문자열 안**이면 따옴표 없이 넣는다.
     *   `var cur = "<%=request.getParameter("x")%>";`  → `""@@…@@"";`  (popup.jsp)
     *   `mySheet.DoSearch("<%=pageName%>_data.xml");` → `""@@…@@"_data.xml"` (샘플 6건)
     *   두 번째는 앞뒤 글자만 봐서는 못 잡는다 — 그래서 문자열 범위로 판정한다. */
    .replace(/<%=([\s\S]*?)%>/g, (s, inner, off) => {
      // ★따옴표 안에 넣을 때는 **표현식 안의 따옴표·역슬래시·줄바꿈을 지운다.**
      //   표현식 자체가 따옴표를 품고 있으면 문자열이 거기서 끊긴다.
      const body = inner.trim().replace(/[\\"'\r\n]/g, " ").replace(/\s+/g, " ");
      return inString(off) ? "@@JSP:" + body + "@@"
                           : JSON.stringify("@@JSP:" + inner.trim() + "@@");
    })
    .replace(/<%[\s\S]*?%>/g, "")
    // JSTL/Spring 등 커스텀 태그립: <c:url .../> · <spring:message .../> · </c:if>
    .replace(/<\/?[A-Za-z][\w.-]*:[\w.-]+(?:\s[^<>]*?)?\/?>/g, "");

  // EL 표현식 ${...} → 자리표시자. **템플릿 리터럴 안쪽은 건드리지 않는다**(위 주석).
  const skip = templateRanges(out);
  const inTemplate = (pos) => skip.some(([a, b]) => pos > a && pos < b);
  return out.replace(/\$\{([^}]*)\}/g,
                     (s, inner, off) => (inTemplate(off) ? s : "@@EL:" + inner.trim() + "@@"));
}

/* 입력 파일을 실행 가능한 JS 로 만든다.
 *
 * ★`.js` 파일은 **전처리를 하지 않는다.** 그 자체가 스크립트이고 JSP 문법이 없다.
 *   전처리를 돌리면 오히려 깨진다 — 실제로 두 가지가 있었다(2026-08-10 전수 조사):
 *     · HTML 을 문자열로 조립하는 `.js` 의 `"<script>"` 를 보고 스크립트 블록만 잘라내
 *       파일 대부분이 사라졌다(35,126자 → 4,113자)
 *     · JS **템플릿 리터럴** `` `${1 / dpr}` `` 을 JSP EL 로 착각해 바꿔 버렸다
 *   JSP/HTML 은 기존대로 태그립 제거 → `<script>` 추출 순서로 처리한다.
 */
/* `<%@ include file="..." %>` 를 **실제로 펼쳐 넣는다.**
 *
 * ★그냥 지우면 값 자리가 비어 버린다 — `var comboData = <%@include file="./combo.json"%>;`
 *   이 `var comboData = ;` 가 되어 파싱이 깨졌다(실제 벤더 샘플, 2026-08-10).
 *   펼치면 데이터도 함께 살아나고, 공통 초기화 조각을 include 하는 화면도 잡힌다.
 *
 * 안전: 경로는 **JSP 파일 기준 상대경로**만 따라가고, 깊이·크기를 제한하며 순환을 막는다.
 *       못 찾으면 자리표시자 문자열로 둔다(값 자리에서도 문법이 깨지지 않는다).
 */
const INCLUDE_MAX_DEPTH = 3;
const INCLUDE_MAX_BYTES = 1_000_000;

function inlineIncludes(code, file, seen, depth) {
  seen = seen || new Set();
  depth = depth || 0;
  return code.replace(/<%@\s*include\s+file\s*=\s*["']([^"']+)["']\s*%>/gi, (s, rel) => {
    if (depth >= INCLUDE_MAX_DEPTH) return JSON.stringify("@@JSPINC:" + rel + "@@");
    let p;
    try {
      p = path.resolve(path.dirname(file), rel.replace(/^\//, ""));
    } catch (_e) {
      return JSON.stringify("@@JSPINC:" + rel + "@@");
    }
    const key = p.toLowerCase();
    if (seen.has(key)) return JSON.stringify("@@JSPINC:" + rel + "@@");   // 순환
    try {
      if (fs.statSync(p).size > INCLUDE_MAX_BYTES) throw new Error("too big");
      seen.add(key);
      return inlineIncludes(fs.readFileSync(p, "utf8"), p, seen, depth + 1);
    } catch (_e) {
      return JSON.stringify("@@JSPINC:" + rel + "@@");
    }
  });
}

function prepare(raw, file) {
  if (/\.(?:js|mjs|cjs)$/i.test(file || "")) return raw;
  const withIncludes = inlineIncludes(raw, file);
  return collectScripts(stripJsp(withIncludes));   // ★ 태그립 제거를 먼저 (collectScripts 주석)
}

// ---------------------------------------------------------------------------
// 시트 변수명 찾기
// ---------------------------------------------------------------------------
function findSheetNames(code) {
  const names = new Set();
  const pats = [
    /createIBSheet2?\s*\(\s*[^,]+,\s*["']([A-Za-z_$][\w$]*)["']/g, // createIBSheet2(el, "name", ...)
    /createIBSheet\s*\(\s*["']([A-Za-z_$][\w$]*)["']/g,            // createIBSheet("name", ...)
    /var\s+([A-Za-z_$][\w$]*)\s*=\s*new\s+ibsheetObject\s*\(/g,     // new ibsheetObject()
    /IBS_InitSheet\w*\s*\(\s*([A-Za-z_$][\w$]*)\s*,/g,              // IBS_InitSheet(sheet, info)
  ];
  for (const re of pats) {
    let m;
    while ((m = re.exec(code)) !== null) names.add(m[1]);
  }
  return [...names];
}

// ---------------------------------------------------------------------------
// 초기화 함수 찾기
// ---------------------------------------------------------------------------
/* ★ **아무도 부르지 않는 초기화 함수**를 찾아 직접 실행하기 위한 것.
 *
 * v7 표준 구조는 `createIBSheet("mySheet", ...)` 로 만들고 `init_mySheet()` 에서
 * 초기화한다. 그런데 그 `init_*()` 를 부르는 쪽이 **외부 공통 js**(예: 프레임워크의
 * setSheet())인 경우가 흔하다. 화면 파일만 실행하면 그 호출자가 스텁이 되어
 * 초기화 함수가 **한 번도 실행되지 않고 추출 호출이 0개**가 된다.
 * (실제 고객 화면에서 이 때문에 0개가 나왔다 — 2026-08-05)
 *
 * 이름 규칙(`init_` 접두사 등)에 기대지 않고 **본문에 초기화 호출이 있는 함수**를
 * 찾는다. 프로젝트마다 이름이 다르기 때문이다.
 */

function findInitFunctions(code) {
  const out = [];
  const re = /function\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    // 여는 중괄호부터 짝을 맞춰 본문을 자른다(문자열 안의 중괄호까지 보진 않는다 —
    // 초기화 호출이 있는지만 판단하므로 그 정도로 충분하다)
    let depth = 1;
    let i = re.lastIndex;
    while (i < code.length && depth > 0) {
      const ch = code[i];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      i++;
    }
    const body = code.slice(re.lastIndex, i - 1);
    if (INIT_MARK.test(body)) out.push({ name: m[1], body });
  }
  return out;
}

// ---------------------------------------------------------------------------
// v7 모의 시트 — 호출을 그대로 기록만 한다 (변환은 하지 않는다)
// ---------------------------------------------------------------------------
function makeMockSheet(record, sheetName) {
  const sheet = {};
  // ★ 어느 시트의 호출인지 표시해 둔다. 한 화면에 시트가 2개 이상이면
  //   시트별로 갈라 `IBSheet.create` 를 따로 내야 한다(합치면 Cols 가 섞인다).
  const SHEET_TAG = "@@sheetName@@";
  // 초기화 계열: 인자를 기록
  const INIT = ["SetConfig", "InitColumns", "InitHeaders", "SetColProperty",
                "SetEditable", "SetVisible", "ShowFilterRow", "SetActionMenu",
                "SetCountFormat", "SetCountPosition", "SetPageCount", "SetTheme",
                "SetHighlightAfterSort", "SetMergeSheet", "SetImageList",
                "SetExtendLastCol", "FitColWidth", "SetComboOpenMode",
                "SetAutoSumPosition", "SetDataLinkMouse", "ShowToolTip",
                "SetEditableColorDiff", "SetFocusAfterProcess"];
  for (const name of INIT) {
    sheet[name] = function () {
      record.calls.push({ method: name, sheet: sheetName,
                          args: Array.prototype.slice.call(arguments) });
      return undefined;
    };
  }
  // 그 밖의 호출은 Proxy 로 받아 기록만 한다
  return new Proxy(sheet, {
    get(target, prop) {
      if (prop === SHEET_TAG) return sheetName;
      if (prop in target) return target[prop];
      if (typeof prop !== "string") return undefined;
      return function () {
        record.calls.push({ method: prop, sheet: sheetName,
                            args: Array.prototype.slice.call(arguments), other: true });
        return undefined;
      };
    },
    has() { return true; },
  });
}

// ---------------------------------------------------------------------------
// 샌드박스
// ---------------------------------------------------------------------------
/* jQuery 스텁 — **ready 콜백을 모아 둔다.**
 *
 * 실제 고객 코드의 초기화는 대부분 `$(document).ready(function(){ ... })` 안에 있다.
 * jQuery 를 통째로 flexStub 으로 두면 콜백이 호출되지 않아 **기록되는 호출이 0개**가 된다.
 * 그래서 ready/즉시실행 형태만 붙잡아 나중에 직접 실행한다.
 */
function makeJq(deferred) {
  const jqObj = new Proxy(function () { return jqObj; }, {
    get(_t, p) {
      if (p === "ready") {
        return function (fn) { if (typeof fn === "function") deferred.push(fn); return jqObj; };
      }
      if (p === "toJSON" || p === "toString" || p === "valueOf") return () => "@@jQuery@@";
      if (typeof p === "symbol") return undefined;
      return function () { return jqObj; };
    },
    set() { return true; },
    has() { return true; },
    apply() { return jqObj; },
  });
  const jqFn = function (arg) {
    if (typeof arg === "function") deferred.push(arg);   // $(function(){...})
    return jqObj;
  };
  const known = {
    ready: function (fn) { if (typeof fn === "function") deferred.push(fn); return jqObj; },
    ajax: function () { return jqObj; },
    each: function () { return jqObj; },
    extend: Object.assign,
  };
  /* ★`$` 자체의 **모르는 속성도 함수로** 돌려준다.
   *   예전엔 위 4개만 달아 둬서 `jQuery.noConflict()` · `$.debounce()` 처럼
   *   플러그인·유틸을 부르면 "is not a function" 으로 죽었다(전수 조사에서 3건).
   *   `$(...)` 가 돌려주는 객체(jqObj)는 이미 그렇게 동작하는데 `$` 만 빠져 있었다. */
  return new Proxy(jqFn, {
    get(_t, p) {
      if (p in known) return known[p];
      if (p === "toJSON" || p === "toString" || p === "valueOf") return () => "@@jQuery@@";
      if (typeof p === "symbol") return undefined;
      return function () { harvestCallbacks(arguments); return jqObj; };
    },
    set() { return true; },
    has() { return true; },
    apply(_t, _this, args) { return jqFn.apply(null, args); },
  });
}

function makeSandbox(record, sheetNames, deferred, stubNames) {
  const noop = function () { return undefined; };
  // ★ DOM·jQuery 도 flexStub 으로 준다.
  //   처음엔 속성 읽기에 빈 함수를 돌려줬는데, 고객 코드의
  //   `cookiedata = document.cookie; cookiedata.indexOf(...)` 가
  //   "indexOf is not a function" 을 매 재실행마다 다시 던져 수렴하지 않았다.
  //   flexStub 은 어떤 메서드 호출도 받아내므로 그 부류가 통째로 사라진다.
  const sandbox = {
    console: { log: noop, warn: noop, error: noop, debug: noop },
    document: new Proxy({}, {
      get(_t, p) {
        // DOMContentLoaded / onload 로 등록하는 초기화도 붙잡는다
        if (p === "addEventListener") {
          return function (ev, fn) { if (typeof fn === "function") deferred.push(fn); };
        }
        if (p === "ready") return function (fn) { if (typeof fn === "function") deferred.push(fn); };
        if (p === "toJSON" || p === "toString" || p === "valueOf") return () => "@@document@@";
        if (typeof p === "symbol") return undefined;
        return flexStub("document." + String(p));
      },
      set() { return true; },
      has() { return true; },
    }),
    alert: noop, confirm: function () { return true; }, setTimeout: noop,
    setInterval: noop, clearTimeout: noop, clearInterval: noop,
    // 호스트 객체는 전부 flexStub 으로 준다. 속성 목록을 손으로 채우면
    // 빠진 것(예: location.host)에서 undefined 가 나와 `x.indexOf` 로 터진다.
    location: flexStub("location"),
    navigator: flexStub("navigator"),
    screen: flexStub("screen"),
    history: flexStub("history"),
    localStorage: flexStub("localStorage"),
    sessionStorage: flexStub("sessionStorage"),
    JSON, Math, Date, parseInt, parseFloat, isNaN, String, Number, Boolean,
    Array, Object, RegExp, encodeURIComponent, decodeURIComponent,
  };
  CALLBACK_SINK = deferred;      // 스텁이 받은 콜백을 여기 모은다 (harvestCallbacks 주석 참고)
  const jq = makeJq(deferred);
  sandbox.$ = jq;
  sandbox.jQuery = jq;
  // ★jQuery 를 다른 이름으로 쓰는 프로젝트가 많다 — `$j(document).ready(...)` 처럼.
  //   그 이름이 스텁이 되면 ready 콜백을 못 잡아 **추출이 0건**이 된다.
  for (const alias of ["$j", "$J", "jq", "jQ", "$jq", "j$"]) sandbox[alias] = jq;
  sandbox.addEventListener = function (ev, fn) { if (typeof fn === "function") deferred.push(fn); };
  sandbox.window = sandbox;
  sandbox.self = sandbox;

  // v7 생성 함수 스텁 — 아무 것도 만들지 않는다(오류만 막는다)
  sandbox.createIBSheet = noop;
  sandbox.createIBSheet2 = noop;
  sandbox.createIBSheet4 = noop;
  sandbox.ibsheetObject = function () { return makeMockSheet(record, null); };
  // IBS_InitSheet(sheet, info) / 프로젝트 자체 래퍼(IBS_InitSheet2 등)
  //   ★첫 인자에서 **시트 이름을 꺼낸다.** 예전엔 args[0] 을 null 로 버렸는데,
  //   그러면 시트가 2개인 화면에서 어느 시트의 초기화인지 알 수 없어 하나로 합쳐졌다.
  const initSheet = function (sheet, info) {
    let name = null;
    try { name = sheet && sheet["@@sheetName@@"]; } catch (_e) { name = null; }
    record.calls.push({ method: "IBS_InitSheet", sheet: name || null, args: [null, info] });
  };
  sandbox.IBS_InitSheet = initSheet;
  sandbox.IBS_InitSheet2 = initSheet;
  sandbox.IBS_InitSheet3 = initSheet;

  // v7 전역 상수는 **숫자로** 넣는다 (위 V7_CONSTANTS 주석 — 산술식이 깨지지 않게)
  for (const k of Object.keys(V7_CONSTANTS)) sandbox[k] = V7_CONSTANTS[k];

  for (const n of sheetNames) sandbox[n] = makeMockSheet(record, n);
  // 지금까지 모아 둔 자동 스텁을 다시 심는다 (재시도마다 샌드박스를 새로 만들기 때문 —
  // 아래 runWithAutoStub 주석 참고)
  for (const n of stubNames || []) {
    if (!(n in sandbox)) sandbox[n] = flexStub(n);
  }
  return sandbox;
}

// ---------------------------------------------------------------------------
// 자동 스텁 반복 실행
// ---------------------------------------------------------------------------
/* 오류 하나를 보고 스텁을 심는다. 심었으면 true(재시도), 못 심으면 false(치명적).
 *
 * ★ 스크립트 본문과 **지연 콜백(ready)** 이 같은 처리를 써야 한다.
 *   처음엔 본문에만 적용했더니 ready 안의 `smClientPaging is not defined` 가
 *   그대로 터져 초기화 호출이 하나도 안 잡혔다.
 */
function stubOnError(e, sandbox, record, seen) {
  const msg = String(e && e.message || e);
  const hit = (seen.get(msg) || 0) + 1;
  seen.set(msg, hit);
  if (hit > 2) return false;      // 같은 오류 반복 = 진행 불가

  let m = /^(.+?) is not defined$/.exec(msg);
  if (m) {
    const name = m[1];
    if (!/^[A-Za-z_$][\w$]*$/.test(name)) return false;
    record.unresolved.add(name);
    sandbox[name] = flexStub(name);
    return true;
  }
  m = /^(.+?) is not a function$/.exec(msg);
  if (m) {
    const root = m[1].split(".")[0].replace(/\[.*$/, "");
    if (/^[A-Za-z_$][\w$]*$/.test(root)) {
      record.unresolved.add(root);
      sandbox[root] = flexStub(root);
      return true;
    }
  }
  return false;
}

/* ★ 재시도 전에 **이번 시도에서 기록된 호출을 되돌린다.**
 *
 * 자동 스텁은 "실행 → 오류 → 스텁 심고 처음부터 다시" 구조다. 되돌리지 않으면
 * 오류 지점 앞의 호출이 시도마다 다시 쌓여 **같은 초기화가 N번 기록된다.**
 * 실제 고객 화면에서 스텁 3개(색상 상수)를 심는 동안 `IBS_InitSheet` 가 4번 기록돼
 * Cols 가 4배가 됐다(2026-08-05). 정적 검사로는 안 잡히는 종류의 오류다.
 */
function rollback(record, mark) {
  record.calls.length = mark;
}

/* 지연 콜백·초기화 함수를 자동 스텁과 함께 실행한다.
 *
 * ★**vm 을 통해 부른다.** 예전엔 `fn.call(sandbox)` 로 직접 불렀는데, 그러면
 *   `vm` 의 timeout 이 걸리지 않는다 — 고객 코드에 무한 루프가 있으면 힙이 다 찰 때까지
 *   돌다가 **Node 가 OOM 으로 죽는다**(실제로 4GB 를 먹고 죽는 파일이 있었다, 2026-08-10).
 *   본문 실행에는 timeout 이 있었는데 콜백에는 없어서 생긴 구멍이다.
 */
const CALL_TIMEOUT_MS = 5000;

function callWithAutoStub(fn, sandbox, record) {
  const seen = new Map();
  const mark = record.calls.length;
  let ctx;
  try {
    ctx = vm.createContext(sandbox);          // 이미 contextify 된 객체면 그 컨텍스트를 준다
  } catch (_e) {
    ctx = null;
  }
  const script = ctx ? new vm.Script("__ibs_deferred__()") : null;
  for (let i = 0; i < 60; i++) {
    try {
      if (script) {
        sandbox.__ibs_deferred__ = fn;
        script.runInContext(ctx, { timeout: CALL_TIMEOUT_MS });
      } else {
        fn.call(sandbox);
      }
      return null;
    } catch (e) {
      const msg = String(e && e.message || e);
      if (/Script execution timed out/i.test(msg)) {
        return "실행 시간 초과(무한 루프 가능) — " + CALL_TIMEOUT_MS + "ms";
      }
      if (!stubOnError(e, sandbox, record, seen)) return msg;
      rollback(record, mark);
    }
  }
  return "자동 스텁 반복 초과";
}

/* ★ **재시도마다 샌드박스를 새로 만든다.**
 *
 * 처음엔 컨텍스트 하나를 만들어 재사용했다. 그런데 자동 스텁은 "실행 → 오류 → 스텁 심고
 * **처음부터 다시**" 구조이고, 최상위 `let`/`const` 는 컨텍스트의 렉시컬 스코프에 남는다.
 * 그래서 1회차에 선언된 `let fragment` 가 2회차에
 *
 *     SyntaxError: Identifier 'fragment' has already been declared
 *
 * 으로 터져 **그 뒤 초기화를 전부 잃었다**(실제 고객 화면에서 시트 8개 중 일부만 잡혔다,
 * 2026-08-05). 스텁을 하나만 심어야 하는 화면에서도 나므로 흔한 실패다.
 *
 * 같은 객체로 `runInNewContext` 를 다시 불러도 안 된다 — Node 가 contextify 결과를
 * 객체에 캐시해 렉시컬 스코프가 그대로 살아 있다. **객체 자체를 새로 만들어야** 한다.
 * 모아 둔 스텁 이름(`record.unresolved`)을 넘겨 다시 심는다.
 */
function runWithAutoStub(code, record, sheetNames, deferred) {
  const seen = new Map();
  const mark = record.calls.length;
  let sandbox = makeSandbox(record, sheetNames, deferred, record.unresolved);
  for (let i = 0; i < MAX_RETRY; i++) {
    try {
      new vm.Script(code, { filename: "init.js" })
        .runInNewContext(sandbox, { timeout: 5000 });
      return { ok: true, retries: i, sandbox: sandbox };
    } catch (e) {
      if (!stubOnError(e, sandbox, record, seen)) {
        return { ok: false, error: String(e && e.message || e), retries: i, sandbox: sandbox };
      }
      rollback(record, mark);
      deferred.length = 0;   // 이전 컨텍스트의 콜백은 버린다(다음 실행에서 다시 등록된다)
      sandbox = makeSandbox(record, sheetNames, deferred, record.unresolved);
    }
  }
  return { ok: false, error: "자동 스텁 " + MAX_RETRY + "회 초과",
           retries: MAX_RETRY, sandbox: sandbox };
}

// ---------------------------------------------------------------------------
function main() {
  const argv = process.argv.slice(2);
  if (!argv.length) {
    console.error("사용: node engine/init_extract.js <파일> [--sheet <시트변수명>] [--json]");
    process.exit(3);
  }
  const file = argv[0];
  const sheetArg = argv.includes("--sheet") ? argv[argv.indexOf("--sheet") + 1] : null;
  const asJson = argv.includes("--json");

  const raw = fs.readFileSync(file, "utf8");
  const code = prepare(raw, file);
  const sheetNames = sheetArg ? [sheetArg] : findSheetNames(code);

  const record = { calls: [], unresolved: new Set() };
  const deferred = [];
  const result = runWithAutoStub(code, record, sheetNames, deferred);
  const sandbox = result.sandbox;   // 마지막 시도의 샌드박스 — 아래 지연 콜백·초기화 함수가 여기 있다

  // ready/onload 로 미뤄둔 초기화를 실행한다. 여기서 대부분의 SetConfig/InitColumns 가 나온다.
  const deferredErrors = [];
  for (let n = 0; n < deferred.length; n++) {     // 실행 중 새로 등록될 수 있어 length 를 매번 본다
    const err = callWithAutoStub(deferred[n], sandbox, record);
    if (err) deferredErrors.push(err);
  }
  // window.onload 로 등록한 경우
  if (typeof sandbox.onload === "function") {
    const err = callWithAutoStub(sandbox.onload, sandbox, record);
    if (err) deferredErrors.push(err);
  }

  // ★ 여기까지 해도 실행되지 않은 초기화 함수를 **직접 부른다**(위 findInitFunctions 주석 참고).
  //   이미 초기화가 기록된 시트는 건드리지 않는다 — 두 번 기록되면 Cols 가 중복된다.
  const forcedInit = [];
  for (const f of findInitFunctions(code)) {
    if (typeof sandbox[f.name] !== "function") continue;
    // 이 함수가 다루는 시트 중 아직 초기화가 기록되지 않은 것이 있나
    const targets = sheetNames.filter((n) =>
      new RegExp("\\b" + n.replace(/\$/g, "\\$") + "\\b").test(f.body));
    const done = new Set(record.calls.map((c) => c.sheet).filter(Boolean));
    if (targets.length && targets.every((n) => done.has(n))) continue;
    if (!targets.length && record.calls.length) continue;
    const before = record.calls.length;
    const err = callWithAutoStub(sandbox[f.name], sandbox, record);
    if (record.calls.length > before) forcedInit.push(f.name);
    else if (err) deferredErrors.push(f.name + ": " + err);
  }

  const out = {
    file: path.resolve(file),
    sheetNames,
    ok: result.ok,
    error: result.error || null,
    autoStubbed: [...record.unresolved].sort(),
    deferredRan: deferred.length,
    deferredErrors,
    forcedInit,
    calls: record.calls.map((c) => ({
      method: c.method,
      sheet: c.sheet || null,
      args: c.args,
      other: !!c.other,
    })),
  };

  if (asJson) {
    process.stdout.write(JSON.stringify(out, null, 2) + "\n");
  } else {
    console.log("파일      : " + out.file);
    console.log("시트 변수 : " + (sheetNames.join(", ") || "(못 찾음)"));
    console.log("실행      : " + (out.ok ? "성공" : "실패 — " + out.error));
    console.log("자동 스텁 : " + out.autoStubbed.length + "개 " +
                (out.autoStubbed.slice(0, 12).join(", ") || ""));
    console.log("지연 콜백 : " + out.deferredRan + "개 실행" +
                (out.deferredErrors.length ? " (오류 " + out.deferredErrors.length + "건: " +
                 out.deferredErrors.slice(0, 2).join(" / ") + ")" : ""));
    if (out.forcedInit.length) {
      console.log("직접 실행 : " + out.forcedInit.join(", ") + "  (호출자가 외부에 있어 우리가 불렀다)");
    }
    console.log("기록된 호출: " + out.calls.length + "개");
    for (const c of out.calls) {
      console.log("  " + (c.sheet ? c.sheet + "." : "") + c.method + "(" + c.args.length + "개 인자)" +
                  (c.other ? "  [초기화 계열 아님]" : ""));
    }
  }
  process.exit(out.ok ? 0 : 1);
}

main();
