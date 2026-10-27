# SetRowDraggable ***(row method)***

> 행의 마우스 드래그 가능 여부를 설정 합니다.

### Syntax
```javascript
ObjId.SetRowDraggable(row, drag);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|row|`Long`|<span class="required">필수</span>|대상 행 Index|
|drag|`Boolean`|<span class="required">필수</span>|드래그 가능여부 설정 값 (Default: 1)|



### Returns
***none***

### Example
```javascript
// 3행의 Drag 가능여부 설정 (마우스 드래깅시 행 드래깅 가능여부 설정)
mySheet.SetRowDraggable(3, 1); // 드래그 가능
mySheet.SetRowDraggable(3, 0); // 드래그 불가
```


### Since

|version|desc|
|---|---|
|7.0.0.0||