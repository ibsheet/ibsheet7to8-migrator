# GetSaveString ***(save method)***

> 저장 할 데이터를 Query String 조합 문자열로 반환합니다. <br>
> Validation 체크 결과가 실패인 경우 기본으로 KeyFieldError 문자열을 반환 하고, ibmsg의 SYS_InvalidGetSaveString에 값이 설정되어 있는 경우 해당 값으로 반환합니다.

### Syntax
```javascript
ObjId.GetSaveString([Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Opt|`Object`|<span class="optional">선택</span>|저장 처리 옵션|
|Opt.AllSave|`Boolean`|<span class="optional">선택</span>|전체 저장 여부 (Default: 0)|
|Opt.UrlEncode|`Boolean`|<span class="optional">선택</span>|UrlEncode 여부 (Default: 1)|
|Opt.Col|`Long or String`|<span class="optional">선택</span>|대상이 되는 기준 컬럼 또는 SaveName (Default: 상태 컬럼)|
|Opt.Prefix|`String`|<span class="optional">선택</span>|저장시 SaveName 앞에 붙이고자 하는 문자열 (Default: "")|
|Opt.Mode|`Integer`|<span class="optional">선택</span>|Query String 문자열 조합방법을 설정 (`1` : 셀기준 조합방법 (Default), `2` : 컬럼기준 조합방법)|
|Opt.Delim|`String`|<span class="optional">선택</span>|Mode=2일때, 연결될 구분자 설정 (Default: `|`)|
|Opt.StdColValue|`String`|<span class="optional">선택</span>|기준컬럼의 추출 대상 값을 구분자 `|` 로 연결한 문자열|
|Opt.ValidKeyField|`Boolean`|<span class="optional">선택</span>|KeyField 체크 여부 (Default: 1)|
|Opt.ValidFullInput|`Boolean`|<span class="optional">선택</span>|FullInput 체크 여부 (Default: 1)|
|Opt.ValidEditLen|`Boolean`|<span class="optional">선택</span>|저장시 EditLen 속성을 통한 길이 체크 여부|
|Opt.ValidMinLen|`Boolean`|<span class="optional">선택</span>|저장시 EditLen 속성을 통한 길이 체크 여부|
|Opt.NoSelectCellEvent|`Boolean`|<span class="optional">선택</span>|KeyField 체크로 인해 포커스 이동시 OnSelectCell 이벤트 발생여부 (Default: 0(이벤트 발생))|



### Returns
***String, 저장할 Query String***

### Example
```javascript
// 변경 데이터의 저장 문자열 가져오기 (DoSave)
var saveData = mySheet.GetSaveString();
console.log('saveData: ', saveData);

// 모든 데이터의 저장 문자열 가져오기 (DoAllSave)
var saveData = mySheet.GetSaveString({
  "AllSave": 1
});
console.log('saveData: ', saveData);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||