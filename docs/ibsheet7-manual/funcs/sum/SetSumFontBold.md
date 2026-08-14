# SetSumFontBold ***(sum method)***

> 합계 행의 폰트에 bold 적용 여부를 설정합니다. <br>
> 동적인 변경이 불필요한 경우 테마의 GMSumCell(메인테마 기준) css 클래스를 이용하여 설정하는 것을 권장합니다.

### Syntax
```javascript
ObjId.SetSumFontBold(Bold);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Bold|`Boolean`|<span class="required">필수</span>|폰트 굵기 여부|



### Returns
***none***

### Example
```javascript
// 합계 행의 폰트에 bold 적용
mySheet.SetSumFontBold(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||