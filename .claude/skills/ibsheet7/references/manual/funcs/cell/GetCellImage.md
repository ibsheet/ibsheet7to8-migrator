# GetCellImage ***(cell method)***

> 대상 셀에 설정되어 있는 이미지 경로를 확인 합니다.

### Syntax
```javascript
ObjId.GetCellImage(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|


### Returns
***String, 설정된 이미지 경로***

### Example
```javascript
// (2, 3)셀에 설정되어있는 이미지 경로 확인
console.log("imgPath:", mySheet.GetCellImage(2, 3));

// (2, 'sDeptName')셀의 편집가능 여부 확인
console.log("imgPath:", mySheet.GetCellImage(2, 'sDeptName'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||