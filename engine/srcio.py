#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""화면 파일 읽기·쓰기 — **인코딩을 다루는 곳은 여기 하나다.**

★왜 따로 두는가
  국내 레거시 화면은 **cp949(euc-kr)** 가 흔하다(실측: 코퍼스 3,030개 중 362개 = 12%).
  그런데 엔진과 검증 스크립트가 저마다 `utf-8` 로만 열고 있어서, 그런 화면에서는
  `UnicodeDecodeError` 로 **통째로 죽었다**(변환 0건, 2026-08-13).
  `migrate.py` 의 파일 탐색만 utf-8→cp949 순으로 읽고 있었다 — 읽는 자리가 흩어져
  있었던 것이 원인이라, 한 곳으로 모은다.

★출력은 **읽은 인코딩 그대로** 쓴다.
  utf-8 로 바꿔 쓰면 `<meta charset="euc-kr">` 인 화면이 브라우저에서 깨진다.
"""
ORDER = ("utf-8", "cp949")
BOM = b"\xef\xbb\xbf"


def read_source(path):
    """(본문, 인코딩이름). 판별에 실패하면 latin-1 로 읽는다(바이트가 보존돼 되쓸 수 있다).

    ★**BOM 이 있었는지를 구분해서 돌려준다.** `utf-8-sig` 로 읽고 `utf-8-sig` 로 쓰면
      **BOM 이 없던 파일에 BOM 이 붙는다.** JSP 는 `<%@ page %>` 앞의 BOM 이 응답에 그대로
      실려 나가 렌더링을 깨뜨리는 컨테이너가 있다. 원본에 있었으면 그대로 쓰고,
      없었으면 넣지 않는다(2026-08-13, 실제로 붙는 것을 확인해 고쳤다).
    """
    with open(path, "rb") as f:
        raw = f.read()
    if raw.startswith(BOM):
        return raw[len(BOM):].decode("utf-8", "replace"), "utf-8-sig"
    for enc in ORDER:
        try:
            return raw.decode(enc), enc
        except UnicodeDecodeError:
            continue
    return raw.decode("latin-1"), "latin-1"


def read_text(path):
    """인코딩이 필요 없을 때 쓰는 짧은 형태."""
    return read_source(path)[0]


def write_output(path, text, enc):
    """변환 결과를 **원본과 같은 인코딩·BOM·줄끝**으로 쓴다.

    치환으로 넣는 글자는 전부 ASCII 라 원본 인코딩으로 되쓸 수 있어야 정상이다.
    안 되면 조용히 바꾸지 않고 **알리고** utf-8 로 쓴다.

    ★`utf-8-sig` 는 **원본에 BOM 이 있었을 때만** 온다(read_source 주석).
    """
    # newline="" — 원본의 줄끝(CRLF/LF)을 그대로 보존한다
    try:
        with open(path, "w", encoding=enc, newline="") as f:
            f.write(text)
        return enc
    except UnicodeEncodeError:
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(text)
        print("  [주의] 원본 인코딩(%s)으로 되쓸 수 없는 글자가 있어 utf-8 로 저장했습니다: %s"
              % (enc, path))
        return "utf-8"
