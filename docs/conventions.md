# IBSheet7 → IBSheet8 변환 컨벤션 & 알려진 함정

> 대규모 실전 변환에서 축적된 규칙. 추측 대신 이 문서와 `method-mapping.md`/`property-mapping.md`/`event-mapping.md`/`deprecated-removed.md`를 근거로 변환한다.

## 1. 컬럼 Name = plain name (★접두사 금지)

- `setAttribute`/`getValue`/`setValue`/`getString`/`setString`/`refreshCell` 및 브릿지(`setAttribute2`/`getValue2`/`setValue2`)의 **col 인자에는 컬럼 Name만** 들어간다.
- `시트id.colName`(예: `orderListSheet.custNm`) 형식은 **불가**. Col 정의의 `"Name":"xxxSheet.col"`도 잘못 → `"Name":"col"`.
- IBSheet7 `SaveName`이 `sheetId.field`였더라도 IBSheet8 Name으로 그대로 두면 안 됨. **Name 정의 + 모든 참조에서 접두사 strip.**
- **단, 폼 필드/팝업 접두사는 strip 금지**: `xxxMap.FIELD_NM`(팝업 code/description), `xxxCommonDTO.`/단일 `xxxDTO.`(폼 필드, `$('#...')`/`frm.elements`)는 컬럼이 아님 → 유지.
- 규칙: `xxxDTOList.`/`xxxSheet.`(리스트·시트 변수 접두사)만 컬럼 참조 → strip. (config의 `stripPrefixes`/`keepPrefixes`로 제어)
- **엔진이 자동으로 떼는 범위는 "컬럼 자리의 문자열 리터럴"뿐이다** — `Col` 정의의 `Name`, 그리고 컬럼 인자를 받는 메서드의 리터럴 인자. 런타임 조립(`"pfx." + v`)이나 컬럼이 아닌 참조는 자동 처리되지 않고 `CONFIG_PREFIX_RESIDUE` 검토 항목으로 나온다. 자동/판단 경계표는 `AGENTS.md` 워크플로우 1단계 참고

## 2. EtcData = `sheet.etc` (속성, 함수 아님)

- 읽기: `sheet.GetEtcData("키")` → **`sheet.etc.키`** (속성 접근). `etc`는 함수가 아니라 시트 속성이다.
- 쓰기: `sheet.SetEtcData("키", 값)` → **`sheet.etc.키 = 값`** — `sheet.etc`에 `key:value`를 직접 대입하면 항목이 추가/변경된다.
- 조회 응답에 `etc` 객체를 포함하면 시트가 데이터를 받은 뒤 `sheet.etc`로 접근할 수 있다(시트 데이터 외 부가 정보 전달용).
  ```jsonc
  // 조회 응답
  { "Data": [ ... ], "etc": { "total": 1234, "pageSize": 50 } }
  ```
  ```js
  var etcData = sheet.etc;      // 부가 데이터 객체 (읽기)
  console.log(etcData.total);   // 1234  (= sheet.etc.total)
  sheet.etc.pageNo = 3;         // 항목 추가/변경 (쓰기)
  ```
- 호출 형태를 유지해야 하면 읽기 전용 **표준 헬퍼 `getEtcData(key)`**(= `sheet.etc?.[key]`, 널 안전)를 쓸 수 있다. **쓰기 브릿지는 없으므로** `sheet.etc.키 = 값` 직접 대입.
- 프로젝트 공통 래퍼 함수로 우회하지 말 것 — 표준 형태(`sheet.etc`)를 그대로 쓴다.

## 3. 값 반전 / 타입 치환 주의

- `Hidden:true` → `Visible:0` (★값 반전). `Hidden:false` → `Visible:1`.
- `Type:"Status"` → `Extend:IB_Preset.STATUS` (실제 Type은 `"Text"`). IBSheet8에 Status 타입 없음.
- `Type:"DelCheck"` → `Extend:IB_Preset.DelCheck` (실제 Type은 `"Bool"`). IBSheet8에 DelCheck 타입 없음.

