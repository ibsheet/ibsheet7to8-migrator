# GetSumValue ***(sum method)***

> 합계 셀의 값을 Format이 적용되지 않은 형태로 확인 합니다. 합계행이 없는 경우에는 빈값을 반환합니다.


### Syntax
```javascript
ObjId.GetSumValue(DataRow, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|DataRow|`Number`|<span class="required">필수</span>|단위 데이터행의 Index|
|Col|`Long or String`|<span class="required">필수</span>|합계 셀의 Column Index 또는 SaveName|



### Returns
***String, 합계 셀의 Value값***

### Example
```javascript
// 컬럼 index가 2인 합계 행의 셀의 value 확인
console.log("sumValue:", mySheet.GetSumValue(0, 2));

// 컬럼 SaveName이 'sSalary'인 셀의 value 확인
console.log("sumValue:", mySheet.GetSumValue(0, 'sSalary'));

// 단위데이터행 Index가 1이고, 컬럼 index가 2인 합계 행의 셀의 value 확인
console.log("sumValue:", mySheet.GetSumValue(1, 2));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||