# IBSheet7 버전 업그레이드 주의 사항[서버모듈 2.0]

IBSheet 제품 Update

IBSheet 제품 업그레이드 문서

기술지원/(02)1644-5615

※ 기술상담 및 내용문의는(주)아이비리더스로 해주십시오.

support@ibleaders.co.kr

Chapter 1. IBSheet 배포 파일 및 내용

IBSheet 구조 이해 하기

IBSheet를 업데이트 하기 위해서는 시트의 구조를 먼저 이해해야 한다.

1.1 IBSheet 구조

js

서버모듈

java

닷넷

Main(폴더)

DirectDown2Excel.jsp

DirectDown2Excel.aspx

Ibleaders.js

DirectLoadExcel.jsp

DirectLoadExcel.aspx

ibmsg

Down2Excel.jsp

Down2Excel. aspx

Ibsheet.cfg

Down2Pdf.jsp

Down2Pdf.aspx

Ibsheet.js

LoadExcel.jsp

LoadExcel.aspx

Ibsheetinfo.js

LoadText.jsp

LoadText.aspx

IBSheet7~.jar

IBSheet7~.dll

각 파일의 상세 내용은 아래와 같다.

파일명

내용/역할

Ibleaders.js

라이선스 파일 (IBSheet7 제품군 공통 파일. 단, 2016 이후 버전들만 적용)

Ibsheet.js

IBSheet 엔진 js 파일

ibsheetinfo.js

시트 초기화시 필요한 함수 및 개발시 유용하게 사용할 수 있는 js함수를 담아둔 파일(지속적인 업데이트 예정)

ibmsg

IBSheet에서 사용하는 시스템 메시지 파일

ibsheet.cfg

모든 시트에 전역으로 설정할 값을 정의하기 위한 파일.

Main

기본 테마 정보를 담고 있는 폴더

Down2Excel

엑셀다운로드 전용인 Down2Excel 메소드를 적용하기 위한 서버쪽 응용 프로그램 파일

LoadExcel

엑셀로딩 전용인 LoadExcel 메소드를 적용하기 위한 서버쪽 응용 프로그램 파일

DirectLoadExcel

엑셀로딩 전용인 LoadExcel 메소드와 달리 DirectLoadExcel 메소드와 연계되는 서버쪽 파일. LoadExcel 처럼 엑셀 파일을 서버로 올리는 것은 동일하지만, 엑셀 파일의 분석 결과를 그리드로 보내지 않고, DB 에 바로 적용할 수 있다. 엑셀파일의 내용은 forward 페이지로 List(Map)형태로 전달되고 forward 페이지에서 비지니스 로직을 수행하면 된다.

DirectDown2Excel

대용량의 데이터를 엑셀파일형태로 내리기 위해서, 시트에서 데이터를 서버로 전달하지 않고, DB에서 조회한 테이터를 바로 엑셀파일로 내리게 하기 위한 파일

Down2Text

시트의 파일을 txt  형태로 내리게 하기 위한 파일

LoadText

txt 파일의 내용을 시트위에 올리기 위한 파일

Chapter 2. IBSheet 적용하기

1. ibsheet .js적용

1.1 ibsheet.js 파일 적용

배포한 ibsheet.js 파일을 반영하고자 하는 프로젝트의 위치에 붙여 넣기 한다.

1.2 디자인 적용하기(ibsheet.css)

ibsheet는 기본적으로 Main 폴더의 ibsheet.css 파일을 읽어 시트에 디자인을 반영한다. 개발당시 이 파일을 수정하여 사용하지 않았다면 그냥 덮어쓰기 해도 상관없지만 수정하여 사용 하였다면 파일비교를 통하여 최신의 내용만 적용하여야 한다.

예시) 기존에 그림과 같은 디자인으로 표현 됐는데 ibsheet.css 파일을 그냥 덮어쓰면 디자인이 달라지는 불상사를 겪게 된다.

파일비교를 하지 않고 덮어 쓴 경우

만약 Theme를 사용한다면 Theme폴더의 디자인도 같이 반영해야 한다.

Theme 사용법은 도움말을 참조 하면 된다.( 3. Theme 만들기)

* 파일 비교하기가 너무 힘들다면 기존 사용하고 있는 css 파일을 기술지원팀으로 

보내주면 작업하여 다시 배포 가능함(단 다소 시일이 걸릴 수 있음)

최신의 기능을 사용하지 않으면 ibsheet.css 파일 업그레이드 필요 없지만 아래 내용은 꼭 적용 필요

헤더 소팅 이미지 처리방식 변경(CSS를 변경하지 않는 경우 소트 이미지가 정상적인 위치에 표시되지 않음)

추가 : .GMSort {display:block; float:right; margin:2px 2px 0; width:7px;}

