# 변경 이력

이 툴킷의 버전별 변경 사항. **변환 규칙 자체는 `AGENTS.md`와 `docs/`가 원본**이며,
이 파일은 "무엇이 언제 바뀌었는지"만 기록한다(문서 본문에는 수정 이력을 남기지 않는다).

---

## 1.1.0

### 브릿지 우선 (Breaking — 변환 결과에 런타임 의존 추가)

표준 브릿지 헬퍼 `helpers/ibsheet-migration.js`를 툴킷에 포함하고, **브릿지가 있는 항목은 브릿지를 기본으로** 쓰도록 변경했다(이전에는 "1:1 변환이 안 될 때만" 사용).

- ⚠️ **변환 결과가 이 헬퍼를 호출한다.** 고객 웹앱에 파일을 배포하고 IBSheet8 본체 다음에 `<script>`로 불러와야 한다.
  검증 3종은 정적 검사라 **배포 누락을 잡지 못한다.**
- 「브릿지를 쓰지 않는 예외」를 명문화 — 렌더 억제 인자, `onAfterChange` 내부 파생값 쓰기, 합계행/헤더/이미지 셀, `Orig` 원본값 조회, 속성 읽기, EtcData 쓰기.

### 정정

- `ComputeSum` — "지원불가"로 안내하던 것을 브릿지 `computeSum`으로 정정
- `CanEdit` — 공식 `setAttribute`로 넘기라던 안내를 `setAttribute2`로 정정(IBSheet8에서 `ChangeEdit`/`AddEdit`로 분리됨)
- `GetEtcData` — `sheet.etc("키")` 함수 호출로 안내하던 것을 속성 접근 `sheet.etc.키`로 정정
- `evtParam` 셀 값 속성을 `.val`로 통일(일부 문서가 `.value`로 표기하고 있었음)
- `RowDelete` — 자동 치환(`removeRow`) 대상에서 검토 대상으로 이동. `onRowDelete` 필요 여부는 판단이 필요하다

### 추가

- `samples/` — ASIS/TOBE 참조 쌍. 브릿지를 쓴 자리 11건, 공식 API를 유지한 자리 5건을 주석으로 표시. 검증 3종 PASS
- 엔진 규칙 `ROWDELETE` · `COMPUTESUM` · `SHEETSIZE`
- 고객 문서(빠른시작·사용가이드)에 브릿지 헬퍼 배포 안내

### 수정

- `verify/jscheck.py` — 인자 없이 실행할 때 특정 경로를 찾던 기본값 제거 → usage 출력

### 벤더 매뉴얼 기준 전수 재검증 (Breaking — 변환 결과가 달라진다)

기존 매핑 문서는 **요약 대조표를 옮겨 적어** 만들어졌는데,
벤더 매뉴얼 전문(`docs/ibsheet7-manual/` 808파일 · `docs/ibsheet8-manual/` 1,027파일)을 기준으로
속성 155행 · 메서드 74건 · 이벤트 22건을 전수 대조한 결과 **오변환 11건**을 찾아 고쳤다.
모두 "에러 없이 동작만 달라지는" 유형이라 검증 3종(정적 검사)으로는 잡히지 않는다.

**엔진이 잘못 자동 치환하던 것 (11건)**

| 규칙 | 증상 |
|---|---|
| `TouchScrolling`→`TouchScroll` | v8에 **동명 존재**. `TouchScroll`은 스크롤바 모양(0~4)이라 무관한 설정으로 변질 |
| `GroupSort`→`GroupSortMain` | v8에 **동명·동값 존재**. `GroupSortMain`은 오름/내림(1\|2)이라 `0`은 무효값 |
| `PrevColumnMergeMode`→`PrevColumnMerge` | v8에 **동명 존재**. 앞컬럼 머지 기능이 꺼짐 |
| `ColMerge`→`Span` | v8에 **동명 col 속성 존재**. `Span`은 cell colspan → 병합 설정 소실 |
| `MergeSheet`→`HeaderMerge` | v7은 데이터·헤더 병합을 한 number에 담음 → **데이터 영역 병합 전부 소실** |
| `HeaderMergeMode`→`HeaderMerge` | 실제로는 `HeaderMerge`(**>0**) + `IgnoreHeaderColMerge`(**반대값**)를 함께 설정해야 한다. 그대로 옮기면 `HeaderMerge:0`이 되어 **헤더 병합 소실** |
| `DragMode`→`CanDrag` | v7 number(-1/0/1) → v8 boolean인데 값 미변환. `CanDrag:-1` 생성 |
| `NoImageUrl`→`DefaultImage` | v8 `DefaultImage`는 **Col 속성** → Cfg에 두면 v8이 무시 |
| `WheelScrollSize`→`WhellScrollCount` | **오타.** v8 실제 이름은 `WheelScrollCount` → 설정이 무시됨 |
| `Reset`→`dispose` | v7은 초기화 후 새 시트 객체를 반환, v8 `dispose()`는 **완전 제거**. 공식 지침은 `dispose()` + 같은 id로 `IBSheet.create()` 재생성 |
| `GetRowStatus`→`getRowStatus` | **인자·반환값이 모두 바뀐다.** v7 행 index → v8 행 객체 / v7 `"R"`·`"U"`·`"I"`·`"D"` → v8 `""`·`"Changed"`·`"Added"`·`"Deleted"`. 그대로 치환하면 잘못된 인자 전달 + 비교 조건이 항상 거짓이 되어 **상태 판정이 무력화** |

**문서 오류 정정**

- `HeaderSort` → `SortIcon`(단수)으로 적혀 있었으나 실제로는 **값별 분기**(`CanSort` / `HeaderSortMode:2`)
- `DragCell` → `SelectingCells` 는 드래그와 선택을 혼동한 것. v7/v8 `DragCell`은 동명·동값이고 `SelectingCells`의 v7 대응은 `SelectionMode`
- `DragRowSelection` → `DragCell` 은 **값 반전** 필요(v7 0=셀·1=행 / v8 0=행·1=셀)
- `AutoRowHeight` → `Wrap` 은 오류. v8에 동명 존재하며 **default가 반대**(v7 `1` / v8 `0`)
- `OnClick` → `onClick` 이 아니라 **`onAfterClick`** (v8 `onClick`은 발생 시점이 더 앞섬 — 벤더 지침)
- `OnButtonClick`·`OnSaveEnd`·`OnChange` 항목 신설 — Button 전용 클릭 이벤트 부재(컬럼 가드 필수), 저장 이벤트 시점 차이, `setValue()`로는 `onAfterChange` 미발생
- `GetSelectionMode`/`SetSelectionMode` — `SelectionCells` 오타 정정 + **값 반전** 경고
- `Get/SetFrozenRows` — "SearchMode 0,3 불가"로 적혀 있었으나 실제는 **0·1·2에서만 가능**
- `CreatePivotTable`/`ShowPivotTable` — 호출은 1:1이지만 **피벗 시트 id 규칙 반전**(v7 `원본id_Pivot` → v8 `pivotSheet_원본id`)
- `property-mapping.md` — 레벨 이동 14건 · 구조 이동 7건이 `✅`로 표시돼 맨 치환처럼 보이던 것을 `⚠️`로 정정. `MergeSheet`·`PrevColumnMergeMode` 누락 행 추가. `Merge`·`Drag/Select`·`Sort` 계열 상세 절 신설

### 추가 — 정책 명문화

- **`AGENTS.md` 「SearchMode 상향 정책」** — `SearchMode:2`→`0`은 IBSheet8 강점인 FastLoad로 올리는 **의도된 규칙**이다. v7 `2`와 v8 `2`가 동일해서 매뉴얼만 보면 버그로 보이므로 "되돌리지 말 것"을 명시하고, FastLoad 제약(피벗·`NoVScroll`·행의 자식 그리드·`Lines`/`Html`/`Img`/`Icon`/`Button` 타입·`setFixedTop` 8.4.0.1)을 표로 정리
- **`AGENTS.md` 「맨 치환하면 안 되는 계열」** — 값 분기·값 반전·레벨 이동 항목을 규칙 원본에 표로 고정
- `event-mapping.md` — 벤더 공식 이벤트 대응표(22행) 수록
- `engine/rules/` — `flag_for_review` 45→84건(구조·레벨 이동 속성 20건을 속성별 개별 규칙으로), `value_transforms` 26→17건, `safe_method_renames` 75→73건
- 벤더 매뉴얼 전문을 `docs/ibsheet7-manual/`·`docs/ibsheet8-manual/`로 리포지토리에 포함 — 이후 모든 매핑 판단의 1차 근거

### 추가 — 실행 CLI (`migrate.py`)

변환과 검증 3종을 한 명령으로 묶는 진입점. GitHub 없이 로컬에서 바로 쓴다.

```
python migrate.py convert src/ --out build/    # 변환 + 검증 3종 (디렉터리 트리 보존)
python migrate.py verify build/x.jsp --asis src/x.jsp
python migrate.py rules                        # 규칙 통계 + 자기점검
python migrate.py doctor                       # 실행 환경 점검
```

- **종료코드 `2` = 판단 변환 필요(실패 아님).** 첫 변환은 항상 `needs_review`가 남아 `residue` 검증이
  걸리므로, 이를 "검증 실패"로 보고하면 신호가 무의미해진다. `residue` 실패는 검토 항목이 남아 있는
  동안 `미완`으로 표시하고, `syntax`·`fn_parity` 실패만 진짜 실패(`1`)로 처리한다.
