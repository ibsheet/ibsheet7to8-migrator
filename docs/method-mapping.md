# IBSheet7 → IBSheet8 메서드 변환 대조표

> 근거: `docs/ibsheet7-manual/` · `docs/ibsheet8-manual/` 벤더 매뉴얼 전문
> (근거는 **개별 페이지**를 본다. 예전 벤더 마이그레이션 요약 부록은 **없어졌다** — 2026-08-11 확인)
> 범례: ✅ 지원 | ⚠️ 일부지원/변경 | ❌ 미지원/지원안함 | 🚫 불필요(삭제됨)

> ⚠️ **인덱스·값·속성 변환은 표준 헬퍼(`helpers/ibsheet-migration.js`)를 우선 사용한다.** 헬퍼에 대응 브릿지가 없거나, 아래 「브릿지를 쓰지 않는 경우」에 해당할 때만 공식 API를 직접 쓴다.
> - 행 인덱스↔객체: IBSheet7 행 번호는 **헤더/필터/합계행을 포함**하지만 공식 `getRowByIndex(i)`는 **데이터행만** 카운트(추가 인자 없음)한다. 오프셋 계산이 번거롭고 실수가 잦으므로 **표준 헬퍼 `getRowByIndex7(i)`** 를 쓴다(헤더/필터/상단합계 오프셋 보정 내장). 역변환은 `getRowIndex7(row)`. → `helpers/ibsheet-migration.js`
> - 열 인덱스↔이름: 공식 `getColByIndex(i)`는 인자 없이는 **보이는 컬럼 기준**이라 IBSheet7처럼 숨김 컬럼을 포함하려면 `includeHideCol=1`이 필요하고 SEQ 자동컬럼 보정까지 얽힌다. 그래서 **표준 헬퍼 `getColByIndex7(i)`(인덱스→이름) / `getColIndex7(name)`(이름→인덱스)** 를 쓴다(내부에서 `includeHideCol`+SEQ 처리). → `helpers/ibsheet-migration.js`
> - 값 읽기/쓰기: **`getValue2(r,c)` / `setValue2(r,c,v[,evt])`**. `getValue2`는 `FormatFix:1` 컬럼에서 공식 `getValue`와 달리 표시문자열(`getString`)을 반환하고, `setValue2`는 IBSheet7이 값 변경 시 발생시키던 `onAfterChange`를 강제 발생시키며 Status(`orgType`)·Enum 컬럼을 특수 처리한다(Enum은 화면표시값→`EnumKeys` 저장값 자동 교체). 명시적 표시문자열은 공식 `getString`/`setString`.
> - 속성: **`setAttribute2(r,c,attr,val)`**. IBSheet7의 `CanEdit`는 IBSheet8에서 `ChangeEdit`/`AddEdit`로 분리됐고 Button 컬럼은 `Disabled`로 표현되므로 브릿지가 이를 분해한다. 읽기는 공식 `getAttribute`.
> - 행 추가/삭제: **`addRow2(row,lvl)`**(IBSheet7 `DataInsert` 대체 — 인덱스 위치별 `next`/`parent` 구성) / **`removeRow2(row)`**(`onRowDelete` 발생).
> - 반환값·인덱스 체계가 IBSheet7과 달라지므로, 값 하나만 바꾸지 말고 그 값을 쓰는 **사용처·루프까지 함께 재작성**한다.
>
> **브릿지를 쓰지 않는 경우** (공식 API 유지):
> - `setValue2`는 4번째 인자가 `evt`(이벤트 발생 여부)다. 공식 `setValue`의 4번째 인자(렌더 억제)와 **의미가 다르므로**, 렌더 억제 목적의 `setValue(r,c,v,0)`는 그대로 둔다.
> - 사용자 데이터 셀이 아닌 대상(합계행 `FormulaRow`, 헤더 셀, 이미지/HTML 셀)에는 `onAfterChange`가 불필요 → 공식 `setValue`.
> - 원본값(`Orig`) 조회처럼 표시문자열이 오히려 틀린 문맥 → 공식 `getValue`.
> - `setAttribute2`의 `CanEdit` 분해는 **셀 단위(row·col 모두 지정)에서만** 동작한다. 행 단위(`row,null`)·열 단위(`null,col`)는 공식 `setAttribute`와 동일하게 `CanEdit`을 그대로 넘긴다(Row/Col의 `CanEdit` 속성은 IBSheet8에도 존재 — property-mapping.md 참조). 호출 형태를 통일해 두면 추후 브릿지가 확장돼도 호출부를 고칠 필요가 없으므로 `setAttribute2`로 적어 둔다.

---

## ★ 시트 생성·초기화 — v7 명령형 → v8 선언형 (맨 치환 불가)

IBSheet7은 **만들고 나서 설정**했고, IBSheet8은 **한 번에 선언**한다. 이 구조 차이 때문에
생성·초기화 코드는 통째로 재구성해야 한다. 실제 고객 코드에서 아래 세 가지 형태를 확인했다.

| v7 | 역할 | v8 |
|---|---|---|
| `createIBSheet(id, width, height, locale)` | 현재 위치에 시트 생성 | `IBSheet.create({id, el, options, width, height})` |
| `createIBSheet2(element, id, width, height, locale)` | 지정 element 안에 생성 (**첫 인자가 `el`**) | 〃 |
| `new ibsheetObject()` | 시트 객체 선언 | 없음 — `IBSheet.create(...)` 반환값을 변수에 담는다 |
| `IBS_InitSheet(sheet, info)` · 프로젝트 자체 래퍼(`IBS_InitSheet2` 등) | `info.Cfg`/`info.HeaderMode`/`info.Cols` 를 한 번에 적용 | `IBSheet.create` 의 `options` 로 통합 |
| `SetConfig(cfg)` · `InitHeaders(h, info)` · `InitColumns(cols)` | 생성 후 개별 설정 | `options.Cfg` · 각 Col 의 `Header` · `options.Cols` |

```javascript
// v7 — 만들고 나서 설정 (실제 고객 코드 형태)
var mySheet = new ibsheetObject();
createIBSheet2(document.getElementById("ib_sheet"), "mySheet", "100%", "480px");
var initSheet = {};
initSheet.Cfg        = { FrozenCol: 1, SearchMode: smClientPaging, Page: 20 };
initSheet.HeaderMode = { Sort: 1, ColMove: 1, ColResize: 1 };
initSheet.Cols       = [ { Header: "No", Type: "Seq", SaveName: "No" }, ... ];
IBS_InitSheet(mySheet, initSheet);

// v8 — 한 번에 선언
var mySheet = IBSheet.create({
  id: "mySheet",
  el: "ib_sheet",                       // element id 문자열 또는 DOM
  width: "100%", height: 480,
  options: {
    Cfg:  { SearchMode: 1, Page: 20,
            CanSort: 1, CanColMove: 1, CanColResize: 1 },   // ← HeaderMode 가 Cfg 로 흡수된다
    LeftCols: [ { Header: "No", Type: "Seq", Name: "No" } ], // ← FrozenCol:1 은 그 열을 여기로 옮긴다
    Cols:     [ { Header: "대장번호", Type: "Int", Name: "mgtNo" }, ... ] // ← SaveName → Name
  }
});
```

> **`HeaderMode` 는 v8 에서 `Cfg` 로 흡수된다** — `Sort`→`CanSort`, `ColMove`→`CanColMove`,
> `ColResize`→`CanColResize`, `HeaderCheck`→`HeaderCheck`. v7 은 별도 블록이었으므로 옮겨 붙여야 한다.
>
> **`HeaderCheck` 는 default 가 반대다** — v7 은 `1`(헤더 전체 체크박스 표시,
> `funcs/init/InitHeaders.md`), v8 은 `0`(표시 안 함, `props/cfg/header-check.md`).
> **v7 에서 생략했던 화면은 v8 에 `HeaderCheck:1` 을 명시해야** 체크박스가 남는다.
> v8 은 `Type:"Bool"` 인 모든 열에 붙으며, 특정 열만 다르게 하려면 열 쪽 `HeaderCheck` 가 우선한다.
>
> **`FrozenCol: n` 은 개수가 아니라 구조 이동이다** — v8 에는 대응하는 `Cfg` 속성이 없고,
> 고정할 열의 정의를 **최상위 `LeftCols` 배열로 옮긴다**(오른쪽은 `RightCols`).
> 생성 후 동적으로 바꿀 때는 `setFixedLeft(n)` 을 쓴다.
>
> **`ibsheetinfo.js` · `ibleaders.js` 는 v8 에서 로드하지 않는다** — 그 안의 전역 상수(`smClientPaging` 등)와
> 헬퍼(`createIBSheet2`·`IBS_InitSheet`)가 사라지므로, 남겨두면 브라우저에서 `... is not defined` 로 죽는다.
> 상수는 엔진이 숫자로 바꿔준다(`property-mapping.md` 「v7 전역 상수」).

관련 규칙: `CREATE_IBSHEET` · `IBSHEET_OBJECT_DECL` · `INITHEADERS` · `INITCOLUMNS` · `SETCONFIG`


## 메뉴

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `GetActionMenu(), SetActionMenu()` | `setActionMenu()` → `(Row/Col/Cell)Menu` 속성 | ⚠️ | **표준 헬퍼** `setActionMenu("행추가\|행복사\|*-\|삭제")` — IBSheet7 `"\|"` 구분 문자열을 `Def.Row.Menu.Items` 배열로 변환(액션명→`Value` 매핑, `*-`/`-`는 구분선). 초기화 시점 정적 설정은 OPT.Def.Row.Menu 직접 사용. 선택 이벤트: onSelectMenu(→onShowMenu) |
| `GetGroupActionMenu(), SetGroupActionMenu()` | `setAttribute` → Group행 Menu 속성 | ⚠️ | `setAttribute(getRowById("Group"), null, "Menu", MENU)` |
| `GetHeaderActionMenu(), SetHeaderActionMenu()` | 초기화시 `Def.Header`에 Menu 속성 | ⚠️ | 초기화시 설정 |

---

