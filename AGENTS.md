# IBSheet7 → IBSheet8 마이그레이션 — AI 에이전트 필수 규칙 (범용)

이 파일은 **모든 IBSheet7→8 변환 프로젝트에서 공통으로 적용**되는 작업 규칙이다.
이 툴킷(`이 폴더`)을 변환 대상 프로젝트에 두거나 참조 경로로 지정해 사용한다.

> **이 파일이 규칙 원본(Single Source of Truth)이다.** 특정 AI 도구가 자동으로 읽는
> 진입점 파일(`CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md` 등)은 모두
> 이 `AGENTS.md`를 가리키는 얇은 포인터일 뿐이다. **규칙 수정은 반드시 이 파일에서만** 한다.
> "AI 에이전트"는 이 문서를 읽고 변환을 수행하는 모든 AI 모델/도구(Claude, Gemini, Copilot,
> Cursor, Codex 등) 또는 사람을 가리킨다.

- 지식 문서(추측 금지의 근거): `./docs/`
- **★ 벤더 매뉴얼은 이 리포의 `./docs/ibsheet7-manual/` · `./docs/ibsheet8-manual/` 을 본다.**
  다른 곳에 있는 매뉴얼 사본을 직접 참조하지 않는다 — 리포 안의 것이 작업 기준이다.
- **IBSheet8 매뉴얼 최신본**: <https://github.com/ibsheet/ibsheet8-manual> (공개판).
  `./docs/ibsheet8-manual/` 이 그보다 오래됐을 수 있다 — 판단이 걸리는 항목은 최신본을 확인한다.
  (IBSheet7 매뉴얼은 공개 배포본이 없다. 갱신이 필요하면 툴킷 관리자에게 요청한다.)
- 변환 엔진: `./engine/` (`migrate_core.py` + `rules/migrate_rules.json`)
- 검증 스크립트: `./verify/` (`residue_scan.py` · `jscheck.py` · `fn_parity.py`)
- 표준 헬퍼(런타임): `./helpers/ibsheet-migration.js` (IBSheet7↔8 행/열 인덱스 변환, 값·속성 접근 등 — 변환 대상 프로젝트에 포함해 사용). 인덱스는 `getRowByIndex7`/`getColByIndex7`/`getColIndex7`, 값·속성은 `getValue2`/`setValue2`/`setAttribute2` 사용. **전체 목록·예외는 아래 「표준 브릿지 함수」 참고**
- 참조 예제: `./samples/` (ASIS/TOBE 한 쌍 + 브릿지 선택 근거). 변환 판단이 헷갈리면 여기를 먼저 본다.
- 프로젝트별 컨벤션 템플릿: `./migrate.config.example.json` → 대상 프로젝트 루트에 `migrate.config.json`으로 복사·수정

---

## ★ 절대 규칙 (위반 금지)

1. **매뉴얼 페이지 하나로 실존을 단정하지 않는다.** 벤더 매뉴얼에도 오류가 있다 —
   v7 `SetSheetFontName` 은 페이지가 있는데 **실존하지 않는 함수**였다(2026-08-10 확인 →
   2026-08-11 벤더가 페이지를 삭제했다).
   새 규칙을 넣기 전에 **② 벤더 마이그레이션 표에 있나 ③ 실제 고객 코드에서 호출되나**
   를 함께 본다. 셋 다 없으면 규칙으로 만들지 말고 확인 대상으로 남긴다
   (`unused_targets.py` 가 호출 0건 타깃을 뽑아 준다).
1. **`IB_Preset` 은 배포본 `plugins/ibsheet-common.js` 에 있는 것만 쓴다** (벤더 확인 2026-08-12).
   ★**매뉴얼 예제에 나오는 이름이 곧 배포본 목록은 아니다.** `props/col/extend.md` 의
   `IB_Preset.USD`·`IB_Preset.REGD` 는 배포본에 없는데, 문서 오류가 아니라 **"프로젝트가
   원하는 프리셋을 직접 추가해 쓸 수 있다"** 를 보여주는 예시다. 컬럼 속성 여러 개를 이름
   하나로 묶는 용법 설명이지 **변환 대상이 아니다.** 예제를 그대로 옮기면 정의하지 않은
   프리셋을 걸게 된다. 근거는 **라이브러리**다 (`preset_check.py` 가 대조한다).
   **v7 `Format` 이 전부 프리셋으로 덮이지도 않는다** — 대응이 없으면 지어내지 말고 남긴다.
1. **추측 금지.** IBSheet8 API/이벤트/속성은 변환 전 반드시 `./docs/` 문서를 **먼저 읽는다(파일 열람)**. 기억·추측으로 변환하지 않는다. 벤더 매뉴얼이 별도로 있으면 그것도 먼저 확인한다.
2. **ASIS의 모든 함수는 TOBE에 존재해야 한다.** 함수를 통째로 빠뜨리지 않는다. 매 파일 `fn_parity.py`로 확인.
3. **한 번에 한 파일씩.** 여러 파일을 병렬로 흩뿌리지 않는다(함수 누락의 주원인).
4. **col 인자 = plain Name만.** `setAttribute`/`getValue`/`setValue`의 컬럼 인자에 `시트id.colName` 접두사를 넣지 않는다.
5. **원본 보존.** 변환 결과는 별도 출력 파일에 쓰고, 원본 덮어쓰기 전 사용자 확인.
6. **문자열 치환 시 인코딩 주의.** 화면 파일은 `UTF-8` 과 `cp949` 가 섞여 있다 — 읽기·쓰기는
   반드시 `engine/srcio.py` 의 `read_source`/`write_output` 을 쓴다(판별 + **원본의 인코딩·BOM·줄끝 보존**).
   직접 `open(..., encoding='utf-8')` 로 열면 cp949 화면에서 죽거나 한글이 깨진다.
   (PowerShell `Get-Content`/`Set-Content` 는 기본 인코딩이 달라 한글 파괴 가능 → 금지)
