# 자주 사용되는 메소드 ***(appendix)***

### 1. Data Read / Write

|Return Type|Method Name|Description|
|-----|------|----------------------|
|String|CellValue ([GetCellValue](/docs/funcs/cell/GetCellValue) / [SetCellValue](/docs/funcs/cell/SetCellValue))|셀 데이터 Read/Write|
|String|CellText ([GetCellText](/docs/funcs/cell/GetCellText) / [SetCellText](/docs/funcs/cell/SetCellText))|셀 데이터 Read/Write|
|JSON Object|RowData ([GetRowData](/docs/funcs/row/GetRowData) / [SetRowData](/docs/funcs/row/SetRowData))|행 데이터 Read/Write|
|Query String|[RowSaveStr](/docs/funcs/save/RowSaveStr)<br>[LoadSearchData](/docs/funcs/search/LoadSearchData)<br>[LoadSaveData](/docs/funcs/save/LoadSaveData)|행 데이터 Read<br>조회 데이터 XML/JSON  Write<br>저장 데이터 XML/JSON  Write|
|String|[GetEditText](/docs/funcs/core/GetEditText)|편집중인 셀의 데이터 Read|
|String|SumValue ([GetSumValue](/docs/funcs/sum/GetSumValue) / [SetSumValue](/docs/funcs/sum/SetSumValue))|합계행 안에 셀 데이터 Read/Write|
|JSON Object|[GetSaveJson](/docs/funcs/save/GetSaveJson)|시트 전체 데이터 Read|
|Query String|[GetSaveString](/docs/funcs/save/GetSaveString)|시트 전체 데이터 Read|
|Object|[GetSheetHtml](/docs/funcs/core/GetSheetHtml)|시트 전체 데이터를 HTML양식으로 Read|

### 2. 최초 조회된 값 확인 / 변경

|Return Type|Method Name|Description|
|-----|------|----------------------|
|none|[ReturnData](/docs/funcs/row/ReturnData)|행을 최초 조회했던 값으로 변경|
|none|[ReturnCellData](/docs/funcs/cell/ReturnCellData)|셀을 최초 조회했던 값으로 변경|
|String|[CellSearchValue](/docs/funcs/cell/CellSearchValue)|셀에 대한 조회 데이터 확인|

## 3. 행 / 열 인덱스

|Return Type|Method Name|Description|
|-----|------|----------------------|
|Int|[LastRow](/docs/funcs/row/LastRow)|마지막 행의 Index|
|Int|[LastCol](/docs/funcs/col/LastCol)|마지막 열의 인덱스|
|Int|[HeaderRows](/docs/funcs/core/HeaderRows)|첫번째 데이터 행의 인덱스|
|Int|[SearchRows](/docs/funcs/core/SearchRows)|조회한 데이터 행수 (상태가 R인 데이터 행 수)|
|Int|TopRow ([GetTopRow](/docs/funcs/row/GetTopRow) / [SetTopRow](/docs/funcs/row/SetTopRow))|현재 화면에 보여지는 행중 최 상단의 행 인덱스|
|Int|LeftCol ([GetLeftCol](/docs/funcs/col/GetLeftCol) / [SetLeftCol](/docs/funcs/col/SetLeftCol))|현재 화면에 보여지는 열중에 최 좌측의 열 인덱스|
|Int|SelectRow ([GetSelectRow](/docs/funcs/core/GetSelectRow) / [SetSelectRow](/docs/funcs/core/SetSelectRow))|현재 선택된(포커스 된) 행의 인덱스|
|Int|SelectCol ([GetSelectCol](/docs/funcs/core/GetSelectCol) / [SetSelectCol](/docs/funcs/core/SetSelectCol))|현재 선택된(포커스 된) 열의 인덱스|
|Int|[SelectCell](/docs/funcs/core/SelectCell)|특정 셀로 포커스 이동|
|Int or String|[FindSumRow](/docs/funcs/sum/FindSumRow)|합계행의 인덱스|

## 4. 찾기 기능

|Return Type|Method Name|Description|
|-----|------|----------------------|
|Int|[FindText](/docs/funcs/row/FindText)|열에서 특정 String문자 찾기
|String|[FindSubSumRow](/docs/funcs/sum/FindSubSumRow)|여러개의 소계행 인덱스 찾기|
|String|[FindCheckedRow](/docs/funcs/row/FindCheckedRow)|체크박스 컬럼에 체크된 행 찾기|
|String|[FindStatusRow](/docs/funcs/row/FindStatusRow)|특정 상태를 갖는 모든 행 찾기|
|String|[GetSelectionRows](/docs/funcs/core/GetSelectionRows)|마우스로 드레그 하여 선택한 영역 행 인덱스|
|String|[GetSelectionCols](/docs/funcs/core/GetSelectionCols)|마우스로 드레그 하여 선택한 영역 열 인덱스|

## 5. Tree 기능 관련 함수

|Return Type|Method Name|Description|
|-----|------|----------------------|
|Int|RowLevel ([GetRowLevel](/docs/funcs/tree/GetRowLevel) / [SetRowLevel](/docs/funcs/tree/SetRowLevel))|노드의 Level(depth) Read/Write|
|Boolean|[IsHaveChild](/docs/funcs/tree/IsHaveChild)|자식노드 존재 여부 확인|
|Int|[GetPrevSiblingRow](/docs/funcs/tree/GetPrevSiblingRow)|자신과 같은 Level의 상위 행 인덱스|
|Int|[GetNextSiblingRow](/docs/funcs/tree/GetNextSiblingRow)|자신과 같은 Level의 하위 행 인덱스|
|Int|[GetParentRow](/docs/funcs/tree/GetParentRow)|부모 행 인덱스|
|String|[GetChildRows](/docs/funcs/tree/GetChildRows)|자식 행 전체 인덱스|
|Int|[GetLastChildRow](/docs/funcs/tree/GetLastChildRow)|마지막 자식 행 인덱스|
|Int|[GetChildNodeCount](/docs/funcs/tree/GetChildNodeCount)|자식행 개수|
|Int|[ShowTreeLevel](/docs/funcs/tree/ShowTreeLevel)|특정 Level까지 접거나 펼침|