## 셀 속성

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `GetCellAlign(), SetCellAlign()` | `get/setAttribute()` → `Align` | ✅ | `setAttribute(row, col, "Align", "center")` |
| `GetCellBackColor(), SetCellBackColor()` | `get/setAttribute()` → `Color` | ✅ | `setAttribute(row, col, "Color", "#FF0000")` |
| `CellComboItem()` | `get/setAttribute()` → `Enum`, `EnumKeys` | ✅ | `setAttribute(row, col, "Enum", "\|사장\|과장")` / `"EnumKeys"` |
| `GetCellCursor(), SetCellCursor()` | `get/setAttribute()` → `Cursor` | ✅ | 특정 셀 마우스 커서 변경 |
| `GetCellEditable(), SetCellEditable()` | `getAttribute()` / `setAttribute2()` → `CanEdit` | ✅ | **`setAttribute2(row, col, "CanEdit", 0)`** (표준 헬퍼 — `ChangeEdit`/`AddEdit` 분해, Button은 `Disabled`) |
| `GetCellFont(), SetCellFont()` | `get/setAttribute()` → `TextStyle`, `TextFont`, `TextSize` | ✅ | TextStyle: 1=Bold, 2=Italic, 4=Underline, 8=Strike |
| `GetCellFontBold(), SetCellFontBold()` | `get/setAttribute()` → `TextStyle` | ✅ | `setAttribute(row, col, "TextStyle", 1)` |
| `GetCellFontColor(), SetCellFontColor()` | `get/setAttribute()` → `TextColor` | ✅ | `setAttribute(row, col, "TextColor", "#FF0000")` |
| `GetCellFontItalic(), SetCellFontItalic()` | `get/setAttribute()` → `TextStyle` | ✅ | TextStyle=2 |
| `GetCellFontName(), SetCellFontName()` | `get/setAttribute()` → `TextFont` | ✅ | `setAttribute(row, col, "TextFont", "굴림")` |
| `GetCellFontSize(), SetCellFontSize()` | `get/setAttribute()` → `TextSize` | ✅ | `setAttribute(row, col, "TextSize", 12)` |
| `GetCellFontStrike(), SetCellFontStrike()` | `get/setAttribute()` → `TextStyle` | ✅ | TextStyle=8 |
| `GetCellFontUnderline(), SetCellFontUnderline()` | `get/setAttribute()` → `TextStyle` | ✅ | TextStyle=4 |
| `GetCellImage(), SetCellImage()` | `get/setValue()` | ✅ | `setValue(row, col, "\|./images/aa.gif")` (첫 글자가 구분자) |
| `CellSaveName()` | (없음) | ❌ | 지원 불가 |
| `CellSearchValue()` | `getAttribute()` → `Orig` | ✅ | `getAttribute(row, col, "Orig")` \|\| `getValue(row, col)` — 원본값 문맥이므로 `getValue2`(표시문자열) 사용 금지 |
| `GetCellVAlign(), SetCellVAlign()` | `get/setAttribute()` → `VAlign` | ✅ | `setAttribute(row, col, "VAlign", val)` |
| `GetCellText(), SetCellText()` | `get/setString()` | ✅ | `getString(row, col)` / `setString(row, col, val)` |
| `GetCellValue(), SetCellValue()` | `getValue2(), setValue2()` | ✅ | **`getValue2(row, col)` / `setValue2(row, col, val)`** (표준 헬퍼 — FormatFix 반영, `onAfterChange` 발생, Status·Enum 처리). 이벤트 억제는 `setValue2(row,col,val,0)` |
| `GetCellProperty()` | `getAttribute()` | ✅ | `getAttribute(row, col, "Format")` 등 |
| `InitCellProperty()` | `setAttribute()` | ✅ | 속성별 개별 setAttribute 호출로 대체 |
| `RangeBackColor()` | `setAttribute()` → `Color` | ✅ | 범위 루프 + `renderBody()` |
| `RangeFontBold()` | `setAttribute()` → `TextStyle:1` | ✅ | 범위 루프 처리 |
| `RangeFontColor()` | `setAttribute()` → `TextColor` | ✅ | 범위 루프 처리 |
| `GetRangeText(), SetRangeText()` | `getString(), setString()` | ✅ | 범위 루프로 직접 구현 |
| `GetRangeValue(), SetRangeValue()` | `getValue2(), setValue2()` | ✅ | 범위 루프로 직접 구현 (표준 헬퍼 사용) |
| `SetCellImageStyle()` | `setValue()` + `setAttribute()` | ✅ | setValue로 이미지 설정, setAttribute로 정렬 |
| `PopupButtonImage()` | `setAttribute()` → `Button` 속성 | ✅ | `setAttribute(row, col, "Button", imgPath)` |
| `GetToolTipText(), SetToolTipText()` | `get/setAttribute()` → `Tip` | ✅ | `setAttribute(row, col, "Tip", "...")` |

---

## 행 속성

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `RowBackColor()` | `get/setAttribute()` → `(Row)Color` | ✅ | `setAttribute(row, null, "Color", "#FF0000")` |
| `GetRowBackColorD(), SetRowBackColorD()` | (CSS) | ⚠️ | `main.css`의 `.IBColorDeleted` 클래스 수정 |
| `GetRowBackColorI(), SetRowBackColorI()` | (CSS) | ⚠️ | `main.css`의 `.IBColorAdded` 클래스 수정 |
| `GetRowBackColorU(), SetRowBackColorU()` | (CSS) | ⚠️ | `main.css`의 `.IBColorChanged` 클래스 수정 |
| `GetRowData(), SetRowData()` | `getRowValue(), setRowValue()` | ✅ | `getRowValue(row)` → JSON 반환 |
| `GetRowDraggable(), SetRowDraggable()` | `get/setAttribute()` → `(Row)CanDrag` | ✅ | `setAttribute(row, null, "CanDrag", 1)` |
| `GetRowEditable(), SetRowEditable()` | `getAttribute()` / `setAttribute2()` → `(Row)CanEdit` | ✅ | **`setAttribute2(row, null, "CanEdit", 0)`** (표준 헬퍼. 행 단위는 공식 `setAttribute`와 동작 동일 — 호출 형태 통일용) |
| `GetRowExpanded(), SetRowExpanded()` | 설정: `setExpandRow()` / 읽기: ❌ 공개 API 없음 | ⚠️ | 접기·펼치기 **설정은 `setExpandRow()`**(공개)로 한다. 이전에 읽기 경로로 안내한 `Expanded` (cell)은 **v8 비공개 API** 라 빼야 한다 — 펼침 상태가 필요하면 코드에서 따로 관리한다. 이전 표기: `setAttribute(row,null,"Expanded")` 확인, `setExpandRow({row,expand:1})` |
| `GetRowFontColor(), SetRowFontColor()` | `get/setAttribute()` → `(Row)TextColor` | ✅ | `setAttribute(row, null, "TextColor", "#FF0000")` |
| `GetRowHeight(), SetRowHeight()` | `get/setAttribute()` → `(Row)Height` | ✅ | `setAttribute(row, null, "Height", 30)` |
| `GetRowHeightMax(), SetRowHeightMax()` | `get/setAttribute()` → `(Row)MaxHeight` | ✅ | `setAttribute(row, null, "MaxHeight", 30)` |
| `GetRowHeightMin(), SetRowHeightMin()` | (없음) | ❌ | 지원안함 |
| `GetRowHidden(), SetRowHidden()` | `hideRow(), showRow()` | ✅ | `hideRow(row)` / `showRow(row)` |
| `GetRowLevel(), SetRowLevel()` | `get/setAttribute()` → `(Row)Level` | ✅ | setter는 사용하지 않음. `getAttribute(row,null,"Level")` |
| `GetRowMerge(), SetRowMerge()` | `(row) RowMerge` | ⚠️ | **메서드 → Row 속성으로 이동.** v8 `RowMerge`(row)는 `DataMerge`/`HeaderMerge` 로 값 기준 병합이 동작할 때 **해당 행의 가로(좌우) 병합** 여부를 정한다. 행별로 설정해야 하므로 맨 치환 대상이 아니다. 이전에 "지원안함"으로 적혀 있었다 — 2026-08-04 정정 |
| `RowSaveStr()` | `getRowValue()` + `URLSearchParams` | ✅ | `new URLSearchParams(getRowValue(row)).toString()` |
| `GetRowSumable(), SetRowSumable()` | `get/setAttribute()` → `(Row)NoCalculate` | ✅ | `setAttribute(row, null, "NoCalculate", 1)` |
| `RowTop()` | `getRowTop()` | ✅ | |
| `SetRowHaveChildValue()` | `setAttribute()` → `HaveChild` 속성 | ✅ | `setAttribute(row, null, "HaveChild", 1)` |
| `GetSumBackColor(), SetSumBackColor()` | `get/setAttribute()` → `(Row)Color` | ✅ | `setAttribute(getRowById("FormulaRow"), null, "Color", "#FFFFAA")` |
| `GetSumFontBold(), SetSumFontBold()` | `get/setAttribute()` → `(Row)TextStyle` | ✅ | `setAttribute(getRowById("FormulaRow"), null, "TextStyle", 1)` |
| `GetSumFontColor(), SetSumFontColor()` | `get/setAttribute()` → `(Row)TextColor` | ✅ | `setAttribute(getRowById("FormulaRow"), null, "TextColor", "#FF0000")` |
| `GetSumRowHidden(), SetSumRowHidden()` | `showRow(), hideRow()` | ✅ | `hideRow(getRowById("FormulaRow"))` |
| `GetSumValue(), SetSumValue()` | `get/setValue()` | ✅ | `setValue(getRowById("FormulaRow"), col, val)` — 합계행은 데이터 셀이 아니므로 `setValue2`(onAfterChange 발생) 사용 금지 |

---

