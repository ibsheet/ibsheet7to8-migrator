# 변환 샘플 (ASIS / TOBE 두 쌍)

`AGENTS.md`의 규칙과 `helpers/ibsheet-migration.js` 브릿지가 실제 코드에서 어떻게 적용되는지
보여주는 참조 예제다. 두 쌍이 서로 다른 위험 유형을 담당한다.

| 파일 | 담당하는 것 |
|---|---|
| [`asis/orderList.jsp`](./asis/orderList.jsp) → [`tobe/orderList.jsp`](./tobe/orderList.jsp) | **브릿지 선택** — 타입 치환(`CheckBox`/`Combo`/`Status`/`DelCheck`), `Hidden`→`Visible` 값 반전, 접두사 strip, 반환값 재작성. `[브릿지]`/`[공식]` 주석으로 선택 근거 표시 |
| [`asis/salesStat.jsp`](./asis/salesStat.jsp) → [`tobe/salesStat.jsp`](./tobe/salesStat.jsp) | **맨 치환하면 안 되는 계열** — Merge·Drag·Sort 계열의 값 분기·값 반전·동명 유지, Cfg→Row/Col 레벨 이동, `Export`/`InfoRowConfig` 구조 이동, `Reset`→`dispose`+재생성, 피벗 시트 id 변경, 이벤트 시점 차이. `[동일유지]`/`[값반전]`/`[값분기]`/`[레벨이동]`/`[구조이동]` 주석 |

`salesStat.jsp`의 ASIS를 엔진에 넣으면 **규칙 32종 / 45건**이 검토 항목으로 잡힌다
(Merge 6 · Drag 3 · Sort 2 · 레벨이동 6 · 구조이동 6 · 메서드 2 · 이벤트 3).
TOBE는 그 45건을 매뉴얼 근거대로 처리한 결과이고, 검증 3종을 모두 통과한다.

---

## 재현 방법

```bash
# 변환 + 검증을 한 번에 (CLI)
python migrate.py convert samples/asis/salesStat.jsp --out /tmp/salesStat.auto.jsp --config migrate.config.example.json

# 엔진만 직접 (검토 항목 리포트)
python engine/migrate_core.py samples/asis/orderList.jsp --out /tmp/orderList.auto.jsp --report /tmp/report.json

# 자기 검증 — 두 TOBE 모두 3종 통과
python migrate.py verify samples/tobe/orderList.jsp --asis samples/asis/orderList.jsp
python migrate.py verify samples/tobe/salesStat.jsp --asis samples/asis/salesStat.jsp
```

검증이 실제로 작동하는지 확인하려면 ASIS에 `residue_scan`을 돌려 본다 → **잔존 FAIL**이 나온다.

---

## orderList.jsp 가 담고 있는 케이스 (브릿지 선택)

### 브릿지를 쓴 자리

| 위치 | ASIS | TOBE |
|---|---|---|
| `fnAddRow` | `DataInsert(0)` | `addRow2(0)` |
| `fnAddRow` | `SetCellValue(row,"gubun","매입")` | `setValue2(...)` — Enum 표시값 → `EnumKeys` 자동 교체 |
| `fnDelRow` | `RowDelete(idx)` | `removeRow2(row)` — `onRowDelete` 발생 |
| `fnClearStatus` | `SetRowStatus(idx,"R")` | `clearRowStatus(row)` |
| `fnLockRow` | `SetCellEditable(...)` | `setAttribute2(...,"CanEdit",0)` — `ChangeEdit`/`AddEdit` 분해 |
| `fnFocusBizNo` | `SelectCell(HeaderRows(), 3)` | `focus(getRowByIndex7(...), getColByIndex7(3))` |
| `fnSumAmt` | `ComputeSum(...)` | `computeSum("amt")` — 공식 API에 없음 |
| `fnToggleAll` | `CheckAll(0, 1)` | `setAllCheck(getColByIndex7(0), 1)` |
| `fnResize` | `SetSheetWidth/Height` | `setSheetWidth`/`setSheetHeight` — `rerender` 포함 |
| `fnReadEtc` | `GetEtcData("totalCount")` | `getEtcData("totalCount")` (널 안전) |
| `fnInitSheet` | `SetActionMenu("행추가\|...")` | `setActionMenu(...)` — `Def.Row.Menu.Items` 배열 변환 |

### 브릿지를 쓰지 않고 공식 API를 유지한 자리 (★중요)

