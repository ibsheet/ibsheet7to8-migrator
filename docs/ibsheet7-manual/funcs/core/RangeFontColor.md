# RangeFontColor ***(core method)***

> 특정 범위의 셀 영역에 대한 폰트 색상을 설정 합니다.

### Syntax
```javascript
ObjId.RangeFontColor(StartRow, StartCol, EndRow, EndCol, Color);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|StartRow|`Number`|<span class="required">필수</span>|범위 시작 셀의 Row Index|
|StartCol|`Number`|<span class="required">필수</span>|범위 시작 셀의 Column Index|
|EndRow|`Number`|<span class="required">필수</span>|범위 종료 셀의 Row Index|
|EndCol|`Number`|<span class="required">필수</span>|범위 종료 셀의 Column Index|
|Color|`String`|<span class="required">필수</span>|설정할 색상값|




### Returns
***none***

### Example
```javascript
// (2, 2) ~ (3, 5) 영역의 폰트 색상을 blue로 설정
mySheet.RangeFontColor(2, 2, 3, 5, "blue");
mySheet.RangeFontColor(2, 2, 3, 5, "#0000ff");
```


### Since

|version|desc|
|---|---|
|7.0.13.16||