## 열 조작

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `GetColBackColor(), SetColBackColor()` | `get/setAttribute()` → `Color` | ✅ | `setAttribute(null, col, "Color", "#FF0000")` |
| `GetColCondProperty(), SetColCondProperty()` | `Attr + Formula` | ⚠️ | `ColorFormula`, `TextColorFormula`, `CanEditFormula` 조합으로 구현 |
| `GetColEditable(), SetColEditable()` | `getAttribute()` / `setAttribute2()` → `CanEdit` | ✅ | **`setAttribute2(null, col, "CanEdit", 0)`** (표준 헬퍼. 열 단위는 공식 `setAttribute`와 동작 동일 — 호출 형태 통일용) |
| `ColDelete()` | `removeCol()` | ✅ | |
| `GetColFontBold(), SetColFontBold()` | `get/setAttribute()` → `TextStyle:1` | ✅ | `setAttribute(null, col, "TextStyle", 1)` |
| `GetColFontColor(), SetColFontColor()` | `get/setAttribute()` → `TextColor` | ✅ | `setAttribute(null, col, "TextColor", "#FF0000")` |
| `GetColFontUnderline(), SetColFontUnderline()` | `get/setAttribute()` → `TextStyle:4` | ✅ | `setAttribute(null, col, "TextStyle", 4)` |
| `GetColHidden(), SetColHidden()` | `hideCol(), showCol()` | ✅ | `hideCol(col)` / `showCol(col)` + `rerender()` |
| `ColInsert()` | `addCol()` | ✅ | `addCol(name, section, pos, colDef, 1, 1)` |
| `ColLeft()` | `getColLeft()` | ✅ | `getColLeft(col)` |
| `ColSaveName()` | `getColByIndex7()` | ✅ | 표준 헬퍼 `getColByIndex7(colIndex)` → 열 이름 (includeHideCol+SEQ 보정 내장). `helpers/ibsheet-migration.js` |
| `ColumnSort()` | `doSort()` / `clearSort()` | ⚠️ | `clearSort()` 초기화, `doSort("-col1,col2")` (앞에 -가 DESC) |
| `ColValueDup()` | `getRowsByDup()` | ⚠️ | 반환값이 row index → row object로 변경 |
| `ColValueDupRows()` | `getRowsByDup()` | ⚠️ | 반환값 형식 다름: IBSheet8은 이중배열에 row object |
| `GetColWidth(), SetColWidth()` | `setColWidth()`, `getAttribute("Width")` | ✅ | `setAttribute(null, col, "Width", 120)` |
| `SetColProperty()` | `setAttribute()` | ✅ | Enum/EnumKeys 등 속성별 개별 setAttribute |
| `GetColSortInfo()` | `sheet.Sort` 속성 | ⚠️ | `sheet.Sort` 문자열 파싱 필요 (예: `"CCC,AAA,-BBB"`) |
| `MoveColumnPos()` | `moveCol()` | ✅ | `moveCol(fromCol, toCol)` + `rerender()` |
| `MoveColumnFail()` | `onBeforeColMove` 이벤트 return | ⚠️ | 이벤트에서 `return true`로 이동 취소 |
| `SaveNameCol()` | (열 이름 기반 참조) | ✅ | col이 name으로 매핑됨 |
| `SetHeaderMode()` | 초기화시 `Def.Col` 속성 설정 | ✅ | `Def.Col: {CanResize:0, CanMove:0}` |
| `FitColWidth()` | `fitColWidth()` | ✅ | 인자가 `"10\|50\|30"` → `[10,50,30]` 배열로 변경 |
| `FitSize()` | `fitSize()` | ⚠️ | 너비만 지원, 높이 지원불가. `getCols().forEach(c=>fitSize(c))` |
| `FitSizeCol()` | `fitSize()` | ✅ | |
| `GetExtendLastCol(), SetExtendLastCol()` | 초기화시 마지막 열에 `RelWidth:1` 설정 | ✅ | `Cols: [..., {RelWidth:1}]` |

---

## 데이터 조회/로드

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `DoSearch()` | `doSearch()` | ✅ | |
| `DoSearchChild()` | `doSearch()` + `parent` 인자 | ⚠️ | `doSearch({parent:row})` + `HaveChild` 속성 조합 |
| `DoSearchPaging()` | `doSearchPaging()` | ✅ | |
| `DoRowSearch()` | (없음) | ❌ | 지원불가 |
| `LoadSearchData()` | `loadSearchData()` | ✅ | |
| `LoadSearchChildData()` | `loadSearchData()` + `parent` 인자 | ⚠️ | ★**v7 에서 deprecated 되어 매뉴얼 페이지가 삭제됐다**(2026-08-11). 그래도 고객 코드에는 남아 있으므로 변환 대상이다 — 자식 데이터를 붙일 부모 행을 v8 은 `parent` 로 지정한다. v7 3번째 인자(`Append`·`WaitDlg` 등)는 v8 옵션 이름을 확인할 것 |
| `LoadExcel()` | `loadExcel()` | ✅ | ★`plugins/ibsheet-excel.js` 로드 + **서버 모듈 설치** 필요 |
| `LoadExcelBuffer()` | `loadExcelBuffer()` | ✅ | ★`plugins/ibsheet-excel.js` 로드 + **서버 모듈 설치** 필요. `Buffer(true)` → 실제 전송 함수 호출 → `Buffer(false)` 에서 전송되는 **래퍼 구조**이므로 `true`/`false` 짝이 맞는지 확인 |
| `GetLoadExcelUrl(), SetLoadExcelUrl()` | 초기화시 `(cfg)Export:{LoadExcelUrl:""}` | ✅ | OPT Cfg.Export 속성 |
| `LoadText()` | `loadText()` | ✅ | ★`plugins/ibsheet-excel.js` 로드 + **서버 모듈 설치** 필요 |
| `GetLoadTextUrl(), SetLoadTextUrl()` | `(cfg)Export:{LoadTextUrl:""}` | ✅ | OPT Cfg.Export 속성 |
| `SetLoadExcelConfig()` | 초기화시 `(cfg)LoadExcelConfig` | ✅ | OPT Cfg 속성 |
| `SetLoadTextConfig()` | 초기화시 `(cfg)LoadTextConfig` | ✅ | OPT Cfg 속성 |
| `SearchRows()` | `getDataRows().length - getRowsByStatus("Added,Deleted,Changed").length` | ⚠️ | 직접 계산 필요 |
| `GetSearchData()` | (없음) | ❌ | 지원불가. 비동기 ajax 또는 `await fetch()`로 변경 권장 |

---

## 저장

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `DoSave()` | `doSave()` | ✅ | 파라미터 구조 변경: `doSave({Url:"abc.do", param:...})` |
| `DoAllSave()` | `doSave()` + `saveMode` 인자 | ✅ | `doSave({Url:"abc.do", saveMode:0})` |
| `GetSaveJson()` | `getSaveJson()` | ✅ | |
| `GetSaveString()` | `getSaveString()` | ✅ | |
| `GetSaveData()` | (없음) | ❌ | 지원불가. 비동기 ajax로 변경 권장 |
| `LoadSaveData()` | `applySaveResult()` | ✅ | |
| `ExportData()` | ❌ 대응 없음 | ❌ | v7 은 시트 데이터를 **`json`/`xml`/`csv` 문자열로 추출**하는 함수다(`info.Type`·`Cols`·`ColDelim`·`FormattedText`). ★**v8 에 동명 `exportData` 가 있으나 전혀 다른 기능**이다 — 그쪽은 **엑셀/텍스트 파일 다운로드**이고 `plugins/jszip.min.js` 가 필요하다. 이름이 같아 잘못 매핑하기 쉽다. 데이터 추출이 목적이면 `getDataRows()` 등으로 가져와 직접 직렬화한다 |
| `SetDown2ExcelConfig()` | 초기화시 `(Cfg)Down2ExcelConfig` | ✅ | OPT Cfg 속성 |
| `SetDown2TextConfig()` | 초기화시 `(Cfg)Down2TextConfig` | ✅ | OPT Cfg 속성 |

---

