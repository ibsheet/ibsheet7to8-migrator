# SetDataBackColor ***(core method)***

> 데이터 영역 행의 기본 배경색을 설정 합니다. <br>
> 데이터 행의 짝수번째와 홀수번째를 번갈아 가며 색상을 다르게 표시할 때 사용하며, 데이터 행의 배경색은 이 속성과 [SetDataAlternateBackColor](/docs/funcs/core/SetDataAlternateBackColor) 에 의해 설정 됩니다. <br>
> 색상 설정은 WebColor 값을 이용하여 설정 합니다.

### Syntax
```javascript
ObjId.SetDataBackColor(Color);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Color|`String`|<span class="required">필수</span>|설정할 색상 값|


### Returns
***none***

### Example
```javascript
// 데이터 행의 배경색을 흰색으로 설정
mySheet.SetDataBackColor("#FFFFFF");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
