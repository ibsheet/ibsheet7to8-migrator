# InitCellProperty ***(cell method)***

> 대상 셀에 대한 타입 및 속성을 설정 합니다. <br>
> 해당 컬럼의 타입과 다른 타입을 대상 셀에 설정하고자 하는 경우에 이 기능을 사용 합니다. <br>
> `주의` 타입 설정시 데이터영역 기준으로 처리되는 `Seq, Status, DelCheck, AutoSum`과 같은 데이터 타입은 지원되지 않습니다.<br>
> `주의` info 인자의 `type`을 필수로 설정해야 합니다.

### Syntax
```javascript
ObjId.InitCellProperty(Row, Col, info);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|info|`Object`|<span class="required">필수</span>|셀의 속성 정의 객체|


### Enum
  * 설정 가능한 컬럼 Type

|Type|Description|
|----|------------|
|Button|버튼 형태를 표현하는 데이터 타입|
|CheckBox|CheckBox 형태 데이터|
|Combo|Edit 불가능 Combo 데이터|
|ComboEdit|자동완성형태의 Combo 데이터|
|Date|날짜형 타입|
|DummyCheck|이벤트를 발생하지 않는 체크박스 데이터타입|
|Float|실수형 타입|
|Html|Html 태그형태를 표현하는 데이터|
|Image|Edit 불가능한 단순 이미지 표현 형태 데이터|
|Int|정수형 타입|
|Popup|팝업을 사용한 데이터|
|Text|기본 문자열 데이터|

* 설정 가능한 속성(info)

|Props|Type|Description|
|-----|----|-----------|
|Type|`String`|컬럼의 데이터 타입 `(필수)`|
|AcceptKeys|`String`|입력허용키 설정<br>- `N` : 숫자만 허용<br>- `E` : 영문만 허용<br>- `N\|E` : 숫자, 영문만 허용<br>- `N\|E\|[사용자정의문자]` : 숫자, 영문과 사용자정의문자로 설정한 문자 허용|
|Align|`String`|데이터의 정렬|
|ApproximateType|`Number`|근사값처리방식 (1: 반올림, 2: 내림, 3: 올림)|
|ComboCode|`String`|콤보 리스트의 코드 집합|
|ComboDisabled|`String`|콤보의 선택 불가능 항목|
|ComboText|`String`|콤보 리스트의 문자열 집합|
|Cursor|`String`|마우스 모양 설정|
|CustomDate|`Number`|사용자 정의 날짜 사용여부|
|Edit|`Boolean`|편집가능 여부|
|EditLen|`Number`|데이터의 입력가능한 글자수|
|EmptyToReplaceChar|`String`|빈값인 경우 대체하여 보여줄 문자 설정|
|ExceptKeys|`String`|입력제외키 설정<br>- `N` : 숫자 입력 불가<br>- `E` : 영문 입력 불가<br>- `N\|E` : 숫자, 영문 입력 불가<br>- `N\|E\|[사용자정의문자]` : 숫자, 영문과 사용자정의문자로 설정한 문자 입력 불가|
|Format|`String`|데이터의 Mask 적용 형태|
|FormatFix|`Boolean`|GetCellValue 시 GetCellText 값을 반환 할지 여부 (`Default : 0`) <span style="color:blue;">1(true)</span> 로 설정시 저장할 때 Format 이 설정된 상태로 저장됩니다.|
|HoverUnderline|`Boolean`|마우스오버시 언더라인 여부|
|Image|`String`|이미지의 경로|
|ImgAlign|`String`|이미지 표시 위치 |
|ImgHeight|`Number`|이미지 높이|
|ImgWidth|`Number`|이미지 너비|
|InputCaseSensitive|`Number`|입력시 영문에 대한 대소구문 자동 치환 처리에 대한 설정<br>0 : 별도 처리 하지 않음 (`Default`)<br>- 1 : 대문자로 치환<br>- 2 : 소문자로 치환|
|ItemCode|`String`|멀티체크 아이템의 코드를 구분자 `"|"`로 연결한 문자열|
|ItemText|`String`|멀티체크 아이템의 텍스트를 구분자 `"|"`로 연결한 문자열|
|MaxCheck|`Number`|멀티체크의 최대 선택 개수 설정|
|MaximumValue|`Number`|숫자포맷일 때 편집시 입력할 수 있는 최대값|
|MinimumValue|`Number`|숫자포맷일 때 편집시 입력할 수 있는 최소값|
|MultiLineText|`Boolean`|다중라인 입력여부|
|PointCount|`Number`|컬럼타입이 Float 인 경우 소수점 이하의 자리수|
|PopupButton|`Boolean`|팝업버튼 표시 여부|
|PopupCode|`String`|팝업메뉴의 코드 집합|
|PopupText|`String`|팝업메뉴의 문자열 집합|
|RadioIcon|`Number`|데이터 셀내의 체크박스 계열의 이미지 모양 설정|
|ZeroToReplaceChar|`String`|값이 0인 경우 대체하여 보여줄 문자 설정|


- 각 속성의 상세 설명은 [InitColumns method](/docs/funcs/init/InitColumns) 를 참고

### Returns
***none***

### Example
```javascript
// (2, 3) 셀의 컬럼 타입을 'Text'로 변경하고 입력 허용키를 숫자와 'abc' 만 허용하도록 설정
mySheet.InitCellProperty(2, 3, {
  'Type': 'Text',// 필수로 설정해야 하는 속성
  'AcceptKeys': 'N|[abc]'
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||