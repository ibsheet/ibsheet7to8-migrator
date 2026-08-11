# OnTab ***(event)***

> 시트에서 탭 키를 누르는 경우 발생하는 이벤트입니다.<br>
> `isLast` 인자의 경우 탭으로 이동할 수 있는 마지막 셀인 경우 반환되는 값으로, 첫셀에서 Shift + Tab을 누르는 경우,마지막 셀에서 Tab을 누르는 경우 1을 반환합니다.<br>
> `TabBehavior`, `EditTabBehavior`를 설정한 경우 설정 값에 따라서 이동할 수 있는 마지막 셀에서 1값이 반환됩니다. (이전행/컬럼과 현재행/컬럼이 동일한 경우에 1로 반환)



### Syntax
```javascript
function 오브젝트ID_OnTab(Row, Col, Old_Row, Old_Col, isShift, isLast) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|선택된 행 인덱스|
|Col|`Long`|선택된 컬럼 인덱스|
|Old_Row|`Long`|이전 행 인덱스|
|Old_Col|`Long`|이전 컬럼 인덱스|
|isShift|`Boolean`|Shift 키 입력 여부|
|isLast|`Boolean`|마지막 셀 여부|



### Example
```javascript
function mySheet_OnTab(Row, Col, Orow, Ocol, isShift, isLast) {
  alert("[OnTab] New : " + Row + "," + Col + " Old : " + Orow + "," + Ocol + " Shift : " + isShift + " isLast : " + isLast);
}
```

### See also
  * [SetEditTabBehavior method](/docs/funcs/core/SetEditTabBehavior)

### Since

|version|desc|
|---|---|
|7.0.0.0||