삭제  : 

u.GMSort0Right,u.GMSort1Right,u.GMSort2Right,u.GMSort3Right,u.GMSort4Right,u.GMSort5Right,u.GMSort6Right 

.GMSort0Right,.GMSort1Right,.GMSort2Right,.GMSort3Right,.GMSort4Right,.GMSort5Right,.GMSort6Right

적용버전 : 7.0.0.0-20130705-19

시트의 달력이 깨지는 경우

// 변경전

.GMPickBL {float:left; background:url(d_left.gif) no-repeat 50%; }

.GMPickBR {float:right; background:url(d_right.gif) no-repeat 50%; }

// 변경후

.GMPickBL {float:left !important; background:url(d_left.gif) no-repeat 50%;}

.GMPickBR {float:right !important; background:url(d_right.gif) no-repeat 50%;}

적용버전 : 7.0.3.1-20141002-10

IE, FF 에서 틀고정시 좌우의 행 높이가 맞지 않는 현상

GMCell 클래스에 line-height: 1.1; box-sizing: border-box; 추가

적용버전 : 7.0.13.91-20170713-13

1.3 메시지 적용하기(ibmsg)

ibsheet에서 띄우는 메시지는 모두 ibmsg 파일에서 관리한다.

ibmsg 파일도 개발당시 변경하여 사용 하였다면 파일비교를하여 최신의 내용만 적용한다

그리고 ibmsg 파일을 여러개 지정하여 사용 할 수 있는데 이 방식을 사용하였다면 모두 최신의 내용으로 업데이트 하여야 한다.

도움말 : ‘4.개발 절차  4.2 IBSheet 객체를 생성’ 부분을 확인하면 된다.

최신의 기능을 사용하지 않아도 되면 ibmsg 파일 업그레이드 필요 없음

2. 서버모듈 적용

시트의 내용을 엑셀로 다운로드 하거나 엑셀 파일의 내용을 시트로 업로드시에 제공되는 모듈 이다. 그 모듈들도 같이 업데이트 한다.

jdk1.5 이상을 사용해야 한다.

2.1 jsp파일 적용하기

ibsheet.cfg 파일에 모듈이 위치한 경로가 있다.

해당 부분에 배포한 jsp파일을 적용하면 되는데 이 파일도 파일비교를 통하여 적용한다.

이유 : jsp파일에 사용자 지정 변수가 있고, DRM을 적용하였을 수 있기 때문

2.2 jar 적용하기

Poi 라이브러리를 이용하여 개발됐기 때문에 해당 프로젝트에 반드시 Poi 3.13 버전의 라이브러리가 있어야 한다. 

Poi 라이브러리 잘 적용한 예)

같은 프로젝트에 버전이 다른 Poi 라이브러리가 동시에 존재하면 안된다.

같은 버전이 존재하면 Was가 구동될 때 랜덤하게 읽어 들이므로 의도치 않은 에러를 만나게 되므로 최상의 라이브러리 하나만 존재해야 한다.

Poi 라이브러리 외에도 batik-all-xml.jar, commons-codec-1.10.jar, commons-logging-1.1.3.jar 파일도 반드시 존재 해야 한다.(batik-all-xml.jar 파일은 차트 다운로드나, 엑셀 다운로드시 이미지 컬럼이 포함된 경우 반드시 필요하다.

잘못적용한 예) Poi라이브러리가 여러 개 중복되어 있음

Down2Excel.jsp파일을 보면 아래와 같은 import 하는 부분이 있다

page import="com.ibleaders.ibsheet.IBSheetDown" 이 내용은 IBLeaders에서 배포 하는 IBSheet7*.Jar 파일에 포함되어 있다

마찬가지로 기존에 사용하는 Jar을 삭제 하고 배포 받은 IBSheet7*.Jar을 적용하면 된다.

항상 최신의 jar 하나만 적용되어 있어야 한다. 

최신의 기능을 사용하지 않아도 되면 서버모듈 업그레이드 필요 없음

Chapter 3. IBSheet 적용 확인하기

1. ibsheet .js 적용 확인

1.1 ibsheet.js 적용 확인하기

위의 내용을 모두 적용 후 적용이 잘 되었는지 확인한다

브라우저 캐쉬를 모두 삭제 후 시트가 있는 화면에 접속하여 브라우저 콘솔(F12)에 시트 버전 확인 함수를 호출 한다.

[시트가 있는 화면 선택]

[Grids[0].Version() 호출]

배포한 파일의 버전과 동일 하다면 ibsheet.js는 적용이 잘 된 것이다.

2. 서버모듈 확인

2.1 서버모듈 적용 확인하기

Down2Excel.jsp에 version 확인 함수를 호출 한 후 다운로드 하여 본다.

