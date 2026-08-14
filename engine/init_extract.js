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
/* 초기화 호출이 들어 있는지 보는 표식. harvestCallbacks 와 findInitFunctions 가 함께 쓴다.
 *
 * ★`SetConfig` 는 IBSheet 만 쓰는 이름이 아니다. 다른 제품의 업로더가
 *   `DEXT5UPLOAD.SetConfig(...)` 로 쓰는데 여기에 걸려, IBSheet 초기화가 전혀 없는 화면에
 *   **"초기화가 있는데 실행 경로에 닿지 못했다"** 는 엉뚱한 안내가 나갔다(2026-08-12).
 *   받는 객체가 그 제품이면 뺀다. 다른 제품이 더 나오면 여기에 추가한다.
 */
const NOT_IBSHEET = ["DEXT5UPLOAD"];

/* ★**IBSheet v3 의 초기화 방식.** v7/v8 과는 다른 세대의 제품이고 API 가 전혀 다르다 —
 *   값을 이름이 아니라 **자리**로 넘긴다.
 *
 *     mySheet.InitRowInfo(1, 1, 30);
 *     mySheet.InitColumnInfo(35, 5, 0);
 *     mySheet.InitHeadRow(0, "NO|상태|삭제|…");
 *     mySheet.InitDataProperty(0, row++, dtData, 80, daCenter, false, "EMPL_NUMB", …);
 *
 * ★**v7→v8 변환 대상이 아니다.** 이 도구는 v7 화면을 v8 로 옮기는 것이고,
 *   v3 화면은 출발점부터 다르다. 섞여 들어오면 **대상이 아니라고 말해야** 한다 —
 *   "초기화 구조가 없다"(옮길 게 없다는 뜻)도, "이만큼 잡혔다"(대상인 것처럼 보임)도 아니다.
 *
 *   실측(다른 SI 코퍼스 300화면, 2026-08-13): **216화면(72%)이 v3**,
 *   `InitDataProperty` 12,861회. 기존 코퍼스 1,822화면에는 **한 건도 없었다.**
 *
 * ★받는 객체 없이도 불린다 — `with (mySheet) { InitDataProperty(…); }`.
 *   호출의 77%가 `with` 블록 안의 맨이름이라 `.이름(` 만 보면 대부분 놓친다.
 *   이름이 이 제품 고유라 맨이름으로 찾아도 안전하다.
 */
// 이름 표의 원본은 규칙 파일이다(migrate.py 도 같은 표를 본다). 못 읽으면 최소한으로 동작한다.
function loadV3Names() {
  try {
    const p = path.join(__dirname, "rules", "migrate_rules.json");
    const n = (JSON.parse(fs.readFileSync(p, "utf8")).v3_init_names || {}).names;
    if (Array.isArray(n) && n.length) return n;
  } catch (_e) { /* 아래 기본값 */ }
  return ["InitDataProperty", "InitHeadRow", "InitRowInfo", "InitColumnInfo"];
}
const V3_INIT_NAMES = loadV3Names();
const V3_INIT = new RegExp(
  "(?<![\\w$])(?:\\.\\s*)?(" + V3_INIT_NAMES.join("|") + ")\\s*\\(", "g");

/* 초기화 호출이 들어 있는지 보는 표식. harvestCallbacks 와 findInitFunctions 가 함께 쓴다.
 *
 * ★v3 이름은 **여기에 넣지 않는다.** 넣으면 v3 초기화 함수를 직접 실행해 값을 뽑아내는데,
 *   v3 화면은 애초에 **변환 대상이 아니다**(V3_INIT 주석). 뽑아 봐야 옮길 곳이 없고,
 *   "이만큼 잡혔다" 는 숫자만 남아 대상인 것처럼 보이게 한다.
 */
const INIT_MARK = new RegExp(
  "IBS_InitSheet\\w*\\s*\\(|" +
  NOT_IBSHEET.map((n) => "(?<!" + n + ")").join("") +
  "\\.\\s*(?:SetConfig|InitColumns|InitHeaders)\\s*\\(");

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
const SHEET_TAG = "@@sheetName@@";     // makeMockSheet 이 붙이는 표시

