# CellSaveName ***(cell method)***

> Row, Col 인자의 데이터 셀에 대한 SaveName을 확인 합니다.

### Syntax
```javascript
ObjId.CellSaveName(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long`|<span class="required">필수</span>|해당 셀의 Column Index|

### Returns
***String, 해당 셀의 SaveName***

### Example
```javascript
function mySheet_OnClick(Row, Col, Value, CellX, CellY, CellW, CellH) {
  // 클릭한 셀의 SaveName을 확인
  var saveName = mySheet.CellSaveName(Row, Col);
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||