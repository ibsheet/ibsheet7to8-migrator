# ShowPivotSumRatio ***(pivot method)***

> 피벗 테이블에 대한 합계 비율을 적용 합니다.<br>
> 이 기능은 피벗 테이블 결과가 적용된 시트에서만 사용이 가능 합니다.


### Syntax
```javascript
ObjId.ShowPivotSumRatio(Mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Mode|`Number`|<span class="required">필수</span>|합계 비율 모드<br>- `0` : 기본 합계 (Default)<br>- `1` : 총 합계 비율<br>- `2` : 열 합계 비율<br>- `3` : 행 합계 비율|


### Returns
***none***

### Example
```javascript
// 피벗 테이블 결과 로드 시점에 총 합계 비율 설정
function mySheet_Pivot_OnSearchEnd() {
  mySheet_Pivot.ShowPivotSumRatio(1);
}
```


### Since

|version|desc|
|---|---|
|7.0.13.0||