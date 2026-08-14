# GetChildNodeCount ***(search method)***

> 트리구조에서 대상 행의 바로 다음 레벨의 자식 행의 개수를 확인 합니다.

### Syntax
```javascript
ObjId.GetChildNodeCount(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|



### Returns
***Integer, 하위 노드의 개수***

### Example
```javascript
// Index가 4인 행의 자식 노드 개수 확인
console.log('childRowCount: ', mySheet.GetChildNodeCount(4));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||