System.out.println(com.ibleaders.ibsheet.util.Version.getVersion())

콘솔에 찍히는 내용에 새로 적용한 jar 파일이 잘 표시가 되고 에러없이 다운로드/업로드 된다면 잘 적용된 것이다.

Chapter 4. IBSheet 적용 후 주의 사항

개요

오래 전 버전에서 최신 버전으로 업그레이드 시 변경된 내용과 관련하여 고려해야 하는 부분을 정리한 내용이다.

라이선스 체크 방식 변경(중요)

제품의 버전이 20160101 부터 라이선스 체크 방식이 변경되었다.

ibsheet.js 파일과 동일한 위치에 license 파일에서 라이선스 키를 읽어서 라이선스 체크했는데 ibleaders 라는 변수에서 체크 하는 방식으로 변경 되었다. 

라이선스 적용 하기.pdf 문서를 참고하여서 라이선스를 적용하면 된다.

GetCellValue나 GetColHidden등 Get 함수 사용시 리턴값 변경

기존에 GetCellValue나 GetColHidden의 인자로 존재하지 않는 Row나 Col index를 넣는 경우 공백(“”)이나 undefined를 리턴하였으나, 20140327-16-M 이후 버전부터는 -1 을 리턴 하도록 변경됨.

적용 버전

7.0.0.0-20140327-16-M 이후 버전

<w:rPr><w:rFonts w:ascii="돋움" w:eastAsia="돋움" w:hAnsi="돋움" w:cs="Arial"/><w:b/><w:bCs/><w:color w:val="000000"/><w:kern w:val="0"/><w:szCs w:val="20"/></w:rPr></w:pPr><w:r w:rsidRPr="00C366B0"><w:rPr><w:rFonts w:ascii="돋움" w:eastAsia="돋움" w:hAnsi="돋움" w:cs="Arial"/><w:b/><w:bCs/><w:color w:val="000000"/><w:kern w:val="0"/><w:szCs w:val="20"/></w:rPr><w:t>마이그레이션 방안

ibsheet.cfg 파일에 InvalidArgsReturnValue라는 속성을 통해 리턴 값을 정의할 수 있음.

ex) 이전처럼 공백이 리턴되도록 설정한다.

<Cfg>

…..

 InvalidArgsReturnValue =""

….

</Cfg>

이벤트 try~catch 제거

기존에 IBSheet에서 제공하는 이벤트는 내부적으로 try/catch가 묶여 있어, 이벤트함수 안에 오류코드가 있어도 스크립트 오류를 표현하지 않았으나, 이렇게 이벤트를 try/catch로  묶는것이 성능면에서 좋지 못한 점을 발견하여 현재 배포되는 버전에는 try/catch가 모두 제거됨.

따라서 이전에는 이벤트 안에 오류가 있어도 스크립트 오류가 났는지 모르고 지나쳤을 수 있으나 최신버전으로 업그레이드하면 이전의 오류가 모두 보여지게 됨.

적용 버전

20130605-20 이후 버전부터 적용

마이그레이션 방안

Ibsheetinfo.js 파일의 createIBSheet 함수에 아래 빨간 영역 추가

/*

* IBSheet를 생성(호출 위치에서 동적 생성)

*/

function createIBSheet(sheetid, width, height, locale) {

   var div_str = "";

   if (!locale) locale = "";

   Grids.Locale = locale;

   div_str += "<div id='DIV_" + sheetid + "' style='width:" + width + ";height:" + height + ";'>";

   div_str += "<script> IBSheet('<ibsheet Sync=\"1\" Data_Sync=\"0\"> </ibsheet>',\"DIV_" + sheetid + "\", \"" + sheetid + "\"); </script>"

   div_str += "</div>\n";

   //<![CDATA[

   document.write(div_str);

   //]]>

   //아래내용 추가

   window[sheetid]._makeEvent = function(func) {

            try{

              return window[func].apply(null, Array.prototype.slice.call(arguments, 1));

            }catch(e){  }

   }    

}

CheckBox 타입 사용시 조회 데이터의 매핑

이전 버전에서는 "CheckBox"타입을 갖는 컬럼에 대해 조회 값으로 0,false,공백("")을 제외한 모든 값을 체크로 표시하였는데, 이렇게 다양한 데이터를 모두 체크로 하다 보니 유지보수에 혼돈이 생길 우려가 있어, 최신 버전에서는 1,true 는 체크 나머지는 모두 uncheck 하게 변경됨

적용버전

20130322-18 이후 버전부터 적용

마이그레이션 방안

ibsheet.cfg파일에서 TrueValue,FalseValue 설정을 통해 모든 화면의 시트에서 Check,Uncheck 값을 동일하게 관리하는 것을 권장하나, 만약 이것이 여의치 않은 경우에는 ibsheet.cfg 에 아래와 같이 설정한다.

