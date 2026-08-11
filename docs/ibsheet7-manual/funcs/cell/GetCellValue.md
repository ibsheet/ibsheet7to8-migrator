# GetCellValue ***(cell method)***

> 대상 셀의 값을 확인 합니다.<br>
> 반환되는 값은 설정한 Format이 적용되지 않은 value 값 입니다.

### Syntax
```javascript
ObjId.GetCellValue(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|


### Returns
***String, 셀에 설정된 값***

### Example
```javascript
// (2, 3) 셀의 value 확인
console.log("cellValue:", mySheet.GetCellValue(2, 3));

// (2, 'sDeptName')셀의 value 확인
console.log("cellValue:", mySheet.GetCellValue(2, 'sDeptName'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||