# OnDragStart ***(event)***

> 행 또는 셀 단위 Drag를 시작할 때 이벤트가 발생 합니다.


### Syntax
```javascript
function 오브젝트ID_OnDragStart(Row, Col) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|Drag 위치의 Row Index|
|Col|`Long`|Drag 위치의 Column Index|



### Example
```javascript
var dragValue = "";
function mySheet_OnDragStart(Row, Col) {
  // Drag 시작위치의 CellValue를 저장
  dragValue = mySheet.GetCellValue(Row, Col) ;
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||