## 행 조회/선택

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `CheckAll()` | `setAllCheck()` | ✅ | `setAllCheck(getColByIndex7(5), 0, 0)` (표준 헬퍼) |
| `CheckedRows()` | `getRowsByChecked().length` | ✅ | |
| `CheckReverse()` | `setValue()` 직접 수정 | ⚠️ | `getDataRows().forEach(r=>setValue(r,col,r[col]?0:1,0))` + `renderBody()`. ★4번째 인자는 **렌더 억제**이므로 `setValue2`(4번째 = 이벤트 발생 여부)로 바꾸지 말 것 |
| `FindCheckedRow()` | `getRowsByChecked()` | ✅ | 반환값: row index 문자열 → row object 배열 |
| `FindFilterRow()` | `getRowById("Filter").Visible` | ⚠️ | IBSheet8은 Filter행 항상 존재. Visible로 존재 여부 판단 |
| `FindFooterRow()` | `getFooterRows()` | ⚠️ | FormulaRow 제외 필요: `.filter(r=>r.id!="FormulaRow")` |
| `FindStatusRow()` | `getRowsByStatus()` | ✅ | 상태값 변경: D→"Deleted", U→"Changed", I→"Added", R→"" |
| `GetRowStatus()` | `getRowStatus()` | ⚠️ | **맨 치환 금지 — 인자와 반환값이 모두 바뀐다.** ①인자: v7 **행 index** → v8 **행 객체** (브릿지 `getRowByIndex7(idx)`로 변환해 넘긴다) ②반환값: v7 `"R"`(조회)/`"U"`(수정)/`"I"`(입력)/`"D"`(삭제) → v8 `""`/`"Changed"`/`"Added"`/`"Deleted"` — **비교 리터럴을 전부 재작성**(`=="I"`→`=="Added"`, `=="R"`→`==""`) ③v8은 **상태 우선순위**가 있다: `Added` 포함 시 무조건 `Added`, 그다음 `Deleted`, 그 외 `Changed`, 없으면 `""` → 복합 상태를 세밀히 구분하던 로직은 `getRowsByStatus`로 재구성 검토 |
| `FindSubSumRow()` | `getDataRows().filter(r=>r.Name=="SubSum")` | ✅ | |
| `FindSumRow()` | `getRowById("FormulaRow")` | ⚠️ | IBSheet8은 항상 존재. Visible로 없는 경우 처리 |
| `FindText()` | `findText()` | ✅ | 반환값: 행 번호 → 행 object |
| `GetDataFirstRow()` | `getFirstRow()` | ✅ | |
| `GetDataRows()` | `sheet.MultiHeaderMap.length` | ⚠️ | 단위 데이터 행 개수 |
| `GetDataLastRow()` | `getLastRow()` | ✅ | |
| `GetSelectionCols()` | `getSelectedRanges()` | ⚠️ | 반환값이 이중배열로 변경됨 |
| `GetSelectionRows()` | `getSelectedRows()` | ✅ | 행 object 배열로 반환 |
| `GetSelectRow(), SetSelectRow()` | `getFocusedRow()`, `focus()` | ✅ | `getFocusedRow()` / `focus(getRowByIndex7(12), getFocusedCol())` (표준 헬퍼) |
| `LastRow()` | `getLastRow()` | ✅ | 반환값: 숫자 → 행 object |
| `RowCount()` | `getRowsByStatus("Deleted").length` 등 | ⚠️ | 상태별 건수: `getRowsByStatus("Deleted").length` |
| `RowDelete()` | `removeRow2()` | ✅ | **표준 헬퍼** — 삭제 전 `onRowDelete` 발생. 이벤트가 불필요하면 공식 `removeRow()` |
| `DataInsert()` | `addRow2()` | ✅ | **표준 헬퍼** `addRow2(row, lvl)` — IBSheet7 인덱스 위치를 `next`/`parent`로 변환. 인자 없으면 포커스 행 아래 추가. **공식 `addRow`에 index 인자 불가** |
| `DataCopy()` | `copyRow()` | ✅ | row 파라미터 필수 |
| `DataMove()` | `moveRow()` | ✅ | |
| `RemoveAll()` | `removeAll()` | ✅ | |
| `HeaderRows()` | `getHeaderRows().length` | ⚠️ | 반환값: 숫자 → 배열.length로 변경 |
| `GetChildRows()` | `getChildRows()` | ✅ | |
| `GetChildNodeCount()` | `getChildRows(row, level+1).length` | ⚠️ | IBSheet8 `getChildRows()`는 손자 포함. Level 지정 필요 |
| `GetFirstChildRow()` | `row객체.firstChild` | ✅ | |
| `GetLastChildRow()` | `row객체.lastChild` | ✅ | |
| `GetNextSiblingRow()` | `getNextSiblingRow()` | ✅ | |
| `GetParentRow()` | `getParentRows()` | ✅ | `getParentRows(row)[0]` (배열 반환) |
| `GetPrevSiblingRow()` | `getPrevSiblingRow()` | ✅ | |
| `IsHaveChild()` | `getAttribute(row, null, "HaveChild")` \|\| `row.firstChild` | ✅ | |
| `GetGroupCol()` | `sheet.Group` 속성 | ⚠️ | 열 구분자가 `","` 로 변경됨 |
| `GetGroupRow()` | `getGroupRows()` | ✅ | |
| `GetMergedEndCell()` | `getMergeRange()` | ✅ | 반환값: `"행,열"` → `[startRow,startCol,endRow,endCol]` 배열 |
| `GetMergedStartCell()` | `getMergeRange()` | ✅ | |
| `FilteredRowCount()` | `getDataRows().filter(r=>!r.Filtered).length` | ✅ | |
| `FilteredRowIndex()` | `getDataRows().filter(r=>!r.Filtered)` | ⚠️ | IBSheet8은 row object 배열 반환 (IBSheet7은 index 배열) |

---

## 포커스/선택

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `SelectCell()` | `focus()` | ✅ | `focus(getRowByIndex7(5), getColByIndex7(10))` (표준 헬퍼) |
| `GetSelectCol(), SetSelectCol()` | `getFocusedCol()`, `focus()` | ✅ | `getFocusedCol()` / `focus(getFocusedRow(), getColByIndex7(10))` (표준 헬퍼) |
| `GetSelectionMode(), SetSelectionMode()` | 초기화시 `(Cfg)SelectingCells` 속성 | ⚠️ | **값 반전 주의.** v7 `SetSelectionMode(0)`=셀 단위 → v8 `SelectingCells:1`, v7 `(1)`=행 단위 → v8 `SelectingCells:0`. v7 `3`(행+Ctrl 멀티)·`4`(행 전체)·`5`(머지 영역 기준+Ctrl 멀티)는 **v8 단일 속성 대응 없음** → `SelectingCells:0` + `CanSelect`/`CopyCols` 조합으로 개별 검토 |
| `SetBlur()` | `blur()` | ✅ | |
| `SetFocus()` | `focus(getFocusedRow(), getFocusedCol())` | ✅ | |
| `SetSelectRange()` | `selectRange()` | ✅ | |
| `ClearSelection()` | `clearSelection()` | ✅ | |
| `IsFocused()` | `IBSheet.Focused === mySheet` | ✅ | IBSheet 정적 객체의 Focused 속성으로 확인 |

---

