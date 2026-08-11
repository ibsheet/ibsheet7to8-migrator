#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""init_extract.js 가 뽑아낸 v7 초기화 구조를 v8 `IBSheet.create` 옵션으로 바꾼다.

역할 분담
  - `engine/init_extract.js` (Node) : v7 코드를 **실행해서** 구조만 뽑는다. 변환하지 않는다.
  - 이 파일 (Python)                : 뽑힌 구조에 **기존 규칙을 적용**해 v8 옵션을 만든다.

왜 이렇게 나눴나
  v7 초기화는 데이터(객체)라서 실행해서 읽는 쪽이 정확하지만, v7→v8 매핑을 JS 쪽에도
  두면 규칙이 두 곳으로 갈라진다. 규칙은 `engine/rules/migrate_rules.json` **한 곳**에만 둔다.

한계 (그대로 출력하고 사람에게 넘긴다)
  - 판단이 필요한 항목(값 반전·레벨 이동·구조 분리)은 자동으로 옮기지 않고 `TODO` 로 남긴다.
  - `@@이름@@` 자리표시자는 원래 식별자로 되살린다. v7 전역 상수면 숫자로 바꾼다.
"""
import argparse
import difflib
import io
import json
import os
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
sys.stderr.reconfigure(encoding="utf-8", errors="replace")

HERE = os.path.dirname(os.path.abspath(__file__))
RULES = os.path.join(HERE, "rules", "migrate_rules.json")
EXTRACT = os.path.join(HERE, "init_extract.js")

MARK = re.compile(r"^@@(.+)@@$")

def _load_v7_constants():
    """v7 전역 상수 표. **원본은 규칙 파일의 `v7_constants`** 한 곳이다.

    예전엔 이 파일에 사본을 두었다. 같은 표가 규칙 패턴(V7CONST_*)·이 파일·
    `init_extract.js` 세 곳에 생기면 한 곳만 고치는 사고가 난다.
    규칙 패턴과 이 블록이 일치하는지는 `migrate.py rules` 가 확인한다.
    """
    try:
        c = json.load(open(RULES, encoding="utf-8")).get("v7_constants", {})
    except (OSError, ValueError):
        return {}
    return {k: v for k, v in c.items()
            if not k.startswith("_") and isinstance(v, int) and not isinstance(v, bool)}


V7CONST = _load_v7_constants()

# v7 MergeSheet → (HeaderMerge, DataMerge, PrevColumnMerge)  ★벤더 확정표
MERGESHEET = {
    0: (0, 0, 0), 1: (5, 5, 3), 2: (0, 1, 3), 3: (0, 1, 3),
    4: (0, 1, 3), 5: (1, 0, 2), 7: (1, 1, 3), 8: (1, 1, 3), 9: (1, 1, 3),
}

# v7 HeaderMode → v8 Cfg
#   HeaderCheck: 근거 v8 `props/cfg/header-check.md` · v7 `funcs/init/InitHeaders.md`.
#   ★default 가 뒤집힌다 — v7 은 1(표시), v8 은 0(표시 안 함). 아래 note 참고.
HEADERMODE = {"Sort": "CanSort", "ColMove": "CanColMove", "ColResize": "CanColResize",
              "HeaderCheck": "HeaderCheck"}


MANUAL8 = os.path.join(os.path.dirname(HERE), "docs", "ibsheet8-manual")
MANUAL7 = os.path.join(os.path.dirname(HERE), "docs", "ibsheet7-manual")
_V8_CACHE = {}
_V7_CACHE = {}

# 이름은 같은데 **구조가 달라지는** 것 — "v8 에 없다"로 보고하면 오해를 준다.
#   근거는 docs/property-mapping.md 의 해당 절.
STRUCT_MOVE = {
    "ComboText": "`Enum` (컬럼 속성). ★값 앞에 구분자 `|` 를 붙인다 — "
                 "`Enum: \"|항목1|항목2\"`. `SetColProperty` 로 넣던 것도 초기화로 옮긴다",
    "ComboCode": "`EnumKeys` (컬럼 속성). ★값 앞에 구분자 `|` 를 붙인다",
    "CountPosition": "`InfoRowConfig` **객체 안으로 이동**한다(평평한 Cfg 키가 아니다) — "
                     "`property-mapping.md` 「InfoRowConfig 변환 예제」 참고",
    "CountFormat": "`InfoRowConfig.Format` **객체 안으로 이동**한다",
}


def v8_names():
    """v8 매뉴얼에서 API 이름을 모은다 → (H1 로 정의된 것, 본문에 언급된 것)

    ★왜 필요한가: 모르는 v7 속성이 **그대로 v8 옵션에 실려 나가고 있었다.**
    오류도 안 나고 무시되므로(예: `DataRowMerge`·`PointCount`) 화면만 조용히 달라진다.
    이름을 아는 것과 모르는 것으로 갈라 두면 새로운 속성이 나올 때마다 걸린다.

    ★두 단계로 나눈 이유: H1 에 없어도 **다른 페이지 본문에만 설명된 속성이 있다**
    (`ColPage`·`ExcludeEmpty` 를 "v8 에 없음" 으로 오판한 적이 있다). 본문에만 있으면
    "없음" 이 아니라 "확인 필요" 로 낮춰 보고한다.
    """
    if _V8_CACHE:
        return _V8_CACHE["defined"], _V8_CACHE["mentioned"]
    defined, mentioned = {}, set()
    h1 = re.compile(r"^#\s*!?([A-Za-z][\w.]*)\s*\*\*\*\((\w+)\)\*\*\*", re.M)
    word = re.compile(r"\b([A-Z][A-Za-z0-9]{2,})\b")
    for dirpath, _d, files in os.walk(MANUAL8):
        for fn in files:
            if not fn.endswith(".md"):
                continue
            try:
                t = open(os.path.join(dirpath, fn), encoding="utf-8", errors="replace").read()
            except OSError:
                continue
            m = h1.search(t)
            if m:
                defined.setdefault(m.group(1), set()).add(m.group(2))
            mentioned.update(word.findall(t))
    _V8_CACHE["defined"], _V8_CACHE["mentioned"] = defined, mentioned
    return defined, mentioned


def v7_names():
    """v7 매뉴얼에 나오는 이름 집합.

    ★왜 v7 쪽도 보나: 이름이 v8 에 없을 때 두 가지가 섞인다 —
    ① 우리가 매핑을 못 찾은 v7 속성  ② **고객 코드의 오타**(v7 에서도 무시되던 것).
    실제로 `SSaveName: 'codeNmS'` 가 있었다(`SaveName` 오타). ②를 "마이그레이션 과제"로
    보고하면 없는 일을 찾게 만든다. v7 매뉴얼에 없으면 오타로 안내한다.
    """
    if _V7_CACHE:
        return _V7_CACHE["names"]
    names = set()
    word = re.compile(r"\b([A-Za-z][A-Za-z0-9]{2,})\b")
    for dirpath, _d, files in os.walk(MANUAL7):
        for fn in files:
            if not fn.endswith(".md"):
                continue
            try:
                names.update(word.findall(
                    open(os.path.join(dirpath, fn), encoding="utf-8", errors="replace").read()))
            except OSError:
                continue
    _V7_CACHE["names"] = names
    return names


_DOCS_CACHE = {}


def our_docs_names():
    """우리 매핑 문서(`docs/*.md` · `AGENTS.md`)에 나오는 이름 집합.

    v7 매뉴얼에 페이지가 없어도 **우리가 안내를 써 둔** 속성이 있다. 그런 것을
    "고객 코드 오타" 로 보고하면 멀쩡한 속성을 지우게 만든다.
    """
    if _DOCS_CACHE:
        return _DOCS_CACHE["names"]
    docs = os.path.join(os.path.dirname(HERE), "docs")
    names = set()
    word = re.compile(r"\b([A-Za-z][A-Za-z0-9]{2,})\b")
    files = [os.path.join(os.path.dirname(HERE), "AGENTS.md")]
    try:
        files += [os.path.join(docs, f) for f in os.listdir(docs)
                  if f.endswith(".md") and os.path.isfile(os.path.join(docs, f))]
    except OSError:
        pass
    for f in files:
        try:
            names.update(word.findall(open(f, encoding="utf-8", errors="replace").read()))
        except OSError:
            continue
    _DOCS_CACHE["names"] = names
    return names


_RULE_NOTE_CACHE = {}


def rule_note(rules, method):
    """규칙 파일에서 그 메서드를 다루는 **구체 규칙**의 설명을 찾는다.

    포괄 규칙(`GENERIC_*`)은 "확인하라"는 말뿐이라 제외한다. 같은 안내를 이 파일에
    또 적으면 원본이 둘로 갈라지므로, 규칙 파일 하나만 본다.
    """
    key = id(rules)
    if key not in _RULE_NOTE_CACHE:
        pairs = []
        for x in rules.get("flag_for_review", []):
            if not isinstance(x, dict) or not x.get("pattern") or not x.get("desc"):
                continue
            if str(x.get("id", "")).startswith("GENERIC"):
                continue
            try:
                pairs.append((re.compile(x["pattern"]), x["desc"]))
            except re.error:
                continue
        _RULE_NOTE_CACHE[key] = pairs
    probe = ".%s(" % method
    for rx, desc in _RULE_NOTE_CACHE[key]:
        if rx.search(probe):
            return desc
    return None


def load_rules():
    return json.load(open(RULES, encoding="utf-8"))


def col_renames(rules):
    """value_transforms 에서 '이름만 바뀌는 속성' 쌍을 뽑는다 (Prop: → NewProp:)."""
    out = {}
    for r in rules.get("value_transforms", []):
        if not isinstance(r, dict) or "pattern" not in r:
            continue
        p, rep = r["pattern"], r.get("replacement", "")
        # 앞의 왼쪽 경계 `(?<![\w$])` 는 있어도 되고 없어도 된다
        # (경계는 텍스트 치환용이고, 여기서는 이름 쌍만 뽑는다)
        m = re.match(r"^(?:\(\?<!\[\\w\$\]\))?"
                     r"\(\[\"'\]\?\)([A-Za-z][A-Za-z0-9_]*)\\1\(\\s\*:\)$", p)
        if not m:
            continue
        m2 = re.match(r"^\\1([A-Za-z][A-Za-z0-9_]*)\\1\\2$", rep)
        if m2:
            out[m.group(1)] = m2.group(1)
    return out


def unmark(v):
    """`@@이름@@` → 원래 식별자. v7 전역 상수면 숫자."""
    if isinstance(v, str):
        m = MARK.match(v)
        if m:
            name = m.group(1)
            if name in V7CONST:
                return V7CONST[name]
            return {"__raw__": name}          # 코드로 그대로 내보낼 식별자
        return v
    if isinstance(v, list):
        return [unmark(x) for x in v]
    if isinstance(v, dict):
        return {k: unmark(x) for k, x in v.items()}
    return v


def js_literal(v, indent=0):
    pad = "  " * indent
    if isinstance(v, dict):
        if "__raw__" in v and len(v) == 1:
            return v["__raw__"]
        if not v:
            return "{}"
        inner = ",\n".join("%s  %s: %s" % (pad, k, js_literal(x, indent + 1))
                           for k, x in v.items())
        return "{\n%s\n%s}" % (inner, pad)
    if isinstance(v, list):
        if not v:
            return "[]"
        if all(not isinstance(x, (dict, list)) for x in v):
            return "[" + ", ".join(js_literal(x) for x in v) + "]"
        inner = ",\n".join("%s  %s" % (pad, js_literal(x, indent + 1)) for x in v)
        return "[\n%s\n%s]" % (inner, pad)
    if isinstance(v, bool):
        return "true" if v else "false"
    if v is None:
        return "null"
    if isinstance(v, (int, float)):
        return str(v)
    return json.dumps(v, ensure_ascii=False)


def js_brief(args, limit=60):
    """인자를 한 줄로 짧게. 안내 문구에 넣어 '어느 컬럼인지' 알 수 있게 한다."""
    parts = []
    for a in args:
        s = js_literal(a)
        s = re.sub(r"\s+", " ", s)
        if len(s) > limit:
            s = s[:limit] + "…"
        parts.append(s)
    return ", ".join(parts)


def group_by_sheet(extracted):
    """호출을 시트별로 가른다 → [(시트명, [호출...])]

    ★한 화면에 시트가 2개 이상인 경우가 흔하다(마스터-디테일). 예전엔 전부 하나로
    합쳐 `IBSheet.create` 하나만 냈는데, 그러면 **두 시트의 Cols 가 한 시트로 섞인다.**
    오류 없이 화면만 틀리게 나오는 종류라 실제 고객 화면에서야 드러났다(2026-08-05).
    """
    order, buckets = [], {}
    for call in extracted.get("calls", []):
        name = call.get("sheet") or (extracted.get("sheetNames") or ["mySheet"])[0]
        if name not in buckets:
            order.append(name)
            buckets[name] = []
        buckets[name].append(call)
    return [(n, buckets[n]) for n in order]


def convert(extracted, rules, calls=None):
    """추출 구조 → (v8 options dict, TODO 목록). calls 를 주면 그 목록만 변환한다."""
    if calls is not None:
        extracted = dict(extracted, calls=calls)
    renames = col_renames(rules)
    cfg, cols, todo = {}, [], []
    left_cols = []
    inverted = []          # Hidden → Visible 로 자동 반전한 컬럼

    def note(msg):
        if msg not in todo:
            todo.append(msg)

    def conv_col(c):
        out = {}
        for k, v in c.items():
            nk = renames.get(k, k)
            if k == "Hidden":
                # ★Hidden → Visible 은 **값 반전**이다(v8 `props/col/visible.md`).
                #   초기화 구조에서는 값이 리터럴로 이미 파싱돼 있으므로 0/1·bool 은
                #   그대로 뒤집는다. 문자열·식(예: `Hidden:isAdmin?1:0`)만 판단으로 남긴다.
                #   (텍스트 치환 규칙 HIDDEN_TRUE 가 판단 대상인 건 값을 못 보기 때문이다)
                if isinstance(v, bool):
                    out["Visible"] = 0 if v else 1
                    inverted.append(c.get("Name") or c.get("SaveName") or "?")
                elif isinstance(v, int):
                    out["Visible"] = 0 if v else 1
                    inverted.append(c.get("Name") or c.get("SaveName") or "?")
                else:
                    note("Col `%s`: Hidden:%s 은 값이 리터럴이 아니다 — `Visible` 로 "
                         "**반전해서** 옮길 것"
                         % (c.get("Name") or c.get("SaveName") or "?",
                            json.dumps(v, ensure_ascii=False)))
                    out[k] = v
                continue
            if k == "PointCount":
                if not v:
                    continue          # 0 = 소수점 없음 → 옮길 것이 없다
                # 소수점 **표시** 자리수 → v8 은 `Format` 패턴이다(자리수를 패턴으로 바꿔야 한다)
                note("Col `%s`: PointCount:%s → v8 은 `Format` 패턴으로 지정한다 "
                     "(항상 %s자리면 `#,##0.%s` / 있을 때만이면 `#,##0.%s`). "
                     "편집 시 입력 제한은 `EditMask` 정규식"
                     % (c.get("Name") or c.get("SaveName") or "?", v, v,
                        "0" * (v if isinstance(v, int) and 0 < v < 10 else 2),
                        "#" * (v if isinstance(v, int) and 0 < v < 10 else 2)))
                continue
            out[nk] = v
        return out

    for call in extracted.get("calls", []):
        m, args = call["method"], [unmark(a) for a in call.get("args", [])]
        if m in ("SetConfig", "IBS_InitSheet"):
            info = args[-1] if args else {}
            if not isinstance(info, dict):
                continue
            for k, v in info.items():
                # IBS_InitSheet(sheet, {Cfg:{...}, Cols:[...]}) 형태 — Cfg 는 펼쳐 넣는다
                # (그냥 넣으면 options.Cfg.Cfg 로 한 겹 더 들어간다)
                if k == "Cfg" and isinstance(v, dict):
                    for ck, cv in v.items():
                        if ck == "MergeSheet" and isinstance(cv, int) and cv in MERGESHEET:
                            h, d, pcm = MERGESHEET[cv]
                            cfg["HeaderMerge"], cfg["DataMerge"], cfg["PrevColumnMerge"] = h, d, pcm
                        elif ck == "FrozenCol":
                            # 0 은 "고정 열 없음" 이므로 옮길 것이 없다 — 안내하면 소음이 된다
                            if cv:
                                note("FrozenCol:%s → v8 은 해당 열 정의를 **최상위 LeftCols 로 "
                                     "이동**한다(개수 속성이 아니다)" % cv)
                        elif ck == "DataRowMerge":
                            # v7 DataRowMerge(가로 병합 허용) → v8 은 `DataMerge` 로 합쳐져 있다.
                            # ★MergeSheet 매핑도 같은 `DataMerge` 를 쓰기 때문에 **충돌한다.**
                            #   자동으로 한쪽을 고르지 않는다 — 화면을 보고 정해야 한다.
                            note("DataRowMerge:%s → v8 은 가로·열 병합이 `DataMerge` **하나로 "
                                 "합쳐져 있다**(`props/cfg/data-merge.md`). MergeSheet 에서 "
                                 "정해진 `DataMerge:%s` 와 어느 쪽이 맞는지 화면을 보고 정할 것. "
                                 "v8 은 행의 `RowMerge` default 가 1 이라 DataMerge 를 켜면 "
                                 "모든 행이 병합된다 — 뺄 행은 `RowMerge:0`"
                                 % (cv, cfg.get("DataMerge", "(미설정)")))
                        elif ck == "ColPage":
                            cfg["ColPage"] = 1
                            cfg["ColPageLength"] = cv
                            note("ColPage:%s → `ColPage:1` + `ColPageLength:%s` 로 갈랐다. "
                                 "★SearchMode 0·2 에서만 쓸 수 있고 Merge 와 병용 불가" % (cv, cv))
                        else:
                            cfg[renames.get(ck, ck)] = cv
                elif k == "Cols" and isinstance(v, list):
                    cols.extend(conv_col(c) for c in v if isinstance(c, dict))
                elif k == "HeaderMode" and isinstance(v, dict):
                    for hk, hv in v.items():
                        if hk in HEADERMODE:
                            cfg[HEADERMODE[hk]] = hv
                            if hk == "HeaderCheck":
                                note("HeaderCheck 는 **default 가 반대다** — v7 은 `1`(표시), "
                                     "v8 은 `0`(표시 안 함). v7 에서 생략했던 화면은 v8 에 "
                                     "`HeaderCheck:1` 을 명시해야 헤더 전체 체크박스가 남는다. "
                                     "특정 열만 다르게 하려면 열 쪽 `HeaderCheck` 가 우선한다")
                        else:
                            note("HeaderMode.%s 는 대응을 확인해야 한다" % hk)
                elif k == "MergeSheet":
                    if isinstance(v, int) and v in MERGESHEET:
                        h, d, pcm = MERGESHEET[v]
                        cfg["HeaderMerge"], cfg["DataMerge"], cfg["PrevColumnMerge"] = h, d, pcm
                    else:
                        note("MergeSheet:%s 는 확정표에 없다 — 화면 확인 필요" % v)
                elif k == "FrozenCol":
                    if v:
                        note("FrozenCol:%s → v8 은 해당 열 정의를 **최상위 LeftCols 로 이동**한다"
                             "(개수 속성이 아니다)" % v)
                elif k == "ColPage":
                    cfg["ColPage"] = 1
                    cfg["ColPageLength"] = v
                    note("ColPage:%s → v8 `ColPage:1` + `ColPageLength:%s` 로 갈랐다. "
                         "★SearchMode 0·2 에서만 쓸 수 있고 Merge 와 병용 불가" % (v, v))
                else:
                    cfg[renames.get(k, k)] = v
        elif m == "SetMergeSheet":
            v = args[0] if args else None
            if isinstance(v, int) and v in MERGESHEET:
                h, d, pcm = MERGESHEET[v]
                cfg["HeaderMerge"], cfg["DataMerge"], cfg["PrevColumnMerge"] = h, d, pcm
                note("SetMergeSheet(%s) 를 Cfg 로 옮겼다. 동적 변경이 필요하면 "
                     "setAutoMerge(%s, %s, %s) 를 쓴다 — ★호출 시 Cfg 병합 설정이 초기화된다"
                     % (v, d, h, pcm))
            else:
                note("SetMergeSheet(%s) — 확정표에 없는 값" % v)
        elif m == "InitColumns":
            v = args[0] if args else []
            if isinstance(v, list):
                cols.extend(conv_col(c) for c in v if isinstance(c, dict))
        elif m == "InitHeaders":
            note("InitHeaders(...) → 헤더 타이틀은 각 Col 의 `Header` 로, 헤더 기능은 Cfg 로 옮긴다")
        elif m == "SetEditable":
            cfg["CanEdit"] = args[0] if args else 1
        elif m == "ShowFilterRow":
            note("ShowFilterRow(...) → v8 `showFilterRow()` 호출 또는 Cfg 설정으로 처리")
        elif m == "SetCountFormat":
            note("SetCountFormat(%s) → 초기화 `Cfg.InfoRowConfig.Format` 으로 옮긴다"
                 % json.dumps(args[:1], ensure_ascii=False))
        elif m == "SetCountPosition":
            note("SetCountPosition(%s) → 초기화 `Cfg.InfoRowConfig` 로 옮긴다"
                 "(v7 단일 number → v8 Layout 등으로 분리)" % (args[0] if args else "?"))
        elif m == "SetPageCount":
            if args:
                cfg["PageLength"] = args[0]
                if len(args) > 1:
                    note("SetPageCount 의 둘째 인자(renderPage=%s)는 v8 대응이 없다" % args[1])
        elif m == "SetHighlightAfterSort":
            if args:
                cfg["HighlightAfterSort"] = args[0]
                note("HighlightAfterSort 는 v8 default 가 1 이다 — v7 에서 0 을 쓰던 화면은 반드시 명시")
        elif m == "SetFocusAfterProcess":
            # ★값 반전 — v7 `1`=포커스 설정(default) / v8 `IgnoreFocused` `1`=설정 안 함.
            #   근거: v7 funcs/search/SetFocusAfterProcess.md · v8 props/cfg/ignore-focused.md
            v = args[0] if args else 1
            if isinstance(v, str) and v.strip() in ("0", "1"):
                v = int(v.strip())          # v7 은 인자 타입이 String 이다
            if isinstance(v, (int, bool)) and not isinstance(v, float):
                cfg["IgnoreFocused"] = 0 if v else 1
                note("SetFocusAfterProcess(%s) → `IgnoreFocused: %s` — ★**값이 반대다**"
                     "(v7 `1`=포커스 설정 / v8 `1`=설정 안 함). "
                     "v8 에는 `2`(포커스 레이어만 표시, 방향키·Tab 이동 없음)가 더 있다 — "
                     "master-detail 화면이면 검토할 것"
                     % (v, cfg["IgnoreFocused"]))
            else:
                note("SetFocusAfterProcess(%s) → `IgnoreFocused` 인데 **값이 반대다**. "
                     "리터럴이 아니라 자동으로 옮기지 않았다" % js_brief(args))
        elif m == "SetTheme":
            note("SetTheme(%s) → v8 `setTheme(prefix, csspath, render)`. "
                 "★둘째 인자가 v7 은 폴더명, v8 은 **css 파일 경로**다"
                 % json.dumps(args, ensure_ascii=False))
        elif not call.get("other"):
            # ★규칙 파일에 **구체 안내가 있으면 그걸 쓴다.** 같은 사실을 두 곳에 적지 않기 위함이다
            #   (텍스트 변환 경로는 이미 그 규칙을 쓴다). 없을 때만 일반 문구로 남긴다.
            spec = rule_note(rules, m)
            if spec:
                note("%s(%s) — %s" % (m, js_brief(args), spec))
            else:
                # 인자를 붙인다 — `SetColProperty(...)` 한 줄로 뭉치면 어느 컬럼인지 알 수 없다
                note("%s(%s) 는 아직 자동 변환 대상이 아니다" % (m, js_brief(args)))

    # ★모르는 속성은 조용히 통과시키지 않는다(위 v8_names 주석 참고).
    #   v8 은 모르는 옵션을 무시하므로 오류가 안 난다 — 화면만 달라진다.
    defined, mentioned = v8_names()
    STRUCT = {"Cfg", "Cols", "LeftCols", "Def", "Events", "Head", "Foot", "__raw__"}

    def check_names(kind, keys, where):
        for k in keys:
            if k in STRUCT or not re.match(r"^[A-Za-z]", str(k)):
                continue
            kinds = defined.get(k, set())
            if kinds:
                if kind not in kinds:
                    note("`%s` 는 v8 에 있지만 종류가 다르다(%s) — %s 위치가 맞는지 확인할 것"
                         % (k, "/".join(sorted(kinds)), where))
                continue
            if k[:1].islower():
                # IBSheet 속성은 모두 PascalCase 다. 소문자로 시작하면 프로젝트가 자체로
                # 넣어 둔 키이고 v7 에서도 무시됐다 — "v8 에 없다" 로 보고하면 오해를 준다.
                note("`%s`(%s) 는 IBSheet 속성이 아니다(프로젝트 자체 키로 보인다) — "
                     "쓰는 곳이 있으면 그대로 두고, 없으면 지울 것" % (k, where))
                continue
            if k in STRUCT_MOVE:
                # 이름이 아니라 **구조**가 바뀌는 것 — 문서에 대응이 있다
                note("`%s`(%s) → %s" % (k, where, STRUCT_MOVE[k]))
                continue
            v7 = v7_names()
            if k not in v7:
                # ★"오타" 로 단정하기 전에 **우리 매핑 문서**를 본다.
                #   v7 매뉴얼에 페이지가 없어도 우리가 안내를 써 둔 속성이 있다
                #   (예: `SelectionMode` — v7 은 메서드로 제공했고 v8 은 속성이다).
                #   그걸 오타로 보고하면 멀쩡한 속성을 지우게 만든다(2026-08-10 전수 조사에서 확인).
                if k in our_docs_names():
                    note("`%s`(%s) 는 v7 매뉴얼에 페이지가 없지만 **우리 매핑 문서에 안내가 있다** — "
                         "`docs/` 에서 `%s` 를 찾아 확인할 것" % (k, where, k))
                    continue
                near = difflib.get_close_matches(k, sorted(v7), n=2, cutoff=0.8)
                note("★`%s`(%s) 는 **v7·v8 매뉴얼과 우리 문서 어디에도 없다** — "
                     "고객 코드 오타이거나 v7 에서도 무시되던 속성이다%s"
                     % (k, where, (". 비슷한 이름: " + ", ".join("`%s`" % n for n in near))
                        if near else ""))
                continue
            if k in mentioned:
                note("`%s`(%s) 는 v8 개별 페이지가 없고 **본문 언급만 있다** — "
                     "매뉴얼에서 확인할 것" % (k, where))
            else:
                note("★`%s`(%s) 는 v8 매뉴얼에 없다 — 그대로 두면 **무시된다**(오류가 아니다). "
                     "대응을 찾아 옮기거나 지울 것" % (k, where))

    check_names("cfg", cfg.keys(), "Cfg")
    seen_col = set()
    for c in cols + left_cols:
        if isinstance(c, dict):
            seen_col.update(c.keys())
    check_names("col", seen_col, "Col")

    if inverted:
        todo.insert(0, "Hidden → Visible 로 **값을 반전해 자동 변환**했다 (%d개 컬럼: %s). "
                       "근거 v8 `props/col/visible.md` — 반전이 맞는지 눈으로 확인할 것"
                    % (len(inverted), ", ".join(inverted[:8]) +
                       (" …" if len(inverted) > 8 else "")))
    opts = {}
    if cfg:
        opts["Cfg"] = cfg
    if left_cols:
        opts["LeftCols"] = left_cols
    if cols:
        opts["Cols"] = cols
    return opts, todo


def parse_el(spec):
    """--el 파싱. `id` 또는 `시트=id,시트2=id2` 둘 다 받는다."""
    out = {}
    if not spec:
        return out
    if "=" not in spec:
        return {"*": spec}
    for part in spec.split(","):
        if "=" in part:
            k, v = part.split("=", 1)
            out[k.strip()] = v.strip()
    return out


def main():
    ap = argparse.ArgumentParser(description="v7 초기화 코드 → v8 IBSheet.create 옵션")
    ap.add_argument("input", help="v7 화면 파일 (JSP/JS/EP/ECO 등)")
    ap.add_argument("--sheet", help="시트 변수명 (생략 시 자동 탐지)")
    ap.add_argument("--el", default="sheetArea",
                    help="v8 el (컨테이너 id). 시트가 여러 개면 `시트=id,시트2=id2`")
    ap.add_argument("--json", action="store_true", help="추출 원본 JSON 도 출력")
    args = ap.parse_args()

    cmd = ["node", EXTRACT, args.input, "--json"]
    if args.sheet:
        cmd += ["--sheet", args.sheet]
    try:
        p = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", timeout=90)
    except FileNotFoundError:
        print("node 를 찾을 수 없습니다. Node.js 가 필요합니다(jscheck 과 동일).")
        return 3
    if not p.stdout.strip():
        print("추출 실패: %s" % (p.stderr.strip()[:400] or "(출력 없음)"))
        return 1
    data = json.loads(p.stdout)

    if args.json:
        print(json.dumps(data, ensure_ascii=False, indent=2))
        print()

    print("입력      : %s" % data["file"])
    print("시트 변수 : %s" % (", ".join(data["sheetNames"]) or "(못 찾음)"))
    print("실행      : %s" % ("성공" if data["ok"] else "실패 — %s" % data["error"]))
    if data.get("autoStubbed"):
        print("자동 스텁 : %s" % ", ".join(data["autoStubbed"][:12]))
    print("추출 호출 : %d개" % len(data.get("calls", [])))
    if not data["ok"]:
        print("\n※ 실행이 실패해도 그 전까지 기록된 호출은 아래에 반영됩니다.")

    # ★ 추출한 초기화 호출이 없으면 골격을 내지 않는다.
    #   빈 options 를 출력하면 "변환됐다"로 오해할 수 있다.
    if not data.get("calls"):
        # ★소스에 초기화 코드가 **있는데** 실행 경로에 닿지 못한 경우와,
        #   정말로 없는 경우를 구분한다. 예전엔 둘 다 "구조가 없다" 고 해서
        #   있는 것을 없다고 알렸다(2026-08-10 전수 조사에서 확인).
        has_src = False
        try:
            raw = open(args.input, "rb").read()
            for enc in ("utf-8", "cp949"):
                try:
                    src = raw.decode(enc)
                    break
                except UnicodeDecodeError:
                    src = ""
            has_src = bool(re.search(r"IBS_InitSheet\w*\s*\(|\.\s*(?:SetConfig|InitColumns)\s*\(",
                                     src))
        except OSError:
            pass

        if has_src:
            print("\n초기화 코드가 **파일 안에 있는데 실행 경로에 닿지 못했습니다.**")
            print("  샌드박스는 코드를 실행해서 값을 읽으므로, 그 코드를 부르는 쪽이 없으면 잡히지 않습니다.")
            print("  흔한 형태:")
            print("   - `var f = function(){ …초기화… }` 로 두고 **다른 콜백 안에서** 부르는 구조")
            print("   - 화면 로딩 후 동적으로 부르는 구조(탭 전환·팝업 열기 등)")
            print("  이 경우 초기화 블록을 **직접 보고 옮겨야** 합니다 — `--json` 으로 추출 원본을 확인하고,")
            print("  `migrate.py convert` 의 검토 항목(INITCOLUMNS·SETCONFIG 등)을 함께 보세요.")
        else:
            print("\n초기화 호출을 찾지 못했습니다 — 이 파일에는 옮길 초기화 구조가 없습니다.")
            print("  다음을 확인하세요:")
            print("   - 시트 생성·초기화가 **다른 파일**(외부 js·공통 include)에 있는지")
            print("   - 시트 변수명 자동 탐지가 실패했는지 → --sheet <변수명> 으로 지정")
        if not data["ok"]:
            print("   - 실행이 실패했다면(위 메시지) 그 원인부터 — --json 으로 원본 확인")
        return 1

    if data.get("forcedInit"):
        print("직접 실행 : %s (호출자가 외부 js 에 있어 우리가 불렀다)"
              % ", ".join(data["forcedInit"]))

    groups = group_by_sheet(data)
    els = parse_el(args.el)
    rules = load_rules()
    if len(groups) > 1:
        print("시트 %d개 — 각각 따로 생성한다" % len(groups))

    all_todo = []
    for sheet, calls in groups:
        opts, todo = convert(data, rules, calls)
        el = els.get(sheet) or (els.get("*") if len(groups) == 1 else None) or (sheet + "_area")
        print("\n" + "-" * 66)
        print("v8 초기화 — %s (검토 후 사용)" % sheet)
        print("-" * 66)
        print("var %s = IBSheet.create({" % sheet)
        print('  id: "%s",' % sheet)
        print('  el: "%s",' % el)
        print("  options: %s" % js_literal(opts, 1))
        print("});")
        for t in todo:
            all_todo.append("[%s] %s" % (sheet, t) if len(groups) > 1 else t)

    if len(groups) > 1 and not any(els.get(s) for s, _ in groups):
        print("\n※ el 컨테이너 id 는 `<시트명>_area` 로 임시 지정했습니다 —")
        print("   실제 id 로 바꾸거나 --el %s 처럼 지정하세요."
              % ",".join("%s=id" % s for s, _ in groups))

    if all_todo:
        print("\n" + "-" * 66)
        print("판단이 필요한 항목 %d건 — 자동으로 옮기지 않았습니다" % len(all_todo))
        print("-" * 66)
        for t in all_todo:
            print("  * %s" % t)
    if data.get("deferredErrors"):
        print("\n지연 콜백 오류 %d건(초기화와 무관할 수 있음): %s"
              % (len(data["deferredErrors"]), " / ".join(data["deferredErrors"][:3])))
    return 0


if __name__ == "__main__":
    sys.exit(main())
