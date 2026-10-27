# GetRowHeight ***(row method)***

> 대상 행의 높이를 확인 합니다.

### Syntax
```javascript
ObjId.GetRowHeight(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|



### Returns
***Number, 행의 높이 (단위:px)***

### Example
```javascript
// Index가 3인 행의 높이 확인
console.log("rowHeight:", mySheet.GetRowHeight(3));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||