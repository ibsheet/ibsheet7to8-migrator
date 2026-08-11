# OnMouseDown ***(event)***

> 마우스가 눌려졌을 때 이벤트가 발생합니다. <br>
> 마우스가 눌린 셀의 위치를 알고자 한다면 `MouseRow` 와 `MouseCol` 함수를 이용하면 됩니다.



### Syntax
```javascript
function 오브젝트ID_OnMouseDown(Button, Shift, X, Y) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Button|`Integer`|0 : 왼쪽, 2 : 오른쪽 (마우스버튼 방향)|
|Shift|`Integer`|1 : Shift키가 눌린 경우<br>2 : Ctrl키가 눌린 경우<br>0 : 그외|
|X|`Long`|X좌표|
|Y|`Long`|Y좌표|



### Example
```javascript
function mySheet_OnMouseDown(Button, Shift, X, Y) {
  //눌린 컬럼 확인
  alert(mySheet.MouseRow() + "행 " + mySheet.MouseCol() + "컬럼이 눌림");
}
```

### See also
  * [MouseRow method](/docs/funcs/row/MouseRow)
  * [MouseCol method](/docs/funcs/col/MouseCol)

### Since

|version|desc|
|---|---|
|7.0.0.0||