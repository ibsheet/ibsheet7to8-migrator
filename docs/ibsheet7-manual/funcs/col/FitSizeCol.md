# FitSizeCol ***(col method)***

> 대상 컬럼의 너비를 컬럼 내의 가장 넓은 글자의 너비에 맞게 재조정 합니다.
> 재조정의 범위는 전역속성 [FitSizeColMode](/docs/props/PropertyList/FitSizeColMode) 설정을 따릅니다.

### Syntax
```javascript
ObjId.FitSizeCol(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|대상 컬럼의 Index 또는 SaveName|


### Returns
***none***

### Example
```javascript
//SaveName 이 "sTarget"인 컬럼에 대한 처리
mySheet.FitSizeCol("sTarget");
```


### Since

|version|desc|
|---|---|
|7.0.4.0||