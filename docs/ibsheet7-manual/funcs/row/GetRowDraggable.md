# GetRowDraggable ***(row method)***

> 행의 마우스 드래그 가능 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetRowDraggable(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|



### Returns
***Boolean, 설정된 값***

### Example
```javascript
// 3행의 마우스 드래그 가능 여부를 확인
console.log("getRowDraggable:", mySheet.GetRowDraggable(3));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||