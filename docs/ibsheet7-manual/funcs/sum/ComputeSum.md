# ComputeSum ***(sum method)***

> 대상 범위 영역의 합계를 계산하여 반환 합니다. <br>
> StartRow, EndRow 인자를 설정하지 않은 경우 `모든 데이터 영역`에 대해서 합계를 계산 합니다.

### Syntax
```javascript
ObjId.ComputeSum(CalcLogic, FirstRow, LastRow, isFullSum);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|CalcLogic|`String`|<span class="required">필수</span>|계산 공식, 공식에 다른 컬럼값이 사용되는 경우 반드시 `|`로 감싸서 사용|
|Col|`String`|<span class="required">필수</span>|대상 컬럼명|
|FirstRow|`Long`|<span class="optional">선택</span>|계산 대상행의 시작 index (Default: -1)|
|LastRow|`Long`|<span class="optional">선택</span>|계산 대상행의 마지막 index (Default: -1)|
|isFullSum|`Boolean`|<span class="optional">선택</span>|해당 계산식을 소계행도 포함할지의 여부<br>- `1` : 소계행을 계산식에 포함<br>- `0` : 소계행은 계산식에서 제외|




### Returns
***Double, 계산되어진 특정영역의 합계***

### Example
```javascript
// Index가 3인 컬럼의 합계 계산
console.log('result: ', mySheet.ComputeSum('|3|'));

// 1 ~ 10 행 까지의 Index가 3인 컬럼 * Index 가 4인 컬럼 / 100 의 계산 결과의 합계 계산
console.log('result: ', mySheet.ComputeSum('|3| * |4| / 1000', 1, 10));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||