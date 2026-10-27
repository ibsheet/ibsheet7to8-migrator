# GetRowExpanded ***(search method)***

> 대상 행의 자식 노드의 펼침 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetRowExpanded(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|



### Returns
***Boolean, 행의 자식행들의 펼쳐짐 여부***

### Example
```javascript
// Index가 4인 행의 자식 노드 펼침 여부 확인
console.log('expaned: ', mySheet.GetRowExpanded(4));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||