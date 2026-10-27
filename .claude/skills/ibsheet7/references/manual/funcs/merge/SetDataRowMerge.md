# SetDataRowMerge ***(merge method)***

> 데이터 영역의 모든 행에 대한 가로 셀 병합 허용 여부를 설정합니다.

### Syntax
```javascript
ObjId.SetDataRowMerge(Merge);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Merge|`Boolean`|<span class="required">필수</span>|머지 허용 여부 (Default: 0)|
|Editable|`Boolean`|<span class="optional">선택</span>||


### Returns
***none***

### Example
```javascript
//모든 데이터 행의 가로머지를 허용
mySheet.SetDataRowMerge(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||