## 초기화 / 설정

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `SetConfig()` | 초기화시 `Cfg` 속성 | ✅ | OPT.Cfg로 통합 |
| `InitHeaders()` | `IBSheet.create()` | ✅ | OPT.Cols[].Header 배열로 다단 헤더 설정 |
| `InitColumns()` | `IBSheet.create()` | ✅ | OPT.Cols 배열로 대체 |
| `InitComboNoMatchText()` | `setAttribute()` → `(Col)EnumStrictMode` | ✅ | Cols에 `EnumStrictMode:2` 설정 |
| `GetAutoRowHeight(), SetAutoRowHeight()` | `(cfg) AutoRowHeight` | ✅ | **이름 그대로 옮긴다**(벤더 확인 2026-08-11). ★**default 가 반대다** — v7 `1`=사용 / v8 `0`=사용 안 함이므로, v7 에서 생략했다면 v8 에 `AutoRowHeight:1` 을 명시한다. v8 제약은 `property-mapping.md` 의 `AutoRowHeight` 행 참고 |
| `GetAutoSumPosition(), SetAutoSumPosition()` | `setFormulaRowPosition()` | ✅ | `setFormulaRowPosition(0)` |
| `GetComboOpenMode(), SetComboOpenMode()` | `(Cfg)EnumOpenMode` | ✅ | IBSheet8 기본은 클릭시 오픈 |
| `GetCountFormat(), SetCountFormat()` | 초기화시 `(Cfg)InfoRowConfig.Format` | ✅ | OPT.Cfg.InfoRowConfig 설정 |
| `GetCountInfoElement(), SetCountInfoElement()` | `get/setCountInfoElement()` | ✅ | |
| `GetCountPosition(), SetCountPosition()` | 초기화시 `(Cfg)InfoRowConfig` 설정 | ✅ | `InfoRowConfig.Layout`, `InfoRowConfig.Space` |
| `GetPagingPosition(), SetPagePosition()` | 초기화시 `(Cfg)InfoRowConfig` 설정 | ✅ | `InfoRowConfig.Layout:["Paging",""]` |
| `GetPageCount(), SetPageCount()` | 초기화시 `(Cfg) PageLength` | ⚠️ | **메서드가 아니라 초기화 속성으로 옮긴다.** 첫 인자 `page` = v8 `PageLength`(default 20). ★둘째 인자 `renderPage`(`smServerPaging2` 전용 렌더 단위)는 v8 에 직접 대응이 없어 `MaxPages` 등으로 재설계할지 판단한다. 서버 페이징(`SearchMode:3,4,5`)에서는 `PageLength` 와 서버가 주는 건수를 맞춰야 한다. 이전에 "지원안함"으로 적혀 있었다 — 2026-08-04 정정 |
| `GetDataAlternateBackColor(), SetDataAlternateBackColor()` | 초기화시 `(Row)AlternateColor` | ✅ | `Def.Row.AlternateColor` + `Cfg.Alternate:2` |
| `GetDataAutoTrim(), SetDataAutoTrim()` | 초기화시 `(Cfg)DataAutoTrim` | ✅ | |
| `GetDataBackColor(), SetDataBackColor()` | 초기화시 `(Row)Color` | ✅ | `Def.Row.Color` |
| `GetDataFontColor(), SetDataFontColor()` | 초기화시 `(Row)TextColor` | ✅ | `Def.Row.TextColor` |
| `GetDataRowHeight(), SetDataRowHeight()` | 초기화시 `(Row)Height` | ✅ | `Def.Row.Height` |
| `GetEditableColorDiff(), SetEditableColorDiff()` | 초기화시 `(Cfg)ColorState` | ✅ | `Cfg.ColorState:55` |
| `GetEditEnterBehavior(), SetEditEnterBehavior()` | `(Cfg)EnterMode` | ✅ | down=5, none=0, tab=6 |
| `GetEditArrowBehavior(), SetEditArrowBehavior()` | 초기화시 `(Cfg)EditArrowBehavior` | ⚠️ | 동작방식이 많이 다름. IBSheet8은 커서가 끝에 왔을 때만 이동 |
| `GetEditTabBehavior(), SetEditTabBehavior()` | `(Cfg)EditTabMode` | ✅ | |
| `GetEditable(), SetEditable()` | `(Cfg)CanEdit` 사용 | ✅ | `mySheet.CanEdit = 0` (객체 속성 직접 접근) |
| `GetEnable(), SetEnable()` | `enable(), disable()` | ✅ | `SetEnable(0)` → `SetEnable(0)` (동일) |
| `GetFocusAfterProcess(), SetFocusAfterProcess()` | 초기화시 `(Cfg)IgnoreFocused` | ⚠️ | **★값이 반대다.** v7 `SetFocusAfterProcess(1)`=포커스 설정(default) / v8 `IgnoreFocused:1`=**설정 안 함**. 즉 `SetFocusAfterProcess(0)` → `IgnoreFocused:1`. 그대로 옮기면 조회 후 포커스 동작이 뒤집힌다 (근거: v7 `funcs/search/SetFocusAfterProcess.md` "포커스 설정 여부(Default: 1)" · v8 `props/cfg/ignore-focused.md` "`1`로 설정하면 포커스를 설정하지 않습니다"). 메서드가 아니라 **초기화 `Cfg` 로 옮긴다.** v8 에는 `2`(포커스 레이어만 표시, 방향키·Tab 이동 없음)가 더 있어 master-detail 화면에서 쓸 수 있다 |
| `GetFocusEditMode(), SetFocusEditMode()` | 초기화시 `(Cfg)InEditMode` | ✅ | |
| `GetFocusAfterRowTransaction(), SetFocusAfterRowTransaction()` | `addRow()` 함수의 focus 인자 | ✅ | `addRow({next:row, focus:0})` |
| `GetFrozenCol(), SetFrozenCol()` | `setFixedLeft()` | ✅ | `setFixedLeft(3)` |
| `GetFrozenRows(), SetFrozenRows()` | `getFixedTop(), setFixedTop()` | ⚠️ | v8 매뉴얼 기준 **`SearchMode` 0·1·2에서만** 사용 가능(3·4·5 불가)이고 **데이터행 4행 이상** 필요. `DataMerge` 적용 상태에서는 사용 불가(머지 해제 → 고정 → 재적용) |
| `GetHeaderBackColor(), SetHeaderBackColor()` | 초기화시 `Def.Header.Color` | ✅ | 또는 동적: `getHeaderRows().forEach(r=>setAttribute(r,null,"Color","#FF0000"))` |
| `GetHeaderCheck(), SetHeaderCheck()` | `get/setAttribute()` → `(Cell)Checked` | ✅ | `setAttribute(getRowById("Header"), col, "Checked", 1)` |
| `GetHeaderCursor(), SetHeaderCursor()` | `get/setAttribute()` → `(Row)Cursor` | ✅ | `setAttribute(getRowById("Header"), null, "Cursor", "pointer")` |
| `GetHeaderFontBold(), SetHeaderFontBold()` | `get/setAttribute()` → `(Row)TextStyle` | ✅ | |
| `GetHeaderFontColor(), SetHeaderFontColor()` | `get/setAttribute()` → `(Row)TextColor` | ✅ | |
| `GetHeaderRowHeight(), SetHeaderRowHeight()` | 초기화시 `(Def.Header)Height` | ✅ | |
| `GetHtmlHeaderValue(), SetHtmlHeaderValue()` | 헤더 셀 Type을 Html로 변경 후 setValue | ✅ | `setAttribute(getRowById("Header"),col,"Type","Html")` + `setValue(...)` |
| `GetHighlightAfterSort(), SetHighlightAfterSort()` | 초기화시 `(Cfg) HighlightAfterSort` | ⚠️ | **메서드가 아니라 초기화 속성으로 옮긴다.** v7 `0`(포커스 클리어)·`1`(포커스 유지+이동)·`2`(포커스 유지+스크롤 초기화)는 v8 과 같은 의미이고, v8 은 `3`(항상 첫 행 포커스)·`4`(포커스 행 위치 유지)가 추가됐다. **v8 default 는 `1`** 이라 v7 에서 `0` 을 쓰던 화면은 반드시 명시해야 한다(`props/cfg/highlight-after-sort.md`, since core 8.1.0.63). 이전에 "지원안함"으로 적혀 있었다 — 2026-08-04 정정 |
| `GetMaximumValue(), SetMaximumValue()` | `(Col)MaximumValue` | ⚠️ | 실제 API 없음. 초기화 설정 후 onEndEdit에서 직접 처리 |
| `GetMinimumValue(), SetMinimumValue()` | `(Col)MinimumValue` | ⚠️ | 실제 API 없음. 초기화 설정 후 onEndEdit에서 직접 처리 |
| `GetMouseHoverMode(), SetMouseHoverMode()` | 초기화시 `(Cfg)Hover` | ✅ | |
| `GetTabIndex()` | `(Cfg)Tabindex` | ✅ | `mySheet.TabIndex` (직접 속성 접근) |
| `SetTabIndex()` | 초기화시 `(Cfg)TabIndex` | ✅ | |
| `GetTabBehavior(), SetTabBehavior()` | 초기화시 `(Cfg)EditTabMode` | ✅ | |
| `GetDataRowMerge(), SetDataRowMerge()` | `setAutoMerge()` | ✅ | `setAutoMerge({dataMerge:4})` |
| `GetMergeSheet(), SetMergeSheet()` | `setAutoMerge()` | ✅ | |
| `SetMergeCell()` | `setMergeRange()` | ✅ | |
| `SetSplitMergeCell()` | `setAutoMergeCancel()` | ✅ | |
| `GetSelectionSummaryInfoElement(), SetSelectionSummaryInfoElement()` | `getSelectionSummaryInfoElement(), setSelectionSummaryInfoElement()` | ✅ | |
| `GetShowSortArrow(), SetShowSortArrow()` | 초기화시 `(Cfg)SortIcons` | ✅ | |
| `GetUnicodeByte(), SetUnicodeByte()` | 초기화시 `(Cfg)UnicodeByteMode` | ✅ | |
| `SetEndEdit()` | `endEdit()` | ✅ | |
| `SetClickHeaderMapping()` | 초기화시 `(cfg)SelFocusColor` | ✅ | |
| `SetClickHeaderMappingColor()` | CSS `header-Focus` class로 적용 | ✅ | |
| `GetScrollTop(), SetScrollTop()` | `getScrollTop(), setScrollTop()` | ✅ | |
| `GetScrollLeft(), SetScrollLeft()` | `getScrollLeft(), setScrollLeft()` | ✅ | |
| `GetTopRow(), SetTopRow()` | `getShownRows()[0]` / `setScrollTop(getRowTop(row))` | ✅ | `setScrollTop(getRowTop(getRowByIndex7(19)))` (표준 헬퍼) |
| `GetTotalRows(), SetTotalRows()` | `get/setTotalRowCount()` | ✅ | |
| `GetWaitTimeOut(), SetWaitTimeOut()` | 초기화시 `(Cfg)Timeout` | ✅ | |
| `GetSheetWidth(), SetSheetWidth()` | `getSheetWidth(), setSheetWidth()` | ✅ | `setSheetWidth`는 **표준 헬퍼**(숫자면 px 자동 부여). 또는 `sheet.MainTag.style.width="400px"` |
| `GetSheetHeight(), SetSheetHeight()` | `getSheetHeight(), setSheetHeight()` | ✅ | 둘 다 **표준 헬퍼**. `setSheetHeight`는 `rerender()`까지 수행하므로 크기 변경 후 재렌더 누락이 없다 |

---

## 다운로드/엑셀

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `Down2Excel()` | `down2Excel()` | ✅ | ★`plugins/ibsheet-excel.js` 로드 + **서버 모듈 설치** 필요 |
| `GetDown2ExcelUrl(), SetDown2ExcelUrl()` | 초기화시 `(Cfg)Export.Down2ExcelUrl` | ✅ | `Cfg.Export:{Down2ExcelUrl:"..."}` |
| `Down2ExcelBuffer()` | `down2ExcelBuffer()` | ✅ | ★`plugins/ibsheet-excel.js` 로드 + **서버 모듈 설치** 필요. `Buffer(true)` → 실제 전송 함수 호출 → `Buffer(false)` 에서 전송되는 **래퍼 구조**이므로 `true`/`false` 짝이 맞는지 확인 |
| `Down2Pdf()` | `down2Pdf()` | ✅ | ★`plugins/ibsheet-excel.js` 로드 + **서버 모듈 설치** 필요 |
| `GetDown2PdfUrl(), SetDown2PdfUrl()` | 초기화시 `(Cfg)Export.Down2PdfUrl` | ✅ | `Cfg.Export:{Down2PdfUrl:"..."}` |
| `Down2Text()` | `down2Text()` | ✅ | ★`plugins/ibsheet-excel.js` 로드 + **서버 모듈 설치** 필요 |
| `GetDown2TextUrl(), SetDown2TextUrl()` | 초기화시 `(Cfg)Export.Down2TextUrl` | ✅ | `Cfg.Export:{Down2TextUrl:"..."}` |
| `DirectDown2Excel()` | `directDown2Excel()` | ✅ | ★`plugins/ibsheet-excel.js` 로드 + **서버 모듈 설치** 필요 |
| `DirectLoadExcel()` | `directLoadExcel()` | ✅ | ★`plugins/ibsheet-excel.js` 로드 + **서버 모듈 설치** 필요 |
| `DoPrint()` | `doPrint()` | ✅ | |
| `GetDownloadingImage(), SetDownloadingImage()` | `IBSheet.ImageList.downloadingImage` | ✅ | 정적 객체 속성 직접 접근 |
| `GetSavingImage(), SetSavingImage()` | `IBSheet.ImageList.savingImage` | ✅ | 정적 객체 속성 직접 접근 |
| `GetSearchingImage(), SetSearchingImage()` | `IBSheet.ImageList.searchingImage` | ✅ | 정적 객체 속성 직접 접근 |
| `GetUploadingImage(), SetUploadingImage()` | `IBSheet.ImageList.uploadingImage` | ✅ | 정적 객체 속성 직접 접근 |
| `GetWaitImage(), SetWaitImage()` | `IBSheet.ImageList.waitImage` | ✅ | 정적 객체 속성 직접 접근 |
| `GetWaitImageVisible(), SetWaitImageVisible()` | `showMessage(), hideMessage()` | ✅ | `showMessage(IBSheet.ImageList.waitImage)` / `hideMessage()` |

---

## 필터

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `ClearFilterRow()` | `clearFilter()` | ✅ | |
| `HideFilterRow()` | `hideFilterRow()` | ✅ | |
| `ShowFilterRow()` | `showFilterRow()` | ✅ | |
| `SetFilterOption()` | `doFilter()` | ✅ | `doFilter("\|colName", "\|value", "\|9")` |
| `SetFilterValue()` | `doFilter()` | ✅ | `doFilter("\|colName", "\|value", "\|11")` |
| `GetFilterParam()` | (없음) | ❌ | 지원불가. `getFilter()` 함수로 직접 구현 |

---

## 소계/합계

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `ShowSubSum()` | `makeSubTotal()` | ✅ | |
| `HideSubSum()` | `removeSubTotal()` | ✅ | |
| `GetSubSumInfo()` | `getSubSumOptions()` | ✅ | |
| `GetSubSumBackColor(), SetSubSumBackColor()` | `makeSubTotal()` + `color`, `cumulateColor` 인자 | ✅ | |
| `GetCumulateBackColor(), SetCumulateBackColor()` | `makeSubTotal()` + `cumulateColor` 속성 | ⚠️ | 소계와 누계를 구별할 방법 없음 |

---

