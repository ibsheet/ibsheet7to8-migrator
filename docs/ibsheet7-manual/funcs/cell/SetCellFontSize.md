# SetCellFontSize ***(cell method)***

> 대상 셀의 폰트 사이즈를 설정 합니다.

### Syntax
```javascript
ObjId.SetCellFontSize(Row, Col, FontSize);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|FontSize|`Integer`|<span class="required">필수</span>|설정하고자 하는 글자크기`(px)`|

### Returns
***none***

### Example
```javascript
// (2, 3) 셀의 폰트 사이즈를 15px로 설정
mySheet.SetCellFontSize(2, 3, 15);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||