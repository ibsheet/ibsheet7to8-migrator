# GetTreeCheckRowEditable ***(search method)***

> 대상 행의 트리 기준 컬럼 CheckBox에 대한 편집 가능 여부를 확인 합니다.
> 트리 기준 컬럼에서 CheckBox를 사용하고자 하는 경우 [InitColumns](/docs/funcs/init/InitColumns) 메소드의 `TreeCheck` 속성을 참고

### Syntax
```javascript
ObjId.GetTreeCheckRowEditable(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|



### Returns
***Boolean, 컬럼단위 체크박스의 편집 가능 여부***

### Example
```javascript
// Index가 4인 트리 기준컬럼 CheckBox에 대한 편집 가능 여부 확인
console.log('editable: ', mySheet.GetTreeCheckRowEditable(4));
```


### Since

|version|desc|
|---|---|
|7.0.9.0||