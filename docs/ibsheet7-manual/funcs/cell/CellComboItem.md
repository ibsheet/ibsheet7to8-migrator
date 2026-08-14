# CellComboItem ***(cell method)***

> 특정 셀의 Combo 항목만 다른 경우 Combo항목을 개별 설정합니다. <br>
> 컬럼 전체의 콤보 항목은 `InitColumns` 함수를 이용하여 설정하고, 특정 셀만 항목이 다른 경우 이 함수를 이용합니다.<br>
> 2개행 이상의 단위데이터행 구조에서 Col 인자에 Index를 설정할 경우 첫번째 행의 해당 인덱스 셀에 대해서 처리를 하고 <br>
> SaveName으로 설정할 경우 설정한 행의 단위데이터행 내 해당 SaveName 셀에 대해서 처리합니다.


### Syntax
```javascript
ObjId.CellComboItem(Row, Col,info);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|특정 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|특정 셀의 Column Index 또는 SaveName|
|info|`Object`|<span class="required">필수</span>|변경할 Combo item 내용을 구분자 `"|"`로 연결된 문자열을 만들어 ComboCode와 ComboText로 값을 설정

### Returns
***none***

### Example
```javascript
// (2, 3) 셀의 콤보 항목 설정
mySheet.CellComboItem(2, 3, {
    "ComboCode": "A001|A002|A003|A004",
    "ComboText": "부장|과장|대리|사원"
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||