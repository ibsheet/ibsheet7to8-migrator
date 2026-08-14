# ShowSubSum ***(sum method)***

> 특정 컬럼의 데이터를 기준으로 소계와 누계를 계산하여 표시합니다.<br>
> 이 메소드는 데이터를 조회하는 메소드를 호출하기 이전에 호출하여야 하며, 설정을 변경한 경우 다시 데이터를 조회해야 적용 됩니다. <br>
> `제약사항` 단위데이터행, 트리구조, 서버페이징 모드에서는 지원하지 않습니다.

### Syntax
```javascript
ObjId.ShowSubSum([opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|opt|`Object`|<span class="required">필수</span>|설정 옵션|
|opt.StdCol|`Number orString`	<span class="required">필수</span>|기준 컬럼 Index 또는 SaveName|
|opt.SumCols|`String`|<span class="required">필수</span>|소계가 계산되어야 할 컬럼 Index를 `|`로 연결한 문자열|
|opt.Sort|`String`|<span class="optional">선택</span>|기준 컬럼의 Sort 처리 방식<br>- `""` : 사용 안함<br>- `asc` : 오름차순 정렬<br>- `desc` : 내림차순 정렬|
|opt.ShowCumulate|`Boolean`|<span class="optional">선택</span>|소계에 대한 누계 표시 여부 (Default: 0)|
|opt.CaptionCol|`Long`|	<span class="optional">선택</span>|소계 대표 글자인 "소계:" + 기준값을 설정할 컬럼 (Default: 숨겨지지 않은 첫컬럼)|
|opt.CaptionText|`String`|<span class="optional">선택</span>|소계 대표 글자 포맷<br>소계(누계)를 의미하는 %s 예약어와 기준값을 의미하는 %col 예약을 이용하여 소계 대표 글자 출력 포맷을 설정<br>- 설정 예제 : [%s] %col - 출력: [소계] 기준컬럼의 값|
|opt.AvgCols|`String`|<span class="optional">선택</span>|소계 행에 평균으로 계산되어야 할 컬럼 Index를 `|`로 연결한 문자열 (Defuault: "")|
|opt.CntCol|`String`|<span class="optional">선택</span>|소계 행에 건수 표현할 컬럼의 Index 혹은 SaveName|
|opt.Position|`String`|<span class="optional">선택</span>|소계행 생성 위치 설정<br>- `bottom` : 그룹 하단 표시<br>- `top` : 그룹 상단 표시<br>- `bottomAll` : 최하단 표시<br>- `topAll` : 최상단 표시|
|opt.OtherColText|`String`|<span class="optional">선택</span>|CaptionCol 이외의 컬럼에 설정할 글자를 `;`으로 연결한 문자열 (Default: "")
|opt.Mode|`Number`|<span class="optional">선택</span>|소계행 표시 방법<br>- `0` : 모든 대상 그룹에 대한 소계행 표시<br>- `1` : 대상 그룹이 2개 이상인 그룹에 대해서만 소계행 표시|



### Returns
***none***

### Example
```javascript
// Index가 1인 컬럼을 기준으로 소계 표현
mySheet.ShowSubSum([
  {"StdCol": 1, "SumCols": "3|4|5"}
]);

// 누계 표시
mySheet.ShowSubSum([
  {"StdCol": 1, "SumCols": "3|4|5", "ShowCumulate": 1}
]);

// Index가 1인 컬럼, 2인 컬럼 기준의 다중 소계 표현
mySheet.ShowSubSum([
  {"StdCol": 1, "SumCols": "3|4|5"}
  {"StdCol": 2, "SumCols": "3|4|5", "CaptionCol": 2}
]);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.12|Sort 속성의 타입 변경 및 오름차순 내림차순 설정 지원|
|7.0.13.38|Position 속성 추가<br>소계 후 컬럼 Sort 기능 지원|
|7.0.13.40|OtherColText 속성 추가|
|7.0.13.51|Mode 속성 추가|
|7.0.13.163|CntCol 속성 추가|