| 위치 | 유지한 것 | 이유 |
|---|---|---|
| `fnReverseCheck` | `setValue(r,c,v,0)` + `renderBody()` | 4번째 인자가 **렌더 억제**. `setValue2`의 `evt`와 의미가 다르다 |
| `mySheet_OnAfterEdit` | 파생값 쓰기에 `setValue` | 변경 핸들러 안에서 `setValue2`는 **변경 통지가 연쇄**될 수 있다 (읽기는 `getValue2` 사용) |
| `fnSumAmt` | 합계행에 `setValue` | `FormulaRow`는 사용자 데이터 셀이 아니므로 `onAfterChange` 불필요 |
| `fnShowOrigBizNo` | `getValue` | 원본값(`Orig`) 문맥 — `getValue2`의 표시문자열 반환이 오히려 틀리다 |
| `fnReadEtc` | `sheet.etc.pageNo = 1` | EtcData **쓰기 브릿지는 없다** |

### 그 밖의 변환 규칙

- **접두사**: `orderDTOList.` (리스트 변수) → strip / `orderCommonDTO.` (폼 필드) → 유지
- **값 반전**: `Hidden:false`→`Visible:1`, `Hidden:true`→`Visible:0`
- **타입 치환**: `CheckBox`→`Bool`, `Combo`→`Enum`(+`Enum`/`EnumKeys`), `Status`→`Text`+`Extend:IB_Preset.STATUS`, `DelCheck`→`Bool`+`Extend:IB_Preset.DelCheck`
  - ★`IB_Preset`은 본체가 아니라 **`plugins/ibsheet-common.js`**에 있는 전역이다. `tobe/orderList.jsp`가 그 스크립트를 함께 로드하는 이유이며, 빠뜨리면 검증 3종 PASS인데 브라우저에서 `IB_Preset is not defined`로 죽는다
- **속성명**: `SaveName`→`Name`(v8에서 필수·시트 내 유일), `UpdateEdit`→`ChangeEdit`, `InsertEdit`→`AddEdit`, (`UpdateEdit:0`+`InsertEdit:0`)→`CanEdit:0`
- **성능 상향(의도된 규칙)**: `SearchMode:2`→`0` — IBSheet8 강점인 FastLoad 가상 스크롤. 단 피벗·`NoVScroll`·`Lines/Html/Img/Icon/Button` 타입이 있으면 제약에 걸리므로 `2`(LazyLoad) 유지를 검토한다
- **치환하면 안 되는 것**: `ColMerge` — v8에 동명 col 속성이 있어 **그대로 둔다**(`Span`은 cell colspan으로 다른 개념)
- **구조 분리**: `MergeSheet:5`(msHeaderOnly) → `HeaderMerge` + `DataMerge:0` (v7이 한 number에 담았던 데이터·헤더 병합을 v8이 영역별로 분리. 방향값은 헤더 구조에 따라 판단)
- **반환값 재작성**: `ColValueDup(...) > 0` → `getRowsByDup(...).length > 0`, `GetSelectRow()` 숫자 비교 → `getFocusedRow()` null 체크

---

## ★ 이벤트 핸들러는 함수명을 유지한다

IBSheet7의 전역 함수 명명 규칙(`mySheet_OnAfterEdit`)을 IBSheet8 `Events` 객체로 옮길 때,
핸들러를 **익명 함수로 인라인하면 `fn_parity`가 함수 누락으로 판정**한다.

```js
// ❌ ASIS의 mySheet_OnAfterEdit 이 사라진 것으로 잡힌다
Events: { onAfterChange: function(evtParam) { ... } }

// ✅ 함수명을 유지하고 참조로 연결 — 파리티 통과 + diff 최소화
function mySheet_OnAfterEdit(evtParam) { ... }
Events: { onAfterChange: mySheet_OnAfterEdit }
```

이벤트명만 IBSheet8 규칙(`onAfterChange` 등)으로 바꾸고, 핸들러 이름은 ASIS 그대로 둔다.

---

## ★ `setActionMenu`는 `Def.Row`가 있어야 동작한다

브릿지는 `sheet.Def && sheet.Def.Row`를 확인한 뒤 `Def.Row.Menu`를 교체한다.
초기화 옵션에 `Def.Row`가 없으면 **조용히 아무 일도 하지 않는다** → `fnInitSheet`처럼 미리 선언한다.

```js
var OPT = {
  Def: { Row: { Menu: {Items: []} } },
  ...
};
```

---

## salesStat.jsp 가 담고 있는 "맨 치환 금지" 케이스

각 항목은 **이름만 바꾸면 에러 없이 동작만 달라지는** 유형이다. 검증 3종(정적 검사)으로는 잡히지 않는다.

### Merge 계열

| ASIS | TOBE | 유형 |
|---|---|---|
| `MergeSheet: 7` (msHeaderOnly+msPrevColumnMerge) | `HeaderMerge:3` + `DataMerge:0` + `PrevColumnMerge:2` | 값 분기 — `HeaderMerge`로만 바꾸면 데이터 병합 소실 |
| `HeaderMergeMode: 1` | `HeaderMerge: 3`(>0) + `IgnoreHeaderColMerge: 0` | ★**두 속성을 함께** 설정. `IgnoreHeaderColMerge`는 `HeaderMerge > 0`일 때만 적용된다. `HeaderMergeMode:0`→`HeaderMerge:0`으로 옮기면 헤더 병합이 사라진다 |
| `PrevColumnMergeMode: 0` | `PrevColumnMergeMode: 0` | 동일 유지 — `PrevColumnMerge`로 바꾸면 기능이 꺼진다 |
| `ColMerge: 1` (Col) | `ColMerge: 1` | 동일 유지 — `Span`은 cell colspan으로 무관 |

