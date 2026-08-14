# SetShowMsgMode ***(core method)***

> 메시지를 시스템 팝업으로 표시할지 여부를 설정합니다.<br>
> 설정값이 0 인 경우는 `OnMessage` 이벤트로 메시지를 전달합니다.

### Syntax
```javascript
ObjId.SetShowMsgMode(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Boolean`|<span class="required">필수</span>|시스템 팝업 사용 여부|



### Returns
***none***

### Example
```javascript
// 시스템 팝업을 사용하지 않고 메시지를 OnMessage 이벤트로 전달하도록 설정
mySheet.SetShowMsgMode(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||