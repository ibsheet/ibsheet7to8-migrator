# IBSheet7 Q&A 지식집 — 06. 행·셀·컬럼 조작 API (API)

범위: 값 조회/설정, 행 추가·삭제, 선택·포커스, 숨김, 상태 등 행·셀·컬럼 조작 함수.

이 파일에는 항목 279개가 24개 소주제로 정리되어 있습니다. 각 항목은 `### [API-번호] 제목` 아래에 **질문**(같은 내용을 묻는 여러 표현), **답변**, 필요하면 **적용 버전**, **키워드**로 구성됩니다.

## 소주제 목록

- 셀 값 읽기·쓰기 (10개, API-0001부터)
- 셀 텍스트·범위 일괄 처리 (14개, API-0011부터)
- 행 데이터 읽기·쓰기 (11개, API-0025부터)
- 행 추가·삭제·이동 (17개, API-0036부터)
- 행 수·행 번호·Seq (14개, API-0053부터)
- 행 상태·변경 확인·복원 (19개, API-0067부터)
- 체크된 행 조회·CheckAll (8개, API-0086부터)
- 선택·체크 행 활용 (11개, API-0094부터)
- 행·셀 편집 가능 제어 (17개, API-0105부터)
- 편집 중 값 읽기 (6개, API-0122부터)
- 셀 포커스·SelectCell (13개, API-0128부터)
- 행·셀 선택 영역 (10개, API-0141부터)
- 스크롤 위치·선택 복원 (5개, API-0151부터)
- 시트 객체·포커스·화면 제어 (14개, API-0156부터)
- 행·컬럼 숨김 (13개, API-0170부터)
- 컬럼 너비·고정·개수 (8개, API-0183부터)
- 컬럼 동적 추가·삭제 (7개, API-0191부터)
- SaveName·컬럼 구성 저장 (7개, API-0198부터)
- 헤더 텍스트·컬럼 속성 (9개, API-0205부터)
- 셀 색상·스타일·정렬 (19개, API-0214부터)
- 중복 체크 (7개, API-0233부터)
- 저장 데이터 추출 (7개, API-0240부터)
- 버전별 수정 이슈 (15개, API-0247부터)
- 기타 API·렌더링 (18개, API-0262부터)

## 셀 값 읽기·쓰기

### [API-0001] GetCellValue·SetCellValue의 Row는 헤더 행부터 시작하나요? 데이터 행만 순회하려면?

**질문**

- GetCellValue나 SetCellValue의 Row 인자는 데이터 행부터 시작하나요, 헤더 행부터 시작하나요? 데이터 첫 행의 인덱스는 어떻게 구하나요?
- GetCellValue(0,11)로 호출했는데 값을 가져오지 못합니다. Row와 Column 인덱스는 각각 0부터 시작하나요?
- SetCellValue로 체크박스 값을 변경했더니 Header 행의 값도 함께 바뀌었습니다.

**답변**

Row 인덱스는 헤더 행부터 시작하며 헤더 영역이 0부터이므로, 데이터 행을 읽거나 쓸 때 0부터 시작하면 안 됩니다. Column 인덱스는 0부터 시작합니다. 데이터 행에 이를 고려하지 않고 row index를 주면 의도와 다른 행(헤더 셀 등)이 바뀝니다.

- 데이터 첫 행의 인덱스는 `HeaderRows()`(`HeaderRow()`로 안내된 경우도 있음)가 돌려주는 값이므로 이 값을 변수로 이용합니다.
- 데이터 행만 순회하려면 반복문의 시작 행을 `HeaderRows()`로 지정합니다. 예: `for(var i=mySheet.HeaderRows(); i<=mySheet.LastRow(); i++){ ... }`
- 체크박스의 체크 유무는 `SetCellValue`로 값을 변경하는 방법으로만 제어할 수 있으며, Header 행은 0번째 행이므로 0번째 행을 제외한 데이터 행만 변경해야 합니다.

**키워드**: HeaderRows, GetCellValue, SetCellValue, LastRow, Row 인덱스, 헤더 행 0

---

### [API-0002] GetCellValue가 빈 값이 아니라 -1을 반환합니다. 원인과 이전 동작(공백·undefined)으로 되돌리는 방법

**질문**

- GetCellValue를 호출했더니 이전 버전의 null이나 빈 값이 아니라 -1이 반환됩니다. 체크박스 컬럼에서도 1 또는 0이 아닌 -1이 나옵니다.
- LoadSearchData로 조회한 직후 GetCellValue로 값을 읽으면 -1이 나옵니다.
- 존재하지 않는 Row나 Col 인덱스를 넘기면 예전에는 공백(undefined)이 반환됐는데 -1이 반환됩니다. 이전 동작으로 되돌릴 수 있나요?

**답변**

값이 단순히 비어 있어서가 아니라, 존재하지 않는 행이나 컬럼(없는 SaveName이나 컬럼 번호 등)을 읽는 것처럼 인자가 잘못된 경우 기본적으로 -1을 반환하도록 되어 있습니다. 7.0.0.0-20140327-16-M 이후 버전부터 이전 버전의 공백이나 undefined 대신 -1을 반환합니다. 예를 들어 데이터 조회 전에는 데이터 행이 없어 `GetCellValue(10,4)`가 -1을 반환하며, `GetColHidden` 등도 같습니다.

- 체크박스 컬럼에서 -1이 나온다면 Row만 넘기고 Col을 빠뜨리지 않았는지 확인하고 Row와 Col을 모두 지정합니다.
- `LoadSearchData` 등 조회가 진행되는 중에 값을 읽으면 -1이 나옵니다. 동기 방식인 `GetSearchData`와 `LoadSearchData` 조합으로 바꾸면 해결되지만 이때는 대기 이미지가 나타나지 않습니다.
- 이전 동작이 필요하면 ibsheet.cfg 파일의 `InvalidArgsReturnValue`를 설정합니다. 예: `"InvalidArgsReturnValue" : "undefined"`. 빈 값 등 원하는 값을 지정할 수 있으며 설정 내용은 도움말 7.2 Property List와 개발자가이드 7장에서 확인합니다.
- 다른 방법으로, 시트 생성 시 공통 호출되는 `IBS_InitSheet` 함수에서 `GetCellValue`를 오버라이드해 -1일 때 원하는 값을 반환하게 할 수 있습니다. 기존 소스가 공백만 확인했다면 -1 체크도 함께 하도록 처리합니다.

**적용 버전**: 7.0.0.0-20140327-16-M 이후 -1 반환

**키워드**: GetCellValue, -1, InvalidArgsReturnValue, GetColHidden, LoadSearchData, GetSearchData, IBS_InitSheet

---

### [API-0003] CellValue가 화면 표시값이 아니라 원본 값을 반환하는 이유와 숫자 컬럼 값을 문자열로 받는 방법

**질문**

- ActiveX와 IBSheet7에서 CellValue가 돌려주는 값이 다릅니다. Float 컬럼에서 화면에 보이는 값과 원본 값 중 어느 것을 반환하나요?
- 숫자 컬럼에서 GetCellValue를 호출했을 때 반환되는 값의 타입을 string(문자열)으로 받고 싶습니다.

**답변**

`CellValue`는 IBSheet3가 눈에 보이는 데이터를 리턴하지만 IBSheet7은 원본 데이터를 리턴합니다. 예를 들어 데이터가 12.152이고 Float, `PointCount:1`이면 IBSheet3는 12.2를, IBSheet7은 12.152를 리턴합니다.
숫자 컬럼에서 반환 타입을 string(문자열)으로 받고 싶다면 `GetCellValue`를 오버라이드(재정의)해서 처리하는 방법을 사용할 수 있습니다.

**키워드**: CellValue, GetCellValue, PointCount, Float, 원본 데이터, 오버라이드

---

### [API-0004] GetCellValue 값이 0인데 빈 문자열 비교가 true가 되거나 length()가 동작하지 않습니다

**질문**

- GetCellValue로 가져온 값이 0인데 `GetCellValue(1,1) == ''` 조건이 true가 되어 빈 값 분기로 갑니다. 왜 그런가요?
- GetCellValue로 가져온 값의 길이를 구하려는데 length() 메소드가 동작하지 않습니다.

**답변**

자바스크립트 문법상 0 == false == '' 이므로 값이 0이어도 빈 문자열과 같다고 판단됩니다. 조건을 `==`가 아닌 `===`로 비교해야 합니다.
값의 길이는 `length()` 메소드가 아니라 `.length`를 붙여 `GetCellValue(~).length` 형태로 구합니다.

**키워드**: GetCellValue, ===, length, 빈 문자열 비교, 자바스크립트

---

### [API-0005] SetCellValue(CellValue)를 호출했는데 값이 들어가지 않거나 다르게 들어갑니다

**질문**

- 헤더나 셀에 SetCellValue로 값을 넣었는데 값이 들어가지 않습니다. 원인이 무엇인가요?
- 데이터가 한 건도 없는 빈 시트나 DataInsert 직후, 헤더가 2줄인 시트에서 SetCellValue 값이 들어가지 않습니다.
- CellValue에 true 값을 입력하면 이전 버전에서는 true 문자열이 표시됐는데 최신 버전에서는 숫자 1이 출력됩니다.

**답변**

다음 원인을 확인합니다.

- Value를 문자열이 아닌 Object 형태로 전달한 경우: `CellValue` 설정 함수의 3번째 인자는 String 형식만 입력하도록 되어 있어 문자열로 넣어야 합니다. 예를 들어 true 같은 값은 문자열로 전달하지 않으면 숫자 1로 출력됩니다.
- 빈 시트: 먼저 `DataInsert` 함수로 행을 만든 뒤 `SetCellValue`로 값을 넣습니다.
- row 인자가 잘못된 경우: 이벤트 발생을 막아도 값이 바뀌지 않으면 row 인자를 확인합니다. 헤더가 2줄인 시트에서 이를 고려하지 않아 발생한 사례가 있어 Row 값에 +1을 해서 처리했습니다.
- 컬럼 인자에 컬럼 Type 값을 넣은 경우: 두 번째 인자는 컬럼 인덱스나 SaveName이어야 하며, 체크박스 컬럼에 0/1을 설정해도 적용되지 않을 때 확인합니다.
- 숨겨진 컬럼의 헤더 셀: `SetCellValue`가 반영되지 않을 수 있으므로 `SetColHidden`으로 컬럼을 먼저 보이게 한 다음 값을 설정합니다.
- null을 넣었는데 반영되지 않는 경우: 최종 설정 값이 null이 아니라 undefined일 수 있습니다. undefined를 null로 처리시킬 수는 없으므로 공백이나 null이 들어가도록 값을 만드는 쪽(쿼리 등)을 수정합니다.

**키워드**: SetCellValue, CellValue, DataInsert, SetColHidden, undefined, Object, 값이 안 들어감

---

### [API-0006] SetCellValue가 -1을 반환하고 값이 수정되지 않습니다

**질문**

- 엑셀 업로드 후 ajax 검증 결과를 SetCellValue로 넣었더니 -1이 반환되고 값이 수정되지 않습니다. 반환값 -1은 무슨 의미인가요?

**답변**

`SetCellValue`는 정상 처리되면 undefined를 반환합니다. -1이 반환되었다면 지정한 행이나 열이 없는 경우입니다. 예를 들어 컬럼이 10개인 시트에서 `SetCellValue(5, 15, '가나다')`처럼 호출하면 -1이 반환됩니다.

**키워드**: SetCellValue, -1, 반환값, 존재하지 않는 열

---

### [API-0007] SetCellValue의 전체 인자 순서와 opt(event, endEdit, nocalc) 속성의 의미

**질문**

- SetCellValue 함수에 매뉴얼에 나오지 않는 숨겨진 인자가 있나요? 전체 인자 구성과 순서가 궁금합니다.
- SetCellValue의 opt에 들어가는 event, endEdit, nocalc 속성은 각각 무엇을 의미하나요?

**답변**

`SetCellValue`의 인자는 `(row, col, value, evt, raise, status, update, endEdit)` 순서입니다. 매뉴얼에 공개된 것은 `(row,col,value,event발생여부)` 4개이고 뒤의 인자들은 내부적으로 사용하는 것이며, 마지막 8번째 인자가 편집종료 여부입니다.
opt 속성의 의미는 다음과 같습니다.

- `event`: `OnChange` 발생 여부
- `endEdit`: 포커스 상태에서 포커스를 빼는 것
- `nocalc`: 합계/소계 재계산에 관한 속성

**키워드**: SetCellValue, evt, raise, status, endEdit, nocalc, event

---

### [API-0008] 반복문에서 SetCellValue를 호출할 때 OnChange가 발생하거나 스택 오버플로 에러가 납니다

**질문**

- DoSave 전에 for 문을 돌면서 조건에 맞는 셀을 SetCellValue로 공백으로 바꾸는데 스택 오버플로 에러가 발생합니다. 어떻게 해결하나요?
- 반복문에서 SetCellValue로 여러 셀에 값을 설정할 때 OnChange 이벤트가 발생하지 않게 하려면 어떻게 하나요?

**답변**

`SetCellValue`의 4번째 인자를 0으로 설정하면 `OnChange` 이벤트가 발생하지 않습니다. 스택 오버플로 에러가 날 때도 이 인자를 0으로 지정해 이벤트가 발생하지 않도록 합니다. 예: `mySheet.SetCellValue(num,i,value[i],0);`, `SetCellValue(row,col,'11',0)`

**키워드**: SetCellValue, OnChange, 스택 오버플로, 4번째 인자, DoSave

---

### [API-0009] SetCellValue로 날짜 컬럼에 01011900을 넣으면 SYS_InvalidDateFormat 메시지가 나옵니다

**질문**

- SetCellValue로 날짜 컬럼에 01011900(ddMMyyyy)을 넣으면 SYS_InvalidDateFormat 메시지가 나오는데 01-01-1900은 입력됩니다. 왜 그런가요?

**답변**

구분자 없는 날짜 값은 년월일시분초 순서로만 판단하므로 `01011900`은 형식에 맞지 않는다는 메시지가 출력됩니다. 구분자가 있는 `01-01-1900`은 정제된 데이터로 판단해 format을 참고하여 일월년으로 검사합니다. 따라서 `SetCellValue` 시에는 `dd-MM-yyyy`처럼 구분자를 붙이거나 `yyyyMMdd` 형태로 구분자 없이 값을 넣어야 하며, 붙여넣기 시에도 동일합니다.

**키워드**: SYS_InvalidDateFormat, SetCellValue, 날짜 형식, dd-MM-yyyy, yyyyMMdd

---

### [API-0010] 체크된 행만 대상으로 값을 일괄 설정하거나 행·범위 단위로 값을 바꾸려면 어떻게 하나요?

**질문**

- 체크박스로 선택된 행들만 대상으로 한 컬럼 값을 다른 컬럼에 옮기거나 조건에 따라 값을 일괄 변경하려면 어떻게 하나요?
- 콤보 값 변경에 따라 조회한 데이터를 우측 컬럼들에 행별로 채워야 하는데, SetCellValue로 일일이 넣는 것 외에 다른 방법이 있나요?

**답변**

`FindCheckedRow(0)`은 0번 체크박스 컬럼이 체크된 행들의 행 번호를 `|`로 이은 문자열로 돌려주므로, `split('|')`으로 나눠 반복하면서 `GetCellValue`로 읽고 `SetCellValue`로 설정합니다. 예: 체크된 행마다 한 컬럼 값을 읽어 다른 컬럼에 설정하거나, 비교 컬럼 값이 조건에 맞을 때 수량 컬럼 값을 바꿉니다.
`CellValue` 이외에 값을 변경하는 함수로 `RowData`(행 단위)와 `RangeValue`(특정 범위)가 있으니 개발자 매뉴얼을 참고합니다.

**키워드**: FindCheckedRow, GetCellValue, SetCellValue, RowData, RangeValue, 체크된 행

---

## 셀 텍스트·범위 일괄 처리

### [API-0011] Html 타입 컬럼에 SetCellText로 넣은 HTML 태그가 적용되지 않습니다

**질문**

- Html 타입 컬럼의 셀에 SetCellText로 HTML 태그를 넣었는데 태그가 적용되지 않습니다. 어떻게 해야 하나요?

**답변**

`span` 태그에 class 이름을 가져와 적용하는 방식 대신 `<p style=...>`처럼 태그에 style을 직접 지정하는 형태로 넣으면 적용될 수 있습니다.

**키워드**: SetCellText, Html, style, 태그 적용

---

### [API-0012] GetCellValue와 GetCellText는 무엇이 다른가요? 콤보 text, 콤마·포맷 포함 값을 읽으려면

**질문**

- 콤보 컬럼의 데이터를 읽을 때 code 값이 아니라 화면에 보이는 text 값으로 읽고 싶습니다. 어떤 함수로 읽나요?
- 숫자 컬럼 값을 GetCellText로 읽으면 천단위 구분자(콤마)가 포함되어 길이 검사가 맞지 않습니다. CellValue와 CellText는 어떻게 다른가요?
- float 컬럼에서 cellValue로 값을 가져오면 화면에 10.00으로 보이는 값이 10으로 반환됩니다.
- IBS_CopySheet2Form을 쓰면 Int형 컬럼 값이 콤마 없이 들어갑니다.

**답변**

`CellValue`는 원본값(포맷이 적용되지 않은 값)을, `CellText`는 눈에 보이는 그대로의 값을 읽습니다.

- 콤보: `GetCellText()`로 읽으면 text 값, `CellValue`로 읽으면 code 값이 읽힙니다.
- 숫자·포맷 컬럼: `CellValue`는 천단위 구분자와 포맷 구분자를 제거한 데이터를 읽습니다. 예를 들어 123456789를 `GetCellText`로 읽으면 123,456,789로 읽혀 length가 달라집니다.
- 포맷이 적용된 값 그대로(예: 원본값이 10일 때 `10.00`, 구분자 없는 `PhoneNo` 데이터에 '-' 포함)를 가져오려면 `GetCellText()`를 사용합니다. 구분자가 없는 데이터를 `GetCellValue`로 읽을 때 '-'를 붙여주지 않는 것이 기본 동작입니다.
- ibsheetinfo.js의 `IBS_CopySheet2Form`에서 콤마를 표시하려면 `GetCellValue`를 사용하는 부분을 `GetCellText`로 바꿉니다.

**키워드**: GetCellValue, GetCellText, CellValue, CellText, IBS_CopySheet2Form, Format, 콤보 text

---

### [API-0013] SetCellText로 화면 표시값만 바꾸고 SetCellValue 원본 값은 유지할 수 있나요?

**질문**

- SetCellText로 화면에 보이는 값만 O로 바꾸고 SetCellValue 값은 파일명 그대로 유지할 수 있나요?

**답변**

`SetCellValue`와 `SetCellText`는 모두 시트 내의 원본값을 변경하므로 가지고 있는 값과 보여지는 값을 다르게 할 수 없습니다. 파일명을 가지는 컬럼을 숨겨서 따로 만들고, 보여줄 컬럼은 O / X 값을 가지도록 구현해야 합니다.

**키워드**: SetCellText, SetCellValue, 표시값, 원본값, 숨김 컬럼

---

### [API-0014] Date 컬럼 값을 시트 객체(Cols)로 직접 접근하면 timestamp 숫자가 나옵니다

**질문**

- Format이 Ymd인 Date 컬럼 값을 시트 객체의 Cols로 직접 가져오면 숫자(timestamp) 값이 나옵니다. 포맷된 값이나 원본 값은 어떻게 가져오나요?

**답변**

시트 객체의 Date 타입은 내부적으로 Timestamp 값으로 변환된 값을 가지고 있어, 객체에 직접 접근하면 조회된 값과 다른 형태가 나옵니다. 조회 값이나 Format된 값은 매뉴얼의 API로 가져옵니다.

- 개별 셀: `GetCellValue()`, `GetCellText()`
- 선택 행: `GetRowData()`
- 선택 범위: `GetRangeValue()`
- 시트 전체 행: `GetSaveJson({AllSave:1})`(조회된 원본 데이터) 또는 `GetSaveString({AllSave:1})`

**키워드**: Cols, Timestamp, GetCellValue, GetRowData, GetRangeValue, GetSaveJson, Date

---

### [API-0015] ActiveX의 GetTransColText()는 IBSheet7에서 어떻게 대체하나요?

**질문**

- ActiveX에서 쓰던 GetTransColText() 함수를 IBSheet7에서는 어떻게 대체하나요? 변경된 행의 특정 컬럼 값을 가져오고 싶습니다.

**답변**

IBSheet7에는 `GetTransColText()`에 해당하는 함수가 없어 로직을 별도로 구현해야 합니다. `FindStatusRow("U|D")`로 변경된 행을 반환받은 뒤 `GetCellValue()`나 `GetCellText()`로 원하는 컬럼 값을 가져오는 방식으로 구현할 수 있습니다.

**키워드**: GetTransColText, FindStatusRow, GetCellValue, GetCellText, 변경된 행

---

### [API-0016] 특정 컬럼의 최대값·최소값을 구하려면 어떻게 하나요? (GetColMaxValue, GetColMinValue)

**질문**

- 데이터를 조회한 뒤 특정 컬럼의 가장 높은 값과 가장 낮은 값을 가져오는 방법이 있나요?

**답변**

7.0.13.67 버전부터 `GetColMaxValue`, `GetColMinValue` 함수를 사용합니다. 해당 함수를 사용할 수 없는 버전에서는 for loop로 직접 찾아야 합니다.

**적용 버전**: 7.0.13.67 이상

**키워드**: GetColMaxValue, GetColMinValue, 최대값, 최소값, 7.0.13.67

---

### [API-0017] Text 컬럼에 빈 값인 행이 있는지 확인하거나 저장 시 필수 입력을 검사하려면?

**질문**

- 시트의 Text 컬럼에 빈 값이거나 값이 없는 행이 있는지 확인하는 함수가 있나요? 저장할 때 필수 입력 여부를 검사하는 방법도 알고 싶습니다.

**답변**

`GetCellValue` 또는 `GetRowData`로 특정 셀 또는 행의 데이터를 추출해 확인할 수 있습니다. 저장 시 필수값 설정이 목적이라면 컬럼 설정(Cols)에 `KeyField:1`을 추가합니다.

**키워드**: GetCellValue, GetRowData, KeyField, 필수 입력, 빈 값

---

### [API-0018] GetSaveJson으로 수정된 데이터를 뽑을 때 특정 셀 값이 실제로 바뀌었는지 확인하려면?

**질문**

- getSaveJson으로 수정된 데이터를 뽑아 DB로 전달하기 전에 특정 셀의 값이 실제로 바뀌었는지 확인하고 싶습니다. 어떻게 하나요?

**답변**

`GetSaveJson`으로 가져온 내역에서 상태값이 U인 행만 고른 뒤, 컬럼마다 `GetSaveJson`의 saveName 데이터 값과 조회 당시 값을 가져오는 `CellSearchValue`(`GetSaveJson`에 들어 있는 rowIndex, saveName 이용)의 값을 비교합니다. 예제: https://jsfiddle.net/L41dc852/50

**키워드**: GetSaveJson, CellSearchValue, saveName, rowIndex, 변경 여부 확인

---

### [API-0019] 마스터 시트에서 선택·체크한 값을 디테일 시트에 표시하거나 체크하려면 어떻게 하나요?

**질문**

- 마스터 시트에서 선택한 값을 디테일 시트에 표시하려면 어떻게 해야 하나요?
- 마스터 시트의 삭제 체크박스를 클릭하면 디테일 시트에서 같은 키 값의 행이 전체 체크되게 하려면 어떻게 하나요?

**답변**

마스터 시트에서 `getCellValue`로 값을 가져와 디테일 시트에 `setCellValue`로 설정합니다. 체크박스 한 개를 코드로 체크하는 방법은 `SetCellValue()`로 해당 체크박스 셀의 값을 변경하는 것이며, 마스터 체크에 따라 디테일을 체크하는 구현도 이 방식을 참고할 수 있습니다.

**키워드**: getCellValue, setCellValue, SetCellValue, 마스터 디테일, 체크박스

---

### [API-0020] 상태(status) 컬럼 값을 코드에서 변경하려면 어떻게 하나요? (삭제 D, 전체 U)

**질문**

- 시트에서 status(상태) 컬럼에 들어 있는 값을 스크립트 코드로 다른 값으로 변경하고 싶습니다. 어떤 함수를 사용하나요?
- 시트의 상태 컬럼에 있는 특정 행의 상태를 사용자 조작 없이 코드에서 삭제 상태로 바꾸고 싶습니다.
- 헤더 전체체크가 체크된 상태이면 저장 시 모든 행의 상태(status)를 강제로 U로 바꿔 저장하려면 어떻게 하나요?

**답변**

`SetCellValue()`(`CellValue`)로 상태 컬럼의 셀 값을 변경합니다. 삭제 상태로 바꾸려면 상태 컬럼에 값을 `D`로 지정합니다.
모든 행의 상태를 `U`로 바꾸려면 `HeaderCheck()` 함수로 헤더 체크 값을 확인해 그 값이 `true`일 때 모든 행의 status를 `U`로 바꾸는 방식으로 처리할 수 있을 것으로 보입니다.

**키워드**: SetCellValue, CellValue, HeaderCheck, status, 상태 컬럼, D

---

### [API-0021] ShowFooterRow로 생성된 푸터 행의 컬럼 값은 어떻게 변경하나요?

**질문**

- ShowFooterRow로 생성된 푸터 행의 특정 컬럼 값을 코드에서 변경하려면 어떤 함수를 사용하나요? 특정 행의 값을 바꾸는 방법도 알고 싶습니다.

**답변**

푸터 행의 특정 컬럼 값은 `CellValue`로 변경합니다. 특정 행의 값을 바꾸는 방법은 `CellValue`와 `RowData` 함수를 참고합니다.

**키워드**: ShowFooterRow, CellValue, RowData, 푸터 행

---

### [API-0022] 수량 컬럼에 660,000을 입력하면 데이터의 길이 제한 범위가 초과되었습니다 에러가 납니다

**질문**

- 수량 컬럼에 660,000을 복사해 넣으면 '데이터의 길이 제한 범위가 초과되었습니다' 에러가 납니다. 행 추가 for loop와 OnChange 이벤트가 있는 화면에서 무엇을 점검해야 하나요?

**답변**

여러 문제가 복합적일 수 있으므로 다음을 점검합니다.

- 행을 추가하며 for loop를 돌릴 때 시작 index를 0으로 두어 헤더 행 개수를 제외하지 않았다면 `for(var i=mySheet.HeaderRows();i<rowCount+mySheet.HeaderRows();i++)`처럼 헤더 행 수를 반영합니다.
- 신규 행이 입력되는 시트의 `OnChange` 이벤트가 아직 입력되지 않은 컬럼의 값을 참조하면 순서 오류가 나므로, 기준이 되는 컬럼을 미리 `SetCellValue` 합니다.

**키워드**: 데이터의 길이 제한 범위가 초과되었습니다, HeaderRows, OnChange, SetCellValue, 행 추가 루프

---

### [API-0023] 행을 추가한 직후 특정 컬럼 값을 설정하거나 여러 셀을 한 번에 채우려면 어떻게 하나요?

**질문**

- 행을 추가한 직후 특정 컬럼에 계산 결과 같은 값을 넣으려면 어떻게 하나요?
- 행을 추가한 뒤 특정 행의 값을 CellValue로 셀마다 하나씩 설정하는 작업이 번거롭습니다. 더 간단한 방법이 있나요?
- 행의 특정 컬럼 값을 히든 컬럼에 자동으로 대입하고 싶습니다.

**답변**

`DataInsert()`가 반환하는 행 번호를 변수에 받아 `SetCellValue(row,col,값)`으로 해당 컬럼 값을 설정합니다. 여러 셀을 한 번에 채우려면 `RowData` 함수를 이용합니다.
다른 셀의 값을 가져와 자동으로 채워 주는 기능은 없습니다. 값이 조회 시와 저장 시에 달라지는 히든 컬럼 등은 Save를 하는 시점에 직접 해당 셀에 값을 넣어야 합니다.

**키워드**: DataInsert, SetCellValue, RowData, 행 추가, 히든 컬럼

---

### [API-0024] 특정 범위나 컬럼 전체의 값을 한 번에 읽거나 바꾸려면 어떤 함수를 쓰나요? (RangeValue)

**질문**

- 시트의 특정 영역(범위)의 값을 한 번에 뽑아 오는 함수가 있나요?
- for 문으로 셀마다 GetCellValue, SetCellValue를 호출하면 오래 걸리는데, 범위를 한꺼번에 바꾸거나 복사하는 함수가 있나요?
- A 컬럼의 최대값이나 최소값을 B 컬럼 전체 행에 loop 없이 한꺼번에 설정하는 방법이 있나요?
- 셀에 값을 입력하면 해당 행의 데이터를 초기화하려면 어떤 방법을 사용하나요?
- 초기화 버튼으로 특정 컬럼 값을 모두 0으로 되돌리려면 어떻게 하나요? CalcLogic과 연관된 컬럼이라 ColDelete로는 삭제되지 않는다고 합니다.

**답변**

- 읽기: `GetRangeText` 또는 `GetRangeValue`로 특정 영역의 값을 한 번에 추출합니다.
- 쓰기: `SetRangeValue`(또는 `SetRangeText`)로 범위를 지정해 한꺼번에 설정합니다. 범위 종료 셀의 Row Index는 `LastRow`, `RowCount`, `TotalRows` 등의 함수로 설정합니다. 정해진 범위를 복사할 때는 for 문에서 셀마다 `GetCellValue`와 `SetCellValue`를 호출하는 대신 `GetRangeValue`로 한 번에 가져와 `SetRangeValue`로 넣는 것이 좋습니다.
- 행 데이터를 초기화하는 방법으로 `RangeValue`를 사용합니다.
- 컬럼 데이터를 모두 0 등으로 초기화하는 것이 목적이라면 컬럼을 삭제하는 대신(`CalcLogic`과 연관된 컬럼은 `ColDelete`로 삭제되지 않는다는 문의가 있었습니다) for 반복문으로 데이터 행을 돌며 `SetCellValue()`로 설정할 수 있습니다.
- 컬럼 전체에 같은 기본값을 셀 값 설정 함수로 넣을 때는 for 루프로 행마다 설정하는 방식이 권장된 사례가 있습니다.

**키워드**: GetRangeValue, GetRangeText, SetRangeValue, SetRangeText, LastRow, CalcLogic, 범위 일괄 설정

---

## 행 데이터 읽기·쓰기

### [API-0025] 행 데이터를 셀 단위가 아니라 한 번에 가져오거나 설정하려면?

**질문**

- 행 데이터를 한 번에 가져오거나 변경할 수 있는 방법이 있나요?
- getCellValue로 셀마다 읽으면 너무 느린데 행 데이터를 한 번에 추출하는 API가 있나요?

**답변**

`RowData()`를 사용합니다. 하나의 함수에 get과 set이 모두 있어 행 단위로 값을 읽거나 설정할 수 있습니다. 이 기능은 7.0.5.0 버전부터 지원되므로 7.0.0.0 같은 이전 버전에서는 사용할 수 없습니다.

**적용 버전**: 7.0.5.0 이상

**키워드**: RowData, 행 단위 데이터, getCellValue, 행 데이터 추출, 행 데이터 설정

---

### [API-0026] 행 하나의 데이터를 JSON 객체로 가져오고 값을 읽으려면?

**질문**

- 행 하나의 데이터를 JSON 객체 형태로 반환받는 함수가 있나요?
- 사용 중인 버전에 GetRowData 함수가 존재하지 않을 때는 어떻게 하나요?
- getRowJson(Row)을 사용했는데 JSON 형태로 데이터가 리턴되지 않습니다.

**답변**

`GetRowData(row index)`가 해당 행의 데이터를 JSON 객체로 반환합니다. 사용 중인 버전에 이 함수가 없다면 최신 버전으로 교체해야 합니다. 반환된 JSON에서 값을 읽을 때는 `JSON데이터.키` 형태로 접근합니다.
7.0.0.0 버전의 `getRowJson(Row)`은 파라미터로 넘긴 행 번호의 데이터를 JSON 객체로 반환하는 함수입니다. 동작하지 않는다면 함수명을 잘못 쓴 것일 수 있으며, 콘솔창에서 직접 호출해 확인할 수 있습니다.

**적용 버전**: 7.0.0.0에서는 getRowJson

**키워드**: GetRowData, getRowJson, JSON 객체, 행 데이터 추출, 최신 버전

---

### [API-0027] 한 행이나 체크한 행의 데이터를 다른 행·다른 시트로 복사·이동하려면?

**질문**

- 시트에서 특정 행의 값을 복사해서 다른 행에 넣고 싶습니다.
- SetRowData로 값을 넣었는데 행이 추가되지 않습니다. 다른 시트 맨 아래에 행을 추가하며 넣고 싶습니다.
- 체크한 행의 데이터를 다른 시트로 복사하려는데 LoadSearchData로 넣으면 기존 데이터가 사라집니다.
- 시트 마지막에 행을 추가한 뒤 계산된 값을 셀별로 넣고 싶습니다.

**답변**

- 같은 시트의 행 복사: `GetRowData()`로 행 데이터를 추출해 `SetRowData()`로 넣습니다. saveName이 일치하는 데이터만 들어갑니다.
- 다른 시트 맨 아래에 추가: `SetRowData`의 `Add` 속성을 1로 주면 행이 추가되면서 데이터가 설정됩니다. 예: `targetSheet.SetRowData(-1, data, {Add:1})`(행 번호 -1은 마지막 행). 원본 시트의 행은 `RowDelete(sr)`로 삭제합니다.
- 마지막에 행을 추가한 뒤 값 입력: `DataInsert(-1)`로 추가한 다음 `setRowData` 또는 `setRangeValue()`로 넣으면 될 것으로 보입니다.
- 체크된 행을 다른 시트로 옮기기: (1) 체크된 행 기준 `GetSaveJson()` 결과를 두 번째 시트에 `LoadSearchData()`로 넣거나, (2) 체크된 행들의 `RowData()`를 가져와 `DataInsert()` 후 `SetRowData()`로 넣습니다. 단순 복사라면 `DataCopy()`도 가능합니다. `LoadSearchData()`는 기존 데이터를 지우므로 쌓으려면 `Append:1`을 지정하며, 속도 면에서는 `LoadSearchData({Append:1})` 방식을 선택할 수 있습니다.

**키워드**: SetRowData, GetRowData, Add, DataInsert, DataCopy, LoadSearchData, Append

---

### [API-0028] 팝업창 시트에서 선택한 행 데이터를 부모 창으로 전달하려면?

**질문**

- 팝업창의 그리드에서 선택한 행의 값을 부모 창으로 넘기려면 어떤 함수를 사용해야 하나요?
- 팝업 시트의 선택 행을 RowData로 메인 시트에 넣으려면 어떤 조건이 필요한가요?

**답변**

`RowData` 함수로 행 데이터를 json 객체로 추출하거나 `CellValue`로 특정 셀 값만 가져와 부모 창에 원하는 방식으로 넣습니다. `RowData`로 메인 시트에 그대로 넣으려면 메인 시트와 팝업 시트의 컬럼 세이브네임이 서로 일치해야 합니다. 일치시키기 어렵다면 `CellValue`로 셀 값을 하나씩 넣는 방법도 있습니다.

**키워드**: RowData, CellValue, 팝업, 부모 창, 세이브네임

---

### [API-0029] SetRowData로 일부 컬럼이나 콤보 컬럼 값을 넣을 때 규칙은?

**질문**

- SetRowData로 행 데이터를 넣을 때 헤더에 정의된 모든 컬럼 값을 넘겨야 하나요?
- SetRowData()로 데이터를 넣을 때 Combo 컬럼에는 데이터가 들어가지 않나요?

**답변**

- 일부 컬럼만 지정: 헤더에 정의된 모든 컬럼을 넘길 필요는 없습니다. 일부 컬럼의 `SaveName`만 정의하면 해당 컬럼 값만 변경되며, 행의 상태값은 수정 상태로 바뀝니다.
- 콤보 컬럼: 조회할 때와 마찬가지로 코드나 텍스트 둘 중 하나가 일치하면 값이 들어갑니다. 이 동작은 `InitComboNoMatchText` 설정과는 무관합니다.

**키워드**: SetRowData, SaveName, Combo, InitComboNoMatchText, 수정 상태

---

### [API-0030] 멀티라인에서 RowData/SetRowData 사용 시 첫 행에만 값이 들어가는 증상

**질문**

- rowData()로 데이터를 추출해 붙여넣으면 첫 번째 행에만 데이터가 들어갑니다.
- 멀티라인 데이터에서 setRowData()로 데이터를 넣으면 첫 번째 데이터 행에만 값이 세팅됩니다.

**답변**

멀티라인 레코드 처리 오류입니다. `rowData()` 추출 후 붙여넣기 시 첫 행만 입력되는 증상은 IBSheet7 7.0.13.88 버전 패치로, 멀티라인에서 `setRowData()`가 첫 번째 데이터 행에만 값을 세팅하는 증상은 7.0.13.93 버전 배포로 수정되었습니다. 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.88에서 수정(rowData), 7.0.13.93에서 수정(setRowData)

**키워드**: rowData, setRowData, 멀티라인, 첫 번째 행, 7.0.13.88, 7.0.13.93

---

### [API-0031] GetRowData로 가져온 값이 화면과 다릅니다(소수 자리 절사, 콤보 코드값)

**질문**

- 소수점 숫자를 GetRowData로 가져와 다른 시트에 복사하면 소수점 이하가 0일 때 소수 자리가 절사됩니다.
- GetRowData로 가져올 때 콤보 컬럼을 화면에 보이는 콤보 텍스트로 가져오고 싶습니다.

**답변**

`GetRowData()`는 행 데이터를 가져와 다른 시트나 다른 행에 데이터를 추가하기 위한 메소드로 설계되어 있어 다음 제약이 있습니다.

- 소수점이 0이면 소수 자리까지 가져오지 않습니다. 반복문에서 `GetCellText`로 값을 가져오거나, 붙여넣을 시트의 컬럼 Type을 원본과 같은 타입으로 바꾸고 `PointCount` 속성을 지정하면 소수 자리를 유지할 수 있습니다.
- 콤보 컬럼은 ComboText를 추출할 수 없습니다. 콤보 텍스트가 필요하면 `GetCellText(Row, Col)`로 각 행의 Combo 컬럼 값을 가져옵니다.

**키워드**: GetRowData, GetCellText, PointCount, ComboText, 소수점

---

### [API-0032] 버전 교체 후 그룹핑 시트의 GetRowData 값이 달라지는 이유

**질문**

