# SetMouseToolTipText ***(core method)***

> 마우스 커서의 위치에 표시할 툴팁 문자열을 설정 합니다.

### Syntax
```javascript
ObjId.SetMouseToolTipText(text);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|text|`String`|<span class="required">필수</span>|설정할 문자열|



### Returns
***none***

### Example
```javascript
// 마우스의 좌표를 툴팁으로 설정
function mySheet_OnMouseMove(button, shift, x, y) {
  var tip = "pos: " + x + "," + y;
  mySheet.SetMouseToolTipText(tip);
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||