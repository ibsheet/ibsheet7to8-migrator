# OnKeyDown ***(event)***

> 셀의 값을 수정 중이거나 선택된 셀에 키보드를 누른 경우 이벤트가 발생합니다.
> KeyCode는 아스키 값이므로 변환하여 사용합니다.



### Syntax
```javascript
function 오브젝트ID_OnKeyDown(Row, Col, KeyCode, Shift) { }
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
function mySheet_OnKeyDown(Row, Col, KeyCode, Shift) {
  //마지막 컬럼에서 엔터키가 눌린 경우 다음행의 처음에 포커스 두기
  if(KeyCode == 13 && Col == mySheet.LastCol()) {
    mySheet.SelectCell(Row + 1, 2);
  }
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||