- ibsheet.js를 상위 버전으로 교체한 뒤 그룹핑된 시트에서 GetRowData로 읽은 값이 달라졌습니다.
- 그룹핑된 시트에서 GetRowData 값 포맷이 맞지 않아 시트 내 버튼 동작이 되지 않습니다.

**답변**

그룹핑된 시트에서 `GetRowData`로 값을 읽을 때 7.0.13.119 버전까지는 콤보 값은 ComboCode가, 숫자는 int로 추출되었습니다. 121 버전부터는 ComboText로 추출되고 숫자도 구분자를 포함한 String이 되어 포맷이 달라집니다. 120 버전에서는 `GetRowData` 시 undefined가 나옵니다. 121 버전부터 최신 버전까지는 동일하게 동작하므로, 버전 교체 시 이 값 형식 차이에 맞춰 코드를 확인합니다.

**적용 버전**: 7.0.13.119 버전까지와 121 버전부터 동작이 다름, 120 버전은 undefined

**키워드**: GetRowData, 그룹핑, ComboCode, ComboText, 121 버전, 120 버전

---

### [API-0033] JsonAttribute(FontBold 등)가 GetRowData/SetRowData로 복사되지 않는 이유

**질문**

- JsonAttribute로 FontBold를 처리해 조회한 행을 GetRowData로 가져와 SetRowData로 붙이면 FontBold가 적용되지 않습니다.
- ColCondProperty 메서드를 사용했는데 동작하지 않을 때 JSON 데이터 구조에서는 어떻게 처리하나요?

**답변**

`GetRowData()`는 JsonAttribute를 추출하지 못하고 `SetRowData()`도 JsonAttribute가 들어간 문자열을 설정하지 못합니다. 대신 초기화 시 해당 컬럼에 FontBold 속성을 넣거나, onChange 시점에 JsonAttribute가 적용되어야 하는 조건을 다시 체크해 `CellFontBold()`로 처리합니다.
`ColCondProperty`가 동작하지 않을 때는 `UseJsonAttribute`를 1로 적용한 뒤 JSON 데이터 구조의 예약어 기능을 사용하는 것을 권장합니다.

**키워드**: JsonAttribute, FontBold, CellFontBold, ColCondProperty, UseJsonAttribute, GetRowData

---

### [API-0034] OnClick에서 GetRowData 호출 시 편집이 종료되어 콤보가 열리지 않는 문제

**질문**

- OnClick 이벤트에서 GetRowData()를 호출하면 셀 편집이 종료되어 콤보 목록이 열리지 않습니다.
- 편집을 유지한 채 행 데이터를 가져오려면 어떻게 하나요?

**답변**

`OnClick`에서 `GetRowData()`를 호출하면 편집이 종료되어 콤보가 열리지 않는 문제가 있었습니다. 패치된 버전에서는 `GetRowData(row, {EndEdit:0})`처럼 `EndEdit:0` 옵션을 지정해 편집을 종료하지 않고 행 데이터를 가져올 수 있습니다. 부작용 여부를 알기 어려워 매뉴얼에는 별도로 언급되지 않은 옵션이므로 필요한 경우에만 사용합니다.

**적용 버전**: 패치된 버전에서 지원

**키워드**: GetRowData, EndEdit, OnClick, 편집 종료, 콤보

---

### [API-0035] SetRowJson이 매뉴얼에서 사라졌고 값 설정 시 상태가 조회로 바뀝니다

**질문**

- 예전 소스에서 쓰던 SetRowJson 함수가 매뉴얼에서 사라졌는데 대신 사용할 함수가 있나요?
- SetRowJson으로 값을 입력하면 행 상태가 조회로 바뀌고 OnSearchEnd 이벤트가 발생합니다.
- DataInsert로 행을 추가하고 SetRowJson으로 데이터를 넣었더니 체크박스가 체크되지 않습니다.

**답변**

`SetRowJson`은 제품 초기에 만들어졌으나 값 입력 시 상태가 조회로 바뀌는 등 문제가 발견되어 현재는 사용되지 않으며 매뉴얼에서도 제거되었습니다. 이를 보완한 `RowData`(get/set)가 추가되었습니다. `GetRowData`는 이전 `GetRowJson`과 동일하게, `SetRowData`는 행 단위로 Value를 설정하도록 동작합니다. 행 데이터를 설정할 때는 `RowJson` 대신 `RowData`를 사용하며(예: `sheet1.SetRowData(nowIdx, usr)`), 별도의 마이그레이션 작업은 필요하지 않습니다.

**적용 버전**: 7.0.5.0 이후 RowData 사용

**키워드**: SetRowJson, RowJson, SetRowData, RowData, OnSearchEnd

---

## 행 추가·삭제·이동

### [API-0036] 행·컬럼·조회 데이터 전체를 삭제하는 함수는? (RowDelete, RemoveAll, ColDelete, RowCount)

**질문**

- 그리드에서 행을 삭제하려면 어떤 함수를 사용해야 하나요?
- 시트에 조회된 데이터를 한 건씩 삭제할 때와 전체를 삭제할 때를 알고 싶습니다.
- RemoveAll()은 데이터 행을 모두 지우는 함수로 알고 있는데, 특정 컬럼만 삭제하려면 어떤 함수를 사용하나요?
- 삭제한 뒤 남은 행의 개수나 조회/입력/수정/삭제 상태별 행 수는 어떻게 구하나요?

**답변**

- 행 삭제: `RowDelete`를 호출합니다. `DelCheck`로 행의 상태값을 삭제로 변경할 수도 있습니다.
- 조회된 데이터 전체 삭제: `RemoveAll()`을 사용합니다.
- 컬럼 삭제: `ColDelete()`를 사용합니다.
- 행 건수: `RowCount`로 구하며, 인자값에 따라 조회/입력/수정/삭제 건수를 구분해서 구할 수 있습니다.

**키워드**: RowDelete, RemoveAll, ColDelete, RowCount, DelCheck, 행 삭제

---

### [API-0037] RowDelete로 삭제하면 변경 여부 확인 함수에 잡히지 않거나 저장 시 삭제 flag를 넘길 수 없습니다

**질문**

- RowDelete로 행을 삭제한 뒤 데이터 변경 여부를 확인하는 함수가 동작하지 않는 것 같습니다. 삭제를 변경 사항으로 인식시키려면 어떻게 해야 하나요?
- 행 삭제 시 바로 화면에서 안 보이게 하려고 RowDelete 메서드를 쓰는데, 저장할 때 삭제된 행의 flag 값을 넘기고 싶습니다.

**답변**

`RowDelete()`로 삭제하면 행 자체가 사라지기 때문에 변경 사항으로 인식되지 않고 삭제된 행의 flag 값도 남지 않습니다. `DelCheck`나 체크박스 컬럼을 사용해 행의 Status가 `D`를 갖도록 해야 합니다. 삭제한 행을 화면에서 바로 안 보이게 하면서 저장 시 삭제된 행의 flag 값을 넘겨야 하는 경우에는 `RowHidden`을 사용합니다.

**키워드**: RowDelete, DelCheck, RowHidden, Status D, 변경 여부

---

### [API-0038] 새로 추가한 행을 DelCheck로 삭제할 때 삭제 여부를 묻고 삭제하려면? (NewRowDeleteMode)

**질문**

- 새로 추가한 행을 DelCheck 체크박스로 삭제할 때 삭제 여부를 묻고 삭제하려면 어떻게 설정하나요?

**답변**

`NewRowDeleteMode`를 `SetConfig` 함수 또는 `ibsheet.cfg`에 설정합니다.

**키워드**: NewRowDeleteMode, SetConfig, ibsheet.cfg, DelCheck

---

### [API-0039] OnSearchEnd에서 for문으로 RowDelete를 호출했는데 행이 제대로 삭제되지 않습니다

**질문**

- OnSearchEnd 이벤트 안에서 for문을 돌면서 RowDelete로 행을 삭제하는데 삭제가 제대로 되지 않습니다. 원인과 해결 방법은 무엇인가요?

**답변**

for문으로 여러 행을 삭제할 때는 마지막 행부터 거슬러 올라가며 `RowDelete`해야 합니다. 또한 `RowDelete`를 호출하는 시트 객체 이름이 실제 시트 이름과 같은지 확인합니다. 시트 객체 이름이 실제 시트와 달라 삭제가 되지 않은 사례가 있습니다.

**키워드**: RowDelete, OnSearchEnd, for문, 역순 삭제

---

### [API-0040] 마지막 남은 1행을 RowDelete로 삭제하면 Cannot read properties of null (reading 'ibidx') 오류가 납니다

**질문**

- 시트에서 마지막 남은 1행을 RowDelete로 삭제하면 `Cannot read properties of null (reading 'ibidx')` 오류가 납니다. 어떻게 해결하나요?

**답변**

마지막 남은 1행을 삭제할 때 발생하는 오류로 보이며, 이후 버전에서 패치되어 개선되었으므로 최신 버전 사용을 권장합니다.

**키워드**: RowDelete, ibidx, Cannot read properties of null, 마지막 1행

---

### [API-0041] 시트에서 특정 한 행만 초기화하려면 어떻게 하나요?

**질문**

- 시트에서 특정 한 행만 초기화하고 싶습니다. 어떤 함수들을 조합해서 사용해야 하는지 알려 주세요.

**답변**

`RowDelete()` 함수로 해당 행을 삭제한 뒤 `DataInsert()` 함수로 행을 다시 추가하는 방식을 사용합니다.

**키워드**: RowDelete, DataInsert, 행 초기화

---

### [API-0042] 행을 추가하는 함수는 무엇인가요? 맨 끝이 아니라 원하는 위치에 삽입하려면? (DataInsert)

**질문**

- 신규 행을 추가하려고 addRow를 호출했는데 동작하지 않습니다. IBSheet7에서는 어떤 함수를 사용하나요?
- 그리드에서 행을 추가할 때 맨 끝이 아니라 원하는 위치에 삽입하려면 어떤 함수를 사용하나요?

**답변**

IBSheet7에서는 `addRow`가 아니라 `DataInsert` 함수로 신규 행을 추가합니다. `DataInsert()` 호출 시 옵션으로 어떤 위치에 추가할지도 설정할 수 있습니다. 자세한 사용법은 IBSheet7 온라인 매뉴얼을 참고합니다.

**키워드**: DataInsert, addRow, 행 추가, 삽입 위치

---

### [API-0043] DataInsert로 추가된 행 번호는 어떻게 얻나요? 리턴값이 1로 나오는 경우는?

**질문**

- 행을 추가할 때 추가된 행에 포커스가 갈 때 발생하는 이벤트가 있나요? DataInsert 후 추가된 행 번호는 어떻게 알 수 있나요?
- DataInsert의 리턴값이 추가된 행의 index라고 알고 있는데, 최초 조회 직후 행을 추가하면 헤더가 3개인데도 3이 아닌 1이 반환됩니다.

**답변**

별도의 이벤트보다는 `DataInsert`가 추가된 행의 rowindex를 리턴하므로 `var a = mySheet.DataInsert();`처럼 반환값을 받아 그 값으로 이후 처리를 합니다.
최초 조회 직후 행을 추가했을 때 기대한 index가 아닌 1이 반환되는 것은 행 추가가 그리드가 다 그려지지 않은 시점에 실행되기 때문입니다. 행 추가 시점을 `OnSearchEnd` 시점으로 옮기면 정상적으로 동작합니다.

**키워드**: DataInsert, OnSearchEnd, rowindex, 반환값, 추가된 행 번호

---

### [API-0044] DataInsert로 생성한 행에 기본값이나 배경색을 지정하려면 어떻게 하나요?

**질문**

- 붙여넣기를 할 때 DataInsert()로 행 3개를 생성하는데, 그렇게 생성된 행에 기본값을 넣으려면 어떻게 하나요?
- 행을 추가했을 때 새로 추가된 행에만 다른 배경색을 넣고 싶습니다.

**답변**

- 기본값: 컬럼별 초기값은 `DefaultValue`로 설정하고, 행 단위로 값을 넣으려면 `SetRowData()`로 행 단위 값을 세팅합니다. 이는 Ctrl+C/Ctrl+V와는 상관없는 기능이며, 붙여넣기의 기본 동작은 복사한 값이 들어가는 것입니다.
- 배경색: `DataInsert()`로 행을 추가하고 그 추가된 행의 idx를 받아 `RowBackColor()`로 색상을 지정합니다.

**키워드**: DataInsert, DefaultValue, SetRowData, RowBackColor, 붙여넣기

---

### [API-0045] 기존 행의 값을 복사해 행을 추가하거나 특정 컬럼을 제외하고 복사하려면? (DataCopy)

**질문**

- DataInsert는 셀이 빈 행만 추가됩니다. 기존 행과 동일한 값으로 행을 복사하여 추가하려면 어떤 함수를 사용하나요?
- DataCopy로 행을 복사할 때 특정 컬럼은 복사에서 제외하고 싶습니다. 방법이 있나요?

**답변**

데이터를 복사하면서 행을 추가하는 함수는 `DataCopy` 또는 `RowData` 함수를 사용할 수 있습니다.
`DataCopy` 호출 시 특정 컬럼을 제외하고 복사하는 기능은 없습니다. 복사된 행을 받은 뒤 해당 컬럼의 셀 값을 비우는 로직을 추가합니다.

```
var Row = mySheet.DataCopy();
mySheet.SetCellValue(Row, "Test", "");
```

**키워드**: DataCopy, RowData, DataInsert, SetCellValue, 행 복사, 컬럼 제외

---

### [API-0046] DataInsert로 행을 추가했는데 행이 보이지 않거나 동작하지 않거나 스크립트 오류가 납니다

**질문**

- DataInsert()로 행을 추가했는데 행이 추가된 것 같지만 시트 안에 보이지 않습니다. 원인이 무엇인가요?
- DataInsert로 행 추가가 동작하지 않습니다. 헤더를 두 줄로 바꾼 것 외에는 변경이 없는데 원인을 어떻게 찾나요?
- 새 행을 추가한 뒤 삭제할 때 Chrome에서만 스크립트 오류가 발생하고 오류 위치가 ibsheet.js로 표시됩니다.

**답변**

다음을 점검합니다.

- 시트 높이를 재계산하는 코드에서 전체 높이를 `GetRowHeight()`와 `GetHeaderRowHeight()`의 합(예: 54)보다 작은 값(예: 45px)으로 지정하면 추가된 행이 보이지 않습니다. 그 합 이상의 높이로 지정해야 합니다.
- `DataInsert` 자체의 문제가 아니라 행을 추가하기 전 단계의 로직에서 스크립트 오류가 발생한 경우일 수 있습니다. 개발자도구(F12)로 해당 로직을 호출해 단위 테스트를 진행하면 오류 발생 지점을 찾을 수 있습니다.
- 행 추가 후 삭제하는 단순한 로직만으로는 오류가 날 만한 요인이 없으므로, `DataInsert` 이후에 실행되는 다른 로직이 문제일 수 있습니다. 콘솔에서 행 추가와 삭제만 단독으로 했을 때도 오류가 나는지 확인합니다.

**키워드**: DataInsert, GetRowHeight, GetHeaderRowHeight, 시트 높이, 스크립트 오류, ibsheet.js

---

### [API-0047] DataMove로 선택 행을 위·아래로 이동하려면? 아래로는 한 번만 내려갑니다

**질문**

- 버튼을 클릭했을 때 선택한 행을 위나 아래 행으로 이동시키려면 어떻게 해야 하나요?
- DataMove로 행을 위로 올릴 때는 잘 되는데 아래로 내릴 때는 동작하지 않거나 의도한 위치로 가지 않습니다.
- 사용자가 조회한 데이터의 행 순서를 위로 올리기, 아래로 내리기 버튼으로 바꾸고 싶습니다.
- 선택한 행을 직접 loop로 이동했더니 포커스된 div가 따라오지 않습니다.

**답변**

행 이동에는 `DataMove()` 함수를 사용하며, 직접 loop를 돌려 구현하기보다 `DataMove`를 쓰는 것이 좋습니다. 시트 바깥에 위로/아래로 버튼을 만들고 버튼마다 선택 행을 한 행씩 옮기는 로직을 개발자가 구현합니다.

- 위로 이동: `DataMove(sr-1)`처럼 -1을 지정합니다.
- 아래로 이동: `DataMove`는 내부적으로 `DataInsert()`, `DataCopy()`, `RowDelete()` 순으로 복사·삭제하므로 바로 밑이 아니라 현재 행+2로 지정합니다. 예: `mySheet.DataMove(mySheet.GetSelectRow()+2, mySheet.GetSelectRow());`, 2번 행을 한 칸 아래로 내리려면 `DataMove(4,2)`. 일반적으로 ToRow가 FromRow보다 클 때는 인덱스를 하나 더 추가합니다.
- `GetSelectRow()`로 선택 행(sr)을 구하고, 맨 위(`GetDataFirstRow()`)나 맨 아래(`GetDataLastRow()`)이면 이동하지 않도록 먼저 비교합니다.
공식 사이트 FAQ의 '선택행을 위/아래로 이동시키는 방법' 항목도 참고할 수 있습니다.

**키워드**: DataMove, 행 이동, 선택 행 위아래, GetSelectRow, DataInsert, DataCopy, RowDelete

---

### [API-0048] 행 위·아래 이동 시 SetRowData를 쓰면 행 상태값이 바뀌는 이유

**질문**

- 행 위/아래 이동 버튼을 SetRowData로 구현했더니 행 상태값이 변경됩니다.
- 행을 이동할 때 상태값이 변하지 않게 하려면 어떻게 하나요?

**답변**

행의 위치만 바꾸는 것으로는 상태값(status)이 변경되지 않으며, 위치 이동에는 `DataMove` 함수를 사용합니다. `SetRowData()`로 행 값을 재설정하면 동일한 데이터일 때는 상태가 바뀌지 않지만, 하나라도 다른 값이 들어오면 변경된 행으로 판단해 status를 `U`로 설정합니다. 트리 시트는 Level 값으로 소속 부모를 계산해 표시하므로 `SetRowData()` 중 트리 레벨값이 바뀔 수 있습니다. 단순한 행 위치 이동은 `DataMove`로 구현합니다.

**키워드**: DataMove, SetRowData, status, 행 상태값, 트리 Level

---

### [API-0049] 드래그로 행 데이터를 이동할 때 DataMove 처리 방법

**질문**

- DataMove를 이용해 드래그로 행 데이터를 이동하고 싶은데 어떻게 해야 하나요?
- 드래그로 행을 이동하는 참고 샘플이 있나요?

**답변**

`setConfig`의 `DragMode:1`로 설정하고 `OnDropEnd` 이벤트에서 `DataMove`를 처리합니다. 샘플의 Drag&Drop 항목 중 데이터 이동을 참조할 수 있습니다.

**키워드**: DragMode, OnDropEnd, DataMove, 드래그 앤 드롭, setConfig

---

### [API-0050] 멀티라인 레코드 시트에서는 DataMove로 행 이동이 되지 않습니다

**질문**

- 한 레코드가 여러 행으로 구성된 멀티라인 레코드 시트에서 DataMove로 행(레코드) 위치를 옮길 수 있나요?
- 멀티라인 레코드에서 위·아래 이동 버튼은 어떻게 구현하나요?

**답변**

멀티라인 레코드에서는 `DataMove()`를 이용한 행 이동을 지원하지 않습니다(`DataMove()`는 단위 데이터 행이 1개인 경우만 정상 동작). 대신 API를 조합해 구현합니다. 위·아래 버튼을 누르면 선택 행 기준으로 위쪽이나 아래쪽에 `DataInsert`로 행을 추가하고, 선택 행 데이터를 `GetRowData`/`SetRowData`로 복사한 뒤, 이전 행들을 `RowDelete`로 삭제하고 `SetSelectRow`로 이동한 행을 선택합니다. 예제: https://jsfiddle.net/1mjokrpd

**키워드**: DataMove, 멀티라인, GetRowData, SetRowData, RowDelete, SetSelectRow

---

### [API-0051] DataMove 후 포커스 색상이 행·셀 색상을 덮어 흰색으로 보입니다

**질문**

- 행 색상을 칠한 뒤 DataMove 함수로 행을 이동하면 포커스된 셀의 색상이 흰색으로 바뀝니다.
- 제품 수정 없이 이 현상을 해결할 수 있나요?

**답변**

DataMove 후 포커스 색상이 셀 색상을 덮는 현상은 제품 수정 없이 비공개 기능으로 처리할 수 있습니다. 비공개 기능은 `FRow`(현재 선택한 시트의 row 객체)와 `RefreshRow`(row 갱신 함수)입니다.

**키워드**: DataMove, FRow, RefreshRow, 포커스 색상, 행 색상

---

### [API-0052] 선택한 행을 복사해 맨 마지막 행으로 추가하려면?

**질문**

- DataCopy는 선택한 행 바로 아래에 복사되는데, 선택 행의 값을 맨 마지막 행으로 추가해 복사하려면 어떻게 하나요?
- 시트에서 특정 행을 복사해서 맨 아래에 붙여넣고 싶습니다.

**답변**

`DataCopy`는 선택 행 바로 아래에 행을 추가하므로 그 자체로는 마지막 행 추가 용도로 쓸 수 없습니다. 두 가지 방법이 있습니다.

- `DataCopy`로 복사한 뒤 추가된 행을 맨 아래로 옮깁니다. 예: `mySheet.DataCopy();mySheet.DataMove(mySheet.GetDataLastRow()+1);`
- `GetRowData()`로 선택 행 값을 얻은 뒤 `DataInsert()`로 행을 추가하고 `SetRowData()`로 값을 넣습니다.

**키워드**: DataCopy, DataMove, GetDataLastRow, GetRowData, DataInsert, 행 복사

---

## 행 수·행 번호·Seq

### [API-0053] 조회된 데이터 행 수(전체·소계 제외·상태별·최초 조회 건수)는 어떤 함수로 구하나요?

**질문**

- 조회된 데이터 행의 개수를 알 수 있는 방법이 있나요?
- OnSearchEnd에서 GetDataRows()로 조회된 전체 데이터 수를 구하려는데 데이터 유무와 상관없이 항상 1이 나옵니다.
- 행을 추가해도 getTotalRows() 값이 바뀌지 않고 최초 조회 시의 값이 나옵니다.
- RowCount가 소계 행까지 포함해서 계산되어 나옵니다. 소계 행을 제외한 행 수는 어떻게 구하나요?
- ActiveX 시트의 Rows처럼 조회한 전체 행의 갯수를 구하고 싶습니다.

**답변**

전체 데이터 행의 개수는 `RowCount()`로 확인합니다.

- `GetDataRows()`가 데이터 유무와 상관없이 1을 반환하는 경우에도 `RowCount()`로 확인합니다.
- `searchMode:2`를 사용하는 경우에는 `getTotalRows()` 대신 `RowCount()`를 사용합니다.
- 소계 행을 제외한 행 수는 `SearchRows`로 구할 수 있습니다. 다만 행을 추가하거나 삭제하면 `SearchRows`와 `RowCount`의 값이 달라집니다.
- 사용자가 수정·삭제해도 최초 조회 건수를 유지하려면 `RowCount('R')`, `RowCount('U')`, `RowCount('D')` 값을 더해서 변수에 담아 건수로 사용합니다.
- `RowCount`의 상태 인자는 `RowCount('R|U|I')`처럼 여러 상태를 한 번에 지정할 수 없고 하나의 값만 가져올 수 있습니다. 삭제 상태 행을 제외하려면 `RowCount() - RowCount('D')`처럼 전체에서 삭제 상태 행 수를 빼는 방식으로 구해야 할 것으로 보입니다.
- ActiveX의 `Rows`는 합계, 소계 등을 포함해 반환했지만 `RowCount` 함수는 데이터 행 갯수만 반환하므로 `Rows`를 그대로 대체하기에는 적합하지 않아 보이며, `LastRow` 함수를 사용하는 것이 맞아 보입니다.

**키워드**: RowCount, GetDataRows, getTotalRows, SearchRows, LastRow, 행 수, 조회 건수

---

### [API-0054] RowCount가 실제보다 크게 나오거나 이상한 값이 반환될 때 원인

**질문**

- RowCount 메서드를 사용해서 값을 출력해 보면 이상한 값이 나타납니다.
- 시트에는 4개 행이 보이는데 RowCount가 8을 반환하는 등 행 수가 정상적으로 리턴되지 않습니다.
- DoSearch로 20건을 조회한 뒤 SearchEnd 이벤트에서 RowCount가 실제보다 크게 반환됩니다.
- RowCount()가 조회 전에는 0이다가 조회 후에는 헤더 행 수까지 포함된 값으로 나옵니다.
- LoadExcel로 입력된 데이터에 대해 직접 만든 중복 체크 로직이 이상하게 동작합니다(루프를 TotalRow()로 돌림).

**답변**

다음 원인을 순서대로 확인합니다.

- 괄호 없이 `RowCount`로 사용하면 값이 이상하게 나타나므로 `RowCount()`처럼 괄호를 붙여 호출합니다.
- 조회 분기를 switch case 문으로 작성할 때 case마다 break가 없으면 다음 case의 코드(다음 `DoSearch`)까지 이어서 실행되어 행이 중복 조회됩니다. 해당 case에 break를 추가하면 정상 동작합니다.
- 7.0.13.62-20160826-20(SearchMode:2)에서 `DoSearch`로 20건을 조회했는데 SearchEnd 이벤트에서 `RowCount`가 40건으로 반환된 사례가 있습니다. 같은 20건을 `LoadSearchData`로 넣으면 20으로 정상 반환되며, 버그로 보이므로 우선 `GetTotalRows`를 사용하는 방법이 있습니다.
- 행 계산 방식이 헤더 영역부터 데이터 영역까지 포함되어 `RowCount` 결과에 헤더·푸터 행이 포함되어 보이는 사례가 있습니다(확정되지 않음). 데이터 첫 번째 행의 번호가 필요하면 `HeaderRows()`를 호출해서 사용합니다.
- `LoadExcel`로 입력된 데이터의 중복 체크 루프를 `TotalRow()`로 돌리면 이상하게 동작했고, 루프 범위를 `HeaderRows()+RowCount()`로 변경하자 정상 동작했습니다.

**적용 버전**: 7.0.13.62-20160826-20에서 RowCount 과대 반환 사례

**키워드**: RowCount, HeaderRows, TotalRow, GetTotalRows, LoadSearchData, switch break, LoadExcel

---

### [API-0055] 정렬·필터링 후 Seq(NO) 순번이 뒤섞이거나 그대로 남을 때 1부터 다시 매기려면? (ReNumberSeq)

**질문**

- 헤더 클릭으로 정렬하면 NO(순번) 컬럼 값도 행과 함께 섞여 데이터 개수 파악이 어렵습니다. 정렬 후에도 1, 2, 3 순서로 번호가 다시 매겨지게 하려면 어떻게 하나요?
- 필터링이나 정렬을 하면 SEQ 컬럼 번호가 기존 번호 그대로 남습니다. 화면에 보이는 행 기준으로 순번을 다시 매기려면 어떻게 하나요?

**답변**

`ReNumberSeq()` 함수로 Seq 컬럼의 순번을 다시 매깁니다.

- 정렬 후: `OnSort` 이벤트에서 호출합니다. 예: `function mySheet_OnSort(col, order) {mySheet.ReNumberSeq();}` 모든 화면에서 동작하게 하려면 ibsheet.com 자주 묻는 질문 11번 게시글 '공통 이벤트 사용하기'를 참고해 이벤트를 공통으로 사용합니다.
- 필터링 후: `OnFilterEnd` 이벤트에서 `ReNumberSeq({Visible:1})`처럼 적용하면 보이는 행 기준으로 번호가 매겨집니다. 보이는 행에서만 적용하는 옵션이 `ReNumberSeq({VisibleRow : 1})` 형태로 안내된 경우도 있으므로 사용하는 버전의 매뉴얼에서 옵션명을 확인합니다.
- 순번을 역순으로 하려면 `Order: 'desc'`를 추가로 적용합니다.

**키워드**: ReNumberSeq, OnSort, OnFilterEnd, Seq, Visible, VisibleRow, 순번 재설정

---

### [API-0056] 행을 삭제하면 Seq 순번 중간 번호가 비는데 다시 1번부터 채번하려면 어떻게 하나요?

**질문**

- 그리드에서 행을 삭제하면 순번이 1번부터 이어지지 않고 중간 번호가 빠집니다. 남은 행이 1번부터 다시 채번되게 하려면 어떻게 하나요?
- 체크박스로 선택한 행을 RowDelete로 삭제한 뒤 Type이 Seq인 컬럼의 순번을 다시 설정하려면 어떤 함수를 사용하나요?

**답변**

`ReNumberSeq()`를 호출하면 번호가 다시 채번됩니다. 행 삭제(`RowDelete`)나 DelCheck 삭제 표시한 행이 제거되어 번호가 비었을 때뿐 아니라, 정렬로 번호 순서가 뒤집혔을 때도 다시 채번할 수 있습니다.

**키워드**: ReNumberSeq, RowDelete, DelCheck, Seq 컬럼, 재채번

---

### [API-0057] ReNumberSeq로 Seq 번호를 역순(desc)으로 매기려는데 동작하지 않습니다

**질문**

- SEQ 번호를 역순(1,2,3,4를 4,3,2,1)으로 표시하려면 어떻게 하나요?
- Seq 타입 순번을 내림차순으로 바꾸려고 시트 초기화 구문 바로 아래에서 ReNumberSeq 메소드를 호출했는데 작동하지 않습니다.
- ReNumberSeq()를 호출했는데 잘 동작하지 않습니다. 어떤 조건을 확인해야 하나요?

**답변**

다음을 확인합니다.

- 호출 시점: `ReNumberSeq`는 시트에 Seq 컬럼이 렌더링되고 데이터가 로딩된 뒤에 사용하는 메소드입니다. 초기화 구문(`IBS_InitSheet`) 아래가 아니라 조회가 완료된 후 `OnSearchEnd` 같은 이벤트에서 `ReNumberSeq("desc")`를 호출해야 역순으로 정상 채번됩니다. 데이터가 많은 경우에는 DB에서 가져오는 편이 좋을 수 있습니다.
- 컬럼 타입: `ReNumberSeq`는 타입이 Seq인 컬럼에서만 사용할 수 있으며, 컬럼 타입이 text이면 동작하지 않습니다.

**키워드**: ReNumberSeq, desc, OnSearchEnd, IBS_InitSheet, Seq, 역순 순번

---

### [API-0058] 서버 페이징(SearchMode 4)에서 ReNumberSeq는 전체 데이터 기준으로 순번을 매기나요?

**질문**

- 서버 페이징 방식(SearchMode 4)에서 Seq 컬럼을 ReNumberSeq로 재정렬하면 전체 데이터 기준으로 순번이 매겨지나요?

**답변**

전체 기준으로는 매겨지지 않습니다. `SearchMode:4`는 `smServerPaging2` 방식으로 페이지에 해당하는 데이터만 서버에서 받아 표시하므로 시트는 한 페이지 분량의 데이터만 가지고 있습니다. 따라서 Seq 컬럼 재정렬은 전체 데이터에 대한 순번이 아니라 시트가 가진 데이터에 대한 순번만 가능합니다.

**키워드**: ReNumberSeq, SearchMode:4, smServerPaging2, 서버 페이징, Seq

---

### [API-0059] 시트의 총 행(로우) 개수를 구하려면? (SearchRows, LastRow, GetDataLastRow)

**질문**

- 시트에서 그리드의 총 로우(행) 개수를 구하는 메서드가 무엇인가요?
- 그리드에 있는 전체 데이터 행의 개수를 알 수 있는 함수가 있나요?
- DoSearch(Append:1)로 이어 붙여 조회하는데 SearchRows가 계속 같은 값으로 옵니다.
- ActiveX 시트의 Rows 속성을 IBSheet7에서는 무엇으로 대체하나요?

**답변**

- 총 행 개수는 `HeaderRows`, `LastRow`, `GetDataLastRow`를 사용해 구합니다.
- 전체 데이터 행 수는 `GetSaveJson({AllSave: 1}).data.length` 또는 `GetDataLastRow()`로 확인합니다. 전체 데이터를 JSON(`GetSaveJson`)이나 Query String(`GetSaveString`)으로 받으려면 AllSave 값을 1로 설정합니다.
- LazyLoad 방식으로 TotalRow 값을 조회 데이터와 함께 보내 SearchRows와 비교하는 경우 `DoSearch(Append:1)`로 이어 붙여도 SearchRows는 계속 같은 값이 옵니다. 이때는 `LastRow()-HeaderRows()`로 행 수를 구해 볼 수 있습니다.
- ActiveX의 `rows`는 헤더행 포함 행 수를 리턴하지만 IBSheet7에는 같은 값을 주는 속성이 없습니다. 조회 데이터 유무는 `SearchRows() > 0`(없는지 볼 때는 `SearchRows() == 0`)로 비교하는 것이 정확합니다. `LastRow()+1`은 합계행이 있으면 부정확합니다.

**키워드**: SearchRows, LastRow, GetDataLastRow, HeaderRows, AllSave, GetSaveJson

---

### [API-0060] 전체 데이터 행이 23개인데 마지막 행의 row 값이 24로 반환됩니다

**질문**

- 전체 데이터 행이 23개인데 선택된 마지막 데이터 행의 row 값이 24로 반환됩니다. 값이 이상한 것 아닌가요?

**답변**

정상입니다. 행 번호는 헤더 행부터 계산하며 0부터 시작합니다. 헤더 행이 포함된 전체 25개 행 중 마지막 행의 번호는 24가 맞습니다.

**키워드**: row index, 헤더 행, 마지막 행 번호, 0부터 시작

---

### [API-0061] 데이터 첫 행·마지막 행의 index를 구하려면? (GetDataFirstRow, GetDataLastRow, LastRow)

**질문**

- 조회된 데이터 영역의 첫 번째 행 번호를 알아내는 방법이 있나요?
- 현재 조회된 데이터 중 맨 위 행과 맨 마지막 행의 행 번호(index)를 반환하는 메서드가 있나요?
- 합계 행이 있을 때 LastRow()로 계산하면 값이 예상과 다르게 나옵니다.
- 시트의 마지막 행(row)이 어느 행인지 알고 싶습니다.

**답변**

- `GetDataFirstRow()`와 `GetDataLastRow()`로 데이터 행의 첫 번째·마지막 행 index를 얻습니다. `GetDataFirstRow()`는 7.0.13.37 버전부터 추가되었으며 그 이전 버전은 계산할 방법이 없어 업그레이드해야 합니다.
- `lastRow`(`LastRow()`)로 마지막 행을 알 수 있지만, 합계 행이나 소계 행이 포함되면 그 마지막 index를 가집니다. `SearchMode:4` 화면에서 조회된 데이터만 기준으로 마지막 데이터 행의 index를 찾으려면 `LastRow()` 대신 `GetDataLastRow()`를 사용합니다.
- `GetDataFirstRow()`/`GetDataLastRow()`는 페이지 수에 해당하는 값이 더해진 형태로는 가져올 수 없으므로, 페이지 기준 값이 필요하면 `GetPageCount()`를 이용해 직접 변수 값을 만듭니다.

**적용 버전**: GetDataFirstRow는 7.0.13.37 이상

**키워드**: GetDataFirstRow, GetDataLastRow, LastRow, GetPageCount, SearchMode, 합계 행

---

### [API-0062] 화면에 보이는 마지막 행 index는 어떻게 구하나요? (ViewRows 대체)

**질문**

- sheet3의 ViewRows 속성처럼 화면에 보이는 행과 관련된 값을 sheet7에서 구하는 함수가 있나요?

**답변**

`LastRow(1)`을 호출하면 보이는 화면의 마지막 행 index가 리턴됩니다.

**키워드**: LastRow, ViewRows, 화면에 보이는 행, 마지막 행 index

---

### [API-0063] 조회된 전체 행을 반복문으로 돌며 값을 검사하려면 시작·끝 행을 어떻게 잡나요?

**질문**

- 조회된 시트의 전체 행을 돌며 특정 컬럼 값이 조건에 맞는지 검사해 처리(예: 팝업 표시)하려면 어떻게 하나요?
- OnSearchEnd 이벤트에서 조회된 모든 행을 반복하며 처리하려면 시작·끝 행을 어떻게 잡아야 하나요?

**답변**

행 수만큼 for 반복문을 돌리는 함수를 만들고, 그 안에서 `cellvalue()`(`GetCellValue(행, 컬럼)`)로 조건에 맞는 값을 확인한 뒤 원하는 동작(예: 팝업)을 수행합니다. 시작 행은 `mySheet.HeaderRow` 또는 `HeaderRows()`, 마지막 행은 `LastRow()` 또는 `RowCount()`를 사용합니다. `LastRow()`는 합계 행이 있으면 합계 행까지 반환하므로 주의합니다. 행 개수를 반환하는 함수로는 `TotalRows`, `SearchRows`, `RowCount`가 있습니다.

**키워드**: GetCellValue, LastRow, HeaderRows, RowCount, OnSearchEnd, 반복문

---

### [API-0064] 헤더가 여러 줄일 때 전체 헤더 높이는 어떻게 구하나요?

**질문**

- 헤더 행이 여러 줄일 때 GetHeaderRowHeight()는 한 줄 높이만 반환합니다. 전체 헤더 높이는 어떻게 구하나요?

**답변**

`HeaderRows()`가 헤더 행의 개수를 반환하므로 `GetHeaderRowHeight() * HeaderRows()`로 계산합니다.

**키워드**: GetHeaderRowHeight, HeaderRows, 헤더 높이, 여러 줄 헤더

---

### [API-0065] GetRowData 말고 전체 행 데이터를 한 번에 가져오는 방법은?

**질문**

- GetRowData 말고 시트의 전체 행 데이터를 한 번에 불러오는 메소드는 없나요?

**답변**

`rangeValue`를 사용합니다. 예: `rangeValue(GetDataFirstRow(), 0, GetDataLastRow(), LastCol());`

**키워드**: rangeValue, GetDataFirstRow, GetDataLastRow, LastCol, 전체 데이터

---

### [API-0066] 시트의 전체 셀 개수를 구하는 함수가 있나요?

**질문**

- 시트의 총 cell 개수(count) 값을 구하는 함수가 있나요? 없다면 어떻게 계산할 수 있나요?

**답변**

시트의 전체 셀 개수를 구하는 함수는 제공하지 않습니다. 셀 영역이 병합되어 있지 않다면 `LastRow()`와 `LastCol()` 함수로 전체 행과 열의 개수를 구해 셀 수를 계산할 수 있습니다.

**키워드**: LastRow, LastCol, 셀 개수, cell count

---

## 행 상태·변경 확인·복원

