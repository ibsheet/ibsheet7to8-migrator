# SetRowFontColor ***(row method)***

> 행 전체의 글자색을 설정 합니다.

### Syntax
```javascript
ObjId.SetRowFontColor(Row,Color);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|
|Color|`String`|<span class="required">필수</span>|WebColor 색상 값|



### Returns
***none***

### Example
```javascript
// 1행의 글자색을 회색으로 설정
mySheet.SetRowFontColor(1, "192,192,192");

// 3행의 글자색을 빨강색으로 설정
mySheet.SetRowFontColor(3, "#FF0000");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||