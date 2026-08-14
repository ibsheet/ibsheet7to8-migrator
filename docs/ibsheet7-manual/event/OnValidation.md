# OnValidation ***(event)***

> 저장함수를 호출하여 저장 처리 하기 전에 사용자들이 저장할 값들에 대해 Validation Check 할수 있도록 이벤트가 발생합니다.<br>
> 기본적인 필수입력 항목에 대한 확인이나 전체 입력 여부에 대한 확인은 저장 전에 IBSheet가 내부적으로 확인하지만, 업무 로직에 따라 발생할 수 있는 각종 Validation을 이 이벤트에서 처리합니다.<br>
> Validation에 맞지 않다면 `ValidateFail(1)`로 설정하여 저장 처리를 중단합니다.<br>
> 이 이벤트는 저장할 데이터 각 셀단위로 발생하므로 여기서 반복문을 사용하면 시간이 오래 걸릴수 있으므로 전체에 대한 확인은 저장 함수 호출 전에 처리하고, 각 셀 단위로 확인할 로직만 기재하도록 합니다.



### Syntax
```javascript
function 오브젝트ID_OnValidation(Row, Col, Value) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|해당 셀의 Row Index|
|Col|`Long`|해당 셀의 Column Index|
|Value|`variant`|Format이 적용되지 않은 저장 시 사용되는 값|



### Example
```javascript
function mySheet_OnValidation(Row, Col, Value) {
  switch(Col) {
    case 2:
    if(Value == "원화" && mySheet.GetCellValue(Row,Col+1) >= 10000000) {
      alert("통화가 원화일 때 금액은 천만원 이상일수 없습니다.");
      mySheet.ValidateFail(1);
      mySheet.SelectCell(Row, Col+1);
    } else if(Value=="외화" && mySheet.GetCellValue(Row,Col+1) < 10000000) {
      alert("통화가 외화일 때 금액은 천만원 이상이여야 합니다.");
      mySheet.ValidateFail(1);
      mySheet.SelectCell(Row, Col+1);
    }
  }
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||