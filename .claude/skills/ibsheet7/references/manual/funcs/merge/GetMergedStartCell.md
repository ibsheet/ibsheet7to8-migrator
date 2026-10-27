# GetMergedStartCell ***(merge method)***

> 대상 셀이 포함된 셀 병합 영역에 대한 시작 셀의 정보를 확인 합니다.

### Syntax
```javascript
ObjId.GetMergedStartCell(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|
|Col|`Long or String`|<span class="required">필수</span>|대상이 되는 컬럼 또는 SaveName|


### Returns
***none***

### Example
```javascript
var startMergeCell = mySheet.GetMergedStartCell(4,5);

// (2, 3) 셀이 포함된 셀 병합 영역의 셀 병합 시작 셀 확인
console.log('startCell: ', mySheet.GetMergedStartCell(2, 3));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||