7. **IBSheet v3 화면은 대상이 아니다.** `InitDataProperty`·`InitHeadRow`·`InitRowInfo` 계열
   (규칙 `v3_init_names`)이 있으면 변환하지 않고 **대상이 아니라고 알린다.** `createIBSheet(...)` 가
   v3 화면에도 있어 v7 로 오인된다 — "초기화 구조가 없다"고 하거나 값을 뽑아 "이만큼 잡혔다"고 해도 안 된다.

---

## 설계 원칙: 결정론 + 판단 + 자기검증

| 레이어 | 담당 | 처리 대상 |
|---|---|---|
| **결정론** | `engine/migrate_core.py` (`engine/rules/migrate_rules.json`) | 1:1 동일 시그니처 메서드, 속성값 변환 — 자동·안전 |
| **초기화** | `engine/init_convert.py` + `init_extract.js` | v7 초기화를 **실행해서** 값을 읽어 v8 옵션 코드 생성 — AI 불필요 |
| **판단** | AI 에이전트 + `docs/` 매뉴얼 | 반환값 의미 변경, 접두사 strip, 미지원 API 재구성 — 컨텍스트 필요 |
| **검증** | `verify/residue_scan.py`·`jscheck.py`·`fn_parity.py` | 잔존 0 / 구문 OK / 함수 누락 0 자기 증명 |

**실측 비율** (고객 화면 542개 · 손댈 지점 32,071건)

| | 비율 |
|---|--:|
| 결정론 — 엔진이 파일을 직접 고침 | **40.4%** |
| 초기화 — `init_convert` 가 v8 옵션 코드를 만들어 줌 | **23.1%** |
| 판단 — 규칙별 지침이 `docs/` 에 있음 | 29.7% |
| 판단 — 지침이 없어 매뉴얼을 보고 결정 | 6.8% |

★**판단 항목이 0건인 화면은 없다**(542개 중 0개). 위 비율은 **항목 기준**이고
"화면이 그대로 동작하는 비율"이 아니다. 이 구분을 흐리면 안 된다.

★남은 판단은 **타이핑이 남은 것이 아니라 호출 지점의 의도에 따라 답이 갈리는 것**이다.
542개 화면 중 **97.8%** 에 "이름만 바꾸면 오류 없이 동작이 달라지는" 항목이 들어 있었다.
그래서 결정론 레이어는 그 자리를 **일부러 건드리지 않는다.**

위험한 변환을 스크립트가 멋대로 하지 않고 AI 에이전트에게 넘기는 것, 결과를 스스로 검증하는 것이 신뢰성의 핵심.
검증 3종은 순수 Python 스크립트라 **어떤 AI 모델이 변환했든 결과가 결정론적으로 동일하게 판정**된다 — 이것이 범용 툴킷의 핵심 강점이다.

---

## 변환 워크플로우 (5단계)

### 1. 스코프 & 설정
- 대상 파일 확정(한 번에 하나).
- `migrate.config.json`은 **엔진이 입력 파일 위치에서 상위로 올라가며 자동 탐색**한다
  (`migrate.config.json` 또는 `ibsheet8-migrate.config.json`). `--config` 로 직접 지정하거나
  `--no-config` 로 끌 수 있다.

| 항목 | 엔진이 자동 적용 | 에이전트가 판단 |
|---|---|---|
| `stripPrefixes` | **컬럼 참조 자리의 문자열 리터럴만** — ① `Col` 정의의 `Name: "<접두사>col"` ② 컬럼 인자를 받는 메서드(`getValue`/`setValue`/`setAttribute`/`getColIndex`/브릿지 `*2`·`*7` 등)의 리터럴 인자 | 그 밖의 등장 전부. 런타임 문자열 조립(`"pfx." + v`), 컬럼이 아닌 참조 → `CONFIG_PREFIX_RESIDUE` flag 로 보고된다 |
| `keepPrefixes` | 위 자리에서 **매칭되면 건드리지 않는다**(폼 필드·팝업 매핑 보존). 보존 건수를 리포트에 남긴다 | keep/strip 어느 쪽인지 애매한 접두사의 판정 |
| `urlConvention` | 없음 | 조회/저장 URL 재작성 전부 |
| `sheetVarSuffix` · `output` | 없음 | 참조값으로만 사용 |

> config 가 없으면 접두사 자동 제거는 **일어나지 않는다**(경고만 출력). 접두사 정리가 필요한
> 프로젝트라면 `migrate.config.example.json`을 복사해 만든다.

### 2. 결정론 자동 변환

**권장 — 실행 CLI로 변환+검증을 한 번에:**
```
python ./migrate.py convert <입력파일|디렉터리> --out <출력경로>
```
종료코드: `0` 완료 · `1` 검증 실패(구문·함수 파리티) · `2` **판단 변환 필요**(정상 경로) · `3` 사용법 오류.
`2`는 실패가 아니다 — 아래 3단계로 넘어가라는 신호다.

