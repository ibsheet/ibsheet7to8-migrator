# GetHeaderCheck ***(core method)***

> 헤더의 전체 체크박스 설정 값을 확인합니다.

### Syntax
```javascript
ObjId.GetHeaderCheck(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|
|Col|`Long or String`|<span class="required">필수</span>|대상 컬럼의 Index 또는 SaveName|



### Returns
***Boolean, 현재 설정 값***

### Example
```javascript
// (0, 3) 헤더 셀의 체크박스 설정값 확인
console.log("checkedValue:", mySheet.GetHeaderCheck(0, 3));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||