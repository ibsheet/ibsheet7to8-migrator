# GetEditText ***(core method)***

> 편집 중인 글자를 확인합니다.

### Syntax
```javascript
ObjId.GetEditText();
```

### Info
***none***



### Returns
***string, 편집 중인 값***

### Example
```javascript
function mySheet_OnKeyUp(row, col, keyCode, shift) {
  console.log("editingValue:", mySheet.GetEditText());
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||