# GetCellBackColor ***(cell method)***

> 대상 셀의 배경색을 확인 합니다.

### Syntax
```javascript
ObjId.GetCellBackColor(Row, Col)
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|

### Returns
***String, 대상 셀의 배경색***

### Example
```javascript
// (2, 3)셀의 배경색 확인
console.log("backColor:", mySheet.GetCellBackColor(2, 3));

// (2, 'sDeptName')셀의 배경색 확인
console.log("backColor:", mySheet.GetCellBackColor(2, 'sDeptName'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||