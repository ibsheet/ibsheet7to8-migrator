# SetCellFontName ***(cell method)***

> 대상 셀의 폰트 글꼴을 설정 합니다.

### Syntax
```javascript
ObjId.SetCellFontName(Row, Col, FontName);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|FontName|`String`|<span class="required">필수</span>|글자체|

### Returns
***none***

### Example
```javascript
// (2, 3) 셀의 폰트 글꼴을 굴림으로 설정
mySheet.SetCellFontName(2, 3, 'Gulim');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||