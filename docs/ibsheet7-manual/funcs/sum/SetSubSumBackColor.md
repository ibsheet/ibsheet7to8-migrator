# SetSubSumBackColor ***(sum method)***

> 소계 행의 배경색을 설정 합니다.<br>
> 동적인 변경이 불필요한 경우 테마의 GMSubSumCell(메인테마 기준) css 클래스를 이용하여 설정하는 것을 권장 합니다.

### Syntax
```javascript
ObjId.SetSubSumBackColor(Color, Index);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Color|`String`|<span class="required">필수</span>|설정하고자 하는 WebColor 값|
|Index|`Number`|<span class="optional">선택</span>|- 소계행이 여러개인 경우 원하는 n번째 소계행의 배경 색상을 지정<br>- 인자는 0부터 시작, 인자가 없으면 소계행 전체 적용|



### Returns
***none***

### Example
```javascript
// 소계 행의 배경색을 'red'로 설정
mySheet.SetSubSumBackColor('red');
mySheet.SetSubSumBackColor('#ff0000');

// 첫번째 소계그룹의 소계행 배경색을 'red' , 두번째 소계그룹의 소계행 색상은 노란색 설정
mySheet.SetSubSumBackColor('red',0);
mySheet.SetSubSumBackColor('#ffff00',1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.144|소계행이 여러 개일 때 원하는 위치의 소계행의 색상을 지정해줄 수 있는 Index Parameter 추가|