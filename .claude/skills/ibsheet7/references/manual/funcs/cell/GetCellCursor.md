# GetCellCursor ***(cell method)***

> 대상 셀의 마우스 오버시 커서 모양을 확인합니다.

### Syntax
```javascript
ObjId.GetCellCursor(Row, Col)
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|

### Returns
***String***

### Example
```javascript
// (2, 3) 셀의 마우스 커서포인터를 확인
mySheet.GetCellCursor(2, 3);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||