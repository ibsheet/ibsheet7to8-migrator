# ConfirmOK ***(core method)***

> OnMessage 이벤트에서 Confirm 확인 값을 시트에 전달 합니다. <br>
> 이 메소드는 `SetShowMsgMode` 설정이 `0`인 경우 `OnMessage` 이벤트 내에서만 사용이 가능합니다.

### Syntax
```javascript
ObjId.ConfirmOK(Val);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Val|`Long`|<span class="required">필수</span>|확인창 선택 결과값|



### Returns
***none***

### Example
```javascript
// 시스템 팝업을 사용하지 않고 메시지를 이벤트로 전달하도록 설정
mySheet.SetShowMsgMode(0);
...
// OnMessage 이벤트
function mySheet_OnMessage(msg, level, isConfirm) {
  // 사용자 시스템 팝업 호출
  var res = ...

  if (isConfirm) {
    // 결과값 전달
    mySheet.ConfirmOK(res);
  }
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||