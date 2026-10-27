# GetComboInfo ***(cell method)***

> 대상 셀에 대한 콤보 정보를 확인 합니다.

### Syntax
```javascript
ObjId.GetComboInfo(Row,Col,Flag);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|

### Enum

  * Flag 속성값

|Name|Description|
|----|-----------|
|Text|콤보텍스트|
|Code|콤보코드|
|Color|콤보컬러|
|Disabled|콤보 선택 불가항목|
|SelectedIndex|선택된 콤보의Item Index|


### Returns
***String, 콤보 텍스트 또는 코드***

### Example
```javascript
// (2, 3) 셀의 ComboText 설정값 확인
console.log('comboText: ', mySheet.GetComboInfo(2, 3, 'text'));

// (2, 3) 셀의 ComboCode 설정값 확인
console.log('comboCode: ', mySheet.GetComboInfo(2, 3, 'code'));

// (2, 3) 셀의 ComboColor 설정값 확인
console.log('comboColor: ', mySheet.GetComboInfo(2, 3, 'color'));

// (2, 3) 셀의 SelectedIndex 확인
console.log('selectedIndex: ', mySheet.GetComboInfo(2, 3, 'selectedIndex'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||