## 페이징

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `GetCurrentPage()` | `getPageIndex(getFocusedPage())` | ✅ | |
| `GoToFirstPage()` | `goToPage(getPageByRow(getFirstRow()))` | ✅ | |
| `GoToLastPage()` | `goToPage(getPageByRow(getLastRow()))` | ✅ | |
| `GoToNextPage()` | `goToNextPage()` | ✅ | |
| `GoToPageNum()` | `goToPageByIndex()` | ✅ | |
| `GoToPrevPage()` | `goToPrevPage()` | ✅ | |

---

## UI 표시

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `HideGroupRow()` | `hideGroupRow()` | ✅ | |
| `HideProcessDlg()` | `hideMessage()` | ✅ | |
| `ShowGroupRow()` | `showGroupRow()` | ✅ | |
| `ShowCalendar()` | `IBSheet.showCalendar()` | ✅ | |
| `IBCloseCalendar()` | `closeDialog()` | ⚠️ | ★**v7 에서 deprecated 되어 매뉴얼 페이지가 삭제됐다**(2026-08-11) |
| `IBShowCalendar()` | `showCalendar()` | ⚠️ | ★**v7 에서 deprecated 되어 매뉴얼 페이지가 삭제됐다**(2026-08-11). v8 은 시트 메서드 `showCalendar(row, col, …)` 이다(`funcs/core/show-calendar.md`) — 전역 함수가 아니다 |
| `ShowColumnPopup()` | `showMenu()` | ✅ | |
| `ShowFindDialog()` | `showFindDialog()` | ✅ | ★`plugins/ibsheet-dialog.js` 로드 필요 |
| `ShowFooterRow()` | 초기화시 Foot 설정 | ❌ | 지원안함 |
| `ShowPivotDialog()` | `showPivotDialog()` | ✅ | ★`plugins/ibsheet-dialog.js` 로드 필요 |
| `ShowPivotTable()` | `makePivotTable()` | ⚠️ | 호출 자체는 1:1이지만 **피벗 시트 id 규칙이 바뀐다** — v7 `원본id + "_Pivot"`(접미사) → v8 `"pivotSheet_" + 원본id`(접두사). 피벗 시트를 id로 참조하는 코드·DOM 조회를 **모두 함께 고쳐야 한다.** v8 피벗 시트는 `DataMerge` 미지원, 행 5,000·열 200 초과 시 성능 보장 안 됨 |
| `ShowProcessDlg()` | `showMessage()` | ✅ | |
| `ShowDebugMsg()` | (없음) | ❌ | 지원안함 |
| `ShowToolTip()` | `showTip()` | ✅ | |
| `GetMouseToolTipText(), SetMouseToolTipText()` | `showTip()` | ✅ | |
| `GetVisible(), SetVisible()` | `mySheet.MainTag.style.display = "none"` | ⚠️ | 전용 API 없음. DOM 직접 조작 |
| `ShowTreeLevel()` | `showTreeLevel()` | ✅ | |
| `SetPagingPosition()` | 초기화 `(cfg) InfoRowConfig.Layout` 배열 | ⚠️ | **메서드가 아니라 초기화 구조로 옮긴다.** v7 `0`=사용 안 함 → `Layout` 에서 `"Paging"` 제거 / `1`=좌측·`2`=우측 → v8 은 **배열 순서**로 정한다(default `["Paging","Count"]` = 페이징 좌·건수 우 / 우측이면 `["Count","Paging"]`). 상·하단은 `InfoRowConfig.Space`(→ `CountPosition` 항목). ★`Paging` 은 `SearchMode:1,4,5` 에서만 동작. 숫자형이 필요하면 `"Paging2"`(`Paging` 과 동시 사용 금지). 근거: v8 `props/cfg/info-row-config.md` |
| `ClearHeaderCheck()` | ❌ 같은 함수 없음 → `setAttribute` 로 헤더 셀 `Checked:0` | ⚠️ | 헤더 행 셀의 `Checked` 를 0 으로 되돌린다(데이터 값은 안 바뀐다). `Checked` 는 **cell 단위**라 열마다 지정한다 — 헤더 행에서 체크 아이콘이 있는 열만 순회: `const h = sheet.getHeaderRows().at(-1); sheet.getCols().forEach(c => { if (sheet.getAttribute(h, c, "Icon") == "Check") sheet.setAttribute(h, c, "Checked", 0); });` (근거: v8 `migration/migration-04.md`) |
| `GetBasicImeMode(), SetBasicImeMode()` | ❌ 미지원 | ❌ | 벤더 마이그레이션 표에 "지원안함"으로 명시(`migration/migration-04.md`). v7 도 **IE 전용**이라 최신 브라우저에서는 이미 효과가 없다. 한/영 제어가 필요하면 CSS `ime-mode` 가 표준에서 빠졌으므로 입력 검증(`EditMask`)으로 대체를 검토한다 |
| `GetTreeCol()` | `(cfg) MainCol` 속성 읽기 (`sheet.MainCol`) | ⚠️ | ★**반환 타입이 다르다** — v7 은 트리 기준 컬럼의 **Index**(Number), v8 `MainCol` 은 **열 이름**(string). 인덱스로 비교·연산하던 코드는 이름 기준으로 고치거나 `getColIndex()` 로 변환한다. v8 에는 `GetConfig`/`SetConfig` 가 없어 객체 속성으로 직접 접근한다. 근거: v8 `props/cfg/main-col.md` |
| `GetTreeJson()` | ❌ 계층 JSON 을 그대로 주는 함수 없음 | ❌ | ①`getSaveJson({useLevel:1})` — 행마다 Level(Depth)을 담아 주지만 **평면 배열**이다(`funcs/core/get-save-json.md`, default 1) / ②계층 그대로 필요하면 행의 `childNodes` 또는 `getChildRows(row)` 를 재귀 순회해 직접 만든다. v7 `opt.ChildPropName` 에 해당하는 옵션은 없으므로 속성명은 코드에서 정한다 |
| `ShowTreeSubSum()` | 각 컬럼의 `(Col)Formula` = `IB_Preset.*Formula` (ibsheet-common.js) | ⚠️ | **정정 — 이전에 "지원안함"으로 적었으나 지원된다.** 속성도 `Extend` 가 아니라 **`Formula`** 다(근거: v8 `props/col/formula.md` 「Tree Example」 `{Header:"합계", Type:"Int", Name:"sum", Formula: IB_Preset.TreeSumFormula}` · `migration/migration-04.md`). ★**구조가 바뀐다** — v7 은 메서드 한 번에 컬럼을 나열했고(`ShowTreeSubSum({SumCols, AvgCols, CountCols, MaxCols, MinCols})`), v8 은 **초기화에서 컬럼마다** 대응 프리셋을 지정한다: `SumCols`→`TreeSumFormula` · `AvgCols`→`TreeAvgFormula` · `CountCols`→`TreeCountFormula` · `MaxCols`→`TreeMaxFormula` · `MinCols`→`TreeMinFormula`. ★전제 조건 2개: `Def.Row.CanFormula:1` 과 트리 동작을 위한 `Cfg.MainCol`. 삭제 상태 행을 빼고 집계해야 하면 프리셋 대신 커스텀 함수를 쓴다 |
| `GetShowMsgMode(), SetShowMsgMode()` | (없음) | ❌ | 지원안함. onShowMessage 이벤트 사용 |

---

## 기타

