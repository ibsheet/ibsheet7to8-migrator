# SetSelectRange ***(core method)***

> 인자로 설정한 범위 영역에 대해서 Selection 설정을 합니다.

### Syntax
```javascript
ObjId.SetSelectRange(startRow, startCol, endRow, endCol);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|startRow|`Number`|범위 시작 셀의 행 Index|
|startCol|`Number or String`|범위 시작 셀의 컬럼 Index 또는 SaveName|
|endRow|`Number`|범위 종료 셀의 행 Index|
|endCol|`Number or String`|범위 종료 셀의 컬럼 Index 또는 SaveName|


### Returns
***none***

### Example
```javascript
// (2, 1) ~ (4, 2) 범위에 대한 Selection 설정
mySheet.SetSelectRange(2, 1, 4, 2);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||