/* ★**초기화 객체는 이 파일에 있는데, 그걸 넘기는 함수가 외부 파일**인 구조를 붙잡는다.
 *
 *   function setDefaultConfig(sheetObj, initData) { IBS_InitSheet(sheetObj, initData); }  // 공통 js
 *   ...
 *   var initData = { Cfg:{…}, Cols:[…] };
 *   setDefaultConfig(mainSheet, initData);      // 화면 파일
 *
 *   `setDefaultConfig` 이 우리에겐 스텁이라 아무 것도 기록되지 않고 **추출 0건**이 됐다.
 *   그런데 초기화에 필요한 값은 **전부 이 파일 안에 있다** — 넘기는 함수만 밖에 있을 뿐이다.
 *   (2026-08-12, 실제 고객 화면에서 발견)
 *
 *   그래서 스텁 호출의 인자에 **모의 시트**와 **초기화 모양 객체**가 함께 오면
 *   `IBS_InitSheet(sheet, data)` 를 부른 것으로 본다.
 *   ★모양을 좁게 본다 — `Cols` 가 **배열**이거나 `Cfg` 가 **객체**여야 한다.
 *     아무 객체나 받으면 엉뚱한 호출까지 초기화로 기록된다.
 */
function looksLikeInit(v) {
  if (!v || typeof v !== "object" || Array.isArray(v) || v[IS_STUB]) return false;
  if (Array.isArray(v.Cols) && v.Cols.length) return true;
  return !!(v.Cfg && typeof v.Cfg === "object" && !Array.isArray(v.Cfg));
}

function sheetNameOf(v) {
  if (!v || typeof v !== "object") return null;
  try {
    const n = v[SHEET_TAG];
    return typeof n === "string" ? n : null;
  } catch (_e) {
    return null;
  }
}

let INIT_SINK = null;                  // makeSandbox 가 record 를 꽂아 준다

