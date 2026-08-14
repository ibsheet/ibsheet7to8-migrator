# 변경 이력

**현재 배포 기준(1.2.1)에서 이 툴킷이 무엇을 하는지**만 적는다.
버전 간 비교는 두지 않는다 — 지금까지 배포된 것은 이 버전 하나다.

**변환 규칙 자체는 [`AGENTS.md`](AGENTS.md)와 [`docs/`](docs/)가 원본**이며, 이 파일은 요약이다.
사용법은 [`빠른시작.md`](빠른시작.md) · [`사용가이드.md`](사용가이드.md)를 본다.

---

## 1.2.1

### 변환 레이어

| 레이어 | 담당 | AI 필요 |
|---|---|:--:|
| **결정론** | `engine/migrate_core.py` — 1:1 동일 시그니처 메서드·속성값 치환 | 불필요 |
| **초기화** | `engine/init_convert.py` + `init_extract.js` — v7 초기화를 **실행해서** 값을 읽어 IBSheet8 옵션 코드 생성 | 불필요 |
| **판단** | AI 에이전트 + `docs/` 매뉴얼 — 값 반전·레벨 이동·반환값 의미 변경·미지원 API 재구성 | 필요 |
| **검증** | `verify/` 3종 — 잔존 0 / 구문 OK / 함수 누락 0 | 불필요 |

**실측** (고객 화면 542개 · 손댈 지점 32,071건)

| | 비율 |
|---|--:|
| 결정론 — 엔진이 파일을 직접 고침 | **40.4%** |
| 초기화 — `init_convert` 가 v8 옵션 코드를 만들어 줌 | **23.1%** |
| 판단 — 규칙별 지침이 `docs/` 에 있음 | 29.7% |
| 판단 — 지침이 없어 매뉴얼을 보고 결정 | 6.8% |

- 앞의 두 레이어(**약 63%**)는 **AI 없이 폐쇄망에서 동작**한다(Node + Python 만 필요).
- ★**판단 항목이 0건인 화면은 없다**(542개 중 0개). 위 비율은 **항목 기준**이고
  "화면이 그대로 동작하는 비율"이 아니다.
- ★남은 판단은 타이핑이 아니라 **호출 지점의 의도에 따라 답이 갈리는 것**이다.
  542개 화면 중 **97.8%** 에 "이름만 바꾸면 오류 없이 동작이 달라지는" 항목이 있었다.

### 산출물

| | |
|---|---|
| `*.tobe.<확장자>` | **안전한 변환까지 적용된 초안.** 원본은 보존된다 |
| `*.report.json` | 자동 변환 내역 + **남은 판단 항목의 규칙 ID·줄 번호·사유** |

⚠️ `*.tobe` 를 그대로 배포하면 안 된다. 판단이 필요한 자리는 **원본 코드가 그대로 남는다**
(파일에 마커·TODO 를 넣지 않는다 — 원본 훼손 방지). 어디를 고쳐야 하는지는 리포트에 있다.

### 자동으로 변환하는 것

- 1:1 동일 시그니처 메서드(`safe_method_renames`) · 속성명·값(`value_transforms`)
- **v7 전역 상수를 숫자로 정규화** — `msAll`·`smLazyLoad` 등. IBSheet8 에는 `ibsheetinfo.js` 가
  없어 이름이 남으면 브라우저에서 죽는다. 변환 후 그 `<script>` 태그는 지운다
- **메서드 옵션 키를 camelCase 로** — IBSheet8 은 초기화 속성은 PascalCase(`Header`)인데
  **메서드 옵션은 camelCase**(`fileName`)다. 메서드 이름만 바꾸면 v8 이 옵션을 **오류 없이 전부 무시**한다
  (파일명·시트명·합계가 사라진다). 호출의 인자 객체 범위 안에서만 바꾼다
- `migrate.config.json` 의 `stripPrefixes` — **컬럼 참조 자리의 문자열 리터럴만**

### 판단으로 넘기는 것 (자동 치환 금지)

