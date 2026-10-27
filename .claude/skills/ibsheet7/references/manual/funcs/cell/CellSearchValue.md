# CellSearchValue ***(cell method)***

> 셀이 조회되었던 당시의 값을 확인합니다.<br>
> 2개행 이상의 단위데이터행 구조에서 Col 인자에 Index를 설정할 경우 첫번째 행의 해당인덱스 셀에 대해서 처리를 하고 <br>
> SaveName으로 설정할 경우 설정한 행의 단위데이터행 내 해당 SaveName 셀에 대해서 처리합니다.<br>
> 해당 행이 입력된 행이거나 다음과 같은 Type일때, 값은 공백이 됩니다. `Status, DelCheck, Seq, Image`


### Syntax
```javascript
ObjId.CellSearchValue(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|

### Returns
***String, 조회당시 셀 값***

### Example
```javascript
// 조회되었던 셀 값을 확인하고, 해당 셀 값을 원래 값으로 되돌린다.
var OrgValue = mySheet.CellSearchValue(Row, Col);

if(OrgValue != mySheet.GetCellValue(Row, Col)) {
    mySheet.SetCellValue(Row, Col, OrgValue);
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||