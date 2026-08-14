# OnMouseMove ***(event)***

> 마우스가 Sheet 위에서 이동되었을 때 이벤트가 발생합니다.
> 마우스가 이동하고있는 셀의 위치를 알고자 한다면 `MouseRow`와 `MouseCol` 함수를 이용하면 됩니다.



### Syntax
```javascript
function 오브젝트ID_OnMouseMove(Button, Shift, X, Y) { }
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
function mySheet_OnMouseMove(Button, Shift, X, Y) {
  //마우스 위치를 행과 컬럼과 값 가져오기
  var Row = mySheet.MouseRow();
  var Col = mySheet.MouseCol();
  var sText = mySheet.GetCellText(Row, Col);

  //2컬럼이고 내용이 2011-07-14일때만 div popup을 보여줌
  if(Col == 2 && sText == "2011-07-14") {
    $("#div_pop_summary").show();
  } else {
    $("#div_pop_summary").hide();
  }
}
```

### See also
  * [MouseRow method](/docs/funcs/row/MouseRow)
  * [MouseCol method](/docs/funcs/col/MouseCol)


### Since

|version|desc|
|---|---|
|7.0.0.0||