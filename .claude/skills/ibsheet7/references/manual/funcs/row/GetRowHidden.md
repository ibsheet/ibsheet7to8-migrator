# GetRowHidden ***(row method)***

> 대상 행의 숨김 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetRowHidden(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long or String`|<span class="required">필수</span>|특정 행의 Row Index 혹은 구분자 `|`로 연결된 문자열|



### Returns
***Boolean, 설정 값***

### Example
```javascript
// 1행의 숨김 여부를 확인
console.log("rowhidden:", mySheet.GetRowHidden(1));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||