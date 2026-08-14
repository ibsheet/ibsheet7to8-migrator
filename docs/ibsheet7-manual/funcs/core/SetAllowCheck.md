# SetAllowCheck ***(core method)***

> 사용자가 체크박스의 값 변경시, 값의 변경을 수용할 지의 여부를 설정합니다.

### Syntax
```javascript
ObjId.SetAllowCheck(allow);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|allow|`Boolean`|<span class="required">필수</span>|값의 변경 수용여부 (Default: 1)|



### Returns
***none***

### Example
```javascript
// 체크박스의 값 변경을 허용하지 않도록 설정
mySheet.SetAllowCheck(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||