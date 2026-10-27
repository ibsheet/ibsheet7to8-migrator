# GetHtmlHeaderValue ***(cell method)***

> 헤더가 HTML 타입일때, 설정된 태그값을 가져옵니다.

### Syntax
```javascript
ObjId. GetHtmlHeaderValue(Row,Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|


### Returns
***String, 설정된 태그값***

### Example
```javascript
// (0, 0) Html 타입의 헤더셀의 값을 가져온다.
mySheet.GetHtmlHeaderValue(0, 0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||