> **★ `IB_Preset`은 `plugins/ibsheet-common.js`에 정의된 전역 객체(`window.IB_Preset`)다.**
> 본체 `ibsheet.js`에는 없다. `Extend:IB_Preset.*`을 쓰는 변환 결과는 **그 플러그인을 함께 로드**해야 한다.
>
> ```html
> <script src="/js/ibsheet/ibsheet.js"></script>
> <script src="/js/ibsheet/plugins/ibsheet-common.js"></script>   <!-- IB_Preset -->
> <script src="/js/ibsheet/ibsheet-migration.js"></script>        <!-- 브릿지 헬퍼 -->
> ```
>
> 빠뜨리면 **검증 3종은 PASS인데 브라우저에서 `IB_Preset is not defined`** 로 죽는다.
> 브릿지 헬퍼 배포 누락과 같은 유형이며, 정적 검사로는 잡히지 않는다.
> `IBSheet.v7.convertTreeData()`·`IB_Preset.Tree*Formula` 도 같은 플러그인에 있다.
>
> **★ 같은 함정이 엑셀·다이얼로그 계열에도 있다.** `down2Excel`·`down2Pdf`·`down2Text`·`loadExcel`·
> `loadText`·`directDown2Excel`·`directLoadExcel` 은 `plugins/ibsheet-excel.js`, `showFindDialog`·`showPivotDialog` 계열은 `plugins/ibsheet-dialog.js` 소속이다.
> 엑셀·텍스트 계열은 **서버 모듈 설치까지** 필요하다. 전체 표는 `AGENTS.md` 「런타임 의존」.
- `Type:"Combo"` → `Type:"Enum"`, `Type:"CheckBox"` → `Type:"Bool"`.
- `SearchMode:2` → `SearchMode:0` — **정책상 상향**(IBSheet8 강점인 FastLoad 가상 스크롤). IBSheet8이 `2`를 못 쓰는 게 아니다(오히려 v8 기본값). 제약에 걸리면 `2` 유지 → `AGENTS.md` 「SearchMode 상향 정책」. `SearchMode:4`는 유지.

## 4. 행 상태값

`"I"`→`"Added"`, `"U"`→`"Changed"`, `"D"`→`"Deleted"`, `"R"`→`""`(빈 문자열).

- 상태 초기화(`"R"` 상당)는 **표준 헬퍼 `clearRowStatus(row)`** 로 처리한다. `Added`/`Changed`/`Deleted`/`Moved`를 한 번에 끄고 `refreshRow`+`calculate`까지 수행한다.
- **`GetRowStatus` 는 인자·반환값이 모두 바뀐다.** v7은 **행 index**를 받아 `"R"`/`"U"`/`"I"`/`"D"`를 돌려줬지만, v8 `getRowStatus`는 **행 객체**를 받아 `""`/`"Changed"`/`"Added"`/`"Deleted"`를 돌려준다. 인자는 브릿지 `getRowByIndex7(idx)`로 바꾸고 **비교 리터럴까지 재작성**한다.

```js
// ❌ IBSheet7
if (mySheet.GetRowStatus(i) == "I") { ... }

// ✅ IBSheet8 — 인자는 행 객체, 비교값은 v8 상태명
if (mySheet.getRowStatus(mySheet.getRowByIndex7(i)) == "Added") { ... }
```

- v8 `getRowStatus`에는 **상태 우선순위**가 있다(벤더 확인) — `Added`가 포함되면 무조건 `Added`, 그다음 `Deleted`, 그 외 `Changed`, 상태가 없으면 `""`. 그래서 "입력이면서 수정된 행"을 v7처럼 구분하던 로직은 그대로 옮겨지지 않는다. 복합 상태 판정이 필요하면 `getRowsByStatus("Added,Changed")` 처럼 목록으로 받아 처리한다.
- `orgType=="Status"` 컬럼에 `"I"`/`"U"`/`"D"` 값을 직접 넣던 코드는 **`setValue2`** 로 옮기면 행 상태 재설정까지 자동 처리된다(§5-1).

## 5. 반환값 의미 변경 (사용처까지 재작성 필수)

