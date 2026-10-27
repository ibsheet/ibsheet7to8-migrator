# ShowFooterRow ***(row method)***

> 그리드 하단에 고정되는 사용자 정의 행을 설정합니다.<br>
> data 인자는 JSON 형식의 조회 데이터 구조를 사용합니다.<br>
> 형식은 `Key:Value` 형태이며, Key는 컬럼 초기화 구성시 설정한 SaveName, Value는 해당 셀의 값이 됩니다.<br>
> 속성은 Key 값을 초기화시 설정된 SaveName과 속성명을 `#` 로 구분하여 구성해서 사용합니다. **Ex ) SaveName#Type** <br>
> Type 은 `Text`, `Int`, `Float` 의 데이터타입만 허용되고, 기타 속성에 대한 타입 및 설정은 [InitColumns](/docs/funcs/init/InitColumns) 의 속성 설명을 참고 바랍니다.

### Syntax
```javascript
ObjId.ShowFooterRow(Data);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Data|`Object or Array`|<span class="required">필수</span>|Footer 설정 객체|


### Enum

  * Data

|Name|Description|
|----|-----------|
|**Type**|데이터타입 (Text, Int, Float)|
|**Align**|좌우 정렬 값|
|**RowSpan**|RowSpan 범위 값|
|**ColSpan**|ColSpan 범위 값|
|**FontColor**|폰트색상|
|**FontBold**|폰트볼드|
|**BackColor**|셀 배경색|
|**Format**|포멧설정|
|**PointCount**|실수 형태의 데이터 타입에서 소수점 자리수|
|**MultiLineText**|Text 형태의 데이터 타입에서의 다중 라인 입력 허용 여부|



### Returns
***none***

### Example
```javascript
// 하단 고정행을 2개로 만들며, TEXT_DATA 컬럼의 경우 2행, 2열의 머지를 한 형태로 행을 생성
mySheet.ShowFooterRow([
  {"SEQ":"순번", "SEQ#Type":"Int", "TEXT_DATA":"홍길동", "TEXT_DATA#BackColor":"blue", "TEXT_DATA#Align":"Center", "TEXT_DATA#RowSpan":2, "TEXT_DATA#ColSpan":2,"TEXT_DATA#MultiLineText":1, "IMAGE_DATA":"이미지", "PASS_DATA":"비밀번호", "RADIO_DATA":"라디오"},
  {"SEQ":"순번2", "COMBO_DATA":"콤보2","COMBOEDIT_DATA":"콤보에디트2", "DATE_DATA":"날짜2","CHECKBOX_DATA":"체크박스2","RADIO_DATA":"라디오2"}
]);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||