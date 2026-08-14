# SetSelectionMode ***(core method)***

> 포커스 선택 모드를 설정합니다.

### Syntax
```javascript
ObjId.SetSelectionMode(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Number`|<span class="required">필수</span>|설정할 포커스 선택 모드<br>- `0` : 셀단위 선택<br>- `1` : 행단위 선택<br>- `3` : 행단위 선택 + crtl 키를 이용한 멀티 선택<br>- `4` : 행전체 선택, 행 전체에 대한 동일한 색상을 지정할 때 사용<br>- `5` : 행단위(앞컬럼 머지 영역 기준 또는 단위데이터행 영역 기준)선택 + crtl 키를 이용한 멀티 선택|



### Returns
***none***

### Example
```javascript
// 셀 단위 선택모드 설정
mySheet.SetSelectionMode(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||