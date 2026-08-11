# GetSaveData ***(save method)***

> Ajax 통신을 이용하여 시트 저장 데이터를 전달하고, 처리 결과 데이터를 받아서 반환합니다. <br>
> 반환된 데이터를 암호화 등의 가공 처리후 [LoadSaveData](/docs/funcs/save/LoadSaveData) 메소드를 통해 처리 결과를 적용 할 수 있습니다. <br>
> 이 기능을 사용시 Ajax 통신은 동기 방식으로 처리됩니다.

### Syntax
```javascript
ObjId.GetSaveData(PageUrl, SaveString, Param, [Opt])
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Url|`String`|<span class="required">필수</span>|서버에 요청할 페이지 url|
|SaveString|`String`|<span class="optional">선택</span>|시트의 저장 대상 데이터 문자열 (Default: "")|
|Param|`String`|<span class="optional">선택</span>|서버 요청시 전달 할 파라메터 값 (Default: "")|
|Opt|`Object`|<span class="optional">선택</span>|조회 처리 옵션|
|Opt.ReqHeader|`Object`|<span class="optional">선택</span>|요청 헤더 설정 객체 (key-value 형태의 포맷)|



### Returns
***String, 서버 응답 결과 문자열***

### Example
```javascript
var saveData = '',
    result   = '';

// 저장 대상 데이터 받기
saveData = mySheet.GetSaveString();

// 저장 데이터가 있는 경우에 저장 처리
if (typeof saveData !== 'undefined' && saveData !== 'KeyFieldError') {
  // 저장 데이터 전달 및 결과 수신
  saveData = mySheet.GetSaveData('data.jsp', 'p1=aa&p2=bb');

  // 데이터 가공
  saveData = decryptionData(saveData); // 사용자정의 함수

  // 저장 결과 적용
  mySheet.LoadSaveData(saveData);
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||