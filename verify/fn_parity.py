#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fn_parity.py — ASIS vs TOBE 함수 존재 파리티 검사 (검증)

★프로젝트 최우선 규칙: "ASIS의 모든 함수는 TOBE에 존재해야 한다."
변환 중 함수가 통째로 누락되는 사고(병렬 변환 시 빈번)를 자동 적발한다.

JS 함수 선언 형태를 모두 수집해 ASIS - TOBE 차집합을 보고한다:
  - function foo(...)
  - var foo = function(...) / foo = function(...)
  - foo: function(...)   (객체 메서드)
  - const/let foo = (...) =>  / foo = (...) =>

사용법:
  python fn_parity.py <ASIS file> <TOBE file>
  종료코드 0 = 누락 없음, 1 = 누락 있음
"""
import os, re, sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "engine"))
from srcio import read_text          # noqa: E402  (cp949 화면도 읽어야 한다 — srcio 주석)

PATS = [
    re.compile(r"\bfunction\s+([A-Za-z_$][\w$]*)\s*\("),
    re.compile(r"\b(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*function\b"),
    re.compile(r"\b(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>"),
    re.compile(r"(?:^|[\{,]\s*)([A-Za-z_$][\w$]*)\s*:\s*function\b"),
]
# 익명/예약어 오탐 제외
IGNORE = {"function", "if", "for", "while", "switch", "catch", "return", "typeof"}


def blank_comments(text):
    text = re.sub(r"/\*.*?\*/", lambda m: re.sub(r"[^\n]", " ", m.group(0)), text, flags=re.S)
    text = re.sub(r"(?<!:)//[^\n]*", "", text)
    return text


def fn_names(path):
    text = blank_comments(read_text(path))
    names = set()
    for pat in PATS:
        for m in pat.finditer(text):
            nm = m.group(1)
            if nm and nm not in IGNORE:
                names.add(nm)
    return names


def main():
    if len(sys.argv) != 3:
        print("usage: fn_parity.py <ASIS> <TOBE>")
        return 2
    asis, tobe = sys.argv[1], sys.argv[2]
    a, t = fn_names(asis), fn_names(tobe)
    missing = sorted(a - t)
    added = sorted(t - a)
    print("ASIS 함수 %d개 / TOBE 함수 %d개" % (len(a), len(t)))
    if missing:
        print("★ TOBE에 누락된 ASIS 함수 %d개:" % len(missing))
        for nm in missing:
            print("   - %s" % nm)
    else:
        print("누락 함수: 없음")
    if added:
        print("(참고) TOBE 신규 함수 %d개: %s" % (len(added), ", ".join(added[:20])))
    print("=== 파리티: %s ===" % ("PASS" if not missing else "FAIL"))
    return 0 if not missing else 1


if __name__ == "__main__":
    sys.exit(main())
