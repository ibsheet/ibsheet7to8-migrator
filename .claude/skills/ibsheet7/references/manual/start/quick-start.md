# Quick Start


## 1. ibsheet7 설치
`IBSheet7` 를 사용하기 위해 다음 js 파일들을 import 합니다. (`ibsheet.css 파일은 ibsheet.js 파일에서 자동 참조함으로 별도 링크를 넣지 않습니다`)

```html
<!-- 라이선스 파일 -->
<script language="javascript" src="/Sheet/ibleaders.js"></script>
<!-- 제품 파일 -->
<script language="javascript" src="/Sheet/ibsheetinfo.js"></script>
<script language="javascript" src="/Sheet/ibsheet.js"></script>
<!-- client import/export 기능 파일 -->
<script language="javascript" src="/Sheet/ibexcel.js"></script>
```
위 파일들의 자세한 용도와 기능은 [파일 구성](/docs/intro/files) 참고

## 2. IBSheet7 객체 생성

### body 태그 안에서 함수 호출
js파일을 추가한 뒤에 IBSheet 객체를 화면에 추가합니다.<br>
`ibsheetinfo.js` 에 있는 `createIBSheet('sheetid', 'width', 'height', 'lang')` 함수를 이용하여 추가합니다.

```html
<body>
  <table class='sheet_table'>
    <tr>
      <td>
        <script language="javascript">
          //IBSheet 객체 생성 ( 객체 id , 너비 , 높이 )
          createIBSheet("mySheet", "750px", "400px");

          // 아래와 같이 lang 인자를 사용하는 경우에는 인자를 확장자로 하는 ibmsg 파일이 반드시 존재해야 합니다.
          createIBSheet("mySheet", "750px", "400px", "en");
        </script>
      </td>
    </tr>
  </table>
</body>
```

## 3. 초기항목 설정
객체가 생성된 후 페이지가 onload 될 때 시트의 초기 항목을 설정합니다. <br>
아래와 같이 body 태그의 onload 이벤트에서 IBSheet7에 대한 초기 항목을 설정할 함수를 정의 합니다.<br>

```html
<body onload="기본 속성을 설정할 함수">
```

body 태그의 onload 이벤트에서 정의하는 것은 페이지의 로드가 완료 되는 시점에 IBSheet7의 객체도 생성이 완료되므로 그 때 IBSheet7의 제공 기능들을 사용할 수 있기 때문에 `객체 생성 전에 IBSheet 기능을 사용하려고 한다면 자바스크립트 오류가 발생 할 수 있습니다.`

### 시트 기본 설정

```javascript
IBSheet객체.SetConfig(cfg);

//Example
var cfg= { FrozenCol:3 , MergeSheet:msPrevColumnMerge + msHeaderOnly };

IBSheet객체.SetConfig(cfg);
```

시트 전반적인 기능 설정 (조회방식, 머지유형, 소팅 개수, 합계행위치 등)을 합니다.<br>
전달되는 인자의 형식은 `JSON` 타입으로 설정 하고자 하는 정보를 `JSON` 형태로 구성하여 전달합니다.<br>
세부 정보는 [SetConfig method](/docs/funcs/init/SetConfig) 설명 참조

### 헤더 정보 설정

```javascript
IBSheet객체.InitHeaders(headers, info);

//Example
var headers = [
  {Text:"사원정보|사원정보|사원정보", Align:" Center"},
  {Text:"사원명|사원번호|입사일", Align:" Center"}
];
var info = {Sort:1, ColMove:1, ColResize:0, HeaderCheck:0};

IBSheet객체.InitHeaders(headers, info);
```

헤더행의 타이틀과 해더의 기능(소팅,이동,크기조정 등) 사용여부를 설정합니다.<br>
세부 정보는 [InitHeaders method](/docs/funcs/init/InitHeaders) 설명 참조

### 컬럼 정보 설정

```javascript
IBSheet객체.InitColumns(cols);

//Example
var cols = [
  {Type:"Text", Width:100 ,SaveName:"sText", Align:"Left"},
  {Type:"Int", Width:80 ,SaveName:"sNumber", Format:"NullInteger"}
];
IBSheet객체.InitColumns(cols);
```

