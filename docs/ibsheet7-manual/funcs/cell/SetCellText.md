# SetCellText ***(cell method)***

> 대상 셀에 값을 설정 합니다.<br>
> SetCellValue와 달리 포맷이 적용된 형태의 문자열을 설정 할 수 있습니다.

### Syntax
```javascript
ObjId.SetCellText(Row, Col, Text);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Text|`String`|<span class="required">필수</span>|셀에 설정할 값|

### Returns
***none***

### Example
```javascript
// (2, 3) 셀에 'ibleaders' 문자열 설정
mySheet.SetCellText(2, 3, 'ibleaders');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||