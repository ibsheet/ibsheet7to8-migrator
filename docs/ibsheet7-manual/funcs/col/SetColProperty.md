# SetColProperty ***(col method)***

> 대상 컬럼의 속성을 설정 합니다. <br>
> [InitColumns](/docs/funcs/init/InitColums) 에서 정의한 컬럼의 속성을 동적으로 변경하여 사용 하고자 하는 경우에 이 메소드를 사용 합니다. <br>
> 동적으로 변경된 속성은 데이터 재조회시 적용되므로 데이터 조회 이전에 변경해야 합니다.

### Syntax
```javascript
ObjId.SetColProperty(DataRow, Col, Prop);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|DataRow|`Number`|<span class="required">필수</span>|단위데이터행 Index|
|Col|`Long or String`|<span class="required">필수</span>|대상 컬럼의 Index 또는 SaveName|
|Prop|`Object`|<span class="required">필수</span>|컬럼의 속성 정의 객체|


### Enum
  * Prop

|Name|Type|Required|Description|
|----|----|-----|--------------|
|AcceptKeys|`String`|<span class="optional">선택</span>|입력허용키 설정<br>- `N` : 숫자만 허용<br>- `E` : 영문만 허용<br>- `K` : 한글만 허용<br>- `N\|E` : 숫자, 영문만 허용 <br>- `N\|E\|[사용자정의문자]` : 숫자, 영문과 사용자정의문자로 설정한 문자 허용<br>`주의` 사용자 정의 문자열은 꼭 대괄호로 묶어서 설정<br>`참고` AcceptKeys 와 ExceptKeys를 둘다 설정하고 설정키 내에 동일 문자가 있는 경우 해당 문자는 입력불가 처리됩니다.|
|ActionMenu|`Object[]`|<span class="optional">선택</span>|컨텍스트 메뉴 |
|Align|`String`|<span class="optional">선택</span>|데이터의 정렬<br>- Left: 좌측정렬 (`Default`)<br>- Center: 중앙정렬<br>- Right: 오른쪽정렬|
|AllowNull|`Boolean`|<span class="optional">선택</span>|숫자계열 컬럼에 빈값 허용 여부 설정 (`Default: 0`)|
|ApproximateType|`Number`|<span class="optional">선택</span>|근사값처리방식<br>- 0 : 사용 안함<br>- 1 : 반올림 (`Default`)<br>- 2 : 내림<br>- 3 : 올림|
|ButtonUrl|`String orNumber`|<span class="optional">선택</span>|팝업 버튼의 이미지 경로 또는 이미지리스트의 Index|
|CalcLogic|`String or Object`|<span class="optional">선택</span>|컬럼별 계산식 문자열 또는 설정 객체<br>- TriggerCols(`string`) : 함수 호출 대상 컬럼의 Index 또는 SaveName을 구분자 '#&124;'로 연결한 문자열<br>- Function(`function`) : 계산식 처리 callback 함수|
|Chart|`Object`|<span class="optional">선택</span>|스파크라인 차트 타입에 대한 세부 속성 설정|
|ComboCode|`String`|<span class="optional">선택</span>|콤보 리스트의 코드 집합|
|ComboDisabled|`String`|<span class="optional">선택</span>|콤보 리스트의 선택 불가능한 item 설정|
|ComboText|`String`|<span class="optional">선택</span>|콤보 리스트의 문자열 집합|
|CustomDate|`Number`|<span class="optional">선택</span>|사용자 정의 날짜 사용여부 (`Default: 0`)|
|DefaultValue|`String`|<span class="optional">선택</span>|신규입력시 기본값 설정|
|Edit|`Boolean`|<span class="optional">선택</span>|편집가능 여부|
|EditLen|`Number`|<span class="optional">선택</span>|데이터의 입력가능한 글자수|
|EmptyToReplaceChar|`String`|<span class="optional">선택</span>|빈값인 경우 대체하여 보여줄 문자 설정|
|EnterMode|`Boolean`|<span class="optional">선택</span>|다중라인 입력모드(MultiLineText)에서 Enter 키 입력에 대한 개행 처리 여부 (`Default :0`)|
|ExceptKeys|`String`|<span class="optional">선택</span>|입력제외키 설정<br>- `N`: 숫자 입력 불가 , - `E`: 영문 입력 불가<br>- `N\|E`: 숫자, 영문 입력 불가 , - `N\|E\|[사용자정의문자]`: 숫자, 영문과 사용자정의문자로 설정한 문자 입력 불가<br>`주의` 사용자 정의 문자열은 꼭 대괄호로 묶어서 설정<br>`참고` AcceptKeys 와 ExceptKeys를 둘다 설정하고 설정키 내에 동일 문자가 있는 경우 해당 문자는 입력불가 처리|
|FalseValue|`String`|<span class="optional">선택</span>|0 이외의 CheckBox 형태 컬럼의 False값 지정. "F" 으로 지정한 경우 0 대신 "F"을 True 값으로 사용 가능|
|FitColWidth|`Boolean`|<span class="optional">선택</span>|FitColWidth 메소드 호출시 비율에 의한 너비 재조정 허용 여부|
|Focus|`Boolean`|<span class="optional">선택</span>|포커스 허용 여부 (`Default: 1`)|
|Format|`String`|<span class="optional">선택</span>|데이터의 Mask 적용 형태|
|FormatFix|`Boolean`|<span class="optional">선택</span>|GetCellValue 시 GetCellText 값을 반환 할지 여부. 특히 True 로 설정시 저장할 때 Format 이 설정된 상태로 저장합니다.|
|HoverUnderline|`Boolean`|<span class="optional">선택</span>|마우스오버시 언더라인 여부 (`Default: 0`)|
|Image|`String`|<span class="optional">선택</span>|이미지 표현시 Url|
|ImgAlign|`String`|<span class="optional">선택</span>|이미지 위치<br>- Left: 좌측 (`Default`)<br>- Right: 우측|
|ImgHeight|`Number`|<span class="optional">선택</span>|이미지 높이|
|ImgWidth|`Number`|<span class="optional">선택</span>|이미지 너비|
|InputCaseSensitive|`Number`|<span class="optional">선택</span>|입력시 영문에 대한 대소구문 자동 치환 처리에 대한 설정<br>0 : 별도 처리 하지 않음 (`Default`)<br>1 : 대문자로 치환<br>2 : 소문자로 치환|
|ItemCode|`String`|<span class="optional">선택</span>|멀티체크 아이템의 코드를 구분자 `"|"`로 연결한 문자열|
|ItemText|`String`|<span class="optional">선택</span>|멀티체크 아이템의 텍스트를 구분자 `"|"`로 연결한 문자열|
|KeyField|`Boolean`|<span class="optional">선택</span>|필수 입력 항목|
|MinWidth|`Number`|<span class="optional">선택</span>|컬럼 최소 가로크기 (`Default: 1`)|
|MaxCheck|`Number`|<span class="optional">선택</span>|멀티체크의 최대 선택 개수 설정|
|MultiLineText|`Boolean`|<span class="optional">선택</span>|다중라인 입력여부|
|NumberSort|`Boolean`|<span class="optional">선택</span>|숫자형 Sort 처리 사용 여부|
|PointCount|`Number`|<span class="optional">선택</span>|컬럼포맷이 Float 인 경우 소수점 이하의 자리수 (`Default: 6`)|
|PopupCode|`String`|<span class="optional">선택</span>|팝업메뉴의 코드 집합|
|PopupText|`String`|<span class="optional">선택</span>|팝업메뉴의 문자열 집합|
|RadioIcon|`Boolean`|<span class="optional">선택</span>|데이터 셀내의 체크박스 계열의 이미지 모양 설정|
|ShowCol|`Number`|<span class="optional">선택</span>|멀티콤보 설정 시 컬럼 값으로 출력할 컬럼 설정|
|ToolTip|`Boolean or String`|<span class="optional">선택</span>|셀의 풍선도움말 표시 여부 또는 설정할 문자열|
|Transaction|`Boolean`|<span class="optional">선택</span>|트랜잭션 허용 여부 (`Default :1`)|
|TreeCol|`Boolean`|<span class="optional">선택</span>|트리 기준컬럼 설정여부|
|TrueValue|`String`|<span class="optional">선택</span>|1 이외의 CheckBox 형태 컬럼의 True 값 지정. "M" 으로 지정한 경우 1 대신 "M"을 True 값으로 사용 가능|
|Width|`Number`|<span class="optional">선택</span>|컬럼의 너비|
|ZeroToReplaceChar|`String`|<span class="optional">선택</span>|값이 0인 경우 대체하여 보여줄 문자 설정|
|StaticPassword|`Boolean`|<span class="optional">선택</span>|값이 0인 경우 데이터 길이만큼 `*` 의 수를 표현|

- 각 속성의 상세 설명은 [InitColumns method](/docs/funcs/init/InitColumns)를 참조

### Returns
***none***

### Example
```javascript
// Index가 3인 컬럼의 콤보 목록 변경
mySheet.SetColProperty(0, 3, {
  'ComboText': '신규|진행중|완료',
  'ComboCode': '01|02|03',
});

// 단위데이터행 1번째, 3번째 컬럼의 콤보 목록을 변경
var info = {ComboText: "신규|진행중|완료 ", ComboCode: " 01|02|03" };
mySheet.SetColProperty(1, 3, info);

// 4번째 컬럼에 허용키, 제외키 설정
var info = {AcceptKeys:"N|E|[!$%]",ExceptKeys:"[123ab]"};
mySheet.SetColProperty(0, 4 ,info);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||