# SetFilterOption ***(filter method)***

> 필터행 사용시 컬럼의 필터 옵션값을 설정할 때 사용합니다.

### Syntax
```javascript
ObjId.SetFilterOption(Col, Option, [Event]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|컬럼의 Index 또는 SaveName|
|Option|`Number`|<span class="required">필수</span>|설정 할 Option 값<br>- `0` : 사용안함 , - `1` : 같음<br>- `2` : 같지 않음 , - `3` : 작음<br>- `4` : 같거나 작음 , - `5` : 큼<br>- `6` : 같거나 큼 , - `7` : 단어로 시작함<br>- `8` : 단어로 시작하지 않음 , - `9` : 단어로 끝남<br> - `10` : 단어로 끝나지 않음 , - `11` : 포함함<br>- `12` : 포함하지 않음<br>|
|Event|`Boolean`|<span class="optional">선택</span>|[OnFilterEnd](/docs/event/OnFilterEnd) 이벤트 발생 여부 (Default: 1)|


### Returns
***none***

### Example
```javascript
// 필터행이 1행일 경우 2컬럼의 필터링 할 값 설정
mySheet.SetCellValue(1, 2, "포함");

// 필터행 2컬럼의 필터 설정 – 문자열 ‘포함' 과 같은 단어 필터링.
mySheet.SetFilterOption (2, 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.54|Event 인자 추가|