> **★디렉터리를 넘길 때는 확장자를 먼저 확인한다.** 목록에 없는 확장자는 **조용히 빠진다**
> (파일을 직접 지정하면 처리된다). 기본값은 `.jsp .js .html .htm .ep .eco .jspf .inc .do` 이고,
> 실제 고객사에서 `.ep`·`.eco`·`.do` 를 쓰는 것을 확인했다. 그 밖의 확장자는 `--ext .xxx` 로 더한다.
> 변환 대상 개수가 예상보다 적으면 **이것을 가장 먼저 의심한다.**

엔진만 직접 쓸 때:
```
python ./engine/migrate_core.py <입력파일> --out <출력파일> --report <report.json>
```
- 안전한 1:1 메서드·속성 변환 자동 적용. `report.json`의 `needs_review.items` = 직접 처리할 목록.

보조 명령:
```
python ./migrate.py verify <출력파일> --asis <원본>   # 검증 3종만
python ./migrate.py rules                            # 규칙 통계 + 자기점검
python ./migrate.py doctor                           # 실행 환경 점검
```
`rules`는 패턴 컴파일·역참조 무결성·필수 키·**치환 체인 충돌**(어떤 규칙의 출력이 다른 규칙의
입력과 겹쳐 순서에 의존하는 상태)을 점검한다. 규칙 파일을 고친 뒤 반드시 한 번 돌린다.

### 2-1. 초기화 코드는 `initconv` 를 먼저 돌린다 (선택이지만 권장)

시트 생성·초기화(`createIBSheet2`·`SetConfig`·`InitColumns`·`IBS_InitSheet`)는 **정규식으로 옮기기
어렵다** — 줄바꿈·조건분기·문자열 조립·전역 상수에 전부 걸린다. 초기화는 결국 데이터(객체)라서
**샌드박스에서 실행해 값을 읽는** 쪽이 정확하다.

```
python ./migrate.py initconv <입력파일> --el <컨테이너 element id>
```

- `engine/init_extract.js` (Node) 가 v7 코드를 **`node:vm` 샌드박스에서 실행**해 구조만 뽑고,
  `engine/init_convert.py` 가 **기존 규칙**(`engine/rules/migrate_rules.json`)을 적용해
  `IBSheet.create({...})` 골격을 만든다. **규칙은 한 곳에만 둔다.**
- 미정의 이름(프로젝트 헬퍼·전역 상수)은 오류에서 잡아 자동으로 스텁하고 재시도한다.
  `$(document).ready(...)` 안의 초기화도 콜백을 실행해 잡아낸다.
- **초기화 함수를 부르는 쪽이 외부 파일에 있어도 잡아낸다.** v7 표준 구조는
  `createIBSheet("mySheet", …)` 로 만들고 `init_mySheet()` 에서 초기화하는데, 그
  `init_*()` 를 **프레임워크 공통 js**(예: `setSheet()`)가 부르는 프로젝트가 많다.
  화면 파일만 실행하면 그 호출자가 스텁이 되어 아무것도 추출되지 않으므로,
  **본문에 초기화 호출이 있는 함수**를 찾아 직접 실행한다(`직접 실행 :` 줄로 알려준다).
- **한 화면에 시트가 여러 개면 시트별로 갈라서 출력**한다(마스터-디테일 화면이 흔하다).
  컨테이너 id 는 `--el 시트명=id,시트명2=id2` 로 지정한다. 생략하면 `<시트명>_area` 로 둔다.
- 판단이 필요한 것(값 반전·레벨 이동·구조 분리)은 **자동으로 옮기지 않고 목록으로 출력**한다.
  그 목록을 3단계에서 처리한다.
- **v8 매뉴얼에 없는 속성은 그대로 내보내지 않고 알려준다.** v8 은 모르는 옵션을 **오류 없이
  무시**하므로(예: v7 `DataRowMerge`·`PointCount`) 그냥 실으면 화면만 조용히 달라진다.
  개별 페이지가 없고 본문 언급만 있으면 "확인 필요", 아예 없으면 "무시된다"로 등급을 나눈다.
- 출력은 **검토 후 사용한다.** 그대로 붙여넣는 결과물이 아니다.

> 고객 코드를 **실행**하므로 부작용이 있는 코드(ajax·DOM 조작)는 스텁으로 막혀 있지만,
> 결과가 이상하면 `--json` 으로 추출 원본을 확인한다.

### 3. 판단 변환 (핵심 작업)
`needs_review`를 **한 건씩** 처리. 규칙 ID별 지침은 `./docs/`:
- 메서드: `method-mapping.md` / 속성: `property-mapping.md` / 이벤트: `event-mapping.md`
- 미지원·삭제: `deprecated-removed.md` / 함정·컨벤션: `conventions.md`

특히 주의:
- `Hidden:true` → `Visible:0` (★값 반전)
- `ColValueDup` → `getRowsByDup` (반환 index→객체 배열, `>0`/`==-1` 비교 재작성)
- `GetSelectRow`/`SelectCell` → `getFocusedRow`/`focus` (index→행객체)
- `GetSearchData`/`GetSaveData` → 미지원 → ajax 재구성 (★동작 검증 필요)
- 접두사는 config의 `stripPrefixes`만 제거, `keepPrefixes`는 보존

### 4. 자기 검증 (3종 모두 통과해야 완료)
```
python ./verify/residue_scan.py <출력파일>          # IBSheet7 PascalCase 잔존 = 0
python ./verify/jscheck.py     <출력파일>          # JS 구문 OK
python ./verify/fn_parity.py   <원본> <출력파일>     # ASIS 함수 누락 = 0
```
실패 시 3단계로 돌아가 수정 후 재검증.

### 5. 리포트
파일별: 자동 변환 건수 / 판단 변환 건수 / 검증 3종 결과 / ⚠ 브라우저 동작 검증 권장 항목.

