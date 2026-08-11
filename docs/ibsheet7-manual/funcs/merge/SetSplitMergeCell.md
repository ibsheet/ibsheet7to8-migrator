# SetSplitMergeCell ***(merge method)***

> 대상 셀이 포함된 셀 병합 영역을 취소(분할) 처리 합니다. <br>
> 셀 병합 취소(분할) 처리시 각 셀의 값은 `병합 이전의 값` 으로 처리 됩니다.

### Syntax
```javascript
ObjId.SetSplitMergeCell(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|강제머지할 셀의 Row Index|
|Col|`Long`|<span class="required">필수</span>|강제머지할 셀의 Column Index|


### Returns
***none***

### Example
```javascript
// (2, 3) 셀이 포함된 셀 병합 영역에 대한 병합 취소 처리
mySheet.SetSplitMergeCell(2, 3);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||