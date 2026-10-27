# OnEditValidation ***(event)***

> 셀의 편집완료 시점에 수정된 값에 대해 Validation Check를 할 수 있도록 이벤트가 발생합니다.<br>
> Validation에 맞지 않다면 `ValidateFail(1)`로 설정하여 셀 편집 이전의 값으로 되돌립니다.



### Syntax
```javascript
function 오브젝트ID_OnEditValidation(Row, Col, Value) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|해당 셀의 Row Index|
|Col|`Long`|해당 셀의 Column Index|
|Value|`variant`|Format이 적용되지 않은 저장 시 사용되는 값|



### Example
```javascript
function mySheet_OnEditValidation(row, col, value) {
  if (mySheet.colSaveName(col) == "ITMS_CD") {
    if (value.indexOf("현행") > -1) {
      console.log("현행 정보값은 4/4분기 이후에 설정 가능");
      //값을 이전 값으로 되돌림
      mySheet.ValidateFail(1);
    }
  }
}
```

### See also
  * [VaildateFail method](/docs/funcs/core/ValidateFail)

### Since

|version|desc|
|---|---|
|7.0.0.0||