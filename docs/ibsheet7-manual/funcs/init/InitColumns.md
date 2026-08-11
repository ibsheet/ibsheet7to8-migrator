# InitColumns ***(init method)***

> 각 컬럼에 대한 `초기화` 및 `타입`, `포맷` 등의 속성을 설정 합니다.

### Syntax
```javascript
ObjId.InitColumns({Cols}, DataRow);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Cols|`Object`|<span class="required">필수</span>|각 컬럼의 기능을 `json` 형태로 설정합니다.|
|DataRow|`Number`|<span class="optional">선택</span>|단위데이터행 개수 (`주의 :` 단위데이터행 구조를 사용하는 경우 해당 인자의 값과 Cols 인자의 배열 길이가 동일해야 합니다.)|

### Enum
  * Cols

|Name|Type|Required|Description|
|----|----|------|-------------|
|Type|`String or Array`|<span class="required">필수</span>|컬럼의 데이터 타입 (아래 Cols.Type 표 참조)|
|AcceptKeys|`String`|<span class="optional">선택</span>|입력 허용키 설정<br>- `N` : 숫자만 허용<br>- `E` : 영문만 허용<br>- `N\|E` : 숫자, 영문만 허용<br>- `N\|E\|[사용자정의문자]` : 숫자, 영문과 사용자정의문자로 설정한 문자 허용<br>![s](/assets/imgs/ibsheet7_acceptKeys.png)|
|ActionMenu|`Object[]`|<span class="optional">선택</span>|컨텍스트 메뉴 객체<br>![s](/assets/imgs/ibsheet7_actionmenu.png)<br>- `Text` : 컨텍스트 메뉴 항목의 텍스트 문자열<br>- `Code` : 컨텍스트 메뉴 항목의 코드 문자열<br>- `Icon` : 컨텍스트 메뉴 항목의 아이콘 이미지 경로 또는 Index|
|Align|`String`|<span class="optional">선택</span>|데이터의 정렬 방식<br>`Left` : 좌측정렬, `Center` : 중앙 정렬, `Right` : 우측 정렬|
|AllowNull|`Boolean`|<span class="optional">선택</span>|숫자계열 컬럼에 빈값 허용 여부 설정|
|ApproximateType|`Number`|<span class="optional">선택</span>|근사값처리방식 (`0` : 사용안함, `1` : 반올림, `2` : 내림, 3:올림)|
|AutoSum|`Boolean`|<span class="optional">선택</span>|타입과 무관하게 합계행 사용 가능 여부 (SumType 속성과 함께 사용)|
|BackColor|`String`|<span class="optional">선택</span>|배경 색상 |
|ButtonUrl|`String or Number`|<span class="optional">선택</span>|팝업 버튼의 이미지 경로 또는 이미지리스트의 Index|
|CalcLogic|`String or Object`|<span class="optional">선택</span>|컬럼별 계산식 문자열 또는 설정 객체<br>![s](/assets/imgs/ibsheet7_calcLogic.png)<br>- `TrigeerCols` : 계산식 Function함수를 호출할 컬럼의 Index 또는 SaveName을 구분자 `|`로 연결한 문자열<br>- `Function` : 계산식 처리 callback 함수, 호출시 인자로 Sheet객체, Row, Col 정보를 전달|
|CaseSensitive|`Boolean`|<span class="optional">선택</span>|필터링시 대소구분 처리 여부 (Default: 1)|
|Chart|`Object`|<span class="optional">선택</span>|스파크라인 차트 타입에 대한 세부 속성 설정<br>- `Type` : 스파크라인 차트 타입 (Area, Line, Column, WinLoss)<br>- `Data` : 차트를 구성할 컬럼의 Index 또는 SaveName을 구분자 `|`로 연결한 문자열<br>- `Color` : '#4f81bd' 양수 값(영역)에 대한 색상<br>- `NegativeColor` : '#4f81bd' 음수 값(영역)에 대한 색상|
|CheckSaveName|`String`|<span class="optional">선택</span>|트리기준컬럼의 체크박스에 대한 SaveName|
|ClassName|`String`|<span class="optional">선택</span>|버튼의 사용자정의 클래스 postfix 명|
|ColMerge|`Number`|<span class="optional">선택</span>|컬럼의 셀 병합 처리 방법 (- `0` :셀 병합 사용 안함, - `1` : 셀 병합 사용함, - `2` : 가상 셀 병합 모드 사용)|
|ColSpan|`Number`|<span class="optional">선택</span>|ColSpan 범위 값 (`단위데이터행` 구조에서만 사용 가능)|
|ComboCode|`String`|<span class="optional">선택</span>|콤보 리스트의 코드 집합(코드 항목을 \|로 연결하며, ComboText 항목의 개수와 동일해야함)|
|ComboDisabled|`String`|<span class="optional">선택</span>|콤보 리스트의 선택 불가능한 item 설정(- `0` :선택 가능, - `1` : 선택 불가) ComboCode 의 개수만큼 \|을 이용하여 설정해야함|
|ComboFilter|`Number`|<span class="optional">선택</span>|ComboEdit 컬럼 타입의 필터링 처리 모드 설정 (- `0` : 사용안함, - `1` : 특정부분 일치 형태, - `2` : 앞문자열 일치 형태)|
|ComboText|`String`|<span class="optional">선택</span>|Combo 형태의 데이터 타입의 항목 문자열을 행 구분자 `"|"`로 연결, 다중 컬럼 사용시 컬럼 구분자 `\t`로 연결<br>![s](/assets/imgs/ibsheet7_comboText.png)|
|CopyPaste|`Boolean or String`|<span class="optional">선택</span>|컬럼의 복사 기능 제어 (Default: 1(복사 허용))|
|Cursor|`String`|<span class="optional">선택</span>|마우스 오버 시 모양 설정 (`Default` : 기본모양, `Pointer` : 포인터모양)|
|CustomDate|`Boolean`|<span class="optional">선택</span>|사용자 정의 날짜 사용여부|
|DefaultValue|`String`|<span class="optional">선택</span>|신규입력시 기본값 설정|
|DecimalAdjust|`Number`|<span class="optional">선택</span>|Int 타입 조회시 소수점 처리 방식 (`1` : 반올림처리, `2` : 내림처리 (Default), `3` : 올림처리)|
|Edit|`Boolean`<span class="optional">선택</span>||편집가능 여부|
|EditLen|`Number`|<span class="optional">선택</span>|편집 시 입력 최대 허용 길이(편집 시에만 유효함)|
|EditPointCount|`Number`|<span class="optional">선택</span>|편집시점에서의 소수점 자리수 입력제한 개수 설정|
|Ellipsis|`Boolean`|<span class="optional">선택</span>|말줄임 여부 (기본값 : 0)|
|EmptyToReplaceChar|`String`|<span class="optional">선택</span>|데이터 타입이 `Int, Float, AutoSum` 일 때 빈 값인 경우 대체하여 보여줄 문자 설정|
|EnterMode|`Boolean`|<span class="optional">선택</span>|다중라인 입력모드(`MultiLineText`)에서 Enter 키 입력에 대한 개행 처리 여부 (Default :0)|
|ExceptKeys|`String`|<span class="optional">선택</span>|입력제외키 설정<br>- `N` : 숫자 입력 불가<br>- `E` : 영문 입력 불가<br>- `N\|E` : 숫자, 영문 입력 불가<br>- `N\|E\|[사용자정의문자]` : 숫자, 영문과 사용자정의문자로 설정한 문자 입력 불가<br>(사용자 정의 문자열은 `대괄호`로 묶어서 설정해야하며 사용자 정의문자와 숫자, 영문 설정 문자의 합집합으로 처리 됨. AcceptKeys 와 ExceptKeys를 둘다 설정하고 설정키 내에 동일 문자가 있는 경우 해당 문자는 `입력불가 처리`된다.|
|ExcludeEmpty|`Boolean`|<span class="optional">선택</span>|AutoSum 컬럽타입 및 소계행의 평균 또는 건수 계산시 빈값을 포함 할지 여부 (`Default: 0`)|
|FalseValue|`String`|<span class="optional">선택</span>|1 이외의 CheckBox 형태 컬럼의 False 값 지정. "F" 으로 지정한 경우 0 대신 "F"를 False 값으로 사용 가능|
|FitColWidth|`Boolean`|<span class="optional">선택</span>|FitColWidth 메소드 호출시 비율에 의한 너비 재조정 허용 여부 (`Default: 1`)|
|Focus|`Boolean`|<span class="optional">선택</span>|포커스 허용 여부|
|FontBold|`Boolean`|<span class="optional">선택</span>|폰트 굵기 여부|
|FontColor|`String`|<span class="optional">선택</span>|폰트 색상|
|FontUnderline|`Boolean`|<span class="optional">선택</span>|폰트 언더라인 여부|
|Format|`String or Array`|<span class="optional">선택</span>|데이터의 Mask 적용 형태|
|FormatFix|`Boolean`|<span class="optional">선택</span>|`GetCellValue` 시 GetCellText 값을 반환 할지 여부 (Default: 0) `true` 로 설정시 저장할 때 Format 이 설정된 상태로 저장합니다.|
|FullInput|`Boolean`|<span class="optional">선택</span>|컬럼타입이 단일행 문자열인 경우 전체길이(EditLen)만큼의 입력 여부|
|GroupSumType|`String`|<span class="optional">선택</span>|그룹핑 처리시 부모노드의 셀에 처리할 계산 방식 설정 (Default: "")<br>- `Sum` : 합계계산<br>- `Count` : 건수계산<br>- `Avg` : 평균계산|
|HeaderCheck|`Boolean`|<span class="optional">선택</span>|헤더에 전체 체크 표시 여부 (`Default: 1`)|
|Hidden|`Boolean`|<span class="optional">선택</span>|컬럼 숨김 여부|
|HoverUnderline|`Boolean`|<span class="optional">선택</span>|마우스오버시 언더라인 여부|
|Image|`String`|<span class="optional">선택</span>|이미지 표현시 Url|
|ImgAlign|`String	`|<span class="optional">선택</span>|미지의 정렬|
|ImgHeight|`Number`|<span class="optional">선택</span>|이미지 높이|
|ImgWidth|`Number`|<span class="optional">선택</span>|이미지 너비|
|InputCaseSensitive|`Number`|<span class="optional">선택</span>|입력시 영문에 대한 대소구문 자동 치환 처리에 대한 설정 <br>`0` : 별도 처리 하지 않음 (`Default`), `1` : 대문자로 치환, `2` : 소문자로 치환|
|InsertEdit|`Boolean`|<span class="optional">선택</span>|트랜잭션이 "입력"인 상태에서 데이터의 Edit 가능 여부|
|ItemCode|`String`|<span class="optional">선택</span>|멀티체크 아이템의 코드를 구분자 `"|"`로 연결한 문자열|
|ItemText|`String`|<span class="optional">선택</span>|멀티체크 아이템의 텍스트를 구분자 `"|"`로 연결한 문자열|
|KeyField|`Boolean`|<span class="optional">선택</span>|필수 입력 여부|
|LevelSaveName|`String`|<span class="optional">선택</span>|트리구조에서 트리 레벨에 대한 SaveName|
|MaxCheck|`Number`|<span class="optional">선택</span>|CheckBox 형태의 데이터 타입에서 2개 이상의 체크박스 표현시 최대 선택 개수 (Default : 0(제한없음))|
|MaximumValue|`Number`|<span class="optional">선택</span>|숫자포맷일 때 편집시 입력할 수 있는 최대값|
|MenuFilter|`String`|<span class="optional">선택</span>|Filter에서 사용할 옵션 (여러개 선택시 `"|"` 구분자로 연결)<br>**(value / description / allow Type)**<br>* 0 / 사용안함 / Text, Number, Date<br>* 1 / 같음 / Text, Number, Date<br>* 2	/ 같지 않음	/ Text, Number, Date<br>* 3	/ 작음 / Number, Date<br>* 4 / 같거나 작음 / Number, Date<br>* 5	/ 큼 / Number, Date<br>* 6	/ 같거나 큼 /	Number, Date<br>* 7	/ 단어로 시작함	/ Text, Date<br>* 8	/ 단어로 시작하지 않음 / Text, Date<br>* 9 / 단어로 끝남 / Text, Date<br>* 10 / 단어로 끝나지 않음 /	Text, Date<br>* 11 / 포함함	/ Text, Date<br>* 12 / 포함하지 않음 / Text, Date|
|MinimumValue|`Number`|<span class="optional">선택</span>|숫자포맷일 때 편집시 입력할수 있는 최소값|
|MinWidth|`Number`|<span class="optional">선택</span>|컬럼 최소 가로크기|
|MultiLineText|`Boolean`|<span class="optional">선택</span>|데이터타입이 "Text"인 경우 다중라인 입력여부(`Default: 0`)|
|NumberSort|`Boolean`|<span class="optional">선택</span>|숫자형 Sort 처리 사용 여부|
|PhoneMask|`Object`|<span class="optional">선택</span>|Format이 PhoneNo 일 때 전화번호포맷에서 원하는 위치에 마스킹 설정|
|PointCount|`Number`|<span class="optional">선택</span>|컬럼타입이 Float 인 경우 소수점 이하의 자리수|
|PopupButton|`Boolean`|<span class="optional">선택</span>|팝업버튼 사용 여부|
|PopupCheckEdit|`Boolean`|<span class="optional">선택</span>|팝업메뉴 설정시 편집가능 여부|
|PopupCode|`String`|<span class="optional">선택</span>|팝업메뉴의 코드 집합|
|PopupText|`String`|<span class="optional">선택</span>|팝업메뉴의 문자열 집합|
|RadioIcon|`Boolean`|데이터 셀내의 체크박스 계열의 이미지 모양 설정|
|RowMerge|`Boolean`|대상 컬럼의 RowMerge 허용 여부 (`Default: 1`)|
|RowSpan|`Number`|RowSpan 범위 값 (`단위데이터행` 구조에서만 사용 가능)|
|Save|`Boolean`|저장 또는 저장관련 메소드에서 해당 컬럼의 값 포함 여부 (`Default: 1`)|
|SaveName|`String`|데이터 저장 또는 조회시 사용하는 변수명|
|ShowCol|`Numbe`|<span class="optional">선택</span>|멀티콤보 설정 시 컬럼 값으로 출력할 컬럼 설정|
|Sort|`Boolean`|<span class="optional">선택</span>|헤더 클릭시 소트 가능 여부 (`Default: 1`)|
|StaticPassword|`Boolean`|<span class="optional">선택</span>|값이 0인 경우 데이터 길이만큼 ‘*’ 의 수를 표현|
|SumType|`String`|<span class="optional">선택</span>|합계 계산 방식 설정<br>- `Sum` : 합계 계산(Default)<br>- `Avg` : 평균 계산<br>- `Count` : 건수 계산<br>- `Max` : 최대값 계산<br>- `Min` : 최소값 계산|
|ToolTip|`Boolean or String`|<span class="optional">선택</span>|셀의 풍선도움말 표시 여부 또는 설정할 문자열|
|ToolTipText|`String`|<span class="optional">선택</span>|헤더행의 풍선 도움말에 설정할 문자열|
|Transaction|`Boolean`|<span class="optional">선택</span>|트랜잭션 허용 여부 (`Default: 1`)|
|TreeCheck|`Boolean`|<span class="optional">선택</span>|트리 기준컬럼에서 체크박스 사용여부|
|TreeCol|`Boolean`|<span class="optional">선택</span>|트리 기준컬럼|
|TrueValue|`String`|<span class="optional">선택</span>|1 이외의 CheckBox 형태 컬럼의 True 값 지정. "M" 으로 지정한 경우 1 대신 "M"을 True 값으로 사용 가능.|
|UpdateEdit|`Boolean`|<span class="optional">선택</span>|트랜잭션이 "조회"인 상태에서 데이터의 Edit 가능 여부|
|VAlign|`String`|<span class="optional">선택</span>|컬럼 상하 정렬 값<br>- `Top` : 상단 정렬, - `Middle` : 중앙 정렬, - `Bottom` : 하단 정렬|
|Validation|`Boolean`|<span class="optional">선택</span>|ComboEdit 컬럼 유효성 검사 사용여부 설정 (Default: 0)|
|Width|`Number`|<span class="optional">선택</span>|컬럼의 너비|
|Wrap|`Boolean`|<span class="optional">선택</span>|자동 줄바꿈 여부|
|ZeroToReplaceChar|`String`|<span class="optional">선택</span>|Number 형태의 데이터 타입에서 값이 0일때 대체하여 표시할 문자값 설정|


* Cols.Type

|Type|Description|
|---|------------|
|**Text**|기본 문자열 데이터 타입|
|**Status**|행에 대한 트랜잭션 상태를 표현하는 데이터 타입|
|**DelCheck**|행에 대한 삭제여부를 설정하는 CheckBox 형태 데이터 타입|
|**CheckBox**|CheckBox 데이터 타입|
|**DummyCheck**|이벤트를 발생하지 않는 CheckBox 데이터 타입|
|**Radio**|데이터 행 중 하나의 데이터만 선택하는 Radio 데이터 타입|
|**Combo**|DropDown 리스트 데이터 타입|
|**ComboEdit**|편집 및 필터링이 가능한 DropDown 리스트 데이터 타입 (`주의` 모바일은 지원하지 않습니다. 모바일은 `Combo` 타입으로 대체되어 표현됩니다.)|
|**AutoSum**|합계행에 합계를 표현하는 숫자형 데이터 타입 (포맷이 “Integer”, “#,###”, “#,##0” 등의 경우에 한해 소수점 자리를 버림)|
|**Image**|이미지 형태의 데이터 타입|
|**Int**|정수형 숫자 데이터 타입 (값이 실수인 경우 소수점 자리를 버림)|
|**Float**|실수형 숫자 데이터 타입|
|**Date**|날짜 데이터 타입|
|**Popup**|우측에 팝업 버튼을 갖는 읽기 전용 문자열 데이터 타입|
|**Pass**|Password 데이터 타입|
|**Seq**|행의 생성 순서값을 표현하는 데이터 타입|
|**Html**|Html 태그형태를 표현하는 데이터 타입|
|**Result**|저장 처리 결과를 표시하는 데이터 타입|
|**Sparkline**|스파크라인 차트를 표현하는 데이터 타입|
|**Button**|버튼 형태를 표현하는 데이터 타입|


### Returns
***none***

### Example
```javascript
// 컬럼 초기화 및 속성 설정
var cols = [
  {"Type": "Status", "Width": 80, "SaveName": "sStatus"},
  {"Type": "DelCheck", "Width": 60, "SaveName": "sDelCheck"},
  {"Type": "Text", "Width": 100, "SaveName": "sName"},
  {"Type": "Text", "Width": 100, "SaveName": "sId", "Format":"##-####-###"},
  {"Type": "Date", "Width": 100, "SaveName": "sDate"}
];

mySheet.InitColumns(cols);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||