## 6. File import / export

|Return Type|Method Name|Description|
|-----|------|----------------------|
|none|[Down2Excel](/docs/funcs/export/Down2Excel)|시트의 데이터를 엑셀파일로 export|
|none|[Down2Text](/docs/funcs/export/Down2Text)|시트의 데이터를 text 파일로 export|
|none|[Down2Pdf](/docs/funcs/export/Down2Pdf)|시트의 데이터를 PDF파일로 export|
|none|[DirectDown2Excel](/docs/funcs/export/DirectDown2Excel)|시트의 헤더정보와 디비의 데이터 정보를 합쳐 엑셀파일로 export|
|none|[LoadExcel](/docs/funcs/import/LoadExcel)|엑셀 파일을 시트위로 import|
|none|[LoadText](/docs/funcs/import/LoadText)|text 파일을 시트위로 import|
|none|[DirectLoadExcel](/docs/funcs/import/DirectLoadExcel)|	엑셀 파일을 디비로 바로 저장|
|none|[Down2ExcelBuffer](/docs/funcs/export/Down2ExcelBuffer)|두개 이상의 시트를 하나의 엑셀파일로 export|
|none|[SetDown2ExcelConfig](/docs/funcs/export/SetDown2ExcelConfig)|엑셀 export시 공통 설정|
|none|[OnDownFinish](/docs/event/OnDownFinish)|다운로드 완료 후 이벤트|
|none|[OnBeforeDownload](/docs/event/OnBeforeDownload)|서버로 데이터 전달 직전 이벤트|
|none|[OnLoadExcel](/docs/event/OnLoadExcel)|엑셀 파일 업로드 이후 이벤트|

## 7. 건수정보 표시 줄 관련

|Return Type|Method Name|Description|
|-----|------|----------------------|
|none|CountPosition ([GetCountPosition](/docs/funcs/core/GetCountPosition) / [SetCountPosition](/docs/funcs/core/SetCountPosition))|건수표시 위치 설정|
|none|CountFormat ([GetCountFormat](/docs/funcs/core/GetCountFormat) / [SetCountFormat](/docs/funcs/core/SetCountFormat))|건수표시 포멧 설정|
|none|CountInfoElement ([GetCountInfoElement](/docs/funcs/core/GetCountInfoElement) / [SetCountInfoElement](/docs/funcs/core/SetCountInfoElement))|건수표시를 외부 객체에 설정/확인|
|none|SelectionSummaryInfoElement ([GetSelectionSummaryInfoElement](/docs/funcs/core/GetSelectionSummaryInfoElement) / [SetSelectionSummaryInfoElement](/docs/funcs/core/SetSelectionSummaryInfoElement))|Summary정보를 외부 객체에 설정/확인|
|none|SelectionSummary ([SetConfig](/docs/funcs/init/SetConfig) 내 속성)|드레그 영역에 대한 Summary정보 표시|
|none|PagingPosition ([GetPagingPosition](/docs/funcs/core/GetPagingPosition) / [SetPagingPosition](/docs/funcs/core/SetPagingPosition))|페이지 네비게이션 버튼 표시|

## 8. Tab, Enter 입력시 동작 결정

|Return Type|Method Name|Description|
|-----|------|----------------------|
|none|TabBehavior ([GetTabBehavior](/docs/funcs/core/GetTabBehavior) / [SetTabBehavior](/docs/funcs/core/SetTabBehavior))|포커스 상태에서 Tab키 다운시 동작방식 결정|
|none|EnterBehavior ([GetEnterBehavior](/docs/funcs/core/GetEnterBehavior) / [SetEnterBehavior](/docs/funcs/core/SetEnterBehavior))|포커스 상태에서 Enter키 다운시 동작방식 결정|
|none|EditTabBehavior ([GetEditTabBehavior](/docs/funcs/core/GetEditTabBehavior) / [SetEditTabBehavior](/docs/funcs/core/SetEditTabBehavior))|편집 중 Tab키 다운시 동작방식 결정|
|none|EditEnterBehavior ([GetEditEnterBehavior](/docs/funcs/core/GetEditEnterBehavior) / [SetEditEnterBehavior](/docs/funcs/core/SetEditEnterBehavior))|편집 중 Enter키 다운시 동작방식 결정|
|none|[OnTab](/docs/event/OnTab)|Tab키를 통해 이동시 발생하는 이벤트|

## 9. 기타 자주 사용되는 메소드

* [RemoveAll](/docs/funcs/core/RemoveAll) : 조회 데이터 전체 삭제
* [Reset](/docs/funcs/core/Reset) : 시트 객체 초기화
* [IsDataModified](/docs/funcs/core/IsDataModified) : 시트의 수정 여부 확인
* [ColSaveName](/docs/funcs/col/ColSaveName) : 열의 인덱스를 기준으로 SaveName을 확인
* [SaveNameCol](/docs/funcs/col/SaveNameCol) : 열의 SaveName을 기준으로 인덱스를 확인
* [SetRowHidden](/docs/funcs/row/SetRowHidden) : 행 보이기/감추기
* [SetColHidden](/docs/funcs/col/SetColHidden) : 열 보이기/감추기