값 분기·값 반전·레벨 이동·구조 이동 계열. 규칙 127종으로 위치와 사유를 보고한다. 대표 예:

| | |
|---|---|
| `SetColWidth` | v7 은 절대값, v8 `setColWidth` 는 **가감(delta)**. 이름만 바꾸면 300px 이 되는 게 아니라 300px 넓어진다 |
| `ShowToolTip` | **이름이 비슷한 `showTip` 이 아니다.** v7 은 *모든 셀의 툴팁 사용 여부*, v8 `showTip(tip)` 은 *지금 커서 위치에 툴팁 하나 띄우기*. 초기화 `Def.Col`(또는 `Def.Row`)의 `Tip` 으로 옮긴다 — `(col)Tip` default 가 `0` 이라 켜려면 `Tip:1` 을 명시해야 한다 |
| `GetCellValue` | 대개 `getValue2` 지만 합계행·헤더·이미지 셀·`Orig` 원본값 문맥은 공식 `getValue`, 표시 문자열은 `getString` |
| `LastRow()` | `getLastRow()` 는 **행 객체**를 돌려준다 — 숫자 인덱스 `for` 루프를 다시 써야 한다 |
| `SetColProperty` | 여러 속성을 한 번에 넘기는 기능이 없다. `setAttribute` 로 나누되 **앞은 `render:0`, 마지막만 `render:1`** |
| `LevelSaveName` | 컬럼 속성이 아니다. 저장 함수의 `useLevel` + locale `TreeLevelName` 키로 나가며, **`saveMode:0` 일 때만 실제 레벨**(그 외엔 전부 `1`) |
| `Hidden` → `Visible` | **값 반전.** 리터럴은 자동 반전하고 식은 사람에게 넘긴다 |
| `MergeSheet` | v7 이 한 숫자에 데이터·헤더 병합을 담는다 → v8 세 속성으로 갈린다(확정표 적용) |
| `SetRowBackColorD/I/U` | v8 에 메서드가 없다(css 클래스) — 실행 중 색을 바꾸던 코드는 **재설계** |

★**초기화 옵션의 키는 대소문자를 지킨다** — `Def.Col`·`Def.Row` 처럼 첫 글자가 대문자다.
소문자로 쓰면 v8 이 **오류 없이 무시**한다(메서드 옵션 키는 반대로 camelCase 다).

### 초기화 변환 (`init_convert`)

v7 초기화(`IBS_InitSheet`·`SetConfig`·`InitColumns`·`createIBSheet*`)를 **`node:vm` 샌드박스에서
실행해** 최종 값을 읽는다. 정규식으로 읽으면 줄바꿈·조건분기·문자열 조립·전역 상수에 전부 걸린다.

- 초기화를 부르는 쪽이 **외부 파일**(프레임워크 공통 js)이어도 잡아낸다 — 고객 화면 1,791개 중 **95.6%** 추출 성공
- `$(document).ready` · `DOMContentLoaded` · `window.onload` · `$.ajax` 콜백 안의 초기화도 실행해 잡는다
- 미정의 이름(프로젝트 헬퍼)은 오류에서 잡아 자동 스텁하고 재시도한다
- 시트가 여러 개면 시트별로 갈라 `IBSheet.create` 를 따로 낸다(`--el 시트=id,시트2=id2`)
- 실패하면 **원본 파일의 줄 번호**로 위치를 짚고, **구문 오류**(원본 문법이 깨진 것 — 브라우저에서도
  같은 오류)와 **실행 중 오류**(다른 파일에 있는 것에 기대는 것 — 화면은 정상일 수 있다)를 구분한다
- 출력한 옵션은 **사람이 붙여넣는다**(이 명령은 파일을 고치지 않는다)

### 인코딩

`UTF-8` 과 `cp949(euc-kr)` 를 자동 판별한다(실측: 고객 화면 3,030개 중 **362개(12%)** 가 cp949).
출력은 **원본과 같은 인코딩·BOM 유무·줄끝(CRLF/LF)** 으로 쓴다 — 고객 화면 542개로 전수 확인(542/542).
읽기·쓰기는 `engine/srcio.py` 한 곳에서만 다룬다(엔진·검증 3종이 같은 함수를 쓴다).

