# EtcDataString ***(core method)***

> EtcData에 설정된 키와 값을 QueryString 형태로 반환 합니다.

### Syntax
```javascript
ObjId.EtcDataString(UrlEncode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|UrlEncode|`Boolean`|<span class="optional">선택</span>|UrlEncode 처리 여부 (Default: 0)|



### Returns
***String, EtcData에 설정된 키와 값에 대한 QueryString 문자열***

### Example
```javascript
// 저장시 EtcData를 param으로 전달
var param = mySheet.EtcDataString(1);
mySheet.DoSave("save.jsp", {
  "Param": param
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||