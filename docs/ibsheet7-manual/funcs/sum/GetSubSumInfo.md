# GetSubSumInfo ***(sum method)***

> 설정한 소계 정보를 확인 합니다.

### Syntax
```javascript
ObjId.GetSubSumInfo(SaveName);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|SaveName|`Boolean`|<span class="required">필수</span>|컬럼 정보를 SaveName으로 반환 여부|


### Returns
***Object***

|Name|Type|Description|
|----|----|-----------|
|result|`Array<object>`|소계정보 객체|
|result.StdCol|`Number or String`|소계 기준컬럼|
|result.SumCols|`String`|소계 대상 컬럼의 Index 또는 SaveName을 구분자 `|`로 연결할 문자열|
|result.AvgCols|`String`|소계 평균 대상 컬럼의 Index 또는 SaveName을 구분자 `|`로 연결할 문자열|
|result.Sort|`String`|기준컬럼의 Sort 처리 방식<br>
- "" : 사용안함<br>
- asc : 기준 컬럼에 대한 오름차순 정렬<br>
- desc : 기준 컬럼에 대한 내림차순 정렬|
|result.ShowCumulate|`Number`|누계 표시 여부|
|result.CaptionCol|`Number or String`|소계 대표 글자인 "소계:" + 기준값을 설정할 컬럼의 Index 또는 SaveName|
|result.CaptionText|`String`|소계 대표 글자 포맷|


### Example
```javascript
// Index가 1인 컬럼, 2인 컬럼 기준의 다중 소계 표현
mySheet.ShowSubSum([
  {"StdCol": 1, "SumCols": "3|4|5"}
  {"StdCol": 2, "SumCols": "3|4|5", "CaptionCol": 2}
]);

// 소계 정보 확인
console.log('subsumInfo: ', mySheet.GetSubSumInfo());

// 소계 정보 확인 (SaveName 사용)
console.log('subsumInfo: ', mySheet.GetSubSumInfo(1));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||