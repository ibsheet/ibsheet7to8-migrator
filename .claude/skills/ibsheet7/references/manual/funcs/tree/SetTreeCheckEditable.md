# SetTreeCheckEditable ***(search method)***

> 트리 기준 컬럼의 CheckBox에 대한 편집 가능 여부를 설정 합니다.<br>
> 트리 기준 컬럼에서 CheckBox를 사용하고자 하는 경우 [InitColumns](/docs/funcs/init/InitColumns) 메소드의 `TreeCheck` 속성을 참고

### Syntax
```javascript
ObjId.SetTreeCheckEditable(Edit);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Edit|`Boolean`|<span class="required">필수</span>|체크박스의 편집 가능 여부|



### Returns
***none***

### Example
```javascript
// 트리 기준컬럼의 CheckBox에 대한 편집이 가능하도록 설정
mySheet.SetTreeCheckEditable(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||