| IBSheet7 | IBSheet8 | 지원 | 비고 |
|---|---|---|---|
| `GetAllowCheck(), SetAllowCheck()` | `onBeforeChange` 이벤트 return 값 | ⚠️ | return 1(true)로 체크/언체크 제어 |
| `AllowEvent4CheckAll()` | `(Cfg)AllCheckIgnoreEvent` / `(Col)AllCheckIgnoreEvent` | ✅ | `Cfg.AllCheckIgnoreEvent:1` |
| `GetAllowExpand(), SetAllowExpand()` | `onBeforeExpand` 이벤트 return 값 | ⚠️ | return 1(true)로 접기/펼치기 제어 |
| `ConfirmOK()` | `onShowMessage` 이벤트의 `callback` 인자 | ✅ | `evt.callback(win_result)` + `return 1` |
| `CreatePivotTable()` | `makePivotTable()` | ⚠️ | 위 `ShowPivotTable()`과 동일 — **피벗 시트 id 규칙 변경**(v7 `원본id_Pivot` → v8 `pivotSheet_원본id`)에 따라 참조처를 함께 수정. v7은 두 메서드가 나뉘어 있었으나 v8은 `makePivotTable` 하나이고, 다이얼로그 형태가 필요하면 `showPivotDialog()` — **그쪽은 `plugins/ibsheet-dialog.js` 로드 필요** |
| `ClearUnload()` | `IBSheet.disposeAll()` | ✅ | |
| `Data2Clipboard()` | (없음) | ❌ | 지원불가 |
| `DisposeSheet()` | `dispose()` | ✅ | |
| `GetDragMode(), SetDragMode()` | `(Cfg)CanDrag` | ❌ | 지원안함 |
| `GetEditable(), SetEditable()` | `(Cfg)CanEdit` | ✅ | `mySheet.CanEdit = 0` |
| `GetEllipsis(), SetEllipsis()` | `(col) ClipTextOverflow` | ⚠️ | **레벨 이동 — 시트 전체 → 컬럼별.** v7 은 모든 셀에 일괄 적용했으나 v8 `ClipTextOverflow`(col)는 **열 단위**로 말줄임표(...) 여부를 정한다. 전체에 걸려면 각 Col(또는 `Def.Col`)에 설정한다. 이전에 "지원안함"으로 적혀 있었다 — 2026-08-04 정정 |
| `GetEnterBehavior(), SetEnterBehavior()` | (없음) | ❌ | 지원안함 |
| `GetEtcData(), SetEtcData()` | `sheet.etc` (속성) | ✅ | 함수 아님. 읽기 `sheet.etc.키` / 쓰기 `sheet.etc.키 = 값`(직접 대입). 조회 응답의 `etc` 객체도 `sheet.etc`에 담김. 호출 형태를 유지해야 하면 읽기 전용 **표준 헬퍼 `getEtcData(key)`**(= `sheet.etc?.[key]`, 널 안전) 사용 가능 — **쓰기 브릿지는 없다**(직접 대입). 상세는 conventions.md |
| `EtcDataString()` | (없음) | ❌ | 지원안함 |
| `GetImageList(), SetImageList()` | (없음) | ❌ | 지원안함 |
| `GetKeyFieldImage(), SetKeyFieldImage()` | (없음) | ❌ | 지원안함. `main.css`의 `.IBRequired` 클래스 수정 |
| `GoToBaseSheet()` | `sheet.PivotSheet.switchPivotSheet(0)` | ✅ | |
| `IsDataModified()` | `hasChangedData()` | ✅ | 반환값: bool → number (0/1) |
| `GetMousePointer(), SetMousePointer()` | 행/열 `Cursor` 속성 사용 | ⚠️ | 기존에도 잘 동작하지 않는 기능 |
| `GetLeftCol(), SetLeftCol()` | `getShownCols()` | ⚠️ | SetLeftCol: 지원안함. GetLeftCol: `getShownCols(0)[0]` |
| `MouseCol()` | `getMouseCol()` | ✅ | |
| `MouseRow()` | `getMouseRow()` | ✅ | |
| `RemoveFooterRow()` | `removeRow()` | ✅ | `getFooterRows().forEach(r=>r.id!="FormulaRow"&&removeRow(r))` |
| `RenderSheet()` | (없음) | ❌ | 지원안함. 사용 방식이 많이 달라짐 |
| `RemoveEtcData()` | (없음) | ❌ | 지원안함 |
| `ReNumberSeq()` | (없음) | ❌ | 지원안함. SEQ 컬럼은 항상 순서 유지 |
| `Reset()` | `dispose()` **+ `IBSheet.create()`** | ⚠️ | **맨 치환 금지 — 두 단계다.** v7 `Reset(KeepTheme)`은 초기 상태로 되돌리고 **새 시트 객체를 반환**해 그대로 계속 쓸 수 있었다. v8 `dispose()`는 DOM·메모리에서 **완전히 제거**해 더 이상 사용할 수 없다. 공식 지침: `dispose()` 후 **같은 id로 `IBSheet.create()` 재생성**. `KeepTheme` 인자와 반환값(새 시트 객체) 사용처도 함께 재작성 |
| `ReturnCellData()` | `revertCell()` | ✅ | |
| `ReturnColumnPos()` | (없음) | ❌ | 지원안함 |
| `ReturnData()` | `revertRow()` | ✅ | |
| `GetRedrawSum(), SetRedrawSum()` | (없음) | ❌ | 지원안함 |
| `GetSendComboData(), SetSendComboData()` | (없음) | ❌ | 지원안함 |
| `GetScrollInfoFormat(), SetScrollInfoFormat()` | (없음) | ❌ | 지원안함 |
| `GetScrollInfoPosition(), SetScrollInfoPosition()` | (없음) | ❌ | 지원안함 |
| `GetShowButtonImage(), SetShowButtonImage()` | (없음) | ❌ | 지원안함 |
| `ShowPivotSumRatio()` | (없음) | ❌ | 지원안함 |
| `GetTabIndex()` | `sheet.TabIndex` 직접 접근 | ✅ | |
| `TreeChildSort()` | (없음) | ❌ | 지원안함 |
| `GetTreeActionMode(), SetTreeActionMode()` | (없음) | ❌ | 지원안함 |
| `GetTreeCheckActionMode(), SetTreeCheckActionMode()` | 초기화시 `(Cfg)TreeCheckSync` | ✅ | 기본적으로 관계모드로 동작 |
| `GetTreeCheckEditable(), SetTreeCheckEditable()` | (없음) | ❌ | 지원안함 |
| `GetTreeCheckRowEditable(), SetTreeCheckRowEditable()` | (없음) | ❌ | 지원안함 |
| `GetTreeCheckValue(), SetTreeCheckValue()` | `get/setAttribute()` → `(Cell)Checked` | ✅ | `getAttribute(row, mainCol, "Checked")` |
| `GetUseDefaultTime(), SetUseDefaultTime()` | 초기화시 `(cfg) UseDefaultTime` | ⚠️ | **메서드 → 초기화 속성으로 이동.** v7·v8 모두 "`Type:Date` 이고 Format 이 시간 단위(`h`/`m`/`s`)인 빈 셀의 편집 시작 시 현재 시각을 기본값으로 채울지" 를 정한다. 이전에 "지원안함"으로 적혀 있었다 — 2026-08-04 정정 |
| `GetUserAgent(), SetUserAgent()` | ajax/doSearch/doSave의 `reqHeader` 속성 | ❌ | 지원안함 |
| `ValidateFail()` | `onBeforeSave` 이벤트 return 값 | ✅ | 이벤트에서 `return true`로 저장 중단 |
| `Version()` | `version()` | ✅ | |
| `GetCurrentColInfo(), SetCurrentColInfo()` | **`getCurrentInfo(), setCurrentInfo()`** | ⚠️ | 이름에서 **`Col` 이 빠진다.** 벤더 부록은 `get/setCurrentColInfo` 로 적고 있으나 **그런 함수는 없다**(실제 페이지 `funcs/core/get-current-info.md`·`set-current-info.md`). 시그니처는 호환 — `getCurrentInfo()` 인자 없음→문자열, `setCurrentInfo(info)` 문자열→**boolean 반환 추가**. ⚠️ **저장해둔 v7 문자열을 v8 에 그대로 넣으면 복원되지 않을 수 있다** — 문자열 포맷이 v7·v8 동일한지 미확인이고, v8 은 컬럼 `Name` 목록이 다르면 "입력한 시트 정보가 올바르지 않습니다" 경고와 함께 실패한다. 서버/로컬에 저장된 레이아웃이 있으면 **마이그레이션 후 재저장**을 계획할 것 |
| `GetComboInfo()` | `getAttribute()` → `Enum`, `EnumKeys` | ✅ | `getAttribute(row, col, "Enum")` / `"EnumKeys"` |
| `GetColMaxValue()` | (없음) | ❌ | 지원안함. `getDataRows().reduce()` 직접 구현 |
| `GetColMinValue()` | (없음) | ❌ | 지원안함. `getDataRows().reduce()` 직접 구현 |
| `GetEditText()` | `getEditText()` | ✅ | |
| `SetEndEdit()` | `endEdit()` | ✅ | |
| `GetSheetHtml()` | (없음) | ❌ | 지원안함 |
| `GetSubSumInfo()` | `getSubSumOptions()` | ✅ | |
| `BasicImeMode` | (없음) | 🚫 | 사용하지 않는 기능 |
| `GetClipCopyMode(), SetClipCopyMode()` | (없음) | ❌ | 지원불가 |
| `GetClipPasteMode(), SetClipPasteMode()` | (없음) | ❌ | 지원불가 |
| `ComputeSum()` | `computeSum()` | ✅ | **표준 헬퍼** `computeSum(col, startRow, endRow, isFullSum)` — 공식 API에는 없음. 범위 인자는 IBSheet7 인덱스·행객체 모두 허용, 기본값은 첫/마지막 데이터행. `Int`/`Float` 컬럼만. `isFullSum` 미지정 시 `SubSum` 행 제외 |
| `GetDataLinkMouse(), SetDataLinkMouse()` | `setAttribute()` → `(Col)Cursor` | ✅ | `setAttribute(null, col, "Cursor", "pointer")` |
| `SetCellImageStyle()` | `setValue()` + `setAttribute()` | ✅ | `setValue(row,col,"\|img.gif\|\|20")` + `setAttribute(row,col,"Align","left")` |

---

## 행 상태값 변환표

| IBSheet7 상태 | IBSheet8 상태 | 의미 |
|---|---|---|
| `"I"` | `"Added"` | 신규 입력 |
| `"U"` | `"Changed"` | 수정 |
| `"D"` | `"Deleted"` | 삭제 |
| `"R"` | `""` (빈 문자열) | 변경 없음 |

---

## 주요 API 반환값 변경 주의사항

| 메서드 | IBSheet7 반환 | IBSheet8 반환 | 영향 |
|---|---|---|---|
| `LastRow()` → `getLastRow()` | 행 index (숫자) | 행 object | 숫자 비교 불가 |
| `LastCol()` → `getLastCol()` | 열 index (숫자) | 열 이름 (문자열) | `for(j=0;j<=LastCol;j++)` 불가 |
| `HeaderRows()` → `getHeaderRows().length` | 숫자 | 배열.length | for 루프 재작성 |
| `RowCount()` → `getDataRows().length` 등 | 숫자 | 방식 변경 | for 루프 재작성 |
| `ColSaveName(j)` → `getColByIndex7(j)` | SaveName 문자열 | 열 이름 문자열 | 표준 헬퍼(includeHideCol+SEQ 보정 내장) |
| `FindCheckedRow()` → `getRowsByChecked()` | `"1\|2\|5"` 문자열 | row object 배열 | 인덱스 접근 방식 변경 |
| `GetParentRow()` → `getParentRows()` | 행 index | row object 배열 | `[0]` 접근 필요 |

---

## 추가 메서드 대응

위 대조표에 없던 항목이다.

> 아래 표의 타깃 이름은 **IBSheet8 매뉴얼 개별 페이지로 검증**했다.
> `✅` = 매뉴얼에 해당 속성/함수/이벤트가 존재함 확인 · `⚠️` = 매뉴얼에서 확인되지 않음(적용 전 검증 필요)
> `❌` = 대응 없음. **`⚠️`는 그대로 쓰지 말고 매뉴얼·실제 동작으로 확인한 뒤 적용한다.**
> 값 정의·레벨까지 검증한 것은 아니므로, 위쪽 본 대조표의 항목보다 신뢰도가 낮다.

| IBSheet7 | IBSheet8 | 검증 | 비고 |
|---|---|---|---|
| `SetDataMerge()` | `setAutoMerge()` | ✅ |  |
| `GetTheme(),SetTheme()` | `setTheme(prefix, csspath, render)` | ⚠️ | **둘째 인자의 의미가 바뀐다** — v7 은 테마 **폴더명**, v8 은 **css 파일 경로**다. v8 은 셋째 인자 `render`(즉시 반영, default `1`)가 추가되며 `0` 이면 `rerender()` 를 따로 불러야 한다. `prefix` 는 css 클래스 접두어로 동일 개념(v8 default `"IB"`). 이전 표기:  //현재 설정된 Theme를 확인  var theme = mySheet.GetTheme() / //현재 설정된 Theme를 확인  var theme = mySheet.Style |

