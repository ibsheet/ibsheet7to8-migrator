# SetCumulateBackColor ***(sum method)***

> 누계 행의 배경색을 설정 합니다. <br>
> 동적인 변경이 불필요한 경우 테마의 GMCumulateCell(메인테마 기준) css 클래스를 이용하여 설정하는 것을 권장 합니다.

### Syntax
```javascript
ObjId.SetCumulateBackColor(color);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|color|`String`|<span class="required">필수</span>|누계 행의 배경색|



### Returns
***none***

### Example
```javascript
// 누계 행의 배경색을 'red'로 설정
mySheet.SetCumulateBackColor('red');
mySheet.SetCumulateBackColor('#ff0000');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||