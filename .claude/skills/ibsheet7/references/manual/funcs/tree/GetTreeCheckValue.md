# GetTreeCheckValue ***(search method)***

> 트리 기준 컬럼의 CheckBox 값을 확인 합니다.
> 트리 기준 컬럼에서 CheckBox를 사용하고자 하는 경우 [InitColumns](/docs/funcs/init/InitColumns) 메소드의 `TreeCheck` 속성을 참고

### Syntax
```javascript
ObjId.GetTreeCheckValue(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|



### Returns
***Boolean, 해당 체크박스의 값***

### Example
```javascript
// Index가 4인 행의 트리 기준컬럼에 대한 체크값 확인
console.log('checkValue: ', mySheet.GetTreeCheckValue(4));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||