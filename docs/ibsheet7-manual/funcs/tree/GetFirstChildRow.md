# GetFirstChildRow ***(search method)***

> 대상 행의 첫번째 자식 행을 확인 합니다.

### Syntax
```javascript
ObjId.GetFirstChildRow(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|



### Returns
***Long, 첫번째 자식 행의 Index***

### Example
```javascript
// Index가 4인 행의 첫번째 자식행의 Index 확인
console.log('firstChild: ', mySheet.GetFirstChildRow(4));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||