# GetCellFontSize ***(cell method)***

> 대상 셀의 폰트 사이즈를 확인 합니다.

### Syntax
```javascript
ObjId.GetCellFontSize(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|


### Returns
***Integer, 설정 값***

### Example
```javascript
// (2, 3)셀의 폰트 사이즈 확인
console.log("fontSize:", mySheet.GetCellFontSize(2, 3));

// (2, 'sDeptName')셀의 폰트 사이즈 확인
console.log("fontSize:", mySheet.GetCellFontSize(2, 'sDeptName'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||