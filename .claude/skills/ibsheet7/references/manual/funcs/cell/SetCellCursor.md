# SetCellCursor ***(cell method)***

> 대상 셀의 마우스 오버시 커서 모양을 설정합니다.

### Syntax
```javascript
ObjId.SetCellCursor(Row, Col, Cursor);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Cursor|`String`|<span class="required">필수</span>|마우스 모양 설정|

### Enum
  * Cursor

|Name|Description|
|----|-----------|
|default|기본 모양|
|pointer|포인터 모양

### Returns
***none***

### Example
```javascript
// (2, 3) 셀의 마우스 커서포인터를 손가락 모양으로 변경한다.
mySheet.SetCellCursor(2, 3, 'Pointer');
```


### Since

|version|desc|
|---|---|
|7.0.13.60||