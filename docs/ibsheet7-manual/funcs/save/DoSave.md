# DoSave ***(save method)***

> 데이터의 트랜잭션 상태 또는 특정 컬럼 데이터에 따라 시트의 데이터를 저장 처리 합니다. <br>
> 기준 컬럼을 설정하지 않은 경우 `Status` 데이터 타입의 컬럼을 기준컬럼으로 사용합니다. <br>
> 서버로 부터 전달 받은 응답 데이터에 따라 성공 실패 처리를 합니다.

### Syntax
```javascript
ObjId.DoSave(Url, [Opt])
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Url|`String`|<span class="required">필수</span>|서버에 요청할 페이지 url|
|Opt|`Object`|<span class="optional">선택</span>|저장 처리 옵션|
|Opt.CallBack|`Function`|<span class="optional">선택</span>|저장 후 사용자 정의 콜백함수|
|Opt.Col|`Long or String`|<span class="optional">선택</span>|저장 대상이 되는 기준 컬럼의 Index 또는 SaveName|
|Opt.Mode|`Number`|<span class="optional">선택</span>|Query String 문자열 조합방법을 설정 (`1` : 셀기준 조합방법 (Default), `2` : 컬럼기준 조합 방법)|
|Opt.Delim|`String`|<span class="optional">선택</span>|Mode=2일때, 연결될 구분자 설정 (Default: `|`)|
|Opt.Param|`String`|<span class="optional">선택</span>|저장을 위한 Parameter (Default: "")|
|Opt.Quest|`Boolean`|<span class="optional">선택</span>|저장시 confirm 메시지 사용 여부|
|Opt.ReqHeader|`Object`|<span class="optional">선택</span>|요청헤더 설정 값 객체 (Default: {})|
|Opt.Sync|`Number`|<span class="optional">선택</span>|저장 처리 방법 (`0` : 비동기방식(Default), `2` : 동기방식)|
|Opt.UrlEncode|`Boolean`|<span class="optional">선택</span>|시트의 데이터에 대한 인코딩 여부|
|Opt.ValidKeyField|`Boolean`|<span class="optional">선택</span>|KeyField 체크 여부 (Default: 1)|
|Opt.ValidFullInput|`Boolean`|<span class="optional">선택</span>|FullInput 체크 여부 (Default: 1)|
|Opt.ValidEditLen|`Boolean`|<span class="optional">선택</span>|저장시 EditLen 속성을 통한 길이 체크 여부|
|Opt.ValidMinLen|`Boolean`|<span class="optional">선택</span>|저장시 MinLen 속성을 통한 길이


### Returns
***Boolean, 저장 처리 여부***

### Example
```javascript
// 일반 저장
mySheet.DoSave('save.jsp', {
  "Param": "p1=aa&p2=bb"
});

// Index가 2인 CheckBox 컬럼의 값이 checked 인 데이터만 저장
mySheet.DoSave('save.jsp', {
  "Param": "p1=aa&p2=bb",
  "Col": 2
});

// 컬럼기준 조합방식 저장 (구분자:$)
mySheet.DoSave('save.jsp', {
  "Param": "p1=aa&p2=bb",
  "Mode": 2,
  "Delim": "$",
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||