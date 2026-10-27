# FitSize ***(core method)***

> 모든 행의 높이와 컬럼의 너비를 재조정합니다. <br>
> `rowHeight` 인자가 1인 경우 모든 행의 높이를 데이터의 높이에 맞게 재조정하고, `colWidth` 인자가 1인 경우 모든 컬럼의 너비를 컬럼 내의 가장 넓은 글자의 너비에 맞게 재조정합니다.

### Syntax
```javascript
ObjId.FitSize(RowHeight, ColumnWidth);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|RowHeight|`Boolean`|<span class="required">필수</span>|행 높이 변경 여부|
|ColumnWidth|`Boolean`|<span class="required">필수</span>|컬럼 너비 변경 여부|



### Returns
***none***

### Example
```javascript
// 데이터에 맞게 행의 높이와 컬럼너비 재조정
mySheet.FitSize(1, 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||