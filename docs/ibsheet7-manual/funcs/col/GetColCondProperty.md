# GetColCondProperty ***(col method)***

> 대상 컬럼의 조건에 따른 스타일 설정에 대한 조건 값을 확인 합니다.

### Syntax
```javascript
ObjId.GetColCondProperty(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|


### Returns
***String, 설정한 조건***

### Example
```javascript
// Index가 3인 컬럼의 조건 값 확인
console.log("cond:", mySheet.GetColCondProperty(3));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||