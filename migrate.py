#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
migrate.py - IBSheet7 → IBSheet8 마이그레이션 툴킷 실행 CLI

결정론 변환(engine/migrate_core.py)과 검증 3종(verify/*.py)을 한 명령으로 묶는 진입점.
GitHub 없이 로컬에서 바로 쓴다.

  convert  변환 + 검증 3종 (기본)
  verify   이미 변환된 파일만 검증
  rules    규칙 통계·자기점검
  initconv v7 초기화 코드 → v8 IBSheet.create 옵션 (실행 기반)
  doctor   실행 환경 점검

사용 예:
  python migrate.py convert src/orderList.jsp
  python migrate.py convert src/ --out build/ --report build/report.json
  python migrate.py verify build/orderList.jsp --asis src/orderList.jsp
  python migrate.py rules
  python migrate.py initconv src/orderList.jsp --el sheetArea
  python migrate.py doctor

변환 결과가 검증 3종을 모두 통과하면 종료코드 0.
검토 필요(needs_review) 항목이 남아 있으면 종료코드 2 - AI/사람의 판단 변환이 필요하다는 뜻이며
실패가 아니다. 검증 실패는 1.
"""
import argparse
import json
import os
import re
import subprocess
import sys

# 한국어 Windows 콘솔 기본 코드페이지(cp949)에서는 일부 문자를 인코딩하지 못해
# print 가 UnicodeEncodeError 로 죽는다. 출력 스트림을 UTF-8 로 고정하고,
# 그래도 표현 불가한 문자는 크래시 대신 치환한다.
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8", errors="replace")
    except (AttributeError, ValueError):
        pass

HERE = os.path.dirname(os.path.abspath(__file__))
ENGINE = os.path.join(HERE, "engine", "migrate_core.py")
RULES = os.path.join(HERE, "engine", "rules", "migrate_rules.json")
VERIFY = os.path.join(HERE, "verify")
HELPER = os.path.join(HERE, "helpers", "ibsheet-migration.js")

# 확장자는 프로젝트마다 다르다 - 실제 고객사에서 .ep / .eco / .do 를 쓰는 것을 확인했다.
#   .do 는 보통 서블릿 매핑이지만, 화면 파일 자체를 .do 로 두고 서버가 JSP 로 처리하는
#   프로젝트가 있다(2026-08-05 확인 — 시트 초기화 코드가 그 안에 있었다).
# 목록에 없으면 **디렉터리 스캔에서 조용히 빠진다**(파일을 직접 지정하면 처리된다).
# --ext 로 추가할 수 있다.
TARGET_EXT = (".jsp", ".js", ".html", ".htm", ".ep", ".eco", ".jspf", ".inc", ".do")

# 종료코드
EXIT_OK = 0
EXIT_VERIFY_FAIL = 1
EXIT_NEEDS_REVIEW = 2
EXIT_USAGE = 3

# 브릿지 함수 표식 - 변환 결과가 이걸 호출하면 헬퍼 배포가 필요하다
BRIDGE_PAT = re.compile(r"\.(?:(\w+7)|(\w+2))\s*\(")
BRIDGE_NAMES = {
    "getRowByIndex7", "getRowIndex7", "getColByIndex7", "getColIndex7",
    "getValue2", "setValue2", "setAttribute2", "addRow2", "removeRow2",
}

# IBSheet8 은 기능을 본체 + 플러그인으로 나눠 배포한다. 본체(ibsheet.js)만 넣으면
# 아래 함수들은 런타임에 'is not a function' 이 된다 - 검증 3종(정적 검사)으로는 잡히지 않는다.
# 근거: 각 함수의 v8 매뉴얼 페이지에 "스크립트 로드가 필요합니다" 문구.
PLUGIN_FUNCS = {
    "plugins/ibsheet-excel.js": {
        "down2Excel", "down2Pdf", "down2Text", "down2Hwpx",
        "loadExcel", "loadText", "directDown2Excel", "directLoadExcel", "getSheetData",
        # *Buffer 는 down2Excel/loadExcel/down2Hwpx 호출을 감싸는 래퍼다.
        # buffer(true) -> 실제 함수 호출 -> buffer(false) 에서 서버로 전송되는 구조이므로
        # 같은 플러그인·서버 모듈이 필요하다. (매뉴얼 개별 페이지에는 그 문구가 없다)
        "down2ExcelBuffer", "loadExcelBuffer", "down2HwpxBuffer",
    },
    "plugins/ibsheet-dialog.js": {
        "showFindDialog", "showPivotDialog", "showSortDialog", "showChartDialog",
        "showEditDialog", "showHtmlEditDialog", "showUploadDialog", "showDownloadDialog",
        # ★비공개 API 는 넣지 않는다. 고객 코드가 부를 일이 없고, 이름 자체가 공개 금지다.
    },
    # exportData / importData 는 **본체(ibsheet.js) 소속 함수**다(벤더 확인).
    # ibsheet-excel.js 는 필요 없고, 서버 모듈도 필요 없다(클라이언트 방식).
    # 다만 엑셀 파일 생성을 jszip 으로 하므로 이 파일이 없으면 동작하지 않는다.
    # 근거: v8 매뉴얼 funcs/core/export-data.md · import-data.md
    #       "/plugins/jszip.min.js 파일이 반드시 존재해야" (명시) + 벤더 확인
    "plugins/jszip.min.js": {
        "exportData", "importData",
    },
}
# 위 중에서 서버 모듈까지 필요한 것(스크립트만 넣어서는 동작하지 않는다)
SERVER_MODULE_FUNCS = {
    "down2Excel", "down2Pdf", "down2Text", "down2Hwpx",
    "loadExcel", "loadText", "directDown2Excel", "directLoadExcel",
    "down2ExcelBuffer", "loadExcelBuffer", "down2HwpxBuffer",
}

# 참고 — v7 에 대응이 없는 v8 신규 다이얼로그(엑셀 다운로드/업로드·HtmlEdit)는
# 내부에서 엑셀 함수를 호출하므로 ibsheet-excel.js 도 필요하지만, **변환 대상이 아니라**
# 여기서 전이 의존을 따로 추적하지 않는다(벤더 확인: v8 신규 기능 - 마이그레이션 고려 불필요).
# v7 에 대응이 있는 것은 ShowFindDialog / ShowPivotDialog 두 개뿐이다.


def c(text, color):
    """터미널 색상 (파이프로 넘길 때는 끈다)"""
    if not sys.stdout.isatty():
        return text
    codes = {"red": 31, "green": 32, "yellow": 33, "cyan": 36, "grey": 90, "bold": 1}
    return "\033[%dm%s\033[0m" % (codes[color], text)


def run(cmd):
    """서브프로세스 실행 → (exit_code, stdout+stderr)"""
    p = subprocess.run([sys.executable] + cmd, capture_output=True,
                       text=True, encoding="utf-8", errors="replace")
    return p.returncode, (p.stdout or "") + (p.stderr or "")


# ---------------------------------------------------------------------------
# 대상 파일 수집
# ---------------------------------------------------------------------------

# 확장자 때문에 빠진 파일을 찾을 때 쓰는 표시 (IBSheet 코드가 들어 있는가)
_IBS_HINT = re.compile(r"IBS_InitSheet|createIBSheet|\.\s*(?:SetConfig|InitColumns|InitHeaders)\s*\(")
_SKIP_EXT = (".css", ".png", ".jpg", ".gif", ".woff2", ".ttf", ".zip", ".jar",
             ".xls", ".xlsx", ".pdf", ".class", ".map", ".min.js")


def missed_by_ext(root, exts, limit=2_000_000):
    """대상 확장자가 아닌데 **IBSheet 코드가 들어 있는** 파일을 찾는다.

    ★확장자 목록은 프로젝트마다 다르다. 실제로 `.ep`·`.eco`·`.do` 에 이어
      `.mv`(HTML 화면)를 쓰는 고객이 나왔다. 목록에 없으면 **조용히 빠지는데**,
      나머지 파일이 전부 0건이라 "성공" 처럼 보인다 — 실제로 24개를 변환하고
      **유일한 화면 1개를 놓쳤다**(2026-08-12).
      경고문에 기대지 말고 도구가 직접 찾아서 알려 준다.
    """
    found = []
    for dirpath, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in
                   (".git", "node_modules", "__pycache__", ".venv", "venv")]
        for fn in sorted(files):
            low = fn.lower()
            if low.endswith(exts) or low.endswith(_SKIP_EXT):
                continue
            p = os.path.join(dirpath, fn)
            try:
                if os.path.getsize(p) > limit:
                    continue
                raw = open(p, "rb").read()
            except OSError:
                continue
            for enc in ("utf-8", "cp949"):
                try:
                    t = raw.decode(enc)
                    break
                except UnicodeDecodeError:
                    t = ""
            if t and _IBS_HINT.search(t):
                found.append(p)
    return found


def collect(paths, extra_ext=None):
    """대상 파일 수집. extra_ext 로 프로젝트 고유 확장자를 추가할 수 있다."""
    exts = TARGET_EXT + tuple(
        (e if e.startswith(".") else "." + e).lower() for e in (extra_ext or []))
    out = []
    for p in paths:
        if os.path.isdir(p):
            for dirpath, dirs, files in os.walk(p):
                dirs[:] = [d for d in dirs if d not in
                           (".git", "node_modules", "__pycache__", ".venv", "venv")]
                for fn in sorted(files):
                    if fn.lower().endswith(exts) and ".tobe." not in fn:
                        out.append(os.path.join(dirpath, fn))
        elif os.path.isfile(p):
            out.append(p)
        else:
            print(c("입력 경로 없음: %s" % p, "red"))
    # ★확장자 때문에 빠진 화면이 있으면 **바로 알린다**(찾아서 보여 준다)
    for p in paths:
        if not os.path.isdir(p):
            continue
        missed = missed_by_ext(p, exts)
        if not missed:
            continue
        print(c("★대상 확장자가 아니라 빠진 파일에 IBSheet 코드가 있습니다 — %d개"
                % len(missed), "red"))
        seen = []
        for m in missed[:8]:
            print(c("     %s" % m, "grey"))
            e = os.path.splitext(m)[1].lower()
            if e and e not in seen:
                seen.append(e)
        if len(missed) > 8:
            print(c("     … 외 %d개" % (len(missed) - 8), "grey"))
        if seen:
            print(c("  → 포함하려면: --ext %s" % " ".join(seen), "cyan"))
    return out


def out_path(src, root, outdir, single_file=False):
    """출력 경로 결정.

    --out 생략        -> 원본 옆 <name>.tobe.<ext>
    --out 이 파일경로 -> 그대로 사용 (입력이 파일 1개일 때만)
    --out 이 디렉터리 -> 입력 트리 구조를 보존해 매핑
    """
    if not outdir:
        base, ext = os.path.splitext(src)
        return base + ".tobe" + ext
    # 입력이 파일 1개 + --out 에 확장자가 있으면 파일 경로로 본다
    if single_file and os.path.splitext(outdir)[1] and not os.path.isdir(outdir):
        return outdir
    if root and os.path.isdir(root):
        rel = os.path.relpath(src, root)
    else:
        rel = os.path.basename(src)
    return os.path.join(outdir, rel)


# ---------------------------------------------------------------------------
# 검증 3종
# ---------------------------------------------------------------------------

def verify_one(asis, tobe, quiet=True):
    """검증 3종 실행 → (all_pass, [(이름, 통과여부, 출력)])"""
    checks = [
        ("residue", [os.path.join(VERIFY, "residue_scan.py"), tobe]),
        ("syntax", [os.path.join(VERIFY, "jscheck.py"), tobe]),
    ]
    if asis:
        checks.append(("fn_parity", [os.path.join(VERIFY, "fn_parity.py"), asis, tobe]))
    results = []
    for name, cmd in checks:
        code, out = run(cmd)
        results.append((name, code == 0, out.strip()))
    return all(ok for _, ok, _ in results), results


def classify(results, review):
    """검증 결과를 실제 실패와 '판단 변환 미완'으로 구분한다.

    residue(IBSheet7 잔존) 는 needs_review 가 남아 있는 동안 당연히 걸린다 -
    아직 판단 변환을 안 했다는 뜻이므로 실패로 세지 않는다.
    syntax / fn_parity 는 판단 변환 진행도와 무관하게 언제나 실패다.
    """
    real_fail, pending = [], []
    for name, ok, out in results:
        if ok:
            continue
        if name == "residue" and review:
            pending.append(name)
        else:
            real_fail.append(name)
    return real_fail, pending


def print_verify(results, review=0, indent="     "):
    real_fail, pending = classify(results, review)
    for name, ok, out in results:
        if ok:
            mark = c("PASS", "green")
        elif name in pending:
            mark = c("미완", "yellow")
        else:
            mark = c("FAIL", "red")
        print("%s%-10s %s" % (indent, name, mark))
        # 판단 변환이 남아 예상된 잔존은 상세를 쏟지 않는다(리포트에 이미 있음)
        if not ok and name not in pending:
            for line in out.splitlines()[:12]:
                print("%s  %s" % (indent, c(line, "grey")))


_V3_RX = [None]


def detect_v3(path):
    """**IBSheet v3** 초기화가 있으면 [(이름, 횟수), ...] 를 돌려준다.

    v3 는 v7/v8 과 다른 세대의 제품이라 이 도구의 대상이 아니다.
    이름 표의 원본은 규칙 파일(`v3_init_names`)이다 — 여기에 사본을 두지 않는다.
    ★`with (sheet) { InitDataProperty(…) }` 로 **받는 객체 없이** 불리는 일이 더 많다(실측 77%).
    """
    if _V3_RX[0] is None:
        try:
            names = json.load(open(RULES, encoding="utf-8"))["v3_init_names"]["names"]
        except (OSError, ValueError, KeyError):
            names = []
        _V3_RX[0] = (re.compile(r"(?<![\w$])(?:\.\s*)?(" + "|".join(names) + r")\s*\(")
                     if names else False)
    if not _V3_RX[0]:
        return []
    try:
        raw = open(path, "rb").read()
    except OSError:
        return []
    for enc in ("utf-8", "cp949"):
        try:
            body = raw.decode(enc)
            break
        except UnicodeDecodeError:
            body = ""
    # 주석은 빼고 센다 (이미 v8 로 옮기고 v3 호출을 주석으로 남겨 둔 화면이 있다)
    body = re.sub(r"/\*[\s\S]*?\*/", " ", body)
    body = re.sub(r"(?m)//[^\n]*$", " ", body)
    hits = {}
    for m in _V3_RX[0].finditer(body):
        hits[m.group(1)] = hits.get(m.group(1), 0) + 1
    return sorted(hits.items(), key=lambda kv: -kv[1])


def uses_bridge(path):
    try:
        body = open(path, encoding="utf-8", errors="replace").read()
    except OSError:
        return []
    found = set()
    for m in re.finditer(r"\.([A-Za-z_][A-Za-z0-9_]*)\s*\(", body):
        if m.group(1) in BRIDGE_NAMES:
            found.add(m.group(1))
    return sorted(found)


def uses_common_plugin(path):
    """IB_Preset / IBSheet.v7.* 사용 여부 - plugins/ibsheet-common.js 로드가 필요하다.

    본체 ibsheet.js 에는 없는 전역이라, 빠뜨리면 검증 3종은 PASS인데 브라우저에서
    'IB_Preset is not defined' 로 죽는다(브릿지 헬퍼 배포 누락과 같은 유형).
    """
    try:
        body = open(path, encoding="utf-8", errors="replace").read()
    except OSError:
        return []
    found = set()
    for m in re.finditer(r"IB_Preset\.([A-Za-z0-9_]+)", body):
        found.add("IB_Preset." + m.group(1))
    for m in re.finditer(r"IBSheet\.v7\.([A-Za-z0-9_]+)", body):
        found.add("IBSheet.v7." + m.group(1))
    return sorted(found)


def uses_plugin_funcs(path):
    """플러그인 소속 함수 사용 여부 → {플러그인: [함수...]}"""
    try:
        body = open(path, encoding="utf-8", errors="replace").read()
    except OSError:
        return {}
    called = {m.group(1) for m in re.finditer(r"\.([A-Za-z_][A-Za-z0-9_]*)\s*\(", body)}
    out = {}
    for plug, names in PLUGIN_FUNCS.items():
        hit = sorted(called & names)
        if hit:
            out[plug] = hit
    return out


# ---------------------------------------------------------------------------
# convert
# ---------------------------------------------------------------------------

def cmd_convert(args):
    root = args.input[0] if len(args.input) == 1 and os.path.isdir(args.input[0]) else None
    files = collect(args.input, getattr(args, "ext", None))
    if not files:
        print(c("변환 대상 파일이 없습니다.", "red"))
        return EXIT_USAGE
    single = len(files) == 1

    print(c("IBSheet7 → IBSheet8 변환  (%d개 파일)" % len(files), "bold"))
    if args.dry_run:
        print(c("  * --dry-run : 출력 파일을 쓰지 않습니다", "yellow"))
    print()

    summary = []
    reports = {}
    v3_skipped = []
    cfg_path = [None]   # 엔진이 실제로 찾아 쓴 config 경로
    for src in files:
        # ★**IBSheet v3 화면은 변환하지 않는다.** v7 이 아니라 다른 세대의 제품이라
        #   출발점부터 다르다. 그냥 돌리면 v3 초기화가 범용 규칙에만 걸린 채
        #   `.tobe` 파일이 나와 **옮긴 것처럼 보인다**(2026-08-13).
        v3 = detect_v3(src)
        if v3:
            print("%s %s" % (c("건너뜀", "yellow"), src))
            print("      %s" % c("IBSheet v3 방식 (%s) — v7→v8 변환 대상이 아닙니다"
                                 % ", ".join("%s %d회" % kv for kv in v3[:3]), "grey"))
            v3_skipped.append(src)
            continue

        dst = out_path(src, root, args.out, single)
        os.makedirs(os.path.dirname(os.path.abspath(dst)), exist_ok=True)

        cmd = [ENGINE, src]
        if args.dry_run:
            cmd.append("--dry-run")
        else:
            cmd += ["--out", dst]
        rep = dst + ".report.json"
        cmd += ["--report", rep]
        if args.no_config:
            cmd.append("--no-config")
        elif args.config:
            cmd += ["--config", args.config]

        code, out = run(cmd)
        if code != 0:
            print("%s %s" % (c("ERROR", "red"), src))
            for line in out.strip().splitlines()[:8]:
                print("      %s" % c(line, "grey"))
            summary.append((src, None, None, None, False))
            continue

        try:
            r = json.load(open(rep, encoding="utf-8"))
        except (OSError, ValueError):
            r = {}
        aa = r.get("auto_applied", {})
        pre = aa.get("prefix_strips", {})
        auto = (aa.get("safe_method_renames", {}).get("total", 0)
                + aa.get("value_transforms", {}).get("total", 0)
                + aa.get("method_option_keys", {}).get("total", 0)
                + pre.get("total", 0))
        review = r.get("needs_review", {}).get("total", 0)
        reports[src] = r
        if cfg_path[0] is None:
            cfg_path[0] = r.get("config") or False
        if args.keep_report is False and os.path.exists(rep):
            os.remove(rep)

        print("%s %s" % (c("변환", "cyan"), src))
        line = "     자동 %d건 · 검토 필요 %s" % (
            auto, c("%d건" % review, "yellow" if review else "green"))
        if pre.get("total") or pre.get("kept_by_config"):
            line += "   (접두사 제거 %d · config 보존 %d)" % (
                pre.get("total", 0), pre.get("kept_by_config", 0))
        print(line)

        real_fail = None
        if not args.dry_run and not args.no_verify:
            _, vres = verify_one(src, dst)
            print_verify(vres, review)
            real_fail = classify(vres, review)[0]
        if not args.dry_run:
            print("     %s %s" % (c("출력", "grey"), dst))
        summary.append((src, auto, review, real_fail, True))
        print()

    # ---- 요약 ----
    ok_files = [s for s in summary if s[4]]
    fail_run = [s for s in summary if not s[4]]
    total_auto = sum(s[1] or 0 for s in ok_files)
    total_review = sum(s[2] or 0 for s in ok_files)
    verify_fail = [s for s in ok_files if s[3]]

    print(c("-" * 66, "grey"))
    print(c("요약", "bold"))
    print("  파일 %d개 · 자동 변환 %d건 · 검토 필요 %d건" % (len(ok_files), total_auto, total_review))
    if v3_skipped:
        print("  %s IBSheet v3 화면 %d개는 건너뛰었습니다 (v7→v8 대상이 아닙니다)"
              % (c("건너뜀", "yellow"), len(v3_skipped)))
    if cfg_path[0]:
        print("  config: %s" % c(cfg_path[0], "grey"))
    elif cfg_path[0] is False and not args.no_config:
        print("  %s config 없음 - 접두사 자동 제거를 건너뜁니다 (migrate.config.example.json 참고)"
              % c("주의", "yellow"))
    if fail_run:
        print("  %s 엔진 실행 실패 %d개" % (c("ERROR", "red"), len(fail_run)))
    if not args.dry_run and not args.no_verify:
        if verify_fail:
            print("  %s 검증 실패 %d개: %s" % (c("FAIL", "red"), len(verify_fail),
                                            ", ".join("%s(%s)" % (os.path.basename(s[0]),
                                                                  ",".join(s[3]))
                                                      for s in verify_fail)))
        elif not ok_files:
            # ★한 파일도 변환되지 않았는데 **"PASS 검증 3종 전체 통과"** 라고 끝맺고 있었다.
            #   검증할 것이 없어서 통과한 것을 통과라고 말하면 안 된다 —
            #   cp949 화면에서 엔진이 죽던 때 화면에 ERROR 와 PASS 가 나란히 찍혔다(2026-08-13).
            print("  %s 검증할 결과가 없습니다 (변환된 파일 0개)" % c("주의", "yellow"))
        elif total_review:
            print("  %s 구문·함수 파리티 통과. IBSheet7 잔존은 판단 변환이 남아 예상된 상태입니다."
                  % c("OK", "green"))
        else:
            print("  %s 변환된 %d개 파일 검증 3종 전체 통과%s"
                  % (c("PASS", "green"), len(ok_files),
                     c(" (실행 실패 %d개는 검증 대상이 아니다)" % len(fail_run), "grey")
                     if fail_run else ""))

    # 런타임 의존 안내 - 전부 정적 검증으로 잡히지 않는다
    if not args.dry_run:
        used, commons = {}, {}
        plugs = {}          # 파일 -> 사용된 함수 집합
        for s in ok_files:
            dst = out_path(s[0], root, args.out, single)
            b = uses_bridge(dst)
            if b:
                used[dst] = b
            cm = uses_common_plugin(dst)
            if cm:
                commons[dst] = cm
            for plug, fns in uses_plugin_funcs(dst).items():
                plugs.setdefault(plug, set()).update(fns)
        if used:
            names = sorted({n for v in used.values() for n in v})
            print()
            print(c("* 브릿지 헬퍼 배포 필요", "yellow"))
            print("  변환 결과가 표준 헬퍼 함수를 호출합니다: %s" % ", ".join(names))
            print("  %s 를 웹앱에 배포하고, IBSheet8 본체(ibsheet.js) %s 로 불러오세요." %
                  (c("helpers/ibsheet-migration.js", "cyan"), c("다음에 <script>", "bold")))
            print("  %s" % c("검증 3종은 정적 검사라 배포 누락을 잡지 못합니다 "
                            "(런타임에 'getValue2 is not a function' 오류).", "grey"))
        if commons:
            names = sorted({n for v in commons.values() for n in v})
            print()
            print(c("* ibsheet-common.js 로드 필요", "yellow"))
            print("  변환 결과가 본체에 없는 전역을 참조합니다: %s" % ", ".join(names[:8]))
            print("  IBSheet8 배포본의 %s 를 함께 불러오세요(본체 다음, 브릿지 헬퍼 앞)." %
                  c("plugins/ibsheet-common.js", "cyan"))
            print("  %s" % c("빠뜨리면 검증 3종은 PASS인데 브라우저에서 "
                            "'IB_Preset is not defined' 로 죽습니다.", "grey"))
        for plug in sorted(plugs):
            fns = sorted(plugs[plug])
            srv = sorted(set(fns) & SERVER_MODULE_FUNCS)
            print()
            print(c("* %s 로드 필요" % os.path.basename(plug), "yellow"))
            print("  변환 결과가 이 파일 소속 함수를 호출합니다: %s" % ", ".join(fns))
            print("  IBSheet8 배포본의 %s 를 함께 불러오세요." % c(plug, "cyan"))
            if srv:
                print("  %s %s 는 **서버 모듈 설치**도 필요합니다(스크립트만으로는 동작하지 않음)."
                      % (c("추가:", "red"), ", ".join(srv)))
                print("  %s" % c("서버 모듈 설치가 어렵다면 Cfg.AutoExcelMode: 2 로 두면 "
                                 "호출 코드를 바꾸지 않고 클라이언트 방식(jszip.min.js)으로 처리됩니다.",
                                 "grey"))
            if plug.endswith("jszip.min.js"):
                print("  %s" % c("jszip 은 클라이언트에서 엑셀 파일을 만드는 데 쓰입니다 - "
                                 "없으면 조용히 다운로드가 되지 않습니다(서버 모듈은 불필요).", "grey"))
            else:
                print("  %s" % c("빠뜨리면 검증 3종은 PASS인데 브라우저에서 "
                                "'... is not a function' 으로 죽습니다.", "grey"))

    if total_review:
        print()
        print(c("다음 단계 - 판단 변환", "bold"))
        print("  검토 필요 항목은 자동 변환하면 위험한 것들입니다(값 분기·값 반전·레벨 이동 등).")
        print("  규칙 ID별 지침: %s" % c("docs/method-mapping.md · property-mapping.md · event-mapping.md", "cyan"))
        print("  절대 규칙과 함정 표: %s" % c("AGENTS.md", "cyan"))
        if args.keep_report:
            print("  항목 목록: 각 출력파일 옆 %s" % c("*.report.json", "cyan"))

    if fail_run:
        return EXIT_VERIFY_FAIL
    if verify_fail:
        return EXIT_VERIFY_FAIL
    if total_review:
        return EXIT_NEEDS_REVIEW
    return EXIT_OK


# ---------------------------------------------------------------------------
# verify
# ---------------------------------------------------------------------------

def cmd_verify(args):
    files = collect(args.input, getattr(args, "ext", None))
    if not files:
        return EXIT_USAGE
    if args.asis and len(files) > 1:
        print(c("--asis 는 파일 1개에만 쓸 수 있습니다.", "red"))
        return EXIT_USAGE

    print(c("검증 3종  (%d개 파일)" % len(files), "bold"))
    if not args.asis:
        print(c("  * --asis 미지정 → 함수 파리티(fn_parity) 검사를 건너뜁니다", "yellow"))
    print()
    bad = 0
    for f in files:
        ok, res = verify_one(args.asis, f)
        print("%s %s" % (c("PASS", "green") if ok else c("FAIL", "red"), f))
        print_verify(res)
        if not ok:
            bad += 1
        print()
    print(c("-" * 66, "grey"))
    print("  통과 %d / 실패 %d" % (len(files) - bad, bad))
    return EXIT_OK if bad == 0 else EXIT_VERIFY_FAIL


# ---------------------------------------------------------------------------
# rules
# ---------------------------------------------------------------------------

def cmd_rules(args):
    try:
        r = json.load(open(RULES, encoding="utf-8"))
    except (OSError, ValueError) as e:
        print(c("규칙 파일을 읽을 수 없습니다: %s" % e, "red"))
        return EXIT_VERIFY_FAIL

    renames = {k: v for k, v in r.get("safe_method_renames", {}).items()
               if not k.startswith("_")}
    vals = [x for x in r.get("value_transforms", []) if not x.get("id", "").startswith("_")]
    flags = [x for x in r.get("flag_for_review", []) if not x.get("id", "").startswith("_")]

    print(c("변환 규칙 통계", "bold"))
    print("  safe_method_renames  %3d  (자동 치환 - 1:1 동일 시그니처)" % len(renames))
    print("  value_transforms     %3d  (자동 치환 - 속성명·값)" % len(vals))
    print("  flag_for_review      %3d  (자동 치환 금지 - 판단 필요)" % len(flags))
    print()

    # 자기점검
    problems = []
    for sec, items in (("value_transforms", vals), ("flag_for_review", flags)):
        for x in items:
            rid = x.get("id", "(id 없음)")
            pat = x.get("pattern")
            if not pat:
                problems.append((rid, "pattern 없음"))
                continue
            if any(ord(ch) < 32 for ch in pat):
                problems.append((rid, "패턴에 제어문자 포함 (역참조 \\1 이 깨진 흔적)"))
            try:
                re.compile(pat)
            except re.error as e:
                problems.append((rid, "정규식 오류: %s" % e))
            if sec == "value_transforms" and "replacement" not in x:
                problems.append((rid, "replacement 없음"))

    # v7 전역 상수: 데이터 블록(`v7_constants`)과 텍스트 치환 규칙(V7CONST_*)이 같은가.
    #
    # 같은 표가 두 형태로 존재한다 — 실행 기반 변환(initconv)은 데이터 블록을,
    # 텍스트 변환은 규칙 패턴을 쓴다. 한쪽만 고치면 **두 경로가 다른 값을 낸다.**
    consts = {k: v for k, v in (r.get("v7_constants") or {}).items()
              if not k.startswith("_")}
    from_rules = {}
    for x in vals:
        rid = str(x.get("id", ""))
        if not rid.startswith("V7CONST_"):
            continue
        m = re.search(r"\)([a-z][A-Za-z0-9]*)\(\?\!", x.get("pattern", ""))
        m2 = re.search(r"(\d+)\s*$", x.get("replacement", ""))
        if m and m2:
            from_rules[m.group(1)] = int(m2.group(1))
    if consts or from_rules:
        for name in sorted(set(consts) | set(from_rules)):
            a, b = consts.get(name), from_rules.get(name)
            if a is None:
                problems.append(("v7_constants", "`%s` 가 규칙(V7CONST_*)에만 있다" % name))
            elif b is None:
                problems.append(("v7_constants", "`%s` 가 데이터 블록에만 있다 "
                                                 "(텍스트 변환에서 안 바뀐다)" % name))
            elif a != b:
                problems.append(("v7_constants",
                                 "`%s` 값 불일치 — 데이터 %s / 규칙 %s" % (name, a, b)))

    # 치환 체인 충돌: A 가 만들어 낸 결과를 B 가 또 바꾸는지.
    #
    # ★예전에는 "A 의 출력 이름이 B 의 패턴 **문자열 안에 있나**" 로 봤다. 그러면
    #   `Size` 가 `WheelScrollSize`·`sizeNoHScroll` 의 부분문자열이라는 이유로 충돌이라
    #   보고했다 — 패턴에 왼쪽 경계 `(?<![\w$])` 가 있어 실제로는 걸리지 않는데도.
    #   틀린 경고가 쌓이면 자기점검 자체를 안 보게 된다. 그래서 **실제로 매칭해 본다.**
    for a in vals:
        rep = a.get("replacement", "")
        produced = re.sub(r"\\\d|[\\()\[\]?*+^$]", "", rep).strip()
        if len(produced) < 3:
            continue
        # A 의 출력이 코드에 나타나는 형태들
        probes = ["%s: 1" % produced, "%s:1" % produced, '%s: "x"' % produced,
                  ".%s(1)" % produced, "%s(1)" % produced]
        for b in vals:
            if a is b:
                continue
            try:
                rx = re.compile(b.get("pattern", ""))
            except re.error:
                continue
            hit = next((p for p in probes if rx.search(p)), None)
            if hit:
                problems.append((a.get("id"),
                                 "출력 '%s' 를 %s 가 또 바꾼다 (순서 의존) — 예: `%s`"
                                 % (produced, b.get("id"), hit)))

    if problems:
        print(c("자기점검 - 문제 %d건" % len(problems), "red"))
        for rid, why in problems:
            print("  %-28s %s" % (rid, why))
        return EXIT_VERIFY_FAIL
    print(c("자기점검 - 문제 없음", "green"))
    print(c("  (패턴 컴파일 · 역참조 무결성 · 필수 키 · 치환 체인 충돌)", "grey"))

    if args.list:
        print()
        print(c("flag_for_review 규칙 목록", "bold"))
        for x in flags:
            print("  %-30s %s" % (x.get("id"), (x.get("desc") or "")[:96]))
    return EXIT_OK


# ---------------------------------------------------------------------------
# doctor
# ---------------------------------------------------------------------------

def cmd_initconv(args):
    """v7 초기화 코드를 실행해 v8 IBSheet.create 옵션을 만든다 (engine/init_convert.py 위임).

    정규식 정적 치환으로는 초기화 구조를 옮기기 어렵다 - 줄바꿈·조건분기·문자열 조립에
    걸린다. 초기화는 결국 데이터(객체)라서 **샌드박스에서 실행해 값을 읽는** 쪽이 정확하다.
    Node 가 필요하다(jscheck 과 동일 조건).
    """
    cmd = [sys.executable, os.path.join(HERE, "engine", "init_convert.py"),
           args.input, "--el", args.el]
    if args.sheet:
        cmd += ["--sheet", args.sheet]
    if args.json:
        cmd += ["--json"]
    return subprocess.call(cmd)


def cmd_doctor(args):
    print(c("실행 환경 점검", "bold"))
    ok = True

    print("  python           %s" % c(sys.version.split()[0], "green"))

    node = subprocess.run(["node", "--version"], capture_output=True, text=True,
                          errors="replace") if _has("node") else None
    if node and node.returncode == 0:
        print("  node             %s" % c(node.stdout.strip(), "green"))
    else:
        print("  node             %s  (jscheck 구문 검사에 필요)" % c("없음", "red"))
        ok = False

    for label, path in (("engine", ENGINE), ("rules", RULES), ("helpers", HELPER)):
        mark = c("OK", "green") if os.path.exists(path) else c("없음", "red")
        print("  %-16s %s  %s" % (label, mark, c(os.path.relpath(path, HERE), "grey")))
        ok = ok and os.path.exists(path)

    for f in ("residue_scan.py", "jscheck.py", "fn_parity.py"):
        p = os.path.join(VERIFY, f)
        mark = c("OK", "green") if os.path.exists(p) else c("없음", "red")
        print("  verify/%-9s %s" % (f.replace(".py", ""), mark))
        ok = ok and os.path.exists(p)

    cfg = os.path.join(os.getcwd(), "migrate.config.json")
    if os.path.exists(cfg):
        print("  config           %s  %s" % (c("OK", "green"), c(cfg, "grey")))
    else:
        print("  config           %s  (없으면 기본값 - migrate.config.example.json 참고)"
              % c("미설정", "yellow"))

    print()
    print(c("정상" if ok else "필수 구성 요소가 빠져 있습니다", "green" if ok else "red"))
    return EXIT_OK if ok else EXIT_VERIFY_FAIL


def _has(exe):
    from shutil import which
    return which(exe) is not None


# ---------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(
        prog="migrate.py",
        description="IBSheet7 → IBSheet8 마이그레이션 툴킷 CLI",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="종료코드: 0=완료 · 1=검증 실패 · 2=판단 변환 필요 · 3=사용법 오류")
    sub = ap.add_subparsers(dest="cmd")

    p = sub.add_parser("convert", help="변환 + 검증 3종")
    p.add_argument("input", nargs="+", help="파일 또는 디렉터리")
    p.add_argument("--out", help="출력 파일/디렉터리 (생략 시 원본 옆 *.tobe.*)")
    p.add_argument("--dry-run", action="store_true", help="출력 파일을 쓰지 않고 리포트만")
    p.add_argument("--no-verify", action="store_true", help="검증 3종 생략")
    p.add_argument("--keep-report", action="store_true", default=True,
                   help="report.json 유지 (기본)")
    p.add_argument("--no-report", dest="keep_report", action="store_false",
                   help="report.json 삭제")
    p.add_argument("--ext", action="append", metavar="EXT",
                   help="디렉터리 스캔에 추가할 확장자 (예: --ext .ep --ext .eco). "
                        "기본: " + " ".join(TARGET_EXT))
    p.add_argument("--config", help="migrate.config.json 경로 (생략 시 입력 파일 위치에서 상위로 탐색)")
    p.add_argument("--no-config", action="store_true", help="config 를 사용하지 않는다")
    p.set_defaults(func=cmd_convert)

    p = sub.add_parser("verify", help="변환된 파일 검증만")
    p.add_argument("input", nargs="+", help="검증할 파일 또는 디렉터리")
    p.add_argument("--asis", help="원본 파일 (함수 파리티 검사에 필요)")
    p.add_argument("--ext", action="append", metavar="EXT",
                   help="디렉터리 스캔에 추가할 확장자 (예: --ext .ep)")
    p.set_defaults(func=cmd_verify)

    p = sub.add_parser("rules", help="규칙 통계 + 자기점검")
    p.add_argument("--list", action="store_true", help="flag_for_review 목록 출력")
    p.set_defaults(func=cmd_rules)

    p = sub.add_parser("initconv",
                       help="v7 초기화 코드 → v8 IBSheet.create 옵션 (실행 기반)")
    p.add_argument("input", help="v7 화면 파일")
    p.add_argument("--sheet", help="시트 변수명 (생략 시 자동 탐지)")
    p.add_argument("--el", default="sheetArea", help="v8 el (컨테이너 element id)")
    p.add_argument("--json", action="store_true", help="추출 원본 JSON 도 출력")
    p.set_defaults(func=cmd_initconv)

    p = sub.add_parser("doctor", help="실행 환경 점검")
    p.set_defaults(func=cmd_doctor)

    args = ap.parse_args()
    if not getattr(args, "cmd", None):
        ap.print_help()
        return EXIT_USAGE
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
