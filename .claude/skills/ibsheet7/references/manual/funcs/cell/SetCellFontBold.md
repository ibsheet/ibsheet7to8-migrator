# SetCellFontBold ***(cell method)***

> 대상 셀의 폰트에 bold 적용 여부를 설정 합니다.

### Syntax
```javascript
ObjId.SetCellFontBold(Row, Col, Bold);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Bold|`Boolean`|<span class="required">필수</span>|Bold 여부|

### Returns
***none***

### Example
```javascript
// (2, 3) 셀의 폰트에 bold 적용
mySheet.SetCellFontBold(2, 3, 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||