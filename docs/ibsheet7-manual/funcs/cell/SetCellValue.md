# SetCellValue ***(cell method)***

> 대상 셀에 값을 설정 합니다.

### Syntax
```javascript
ObjId.SetCellValue(Row, Col, Value, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Value|`String`|<span class="required">필수</span>|셀에 설정할 값|
|Opt|`Object`|<span class="optional">선택</span>|설정하고자 하는 속성 정보 객체|
|Opt.event|`Boolean`|<span class="optional">선택</span>|OnChange 이벤트 발생 여부 (Default: 1)|
|Opt.endEdit|`Boolean`|<span class="optional">선택</span>|편집 종료 여부 (Default: 1)|
|Opt.nocalc|`Boolean`|<span class="optional">선택</span>|소계/누계/합계 재계산 여부 (Default: 0)|


### Returns
***none***

### Example
```javascript
//상태 셀을 "삭제" 상태로 설정
mySheet.SetCellValue(1, 0, "D");

//CheckBox에 체크되도록 설정
mySheet.SetCellValue(1, 1, 1);

//숫자 셀에 값 설정, 표시되는 값은 12,345임
mySheet.SetCellValue(1, 2, 12345);

//콤보 셀에 값 설정, 표시되는 값은 콤보 텍스트 임
mySheet.SetCellValue(1, 3, "01");

//날짜 셀에 값 설정, 표시되는 값은 "2011/07/15" 임
mySheet.SetCellValue(1, 4, "2011/07/15");

//소수점 숫자 셀에 값 설정, 소수점 3자리이면 표시되는 값은 123.450 임
// OnChange 이벤트 발생
mySheet.SetCellValue(1,5, 123.450);

// OnChange 이벤트 발생하지 않음
mySheet.SetCellValue(1,5, 123.450, 0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.102|Opt 인자 구조 변경. event, endEdit, nocalc 인자 속성 추가|