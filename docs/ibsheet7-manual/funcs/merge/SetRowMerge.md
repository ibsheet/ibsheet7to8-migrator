# SetRowMerge ***(merge method)***

> 대상 행의 가로 셀 병합 허용 여부를 설정 합니다. <br>
> 가로 머지가 가능하기 위해서는 전체 머지가 가능하여야 하고, 해당 데이터 행이 존재해야 합니다.

### Syntax
```javascript
ObjId.SetRowMerge(Row, Merge);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 행의 Row Index|
|Merge|`Boolean`|<span class="required">필수</span>|가로머지 허용 여부|


### Returns
***none***

### Example
```javascript
// 첫번째 행의 가로 머지를 허용하도록 설정
mySheet.SetRowMerge(1, 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
