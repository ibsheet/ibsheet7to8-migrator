# OnMessage ***(event)***

> `SetShowMsgMode(0)`인 경우 각종 확인 메시지 또는 경고 메시지가 발생했을 때 시스템 팝업이 표시되는 것이 아니라 이 이벤트가 발생합니다.<br>
> 확인 메시지인 경우는 IsConfirm = 1이므로, 반드시 `ConfirmOK` 함수를 이용하여 응답 결과를 Sheet로 되돌려 줍니다.


### Syntax
```javascript
function 오브젝트ID_OnMessage(msg, level, isConfirm) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|msg|`String`|메시지|
|level|`String`|메시지레벨<br>- `U` : EndUser를 위한 메시지<br>- `E` : 개발자를 위한 메시지<br>- `D` : 서버 연결 함수의 페이지 관련 메시지<br>- `X` : 조회, 저장 XML의 XML 파서 메시지|
|isConfirm|`Boolean`|확인 메시지 여부|


### Example
```javascript
//메시지 모드를 설정한다.
mySheet.SetShowMsgMode(0);

//OnMessage 이벤트를 처리한다.
function mySheet_OnMessage(msg, level, isConfirm) {
  //메시지 표시하기
  var win_result = window.showModalDialog(
    "sheet_message.jsp?msg=" + msg + "&isConfirm=" + isConfirm,
    "modalResult",
    "dialogWidth:200px;dialogHeight:200px;center:yes;help:no;status:no;");
    //Sheet로 메시지 결과를 반환한다.
  if(IsConfirm) mySheet.ConfirmOK(win_result);
}
```

### See also
  * [ConfirmOK method](/docs/funcs/core/ConfirmOK)
  * [SetShowMsgMode method](/docs/funcs/core/SetShowMsgMode)


### Since

|version|desc|
|---|---|
|7.0.0.0||