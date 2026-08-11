# TreeChildSort ***(search method)***

> 대상 행의 자식 행들에 대한 Sort 처리를 합니다.

### Syntax
```javascript
ObjId.TreeChildSort(row, col, sortOrder);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|row|`Long`|<span class="required">필수</span>|대상 행의 Index|
|col|`Long or String`|<span class="required">필수</span>|Sort 기준 컬럼의 Index 또는 SaveName을 구분자 `|`로 연결한 문자열|
|sortOrder|`String`|<span class="optional">선택</span>|Sort 기준 컬럼에 대한 Sort 정렬 방식을 구분자 `|`로 연결한 문자열<br>- `asc` : 기준 컬럼에 대한 오름차순 정렬 (Default)<br>- `desc` : 기준 컬럼에 대한 내림차순 정렬|



### Returns
***none***

### Example
```javascript
// Index가 4인 행의 자식 행들을 Index가 2인 컬럼을 기준 정렬 처리
mySheet.TreeChildSort(4, 2, 'asc');

// Index가 4인 행의 자식 행들을 Index가 2(asc)와 3(desc)인 컬럼을 기준 정렬 처리
mySheet.TreeChildSort(4, '2|3', 'asc|desc');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||