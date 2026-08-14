# SetAutoRowHeight ***(core method)***

> 데이터 행의 높이를 데이터에 맞게 자동으로 조정할지 여부를 설정 합니다.

### Syntax
```javascript
ObjId.SetAutoRowHeight(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Boolean`|<span class="required">필수</span>|높이 자동 조정 여부|



### Returns
***none***

### Example
```javascript
// 데이터의 행높이를 25픽셀로 고정 한다.
mySheet.SetDataRowHeight(25);
mySheet.SetAutoRowHeight(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||