### [API-0067] 헤더 영역의 행(줄) 수를 확인하는 함수는 무엇인가요?

**질문**

- 헤더 영역에 몇 개의 행이 있는지 알 수 있는 함수가 있나요? 여러 줄 헤더의 행 수를 확인하고 싶습니다.
- 시트의 헤더 행이 몇 개인지 확인하려면 어떤 함수를 사용하나요?

**답변**

`HeaderRows()` 함수로 헤더 영역의 행 개수를 확인할 수 있습니다.

**키워드**: HeaderRows, 헤더 행 수, 여러 줄 헤더, 헤더 영역

---

### [API-0068] 시트 데이터가 편집·변경되었는지, 어느 행이 수정되었는지 확인하는 방법

**질문**

- 사용자가 데이터를 편집한 뒤 저장하지 않고 조회 버튼을 누르는 경우가 있습니다. 시트 데이터가 편집되었는지 확인하는 메서드가 있나요?
- 신규 행을 추가하거나 수정했을 때 변경이 있었는지, 어느 행에 수정이 있는지, 입력·수정 건수는 몇 건인지 어떻게 확인하나요?

**답변**

- 변경이 있었는지 여부: `IsDataModified()`를 호출합니다(저장하지 않고 조회하려는 경우의 확인에도 사용).
- 어느 행에 수정이 있는지: `FindStatusRow()`를 사용합니다.
- 입력·수정 등이 몇 건인지: `RowCount()`를 호출합니다.

**키워드**: IsDataModified, FindStatusRow, RowCount, 변경 여부, 편집 확인, 저장 전 확인

---

### [API-0069] 수정한 값을 원래(조회 당시) 값으로 되돌리거나 Undo(Ctrl+Z)를 쓰려면 어떻게 하나요?

**질문**

- 시트에 편집을 되돌리는 Undo(Ctrl+Z) 기능이 있나요? 수정한 값을 원래 값으로 되돌리려면 어떻게 하나요?
- 사용자가 데이터를 수정하는 중에 특정 행이나 셀을 원래(조회 당시) 값으로 되돌리게 하려면 어떤 함수를 사용하나요?

**답변**

편집 이전 값으로 되돌리는 Undo는 단축키나 함수로 지원하지 않으며, 값을 여러 번 바꾼 뒤 직전 값으로 복원하는 것도 어렵습니다. 최초 조회값으로의 복원은 가능합니다.

- `ReturnData(row)`로 행을, `ReturnCellData(row,col)`로 셀을 조회된 초기 상태로 되돌릴 수 있습니다. `CellSearchValue`로 값을 얻은 뒤 `SetCellValue`로 다시 넣는 방법도 있지만, 값을 다시 넣어야 하므로 `ReturnData`, `ReturnCellData`를 사용하는 것이 좋습니다.
- Ctrl+Z 단축키로 최초 조회값을 복원하려면 `OnKeyDown`에서 `KeyCode == 90 && Shift == 2`를 검사해 `SetCellValue(Row, Col, mySheet.CellSearchValue(Row, Col))`로 되돌립니다.

**키워드**: ReturnData, ReturnCellData, CellSearchValue, Undo, Ctrl+Z, OnKeyDown, SetCellValue

---

### [API-0070] 수정하기 전 조회 당시의 원본 값을 확인하려면 어떻게 하나요? (CellSearchValue)

**질문**

- 사용자가 셀 값을 수정한 뒤에도 수정되지 않은 원본 값을 알고 싶습니다. 어떤 함수를 사용하나요?
- onchange에서 값이 A에서 B, 다시 C로 여러 번 바뀌었을 때 최초 조회 시점의 값(A)은 어떻게 알아내나요? oldValue로는 안 되나요?
- 셀 값을 바꿨다가 다시 조회 당시의 초기 값으로 돌아왔는지 판단해 폰트 색상을 바꾸려고 합니다.

**답변**

조회 당시의 셀 값은 `CellSearchValue(Row, Col)`로 확인합니다. 저장하기 전이나 값을 수정하고 포커스를 옮긴 뒤에도 조회된 초기 값을 가져올 수 있습니다.

- `onChange` 이벤트의 `oldValue`는 변경 직전 값이라 여러 번 변경되면 조회 시점의 데이터를 찾을 수 없으므로 `CellSearchValue()`를 사용합니다.
- `CellSearchValue(Row, Col)` 값과 `GetCellValue(Row, Col)` 값을 비교해 다르면 변경된 것으로 판단할 수 있고, 필요하면 `SetCellValue`로 원래 값으로 되돌릴 수 있습니다.

**키워드**: CellSearchValue, GetCellValue, SetCellValue, oldValue, onChange, 조회 당시 값

---

### [API-0071] CellSearchValue로 조회 시점 데이터를 가져오는데 빈 값이 반환됩니다

**질문**

- CellSearchValue로 조회 시점의 데이터를 가져오는데 빈 값이 반환됩니다. 어떤 경우에 그런가요?

**답변**

조회 완료 시점에 상태값을 강제로 I나 U로 바꾸면, 특히 I로 바꾸는 과정에서 원래 데이터가 사라져 빈 값이 반환될 수 있습니다. 이 경우 `onChange` 이벤트의 `oldValue`를 이용하는 방법을 사용할 수 있습니다.

**키워드**: CellSearchValue, oldValue, onChange, 빈 값, 상태값 I

---

### [API-0072] SetCellValue 호출 시 OnChange가 발생하거나 OnChange 안에서 무한 루프(Maximum call stack size exceeded)가 납니다

**질문**

- OnChange 이벤트에서 SetCellValue로 값을 바꾸면 무한 루프에 빠지거나 Maximum call stack size exceeded 에러가 납니다. 어떻게 막나요?
- SetCellValue로 값을 바꾸면 OnChange 이벤트가 발생하는데, 이벤트 없이 값을 치환하려면 어떻게 하나요?

**답변**

`SetCellValue`의 이벤트 발생 여부 인자를 0으로 설정합니다. 예: `SetCellValue(Row, Col, Value, {event:0})`. `OnChange` 안에서 값을 바꿀 때 `OnChange`가 다시 발생해 무한 루프가 돌면 `Maximum call stack size exceeded` 에러가 발생합니다.
`{event:0}`를 주면 `onchange` 이벤트를 발생시키지 않고 값을 치환할 수 있습니다. 값을 변경하면 행 상태가 바뀌므로, 필요하면 상태를 조회 상태(`R`)로 되돌려야 합니다. 저장 로직을 사용하지 않고 상태 변경 표시도 필요 없다면 상태 컬럼을 두지 않아도 됩니다(시트는 status 컬럼의 데이터를 기준으로 변경 데이터를 추출합니다).

**키워드**: SetCellValue, OnChange, event:0, Maximum call stack size exceeded, 무한 루프, status

---

### [API-0073] SetCellValue로 값을 바꿀 때 행 상태가 수정으로 바뀌지 않게 하려면 어떻게 하나요?

**질문**

- SetCellValue의 마지막 인자를 0으로 주어 OnChange를 막았는데도 행 상태가 수정으로 바뀝니다. 상태값을 바꾸지 않고 값을 넣으려면 어떻게 하나요?
- 조회된 시트에서 특정 컬럼의 데이터가 바뀌어도 행 상태가 '수정'으로 변하지 않게 하는 옵션이 있나요?
- 조회가 끝나면 첫 번째 행의 체크 컬럼이 체크된 상태이길 원합니다. 행 상태가 수정으로 바뀌거나 OnChange가 발생하지 않게 하려면?

**답변**

`SetCellValue`의 4번째 인자는 `OnChange` 이벤트 발생 여부이지 행의 상태값 변경 여부가 아닙니다. 인자 순서는 `SetCellValue(row, col, value, evt, raise, status)`이며 `evt`는 OnChange 발생 여부(기본 1), `raise`는 OnChange의 RaiseFlag값(기본 0), `status`는 상태값 변경 여부(기본 1)입니다.

- 상태를 바꾸지 않으려면 6번째 인자 `status`를 0으로 줍니다. 예: `SetCellValue(1, 2, 'a', 1, 0, 0)`.
- 값을 바꾼 뒤 상태 컬럼 값을 빈값이나 `'R'`로 설정해 조회 상태로 유지하거나 되돌릴 수도 있습니다. 예: `OnSearchEnd`에서 `SetCellValue(HeaderRows(), 0, 1, {event:0})`로 값을 바꾸고, `SetCellValue(HeaderRows(), 'status', '', {event:0})`로 상태를 비웁니다. `SetCellValue()`로 바꾼 경우 이어서 해당 행의 상태 컬럼 값을 빈값으로 설정합니다(예: `mySheet.SetCellValue(1, 0, "")`).
- 사용자가 직접 편집하는 경우에는 편집 직후 발생하는 `OnAfterEdit` 이벤트에서 상태 셀을 공백으로 설정합니다.

**키워드**: SetCellValue, status, OnAfterEdit, OnSearchEnd, event:0, 행 상태 수정, HeaderRows

---

### [API-0074] 조회 후 SetCellValue로 값을 넣으면 행 상태가 수정(U)으로 바뀝니다. 조회 상태로 되돌리려면?

**질문**

- 조회 후 아무것도 수정하지 않았는데 상태가 자동으로 수정(U)으로 바뀝니다. OnRowSearchEnd에서 데이터를 가공해 다시 넣는데 U로 바뀌지 않게 하려면 어떻게 하나요?
- OnSearchEnd나 LoadSearchData 이후에 SetCellValue로 일부 값을 채웠더니 행 상태가 수정(U)이 됩니다. 상태를 다시 빈값으로 되돌리는 방법이 있나요?
- 수정이나 SetRowData로 행의 상태값(status)이 바뀐 뒤 다시 조회 상태로 되돌리려면 어떻게 하나요?

**답변**

기본 Status는 조회 데이터 기준으로 빈값이며, 셀 값이 하나라도 바뀌면 해당 행은 U(수정), DelCheck 체크나 `RowDelete`로 삭제하면 D(삭제), 새 행은 I(입력)가 됩니다. 조회 후 `OnSearchEnd`나 `OnRowSearchEnd`에서 `SetCellValue()`로 값을 넣으면 상태가 바뀌는 것이 정상입니다.

- 수정 상태가 되지 않게 하려면 `OnRowSearchEnd`에서 `SetCellValue`로 상태값을 다시 `R`로 교체합니다. 상태값을 빈값으로 바꾸어도 조회 상태로 되돌릴 수 있습니다.
- 상태를 한 번에 바꾸는 함수는 없으므로 `onLoadData`에서 status를 일괄 변경하거나, `onSearchEnd`에서 for loop로 `SetCellValue`를 이용해 status 값을 바꿉니다.

**키워드**: SetCellValue, OnRowSearchEnd, OnSearchEnd, onLoadData, LoadSearchData, SetRowData, Status

---

### [API-0075] 조회된 데이터의 상태(Status) 값을 전체 행에 한 번에 바꾸려면 어떻게 하나요?

**질문**

- 조회가 끝난 뒤 조회된 데이터의 상태(status) 값을 원하는 값으로 바꿔 줄 수 있는지 궁금합니다. 어떤 이벤트에서 어떤 함수로 바꾸면 되나요?
- 조회된 그리드 전체 행의 Status 값을 한 번에 바꾸는 함수가 있나요?

**답변**

Status를 한 번에 바꾸는 함수는 없습니다. 바꾸려는 시점에 for loop로 `SetCellValue` 함수를 이용해 status 값을 변경해야 합니다.

- `OnSearchEnd`에서 전체 행을 한꺼번에 바꾸거나, `OnRowSearchEnd`에서 조회된 행 단위로 바꿉니다.
- 조회 데이터라면 서버에서 데이터를 받는 시점의 `onLoadData`나 화면 표시 이후의 `onSearchEnd`에서 일괄 변경할 수도 있습니다.

**키워드**: SetCellValue, OnSearchEnd, OnRowSearchEnd, onLoadData, Status, 상태값 일괄 변경

---

### [API-0076] 조회한 행을 수정한 뒤 update가 아니라 신규 insert로 저장되게 하려면 행 상태를 어떻게 바꾸나요?

**질문**

- 조회한 데이터를 수정한 뒤 저장할 때 기존 데이터 update가 아니라 신규 데이터로 insert 되게 하려면 행 상태를 어떻게 바꾸나요?

**답변**

행의 상태 값에 따라 insert, update, delete가 동작하는 것으로 판단됩니다. 상태를 입력으로 바꾸려면 `SetCellValue`로 상태 값을 `I`로 적용합니다. 서버에서 상태에 따라 어떻게 처리하는지는 서버 구현을 확인해야 합니다.

**키워드**: SetCellValue, 상태 값 I, insert, update, 행 상태

---

### [API-0077] 행 상태값을 읽거나 바꿀 때 GetRowStatus/SetRowStatus 대신 무엇을 쓰나요?

**질문**

- 소스 코드에 SetRowStatus 메소드가 사용되고 있는데 매뉴얼에서는 찾을 수 없습니다. 어떤 용도의 메소드이고 어떻게 사용하나요?
- 행의 상태값(RowStatus)을 가져오려고 합니다. GetCellValue와 GetRowStatus가 모두 있는데 어떤 것을 사용하는 것이 좋은가요?

**답변**

`SetRowStatus`는 행의 상태값을 변경하는 메소드로 `SetRowStatus(i, 'U')`처럼 사용할 수 있으나 예전에 사용하던 메소드로 보입니다. 상태 컬럼이 있으면 `GetCellValue`/`SetCellValue`로 처리하세요. 상태값을 가져올 때도 `GetRowStatus`가 있지만 `GetCellValue`(`CellValue`)로 가져오는 것을 권장합니다.

**키워드**: SetRowStatus, GetRowStatus, GetCellValue, SetCellValue, 행 상태

---

### [API-0078] IsDataModified가 항상 false/true이거나 변경 여부를 인식하지 못합니다

**질문**

- IsDataModified를 호출했는데도 계속 false가 반환됩니다. 시트의 변경 여부가 인식되지 않는 원인이 무엇인가요?
- mySheet.IsDataModified를 조건문에 썼더니 조회 후 데이터가 없는 단순 조회 상태인데도 항상 TRUE로 분기됩니다.
- 시트의 상태값(상태 컬럼)이 바뀌지 않는다고 의심될 때 어떤 순서로 확인하나요?

**답변**

다음 순서로 확인합니다.

- Status 컬럼 유무: 시트가 행의 상태를 U/I/D로 판단하려면 Status 컬럼이 있어야 합니다. 없으면 변경 여부를 판단하지 못할 수 있으므로 hidden 컬럼으로라도 Status 컬럼을 추가합니다. `status` 컬럼을 설정하면 시트의 상태값을 확인할 수 있습니다.
- 호출 형태: `mySheet.IsDataModified()`처럼 함수 형태(괄호를 붙여 호출)로 사용해야 합니다. 괄호 없이 쓰면 의도와 다르게 TRUE로 분기될 수 있습니다.
- 호출 시트: 값을 변경한 시트와 다른 시트에서 `isDataModified`를 호출하면 확인되지 않으므로, 값을 변경한 시트 객체에서 호출합니다.
- 상태값이 제대로 나오면 콘솔에서 `mySheet.IsDataModified()`를 찍어 보고, 1이 잘 찍히면 시트 밖에서 값을 넘기는 과정에 오류가 있을 수 있습니다.

**키워드**: IsDataModified, isDataModified, Status, status 컬럼, 변경 여부, hidden

---

### [API-0079] 시트에서 최초값(처음 값)을 확인하려면 어떤 메소드를 쓰나요?

**질문**

- 시트에서 최초값(처음 값)을 확인하려면 어떤 메소드를 사용하나요?

**답변**

`ReturnCellData` 메소드를 이용해 시트의 최초값을 확인합니다.

**키워드**: ReturnCellData, 최초값, 조회 당시 값

---

### [API-0080] 시트의 상태값을 한 줄로 초기화하려면 어떻게 하나요?

**질문**

- 시트의 상태값을 초기화하려면 어떤 함수를 어떻게 호출해야 하나요? 한 줄로 처리하는 방법이 있나요?

**답변**

`LoadSaveData` 함수에 결과 코드 0을 담은 문자열을 넘기는 `mySheet.LoadSaveData("{Result:{Code:'0'}}");` 한 줄을 호출하면 됩니다.

**키워드**: LoadSaveData, 상태값 초기화, Result Code

---

### [API-0081] 수정(U)·삭제(D) 등 특정 상태의 행을 찾으려면 어떻게 하나요? (IsDataModified, FindStatusRow)

**질문**

- 데이터를 수정했을 때 상태값이 변경된 행이 있는지, 수정한 행이 어느 행인지 확인하려면 어떤 함수를 사용하나요?
- IBSheet7에서 행 상태(status)가 U인 행만 골라서 가져오는 별도의 함수가 있나요? 호출 방법도 궁금합니다.
- 이전 버전의 GetTransColText 함수를 마이그레이션 툴로 변환하려는데 변경되지 않습니다. 대체할 수 있는 함수가 있나요?
- 저장할 때 상태값이 변경된 행 번호를 알 수 있나요? 시트에서 status의 개수는 어떻게 구하나요?

**답변**

- 상태값이 변경된 데이터 행이 있는지는 `IsDataModified()`로 확인합니다.
- 수정한 행의 정보나 특정 상태값의 행은 `FindStatusRow()`로 가져옵니다. U인 행만 추출하려면 `시트id.FindStatusRow('U')`처럼 호출하며, 여러 상태는 문자열 구분을 `|`로 삽입합니다. 예: `FindStatusRow("U|D")`. 행을 삭제하거나 추가했을 때의 행 정보도 이 함수로 확인할 수 있고, 저장 전 Validation 체크 대상 행을 찾을 때도 사용합니다.
- 상태별 행 개수는 `FindStatusRow()`로 행 값들을 가져온 뒤 그 length를 확인합니다. 특정 상태 행 중 가장 큰 행의 값은 가져온 값 중 가장 높은 행을 취합니다.
- 이전 버전의 `GetTransColText`는 `FindStatusRow("U|D")`로 대체할 수 있으며, 구분자 값이 이전 버전과 다르므로 확인한 뒤 진행합니다.

**키워드**: FindStatusRow, IsDataModified, GetTransColText, 상태값, 수정된 행, U|D

---

### [API-0082] DataInsert() 호출 시 시트당 신규 행이 한 개만 추가되게 하려면 어떻게 하나요?

**질문**

- DataInsert() 호출 시 시트당 신규행이 한 개만 추가되게 하려면 어떻게 하나요?

**답변**

현재 시트의 상태값별로 행번호를 리턴하는 `FindStatusRow()` 함수로 원하는 상태값이 들어 있는 행을 알아낼 수 있습니다. 이를 이용해 이미 신규행이 있는지 확인하는 방식으로 한 개만 추가되도록 구현합니다.

**키워드**: DataInsert, FindStatusRow, 신규행 제한, 상태값

---

### [API-0083] 행 Status 값의 기본값과 수정·삭제·추가 시 변경 규칙은?

**질문**

- IBSheet7 행의 Status 속성은 어떻게 정의되나요? 조회 직후 기본값과 수정, 삭제, 행 추가 시 어떤 값으로 바뀌는지 알고 싶습니다.

**답변**

조회 데이터 기준으로 Status 기본값은 빈값입니다. 셀 값이 하나라도 변경되면 해당 행의 상태가 U(수정)로, `DelCheck`에 체크하거나 `RowDelete` 함수로 행을 삭제하면 D(삭제)로, 새 행이 추가되면 I(입력)로 바뀝니다.

**키워드**: Status, DelCheck, RowDelete, 상태값 U I D

---

### [API-0084] 입력한 데이터를 조건 검사 후 최초 상태로 되돌리려면?

**질문**

- 데이터를 입력한 뒤 특정 조건에 걸려 alert를 띄운 다음, 수정했던 데이터를 최초 상태로 되돌리고 싶습니다.

**답변**

수정한 데이터를 최초 상태로 되돌리려면 `ReturnData`를 사용하는 방법이 있습니다.

**키워드**: ReturnData, 수정 취소, 최초 상태, 되돌리기

---

### [API-0085] 시트 행의 고유키로 행에 접근할 수 있나요? (정렬·삽입·삭제 후에도 같은 행 찾기)

**질문**

- 시트 행을 가리키는 고유키로 특정 행에 접근하고 싶습니다.
- 정렬이나 InsertRow, DeleteRow로 행 위치가 바뀌어도 같은 행을 찾는 방법이 있나요?

**답변**

시트 행에는 고유키가 없어 `RowIndex`로만 접근할 수 있습니다. 내부적으로 id 값을 가지고 있지만 그 값으로 시트 객체에 접근하거나 처리하는 인터페이스는 제공되지 않습니다. 최초 조회 시 `Seq` 컬럼을 만들어 두었다면 해당 Seq 번호에 해당하는 rowIndex를 찾아 처리해야 합니다.

**키워드**: RowIndex, 고유키, Seq, 행 접근, 정렬

---

## 체크된 행 조회·CheckAll

### [API-0086] 체크박스·라디오 컬럼에서 체크된 행 번호와 체크 건수를 구하려면 FindCheckedRow·CheckedRows를 어떻게 쓰나요?

**질문**

- 시트에서 체크박스가 체크된 행의 행 번호를 알고 싶습니다. 어떤 함수를 사용하나요?
- 체크된 행의 개수만 반환하는 함수 대신 체크된 행의 행 번호가 필요합니다.
- FindcheckedRow()를 호출하는데 리턴값이 없고 잘 동작하지 않습니다.
- FindCheckedRow(col, {ReturnArray:1})로 추출했는데 체크된 행만이 아니라 조회된 전체 행이 처리됩니다.
- 체크된 행의 개수는 CheckedRows(1)로 구하고 체크된 행 목록을 GetSelectionRows로 구했더니 값이 부정확합니다.

**답변**

체크된 행은 `FindCheckedRow`로 찾고, 체크된 행의 개수는 `CheckedRows`로 구합니다.

- `FindCheckedRow(컬럼)`는 기준이 되는 컬럼의 index 또는 SaveName을 인자로 넣어야 하며, 인자를 넣지 않으면 원하는 결과를 얻지 못합니다. 체크박스뿐 아니라 라디오 타입 컬럼, 트리 구조의 체크박스에서도 같은 함수로 체크된 행 번호를 얻습니다.
- 반환값은 체크된 행의 인덱스를 구분자 `|`로 연결한 문자열이므로 `split('|')`로 나누어 사용합니다. `ReturnArray:1` 옵션을 주면 배열로 반환합니다. `ReturnArray` 옵션은 최신 IBSheet7 기능이라 지원하지 않는 버전에서는 체크된 행만이 아니라 전체 행이 처리되는 등 의도와 다르게 동작할 수 있으므로, 이 경우 옵션 없이 `FindCheckedRow(col)`의 결과를 `split('|')`해서 사용합니다.
- 체크된 행의 개수: `CheckedRows(col)`(예: `CheckedRows(1)`)를 호출하면 for문 없이 개수가 반환되어 저장 전 건수 검사(예: 2500건 이상이면 `alert` 후 `return`)에 쓸 수 있습니다.
- `GetSelectionRows`는 마우스 드래그로 선택된 영역의 행 인덱스를 구하는 함수로 `GetSelectionCols`와 짝을 이루며 체크된 행 목록용이 아니므로 버그가 아닙니다.
- 함수 대신 `HeaderRows`부터 `LastRow()`까지 반복하며 `GetCellValue(i, 'checkbox')`로 체크 여부를 확인해도 됩니다. 일부 답변에는 `FindCheckedRows()`로 표기되어 있으나 다른 답변은 모두 `FindCheckedRow`를 사용합니다.

**적용 버전**: `ReturnArray` 옵션은 최신 버전에서만 지원

**키워드**: FindCheckedRow, CheckedRows, ReturnArray, GetSelectionRows, 체크된 행 번호, GetCellValue

---

### [API-0087] 체크된 행들의 데이터(행 전체·특정 컬럼 값·JSON 배열)를 가져오는 방법

**질문**

- 체크박스에 체크된 행들의 전체 데이터, 또는 각 행의 특정 컬럼 값(예: 아이디 값)만 뽑아 쓰려면 어떻게 해야 하나요?
- 체크박스로 선택한 행들의 데이터를 JSON 객체 배열로 가져오려면 어떻게 하나요?
- 체크된 행의 값만 가져오려고 GetSaveString을 썼더니 행의 모든 정보가 나옵니다.
- 체크박스로 체크한 행을 삭제하려고 GetSaveJson에 StdCol을 넣어 데이터를 뽑는데 잘 되지 않습니다.

**답변**

체크된 데이터를 뽑는 함수는 `FindCheckedRow`입니다. `GetSaveString`이나 `GetSaveJson`에 `StdCol`을 넣는 방식은 이 용도에 적합하지 않습니다.

- `FindCheckedRow(col, {ReturnArray:1})`로 체크된 행 번호 배열을 얻고(옵션 없이 얻은 `|` 구분 문자열은 `split`으로 나눔), 각 행에 `GetRowData(행번호)`를 호출해 얻은 데이터를 배열에 모아 반환하면 체크된 행들의 내용을 JSON 객체 배열로 얻을 수 있습니다.
- 행 전체가 아니라 특정 값(id 등)만 필요하면 체크된 행 인덱스를 구한 뒤 Loop를 돌면서 `CellValue`/`GetCellValue`로 값을 가져옵니다.
- 체크된 행을 기준으로 for loop를 돌며 `getRowData`로 행 데이터를 가져오는 방법도 있습니다.

**키워드**: FindCheckedRow, GetRowData, GetCellValue, GetSaveString, GetSaveJson, 체크된 행 데이터, JSON 배열

---

### [API-0088] 필터를 건 뒤 전체체크하면 필터된 행만 체크되게 하고 체크 건수를 필터 기준으로 구하는 방법

**질문**

- 필터를 걸고 헤더 전체 선택을 한 뒤 필터된 행 중 체크된 행을 가져오거나 체크된 행 수를 세려는데 필터와 상관없이 전체 행 기준으로 나옵니다.

**답변**

`HeaderCheckMode:1`로 설정하면 전체체크박스 클릭 시 필터된 데이터만 체크됩니다. 이후 `FindCheckedRow` 함수로 체크된 행을 찾을 수 있습니다. 전체체크 후 체크된 행 수(`CheckedRows`)가 필터된 건수가 아닌 전체 건수로 나오는 경우에도 같은 설정을 사용합니다.

**키워드**: HeaderCheckMode, 필터, 전체체크, FindCheckedRow, CheckedRows

---

### [API-0089] CheckAll 호출 후 헤더 체크박스가 해제되지 않거나 각 행의 onChange가 다시 발생할 때

**질문**

- CheckAll 함수로 전체 체크/언체크를 했을 때 데이터 영역의 체크는 바뀌지만 헤더의 전체 체크박스 값이 해제되지 않습니다.
- 헤더 체크를 빼려고 CheckAll을 호출하면 각 행의 onChange 이벤트가 다시 발생합니다. 발생하지 않게 하려면 어떻게 하나요?

**답변**

- `CheckAll` 함수로 전체 체크/언체크하면 헤더의 체크 상태도 함께 반영되는 것이 정상입니다. 그래도 헤더 체크가 해제되지 않아 원인을 찾기 어렵다면 `ClearHeaderCheck` 함수를 호출해 헤더 체크를 해제할 수 있습니다.
- `CheckAll`의 세 번째 인자를 0으로 주면 각 행의 onChange가 발생하지 않습니다.

**키워드**: CheckAll, ClearHeaderCheck, onChange, 헤더 체크 해제, 전체 체크

---

### [API-0090] 헤더의 전체 체크박스가 현재 체크되어 있는지 스크립트에서 확인하는 방법

**질문**

- 시트 헤더에 있는 전체 체크박스가 현재 체크되어 있는지(선택 여부)를 스크립트 코드에서 확인하고 싶습니다.
- 시트 헤더의 전체 체크박스를 사용자가 현재 체크한 상태인지 여부를 알려면 어떤 함수를 사용하나요?

**답변**

`HeaderCheck` 함수를 이용하면 헤더의 전체 체크박스에 체크했는지 여부를 알 수 있습니다. 일부 답변에서는 같은 용도의 메서드를 `HeadCheck`로 안내했으므로, 한쪽 이름이 동작하지 않으면 다른 표기를 확인합니다.

**키워드**: HeaderCheck, HeadCheck, 헤더 전체 체크박스, 체크 여부 확인

---

### [API-0091] CheckAll로 삭제 체크를 해제한 직후 confirm/alert를 띄우면 시트 화면이 하얗게 보입니다

**질문**

- CheckAll로 삭제 체크를 해제한 직후 confirm이나 alert를 띄우면 시트 화면이 하얗게 변한 채 대화상자가 뜹니다. 원인과 해결 방법은 무엇인가요?

**답변**

브라우저별 처리 속도 차이(chrome이 ie보다 빠름) 때문에 화면단에서 호출한 `alert`/`confirm`이 `CheckAll`의 렌더링보다 먼저 실행되는 경우가 있어 화면이 하얗게 보일 수 있습니다. 대화상자를 띄우는 부분을 함수로 재정의하고 `setTimeout`으로 시간(예: 50ms)을 준 뒤 호출하면 해결될 것으로 보입니다.

**키워드**: CheckAll, confirm, alert, setTimeout, 화면 하얗게

---

### [API-0092] CheckAll 호출 시 '정의되지 않은 null 참조인 replace 속성을 가져올 수 없습니다' 오류의 수정 버전

**질문**

- CheckAll 함수로 전체 체크를 하면 '정의되지 않은 null 참조인 replace 속성을 가져올 수 없습니다' 오류가 납니다. 7.0.13.49, 7.0.13.0126에서 모두 발생하는데 해결 방법은?

**답변**

해당 `CheckAll` 호출 오류 증상은 IBSheet7 7.0.13.151-20191016-11 패치 버전으로 처리되었습니다. 7.0.13.49, 7.0.13.0126 버전에서는 같은 증상이 발생하므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.151-20191016-11에서 수정

**키워드**: CheckAll, replace 속성, 7.0.13.151-20191016-11, 7.0.13.49, 7.0.13.0126

---

### [API-0093] 빈 시트에서 CheckAll 호출 후 DataInsert하면 시트 포커스가 사라지는 현상의 수정 버전

**질문**

- 빈 시트에서 체크박스 컬럼에 CheckAll을 호출한 뒤 DataInsert를 하면 시트의 포커스가 사라집니다. 이 현상이 수정된 버전이 있나요?

**답변**

빈 시트에서 CheckBox 컬럼에 `CheckAll`을 호출한 뒤 `DataInsert`를 하면 포커스가 사라지는 현상은 IBSheet7 7.0.13.166 버전에서 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.166에서 수정

**키워드**: CheckAll, DataInsert, 포커스 소실, 7.0.13.166

---

## 선택·체크 행 활용

### [API-0094] 한 시트에서 체크·선택한 행을 다른 시트로 복사·이동하고 저장하는 방법

**질문**

- ActiveX의 IBS_Sheet2SheetCheck처럼 원본 시트에서 체크된 행만 다른 시트로 이동하려면 IBSheet7에서 어떻게 구현하나요?
- 첫 번째 시트에서 클릭하거나 체크한 행의 데이터를 두 번째 시트에 그대로 넣고 저장하고 싶습니다.
- 한 시트에서 체크박스로 체크한 행을 다른 시트로 옮겨 저장하고 싶습니다. DoSave로 가능한가요?
- 두 시트에서 한 시트의 체크된 행을 가져와 다른 시트에 넣는데 체크된 값이 이상하게 넘어옵니다.

**답변**

`DoSave`는 입력·수정·삭제된 데이터를 서버로 전송하는 기능이라 시트 간 이동 용도가 아닙니다. 다음 순서로 구현합니다.

- 원본 시트에서 `FindCheckedRow`로 체크된 행을 찾고, 반복하며 `GetRowData`로 값을 가져와 대상 시트에 `DataInsert`와 `SetRowData`로 신규 행을 추가한 뒤 대상 시트에서 `DoSave`로 저장합니다.
- 데이터가 많아 느리면 `GetRowJson`으로 만든 행 데이터를 반복문으로 모아 `LoadSearchData(data, {Append:1})`로 로드하며, 상태 컬럼(`Type`이 `Status`) SaveName에 `I`를 넣으면 신규 행처럼 만들어집니다. 원본 행은 `RowDelete`로 삭제합니다.
- 이 방식은 SaveName 기준이라 두 시트의 SaveName이 다르면 데이터가 들어가지 않으며, 이때는 `GetRangeValue`로 읽은 값을 컬럼 순서 기반 키(`C1`, `C2`…)로 만드는 방식을 씁니다.
- 처리 과정에서 `RowDelete`로 행을 삭제하면 값이 제대로 넘어오지 않을 수 있으므로 행을 거꾸로 처리하는 등 순서를 바꿉니다.
`IBS_Sheet2SheetCheck(fromSheet, toSheet, chkCol)` 같은 함수는 직접 작성해야 합니다.

**키워드**: IBS_Sheet2SheetCheck, GetRowData, SetRowData, LoadSearchData, RowDelete, DoSave, 시트 간 행 이동, GetRowJson

---

### [API-0095] 체크된 행을 숨기고 상태를 D로 바꾸거나, 체크되지 않은 행을 숨겨 체크된 행만 인쇄·저장하는 방법

**질문**

- 버튼 클릭 시 체크박스에 체크된 여러 행(n개)을 숨김 처리하고 해당 행들의 status를 D로 변경하려면 어떤 함수들을 써야 하나요?
- 체크한 행의 데이터만 인쇄하거나 저장하고 싶습니다. 체크되지 않은 행을 숨기는 방식으로 구현할 수 있나요?

**답변**

`FindCheckedRow`로 체크된 행 번호를 구한 뒤 `RowHidden`/`SetRowHidden`으로 행을 숨깁니다.

- 체크된 행 숨김 + 상태 D 변경: `FindCheckedRow`로 체크된 행을 추출하고 loop를 돌면서 `CellValue`로 상태를 `D`로 만들고 `RowHidden` 함수로 행을 숨깁니다.
- 체크된 행만 남기기(인쇄·저장용 팝업 시트): 팝업 시트의 `OnSearchEnd`에서 `FindCheckedRow(1)`로 체크된 행 번호를 구해 '|'로 나눈 뒤, `GetDataFirstRow()`~`GetDataLastRow()` 범위에서 체크되지 않은 행에 `SetRowHidden(idx, 1)`을 호출해 숨깁니다.

**키워드**: FindCheckedRow, RowHidden, SetRowHidden, CellValue, GetDataFirstRow, GetDataLastRow, 체크된 행 숨김

---

### [API-0096] 특정 컬럼 값(null 등)이나 체크된 행 중 특정 값에 해당하는 행만 찾는 API가 있나요?

**질문**

- 특정 컬럼 값이 null인 행의 인덱스를 구해 RowDelete로 삭제하고 싶습니다. 값 조건으로 행을 찾아 주는 API가 있나요?
- 체크된 행들 중에서 특정 컬럼의 특정 값(중복 값)에 해당하는 행의 인덱스만 구하려면 어떻게 하나요?

**답변**

특정 컬럼 값에 따른 조건은 시스템마다 다르기 때문에 그런 조건을 검사해 행을 찾아 주는 API는 없으며, 제공되는 함수만으로는 구현하기 어려워 직접 함수를 만들어야 합니다.

- 값이 null인 행 삭제: 원하는 시점에 조회 데이터 전체를 스캐닝해 행 인덱스를 구한 뒤 `RowDelete`합니다. 조회 시 체크박스 컬럼을 두고 값이 null인 행에 1을 넣어 체크박스를 숨긴 뒤 체크된 행을 가져오는 대안도 있으나 값이 바뀔 때마다 check/uncheck 로직을 구현해 토글해야 하므로 전체 스캐닝 방식이 적합합니다.
- 체크된 행 중 특정 값: `FindCheckedRow(0).split('|')`로 체크된 행 인덱스 배열을 얻고, `FindText`를 반복 호출해 특정 컬럼에서 조건 문자열에 해당하는 행 인덱스 배열을 얻은 뒤 두 배열의 교집합을 구하는 함수로 해당 행만 추출합니다.

**키워드**: FindCheckedRow, FindText, RowDelete, 행 검색 조건, 교집합, 스캐닝

---

### [API-0097] 상위 코드별 그룹에서 체크박스를 그룹당 하나만 체크되게 하는 방법

**질문**

- 상위 코드별 그룹에서 체크박스가 하나라도 체크되면 같은 그룹의 나머지 체크는 막고, 그룹마다 하나씩만 체크되게 하려면 어떻게 구현하나요?

**답변**

`FindCheckRow`로 체크된 행 번호를 가져와 그 행이 몇 레벨인지 찾은 뒤, 지금 체크하려는 행의 레벨과 비교하는 방식으로 구현할 수 있습니다.

**키워드**: FindCheckRow, 체크박스 그룹, 레벨 비교, 단일 체크, 트리

---

### [API-0098] 체크박스 셀을 체크하면 그 행 전체의 배경색이 바뀌게 하려면

**질문**

- 체크박스 셀을 체크하면 그 행 전체의 색상이 바뀌게 하고 싶습니다.

**답변**

체크박스 셀을 체크할 때 그 행 전체의 색상을 바꾸려면 `RowBackC` 함수로 ROW 배경색을 칠하면 됩니다.

**키워드**: RowBackC, 행 배경색, 체크박스, 체크 시 색상

---

### [API-0099] 선택한 셀·행의 화면상 위치(좌표)를 구해 ActionMenu 등을 표시하려면 어떻게 하나요?

**질문**

- ActionMenu를 직접 구현하려는데 마우스 클릭 때는 이벤트 타겟이 셀 td 요소지만 키 입력 때는 div > input이라 위치를 가져오기 애매합니다.
- 시트에서 특정 행을 선택했을 때 선택한 행의 Y 좌표(시트 안 위치와 window 기준 화면상 위치)를 얻으려면 어떻게 계산하나요?

**답변**

특정 셀 위치에 직접 만든 ActionMenu를 표시하려면 클릭이나 키 입력 시 `ColLeft`, `RowTop` API로 가져온 position 값을 ActionMenu의 position 값으로 설정합니다.
선택한 행의 Y 좌표는 다음과 같이 구합니다.

- 시트 내부 위치: `RowTop(GetSelectRow()) + GetRowHeight(GetSelectRow())`. 건수 정보 표시줄이 상단에 있으면(`GetCountPosition()`이 1 또는 2) 13을 더합니다.
- window 기준 화면상 위치: 위 값에 시트를 감싼 div(`DIV_`+시트 id)의 window 기준 top 좌표를 더합니다. top 좌표는 offsetTop을 부모를 따라 합산하는 함수(`fGetXY`)나 jQuery로 구할 수 있습니다.

