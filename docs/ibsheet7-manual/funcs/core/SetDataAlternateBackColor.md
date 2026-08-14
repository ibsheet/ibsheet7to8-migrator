# SetDataAlternateBackColor ***(core method)***

> 데이터 영역의 짝수번째 행의 기본 배경색을 설정합니다. <br>
> `주의` [Cfg의 Alternate](/docs/props/PropertyList/Alternate) 옵션을 `1`로 설정해야 사용 가능합니다.<br>
> 설정하지 않은 경우 CSS의 ColorAlternate 클래스의 설정 값을 기본 값으로 처리합니다.<br>
> 데이터 영역에 셀병합이 적용되어 있는 경우 셀병합 적용전의 행을 기준으로 처리를 기본으로 하며, 앞컬럼 기준 셀병합인 경우에는 첫번째 기준컬럼을 기준으로 적용합니다.

### Syntax
```javascript
ObjId.SetDataAlternateBackColor(color);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|color|`String`|<span class="required">필수</span>|설정할 색상 값|



### Returns
***none***

### Example
```javascript
// Alternate 배경색을 "red"로 설정
mySheet.SetDataAlternateBackColor("red");
mySheet.SetDataAlternateBackColor("#ff0000");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||