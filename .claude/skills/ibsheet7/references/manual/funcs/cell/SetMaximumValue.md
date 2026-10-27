# SetMaximumValue ***(cell method)***

> 대상 셀의 입력 최대 값을 설정 합니다.<br>
> 데이터 타입이 `Int, Float, AutoSum` 인 경우에만 설정이 가능 합니다.

### Syntax
```javascript
ObjId.SetMaximumValue(Row, Col, Value);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Value|`Long`|<span class="required">필수</span>|설정할 최대값|

### Returns
***none***

### Example
```javascript
// (2, 3) 셀의 입력 최대 값을 1000 으로 설정
mySheet.SetMaximumValue(2, 3, 1000);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||