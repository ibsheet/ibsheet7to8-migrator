# GetColSortInfo ***(col method)***

> 컬럼의 Sort 정보를 반환 합니다.

### Syntax
```javascript
ObjId.GetColSortInfo();
```

### Returns Info
|Parameter|Type|Description|
|---------|----|-----------|
|result|`Array<Object>`|Sort 정보 객체의 배열 집합|
|result[ ].Col|`Long or String`|컬럼의 Index(단위데이터행 구조인 경우 SaveName)|
|result[ ].SortOrder|`String`|Sort 처리 방법 (asc : 오름 차순 정렬, desc : 내림 차순 정렬)|


### Returns
***Object[ ], 컬럼별 Sort 정보 객체의 배열 집합***

### Example
```javascript
// 현재의 Sort 정보 확인
console.log('sortInfo: ', mySheet.GetColSortInfo());
```


### Since

|version|desc|
|---|---|
|7.0.13.22||