| API | IBSheet7 반환 | IBSheet8 | 함정 |
|---|---|---|---|
| `GetSelectRow`→`getFocusedRow` | index(숫자) | row 객체 | 숫자 비교/배열 인덱스 불가 |
| `LastRow`→`getLastRow` | index | row 객체 | `for(i;i<=LastRow)` 불가 → `getCols().length-1` 식 |
| `LastCol`→`getLastCol` | index | 열 이름(문자열) | 숫자 루프 불가 |
| `HeaderRows`→`getHeaderRows().length` | 숫자 | 배열.length | 루프 재작성 |
| `ColValueDup`→`getRowsByDup` | index | row 객체 배열 | `>0`/`==-1` → `.length>0` |
| `FindCheckedRow`→`getRowsByChecked` | `"1\|2\|5"` | row 객체 배열 | 인덱스 접근 변경 |
| `IsDataModified`→`hasChangedData` | bool | 0/1 | 보통 무해 |
| `MouseRow`→`getMouseRow` | index | row 객체 | 인덱스로 쓰던 코드 재작성 |

- 숫자 인덱스 ↔ 객체/이름 변환은 **표준 헬퍼(`helpers/ibsheet-migration.js`)로 처리**한다. IBSheet7↔8 인덱스 체계 차이(행: 헤더/필터/합계 포함, 열: 숨김·SEQ)를 헬퍼가 보정하므로, 호출부마다 산술 보정을 흩뿌리지 않는다.
  - 행: **`getRowByIndex7(i)`** — IBSheet7 행 번호(헤더/필터/합계 포함)를 받아 행 객체 반환. 역변환 `getRowIndex7(row)`. (공식 `getRowByIndex(i)`는 데이터행만 카운트하고 보정 인자가 없음)
  - 열: **`getColByIndex7(i)`**(인덱스→이름) / **`getColIndex7(name)`**(이름→인덱스) — 숨김 컬럼(`includeHideCol`)·SEQ 자동컬럼 보정 내장. (공식 `getColByIndex(i)`는 인자 없이 보이는 컬럼 기준)

## 5-1. 값·속성 브릿지 (`setValue2`/`getValue2`/`setAttribute2`)

인덱스뿐 아니라 **값·속성 접근도 표준 헬퍼를 우선 사용**한다. 공식 API와 시맨틱이 다른 지점을 헬퍼가 흡수하므로, 호출부마다 분기를 흩뿌리지 않는다.

| 브릿지 | 공식 API와 다른 점 |
|---|---|
| `getValue2(r,c)` | `FormatFix:1` 컬럼은 `getString`으로 위임해 **표시문자열** 반환 (공식 `getValue`는 원시값) |
| `setValue2(r,c,v[,evt])` | ① IBSheet7이 값 변경 시 발생시키던 **`onAfterChange`를 강제 발생**(`evt`에 `0`/`false`를 주면 억제) ② `orgType=="Status"` 컬럼은 값(`I`/`U`/`D`)에 맞춰 **행 상태를 재설정** ③ Enum 컬럼에 화면표시값이 들어오면 **`EnumKeys` 저장값으로 자동 교체** |
| `setAttribute2(r,c,attr,val)` | IBSheet7 `CanEdit` → IBSheet8 **`ChangeEdit` + `AddEdit`로 분해**, Button 컬럼은 `Disabled`(값 반전)까지 설정 |
| `clearRowStatus(r)` | `Added`/`Changed`/`Deleted`/`Moved`를 한 번에 클리어 + `refreshRow`·`calculate`. (루프 안에서 반복 호출 시 `calculate` 비용 주의) |

**★ 주의 — `setValue2`의 4번째 인자는 `evt`(이벤트 발생 여부)로, 공식 `setValue`의 4번째 인자(렌더 억제)와 의미가 다르다.** 렌더 억제 목적의 `setValue(r,c,v,0)`는 공식 API 그대로 두고, 억제가 필요하면 루프 후 `renderBody()`를 호출한다.

**공식 API를 유지하는 경우:**
- 합계행(`FormulaRow`)·헤더 셀·이미지/HTML 셀 값 설정 → `onAfterChange`가 불필요 → 공식 `setValue`
- **값 변경 핸들러(`onAfterChange`) 안에서 파생 컬럼 쓰기** → `setValue2`가 `IBSheet.OnAfterValueChanged`를 호출해 변경 통지가 연쇄될 수 있음 → 공식 `setValue` 또는 `setValue2(...,0)`. (읽기는 `getValue2`로 통일해도 안전)
- 원본값(`getAttribute(r,c,"Orig")`) 조회처럼 표시문자열이 틀린 문맥 → 공식 `getValue`
- 속성 **읽기**는 브릿지가 없다 → 공식 `getAttribute`
- `setAttribute2`의 `CanEdit` 분해는 **셀 단위(row·col 모두 지정)에서만** 동작한다. 행·열 단위 호출은 공식 `setAttribute`와 동작이 같지만, 호출 형태 통일을 위해 `setAttribute2`로 적는다.

