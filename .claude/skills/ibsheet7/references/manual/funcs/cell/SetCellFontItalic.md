# SetCellFontItalic ***(cell method)***

> 대상 셀의 폰트에 italic 적용 여부를 설정 합니다.

### Syntax
```javascript
ObjId.SetCellFontItalic(Row, Col, Italic);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Italic|`Boolean`|<span class="required">필수</span>|이탤릭 여부|

### Returns
***none***

### Example
```javascript
// (2, 3) 셀의 폰트에 italic 적용
mySheet.SetCellFontItalic(2, 3, 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||