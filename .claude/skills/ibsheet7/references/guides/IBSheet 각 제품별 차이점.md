# IBSheet 각 제품별 차이점

IBSheet 7 개발 가이드(기존 ActiveX , 실버라이트 사용자)

제품 개발,사용에 있어 달라진 점을 정리

1. 제품 파일 구성(배포되는 파일)

IBSheet3(AcitveX)

IBSheet5(SilverLight)

IBSheet7(html4)

IBSheet.CAB

IBSheetInfo.js

IBSheet.xap

createIBSheet.js

IBSheetInfo.js

ibsheet.js

ibsheetinfo.js

ibsheet.cfg

ibmsg

Main(폴더)

IBSheet 7 파일별 사용 용도는 개발자가이드 3장 부분 참고.

2. 제품 화면 삽입

<w:tblPr><w:tblStyle w:val="-11"/><w:tblW w:w="0" w:type="auto"/><w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr><w:tblGrid><w:gridCol w:w="3074"/><w:gridCol w:w="3075"/><w:gridCol w:w="3075"/></w:tblGrid><w:tr w:rsidR="00CA36CD" w:rsidTr="007E712B"><w:trPr><w:cnfStyle w:val="100000000000" w:firstRow="1" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" w:oddVBand="0" w:evenVBand="0" w:oddHBand="0" w:evenHBand="0" w:firstRowFirstColumn="0" w:firstRowLastColumn="0" w:lastRowFirstColumn="0" w:lastRowLastColumn="0"/></w:trPr><w:tc><w:tcPr><w:cnfStyle w:val="001000000000" w:firstRow="0" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:oddVBand="0" w:evenVBand="0" w:oddHBand="0" w:evenHBand="0" w:firstRowFirstColumn="0" w:firstRowLastColumn="0" w:lastRowFirstColumn="0" w:lastRowLastColumn="0"/><w:tcW w:w="3074" w:type="dxa"/></w:tcPr><w:p w:rsidR="00CA36CD" w:rsidRDefault="00CA36CD" w:rsidP="007E712B"><w:r><w:rPr><w:rFonts w:hint="eastAsia"/></w:rPr><w:t>IBSheet3(AcitveX)

IBSheet5(SilverLight)

IBSheet7(html4)

<script>

//업체마다 조금씩 다름

makeIBSheet( 객체id);

</script>

<script>

//모든 업체 동일

createIBSheet(객체id,너비,높이);

</script>

<script>

//모든 업체 동일(ibsheetinfo.js에 정의됨)

createIBSheet(객체id,너비,높이);

</script>

3. 시트 초기화

IBSheet3(AcitveX)

body onload이벤트에서 초기화 메서드 호출

with(mySheet){

  //초기화 메서드,프로퍼티 약 11가지 설정  SheetWidth = 760;

  InitHostInfo( ...);  MergeSheet = msAll;  ......

}

IBSheet5(SilverLight)

IBSheet3와 비슷하나 body의 Onload대신 자체 이벤트를 통해서 초기화

with문을 사용하지 못하여 각 메서드 프로퍼티를 설정할때 객체 id를 붙여 줘야 함.

ex) mySheet.Editable = true;

    mySheet.MergeSheet = msHeaderOnly;

IBSheet7(html4)

body onload 이벤트를 통해 초기화 메서드를 호출

초기화 메서드를 간소화 하여 딱 3개의 메서드 호출로 시트를 초기화.SetConfig(cfg);InitHeaders(header);InitColumns(cols);

4. 엑셀 다운/업로드 관련 방식의 변경

IBSheet3(AcitveX)

IBSheet5(SilverLight)

IBSheet7(html4)

Down2Excel(); 메서드를 호출하면 클라이언트PC에 설치된 excel.exe 프로그램을 실행하여 시트의 데이터를 엑셀에 복사함. (클라이언트에 반드시 ms-excel 이 설치되어야 하며, 엑셀과 관련한 다양한 기능을 제공함)

보안 강화로 인해 엑셀파일을 내리려면 시트위에 다운버튼이 존재해야 함. 

다운 버튼을 클릭하면 내부적으로 xls 파일을 생성하여 클라이언트가 지정한 위치에 저장함(클라이언트에 ms-excel이 설치되어 있지 않아도 됨)

다운 방식은 시트의 데이터를 ajax로 서버로 전송한 뒤, 서버에서 Apache POI lib를 이용하여 엑셀파일을 생성하여 클라이언트로 내려주는 방식과 HTML5에 File Api를 이용하여 javascript를 이용하여 엑셀파일을 생성하는 방식으로 제공됨.

5. 기타 개발시 변경사항.

가. 프로퍼티의 사용법 변경(Getter,Setter 사용형태로 변경)

IBSheet3(AcitveX)

IBSheet5(SilverLight)

IBSheet7(html4)

READ:

alert(mySheet.CellValue(1,3));

WRITE:

mySheet.CellValue(1,3)="AB";

READ:

alert(mySheet.CellValue(1,3));

WRITE:

mySheet.CellValue(1,3,"AB");

READ:

alert(mySheet.GetCellValue(1,3));

WRITE:

mySheet.SetCellValue(1,3,"AB");

단. Read만 가능하거나 Write만 가능한 경우에는 Get/Set 없이 함수형태로 사용함

ex)

 var lr = mySheet.LastCol();  

 var frow = mySheet.FindText(lr,"찾는 문자");

나. json 사용.

시트 메서드의 인자로 json을 적극 사용

ex) 

//헤더 설정

//2줄 헤더타이틀 설정(json 객체)

var headers = [ 

{Text:"상태|삭제|직원정보|직원정보|직원정보", Align:" Center"} ,

{Text:"상태|삭제|직원명 |직원번호|입사일", Align:" Center"}

];

//헤더 기능 설정(json 객체)

var info = {Sort:1, ColMove:1, ColResize:0, HeaderCheck:0};

mySheet.InitHeaders(headers,info);

다. true/false 대신 1/0 사용

 위에 소수 중 info 객체 참조

라. 조회/저장 xml과 더불어 json 형태 지원

기존 조회 xml (일부 attribute만 지원함)

<?xml version="1.0"?>

<SHEET>

  <DATA>

    <TR>

      <TD>가나다</TD>

      <TD>ABC</TD>

    </TR>

    <TR>

      <TD>123</TD>

      <TD>456</TD>

    </TR>

  </DATA>

</SHEET>

JSON 형태

{DATA:[

  { "컬럼명 혹은 C1":'가나다', "컬럼명 혹은 C2":'ABC', },

  { "컬럼명 혹은 C1":'123', "컬럼명 혹은 C2":'456', }

]}

마. 이벤트 사용방법 변경

이벤트 사용방법이 IBSheet5와 유사하게 변경됨.

IBSheet3(ActiveX 의 이벤트 사용)

<script for="mySheet" event="OnChange(Row,Col,Value)">

  alert( Row + ","+ Col +":"+Value);

</script>

IBSheet5,IBSheet7(객체명_이벤트명 형태의 함수 호출로 변경)

function mySheet_OnChange(Row,Col,Value){

  mySheet.SetCellValue(0,1,"abc",false);

}