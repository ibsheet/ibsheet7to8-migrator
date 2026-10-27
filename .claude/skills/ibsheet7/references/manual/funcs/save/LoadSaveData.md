# LoadSaveData ***(save method)***

> 저장 데이터를 함수의 인자로 전달 받아 결과를 IBSheet 내부에서 처리하여 저장 결과 데이터를 시트에 적용 합니다. <br>
> 이 함수는 보안 모듈이 사용 될 경우 복호화된 저장 데이터을 읽어 들이기 위한 용도로 사용됩니다. <br>
> 저장 데이터는 `GetSaveData` 함수를 통해 읽어 들일 수 있고, 이 함수에 인자로 설정하면 처리 결과를 표현하고, `OnSaveEnd` 이벤트가 발생합니다.


### Syntax
```javascript
ObjId.LoadSaveData(Content, [Opt])
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Content|`String`|<span class="required">필수</span>|저장XML 또는 저장JSON 문자열|
|Opt|`Object`|<span class="optional">선택</span>|저장 처리 옵션<br>- sheet : 대상 IBSheet 객체 (object)<br>- code : 결과 코드 (number)|
|Opt.CallBack|`function`|<span class="optional">선택</span>|콜백 함수|
|Opt.Event|`Object`|<span class="optional">선택</span>|완료 이벤트 발생 여부 (Default :1)|


### Returns
***none***

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
|7.0.13.43|CallBack, Event 속성 추가|