# GetTreeCheckActionMode ***(search method)***

> 트리 기준 컬럼의 CheckBox에 대한 부모-자식 행간 동작 방법을 확인 합니다. <br>
> 트리 기준 컬럼에서 CheckBox를 사용하고자 하는 경우 [InitColumns](/docs/funcs/init/InitColumns) 메소드의 `TreeCheck` 속성을 참고

### Syntax
```javascript
ObjId.GetTreeCheckActionMode();
```

### Info
***none***



### Returns
***Number, 현재 설정 값***

### Example
```javascript
// 트리 기준 컬럼의 CheckBox에 대한 부모-자식 행간 동작 방법 확인
console.log('mode: ', mySheet.GetTreeCheckActionMode());
```


### Since

|version|desc|
|---|---|
|7.0.0.0||