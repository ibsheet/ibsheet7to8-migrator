# 파일업로드/다운로드  ***(appendix)***
> 시트의 내용을 엑셀이나,텍스트 파일로 다운로드 하거나, 반대로 파일의 내용을 읽어 시트에 업로드하는 방법에 대해 알아봅니다.

## 필수 파일 요소

업로드/다운로드 작업을 하시려면 아래 파일들을 구비하고 계셔야 됩니다. <br>
서버모듈 1.0인지 서버모듈 2.0인지, POI3 라이브러리를 사용하시는지, POI4 라이브러리를 사용하시는지에 따라 구비하셔야 하는 파일이 다릅니다. <br>
`(cfg) ExportMode: 2`로 설정하시면 서버모듈이 아닌 클라이언트 모듈로 업로드/다운로드 작업을 진행하실 수 있습니다. <br>
이 경우에는 `ibexcel.js` 파일을 정적 파일 소스로 추가해주셔야 합니다. <br>

1. 서버모듈 1.0

|파일명|용도|
|---|---|
|ibsheet7-1.1.x.jar|서버코어모듈|
|poi-3.9-20121203.jar|엑셀 파일 생성/파싱 모듈|
|poi-ooxml-3.9-20121203.jar|엑셀 파일 생성/파싱 모듈|
|poi-ooxml-schemas-3.9-20121203.jar|엑셀 파일 생성/파싱 모듈|
|commons-codec-1.6.jar|엑셀 파일 생성/파싱 모듈| (체크)
|commons-collections4-4.4.jar|컬렉션 프레임워크 모듈|
|commons-compress-1.19.jar|엑셀 파일 압축 관련 모듈|
|commons-logging-1.1.3.jar|로그 모듈|
|commons-math3-3.6.1.jar|수적 기능 모듈|
|dom4j-1.6.1.jar|자바에서 XML 문서를 다루기 위한 모듈| (체크)
|flying-saucer-core-9.0.2.jar|PDF 문서 생성 관련 모듈| (체크)
|flying-saucer-pdf-9.0.2.jar|PDF 문서 생성 관련 모듈| (체크)
|itext-2.1.7.jar|PDF 문서 생성 관련 모듈| (체크)
|json-simple-1.1.1.jar|JSON 처리 모듈|

2. 서버모듈 2.0 (POI3)

|파일명|용도|
|---|---|
|ibsheet7-2.x.x.jar|서버코어모듈|
|poi-3.13-all.jar|엑셀 파일 생성/파싱 모듈|
|commons-codec-1.6.jar|엑셀 업로드 관련 인코딩 모듈|
|commons-logging-1.1.3.jar|로그 모듈|
|ib-itext.jar|pdf다운로드 모듈|
|batik-all-xml.jar|이미지 처리 관련 모듈|

3. 서버모듈 2.0 (POI4)

|파일명|용도|
|---|---|
|ibsheet7-2.x.x.jar|서버코어모듈|
|poi-4.1.2.jar|엑셀 파일 생성/파싱 모듈|
|poi-ooxml-4.1.2|엑셀 파일 생성/파싱 모듈|
|poi-ooxml-schemas-4.1.2.jar|엑셀 파일 생성/파싱 모듈|
|commons-codec-1.13.jar|엑셀 파일 생성/파싱 모듈|
|commons-collections4-4.4.jar|컬렉션 프레임워크 모듈|
|commons-compress-1.19.jar|엑셀 파일 압축 관련 모듈|
|commons-logging-1.1.3.jar|로그 모듈|
|commons-math3-3.6.1.jar|수적 기능 모듈|
|curvesapi-1.06.jar|SVG 그래픽 처리 관련 모듈|
|servlet-api.jar|서블릿 엔진 모듈|
|SparseBitSet-1.2.jar|비트 처리 관련 모듈|
|xmlbeans-3.1.0.jar|자바에서 XML 문서를 다루기 위한 모듈|

### 서버모듈 확인 방법

서버에서 jar 파일이 정상적으로 로드되었는지 다음 구문을 통해 확인 할 수 있습니다.

