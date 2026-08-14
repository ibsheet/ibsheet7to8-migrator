# GetNextSiblingRow ***(search method)***

> 대상 행의 동일 부모, 동일 레벨 상에서의 다음 행을 확인 합니다.

### Syntax
```javascript
ObjId.GetNextSiblingRow(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|



### Returns
***Number, 다음 행의 Index***

### Example
```javascript
// Index가 4인 행의 동일 부모, 동일 레벨 상에서의 다음 행 확인
console.log('nextRow: ', mySheet.GetNextSiblingRow(4));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||