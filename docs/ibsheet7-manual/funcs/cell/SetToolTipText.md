# SetToolTipText ***(cell method)***

> 대상 셀에 툴팁 문자열을 설정 합니다.

### Syntax
```javascript
ObjId.SetToolTipText(Row, Col, ToolTip);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|ToolTip|`String`|<span class="required">필수</span>|풍선 도움말 설정 값|


### Returns
***none***

### Example
```javascript
// (2, 3)셀에 툴팁을 'my tooltip' 문자열로 설정
mySheet.SetToolTipText(2, 3, 'my tooltip');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||