```jsp
<%
System.out.println(com.ibleaders.ibsheet.util.Version.getJarVersion());
%>
```
위와 같이 jsp파일에 입력시 서버에 콘솔창에 다음과 같은 메세지가 나오면 정상입니다.<br>
(각 jar 파일에 버젼 정보를 확인해 주세요.)
```console
********************************************************************************
### ibsheet8 serverModule version ###
# ibsheet8 jar Version : 1.0.X
********************************************************************************
Class Info  : org.apache.poi.ss.usermodel.Workbook
jar path    : /D:/repository/ibsheet8-server-module/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/webProject/WEB-INF/lib/poi-3.13-all.jar
jar Version : Apache POI 3.13
Required Version : POI 3.8 beta3 or later
********************************************************************************
Class Info  : org.apache.poi.POIXMLDocument
jar path    : /D:/repository/ibsheet8-server-module/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/webProject/WEB-INF/lib/poi-3.13-all.jar
jar Version : Apache POI 3.13
Required Version : POI 3.8 beta3 or later
********************************************************************************
Class Info  : org.openxmlformats.schemas.spreadsheetml.x2006.main.CTWorkbookPr
jar path    : /D:/repository/ibsheet8-server-module/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/webProject/WEB-INF/lib/poi-3.13-all.jar
jar Version : Apache POI 3.13
Required Version : POI 3.8 beta3 or later
********************************************************************************
Class Info  : org.openxmlformats.schemas.spreadsheetml.x2006.main.CTWorkbook
jar path    : /D:/repository/ibsheet8-server-module/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/webProject/WEB-INF/lib/poi-3.13-all.jar
jar Version : Apache POI 3.13
Required Version : POI 3.8 beta3 or later
********************************************************************************
Class Info  : org.apache.xmlbeans.XmlBeans
jar path    : /D:/repository/ibsheet8-server-module/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/webProject/WEB-INF/lib/poi-3.13-all.jar
jar Version : Apache POI 3.13
Required Version : XMLBeans 2.3.0 or later
********************************************************************************
```
2. jsp 파일

|파일명|용도|
|---|---|
|Down2Excel.jsp|엑셀파일 다운로드|
|LoadExcel.jsp|엑셀파일 업로드|
|Down2Text.jsp|텍스트파일 다운로드|
|LoadText.jsp|텍스트파일 업로드|
|Down2Pdf.jsp|PDF파일 다운로드|


3. 플러그인 파일 include 파일

시트를 이용하여 다운로드/업로드 작업을 할 모든 페이지에는  `/plugins/ibsheet-excel.js` 파일이 인클루드 되어야 합니다.

## 준비 과정

### jsp 파일경로 설정
`SetDown2ExcelUrl`, `SetLoadExcelUrl`, `SetDown2TextUrl`, `SetDown2TextUrl` 함수를 이용해 jsp 파일이 위치한 경로를 설정하실 수 있습니다. 

```js
// 엑셀 다운로드 경로를 설정
mySheet.SetDown2ExcelUrl("/jsp/Down2Excel.jsp");

// 엑셀 업로드 경로를 설정
mySheet.SetLoadExcelUrl("/jsp/LoadExcel.jsp");
```

## 기능 구현
[down2Excel](/docs/funcs/export/Down2Excel)이나 [loadExcel](/docs/funcs/import/LoadExcel)함수를 통해 시트의 내용을 다운로드/업로드 하실 수 있습니다.<br>

```javascript
mySheet.Down2Excel({"FileName":"boardList.xls","SheetDesign":1,"Merge":1});
```

업로드/다운로드 함수에 대한 자세한 기능은 해당 함수에 대한 메뉴얼 파트를 참고해 주세요.

### Read More
- [ExportMode](/docs/props/PropertyList/ExportMode)
- [Down2Excel method](/docs/funcs/export/Down2Excel)
- [LoadExcel method](/docs/funcs/import/LoadExcel)
- [Down2Text method](/docs/funcs/export/Down2Text)
- [LoadText method](/docs/funcs/import/LoadText)
- [Down2Pdf method](/docs/funcs/export/Down2Pdf)

### Since

|product|version|desc|
|---|---|---|
|core|7.0.0.0||