function harvestInitHandoff(args) {
  if (!INIT_SINK) return;
  let sheet = null;
  let data = null;
  for (const a of args) {
    const n = sheetNameOf(a);
    if (n && !sheet) sheet = n;
    else if (looksLikeInit(a) && !data) data = a;
  }
  if (!sheet || !data) return;
  // 이미 그 시트의 초기화가 기록됐으면 두 번 담지 않는다
  if (INIT_SINK.calls.some((c) => c.sheet === sheet && c.method === "IBS_InitSheet")) return;
  INIT_SINK.calls.push({ method: "IBS_InitSheet", sheet, args: [null, data],
                         handoff: true });
}

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
      harvestInitHandoff(args);
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
  /*
   * ★**HTML 주석(`<!-- … -->`) 안의 스크립트는 죽은 코드다.** 예전에는 정규식 하나로
   *   `<script>…</script>` 를 긁어서 주석 안의 것까지 살아 있는 코드로 모았다.
   *   실제 화면에 `<!--script> … </script--></script-->` 로 **두 블록을 통째로 꺼 둔** 것이
   *   있었는데, 닫는 태그가 `</script-->` 라 짝을 못 찾고 **뒤쪽 HTML 마크업까지** 본문으로
   *   삼켜 `Unexpected token '<'` 로 죽었다(추출 0건, 2026-08-13).
   *   주석을 세면 안 된다는 것은 이미 아는 함정이다 — 여기만 빠져 있었다.
   *
   *   ★단, `<script><!-- … //--></script>` 는 옛날 브라우저용 관용구라 **살아 있는 코드**다.
   *     그래서 주석은 "스크립트 **밖**에서 시작한 것" 만 건너뛴다. 한 번에 지우면 안 된다.
   *
   * ★건너뛰는 구간은 **줄바꿈을 남긴 채** 지운다(`pad`). 예전에는 본문만 이어 붙여서
   *   오류 줄 번호가 원본과 **전혀 달랐다.** 고객 코드 자체의 구문 오류(쉼표 누락·
   *   따옴표 중첩)가 실행 실패 원인의 절반인데, "몇 번째 줄" 을 못 알려 주면 찾을 수 없다.
   */
  const out = [];
  const n = src.length;
  const open = /<script\b[^>]*>/gi;
  const pad = (s) => ";" + s.replace(/[^\n]+/g, "");
  let i = 0;
  while (i < n) {
    open.lastIndex = i;
    const mo = open.exec(src);
    if (!mo) { out.push(pad(src.slice(i))); break; }
    const cmt = src.indexOf("<!--", i);
    if (cmt >= 0 && cmt < mo.index) {                 // 스크립트 밖에서 시작한 주석
      const end = src.indexOf("-->", cmt + 4);
      out.push(pad(src.slice(i, end < 0 ? n : end + 3)));
      i = end < 0 ? n : end + 3;
      continue;
    }
    out.push(pad(src.slice(i, mo.index + mo[0].length)));
    const from = mo.index + mo[0].length;
    /* 닫는 태그를 **관대하게** 찾는다.
     *   · `</script-->`  주석으로 꺼 둔 블록 (위)
     *   · `/script>`     `<` 를 빠뜨린 오타. 실제 샘플에 있었고, JS 에서는 정규식 리터럴로
     *                    읽혀 `Invalid regular expression: missing /` 로 죽었다. */
    const rest = src.slice(from);
    const mc = /<\/\s*script/i.exec(rest);
    const mt = /(?:^|\n)[ \t]*\/script\s*>/i.exec(rest);
    const at = Math.min(mc ? mc.index : Infinity, mt ? mt.index : Infinity);
    const body = at === Infinity ? rest : rest.slice(0, at);
    // src 만 있는 빈 태그도 **줄바꿈은 남긴다** — 버리면 뒤쪽 줄 번호가 밀린다
    out.push(body.trim() ? body : pad(body));
    if (at === Infinity) break;
    const gt = src.indexOf(">", from + at);
    out.push(pad(src.slice(from + at, gt < 0 ? n : gt + 1)));
    i = gt < 0 ? n : gt + 1;
  }
  return out.join("");                                // ★줄 번호를 원본과 맞추려면 이어 붙이기만
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
  // ★지울 때 **줄바꿈은 남긴다** — 스크립트릿·주석은 여러 줄인 일이 흔해서, 그냥 지우면
  //   그 뒤 모든 줄 번호가 밀린다(오류 위치 안내가 엉뚱한 줄을 가리킨다).
  const nl = (s) => s.replace(/[^\n]+/g, "");
  // ★문자열 범위는 **주석을 지운 뒤** 계산한다 — 앞 단계에서 길이가 바뀌면 위치가 어긋난다.
  const noComment = code.replace(/<%--[\s\S]*?--%>/g, nl);
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
      // ★문자열 **안**이면 줄바꿈을 되돌려 넣을 수 없다(문자열 리터럴이 끊긴다).
      //   여러 줄짜리 표현식이 문자열 안에 오는 경우만 줄 번호가 밀린다 — 드물다.
      if (inString(off)) return "@@JSP:" + body + "@@";
      // 밖이면 지운 줄바꿈만큼 뒤에 붙여 줄 번호를 지킨다
      return JSON.stringify("@@JSP:" + inner.trim() + "@@") + nl(s);
    })
    .replace(/<%[\s\S]*?%>/g, nl)
    // JSTL/Spring 등 커스텀 태그립: <c:url .../> · <spring:message .../> · </c:if>
    .replace(/<\/?[A-Za-z][\w.-]*:[\w.-]+(?:\s[^<>]*?)?\/?>/g, nl);

  /* EL 표현식 ${...} → 자리표시자. **템플릿 리터럴 안쪽은 건드리지 않는다**(위 주석).
   *
   * ★`<%= %>` 와 **똑같이** 다뤄야 한다 — 문자열 **밖**이면 따옴표를 씌운다.
   *   위 `<%=` 쪽은 진작 그렇게 하는데 EL 쪽만 빠져 있어서, JS 식 자리에 EL 을 쓴 화면이
   *   `if(!specAuth && @@EL:userInfo.USER_CODE@@ != …)` 가 되어 죽었다(2026-08-13).
   *   기존 코퍼스는 EL 을 쓰는 화면이 1,822개 중 19개뿐이라 드러나지 않았다 —
   *   새 SI 코퍼스는 300개 중 292개가 EL 을 쓴다(Spring MVC).
   *
   * ★범위를 **한 줄로 묶는다**(`[^}\n]*`). 고객이 `"${param.popup"` 처럼 EL 을 안 닫은
   *   자리가 있었는데, 줄을 넘어 다음 `}` 까지 삼켜 **코드 네 줄이 통째로 사라졌다.**
   *   고객 실수를 우리가 키우면 안 된다 — 안 닫힌 EL 은 그냥 두고 그 줄만 영향을 받게 한다.
   */
  const skip = templateRanges(out);
  const inTemplate = (pos) => skip.some(([a, b]) => pos > a && pos < b);
  const elStr = stringRanges(out);
  const elInString = (pos) => elStr.some(([a, b]) => pos > a && pos <= b);
  return out.replace(/\$\{([^}\n]*)\}/g, (s, inner, off) => {
    if (inTemplate(off)) return s;
    const mark = "@@EL:" + inner.trim() + "@@";
    return elInString(off) ? mark : JSON.stringify(mark);
  });
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
/* 파일을 **인코딩을 보고** 읽는다.
 *
 * ★`fs.readFileSync(f, "utf8")` 로만 읽고 있었다. 국내 레거시 화면은 **cp949(euc-kr)** 가
 *   흔한데, utf8 로 강제로 읽으면 한글이 전부 `�` 가 된다. 대부분은 문자열 안이라
 *   **실행은 성공하고** `Header:"상태"` 가 `Header:"����"` 로 조용히 나갔다.
 *   한글 **식별자**(`f.금액.value`)를 쓴 화면에서만 `Invalid or unexpected token` 으로
 *   드러났다 — 그래서 실행실패 1건으로 보였지만 실제 피해는 코퍼스 3,030개 중
 *   **cp949 362개(그 중 초기화가 추출된 312개)** 였다(2026-08-13).
 *   `migrate.py` 의 탐색(`find`)은 이미 utf-8→cp949 순으로 읽고 있었다 — 엔진만 빠져 있었다.
 */
