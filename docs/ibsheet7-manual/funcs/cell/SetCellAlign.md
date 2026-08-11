# SetCellAlign ***(cell method)***

> 대상 셀의 좌우 정렬값을 설정 합니다. <br>
> 셀에 대한 설정은 컬럼에 대한 설정보다 우선적으로 적용됩니다.

### Syntax
```javascript
ObjId.SetCellAlign(Row, Col, Align);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Align|`String`|<span class="required">필수</span>|정렬 값|

### Enum
  * Align

|Name|Description|
|----|-----------|
|Left|좌측 정렬|
|Center|중앙 정렬|
|Right|우측 정렬|

### Returns
***none***

### Example
```javascript
// (2, 3) 셀을 우측 정렬 설정 처리
mySheet.SetCellAlign(2, 3, 'Right');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||