---

## 핵심 변환 규칙 요약 (상세는 docs/)

- 컬럼 Name = plain (`시트id.`/`xxxDTOList.` 접두사 strip, 폼·팝업 접두사 유지)
- EtcData: `GetEtcData("키")`→`sheet.etc.키`(읽기) / `SetEtcData("키",값)`→`sheet.etc.키=값`(쓰기). 함수 아님·속성이며, 조회 응답의 `etc` 객체가 `sheet.etc`에 담김
- `SearchMode:2` → `0` (**의도된 성능 상향** — 아래 「SearchMode 상향 정책」 참고) / `SaveName`→`Name` / `UpdateEdit`→`ChangeEdit` / `InsertEdit`→`AddEdit`
- `ColMerge`는 **치환하지 않는다** — IBSheet8에도 동명 `ColMerge`(col)이 같은 의미로 존재한다. `Span`은 cell의 colspan으로 전혀 다른 개념
- `Type:"Combo"`→`"Enum"` / `"CheckBox"`→`"Bool"` / `"Status"`→`Extend:IB_Preset.STATUS` / `"DelCheck"`→`Extend:IB_Preset.DelCheck`
- **★ IBSheet8은 기능이 본체 + 플러그인으로 나뉘어 있다** — 아래 「런타임 의존」 참고. 본체만 넣으면
  변환 결과가 **검증 3종 PASS인데 브라우저에서 죽는다.** 리포트에 반드시 함께 적는다
- 행 상태: `I`→`Added`, `U`→`Changed`, `D`→`Deleted`, `R`→`""`
- 반환값 변경(index→객체/숫자→이름)은 **사용처·루프까지** 재작성
- `SetConfig`/`GetConfig` 없음 → 객체 속성 직접 접근(`sheet.CanEdit=0`, `sheet.InEditMode=1`)
- 이벤트 핸들러 인자 = `evtParam`(`.row` 행객체, `.col` 열이름, **`.val`** 셀 값 — `.value` 아님). 대문자 `Row/Col/Value` 잔재 교정
- 공식 `addRow`에 index 인자 금지 → 브릿지 `addRow2(idx)` 또는 `addRow({next: sheet.getFirstRow()})`
- 값·속성 접근은 브릿지 우선(`getValue2`/`setValue2`/`setAttribute2`) — 예외는 아래 참고

---

## ★ SearchMode 상향 정책 (되돌리지 말 것)

`SearchMode:2` → `0` 변환은 **의도된 성능 개선 규칙이다.** 오변환이 아니다.

IBSheet7 `SearchMode:2`(smLazyLoad)와 IBSheet8 `SearchMode:2`(LazyLoad)는 번호·의미가
같으므로 "그대로 두는 것"이 동일 매핑이다. 그런데도 `0`으로 올리는 이유는 IBSheet8의
최대 강점이 **`SearchMode:0` = FastLoad 가상 스크롤**이기 때문이다. 마이그레이션을
단순 이식이 아니라 성능 향상 기회로 쓰는 것이 이 툴킷의 방침이다.

> **AI 에이전트 주의:** 매뉴얼만 대조하면 이 규칙이 버그로 보인다(v7 2 = v8 2).
> `engine/rules/migrate_rules.json`의 `SEARCHMODE_2_TO_0`을 **삭제하거나 되돌리지 말 것.**

**단, FastLoad에는 제약이 있다** (`docs/ibsheet8-manual/appx/fastload-constraints.md`).
변환 후 `CFG_SEARCHMODE_0` flag가 뜨면 아래를 확인하고, 하나라도 걸리면 `SearchMode:2`를 유지한다.

| 구분 | 항목 | 근거 |
|---|---|---|
| 사용 불가 | 피벗된 시트, `Cfg.NoVScroll` | `appx/fastload-constraints.md` |
| 사용 불가 | 행의 **자식 그리드**를 쓰는 시트 — `SearchMode:2` 전용 기능이다 | 벤더 확인 |
| 권장하지 않는 Type | `Lines` · `Html` · `Img` · `Icon` · `Button` (행 높이가 동적으로 변함) | `appx/fastload-constraints.md` |
| 조건부 필요 | 행 높이가 균일하지 않으면(`Wrap:1` 등) `Cfg.AutoRowHeight` 설정 | `props/cfg/search-mode.md` 비교표 |

유지하기로 판단했다면 **그 이유를 코드 주석으로 남긴다** — 다음 변환자가 다시 올리지 않도록.

---

## ★ 런타임 의존 — 본체만으로는 동작하지 않는다

IBSheet8은 기능을 **본체 + 플러그인**으로 나눠 배포한다. 변환 결과가 아래 것을 쓰면 해당 파일을
웹앱에 함께 로드해야 하고, **빠뜨리면 검증 3종은 PASS인데 브라우저에서 죽는다**(정적 검사로는 못 잡는다).
`migrate.py convert` 가 변환 결과를 보고 필요한 것을 알려주므로 **리포트에 그대로 옮겨 적는다.**

