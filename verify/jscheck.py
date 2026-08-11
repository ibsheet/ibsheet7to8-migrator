# JSP 내 <script> JS 구문 검증 (JSP 렌더 모사 후 node --check)
# 사용법: python _jscheck.py <jsp경로>
import re, subprocess, tempfile, os, sys

def check(p):
    t = open(p, encoding='utf-8').read()
    blocks = re.findall(r'<script\b(?![^>]*\bsrc\b)[^>]*>(.*?)</script>', t, re.S)
    if not blocks:
        print('  (script 블록 없음)'); return True
    ok = True
    for idx, js in enumerate(blocks):
        # JSP 렌더 모사: EL/c:out/scriptlet 제거
        # c:out은 보통 JS 문자열 안에 위치 → 빈문자열로 제거(따옴표 추가 금지, 오탐 방지)
        js = re.sub(r'<c:out\b[^>]*?/>', '', js)
        js = re.sub(r'<c:out\b[^>]*?>.*?</c:out>', '', js, flags=re.S)
        # c:url은 JS 문자열 안에서 경로로 렌더됨 → 따옴표 없는 placeholder로 치환
        js = re.sub(r'<c:url\b[^>]*?/>', 'x', js)
        js = re.sub(r'<c:url\b[^>]*?>.*?</c:url>', 'x', js, flags=re.S)
        js = re.sub(r'<c:if\b[^>]*?>|</c:if>|<c:forEach\b[^>]*?>|</c:forEach>', '', js, flags=re.S)
        js = re.sub(r'<c:choose\b[^>]*?>|</c:choose>|<c:when\b[^>]*?>|</c:when>|<c:otherwise\b[^>]*?>|</c:otherwise>', '', js, flags=re.S)
        js = re.sub(r'\$\{[^}]*\}', '', js)
        js = re.sub(r'<%[^>]*?%>', '', js)
        f = tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8')
        f.write(js); f.close()
        r = subprocess.run(['node', '--check', f.name], capture_output=True, text=True)
        os.unlink(f.name)
        if r.returncode != 0:
            ok = False
            print('  [SYNTAX ERROR] script #%d' % idx)
            print('   ', r.stderr.strip()[:1500].replace('\n', '\n    '))
    print('  SYNTAX OK' if ok else '  *** 구문오류 ***')
    return ok

if __name__ == '__main__':
    paths = sys.argv[1:]
    if not paths:
        print('usage: jscheck.py <file> [<file> ...]')
        sys.exit(2)
    allok = True
    for p in paths:
        print(p)
        allok &= check(p)
    sys.exit(0 if allok else 1)