function readSource(file) {
  const buf = fs.readFileSync(file);
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buf);   // BOM 은 자동 제거된다
  } catch (_e) {
    // WHATWG 의 `euc-kr` 디코더는 실제로 windows-949(cp949) 다 — 확장 완성형까지 읽는다.
    return new TextDecoder("euc-kr").decode(buf);
  }
}

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
      return inlineIncludes(readSource(p), p, seen, depth + 1);
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
    /* ★`sheet.SetConfig(cfg)` 형태 — 시트를 **외부 공통 js 에서 만들어 주는** 화면이 있다.
     *   위 네 패턴에 안 걸려 시트로 인식되지 못했고, `sheet` 가 자동 스텁이 되어
     *   초기화 호출이 **아무 데도 기록되지 않았다**(추출 0건, `SYSM_RASK_LIST.js`).
     *   v7 에서 이 세 메서드를 받는 객체는 시트뿐이다. 다른 제품은 INIT_MARK 와 같게 뺀다. */
    new RegExp(NOT_IBSHEET.map((n) => "(?<!" + n + ")").join("") +
               "(?<![\\w$.])([A-Za-z_$][\\w$]*)\\s*\\.\\s*" +
               "(?:SetConfig|InitColumns|InitHeaders)\\s*\\(", "g"),
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

/* ★선언식만 찾으면 절반을 놓친다 (2026-08-12).
 *
 * 추출 0건 화면을 파 보니 막힌 자리가 **두 군데**였다 —
 *   ① `function f(){…}` 가 **다른 함수 안에 중첩**돼 있어 전역이 아니다.
 *      아래 강제 실행이 `sandbox[이름]` 을 찾는데 없으니 건너뛴다(`index2.html`).
 *   ② 아예 **함수 표현식**이라 이 정규식이 못 잡는다 — `var f = function(){…}`,
 *      `obj.f = function(){…}`, `{ f: function(){…} }`.
 *
 * 그래서 **네 가지 모양을 모두** 찾고, 전역으로 닿지 않으면 본문을 직접 컴파일해 부른다.
 * 범위는 넓히지 않는다 — **본문에 INIT_MARK 가 있는 것만** 담는다. 예전에 콜백을 가리지 않고
 * 거두다 한 화면이 20 → 710 건으로 터진 적이 있다. 그 조건을 그대로 유지한다.
 */
/* 여는 중괄호에 짝을 맞춰 본문 끝을 찾는다. **문자열·주석·정규식 안은 세지 않는다.**
 *
 * ★처음엔 글자만 세었다. 문자열 안의 `{`·`}` 에 속아 본문을 엉뚱한 데서 잘랐고,
 *   그 조각을 컴파일하니 `Invalid or unexpected token` 이 났다(`filegrid.js`).
 *   초기화 호출이 있는지 보기만 할 때는 넘어갔지만, **본문을 실행하려면 정확해야 한다.**
 */
