# SetSumBackColor ***(sum method)***

> 합계 행의 배경색을 설정 합니다. <br>
> 동적인 변경이 불필요한 경우 테마의 GMSumCell(메인테마 기준) css 클래스를 이용하여 설정하는 것을 권장합니다.

### Syntax
```javascript
ObjId.SetSumBackColor(Color);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Color|`String`|<span class="required">필수</span>|합계행의 배경색|



### Returns
***none***

### Example
```javascript
// 합계 행의 배경색을 'red'로 설정
mySheet.SetSumBackColor('red');
mySheet.SetSumBackColor('#ff0000');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||