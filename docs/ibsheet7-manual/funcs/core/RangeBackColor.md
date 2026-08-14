# RangeBackColor ***(core method)***

> 특정 범위의 셀 영역에 대한 배경색을 설정 합니다.

### Syntax
```javascript
ObjId.RangeBackColor(StartRow, StartCol, EndRow, EndCol, Color);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|StartRow|`Number`|<span class="required">필수</span>|범위 시작 셀의 Row Index|
|StartCol|`Number`|<span class="required">필수</span>|범위 시작 셀의 Column Index|
|EndRow|`Number`|<span class="required">필수</span>|범위 종료 셀의 Row Index|
|EndCol|`Number`|<span class="required">필수</span>|범위 종료 셀의 Column Index|
|Color|`String`|<span class="required">필수</span>|WebColor|




### Returns
***none***

### Example
```javascript
// (2, 2) ~ (3, 5) 영역의  셀 배경색을 "red"로 설정
mySheet.RangeBackColor(2, 2, 3, 5, "red");
mySheet.RangeBackColor(2, 2, 3, 5, "#ff0000");
```


### Since

|version|desc|
|---|---|
|7.0.13.16||