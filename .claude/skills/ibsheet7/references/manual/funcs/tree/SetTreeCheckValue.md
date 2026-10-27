# SetTreeCheckValue ***(search method)***

> 트리 기준 컬럼의 CheckBox 값을 설정 합니다.<br>
> 트리 기준 컬럼에서 CheckBox를 사용하고자 하는 경우 [InitColumns](/docs/funcs/init/InitColumns) 메소드의 `TreeCheck` 속성을 참고 합니다.

### Syntax
```javascript
ObjId.SetTreeCheckValue(Row, Value, Event);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|
|Value|`Boolean`|<span class="required">필수</span>|체크박스 설정 값|
|Event|`Boolean`|<span class="optional">선택</span>|설정시 `OnTreeCheckChange` 이벤트 발생 여부 (Default: 1)|



### Returns
***none***

### Example
```javascript
// Index가 4인 행의 트리 기준컬럼 CheckBox 체크 처리
mySheet.SetTreeCheckValue(4, 1);
```


### Since

|version|desc|
|---|---|
|7.0.9.0||