# DoAllSave ***(save method)***

> 데이터의 트랜잭션 상태에 관계 없이 모든 데이터를 저장 하도록 페이지를 호출합니다. <br>
> 데이터 건수가 한건도 없으면 경고 메시지를 표시하고, 처리는 중단됩니다. <br>
> 저장 준비를 위한 저장 데이터를 모으는 과정에서 [OnValidataion](/docs/event/OnValidation) 이벤트가 발생하며 사용자 정의 로직에 따라 OnValidataion에서 실패한 경우 저장 처리는 중단합니다.

### Syntax
```javascript
ObjId.DoAllSave(Url, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Url|`String`|<span class="required">필수</span>|서버에 요청할 페이지 url|
|Opt|`Object`|<span class="optional">선택</span>|저장 처리 옵션|
|Opt.CallBack|`Function`|<span class="optional">선택</span>|조회 후 사용자 정의 콜백함수|
|Opt.Param|`String`|<span class="optional">선택</span>|저장을 위한 Parameter (Default: "")|
|Opt.UrlEncode|`Boolean`|<span class="optional">선택</span>|IBSheet 위의 데이터를 인코딩할지 여부를 설정 (Default: 1)|
|Opt.Mode|`Number`|<span class="optional">선택</span>|Query String 문자열 조합방법을 설정 (`1` : 셀기준 조합방법 (Default), `2` : 컬럼기준 조합 방법)|
|Opt.Delim|`String`|<span class="optional">선택</span>|Mode=2일때, 연결될 구분자 설정 (Default: `|`)|
|Opt.ReqHeader|`Object`|<span class="optional">선택</span>|요청헤더 설정 값 객체 (Default: {})|
|Opt.ValidKeyField|`Boolean`|<span class="optional">선택</span>|KeyField 체크 여부 (Default: 1)|
|Opt.ValidFullInput|`Boolean`|<span class="optional">선택</span>|FullInput 체크 여부 (Default: 1)|
|Opt.ValidEditLen|`Boolean`|<span class="optional">선택</span>|저장시 EditLen 속성을 통한 길이 체크 여부|
|Opt.ValidMinLen|`Boolean`|<span class="optional">선택</span>|저장시 MinLen 속성을 통한 길이 체크 여부 (Default: 0)|
|Opt.Quest|`Boolean`|<span class="optional">선택</span>|저장시 confirm 메시지 사용 여부|
|Opt.Sync|`Number`|<span class="optional">선택</span>|저장 처리 방법 (`0` : 비동기방식(Default), `2` : 동기방식)|
|Opt.UrlEncode|`Boolean`|<span class="optional">선택</span>|시트의 데이터에 대한 인코딩 여부|



### Returns
***Boolean, 저장 처리여부***

### Example
```javascript
// 일반 저장
mySheet.DoAllSave('save.jsp', {
  "Param": "p1=aa&p2=bb"
});

// 컬럼기준 조합방식 저장 (구분자:$)
mySheet.DoAllSave('save.jsp', {
  "Param": "p1=aa&p2=bb",
  "Mode": 2,
  "Delim": "$",
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.1.0|저장 처리 여부에 따른 리턴값 추가|
|7.0.12.4|ValidKeyField, ValidFullInput 인자 속성 추가|
