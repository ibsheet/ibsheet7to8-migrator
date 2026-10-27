# SetFocusEditMode ***(core method)***

> 편집 가능한 셀이 선택상태가 되었을때 편집모드로 변경할지 여부를 설정 합니다.

### Syntax
```javascript
ObjId.SetFocusEditMode(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Number`|<span class="required">필수</span>|설정값<br>- `0` : 포커스상태 유지<br>- `1` : 모든 컬럼타입에 대한 편집모드 변경<br>- `2` : `Combo`, `ComboEdit` 타입 컬럼만 포커스 상태 유지, 그 외 컬럼타입 편집모드 변경|



### Returns
***none***

### Example
```javascript
// 포커스시 편집모드 변경 모드 설정
mySheet.SetFocusEditMode(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||