---

## ★ 메서드 **인자 객체의 옵션 키**는 camelCase 다 (Breaking)

IBSheet8 은 **초기화 속성은 PascalCase**(`Header`·`Width`·`Cfg`)인데
**메서드 옵션 키는 camelCase**(`fileName`·`downCols`)로 서로 다른 규칙을 쓴다.
IBSheet7 은 옵션도 PascalCase 였다.

```javascript
// IBSheet7
mySheet.Down2Excel({FileName:"a.xlsx", SheetName:"실적", DownCols:"1|2", DownSum:0});

// IBSheet8 — 메서드 이름만 바꾸면 옵션이 전부 무시된다
mySheet.down2Excel({fileName:"a.xlsx", sheetName:"실적", downCols:"1|2", downSum:0});
```

> **메서드 이름만 바꾸고 인자 객체를 그대로 두면 v8 이 옵션을 전부 무시한다.**
> 오류가 나지 않는다 — 파일명·시트명·디자인·병합·합계가 조용히 사라진다.
> 고객 화면 542개를 전수 조사해 찾았다(2026-08-06).

엔진은 **호출의 인자 객체 범위 안에서만** 자동으로 바꾼다. `Sort`·`Mode`·`Col`·`Param` 처럼
초기화 속성과 이름이 겹치는 옵션이 있어 범위를 벗어나면 초기화가 깨지기 때문이다.
인자가 변수면(`var p={...}; sheet.down2Excel(p)`) 바꾸지 않고 `OPTION_KEYS_INDIRECT` 로 넘긴다
— **그 경우는 직접 고쳐야 한다.**

표 원본은 `engine/rules/migrate_rules.json` 의 `method_option_keys` 다.

| 메서드 | 옵션 키 개수 | 예 |
|---|---|---|
| `down2Excel()` | 35 | `AllTypeToText`→`allTypeToText`, `AppendPrevSheet`→`appendPrevSheet`, `CheckBoxOffValue`→`checkBoxOffValue` |
| `directDown2Excel()` | 20 | `ComboValidation`→`comboValidation`, `DownCols`→`downCols`, `DownCombo`→`downCombo` |
| `loadExcel()` | 13 | `Append`→`append`, `ColumnMapping`→`columnMapping`, `EndRow`→`endRow` |
| `down2Pdf()` | 12 | `DownCols`→`downCols`, `Dpi`→`dpi`, `ExtendParam`→`extendParam` |
| `down2Text()` | 11 | `ColDelim`→`colDelim`, `DownCols`→`downCols`, `DownHeader`→`downHeader` |
| `directLoadExcel()` | 9 | `EndRow`→`endRow`, `ExtendParam`→`extendParam`, `FileExt`→`fileExt` |
| `doSave()` | 8 | `Col`→`col`, `Delim`→`delim`, `Param`→`param` |
| `makeSubTotal()` | 8 | `AvgCols`→`avgCols`, `CaptionCol`→`captionCol`, `Mode`→`mode` |
| `doSearchPaging()` | 7 | `CPage`→`cPage`, `OrderbyParam`→`orderByParam`, `PageParam`→`pageParam` |
| `loadText()` | 7 | `Append`→`append`, `ColSeparator`→`colSeparator`, `Encoding`→`encoding` |
| `doSearch()` | 5 | `Append`→`append`, `CallBack`→`callback`, `Param`→`param` |
| `getSaveString()` | 4 | `Col`→`col`, `Delim`→`delim`, `Prefix`→`prefix` |
| `loadSearchData()` | 3 | `Append`→`append`, `CallBack`→`callback`, `Sync`→`sync` |
| `showMenu()` | 1 | `Row`→`row` |

**`down2Excel()` 전체 표**

| IBSheet7 | IBSheet8 | IBSheet7 | IBSheet8 |
|---|---|---|---|
| `AllTypeToText` | `allTypeToText` | `AppendPrevSheet` | `appendPrevSheet` |
| `CheckBoxOffValue` | `checkBoxOffValue` | `CheckBoxOnValue` | `checkBoxOnValue` |
| `ComboValidation` | `comboValidation` | `DownCols` | `downCols` |
| `DownCombo` | `downCombo` | `DownHeader` | `downHeader` |
| `DownRows` | `downRows` | `DownSum` | `downSum` |
| `DownTreeHide` | `downTreeHide` | `ExcelFontFamily` | `excelFontFamily` |
| `ExcelFontSize` | `excelFontSize` | `ExcelHeaderRowHeight` | `excelHeaderRowHeight` |
| `ExcelRowHeight` | `excelRowHeight` | `ExcludeFooterRow` | `excludeFooterRow` |
| `ExtendParam` | `extendParam` | `ExtendParamMethod` | `extendParamMethod` |
| `FileName` | `fileName` | `FreezePane` | `freezePane` |
| `HiddenColumn` | `hiddenColumn` | `Merge` | `merge` |
| `NumberExMode` | `numberExMode` | `NumberFormatMode` | `numberFormatMode` |
| `NumberTypeToText` | `numberTypeToText` | `OnlyHeaderMerge` | `onlyHeaderMerge` |
| `ReqHeader` | `reqHeader` | `SheetDesign` | `sheetDesign` |
| `SheetName` | `sheetName` | `TextToGeneral` | `textToGeneral` |
| `TitleAlign` | `titleAlign` | `TitleText` | `titleText` |
| `UseXhr` | `useXhr` | `UserMerge` | `userMerge` |
| `WordWrap` | `wordWrap` |  |  |

### v8 이 **지원하지 않는** 옵션 — 벤더 확인 (2026-08-06)

아래 옵션은 이름을 바꿔도 대응이 없다. 엔진이 `OPTION_UNSUPPORTED` 로 알리고 **고치지 않는다.**

| v7 옵션 | 메서드 | v8 |
|---|---|---|
| `AutoSizeColumn` | `down2Excel` · `directDown2Excel` | 미지원. 너비를 맞춰야 하면 다운로드 전에 시트 열 너비를 정하거나 `downCols` 로 열을 고른다 |
| `PrintSetup` (+ 하위 용지·여백·인쇄방향·흑백인쇄) | `down2Excel` | **클라이언트 옵션으로는 미지원.** 대신 **서버 모듈에서 설정한다** — v8 매뉴얼 `appx/excel-server-troubleshooting.md` 의 `[ 사용자 환경 설정 #18 ]` 에 `ExcelPrintSetup` 예제가 있다(`setColorPrint`·용지 사이즈 등). ★서버 모듈을 쓰지 않는 구성(`Cfg.AutoExcelMode:2`)이면 인쇄 설정을 만들 수 없다 |
| `ReportXMLURL` | `down2Excel` · `directDown2Excel` | 미지원 |
| `URL` | `down2Excel` | 미지원. v8 은 초기화 `Cfg.Export.Down2ExcelUrl` 로 지정한다 |
| `ExcludeSubSum` | `down2Excel` | 미지원. 소계행을 빼려면 `downRows` 로 대상 행을 직접 지정한다 |
| `Mode` | `down2Excel` · `directDown2Excel` | 미지원. ★`Mode:-1` 의 목적(Status·DelCheck·Result 타입과 숨은 열 제외)은 **v8 에 그 타입들이 없어서** 사라진다 — 숨은 열만 빼려면 `downCols` 로 지정 |
| `Multipart` | `down2Excel` | 미지원. 벤더 설명: 데이터가 많을 때 multipart 로 보내면 **잘릴 수 있어** v8 은 이 선택지를 두지 않았다 |

> **`Type:"Status"`·`"DelCheck"`·`"Result"` 타입도 v8 에는 없다**(벤더 확인). 앞의 둘은
> `Extend:IB_Preset.STATUS`·`IB_Preset.DelCheck` 로 대체하고(`plugins/ibsheet-common.js` 필요),
> `Result` 는 대응 프리셋조차 없어 일반 `Text` 열로 두고 저장 응답을 직접 반영해야 한다.

### 옵션 **이름이 바뀐** 메서드 — 자동 변환하지 않는다

아래는 대소문자 문제가 아니라 이름·구조가 달라져 판단이 필요하다. 규칙 ID 로 보고된다.

| 메서드 | 규칙 ID | 핵심 |
|---|---|---|
| `getSaveJson()` | `GETSAVEJSON_OPTIONS` | `AllSave`→`saveMode` · `StdCol`→`col` · `ValidKeyField`→`validRequired` · `ValidEditLen`→`validSize`. `ValidMinLen`·`ValidFullInput`·`StdColValue`·`AllTypeToText` 는 대응 없음 |
| `getSaveString()` | `GETSAVESTRING_OPTIONS` | `AllSave`→`saveMode` · `Mode`→`queryMode` · 나머지는 위와 같음 |
| `doSave()` | `DOSAVE_OPTIONS` | `Mode`→`queryMode` · `CallBack`→`questCallback`(용도 확인) · 저장 범위는 `saveMode` |
| `doSearch()` | `DOSEARCH_OPTIONS` | **인자 구조가 바뀐다.** v7 `(PageUrl, Param, Opt)` → v8 옵션 객체 하나(`url`·`param`·`method`) |
| `loadSearchData()` | `LOADSEARCHDATA_OPTIONS` | `Content`→`data` · `AppendRow`→`next` · `Event`→`ignoreEvent`(**의미 반대**) |
| `applySaveResult()` | `APPLYSAVERESULT_OPTIONS` | `Content`→`data` · `Event`→`ignoreEvent`(**의미 반대**) |
| `makePivotTable()` | `MAKEPIVOTTABLE_OPTIONS` | `Cols`·`Rows`·`Value` → `criterias`(`row`·`col`·`data`) 구조로 재작성 |
| `makeSubTotal()` | `MAKESUBTOTAL_OPTIONS` | 대소문자 외에 `CaptionText`·`CntCol`·`OtherColText` 가 v8 에 없다 |
| `moveRow()` | `MOVEROW_OPTIONS` | v7 은 행 **인덱스**, v8 은 행 **객체**. `RowLevel` 대응 없음 |

