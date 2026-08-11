# SetCellImageStyle ***(cell method)***

> 대상 셀에 좌측 또는 우측에 이미지를 설정 합니다.<br>
> 데이터 타입이 `Text, Int, Float, AutoSum` 인 경우에만 설정이 가능 합니다.

### Syntax
```javascript
ObjId.SetCellImageStyle(Row, Col, Style);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Style|`Object`|<span class="required">필수</span>|셀의 이미지관련 속성 객체|


### Enum
  * Style 객체

|Name|Type|Description|
|----|-----|-----------|
|Image|`String or Long`|이미지의 경로 또는 Index|
|ImgAlign|`String`|이미지의 표시 위치|
|ImgWidth|`Integer`|이미지의 너비|
|ImgHeight|`Integer`|이미지의 높이|


### Returns
***none***

### Example
```javascript
// (2, 3) 셀의 우측에 이미지 설정
mySheet.SetCellImageStyle(2, 3, {
    'Image': 'test.gif',
    'ImgAlign': 'Right'
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||