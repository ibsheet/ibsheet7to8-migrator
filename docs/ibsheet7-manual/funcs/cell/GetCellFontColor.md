# GetCellFontColor ***(cell method)***

> 대상 셀의 폰트 색상을 확인 합니다. <br>
> 대상 셀에 폰트 색상 설정이 없는 경우 ''으로 반환 합니다.

### Syntax
```javascript
ObjId.GetCellFontColor(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|


### Returns
***String, 설정된 색상값***

### Example
```javascript
// (2, 3)셀의 폰트색상 확인
console.log("fontColor:", mySheet.GetCellFontColor(2, 3));

// (2, 'sDeptName')셀의 배경색 확인
console.log("fontColor:", mySheet.GetCellFontColor(2, 'sDeptName'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||