### Drag 계열

| ASIS | TOBE | 유형 |
|---|---|---|
| `DragMode: 1` | `CanDrag: true` | 값 분기 — v7 number(-1/0/1) → v8 boolean |
| `DragCell: 0` | `DragCell: 0` | 동일 유지 |
| `DragRowSelection: 1` (행) | `DragCell: 0` (행) | ★값 반전. 위 `DragCell`과 결론이 같아 하나로 합쳤다 |

### Sort 계열

| ASIS | TOBE | 유형 |
|---|---|---|
| `HeaderSort: 2` (아이콘만) | `CanSort:1` + `HeaderSortMode:2` | 값별로 다른 속성으로 분기 — `SortIcons` 아님 |
| `UseDefaultSortImage: 1` | `SortIcons: 1` | 이름 변경(이쪽이 `SortIcons` 축) |
| `GroupSort: 0` | `GroupSort: 0` | 동일 유지 — `GroupSortMain`은 오름/내림(1\|2)이라 `0`은 유효값도 아니다 |
| `AutoRowHeight: 1` | `AutoRowHeight: true` | 동일 유지 + ★default 반대(v7 `1`/v8 `0`)라 명시 필수 |
| `TouchScrolling: 2` (지연 이동) | `TouchScrolling: 1` | 동일 유지 + v7 `2`는 v8 boolean에 대응 없어 `1`로 흡수 |

### 레벨 이동 (Cfg → Row/Col)

| ASIS (Cfg) | TOBE | 방법 |
|---|---|---|
| `DataRowHeight: 24` | `Def.Row.Height: 24` | 행 기본값으로 |
| `HeaderRowHeight: 30` | `Def.Header.Height: 30` | 헤더 기본값으로 |
| `SumBackColor`·`SumFontBold`·`SumFontColor`·`FocusSumRow` | `getRowById("FormulaRow")` + `setAttribute` 로 `Color`·`TextStyle`·`TextColor`·`CanFocus` | 합계행 객체 속성 |
| `NoImageUrl` | **옮기지 않음** | v8 `DefaultImage`는 Col 속성이고 `Type:"Img"` 컬럼에만 적용 → 이 시트엔 대상이 없다 |

### 구조 이동

| ASIS (평평한 Cfg) | TOBE |
|---|---|
| `Down2Excel_Url`·`Down2Pdf_Url` | `Cfg.Export: { Down2ExcelUrl, Down2PdfUrl }` |
| `CountFormat`·`CountPosition`·`PagingPosition` | `Cfg.InfoRowConfig: { Layout, Space }` |

### 메서드 / 이벤트

| ASIS | TOBE | 주의 |
|---|---|---|
| `Reset(1)` | `dispose()` + `fnInitSheet()` 재생성 | ★2단계. v7은 새 시트 객체를 반환했지만 v8 `dispose`는 완전 제거 |
| `CreatePivotTable()` + `"mySheet_Pivot"` | `makePivotTable()` + `"pivotSheet_mySheet"` | ★피벗 시트 id 규칙 반전(접미사→접두사) |
| `mySheet_OnClick` | `Events.onAfterClick` | ★`onClick` 아님 — v8 `onClick`은 발생 시점이 더 앞선다 |
| `mySheet_OnButtonClick` | 같은 `onAfterClick`에서 **컬럼 가드로 분기** | v8에 Button 전용 클릭 이벤트가 없어 모든 컬럼에서 발생 |
| `mySheet_OnSaveEnd` | `Events.onAfterSave` | ★v7=반영·렌더링 후 / v8=서버 응답 직후. "반영됐다" 전제 코드가 깨진다 |
| `mySheet_OnChange` | `Events.onAfterChange` + 파생값은 **공식 `setValue`** | 핸들러 안에서 `setValue2`를 쓰면 변경 통지가 연쇄된다 |

### 그 밖에

- `SearchMode: 2` → `0` (정책상 FastLoad 상향). 이 시트는 `Lines` 타입(메모)이 있어 행 높이가
  가변이므로 **`AutoRowHeight: true`를 함께 켰다** — FastLoad 제약을 충족시키는 조합이다
- `AutoSum: 1` → `FormulaRow: "Sum"` / `PointCount: 2` → `Format: "#,##0.00"` / `MultiLineText: 1` → `Type: "Lines"`
- `statDTOList.` 접두사는 config `stripPrefixes`로 제거, `statCommonDTO.`는 `keepPrefixes`로 보존
