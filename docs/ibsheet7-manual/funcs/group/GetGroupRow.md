# GetGroupRow ***(group method)***

> 대상 컬럼을 기준으로 생성된 그룹행을 확인 합니다.<br>
> 대상 그룹행의 Index를 구분자 `|`로 연결된 문자열로 반환 합니다.


### Syntax
```javascript
ObjId.GetGroupRow(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|대상 컬럼의 Index 또는 SaveName|


### Returns
***none***

### Example
```javascript
// SaveName이 "sDept"인 컬럼을 기준으로 생성된 그룹행 확인
console.log("GroupRow :", mySheet.GetGroupRow("sDept"));
```


### Since

|version|desc|
|---|---|
|7.0.13.22||