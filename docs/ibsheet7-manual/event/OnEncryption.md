# OnEncryption ***(event)***

> 시트의 데이터를 저장할 때 변경된 내용들을 QueryString으로 묶게 되는데, 이때 암호화가 필요하거나 값을 변경하여 저장해야 하는 경우 사용하는 이벤트입니다.<br>
> 데이터를 저장할때, 유효성의 검증이 필요하다면 `OnValidation` 이벤트를 통해 저장할지 여부를 결정할 수 있습니다.<br>
> 하지만 무조건 저장을 한다는 가정하에 만약 특정 값이 들어있으면 값을 바꾸어 저장해야 한다면 이 이벤트를 통하여 기능 구현이 가능합니다.

### Syntax
```javascript
function 오브젝트ID_OnEncryption(Row, Col, Value) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|셀의 Row Index|
|Col|`Long`|셀의 Col Index|
|SaveName|`String`|컬럼의 SaveName|
|Value|`String`|셀의 현재 데이터|



### Example
```javascript
function mySheet_OnEncryption(Row, Col, SaveName, Value){
  /* 저장할 값을 매개변수로 암호화를 수행하는 Enc 사용자 함수를 호출하여  리턴한다*/.
  return Enc(Value);
}
```

### See also
  * [OnValidation event](/docs/event/OnValidation)

### Since

|version|desc|
|---|---|
|7.0.0.0||