| 필요한 파일 | 언제 | 빠뜨리면 |
|---|---|---|
| `helpers/ibsheet-migration.js` (툴킷 제공) | 브릿지 함수(`getValue2`·`setValue2`·`getRowByIndex7` 등 `2`/`7` 접미사) 사용 | `getValue2 is not a function` |
| `plugins/ibsheet-common.js` | **`IB_Preset.*`**(`STATUS`·`DelCheck`·`YMD` 등) · `IBSheet.v7.convertTreeData` | `IB_Preset is not defined` |
| `plugins/ibsheet-excel.js` | `down2Excel` · `down2Pdf` · `down2Text` · `down2Hwpx` · `loadExcel` · `loadText` · `directDown2Excel` · `directLoadExcel` · `getSheetData` · **`down2ExcelBuffer` · `loadExcelBuffer` · `down2HwpxBuffer`** | `down2Excel is not a function` |
| `plugins/ibsheet-dialog.js` | `showFindDialog` · `showPivotDialog` · `showSortDialog` · `showChartDialog` · `showEditDialog` · `showHtmlEditDialog` · `showUploadDialog` · `showDownloadDialog` | `showFindDialog is not a function` |
| `plugins/jszip.min.js` | **`exportData` · `importData`** — **본체(`ibsheet.js`) 소속 함수**이고 `ibsheet-excel.js` 는 필요 없다. 클라이언트 방식이라 **서버 모듈도 불필요**하지만 파일 생성에 jszip 을 쓴다 | 오류 없이 **조용히 다운로드가 안 된다** |

로드 순서: **본체 → 플러그인 → 브릿지 헬퍼**

```html
<script src="/js/ibsheet/ibsheet.js"></script>
<script src="/js/ibsheet/plugins/ibsheet-common.js"></script>
<script src="/js/ibsheet/plugins/ibsheet-excel.js"></script>
<script src="/js/ibsheet/ibsheet-migration.js"></script>
```

> **★ 다이얼로그 중 v7 에 대응이 있는 것은 `ShowFindDialog`·`ShowPivotDialog` 두 개뿐이다.**
> 엑셀 다운로드/업로드·HtmlEdit·Chart 다이얼로그는 **IBSheet8 신규 기능**이라 변환 대상이 아니다
> (벤더 확인). 판단 변환으로 새로 도입할 때만 위 표의 플러그인이 필요하다.
>
> `plugins/ibsheet-dialog.js` 는 **난독화되지 않은 수정 가능한 파일**이다(벤더 확인) — 프로젝트에서
> 조건이나 호출을 고칠 수 있다. 따라서 이 파일의 기본 내용을 "고정된 동작"으로 단정하지 말 것.

> **★★ `Cfg.AutoExcelMode` 가 필요 조건을 가른다 — 먼저 이걸 정한다.**
> `down2Excel()`/`loadExcel()` 은 **호출 코드가 같아도** 이 값에 따라 내부 처리가 달라진다.
>
> | `AutoExcelMode` | 처리 | 필요한 것 |
> |---|---|---|
> | `1` (default) | 서버 모듈 (`down2Excel`/`loadExcel`) | `plugins/ibsheet-excel.js` + **서버 모듈** + `Cfg.Export.Url` |
> | `2` | 클라이언트 모듈 (내부적으로 `exportData`/`importData`) | **`plugins/jszip.min.js`** — 서버 모듈·`Export.Url` **불필요** |
> | `3` | 브라우저 성능 기준 자동 선택 | 두 경로 모두 준비 |
>
> **서버 모듈 설치가 부담이면 `AutoExcelMode:2` 가 정답이다** — 코드는 `down2Excel` 그대로 두고
> 설정만 바꾼다. `showDownloadDialog`(`plugins/ibsheet-dialog.js` 소속) 도 이 값에 따라
> 내부 경로가 갈린다(v8 매뉴얼 명시).
> 근거: `props/cfg/auto-excel-mode.md` · `funcs/dialog/show-download-dialog.md`

> **★ 서버 모듈 경로(`AutoExcelMode:1`, 기본값)는 스크립트만으로 안 된다 — 서버 모듈 설치도 필요하다.**
> `down2Excel` · `down2Pdf` · `down2Text` · `down2Hwpx` · `loadExcel` · `loadText` ·
> `directDown2Excel` · `directLoadExcel` 그리고 아래 `*Buffer` 계열이 해당한다.
> `Down2Excel`→`down2Excel` 처럼 **자동 치환되는 항목이라 조용히 넘어가기 쉽다.**
> 서버 담당자에게 반드시 전달할 것(툴킷 범위 밖). 근거: v8 매뉴얼 각 함수 페이지 + `appx/import-export.md`.
>
> 서버 모듈은 jar/dll 묶음이다 — 스크립트(`plugins/ibsheet-excel.js`)와 **별개로 서버에 깔아야 한다**
> (Java: `ibsheet8-*.jar` · POI 계열 · `ib-itext.jar`(pdf) ·
> `batik`/`commons-codec`(`down2Hwpx`) / .NET: `IBSheet8-4.0.dll` · Syncfusion 계열 · `wkhtmltopdf.exe`).
> **v7 도 서버 모듈이 필요했으므로 이건 새로 생긴 부담이 아니다** — 다만 버전이 다르니 교체 대상이다.
>
> **서버 모듈을 쓰지 않는 길** — 위 `AutoExcelMode:2` 를 쓰면 `down2Excel`/`loadExcel` 호출을
> 그대로 두고 내부적으로 `exportData`/`importData`(본체 소속, `jszip.min.js` 필요)로 처리된다.
> `exportData` 를 직접 호출하도록 코드를 바꿀 필요가 없다 — **설정 한 줄이 더 안전하다.**
> 형식은 `xlsx`/`txt`/`csv` 만 지원하고 구형 `xls` 는 안 된다.