- `rules` 자기점검에 **치환 체인 충돌 검사** 포함 — 어떤 규칙의 출력이 다른 규칙의 입력과 겹쳐
  JSON 배열 순서에 정확성이 의존하는 상태를 잡는다. 역참조(`\1`) 무결성·정규식 컴파일·필수 키도 점검.
- 변환 결과가 브릿지 헬퍼를 호출하면 **배포 안내를 함께 출력**한다(검증 3종은 정적 검사라 배포 누락을 못 잡는다).

### 추가 — `migrate.config.json` 실제 적용

문서에만 있고 구현이 없던 프로젝트 컨벤션을 엔진이 실제로 읽는다. 입력 파일 위치에서 상위로
자동 탐색하며 `--config`/`--no-config` 로 제어한다.

- **엔진이 자동 적용하는 범위는 "컬럼 자리의 문자열 리터럴"뿐이다** — `Col` 정의의 `Name`,
  컬럼 인자를 받는 메서드(`getValue`/`setAttribute`/`getColIndex`/브릿지 `*2`·`*7` 등)의 리터럴 인자.
  `keepPrefixes` 에 걸리면 건드리지 않고 보존 건수를 리포트에 남긴다.
- 그 밖의 등장(런타임 문자열 조립, 컬럼이 아닌 참조)은 `CONFIG_PREFIX_RESIDUE` 검토 항목으로 넘긴다.
- 자동/판단 경계표를 `AGENTS.md` 워크플로우 1단계와 `migrate.config.example.json` 에 명시.

### 추가 — 2번째 참조 샘플 (`samples/*/salesStat.jsp`)

1번 샘플이 다루지 않던 **"맨 치환하면 안 되는 계열"** 전용 ASIS/TOBE 쌍. ASIS를 엔진에 넣으면
규칙 **32종 / 45건**이 검토 항목으로 잡히고(Merge 6 · Drag 3 · Sort 2 · 레벨이동 6 · 구조이동 6 ·
메서드 2 · 이벤트 3), TOBE는 그것을 매뉴얼 근거대로 처리해 검증 3종을 통과한다.
`[동일유지]`/`[값반전]`/`[값분기]`/`[레벨이동]`/`[구조이동]` 주석으로 각 판단 근거를 표시했다.

### 추가 — 런타임 의존 안내 (Breaking 성격: 배포 절차가 늘어난다)

**IBSheet8은 기능이 본체 + 플러그인으로 나뉘어 있는데, 툴킷이 그것을 안내하지 않았다.**
자동 치환으로 만들어진 코드가 본체에 없는 함수를 호출해도 **검증 3종은 PASS**로 나오고
브라우저에서만 죽는다(브릿지 헬퍼 배포 누락과 같은 유형 — 정적 검사로는 못 잡는다).

| 필요한 파일 | 언제 |
|---|---|
| `plugins/ibsheet-common.js` | `IB_Preset.*`(`STATUS`·`DelCheck`·`YMD` 등) · `IBSheet.v7.convertTreeData` |
| `plugins/ibsheet-excel.js` | `down2Excel`·`down2Pdf`·`down2Text`·`down2Hwpx`·`loadExcel`·`loadText`·`directDown2Excel`·`directLoadExcel`·`getSheetData`·`down2ExcelBuffer`·`loadExcelBuffer` |
| `plugins/ibsheet-dialog.js` | `showFindDialog`·`showPivotDialog`·`showSortDialog` 등 12개 |
| `plugins/jszip.min.js` | `exportData`·`importData` (클라이언트 방식 엑셀) |

- **엑셀·텍스트 계열은 스크립트만으로 안 되고 서버 모듈 설치도 필요하다.** `Down2Excel`→`down2Excel`
  처럼 자동 치환되는 항목이라 조용히 넘어가기 쉽다(툴킷 범위 밖 — 서버 담당자 전달 필요)
- `*Buffer` 계열은 실제 전송 함수를 감싸는 **래퍼**다(`Buffer(true)` → `down2Excel` → `Buffer(false)`
  에서 전송). 개별 매뉴얼 페이지에 플러그인 문구가 없지만 같은 의존이 있다
- **참조 샘플 2개가 실제로 이 결함 상태였다** — `tobe/orderList.jsp`가 `IB_Preset` 사용하면서
  `ibsheet-common.js` 미로드, `tobe/salesStat.jsp`가 `down2Excel` 호출하면서 `ibsheet-excel.js` 미로드.
  둘 다 검증 3종 PASS였다
- **CLI가 변환 결과를 보고 필요한 파일을 알려준다** — 브릿지 헬퍼 안내와 같은 방식으로 확장

### 추가 — `jszip` (런타임 의존의 2차 조사)

플러그인 의존을 라이브러리 실물(v8 `8.4.0.13`)로 재확인하면서 **빠진 파일 하나를 찾았다.**

- **`plugins/jszip.min.js` — 5번째 파일이 빠져 있었다.** v8 신규 `exportData`/`importData` 는
  **본체(`ibsheet.js`) 소속 함수**이고 `ibsheet-excel.js` 는 필요 없다(벤더 확인). 클라이언트 방식이라
  **서버 모듈도 필요 없는 대신** 이 파일을 요구한다(매뉴얼 `funcs/core/export-data.md` 에 명시).
  없으면 `is not a function` 도 아니고 **조용히 다운로드가 되지 않는다.**
  **v7 에 대응 함수가 없어 자동 변환 대상은 아니다**
- CLI 가 변환 결과에서 이 파일이 필요한지 함께 알려준다

**다이얼로그 계열 정리** — IBSheet7 에 대응이 있는 것은 `ShowFindDialog`·`ShowPivotDialog`
**두 개뿐이다**(v7 매뉴얼에 페이지 존재). 엑셀 다운로드/업로드·HtmlEdit·Chart 다이얼로그는
**IBSheet8 신규 기능**이라 변환 대상이 아니다(벤더 확인). 판단 변환으로 새로 도입할 때만
`plugins/ibsheet-dialog.js` 가 필요하다.

- `plugins/ibsheet-dialog.js` 는 **난독화되지 않은 수정 가능한 파일**이다 — 프로젝트에서 조건·호출을
  고칠 수 있으므로 기본 내용을 고정된 동작으로 단정하지 않는다

### 추가 — v7 전역 상수 정규화 (Breaking — 이전에는 변환되지 않았다)

IBSheet7 은 `ibsheetinfo.js` 에서 `msAll`·`smLazyLoad` 같은 **전역 상수**를 정의했고 고객 코드가
숫자 대신 이 이름을 쓴다. **IBSheet8 에는 그 파일이 없다.** 그런데 툴킷이 이걸 다루지 않아
두 가지 문제가 있었다.

- 변환 결과에 상수 이름이 그대로 남아 브라우저에서 `smLazyLoad is not defined` 로 죽는다
  (검증 3종은 PASS — 정적 검사로 못 잡는 유형)
- 이름 표기라서 **값 기반 규칙이 아예 걸리지 않았다** — `SearchMode: smLazyLoad` 는
  `SearchMode:2`→`0` 상향 규칙을 통과하지 못했고, `MergeSheet: msAll` 도 검토 항목으로 잡히지 않았다

엔진이 **가장 먼저** 상수를 숫자로 정규화한다(`V7CONST_*` 23건). 그 뒤 기존 값 규칙들이 정상 동작한다.
계열: `MergeSheet`(ms*) · `SearchMode`(sm*) · `SizeMode`(size*) · `BasicImeMode`(ime*) ·
`SumPosition`(pos*) · `VScrollMode`(vs*). 변환 후 `ibsheetinfo.js` `<script>` 태그는 지운다.

### 정정 — `MergeSheet` 매핑 확정 + `SetMergeSheet()` → `setAutoMerge()`

`MergeSheet` 값별 v8 대응을 **벤더 확정 매핑표**로 교체했다(이전에는 값 `3`/`4` 를 "확인 필요"·
"단일 대응 없음" 으로 두고 있었다).

| v7 | 상수 | `HeaderMerge` | `DataMerge` | `PrevColumnMerge` |
|---|---|---|---|---|
| `0` | `msNone` | `0` | `0` | `0` |
| `1` | `msAll` | `5` | `5` | `3` |
| `2` | `msPrevColumnMerge` | `0` | `1` | `3` |
| `3` | `msFixedMerge` | `0` | `1` | `3` |
| `4` | `msBaseColumnMerge` | `0` | `1` | `3` |
| `5` | `msHeaderOnly` | `1` | `0` | `2` |
| `7` | `msHeaderOnly`+`msPrevColumnMerge` | `1` | `1` | `3` |
| `8` | `msHeaderOnly`+`msFixedMerge` | `1` | `1` | `3` |
| `9` | `msHeaderOnly`+`msBaseColumnMerge` | `1` | `1` | `3` |

- **`msHeaderOnly`(5) 가 섞였는지가 `HeaderMerge` 를 가른다** — 안 섞이면 `0`, 섞이면 `1`
- **`SetMergeSheet(n)` → `setAutoMerge(dataMerge, headerMerge, prevColumnMerge, ...)`** 규칙 신설
  (`SETMERGESHEET` flag). 인자 순서가 표기 순서와 다르다
- ⚠️ **`setAutoMerge()` 는 호출 시 `Cfg` 의 병합 설정을 전부 초기화하고 전달한 인자만 적용한다.**
  `Cfg` 로 잡아둔 병합 옵션이 있으면 빠짐없이 다시 넘겨야 한다
