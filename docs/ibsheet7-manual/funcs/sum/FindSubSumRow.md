# FindSubSumRow ***(sum method)***

> 소계 및 누계 행의 Index를 구분자 `|`로 연결한 문자열로 반환 합니다. <br>
> `stdCol` 인자를 설정하지 않거나 빈값으로 설정 한 경우 모든 소계 및 누계 행을 반환 하고, 설정한 경우 해당 기준컬럼에 대한 소계 및 누계 행만 반환 합니다. (다중 소계 표현인 경우)

### Syntax
```javascript
ObjId.FindSubSumRow([StdCol]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|StdCol|`Long or String`|<span class="optional">선택</span>|소계를 표시한 기준 컬럼의 Index 또는 SaveName (Default:""(전체컬럼))|



### Returns
***String, 소계의 행 번호를 `|`로 연결한 문자열***

### Example
```javascript
// Index가 1인 컬럼, 2인 컬럼 기준의 다중 소계 표현
mySheet.ShowSubSum([
  {"StdCol": 1, "SumCols": "3|4|5"}
    {"StdCol": 2, "SumCols": "3|4|5", "CaptionCol": 2}
]);

// 모든 소계행의 Index 확인
console.log('subsumRows: ', mySheet.FindSubSumRow());

// Index가 2인 컬럼 기준 소계행의 Index 확인
console.log('subsumRows: ', mySheet.FindSubSumRow(2));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||