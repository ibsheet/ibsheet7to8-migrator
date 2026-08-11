# SetTabBehavior ***(core method)***

> 포커스 상태에서 Tab 키 입력에 대한 동작 방법을 설정 합니다.

### Syntax
```javascript
ObjId.SetTabBehavior(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Number`|<span class="required">필수</span>|Tab 동작 방법 설정값<br>- `0` : 편집 가능한 셀에 대해서만 탭 이동 처리<br>- `1` : 모든 셀에 대해서 탭 이동 처리|




### Returns
***none***

### Example
```javascript
// 편집 가능한 셀에 대해서만 탭 이동 처리 모드 설정
mySheet.SetTabBehavior(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||