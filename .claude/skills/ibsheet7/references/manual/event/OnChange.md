# OnChange ***(event)***

> 셀의 값을 편집 완료하고, 기존 값이 변경되었을 때 이벤트가 발생합니다.<br>
> 사용자의 값 변경이외에도 `CellValue` 함수를 이용하거나 헤더 영역의 전체 선택 CheckBox가 변경되었을 때 또는 `CheckAll` 함수를 이용한 경우 <br>
> 각 데이터 행 단위로 변경된 CheckBox에 대해서 이벤트가 발생합니다. <br>
> CellValue 함수의 `flag` 인자의 값이 `0` 일 경우는 이 이벤트가 발생하지 않습니다.


### Syntax
```javascript
function 오브젝트ID_OnChange(Row, Col, Value, OldValue, RaiseFlag) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|해당 셀의 Row Index|
|Col|`Long`|해당 셀의 Column Index|
|Value|`String`|변경된 값,<br>Format이 적용되지 않은 저장 시 사용되는 값|
|OldValue|`String`|변경 이전의 값|
|RaiseFlag|`Integer`|이벤트 발생 옵션 (0: 사용자 편집, 1: 메소드, 2: Paste(ctrl+v 붙여넣기))|



### Example
```javascript
function mySheet_OnChange(Row, Col, Value, OldValue, RaiseFlag) {
  if(Col == 3 && mySheet.GetCellValue(Row, 2) == ‘원화' && Value == ‘9') {
    alert("원화 일 때 코드는 10을 선택하여야 합니다.");
  }
}
```

### See also
  * [GetCellValue method](/docs/funcs/cell/GetCellValue)
  * [SetCellValue method](/docs/funcs/cell/SetCellValue)
  * [CheckAll method](/docs/funcs/col/CheckAll)

### Since

|version|desc|
|---|---|
|7.0.0.0||