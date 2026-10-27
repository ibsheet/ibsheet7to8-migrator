# SetDataMerge ***(merge method)***

> 데이터 영역에 대해서 셀 병합 처리를 합니다.

### Syntax
```javascript
ObjId.SetDataMerge(force);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|force|`Boolean`|<span class="optional">선택</span>|기존 병합 정보를 지울지 여부|


### Returns
***none***

### Example
```javascript
//기존 병합 정보를 유지
mySheet.SetDataMerge(0);
```


### Since

|version|desc|
|---|---|
|7.0.1.0||