### 검증 3종

`residue_scan`(v7 잔존 0) · `jscheck`(JS 구문) · `fn_parity`(원본 함수 누락 0). 순수 Python 이라
**어떤 AI 로 변환했든 같은 기준으로 판정**된다. 자동 변환만 돌린 직후에는 잔존 스캔이 통과하지 않는
것이 정상이며(`미완` 표시), 종료코드 `2` 는 실패가 아니라 "판단 변환이 남았다"는 신호다.

⚠️ **검증 3종은 정적 검사다.** 아래 런타임 의존이 빠져도 PASS 가 나오고 브라우저에서만 죽는다.

### 런타임 의존 — 배포해야 하는 것

변환 결과는 **표준 브릿지 헬퍼** `helpers/ibsheet-migration.js` 를 호출한다(`getValue2`·
`setAttribute2`·`getRowByIndex7` 처럼 `2`/`7` 로 끝나는 함수). IBSheet8 본체 **다음에** 불러온다.

IBSheet8 은 기능이 본체 + 플러그인으로 나뉘어 있다.

| 필요한 파일 | 언제 |
|---|---|
| `plugins/ibsheet-common.js` | `IB_Preset.*` · `IBSheet.v7.convertTreeData` |
| `plugins/ibsheet-excel.js` | `down2Excel`·`loadExcel`·`down2Pdf`·`down2Text` 등 |
| `plugins/ibsheet-dialog.js` | `showFindDialog`·`showPivotDialog` 등 |
| `plugins/jszip.min.js` | `exportData`·`importData`(클라이언트 방식 엑셀) |

- 엑셀·텍스트 계열은 스크립트만으로는 안 되고 **서버 모듈 설치**도 필요하다(툴킷 범위 밖).
  서버 모듈이 부담이면 **`Cfg.AutoExcelMode: 2`** 로 호출 코드를 그대로 두고 클라이언트 방식으로 바꿀 수 있다
  (대신 `plugins/jszip.min.js` 가 필요하다).
- `python migrate.py convert` 가 변환 결과를 보고 무엇이 필요한지 알려 준다.

### 대상이 아닌 것

- **IBSheet v3 화면** — `InitDataProperty`·`InitHeadRow`·`InitRowInfo`·`InitColumnInfo` 계열은
  IBSheet7 과 세대가 다른 제품이다. `convert` 가 **건너뛰며 알린다.** `createIBSheet(...)` 는 v3
  화면에도 있어 v7 으로 오인되므로, 대상 화면을 셀 때 먼저 가려야 한다
  (실측: 다른 SI 코퍼스 300화면 중 **216개(72%)가 v3**)
- 백엔드(컨트롤러·매퍼 SQL) 개발, 실제 브라우저 동작/QA
- IBSheet8 라이브러리 제공·라이선스

### 규칙과 근거

- 규칙 원본: `AGENTS.md` · `engine/rules/migrate_rules.json`
  (`safe_method_renames` 71 · `value_transforms` 57 · `flag_for_review` 127 — `migrate.py rules` 로 확인)
- 매핑 근거: 벤더 매뉴얼 전문 `docs/ibsheet7-manual/`(805) · `docs/ibsheet8-manual/`(1,027, 공개판)
  및 그에 맞춰 재검증한 `docs/method-mapping.md` · `property-mapping.md` · `event-mapping.md`
- 참조 예제: `samples/asis` ↔ `samples/tobe` 2쌍. 판단 근거를 `[값반전]`·`[레벨이동]`·`[구조이동]` 주석으로 표시
- `python migrate.py rules` — 규칙 통계 + 자기점검(패턴 컴파일·역참조·치환 체인 충돌)
- IBSheet8 매뉴얼 최신본: <https://github.com/ibsheet/ibsheet8-manual>
