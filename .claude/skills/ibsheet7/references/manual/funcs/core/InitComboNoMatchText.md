# InitComboNoMatchText ***(core method)***

> 데이터 타입이 `Combo`, `ComboEdit`인 경우 설정한 리스트 항목에 없는 데이터가 설정 되었을때의 처리 방법을 설정 합니다.

### Syntax
```javascript
ObjId.InitComboNoMatchText(Show, Text, Insert, Auto);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Show|`Boolean`|<span class="required">필수</span>|항목에 없는 데이터를 보여줄지 여부|
|Text|`String`|<span class="optional">선택</span>|항목에 없는 데이터 대신 표시할 문자열|
|Insert|`Boolean`|<span class="optional">선택</span>|해당 데이터를 항목에 추가 할지 여부|
|Auto|`Boolean`|<span class="optional">선택</span>|해당 데이터를 표시만 하고 항목에는 추가하지 않도록 설정 여부|



### Returns
***none***

### Example
```javascript
// 항목에 없는 데이터인 경우 '항목없음'으로 표시하도록 설정
mySheet.InitComboNoMatchText(1, '항목없음');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||