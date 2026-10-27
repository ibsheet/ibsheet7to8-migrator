# GetHeaderCheckValue ***(core method)***

> 특정 컬럼에 대한 헤더 행의 전체 체크 값을 확인 합니다.

### Syntax
```javascript
ObjId.GetHeaderCheckValue(col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|col|`Long`|<span class="required">필수</span>|특정 컬럼의 Index|



### Returns
***String, 전체 체크 설정 값***

### Example
```javascript
// Index가 3인 CheckBox 컬럼 타입에 대한 헤더의 전체체크 값 확인
console.log("checkValue:", mySheet.GetHeaderCheckValue(3));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||