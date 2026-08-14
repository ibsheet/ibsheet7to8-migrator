# SetCellFontStrike ***(cell method)***

> 대상 셀의 폰트에 strike 적용 여부를 설정 합니다.

### Syntax
```javascript
ObjId.SetCellFontStrike(Row, Col, FontStrike);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|FontStrike|`Boolean`|<span class="required">필수</span>|취소선 설정 여부|

### Returns
***none***

### Example
```javascript
// (2, 3) 셀의 폰트에 strike 적용
mySheet.SetCellFontStrike(2, 3, 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||