#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
migrate_core.py — IBSheet7→8 결정론적 변환 엔진 (프로젝트 무관)

역할:
  1) safe_method_renames : 1:1 동일 시그니처 메서드 자동 치환 (.GetTotalRows( -> .getTotalRowCount()
  2) value_transforms    : Col/Cfg 속성값 자동 변환 (SaveName->Name, SearchMode:2->0 등)
  3) flag_for_review     : 시맨틱 변경이 필요한 호출은 '치환하지 않고' 위치/사유만 리포트
                           -> Claude(판단 레이어)가 knowledge/ 매뉴얼을 보고 직접 변환

자동 변환은 안전한 것만, 위험한 것은 사람/LLM에게 넘긴다 = 신뢰성의 핵심.

사용법:
  python migrate_core.py <input.jsp|js> [--out OUT] [--report report.json] [--dry-run]
  --out 생략 시 입력파일 옆에 <name>.tobe.<ext> 생성 (원본 보존)
  --report 생략 시 stdout 에 요약 출력
"""
import argparse, json, os, re, sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
RULES_PATH = os.path.join(SCRIPT_DIR, "rules", "migrate_rules.json")


def load_rules():
    with open(RULES_PATH, encoding="utf-8") as f:
        return json.load(f)


def strip_comments_for_scan(text):
    """flag 탐지용: 주석 영역을 공백으로 치환(길이/줄수 보존)해 주석 내부 코드를 오탐하지 않음."""
    def blank(m):
        return re.sub(r"[^\n]", " ", m.group(0))
    # /* ... */  블록주석
    text = re.sub(r"/\*.*?\*/", blank, text, flags=re.S)
    # // ... 라인주석 (URL의 // 보호: 앞이 : 면 스킵)
    text = re.sub(r"(?<!:)//[^\n]*", blank, text)
    return text


def line_of(text, idx):
    return text.count("\n", 0, idx) + 1


def apply_safe_renames(text, renames):
    count = 0
    details = {}
    for src, dst in renames.items():
        if src.startswith("_"):
            continue
        pat = re.compile(r"\.%s\s*\(" % re.escape(src))
        text, n = pat.subn("." + dst + "(", text)
        if n:
            count += n
            details[src + " -> " + dst] = n
    return text, count, details


def apply_value_transforms(text, transforms):
    count = 0
    details = {}
    for rule in transforms:
        if rule.get("id", "").startswith("_"):
            continue
        # 주석 전용 항목처럼 pattern/replacement 가 없는 엔트리는 건너뛴다(규칙 파일 편집 사고 방어)
        if "pattern" not in rule or "replacement" not in rule:
            continue
        text, n = re.subn(rule["pattern"], rule["replacement"], text)
        if n:
            count += n
            details[rule["id"]] = n
    return text, count, details


# ---------------------------------------------------------------------------
# 프로젝트 컨벤션(migrate.config.json) 기반 접두사 처리
#
# IBSheet8 컬럼 Name 에는 `xxxDTOList.` 같은 리스트/시트 변수 접두사가 들어갈 수 없다.
# 다만 "컬럼 참조 자리"만 골라 떼야 하고, 폼 필드·팝업 매핑(keepPrefixes)은 건드리면 안 된다.
# 그래서 아래 두 위치 - 문자열 리터럴이고 컬럼 자리가 확실한 곳 - 만 자동 처리하고,
# 나머지 등장(런타임 문자열 조립 등)은 flag 로 넘겨 사람/AI 가 판단한다.
#   1) Col 정의의 Name: "<접두사>col"      (SaveName -> Name 치환 이후 형태)
#   2) 컬럼 인자를 받는 메서드의 문자열 리터럴 인자
# ---------------------------------------------------------------------------

CONFIG_NAMES = ("migrate.config.json", "ibsheet8-migrate.config.json")

# 컬럼 이름을 인자로 받는 메서드 (공식 + 브릿지). 첫 인자가 row 인 것과 col 만 받는 것 모두.
COL_ARG_METHODS = (
    "getValue", "setValue", "getValue2", "setValue2",
    "getString", "setString", "getAttribute", "setAttribute", "setAttribute2",
    "getColIndex", "getColIndex7", "getColByIndex", "getColByIndex7",
    "hideCol", "showCol", "removeCol", "doSort", "setFilter",
)


def load_config(start_dir):
    """입력 파일 위치에서 위로 올라가며 config 를 찾는다. 없으면 None."""
    d = os.path.abspath(start_dir)
    while True:
        for name in CONFIG_NAMES:
            p = os.path.join(d, name)
            if os.path.exists(p):
                try:
                    with open(p, encoding="utf-8-sig") as f:
                        cfg = json.load(f)
                    cfg["_path"] = p
                    return cfg
                except (OSError, ValueError):
                    return None
        parent = os.path.dirname(d)
        if parent == d:
            return None
        d = parent


def _compile_prefixes(items):
    out = []
    for pat in items or []:
        if not isinstance(pat, str) or pat.startswith("_"):
            continue
        try:
            out.append((pat, re.compile(pat)))
        except re.error:
            continue
    return out


def _match_bracket(text, i):
    """text[i] 가 여는 괄호일 때 짝이 되는 닫는 위치를 돌려준다. 못 찾으면 -1.

    문자열·주석 안의 괄호는 세지 않는다 — 옵션 값에 `"{"` 같은 문자가 들어간다.
    """
    pairs = {"{": "}", "[": "]", "(": ")"}
    if text[i] not in pairs:
        return -1
    stack = [text[i]]
    j = i + 1
    n = len(text)
    while j < n and stack:
        ch = text[j]
        if ch in "\"'`":
            q = ch
            j += 1
            while j < n:
                if text[j] == "\\":
                    j += 2
                    continue
                if text[j] == q:
                    break
                j += 1
        elif ch == "/" and j + 1 < n and text[j + 1] == "/":
            while j < n and text[j] != "\n":
                j += 1
        elif ch == "/" and j + 1 < n and text[j + 1] == "*":
            k = text.find("*/", j + 2)
            j = n if k < 0 else k + 1
        elif ch in pairs:
            stack.append(ch)
        elif ch in ("}", "]", ")"):
            if not stack or pairs[stack[-1]] != ch:
                return -1
            stack.pop()
        j += 1
    return j - 1 if not stack else -1


def detect_event_handlers(text, table):
    """v7 이벤트 핸들러 정의를 찾아 v8 로 옮길 방법을 알린다.

    ★왜 별도 패스인가: v7 이벤트는 **함수명 규약**으로 등록된다 —
      `function <시트id>_OnSearchEnd(Code, Msg) { }`. 메서드 호출이 아니라서
      `\\.Method\\(` 형태의 규칙이 전혀 잡지 못했다. 고객 화면 219개·핸들러 670개가
      **변환도 안 되고 플래그도 안 뜨는** 상태였다(2026-08-06 전수 조사).

    ★자동 변환하지 않는다: 함수를 초기화 `Events` 객체 안으로 옮기고 인자 리스트를
      `evtParam` 하나로 바꾸는 것은 구조 변경이다. 위치와 방법만 정확히 알려준다.
    """
    events = {k: v for k, v in (table or {}).items()
              if not k.startswith("_") and isinstance(v, dict)}
    if not events:
        return []
    found = []
    lines = text.splitlines()
    # function <이름>_On<이벤트>( ... )  — v7 규약
    pat = re.compile(r"function\s+([A-Za-z_$][\w$]*)_(On[A-Za-z]\w*)\s*\(([^)]*)\)")
    for m in pat.finditer(text):
        ev = m.group(2)
        info = events.get(ev)
        if not info:
            continue
        args = [a.strip() for a in m.group(3).split(",") if a.strip()]
        v8 = info["v8"]
        v8s = "/".join(v8) if isinstance(v8, list) else v8
        parts = ["v7 이벤트 핸들러 `%s_%s(%s)` → v8 `%s`."
                 % (m.group(1), ev, ", ".join(args), v8s),
                 "**함수명 규약으로 등록하던 것을 초기화 `Events` 객체로 옮기고**, "
                 "인자는 `evtParam` 객체 하나로 받는다 — "
                 "`options.Events = { %s: function(evtParam) { ... } }`." % (
                     v8[0] if isinstance(v8, list) else v8)]
        amap = info.get("args") or {}
        hit = [(a, amap[a]) for a in args if a in amap]
        if hit:
            parts.append("인자 대응: " + " · ".join("`%s`→`evtParam.%s`" % (a, b)
                                                for a, b in hit) + ".")
        unk = [a for a in args if a not in amap]
        if unk:
            parts.append("★대응을 찾지 못한 인자: %s — 그대로 쓰면 **오류 없이 undefined** 다."
                         % ", ".join("`%s`" % a for a in unk))
        if info.get("note"):
            parts.append(info["note"])
        ln = text.count("\n", 0, m.start()) + 1
        found.append({
            "rule": "EVENT_HANDLER_" + ev.upper(),
            "line": ln,
            "desc": " ".join(parts),
            "code": (lines[ln - 1].strip()[:200] if 0 < ln <= len(lines) else ""),
        })
    return found


def detect_unsupported_options(text, table, unsupported):
    """v8 이 **지원하지 않는** 옵션이 인자 객체에 있으면 알린다 (고치지 않는다).

    이름을 바꿔 봐야 대응이 없다 — 기능을 다른 방법으로 만들거나 포기해야 하므로
    사람이 판단해야 한다. 범위는 `apply_option_keys` 와 같다(호출의 인자 객체 안).
    """
    methods = {k: v for k, v in (unsupported or {}).items()
               if not k.startswith("_") and isinstance(v, dict)}
    if not methods:
        return []
    found = []
    lines = text.splitlines()
    call = re.compile(r"\.\s*(%s)\s*\(" % "|".join(
        sorted((re.escape(m) for m in methods), key=len, reverse=True)))
    for m in call.finditer(text):
        meth = m.group(1)
        j = m.end()
        while j < len(text) and text[j] in " \t\r\n":
            j += 1
        if j >= len(text) or text[j] not in "{[":
            continue
        end = _match_bracket(text, j)
        if end <= j:
            continue
        seg = text[j:end + 1]
        for opt, why in methods[meth].items():
            mm = re.search(r"(?<![\w$])([\"']?)%s\1(\s*:)" % re.escape(opt), seg)
            if not mm:
                continue
            ln = text.count("\n", 0, j + mm.start()) + 1
            found.append({
                "rule": "OPTION_UNSUPPORTED",
                "line": ln,
                "desc": "`%s(...)` 의 `%s` — %s" % (meth, opt, why),
                "code": (lines[ln - 1].strip()[:200] if 0 < ln <= len(lines) else ""),
            })
    return found


def apply_option_keys(text, table):
    """메서드 **인자 객체 안의 옵션 키**를 v8 camelCase 로 바꾼다.

    ★왜 범위를 좁히나: `Sort`·`Mode`·`Col`·`Param` 처럼 **초기화 속성과 이름이 겹치는**
      옵션이 있다. 파일 전체에서 치환하면 초기화 구조가 깨진다. 그래서 해당 호출의
      인자 객체(`{...}` 또는 `[{...}]`) **안에서만** 바꾼다.

    ★인자가 변수 참조(`var p={...}; sheet.down2Excel(p)`)면 범위를 알 수 없다.
      바꾸지 않고 `OPTION_KEYS_INDIRECT` 로 보고한다(고객 코드의 약 20%).

    표는 규칙 파일의 `method_option_keys` 가 원본이다. 키는 **v8 메서드 이름** 기준이며
    이 함수는 safe_method_renames 뒤에 돌아야 한다.
    """
    table = table or {}
    methods = {k: v for k, v in table.items()
               if not k.startswith("_") and isinstance(v, dict)}
    if not methods:
        return text, 0, {}, []
    # 인자가 변수일 때 "옵션을 못 바꿨다" 고 알릴 메서드 — **첫 인자가 옵션 객체인 것만.**
    #   `doSave(url, ...)`·`loadSearchData(data, ...)` 는 첫 인자가 URL·데이터라
    #   변수여도 옵션이 아니다. 넣으면 오탐이 된다(고객 화면 전수에서 확인).
    opt_first = set(table.get("_options_first_arg") or methods.keys())
    count = 0
    details = {}
    indirect = []
    # 앞의 `.` 자체가 경계다. 여기에 `(?<![\w$])` 를 붙이면 `mySheet.down2Excel(` 처럼
    # **점 앞이 단어 문자인 정상 호출이 전부 빠진다**(실제로 그렇게 만들어 0건이 나왔다).
    call = re.compile(r"\.\s*(%s)\s*\(" % "|".join(
        sorted((re.escape(m) for m in methods), key=len, reverse=True)))

    pos = 0
    out = []
    while True:
        m = call.search(text, pos)
        if not m:
            out.append(text[pos:])
            break
        out.append(text[pos:m.end()])
        meth = m.group(1)
        j = m.end()
        while j < len(text) and text[j] in " \t\r\n":
            j += 1
        if j < len(text) and text[j] in "{[":
            end = _match_bracket(text, j)
            if end > j:
                seg = text[j:end + 1]
                for old, new in methods[meth].items():
                    seg, n = re.subn(
                        r"(?<![\w$])([\"']?)%s\1(\s*:)" % re.escape(old),
                        lambda mm, nn=new: "%s%s%s%s" % (mm.group(1), nn, mm.group(1),
                                                         mm.group(2)),
                        seg)
                    if n:
                        count += n
                        details["%s.%s -> %s" % (meth, old, new)] = \
                            details.get("%s.%s -> %s" % (meth, old, new), 0) + n
                out.append(text[m.end():j] + seg)
                pos = end + 1
                continue
        elif (meth in opt_first and j < len(text)
              and re.match(r"[A-Za-z_$][\w$]*\s*\)", text[j:])):
            # ★인자가 **변수 하나뿐**일 때만 옵션 객체로 본다.
            #   `[,)]` 로 두면 `doSearch(url, param, opt)` 처럼 **위치 인자**까지 잡혀
            #   고객 화면 전수에서 503건이 나왔다(대부분 옵션 객체가 아니다).
            indirect.append((meth, text.count("\n", 0, m.start()) + 1))
        pos = m.end()
    return "".join(out), count, details, indirect


def apply_prefix_strips(text, cfg):
    """컬럼 참조 자리의 stripPrefixes 를 제거한다. keepPrefixes 는 보존.

    returns (text, count, detail, skipped_keep)
    """
    if not cfg:
        return text, 0, {}, 0
    strips = _compile_prefixes(cfg.get("stripPrefixes"))
    keeps = _compile_prefixes(cfg.get("keepPrefixes"))
    if not strips:
        return text, 0, {}, 0

    detail = {}
    skipped = [0]

    def strip_literal(quote, value, where):
        """문자열 리터럴 값에서 접두사 하나를 떼거나 그대로 반환."""
        for kp, krx in keeps:
            if krx.match(value):
                skipped[0] += 1
                return None  # keepPrefixes -> 손대지 않는다
        for sp, srx in strips:
            m = srx.match(value)
            if m and m.end() < len(value):
                key = "%s (%s)" % (sp, where)
                detail[key] = detail.get(key, 0) + 1
                return value[m.end():]
        return None

    # 1) Col 정의의 Name: "<접두사>col"
    def repl_name(m):
        q, val = m.group(2), m.group(3)
        new = strip_literal(q, val, "Col.Name")
        return m.group(0) if new is None else "%s%s%s%s%s" % (m.group(1), q, new, q, m.group(4))

    text = re.sub(r'(["\']?Name["\']?\s*:\s*)(["\'])([^"\']+)\2(\s*[,}\]])',
                  repl_name, text)

    # 2) 컬럼 인자를 받는 메서드의 문자열 리터럴 인자
    meth = "|".join(re.escape(m) for m in COL_ARG_METHODS)

    def repl_arg(m):
        q, val = m.group(2), m.group(3)
        new = strip_literal(q, val, "메서드 인자")
        return m.group(0) if new is None else "%s%s%s%s" % (m.group(1), q, new, q)

    text = re.sub(r'(\.(?:%s)\s*\([^()"\']*)(["\'])([^"\']+)\2' % meth, repl_arg, text)

    return text, sum(detail.values()), detail, skipped[0]


STRING_LITERAL = re.compile(r"(['\"])((?:\\.|(?!\1)[^\\\n])*)\1")


def detect_prefix_residue(text, cfg):
    """자동 처리 범위를 벗어난 접두사 등장을 검토 항목으로 수집한다.

    ★문자열 리터럴 안만 본다. stripPrefixes 에는 `\\w+Sheet\\.` 처럼 시트 변수
    이름과 겹치는 패턴이 흔한데, 코드 전체를 스캔하면 `mySheet.getValue2(` 같은
    정상 메서드 호출을 전부 오탐한다.
    """
    if not cfg:
        return []
    strips = _compile_prefixes(cfg.get("stripPrefixes"))
    keeps = _compile_prefixes(cfg.get("keepPrefixes"))
    if not strips:
        return []
    scan = strip_comments_for_scan(text)
    lines = text.splitlines()
    found = []
    seen = set()
    for lit in STRING_LITERAL.finditer(scan):
        value = lit.group(2)
        if any(krx.match(value) for _, krx in keeps):
            continue
        for pat, rx in strips:
            if not rx.match(value):
                continue
            ln = line_of(scan, lit.start())
            if (ln, pat) in seen:
                continue
            seen.add((ln, pat))
            code = lines[ln - 1].strip() if ln - 1 < len(lines) else ""
            found.append({
                "rule": "CONFIG_PREFIX_RESIDUE",
                "line": ln,
                "desc": ("config stripPrefixes '%s' 가 문자열 리터럴에 남아 있다. 컬럼 참조 자리"
                         "(Col.Name, 컬럼 인자 리터럴)는 자동 제거됐으므로, 여기 남은 것은 런타임 "
                         "문자열 조립이거나 컬럼이 아닌 참조다. 컬럼 참조라면 접두사를 떼고, "
                         "폼 필드/팝업 매핑이면 그대로 둔다(keepPrefixes 대상인지 확인)." % pat),
                "code": code[:200],
            })
            break
    return found


def detect_flags(text, flags):
    """치환 후 텍스트(주석 제거본)에서 검토 대상 패턴 위치를 수집.

    GENERIC_* 규칙은 **fallback** 이다 - 다른(구체적인) 규칙이 이미 잡은 줄은 보고하지 않는다.
    ★2패스로 처리한다. 한 패스에서 seen 을 채우며 판단하면 **규칙 파일의 순서에 결과가 의존**하고,
    구체 규칙을 GENERIC 뒤에 추가하는 순간 중복이 새어나온다(실제로 그렇게 새어나온 적이 있다).
    """
    scan = strip_comments_for_scan(text)
    lines = text.splitlines()

    def snippet_of(ln):
        return lines[ln - 1].strip()[:200] if 0 < ln <= len(lines) else ""

    def matches(rule):
        out = []
        for m in re.finditer(rule["pattern"], scan):
            out.append(line_of(scan, m.start()))
        return out

    usable = [r for r in flags
              if not r.get("id", "").startswith("_") and "pattern" in r]
    specific = [r for r in usable if not r.get("id", "").startswith("GENERIC")]
    generic = [r for r in usable if r.get("id", "").startswith("GENERIC")]

    found, covered = [], set()
    for rule in specific:
        for ln in matches(rule):
            found.append({"rule": rule["id"], "line": ln,
                          "desc": rule["desc"], "code": snippet_of(ln)})
            covered.add(ln)
    for rule in generic:
        seen = set()
        for ln in matches(rule):
            if ln in covered or ln in seen:
                continue
            seen.add(ln)
            found.append({"rule": rule["id"], "line": ln,
                          "desc": rule["desc"], "code": snippet_of(ln)})

    found.sort(key=lambda x: (x["line"], x["rule"]))
    return found


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("--out")
    ap.add_argument("--report")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--config", help="migrate.config.json 경로 (생략 시 입력 파일 위치에서 상위로 탐색)")
    ap.add_argument("--no-config", action="store_true", help="config 를 사용하지 않는다")
    args = ap.parse_args()

    rules = load_rules()
    with open(args.input, encoding="utf-8-sig") as f:
        original = f.read()

    # 프로젝트 컨벤션 로드
    cfg = None
    if not args.no_config:
        if args.config:
            try:
                with open(args.config, encoding="utf-8-sig") as f:
                    cfg = json.load(f)
                cfg["_path"] = args.config
            except (OSError, ValueError) as e:
                print("  [경고] config 를 읽지 못했습니다: %s (%s)" % (args.config, e))
        else:
            cfg = load_config(os.path.dirname(os.path.abspath(args.input)))

    text = original
    text, safe_n, safe_d = apply_safe_renames(text, rules["safe_method_renames"])
    text, val_n, val_d = apply_value_transforms(text, rules["value_transforms"])
    # ★ safe_method_renames 뒤에 와야 한다 — 표가 v8 메서드 이름 기준이다
    text, opt_n, opt_d, opt_indirect = apply_option_keys(
        text, rules.get("method_option_keys"))
    text, pre_n, pre_d, pre_kept = apply_prefix_strips(text, cfg)
    flags = detect_flags(text, rules["flag_for_review"])
    flags += detect_prefix_residue(text, cfg)
    # ★미지원 옵션은 **치환 전 이름**으로 찾아야 한다 — 위 apply_option_keys 가 이미
    #   돌았지만 미지원 옵션은 표에 없어 v7 이름 그대로 남아 있다.
    flags += detect_unsupported_options(text, rules.get("method_option_keys"),
                                        rules.get("method_option_unsupported"))
    flags += detect_event_handlers(text, rules.get("v7_event_handlers"))
    lines_all = text.splitlines()
    for meth, line in opt_indirect:
        flags.append({
            "rule": "OPTION_KEYS_INDIRECT",
            "line": line,
            "desc": ("`%s(...)` 의 인자가 **변수라 옵션 키를 자동으로 바꾸지 못했다.** "
                     "IBSheet8 은 메서드 옵션 키가 **camelCase** 다(`FileName`→`fileName`). "
                     "변수에 담긴 객체의 키를 직접 바꿀 것 — 그대로 두면 v8 이 "
                     "**오류 없이 전부 무시**해 파일명·시트명·디자인·합계가 사라진다." % meth),
            "code": (lines_all[line - 1].strip()[:200] if 0 < line <= len(lines_all) else ""),
        })
    flags.sort(key=lambda x: x["line"])

    if not args.dry_run:
        if args.out:
            out = args.out
        else:
            root, ext = os.path.splitext(args.input)
            out = root + ".tobe" + ext
        with open(out, "w", encoding="utf-8") as f:
            f.write(text)
    else:
        out = None

    report = {
        "input": args.input,
        "output": out,
        "config": (cfg or {}).get("_path"),
        "auto_applied": {
            "safe_method_renames": {"total": safe_n, "detail": safe_d},
            "value_transforms": {"total": val_n, "detail": val_d},
            "method_option_keys": {"total": opt_n, "detail": opt_d,
                                   "indirect": len(opt_indirect)},
            "prefix_strips": {"total": pre_n, "detail": pre_d, "kept_by_config": pre_kept},
        },
        "needs_review": {
            "total": len(flags),
            "items": flags,
        },
    }

    if args.report:
        with open(args.report, "w", encoding="utf-8") as f:
            json.dump(report, f, ensure_ascii=False, indent=2)

    # stdout 요약
    print("[migrate_core] %s" % args.input)
    if cfg:
        print("  config: %s" % cfg.get("_path"))
    print("  자동 변환: 메서드 %d건, 속성 %d건, 옵션키 %d건, 접두사 %d건"
          % (safe_n, val_n, opt_n, pre_n))
    if pre_kept:
        print("  config keepPrefixes 로 보존: %d건" % pre_kept)
    print("  검토 필요(Claude 판단): %d건" % len(flags))
    for it in flags[:50]:
        print("   L%-5d %-26s %s" % (it["line"], it["rule"], it["code"][:80]))
    if len(flags) > 50:
        print("   ... +%d건 (report 참조)" % (len(flags) - 50))
    if out:
        print("  출력: %s" % out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
