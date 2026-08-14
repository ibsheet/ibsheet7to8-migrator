# OnKeyUp ***(event)***

> 셀의 값을 수정 중이거나 선택된 셀에 눌린 키보드가 올라오는 경우 이벤트가 발생합니다. <br>
> `OnKeyDown` 이벤트 발생 후에 바로 발생한다.<br>
> KeyCode는 아스키 값이므로 변환하여 사용합니다.



### Syntax
```javascript
function 오브젝트ID_OnKeyUp(Row, Col, KeyCode, Shift) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|해당 셀의 Row Index|
|Col|`Long`|해당 셀의 Column Index|
|KeyCode|`Integer`|키보드의 아스키 값|
|Shift|`Integer`|1 : Shift키가 눌린 경우<br>2 : Ctrl키가 눌린 경우<br>0 : 그외|



### Example
```javascript
function mySheet_OnKeyUp(Row,Col,KeyCode,Shift) {
  //마지막 컬럼에서 엔터키가 눌린 경우 다음 행의 처음에 포커스 두기
  if(KeyCode == 13 && Col == mySheet.LastCol() && Row < mySheet.RowCount()) {
    mySheet.SelectCell(Row + 1, 2);
  }
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||