# SetHighlightAfterSort ***(core method)***

> sort 처리 후 이전 포커스 유지 모드를 설정합니다.

### Syntax
```javascript
ObjId.SetHighlightAfterSort(focus);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|focus|`Number`|<span class="required">필수</span>|포커스 유지 모드<br>- `0` : 포커스 클리어<br>- `1` : 이전 포커스 유지 및 해당 셀의 위치로 이동<br>- `2` : 이전 포커스 유지 및 scroll 위치 초기화|



### Returns
***none***

### Example
```javascript
// sort 처리 후 포커스 제거
mySheet.GetHighlightAfterSort(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||