# ColumnSort ***(col method)***

> 단일 또는 다중 컬럼에 대한 데이터 정렬을 처리 합니다. <br>
> `col` 인자에 2개 이상의 컬럼을 구분자로 연결한 문자열로 구성한 경우 다중컬럼에 대한 정렬 처리를 합니다.<br>
> `colSortOrder` 인자 설정시 컬럼 순서와 매칭되어 설정 해야 합니다.<br>
> 특정 컬럼에 매칭 되는 문자열이 빈 값인 경우 `sortOrder` 인자에 설정한 기본 정렬방식으로 처리 합니다.<br>
> `keepColOrder` 를 설정하지 않거나 0으로 설정한 경우 col 인자 설정 순서와 상관없이 설정한 컬럼의 Index 순으로 처리하게 되며, true로 설정시 col 인자 순서에 준하여 처리 됩니다.<br>
> `col` 인자를 빈값으로 설정하는 경우 기존 처리된 컬럼 정렬을 모두 초기화 합니다.<br>
> `주의` 소계행이 존재할 때, 단일 컬럼에 대해 사용 가능하며 다중 컬럼 소트는 지원하지 않습니다.

### Syntax
```javascript
ObjId.ColumnSort(Col, Sort, ColSort, KeepColOrder);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|소트할 컬럼의 Column Index 또는 SaveName을 `|`로 조합한 문자열|
|Sort|`String`|<span class="optional">선택</span>|"ASC" 또는 "DESC" (Default: "ASC")|
|ColSort|`String`|<span class="optional">선택</span>|각 컬럼의 소트 방향을 `|`로 연결한 문자열 (Default: "")|
|KeepColOrder|`Boolean`|<span class="optional">선택</span>|Cols파라미터에서 지정된 순서대로 소트할 것인지 선택 (Default: 0)|


### Returns
***none***

### Example
```javascript
//기존에 설정된 ColumnSort 초기화
mySheet.ColumnSort("");

//6컬럼만 내림차순으로 정렬
mySheet.ColumnSort("6", "DESC")

//4컬럼을 중심으로 먼저 오름차순 정렬하고, 그 안에서 5컬럼 오름차순 정렬
mySheet.ColumnSort("4|5")

//2,3,4컬럼 순서로 정렬하고, 내림차순으로 정렬
mySheet.ColumnSort("2|3|4", "DESC");

//3,2,4컬럼을 2,3,4컬럼인덱스 순서대로 내림차순, 오름차순, 오름차순으로 정렬
mySheet.ColumnSort("3|2|4", "DESC","ASC|DESC|ASC");

//3,2,4컬럼을 3,2,4컬럼 지정된 순서대로 오름차순, 내림차순, 오름차순으로 정렬
mySheet.ColumnSort("3|2|4", " DESC ","ASC|DESC|ASC", 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||