> **★ `*Buffer` 계열은 실제 전송 함수를 감싸는 래퍼다** — 개별 매뉴얼 페이지에는 플러그인 문구가
> 없지만 **같은 플러그인·서버 모듈이 필요하다.** 여러 시트를 한 파일로 묶을 때 쓴다.
>
> ```js
> sheet1.down2ExcelBuffer(true);            // 버퍼링 시작 — 이후 down2Excel 은 즉시 전송하지 않고 누적
> sheet1.down2Excel({fileName:"a.xlsx", sheetName:"교통비"});
> sheet2.down2Excel({sheetName:"식비"});
> sheet1.down2ExcelBuffer(false);           // 종료 시점에 한 파일로 묶여 서버로 전송된다
> ```
>
> `loadExcelBuffer`도 같은 구조다(`false` 에서 파일 선택 창이 열리고 각 워크시트가 시트들에 로드됨) —
> 역시 `plugins/ibsheet-excel.js` + 서버 모듈이 필요하다.
> **`true`/`false` 쌍이 맞는지 확인할 것** — 짝이 깨지면 버퍼에 쌓인 채 전송되지 않는다.

---

## ★ v7 전역 상수(`ibsheetinfo.js`)는 숫자로 정규화된다

IBSheet7 은 `ibsheetinfo.js` 에서 `msAll`·`smLazyLoad` 같은 전역 상수를 정의했고 고객 코드가
숫자 대신 이 이름을 쓴다. **IBSheet8 에는 그 파일이 없다.**

- 그대로 두면 브라우저에서 `smLazyLoad is not defined` 로 죽는다(검증 3종은 PASS)
- 이름 표기라서 값 기반 규칙(`SearchMode:2`→`0`, `MergeSheet` 분기)도 **걸리지 않는다**
- 엔진이 **가장 먼저** 숫자로 바꾼다(`V7CONST_*` 23건) → 그 뒤 값 규칙들이 정상 동작한다

계열: `MergeSheet`(ms*) · `SearchMode`(sm*) · `SizeMode`(size*) · `BasicImeMode`(ime*) ·
`SumPosition`(pos*) · `VScrollMode`(vs*). 표는 `docs/property-mapping.md` 「v7 전역 상수」.

**변환 후 `ibsheetinfo.js` `<script>` 태그를 지운다** — 더 이상 필요하지 않다.

---

## ★ 대상 IBSheet8 버전 = 항상 최신

변환 대상 프로젝트에는 **항상 최신 IBSheet8을 배포한다.** 따라서 매핑을 판단할 때
**"이 속성은 core 8.x.y.z 이상에서만 지원된다" 같은 버전 조건은 고려하지 않는다.**

매뉴얼 페이지의 `Since` 절에 추가 버전이 적혀 있어도, 그것을 이유로
- 매핑을 `⚠️`로 낮추거나
- 하위 호환 대안을 함께 제시하거나
- 검토 flag를 추가하지 **않는다.**

> 예: v8 `GroupSort`는 `core 8.3.0.35`에 추가됐지만, 최신 배포 전제이므로
> v7 `GroupSort` → v8 `GroupSort` **동명 유지**로 확정이며 flag도 두지 않는다.

버전 차이가 실제로 문제가 되는 것은 **매뉴얼에 아예 없는 API**뿐이다(그건 미지원으로 처리).

---

## ★ 맨 치환하면 안 되는 계열 (값 분기·값 반전·레벨 이동)

이름만 바꾸면 **에러 없이 동작만 달라지는** 항목들이다. 검증 3종은 정적 검사라 잡지 못한다.
엔진은 이들을 자동 변환하지 않고 flag로만 넘긴다. 상세 표는 `docs/property-mapping.md`.

