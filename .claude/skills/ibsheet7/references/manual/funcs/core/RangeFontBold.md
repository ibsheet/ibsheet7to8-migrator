# RangeFontBold ***(core method)***

> 특정 범위의 셀 영역에 bold 적용 여부를 설정 합니다.

### Syntax
```javascript
ObjId.RangeFontBold(StartRow, StartCol, EndRow, EndCol, Bold);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|StartRow|`Number`|<span class="required">필수</span>|범위 시작 셀의 Row Index|
|StartCol|`Number`|<span class="required">필수</span>|범위 시작 셀의 Column Index|
|EndRow|`Number`|<span class="required">필수</span>|범위 종료 셀의 Row Index|
|EndCol|`Number`|<span class="required">필수</span>|범위 종료 셀의 Column Index|
|Bold|`Boolean`|<span class="required">필수</span>|폰트 볼드 여부|




### Returns
***none***

### Example
```javascript
// (2, 2) ~ (3, 5) 영역의 폰트에 bold 적용
mySheet.RangeFontBold(2, 2, 3, 5, 1);
```


### Since

|version|desc|
|---|---|
|7.0.13.16||