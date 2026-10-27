# GetCellFontName ***(cell method)***

> 대상 셀의 폰트 글꼴을 확인 합니다.

### Syntax
```javascript
ObjId.GetCellFontName(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|


### Returns
***String, 설정 값***

### Example
```javascript
// (2, 3)셀의 폰트 글꼴 확인
console.log("fontName:", mySheet.GetCellFontName(2, 3));

// (2, 'sDeptName')셀의 폰트 글꼴 확인
console.log("fontName:", mySheet.GetCellFontName(2, 'sDeptName'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||