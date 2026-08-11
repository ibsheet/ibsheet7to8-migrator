# SetCellImage ***(cell method)***

> 대상 셀에 이미지를 설정 합니다.

### Syntax
```javascript
ObjId.SetCellImage(Row, Col, Image)
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Image|`String`|<span class="required">필수</span>|실제 이미지 Index 또는 경로|

### Returns
***none***

### Example
```javascript
// (2, 3) 셀에 이미지 경로 설정
mySheet.SetCellImage(2, 3, './img/dept.gif');

// (2, 3) 셀에 Index가 2인 이미지 설정
mySheet.SetCellImage(2, 3, 2);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||