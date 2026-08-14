#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
residue_scan.py — IBSheet7 PascalCase 시트 메서드 잔존 스캔 (검증)

변환 후 `xxxSheet.PascalCaseMethod(` 형태가 남아있으면 IBSheet7 잔재일 가능성이 높다.
주석은 제외한다. 통과 기준 = 0건.

사용법:
  python residue_scan.py <file> [<file> ...]
  종료코드 0 = 잔존 없음, 1 = 잔존 있음
"""
import os, re, sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "engine"))
from srcio import read_text          # noqa: E402  (cp949 화면도 읽어야 한다 — srcio 주석)

# 시트 변수로 추정되는 식별자.메서드( 패턴. 대문자로 시작하는 메서드 = IBSheet7 PascalCase 잔재 의심
PAT = re.compile(r"\b(\w*[Ss]heet\w*)\.([A-Z][A-Za-z0-9]+)\s*\(")

# IBSheet8 정식 식별자(시트 변수명에 우연히 sheet가 들어가도 무방한 것)는 화이트리스트로 제외
WHITELIST = {"IBSheet", "MainTag", "Cfg", "Cols", "Sort", "Group", "Focused"}


def blank_comments(text):
    text = re.sub(r"/\*.*?\*/", lambda m: re.sub(r"[^\n]", " ", m.group(0)), text, flags=re.S)
    text = re.sub(r"(?<!:)//[^\n]*", "", text)
    return text


def scan(path):
    raw = read_text(path)
    text = blank_comments(raw)
    lines = raw.splitlines()
    hits = []
    for m in re.finditer(PAT, text):
        if m.group(2) in WHITELIST:
            continue
        ln = text.count("\n", 0, m.start()) + 1
        code = lines[ln - 1].strip() if ln - 1 < len(lines) else ""
        hits.append((ln, m.group(1) + "." + m.group(2), code[:120]))
    return hits


def main():
    paths = sys.argv[1:]
    if not paths:
        print("usage: residue_scan.py <file> ...")
        return 2
    total = 0
    for p in paths:
        hits = scan(p)
        print("%s : 잔존 %d건" % (p, len(hits)))
        for ln, sym, code in hits:
            print("   L%-5d %-30s %s" % (ln, sym, code))
        total += len(hits)
    print("=== 총 잔존: %d건 (%s) ===" % (total, "PASS" if total == 0 else "FAIL"))
    return 0 if total == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
