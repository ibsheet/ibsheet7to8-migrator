# ShowPivotTable ***(pivot method)***

> 데이터를 기준으로 피벗 테이블을 생성 합니다.<br>
> 생성된 피벗 테이블은 피벗 설정 다이얼로그에서 수행하는것과 동일하게 처리 됩니다.<br>
> 생성된 피벗 테이블의 시트는 `원본시트의 id + "_Pivot"` 으로 생성 됩니다. Ex) 원본시트 : mySheet / 피벗시트 : mySheet_Pivot

### Syntax
```javascript
ObjId.ShowPivotTable([opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|opt|`Object`|<span class="required">필수</span>|설정 옵션|
|opt.Cols|`String`|<span class="required">필수</span>|열 레이블 필드에 설정할 컬럼의 Index 또는 SaveName을 구분자 `|`로 연결한 문자열|
|opt.Rows|`String`|<span class="required">필수</span>|행 레이블 필드에 설정할 컬럼의 Index 또는 SaveName을 구분자 `|`로 연결한 문자열|
|opt.Value|`String`|<span class="required">필수</span>|계산 대상 컬럼의 Index 또는SaveName을 구분자 `|`로 연결한 문자열|
|opt.CalcSumRatio|`Number`|<span class="optional">선택</span>|합계 비율 모드 (`0` : 기본 합계(Default), `1` : 총 합계 비율, `2` : 열 합계 비율, `3` : 행 합계 비율)|
|opt.PivotFilter|`Boolean`|<span class="optional">선택</span>|피벗생성시 필터된 행 제외 여부 (`0` : 필터된 행 포함(Default), `1` : 필터된 행 제외)|

### Returns
***none***

### Example
```javascript
// Index가 5,6,7 인 컬럼을 행 레이블 필드로 설정하고, Index가 8,9,10 인 컬럼을 열 레이블의 필드로 설정하여
// Index가 13 인 컬럼에 대한 합계를 표시하는 피벗 테이블 구성
mySheet.ShowPivotTable({
  "Rows": "5|6|7",
  "Cols": "8|9|10",
  "Value": "13"
});
```


### Since

|version|desc|
|---|---|
|7.0.13.59||
|7.0.13.186|PivotFilter 추가|