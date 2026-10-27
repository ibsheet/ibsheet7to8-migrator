# SetRangeText ***(core method)***

> 특정 영역의 셀값을 Format이 적용된 형태로 화면에 보여지는 값 그대로 설정합니다.

### Syntax
```javascript
ObjId.SetRangeText(sData, startRow, startCol, endRow, endCol, colSeparator, rowSeparator);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|sData|`String`|<span class="required">필수</span>|문자열|
|startRow|`Long`|<span class="required">필수</span>|범위 시작 셀의 Row Index|
|startCol|`Long`|<span class="required">필수</span>|범위 시작 셀의 Column Index|
|endRow|`Long`|<span class="required">필수</span>|범위 종료 셀의 Row Index|
|endCol|`Long`|<span class="required">필수</span>|범위 종료 셀의 Column Index|
|ColSeparator|`String`|<span class="optional">선택</span>|컬럼과 컬럼 사이를 구분하는 구분자. (Default: `|`)|
|RowSeparator|`String`|<span class="optional">선택</span>|행과 행 사이를 구분하는 구분자. (Default: `^`)|



### Returns
***none***

### Example
```javascript
// (2, 1) ~ (4, 2) 범위의 셀 값을 (5, 1) ~ (7, 2) 범위에 복사
var value = mySheet.GetRangeText(2, 1, 4, 2);
mySheet.SetRangeText(value, 5, 1, 7, 2);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||