| 계열 | v7 → v8 | 함정 |
|---|---|---|
| Merge | `MergeSheet` → `DataMerge` + `HeaderMerge` | v7은 데이터·헤더 병합을 한 number에 담음. `HeaderMerge`로만 바꾸면 **데이터 병합 소실** |
| Merge | `HeaderMergeMode` → `HeaderMerge`(**>0**) + `IgnoreHeaderColMerge`(**반대값**) | **두 속성을 함께** 설정. `IgnoreHeaderColMerge`는 `HeaderMerge > 0`일 때만 적용된다. ★`HeaderMergeMode:0`→`HeaderMerge:0`으로 옮기면 헤더 병합이 사라진다 |
| Merge | `PrevColumnMergeMode` → **동명 유지** | `PrevColumnMerge`는 별개 속성. 단 default가 v7=1, v8=0으로 반대 → 생략했다면 명시 필요 |
| Merge | `ColMerge` → **동명 유지** | `Span`은 cell colspan |
| Drag | `DragMode` → `CanDrag` | v7 number(-1/0/1) vs v8 boolean. v7 `0`은 Ctrl 전용 드래그였음 |
| Drag | `DragRowSelection` → `DragCell` | ★값 반전 (v7 0=셀/1=행, v8 0=행/1=셀) |
| Drag | `DragCell` → **동명 유지** | 단 v8은 `CanDrag:true`일 때만 적용 |
| Sort | `HeaderSort` → `CanSort` / `HeaderSortMode` | 값별로 다른 속성으로 분기. `SortIcons`가 아니다 |
| Merge | `DataRowMerge` → `DataMerge` | v8은 가로·열 병합이 **`DataMerge` 하나로 합쳐져 있어** `MergeSheet` 매핑과 **같은 속성을 다툰다**. 어느 쪽이 맞는지 화면으로 정한다. v8 `RowMerge` default가 `1`이라 켜면 전 행 병합 |
| 헤더 | `HeaderMode.HeaderCheck` → `(cfg) HeaderCheck` | ★**default 반대** (v7 `1`=표시 / v8 `0`=표시 안 함) → v7에서 생략했다면 v8에 `HeaderCheck:1` 명시 필요 |
| 값 반전 | `SetFocusAfterProcess(n)` → `(cfg) IgnoreFocused` | ★**반대값.** v7 `1`=포커스 설정 / v8 `1`=설정 안 함. 메서드가 아니라 초기화 `Cfg` 로 옮긴다 |
| 값 반전 | `Hidden`(Col) → `Visible`(Col) | ★값을 뒤집는다. 초기화 구조 변환(`initconv`)은 리터럴 0/1만 자동 반전하고, 식(`Hidden:isAdmin?1:0`)은 사람에게 넘긴다 |
| 레벨 이동 | `NoImageUrl`(Cfg) → `DefaultImage`(Col) | Cfg에 두면 v8이 무시. `Type:"Img"` 컬럼마다 설정 |
| ★이벤트 | `function <시트id>_OnXxx(A,B,…)` → 초기화 `Events` 객체 + **`evtParam` 하나** | v7 은 **함수명 규약**으로 등록했다 — 메서드 호출이 아니라서 이름만 바꾸면 **등록조차 안 된다.** 인자 이름을 그대로 두면 **오류 없이 undefined**. ★`OnSearchEnd` 는 v8 `onSearchFinish` 가 **실패 시 발생하지 않아** 오류 처리를 `onBeforeDataLoad`/`onDataLoad` 의 `result`·`message` 로 옮겨야 한다 → `docs/event-mapping.md` |
| ★옵션 키 | 메서드 **인자 객체의 키는 v8 에서 camelCase** (`FileName`→`fileName`) | 초기화 속성은 PascalCase 그대로다 — **규칙이 서로 다르다.** 메서드 이름만 바꾸고 인자 객체를 두면 v8 이 **오류 없이 전부 무시**한다. 엔진이 인자 객체 범위 안에서만 자동 변환하고, 인자가 변수면 `OPTION_KEYS_INDIRECT` 로 넘긴다 → `docs/method-mapping.md` |
| ★서식 키워드 | `Format:"Ymd"` 같은 **v7 키워드** → 네 갈래로 갈린다 | v8 은 `Format` 에 **패턴 문자열**을 받는다. v7 키워드는 **모르는 값이라 오류 없이 무시**되고 날짜 서식과 서버 전송값 포맷(`DataFormat`)이 조용히 사라진다. 실측으로 `Ymd` 만 **464개 화면**에서 쓰였다. ①날짜 → `Format` 지우고 `Extend:IB_Preset.YMD`(대문자) ②마스킹(`IdNo` 등) → `CustomFormat` ③`Null*` → 프리셋 **+ `CanEmpty:1`**(프리셋에 없다) ④`Integer`·`Float` → **옮기지 않는다**(Type 기본 포맷). 엔진이 `FORMAT_*` 로 알린다 — 자동 변환하지 않는 이유는 **줄의 구조를 바꾸는 일**이기 때문 → `docs/property-mapping.md` |
| 구조 분리 | `Down2Excel_Url` 등 → `Export.*` / `CountFormat` 등 → `InfoRowConfig.*` | 객체로 이동 |

**메서드·이벤트도 같은 함정이 있다** (상세는 `docs/method-mapping.md` · `docs/event-mapping.md`):

| 계열 | v7 → v8 | 함정 |
|---|---|---|
| 메서드 | `Reset()` → `dispose()` **+ `IBSheet.create()`** | v7은 초기화 후 **새 시트 객체를 반환**해 계속 사용 가능. v8 `dispose()`는 **완전 제거** → 재생성 없이 바꾸면 이후 코드가 죽은 객체를 참조 |
| 메서드 | `ShowPivotTable` → `makePivotTable` | 동일 기능 교체지만 **피벗 시트 id 규칙이 바뀐다**(v7 `원본id_Pivot` → v8 `pivotSheet_원본id`) → id 참조처를 함께 수정 |
| ★메서드 | `CreatePivotTable` → `makePivotTable` | ★**호출 주체가 뒤집힌다.** v7 은 **미리 만든 피벗 시트에서** 부르고 데이터 시트를 인자로 준다(`피벗시트.CreatePivotTable({…}, 데이터시트)`). v8 은 **데이터 시트에서** 부르고 피벗 시트를 스스로 만든다. 이름만 바꾸면 **받는 객체가 틀린 코드**가 된다 — 미리 만들던 피벗 시트 생성 코드도 불필요해진다. 1:1 대응이 없어 자동 치환하지 않는다(`CREATEPIVOTTABLE`) |
| 이벤트 | `OnClick` → **`onAfterClick`** | v8 `onClick`은 **발생 시점이 더 앞섬.** 벤더가 `onAfterClick` 사용을 지시 |
| 이벤트 | `OnButtonClick` → `onClick`/`onAfterClick` | v8에 **Button 전용 클릭 이벤트가 없다** → 모든 컬럼에서 발생하므로 **컬럼 가드 필수** |
| 이벤트 | `OnSaveEnd` → `onAfterSave` | v7=반영·렌더링 후 / v8=**서버 응답 직후**. "화면에 반영됐다" 전제 코드가 깨짐 |
| 이벤트 | `OnChange` → `onAfterChange` | v8은 **`setValue()` 같은 외부 함수 변경에서 발생하지 않는다**(v7은 발생). 브릿지 `setValue2`가 이를 보완 |

---

## 표준 브릿지 함수 (`helpers/ibsheet-migration.js`)

