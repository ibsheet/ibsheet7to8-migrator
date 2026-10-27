# SetBasicImeMode ***(core method)***

> Edit 가능한 모든 데이터 셀에서 포커스 시 한/영 키보드 상태를 설정합니다. `(IE 브라우저만 지원)`

### Syntax
```javascript
ObjId.SetBasicImeMode(mode)
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Number`|<span class="required">필수</span>|한/영 키보드 상태<br>- 0 : 마지막 상태 유지<br>- 1 : 한글 입력 모드<br>- 2 : 영문 입력 모드|



### Returns
***none***

### Example
```javascript
// 포커스시 항상 한글 입력 모드로 설정
mySheet.SetBasicImeMode(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||