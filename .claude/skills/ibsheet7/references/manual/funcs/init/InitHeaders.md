# InitHeaders ***(init method)***

> 헤더에 들어갈 타이틀과 헤더기능을 설정합니다.

### Syntax
```javascript
ObjId.InitHeaders(Headers, Info);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Headers|`Object`|<span class="required">필수</span>|헤더의 행별 정보를 설정|
|Info|`Object`|<span class="optional">선택</span>|헤더의 공통 정보를 설정|
|Headers.Text|`String`|<span class="required">필수</span>|헤더에 표시할 Text를 `|`로 연결한 문자열|
|Headers.Align|`String`|<span class="optional">선택</span>|헤더 텍스트의 정렬방법 (`Left` : 좌측정렬, `Center` : 중앙정렬 (Default), `Right` : 우측정렬)|
|Headers.RowMerge|`Boolean`|<span class="optional">선택</span>|헤더행의 가로머지 허용 여부 (Default: 1)|
|Info.Sort|`Number`|<span class="optional">선택</span>|헤더 클릭을 통한 컬럼 Sort 허용 여부 (`0` : 사용안함, `1` : Sort 사용 (Default), `2` : Sort 아이콘만 표시, `3` : colSpan 설정이 아닌 헤더 셀만 Sort 사용)|
|Info.ColMove|`Boolean`|<span class="optional">선택</span>|헤더 컬럼 이동 가능 여부 (Default: 1)|
|Info.ColResize|`Boolean`|<span class="optional">선택</span>|컬럼 너비 조정 허용 여부 (Default: 1)|
|Info.HeaderCheck|`Boolean`|<span class="optional">선택</span>|헤더에 전체 체크 표시 여부 (Default: 1)|


### Returns
***none***

### Example
```javascript
// 2라인의 헤더 생성
var headers = [
  {"Text":"상태|삭제|직원정보|직원정보|직원정보", "Align":"Center"},
  {"Text":"상태|삭제|직원명|직원번호|입사일", "Align":"Center"},
];
var mode = {
  "Sort": 1,
  "ColResize": 0
};

mySheet.InitHeaders(headers, mode);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.4.3|헤더행 별 RowMerge 속성 추가|
|7.0.4.6|Sort 속성 개선 (아이콘만 표시하는 기능 추가)|
|7.0.13.24|Sort 속성 개선 (colSpan 에 대한 예외 기능 추가)|
