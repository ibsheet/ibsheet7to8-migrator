# PopupButtonImage ***(cell method)***

> 대상 셀의 팝업 버튼 이미지를 설정 합니다.

### Syntax
```javascript
ObjId.PopupButtonImage(Row, Col, Image);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Image|`Long or String`|<span class="required">필수</span>|설정할 이미지 Url 또는 이미지인덱스|

### Returns
***none***

### Example
```javascript
// (2, 3) 셀의 팝업 버튼을 달력 이미지로 설정
mySheet.PopupButtonImage(2, 3, 'calendar.gif');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||