공식 IBSheet8 API가 IBSheet7과 1:1로 매핑되지 않는 부분(인덱스 체계 차이, 반환값 의미 변경, 미지원 API)을 흡수하는 표준 헬퍼다. **변환 시 브릿지가 있는 항목은 브릿지를 우선 사용**하고, 대상 프로젝트에 이 파일을 포함한다. 상세 로직·주석은 파일 참고.

**행 인덱스 ↔ 행 객체** (IBSheet7 인덱스 = 헤더/필터/상단합계행 포함, IBSheet8 = 데이터행만)
| 함수 | 용도 |
|---|---|
| `getRowByIndex7(i)` | IBSheet7 행 인덱스 → 행 객체 (헤더/필터/상단합계 오프셋 보정) |
| `getRowIndex7(row)` | 행 객체 → IBSheet7 행 인덱스 (`getRowByIndex7`의 역함수, 동일 조건) |
| `getFixedTop()` | 상단(Head) 고정 행 배열 반환 |

**열 인덱스 ↔ 열 이름** (IBSheet7 0-base·숨김컬럼 포함, IBSheet8 1-base + SEQ 자동컬럼 보정)
| 함수 | 용도 |
|---|---|
| `getColByIndex7(i)` | IBSheet7 열 인덱스 → 열 Name (`'\|'` 문자열은 이름 배열, SEQ 보정 내장) |
| `getColIndex7(name)` | 열 Name → IBSheet7 열 인덱스 |

**값 / 속성 / 행 상태**
| 함수 | 용도 |
|---|---|
| `getValue2(r,c)` | `getValue` 브릿지. `FormatFix:1` 컬럼은 표시문자열(`getString`) 반환 |
| `setValue2(r,c,v,evt)` | `setValue` + `onAfterChange` 강제 발생. Status(orgType)·Enum 컬럼 특수 처리 |
| `setAttribute2(r,c,attr,val)` | `CanEdit` → `ChangeEdit`/`AddEdit` (Button은 `Disabled`)로 분해 |
| `clearRowStatus(r)` | 행 상태(`Added`/`Changed`/`Deleted`/`Moved`) 일괄 클리어 |

**행 추가 / 삭제 / 집계**
| 함수 | 용도 |
|---|---|
| `addRow2(row,lvl)` | IBSheet7 `DataInsert` 대체 (인덱스 위치별 `next`/`parent` 구성) |
| `removeRow2(...)` | `removeRow` + `onRowDelete` 이벤트 발생 |
| `computeSum(col,start,end,isFullSum)` | 단일 숫자 컬럼의 행 범위 합계 (인덱스/행객체 모두 허용) |

**기타**
| 함수 | 용도 |
|---|---|
| `getEtcData(key)` | 부가 데이터 읽기 브릿지 → `sheet.etc[key]` |
| `setSheetWidth(w)` / `getSheetHeight()` / `setSheetHeight(h)` | 시트 크기 조회·변경 (`setSheetHeight`는 `rerender` 포함) |
| `setActionMenu(menuText)` | IBSheet7 `"\|"` 구분 메뉴 문자열 → IBSheet8 `Def.Row.Menu.Items` 배열 |
| `convertCustomFormat(val,format)` | `#`(숫자)·`*`(마스킹) 사용자 정의 포맷 변환 |

> `setValue2`·`setAttribute2` 등 `2` 접미사, `getRowByIndex7` 등 `7` 접미사가 브릿지 함수 표식이다.

**★ 브릿지를 쓰지 않는 예외** (자세한 근거는 `docs/conventions.md` §5-1):

| 상황 | 이유 | 사용할 것 |
|---|---|---|
| 렌더 억제용 `setValue(r,c,v,0)` | `setValue2`의 4번째 인자는 **`evt`(이벤트 발생 여부)** 로 의미가 다름 | 공식 `setValue` + `renderBody()` |
| **값 변경 핸들러(`onAfterChange`) 안에서 파생 컬럼 쓰기** | `setValue2`가 `IBSheet.OnAfterValueChanged`를 호출해 **변경 통지가 연쇄**될 수 있음 | 공식 `setValue` 또는 `setValue2(...,0)` |
| 합계행(`FormulaRow`)·헤더 셀·이미지/HTML 셀 값 설정 | 데이터 셀이 아니라 `onAfterChange` 불필요 | 공식 `setValue` |
| 원본값(`getAttribute(r,c,"Orig")`) 조회 문맥 | `getValue2`는 `FormatFix` 컬럼에서 표시문자열을 반환 | 공식 `getValue` |
| 속성 **읽기** | 브릿지 없음 | 공식 `getAttribute` |
| EtcData **쓰기** | 브릿지 없음 | `sheet.etc.키 = 값` 직접 대입 |

`setAttribute2`의 `CanEdit` 분해는 **셀 단위(row·col 모두 지정)에서만** 동작한다. 행·열 단위 호출은 공식 `setAttribute`와 동작이 같지만, 호출 형태 통일을 위해 `setAttribute2`로 적는다.

---

## 범위

- ✅ JSP/JS의 IBSheet7 API → IBSheet8 정적 변환 + 정합성 검증(잔존/구문/함수 파리티)
- ❌ 백엔드(서버 컨트롤러/매퍼 SQL), 실제 브라우저 동작/QA — 변환 후 별도 수행

전제: 로컬에 `python3`, `node`(jscheck용) 필요.

---

## 문의 / 기술지원

- 배포처: 아이비시트 기술지원 · 회사명: 아이비리더스
- 연락처: **1644-5615** (ARS 2번) · 홈페이지: www.ibsheet.com