**키워드**: ColLeft, RowTop, GetRowHeight, GetCountPosition, GetSelectRow, ActionMenu, 좌표

---

### [API-0100] 한 시트에서 선택한 행을 다른 시트로 복사하거나 이동하려면 어떻게 하나요?

**질문**

- 한 시트에서 선택한 행을 다른 시트로 복사하거나 이동하고 싶습니다. 어떤 함수를 조합해 구현하나요?

**답변**

`GetRowJson`으로 행 JSON을 얻어 다른 시트에서 `LoadSearchData`를 `{Append:1}` 옵션으로 호출합니다. `GetSaveJson`은 `{data:[행JSON]}` 형태이고 `GetRowJson`은 행 JSON 자체를 반환하므로, `GetSelectRow()`로 얻은 행의 JSON을 `data = {Data:[]}`의 Data 배열에 push한 뒤 넘깁니다. 이동이면 이후 `RowDelete(row)`로 원본 행을 삭제합니다.

**키워드**: GetRowJson, LoadSearchData, Append, GetSelectRow, RowDelete, 행 복사 이동

---

### [API-0101] LazyLoad 조회 시 렌더링되지 않은 마지막 행을 SetSelectRow 후 DataCopy하면 indexOf 오류가 납니다

**질문**

- LazyLoad 방식으로 조회한 시트에서 아직 렌더링되지 않은 마지막 행을 setSelectRow 후 DataCopy()하면 indexOf 오류가 발생합니다. 어떻게 해결하나요?

**답변**

`DataCopy()`는 선택된 행의 값을 복사해 신규 행으로 입력하는데, `setSelectRow()`로 포커스된 행이 이동하면서 렌더링할 때 시간차가 발생해 이렇게는 사용하기 어렵습니다. 해결 방법은 두 가지입니다.

- `getRowData()`로 마지막 행 값을 가져와 `DataInsert(-1)` 후 `SetRowData()`로 넣습니다.
- `DataCopy()`에 `setTimeOut()`으로 0.1초 정도 지연을 줍니다.

**키워드**: DataCopy, setSelectRow, getRowData, DataInsert, SetRowData, LazyLoad, indexOf

---

### [API-0102] DataInsert 직후 GetSelectRow가 -1을 반환하거나 추가된 행에 설정이 적용되지 않습니다

**질문**

- DataInsert로 행을 추가한 직후 GetSelectRow로 추가된 행을 얻으려는데 -1이 반환됩니다. 추가된 행 번호는 어떻게 얻나요?
- DataInsert로 행을 추가한 뒤 GetSelectRow()로 얻은 행에 SetCellEditable을 적용했는데, 추가된 행이 화면 밖이면 적용되지 않습니다.
- 행이 100개 넘는 상태에서 DataInsert(0) 후 GetSelectRow()를 호출하면 -1이 반환되는 경우가 있습니다.

**답변**

`DataInsert` 직후에는 스크롤 이동이 포함되어 `GetSelectRow()`가 동작하기까지 시점 문제가 발생합니다. 추가된 행이 현재 화면에 없거나 데이터가 많으면 선택된 행 인덱스를 올바르게 구하지 못하고 -1이 반환되는 것으로 보입니다. 페이징 조회(searchmode:2, page:50) 후 마지막 행에 추가하는 경우도 마찬가지입니다.
`GetSelectRow()`를 쓰지 말고 `DataInsert`가 리턴하는 추가된 행 번호를 바로 받아 사용합니다.

```
var nRow = DataInsert();
SetCellEditable(nRow, ...);
```

**키워드**: DataInsert, GetSelectRow, SetCellEditable, -1 반환, 추가된 행 번호

---

### [API-0103] 선택한 행의 데이터를 한 번에 가져오거나 화면의 폼 요소에 채우려면 어떻게 하나요?

**질문**

- 선택된 행의 데이터를 한 번에 가져오려면 어떤 함수를 사용하나요?
- 시트에서 행을 선택하거나 더블클릭할 때 선택한 행의 데이터를 화면의 텍스트박스 같은 폼 요소에 채우려면 어떻게 하나요?

**답변**

RowData 계열 함수인 `GetRowData`를 이용해 `mySheet.GetRowData(mySheet.GetSelectRow())`로 선택된 행의 데이터를 가져옵니다.
폼 요소에 채우려면 폼 요소의 이름을 시트 컬럼의 `saveName`과 동일하게 작성한 뒤, `onSelectCell()`에서 선택된 행의 `RowData()`를 가져와 ibsheetinfo.js에 있는 `IBS_CopyJson2Form`으로 폼에 넣을 수 있습니다. 또는 선택된 행의 `CellValue()`를 가져와 각 요소의 `object.value`에 설정해도 됩니다.

**키워드**: GetRowData, GetSelectRow, IBS_CopyJson2Form, onSelectCell, saveName, 폼 채우기

---

### [API-0104] 버튼으로 선택한 행을 삭제하려면 어떻게 하나요? (행 상태에 따른 삭제 방식)

**질문**

- 버튼을 눌러 선택한 행을 삭제하려면 어떻게 하나요? 행의 상태 값에 따라 삭제 방식을 달리해야 하나요?

**답변**

버튼 핸들러에서 `GetSelectRow()`로 선택 행을 구해, 상태 값을 담는 컬럼(예에서는 `s2`)이 `I`이면 `RowDelete(행)`으로 바로 삭제하고, 그렇지 않으면 `SetCellValue(행, 's2', 'D')`처럼 그 컬럼 값을 `D`로 설정합니다.

**키워드**: GetSelectRow, RowDelete, SetCellValue, 행 삭제, 상태 값

---

## 행·셀 편집 가능 제어

### [API-0105] SetEditable 호출 시 Cannot read property 'State' of null 오류가 발생합니다

**질문**

- SetEditable 함수를 호출하면 `Cannot read property 'State' of null` 오류가 발생합니다.
- DoSearch 직후에 SetEditable(0)을 호출하면 스크립트 에러가 납니다. 어떻게 해결하나요?

**답변**

`DoSearch`로 데이터를 바인딩하는 도중에 `SetEditable`을 호출하면 나타나는 현상으로 보이며, 원인이 완전히 확인된 것은 아닙니다. 특히 `DoSearch`를 호출한 직후에 `SetEditable(0)`을 호출하면 발생합니다.

- `SetEditable` 호출을 `DoSearch`보다 앞(조회 전)으로 옮기면 해결됩니다.
- 또는 조회가 완료된 이후에 호출합니다.

**키워드**: SetEditable, DoSearch, Cannot read property 'State' of null, 스크립트 에러, 편집 불가

---

### [API-0106] SetEditable(0) 후 포커스를 주고 SetEditable(1)을 호출하면 포커스가 사라집니다

**질문**

- SetEditable(0)으로 편집 불가로 만들고 시트에 포커스를 준 뒤 SetEditable(1)을 호출하면 포커스가 사라집니다. 원인이 무엇인가요?

**답변**

`SetEditable` 호출만으로는 해당 현상이 재현되지 않습니다. `SelectRow`에 음수 값을 넣거나 `enable` 함수를 호출해도 포커스가 사라지므로, 조회 이후 다른 곳에서 이를 처리하는 코드가 있는지 디버깅해야 합니다.

**키워드**: SetEditable, 포커스, SelectRow, enable, 포커스 사라짐

---

### [API-0107] 시트 편집을 막을 때 Enable 대신 Editable을 써야 하는 이유

**질문**

- Enable 함수로 시트 편집을 막았더니 엑셀을 로드하면 기능이 풀립니다.
- 브라우저 스크롤을 이동하면 Enable 영역이 같이 움직입니다. 어떻게 해야 하나요?

**답변**

시트의 편집을 막으려는 목적이라면 `Enable` 대신 `Editable`을 사용하도록 권장합니다. `Enable`로 막으면 엑셀 로드 후 제한이 풀리거나, 스크롤 이동 시 Enable된 영역이 이동하는 현상이 나타날 수 있습니다.

**키워드**: Enable, Editable, 편집 막기, 스크롤, 엑셀 로드

---

### [API-0108] SetEnable(false) 상태에서 OnClick 이벤트를 받을 수 있나요?

**질문**

- 그리드를 SetEnable(false)로 설정한 뒤 click 이벤트가 발생했을 때 다시 enable을 true로 바꾸고 싶습니다.
- enable false 상태에서도 click 이벤트를 받을 방법이 있나요?

**답변**

받을 수 없습니다. `SetEnable` 값을 0으로 설정하면 마우스나 키보드를 사용하는 사용자 인터페이스 기능이 모두 사용 불가능해지며, `OnClick` 이벤트 자체가 발생하지 않습니다.

**키워드**: SetEnable, OnClick, enable false, 클릭 이벤트

---

### [API-0109] 시트 생성 후 전체 편집 가능 여부를 바꾸거나 사용자 권한별로 제어하려면 어떻게 하나요?

**질문**

- 시트를 생성한 뒤에 시트 전체의 편집 가능 여부를 바꿀 수 있나요?
- 사용자 권한에 따라 같은 화면의 입력·수정을 막으려는데 CSS readonly는 popup이나 combo 컬럼에 적용되지 않습니다.

**답변**

`SetEditable(0)`을 호출하면 시트 전체를 편집 불가로 바꿀 수 있습니다. 컬럼별로 제어해야 한다면 컬럼에 `Edit` 속성을 넣어 처리해도 됩니다.
`SetEditable()`은 호출되는 시점에 바로 적용되므로, 사용자 권한에 따라 막으려면 시트 생성 이후 마지막에 권한에 따라 분기해 호출합니다. 예를 들어 전역변수로 둔 접근 권한 값을 시트 생성 함수에서 `window[sheetid].SetEditable(role);`처럼 지정할 수 있습니다(권한 값을 이용한 호출은 적용 가능한 방법으로 보이는 수준입니다).

**키워드**: SetEditable, Edit, 사용자 권한, 편집 불가, readonly

---

### [API-0110] 셀에 데이터가 있으면 편집을 막고 빈 셀만 편집하게 하려면 어떻게 하나요?

**질문**

- 셀에 이미 데이터가 있으면 편집을 막고 데이터가 없는 셀만 편집할 수 있게 하고 싶습니다. 어떻게 구현하나요?

**답변**

데이터를 구성할 때 `Edit` 값을 넣어서 만들거나, `OnSelectCell` 이벤트에서 `Editable`을 사용해 제어합니다.

**키워드**: Edit, OnSelectCell, Editable, 빈 셀, 편집 제어

---

### [API-0111] 조건에 따라 특정 컬럼을 수정 불가로 바꾸려면 어떻게 하나요?

**질문**

- 시트 초기화 이후 특정 시점이나 페이지가 열리는 시점에 조건에 따라 특정 컬럼을 수정 불가로 바꾸려면 어떻게 하나요?

**답변**

`SetColEditable(Col, 0)`을 호출하면 컬럼을 수정 불가로 바꿀 수 있고, `SetColProperty`로 `Edit:0`을 설정할 수도 있습니다. 조건 분기가 필요하다면 API를 호출하지 않고 Cols를 만드는 시점에 if 문으로 해당 컬럼의 `Edit`를 조건에 따라 다르게 지정해도 됩니다.

**키워드**: SetColEditable, SetColProperty, Edit, 컬럼 수정 불가, Cols

---

### [API-0112] 특정 셀·행의 편집 가능 여부는 어떤 함수로 설정하나요? (CellEditable, RowEditable)

**질문**

- 시트에서 특정 셀이나 컬럼의 편집을 불가능하게 만들고 싶습니다. 어떤 함수로 설정하나요?
- 특정 행(예: 추가한 행 중 첫 번째 행)의 편집 가능 여부를 제어하려면 어떤 함수를 사용하나요?
- CellEditable의 컬럼 인자에 인덱스 대신 SaveName을 사용할 수 있나요?

**답변**

- 셀 단위: `CellEditable`(`SetCellEditable`)로 편집 가능 여부를 설정합니다. 셀 단위 배경색은 `CellBackColor`로 제어합니다.
- 행 단위: `RowEditable`로 해당 행의 편집 가능 여부를 설정합니다.
- 컬럼 인자에는 컬럼 인덱스 대신 SaveName을 사용할 수 있습니다.
- 인덱스로 지정할 때 index는 0부터 시작합니다.

**키워드**: CellEditable, SetCellEditable, RowEditable, CellBackColor, SaveName, 셀 편집 불가

---

### [API-0113] Edit:0으로 선언한 DelCheck 컬럼에서 신규 행만 편집을 허용하려면 어떻게 하나요?

**질문**

- DelCheck 컬럼을 Edit:0으로 선언한 뒤 신규로 추가한 행만 편집을 허용하려고 SetColProperty를 썼는데 적용되지 않습니다. 어떻게 하나요?

**답변**

신규로 추가된 행만 편집을 허용하려면 `SetColProperty`가 아니라 `CellEditable` 함수를 사용합니다. 예를 들어 마지막에 추가된 행의 편집을 허용하려면 다음과 같이 호출합니다.

```
var LastRow = mySheet.LastRow()-1;
mySheet.SetCellEditable(LastRow, 'delChk', 1);
```

**키워드**: SetCellEditable, SetColProperty, LastRow, Edit:0, 신규 행 편집

---

### [API-0114] 클릭한 행의 특정 컬럼만 편집 가능하게 하려면 어떻게 하나요? (OnClick, SetCellEditable)

**질문**

- 머지된 컬럼이 있는 시트에서 OnClick 이벤트로 선택한 행의 특정 컬럼만 편집 가능하게 하려면 어떻게 하나요?

**답변**

시트 전체 Editable은 반드시 가능으로 설정해야 합니다. 모든 컬럼의 `Edit` 속성을 0으로 설정하고(클릭 시 편집할 컬럼도 0), `OnClick` 이벤트에서 헤더행을 제외한 데이터행(`Row>=HeaderRows()`)에 대해 `SetCellEditable(Row,7,1)`처럼 호출합니다. 컬럼 인덱스 대신 SaveName을 지정해도 됩니다.

**키워드**: OnClick, SetCellEditable, Edit, HeaderRows, 클릭한 행 편집

---

### [API-0115] RowEditable로 막은 행에서 특정 셀(버튼 컬럼 등)만 편집 가능하게 하려면 어떻게 하나요?

**질문**

- RowEditable로 행을 편집 불가로 만들었는데 그 행의 특정 셀은 편집 가능해야 합니다. 어떻게 하나요?
- RowEditable로 행을 비활성화했는데 그 행의 버튼 컬럼은 활성화되어야 합니다.

**답변**

행을 먼저 편집 불가로 만든 뒤 허용할 셀에 `CellEditable`을 이어서 호출합니다. 예: `SetRowEditable(1, 0)` 호출 후 `SetCellEditable(1, 2, 1)`.
`RowEditable`이 내부적으로 loop를 돌며 `CellEditable`을 호출하므로, 호출 순서를 바꾸면 나중에 호출한 `RowEditable`이 최종 적용됩니다. 조회 후에 적용할 경우 데이터 양에 따른 속도 문제는 ibsheet.com FAQ 9번을 참고합니다.

**키워드**: SetRowEditable, SetCellEditable, RowEditable, CellEditable, 버튼 컬럼 활성화

---

### [API-0116] CellEditable 후 RowEditable을 호출하면 ActiveX와 편집 결과가 다른 이유

**질문**

- CellEditable을 불가로 한 뒤 RowEditable을 불가에서 가능으로 바꾸면 ActiveX에서는 셀이 편집 불가인데 IBSheet7에서는 편집 가능이 됩니다. 왜 다른가요?

**답변**

IBSheet7은 Col은 객체 접근이 가능하지만 Row는 구조상 객체 접근이 불가능해서, `RowEditable` 호출 시 loop를 돌면서 바로 `CellEditable`을 호출합니다. 그래서 `CellEditable`로 설정된 정보를 기억하지 못하고 마지막에 호출한 `RowEditable`이 최종 적용됩니다. ActiveX와 IBSheet7은 기반 기술이 달라 동작이 100% 일치하지 않습니다.

**키워드**: RowEditable, CellEditable, ActiveX, 호환, 편집 가능 덮어쓰기

---

### [API-0117] Editable, ColEditable, RowEditable, CellEditable의 적용 우선순위와 Edit:0 컬럼의 RowEditable 문제

**질문**

- Editable, ColEditable, RowEditable, CellEditable을 함께 쓰면 어떤 순서로 적용되나요?
- InitColumns에서 Edit:0으로 설정한 뒤 특정 행만 RowEditable로 편집 가능하게 하려는데 편집이 되지 않습니다.

**답변**

`Editable`(전체 편집 불가) > `CellEditable`(셀 단위) > `ColEditable`(열 단위) > `RowEditable`(행 단위) 순으로 종속됩니다.

- `Editable`이 false이면 나머지 함수와 무관하게 편집이 불가능합니다.
- `ColEditable`이 false인 영역은 `RowEditable`을 true로 해도 영향을 받지 않습니다. 따라서 `Edit:0` 컬럼에서 `RowEditable:1`만 주면 편집되지 않으며, 이 경우 `RowEditable`을 호출할 때 loop를 돌면서 바로 `CellEditable`을 호출해야 합니다(`LastCol` 함수 이용).
- `CellEditable`은 `Editable`에만 종속되어 `ColEditable`, `RowEditable` 여부와 상관없이 동작합니다.

**키워드**: Editable, ColEditable, RowEditable, CellEditable, LastCol, Edit:0, 우선순위

---

### [API-0118] Edit:1인데 편집이 안 되거나 컬럼이 편집 불가로 보일 때 어디를 확인해야 하나요?

**질문**

- 설정한 적 없는데 컬럼(체크박스·버튼 등)이 편집 불가로 나옵니다. 어디서 설정된 것인가요?
- SetEditable(0) 상태에서 특정 컬럼이나 셀의 편집을 가능하게 하려는데 적용되지 않습니다.
- 컬럼에 Edit:1을 설정했는데 음수 같은 특정 값의 셀만 수정 모드로 들어가지 않습니다.

**답변**

편집 가능 여부에는 아래 항목이 영향을 줍니다.

- 시트 전체(`SetEditable`/`GetEditable`): false이면 `ColEditable`, `RowEditable`, `CellEditable` 모두 불가능하므로 `SetEditable(1)` 상태에서 컬럼의 edit를 지정해야 합니다.
- 컬럼(`SetColEditable`/`GetColEditable`), 행(`SetRowEditable`/`GetRowEditable`), 셀(`SetCellEditable`/`GetCellEditable`) 설정
- 컬럼 및 셀별 초기화 시의 `Edit`·`UpdateEdit` 설정, 조회 데이터의 `Edit` 속성. 조회 데이터는 개발자도구 네트워크 탭의 응답 본문에서 확인할 수 있습니다.
- `OnSearchEnd` 이벤트에서 셀 값 등 조건에 따라 `SetCellEditable`로 수정 불가를 설정하거나 루프를 돌며 `setColEditable`을 설정하는 로직이 원인일 수 있으므로 이벤트 안의 편집 제한 로직과 조건을 확인합니다.
이 함수와 데이터를 확인해 어디서 `Edit`가 막혀 있는지 찾으세요.

**키워드**: SetEditable, GetEditable, Edit, UpdateEdit, OnSearchEnd, 편집 불가 원인

---

### [API-0119] 콤보 값에 따라 같은 행의 다른 컬럼·행 전체의 편집 가능 여부를 바꾸려면 어떻게 하나요?

**질문**

- 콤보로 된 컬럼 A에서 선택한 값에 따라 다른 컬럼 B의 셀을 편집 가능 또는 불가로 바꾸고 싶습니다. 어떤 이벤트와 함수를 사용하나요?
- CellEditable이 바로 적용되지 않고 시트에 액션이 있어야 반영됩니다.
- 특정 값이면 행 전체를 비활성화하려면 어떻게 하나요?

**답변**

콤보 값이 바뀔 때 발생하는 `OnChange` 이벤트에서 `CellEditable`(`SetCellEditable`)을 호출해 해당 셀의 편집 가능/불가를 제어합니다. 행 전체를 비활성화하려면 `SetRowEditable`을 사용합니다.

- 뒤 컬럼(B)은 `InitColumns`에서 `Edit:0`으로 둡니다.
- `OnSelectCell`에서 B 컬럼을 선택하면 A 컬럼을 먼저 선택하라는 경고를 띄운 뒤 `SelectCell`로 A 컬럼으로 이동시킵니다.
- A 컬럼의 `OnChange`가 발생하면 B 컬럼에 `CellEditable`=1을 설정합니다.

**키워드**: OnChange, CellEditable, SetCellEditable, SetRowEditable, OnSelectCell, 콤보, 편집 가능 제어

---

### [API-0120] 체크박스 컬럼이 해제된 행에서 다른 체크박스 컬럼을 편집하지 못하게 하려면 어떻게 하나요?

**질문**

- 한쪽 체크박스 컬럼이 해제(0)된 행에서는 다른 체크박스 컬럼을 편집할 수 없게 하려면 어떻게 하나요?

**답변**

`GetRangeValue`로 기준 컬럼의 값 범위를 구분자로 이어서 받아 분리한 뒤, 각 행의 값이 0이면 `SetCellEditable(행, 컬럼, false)`, 그렇지 않으면 `true`로 설정하는 반복문을 사용합니다.

**키워드**: GetRangeValue, SetCellEditable, 체크박스, 편집 불가, 반복문

---

### [API-0121] 조회한 데이터 값에 따라 행·셀의 편집 가능 여부를 다르게 설정하려면 어떻게 하나요?

**질문**

- 조회한 데이터의 값이나 상태에 따라 행이나 셀의 편집 가능 여부를 다르게 제어하려면 어떻게 하나요?
- 조회 시 첫 번째 행은 수정이 불가능하게 하거나, 오늘 이전 날짜의 행은 수정하지 못하게 하고 싶습니다.
- SetRowEditable을 호출했는데 체크박스 비활성화가 적용되지 않습니다.

**답변**

조회는 비동기라서 조회 함수 호출 바로 다음 줄에서 설정하면 적용되지 않으므로, 조회 완료 이후에 설정해야 합니다.

- `OnSearchEnd`(행별로는 `OnRowSearchEnd`) 이벤트에서 for loop로 조건을 확인해 `RowEditable`이나 `CellEditable`을 설정합니다. 예: `RowEditable(rowindex,0)`.
- `OnRowSearchEnd`에서는 `GetCellValue`로 값을 확인해 조건에 맞으면 `SetRowEditable(row, 0)`을 호출합니다. CheckBox 컬럼만 비활성화하려면 `SetCellEditable(row, "selected", 0)`을 사용합니다. 체크박스 외 모든 컬럼이 `Edit:false`이면 행 단위 설정은 체크박스에만 영향을 줍니다.
- 데이터가 많으면 loop 때문에 속도가 매우 느려질 수 있습니다. 이때 `OnLoadData()`에서 `JsonAttribute`로 행별 `Edit` 속성을 제어할 수 있으나, 버전에 따라 지원되지 않을 수 있으므로 버전을 확인합니다. 숫자 컬럼은 조회 전에 설정하는 `ColCondProperty`를 이용할 수 있으며, 속도 관련 내용은 ibsheet.com FAQ 9번을 참고합니다.

**키워드**: OnSearchEnd, OnRowSearchEnd, RowEditable, CellEditable, OnLoadData, JsonAttribute, ColCondProperty, 조회 후 편집 불가

---

## 편집 중 값 읽기

### [API-0122] 셀을 편집하는 중 입력 중인 글자를 읽으려면 어떻게 하나요? (GetEditText)

**질문**

- 셀을 편집하는 중에 OnKeyDown 이벤트 등에서 입력 중인 글자를 읽으려는데 GetCellText가 공백을 반환합니다.
- OnKeyDown, OnKeyUp 같은 키 이벤트에서 GetCellValue로 입력 중인 값을 읽으면 이전 값이 나오거나 읽히지 않습니다. 편집 중인 값은 어떻게 읽나요?
- 편집 중인 값을 다루는 EditValue 기능을 IBSheet7에서 대체할 수 있는 함수가 있나요?
- 키보드 이벤트에서 현재 편집 중인 시트 값을 가져오려면 어떤 함수를 어느 이벤트에서 사용하나요?

**답변**

편집 중인 글자는 `GetEditText()`로 확인합니다. `EditValue` 기능이 필요한 경우에도 `GetEditText()`로 대체할 수 있습니다.

- `GetCellValue`는 해당 셀의 값을 가져오는 메소드로, 편집 중에는 편집 이전의 값을 가져오는 것이 정상 동작입니다.
- `OnKeyDown` 시점은 아직 입력이 끝나기 전이라 `GetCellText`로 읽으면 공백이 나오고 `CellValue`로도 정상적인 값을 얻을 수 없으므로 `GetEditText()`로 대체합니다.
- `OnKeyUp` 이벤트에서도 `GetEditText`로 편집 중인 값을 가져올 수 있습니다.
- 편집 중 키 입력(F6)으로 팝업을 띄우며 그 텍스트 값을 가져갈 때도 `getvalue`가 아니라 `GetEditText`를 사용합니다.

**키워드**: GetEditText, GetCellValue, GetCellText, OnKeyDown, OnKeyUp, EditValue, 편집 중 값

---

### [API-0123] 편집 중에 저장 버튼을 누르면 입력 중인 값이 반영되지 않고 이전 값이 조회됩니다

**질문**

- 셀 입력 중에 저장 버튼을 누르거나 값을 읽는 함수를 호출하면 편집 중인 내용이 반영되지 않고 이전 값이 조회됩니다.
- 시트가 iframe 안에 있을 때 편집 중에 iframe 밖의 버튼을 클릭하면 편집이 종료되지 않아 값을 가져오지 못합니다.

**답변**

편집 중인 내용을 실시간으로 반영하는 기능은 지원하지 않아, 편집이 끝나기 전에는 이전 값이 조회됩니다.

- 저장 버튼 처리 메서드 등 값을 읽는 코드의 최상단에서 `SetEditEnd(1)`을 호출해 편집 중인 내용을 확정한 뒤 사용합니다. 같은 용도의 함수가 `SetEndEdit(1)`로 적힌 답변도 있어 철자가 서로 다르므로 API 문서에서 정확한 함수명을 확인하세요.
- iframe 안의 시트에서 iframe 밖의 버튼을 클릭해 편집이 종료되지 않는 경우에도 `SetEndEdit`로 편집을 종료한 뒤 값을 가져옵니다.
- 저장 데이터는 `GetSaveJson`으로 가져오면 입력 중인 값이 정상적으로 반영되는 것이 확인되었습니다.

**키워드**: SetEditEnd, SetEndEdit, GetSaveJson, 편집 종료, 저장 버튼, iframe

---

### [API-0124] 편집 중 SetCellValue로 다른 셀 값을 바꾸면 편집이 종료되는 문제 (endEdit)

**질문**

- 편집 중에 다른 셀의 값을 SetCellValue로 바꾸면 현재 셀의 포커스가 사라지고 편집이 종료됩니다. 편집을 유지하려면 어떻게 하나요?

**답변**

`SetCellValue`로 값을 바꾸면 해당 셀로 포커스가 이동하면서 현재 편집 중인 셀의 편집이 끝납니다(기본값은 편집 종료). `endEdit`를 0으로 지정하면 편집이 끝나지 않습니다.

```
SetCellValue(Row,5,'',{endEdit:0})
```

8번째 인자를 0으로 주는 방식(`SetCellValue(11, 10, mySheet.GetEditText(), 1, 1, 1, 1, 0)`)도 있습니다. 0으로 하면 몇 가지 사이드 이펙트가 있을 수 있으므로 꼭 필요한 경우에만 사용하세요.

**키워드**: SetCellValue, endEdit, GetEditText, 편집 유지, 포커스

---

### [API-0125] 삭제 상태로 바꾼 행을 다시 편집 가능한 상태로 풀 수 있나요?

**질문**

- 행의 상태 값을 삭제로 바꾸면 편집이 불가능해집니다. 삭제 상태인 행을 다시 편집 가능한 상태로 풀 수 있는 방법이 있나요?

**답변**

삭제 상태의 행은 상태 값을 `조회` 상태로 바꾸기 전까지는 편집 가능한 상태로 바꿀 수 없습니다.

**키워드**: 삭제 상태, 행 상태, 편집 불가, 조회 상태

---

### [API-0126] SelectCell로 특정 셀을 선택하고 바로 편집 모드로 들어가게 하려면 어떻게 하나요?

**질문**

- 특정 셀(예: 데이터 입력 후 같은 행의 편집 가능한 컬럼)에 코드로 포커스를 주고 편집 상태로 들어가게 하려면 어떻게 하나요?
- SelectCell 메소드의 세 번째 인자 [Opt]는 어떤 형식으로 전달하나요?

**답변**

`SelectCell(Row, Col, [Opt])`을 사용합니다. 편집 여부는 `Edit` 옵션으로 제어하며, `Opt`에는 중괄호 `{ }` 안에 사용할 옵션명을 JSON Key-Value 형태로 쉼표로 연결해 전달합니다. `Edit:1`을 지정하면 편집이 가능한 셀을 편집 상태로 선택합니다.

```
mySheet.SelectCell(2, 3, { 'Edit' : 1 , 'EditText' : 'abc' })
```

위 예는 (2, 3) 셀로 포커스를 이동한 뒤 편집 모드로 전환하고 편집 문자열을 abc로 표시합니다. 사용 가능한 옵션은 API 문서의 SelectCell 항목에서 확인합니다.

**키워드**: SelectCell, Edit, EditText, 편집 모드, 포커스 이동

---

### [API-0127] 셀을 편집하는 중에 CellValue를 호출하면 편집 전 값이 반환됩니다

**질문**

- 시트에서 셀을 편집하는 중에 CellValue를 호출하면 편집 전 값이 반환됩니다. 버튼 클릭 같은 시점에 편집 중인 값을 가져오려면 어떻게 하나요?

**답변**

편집 중에는 `CellValue`를 호출해도 편집 전 값이 반환됩니다. 값을 읽기 전에 편집을 종료해야 하며, 버튼 클릭 시 공통으로 호출되는 메서드(예: `callMessageMethod`)가 있다면 ibsheetinfo.js의 `createIBSheet()`와 `$(window).load` 시점에서 기존 메서드를 복사해 두고 오버라이드해, 화면의 모든 시트 객체(`div[name=IBSheet]`)를 배열로 받아 모든 시트를 편집 종료하도록 처리한 예가 있습니다.

**키워드**: CellValue, 편집 중 값, createIBSheet, ibsheetinfo.js, 편집 종료

---

## 셀 포커스·SelectCell

### [API-0128] SelectCell을 호출해도 포커스나 스크롤이 이동하지 않는 이유

**질문**

- setFocus나 SelectCell을 호출해도 포커스가 이동하지 않습니다. 원인이 무엇인가요?
- SearchMode:2, Page:20으로 설정한 시트에서 SelectCell로 40번째 행을 선택했는데 스크롤이 그 행으로 이동하지 않습니다.

**답변**

다음 원인을 확인합니다.

- 행 index를 문자열로 전달한 경우: `mySheet.SelectCell('5', 'ColName');`처럼 호출하면 포커스가 이동하지 않습니다. index는 문자열이 아니라 숫자로 전달해야 합니다.
- 데이터 행의 높이가 일정하지 않은 경우: `SelectCell`로 선택해도 스크롤이 이동하지 않을 수 있습니다(확실한 원인은 아니며 행 높이가 일정하지 않은 경우에 해당하는지 확인이 필요합니다).

**키워드**: SelectCell, setFocus, SearchMode, 포커스 이동 안됨, 행 높이, 문자열 index

---

### [API-0129] 코드에서 특정 행·셀로 포커스를 이동하려면 어떤 함수를 쓰나요? (SelectCell)

**질문**

- 시트에 포커스를 주거나 특정 셀로 포커스를 이동시키려면 어떤 함수를 사용하나요?
- 행을 추가하거나 조회한 뒤 코드에서 특정 행(방금 추가한 행, 103번 행 등)의 셀로 포커스를 이동시키려면 어떻게 하나요?
- 특정 행으로 커서를 바로 이동시키고 해당 행을 상단으로 보이게 하는 기능이 있나요?

**답변**

시트에 포커스를 주거나 특정 셀로 포커스를 이동할 때는 `SetFocus`와 `SelectCell(Row,Col)`을 사용합니다. 특정 행 자체로 포커스를 이동하는 기능은 지원하지 않으므로 특정 셀로 이동하는 `SelectCell()`을 이용합니다. 데이터 이동은 `DataMove()`로 구현할 수 있습니다.

- 행 추가 후 그 행으로 이동하려면 `DataInsert`가 반환하는 행 값을 받아 `SelectCell`에 사용합니다. 편집 모드로 들어가려면 editmode를 true로 설정합니다.
- 조회 후 특정 번호의 행이 처음 보이게 할 때도 해당 행을 `SelectCell`로 지정합니다.

**키워드**: SelectCell, SetFocus, DataInsert, DataMove, editmode, 포커스 이동

---

### [API-0130] 시트 바로 위의 버튼에서 시트로 곧바로 포커스가 가게 하려면 어떻게 하나요?

**질문**

- 시트 바로 위에 있는 버튼에서 시트로 곧바로 포커스가 가게 하려면 어떻게 해야 하나요?

**답변**

버튼에서 포커스가 떠나는 시점에 시트에 `SelectCell`을 강제로 호출하도록 구현해야 합니다.

**키워드**: SelectCell, 버튼, 포커스 이동, 시트 포커스

---

### [API-0131] 셀에 포커스가 이동하면 바로 편집 모드로 들어가게 하려면 어떻게 하나요? (FocusEditMode)

**질문**

- 편집 가능한 셀에 selectCell()로 포커스를 줄 때 바로 편집 모드로 들어가게 하려면 어떻게 하나요?
- 특정 시점에만 적용할 수도 있나요?

**답변**

`SetFocusEditMode(1)`로 설정한 뒤 `SelectCell(row,col)`로 이동하면 바로 편집 모드로 이동합니다. 외부 함수로 호출할 때 특정 시점에만 적용하려면 호출 직전에 `SetFocusEditMode(1)`로 바꾸고, 이후 원상태로 돌려야 하면 다시 0으로 변경합니다.

**키워드**: FocusEditMode, SetFocusEditMode, SelectCell, 편집 모드, 포커스 이동

---

### [API-0132] FindText로 데이터를 찾은 뒤 해당 셀·행에 포커스를 주려면 어떻게 하나요?

**질문**

- FindText로 행을 찾은 뒤 해당 셀이나 컬럼에 포커스를 주려면 어떻게 하나요? 찾기 창이 아니라 함수로 찾은 경우입니다.
- 조회된 시트 데이터에서 특정 데이터를 찾은 뒤 찾은 데이터에 포커스를 주고 싶습니다.

**답변**

`FindText`가 반환한 값으로 `SelectCell`을 호출하면 검색 결과 위치로 시트에 포커스를 줄 수 있습니다. 행 단위로는 `FindText`로 데이터를 찾은 다음 `SelectRow`로 포커스를 주는 방식도 사용할 수 있습니다.

**키워드**: FindText, SelectCell, SelectRow, 검색 후 포커스

---

### [API-0133] 저장·재조회 후 수정한 행이나 마지막 셀로 다시 포커스를 주려면 어떻게 하나요?

**질문**

- 특정 행을 수정한 뒤 저장하고 재조회하면 그 행으로 포커스를 이동시키고 싶습니다. 어떻게 하나요?
- 저장 작업이 완료된 뒤 마지막 셀에 다시 포커스를 주고 싶습니다.
- 사용자가 저장 또는 조회를 한 이후 시트의 특정 위치에 포커스를 주려면 어떤 함수를 어느 이벤트에서 사용하나요?

**답변**

시트 바깥쪽에 선택되거나 수정된 행 번호(위치값)를 기록해 두었다가, 저장 완료(`OnSaveEnd`) 또는 조회 완료(`OnSearchEnd`) 시점에 그 행으로 포커스를 줍니다.

- `selectCell()`로 그 행의 첫 번째 컬럼(또는 보이는 컬럼의 첫 번째)으로 이동시킵니다. 저장 완료 후 마지막 셀에 다시 포커스하는 경우도 `SelectCell` 메소드를 사용합니다.
- 특정 위치가 보이도록 `SetTopRow` 함수를 호출하는 방식도 사용할 수 있습니다.

**키워드**: SelectCell, OnSaveEnd, OnSearchEnd, SetTopRow, 저장 후 포커스, 재조회 후 포커스

---

### [API-0134] 행 삭제·추가 후 인접 행이나 마지막 행으로 포커스가 이동하지 않게 하려면 어떻게 하나요?

**질문**

- RowDelete로 행을 삭제하거나 DataInsert로 행을 추가한 뒤 인접 행이나 마지막 행에 포커스가 가는데, 포커스가 이동하지 않게 할 수 있나요?

**답변**

행 삭제 후 삭제한 행의 인접 행으로 포커스가 이동하는 것이 기본 동작입니다. `SetFocusAfterRowTransaction(0);`을 적용하면 행 추가/삭제/이동/복사 후 포커스 처리가 되지 않도록 막을 수 있습니다. 개발자 가이드의 Methods 목록에 FocusAfterRowTransaction Method 설명이 있습니다.

**키워드**: SetFocusAfterRowTransaction, FocusAfterRowTransaction, RowDelete, DataInsert, 포커스 이동 방지

---

### [API-0135] 조회하면 첫 번째 행에 자동으로 포커스가 설정되는데 지정되지 않게 하려면 어떻게 하나요?

**질문**

- 데이터를 조회하면 포커스가 첫 번째 행으로 자동 설정되는데, 조회 후 포커스가 지정되지 않게 하려면 어떻게 하나요?

**답변**

`FocusAfterProcess` 값을 0으로 설정합니다. 그래도 되지 않으면 다른 곳에 해당 속성이나 함수가 적용되어 있는지 확인해야 합니다.

**키워드**: FocusAfterProcess, 조회 후 포커스, 첫 번째 행, 자동 포커스

---

### [API-0136] DataInsert로 행을 추가하면 원하는 위치가 아닌 곳에 생깁니다. 위치를 지정하려면 어떻게 하나요?

**질문**

- DataInsert로 행을 추가하면 조회 직후에는 두 번째 행에 생기는데 중간이나 첫 번째 행에 추가하려면 어떻게 하나요?
- 스크롤해야 보이는 부모 행 아래에 자식 행을 추가하려는데 SelectCell 후 DataInsert()를 호출하면 최상단 행으로 추가됩니다.

