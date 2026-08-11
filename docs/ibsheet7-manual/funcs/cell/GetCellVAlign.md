# GetCellVAlign ***(cell method)***

> 대상 셀의 상하 정렬값을 확인 합니다.
> 해당 셀의 컬럼 또는 셀에 대해서 설정값이 없는 경우는 빈값으로 반환 합니다.

### Syntax
```javascript
ObjId.GetCellVAlign(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|


### Returns
***String, 세로 정렬 설정값***

### Example
```javascript
// (2, 3)셀의 상하 정렬값 확인
console.log("cellVerticalAlign:", mySheet.GetCellAlign(2, 3));

// (2, 'sDeptName')셀의 상하 정렬값 확인
console.log("cellVerticalAlign:", mySheet.GetCellAlign(2, 'sDeptName'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||