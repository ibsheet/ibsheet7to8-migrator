# SetEtcData ***(core method)***

> EtcData를 설정 합니다.

### Syntax
```javascript
ObjId.SetEtcData(name, value);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|name|`String`|<span class="required">필수</span>|설정할 데이터의 키 값|
|value|`String`|<span class="required">필수</span>|설정할 값|



### Returns
***none***

### Example
```javascript
// "etcName" 키로 "ibleaders" 값 설정
mySheet.SetEtcData("etcName", "ibleaders");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||