**답변**

`DataInsert()`를 인자 없이 호출하면 선택한 행 바로 아래에 행이 추가됩니다. 조회 직후 첫 번째 행에 포커스가 있으면 두 번째 행에 추가됩니다.

- `SelectCell`은 스크롤이 이동되지 않으면 해당 셀로 포커스가 이동되지 않아 포커스 정보가 없으므로, 인자 없이 `DataInsert()`를 호출하면 최상단 행으로 추가됩니다.
- 추가할 위치를 지정해 호출하면(`var insRow = mySheet.DataInsert(j+1);`) 지정한 행의 아래에 추가됩니다. 행 추가가 동기 방식이라 생성된 행으로 포커스가 이동하며, 반환된 행에 `SetRowData`로 데이터를 넣습니다.
- 중간 위치 추가는 위치를 계산해서 처리하면 가능합니다. 첫 번째 행에 넣으려면 `DataInsert()` 함수를 오버라이드하는 방법이 있으나 권장되지 않습니다.

**키워드**: DataInsert, SelectCell, SetRowData, 행 추가 위치, 최상단 행

---

### [API-0137] DataInsert로 행을 추가하고 입력하는 중 포커스가 갑자기 다른 행으로 이동합니다

**질문**

- DataInsert로 마지막 행에 신규 행을 추가하고 다음 셀로 넘어가며 입력하는데 갑자기 포커스가 다른 행으로 이동합니다. 원인이 무엇인가요?

**답변**

기본적인 신규 행 생성 기능만으로는 포커스가 튀는 현상이 없습니다. 이벤트 안에 `SelectCell`이나 `SelectRow`처럼 포커스를 이동시키는 로직이 있을 수 있으므로, 해당 소스를 주석 처리한 뒤 같은 현상이 발생하는지 확인해 보세요.

**키워드**: DataInsert, SelectCell, SelectRow, 포커스 튐

---

### [API-0138] SelectCell 3번째 인자에 true/false를 주면 콤보 리스트가 열리거나 OnAfterEdit가 발생합니다

**질문**

- IBSheet7의 SelectCell 함수 3번째 인자에 true를 주면 콤보 컬럼에서 콤보 리스트가 열립니다. 이전 ActiveX 버전처럼 열리지 않게 하려면 어떻게 하나요?
- ActiveX에서 SelectCell의 세 번째 인자를 false로 사용하던 코드를 옮겼더니 SelectCell 후 OnAfterEdit가 발생합니다.
- 코드에서 콤보 셀을 선택할 때 콤보 목록이 바로 펼쳐지게 하려면 어떻게 하나요?

**답변**

IBSheet7에서 `SelectCell`의 3번째 인자는 Opt 값입니다.

- 콤보 컬럼에서 `SelectCell(row,col, edit)` 형태로 true를 지정하면 콤보 리스트가 열립니다. 이전 ActiveX 버전에서는 이 인자를 넣어도 리스트가 열리지 않았는데, 버그이거나 콤보 처리가 고려되지 않아서로 보입니다. 리스트가 열리지 않게 하려면 3번째 인자를 설정하지 않거나 false로 합니다.
- ActiveX에서 세 번째 인자를 false로 쓰던 코드를 마이그레이션할 때 그대로 false를 넣으면 의도대로 동작하지 않아 `SelectCell` 후 `OnAfterEdit`가 발생할 수 있으므로 `{Edit:false}` 형식으로 변경합니다.

**키워드**: SelectCell, Opt, OnAfterEdit, {Edit:false}, 콤보 리스트, ActiveX

---

### [API-0139] 조회 후나 팝업에서 값을 설정한 뒤 원하는 행·셀을 선택하려면 어떻게 하나요?

**질문**

- 조회된 데이터를 가져오면 포커스가 첫 번째 행에 선택되는데, 원하는 행이 선택되어 보이도록 하려면 어떻게 하나요?
- 팝업창에서 부모 시트로 값을 설정한 뒤 값을 넣은 행의 특정 컬럼 셀을 선택하려면 어떻게 해야 하나요?

**답변**

`SelectCell`로 원하는 셀을 선택합니다. 조회 후에는 `OnSearchEnd`에서 `SelectCell()`을 호출해 원하는 행을 선택합니다. 이 호출 때문에 `OnSelectCell` 이벤트가 발생하지 않게 하려면 `Event:0` 옵션을 넣습니다.

**키워드**: SelectCell, OnSearchEnd, OnSelectCell, Event:0, 조회 후 행 선택

---

### [API-0140] 사용자가 선택한 셀의 행·열 정보를 알려면 어떤 이벤트와 함수를 쓰나요?

**질문**

- 시트에서 사용자가 선택한 셀의 행과 열 정보를 알려면 어떻게 하나요? 어떤 이벤트에서 정보가 넘어오나요?
- 코드로 행을 선택한 직후 클릭 같은 이벤트가 바로 발생하게 하려면 어떻게 하나요?

**답변**

클릭하면 `OnClick`(마우스 클릭)과 `OnSelectCell`(마우스 클릭, 키보드 이동) 이벤트가 발생하며, 이 이벤트에서 row, col 정보가 넘어옵니다. 현재 선택된 셀의 정보는 `GetSelectRow`, `GetSelectCol`로 확인할 수 있습니다.
코드로 행을 선택한 직후 이벤트가 발생하게 하려면 `OnSelectCell` 이벤트를 사용하고 `SetSelectRow`의 두 번째 인자를 true로 설정합니다.

**키워드**: OnClick, OnSelectCell, GetSelectRow, GetSelectCol, SetSelectRow, 선택 셀 정보

---

## 행·셀 선택 영역

### [API-0141] FocusAfterProcess를 false로 준 뒤 SelectRow를 호출하면 1이 반환되는 이유

**질문**

- FocusAfterProcess를 false로 준 뒤 SelectRow를 호출하면 1 값이 반환됩니다. 포커스가 없는데 왜 1이 반환되나요?

**답변**

`FocusAfterProcess`는 포커스 표시만 하지 않을 뿐 선택 행 값은 1을 가지고 있습니다. `OnSelectCell`에서 `oldrow`가 1보다 큰 것들만 찾아야 할 것으로 보입니다.

**키워드**: FocusAfterProcess, SelectRow, OnSelectCell, oldrow, 선택 행 1

---

### [API-0142] 행 단위가 아니라 셀 단위로 선택하도록 설정할 수 있나요? (SelectionMode)

**질문**

- 행을 클릭하면 한 행 단위로 선택되는데, 행 단위가 아니라 셀 단위로 선택하도록 설정할 수 있나요?

**답변**

`SelectionMode()` 함수로 시트의 선택 모드를 셀 단위 또는 행 단위로 설정할 수 있습니다.

**키워드**: SelectionMode, 셀 단위 선택, 행 단위 선택

---

### [API-0143] Ctrl+A를 눌렀을 때 시트의 모든 행이 선택되게 하려면 어떻게 하나요?

**질문**

- Ctrl+A 키를 눌렀을 때 시트의 모든 행이 한 번에 선택되게 하려면 어떻게 구현하나요? 조회 모드에 따른 적용 조건이 있는지도 알고 싶습니다.

**답변**

`OnKeyDown` 이벤트에서 `KeyCode == 65 && Shift == 2`이면 `mySheet.SetSelectRange(1, 0, mySheet.LastRow(), mySheet.LastCol())`을 호출해 전체를 선택합니다. 대용량 조회 모드나 페이징 모드에서는 동작하지 않으므로 기본 조회 모드(LazyMode)에서만 적용합니다.

**키워드**: OnKeyDown, SetSelectRange, LastRow, LastCol, Ctrl+A, 전체 선택, LazyMode

---

### [API-0144] Shift로 여러 행을 선택했을 때 선택된 행의 체크박스 컬럼도 함께 체크하려면 어떻게 하나요?

**질문**

- Shift를 누르고 선택하면 드래그처럼 여러 행이 선택되는데, 선택된 행들의 체크박스 컬럼도 함께 체크되게 하려면 어떻게 하나요?

**답변**

`OnSelectEnd` 이벤트에서 `GetSelectionRows`로 선택된 행의 index를 가져온 뒤, 해당 행들의 체크박스 컬럼 값을 true로 변경합니다.

**키워드**: OnSelectEnd, GetSelectionRows, 체크박스, Shift 선택

---

### [API-0145] 드래그·Shift로 선택한 행의 인덱스(첫 행·마지막 행)를 구하려면 어떻게 하나요? (GetSelectionRows)

**질문**

- 마우스로 여러 행(멀티 로우)을 선택했을 때 선택된 시작 행 번호와 마지막 행 번호를 알아내려면 어떤 함수를 어떻게 사용하나요?
- 마우스 드래그나 Shift 키로 여러 행을 선택했을 때 선택된 행들의 인덱스를 구하려면 어떤 함수를 쓰나요?

**답변**

`GetSelectionRows()`를 사용합니다. 현재 선택된 행의 index가 구분자로 묶인 문자열로 반환되며, 구분자를 생략하면 기본적으로 `|`로 묶여 반환됩니다. `split`으로 나눈 뒤 첫 원소와 마지막 원소를 사용하면 첫 행과 마지막 행을 구할 수 있습니다.

```
var sRow = mySheet.GetSelectionRows('/');
var arr = sRow.split('/');
var fRow = arr[0];
var lRow = arr[arr.length -1];
```

**키워드**: GetSelectionRows, split, 드래그 선택, 선택 행 인덱스, 첫 행 마지막 행

---

### [API-0146] 선택한 셀 영역의 행·열 범위를 가져오거나 그 영역에 배경색을 적용하려면 어떻게 하나요?

**질문**

- SetSelectRange로 셀 선택 범위를 지정할 수 있는데, 선택된 범위를 가져오는 방법은 무엇인가요?
- 마우스로 드래그해 선택한 영역의 시작·끝 위치를 구해서 그 범위의 배경색을 바꾸려면 어떤 API를 사용하나요?
- 셀 하나만 선택한 상태에서 GetSelectionCols()를 호출하면 반환값이 없습니다.

**답변**

`SetSelectRange`로 셀 영역을 지정하고, 선택된 행과 열 값은 `GetSelectionRows`와 `GetSelectionCols`로 가져옵니다. 선택 영역에 색상을 적용하는 기능도 이 두 함수로 선택된 행·열을 구해 구현합니다. 예제는 https://jsfiddle.net/upo3mn0z 에서 볼 수 있습니다.
셀 하나만 선택한 상태에서 `GetSelectionCols()`의 반환값이 없는 증상은 IBSheet7 7.0.13.251 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.251에서 처리

**키워드**: SetSelectRange, GetSelectionRows, GetSelectionCols, 7.0.13.251, 선택 영역, 배경색

---

### [API-0147] GetSelectionRows 호출 시 '함수가 정의되지 않았습니다' 메시지가 출력됩니다

**질문**

- SelectionMode를 3으로 설정하고 GetSelectionRows()를 호출하면 '함수가 정의되지 않았습니다' 메시지가 출력됩니다. 원인이 무엇인가요?

**답변**

함수 이름의 철자가 틀린 경우입니다. '함수가 정의되지 않았습니다' 메시지가 나오면 호출한 함수명의 철자를 먼저 확인합니다.

**키워드**: 함수가 정의되지 않았습니다, GetSelectionRows, SelectionMode, 철자

---

### [API-0148] GetSelectionRows·GetSelectionCols 결과에 선택하지 않은 포커스 행이 포함됩니다

**질문**

- GetSelectionRows, GetSelectionCols, OnSelectEnd 결과에 내가 선택하지 않은 포커스 행까지 포함됩니다. 포커스 행을 빼려면 어떻게 하나요?
- 특정 행을 선택한 뒤 마우스 드래그로 영역을 선택하면 처음 선택했던 행이 함께 포함됩니다. 드래그한 영역만 구할 수 있나요?

**답변**

포커스가 들어간 행(셀)도 select된 행으로 인식되어 선택 행을 반환하는 함수에서 함께 추출됩니다. 이 때문에 선택 영역에 색상을 적용하면 포커스 행의 색상도 함께 바뀝니다.

- 전역 속성 `SelectionRowsMode`로 포커스 행 포함 여부를 설정합니다. 기본값 0은 포커스 행을 포함하고, 1로 설정하면 제외됩니다. `SetConfig({SelectionRowsMode:1})`이나 ibsheet.cfg에 설정하며, 시트 개별로 적용하려면 InitColumns 호출 전에 `sheet.SelectionRowsMode=1`로 설정합니다.
- 또는 마우스 드래그 시점에 포커스된 셀을 강제로 이동시키는 방법으로, `OnMouseDown`에서 `SelectCell`로 `MouseRow`와 `MouseCol`을 선택하게 할 수 있습니다.
우회할 방법이 없다고 안내된 문의도 있었으므로, 사용 중인 버전에서 위 옵션이 동작하는지 확인하세요.

**키워드**: SelectionRowsMode, GetSelectionRows, GetSelectionCols, OnSelectEnd, OnMouseDown, MouseRow, 포커스 행 제외

---

### [API-0149] 선택된 행이나 시트 포커스를 해제(초기화)하려면 어떻게 하나요? (SetSelectRow(-1), SetBlur)

**질문**

- 시트에서 현재 선택된 행을 초기화(선택 해제)하려면 어떻게 하나요?
- 멀티 선택을 사용하는 시트에서 1행을 선택한 뒤 3~5행을 드래그하면 먼저 선택한 1행도 선택 상태로 남습니다.
- 시트에서 포커스를 빼려고 blur()나 SetSelectRow(-1)을 호출했는데 선택 행의 색상·보더가 남거나 포커스가 그대로입니다.

**답변**

`SetSelectRow(-1)`을 호출하면 선택된 행이 해제됩니다. 이 호출은 포커스 레이어(선택 행의 색상·보더)만 없애고 포커스는 남습니다.

- 포커스까지 빼려면 `SetBlur()`를 함께 호출합니다. 예: `mySheet.SetSelectRow(-1); mySheet.SetBlur(1);`. `blur()`로는 포커스가 빠지지만 선택된 행의 CSS는 남으므로 `SetSelectRow(-1)`을 같이 사용해야 합니다.
- 초기화 버튼 등에서 포커스와 선택 행 색상을 모두 빼려면 `mySheet.SetBlur(); mySheet.Focus(null,null,null,null,null,null)`을 호출합니다. `Focus(null,null,null,null,null,null)`을 호출하면 선택한 row의 색상 정보도 빠집니다.
- 조회 후에는 `mySheet.SetSelectRow(-1);`로, 저장 후에는 `OnSaveEnd` 이벤트에서 호출합니다. 시트가 여러 개일 때 특정 시트의 선택을 없애려면 그 시트에 `SetSelectRow(-1)`을 처리한 뒤 포커스를 줄 시트에 `SelectRow`를 처리합니다.

**키워드**: SetSelectRow, SetBlur, Focus, OnSaveEnd, 선택 해제, 포커스 빼기

---

### [API-0150] SetSelectRow로 행을 선택할 때 세로 스크롤이 그 행으로 이동하지 않는 증상의 수정 버전

**질문**

- SetSelectRow로 행을 선택할 때 세로 스크롤이 있는 시트에서 선택한 행 위치로 스크롤이 이동하게 하려면 어떻게 해야 하나요?

**답변**

`SetSelectRow` 선택 시 세로 스크롤이 선택 행으로 이동하지 않는 증상은 IBSheet7 7.0.4.6-20141127-15 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.4.6-20141127-15에서 처리

**키워드**: SetSelectRow, 7.0.4.6-20141127-15, 세로 스크롤, 스크롤 이동

---

## 스크롤 위치·선택 복원

### [API-0151] 재조회·저장 후 이전 스크롤 위치나 선택한 행·선택 영역을 복원하려면 어떻게 하나요?

**질문**

- 조회 버튼을 다시 눌러 재조회하면 시트가 맨 윗줄로 이동합니다. 기존 위치를 유지한 채 데이터만 갱신하려면 어떻게 하나요?
- 조회나 저장 전에 스크롤 위치를 기억해 두었다가 재조회 후 같은 세로 스크롤 위치로 이동시키고 싶습니다.
- 조회나 저장 후 재조회하면 이전에 선택했던 행으로 포커스가 돌아오지 않습니다. 이전 행으로 다시 이동시키려면 어떻게 하나요?
- 셀 영역을 선택해 삭제·저장한 뒤 재조회하면 선택 영역과 스크롤 위치가 사라지고 첫 셀로 포커스가 이동합니다.

**답변**

시트에 선택 행을 기억해 주는 기능은 없고, 재조회 시 시트는 기존 데이터를 완전히 삭제하므로 기존 위치라는 개념이 없어집니다. 따라서 조회나 저장 전에 상태를 변수에 보관했다가 조회·저장 완료 시점(예: `OnSearchEnd`)에 복원합니다.

- 스크롤 위치: 조회나 저장 전에 `GetTopRow()`로 현재 위치를 가져와 두고 재조회 후 `SetTopRow()`로 설정합니다. 또는 조회 전에 `ScrollTop`으로 스크롤 위치를 보관했다가 조회 완료 후 `SetScrollTop`을 호출합니다.
- 선택 행: `GetSelectRow()`로 선택 행 정보를 전역으로 보관했다가 `SetSelectRow()`로 다시 설정합니다. 포커스를 준 행까지 함께 선택해야 한다면 선택된 행 정보를 보관했다가 `SelectCell()`로 위치를 이동시킵니다.
- 선택 영역·스크롤: `GetSelectionRows`, `GetSelectionCols`, `GetTopRow`, `GetLeftCol`로 저장해 두고 `OnSearchEnd`에서 `SetSelectRange`, `SetTopRow`, `SetLeftCol`로 되돌립니다. 이를 위해 ibsheet.cfg에서 `SelectionRowsMode="1"`로 설정합니다.
- 목록 복귀 시 이전에 보던 행으로 이동하는 기능은 `SelectRow`, `TopRow` 등을 이용해 구현할 수 있습니다.

**키워드**: GetTopRow, SetTopRow, SetScrollTop, GetSelectRow, SetSelectRow, SelectCell, SelectionRowsMode, 스크롤 위치 유지

---

### [API-0152] 탭 전환 시 숨겨진 시트에서 SetTopRow가 동작하지 않거나 스크롤이 맨 위로 올라갑니다

**질문**

- 탭으로 여러 시트를 쓰는데 숨겨진 탭의 시트에서는 SetTopRow가 동작하지 않습니다. 특정 행이 맨 위에 보이도록 하려면 어떻게 하나요?
- 다른 탭을 클릭하면 시트가 리사이즈되면서 스크롤이 맨 위로 올라갑니다. 스크롤 위치를 다시 맞추려면 어떻게 하나요?

**답변**

`SetTopRow`는 화면에 보이는 기준으로 최상단 행을 설정하는 API여서, 시트가 보이지 않는 상태에서는 특정 행이 최상단에 오도록 스크롤할 방법이 없습니다. 탭 이동으로 시트가 `display:block`처럼 보이는 상태가 되어 브라우저 렌더링이 끝난 시점에 `SetTopRow`를 호출해야 합니다(예: `show()` 후 `setTimeout`으로 100ms 지연 호출).
리사이즈가 일어나더라도 스크롤이 변화하는 것은 올바른 동작으로 보기 어렵습니다. 스크롤 위치를 직접 조정하려면 `TopRow` 함수를 사용합니다.

**키워드**: SetTopRow, TopRow, 탭, display:block, setTimeout, 스크롤 맨 위

---

### [API-0153] 특정 행으로 스크롤을 이동하거나 그 행이 시트 맨 위에 오게 하려면 어떻게 하나요?

**질문**

- 값이 생성된 행으로 화면 스크롤이 이동하게 하려면 어떤 기능을 사용하나요? 선택한 행이 시트 상단에 오게 할 수도 있나요?
- DoSearch로 200~300건을 조회한 뒤 페이징처럼 특정 위치로 스크롤을 이동시키고 싶습니다.
- 특정 행에 포커스를 줄 때 그 행이 스크롤 영역의 맨 위에 오도록 하려면 어떤 메소드와 이벤트를 쓰나요?

**답변**

시트는 셀에 포커스가 위치하면 해당 위치가 화면에 표시되도록 스크롤이 자동으로 이동합니다.

- 스크롤 하단에 감춰진 행으로 이동하려면 `SelectCell(Row, Col)`로 해당 행의 셀을 선택합니다.
- 선택한 행이 시트 상단에 오도록 하려면 `SetTopRow`로 최상단 행 번호를 설정합니다. 예: `mySheet.SelectCell(50,3); mySheet.SetTopRow(50);`
- 조회 후 원하는 위치로 이동하려면 `SetTopRow`로 그 행을 맨 상단에 위치시킨 뒤 `SetSelectRow`로 선택해 포커스를 줍니다.
- 포커스한 행을 스크롤 최상단으로 이동하는 처리는 `OnSelectCell` 이벤트에서 구현한 샘플이 있습니다.

**키워드**: SetTopRow, SelectCell, SetSelectRow, OnSelectCell, 스크롤 이동, 맨 위 행

---

### [API-0154] 버튼 클릭으로 특정 컬럼이 보이도록 가로 스크롤을 이동하려면 어떻게 하나요?

**질문**

- 컬럼이 많아 가로 스크롤이 생기는 시트에서 버튼을 클릭했을 때 특정 컬럼이 보이도록 스크롤을 이동하려면 어떻게 하나요?

**답변**

`LeftCol` 함수를 이용해 해당 컬럼이 보이도록 가로 스크롤을 이동할 수 있습니다.

**키워드**: LeftCol, 가로 스크롤, 컬럼 이동

---

### [API-0155] 여러 시트로 나눠 조회할 때 한 시트에서 행을 선택하면 다른 시트의 같은 행도 선택되고 스크롤이 이동하게 하려면?

**질문**

- 컬럼이 많아 여러 시트로 나누어 조회할 때, 첫 번째 시트에서 행을 선택하면 나머지 시트의 같은 행도 선택되고 스크롤도 함께 이동하게 하려면 어떻게 하나요?

**답변**

첫 번째 시트의 `OnSelectCell` 이벤트에서 나머지 시트들을 해당 행 번호로 `SelectCell()` 하는 방식이 좋습니다. `SelectCell`을 호출하면 스크롤이 자동으로 이동하므로 따로 스크롤을 설정하지 않아도 됩니다. 스크롤만 이동시키려면 `TopRow` 함수로 설정할 수 있습니다.

**키워드**: OnSelectCell, SelectCell, TopRow, 시트 동기화, 스크롤 동기화

---

## 시트 객체·포커스·화면 제어

### [API-0156] 엑셀의 Transpose처럼 시트의 행과 열을 서로 바꾸는 기능이 있나요?

**질문**

- 시트의 데이터 행과 열을 서로 바꾸는 엑셀의 Transpose와 같은 기능이 있나요? 피벗이 아니라 행/열 전환 기능입니다.

**답변**

시트의 행과 열을 서로 바꾸는 기능은 제공되지 않습니다.

**키워드**: Transpose, 행 열 전환, 피벗, 미지원

---

### [API-0157] ShowFooterRow 호출 오류(지원 버전)와 푸터 행의 특정 셀 값만 바꾸는 방법

**질문**

- ShowFooterRow를 호출하면 에러가 납니다. 사용 중인 버전은 7.0.13.55입니다.
- Footer 행에서 특정 셀 영역의 값만 바꾸는 기능이 있나요?

**답변**

- `ShowFooterRow`는 7.0.13.60 버전부터 지원되므로 7.0.13.55처럼 그보다 낮은 버전에서 호출하면 에러가 납니다. 7.0.13.60 이상 버전으로 교체합니다.
- Footer 행의 특정 셀만 바꾸는 기능은 없으며, `ShowFooterRow`를 중복으로 다시 호출해서 값을 바꿔야 합니다.

**적용 버전**: 7.0.13.60 이상

**키워드**: ShowFooterRow, 푸터 행, Footer, 7.0.13.60, 푸터 값 변경

---

### [API-0158] 셀 단위 커서 함수 setCellCur 호출 시 '지정되지 않은 함수' 오류

**질문**

- 셀 단위로 마우스 커서 모양을 바꾸려고 함수를 호출하면 '지정되지 않은 함수'라는 오류가 납니다. 사용 중인 ibsheet js 버전이 낮은 것이 원인인가요?

**답변**

셀 단위 커서 함수 `setCellCur()`는 7.0.13.60 버전부터 지원되므로, 그보다 낮은 버전의 js를 사용하면 지정되지 않은 함수라는 오류가 납니다. 최신 js로 교체하면 정상적으로 사용할 수 있으며, `OnRowSearchEnd`나 `OnSearchEnd`에서 사용합니다.

**적용 버전**: 7.0.13.60 이상

**키워드**: setCellCur, 커서 모양, 지정되지 않은 함수, OnRowSearchEnd, 7.0.13.60

---

### [API-0159] SizeMode:4 상태에서 헤더 클릭 정렬 시 스크롤이 이동하지 않게 하려면 (SetHighlightAfterSort)

**질문**

- 세로 스크롤 SizeMode:4 상태에서 헤더 클릭 정렬 시 스크롤이 이동합니다. 정렬 시 스크롤을 최상단으로 고정하는 기능이 있나요?

**답변**

헤더 클릭 정렬 시 스크롤을 최상단으로 고정하려면 `SetHighlightAfterSort` 함수를 사용합니다. 이 함수는 7.0.13.16 버전에서 추가되었으므로 그보다 이전 버전을 쓰는 환경에서는 사용할 수 없고 제품 패치가 필요합니다.

**적용 버전**: 7.0.13.16 이상

**키워드**: SetHighlightAfterSort, SizeMode, 정렬 후 스크롤, 스크롤 최상단, 7.0.13.16

---

### [API-0160] 시트의 포커스를 해제하려면 어떻게 하나요? (SetBlur)

**질문**

- 시트 위에 div(팝업)나 레이어 팝업을 띄웠는데 시트가 포커스를 계속 가지고 있는 것처럼 보입니다. 포커스를 해제하려면 어떻게 하나요?
- 시트 조회가 끝난 뒤 시트가 포커스를 가져가는데, 시트 밖의 input에 focus를 주고 싶습니다.
- 그리드에서 행을 클릭해 선택된 포커스를 해제시키는 함수가 있나요?

**답변**

`SetBlur`(또는 `setBlur()`)를 호출하면 시트 전체에서 포커스를 뺄 수 있습니다. 조회 후 시트가 포커스를 가져가는 경우나 조회 후 시트 밖의 input에 focus를 줄 때도 `SetBlur()`를 사용합니다. 다만 선택된 행의 색상만 빠지게 하는 것은 할 수 없습니다.

- 7.0.13.157 이상 버전에서는 `SetBlur(1)`을 호출합니다.
- 그보다 낮은 버전에서는 `Enable` 함수를 호출해야 하며, Enable된 div(GMDisabled)가 뜨므로 ibsheet.css의 div z-index를 조정해야 할 수 있습니다. 팝업을 닫을 때는 `Enable(1)`을 호출해야 합니다.

**적용 버전**: 7.0.13.157 이상(SetBlur(1) 추가)

**키워드**: SetBlur, setBlur, Enable, GMDisabled, 포커스 해제, 조회 후 포커스

---

### [API-0161] 모달 팝업이 떠 있는 동안에도 시트에 입력되고 SetBlur를 써도 마찬가지입니다

**질문**

- OnSelectCell에서 jQuery 모달 팝업을 띄웠는데 팝업이 떠 있는 동안에도 시트에 계속 입력되고, SetBlur를 써도 마찬가지입니다. 원인과 해결 방법은 무엇인가요?

**답변**

편집 중 시트는 키 입력을 후킹해 셀에 값을 넣습니다. javascript `focus()`로 다른 객체에 포커스를 옮기면 시트는 포커스를 잃었는지 알 수 없어 계속 입력을 받습니다. `SetBlur()`는 시트에 더 이상 포커스가 없다고 알려 주는 함수일 뿐 포커스를 강제로 옮기지 않으므로, 먼저 팝업 쪽으로 포커스를 옮긴 뒤 `SetBlur()`를 호출해야 합니다. 이때 `setTimeout`의 세 번째 인자(파라미터 전달)는 IE10 이상에서만 사용할 수 있습니다.

**키워드**: SetBlur, OnSelectCell, focus, setTimeout, 모달 팝업, 키 입력

---

### [API-0162] enable(0) 후 enable(1)을 호출하면 포커스된 셀이 유지되지 않습니다 (ActiveX와 차이)

**질문**

- ActiveX에서는 setEnable(0) 후 setEnable(1)을 주면 포커스된 셀이 그대로 활성화되었는데, IBSheet7에서는 enable(0)을 하면 포커스가 빠집니다. 방법이 없나요?

**답변**

IBSheet7에서는 ActiveX와 동일하게 동작하지 않는 것으로 보입니다. `enable(0)`이 호출되는 시점에 포커스 자체가 빠지는 것이 원인으로 보이며, 브라우저에서 동작하는 방식이라 html의 disabled 속성에 따라 똑같이 동작하는 것으로 보입니다.

**키워드**: enable, setEnable, 포커스, ActiveX, disabled

---

### [API-0163] 여러 시트 중 현재 포커스된 시트를 확인하고 테두리로 표시하려면 어떻게 하나요?

**질문**

- 한 화면에 IBSheet가 여러 개 있을 때 현재 선택(포커스)된 시트가 어느 것인지 알아내거나 테두리 등으로 눈에 보이게 표시하려면 어떻게 하나요?

**답변**

`sheet.IsFocused()` 함수를 호출하면 됩니다. 시트가 여러 개이면 전체 IBSheet 객체(`Grids`)에 접근해 loop를 돌립니다. 선택된 시트의 테두리를 표시하려면 `.GMFocusedSheet { box-shadow: 0 0 10px red !important; }` 클래스를 추가합니다.

**키워드**: IsFocused, Grids, GMFocusedSheet, 포커스된 시트, 테두리

---

### [API-0164] 화면에 시트가 여러 개일 때 현재 포커스가 들어간 시트 객체를 확인하려면?

**질문**

- 한 화면에 시트가 여러 개 있을 때 현재 포커스가 들어가 있는 시트 객체(ID)를 확인할 수 있는 기능이 있나요?

**답변**

`Grids`의 length만큼 루프를 돌면서 `window[Grids[1].id].IsFocused()` 같은 코드로 포커스가 들어간 시트 객체를 확인할 수 있습니다. 7.0.0.0.2014 버전에는 `IsFocused` 함수가 없습니다.

**적용 버전**: IsFocused는 7.0.0.0.2014 버전에 없음

**키워드**: Grids, IsFocused, 시트 객체, 포커스된 시트

---

### [API-0165] 화면의 시트 개수·id·객체를 공통으로 조회하려면 어떻게 하나요? (Grids)

**질문**

- 화면 리사이즈 때 시트 너비/높이를 공통으로 처리하려고 합니다. 화면에 시트가 있는지, 시트의 id가 무엇인지 알 수 있나요?
- 현재 화면에 생성된 시트 객체의 개수를 가져올 수 있는 API가 있나요?
- 브라우저 F12 콘솔에서 시트에 설정된 컬럼 정보(SaveName 등)나 행 데이터, 개별 셀 속성을 확인하려면 어떻게 하나요?
- 페이지에 생성된 모든 시트의 모든 컬럼 SaveName을 추출하려면 어떻게 하나요?

**답변**

시트의 개수·객체명을 가져오는 공식 API는 없고, 시트가 생성되면 제품 내의 전역 `Grids` 배열에 담기는 것을 이용합니다.

- 개수: `Grids.length`, 시트 객체: `Grids[index]`, 시트 id: `Grids[0].id`. 이를 이용해 `window[Grids[0].id].setSheetHeight()`처럼 공통 처리를 할 수 있습니다.
- 모든 시트 순회: `$.each(Grids, function(i, j){ console.log(j.id);})`
- 콘솔 확인: 시트 ID(`createIBSheet`의 두 번째 인자)나 `Grids[0]`으로 접근합니다. 컬럼은 `Grids[0].Cols`, `mySheet.Cols`, 행 데이터는 `mySheet.RowData()`(JSON 객체), 개별 셀 속성은 `mySheet.GetCellProperty`로 확인합니다.
- 모든 컬럼 SaveName: `Grids` 배열을 순회하며 각 시트의 `Object.keys(Grids[i].Cols)`로 키를 얻고, `Panel` 키를 제외한 `Grids[i].Cols[key].SaveName`을 읽습니다.

**키워드**: Grids, Grids.length, Cols, RowData, GetCellProperty, createIBSheet, setSheetHeight

---

### [API-0166] DisposeSheet(1)을 호출하면 이벤트가 사라집니다. DisposeSheet와 ClearUnload의 차이는?

**질문**

- DisposeSheet(1)을 호출했더니 화면에 정의한 이벤트가 사라져 시트 클릭이나 이벤트가 동작하지 않습니다. 어떻게 호출해야 하나요?
- 시트 객체를 삭제하는 DisposeSheet와 ClearUnload 함수는 어떤 차이가 있나요? div를 닫을 때 어느 것을 써야 하나요?

**답변**

`DisposeSheet(1)`(또는 `DisposeSheet(true)`)은 시트와 함께 이벤트까지 모두 삭제합니다. 시트를 생성하기 전에 호출하거나 화면에 정의한 이벤트를 유지해야 하는 경우에는 이벤트가 사라져 동작하지 않으므로, 창을 닫을 때 호출하거나 인자 없이 `DisposeSheet();`만 호출해야 합니다.
`DisposeSheet`와 `ClearUnload`는 모두 시트 객체를 삭제하는 함수입니다. `DisposeSheet`는 단일 시트의 객체를 삭제하고, `ClearUnload`는 화면상에 보이는 모든 시트의 객체를 삭제합니다.

**키워드**: DisposeSheet, ClearUnload, 이벤트 삭제, 시트 객체 삭제

---

### [API-0167] 화면에 표시된 시트 전체를 보이지 않게 감추려면 어떻게 하나요? (SetVisible)

**질문**

- 화면에 표시된 IBSheet 시트 전체를 보이지 않게 감추고 싶습니다. 시트를 숨기는 함수나 속성이 있나요?

**답변**

`sheet.SetVisible(0);`을 호출하면 시트를 감출 수 있습니다. 자세한 사용법은 매뉴얼의 Visible 항목을 참고합니다.

**키워드**: SetVisible, Visible, 시트 숨기기

---

### [API-0168] 시트 전체의 포커스와 입력을 막고 흐리게 표시되는 표현을 없애려면 어떻게 하나요? (SetEnable)

**질문**

- 시트 전체에 대한 포커스와 입력을 아예 막을 수 있는 방법이나 메서드가 있나요? 입력이 막힌 상태에서 시트가 흐리게 표시되는 표현도 없애고 싶습니다.

**답변**

`SetEnable()` 메서드를 사용합니다. 이를 사용하면 입력이 안 된다는 뜻으로 시트가 약간 흐리게 표시되는데, 이 표현이 싫으면 `.GMDisabled{position:absolute; z-index:264; background:#ffffff; opacity:0.01; filter:alpha(opacity=99); }`로 css를 수정합니다.

**키워드**: SetEnable, GMDisabled, 입력 차단, 흐림 표시

---

### [API-0169] SetDragMod(1)을 설정했는데 드래그해도 행 순서가 바뀌지 않습니다

**질문**

- SetDragMod(1)을 설정했는데 드래그해도 행 순서가 바뀌지 않습니다. 추가 옵션이 있는지, 이벤트로 직접 구현해야 하는지 궁금합니다.

**답변**

`SetDragMod(1)`은 행을 드래그할 수 있게 준비해 주는 함수입니다. 행 이동 동작은 소스를 직접 구현해야 하며, 데모의 IBSheet > 트리 데이터 드래그&드랍 이동 페이지를 참고할 수 있습니다.

**키워드**: SetDragMod, 드래그, 행 이동, 트리 드래그&드랍

---

## 행·컬럼 숨김

### [API-0170] 행(헤더 행 포함)을 숨기거나 조건에 맞는 행을 숨기려면 RowHidden을 어떻게 쓰나요?

**질문**

- 시트의 행을 숨겼다가 마우스 오른쪽 클릭 같은 동작으로 다시 보여주고 싶습니다. 행의 숨김 여부를 설정하는 함수는 무엇인가요?
- 시트의 헤더 부분을 숨김 처리하려면 어떻게 해야 하나요?
- SetRowHidden(Row, Hidden)에서 Row 파라미터에 무엇을 넣어야 하나요?
- 특정 조건이나 특정 값이 조회된 행을 숨기려면 어떤 함수를 사용하나요?

**답변**

행의 숨김 여부는 `RowHidden`(`SetRowHidden`) 함수로 설정하며 get/set 형태가 있어 필요에 따라 사용합니다.

- 첫 번째 인자는 Row Index(행과 열의 시작 인덱스는 0부터, 여러 행은 `|`로 구분)이고 두 번째 인자는 숨김 여부로 1이면 숨김, 0이면 보임입니다. 선택된 행의 인덱스는 `GetSelectRow()`로 구합니다.
- 헤더 행 숨기기: `RowHidden(0,1)`을 호출합니다.
- 특정 값을 가진 행 숨기기: `FindText`로 찾으면 행 번호가 반환되므로 그 행에 `RowHidden()`을 호출합니다.
- 숨겨 둔 행을 특정 동작(예: 마우스 오른쪽 클릭)에서 다시 보여주려면 같은 함수로 숨김 여부를 0으로 바꿉니다.

**키워드**: RowHidden, SetRowHidden, 헤더 행 숨김, 행 숨기기, FindText, GetSelectRow

---

### [API-0171] 컬럼을 숨기거나 다시 보이게 하려면 ColHidden·SetColHidden을 어떻게 쓰나요? (여러 컬럼, ValidCol)

**질문**

- 시트 로드 후 조건에 따라 컬럼을 숨기거나 상세 시트에서 특정 키 컬럼을 보이지 않게 하려면 어떤 메소드를 쓰나요?
- 조회 후나 조회 조건에 따라 컬럼을 동적으로 숨기거나 다시 보이게 하려면 어떤 함수를 사용하나요?
- 시트 영역 밖의 체크박스를 클릭하면 원하는 컬럼들을 한 번에 숨기려면 어떻게 하나요?
- SetColHidden 옵션 중 validCol은 정확히 무엇을 하는 옵션인가요?

**답변**

`ColHidden` 또는 `SetColHidden` 함수를 사용합니다. 조회 후 컬럼을 숨기려면 `SetColHidden(Col, 1)`처럼 호출하며, 조회 조건에 따라 Hidden 값(0 또는 1)을 바꿔 호출하면 컬럼을 보이거나 숨기도록 전환할 수 있습니다.