- `GetMergeSheet()` 는 v8 대응이 없다 → `Cfg` 값을 직접 읽는다

### 추가 — 실제 고객 화면 검증으로 찾은 규칙 (Breaking — 이전에는 안내가 없었다)

제공받은 실제 고객사 화면으로 처음 돌려보고 아래를 보강했다.

**시트 생성·초기화 — v7 명령형 → v8 선언형**
`createIBSheet(id,w,h)` · `createIBSheet2(element,id,w,h)` · `new ibsheetObject()` ·
`IBS_InitSheet(sheet,info)` · `InitHeaders` · `InitColumns` 가 규칙·문서 어디에도 없었다.
camelCase 라 `residue_scan` 도 못 잡아 **조용히 통과**했다. `method-mapping.md` 에
「시트 생성·초기화」 절을 신설하고 `CREATE_IBSHEET`·`IBSHEET_OBJECT_DECL`·`INITHEADERS`·
`INITCOLUMNS` 규칙을 만들었다. `HeaderMode`(`Sort`/`ColMove`/`ColResize`)가 v8 `Cfg` 의
`CanSort`/`CanColMove`/`CanColResize` 로 흡수되는 것도 문서화했다.

**값에 따옴표가 붙으면 규칙이 미탐하던 문제**
실제 코드의 `Hidden:"false"` 가 `HIDDEN_TRUE` 에 걸리지 않았다. 전수 검사해
`SEARCHMODE_2_TO_0`(자동 치환) · `CFG_SEARCHMODE_0` · `HIDDEN_TRUE` 3건을 따옴표 허용으로 고쳤다.
`SearchMode: "2"` → `"0"` 처럼 **따옴표를 보존**하며 변환한다.

**새 매핑·정정**

| 항목 | 내용 |
|---|---|
| `Page` → `(cfg) PageLength` | 이름만 바뀐다(둘 다 default 20). 매핑 자체가 없었다 |
| `FrozenCol` | v8 에 대응 `Cfg` 가 없다 — 최상위 `LeftCols` 로 **구조 이동**(`CFG_FROZENCOL`) |
| `SetTheme` | ✅ 단순 개명으로 적혀 있었으나 **둘째 인자 의미가 다르다**(폴더명 → css 경로) + `render` 인자 추가 → ⚠️ |
| `SetHighlightAfterSort` | "지원안함 ❌"으로 적혀 있었으나 **v8 `Cfg.HighlightAfterSort` 가 있다**. v8 은 값이 0~4 이고 **default 가 1** |
| `SetPageCount` | "지원안함 ❌"으로 적혀 있었으나 **`Cfg.PageLength`** 로 옮긴다. 둘째 인자 `renderPage` 는 대응 없음 |
| `SetCountFormat` · `SetCountPosition` | 메서드 → 초기화 `Cfg.InfoRowConfig` **구조 이동**으로 규칙화 |

**엔진 — 중복 보고 제거**
`GENERIC_*` fallback 규칙이 구체 규칙과 **같은 줄을 중복 보고**하고 있었다. 중복 제거가
규칙 파일의 순서에 의존하는 구현이어서, 구체 규칙을 뒤에 추가하자 새어나왔다.
순서와 무관한 2패스로 바꿨다(실제 파일 검토 건수 17 → 12, 중복 0).

**확장자**
`.ep`·`.eco`(실제 고객사에서 사용)가 디렉터리 스캔에서 빠졌다 → 기본 목록에 추가하고
`--ext` 옵션을 만들었다(프로젝트마다 확장자가 다르다).

### 정정 — `AutoExcelMode` 를 놓쳐 서버 모듈 안내가 불완전했다 (중요)

`down2Excel`/`loadExcel` 을 **무조건 서버 모듈 필수**로 안내하고 있었으나, v8 `Cfg.AutoExcelMode`
값에 따라 **호출 코드가 같아도 내부 처리가 달라진다.**

| `AutoExcelMode` | 처리 | 필요한 것 |
|---|---|---|
| `1` (default) | 서버 모듈 (`down2Excel`·`loadExcel`) | `plugins/ibsheet-excel.js` + **서버 모듈** + `Cfg.Export.Url` |
| `2` | 클라이언트 모듈 (내부적으로 `exportData`·`importData`) | **`plugins/jszip.min.js`** — 서버 모듈·`Export.Url` 불필요 |
| `3` | 브라우저 성능 기준 자동 선택 | 두 경로 모두 준비 |

- **서버 모듈 교체가 어려운 프로젝트는 `AutoExcelMode: 2` 로 우회할 수 있다** — 이전에는
  "`exportData` 를 직접 쓰라(단 v7 대응 없음)"로 안내했으나, **호출 코드를 바꾸지 않고 설정만
  바꾸는 쪽이 안전하다.** `showDownloadDialog`(`plugins/ibsheet-dialog.js` 소속) 도 이 값에 따라
  내부 경로가 갈린다
- CLI 의 서버 모듈 안내에 이 우회책을 함께 출력한다
- 이 속성은 **로컬 매뉴얼에 처음부터 있었다**(`props/cfg/auto-excel-mode.md`). 플러그인 의존을
  함수명으로만 조사해서 놓쳤다

### 추가 — v8 매뉴얼을 공개판(업스트림)과 대조

`github.com/ibsheet/ibsheet8-manual`(공개판, 1,027개)과 로컬본(1,027개)을 대조했다(`manual_diff.py`).

- **업스트림에만 있는 페이지 0건** — 빠진 공개 문서는 없다
- **로컬에만 150개** = 비공개 페이지. **업스트림 존재 여부가 `!` 마커보다 확실한 공개 판정 기준**이다
  (마이그레이션 부록 벤더 마이그레이션 지침 자체도 비공개다)
- 내용이 실제로 다른 11개를 업스트림 기준으로 갱신했다(나머지 497개는 줄바꿈 차이).
  그중 8개가 다이얼로그 페이지인데, **벤더가 다이얼로그의 엑셀 플러그인 의존을 이미 문서화**했다
  — 우리가 지적했던 누락이 공개판에서 해소돼 있었다
- 갱신 후에도 판단 근거 139개는 그대로 유지된다

### 정정 — `ColPage` 는 하나가 둘로 갈린다 (v7 개수 → v8 여부 + 길이)

`ColPage` 를 "동명 존재 ✅" 로 적었으나 **값의 의미가 다르다.**

| | |
|---|---|
| v7 `ColPage` (`SetConfig`) | **한번에 표시할 컬럼의 개수** (default 사용안함) |
| v8 `ColPage` (cfg) | **컬럼 가상 렌더링 사용 여부** |
| v8 `ColPageLength` (cfg) | 한 번에 렌더링할 열 개수 |

→ `ColPage: 5` ⇒ **`ColPage: 1` + `ColPageLength: 5`**. `CFG_COLPAGE` 규칙으로 검토 항목에 잡는다.
★v8 제약: `SearchMode:0`·`2` 에서만 쓸 수 있고 **Merge 와 함께 쓸 수 없다.**

`ExcludeEmpty` 는 v7 `InitColumns` 의 컬럼 속성이고 v8 `col` 속성과 **의미가 같다**(✅ 확정).

### 변경 — 툴킷에 포함하는 v8 매뉴얼을 **공개판으로 한정** (Breaking)

