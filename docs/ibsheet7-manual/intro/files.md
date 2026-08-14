# 파일 구성

## IBSheet7 제품은 다음과 같은 파일, 폴더로 구성되어 있습니다.

```
─ sheet 최상위 폴더
    ├─ ibleaders.js           // 라이선스 파일
    ├─ ibsheet.js             // IBSheet7 core 파일
    ├─ ibsheetinfo.js         // 시트 초기화시 필요한 함수 js 파일
    ├─ ibmsg                  // IBSheet7에서 사용하는 시스템 메시지 파일
    ├─ ibsheet.cfg            // 모든 시트에 공통으로 적용하는 기능 설정 파일
    ├─ ibexcel.js             // 클라이언트 기반 import/export 관련 파일
    ├─ Down2Excel.jsp         // 서버사이드 기반 Java 기반 환경 jsp 파일들 (ibsheet.cfg에서 경로 설정)
    ├─ LoadExcel.jsp
    ├─ DirectLoadExcel.jsp
    ├─ DirectDown2Excel.jsp
    ├─ Down2Hml.jsp
    ├─ Down2Pdf.jsp
    ├─ Down2Text.jsp
    ├─ LoadText.jsp
    ├─ Down2Excel.aspx        // .Net 기반 환경 aspx 파일들 (ibsheet.cfg에서 경로 설정)
    ├─ LoadExcel.aspx
    ├─ Down2Text.aspx
    ├─ LoadText.aspx
    ├─ Down2Pdf.aspx
    ├─ DirectDown2Excel.aspx
    ├─ DirectLoadExcel.aspx
    └─ Main                   // 기본 테마 정보를 담고 있는 폴더
          └─ ibsheet.css      // IBSheet7 테마 css 파일
```

## 각 파일의 기능은 아래와 같습니다.

### *ibleaders.js*
`제품 라이선스` 정보를 담고 있는 파일 (IBSheet7 제품군 공통 js 파일)

### *ibsheet.js*
IBSheet7 엔진 js 파일

### *ibsheetinfo.js*
시트 초기화시 필요한 함수 및 개발시 유용하게 사용할 수 있는 js함수를 담아둔 파일

### *ibmsg*
IBSheet7에서 사용하는 시스템 메시지 파일 <br>
다국어 사용시 해당 파일을 복사하여 `ibmsg.[lang]` 형태로 복사한 후, 메시지 내용을 번역하여 사용합니다. (예: `ibmsg.en`)

### *ibsheet.cfg*
모든 시트에 공통으로 설정할 기능 설정 파일 (설정할 수 있는 내용은 Cfg - PropertyList 참조)

<hr>

## 서버사이드 Import/Export 파일

파일 업로드/다운로드 기능을 사용하려면 아래 서버쪽 응용 프로그램 파일이 필요합니다. (경로는 `ibsheet.cfg` 에서 설정)

|파일명|내용/역할|
|---|---|
|Down2Excel.jsp<br>or Down2Excel.aspx|엑셀 다운로드 전용인 [Down2Excel](/docs/funcs/export/Down2Excel) 메소드를 적용하기 위한 파일|
|LoadExcel.jsp<br>or LoadExcel.aspx|엑셀 로딩 전용인 [LoadExcel](/docs/funcs/import/LoadExcel) 메소드를 적용하기 위한 파일<br>엑셀 로딩에서 임시 사용될 서버쪽 폴더 경로를 설정해야 합니다.|
|DirectLoadExcel.jsp<br>or DirectLoadExcel.aspx|`LoadExcel` 과 달리 엑셀 파일의 분석 결과를 그리드로 보내지 않고 DB에 바로 적용할 수 있는 파일<br>엑셀 파일의 내용은 forward 페이지로 `List<Map>`(혹은 `List<Dictionary>`) 형태로 전달되며, forward 페이지에서 비즈니스 로직을 수행합니다.|
|DirectDown2Excel.jsp<br>or DirectDown2Excel.aspx|대용량 데이터를 엑셀 파일 형태로 내리기 위해, 시트에서 데이터를 서버로 전달하지 않고 DB에서 조회한 데이터를 바로 엑셀 파일로 내리는 파일|
|Down2Text.jsp<br>or Down2Text.aspx|시트의 데이터를 txt 형태로 내리기 위한 파일|
|LoadText.jsp<br>or LoadText.aspx|txt 파일의 내용을 시트 위에 올리기 위한 파일|

> `주의` 한글이 깨질 경우 파일 내에서 UTF8 설정을 변경해야 합니다.<br>
> `주의` 엑셀 다운로드 문서 내에 이미지가 포함되고 그 경로에 가상폴더가 포함된다면, `WebRoot` 변수에 서버의 물리적 디렉토리 경로를 설정해야 합니다.

jsp 파일들은 사용하는 서버의 encoding 설정이나 서버 경로에 대한 설정을 해줘야 정상적으로 다운로드 됩니다. 파일을 열면 소스 상단에 수정이 가능한 전역 변수가 몇 개 있는데, 이 부분을 수정하면 됩니다.

## WAS 라이브러리

엑셀 import/export 기능을 사용하기 위해서는 WAS에 아래 라이브러리 파일이 설치되어야 합니다.

### JAVA 기반 WAS
```
ibsheet7-2.0.x.jar
batik-all-xml.jar
commons-codec-1.10.jar
commons-logging-1.1.3.jar
poi-3.13-all.jar
```

### .Net 기반 WAS
```
IBSheet7-4.0.dll
Syncfusion.Compression.Base.dll
Syncfusion.Core.dll
Syncfusion.XlsIO.Base.dll
```

> 라이브러리가 추가된 이후에는 일반적으로 WAS 서버를 재부팅해야 적용됩니다.

<hr> 

이 외에도 파일 업로드/다운로드 관련 기능을 사용하시려면 파일 업로드/다운로드 관련 모듈을 임포트 해주셔야 합니다. <br>
파일 업로드/다운로드 모듈 관련해서는 [파일 다운로드/업로드] Appendix를 참고해주세요. 
- [파일 업로드/다운로드](/docs/appx/import-export)