//이전처럼 대부분의 값을 check되도록 설정한다.

<Cfg>

BooleanSettingMode = "1"

….

</Cfg>

Hidden 컬럼에 대한 KeyField 체크 변경

기존 버전에서는 Hidden된 컬럼에 KeyField가 설정되어있는 경우, 저장시 해당컬럼에 공백("")데이터가 존재해도 무시하고 수행되었으나, 현재버전에서는 Hidden된 컬럼에 대해서도 KeyField에 대한 체크를 수행함.

적용버전

7.0.2.0-20140918-17-M 이후버전

마이그레이션 방안

ibsheet.cfg에서 다음과 같이 설정

//이전처럼 Visible 된 컬럼에만 KeyField를 체크한다.

<Cfg>

…..

SaveValidationMode= "1"

….

</Cfg>

RowJson 함수를 제거 하고 RowData 함수가 추가됨

SetRowJson()함수가 몇 가지 문제점이 발견되어 SetRowJson 함수를 메뉴얼에서만 제거하고, 이를 대신하기 위해 개선된 RowData 함수가 추가됨.

적용버전

7.0.5.0-20141204-18-M

마이그레이션방안

마이그레이션 필요 없음

<w:tab w:val="num" w:pos="1200"/></w:tabs><w:ind w:left="800" w:hanging="400"/><w:rPr><w:rFonts w:ascii="돋움" w:eastAsia="돋움" w:hAnsi="돋움" w:cs="Arial"/></w:rPr></w:pPr><w:r><w:rPr><w:rFonts w:ascii="돋움" w:eastAsia="돋움" w:hAnsi="돋움" w:cs="Arial" w:hint="eastAsia"/></w:rPr><w:lastRenderedPageBreak/><w:t>소계 함수 호출 위치 문제

시트 초기화 부분에서 ShowSubSum 함수를 호출할 때 InitColumns 이후에 호출해야 한다. InitColumns 함수 이전에 ShowSubSum를 호출하면 에러를 유발한다.

-에러 내용

Uncaught TypeError: Cannot set property 'NumberSort' of undefined

    at _7WB._7A.rJB (eval at <anonymous> (ibsheet.js:10), <anonymous>:1:1070802)

    at _7WB._7A.cS (eval at <anonymous> (ibsheet.js:10), <anonymous>:1:1446081)

    at eval (eval at <anonymous> (ibsheet.js:10), <anonymous>:1:1445048)

    at _7WB._7A.zEC (eval at <anonymous> (ibsheet.js:10), <anonymous>:1:318295)

    at eval (eval at <anonymous> (ibsheet.js:10), <anonymous>:1:316965)

    at Object._7PB.Finish (eval at <anonymous> (ibsheet.js:10), <anonymous>:1:15487)

    at XMLHttpRequest.eval (eval at AjaxCall (eval at <anonymous> (ibsheet.js:10)), <anonymous>:3:32)

- 해결 방법

var info = [{StdCol:0, SumCols:"3|4|5", AvgCols :"2", ShowCumulate:0, CaptionCol:0} ];

mySheet.SetConfig(cfg);

mySheet.InitHeaders(headers,info);

mySheet.InitColumns(cols);

// InitColumns  이후 showsubsum() 선언

mySheet.ShowSubSum();

적용버전

7.0.13.38-20151229-14-M

마이그레이션방안

마이그레이션 필요 없음

<w:tab w:val="num" w:pos="1200"/></w:tabs><w:ind w:left="800" w:hanging="400"/><w:rPr><w:rFonts w:ascii="돋움" w:eastAsia="돋움" w:hAnsi="돋움" w:cs="Arial"/></w:rPr></w:pPr><w:proofErr w:type="spellStart"/><w:r w:rsidRPr="002A0607"><w:rPr><w:rFonts w:ascii="돋움" w:eastAsia="돋움" w:hAnsi="돋움" w:cs="Arial"/></w:rPr><w:lastRenderedPageBreak/><w:t>Type:"Popup" 컬럼 붙여넣기(Ctrl+V) 문제

Type:"Popup" 로 설정한 컬럼은 기본적으로 편집 불가 컬럼인데 붙여넣기(Ctrl+V)를 허용하고 있어 이를 수정하였다.

기존과 동일하게 붙여넣기가 가능하게 하려면 아래 내용 참고

적용버전

7.0.13.107-20180104-13-M

마이그레이션방안

ibsheet.cfg에서 다음과 같이 설정

//이전처럼 Popup 컬럼에 붙여 넣기를 허용한다.

<Cfg>

…..

UsePopupTypePaste = "1"

….

</Cfg>