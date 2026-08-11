# Down2Pdf ***(export method)***

> IBSheet의 내용을 PDF 파일로 변환하여 다운로드 합니다. 동작 방식은 아래와 같습니다.
> 1. `Down2Pdf` 메소드를 호출하면 시트의 내용이 Multipart 형태로 서버의 `Down2Pdf.jsp / Down2Pdf.aspx` 파일에 전달<br>
> 2. Down2Pdf.jsp/Down2Pdf.aspx 파일에서는 넘어온 내용을 `iText_2.1.7 라이브러리`를 이용하여 pdf 포멧의 파일로 변경하여 다시 화면쪽으로 다운로드<br>
> 따라서 이 메소드를 이용하기 위해서는 환경에 <span style="color:blue;">준비과정</span>이 필요합니다.

* Java 환경

  1. Down2Pdf.jsp 파일이 서버에 존재하며, ibsheet.cfg 파일에 jsp파일에 대한 경로가 정확하게 기재 되어 있어야 합니다.
  2. 서버에 iText 라이브러리가 올라와 있어야 합니다.
  3. 서버에 한글폰트 지원을 위한 ttf 파일이 있어야 하며 jsp 파일에 폰트 폴더에 대한 경로가 정확하게 기재되어 있어야 합니다.
  4. Down2Pdf.jsp 파일을 편집기로 열어, 사용하는 서버의 폰트파일 경로와 Encoding을 설정합니다.

* .Net 환경

  1. Down2Pdf.aspx 파일이 서버에 존재하며, ibsheet.cfg 파일에 aspx파일에 대한 경로가 정확하게 기재 되어 있어야 합니다.
  2. .Net모듈의 경우 자바 모듈을 통해 html 파일을 pdf 파일로 변환처리 하여 다운로드 하기 때문에 서버에 JVM, iText 라이브러리 및 자바버전 모듈이 모두 올라와 있어야 합니다.
  3. 서버에 한글폰트 지원을 위한 ttf 파일이 있어야 하며 ttf 파일은 자바버전 모듈과 같은 위치에 두고 aspx 파일의 ModulePath 에 해당 위치를 정확히 설정해야 합니다.
  4. `Down2Pdf.aspx` 파일을 편집기로 연 후, 사용하는 서버에서 임시 html파일, pdf 파일을 생성하기 위한 TempFolder(쓰기 권한이 있어야 함)와 ttf/jar파일이 위치한 ModulePath, Encoding을 설정해 줍니다. 자바 모듈인 ibsheet7-1.1.4.jar 파일은 버전에 따라 파일명이 변경되므로 서버에 적용한 자바모듈 파일명을 ModuleFile 정확히 설정해야 합니다.


### Syntax
```javascript
ObjId.Down2Pdf([parameters]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|DownCols|`String`|<span class="optional">선택</span>|다운로드 받을 열들을 `|` 로 연결 (Default: ""(모두 받음))|
|Dpi|`Integer`|<span class="optional">선택</span>|축소/확대 비율. 값이 작을 수록 크게 출력된다. 50~32840 사이 값으로 설정 가능하다. (Default: 2000)|
|ExtendParam|`String`|<span class="optional">선택</span>|서버로 전달해야 하는 내용이 있는 경우 Get 방식의  QueryString으로 연결하여 설정 (Default: "")|
|ExtendParamMethod|`String`|<span class="optional">선택</span>|ExtendParam인자의 전송 방식 (Default: POST)|
|FileName|`String`|<span class="optional">선택</span>|저장할 파일 명 (Default: "IBSheet.pdf")|
|FontTo|`String`|<span class="optional">선택</span>|PDF 한글 폰트 선택 (Default: "Gothic")|
|Paper|`String`|<span class="optional">선택</span>|용지 방향 설정 (landscape(Default) 또는 portrait)|
|Title|`String`|<span class="optional">선택</span>|PDF 타이틀 텍스트 (Default: "")|
|TitleStyle|`String`|<span class="optional">선택</span>|PDF 타이틀 스타일 (Default: "")|
|URL|`String`|<span class="optional">선택</span>|PDF 다운 하기 전에 호출 페이지 (Default:""(사용안함))|
|WordWrap|`Boolean`|<span class="optional">선택</span>|셀 텍스트 줄바꿈 여부 (Default :0(사용안함))|
|ReqHeader|`Boolean`|<span class="optional">선택</span>|Request Header에 사용자가 지정한 헤더 정보를 설정합니다. 이 인자를 설정하면 UseXhr을 true로 설정한 것과 동일하게 동작합니다.|
|UseXhr|`Boolean`|<span class="optional">선택</span>|iframe를 통한 form submit 방식으로 통신하는 기존 방식과 다르게 다운로드시 통신 방식을 xhr로 설정합니다. <br> 프레임웍의 각종 보안처리로 인하여 iframe를 사용할 수 없다거나 Cookie(파일 다운로드 완료 후 화면의 대기이미지 닫을 때 필요)를 읽고 쓸수 없을 때 이 속성을 true로 설정해주세요.|



### Returns
***none***

### Example
```javascript
// PDF 파일로 내려 받기
mySheet.Down2Pdf();

// 다운로드할 파일명을 text로 정의하여 다운
mySheet.Down2Pdf({FileName:"text"});

// 다운로드할 컬럼을 지정하여 myPDF.pdf로 다운
mySheet.Down2Pdf({FileName:"myPDF", DownCols:"7|8|9|4|5|6|10"});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.230|ReqHeader, UseXhr 속성 추가|