- 시트 밖 체크박스로 컬럼을 숨기려면 `ColHidden`을 사용해 체크박스 클릭 이벤트를 직접 만듭니다.
- 여러 컬럼 숨김을 한 번에 처리하는 별도 기능은 없다는 답변이 있었으나, `SetColHidden`에 컬럼 정보 배열을 지정해 한 번에 호출하는 사용 예가 있습니다.
- 2개 이상의 컬럼을 숨길 때 `ValidCol` 옵션(기본값 1)에 따라 유효하지 않은 컬럼 정보에 대해 숨김 처리를 할지 말지가 결정됩니다. 유효하지 않은 컬럼이 있더라도 숨김 처리하려면 배열 끝에 `{ValidCol:0}`을 넣습니다.

```
mySheet.SetColHidden([{Col:3,Hidden:1},{Col:6,Hidden:1},{ValidCol:0}])
```

**키워드**: ColHidden, SetColHidden, ValidCol, 컬럼 숨기기, 여러 컬럼 숨김, 컬럼 보이기

---

### [API-0172] 조회 조건에 따라 보여야 할 컬럼이 다를 때 컬럼 구성을 동적으로 처리하는 방법(재조회 시 컬럼이 계속 숨겨짐)

**질문**

- 조회 조건에 따라 시트에 보여야 하는 컬럼이 다릅니다. 컬럼을 동적으로 표시하려면 어떻게 구현해야 하나요?
- SearchEnd 이벤트에서 ColHidden 로직을 썼더니 보여야 할 컬럼이 보이지 않습니다.

**답변**

조회 조건별 컬럼 구성은 두 가지 방법으로 처리합니다.

- 조회 데이터가 달라지면 `Reset()` 호출 후 컬럼 정보를 조작해 시트 설정을 다르게 하고(`IBS_InitSheet` 재생성) 조회합니다.
- 보일 수 있는 모든 컬럼으로 시트를 생성한 뒤 조회 조건별로 `ColHidden` 또는 `SetColHidden`을 이용해 컬럼을 숨깁니다.
숨김 방식에서 이전 조회로 컬럼을 숨겨 둔 상태에서 조건을 바꿔 다시 조회하는데 숨기는 로직만 있으면 보여야 할 컬럼이 계속 숨겨져 있습니다. 숨기기 전에 전체 컬럼을 다시 보이게 한 뒤 필요한 컬럼만 숨깁니다. 컬럼을 보이고 숨기기 전에 `RenderSheet`를 호출하면 속도를 더 빠르게 할 수 있습니다.

**키워드**: ColHidden, SetColHidden, Reset, IBS_InitSheet, RenderSheet, 동적 컬럼, SearchEnd

---

### [API-0173] 반응형 화면에서 브라우저 너비에 따라 시트에 보이는 컬럼 수를 다르게 하는 방법

**질문**

- 반응형 화면에서 브라우저 너비에 따라 시트에 보이는 컬럼 수를 다르게 하고 싶습니다. 좁을 때는 2개, 조금 넓으면 3개만 보이게 하려면 어떻게 하나요?

**답변**

window의 `resize` 이벤트(200ms 지연 처리)에서 `window.innerWidth`를 확인해 너비 구간별로 `SetColHidden([{Col:1,Hidden:1},{Col:2,Hidden:1}, ...])`처럼 컬럼 숨김 여부를 배열로 한 번에 지정합니다. 초기 로딩 시에도 한 번 호출합니다. `AutoFitColWidth`에 `'search|resize|init|colhidden'`을 지정하면 시트의 가로 스크롤이 보이지 않도록 컬럼 너비가 맞춰집니다.

**키워드**: SetColHidden, AutoFitColWidth, 반응형, window.innerWidth, resize 이벤트, 컬럼 수 조정

---

### [API-0174] SetColHidden을 호출했는데 컬럼이 숨겨지지 않거나 동작하지 않는 것처럼 보이는 원인

**질문**

- SetColHidden을 호출했는데 컬럼이 숨겨지지 않고 동작하지 않는 것처럼 보입니다. 어떤 점을 확인해야 하나요?
- SetColHidden에 여러 컬럼을 배열로 지정해 숨기려는데 숨겨지지 않습니다.
- SetColHidden을 여러 번 호출하는데 첫 번째 호출만 적용되고 두 번째부터는 처리되지 않습니다.
- SetColHidden() 으로 컬럼을 처리하려고 하는데 잘 되지 않는 것처럼 보입니다.

**답변**

다음 원인을 순서대로 확인합니다.

- 호출 시점: 시트가 그려지기 전에 호출하면 동작하지 않는 것처럼 보입니다. 함수 자체는 정상이므로 시트 생성 이후로 호출 위치를 옮깁니다.
- 컬럼 인덱스: 적용하려는 컬럼 인덱스를 실제보다 1 크게 지정한 것은 아닌지 확인합니다.
- 배열 지정: 배열로 지정한 컬럼 중 시트에 존재하지 않는 컬럼이 포함되어 있으면 숨김이 정상 동작하지 않을 수 있으므로 해당 컬럼 항목을 제거(주석 처리)한 뒤 호출합니다.
- 너비 조정: `FitColWidth()`가 호출되지 않으면 컬럼이 가로 스크롤 뒤쪽에 보여 동작하지 않는 것처럼 보일 수 있으므로 `AutoFitColWidth`를 설정해 너비가 자동 조정되게 합니다.
- 연속 호출: 두 번째 호출부터 적용되지 않으면 임시방편으로 두 번째 `ColHidden` 호출부터 `setTimeout`으로 호출하는 방법이 있습니다. `RenderSheet()`를 사용해도 행이 다시 보일 때 행 너비가 줄어드는 현상이 있으며 버그로 보입니다.

**키워드**: SetColHidden, FitColWidth, AutoFitColWidth, setTimeout, 컬럼 인덱스, 호출 시점

---

### [API-0175] 숨김 컬럼 관련 버전별 이슈(ColHidden childNode 오류, 첫 컬럼 숨김 시 콘솔 로그 무한 출력, 숨김 컬럼 FindText -1)

**질문**

- ColHidden을 호출하면 childNode를 찾을 수 없다는 오류가 발생합니다.
- 0번째 컬럼이 체크박스이고 고정 컬럼을 1번으로 설정한 상태에서 첫 번째 컬럼을 setColhidden()으로 숨기면 콘솔에 로그가 무한히 찍힙니다.
- 컬럼을 Hidden으로 처리하면 FindText가 해당 컬럼에서 행을 찾지 못하고 -1을 반환합니다.

**답변**

숨김 컬럼과 관련해 버전별로 확인된 이슈입니다.

- `ColHidden` 호출 시 childNode를 찾을 수 없다는 오류는 사용 중인 버전의 버그로 판단되며 버전을 업그레이드해야 합니다.
- 0번째 컬럼이 체크박스이고 고정 컬럼을 1번으로 설정한 상태에서 첫 번째 컬럼을 숨길 때 콘솔에 로그가 무한히 찍히는 문제는 7.0.13.115-20180423-1729-DEV-M 버전에서 나타나며, 115 또는 116 버전에서는 정상 동작합니다.
- 컬럼을 Hidden으로 처리하면 `FindText`가 해당 컬럼에서 행을 찾지 못하고 -1을 반환하는 증상은 7.0.13.149-20190902-17 버전 배포로 처리되었습니다.

**적용 버전**: 7.0.13.115-20180423-1729-DEV-M에서 발생, 7.0.13.149-20190902-17에서 처리

**키워드**: ColHidden, childNode, FindText, setColhidden, 콘솔 로그 무한 출력, 7.0.13.149

---

### [API-0176] 엑셀 다운로드를 직접 구현할 때 헤더 행 텍스트와 컬럼 숨김 여부를 가져오는 방법

**질문**

- 엑셀 다운로드를 직접 구현하려는데, 시트 헤더 행의 텍스트와 hidden 여부 정보를 한 번에 가져오는 함수가 있나요?

**답변**

헤더 행 정보 전체를 한 번에 가져오는 함수는 없습니다. 헤더 행 수만큼, 컬럼 수만큼 for loop로 돌면서 `getCellText`와 `GetColHidden()`으로 텍스트와 숨김 여부를 가져올 수 있습니다.

**키워드**: getCellText, GetColHidden, 헤더 행 텍스트, hidden 여부, 엑셀 다운로드, for loop

---

### [API-0177] RowHidden으로 숨긴 행이 행 수나 데이터 추출(리포트 출력)에 포함됩니다

**질문**

- SetRowHidden으로 행을 숨긴 뒤 RowCount나 LastRow로 행 수를 구하면 숨긴 행까지 포함됩니다. 화면에 보이는 행 수만 세는 방법이 있나요?
- 인쇄 대화상자에서는 체크한 데이터만 보이는데 인쇄 버튼을 누르면 리포트 화면에는 전체 데이터가 출력됩니다.

**답변**

- 숨긴 행 제외 행 수: 숨겨진 행을 제외한 행 수를 구해 주는 함수는 없어 별도 로직이 필요합니다. (1) 전체 데이터를 반복문으로 돌며 `GetRowHidden`으로 숨겨진 행을 제외하고 개수를 셉니다. (2) Type이 `DummyCheck`인 컬럼을 만들어 `SetRowHidden` 시 체크해 두고 전체 행 수에서 체크된 행 수를 뺍니다. `DummyCheck`는 이벤트나 상태값을 변경시키지 않습니다. 예제: https://jsfiddle.net/37fawybt/1
- 리포트 출력: 시트 데이터를 리포팅 도구로 내보내는 함수는 `RowHidden()`으로 감춘 행까지 추출합니다. 출력에서 제외하려면 `RowHidden()` 대신 `RowDelete`로 필요 없는 행을 삭제합니다.

**키워드**: RowHidden, SetRowHidden, GetRowHidden, DummyCheck, RowDelete, RowCount

---

### [API-0178] 다중라인 레코드에서 RowHidden 후 마지막 행이 펼쳐지지 않는 증상

**질문**

- 다중라인 레코드에서 첫 단위데이터행의 체크박스로 두 번째 단위데이터행을 RowHidden으로 감추는데, 헤더로 전체 행을 감춘 뒤 마지막 행을 펼치려 하면 펼쳐지지 않습니다.

**답변**

다중라인 레코드에서 `RowHidden`으로 단위데이터행을 감춘 뒤 전체 행을 감췄다가 마지막 행을 펼치려 할 때 펼쳐지지 않는 문제는 2015년 3월 버전에서 패치되었습니다. 해당 시점 이후 버전으로 교체합니다.

**적용 버전**: 2015년 3월 버전에서 패치

**키워드**: RowHidden, 다중라인 레코드, 단위데이터행, 행 펼침

---

### [API-0179] 전체 행의 상태값을 한꺼번에 바꾸려면 루프가 필요한가요?

**질문**

- 시트의 전체 행에 대해 상태 값을 바꾸려고 하는데, 반드시 루프를 돌려서 처리해야 하나요?

**답변**

전체 행의 상태 값을 바꾸려면 루프를 돌려서 처리해야 합니다.

**키워드**: 행 상태값, 루프, 전체 행, 상태 변경

---

### [API-0180] 변경된 데이터가 있을 때만 저장하도록 변경 여부를 판단하려면?

**질문**

- 시트에 신규 입력 등 변경된 데이터가 있을 때만 저장을 호출하고 싶습니다. 변경 여부를 판단할 수 있는 함수가 있나요?

**답변**

`IsDateModified()` 함수는 조회 이외의 데이터가 들어 있는 경우 1을 반환하므로, 이 값으로 저장 호출 여부를 분기 처리합니다.

**키워드**: IsDateModified, 변경 여부, 저장 분기, 변경된 데이터

---

### [API-0181] 초기 조회 데이터 복원, 일치 행 전체 찾기, 신규 행 번호 구하기 함수가 있나요?

**질문**

- 시트에 처음 조회된 초기 데이터를 다시 가져올 수 있는 함수가 있나요?
- FindText는 처음 찾은 행만 반환하는데, 일치하는 모든 행의 번호를 얻는 함수가 있나요?
- 새로 추가한 신규 행의 row 번호를 바로 구해 주는 함수가 있나요?
- 특정 행에서 동일한 값의 개수를 구하는 카운트 함수가 존재하나요?

**답변**

아래 기능은 모두 별도 함수가 제공되지 않아 직접 구현해야 합니다.

- 초기 조회 데이터: 가져오는 함수가 없으므로 조회가 끝나는 시점에 데이터를 별도로 담아 두고 사용합니다.
- 일치하는 모든 행 찾기: 조회된 데이터를 뽑아 javascript의 filter 함수로 따로 추출해야 할 것으로 보입니다.
- 신규 행 row: 전체 행을 돌면서 `getCellValue`로 확인합니다. 저장 함수를 호출하는 경우에는 검증 이벤트에서 행 단위로 KeyField 외의 항목도 지정해 체크할 수 있습니다.
- 행 내 동일 값 개수: 해당 행을 반복(loop)하면서 직접 카운트를 구합니다.

**키워드**: FindText, filter, getCellValue, KeyField, 초기 데이터, 신규 행

---

### [API-0182] Pivot 구성 후 컬럼 위치를 이동하려면 어떤 객체의 함수를 쓰나요?

**질문**

- Pivot으로 시트를 구성한 이후에 마지막 컬럼을 맨 앞으로 이동시킬 수 있나요?
- 컬럼 위치를 옮기려면 어떤 객체의 어떤 함수를 사용해야 하나요?

**답변**

Pivot 후에는 `mySheet_Pivot` 객체에서 `MoveColumnPos` 함수를 이용해 컬럼 위치를 옮길 수 있습니다.

**키워드**: MoveColumnPos, Pivot, mySheet_Pivot, 컬럼 이동

---

## 컬럼 너비·고정·개수

### [API-0183] 틀 고정(FrozenCol) 설정 함수와 SetFrozenCol·GetFrozenCol이 동작하지 않거나 함수가 아니라는 오류

**질문**

- 그리드에서 틀 고정을 설정하려면 어떤 함수를 사용해야 하나요?
- onSearchEnd에서 GetFrozenCol()을 호출하면 콘솔에 is not Function 메시지가 뜹니다.
- SetFrozenCol(3)으로 틀고정을 적용했는데 아무 반응이 없습니다.

**답변**

틀 고정은 `FrozenCol` 함수를 사용합니다. `GetFrozenCol`, `SetFrozenCol`이 동작하지 않거나 함수가 아니라는 오류가 나면 사용 중인 ibsheet 버전이 낮은 경우입니다.

- `GetFrozenCol()` 메소드는 7.0.0.0-20140822-15-M 버전에 추가되었습니다. 그보다 이전 버전(예: 7.0.0.0-20140811)에서는 `is not Function` 오류가 납니다.
- `SetFrozenCol` 함수는 2014-09-11 날짜의 버전에서는 지원하지 않아 호출해도 반응이 없고 콘솔에 개체가 'SetFrozenCol' 속성이나 메서드를 지원하지 않는다는 오류가 표시됩니다. 지원되는 7.0.3.1-20141002-10 버전 제품으로 교체합니다.

**적용 버전**: GetFrozenCol: 7.0.0.0-20140822-15-M 이상, SetFrozenCol: 7.0.3.1-20141002-10 이상(2014-09-11 버전 미지원)

**키워드**: FrozenCol, SetFrozenCol, GetFrozenCol, 틀고정, is not Function, 7.0.3.1-20141002-10

---

### [API-0184] HBNPFrozenCol이 설정된 시트에서 RenderSheet를 쓰면 헤더 일부가 지워지는 현상

**질문**

- HBNPFrozenCol이 설정된 시트에서 RenderSheet를 사용하면 헤더 일부가 지워집니다. 해결 방법이 있나요?

**답변**

제품 버그로 확인되었지만 제품에서 수정할 수 없어 별도 배포는 없습니다. Windows 7 64bit, IE9 환경에서 보고된 증상입니다.

**키워드**: HBNPFrozenCol, RenderSheet, 헤더 지워짐, IE9

---

### [API-0185] SetFrozenRows로 행 고정이 적용되지 않거나 취소·제약 사항은 무엇인가요?

**질문**

- SetFrozenRows(2)로 상단 2행을 고정하려는데 줄 고정이 되지 않습니다.
- SetFrozenRows 함수를 컬럼 초기화 시점에 호출했는데 행 고정이 적용되지 않습니다.
- 설정해 둔 행 고정을 취소하려면 어떻게 해야 하나요?
- 서버 페이징 모드(smServerPaging, smServerPaging2)에서 행 고정(FrozenRows) 기능을 사용할 수 있나요?

**답변**

`SetFrozenRows`는 행이 생성된 이후에 호출해야 하며 조회 전이나 컬럼 초기화 시점의 호출은 적용되지 않습니다. 조회 후 호출되는 `OnSearchEnd` 이벤트에서 설정합니다.

- 행 고정 취소: `SetFrozenRows(0)`으로 설정합니다.
- 지원되지 않는 경우: Merge, DataInsert 사용 시 행이 1개 이상인 경우와 Tree, 소계가 있는 화면에서는 지원하지 않습니다. `SearchMode`가 `smServerPaging`, `smServerPaging2`인 경우에도 `FrozenRows` 기능은 지원되지 않습니다.

**키워드**: SetFrozenRows, FrozenRows, 행 고정, OnSearchEnd, smServerPaging, 행 고정 취소

---

### [API-0186] 왼쪽 고정 컬럼을 쓸 때 getLeftCol 반환값이 고정 컬럼 수와 다른 이유

**질문**

- 왼쪽 고정 컬럼을 활성화하고 getLeftCol 함수를 호출했더니 고정 컬럼이 1개일 때 3, 3개일 때 4가 나옵니다. 왜 고정 컬럼 수와 값이 다른가요?

**답변**

`getLeftCol()`은 히든 컬럼을 포함해서 고정 컬럼 이후의 좌측 컬럼 인덱스를 반환하므로, 히든 컬럼이 있으면 고정 컬럼 수와 값이 달라질 수 있습니다. 좌측 고정 컬럼 수를 구할 때는 `FrozenCol()`을 사용합니다.

**키워드**: getLeftCol, FrozenCol, 고정 컬럼, 히든 컬럼

---

### [API-0187] 시트의 전체 컬럼 개수는 어떻게 구하나요? (LastCol)

**질문**

- 시트에 정의된 전체 컬럼 개수를 알 수 있는 함수가 있나요? 컬럼 index가 0부터 시작하는지도 알고 싶습니다.
- 마지막 컬럼의 index를 구하는 LastCol을 쓰면 컬럼 개수를 알 수 있는지 궁금합니다.
- 시트에서 열의 길이를 가져오는 방법이 있나요?

**답변**

컬럼 전체 개수를 구하는 전용 함수는 없습니다. 마지막 컬럼의 index를 반환하는 `LastCol()`을 사용하며, 컬럼 index는 0부터 시작하므로 `LastCol() + 1`이 전체 컬럼 개수가 됩니다. 예를 들어 컬럼이 20개이면 `LastCol()`은 19를 반환합니다.

**키워드**: LastCol, 컬럼 개수, 컬럼 index, 열의 길이

---

### [API-0188] 시트가 그려진 후 코드로 특정 컬럼의 너비를 조절하려면 어떤 함수를 쓰나요?

**질문**

- 시트가 그려진 후에 코드로 특정 컬럼의 크기(너비)를 조절할 수 있는 함수가 있나요?

**답변**

시트가 그려진 후 컬럼 너비를 조절하려면 `SetColWidth` 함수를 사용합니다.

**키워드**: SetColWidth, 컬럼 너비, 컬럼 크기

---

### [API-0189] ColInsert 후 추가한 컬럼이 안 보이거나 피벗 시트 크기가 맞지 않을 때 FitColWidth를 어디서 호출하나요?

**질문**

- ColInsert로 컬럼을 반복해서 추가했는데 추가된 컬럼이 화면에 보이지 않습니다. FitColWidth를 함께 쓰고 있습니다.
- showPivotTable로 피벗 시트를 처음 표시하면 크기가 원래 그리드와 다르게 나옵니다. 크기를 맞추려면 어떻게 하나요?

**답변**

- `FitColWidth()`가 컬럼 추가보다 먼저 동작하면 추가된 컬럼이 화면 너비 밖에 만들어져 보이지 않습니다. `ColInsert`를 반복 호출하는 `for`문이 끝난 다음에 `FitColWidth()`를 호출하도록 위치를 조정합니다.
- `showPivotTable` 호출 후에는 완료 callback이 없으므로, `setTimeout`으로 지연시킨 뒤 `FitColWidth()`를 호출하는 방법밖에 없을 것으로 보입니다. 예: `setTimeout(function(){ 피벗시트.FitColWidth(); }, 300);`

**키워드**: FitColWidth, ColInsert, showPivotTable, setTimeout, 컬럼 너비 맞춤

---

### [API-0190] 숨긴 컬럼 중 일부만(또는 사용자가 숨긴 컬럼만) 다시 보이게 하는 기능이 있나요?

**질문**

- 시트를 처음 그릴 때 숨긴 컬럼은 제외하고, 이후에 사용자가 숨김 처리한 컬럼만 한꺼번에 숨김 취소하는 기능이 있나요?
- 컬럼 감추기로 컬럼을 감춘 뒤, 그중 일부만 다시 보여주는 별도 기능이 있나요?

**답변**

시트 자체에서 제공하는 기능은 없습니다. 일부만 다시 보여주는 별도 기능이 없으므로 다음 방법으로 처리합니다.

- 감춘 컬럼 보여주기를 한 뒤에 필요 없는 컬럼을 다시 감춥니다.
- 또는 별도로 함수를 만들고, 컬럼을 숨김 처리할 때 해당 컬럼의 인덱스를 따로 보관해 두었다가 해당 컬럼만 보이게 합니다.

**키워드**: 컬럼 숨김, 숨김 해제, 컬럼 감추기, 컬럼 보이기

---

## 컬럼 동적 추가·삭제

### [API-0191] 시트를 그린 뒤나 조회 후에 컬럼을 동적으로 추가·삭제하려면 어떻게 하나요? (ColInsert, ColDelete)

**질문**

- 시트에서 컬럼을 동적으로 추가하거나 삭제하려면 어떤 함수를 사용해야 하나요?
- 데이터를 조회한 뒤, 또는 특정 셀 값이 변경되는 이벤트 시점에 시트에 컬럼을 추가할 수 있나요?
- 레이어 팝업에서 체크박스로 선택한 항목만 시트의 컬럼으로 나타내려면 어떻게 구현하나요?

**답변**

`ColInsert()`와 `ColDelete()` 함수로 컬럼을 동적으로 추가·삭제할 수 있습니다. `ColInsert`는 특정 위치에 컬럼만 단순히 추가할 때 사용하며, 시트가 로드된 뒤나 조회 후, 특정 이벤트 시점에 조건에 따라 컬럼을 추가해야 할 때도 같은 메소드를 사용합니다. 선택한 항목을 컬럼으로 표시하는 경우에도 `ColInsert`로 추가하는 방식으로 구현할 수 있습니다.

**키워드**: ColInsert, ColDelete, 컬럼 동적 추가, 컬럼 삭제, 조회 후 컬럼 추가

---

### [API-0192] 컬럼 구성이 조회마다 바뀔 때 ColInsert/ColDelete와 Reset 시트 재생성 중 무엇을 쓰나요?

**질문**

- 시트 생성 후 또는 데이터 조회 이후에 컬럼을 동적으로 추가·삭제할 수 있나요? 어떤 방법이 있나요?
- 조건에 따라 보여줄 컬럼이 달라지는 시트를 만들려고 합니다. 컬럼을 동적으로 표시하는 방법에는 어떤 것이 있나요?
- Reset() 후 시트를 다시 만들고 ColInsert로 컬럼을 추가했는데 컬럼이 추가되지 않습니다.

**답변**

동적으로 컬럼을 바꾸는 방법은 다음과 같습니다.

- `ColInsert`와 `ColDelete`로 개별 컬럼을 추가·삭제합니다. `ColInsert()`는 컬럼을 한 개 추가하는 용도로 쓰기를 권하며, Seq, Status, DelCheck 컬럼은 `ColInsert`로 추가할 수 없으므로 처음부터 고정으로 만들어 두어야 합니다. 컬럼명을 확인하는 함수는 `ColSaveName`입니다.
- `Reset()`으로 처음 생성한 시트를 초기화한 뒤 `InitHeaders`, `InitColumns` 등으로 헤더와 컬럼을 다시 만듭니다. 검색 조건에 따라 헤더명과 컬럼 타입까지 전부 바뀌거나 여러 컬럼을 한 번에 동적으로 만들어야 하면 이 방식을 권장하며, 조회 시 조회 데이터와 함께 시트 컬럼 정보를 가져와 시트를 재생성한 뒤 조회 데이터를 로딩합니다.
- 표시할 수 있는 전체 컬럼으로 시트를 생성한 뒤 필요 없는 컬럼을 히든으로 숨기는 방법도 있습니다. 숨겨지는 컬럼이 일부이고 내용이 동일하다면 같은 시트에서 `SetColProperty`로 `ColHidden`을 지정할 수 있습니다.

`Reset()` 후 시트를 다시 만들고 `ColInsert`로 컬럼을 추가했는데 반영되지 않는다면, `Reset()` 이후 시트를 다시 생성하는 함수를 호출하고 곧바로 `ColInsert()`를 실행하는 경우 시트 객체가 생성되기 전에 `ColInsert()`가 동작하는 비동기 시점 문제일 수 있습니다. Ajax 호출 전에 시트를 미리 생성해 두고 `Reset()` 없이 시트를 유지한 상태에서 for문으로 `ColInsert()`만 실행해 컬럼이 추가되는지 확인하면 원인을 알 수 있습니다.

**키워드**: Reset, ColInsert, ColDelete, InitHeaders, InitColumns, SetColProperty, ColHidden, ColSaveName

---

### [API-0193] 시트에 더미 컬럼을 만들려면 어떻게 하나요? (ColInsert)

**질문**

- 시트에 더미 컬럼을 만들어 사용하고 싶은데 어떻게 처리하나요? 시트를 생성하는 구문에 넣는 방법이나 이미 생성된 시트에 나중에 컬럼을 추가하는 방법이 궁금합니다.

**답변**

컬럼 개수 * 컬럼 크기의 합이 전체 시트 크기보다 작은 경우, 더미 컬럼 정보를 시트 생성 구문에 넣거나 생성된 시트 마지막에 `ColInsert`로 컬럼을 추가할 수 있습니다. 예: `mySheet.ColInsert({Header:{Text:' '},Col:[{Type:'Text',Width:100,Edit:0}]})`. `Edit:0`을 주면 사용자가 수정하지 못하며 편집 불가능 색상이 적용됩니다.

**키워드**: ColInsert, 더미 컬럼, Edit:0, Width

---

### [API-0194] ColInsert 함수가 없다는 오류가 납니다 (낮은 제품 버전)

**질문**

- 7.0.0.0-20131115-11-M 버전에서 ColInsert 함수가 없다는 오류가 납니다. 왜 없고, 조회 후 시트 구성을 바꾸려면 어떤 방법이 있나요?

**답변**

`ColInsert`는 2014-08-29에 추가된 기능이어서 그보다 낮은 버전에서는 함수가 없다고 나옵니다. 대안으로 `reset` 함수로 초기 정보를 지운 뒤 시트를 다시 그리는 방법이 있습니다.

**적용 버전**: 2014-08-29 이후 추가

**키워드**: ColInsert, reset, 7.0.0.0-20131115-11-M, 함수가 없음

---

### [API-0195] ColDelete로 마지막 컬럼을 삭제할 때 발생하는 오류의 수정 버전

**질문**

- ColDelete 메소드로 마지막 컬럼을 삭제하는 경우 오류가 발생합니다. 어느 버전에서 수정되었나요?

**답변**

`ColDelete`로 마지막 컬럼을 삭제할 때 발생하는 오류는 패치된 개발 버전 7.0.13.67-20161027-1042-DEV로 처리되었으며, 정식 릴리즈 패치 버전은 이후 릴리즈에 포함됩니다. 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.67-20161027-1042-DEV에서 수정

**키워드**: ColDelete, 마지막 컬럼, 7.0.13.67-20161027-1042-DEV

---

### [API-0196] ColInsert의 info에 Format 등 속성을 지정하는 방법과 MinWidth 지정 시 Type error

**질문**

- colInsert()로 컬럼을 추가할 때 추가되는 컬럼의 Format 같은 속성은 어떻게 지정하나요? info 인자에 어떤 값을 넣어야 하나요?
- ColInsert의 info에 MinWidth 속성을 주면 콘솔에 Type error가 발생합니다. 어떻게 해야 하나요?

**답변**

`colInsert()`에 전달하는 info의 `Col` 속성에 넣어 줍니다. `Col` 속성은 InitColumns 내용을 참조하도록 되어 있어, InitColumns에서 정의된 속성을 지정할 수 있을 것으로 보입니다.
info에 `MinWidth`만 지정했을 때 Type error가 난다면 `Width`와 `MinWidth`를 함께 지정해 보십시오. 이렇게 하면 정상 동작했다는 사례가 있으나 같은 소스로 재현했을 때는 오류가 발생하지 않았으므로 조건에 따라 달라질 수 있습니다.

**키워드**: ColInsert, colInsert, Col, Format, MinWidth, Width, Type error

---

### [API-0197] 피벗 시트에서 ColInsert로 컬럼을 추가하면 마지막 행과 추가 컬럼 값이 0으로 바뀝니다

**질문**

- 피벗 시트에서 컬럼을 3개 추가했더니 제일 마지막 행의 값이 0으로 바뀌고 추가한 컬럼의 값도 0입니다. 이 값을 공백 데이터로 바꿀 수 있나요?

**답변**

피벗 시트에서는 `ColInsert`가 이상 동작합니다. 그래서 피벗 시트에서 컬럼을 추가하는 이 기능은 사용하기 어려울 것으로 보입니다.

**키워드**: ColInsert, 피벗 시트, 컬럼 추가 이상 동작

---

## SaveName·컬럼 구성 저장

### [API-0198] 컬럼 정보(숨김·순서 등)를 localStorage에 저장하고, 컬럼이 추가되었을 때 저장된 설정을 유지하려면?

**질문**

- IBSheet7에서 헤더 액션 메뉴를 쓰지 않고 API로 현재 컬럼 정보(숨김 등)를 localStorage에 저장할 수 있나요?
- 컬럼 정보를 localStorage에 저장해 쓰다가 화면에 컬럼이 추가되면 저장해 둔 설정이 무시되고 지워집니다. 기존 설정을 유지하고 새 컬럼을 맨 뒤에 둘 수 있나요?

**답변**

시트가 생성될 때 전역 함수 `SaveCache(id, val)`이 만들어지며, 이를 이용하면 localStorage에 저장할 수 있습니다. 예: `var key = location.href + '^' + G.id; var colinfo = mySheet.GetCurrentColInfo(); SaveCache(key, colinfo);`. 사용자가 숨길 컬럼을 지정하는 별도 UI는 제품에서 바로 제공하는 기능이 아니라서 직접 구현해야 합니다.
컬럼이 추가되거나 삭제되는 경우의 수가 다양해 모든 경우를 자동으로 처리하는 기능은 제공하기 어렵습니다. 추가되는 경우만 대응하는 별도 로직은 만들 수 있습니다. `GetCurrentColInfo()`로 얻은 컬럼 정보에 컬럼별 `SaveName`을 함께 저장해 두었다가, 복원할 때 저장된 SaveName에 없는 컬럼을 찾아 맨 뒤에 배치하는 방식입니다. 컬럼이 2개 이상 추가되는 경우까지는 정상 동작하는 것으로 보이며, 컬럼이 줄어드는 경우는 처리되지 않습니다.

**키워드**: SaveCache, GetCurrentColInfo, localStorage, SaveName, 컬럼 정보 저장

---

### [API-0199] 도메인을 변경하면 localStorage에 저장된 시트 구성 정보를 새 도메인으로 가져올 수 있나요?

**질문**

- 도메인을 변경하면서 이전 도메인의 localStorage에 저장된 시트 구성 정보를 새 도메인으로 가져올 수 있나요?
- 도메인이 바뀔 때 이전 도메인에 저장된 localStorage 값을 새 도메인에 넣어 주는 우회 방법이 있나요?

**답변**

브라우저의 localStorage는 SOP(Same-Origin Policy) 정책상 다른 도메인과 정보를 공유하지 않아, 도메인이 바뀌면 일반적인 방법으로는 이전 도메인의 값을 확인하거나 공유할 수 없습니다. localStorage는 브라우저 기능이라 제품 내에서 접근하거나 처리할 수 없으며, 제품은 `GetCurrentColinfo()`로 시트 구성 정보를 리턴하는 데까지만 지원하고 localStorage에 넣는 부분은 브라우저 스크립트로 처리됩니다(`ibsheetinfo.js`의 `ibsheet_SaveColInfo()` 참고).
우회 방법은 두 가지입니다.

- 도메인 변경 전에 사용자별 localStorage 정보를 DB에 저장해 두었다가 새 도메인 접속 시 다시 넣어 주는 방법입니다. 프레임워크에서 구현해야 하며 사실상 사용자별 컬럼 정보를 DB로 관리하는 방식에 가깝습니다. localStorage는 영구적인 값이 아니라 다른 브라우저 접속, 브라우저 초기화, 도메인 변경 시 사라질 수 있어 DB 관리가 유용합니다.
- iframe을 이용해 도메인 간 `postMessage()`와 `receiveMessage()`로 localStorage 값을 주고받는 방법입니다. 보낼 수 있는 글자수가 약 2000자로 제한되어 저장된 정보가 많으면 전체 전송이 어렵습니다.

**키워드**: localStorage, SOP, GetCurrentColinfo, ibsheet_SaveColInfo, postMessage, receiveMessage, 도메인 변경

---

### [API-0200] SetCurrentColInfo로 컬럼 정보를 적용했는데 CellSaveName이 변경 전 SaveName을 반환합니다

**질문**

- SetCurrentColInfo로 컬럼 정보를 적용한 뒤 OnAfterEdit에서 CellSaveName(row, col)을 호출하면 변경된 SaveName이 아니라 변경 전 SaveName이 나옵니다. 원인은?

**답변**

`LoadSearchData`, `SetCurrentColInfo`, `DoSearch` 순서로 호출하면 `SetCurrentColInfo` 이전에 `LoadSearchData`가 먼저 호출되어 이런 문제가 발생합니다. `SetCurrentColInfo` 전에 호출한 `LoadSearchData` 코드를 제거하면 정상 동작합니다.

**키워드**: SetCurrentColInfo, CellSaveName, LoadSearchData, DoSearch, OnAfterEdit

---

### [API-0201] SaveName으로 셀·행 값에 접근할 때 주의할 점은? (CalcLogic 컬럼, 숫자 SaveName)

**질문**

- CalcLogic 로직으로만 쓰는 컬럼도 OnDblClick 같은 이벤트에서 SaveName으로 셀 값을 읽을 수 있나요? 조건이 있나요?
- SaveName을 1, 2, 3처럼 숫자로 설정한 시트에서 GetRowJson으로 행 데이터를 얻은 뒤, 그중 2번 컬럼의 값만 뽑으려면 어떻게 접근하나요?

**답변**

- `CalcLogic` 계산용으로만 쓰는 컬럼이라도 SaveName을 반드시 지정해야 해당 SaveName으로 셀 값에 접근할 수 있습니다.
- `GetRowJson(row)`가 반환한 객체에서 SaveName을 문자열 키로 지정해 읽습니다. 예: `var a = mySheet1.GetRowJson(30); alert(a['2']);`

**키워드**: SaveName, CalcLogic, GetRowJson, OnDblClick, 숫자 SaveName

---

### [API-0202] 컬럼 index와 SaveName을 서로 변환하거나 전체 SaveName을 구하려면? (ColSaveName, SaveNameCol)

**질문**

- 컬럼 index 값을 넣으면 해당 컬럼의 SaveName(컬럼명)을 리턴해 주는 함수가 있나요?
- SaveName을 넣어 해당 컬럼의 index를 구하거나, 그 SaveName의 컬럼이 있는지 확인하려면 어떤 함수를 사용하나요?
- 헤더에 표시된 텍스트로 해당 컬럼의 cell index 값을 가져오는 함수가 있나요?
- ColInsert나 ColDelete로 컬럼을 바꾼 뒤 변경된 헤더 텍스트를 컬럼 순서대로 가져오려면 어떻게 하나요?

**답변**

- 컬럼 index → SaveName: `ColSaveName` 함수를 사용합니다. 동적으로 만든 컬럼도 `LastCol`까지 for 루프를 돌며 이 함수로 각 컬럼의 SaveName을 가져옵니다.
- SaveName → 컬럼 index: `SaveNameCol(saveName)`을 사용합니다. 예: `mySheet.SaveNameCol('sDeptName')`. 해당 SaveName의 컬럼이 없으면 -1을 반환하므로 컬럼 존재 확인에도 쓸 수 있습니다.
- 헤더 값으로 Cell의 인덱스를 가져오는 함수는 제공하지 않습니다(헤더 타이틀은 중복 사용이 빈번하기 때문). 대신 위 두 함수를 사용합니다.
- 컬럼 전체의 SaveName은 `ibsheetinfo.js`의 `IBS_ConcatSaveName` 함수를 사용합니다.
- `ColInsert`, `ColDelete`로 변경된 헤더 텍스트는 `GetRowData`로 헤더 행(헤더 한 줄이면 0번 행)의 데이터를 가져와 확인합니다. 컬럼 순서대로 필요하면 반복문에서 `ColSaveName(i)`로 SaveName을 구해 `rowData[ColSaveName(i)]` 값을 읽습니다.

**적용 버전**: 7.0.0.0 이상

**키워드**: ColSaveName, SaveNameCol, IBS_ConcatSaveName, GetRowData, LastCol, 컬럼 index, SaveName

---

### [API-0203] ColSaveName을 호출하면 SaveName 대신 -1이 반환됩니다

**질문**

- ColSaveName을 호출했는데 SaveName 대신 -1이 반환됩니다. 어떤 점이 문제일 수 있나요?
- OnValidation이나 OnKeyUp 이벤트 안에서 ColSaveName(Row, Col)을 호출하면 -1이 나옵니다.
- ColSaveName에 row와 col을 넣으면 -1이 반환되고 col만 넣으면 정상 반환됩니다. 멀티라인 시트에서는 어떻게 사용하나요?

**답변**

