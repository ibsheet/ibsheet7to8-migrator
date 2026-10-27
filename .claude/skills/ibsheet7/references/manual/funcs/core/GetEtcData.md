# GetEtcData ***(core method)***

> 조회, 저장의 데이터 또는 SetEtcData에서 설정한 EtcData를 확인 합니다.

### Syntax
```javascript
ObjId.GetEtcData(KeyName);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|KeyName|`String`|<span class="required">필수</span>|기타정보 키 이름|



### Returns
***String, 키에 설정된 값***

### Example
```javascript
// "etcName" 키값 확인
console.log("etcName:", mySheet.GetEtcData("etcName"));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||