컬럼에 대한 기본 속성(타입, 포멧, 너비, 정렬 등) 을 설정합니다.<br>
자세한 속성은 [InitColumns method](/docs/funcs/init/InitColumns) 설명 참조

### 시트 초기화 단순화
시트 초기화시 헤더에 타이틀과 각 컬럼의 속성이 각각 `InitHeader`와 `InitColumns` 메서드를 통해 설정되어 컬럼이 많아지는 경우 타이틀에 해당하는 컬럼을 찾기가 어려운 점이 있습니다. <br>
IBSheet7에서는 위 방법 외에 하나의 함수를 통해 초기화 하는 방법도 제공합니다. <br>
Header의 경우 `|` 구분자 뿐만 아니라, String 배열 형태로도 구현이 가능하고,`HeaderHtml` 속성을 이용하여 Html 타입의 헤더를 구현 할 수 있습니다.

```javascript
//배열 선언
var initdata = {};

//SetConfig
initdata.Cfg = {SearchMode:smLazyLoad,Page:50,MergeSheet:msHeaderOnly};

//InitHeaders의 두번째 인자
initdata.HeaderMode = {Sort:1,ColMove:1,ColResize:1,HeaderCheck:0};

//InitColumns + Header Title
initdata.Cols = [
  {Header:"결재여부|결재여부",Type:"CheckBox",Width:80,SaveName:"A",ColMerge:0},
  {Header:"신청인|신청인",Type:"Text",Width:80,ColMerge:1},
  {Header:"신청일자|신청일자",Type:"Date",Width:100,Format:"Ymd"},
  {Header:"신청금액|신청금액",Type:"AutoSum",Width:85,SaveName:"B",Format:"Integer"},
  {Header:"기간|시작일",Type:"Date",Width:100,SaveName:"C",Format:"Ymd",ColMerge:0},
  {Header:"기간|종료일",Type:"Date",Width:100,SaveName:"D",Format:"Ymd",ColMerge:0},
  {Header:"시간|시작",Type:"Date",Width:100,Format:"Hm",ColMerge:1,Align:"Center"},
  {Header:["시간", "종료"],Type:"Date",Width:100,Format:"Hm",ColMerge:1,Align:"Center"}
];

//초기화
IBS_InitSheet(mySheet, initdata);
```

## 4. 기능 구현하기

### 조회

``` javascript
IBSheet객체.DoSearch(PageUrl, CondParam);
```

[DoSearch](/docs/funcs/search/DoRowSearch) 함수를 이용하여 데이터를 조회 할 수 있습니다.

### 입력

```javascript
IBSheet객체.DataInsert(Row,Level);
```

[DataInsert](/docs/funcs/row/DataInsert) 함수를 이용하여 신규 데이터 행을 생성 할 수 있습니다.

### 수정
데이터를 수정하면 Type이 `Status`인 컬럼에 `"수정"` 이라고 표시하고 내부적으로 `"U"` 라는 코드 값을 갖습니다.<br>
기존 상태가 "입력" 이라면 기존 상태 그대로 유지 하며, 기존 상태가 "삭제" 인 경우 모든 데이터는 수정할 수 없습니다.<br>
`주의` 수정 상태를 기록하기 위해서는 반드시 Type이 `Status`인 컬럼이 존재해야 합니다.

### 삭제
Type이 `DelCheck` 인 컬럼을 CheckBox를 Check 할때 Status인 컬럼에 `"삭제"` 라고 표시하고 내부적으로 `"D"` 라는 코드값을 갖습니다.<br>
기존 상태가 "입력" 인 행을 Check하면 DB에 없는 데이터이므로 바로 행을 제거합니다. Type이 Status인 컬럼과 DelCheck 인 컬럼이 존재 할 경우 처리 가능합니다.

### 저장

```javascript
IBSheet객체.DoSave(PageUrl, SubParam, Col);
```

[DoSave](/docs/funcs/save/DoSave) 함수를 이용하여 데이터를 저장할 수 있습니다.<br>
데이터의 트랜잭션 상태 또는 특정 컬럼 데이터에 따라 저장 처리합니다.