`ColSaveName(DataRow, Col)`의 첫 번째 인자는 이벤트에서 받은 Row(행 번호)가 아니라 `DataRow`, 즉 단위 데이터행의 번호입니다. DataRow 자리에 행 번호(Row)를 넣으면 -1이 반환됩니다. 대소문자와 인자 값도 함께 확인하세요.

- 단위 데이터행 구조가 아니면 DataRow 인자를 생략할 수 있습니다.
- 단위 데이터행 구조이면 반드시 단위행 번호를 넣어야 합니다. 예를 들어 2개의 단위행으로 한 레코드를 구성했다면 DataRow는 0, 1만 가지며 `ColSaveName(0,0)`, `ColSaveName(1,0)`으로 각 단위행의 첫 번째 컬럼명을 가져옵니다.

**키워드**: ColSaveName, DataRow, -1, OnValidation, OnKeyUp, 단위 데이터행

---

### [API-0204] 컬럼에 지정한 Type을 컬럼별로 알아내는 API가 있나요?

**질문**

- 컬럼 정의에 지정한 Type을 컬럼별로 알아낼 수 있는 API가 있나요? ColSaveName처럼 컬럼의 Type을 조회하고 싶습니다.

**답변**

컬럼의 Type을 돌려주는 전용 API는 없습니다. 대신 시트 객체의 `Cols`를 호출하면 컬럼들이 반환되므로, 이 컬럼 배열을 순회하면서 각 컬럼의 Type을 가져옵니다.

**키워드**: Cols, Type, ColSaveName, 컬럼 Type 조회

---

## 헤더 텍스트·컬럼 속성

### [API-0205] 셀·컬럼의 Type, SaveName, KeyField 같은 속성값을 읽으려면 어떤 함수를 쓰나요? (GetCellProperty)

**질문**

- 셀마다 셀의 타입을 알아내는 함수가 있나요? 클릭 이벤트 안에서 클릭된 셀의 타입을 확인하고 싶습니다.
- 컬럼의 Type이나 SaveName 같은 속성값을 코드에서 읽으려면 어떤 함수를 사용하나요? 예를 들어 Type이 Float인 컬럼을 찾고 싶습니다.
- 여러 시트에서 KeyField로 지정된 컬럼을 찾기 위해 컬럼별 KeyField 설정 여부를 가져오는 함수가 있나요?
- GetCellProperty로 셀의 SaveName 속성을 조회하는 코드를 실행하면 에러가 발생합니다.

**답변**

`GetCellProperty()`로 셀·컬럼 속성을 읽을 수 있습니다. 속성명 인자에 `Type`, `SaveName`, `KeyField` 등을 넣습니다.

- 예: `mySheet.GetCellProperty(1, 1, "Type")`은 데이터 타입을, `mySheet.GetCellProperty(1, 1, "SaveName")`은 SaveName을 반환합니다. 클릭 이벤트 안에서 클릭된 셀의 타입을 확인할 때도 이 함수를 사용합니다.
- `GetCellProperty(0, 1, 'KeyField')`처럼 호출하면 해당 컬럼의 KeyField 설정 여부를 가져올 수 있습니다. 컬럼 단위로 호출해야 하므로 for loop로 돌려서 처리합니다.
- 전체 컬럼의 속성 목록이 필요하면 `Cols` 프로퍼티도 함께 활용할 수 있습니다.
- `GetCellProperty`로 SaveName을 조회할 때 에러가 나는 증상은 IBSheet7 7.0.13.7-20150601-10 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.7-20150601-10에서 SaveName 조회 오류 수정

**키워드**: GetCellProperty, Type, SaveName, KeyField, Cols, 7.0.13.7-20150601-10, 셀 타입 확인

---

### [API-0206] 시트 생성·초기화 후 헤더 텍스트만 동적으로 바꾸려면 어떤 함수를 쓰나요? (SetCellValue, SetCellText)

**질문**

- 시트를 만든 뒤 조건이나 선택 값에 따라 헤더 텍스트만 바꾸고 싶은데 전용 API가 보이지 않고, InitHeaders로는 타이틀이 바뀌지 않습니다.
- 시트를 생성한 뒤에 버튼 클릭 같은 이벤트에서 특정 컬럼의 헤더 텍스트를 다른 값으로 바꾸려면 어떤 함수를 어떻게 사용하나요?
- 시트의 헤더 셀에 접근해서 헤더에 표시된 값을 변경하려면 어떤 함수를 사용하나요? 일반 셀과 같은 방식인가요?

**답변**

헤더 텍스트만 바꾸는 전용 API는 없고, 일반 셀처럼 `CellValue`나 `CellText`(`SetCellValue`, `SetCellText`)로 헤더 셀에 접근해 값을 바꿉니다. 초기화 이후에는 `InitHeaders`를 다시 써도 적용되지 않으므로 이 함수를 사용합니다.

- 헤더 행의 row index는 0부터 시작하고 col도 첫 번째 컬럼부터 0으로 시작합니다. 예: `mySheet.SetCellValue(0,3,'변경할 텍스트값');`는 헤더 행의 3번째 컬럼 텍스트를 바꿉니다.
- 컬럼 개수가 그대로이고 타이틀 문자열만 바뀌는 경우 `SetCellText()`나 `SetCellValue()`를 사용합니다. 헤더가 셀병합된 경우 변경하려는 셀병합 컬럼이 동일해야 합니다.
- 버튼 클릭, `OnChange`, 조회 조건 변경, `OnSearchEnd` 시점 등 어디서든 시트를 다시 초기화하지 않고 호출할 수 있습니다. 여러 헤더는 반복문으로 바꿉니다.
- 바꿀 헤더가 많으면 시트를 dispose하고 다시 그리는 방법도 있습니다.

**키워드**: SetCellValue, SetCellText, CellValue, CellText, InitHeaders, 헤더 텍스트 변경, 헤더 row 0

---

### [API-0207] 조회 조건에 따라 헤더 텍스트를 바꾸고 남는 컬럼은 숨기려면 어떻게 하나요?

**질문**

- 데이터를 조회한 후에 특정 헤더(컬럼 제목)들의 이름을 변경하려면 어느 이벤트에서 어떤 방식으로 처리하나요?
- 조회 조건에 따라 헤더에 표시할 항목이 1~15일 때도 있고 16~31일 때도 있습니다. 헤더를 조건에 맞게 바꾸려면 어떻게 하나요?

**답변**

기본 헤더 텍스트로 화면을 출력한 뒤 조회 완료 시점에 헤더 텍스트를 바꿀 수 있습니다.

- 조회 후: `OnSearchEnd` 이벤트에서 `SetCellValue`(Row 값을 0으로 지정)로 헤더 텍스트를 변경합니다.
- 조회 전: `SetCellText()`로 헤더 행의 글자를 변경하고, 사용하지 않는 남는 컬럼은 `ColHidden`으로 감춥니다.

**키워드**: OnSearchEnd, SetCellValue, SetCellText, ColHidden, IBS_OnSearchEnd, 헤더 동적 변경

---

### [API-0208] 헤더가 여러 줄인 시트에서 ColInsert로 컬럼을 추가할 때 각 헤더 줄 텍스트를 넣으려면?

**질문**

- 헤더가 3줄인 시트에서 ColInsert로 컬럼을 추가할 때, 추가한 컬럼의 각 헤더 줄 텍스트를 어떻게 넣어야 하나요? CellValue로 넣었더니 값이 들어가지 않습니다.

**답변**

`ColInsert` 호출 시 text에 `|`로 구분해 여러 개의 헤더 값을 한 번에 넣을 수 있습니다. 컬럼 추가 후 나머지 헤더 줄을 `CellValue`로 채워도 값이 들어가지 않으면 이 방식을 사용합니다.

**키워드**: ColInsert, CellValue, 다단 헤더, 헤더 줄, |

---

### [API-0209] 시트 헤더에 표시된 텍스트를 스크립트에서 가져오려면 어떻게 하나요?

**질문**

- 시트 헤더에 표시되는 텍스트(헤더 문구)를 스크립트에서 가져오고 싶습니다. 컬럼별 헤더 텍스트를 확인하려면 어떻게 하나요?
- 시트 헤더 행의 값을 가져올 수 있나요? 헤더 행은 몇 번부터 시작하나요?
- 숨긴 컬럼에 대해 getCellValue()를 호출하면 데이터 값 대신 헤더 텍스트가 반환됩니다.

**답변**

`GetCellValue()` 또는 `GetCellText()`로 헤더 행의 값을 가져옵니다. 헤더 행은 row 값이 0부터 시작하므로, 원하는 컬럼 헤더가 있는 row 번호를 지정해 그 셀의 텍스트를 가져옵니다.

- 시트 객체의 `HeaderText` 안에 배열로 들어 있는 값을 사용하거나, `시트id.Header.컬럼명`을 확인해도 해당 컬럼의 헤더 텍스트를 확인할 수 있습니다.
- 숨긴 컬럼에 `getCellValue(row, col)`을 호출했는데 데이터 값 대신 헤더 텍스트가 반환된다면 row에 헤더 행 번호를 넣은 경우로 보입니다. 가져오려는 셀의 행 번호와 컬럼 번호를 정확히 넣어야 합니다.

**키워드**: GetCellValue, GetCellText, HeaderText, Header, 헤더 텍스트 조회, 헤더 행 번호

---

### [API-0210] 헤더 값 변경 후 컬럼을 숨기면 Uncaught TypeError: B[A].search is not a function 오류가 발생합니다

**질문**

- 헤더 셀 텍스트를 SetCellValue로 변경한 뒤 컬럼을 숨기려 하면 Uncaught TypeError: B[A].search is not a function 오류가 발생합니다. 원인이 무엇인가요?

**답변**

`B[A]` 부분에는 문자열이 들어가야 하는데 값이 없어서 발생하는 것으로 추측되며, 제품 버전 문제일 가능성이 높아 보입니다. 단순히 헤더 `CellValue` 변경 후 `ColHidden`을 호출하는 것만으로 발생하는 오류는 아니고, 해당 화면의 별도 로직이 영향을 주는 것으로 보입니다.

**키워드**: B[A].search is not a function, SetCellValue, ColHidden, CellValue, TypeError

---

### [API-0211] 시트 생성 후 컬럼 Type을 통째로 바꿀 수 있나요? (동적 콤보)

**질문**

- 시트가 생성된 후에 특정 컬럼의 Type을 통째로 바꿀 수 있는 방법이 있나요? 동적 콤보 때문에 필요합니다.

**답변**

시트 생성 후 컬럼 Type을 통째로 바꾸는 방법은 없습니다. 동적 콤보라서 가져오는 데이터를 미리 세팅하지 못하는 경우에는 `InitComboNoMatchText()` 함수를 사용해 보세요.

**키워드**: InitComboNoMatchText, 컬럼 Type 변경, 동적 콤보, Type

---

### [API-0212] 컬럼에 설정된 헤더 텍스트·Type·Format은 어떻게 읽나요? (GetCellText, GetCellProperty)

**질문**

- 각 컬럼에 설정했던 값을 코드에서 알고 싶습니다. 헤더 텍스트와 InitColumns로 설정한 Type, Format 정보를 읽으려면 어떻게 하나요?
- 헤더가 두 줄 이상인 시트에서 GetCellProperty로 두 번째 헤더 행의 Type이나 세이브네임을 가져오려는데 첫 번째 행 값만 반환됩니다.
- 헤더 행 자체를 화면에서 감추는 것도 가능한가요?

**답변**

- 헤더 텍스트(타이틀): `GetCellText`로 읽습니다. `CellValue()`나 `CellText()`로 헤더 셀의 값을 가져와도 됩니다.
- InitColumns로 설정한 Type이나 Format 같은 컬럼 속성: `GetCellProperty`로 읽으며, 첫 번째 인자에는 0을 넣습니다.
- 다중 헤더에서 `GetCellProperty`는 헤더에서 값을 가져올 때 첫 번째 헤더 행의 것만 반환합니다. 같은 컬럼의 Type을 헤더 행마다 다르게 선언했더라도 두 번째 행의 Type을 가져오는 방법은 없습니다.
- 헤더 행을 화면에서 감출 때는 `RowHidden()` 함수를 사용합니다.

**키워드**: GetCellText, GetCellProperty, CellValue, CellText, RowHidden, InitColumns, 헤더 타이틀

---

### [API-0213] 헤더 타이틀만 SetCellText·SetCellValue로 바꾸려면 어떻게 하나요? 값이 바뀌지 않거나 IE에서 반응이 없는 경우

**질문**

- 헤더가 2줄로 병합된 시트에서 헤더를 다시 초기화하지 않고 특정 위치의 헤더 타이틀만 바꾸려면 어떻게 하나요? 행과 컬럼은 어떻게 지정하나요?
- SetCellValue로 헤더 값을 강제로 바꾸는데 값이 잘 바뀌지 않습니다. 특정 버전의 문제일 수 있나요?
- ActiveX용 코드를 IBSheet7으로 변환해 CellText로 헤더 텍스트를 바꿨더니 크롬에서는 되고 IE에서는 반응이 없습니다.

**답변**

헤더 타이틀 변경은 데이터 영역의 값을 바꾸는 것과 다르지 않아 `SetCellText` 또는 `SetCellValue`를 사용합니다. 헤더 행의 row index는 0부터 시작하며 `mySheet.SetCellText(0, "컬럼SaveName", "변경하고자하는 타이틀")`, `mySheet.SetCellText(1, ...)`처럼 행마다 지정합니다. 셀이 상하로 병합되어 있다면 위·아래 셀을 함께 변경하는 것이 좋습니다.

- 7.0.13.0-20150416 버전의 `setCellValue` 버그로 보이는 현상이 있으며, 같은 상황에서 `setCellText`로 변경하면 정상적으로 바뀝니다.
- ActiveX 방식의 소스를 변환한 경우 `CellText`는 값을 읽을 때(Get)와 값을 할당할 때(Set)로 구분되므로, 도움말의 사용법에 맞게 호출해야 합니다.

**적용 버전**: 7.0.13.0-20150416에서 setCellValue 헤더 값 변경 문제

**키워드**: SetCellText, SetCellValue, CellText, 헤더 타이틀 변경, 7.0.13.0-20150416, ActiveX 변환

---

## 셀 색상·스타일·정렬

### [API-0214] RowFontColor·SetRowFontColor가 헤더 행·소계행에서 적용되지 않을 때

**질문**

- SetRowFontColor가 헤더 행에서는 동작하지 않습니다.
- 시트에서 소계행의 글자색을 RowFontColor 메서드로 바꾸려고 했는데 적용되지 않습니다.

**답변**

- `SetRowFontColor`가 헤더 행에서 동작하지 않는 현상은 IBSheet7 7.0.13.171 버전 배포로 처리되었습니다.
- 소계행에서는 `RowFontColor`가 동작하지 않으므로 `CellFontColor`를 사용하거나 `RangeFontColor`를 사용합니다.

**적용 버전**: 7.0.13.171에서 수정(헤더 행)

**키워드**: RowFontColor, SetRowFontColor, CellFontColor, RangeFontColor, 소계행 글자색, 7.0.13.171

---

### [API-0215] RowBackColor로 행 배경을 지정했는데 편집 불가 컬럼 색이 회색으로 나올 때

**질문**

- RowBackColor로 행 배경을 흰색으로 지정했는데 편집 불가 컬럼의 색이 회색으로 나옵니다. 지정한 색이 최종 색으로 적용되게 하려면 어떻게 해야 하나요?

**답변**

`RowBackColor`로 지정한 색은 편집 불가/가능이나 짝수/홀수 색과 관계없이 최종 색으로 결정됩니다. 단 데이터가 생성된 이후에 설정해야 하므로 `OnSearchEnd` 이벤트에서 호출합니다.

**키워드**: RowBackColor, 편집 불가 컬럼 색, OnSearchEnd, 행 배경색

---

### [API-0216] CellBackColor를 셀 범위로 지정해 한 번에 적용할 수 있나요?

**질문**

- IBSheet7에서 CellBackColor를 셀 범위를 지정해서 한 번에 적용할 수 있나요?

**답변**

버전에 따라 다릅니다. 낮은 버전에서는 `CellBackColor`를 범위로 지정할 수 없고, 버전을 올리면 가능합니다.

**키워드**: CellBackColor, 셀 범위, 범위 지정, 버전 업그레이드

---

### [API-0217] 조회가 끝난 뒤 특정 컬럼 너비와 셀 배경색을 바꾸려면 어떻게 하나요?

**질문**

- 조회가 끝난 뒤 특정 컬럼의 너비를 바꾸고 특정 셀의 배경색을 변경하려면 어떤 이벤트와 함수를 쓰나요?

**답변**

`OnSearchEnd` 이벤트에서 `ColWidth` 함수로 컬럼 너비를, `CellBackColor` 함수로 셀 배경색을 바꿉니다.

**키워드**: OnSearchEnd, ColWidth, CellBackColor, 컬럼 너비, 셀 배경색

---

### [API-0218] 데이터 값(조건)에 따라 셀 배경색·글자색이나 클래스를 적용하려면 어떻게 하나요?

**질문**

- 조회된 데이터가 어떤 조건을 만족하는지에 따라 셀의 배경색이나 폰트 색상을 칠하려면 어떻게 하나요? 시트 조회 전에 설정할 수 있는 방법이 있나요?
- 셀에 클래스를 지정하는 setCellClassName 같은 메서드가 있나요? Y, N 값에 따라 셀 색상이 바뀌어야 합니다.

**답변**

`ColCondProperty` 함수를 시트 조회 전에 설정하면 조건에 따라 셀 색상을 지정할 수 있습니다. `ColCondProperty`로 처리할 수 없는 내용은 `OnLoadData` 이벤트에서 인자로 넘어온 data를 가공해 리턴하는 형태로 처리합니다.
`setCellClassName` 메소드는 지원하지 않습니다. 데이터 값에 따라 속성을 적용하려면 조회 후 데이터를 수정해 색상, 편집 여부 등을 설정하는 방법(자주 묻는 질문의 '조회 후 데이터 수정 및 색상, 편집여부 등 설정하기')을 참고합니다. 또한 `OnLoadData`에서 `ClassName`을 사용하면 Button 타입 사용자 정의 클래스에 postfix로 적용되던 것이 지정한 이름의 Class로 분리되어 적용됩니다.

**키워드**: ColCondProperty, OnLoadData, ClassName, setCellClassName, 조건부 색상, 셀 클래스

---

### [API-0219] SetColProperty로 컬럼 설정을 바꿀 때 모든 속성이 적용되나요? (ColMerge 변경 불가 등)

**질문**

- 시트의 컬럼 설정(속성)을 변경할 수 있는 함수가 있는지 궁금합니다. 어떤 함수를 쓰나요?
- 데이터를 조회한 뒤 SetColProperty로 컬럼 포맷(정수/실수 등)을 바꾸려고 합니다. 설정한 속성이 모두 즉시 적용되나요?
- 시트를 모두 생성한 뒤 SetColProperty로 ColMerge를 0으로 바꾸려는데 적용되지 않습니다.

**답변**

`SetColProperty` 함수로 컬럼 설정을 바꿀 수 있지만 모든 속성이 즉시 반영되지는 않습니다.

- 원래 속성은 조회 전에 설정해야 적용되며 일부 기능만 호출 직후 적용되도록 되어 있으므로, 가급적 조회 전에 바꾸는 것을 권장합니다. 조회 후 모두 적용하려면 `GetSaveJson({AllSave:1})`로 전체 데이터를 추출한 뒤 `LoadSearchData(json)`으로 다시 로드합니다.
- `ColMerge`는 `SetColProperty`로 수정할 수 없습니다. 상태·삭제 컬럼처럼 머지에서 제외할 컬럼은 시트를 처음 초기화할 때 `ColMerge:0`으로 설정해야 합니다.

**키워드**: SetColProperty, ColMerge, GetSaveJson, LoadSearchData, AllSave, 컬럼 속성 변경

---

### [API-0220] SetColProperty로 Format을 바꿨는데 PointCount 때문에 소수점이 계속 표시됩니다

**질문**

- 초기화 때 PointCount를 지정한 Float 컬럼에 SetColProperty로 Format:"#,##0"을 지정했는데 조회하면 소수점이 나옵니다. 어떻게 해야 하나요?
- Float 컬럼에서 소수점 이하 자릿수가 표시되지 않습니다.

**답변**

초기화 때 지정한 `PointCount`가 그대로 남아 있어 소수점이 표시되는 것입니다. 이전 설정을 지우려면 `PointCount:0`도 함께 지정해야 합니다. 반대로 Float 컬럼에서 소수점 이하 자릿수가 표시되지 않는 경우에는 해당 컬럼에 `PointCount:0` 설정이 있는지 확인합니다.

**키워드**: SetColProperty, PointCount, Format, Float, 소수점

---

### [API-0221] 조건에 따라 특정 셀의 Type을 바꾸려면 어떻게 하나요? (InitCellProperty, rowIndex)

**질문**

- 그리드 조회 후 행의 상태 값 같은 조건에 따라 특정 셀의 Type을 Text나 Button으로 바꿔서 사용해야 합니다. 어떤 함수를 써야 하나요?
- InitCellProperty의 첫 번째 인자 rowIndex는 어떻게 지정하나요? 헤더가 2줄일 때 데이터 첫 번째 행을 바꾸려면 몇으로 넣나요?

**답변**

