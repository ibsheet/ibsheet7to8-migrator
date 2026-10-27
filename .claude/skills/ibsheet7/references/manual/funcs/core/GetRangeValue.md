# GetRangeValue ***(core method)***

> 인자로 설정한 범위 영역에 대한 CellValue 값을 구분자로 연결한 문자열로 반환합니다.

### Syntax
```javascript
ObjId.GetRangeValue(startRow, startCol, endRow, endCol, ColSeparator, RowSeparator);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|startRow|`Long`|<span class="required">필수</span>|범위 시작 셀의 Row Index|
|startCol|`Long`|<span class="required">필수</span>|범위 시작 셀의 Column Index|
|endRow|`Long`|<span class="required">필수</span>|범위 종료 셀의 Row Index|
|endCol|`Long`|<span class="required">필수</span>|범위 종료 셀의 Column Index|
|ColSeparator|`String`|<span class="optional">선택</span>|컬럼과 컬럼 사이를 구분하는 구분자 (Default: `|`)|
|RowSeparator|`String`|<span class="optional">선택</span>|행과 행 사이를 구분하는 구분자 (Default: `^`)|



### Returns
***String, 현재 문자열값***

### Example
```javascript
// (2, 1) ~ (4, 5) 범위의 CellText 값 확인
var value = mySheet.GetRangeValue(2, 1, 4, 5),
    rows  = [],
    cols  = [];

rows = value.split("^");
for (var i = 0, maxRow = rows.length; i < maxRow; i++) {
  cols = rows[i].split("|");
  for (var j = 0, maxCol = cols.length; j < maxCol; j++) {
      console.log("cell[" + i + "," + j + "]", cols[j]);
  }
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||