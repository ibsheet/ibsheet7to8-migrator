# ReturnCellData ***(cell method)***

> 대상 셀의 값을 조회 당시의 값으로 되돌리는 메소드입니다.

### Syntax
```javascript
ObjId.ReturnCellData(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|


### Returns
***none***

### Example
```javascript
// (2, 3)셀의 값을 최초 조회 값으로 변경
mySheet.ReturnCellData(2, 3);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||