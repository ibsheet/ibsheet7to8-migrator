# SetSheetHeight ***(core method)***

> 시트 전체 높이를 설정합니다.

### Syntax
```javascript
ObjId.SetSheetHeight(height, force);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|height|`Number`|<span class="required">필수</span>|설정할 높이 값 (단위:px)|
|force|`Boolean`|<span class="optional">선택</span>|유효성 체크 없이 설정할지 여부 (Default: 0)|



### Returns
***none***

### Example
```javascript
// 시트의 전체 높이를 500픽셀로 설정
mySheet.SetSheetHeight(500);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||