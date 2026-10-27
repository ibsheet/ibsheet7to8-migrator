# GetCellFontBold ***(cell method)***

> 대상 셀의 폰트에 bold 적용 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetCellFontBold(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|


### Returns
***Boolean, 설정 값***

### Example
```javascript
// (2, 3)셀의 폰트에 bold 적용 여부 확인
console.log("fondBold:", mySheet.GetCellFontBold(2, 3));

// (2, 'sDeptName')셀의 폰트에 bold 적용 여부 확인
console.log("fondBold:", mySheet.GetCellFontBold(2, 'sDeptName'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||