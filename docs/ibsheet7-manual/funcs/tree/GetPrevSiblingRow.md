# GetPrevSiblingRow ***(search method)***

> 대상 행의 동일 부모, 동일 레벨 상에서의 이전 행을 확인 합니다.

### Syntax
```javascript
ObjId.GetPrevSiblingRow(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|



### Returns
***Long, 동일 레벨상 이전 행의 Index***

### Example
```javascript
// 6번째 행의 동일레벨 상의 이전 행을 확인
var previous = mySheet.GetPrevSiblingRow(6);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||