## 6. 미지원 API → 재구성

- `GetSearchData(url,param)` → **IBSheet8 미지원**. 동기 `$.ajax({async:false})` 또는 비동기 `doSearch`/`loadSearchData` 패턴으로 재구성. ★시맨틱 변경 큼 → 브라우저 동작 검증 권장.
- `GetSaveData` → 미지원. ajax로 재구성.
- `SetConfig`/`GetConfig` → 없음. 객체 속성 직접 접근(`sheet.CanEdit = 0`, `sheet.InEditMode = m`).
- `SetActionMenu(menuText)` → **`setActionMenu(menuText)`** (표준 헬퍼 — `"|"` 구분 문자열을 `Def.Row.Menu.Items` 배열로 변환). 헬퍼가 매핑하지 않는 커스텀 액션명은 `Value`가 항목명 그대로 들어가므로, `onSelectMenu`/`onShowMenu` 쪽 분기를 맞춰야 한다.
- `ComputeSum` → **`computeSum(col, startRow, endRow, isFullSum)`** (표준 헬퍼. 공식 API 없음).

## 7. 편집/포커스

- `SetCellEditable(r,c,b)` → **`setAttribute2(r,c,"CanEdit",b)`** (표준 헬퍼. `ChangeEdit`/`AddEdit` 분해 — §5-1 참조).
- `SetEditable(b)` → `sheet.CanEdit=b; sheet.rerender();`.
- `UpdateEdit:false, InsertEdit:false`(둘 다 false) → `CanEdit:0` 통합.
- `SetFocusEditMode(m)` → `sheet.InEditMode = m;`.
- `SelectCell(r,c)` → `focus(rowObj, "colName")`.

## 8. 행 추가/복사 (index 인자 금지)

- `DataInsert(idx)` → **`addRow2(idx)`** (표준 헬퍼 — IBSheet7 인덱스를 `next`/`parent`로 변환, 트리는 `addRow2(idx, lvl)`). **공식 `addRow`에 index 인자 불가** — 직접 쓸 때는 `addRow({next: sheet.getFirstRow()})` 형태.
- `RowDelete(idx)` → **`removeRow2(row)`** (표준 헬퍼 — 삭제 전 `onRowDelete` 발생). 이벤트가 불필요하면 공식 `removeRow`.
- `DataCopy()` → `copyRow({row: sheet.getFocusedRow()})` (row 파라미터 필수).

## 9. 이벤트

- 이벤트명: `OnSearchEnd`→`onSearchFinish`, `OnSaveEnd`→`onAfterSave`, `OnClick`→`onClick` 등 (event-mapping.md 참조).
- 핸들러 인자는 `evtParam` 객체: `evtParam.row`(행 객체), `evtParam.col`(열 이름), **`evtParam.val`**(셀 값 — ★`evtParam.value`가 아니다), `evtParam.oldVal`(`onAfterChange`의 이전 값). IBSheet7 핸들러의 대문자 `Row/Col/Value` 잔재(미정의 변수)는 `evtParam.*`로 교정. 단, 함수 파라미터/지역변수로 정의된 대문자는 보존.
- `onAfterSave`: `evtParam.result`(0=성공, 음수=오류), `evtParam.message`(문자열). (`evtParam.msg` 아님)
- `ColSaveName(col)` → 이벤트 안에서는 `evtParam.col`.

## 10. 검증으로 잡는 사고

- **함수 누락**: 병렬/대량 변환 시 함수가 통째로 사라지는 사고가 잦다 → `fn_parity.py`로 매 파일 확인.
- **잔존 PascalCase**: 변환 누락 → `residue_scan.py`로 0건 확인.
- **구문 깨짐**: 치환 부작용 → `jscheck.py`로 확인.