조건에 따라 특정 셀의 Type을 Text나 Button으로 변경해야 할 때는 `InitCellProperty()` 함수를 이용합니다. 첫 번째 인자는 rowIndex이며 헤더를 포함해서 설정해야 하고 시작 index는 0입니다. 예를 들어 헤더가 2줄이고 데이터의 첫 번째 행을 변경하려면 첫 번째 인자를 2로 설정합니다.
자세한 내용은 매뉴얼(https://www.ibsheet.com/v7/docs/ibsheet/IBSheet.cell.html#InitCellProperty)과 예제(https://jsfiddle.net/6qeLwkjp)를 참고합니다.

**키워드**: InitCellProperty, rowIndex, Type, Button, 셀 타입 변경

---

### [API-0222] Combo 셀을 Text로 바꿨다가 InitCellProperty로 되돌리면 편집이 되지 않습니다

**질문**

- Combo 셀을 Text로 바꿨다가 클릭하면 다시 Combo로 되돌리는 로직에서 SetCellEditable로 Edit를 0으로 만든 뒤 InitCellProperty로 되돌려도 편집이 되지 않습니다. 어떻게 하나요?

**답변**

Text로 바꿀 때 `SetCellEditable`로 셀을 `Edit:0`으로 만들었는데 `UpdateEdit`는 셀 속성으로 제공되지 않아 `InitCellProperty`에 넣어도 Edit 여부가 수정되지 않습니다. 되돌릴 때는 `InitCellProperty`에 `Type`, `ComboText`, `ComboCode`, `Edit`를 함께 지정하세요. 기존 Text 값이 `ComboCode` 값과 다르면 값이 없어지므로 `SetCellValue` 등으로 값을 따로 넣어야 합니다.

**키워드**: InitCellProperty, SetCellEditable, UpdateEdit, ComboText, ComboCode, Edit

---

### [API-0223] 이미지가 있는 셀에서만 마우스 커서가 보이게 하려면 어떻게 하나요?

**질문**

- 이미지가 있는 셀에서만 커서가 보이고 이미지가 없는 셀에서는 보이지 않게 구분하고 싶습니다. 어떻게 처리하나요?

**답변**

조회 종료(`SearchEnd`) 시점에 `SetCellCursor` 함수를 호출해 셀별로 커서를 지정하는 방식으로 처리합니다.

**키워드**: SetCellCursor, SearchEnd, 셀 커서, 이미지 셀

---

### [API-0224] 조회 후 특정 행의 셀에 이미지를 설정하려면 어떻게 하나요? (SetImageList, SetCellImage)

**질문**

- 조회한 데이터 중 특정 행의 셀에만 New 같은 이미지를 표시하고 싶습니다. 이미지를 등록하고 행별로 지정하는 방법은 무엇인가요?
- SetCellImage로 셀에 이미지를 넣었는데 이미지 경로와 컬럼 타입도 맞게 했지만 이미지가 표시되지 않습니다.
- OnSearchEnd에서 조건에 따라 setCellImage로 이미지를 넣었더니 행 상태가 수정 상태가 됩니다.

**답변**

시트에서 사용할 이미지를 `SetImageList(인덱스, 경로)`로 먼저 등록하고, 조회 이후에 `SetCellImage`를 호출해 특정 행의 이미지를 설정합니다. 예: `mySheet.SetImageList(0,'New이미지경로')`, `mySheet.SetImageList(1,'공지이미지경로')`로 등록한 뒤 `mySheet.SetCellImage(1,'sTitle',1)`처럼 행·SaveName·이미지 인덱스를 지정합니다.

- 시트를 초기화(init)하기 전, 즉 조회된 행이 없는 상태에서 `SetCellImage`를 호출하면 이미지가 표시되지 않습니다. 조회가 모두 완료된 이후나 셀 이미지를 바꿔야 하는 시점에 호출합니다.
- `SetCellImage`로 이미지를 넣으면 행 상태가 수정으로 바뀌므로, `OnSearchEnd` 이벤트에서 상태 값을 R로 바꿔 줍니다. `OnLoadData` 이벤트에서 처리하는 방법도 있으나 조회 데이터가 XML이면 어렵습니다.

**키워드**: SetImageList, SetCellImage, OnSearchEnd, OnLoadData, 행 상태, 셀 이미지

---

### [API-0225] 셀 이미지 크기를 조정하거나 조건에 따라 이미지를 삽입하려면 어떻게 하나요? (SetCellImageStyle)

**질문**

- SetCellImage로 SVG 이미지를 넣었는데 크기가 커서 SetCellImageStyle로 줄이려 했지만 적용되지 않습니다. 크기를 조정할 수 있나요?
- SetCellImage로 셀에 이미지를 설정했는데 이미지가 제대로 나오지 않습니다. SetCellImageStyle 사용 조건과 이미지 크기는 어디에서 설정하나요?
- 다른 컬럼의 값이 Y인 경우에만 셀에 이미지를 삽입하려면 어떤 함수를 사용하나요?

**답변**

- 이미지 크기: `SetCellImage`는 초기 설정 시 width와 height를 지정할 수 있으며, `SetCellStyle`로는 크기가 조정되지 않습니다. 이미지의 `ImgWidth`와 `ImgHeight`는 초기 Col 설정값에서 지정하거나 `SetColProperty`로 설정합니다.
- `SetCellImageStyle`은 셀에 이미지를 삽입하는 데 사용할 수 있으나, 단위 데이터 행이 2개 행 이상인 구조에서만 사용할 수 있습니다. 예제(jsfiddle.net/7bLu2ys1)는 주소가 서울인 경우 이름 컬럼에 이미지가 삽입되는 형태입니다.
- 조회 완료 시점에 `SetCellImage`로 이미지를 넣는 방식으로도 구현할 수 있습니다.

**키워드**: SetCellImage, SetCellImageStyle, SetCellStyle, ImgWidth, ImgHeight, SetColProperty, 이미지 크기

---

### [API-0226] 합계 행이나 신규 추가 행의 특정 셀만 정렬(Align)을 다르게 지정하려면? (CellAlign)

**질문**

- 시트의 합계 행에 있는 셀의 정렬(Align)을 지정하고 싶습니다. 어떤 속성으로 설정하고 합계 행은 어떻게 찾나요?
- 신규 행을 하나 추가해서 그 행만 셀 정렬(align)을 다른 행과 다르게 지정하고 싶습니다. 컬럼 전체 설정이 아니라 한 행만 바꾸려면 어떻게 하나요?

**답변**

`CellAlign`으로 셀 단위로 정렬을 설정합니다. 합계 행은 `FindSumRow`로 찾을 수 있으며, 신규 행은 행을 추가한 뒤 `CellAlign`으로 해당 셀을 수정합니다.

**키워드**: CellAlign, FindSumRow, Align, 합계 행, 셀 정렬

---

### [API-0227] 합계 행의 Index와 합계 값을 가져오려면 어떻게 하나요? (FindFooterRow, FindSumRow)

**질문**

- 합계 행의 Index를 확인하는 API가 있나요? 어느 버전부터 사용할 수 있나요?
- FindSumRow로 합계 행 번호를 가져와 합계 셀 값을 읽었더니 합계 텍스트는 나오는데 합계 값은 0으로 출력됩니다.

**답변**

합계 행의 Index는 `FindFooterRow` API로 확인할 수 있으며, 이 API는 7.0.13.181-20210318-1711-M 버전에서 추가되었습니다.
`FindSumRow`로 합계 행 번호를 구한 뒤 합계 값이 0으로 읽힌다면 컬럼 index를 확인합니다. 컬럼 index는 좌측부터 0으로 시작하며, 합계 값이 있는 컬럼의 index가 6이면 6으로 정확히 지정해야 합니다.

**적용 버전**: 7.0.13.181-20210318-1711-M부터(FindFooterRow)

**키워드**: FindFooterRow, FindSumRow, 합계 행 Index, 7.0.13.181-20210318-1711-M, 컬럼 index

---

### [API-0228] DataCopy로 복사한 행에 원본의 배경색이 그대로 복사됩니다. 초기값으로 되돌리려면?

**질문**

- DataCopy로 복사한 행에 원본의 BackColor가 그대로 복사됩니다. 복사한 행의 배경색을 초기값으로 되돌리려면 어떻게 하나요?

**답변**

`DataCopy`로는 복사한 행에서 배경색 정보를 제거할 수 없습니다. 대신 `DataCopy()` 동작 후 복사된 행의 index를 구해 `RangeBackColor`(또는 `SetRowBackColor`, `SetColBackColor`, `SetCellBackColor`)로 색을 지정하며, 색상 값을 빈 값으로 지정하면 셀의 기본값으로 설정됩니다. 참고 샘플: https://jsfiddle.net/wnzjcb5e

**키워드**: DataCopy, RangeBackColor, SetRowBackColor, SetCellBackColor, BackColor, 배경색 초기화

---

### [API-0229] SetCellFontColor·CellFontBold 호출 시 콘솔에 span 태그가 출력되는 현상의 수정 버전

**질문**

- SetCellFontColor나 CellFontBold API를 호출하면 콘솔 창에 <span style='color:#ff0000;'> 같은 태그가 출력됩니다. 해결된 버전이 있나요?

**답변**

해당 증상은 IBSheet7 7.0.13.95 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.95에서 수정

**키워드**: SetCellFontColor, CellFontBold, span 태그, 콘솔 출력, 7.0.13.95

---

### [API-0230] RowFontBold 함수가 동작하지 않습니다. 글꼴을 굵게 하는 함수는 무엇인가요?

**질문**

- 시트에서 RowFontBold를 사용해 글꼴을 굵게 지정하려는데 동작하지 않습니다. 이 함수가 맞는지, 올바른 함수가 무엇인지 알고 싶습니다.

**답변**

`RowFontBold`라는 함수는 없습니다. 굵은 글꼴 지정에는 `CellFontBold`만 있으므로 존재하지 않는 `RowFontBold` 대신 `CellFontBold`를 사용합니다.

**키워드**: RowFontBold, CellFontBold, 굵은 글꼴, 존재하지 않는 함수

---

### [API-0231] OnSearchEnd에서 SetRowHeightMin을 적용하면 데이터 하단이 잘려 보입니다

**질문**

- OnSearchEnd에서 SetRowHeightMin()을 적용하면 데이터 하단이 잘려 보이고, 타이틀 부분을 클릭하면 정상으로 보입니다. 어떻게 해결하나요?

**답변**

`SetRowHeightMin()`을 `SetRowHeight()`로 오버라이드하는 방법으로 해결합니다. ibsheetinfo.js의 `createIBSheet()` 끝에 `_addOnLoadEvent(methodOverRide,sheetid)`를 추가하고, 공통 JS에 기존 `window.onload`에 함수를 추가로 등록하는 `_addOnLoadEvent(func,param)`와 `window[id].SetRowHeightMin = window[id].SetRowHeight;`를 수행하는 `methodOverRide(id)` 두 함수를 추가합니다.

**키워드**: SetRowHeightMin, SetRowHeight, OnSearchEnd, methodOverRide, _addOnLoadEvent, createIBSheet

---

### [API-0232] CheckDynamicHeight 함수는 사용할 수 있나요? 데이터가 적을 때 시트 높이를 유동적으로 하려면?

**질문**

- IBSheet의 CheckDynamicHeight API 명세를 알고 싶습니다. 데이터가 없거나 적을 때 시트 높이를 유동적으로 하는 데 쓸 수 있나요?

**답변**

`CheckDynamicHeight`는 공개된(Open) 함수가 아니어서 사용할 수 없습니다. 데이터가 적을 때 높이를 유동적으로 하려면 `SetConfig`의 `SizeMode:4` 설정을 사용합니다.

**키워드**: CheckDynamicHeight, SetConfig, SizeMode:4, 시트 높이 유동

---

## 중복 체크

### [API-0233] 시트에서 컬럼 값 중복(PK·키 컬럼, 행 추가·저장 시)을 체크하려면 어떻게 하나요?

**질문**

- 시트(그리드)에 있는 내용 중 같은 값이 중복되어 있는지 체크할 수 있나요? 어떤 함수를 써야 하나요?
- 행을 추가할 때 특정 키 컬럼의 값들이 중복되지 않게 하려면 어떻게 하나요?
- 저장 전에 같은 값이 중복된 행이 있는지 검사하고 싶습니다.
- 한 컬럼에서 동일한 값이 중복된 항목을 색상으로 구분해 보이게 하려면 어떻게 하나요?

**답변**

`ColValueDup`과 `ColValueDupRows` 함수를 사용합니다.

- `ColValueDup`: 중복값이 발견되는 첫 번째 인덱스를 반환합니다.
- `ColValueDupRows`: 중복값이 있는 모든 행을 반환합니다.
검색할 컬럼의 index를 넣어 호출하면 중복된 데이터가 있는 경우 행 index를 반환하므로, 반환된 index로 해당 행 또는 셀의 색상을 칠하는 로직을 구현할 수 있습니다. PK(키) 컬럼의 중복 방지는 저장 전에 호출해 중복 여부를 확인한 뒤 저장하거나, 해당 컬럼 값이 변경되는 시점에 호출해 검사합니다. 두 컬럼이 키로 잡힌 경우도 저장 전에 같은 방식으로 확인합니다. int 타입·`#,#00` 포맷 컬럼, 등수처럼 행마다 서로 달라야 하는 값에도 같은 함수를 사용합니다.

**키워드**: ColValueDup, ColValueDupRows, 중복 체크, PK 중복, 저장 전 검사, 중복 색상 표시

---

### [API-0234] 시트 데이터에서 중복 행을 제거하는 방법

**질문**

- 버튼을 클릭하면 첫 번째 시트에 있는 데이터에서 중복된 값을 제거한 뒤 다시 첫 번째 시트에 붙여야 합니다. 중복 행을 제거하는 방법에는 어떤 것이 있나요?

**답변**

두 가지 방법이 있습니다.

- `DoSearch` 시 시트의 데이터를 `GetSaveString`으로 서버에 보내 중복을 제거하고 조회해서 시트에 붙입니다.
- 일단 조회해서 시트에 붙인 다음 `OnSearchEnd`에서 `ColValueDupRows` 함수로 중복 행을 찾고 `RowDelete`로 행을 지웁니다.

**키워드**: 중복 행 제거, ColValueDupRows, RowDelete, GetSaveString, OnSearchEnd, DoSearch

---

### [API-0235] OnChange·OnValidation에서 ColValueDup으로 중복을 체크하는데 값을 붙여넣으면 적용되지 않는 이유

**질문**

- OnChange와 OnValidation에서 ColValueDup으로 중복을 체크하는데, 값을 붙여넣으면 적용되지 않습니다.

**답변**

OnChange 이벤트에서 `RaiseFlag = 1`을 체크하는 로직 때문에 붙여넣기 시 `ColValueDup`이 적용되지 않았습니다. 해당 로직을 확인하고, OnValidation에서의 중복 체크는 `ColValueDupRows`로 여러 행을 가져와서 확인하는 방식으로 바꿔야 할 수 있습니다.

**키워드**: ColValueDup, OnChange, OnValidation, RaiseFlag, 붙여넣기, ColValueDupRows

---

### [API-0236] ColValueDup이 중복이 없는데도 값을 반환하거나 경고가 계속 뜨고 DB 중복은 못 막는 이유

**질문**

- ColValueDup으로 동일한 값이 있으면 alert가 뜨도록 해 두었는데 경고가 계속 뜹니다.
- ColValueDup을 사용하는데 Null 값이 들어 있는 행도 중복값으로 체크되거나 엉뚱한 값이 반환됩니다.
- 중복 데이터가 없는데도 row 값이 계속 반환되거나, 동일 데이터가 DB에 그대로 저장됩니다.

**답변**

원인은 다음과 같으며 순서대로 확인합니다.

- 기존 데이터에 이미 중복되는 값이 있으면 `ColValueDup()` 결과가 계속 중복으로 나와 경고가 반복됩니다. 기존 데이터에 중복값이 있는지 먼저 확인합니다.
- 값이 비어 있는(Null) 행도 중복값으로 체크됩니다. 기본 행을 미리 여러 개 생성해 둔 경우에도 이상한 값이 반환될 수 있으며, `ColValueDup` 함수에 `IncludeEmpty : 0` 옵션을 설정합니다.
- `ColValueDup`은 시트 안에서 기준 컬럼에 중복된 데이터가 있는지를 반환하는 함수이므로, 입력한 값을 조회된 데이터와 비교하는 용도로는 맞지 않고 DB에 있는 데이터와의 중복은 확인하지 않습니다. 입력값과 비교하려면 `GetRangeText()`로 비교할 범위의 데이터를 배열로 추출해 입력값과 같으면 true를 반환하는 로직을 직접 만듭니다.

**키워드**: ColValueDup, IncludeEmpty, GetRangeText, 중복 경고 반복, Null 값 중복, DB 중복

---

### [API-0237] 선택 행만·특정 행 제외·두 컬럼 비교·하이픈 무시·특정 값 존재 여부 중복 체크는 ColValueDup으로 되나요?

**질문**

- 전체 데이터 중 사용자가 선택한 행들 안에서만 ColValueDup으로 중복 체크를 할 수 있나요?
- ColValueDup으로 컬럼 중복을 체크할 때 특정 행만 빼고 나머지 행끼리 비교할 수 있는 방법이 있나요?
- 두 컬럼에 같은 값이 들어 있는 행만 골라 처리하려는데 ColValueDupRows로 가능한가요?
- ColValueDupRows로 중복 체크를 하는데 '-'가 있는 값과 없는 값(예: 계좌번호)이 같은 값으로 인식되지 않습니다.

**답변**

중복 관련 함수는 `ColValueDup`과 `ColValueDupRows` 두 가지뿐이며, 아래 경우는 지원되지 않으므로 로직을 직접 구현해야 합니다.

- 선택된 행들 안에서만 중복 확인: 선택된 행의 데이터를 뽑아서 직접 dup 체크를 합니다.
- 특정 행을 제외한 중복 체크: 특정 컬럼에서 중복되는 데이터를 모두 추출한 뒤 제외하려는 값인지 판단해 해당 행은 건너뛰고 비교합니다.
- 두 컬럼 값의 일치 비교: `ColValueDupRows`는 특정 컬럼 안에서 중복된 값을 반환하는 함수입니다. 사용자가 값을 변경하는 시점에 앞뒤 컬럼 값과 비교해 알림을 주거나 저장 시점에 두 컬럼 값을 가져와 비교하는 로직이 필요합니다.
- '-' 유무가 다른 값(예: '1234567'과 '123-456-7')은 Text 타입에서 서로 다른 데이터로 인식됩니다. `ExportData`로 시트 전체 데이터를 추출해 '-'를 제거한 뒤 중복 체크하는 함수를 직접 구현합니다.
- 특정 text의 중복 여부 확인: `ExportData`로 시트 데이터를 추출한 뒤 javascript `filter`로 걸러서 length가 1개 이상이면 중복 행이 있는 것으로 판단합니다.

**키워드**: ColValueDup, ColValueDupRows, ExportData, 선택 행 중복, 특정 행 제외, 하이픈 중복

---

### [API-0238] ColValueDup 인자 구조 변경(7.0.12.3)과 ColValueDupRows 저장 시 멈춤·IncludeDel 미동작 이슈

**질문**

- ColValueDup이 이전 버전에서는 인자를 하나만 받았는데 새 버전에서 인자 구조가 바뀌었습니다. 이전 방식으로 호출하면 옵션은 어떻게 처리되나요?
- ColValueDupRows로 중복 행을 2개 이상 추출한 상태에서 저장하면 에러 메시지도 없이 멈춥니다.
- ColValueDupRows를 사용할 때 IncludeDel 인자를 지정해도 동작하지 않습니다.

**답변**

- 인자 구조: 7.0.0.0에서는 `ColValueDup`이 인자를 하나만 받았고 7.0.12.3 버전에서 인자 구조가 변경되었지만 하위호환성을 맞추어 두어, 이전 방식으로 호출해도 동일하게 처리됩니다.
- 저장 시 멈춤: 7.0.13.100 버전에서 `ColValueDupRows`로 중복 행이 2개 이상 추출된 상태로 저장하면 에러 없이 멈추는 현상(무한루프)이 있었습니다. 같은 증상이면 최신 버전 사용을 권장합니다.
- `ColValueDupRows`의 `IncludeDel` 인자가 동작하지 않는 것은 제품 오류입니다.

**적용 버전**: 7.0.12.3에서 인자 구조 변경, 7.0.13.100에서 저장 시 멈춤 발생

**키워드**: ColValueDup, ColValueDupRows, IncludeDel, 7.0.12.3, 7.0.13.100, 저장 시 멈춤

---

### [API-0239] ColValueDupRows에서 어떤 행끼리 중복인지 확인하거나 IncludeFirstRow 반환값(1|2,3)을 처리하는 방법

**질문**

- ColValueDupRows 함수에서 IncludeFirstRow를 설정하면 중복 행이 `1|2,3`처럼 반환됩니다. 1,2,3 형태로 얻으려면 어떻게 하나요?
- 컬럼 중복 체크(ColValueDupRows) 결과로 어떤 행과 어떤 행이 중복되는지 확인하려면 어떻게 하나요?

**답변**

`ColValueDupRows` 옵션에 `IncludeFirstRow`를 추가하면 중복 시작 행도 확인할 수 있습니다. 예:

```
mySheet.ColValueDupRows("컬럼명",{"IncludeFirstRow":1,"IncludeDelRow":0,"IncludeEmpty":0})
```

데이터가 많을 때 항상 중복으로 체크되는 경우 실제로 동일한 값이 있는지 이 방법으로 확인해 볼 수 있습니다. `IncludeFirstRow`를 설정했을 때의 반환값은 `1,3|2,4,5` 같은 형태가 될 수 있으며 정상입니다. 원하는 형태가 아니라면 반환 문자열의 `|`를 `,`로 치환한 다음 배열로 만들고 그 배열을 sort 해서 사용합니다.

**키워드**: ColValueDupRows, IncludeFirstRow, IncludeDelRow, IncludeEmpty, 중복 시작 행, 반환값 치환

---

## 저장 데이터 추출

### [API-0240] GetSaveJson이나 DoSave로 수정된 행이 추출되지 않는 이유 (상태 컬럼 없음)

**질문**

- GetSaveJson이나 DoSave로 수정된 행만 뽑으려는데 특정 화면에서만 변경된 행이 추출되지 않거나 변경된 항목이 없다고 나옵니다. 원인이 무엇인가요?

**답변**

수정된 행은 상태값에 따라 추출되므로, 상태 컬럼이 없으면 `getSaveJson`에서 수정된 행의 데이터가 뽑히지 않습니다. `Status` 타입 컬럼을 추가하면 정상적으로 추출되며, 화면에 보이기 싫으면 컬럼을 만들고 hidden으로 설정합니다.

**키워드**: GetSaveJson, DoSave, Status, 상태 컬럼, hidden

---

### [API-0241] 왼쪽 시트에서 오른쪽 시트로 행을 이동하면서 순번 컬럼 순서대로 정렬하려면?

**질문**

- 왼쪽 시트에서 오른쪽 시트로 행을 이동하면서 순번 컬럼 순서에 맞춰 데이터를 끼워 넣고 싶습니다. 어떻게 구현하는 것이 좋나요?

**답변**

순번에 맞춰 중간에 끼워 넣는 것보다 맨 아래로 추가한 다음 `ColumnSort`로 해당 순번 컬럼을 정렬하는 방식이 권장됩니다.

**키워드**: ColumnSort, 행 이동, 순번 컬럼, 정렬

---

### [API-0242] [SYS_InvalidColumnMove] 알림창이 뜨는 원인

**질문**

- 특정 화면에서 [SYS_InvalidColumnMove] 알림창이 뜹니다. 저장해 둔 컬럼 정보를 화면 로드 때 다시 설정하는 구조인데 원인이 무엇인가요?

**답변**

저장해 둔 컬럼 정보를 화면 로드 때 다시 설정하는 과정에서 틀고정을 적용하는 부분에 문제가 있으면 `[SYS_InvalidColumnMove]` 알림이 발생할 수 있습니다. 해당 부분의 소스를 점검해야 합니다.

**키워드**: SYS_InvalidColumnMove, 틀고정, 컬럼 정보 저장, 컬럼 이동

---

### [API-0243] GetSaveJson으로 전체 행 또는 체크된 행만 추출하려면?

**질문**

- OnSearchEnd에서 GetSaveJson('All')로 전체 데이터를 추출했더니 오류가 납니다.
- 라디오 버튼 컬럼이 있는 시트에서 GetRowData()를 쓰면 체크되지 않은 행도 가져옵니다. 체크된 행만 가져오려면 어떻게 하나요?

**답변**

- 전체 데이터 추출: `GetSaveJson`에 'All' 같은 문자열을 인자로 넣으면 안 되고 `{AllSave:1}`을 사용합니다. 반환된 데이터를 for 루프로 돌릴 때 반환 데이터에 length가 없어 오류가 날 수 있으므로 반환 구조를 확인합니다.
- 체크된 행만 추출: `GetRowData()` 대신 `GetSaveJson`의 `StdCol` 속성을 사용합니다. `StdCol`은 radio 또는 checkbox 타입 컬럼에서 check된 행만 JSON 형태로 가져옵니다. 가져온 데이터를 변수에 저장해 다른 화면으로 전달할 수 있습니다.

**키워드**: GetSaveJson, AllSave, StdCol, 체크된 행, radio, checkbox

---

### [API-0244] 특정 행(편집 불가 행 포함)만 GetSaveString 저장 대상으로 만들려면?

**질문**

- 전체 컬럼의 edit 속성이 0일 때 버튼을 누른 행만 GetSaveString으로 뽑아오려면 어떻게 하나요?
- 편집이 불가능한 행만 따로 뽑아오는 함수가 있나요?

**답변**

편집이 불가능한 행만 가져오는 기능은 제공되지 않습니다. 대신 대상 행의 상태값을 `SetRowStatus`로 수정 상태로 바꾼 뒤 `GetSaveString('U')` 또는 `getDataJson`으로 수정된 행을 가져오는 방식으로 처리합니다.

**키워드**: SetRowStatus, GetSaveString, getDataJson, 편집 불가, 수정 상태

---

### [API-0245] ExportData로 시트 전체 데이터를 JSON/object로 한 번에 추출하려면?

**질문**

- 시트에 로드된 헤더와 데이터를 그대로 복사해 보관하려고 합니다. 시트 데이터를 JSON으로 추출하는 함수가 있나요?
- ExportData를 사용했는데 작동하지 않습니다. 버전 때문인가요?

**답변**

`ExportData`로 시트 데이터를 추출할 수 있습니다. 예: `var jsonData = mySheet.ExportData({"Type":"json"});`
`ExportData`는 7.0.13.21에 최초로 추가된 기능이므로 그보다 낮은 버전에서는 사용할 수 없습니다. 그 버전에서는 `GetSaveJson()`, `GetSaveString()`으로 추출하며, 설정이 없으면 변경된 데이터만 추출되므로 전체 데이터를 추출하려면 `{AllSave: 1}`을 설정합니다.

**적용 버전**: 7.0.13.21 이상

**키워드**: ExportData, GetSaveJson, GetSaveString, AllSave, JSON 추출

---

### [API-0246] 날짜 컬럼 조건(특정 날짜, 특정 날짜보다 작은 값)으로 행을 추출하려면?

**질문**

- 시트에서 원하는 특정 날짜의 데이터만 뽑아올 수 있는 기능이 있나요?
- 날짜 컬럼 값이 특정 날짜보다 작은 행만 추출해서 처리하려면 어떤 방식이 효율적인가요?

**답변**

특정 날짜의 데이터만 뽑아오는 기능은 제공되지 않습니다. 전체 데이터를 가져온 뒤 원하는 데이터만 별도 배열에 담아 처리합니다. 효율 면에서는 `ExportData` 함수로 시트의 데이터를 추출한 뒤 JavaScript의 Filter를 적용하는 방식이 더 빠릅니다.

**키워드**: ExportData, Filter, 날짜 조건, 데이터 추출, 배열

---

## 버전별 수정 이슈

### [API-0247] 편집 후 포커스가 있는 상태에서 저장 버튼을 누르면 시트 값에 접근할 수 없는 현상의 수정 버전

**질문**

- 값을 편집하고 그 셀에 포커스가 있는 상태에서 바로 저장 버튼을 누르면, 저장하기 전에 시트의 값에 접근할 수 없습니다. 수정 버전은 무엇인가요?

**답변**

셀을 편집한 뒤 포커스가 있는 상태에서 바로 저장 버튼을 눌렀을 때 저장 전에 시트 값에 접근이 되지 않는 현상은 IBSheet7 7.0.0.0-20130809-15 버전에서 수정되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.0.0-20130809-15에서 수정

**키워드**: 7.0.0.0-20130809-15, 편집 중 저장, 값 접근 불가, 수정 버전

---

### [API-0248] 포커스 상태에서 편집을 시작할 때 IE에서도 커서를 텍스트 맨 끝에 두려면 (수정 버전)

**질문**

- 편집 상태가 아닌 포커스 상태에서 편집을 시작할 때 기존 데이터를 유지한 채 이어서 입력하고 싶습니다. IE에서도 커서를 텍스트 맨 끝에 둘 수 있나요?

**답변**

`SelectCell` 사용 시 IE 브라우저에서도 해당 옵션을 쓰면 커서가 text의 맨 마지막에 위치하도록 7.0.13.14-20150716-14 버전에서 수정되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.14-20150716-14에서 수정

**키워드**: SelectCell, 7.0.13.14-20150716-14, IE, 커서 위치, 편집 시작

---

### [API-0249] DataInsert 세 번째 인자로 포커스 이동이나 OnSelectCell 이벤트 발생을 제어할 수 있나요?

**질문**

- ActiveX처럼 DataInsert() 호출 시 세 번째 인자로 포커스를 보낼지 설정해 행 추가 때 onSelectCell() 이벤트가 호출되지 않게 할 수 있나요?
- DataInsert의 3번째 인자로 OnSelectCell 이벤트 발생 여부를 제어할 수 있도록 변경할 수 있나요?

**답변**

DataInsert 세 번째 인자로 포커스 이동 여부를 설정하는 기능은 IBSheet7 7.0.13.112 버전과 서버모듈 2.0.48 배포로 처리되었습니다. DataInsert의 3번째 인자와 OnSelectCell 이벤트 발생 여부에 관한 요청은 IBSheet7 7.0.13.116 버전에서 처리되었습니다. 해당 기능이 필요하면 위 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.112, 서버모듈 2.0.48, 7.0.13.116에서 처리

**키워드**: DataInsert, OnSelectCell, 세 번째 인자, 7.0.13.112, 7.0.13.116, 포커스 이동

---

### [API-0250] DataCopy로 복사한 행에 SetCellValue가 반영되지 않는 현상의 수정 버전

**질문**

- DataCopy로 복사한 행의 값을 SetCellValue로 수정했는데 반영되지 않습니다. 어느 버전에서 수정되었나요?

**답변**

DataCopy로 복사한 행에 SetCellValue를 해도 값이 반영되지 않는 현상은 CopyData 시 CalcLogic이 패치된 201407 마지막 버전인 IBSheet7 7.0.0.0-20140731-16 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.0.0-20140731-16에서 수정

**키워드**: DataCopy, SetCellValue, CalcLogic, 7.0.0.0-20140731-16

---

### [API-0251] 날짜 컬럼 값을 빈 문자열로 바꾼 뒤 CellSearchValue가 이상하게 반환되는 현상의 수정 버전

**질문**

- 날짜 컬럼에 20120101을 조회한 뒤 값을 빈 문자열로 바꾸고 CellSearchValue로 읽으면 값이 이상하게 반환됩니다. 해결된 버전이 있나요?

**답변**

날짜 컬럼 값을 빈 문자열로 바꾼 뒤 `CellSearchValue`로 읽을 때 값이 이상하게 반환되는 현상은 IBSheet7 7.0.13.3-20150508-09 버전에서 패치되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.3-20150508-09에서 수정

**키워드**: CellSearchValue, 날짜 컬럼, 7.0.13.3-20150508-09, 빈 문자열

---

### [API-0252] 삭제 체크박스 컬럼에 cellvalue를 쓸 때 컬럼 인자에 savename을 넣으면 에러가 나는 현상의 수정 버전

**질문**

- 7.0.13.173-20201102-10 버전에서 삭제 체크박스 컬럼에 cellvalue를 쓸 때 컬럼 인자에 savename을 넣으면 에러가 발생합니다. 해결 버전이 있나요?

**답변**

7.0.13.173-20201102-10 버전에서 발생한 증상으로, IBSheet7 7.0.13.177-20201231-15 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.173-20201102-10에서 발생, 7.0.13.177-20201231-15에서 수정

**키워드**: cellvalue, savename, 삭제 체크박스, 7.0.13.173-20201102-10, 7.0.13.177-20201231-15

---

### [API-0253] 행을 삭제한 뒤 다시 추가하면 SetCellValue가 동작하지 않는 현상의 수정 버전

**질문**

- 행을 추가해 SetCellValue로 값을 넣고 행을 하나씩 삭제한 뒤 다시 행을 추가해 SetCellValue를 호출하면 값이 들어가지 않습니다. 해결 버전이 있나요?

**답변**

7.0.13.156-20200109-18 버전에서 발생한 증상으로, IBSheet7 7.0.13.157-20200206-18 버전에서 릴리즈되어 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.156-20200109-18에서 발생, 7.0.13.157-20200206-18에서 수정

**키워드**: SetCellValue, 행 삭제, 행 추가, 7.0.13.156-20200109-18, 7.0.13.157-20200206-18

---

### [API-0254] 버전 업그레이드 후 RowDelete로 삭제한 행이 화면에 남는 현상의 수정 버전

**질문**

- 155 버전에서 162 버전으로 업그레이드한 뒤 데이터를 생성하고 삭제했다가 재생성하는 과정에서 RowDelete로 삭제한 행이 화면에 남아 있습니다. 해결 방법은?

**답변**

162 버전 이후 `RowDelete`로 행을 삭제했을 때 삭제가 이루어지지 않고 남는 현상은 IBSheet7 7.0.13.163-20200514-19 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.163-20200514-19에서 수정

**키워드**: RowDelete, 7.0.13.163-20200514-19, 행 삭제 안 됨, 버전 업그레이드

---

### [API-0255] RowDelete로 행을 모두 지운 뒤 DataInsert하면 값이 들어가지 않는 현상의 수정 버전

**질문**

- RowDelete로 행을 모두 지운 뒤 DataInsert로 행을 추가하면 값이 들어가지 않습니다. 해결된 버전이 있나요?

**답변**

해당 증상은 IBSheet7 7.0.13.157 버전에서 해결되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.157에서 수정

**키워드**: RowDelete, DataInsert, 7.0.13.157, 값 미입력

---

### [API-0256] 조회 데이터가 없는 상태에서 DataInsert(-1)을 호출하면 에러가 나는 현상의 수정 버전

**질문**

- 조회된 데이터가 없는 상태에서 RenderSheet(0) 후 DataInsert(-1)를 호출하고 RenderSheet(1)을 하면 에러가 납니다. 어느 버전에서 수정되었나요?
- 조회한 데이터가 없다는 메시지가 표시된 상태에서 DataInsert(-1)을 호출하면 에러가 나고 시트가 사라집니다.

**답변**

조회 데이터가 없는 상태에서 `RenderSheet(0)`, `DataInsert(-1)`, `RenderSheet(1)` 순으로 호출하면 에러가 나는 현상은 IBSheet7 7.0.0.0-20140814-15 버전 배포로 처리되었습니다. 또한 조회된 데이터가 없는 상태에서 `DataInsert(-1)`을 호출하면 에러가 나고 시트가 없어지는 현상은 IBSheet7 7.0.13.155-20191219-11 버전 배포로 처리되었습니다. 사용 중인 제품 버전에 맞는 수정 버전 이상으로 교체합니다.

**적용 버전**: 7.0.0.0-20140814-15에서 수정, 7.0.13.155-20191219-11에서 수정

**키워드**: DataInsert(-1), RenderSheet, 7.0.0.0-20140814-15, 7.0.13.155-20191219-11, 데이터 없음

---

### [API-0257] OnSearchEnd에서 DataInsert에 마지막 행 앞 인덱스를 지정해도 항상 마지막에 추가되는 현상의 수정 버전

**질문**

- OnSearchEnd 이벤트에서 DataInsert에 마지막 행 바로 앞 인덱스를 지정해도 항상 맨 마지막에 행이 추가됩니다. 어느 버전에서 수정되었나요?

**답변**

`OnSearchEnd`에서 `DataInsert`로 마지막 행 앞 인덱스를 지정했는데 행이 마지막에 추가되는 현상은 IBSheet7 7.0.0.0-20140613-10 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.0.0-20140613-10에서 수정

**키워드**: DataInsert, OnSearchEnd, 7.0.0.0-20140613-10, 행 추가 위치

---

### [API-0258] DataInsert 후 Cannot read properties of undefined (reading 'type') at Focus 오류의 수정 버전

**질문**

- 특정 화면에서 DataInsert로 행을 추가하면 `Cannot read properties of undefined (reading 'type') at Focus` 오류가 납니다. 캐시를 삭제해도 같은데 해결 버전이 있나요?

**답변**

해당 증상은 IBSheet7 7.0.13.245-20240321-1303 버전에서 패치되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.245-20240321-1303에서 수정

**키워드**: DataInsert, Focus, reading 'type', 7.0.13.245-20240321-1303

---

### [API-0259] 라이브러리 파일 교체 후 DataInsert 시 오류가 발생합니다 (7.0.13.128)

**질문**

- IBSheet 라이브러리 파일을 새로 받아 교체했더니 DataInsert를 할 때 오류가 발생합니다. 원인이 무엇인가요?

**답변**

7.0.13.128 버전에서 발생하는 문제입니다. 7.0.13.132 버전으로 올리면 처리됩니다.

**적용 버전**: 7.0.13.128에서 발생, 7.0.13.132에서 처리

**키워드**: DataInsert, 7.0.13.128, 7.0.13.132, 라이브러리 교체

---

### [API-0260] 행 추가 후 FindText에 빈 문자열을 넣으면 -1이 아닌 1이 반환되는 현상의 수정 버전

**질문**

- 행을 추가한 뒤 FindText에 빈 문자열을 넣어 검색했을 때 기존에는 -1이 반환됐는데 현재 버전에서는 1이 반환됩니다. 해결 방법이 있나요?

**답변**

해당 증상(`FindText(row,'')` 오류)은 `ibsheet.js` 7.0.13.248-20240402-1527 버전 적용으로 처리되었습니다.

**적용 버전**: 7.0.13.248-20240402-1527에서 수정

**키워드**: FindText, 빈 문자열, 7.0.13.248-20240402-1527, ibsheet.js

---

### [API-0261] DataCopy로 행을 복사할 때 수식까지 함께 복사되는 버전은?

**질문**

- 시트 내에서 DataCopy로 행을 복사할 때 수식까지 함께 복사하고 싶습니다. 지원되는 버전이 있나요?

**답변**

DataCopy 시 수식까지 복사하고 싶다는 요청은 오류 수정이 포함된 IBSheet7 7.0.0.0-20140626-17 버전 배포로 처리되었습니다.

**적용 버전**: 7.0.0.0-20140626-17에서 반영

**키워드**: DataCopy, 수식 복사, 7.0.0.0-20140626-17

---

## 기타 API·렌더링

### [API-0262] 특정 셀에만 class name이나 폰트 같은 스타일 속성을 적용할 수 있나요?

**질문**

- 특정 셀에만 class name을 적용하거나 font 같은 스타일 속성을 바꿀 수 있나요? backColor 외에 셀별로 속성을 변경하는 방법이 궁금합니다.

**답변**

class는 컬럼별로 적용할 수 있으나 셀별로 class를 지정하기는 어렵습니다. 대신 API로 셀별 속성(Align, BackColor, FontColor, FontName 등)을 변경할 수 있으며, API 문서에서 Cell로 시작하는 함수를 검색해 확인합니다.

**키워드**: class, Align, BackColor, FontColor, FontName, 셀별 속성

---

### [API-0263] 시트를 HTML 코드로 가져오려면 어떻게 하나요? (GetSheetHtml)

**질문**

- 그리드를 html table 형태로 변환하거나 여러 시트를 한 번에 인쇄하기 위해 시트 내용을 html로 얻는 방법이 있나요?
- DoPrint()를 쓰면 시트만 다운로드되어 타이틀이나 조회조건을 함께 구성하기 어렵습니다. 시트 영역만 HTML 태그로 가져오는 API가 있나요?
- GetSheetHtml()로 시트를 가져오면 style과 body가 따로 구분되어 나옵니다. CSS를 inline 형태로 한 번에 가져올 수 있나요?

**답변**

`GetSheetHtml()` 메소드로 현재 화면에 보여지는 시트에 대한 html 코드를 가져올 수 있습니다.
다만 CSS를 inline 형태로 한 번에 가져오는 방식은 지원되지 않습니다. 내부적으로 CSS가 class를 호출하는 구조여서 DOM에 직접 접근해 가져오는 방법도 어렵습니다.

**키워드**: GetSheetHtml, DoPrint, html table, CSS inline, 시트 HTML

---

### [API-0264] 멀티라인 레코드에서 SetDataLinkMouse를 쓰면 특정 셀이 아니라 행 전체의 마우스 커서가 바뀝니다

**질문**

- 멀티라인 레코드로 구현한 시트에서 SetDataLinkMouse()를 쓰면 특정 숫자 셀만이 아니라 행 전체의 마우스 커서가 바뀝니다. 어떻게 해야 하나요?

**답변**

멀티라인 레코드에서 `SetDataLinkMouse()`에 Col index를 주면 해당 컬럼 위치의 모든 행에 마우스 커서가 변경되지만, SaveName으로 설정하면 해당 컬럼을 가진 데이터 행에만 적용됩니다. 또한 이 기능은 사실상 해당 컬럼에 `FontUnderline:1`, `Cursor:"Pointer"` 속성을 설정한 것과 동일한 효과이므로 이 방법으로 구현할 수도 있습니다.

**키워드**: SetDataLinkMouse, FontUnderline, Cursor, 멀티라인 레코드, SaveName

---

### [API-0265] 컬럼명이 다른 시트 간에 컬럼 index가 같으면 데이터를 옮겨 주는 API가 있나요?

**질문**

- A시트에서 B시트로 컬럼명이 서로 달라도 컬럼 index만 동일하면 데이터를 옮겨주는 API가 있나요?

**답변**

해당 API는 없습니다. `GetSaveJson({AllSave:1})`로 A시트 데이터를 모두 추출한 뒤 savename을 비교해 조건에 맞는 데이터를 매칭해서 B시트에 넣어주어야 합니다.

**키워드**: GetSaveJson, AllSave, savename, 시트 간 데이터 이동

---

### [API-0266] 특정 이벤트 시점에 컬럼 순서를 바꾸려면 어떻게 하나요? (MoveColumnPos)

**질문**

- 특정 이벤트 시점에 컬럼 순서를 바꾸고 싶습니다. 예를 들어 A, B, C 순서를 C, B, A로 바꾸려면 어떤 API를 쓰나요?

**답변**

컬럼 위치를 이동하는 함수는 `MoveColumnPos`입니다. `GetCols("Visible")`로 화면에 보이는 컬럼 배열을 얻고, 앞쪽 컬럼부터 차례로 맨 뒤 컬럼 위치로 `MoveColumnPos(colArr[i], colArr[colArr.length-1])`처럼 이동시키면 순서를 뒤집을 수 있을 것으로 보입니다.

**키워드**: MoveColumnPos, GetCols, Visible, 컬럼 순서 변경

---

### [API-0267] Chrome에서 IBSheet 그리드에 포커스가 가지 않는 경우의 원인

**질문**

- Chrome에서 IBSheet 그리드에 포커스가 가지 않는 경우가 있습니다. Chrome 관련 패치를 적용해도 동일한데 원인이 무엇일까요?

**답변**

포커스를 주는 호출이 시트 객체 생성보다 먼저 실행되었기 때문일 수 있습니다. 제품 자체는 정상 동작하므로 호출 시점이 시트 객체 생성 이후인지 확인해야 합니다.

**키워드**: 포커스, Chrome, 시트 객체 생성, 호출 시점

---

### [API-0268] SetColProperty의 첫 번째 인자 DataRow를 1로 주면 적용되지 않습니다

**질문**

- SetColProperty로 KeyField 같은 컬럼 속성을 바꾸려는데 첫 번째 인자 DataRow를 1로 설정하면 적용되지 않습니다. DataRow는 무엇인가요?

**답변**

`DataRow`는 다중라인 레코드 개념과 관련된 인자입니다. 일반적인 그리드라면 무조건 0으로 설정해야 합니다.

**키워드**: SetColProperty, DataRow, KeyField, 다중라인 레코드

---

### [API-0269] FindText로 검색할 때 숨김 행이나 상태가 D인 행을 제외할 수 있나요?

**질문**

- 삭제 처리한 행을 SetRowHidden으로 숨겼을 때 FindText로 검색하면서 숨김 행이나 상태가 D인 행을 제외할 수 있나요?

**답변**

`FindText`에는 숨김 값을 건너뛰고 검색하는 기능이 없습니다. `FindText`가 반환한 행 번호로 해당 행이 숨김인지, 상태값이 `D`인지 확인하는 로직을 별도로 추가해 처리합니다.

**키워드**: FindText, SetRowHidden, 숨김 행 제외, 상태값 D

---

### [API-0270] RenderSheet(0)을 호출한 뒤 스크롤이 시트에 반응하지 않습니다. 반복 작업에서는 어떻게 호출하나요?

**질문**

- 스크롤바가 생겼는데 스크롤을 움직여도 시트가 반응하지 않습니다. 원인이 무엇인가요?
- 행 추가·삭제나 컬럼 추가·삭제처럼 렌더링이 반복되는 작업에서 RenderSheet를 어떻게 호출해야 하나요?

**답변**

`RenderSheet(0)`으로 설정해 두고 다시 1로 되돌리는 로직이 없으면 스크롤바가 생겨도 스크롤을 움직일 때 시트가 반응하지 않을 수 있습니다. 다시 `RenderSheet(1)`로 변경하면 정상 동작하며, 되돌리는 로직을 추가해 해결한 사례가 있습니다.
행 추가·삭제, 컬럼 추가·삭제처럼 렌더링이 반복되는 부분에서는 로직 시작점에 `RenderSheet(0)`을 호출하고, 로직이 완료된 이후에 `RenderSheet(1)`을 호출해야 합니다.

**키워드**: RenderSheet, RenderSheet(0), RenderSheet(1), 스크롤, 렌더링

---

### [API-0271] RemoveAll()을 호출하면 헤더 아래 추가한 행이 사라집니다. 탭 이동 시 콤보 리스트 제거에도 쓸 수 있나요?

**질문**

- 시트 헤더 아래에 행을 추가해 특정 셀에 검색 버튼을 넣었는데, RemoveAll()을 호출한 이후로 버튼이 보이지 않습니다.
- 여러 탭에 각각 시트가 있을 때 콤보 리스트를 펼친 채 다른 탭으로 이동하면 기존 콤보 리스트가 사라지지 않습니다. 어떻게 하나요?

**답변**

`RemoveAll()`을 호출하면 시트 헤더를 제외한 데이터가 모두 삭제되므로, 헤더 아래에 따로 추가해 둔 행(검색 버튼을 넣은 행 등)도 함께 사라집니다. `RemoveAll()` 이후에 해당 행을 추가하는 로직을 다시 호출해야 합니다.
탭 이동 시 남은 콤보 리스트는 다른 탭으로 이동하기 전에 각 시트에서 `RemoveAll()`을 호출해 지울 수 있습니다. 생성되지 않은 시트의 이름으로 접근하면 스크립트 오류가 나므로, 루프문으로 `Grids[i].RemoveAll()`을 호출하는 방식으로 구현합니다.

**키워드**: RemoveAll, Grids, 콤보 리스트, 탭 이동, 헤더 아래 행

---

### [API-0272] 멀티라인 시트에서 행을 삭제하면 포커스 영역이 잘못 표시되는 현상

**질문**

- 멀티라인 컬럼을 사용하는 시트에서 행을 삭제하면 포커스 영역이 잘못 표시됩니다. 삭제 대상 다음 행이 필터로 숨겨져 있는 경우입니다. 해결된 사항이 있나요?

**답변**

멀티라인 컬럼을 사용하는 시트에서 행을 삭제할 때 삭제 대상 행의 다음 행이 필터에 의해 숨김 처리되어 있으면 포커스 영역이 잘못 표시되는 현상이 있었으며, 패치로 수정되었습니다. 최신 패치 버전으로 교체합니다.

**키워드**: 멀티라인, 행 삭제, 포커스 영역, 필터, 패치

---

### [API-0273] 트리 시트에서 떨어져 있는 여러 행을 선택된 것처럼 표시하려면 어떻게 하나요?

**질문**

- 트리 시트에서 떨어져 있는 몇몇 행을 사용자가 알아볼 수 있게 선택된 것처럼 표시하려면 어떻게 하나요? 가능한 기능이 있나요?

**답변**

떨어져 있는 행들을 javascript로 선택하게 하는 기능은 없습니다. 대신 `RowBackColor()`로 해당 행을 칠해 표시하고, 원래 색으로 되돌릴 때는 `GetDataBackColor()`로 기본 색상을 얻어 칠합니다.

**키워드**: RowBackColor, GetDataBackColor, 트리 시트, 행 선택 표시

---

### [API-0274] 대기(검색중) 이미지를 원하는 시점에 표시하고 숨기려면 어떻게 하나요? (ShowProcessDlg)

**질문**

- UsrWaitImage 속성 대신 시트 중앙에 대기 이미지를 원하는 시점에 직접 표시하고 숨기는 메소드가 있나요?
- '검색중입니다' 이미지가 시트에 데이터를 로드하는 시점에 표시되는데, 별도의 데이터 조회 시점에 표시하려면 어떻게 하나요?

**답변**

`ShowProcessDlg()`와 `HideProcessDlg()` 메소드로 시트 중앙에 대기중 이미지를 출력하고 숨길 수 있습니다. 단, 대기 이미지는 비동기일 때만 띄울 수 있습니다. 상세한 사항은 해당 메소드의 매뉴얼을 참고합니다.

**키워드**: ShowProcessDlg, HideProcessDlg, UsrWaitImage, 대기 이미지, 검색중

---

### [API-0275] 조회 후 전체 행을 도는 for 반복문에서 mySheet.length를 쓰면 동작하지 않습니다

**질문**

- 조회 완료 후 전체 행만큼 돌리는 for 반복문이 동작하지 않습니다. 반복 조건에 시트 객체의 length를 사용하고 있는데 무엇이 문제인가요?

**답변**

반복 조건에 `mySheet.length`를 사용하면 반복문이 동작하지 않습니다. `for(var row=1;row <= mySheet.length;row++)` 대신 `mySheet.LastRow()`를 사용하도록 바꾸면 해당 반복문이 동작합니다.

**키워드**: LastRow, length, for 반복문, 전체 행 순회

---

### [API-0276] Enter 키 동작을 코드로 발생시키는 API가 있나요? 멀티라인 셀에서 Enter 시 새 줄이 되게 하려면?

**질문**

- Enter 키를 누른 것과 동일하게 동작하도록 프로그램에서 호출할 수 있는 API가 있나요?
- 멀티라인 셀에서 Enter 시 새 줄이 되도록 GetEditEnterBehavior("newline")을 호출했는데 동작하지 않습니다. 왜 그런가요?

**답변**

Enter 키 입력처럼 동작하게 하는 API는 제공되지 않습니다.
`GetEditEnterBehavior`는 Enter 키의 동작을 확인하는 메소드입니다. Enter 키 동작을 바꾸려면 `SetEditEnterBehavior("newline")`으로 설정해야 합니다.

**키워드**: SetEditEnterBehavior, GetEditEnterBehavior, newline, Enter 키, 멀티라인

---

### [API-0277] ActiveX에서 마이그레이션할 때 IBSheet7에 없거나 대체해야 하는 함수·속성은? (Redraw, EvalDateDiff, RowStatus 등)

**질문**

- ActiveX에서 마이그레이션한 코드에서 Redraw를 사용하고 있는데 IBSheet7에서도 사용할 수 있나요?
- ActiveX 버전에서 사용하던 EvalDateDiff, RowStatus 함수를 대체할 수 있는 함수나 방법이 있나요?
- ActiveX 시트의 HeadBackColor, HeadFontColor, HeadRowHeight, DataBackColor 등 속성은 IBSheet7에서 어떤 API로 대응하나요?
- ActiveX 화면을 IBSheet7로 변환했는데 잘 동작하지 않습니다. 함수명을 호출할 때 주의할 점이 있나요?

**답변**

- 함수명 호출 시 get과 set을 구분해서 호출해야 합니다. 구분하지 않으면 변환한 화면이 제대로 동작하지 않습니다. 값을 추출할 때는 Get, 부여할 때는 Set으로 시작합니다.
- `Redraw`는 사용되지 않으며 `RenderSheet` 기능으로 대체합니다.
- `EvalDateDiff`를 대체할 만한 함수는 없으므로 직접 구현해야 합니다.
- `RowStatus` 함수는 없으며 대신 `cellvalue`로 처리해야 할 것 같습니다.
- 속성 대응: `HeadFontBold`는 `Get/SetHeaderFontBold`, `HeadRowHeight`는 `Get/SetHeaderRowHeight()`, `HeadBackColor`는 `Get/SetHeaderBackColor()`, `HeadFontColor`는 `Get/SetHeaderFontColor()`, `DataRowHeight`는 `Get/SetDataRowHeight()`, `DataBackColor`는 `Get/SetDataBackColor()`입니다.
- `OutLineColor`, `InLineColor`와 `SelectFontcolor`, `SelectBackColor`, `MultiSelection`, `MassOfSearch`, `ScrollTrack` 속성은 지원하지 않습니다.

**키워드**: Redraw, RenderSheet, EvalDateDiff, RowStatus, SetHeaderBackColor, SetDataRowHeight, ActiveX 마이그레이션

---

### [API-0278] ActiveX에서 쓰던 시트 간 컬럼 복사(copy2SheetCol)나 폼→시트 복사 함수는 IBSheet7에 있나요?

**질문**

- IBSheet3의 copy2SheetCol 함수처럼 시트 데이터를 컬럼 단위로 다른 시트의 컬럼에 복사해 붙여넣는 함수가 IBSheet7에도 있나요?
- ActiveX에서 폼에 있는 데이터를 시트로 복사하는 함수를 제공받아 사용했는데, IBSheet7에도 같은 기능을 하는 함수가 있나요?

**답변**

- 컬럼 단위 복사: 비공개 함수이지만 ActiveX 마이그레이션용으로 `Copy2SheetCol`이 구현되어 있습니다. 인자는 targetSheet, srcColumns, destColumns, startRow, endRow, destRow, addType 등입니다. addType 0은 덮어쓰기(대상 행이 부족하면 종료), 1은 덮어쓰고 부족한 행 추가, 2는 기존 데이터 아래에 덧붙이기입니다. `RaiseChangeEvent`로 OnChange 발생 여부를 정합니다.
- 폼 → 시트 복사: `ibsheetinfo.js`에 `IBS_CopyForm2Sheet` 함수가 있습니다.

**키워드**: Copy2SheetCol, IBS_CopyForm2Sheet, addType, RaiseChangeEvent, ibsheetinfo.js, 컬럼 복사

---

### [API-0279] IBSheet8의 setAttribute에 해당하는 기능은 IBSheet7에서 어떤 함수인가요?

**질문**

- IBSheet8에서 쓰던 setAttribute와 같은 기능을 IBSheet7에서는 어떤 함수로 사용해야 하나요?

**답변**

IBSheet8의 `setAttribute`와 같은 기능은 IBSheet7에서 `SetColProperty`와 `InitCellProperty` 함수를 이용해 사용할 수 있습니다.

**키워드**: setAttribute, SetColProperty, InitCellProperty, IBSheet8

---
