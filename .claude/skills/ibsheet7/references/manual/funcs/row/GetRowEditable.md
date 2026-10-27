# GetRowEditable ***(row method)***

> 행의 Edit 가능 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetRowEditable(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|



### Returns
***Boolean, Edit 가능 여부***

### Example
```javascript
// 1행의 Edit 가능 여부를 확인
console.log("editable:", mySheet.GetRowEditable(1));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||