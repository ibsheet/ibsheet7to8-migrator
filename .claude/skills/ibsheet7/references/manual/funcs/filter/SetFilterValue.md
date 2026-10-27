# SetFilterValue ***(filter method)***

> 필터행 사용시 컬럼의 필터값을 설정할 때 사용 합니다.

### Syntax
```javascript
ObjId.SetFilterValue(Col, Value, Option, [Event]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|컬럼의 Index 또는 SaveName|
|Value|`String`|<span class="required">필수</span>|필터에 설정할 값|
|Option|`Number`|<span class="optional">선택</span>|설정 할 Option 값<br>- `0` : 사용안함 , - `1` : 같음<br>- `2` : 같지 않음 , - `3` : 작음<br>- `4` : 같거나 작음 , - `5` : 큼<br>- `6` : 같거나 큼 , - `7` : 단어로 시작함<br>- `8` : 단어로 시작하지 않음 , - `9` : 단어로 끝남<br>- `10` : 단어로 끝나지 않음 , - `11` : 포함함<br>- `12` : 포함하지 않음|
|Event|`Boolean`|<span class="optional">선택</span>|[OnFilterEnd](/docs/event/OnFilterEnd) 발생 여부 (Default :1)|


### Returns
***none***

### Example
```javascript
// 5컬럼에 "서울"이 포함된 문자열 필터링하기
mySheet.SetFilterValue(5, "서울", 11);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.54|Event 인자 추가|