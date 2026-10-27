# OnBeforeCheck ***(event)***

> 사용자가 체크박스의 값 변경시 (마우스 클릭 또는 Space 키를 누름으로 변경) 편집하기 직전에 이벤트가 발생합니다.<br>
> 체크박스의 값 변경을 하기 직전에 이벤트가 발생하므로 체크시점에 조건에 의한 처리가 가능합니다.
> 지원되는 데이터타입 : `DelCheck`, `CheckBox`, `Radio`, `DummyCheck`



### Syntax
```javascript
function 오브젝트ID_OnBeforeCheck(Row, Col) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|해당 셀의 Row Index|
|Col|`Long`|해당 셀의 Column Index|



### Example
```javascript
// 체크 되기 직전 이벤트가 발생한다.
//체크하려는 행이 입력행이면 경고창 띄우기.
function mySheet_OnBeforeCheck(Row, Col) {
  if(mySheet.GetCellValue(Row,"sStatus") == "I") {
      alert("상태가 ‘입력'인 행은 선택이 불가능 합니다.");
      mySheet.SetAllowCheck(0);//체크를 막는다.
  }else{
      mySheet.SetAllowCheck(1);//반드시 else인 경우에는 체크를 열어줘야 한다.
  }
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||