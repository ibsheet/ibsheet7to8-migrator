# OnClick ***(event)***

> 데이터 영역의 셀을 마우스로 클릭했을 때 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_OnClick(Row, Col, Value, CellX, CellY, CellW, CellH, rowType) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
Row|`Long`|해당 셀의 Row Index|
Col|`Long`|해당 셀의 Column Index|
Value|`String`|이벤트가 발생한 셀의 값|
CellX|`Long`|해당셀의 X좌표|
CellY|`Long`|해당셀의 Y좌표|
CellW|`Long`|해당셀의 가로 넓이값|
CellH|`Long`|해당셀의 세로 높이값|
rowType|`String`|해당 Row의 타입(HeaderRow, SubSumRow, SumRow, DataRow, CumulateRow)|



### Example
```javascript
//특정 열을 클릭했을 때 다른 페이지로 이동하도록 처리
function mySheet_OnClick(row, col, value, cellX, cellY, cellW, cellH) {
  if (mySheet.ColSaveName(col) == "LINK_BUFF") {
      location.href = "link.jsp?key=" + mySheet.GetCellValue(row,"KFELD");
  }
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||