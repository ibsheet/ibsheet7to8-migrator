# SetSumFontColor ***(sum method)***

> 합계 행의 폰트 색상을 설정합니다.<br>
> 동적인 변경이 불필요한 경우 테마의 GMSumCell(메인테마 기준) css 클래스를 이용하여 설정하는 것을 권장합니다.

### Syntax
```javascript
ObjId.SetSumFontColor(Color);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Color|`String`|<span class="required">필수</span>|설정할 폰트 색상|



### Returns
***none***

### Example
```javascript
// 합계 행의 폰트 색상을 'red'로 설정
mySheet.SetSumFontColor('red');
mySheet.SetSumFontColor('#ff0000');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||