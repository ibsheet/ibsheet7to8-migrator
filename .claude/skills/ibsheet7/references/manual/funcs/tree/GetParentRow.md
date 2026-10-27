# GetParentRow ***(search method)***

> 대상 행의 바로 이전 레벨의 부모 행 Index를 확인 합니다.

### Syntax
```javascript
ObjId.GetParentRow(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|



### Returns
***Long, 부모 행의 Index***

### Example
```javascript
// Index가 4인 행의 부모행 확인
console.log('parentRow: ', mySheet.GetParentRow(4));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||