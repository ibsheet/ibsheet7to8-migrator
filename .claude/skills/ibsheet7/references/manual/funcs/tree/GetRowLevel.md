# GetRowLevel ***(search method)***

> 대상 행의 트리 레벨을 확인 합니다.

### Syntax
```javascript
ObjId.GetRowLevel(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|



### Returns
***Integer, 현재 행의 트리 레벨***

### Example
```javascript
// Index가 4인 행의 트리 레벨 확인
console.log('treeLevel: ', mySheet.GetRowLevel(4));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||