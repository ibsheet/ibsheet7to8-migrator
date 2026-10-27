# GetCellProperty ***(cell method)***

> 대상 셀의 속성 설정 값을 확인 합니다.<br>
> 대상 셀이 헤더 내의 셀인 경우 컬럼에 대한 속성 설정 값을 반환합니다.

### Syntax
```javascript
ObjId.GetCellProperty(Row, Col, PropName);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|PropName|`String`|<span class="required">필수</span>|확인하고자 하는 속성명|

### Returns
***String/ Boolean/ Integer, 설정한 컬럼의 속성값***

### Example
```javascript
// (2, 3)셀의 Format 속성 설정값 확인
console.log("cellFormat:", mySheet.GetCellProperty(2, 3, 'Format'));

// Index가 3인 컬럼의 Format 속성 설정값 확인
console.log("colFormat:", mySheet.GetCellProperty(0, 3, 'Format'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||