# ColSaveName ***(col method)***

> 특정 컬럼 Index에 해당하는 [InitColumns](/docs/funcs/init/InitColumns) 함수에서 설정한 SaveName을 확인합니다.

### Syntax
```javascript
ObjId.ColSaveName(DataRow, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|DataRow|`Number`|<span class="required">필수</span>|단위 데이터행의 Index|
|Col|`Long`|<span class="required">필수</span>|특정 컬럼의 Column Index|



### Returns
***none***

### Example
```javascript
//컬럼의 SaveName을 가져옴
var sSaveName = mySheet.ColSaveName(0, 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||