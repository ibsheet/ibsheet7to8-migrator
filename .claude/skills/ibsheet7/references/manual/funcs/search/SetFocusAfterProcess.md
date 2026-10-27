# SetFocusAfterProcess ***(search method)***

> 데이터 로드 후 포커스를 데이터 영역의 첫번째 셀에 설정 할지 여부를 설정 합니다.

### Syntax
```javascript
ObjId.SetFocusAfterProcess(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`String`|<span class="required">필수</span>|포커스 설정 여부 (Default: 1)|


### Returns
***none***

### Example
```javascript
// 데이터 로드 후 포커스를 설정하지 않도록 설정
mySheet.SetFocusAfterProcess(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||