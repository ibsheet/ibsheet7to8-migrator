# SetTreeCheckRowEditable ***(search method)***

> 대상 행의 트리 기준 컬럼 CheckBox에 대한 편집 가능 여부를 설정 합니다. <br>
> 트리 기준 컬럼에서 CheckBox를 사용하고자 하는 경우 [InitColumns](/docs/funcs/init/InitColumns) 메소드의 `TreeCheck` 속성을 참고

### Syntax
```javascript
ObjId.SetTreeCheckRowEditable(Row, Edit);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|
|Edit|`Boolean`|<span class="required">필수</span>|체크박스의 편집 가능 여부|



### Returns
***none***

### Example
```javascript
// Index가 4인 트리 기준컬럼 CheckBox에 대한 편집이 가능하도록 설정
mySheet.SetTreeCheckRowEditable(4, 1);
```


### Since

|version|desc|
|---|---|
|7.0.9.0||