### 소계

``` javascript
IBSheet객체.ShowSubSum(info);
```

[ShowSubSum](/docs/funcs/sum/ShowSubSum) 함수를 이용하여 특정 컬럼을 기준으로 조회 데이터 사이에 소계 행을 삽입 할 수 있습니다.

### 엑셀다운로드

```javascript
IBSheet객체.Down2Excel(params);
```

[Down2Excel](/docs/funcs/export/Down2Excel) 함수를 이용하여 시트의 내용을 엑셀 파일로 다운로드 할 수 있습니다.<br>
이 함수의 동작 방식은 `ibsheet.cfg` 파일에 `ExportMode` 설정 값을 따릅니다.

### 이벤트 사용

```javascript
function IBSheet객체_이벤트명(params) {}

// Example
// IBSheet 객체명이 "mySheet이고 OnChange 이벤트를 사용
function mySheet_OnChange(row, col, value) {
  if(mySheet.ColSaveName(col) == "DT_price" && value> 5000) {
    alert("가격 제한 범위를 넘어셨습니다.");
    mySheet.ReturnCellData(row, col);
  }
}
```
I
IBSheet7의 이벤트는 사용하는 `IBSheet객체명_이벤트이름()`의 형태로 스크립트 함수를 만들고, 이벤트 발생시 행해야 하는 로직을 함수 안에 기술하여 사용합니다.

## 5. 조회 XML 구현하기
조회 함수를 호출하면 인자로 넘긴 URL로 페이지에 연결합니다. XML 형태로 구성된 페이지의 내용을 읽어 들여 데이터로 표현합니다.<br>
![s](/assets/imgs/ibsheet7_xml.png)<br>
[**조회된 내역이 있는 경우**]

`XML 생성시 주의사항`
-	XML의 인코딩 타입은 반드시 `UTF-8`로 해야하며, 그렇지 않으면 한글등을 데이터로 사용할 때 글자가 깨지게 됩니다.
-	XML의 내용 중 HTML 관련 태그 (html, body, input 등)나 Script 관련 태그(JavaScript, alert 등)는 사용 불가능하며 만약 사용 시 XML오류가 발생합니다.
-	다음과 같은 특수 문자는 사용 불가능 하므로 변환 문자로 변환하여 XML을 생성합니다. `& -> &amp;, < -> &lt;, > -> &gt;`

## 6. 저장 XML 구현하기
저장 함수를 호출하면 인자로 넘긴 URL로 페이지에 연결합니다. <br>
저장은 `<XML>` 형식을 사용하지 않고 기존 param 형식을 사용합니다.<br>
저장 처리 후 처리 결과는 XML 형태로 구성되며 페이지의 내용을 읽어 들여 결과를 표현합니다.<br>
![s](/assets/imgs/ibsheet7_savexml.png)<br>
[**저장 처리 결과 표시 형태**]

## 7. 조회 JSON 구현하기
조회 함수를 호출하면 인자로 넘긴 URL로 페이지에 연결합니다. JSON 형태로 구성된 페이지의 내용을 읽어 들여 데이터로 표현합니다.<br>

```json
// savename을 사용하는 예
{
  Etc : {"USER":"황상구","CRTDATE":"20130120"},
  Message:"조회가 정상 처리되었습니다.",
  Data: [
    {SANO: 070712, SANM:'홍길동', CLSCD:'5',DEPTCD:'054'},
    { SANO: 020457, SANM:'김대한', CLSCD:'4',DEPTCD:'040'}
  ]
}
```
`주의` 조회 JSON을 구현할 때에는 `대소문자 구분`을 정확하게 해야 합니다.<br>

## 8. 저장 JSON 구현하기
저장 함수를 호출하면 인자로 넘긴 URL로 페이지에 연결합니다. <br>
저장은 JSON 형식을 사용하지 않고 기존 `param형식`을 사용합니다.<br>
저장 처리 후 처리 결과는 JSON 형태로 구성되며 페이지의 내용을 읽어 들여 결과를 표현한다.

```json
{
  Result : {Code:0, Message:'저장되었습니다.'}
}
```

