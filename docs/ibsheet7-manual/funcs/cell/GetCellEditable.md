# GetCellEditable ***(cell method)***

> 대상 셀의 편집 가능 여부 속성값을 확인 합니다.<br>
> 행 또는 컬럼의 인자가 올바르지 않은 경우에는 별도 처리 없이 InvalidValue 설정 값을 반환 합니다.

### Syntax
```javascript
ObjId.GetCellEditable(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|


### Returns
***boolean***

### Example
```javascript
// (2, 3)셀의 편집가능 여부 확인
console.log("editable:", mySheet.GetCellEditable(2, 3));

// (2, 'sDeptName')셀의 편집가능 여부 확인
console.log("editable:", mySheet.GetCellEditable(2, 'sDeptName'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||