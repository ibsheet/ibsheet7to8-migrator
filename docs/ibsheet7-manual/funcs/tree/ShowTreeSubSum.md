# ShowTreeSubSum ***(search method)***

> 자식 노드의 대한 소계를 계산하여 부모 노드에 계산 결과를 표시 합니다. <br>
> 설정을 변경하는 경우 재조회를 해야 해당 계산결과가 정상적으로 적용 됩니다. <br>
> 계산 결과를 표시하는 셀에 데이터가 있는 경우 해당 값은 무시되고 계산 결과 값이 표시 됩니다.

### Syntax
```javascript
ObjId.ShowTreeSubSum(Info);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Info|`Object`|<span class="required">필수</span>|설정 옵션|
|Info.SumCols|`String`|<span class="optional">선택</span>|합계가 계산되어야 할 컬럼의 Index또는 SaveName을 `|`로 연결한 문자열 (Defuault: "")|
|Info.AvgCols|`String`|<span class="optional">선택</span>|평균이 계산되어야 할 컬럼의 Index 또는 SaveName을 `|`로 연결한 문자열 (Defuault: "")|
|Info.CountCols|`String`|<span class="optional">선택</span>|개수가 계산되어야 할 컬럼의 Index 또는 SaveName을 `|`로 연결한 문자열 (Default: "")|
|Info.MaxCols|`String`|<span class="optional">선택</span>|최대값이 계산되어야 할 컬럼의 Index 또는 SaveName을 `|`로 연결한 문자열 (Default: "")|
|Info.MinCols|`String`|<span class="optional">선택</span>|최소값이 계산되어야 할 컬럼의 Index 또는 SaveName을 `|`로 연결한 문자열 (Default: "")|
|Info.SumEx|`Boolean`|<span class="optional">선택</span>|상태값이 "삭제"인 행에 대한 계산 포함 여부 (Default: 0)|
|Info.ExceptNull|`Boolean`|<span class="optional">선택</span>|평균 컬럼에서 Null 값 포함 계산 여부 (Default: 0)|




### Returns
***none***

### Example
```javascript
// Index가 2 와 3인 컬럼에 대한 소계 표현
mySheet.ShowTreeSubSum({
  "SumCols": "2|3"
});

// SaveName이 'sSalary 와 'sWorkDay'인 컬럼에 대한 소계 표현
mySheet.ShowTreeSubSum({
  "SumCols": "sSalary|sWorkDay"
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.12.0|MaxCols, MinCols 인자 속성 추가|