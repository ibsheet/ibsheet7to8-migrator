# SetTreeCheckActionMode ***(search method)***

> 트리 기준 컬럼의 CheckBox에 대한 부모-자식 행간 동작 방법을 설정 합니다. <br>
> 트리 기준 컬럼에서 CheckBox를 사용하고자 하는 경우 [InitColumns](/docs/funcs/init/InitColumns) 메소드의 `TreeCheck` 속성을 참고

### Syntax
```javascript
ObjId.SetTreeCheckActionMode(Mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Mode|`Number`|<span class="required">필수</span>|설정 모드 값<br>- 0 : 별도 처리 없이 독립적으로 사용 (일반)<br>- 1 : 편집가능한 CheckBox에 대해서 아래와 같이 처리 (관계모드)<br>- 2 : 모든 CheckBox에 대해서 아래와 같이 처리 (관계모드 : Force)<br> * CheckBox 값이 변경시 모든 자식행의 CheckBox에 동일한 값으로 변경 처리<br>* 자식행의 CheckBox 값이 1개 이상 체크된 경우 해당 부모행의 CheckBox 체크 처리<br>* 모든 자식행의 CheckBox 값이 언체크 인 경우 해당 부모행의 CheckBox 언체크 처리|



### Returns
***none***

### Example
```javascript
// 트리 기준 컬럼의 CheckBox에 대한 부모-자식 행간 동작 방법을 '관계모드'로 설정
mySheet.GetTreeCheckActionMode(1);
```


### Since

|version|desc|
|---|---|
|7.0.9.0||