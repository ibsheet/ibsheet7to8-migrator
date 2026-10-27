# IsCellModified ***(cell method)***

> 대상 셀의 값 변경 여부를 확인 합니다.

### Syntax
```javascript
ObjId.IsCellModified(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|


### Returns
***Boolean, 셀 값 변경여부***

### Example
```javascript
// (2, 3)셀의 값 변경 여부 확인
console.log("isModified:", mySheet.IsCellModified(2, 3));

// (2, 'sDeptName')셀의 값 변경 여부 확인
console.log("isModified:", mySheet.IsCellModified(2, 'sDeptName'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||