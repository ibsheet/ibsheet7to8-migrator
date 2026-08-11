# SetHtmlHeaderValue ***(cell method)***

> 헤더의 HTML 타입을 적용합니다.<br>
> 해당 셋팅값은 GetCellValue 시에 확인할수 없으며, 기존 HeaderText 값이 반환됩니다.<br>
> 설정된 태그값을 확인하기 위해서는 [GetHtmlHeaderValue](/docs/funcs/cell/GetHtmlHeaderValue) 메소드를 통해 확인해야 합니다.<br>
> `주의` HTML 태그가 설정된 헤더셀은 헤더 소트가 적용되지 않습니다.

### Syntax
```javascript
ObjId. SetHtmlHeaderValue(Row, Col, Value, HeaderType);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Value|`String`|<span class="required">필수</span>|셀의 값|
|HeaderType|`boolean`|<span class="optional">선택</span>|0 : Html 타입 (`Default`), 1 : 기존 Text|


### Returns
***none***

### Example
```javascript
// (0, 0) 셀의 타입을 HTML로 바꾸며 값을 checkbox로 변경한다.
mySheet.SetHtmlHeaderValue(0, 0, '< input type=checkbox >');
```


### Since

|version|desc|
|---|---|
|7.0.13.68|기능 추가|