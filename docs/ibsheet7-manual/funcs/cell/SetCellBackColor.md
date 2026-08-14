# SetCellBackColor ***(cell method)***

> 대상 셀에 배경색을 설정 합니다.

### Syntax
```javascript
ObjId.SetCellBackColor(Row, Col, Color);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Color|`String`|<span class="required">필수</span>|색상 값|

### Returns
***none***

### Example
```javascript
// (2, 3) 셀의 배경색을 'red'로 설정
mySheet.SetCellBackColor(2, 3, 'red');
mySheet.SetCellBackColor(2, 3, '#ff0000');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||