이전에는 매뉴얼 전문 1,027개를 그대로 포함했는데, 그중 **150개가 벤더 비공개 페이지**였다.
공개판(<https://github.com/ibsheet/ibsheet8-manual>)과 대조해 확인하고 **공개판 1,027개로 교체**했다.

- 리포의 `docs/ibsheet8-manual/` 은 이제 공개판과 **파일 목록·내용이 정확히 일치**한다
- 매핑 문서가 비공개 페이지를 근거로 인용한 **16곳**을 경로 없는 표현(「벤더 마이그레이션 지침」 등)으로 바꿨다
- 매뉴얼 폴더에 섞여 있던 부산물 2개(`events/list.txt`, `props/cfg/search-mode.md.bak2`)도 제거했다
- 판정 근거 139개는 **그대로 유지**된다(내부 검증은 전체본을 계속 참조한다)

### 변경 — v7 매뉴얼에서도 비공개 3개 제거

v7 은 공개 기준이 **html 로만 존재**하고 md 는 벤더가 제공한 것뿐이라 대조할 공개 md 가 없다.
그래서 v8 과 같은 **표시 기반**으로 검사했다 — H1 이 `# !이름`, index 에 `[비공개: 이름]`.

- 비공개 3개 제거: `Down2Hml` · `GetDown2HmlUrl` · `SetDown2HmlUrl` (`funcs/export/`)
- `funcs/export/index.md` 의 `[비공개: …]` 3줄 제거 + 번호 재정렬 (18 → 15항목)
- **우리 규칙·문서는 이 3개를 애초에 참조하지 않았다** — 매핑 영향 없음
- v7 매뉴얼 808개(이전 772). 문서의 "772파일" 표기도 정정했다

비공개 표시가 없는 벤더 원문의 부수적 언급(설치 파일 목록의 `Down2Hml.jsp` 등)은
그대로 두었다 — 표시된 것만 제거하는 기준을 v7·v8 에 동일하게 적용한다.

### 추가 — 벤더 매뉴얼 최신본 URL + 갱신 절차

고객이 직접 최신 매뉴얼을 받을 수 있도록 참고 URL 을 문서에 실었다.

| | |
|---|---|
| IBSheet8 매뉴얼 (공개판) | <https://github.com/ibsheet/ibsheet8-manual> |

```
git clone --depth 1 https://github.com/ibsheet/ibsheet8-manual.git
```

- `사용가이드.md`·`빠른시작.md`·`AGENTS.md` 에 안내했다. 툴킷에도 매뉴얼이 포함돼 있으나
  **갱신되면 변환 판단의 근거가 달라질 수 있다**는 점을 함께 적었다
- 매뉴얼이 갱신되면 툴킷 갱신을 요청하면 반영한다

### 추가 — 이벤트 매핑 10건 보강 (v7 매뉴얼 68개 전수 커버)

사내 다른 변환 도구(웹 기반)의 이벤트 처리 범위와 대조해 **빠뜨린 v7 이벤트 10개**를 찾아 채웠다.
각 항목은 v7 매뉴얼의 의미와 v8 공개 매뉴얼의 타깃 존재를 확인한 뒤 넣었다(그대로 옮기지 않았다).

| v7 | v8 | 주의 |
|---|---|---|
| `OnBeforeColumnMove` | `onBeforeColMove` | 인자 `evt.col`·`evt.toCol` |
| `OnSmartResize` | `onResize` | ⚠️ **발생 시점이 다르다** — v7 은 300ms 무변경 후 1회(디바운스), v8 은 그 보장이 없어 직접 디바운스 필요 |
| `OnTreeChild` | `onBeforeExpand` | ⚠️ v7 은 **자식 미조회 노드를 펼칠 때만** 발생(지연 로딩 트리거). v8 은 항상 발생하므로 조건 판별 필요 |
| `OnDecryption` | ❌ | v8 은 `onDataLoad`/`onBeforeDataLoad` 에서 같은 목적 처리 |
| `OnEncryption` | ❌ | v8 은 `onSave`/`onBeforeSave` 에서 처리 |
| `OnExportEncryption` | ❌ | v8 은 `(cell) ExportValue` 속성으로 내보낼 값 지정 |
| `OnPageRequest` · `OnTab` · `OnWaitTimeOut` · `OnDebugMsg` | ❌ | 각각 `doSearchPaging` 흐름 · `onKeyDown` 판별 · 호출측 타임아웃 처리로 대체 |

이로써 **v7 매뉴얼의 이벤트 68개를 모두 다룬다.**

### 추가 — `initconv`: 초기화 코드를 **실행해서** 변환 (신규)

시트 생성·초기화(`createIBSheet2`·`SetConfig`·`InitColumns`·`IBS_InitSheet`)는 정규식으로 옮기기
어렵다 — 줄바꿈·조건분기·문자열 조립·전역 상수에 전부 걸린다. 지금까지 검토 항목으로만 표시하고
**수동 작업으로 남겨두던 부분**이다. 사내 다른 변환 도구(웹 기반)가 쓰던 **실행 기반** 기법을 이식했다.

```
python migrate.py initconv <입력파일> --el <컨테이너 element id>
```

| 구성 | 역할 |
|---|---|
| `engine/init_extract.js` (Node) | v7 코드를 **`node:vm` 샌드박스에서 실행**해 초기화 구조만 뽑는다. **변환하지 않는다** |
| `engine/init_convert.py` | 뽑힌 구조에 **기존 규칙**(`engine/rules/migrate_rules.json`)을 적용해 `IBSheet.create({...})` 골격을 만든다 |

**규칙은 한 곳에만 둔다** — JS 쪽에 매핑을 두면 원본이 둘로 갈라진다.

- 미정의 이름(프로젝트 헬퍼·전역 상수)은 오류에서 잡아 자동 스텁하고 재시도한다.
  값·호출·속성 접근을 모두 받는 스텁이라 `Util.createHiddenTag(...)` 같은 중첩도 해결된다
- `$(document).ready(...)`·`DOMContentLoaded`·`window.onload` 안의 초기화도 콜백을 실행해 잡는다
- 판단이 필요한 것(값 반전·레벨 이동·구조 분리)은 **옮기지 않고 목록으로 출력**한다
- 초기화 호출을 못 찾으면 **빈 골격을 출력하지 않고** 종료코드 1 로 알린다
  (빈 `options` 를 내면 "변환됐다"로 오해할 수 있다)
- 고객사 전용 하드코딩은 가져오지 않았다

실제 고객 화면에 돌려 `Cfg`·`Cols`·`HeaderMode` 를 뽑고 판단 항목 6건을 분리하는 것까지 확인했다.
`.jsp` 의 JSTL 태그(`<script src="<c:url .../>">`)가 스크립트 추출을 깨뜨리는 문제도 함께 고쳤다.

### 추가 — v7 매뉴얼 갱신분 반영 (페이지 39개 · 벤더가 누락 문서를 보완)

벤더가 v7 매뉴얼에 **페이지 39개를 추가**했다(2026-08-05). 우리가 "실존은 확인됐는데 문서가 없다"고
남겨둔 항목들이 여기 포함된다. 전부 공개 페이지임을 확인하고 반영했다(v7 매뉴얼 769 → 808개).

**우리 판정의 근거가 바뀐 것**

| API | 이전 | 이후 |
|---|---|---|
| `HideFilterRow` · `Get/SetScrollTop` · `Get/SetScrollLeft` | 벤더 확인만 있었음 | **문서 근거 확보** |
| `OnePageSort` | 〃 | `props/PropertyList/OnePageSort.md` — `smServerPaging2`(`SearchMode:4`)에서만 동작함이 문서로 확인 |
| `GetRowMerge`/`SetRowMerge` · `EventCacheMode` | 어제 정정한 판정 | 새 페이지로 재대조 — 유지 |

**새 매핑 1건 — `OnePageFilter`** (매핑 자체가 없었다)

- v7 `1` = 서버 호출 없이 **현재 페이지 안에서만 필터링**(`SearchMode:4` 에서만 동작, default `0`)
- **v8 은 서버 페이징에서 필터가 기본적으로 조회된 데이터 안에서만 동작**하므로 `1` 은 속성을 지우면 재현된다
- ★v7 `0`(필터링 안 하고 `OnChangeFilter` 만 발생)에 의존해 `DoSearchPaging` 으로 직접 재조회하던 화면은
  v8 에서 `onBeforeFilter` + `getFilter()` + `doSearchPaging()` 으로 다시 써야 한다
- `CFG_ONEPAGEFILTER` 규칙 신설

`audit5.py` 의 「v7 매뉴얼에 원본 메서드가 없음」이 **5건 → 0건**이 됐다.

### 정정 — `IB_Preset` 프리셋 6건 확정

`Ym`·`Md`·`Hms`·`Hm`·`YmdHms`·`YmdHm` 를 "매뉴얼에 없음"으로 `⚠️` 표시해 뒀으나, 실제 배포본
`plugins/ibsheet-common.js` 의 `window.IB_Preset` 에 **27개 프리셋 전부 존재**함을 확인해 `✅` 로 올렸다.

- `Hm` 을 `IB_Preset.HMS` 로 흡수한다고 적었으나 **`IB_Preset.HM` 이 따로 있다**
- 패턴 문자열도 틀렸다 — `yyyy-MM-dd`(하이픈)가 아니라 `yyyy/MM/dd`(슬래시), 시간은 `hh` 가 아니라
  **`HH`**(24시간제)
- 프리셋은 `Format` 만이 아니라 `Type:"Date"`·`DataFormat`·`EditFormat`·`Size`·`EmptyValue` 를 한 묶음으로
  제공한다 → 패턴만 직접 지정하면 **서버 전송값 포맷(`DataFormat`)이 빠진다**
- 이전 1차 검증의 부분문자열 오탐도 정리(`IB_Preset.YM` 이 `YMD` 에 걸렸던 건)

### 정정 — `OnePageSort` (벤더 확인)

`OnePageSort` 를 "v7 매뉴얼(808파일)에 존재하지 않는다"는 이유로 `⚠️`(자동 치환 보류)로 두었으나,
**실존하는 속성임을 벤더에게 확인받았다.** 매핑도 확정됐다.

| | |
|---|---|
| v7 `OnePageSort` | **`ibsheet.cfg` 에 넣는 속성.** 조회모드 `smServerPaging2`(`SearchMode:4`) 사용 시 **현재 페이지 내에서만 정렬** |
| v8 `SortCurrentPage` (cfg) | 서버 페이징(`SearchMode:4,5`) 시 현재 보여지는 페이지만 정렬 — `1(true)` 이면 Sort 정보를 서버에 보내지 않는다 |

- v7 쪽은 JS 코드가 아니라 `ibsheet.cfg` 에 두는 설정이라 화면 코드에서는 잘 나타나지 않는다
- `HideFilterRow` · `Get/SetScrollTop` · `Get/SetScrollLeft` 도 v7 에 실존함을 확인받았다
  (v7 매뉴얼에 페이지가 없어 보류 상태로 두었던 것들 — 자동 치환 규칙을 그대로 유지한다)

### 정정 — 규칙이 **고객 자체 코드**를 바꾸던 문제 (Breaking — 변환 결과가 달라진다)

속성 규칙 패턴에 **왼쪽 이름 경계가 없어**, IBSheet 속성이 아닌 것까지 걸렸다.

```
MySearchMode: 2   →  MySearchMode: 0      ← 값이 조용히 바뀐다
oldPage: 20       →  oldPageLength: 20    ← 이름이 조용히 바뀐다
```

IBSheet 코드가 아닌 것을 망가뜨리는데 **오류도 안 나고 검증 3종도 통과한다.**

- 자동 치환·판단 대상 **38개 패턴에 `(?<![\w$])` 추가**
- 이미 경계가 있던 22개도 `$`를 빠뜨려(`(?<![A-Za-z0-9_])`) `$Name`을 걸렀다 → 표기 통일
- 새 검증 도구로 **218개 규칙 전수 확인**(접두사 7종 × 표기 5종을 붙여 매칭 시도)
- `migrate.py rules`의 **치환 체인 충돌 판정을 실제 매칭으로 교체.** 부분문자열 비교라
  `Size`가 `WheelScrollSize`의 일부라는 이유로 오탐했다 — 틀린 경고가 쌓이면 점검을 안 보게 된다

### 추가 — 빠져 있던 매핑 3건

| IBSheet7 | IBSheet8 | 근거 |
|---|---|---|
| `KeyField` (col) | `Required` | v7 "필수 입력 여부"(`funcs/init/InitColumns.md`) = v8 `props/col/required.md`. **짝 속성 `KeyFieldPosition`→`RequiredPosition`은 있었는데 이 속성 자체가 없었다** |
| `EditLen` (col) | `Size` | v7 "편집 시 입력 최대 허용 길이" = v8 "열에 입력가능한 글자수"(`props/col/size.md`). ★`cfg.UnicodeByteMode`를 켜면 v8은 한글을 바이트로 계산한다 |
| `CalcLogic` (col) | `Formula` | 매핑 문서에는 있었으나 **규칙 파일에 없어 변환되지 않았다** |

**정정** — `EditPointCount`를 "대응 없음"으로 안내했으나, 편집 시 소수점 입력 제한은
`EditMask` 정규식으로 처리한다(`props/col/edit-mask.md`). 예: `EditMask:"^-?\d*(\.\d{0,2})?$"`.

### 추가 — `initconv` 실전 보강 (실제 고객 화면 3번째)

시트 2개(마스터-디테일)·초기화 함수를 외부 공통 js가 호출·확장자 `.do` 인 화면으로 검증했다.

- **초기화 호출 추출이 0건이던 문제.** v7 표준 구조는 `createIBSheet("sheet", …)` 로 만들고
  `init_sheet()` 에서 초기화하는데, 그 `init_*()` 를 부르는 쪽이 **프레임워크 공통 js**인
  프로젝트가 많다. 화면 파일만 실행하면 호출자가 스텁이 되어 아무것도 안 나온다 →
  **본문에 초기화 호출이 있는 함수를 찾아 직접 실행**한다
- **`Cols` 가 4배로 중복되던 문제.** 자동 스텁은 "오류 → 스텁 심고 처음부터 다시" 구조인데
  재시도 전에 기록을 되돌리지 않아 같은 초기화가 N번 쌓였다(스텁 3개 심는 동안 4번)
- **시트 2개가 하나로 합쳐지던 문제.** `Cols`가 섞여 화면만 틀리게 나온다 →
  시트별로 갈라 `IBSheet.create`를 따로 낸다. `--el 시트명=id,시트명2=id2`
- **v8에 없는 속성이 그대로 실려 나가던 문제.** v8은 모르는 옵션을 **오류 없이 무시**하므로
  화면만 조용히 달라진다(v7 `DataRowMerge`·`PointCount` 등) → v8 매뉴얼과 대조해
  "본문 언급만 있음(확인 필요)" / "없음(무시된다)" / "프로젝트 자체 키"로 나눠 보고한다
- `Hidden`→`Visible` 리터럴 값은 **자동 반전**(식은 사람에게 넘긴다), `PointCount`→`Format` 안내
- `.do` 를 **기본 확장자에 추가** — 화면 파일을 `.do` 로 두고 서버가 JSP로 처리하는 프로젝트가 있다.
  목록에 없으면 디렉터리 스캔에서 **조용히 빠진다**

**새 함정 2건** (`AGENTS.md` 「맨 치환하면 안 되는 계열」에 추가)

- `HeaderMode.HeaderCheck` → `(cfg) HeaderCheck` — ★**default 반대**(v7 `1` 표시 / v8 `0` 표시 안 함).
  v7에서 생략했던 화면은 v8에 `HeaderCheck:1`을 명시해야 헤더 전체 체크박스가 남는다
- `DataRowMerge` → `(cfg) DataMerge` — v8은 가로·열 병합이 `DataMerge` **하나로 합쳐져 있어**
  `MergeSheet` 매핑과 **같은 속성을 다툰다.** 자동 변환하지 않고 화면으로 판단한다

### 정정 — v7 전역 상수를 **실행 시점에 숫자로** 준다 (Breaking — 병합 설정이 살아난다)

실제 고객 화면에 이런 초기화가 있었다.

```javascript
initdata.Cfg = { MergeSheet : msHeaderOnly + msPrevColumnMerge };   // 5 + 2 = 7
```

`initconv` 는 미정의 이름을 `@@이름@@` 자리표시자로 뒀는데, **산술식이 문자열 이어붙이기가 되어**
`"@@msHeaderOnly@@@@msPrevColumnMerge@@"` 가 됐다. 확정표에 없는 값이 되어 **병합 설정이 통째로
버려졌다.** 오류는 나지 않는다.

- 상수표를 규칙 파일의 **`v7_constants` 데이터 블록 한 곳**으로 옮기고,
  `init_extract.js`(실행)·`init_convert.py`(변환)가 함께 읽는다
- 텍스트 치환용 `V7CONST_*` 규칙과 **값이 일치하는지 `migrate.py rules` 가 확인**한다
  (같은 표가 여러 곳에 생기면 한 곳만 고치는 사고가 난다)

### 정정 — `SetFocusAfterProcess` 는 **값이 반대다**

`(Cfg)IgnoreFocused` 로 옮기라고만 적혀 있었는데, 두 속성은 **의미가 뒤집혀 있다.**

| | `1` 의 뜻 |
|---|---|
| v7 `SetFocusAfterProcess(1)` | 조회 후 첫 셀에 **포커스 설정** (default) |
| v8 `IgnoreFocused: 1` | 포커스를 **설정하지 않음** |

`SetFocusAfterProcess(0)` → `IgnoreFocused: 1` 이다. 그대로 옮기면 조회 후 포커스 동작이 뒤집힌다.
`initconv` 가 리터럴이면 자동 반전하고 안내를 남긴다. v8 에는 `2`(포커스 레이어만 표시, 방향키·Tab
이동 없음)가 더 있어 master-detail 화면에서 쓸 수 있다.

### 추가 — 빠져 있던 매핑 2건

| IBSheet7 | IBSheet8 | 근거 |
|---|---|---|
| `Edit` (col) | `CanEdit` | v7 "편집가능 여부" = v8 `props/col/can-edit.md`. ★v8 우선순위 `Cell` > `Row` > `Col`, default `1` |
| `AllowNull` (col) | `CanEmpty` | v7 "숫자계열 컬럼에 빈값 허용 여부" = v8 `props/col/can-empty.md`. 매핑 문서에는 있었으나 규칙에 없었다 |

### 수정 — `initconv` (실제 고객 화면 4번째, 시트 8개)

- **재시도 때마다 컨텍스트를 새로 만든다.** 자동 스텁은 "오류 → 스텁 심고 처음부터 다시" 구조인데,
  최상위 `let`/`const` 가 컨텍스트에 남아 2회차에

  ```
  SyntaxError: Identifier 'fragment' has already been declared
  ```

  로 죽었다. **그 뒤 초기화를 전부 잃는다**(시트 8개 중 일부만 잡혔다). 같은 객체로
  `runInNewContext` 를 불러도 안 된다 — Node 가 contextify 결과를 캐시한다. 객체를 새로 만든다
- **모르는 이름을 v7 매뉴얼과도 대조한다.** v8 에 없는 것에는 두 가지가 섞여 있다 —
  ① 우리가 매핑을 못 찾은 v7 속성 ② **고객 코드 오타.** 실제로 `SSaveName: 'codeNmS'` 가 있었다
  (v7 에서도 무시되던 것). ②를 마이그레이션 과제로 보고하면 없는 일을 찾게 만든다 →
  v7 에도 없으면 오타로 안내하고 비슷한 이름을 제시한다
- 이름이 아니라 **구조가 바뀌는 것**(`ComboText`→`Enum`, `ComboCode`→`EnumKeys`,
  `CountPosition`·`CountFormat`→`InfoRowConfig`)은 "v8 에 없다" 대신 옮길 방법을 안내한다

### ★추가 — 메서드 **옵션 키**를 camelCase 로 변환 (Breaking — 엑셀 다운로드가 되살아난다)

고객 화면 **542개(고객사 33곳)를 전수 조사**해 찾았다. 지금까지 가장 큰 공백이다.

IBSheet8 은 **초기화 속성은 PascalCase**(`Header`·`Width`)인데 **메서드 옵션 키는 camelCase**
(`fileName`·`downCols`)로 **서로 다른 규칙**을 쓴다. IBSheet7 은 옵션도 PascalCase 였다.

```javascript
// v7
mySheet.Down2Excel({FileName:"a.xlsx", SheetName:"실적", DownCols:"1|2", DownSum:0});
// 메서드 이름만 바꾸면 → v8 이 옵션을 전부 무시한다 (오류 없음)
mySheet.down2Excel({FileName:"a.xlsx", ...});      // 파일명·시트명·합계가 사라진다
```

`Down2Excel` 은 **자동 치환 대상**이라 엔진이 메서드만 바꾸고 옵션은 v7 이름으로 남겨 두고 있었다.

- 메서드 **14개 · 옵션 키 143개**(서로 다른 이름 77종)를 규칙 파일 `method_option_keys` 에 등록
- 엔진이 **호출의 인자 객체 범위 안에서만** 바꾼다 — `Sort`·`Mode`·`Col`·`Param` 처럼
  **초기화 속성과 이름이 겹치는** 옵션이 있어 범위를 벗어나면 초기화가 깨진다
- 인자가 변수면(`var p={...}; sheet.down2Excel(p)`) 바꾸지 않고 `OPTION_KEYS_INDIRECT` 로 넘긴다.
  고객 화면에서 실제로 **인라인 80% · 변수 20%** 였다
- 전수 적용 결과: 화면 50개에서 **218건 자동 변환**, 143건은 판단으로 넘어갔다

**옵션 이름 자체가 바뀌는 9개 메서드**는 자동 변환하지 않고 규칙으로 보고한다 —
`getSaveJson`(`AllSave`→`saveMode` · `StdCol`→`col` · `ValidKeyField`→`validRequired` ·
`ValidEditLen`→`validSize`) · `getSaveString` · `doSave` · `doSearch`(인자 구조 변경) ·
`loadSearchData`(`Event`→`ignoreEvent` **의미 반대**) · `applySaveResult` · `makePivotTable` ·
`makeSubTotal` · `moveRow`.

### 검증 — 고객 화면 542개 전수 조사 결과

| 항목 | 결과 |
|---|---|
| 시트 메서드 호출 **237종** | **규칙 공백 0** — 메서드 이름 커버리지는 완전하다 |
| 메서드 옵션 키 | **공백 143개 키** → 위 항목으로 해소 |
| v7 속성 343종 | v8 동명 194 · 규칙 있음 14 · 문서 안내 58 |

### 추가 — v8 이 **지원하지 않는** 엑셀 옵션 안내 (벤더 확인 2026-08-06)

v7 `Down2Excel` 옵션 중 v8 에 대응이 없는 것을 벤더에 확인받아 안내로 넣었다.
이름을 바꿔도 대응이 없으므로 **엔진은 고치지 않고 `OPTION_UNSUPPORTED` 로 알린다.**

| v7 옵션 | v8 |
|---|---|
| `AutoSizeColumn` | 미지원. 다운로드 전에 시트 열 너비를 정하거나 `downCols` 로 열을 고른다 |
| `PrintSetup` (+ 용지·여백·인쇄방향·흑백인쇄) | **클라이언트 옵션으로는 미지원.** 대신 **서버 모듈에서 설정한다** — v8 매뉴얼 `appx/excel-server-troubleshooting.md` 의 `[ 사용자 환경 설정 #18 ]` 에 `ExcelPrintSetup` 예제가 있다. ★서버 모듈을 쓰지 않는 구성(`Cfg.AutoExcelMode:2`)이면 인쇄 설정을 만들 수 없다 |
| `ReportXMLURL` | 미지원 |
| `URL` | 미지원. v8 은 초기화 `Cfg.Export.Down2ExcelUrl` 로 지정한다 |
| `ExcludeSubSum` | 미지원. 소계행을 빼려면 `downRows` 로 대상 행을 지정한다 |
| `Mode` | 미지원. ★`Mode:-1` 의 목적(Status·DelCheck·Result 타입과 숨은 열 제외)은 **v8 에 그 타입들이 없어서** 사라진다 |
| `Multipart` | 미지원. 벤더 설명: 데이터가 많을 때 multipart 로 보내면 **잘릴 수 있어** v8 은 선택지를 두지 않았다 |

- `KeyFieldMark` → `requiredMark` 는 **지원**된다(값 의미도 동일) → 자동 변환에 추가
- `Type:"Result"` 규칙 신설 — v8 에 Result 타입이 없고 `IB_Preset` 에 대응 프리셋도 없다
  (`STATUS`·`DelCheck` 는 있다). 일반 `Text` 열로 두고 저장 응답을 직접 반영해야 한다

### 수정 — 비공개 판정 가드가 **표의 한 행** 표시를 놓쳤다

v8 공개 매뉴얼은 페이지 단위 `# !이름` 외에 **표의 한 행에만** `[비공개]`·`[점검]` 을 붙이기도
한다(`down2Excel` 옵션 6개가 그 형태다). H1 만 보던 `nonpublic_v8_refs.py` 가 이를 놓쳤다.
옵션 키 표를 **메서드 페이지 단위로** 대조하도록 확장했다 — 이름만 보면 오탐이 난다
(같은 이름이 다른 메서드에서는 공개다).

### 정정 — `ShowTreeSubSum` 을 "지원안함" 으로 잘못 안내했다

`ShowTreeSubSum()` 을 `Extend:IB_Preset.TreeSumFormula` 로, 그리고 `❌ 지원안함` 으로 적어 두었다.
**둘 다 틀렸다** — 지원되며 속성은 `Extend` 가 아니라 **`Formula`** 다.

- v7 은 메서드 한 번에 컬럼을 나열했고(`{SumCols, AvgCols, CountCols, MaxCols, MinCols}`),
  v8 은 **초기화에서 컬럼마다** 대응 프리셋을 지정한다 —
  `TreeSumFormula`·`TreeAvgFormula`·`TreeCountFormula`·`TreeMaxFormula`·`TreeMinFormula`
- 전제 2개: `Def.Row.CanFormula:1` · 트리 동작용 `Cfg.MainCol`
- 근거: v8 `props/col/formula.md` 「Tree Example」 · `migration/migration-04.md`
- `SHOWTREESUBSUM` 규칙 신설(그 전에는 **규칙이 아예 없어** 포괄 규칙만 걸렸다)

### 추가 — `SetPagingPosition` 매핑 (고객사 7곳에서 사용)

초기화 `Cfg.InfoRowConfig.Layout` **배열**로 옮긴다. v7 `0`=사용 안 함 → `"Paging"` 제거 /
`1`=좌측·`2`=우측 → v8 은 **배열 순서**로 정한다(default `["Paging","Count"]`).
상·하단은 `InfoRowConfig.Space`. ★`Paging` 은 `SearchMode:1,4,5` 에서만 동작한다.
근거: v8 `props/cfg/info-row-config.md`.

### 정정 — 커버리지 조사 방법: **포괄 규칙을 빼고 세야 한다**

1차 조사에서 "메서드 237종 규칙 공백 0" 이 나왔는데, 그건 `GENERIC_PASCAL_SHEET_METHOD` 가
**모든 PascalCase 호출을 잡기 때문**이었다. "조용히 지나가지 않는다"는 뜻일 뿐
**구체적인 v8 대응 안내가 있다는 뜻이 아니다.**

포괄 규칙을 빼고 다시 세니 v7 매뉴얼에 있는 메서드 **246종 중 130종이 구체 규칙 없음**이고,
그중 **126종은 매핑 문서에 안내가 있어** 판단 레이어가 처리할 수 있다.
남은 것이 `SetPagingPosition`·`ShowTreeSubSum` 이었고 위 두 항목으로 해소했다.

### ★추가 — v7 **이벤트 핸들러**를 안내한다 (Breaking — 이전에는 아무 신호도 없었다)

v7 이벤트는 **함수명 규약**으로 등록된다 — `function <시트id>_OnSearchEnd(Code, Msg) { }`.
메서드 호출이 아니라서 `\.Method\(` 형태의 기존 규칙이 **전혀 잡지 못했다.**
검증 3종도 못 잡는다(`residue_scan` 은 `시트.PascalCase(` 만 본다).

고객 화면 전수 조사 결과 **핸들러 670개 · 화면 219개 · 고객사 16곳**이
**변환도 안 되고 플래그도 안 뜨는** 상태였다.

- 규칙 파일에 `v7_event_handlers` 데이터 블록 신설 — **이벤트 52종**.
  v7→v8 이름은 `event-mapping.md`(검증된 표)에서, 인자 대응은 v7·v8 이벤트 페이지의
  파라미터 표를 대조해 만들었다
- 엔진이 핸들러 정의를 찾아 **위치와 옮길 방법**을 알린다(자동 변환은 하지 않는다 —
  함수를 초기화 `Events` 객체로 옮기고 인자를 `evtParam` 하나로 바꾸는 구조 변경이다)
- 인자별로 갈라 알린다: 확실한 대응(`Row`→`evtParam.row`)과
  **대응을 못 찾은 인자**(그대로 쓰면 오류 없이 `undefined`)
- 적용 결과: 안내 **579건 · 화면 214개 · 고객사 16곳**

### ★정정 — `OnSearchEnd` 를 "명칭 변경" 으로만 안내했다 (오류 처리가 사라진다)

`OnSearchEnd` → `onSearchFinish` 를 **명칭 변경**으로만 적어 두었다. 그러나

- v8 `onSearchFinish` 는 **조회 실패 시 발생하지 않는다**(`events/on-search-finish.md`)
- v7 은 실패해도 발생해 `Code<0` 으로 오류를 처리했다 → **그 로직이 통째로 죽는다**

올바른 이관(벤더 확인 2026-08-06):

| v7 | v8 |
|---|---|
| `OnSearchEnd` 의 후처리(대기이미지 닫기 등) | `onSearchFinish` |
| `Code`·`Msg` 로 오류 판정 | **`onBeforeDataLoad`/`onDataLoad` 의 `result`·`message`** (`result` 0 이상 정상 / 음수 오류) |
| `Response` | `evtParam.response` |
| `StCode`·`StMsg` | 대응 없음 |

- 전제: **서버 응답에 `IO` 속성**이 있어야 `result`·`message` 가 전달된다
- ★오류일 때 v8 은 **에러 메시지를 자동 표시**하므로 기존 `alert(Msg)` 는 **중복**이 된다
- 정상 조회 시 메시지를 보여주려면 `onDataLoad` 에서 직접 처리한다
- `onBeforeDataLoad` 는 **row 객체가 아직 없다** — 행 객체가 필요하면 `onDataLoad` 에서

`OnSaveEnd`·`OnSelectCell`·`OnClick`·`OnChange`·`OnValidation`·`OnLoadData`·`OnBeforeCheck`·
`OnButtonClick` 에도 같은 종류의 의미 차이를 규칙 설명에 붙였다.

### 수정 — `initconv` 실행 실패 16건 중 15건 해소 (전수 조사 후속)

고객 화면 356개에 `initconv` 를 전수 실행해 나온 실패를 원인별로 고쳤다.

**전처리가 멀쩡한 코드를 깨뜨리고 있었다**

- `.js` 파일에도 JSP 전처리를 돌렸다. 두 가지가 깨졌다 —
  ① HTML 을 문자열로 조립하는 `.js` 의 `"<script>"` 를 보고 스크립트 블록만 잘라내
  **파일 대부분이 사라졌다**(35,126자 → 4,113자) ② JS **템플릿 리터럴**
  `` `${1 / dpr}` `` 을 JSP EL 로 착각해 바꿨다 → `.js` 는 전처리 없이 그대로 실행한다
- `var cur = "<%=request.getParameter("x")%>"` 처럼 **이미 따옴표 안**인 JSP 표현식을
  다시 따옴표로 감싸 `""…""` 가 됐다 → 따옴표 안이면 자리표시자만 넣고 표현식 안의
  따옴표·역슬래시는 지운다
- JSP/HTML 에서도 **템플릿 리터럴 구간은 EL 치환에서 제외**한다

**무한 루프에 OOM 으로 죽었다**

지연 콜백·초기화 함수를 `fn.call()` 로 직접 불러 **`vm` 의 timeout 이 걸리지 않았다.**
힙 4GB 를 다 쓰고 Node 가 죽었다(본문 실행에는 timeout 이 있었는데 콜백에는 없었다).
`vm` 을 통해 호출해 5초 제한을 건다.

**오판정 정정** — v7 매뉴얼에 페이지가 없다는 이유로 `SelectionMode` 같은 실제 속성을
"고객 코드 오타" 로 보고했다. **우리 매핑 문서를 먼저 확인**하고, 거기 있으면 문서를 가리킨다.

남은 1건은 **원본 자체가 구문 오류**인 `_bak` 파일이다(`jscheck.py` 도 같은 판정).

### 추가 — 초기화 메서드 6종에 구체 안내 (포괄 규칙만 걸리던 것)

문서에는 안내가 있었지만 규칙이 없어 `GENERIC_PASCAL_SHEET_METHOD` 만 걸렸다 —
"확인하라"는 말만 나오고 **무엇으로 바꿔야 하는지는 안 나왔다.** 고객 화면에서 114회 쓰인다.

| v7 | v8 |
|---|---|
| `SetImageList` | ❌ 대응 없음. `Type:"Img"` 열의 `(Col)DefaultImage` 또는 데이터에 경로. **Index → 경로 문자열**로 바꿔야 한다 |
| `SetEditableColorDiff` | 초기화 `Cfg.ColorState` |
| `SetExtendLastCol` | 마지막 열에 `(Col)RelWidth:1` — 열 정의로 옮기는 구조 변경 |
| `SetAutoSumPosition` | `setFormulaRowPosition()` (v8 은 합계행을 FormulaRow 라 부른다) |
| `SetComboOpenMode` | 초기화 `Cfg.EnumOpenMode`. ★v8 기본이 클릭 시 열림이라 기본값이 다를 수 있다 |
| `SetDataLinkMouse` | 열의 `(Col)Cursor` |

`initconv` 도 이 규칙의 설명을 **그대로 가져다 쓴다** — 같은 안내를 두 곳에 적지 않는다.

### 추가 — 남의 콜백 안에 있는 초기화도 잡는다

고객 코드는 초기화를 **남의 콜백 안**에 넣는 일이 많다.

```javascript
$j(document).ready(function(){
    ocp.common.ajax.dyLoadJs([...], function(){   // 이 함수는 우리에게 스텁이다
        createIBSheet2(...);  IBS_InitSheet(grid, initSheet);
    });
});
```

그 함수가 스텁이면 **콜백이 영원히 실행되지 않아 추출이 0건**이 된다.

- 스텁이 함수 인자를 받으면 나중에 실행하려고 모아 둔다(객체 인자 안의 함수도 한 겹 본다)
- jQuery 별칭(`$j`·`$J`·`jq` 등)도 jQuery 스텁으로 준다 — `$j(document).ready(...)` 를
  놓치면 같은 이유로 0건이 된다
- ★**본문에 초기화 호출이 있는 콜백만** 담는다. 처음엔 함수 인자를 전부 담았더니
  **이벤트 핸들러까지 실행**돼 정상이던 화면이 추출 20개 → **710개**로 폭증했다.
  초기화 구조를 뽑는 게 목적이므로 범위를 좁혔다

### 정정 — "초기화 구조가 없다" 고 잘못 알리던 것

초기화 코드가 **파일 안에 있는데 실행 경로에 닿지 못한** 경우와 정말로 없는 경우를
똑같이 "이 파일에는 옮길 초기화 구조가 없습니다" 로 알렸다. 있는 것을 없다고 한 것이다.
이제 소스를 확인해 구분하고, 닿지 못한 경우에는 흔한 형태
(`var f = function(){…}` 를 다른 콜백에서 호출 / 탭·팝업에서 동적 호출)와
다음 수단을 안내한다.

### 전수 실행 결과 (고객 화면 356개, 벤더 라이브러리 제외)

| 항목 | 최초 | 전처리 수정 | 콜백 수집 |
|---|---|---|---|
| 실행 성공 | 340 | 355 | 355 |
| 실행 실패 | 16 | 1 | **1** (원본 자체가 구문 오류인 `_bak` 파일) |
| 초기화 추출 성공 | 300 | 308 | **318** |
| 추출 0건 | 56 | 48 | **38** |

추출 건수가 비정상적으로 늘어난 화면 **0개**(회귀 없음)를 함께 확인했다.

### ★정정 — 매뉴얼 페이지만 보고 **없는 함수**를 규칙에 넣었다

v7 매뉴얼에 `SetSheetFontName` 페이지가 있어(`funcs/core/`, 목차 185번) 실존한다고 보고
규칙과 매핑 행을 넣었는데, **벤더 확인 결과 그런 함수는 없다.** 되짚어 보니 근거가 없었다 —
실제 호출 **0건**(발견된 4건은 모두 **주석**), 나머지는 IDE 자동완성용 `ibsheet7.sdoc.js` 의
**빈 stub** 선언, 벤더 마이그레이션 표에도 **없음**. 규칙·문서 행을 걷어냈다.

**절대 규칙에 추가** — 매뉴얼 페이지 하나로 실존을 단정하지 않는다. 새 규칙 전에
① 매뉴얼 페이지 ② 벤더 마이그레이션 표 ③ **실제 고객 코드 호출** 을 함께 본다.

**새 감사 도구 `unused_targets.py`** — 우리 규칙이 노리는 v7 메서드 중 코퍼스에서
**호출이 0건**인 것을 뽑는다(주석·`*.sdoc.js`·벤더 라이브러리 제외). 파일 22,599개 조사 결과
18종이 나왔고, 벤더 표·기존 확인분을 걸러 **5종**이 확인 대상으로 남았다.
★0건이 곧 미존재는 아니다 — **판정이 아니라 후보**다.

### 수정 — `initconv` 전처리 2건 (2번째 코퍼스 1,431개 전수 실행에서 발견)

- **문자열 안의 JSP 표현식 판정이 부실했다.** 앞뒤 글자만 봐서
  `mySheet.DoSearch("<%=pageName%>_data.xml")` 를 "따옴표 밖" 으로 오판해
  `""@@…@@"_data.xml"` 로 깨뜨렸다(6건). 이제 **문자열 리터럴 범위를 계산해** 판정한다
  (스크립트릿 안의 Java 따옴표는 길이를 보존한 채 마스킹)
- **jQuery 스텁이 `$` 의 모르는 속성을 함수로 돌려주지 않았다.** `jQuery.noConflict()` ·
  `$.debounce()` 가 "is not a function" 으로 죽었다. `$(...)` 가 돌려주는 객체는 이미
  그렇게 동작하는데 `$` 자체만 빠져 있었다

### 추가 — 규칙 2건 (2번째 코퍼스에서 새로 드러남)

| v7 | v8 |
|---|---|
| `ClearHeaderCheck()` | 같은 함수 없음 → 헤더 행 셀의 `Checked` 를 **열마다** `0` 으로. 체크 아이콘이 있는 열만 순회(벤더 표에 예제) |
| `Get/SetBasicImeMode()` | **미지원**(벤더 표 명시). v7 도 **IE 전용**이라 이미 효과가 없다 |

### 추가 — `<%@ include %>` 를 **펼쳐 넣는다**

`var comboData = <%@include file="./combo.json"%>;` 를 지워 버려 `var comboData = ;` 가 되고
파싱이 깨졌다. 지우는 대신 **실제 파일을 읽어 펼친다** — JSON 데이터가 살아나고,
공통 초기화 조각을 include 하는 화면도 잡힌다.
경로는 JSP 기준 상대경로만 따라가고 깊이 3 · 1MB 로 제한하며 순환을 막는다.
못 찾으면 자리표시자 문자열로 둔다(값 자리에서도 문법이 안 깨진다).

### 2번째 코퍼스 전수 실행 결과 (벤더 기능 샘플 포함, 화면 1,431개)

| 항목 | 최초 | 최종 |
|---|---|---|
| 실행 성공 | 1,409 | **1,418** |
| 실행 실패 | 22 | **13** |
| 초기화 추출 성공 | 1,332 | **1,333** |

남은 13건은 대부분 **원본 쪽 사정**이다 — 원본 자체의 구문 오류(`_bak` 파일),
비표준 `Array.prototype.include` 에 의존하는 코드, ASP.NET Ajax 프레임워크 요구 등.

★**1차 코퍼스(356개)는 수치가 완전히 동일**하고 추출이 줄거나 튄 화면이 0개임을
함께 확인했다(회귀 없음).

### ★정정 — **사라진 문서**를 근거로 삼고 있었다 (2026-08-11)

벤더 마이그레이션 요약 부록이 **없어진 파일**이라고 확인받았다. 그런데 저희는 그것을
근거로 쓰고 있었다 — 재검증 단정 **15건**, 매핑 문서·규칙 인용 **8곳**.

**왜 못 알아챘나**: 재검증이 **내부 전체본 사본**(수동 갱신이라 낡음)을 기준으로 돌아서,
공개판에서 사라진 페이지의 단정이 **계속 통과**하고 있었다.

- 부록만 근거였던 판정 **13건을 개별 공개 페이지로 다시 근거화**했다
  (`props/col/name.md` · `props/cell/add-edit.md` · `events/on-after-click.md` 등).
  ★13건 모두 개별 페이지로 확인돼 **매핑 자체는 그대로 유효**하다
- 재검증에 **공개판 교차확인**을 추가했다 — 근거 페이지가 공개판에 없으면 알린다
- 부록의 링크·이름을 검사하던 도구 2개(`appendix_links.py`·`fix_appendix.py`)는
  **없어진 문서를 대상으로 0건을 보고**하고 있었다 → 은퇴 처리

### ★수정 — 비공개 기능 이름이 배포물에 들어가 있었다

위 교차확인이 **곧바로 또 한 건**을 잡았다. 비공개 부록에만 있는 v8 기능 이름이
`AGENTS.md`·`CHANGELOG.md` 와 **플러그인 채널 `SKILL.md`** 에 들어가 있었다.
제약 사실만 남기고 이름은 뺐다.

**가드 보강** — `forbidden_names.py` 가 손으로 적은 목록만 봐서 놓쳤다.
이제 v8 매뉴얼의 **비공개 부록 제목(`# !이름 ***(appendix)***`)에서 이름을 자동 수집**한다.
사람 기억에 기대지 않는다. (한글 제목 부록은 API 이름이 아니므로 제외 — 예전 664건 오탐 교훈)

### 변경 — 마이그레이션 **요약표(xlsx)를 더 이상 근거로 쓰지 않는다** (벤더 확인)

변환 매핑 자료가 구축돼 요약표를 볼 필요가 없어졌다. 매핑 문서 4개 절의
"벤더 요약표 기준" 표기와 요약표를 인용하던 비고를 모두 걷어냈다
(타깃 이름은 **IBSheet8 매뉴얼 개별 페이지로 검증**한 것이므로 내용은 그대로다).

**`AutoRowHeight` 정정** — v7 `AutoRowHeight` 는 v8 **동명 `(cfg) AutoRowHeight`** 로 매핑한다
(벤더 확인 2026-08-11). 요약표에 있던 `(Def Row)MaxHeight` 안내를 지웠고,
"`Wrap:1` 로 유사 구현" 이라던 `deprecated-removed.md` 항목도 바로잡았다.
★**default 는 반대**다(v7 `1`=사용 / v8 `0`=사용 안 함) — 그 경고는 유지한다.

### 정정 — v7 `Format` 이 전부 v8 `Format` 이 되는 것은 아니다 (벤더 확인)

| 사례 | 처리 |
|---|---|
| **숫자형** | `Type` 만으로 기본 포맷이 자동 적용된다(`Int`→`#,##0` · `Float`→`#,##0.######`). **기본과 같으면 `Format` 을 옮기지 않는다** |
| **`Null` 계열**(`NullInteger`·`NullFloat`) | ★**`CanEmpty:1` 을 함께 설정해야 한다.** 빠뜨리면 빈 값이 `0` 으로 채워져 v7 과 달라진다 |

근거: v8 `appx/format.md` 「기본 포맷」 · `props/col/can-empty.md`.
재검증 단정 3건으로 못박았다.

**`LandSacpe` 는 오타가 맞다**는 확인도 받았다(v7 `funcs/export/Down2Excel.md`) — 벤더 수정 예정.

### 갱신 — v7 매뉴얼 동기화 (벤더가 deprecated 함수 정리, 2026-08-11)

사내 위키 최신본(`deprecated 함수 삭제`)에 맞춰 리포의 v7 매뉴얼을 동기화했다.
**폴더를 통째로 덮지 않고** 차이 나는 파일만 반영했다(비공개 제거분이 사라지지 않도록).

| 구분 | 내용 |
|---|---|
| 삭제 4 | `SetSheetFontName` · `IBShowCalendar` · `IBCloseCalendar` · `LoadSearchChildData` |
| 추가 1 | `static/ExcelReportXML/aExcelReportXML.md` (비공개 표시 없음 확인) |
| 갱신 3 | v7 매뉴얼의 `funcs/core` · `funcs/search` · `static/ExcelReportXML` 목차 파일 |

→ v7 매뉴얼 809 → **806개**, 위키와 차이 **0**.

**★매뉴얼에서 지워도 고객 코드에는 남는다.** `IBShowCalendar`·`IBCloseCalendar`·
`LoadSearchChildData` 는 실제 호출이 확인돼 **변환 규칙을 유지**하고
"v7 에서 deprecated 되어 페이지가 삭제됐다"를 덧붙였다.
`IBShowCalendar` 의 v8 대응도 `IBSheet.showCalendar()` → **시트 메서드 `showCalendar(row, col, …)`**
로 정정했다(`funcs/core/show-calendar.md`).

### 정정 — 실존 확인 후보를 잘못 뽑았다 (`unused_targets.py` 보강)

`GetCountInfoElement` 를 "실존이 의심된다" 며 벤더 확인 후보로 올렸는데,
**v8 에 `getCountInfoElement` 개별 페이지가 버젓이 있었다.**
우리 매핑·규칙은 처음부터 정확했고, **틀린 것은 후보 선정 기준**이었다.

후보를 "호출 0건 + 벤더 마이그레이션 표에 없음" 만으로 뽑고
**v8 개별 페이지 존재를 확인하지 않았다.** 도구에 두 필터를 넣었다.

| 필터 | 근거 |
|---|---|
| v8 에 같은 함수가 camelCase 로 있으면 제외 | v8 에 있다는 것은 **v7 에도 있었다는 강한 근거** |
| 벤더 마이그레이션 표에 v7 이름이 있으면 제외 | 벤더가 그 함수를 인정한 것 |

적용 결과 후보 **18종 → 2종**(`GetTreeCol`·`GetTreeJson`).
제외된 것: v8 페이지 있음 8종(`GetCountInfoElement`·`Get/SetScrollTop` 등),
마이그레이션 표에 있음 8종.

**★"호출 0건" 은 "안 쓰인다" 일 뿐 "없다" 가 아니다.** 판정이 아니라 후보로만 쓴다.

### 갱신 — v8 공개 매뉴얼 최신본 반영 (2026-08-10 자)

GitHub 공개판(`docs: update public manuals 2026-08-10`)을 받아 리포 사본을 맞췄다.

| 구분 | 내용 |
|---|---|
| 파일 목록 | **변화 없음** — 추가 0 · 삭제 0 (1,027개 그대로) |
| 내용 변경 | **814개 파일** (줄바꿈만 다른 92개 제외) |
| 변경의 실체 | 추가 2,774줄 중 **807줄이 `synonyms` 검색어 주석** — API 변경이 아니다 |
| 비공개/점검 표시 | **새로 붙거나 사라진 것 없음** |

★**판정 근거 186건이 전부 그대로 유지**된다(`reverify.py` — 달라짐 0).
매뉴얼이 크게 바뀌어도 우리 매핑의 근거가 흔들리지 않았음을 확인했다.
감사 7종·규칙 자기점검도 모두 통과.

### 수정 — 엔진

- `engine/migrate_core.py` — 규칙 항목에 `pattern`/`replacement` 키가 없으면 `KeyError`로 중단되던 것을 건너뛰도록 방어(규칙 파일 편집 사고에 엔진이 죽지 않는다)
- `migrate.py` — 한국어 Windows 콘솔(cp949)에서 일부 문자를 인코딩하지 못해 `UnicodeEncodeError`로
  죽던 것을 출력 스트림 UTF-8 고정으로 해소
- `samples/tobe/orderList.jsp` — `Events.onClick` → `onAfterClick` 정정

---

> 이 리포지토리는 이 버전을 **최초 커밋**으로 시작한다.
> 그 이전의 내부 개발 이력(결정론 변환 엔진·지식 베이스·검증 3종·멀티 AI 진입점 구축)은 포함하지 않는다.
