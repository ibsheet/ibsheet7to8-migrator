# SetCellVAlign ***(cell method)***

> 대상 셀의 상하 정렬값을 설정 합니다.<br>
> 셀에 대한 설정은 컬럼에 대한 설정보다 우선적으로 적용됩니다.

### Syntax
```javascript
ObjId.SetCellVAlign (Row, Col, valign);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|valign|`String`|<span class="required">필수</span>|셀 세로 정렬 설정값|

### Enum
  * valign

|Name|Description|
|----|----------|
|Top|상단 정렬|
|Middle|중앙 정렬|
|Bottom|하단 정렬|

### Returns
***none***

### Example
```javascript
// (2, 3) 셀을 상단 정렬 설정 처리
mySheet.SetCellVAlign(2, 3, 'Top');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||