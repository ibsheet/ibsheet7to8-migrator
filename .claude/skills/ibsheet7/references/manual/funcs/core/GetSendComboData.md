# GetSendComboData ***(core method)***

> `Combo`, `ComboEdit` 타입의 데이터에 대한 저장시 전송될 데이터 타입을 확인 합니다.

### Syntax
```javascript
ObjId.GetSendComboData(DataRow, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|DataRow|`Number`|<span class="required">필수</span>|단위 데이터 행 Index|
|Col|`Long or String`|<span class="required">필수</span>|컬럼의 Index 또는 SaveName|



### Returns
***String, 데이터 타입 설정 값***

### Example
```javascript
// Index가 5인 컬럼에 대한 전송 데이터 타입 확인
console.log("sendType:", mySheet.GetSendComboData(0, 5));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||