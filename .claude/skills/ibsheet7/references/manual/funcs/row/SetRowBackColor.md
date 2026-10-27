# SetRowBackColor ***(row method)***

> 행 전체의 배경색을 설정 합니다. <br>
> 색성 설정은 WebColor 값을 이용하여 설정하며, 데이터 영역의 배경색만 처리합니다.<br>
> 행이 존재하지 않을 경우 별도처리 없이 `-1` 을 반환 합니다.

### Syntax
```javascript
ObjId.SetRowBackColor(Row, BackColor);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|
|BackColor|`String`|<span class="required">필수</span>|WebColor 색상 값|



### Returns
***none***

### Example
```javascript
// 1행의 배경색을 회색으로 설정
mySheet.SetRowBackColor(1, "#C0C0C0");

// 3행의 배경색을 빨강색으로 설정
mySheet.SetRowBackColor(3, "#FF0000");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||