function matchBrace(code, i) {
  let depth = 1;
  const n = code.length;
  let prev = "";                                  // 정규식 판정용 직전 의미 글자
  while (i < n && depth > 0) {
    const c = code[i];
    if (c === "/" && code[i + 1] === "/") {
      while (i < n && code[i] !== "\n") i++;
      continue;
    }
    if (c === "/" && code[i + 1] === "*") {
      const k = code.indexOf("*/", i + 2);
      i = k < 0 ? n : k + 2;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      const q = c;
      i++;
      while (i < n && code[i] !== q) i += (code[i] === "\\" ? 2 : 1);
      i++;
      prev = q;
      continue;
    }
    // 정규식 리터럴 — 앞이 값이 올 수 없는 자리면 나눗셈이 아니다
    if (c === "/" && "(,=:[!&|?{};+-*%~^".indexOf(prev) >= 0) {
      i++;
      let cls = false;
      while (i < n) {
        const d = code[i];
        if (d === "\\") { i += 2; continue; }
        if (d === "[") cls = true;
        else if (d === "]") cls = false;
        else if (d === "/" && !cls) break;
        else if (d === "\n") break;               // 정규식이 아니었다
        i++;
      }
      i++;
      prev = "/";
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") depth--;
    if (!/\s/.test(c)) prev = c;
    i++;
  }
  return i;                                       // 닫는 `}` 바로 뒤
}

/* ★초기화 **호출**이 없어도 초기화 **데이터**가 있으면 초기화 함수로 본다.
 *
 *   function initMainSheet() {
 *     var initData = { "Cfg": {...}, "Cols": [...] };
 *     setDefaultConfig(mainSheet, initData);      // ← 래퍼가 **외부 공통 js** 에 있다
 *   }
 *
 *   본문에 `IBS_InitSheet` 도 `.SetConfig(` 도 없어서 강제 실행 대상에서 빠졌고,
 *   그 함수를 부르는 쪽도 외부라 **추출 0건**이 됐다(2026-08-12, 실제 고객 화면).
 *   래퍼 이름은 프로젝트마다 다르니 알 수 없다 — 대신 **데이터 모양**을 신호로 쓴다.
 *
 *   ★이 표시는 **강제 실행 대상 선정에만** 쓴다. 콜백 수확(harvestCallbacks)까지 넓히면
 *     예전 710건 폭증을 되풀이할 위험이 있다. 강제 실행 쪽은 시트별 중복 기록을 막는
 *     장치가 이미 있다.
 */
const INIT_DATA_MARK = /["']?Cols["']?\s*:\s*\[|["']?Cfg["']?\s*:\s*\{/;

function findInitFunctions(code) {
  const out = [];
  const seen = new Set();
  const pats = [
    // function f(...) {
    /(?<![\w$.])function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{/g,
    // var|let|const f = function (...) {
    /(?<![\w$.])(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*function\s*[\w$]*\s*\(([^)]*)\)\s*\{/g,
    // f = function (...) {   ·   obj.f = function (...) {
    /(?<![\w$])([A-Za-z_$][\w$.]*)\s*=\s*function\s*[\w$]*\s*\(([^)]*)\)\s*\{/g,
    // { f: function (...) {
    /(?<![\w$])([A-Za-z_$][\w$]*)\s*:\s*function\s*[\w$]*\s*\(([^)]*)\)\s*\{/g,
  ];
  for (const re of pats) {
    let m;
    while ((m = re.exec(code)) !== null) {
      const end = matchBrace(code, re.lastIndex);
      const body = code.slice(re.lastIndex, end - 1);
      if (!INIT_MARK.test(body) && !INIT_DATA_MARK.test(body)) continue;
      const name = m[1];
      /* ★v7 **이벤트 핸들러는 담지 않는다.** 이름 규약이 `<시트id>_On<이벤트>` 다.
       *   `lSheet_OnSearchEnd` 를 강제 실행했더니 조회 완료 시점에나 도는
       *   `SetSumValue` 같은 호출이 초기화로 기록됐다(실제로 4건 늘었다, 2026-08-12).
       *   초기화가 아니라 **실행 중 동작**이라 초기화 구조에 섞이면 안 된다.
       *   이벤트는 별도 규칙(`v7_event_handlers`)이 따로 안내한다. */
      if (/_On[A-Z]\w*$/.test(name)) continue;
      // 같은 함수가 여러 정규식에 걸릴 수 있다 — 시작 위치로 한 번만 담는다
      const key = name + "@" + m.index;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ name, params: m[2] || "", body });
    }
  }
  return out;
}

/* 전역으로 닿지 않는 초기화 함수를 **본문만 떼어** 샌드박스 안에서 만든다.
 *
 * 선언한 매개변수는 일부러 **버린다.** 우리는 인자 없이 부르므로 그대로 두면 `undefined`
 * 가 되어 `undefined.xxx` 같은 TypeError 로 죽는다. 매개변수를 없애면 그 이름이 전역 참조가
 * 되어 **자동 스텁이 받아 준다** — 초기화 구조를 읽어내는 것이 목적이므로 그 편이 낫다.
 */
function compileInSandbox(sandbox, body) {
  let ctx;
  try {
    ctx = vm.createContext(sandbox);
  } catch (_e) {
    return null;
  }
  try {
    return new vm.Script("(function(){" + body + "\n})").runInContext(ctx);
  } catch (_e) {
    return null;                      // 중괄호를 잘못 잘랐거나 문법이 안 맞는다
  }
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
  // 스텁이 받은 인자에서 초기화 콜백·초기화 객체를 거둔다 (flexStub 과 같은 규칙)
  const harvest = (args) => {
    try { harvestCallbacks(args); harvestInitHandoff(args); } catch (_e) { /* 무시 */ }
  };
  const jqObj = new Proxy(function () { return jqObj; }, {
    get(_t, p) {
      if (p === "ready") {
        return function (fn) { if (typeof fn === "function") deferred.push(fn); return jqObj; };
      }
      if (p === "toJSON" || p === "toString" || p === "valueOf") return () => "@@jQuery@@";
      if (typeof p === "symbol") return undefined;
      return function () { harvest(arguments); return jqObj; };
    },
    set() { return true; },
    has() { return true; },
    apply(_t, _this, args) { harvest(args); return jqObj; },
  });
  const jqFn = function (arg) {
    if (typeof arg === "function") deferred.push(arg);   // $(function(){...})
    return jqObj;
  };
  const known = {
    ready: function (fn) { if (typeof fn === "function") deferred.push(fn); return jqObj; },
    /* ★인자를 버리면 안 된다. `$.ajax({success: function(data){ … IBS_InitSheet(…) }})` 는
     *   아주 흔한 구조인데, 여기서 콜백을 수확하지 않아 **초기화가 통째로 비어 나왔다**
     *   (2026-08-12, 실제 고객 화면). flexStub 의 apply 와 같은 처리를 해 준다. */
    ajax: function () { harvest(arguments); return jqObj; },
    each: function () { harvest(arguments); return jqObj; },
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
    /* ★`eval(시트이름변수)` 는 v7 에서 흔한 관용구다 —
     *   `IBS_InitSheet(eval(fileSheetNm), initSheet)` 처럼 **시트 변수 이름을 문자열로 받아**
     *   실제 객체로 바꿔 쓴다. 이름이 스텁이면 `eval("@@fileSheetNm@@")` 이 되어
     *   `Invalid or unexpected token` 으로 죽고 초기화를 통째로 놓친다(`filegrid.js`).
     *   ①이미 아는 시트 이름이면 그 모의 시트를, ②스텁 표시가 섞였으면 스텁을 준다.
     *   그 밖에는 손대지 않는다(진짜 eval 이 필요한 코드를 망가뜨리지 않게). */
    eval: function (src) {
      const s = String(src);
      if (sheetNames.indexOf(s) >= 0 && sandbox[s]) return sandbox[s];
      if (s.indexOf("@@") >= 0) return flexStub(s.replace(/@@/g, ""));
      try {
        return vm.runInNewContext(s, {}, { timeout: 200 });
      } catch (_e) {
        return flexStub("eval");
      }
    },
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
    /* ★모달 팝업으로 값을 받는 화면이 많다 — `window.dialogArguments[2]` 처럼.
     *   `window` 는 샌드박스 자신이라 **없는 속성은 그냥 `undefined`** 가 되고
     *   (맨이름과 달리 ReferenceError 가 안 나서 자동 스텁도 못 받는다)
     *   `Cannot read properties of undefined` 로 죽어 초기화를 통째로 놓쳤다.
     *   새 코퍼스에서 `showModalDialog` 71화면 · `window.returnValue` 51화면으로 흔하다. */
    dialogArguments: flexStub("dialogArguments"),
    showModalDialog: flexStub("showModalDialog"),
    opener: flexStub("opener"),
    returnValue: "",
    JSON, Math, Date, parseInt, parseFloat, isNaN, String, Number, Boolean,
    Array, Object, RegExp, encodeURIComponent, decodeURIComponent,
  };
  CALLBACK_SINK = deferred;
  INIT_SINK = record;      // 스텁이 받은 콜백을 여기 모은다 (harvestCallbacks 주석 참고)
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
// 강제 실행 횟수 상한 — 초기화 함수가 비정상적으로 많은 파일에서 멈추지 않게 한다
const FORCE_LIMIT = 40;

function callWithAutoStub(fn, sandbox, record) {
  const seen = new Map();
  const mark = record.calls.length;
  let ctx;
  try {
    ctx = vm.createContext(sandbox);          // 이미 contextify 된 객체면 그 컨텍스트를 준다
  } catch (_e) {
    ctx = null;
  }
  /* ★선언된 **매개변수 자리에 스텁을 넣어** 부른다.
   *
   *   `success: function(data) { … for (var i=0;i<data.DATA.length;i++){…} … IBS_InitSheet(…) }`
   *   처럼 콜백이 인자를 쓰는 구조가 흔하다. 인자 없이 부르면 `data` 가 `undefined` 라
   *   `data.DATA` 에서 죽고, **그 뒤에 있는 초기화 호출에 닿지 못한다.**
   *   실제 고객 화면에서 초기화가 통째로 비어 나왔다(2026-08-12).
   *   스텁을 넣으면 `data.DATA.length` 가 스텁이 되어 비교가 거짓이 되고 루프를 건너뛴 뒤
   *   초기화까지 진행된다 — 서버 데이터로 **덧붙이던 컬럼**은 못 얻지만 골격은 얻는다.
   */
  const nArgs = Math.min(typeof fn.length === "number" ? fn.length : 0, 8);
  const stubArgs = [];
  for (let k = 0; k < nArgs; k++) stubArgs.push(flexStub("arg" + k));
  sandbox.__ibs_args__ = stubArgs;
  const script = ctx
    ? new vm.Script("__ibs_deferred__.apply(this, __ibs_args__)")
    : null;
  for (let i = 0; i < 60; i++) {
    try {
      if (script) {
        sandbox.__ibs_deferred__ = fn;
        script.runInContext(ctx, { timeout: CALL_TIMEOUT_MS });
      } else {
        fn.apply(sandbox, stubArgs);
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
/* 오류가 난 **원본 줄**을 찾는다.
 *
 * ★실행 실패 14건을 파 보니 절반이 **고객 코드 자체의 구문 오류**였다 —
 *   `", "FontColor": "`(따옴표 중첩) · 열 정의 사이 쉼표 누락 · `</script>` 를 `/script>` 로
 *   쓴 오타. 브라우저에서도 안 되는 코드다. 그런데 우리는 `Unexpected identifier` 만 찍어
 *   **받는 쪽에서 우리 도구를 의심하며 찾아 헤매게** 했다. 위치를 짚어 주면 바로 끝난다.
 *   (전처리가 줄 번호를 보존하므로 이 번호는 **원본 파일의 줄 번호**다 — collectScripts 주석)
 */
function errorSite(e, code) {
  const st = String((e && e.stack) || "");
  const m = /^init\.js:(\d+)/.exec(st) ||            // 구문 오류(vm.Script 생성 시)
            /\bat init\.js:(\d+):(\d+)/.exec(st) ||  // 실행 중 오류
            /\binit\.js:(\d+):(\d+)/.exec(st);
  if (!m) return null;
  const line = +m[1];
  const text = (code.split("\n")[line - 1] || "").trim();
  /* ★**구문 오류와 실행 중 오류를 구분해야 한다.** 둘의 원인이 정반대다 —
   *   구문 오류는 고객 코드가 깨진 것(브라우저에서도 안 된다)이고,
   *   실행 중 오류는 대개 **브라우저에는 있는데 샌드박스에 없는 것**(다른 파일이 확장한
   *   메서드, ASP.NET `Sys` 같은 전역 프레임워크)이라 화면 자체는 멀쩡하다.
   *   구분하지 않고 "문법이 깨졌다" 고 안내하면 멀쩡한 화면을 고치라고 하는 셈이다. */
  const kind = (e && e.name === "SyntaxError") ? "syntax" : "runtime";
  return { line, col: m[2] ? +m[2] : null, text: text.slice(0, 200), kind };
}

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
        return { ok: false, error: String(e && e.message || e), retries: i, sandbox: sandbox,
                 site: errorSite(e, code) };
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

  const raw = readSource(file);
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
  let forcedRuns = 0;
  for (const f of findInitFunctions(code)) {
    if (forcedRuns >= FORCE_LIMIT) break;   // 병적인 파일에서 끝없이 돌지 않게
    // 이 함수가 다루는 시트 중 아직 초기화가 기록되지 않은 것이 있나
    const targets = sheetNames.filter((n) =>
      new RegExp("\\b" + n.replace(/\$/g, "\\$") + "\\b").test(f.body));
    const done = new Set(record.calls.map((c) => c.sheet).filter(Boolean));
    if (targets.length && targets.every((n) => done.has(n))) continue;
    if (!targets.length && record.calls.length) continue;
    // ★전역으로 닿으면 그것을 부르고, 아니면(중첩·함수표현식) 본문을 떼어 만들어 부른다
    const global = typeof sandbox[f.name] === "function" ? sandbox[f.name] : null;
    const fn = global || compileInSandbox(sandbox, f.body);
    if (typeof fn !== "function") continue;
    forcedRuns++;
    const before = record.calls.length;
    let err = callWithAutoStub(fn, sandbox, record);
    /* ★전역 함수를 **인자 없이** 부르면 매개변수가 `undefined` 라 죽는 것이 있다.
     *   `createFileGrid(filegridId, fileSheetNm, …)` 처럼 **시트 이름을 인자로 받아**
     *   쓰는 구조가 실제로 있었다(`undefined.SetTheme` 로 실패).
     *   이때는 본문만 떼어 다시 부른다 — 매개변수가 전역 참조가 되어 자동 스텁이 받는다.
     *   시트 이름은 호출자(다른 파일)에 있어 모르지만, **초기화 구조는 뽑을 수 있다.** */
    /* ★조건에서 `err` 를 빼야 한다 — **오류가 나지 않아도** 기록이 0이면 다시 해야 한다.
     *   매개변수 자리에 스텁을 넣게 되면서(위 참고) `sheetObject.SetConfig(cfg)` 가
     *   **스텁 위에서 조용히 성공**해 아무 것도 기록되지 않는데 오류도 안 난다.
     *   그래서 이 폴백이 발동하지 않아 멀쩡하던 화면 3개가 11건 → 0건이 됐다(2026-08-12).
     *   매개변수를 버리고 본문만 돌리면 그 이름이 **전역의 모의 시트**로 해석된다. */
    if (global && f.params.trim() && record.calls.length === before) {
      const bodyFn = compileInSandbox(sandbox, f.body);
      if (typeof bodyFn === "function") err = callWithAutoStub(bodyFn, sandbox, record);
    }
    if (record.calls.length > before) forcedInit.push(f.name);
    else if (err) deferredErrors.push(f.name + ": " + err);
  }

  /* ★"초기화가 파일에 있는데 실행 경로에 못 닿았다" 는 판정을 **여기서** 낸다.
   *   init_convert.py 가 원본을 다시 정규식으로 훑고 있었는데, 그쪽은 JS 주석만 지우고
   *   **HTML 주석은 못 봤다** — `<!--script> IBS_InitSheet(…) </script-->` 로 꺼 둔 화면에
   *   "초기화가 있는데 못 닿았다" 는 엉뚱한 안내가 나간다(2026-08-13).
   *   전처리(prepare)가 이미 죽은 구간을 지웠으니 그 결과로 판정하면 정확하고,
   *   판정 기준(INIT_MARK)도 한 곳에만 남는다. */
  const liveCode = code.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  // v3 초기화를 몇 번 쓰는지 — **변환 대상이 아님**을 알리는 근거다 (V3_INIT 주석)
  const v3Init = {};
  for (const m of liveCode.matchAll(V3_INIT)) {
    v3Init[m[1]] = (v3Init[m[1]] || 0) + 1;
  }
  const out = {
    file: path.resolve(file),
    sheetNames,
    initInSource: INIT_MARK.test(liveCode),
    v3Init,
    ok: result.ok,
    error: result.error || null,
    errorSite: result.site || null,
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
    if (out.errorSite) {
      console.log("          " + out.file.replace(/^.*[\\/]/, "") + ":" + out.errorSite.line +
                  "  " + out.errorSite.text);
    }
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
