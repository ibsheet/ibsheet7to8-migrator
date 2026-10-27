# SetSendComboData ***(core method)***

> `Combo`, `ComboEdit` 타입의 데이터에 대한 저장시 전송될 데이터 타입을 설정 합니다.

### Syntax
```javascript
ObjId.SetSendComboData(dataRow, col, type);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|dataRow|`Number`|<span class="required">필수</span>|단위 데이터 행 Index|
|col|`Long or String`|<span class="required">필수</span>|컬럼의 Index 또는 SaveName|
|type|`String`|<span class="optional">선택</span>|데이터 타입 설정값<br>- `code` : 코드 값<br>- `text` : 텍스트 값<br>- `code|text` : 코드와 텍스트 값을 구분자 `|`로 연결한 문자열|



### Returns
***none***

### Example
```javascript
// Index가 5인 컬럼에 대한 Text 값 전달 처리
mySheet.SetSendComboData(0, 5, "text");

// SaveName이  "sDept"인 컬럼에 대한 Code|Text 값 전달 처리
mySheet.SetSendComboData(0, "sDept", "code|text");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||