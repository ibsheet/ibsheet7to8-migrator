# 기여 가이드

이 툴킷을 수정·보강할 때 지켜야 할 규칙. 아래 항목은 모두 **실제로 사고가 났던 지점**이다.

---

## 1. 규칙 원본은 `AGENTS.md` 하나뿐

`CLAUDE.md` · `GEMINI.md` · `.github/copilot-instructions.md` 는 `AGENTS.md`를 가리키는 **얇은 포인터**다.
규칙을 바꿀 때는 `AGENTS.md`만 고친다. 포인터 파일에 규칙을 복사하면 곧바로 어긋난다.

| 바꾸려는 것 | 고칠 파일 |
|---|---|
| 작업 규칙·워크플로우 | `AGENTS.md` |
| 변환 지식(매핑·함정) | `docs/*.md` |
| 자동 변환 규칙 | `engine/rules/migrate_rules.json` |
| 브릿지 함수 | `helpers/ibsheet-migration.js` |

## 2. 문서와 엔진 규칙은 **함께** 고친다

`docs/`만 고치고 `engine/rules/migrate_rules.json`을 두면, 판단 레이어(AI)와 결정론 레이어가 **상반된 지침**을 주게 된다.

특히 위험한 경우 — 어떤 메서드를 `safe_method_renames`에 두면 엔진이 **자동 치환해버려 검토 대상에 오르지도 않는다.**
문서에 "이건 판단이 필요하다"고 적어도 소용없다. 시맨틱이 바뀌는 API는 반드시 `flag_for_review`로 옮긴다.

## 3. 브릿지 함수를 추가·변경하면

1. `helpers/ibsheet-migration.js` 구현
2. `AGENTS.md` 「표준 브릿지 함수」 표에 추가
3. `docs/conventions.md` §5-1 · `docs/method-mapping.md` 해당 행 갱신
4. **★ 「브릿지를 쓰지 않는 예외」에 해당하는지 반드시 검토** — 기계적 일괄 치환이 버그가 되는 자리가 있다:
   - 공식 API와 **인자 의미가 다른** 경우 (`setValue`의 4번째 인자 = 렌더 억제 ↔ `setValue2` = 이벤트 발생 여부)
   - 이벤트 핸들러 **안에서** 호출하면 통지가 연쇄되는 경우
   - 데이터 셀이 아닌 대상(합계행·헤더·이미지 셀)
   - 브릿지가 **존재하지 않는** 기능(속성 읽기, EtcData 쓰기)
5. `samples/tobe/orderList.jsp`에 적용 예시 추가 + 검증 3종 재실행
6. 브릿지가 **셀/행/열 단위 중 일부에서만** 동작한다면 그 조건을 문서에 명시한다

## 4. 문서에 수정 이력을 남기지 않는다

| 성격 | 예 | 처리 |
|---|---|---|
| **문서 이력** — "이 문서가 예전에 틀렸다" | "재검증으로 추가", "기존 X에서 이동" | ❌ `CHANGELOG.md`로 |
| **변환 지침** — "이렇게 하면 버그난다" | "★4번째 인자는 렌더 억제이므로 바꾸지 말 것" | ✅ 본문에 유지 |

둘은 비슷해 보이지만 역할이 정반대다. 전자는 읽는 쪽(특히 AI 에이전트)이 **두 변형 중 어느 게 최신인지 헷갈려 틀린 쪽을 집어갈 위험**이 있다.

## 5. 플러그인 채널을 같은 작업으로 동기화한다

Claude Code 플러그인 버전은 **이 리포지토리를 기준본으로** 동기화한다.
툴킷만 고치고 플러그인을 두면 두 채널이 상반된 지침을 주게 된다.

동기화 대상: `docs/` → `knowledge/` · `engine/` · `verify/` · `helpers/` · `samples/`
경로 참조는 `${CLAUDE_PLUGIN_ROOT}` 기준으로 치환한다. 스킬·에이전트 지침(`SKILL.md`, `agents/*.md`)도 함께 확인한다.

## 6. 검증 3종을 돌린다

```bash
python verify/residue_scan.py samples/tobe/orderList.jsp                      # 잔존 0
python verify/jscheck.py      samples/tobe/orderList.jsp                      # 구문 OK
python verify/fn_parity.py    samples/asis/orderList.jsp samples/tobe/orderList.jsp   # 누락 0
python -c "import json;json.load(open('engine/rules/migrate_rules.json',encoding='utf-8'))"   # 규칙 JSON 유효성
```

검증이 실제로 동작하는지 확인하려면 ASIS에 `residue_scan`을 돌려 **FAIL이 나오는지** 본다.

**검증 3종은 정적 검사다.** 브릿지 헬퍼 배포 누락, 런타임 동작은 잡지 못한다 — 3종 PASS를 "동작 보장"으로 보고하지 않는다.

## 7. 인코딩

한글이 포함된 파일은 **UTF-8**로 읽고 쓴다.

- ✅ Python `read_text(encoding='utf-8')` / `write_text(..., encoding='utf-8')`, 에디터 도구
- ❌ PowerShell `Get-Content` — CP949로 오독해 한글을 깨뜨린다

## 8. 특정 프로젝트·고객사 식별자를 반입하지 않는다

이 툴킷은 **범용**이다. 예제·주석·규칙에 아래를 넣지 않는다:

- 실제 화면 파일명, 시트 ID, 컬럼명 (`xxxSheet.yyyCol` 형태의 실 데이터)
- 특정 프로젝트의 공통 함수·파일 (`commonSheet.js`의 래퍼 함수 등)
- 고객사 규모·프로젝트명, 개발자 PC 절대경로

예제가 필요하면 `samples/`처럼 가공된 이름(`orderList`, `custNm`, `orderDTOList.`)을 쓴다.

## 9. 커밋

- 무엇을 왜 바꿨는지 본문에 적는다. 특히 **정정**은 "원래 무엇이 틀렸고 왜 그렇게 바꿨는지"를 남긴다 — 나중에 되돌리려는 사람이 근거를 찾을 유일한 곳이다
- 문서 본문에는 이력을 남기지 않는다(§4). 이력은 커밋 메시지와 `CHANGELOG.md`에
