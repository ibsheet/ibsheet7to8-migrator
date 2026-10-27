# IBSheet7 Q&A 지식집 — 10. 엑셀·PDF·CSV 입출력 (XLS) [2/2]

범위: 엑셀·PDF·CSV·텍스트 다운로드/업로드(클라이언트·서버모듈, Down2Excel, LoadExcel 등), POI, DRM.

이 파일에는 항목 487개가 11개 소주제로 정리되어 있습니다. (이 주제 전체는 928개 항목이며 2개 파일로 나뉘어 있습니다.) 각 항목은 `### [XLS-번호] 제목` 아래에 **질문**(같은 내용을 묻는 여러 표현), **답변**, 필요하면 **적용 버전**, **키워드**로 구성됩니다.

## 소주제 목록

- 서버 환경·임시 폴더·경로 오류 (97개, XLS-0442부터)
- Multipart·프레임워크 충돌 (9개, XLS-0539부터)
- SheetDesign·색상·폰트 (21개, XLS-0548부터)
- 다운로드 숫자·날짜·텍스트 서식 (67개, XLS-0569부터)
- 병합(Merge)·합계행·푸터 (24개, XLS-0636부터)
- DownCols·숨김·행 범위 지정 (24개, XLS-0660부터)
- TempFile·ReportXML 템플릿 (15개, XLS-0684부터)
- 버전 업그레이드·수정 이력 (72개, XLS-0699부터)
- 미지원 기능·제약 (22개, XLS-0771부터)
- 다운로드 실패·파일 열기 오류 (44개, XLS-0793부터)
- 다운로드 표시·옵션 기타 (92개, XLS-0837부터)

## 서버 환경·임시 폴더·경로 오류

### [XLS-0442] 로컬은 되는데 개발·운영 서버에서 엑셀 다운로드 시 MultipartException 오류가 납니다

**질문**

- 엑셀 다운로드 시 로컬 서버에서는 되는데 개발·운영 서버에서 MultipartException(could not parse multipart servlet request) 오류가 납니다. 어떻게 해결하나요?

**답변**

jar를 배포하고 JSP를 서블릿으로 작성하는 방식으로 처리합니다. 오류 메시지 `there is no @multipartConfig or multipart-config in deployment descriptors`는 배포 설명자에 multipart 설정이 없다는 의미입니다.

**키워드**: MultipartException, multipartConfig, multipart-config, JSP 서블릿, jar 배포, 로컬 정상 서버 오류

---

### [XLS-0443] 엑셀 업로드가 로컬에서는 잘 되는데 서버에서만 안 되는 이유(lib·경로 외 원인)

**질문**

- 엑셀 업로드가 로컬에서는 잘 되는데 서버에서만 안 됩니다. lib와 경로 외에 어떤 원인이 있을 수 있나요?

**답변**

lib 파일과 cfg의 jsp 경로를 확인한 뒤에도 안 되면 `MultiPartResolver` 설정이나 서버 temp 폴더의 권한 문제가 원인일 수 있습니다.

**키워드**: 엑셀 업로드, MultiPartResolver, temp 폴더 권한, 로컬 정상 서버 오류, jsp 경로

---

### [XLS-0444] 서버모듈 적용 후 setService 등에서 NullPointerException이 발생하면 lib(jar) 불일치를 확인하나요?

**질문**

- 서버모듈을 적용했더니 NullPointException이 발생합니다. 주로 어떤 원인으로 발생하나요?
- 엑셀 다운로드를 구현했는데 setService(request, response)에서 NullPointerException이 발생해 동작하지 않습니다. 원인은?

**답변**

`NullPointException`은 대부분 lib 파일이 맞지 않아서 발생합니다. 서버모듈에 사용하는 lib 파일이 서로 맞는지부터 확인합니다. `setService(request, response)`에서 NullPointerException이 발생한 사례도 import된 라이브러리가 제공된 버전이 아니어서 생긴 것으로, 제공된 jar 파일들로 교체해 적용해야 합니다.

**키워드**: NullPointerException, NullPointException, setService, lib 파일 불일치, jar 교체, 서버모듈

---

### [XLS-0445] 행 수가 많은 엑셀 다운로드에서만 IBSheetDown.setData에서 NullPointerException이 발생합니다

**질문**

- 엑셀 다운로드 시 행 수가 적으면 되는데 4천 건 정도로 많으면 IBSheetDown.setData에서 NullPointerException이 발생합니다. smLazyLoad를 사용 중인데 원인과 해결은?

**답변**

행 수가 많은 다운로드에서만 `IBSheetDown.setData`의 NullPointerException이 발생하면 서버의 post 크기 제한에 걸린 것일 수 있으므로, 서버의 `MaxPostSize`, `MaxParameterSize` 설정을 무제한으로 변경한 뒤 다시 시도합니다. 4천 건 정도에서 발생한 사례가 있으며 이 사례의 그리드 옵션은 smLazyLoad였습니다.

**키워드**: IBSheetDown.setData, NullPointerException, MaxPostSize, MaxParameterSize, smLazyLoad, 대량 행 다운로드

---

### [XLS-0446] 엑셀 다운로드 시 일부 화면에서 400 에러가 나고 검색 조건으로 필터링해도 400 에러가 납니다

**질문**

- 엑셀 다운로드 시 일부 화면에서 400 에러가 발생하고, 검색 조건으로 필터링하면 다시 400 에러가 납니다. 원인과 해결 방법이 있나요?

**답변**

원인이 확정되지는 않았으며 서버 쪽 보안 때문에 생긴 문제일 수 있습니다. `Multipart:0`으로 설정해도 해결되지 않았습니다. `MarkupTagDelimiter` 옵션 사용도 함께 검토해 볼 수 있습니다.

**키워드**: 400 에러, MarkupTagDelimiter, Multipart:0, 서버 보안, 엑셀 다운로드

---

### [XLS-0447] 엑셀 업로드 시 invalid header signature, unable to recognize ole stream, InvalidFormatException 오류가 나는 원인

**질문**

- 문서보안 솔루션이 적용된 엑셀을 로드하면 invalid header signature 오류 메시지가 나옵니다. 어떻게 해결하나요?
- 엑셀 파일을 로드하면 unable to recognize ole stream 에러 메시지만 뜨고 파일이 불러와지지 않습니다. 원인이 무엇인가요?
- 엑셀 업로드 시 `NotOLE2FileException: Invalid header signature ... Your file appears not to be a valid OLE2 document` 오류가 특정 환경에서만 납니다. 원인은?
- 엑셀 업로드(LoadExcel) 시 서버 콘솔에 `org.apache.poi.openxml4j.exceptions.InvalidFormatException` 오류가 발생합니다. 원인은 무엇인가요?

**답변**

다음 오류들은 DRM(문서보안)이 적용되어 암호화된 엑셀 파일이 업로드될 때 나타나는 경우가 있으므로, 먼저 DRM이 걸린 파일인지 확인합니다.

- `invalid header signature`: 문서보안으로 암호화된 엑셀 파일을 로드할 때 나며, 복호화 로직을 삽입해야 해결됩니다.
- `unable to recognize ole stream`: 엑셀 파일이 불러와지지 않는 원인이 DRM 문제일 수 있습니다.
- `NotOLE2FileException: Invalid header signature ... Your file appears not to be a valid OLE2 document`: DRM 처리된 파일을 업로드하는 경우로 예상됩니다. `LoadExcel.jsp`의 복호화 로직에서 복호화한 파일명을 업로드한 파일명으로 바꾸지 않으면 발생합니다. 환경별 `LoadExcel.jsp` 차이가 없는지 확인하고, 원본 파일을 삭제한 뒤 DRM 해제된 파일을 `renameTo`로 업로드한 원본 파일명과 일치하도록 교체합니다. 업로드가 끝나면 setTempFolder의 파일은 자동으로 지워집니다.
- `org.apache.poi.openxml4j.exceptions.InvalidFormatException`: xlsx가 아닌 파일을 xlsx로 읽으려고 할 때 나오는 메시지이며, 로그에 Package should contain a content type part가 함께 나타날 수 있습니다. DRM이 걸린 파일을 로드하는 경우가 아닌지 확인합니다.

**키워드**: invalid header signature, unable to recognize ole stream, NotOLE2FileException, InvalidFormatException, DRM, renameTo, LoadExcel.jsp

---

### [XLS-0448] 엑셀 업로드(LoadExcel) 시 IllegalStateException: Zip File is closed 오류가 발생하는 원인과 확인 방법

**질문**

- 로컬 환경에서 엑셀 업로드 시 서버 로그에 `Zip File is closed` 오류가 나며 LoadExcel.jsp에서 실패합니다. 원인과 확인 방법은 무엇인가요?
- DRM으로 복호화한 엑셀 파일을 서버모듈로 업로드(LoadExcel)하면 IllegalStateException: Zip File is closed 오류가 발생합니다. 원인은 무엇인가요?
- LoadExcel로 엑셀을 업로드하면 java.lang.IllegalStateException: Zip File is closed 오류가 발생합니다. 원인과 확인 방법은 무엇인가요?

**답변**

`Zip File is closed` 오류는 엑셀 다운로드/업로드 환경 설정이 정상적으로 되어 있지 않거나, 서버모듈에 포함된 jar 파일과 서버에 이미 있는 라이브러리가 충돌하거나, `LoadExcel.jsp`에 적용된 DRM 로직에서 문제가 발생했을 수 있습니다. 다음을 확인합니다.

- 서버모듈에 포함된 jar 파일과 서버에 이미 있는 라이브러리 중 충돌하는 것이 없는지 비교합니다.
- `LoadExcel.jsp`에 `com.ibleaders.ibsheet7.util.Version.getVersion()` 구문을 추가해 로그로 출력하면 참조하는 라이브러리 목록과 관련 jar가 제대로 설정되었는지 확인할 수 있습니다.
- DRM 로직을 제거한 뒤에도 문제가 재현되는지 확인합니다.
- DRM으로 복호화한 파일을 쓰는 경우, 서버모듈 1.0에는 특정 경로에 떨어진 파일을 읽는 설정이 없고 `ibExcel.setTempFolder`에 지정된 경로의 파일을 읽습니다. 복호화된 파일이 `ibExcel.setTempFolder()` 아래 `/temp` 경로에 저장되면 암호화된 파일을 읽게 되어 `IllegalStateException: Zip File is closed` 오류가 발생하므로, 복호화된 파일이 `setTempFolder`에 설정한 경로에 있어야 서버모듈이 읽습니다.

**적용 버전**: 서버모듈 1.0

**키워드**: Zip File is closed, IllegalStateException, LoadExcel.jsp, setTempFolder, DRM, Version.getVersion

---

### [XLS-0449] 일부 엑셀 파일 업로드 시 Cannot read properties of undefined (reading 'SheetWork') 오류가 납니다

**질문**

- 엑셀 업로드 시 일부 파일에서만 `Cannot read properties of undefined (reading 'SheetWork')` 오류가 납니다. DRM이 걸린 파일일 수 있는데 어떻게 처리하나요?

**답변**

브라우저에서 엑셀을 직접 처리하는 방식에서는 DRM이 걸린 파일인지 확인할 방법이 없으므로, 백엔드를 호출하는 방식으로 처리해야 합니다.

- ibsheet jar와 엑셀 처리 jsp를 최신으로 맞춥니다.
- `LoadExcel` 호출 전에 `ExportMode=1`로 바꿔 엑셀 파일과 데이터를 백엔드로 전송하게 한 뒤, 호출 후 `ExportMode = 2`로 되돌려 다운로드는 브라우저에서 처리하게 합니다.
- 오류는 `OnLoadExcel` 이벤트의 result, 에러코드, msg로 표시합니다.

**키워드**: SheetWork, ExportMode, LoadExcel, OnLoadExcel, DRM 파일, 백엔드 호출

---

### [XLS-0450] 엑셀 업로드가 안 되거나 데이터가 올라가지 않거나 특정 PC에서 화면이 멈추는 가장 흔한 원인

**질문**

- 엑셀 파일을 선택해 업로드해도 데이터가 올라가지 않거나 진행되지 않습니다. 가장 흔한 원인과 해결 방법은 무엇인가요?
- 파일(엑셀) 업로드 기능에서 DRM 오류가 발생하거나 특정 PC에서 엑셀을 로드하면 화면이 멈춥니다. 원인이 무엇인가요?
- 엑셀 파일을 시트로 로드하는 기능이 동작하지 않습니다. 사용 환경에서 어떤 원인을 확인해야 하나요?

**답변**

엑셀 업로드가 안 되는 문제의 80~90%는 파일에 DRM이 걸려 있어서 발생합니다. DRM이 해제되지 않은 파일은 업로드할 방법이 없으므로 DRM을 반드시 해제한 뒤 파일을 올려야 합니다. DRM이 걸린 파일을 올리면 정상적인 파일이 아니라는 경고가 표시되며, 특정 PC에서 엑셀 로드 시 화면이 멈추는 경우에도 DRM이 걸린 파일을 로드하는 것은 아닌지 확인해 볼 수 있습니다. 엑셀 로드가 동작하지 않을 때는 DRM이 적용된 파일이나 환경인지 먼저 확인합니다.

**키워드**: DRM 해제, 엑셀 업로드 안 됨, 엑셀 로드, 화면 멈춤, 정상적인 파일이 아님

---

### [XLS-0451] DRM 사용 환경에서 엑셀 다운로드·업로드 오류가 날 때 점검할 부분은 무엇인가요?

**질문**

- 엑셀 로드 시 DRM 처리가 잘 되지 않고 오류가 발생합니다. 서버에서 파일을 처리하는 부분의 어떤 점을 확인해야 하나요?
- 엑셀 다운로드 버튼을 누르면 뜨는 모달이 닫히지 않고, 엑셀 업로드에서는 오류 alert가 뜹니다. 어떤 점을 점검해야 하나요?
- 서버를 이전한 뒤 엑셀 다운로드·업로드에서 오류가 납니다. DRM을 사용 중인 경우 무엇을 확인해야 하나요?

**답변**

DRM을 사용 중인 환경에서 엑셀 다운로드·업로드 오류가 나면 다음을 점검합니다.

- 서버로 넘어온 파일을 `inputStream`으로 열어 둔 상태에서 파일을 삭제하려 하면 오류가 날 수 있습니다. 이 오류를 피해도 복호화 자체가 되지 않는 상태일 수 있으므로 DRM 복호화 처리 쪽을 확인합니다.
- 다운로드 모달이 닫히지 않고 업로드에서 오류 alert가 뜨면 모달을 띄우는 쪽 js의 오류와 DRM 복호화가 제대로 되지 않는 문제를 함께 점검합니다. 두 가지를 모두 고치자 해결된 경우가 있습니다.
- 서버를 이전했다면 `down2Excel.jsp`와 `LoadExcel.jsp`의 DRM 구간에서 서버 이전으로 인해 바뀌어야 하는 내용을 확인해 수정합니다. 엑셀 작업 시 DRM 모듈 관련 이슈일 수 있습니다.

**키워드**: DRM 복호화, inputStream, down2Excel.jsp, LoadExcel.jsp, 서버 이전, 엑셀 모달

---

### [XLS-0452] 엑셀 다운로드·업로드 jsp를 최신 버전으로 교체할 때 기존 DRM 로직과 직접 추가한 코드는 어떻게 하나요?

**질문**

- 엑셀 다운로드/업로드용 jsp를 최신 버전으로 교체할 때 기존에 jsp에 적용해 둔 DRM 로직은 어떻게 처리해야 하나요? 교체 후 다시 넣어야 하나요?
- 엑셀 다운로드/업로드 모듈의 jsp를 최신으로 교체할 때 jsp에 이미 DRM 로직이나 개발자가 직접 추가한 소스 코드가 있으면 어떻게 해야 하나요?

**답변**

엑셀 모듈 jsp를 최신으로 업데이트한 뒤에는, 기존 jsp에 DRM 로직이 적용되어 있었거나 개발자가 필요에 의해 직접 추가한 소스 코드가 있었다면 그 부분을 모두 다시 반영(삽입)해야 합니다. 특히 DRM 로직은 업데이트 후 반드시 다시 삽입해야 합니다.

**키워드**: jsp 업데이트, DRM 로직, jsp 교체, 엑셀 모듈 jsp, DRM 재삽입

---

### [XLS-0453] 서버모듈로 엑셀을 업로드하면 임시 파일이 저장되나요? 언제 삭제되고 직접 다루려면 어떻게 하나요?

**질문**

- 서버 모듈로 엑셀을 업로드하면 서버에 파일이 임시로 저장되나요? 임시 파일은 언제 삭제되며, 저장된 파일을 직접 다루거나 따로 보관하려면 어떻게 하나요?

**답변**

업로드된 파일은 임시로 저장했다가 지워지며, 삭제는 맨 마지막 `load.close()` 시점에 이루어집니다. 파일을 직접 다루고 싶다면 소스에서 DRM 처리 주석이 있는 부분을 찾아 그 윗줄의 파일 객체를 복사하는 등으로 처리하면 됩니다.

**키워드**: 임시 파일, load.close, 엑셀 업로드, DRM 처리 주석, 파일 보관

---

### [XLS-0454] 엑셀 업로드 시 '파일을 읽는 도중 예외' 또는 No such file or directory 오류가 나는 이유(임시 폴더 경로·권한)

**질문**

- 엑셀 업로드 시 '엑셀 파일을 읽는 도중 예외가 발생하였습니다'라는 alert가 나옵니다. 서버 콘솔에도 오류가 표시되는데 원인이 무엇인가요?
- 로컬에서는 엑셀 업로드가 되는데 개발서버에 올리면 다운로드는 되고 업로드만 안 됩니다. 파일 디렉토리를 찾을 수 없다는 에러가 나는데 무엇을 확인하나요?
- 닷넷 서버모듈 2.0에서 엑셀을 업로드(LoadExcel)하면 DirectoryNotFoundException(경로의 일부를 찾을 수 없습니다)이 발생합니다. 원인은 무엇인가요?
- 파일 업로드 시 오류 메시지가 뜨는데 콘솔에도 웹 콘솔에도 로그가 남지 않아 원인을 찾기 어렵습니다. 무엇을 확인해야 하나요?

**답변**

업로드는 서버의 임시 폴더를 사용하므로 임시 폴더 설정이 실행 환경과 맞지 않으면 파일을 찾지 못하는 예외가 발생합니다. 다운로드는 정상인데 업로드만 실패하거나 로컬은 되는데 개발서버에서만 실패할 때 다음을 확인합니다.

- 임시 폴더(`setTempFolder`, TempFolder) 경로가 서버 환경과 맞는지, 그 폴더를 실제로 생성했는지 확인합니다. 로컬에 없는 드라이브(예: D:만 지정되었는데 C:만 있음)나 C: 루트처럼 접근할 수 없는 경로를 지정하면 예외가 발생합니다. 닷넷의 DirectoryNotFoundException은 오류 메시지에 표시된 경로의 폴더가 서버에 없을 때 나타납니다.
- 해당 폴더에 접근·쓰기·수정·읽기 권한이 있는지 확인합니다. `C:\temp` 폴더를 만들고 권한을 준 뒤 그 경로로 지정하면 정상 동작합니다. C: 드라이브 경로에 쓰기 권한이 없다면 쓰기 권한이 있는 다른 경로를 지정합니다.
- 서버 로그에 `FileNotFoundException: null...xlsx (허가 거부)`가 나타나면 임시 폴더 경로가 null로 넘어간 것으로 보이며 원인은 확인되지 않았으므로 `setTempFolder` 경로 설정을 점검합니다.
- 업로드 시 지정하는 temp url이 맞는지, WAS 권한과 lib 파일이 맞는지도 확인합니다.
- 오류 로그가 남지 않으면 서버 코드에 `printStackTrace`를 선언하지 않았거나 `setTempFolder`로 임시 폴더를 지정하지 않은 것이 원인일 수 있으므로 임시 폴더를 직접 설정합니다.

**키워드**: setTempFolder, TempFolder, 임시 폴더, No such file or directory, 파일을 읽는 도중 예외, 쓰기 권한, 엑셀 업로드

---

### [XLS-0455] 서버 모듈로 업로드한 엑셀 파일이 어느 경로에 저장되며 임시 폴더는 어떻게 지정하나요?

**질문**

- 서버 모듈로 엑셀 파일을 업로드하다가 서버에서 문제가 생기면 저장된 파일을 확인해야 합니다. 업로드 파일이 어느 경로에 저장되고 어떻게 지정하나요?

**답변**

2.0 대 서버 모듈에서는 `load.setTempPath(경로)`로 임시 폴더를 지정할 수 있으며, 지정한 경로 아래에 ib_tmp 폴더가 생성되고 업로드된 파일이 저장됩니다. 이 임시 폴더와 파일은 `load.close()` 시점에 삭제됩니다.

**적용 버전**: 서버 모듈 2.0 대

**키워드**: setTempPath, ib_tmp, 임시 폴더, load.close, 서버 모듈 2.0

---

### [XLS-0456] 웹 소스를 c: 드라이브에서 d: 드라이브로 옮긴 뒤 엑셀 다운로드와 업로드가 모두 되지 않습니다

**질문**

- 웹 소스를 c: 드라이브에서 d: 드라이브로 옮긴 뒤 엑셀 다운로드와 업로드가 모두 되지 않습니다. 어떻게 해결하나요?

**답변**

`Down2Excel.jsp`와 `LoadExcel.jsp`에 드라이브 관련 설정 부분이 있으면 경로를 바꿔야 합니다. 그래도 안 되면 컴파일된 java 경로가 이전 드라이브 아래를 찾고 있고 해당 파일들이 새로 컴파일되지 않은 상태일 수 있으므로, WAS를 clean하고 재부팅합니다.

**키워드**: Down2Excel.jsp, LoadExcel.jsp, 드라이브 이동, WAS clean, 경로 설정

---

### [XLS-0457] 엑셀 다운로드·업로드 처리 경로를 IBSheet 샘플 페이지 주소로 설정해 쓰던 중 경로가 변경되었다고 나옵니다

**질문**

- 엑셀 다운로드·업로드 경로를 IBSheet 샘플 페이지 주소로 설정해 사용하고 있었는데 경로가 변경되었다고 나옵니다. 어떻게 설정해야 하나요?

**답변**

샘플 페이지의 주소를 쓰면 안 됩니다. 그 주소는 샘플 페이지를 위한 경로이며, 자체 서버의 내부 파일 경로를 설정해야 합니다. 해당 경로는 다운로드·업로드 처리를 담당하는 jsp 파일(`Down2Excel.jsp` 등)의 경로를 설정하는 부분입니다.

**키워드**: Down2Excel.jsp, 샘플 페이지 주소, 엑셀 다운로드 경로, 엑셀 업로드 경로, 처리 jsp 경로

---

### [XLS-0458] 엑셀 업로드가 WAS에 직접 붙으면 되는데 웹서버를 거치면 1MB 정도 크기부터 업로드되지 않습니다

**질문**

- 엑셀 업로드가 WAS 에 직접 붙으면 잘 되는데 웹서버를 거치면 1M 정도 크기의 파일부터 업로드되지 않습니다. 무엇을 확인해야 하나요?

**답변**

웹서버의 `maxpostsize` 설정이나 멀티파트로 전송하는 파일 크기 제한이 있는지 확인해야 합니다.

**키워드**: maxpostsize, 웹서버, 멀티파트, 파일 크기 제한, 엑셀 업로드

---

### [XLS-0459] 업로드 시 IndexOutOfBoundsException 또는 'string array of index bounds' 로그가 나옵니다

**질문**

- WAS를 변경한 뒤 LoadText로 텍스트 파일을 올리면 IndexOutOfBoundsException(len is greater than b.length - off)이 발생합니다. 원인이 무엇인가요?
- 팝업창에서 업로드를 사용할 때 콘솔 로그에 'string array of index bounds' 메시지가 출력됩니다. 어떻게 해결하나요?

**답변**

- 팝업창에서 업로드할 때 콘솔 로그에 'string array of index bounds' 메시지가 출력되면 최신 버전의 `oldjsp`로 변경합니다.
- WAS를 변경한 뒤 LoadText 업로드에서 `IndexOutOfBoundsException`(len is greater than b.length - off)이 발생하면 업로드한 파일이 정상적으로 전송되어 읽히지 않아 생기는 현상일 수 있습니다. 업로드하는 파일의 크기를 확인하고, 작은 크기의 텍스트 파일 업로드와 엑셀 업로드 기능도 함께 테스트해 봅니다.

**키워드**: IndexOutOfBoundsException, oldjsp, LoadText, string array of index bounds, 업로드 오류

---

### [XLS-0460] LoadExcel 시 '장치가 준비되지 않았습니다' 서버 오류나 업데이트 후 에러가 나는 이유는?

**질문**

- 엑셀 업로드(LoadExcel) 시 '장치가 준비되지 않았습니다'라는 서버 오류가 뜨면서 업로드가 되지 않습니다. 원인과 해결 방법은 무엇인가요?
- 제품을 최신 버전으로 업데이트한 뒤 LoadExcel을 하면 에러가 납니다. 서버 설정에서 무엇을 확인해야 하나요?
- 엑셀 업로드 중 파일을 읽는 도중 에러가 나거나 패치 후 개발·로컬 환경에서만 업로드가 되지 않습니다. LoadExcel.jsp에서 무엇을 확인해야 하나요?

**답변**

`LoadExcel.jsp`에서 임시(temp) 폴더 경로를 지정하지 않았거나 실행 환경에 맞지 않게 지정하면 에러가 발생합니다. 대표적인 증상은 다음과 같습니다.

- '장치가 준비되지 않았습니다'라는 서버 오류가 나며 업로드가 되지 않습니다.
- 제품을 최신 버전으로 업데이트(패치)한 뒤 LoadExcel에서 에러가 납니다.
- 파일을 읽는 도중 에러가 나거나, 개발·로컬 같은 특정 환경에서만 업로드가 되지 않습니다.

해결: `LoadExcel.jsp` 안의 경로 지정 부분에서 임시 저장(temp) 폴더 경로를 반드시 지정하고, 서버 환경에 맞는 경로로 설정합니다.

**키워드**: LoadExcel, LoadExcel.jsp, 장치가 준비되지 않았습니다, 임시 폴더, temp 폴더 경로, 엑셀 업로드 오류

---

### [XLS-0461] LoadExcel 임시 폴더 지정 방법과 '액세스가 거부되었습니다'·deny·'처리중입니다' 멈춤 해결

**질문**

- 서버모듈에서 LoadExcel 업로드 시 사용하는 임시 폴더의 위치를 다른 경로로 변경하고 싶습니다. 어떤 메서드로 지정하나요?
- LoadExcel 시 로컬에서는 되는데 운영 서버에서 안 되거나 '액세스가 거부되었습니다' 오류가 납니다. 임시 폴더 설정을 어떻게 해야 하나요?
- LoadExcel 을 할 때 deny(접근 거부) 메시지가 출력됩니다. 서버쪽 페이지의 설정에서 무엇을 확인해야 하나요?
- LoadExcel 을 사용했더니 '처리중입니다' 상태에서 더 이상 진행되지 않습니다. 로컬에서는 되는데 운영 서버에서만 안 됩니다.

**답변**

임시 폴더 경로는 `load.setTempPath`로 지정할 수 있습니다(예: `C:/`). 다만 드라이브 바로 아래를 지정하면 Vista 이후에는 접근이 거부될 수 있으므로 `c:/temp/` 처럼 하위 폴더를 사용합니다. 임시 폴더 설정이 잘못되었거나 접근 권한이 없으면 로컬에서는 되는데 운영 서버에서만 안 되는 현상이 나타나며, 증상별 확인 사항은 다음과 같습니다.

- '액세스가 거부되었습니다' 오류: 임시 폴더(`tmpFolder`)를 `c:/` 처럼 C 바로 아래로 설정하면 Vista 이후에는 C 바로 밑에 파일을 생성할 수 없어 접근이 거부됩니다. `c:/temp/` 처럼 하위 폴더로 바꾸면 정상 동작합니다. 경로 끝에는 반드시 `/` 를 넣어 폴더 안쪽으로 경로를 잡아야 합니다.
- deny 메시지: `loadexcel.aspx` 에서 설정한 임시 폴더에 접근 권한이 있는지 확인합니다.
- '처리중입니다' 에서 멈춤(로컬은 정상, 운영 서버만 문제): LoadExcel 이 사용하는 임시 폴더에 접근 권한이 있는지 확인합니다.

**키워드**: LoadExcel, setTempPath, tmpFolder, 임시 폴더 변경, 액세스가 거부되었습니다, deny, 처리중입니다, loadexcel.aspx

---

### [XLS-0462] LoadExcel 후 서버 temp 폴더에 업로드한 엑셀 파일이 삭제되지 않고 계속 쌓이는 이유는?

**질문**

- LoadExcel을 수행한 뒤 서버의 temp 폴더에 업로드했던 엑셀 파일이 지워지지 않고 계속 쌓이는 현상이 있습니다. 원인과 해결 방법은 무엇인가요?
- LoadExcel을 수행한 뒤 서버에 올라간 엑셀 파일이 자동으로 삭제되나요? 파일이 지워지지 않고 서버에 그대로 남아 있는데 정상인가요?

**답변**

LoadExcel 처리 후에도 서버에 저장된 업로드 엑셀 파일이 삭제되지 않고 temp 폴더에 남는 현상이 있습니다. 이는 제품 버그로 확인된 현상이며, 최신 jar 파일로 교체하면 해결됩니다. 교체하기 전에는 LoadExcel 처리 후에도 업로드 엑셀 파일이 서버에 그대로 남습니다.

**키워드**: LoadExcel, temp 폴더, 엑셀 파일 삭제, jar 교체, 업로드 파일 쌓임

---

### [XLS-0463] 로컬에서는 LoadExcel이 되는데 개발·운영 서버에 올리면 안 될 때 무엇을 확인하나요?

**질문**

- 로컬에서는 LoadExcel이 정상적으로 동작하는데 개발·운영 서버(리눅스, UNIX 등)에 올리면 동작하지 않습니다. 서버 쪽에서 무엇을 점검해야 하나요?
- 개발 PC(로컬)에서는 LoadExcel이 정상 동작하는데 서버에 올리면 에러가 납니다. ibsheet.cfg와 JSP에서 어떤 설정을 확인해야 하나요?

**답변**

로컬과 서버의 환경 차이로 생기는 문제이므로 다음 순서로 점검합니다.

- 서버모듈 쪽 파일과 lib 파일들이 서버에 제대로 올라가 있는지 확인합니다.
- 로컬과 서버의 `loadexcel.jsp` 내용이 서로 다르지 않은지 비교합니다.
- `ibsheet.cfg`의 `LoadExcel_url`에 설정된 경로의 JSP 파일을 확인합니다.
- 그 JSP 안에서 `setTempFolder`가 서버 환경에 맞게 설정되어 있는지 확인합니다. 서버 쪽 경로는 드라이브부터 정확히 설정해야 합니다.
- `LoadExcel.jsp` 안의 폴더 경로를 서버 환경에 맞게 설정하고, 로그를 출력해 어느 단계까지 진행되는지 확인해 볼 수 있습니다.

**키워드**: LoadExcel, LoadExcel_url, ibsheet.cfg, LoadExcel.jsp, setTempFolder, 로컬 정상 서버 오류

---

### [XLS-0464] LoadExcel 시 엑셀 파일을 읽는 중 예외(exception)가 발생하면 원인은 어디서 확인하나요?

**질문**

- LoadExcel 을 호출하면 엑셀 파일을 읽는 중에 예외가 발생했다는 exception 이 발생합니다. 어떤 경우에 이런 오류가 나고 어디서 원인을 확인하나요?
- 디버깅(localhost)에서는 엑셀 업로드(LoadExcel)가 잘 되는데 개발 서버에서만 오류가 납니다. 개발 서버에서 무엇을 확인해야 하나요?

**답변**

이 예외의 원인은 서버 콘솔에 출력되는 오류를 확인해야 알 수 있습니다. 다음 순서로 확인합니다.

- 브라우저 개발자 도구의 네트워크 탭에서 LoadExcel 로 호출되어 나가는 요청 본문과 응답 본문을 확인합니다.
- `LoadExcel.jsp`에서 예외를 출력하는 부분의 주석을 해제한 뒤, 서버 콘솔에 찍히는 오류가 있는지 확인합니다.
- 로컬(localhost)에서는 되는데 개발 서버에서만 오류가 나면, 개발 서버에 라이브러리 파일이 제대로 적용되었는지도 확인합니다.

**키워드**: LoadExcel, exception, 서버 콘솔 오류, LoadExcel.jsp, 네트워크 탭, 예외 출력 주석 해제

---

### [XLS-0465] LoadExcel이 안 되거나 에러가 날 때 서버모듈 세팅(jar·jsp·cfg)은 어떻게 확인하나요?

**질문**

- loadExcel이 잘 되지 않습니다. 서버모듈을 어떻게 세팅하고 필수로 확인할 것이 있나요?
- LoadExcel 을 하는데 에러가 발생합니다. 매우 오래된 버전의 LoadExcel 모듈을 계속 쓰고 있는 환경에서는 어떻게 해결하나요?

**답변**

서버모듈 가이드와 개발자 가이드 문서를 참고해 서버모듈을 세팅해야 합니다. 특히 jsp 링크와 jar 파일들이 제대로 import 되었는지 확인합니다.
아주 오래된 버전의 LoadExcel 모듈을 계속 사용하고 있으면 에러가 날 수 있습니다. 이 경우 서버모듈 2.0 기준으로 jar 파일, jsp 파일, cfg 설정을 적용하면 정상 동작합니다.

**적용 버전**: 서버모듈 2.0 기준

**키워드**: LoadExcel, 서버모듈 2.0, 서버모듈 세팅, jar, jsp, cfg, 오래된 버전

---

### [XLS-0466] JDK 1.4 환경의 엑셀 JSP에서 Down2Text와 LoadText를 사용할 수 있나요?

**질문**

- JDK 1.4 환경에서 사용할 엑셀 관련 JSP에서 Down2Text와 LoadText를 사용할 수 있나요? 지원 여부가 궁금합니다.

**답변**

JDK 1.4용 JSP는 업데이트된 내용이 없으며 `Down2Text`와 `LoadText`를 지원하지 않습니다. JDK 1.5용 JSP는 별도로 제공됩니다.

**키워드**: Down2Text, LoadText, JDK 1.4, JDK 1.5, 엑셀 JSP

---

### [XLS-0467] JDK 1.5 서버에서 LoadExcel 엑셀 업로드 시 XMLStreamException 오류가 발생합니다

**질문**

- JDK 1.5 를 사용하는 서버에서 LoadExcel 로 엑셀 업로드를 하면 XMLStreamException 오류가 발생합니다. 어떻게 해결하나요?

**답변**

JDK 1.5 를 사용하는 환경에서 LoadExcel 시 `XMLStreamException` 오류가 나면 `stax-api.jar` 를 추가해야 합니다.

**키워드**: XMLStreamException, stax-api.jar, JDK 1.5, LoadExcel

---

### [XLS-0468] LoadExcel() 호출 후 '처리중입니다'에서 멈추고 LoadExcel.jsp가 404 not found로 뜨는 이유는?

**질문**

- LoadExcel() 호출 후 처리중입니다 메시지나 대기 이미지에서 멈추고 LoadExcel.jsp가 404 not found로 뜹니다. 원인과 해결 방법은?

**답변**

`ibsheet.cfg`의 `LoadExcel_Url`에 설정한 `LoadExcel.jsp` 경로가 실제 파일 위치와 맞지 않아 발생합니다. 개발자도구의 네트워크 탭에서 404 not found를 확인하고, cfg에 설정하는 `LoadExcel.jsp`의 위치가 `ibsheet.js`에서 바라보는 디렉토리의 위치가 되도록 다시 설정합니다.

**키워드**: LoadExcel_Url, ibsheet.cfg, 404 not found, LoadExcel.jsp 경로, 처리중입니다, 대기 이미지 멈춤

---

### [XLS-0469] WEB-INF 안의 loadExcel.jsp를 직접 호출할 수 없을 때 ibsheet.cfg에는 어떻게 설정하나요?

**질문**

- loadExcel.jsp 같은 엑셀 처리용 jsp를 WEB-INF 안에 두면 접근이 안 되어 ibsheet.cfg에 설정할 수 없고, jsp를 직접 호출할 수도 없습니다. 스프링 환경에서 어떻게 하나요?

**답변**

jsp에 있는 내용을 서블릿(java 함수)으로 변환한 뒤 `ibsheet.cfg`의 url 호출 부분을 `xxx.do` 형태로 설정해 호출합니다.

**키워드**: WEB-INF, loadExcel.jsp, ibsheet.cfg, 서블릿 변환, do 호출, 스프링

---

### [XLS-0470] 엑셀 서버모듈을 업그레이드할 때 jar 교체 외에 loadexcel.jsp·directloadexcel.jsp에서 수정할 부분은?

**질문**

- IBSheet7 엑셀 서버모듈을 업그레이드할 때 jar 교체 외에 loadexcel.jsp와 directloadexcel.jsp에서 수정할 부분이 있나요?

**답변**

서버모듈의 `ibsheet7-1.1.135.jar`를 적용하고, jsp 폴더의 `loadexcel.jsp`, `directloadexcel.jsp`에서 `catch(Exception e)` 부분을 새 배포본(7.0.13.250-20240502-1409 배포본)을 참고해 기존 소스에 반영해야 합니다. 엑셀 로드 오류를 화면에 표시하려면 `OnLoadExcel` 이벤트도 삽입해야 합니다.

**적용 버전**: 7.0.13.250-20240502-1409 배포본

**키워드**: ibsheet7-1.1.135.jar, loadexcel.jsp, directloadexcel.jsp, catch(Exception e), OnLoadExcel, 서버모듈 업그레이드

---

### [XLS-0471] js 패치 후 LoadExcelError 속성 오류, 대기 이미지 멈춤, IE에서만 값 미세팅이 나면 loadexcel.jsp를 교체하나요?

**질문**

- 새 패치를 적용했는데도 엑셀 로드 후 정의되지 않음 또는 널 참조인 LoadExcelError 속성을 가져올 수 없다는 메시지가 뜹니다. 해결 방법은?
- LoadExcel 호출 시 대기 이미지가 나온 상태에서 멈추는 현상이 있습니다. 서버 loadexcel.jsp의 응답 형식 차이와 관련이 있나요?
- 엑셀 파일 업로드 시 파이어폭스에서는 값이 정상적으로 들어가는데 익스플로러에서는 시트에 값이 세팅되지 않습니다. 원인과 해결 방법은 무엇인가요?
- 엑셀 업로드(LoadExcel) 시 시트 컬럼 타입이 Text인데도 엑셀 값에 소수점 자리가 함께 붙어서 나옵니다. 원인과 해결 방법은 무엇인가요?

**답변**

서버의 `loadexcel.jsp`(또는 JAR)가 예전 버전이거나 js와 버전이 맞지 않으면 다음과 같은 증상이 나타날 수 있습니다. 공통 조치는 서버의 JSP를 최신 파일로 교체하는 것입니다.

- 패치 후에도 '정의되지 않음 또는 널 참조인 LoadExcelError 속성을 가져올 수 없습니다'라는 메시지가 뜨는 경우: 수정이 js 쪽에 반영된 경우에도 서버의 `loadexcel.jsp`를 함께 교체하면 정상 동작합니다. js뿐 아니라 `loadexcel.jsp`도 새 파일로 교체했는지 확인합니다.
- 대기 이미지에서 멈추는 경우: 멈춘 환경에서는 `loadexcel.jsp`가 `append^` 형태로 응답했으며 현재 버전은 `append=\u0003` 형태입니다. js와 `loadexcel.jsp`의 버전이 서로 달라 응답 형식이 맞지 않을 수 있으므로 최신 `loadexcel.jsp`로 교체해 확인합니다.
- IE에서만 시트에 값이 세팅되지 않는 경우: `LoadExcel.jsp`의 버그였으며 수정된 `LoadExcel.jsp` 파일을 적용하면 해결됩니다.
- Text 컬럼인데 소수점 자리가 붙어 나오는 경우: 서버의 `LoadExcel.jsp`가 예전 버전이어서 발생했을 수 있으며, 최신 JAR 파일과 JSP 파일로 교체해 볼 수 있습니다.

**키워드**: loadexcel.jsp 교체, LoadExcelError, 대기 이미지 멈춤, IE에서만 값 미세팅, Text 컬럼 소수점, append

---

### [XLS-0472] 서버모듈의 LoadExcel.jsp와 LoadText.jsp는 각각 무엇이고, LoadExcel이 안 되면 함께 배포할 JSP는?

**질문**

- 서버모듈에 포함된 LoadExcel.jsp와 LoadText.jsp는 각각 무엇을 위한 파일인가요? 각각 어떤 로딩 메소드를 적용하기 위해 쓰이나요?
- 엑셀 업로드(LoadExcel)가 아예 동작하지 않습니다. LoadExcel.jsp 외에 함께 배포해야 하는 다른 서버 쪽 JSP 파일이 따로 있나요?

**답변**

`LoadExcel.jsp`는 엑셀 로딩 전용인 `LoadExcel` 메소드를 적용하기 위한 서버 쪽 파일이고, `LoadText.jsp`는 txt 로딩 전용인 `LoadText` 메소드를 적용하기 위한 서버 쪽 파일입니다. LoadExcel이 동작하지 않으면 `Down2Text.jsp`와 `LoadExcel.jsp`를 같이 배포해야 하므로 두 파일이 모두 배포되어 있는지 확인합니다.

**키워드**: LoadExcel.jsp, LoadText.jsp, Down2Text.jsp, 서버모듈 JSP, JSP 함께 배포

---

### [XLS-0473] 소스 취약점 점검(FORTIFY)에서 LoadExcel.jsp·DirectLoadExcel.jsp가 취약 파일로 지적되면 어떻게 조치하나요?

**질문**

- 소스 취약점 점검(FORTIFY)에서 LoadExcel.jsp, DirectLoadExcel.jsp가 파일시스템 경로를 제어할 수 있는 취약 파일로 지적됩니다. 어떻게 조치하나요?

**답변**

해당 지적에는 IBSheet7과 호환되는 서버모듈 `ibsheet7-1.1.61` 버전대가 제공되었습니다. 이 버전대의 서버모듈로 교체해 대응합니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.61 버전대

**키워드**: FORTIFY, LoadExcel.jsp, DirectLoadExcel.jsp, ibsheet7-1.1.61, 소스 취약점 점검, 파일시스템 경로 제어

---

### [XLS-0474] 보안 점검에서 LoadExcel.jsp가 웹쉘 업로드에 취약하다고 지적될 때 확장자 검증은 어떻게 추가하나요?

**질문**

- 보안 점검에서 LoadExcel.jsp가 업로드 파일을 검증하지 않아 웹쉘 업로드 공격에 취약하다는 지적을 받았습니다. 확장자 검증 로직이 있나요? 없다면 어떻게 조치하나요?

**답변**

서버모듈 외에 추가로 제공되는 파일이나 로직은 없으며, 시큐어코딩 이슈는 제품 라이브러리 내에서 발생한 건에 한해 수정됩니다. 직접 수정할 수 있는 `LoadExcel.jsp`에서 다음과 같이 조치합니다.

- 업로드 파일명의 확장자를 화이트리스트 방식으로 검사해, 허용된 확장자일 때만 업로드 로직을 수행하고 아니면 exception을 발생시키는 코드를 직접 추가합니다.
- 허용하지 않을 확장자를 조건문으로 막는 방식도 가능합니다.

**키워드**: 웹쉘 업로드, 확장자 화이트리스트, LoadExcel.jsp, 시큐어코딩, 업로드 검증

---

### [XLS-0475] LoadExcel이 처리중에서 멈추거나 서버에서 안 될 때 서버 로그와 서버모듈 버전은 어떻게 확인하나요?

**질문**

- 서버모듈 1.0에서 LoadExcel이 처리중 표시만 뜨고 안 되거나 운영 서버에서 엑셀 로드가 안 될 때, 원인을 찾기 위한 서버 로그는 어떻게 확인하나요?
- 개발 서버에서 엑셀 업로드 오류가 다시 발생하는데 무엇을 확인해야 하나요? 서버모듈 버전과 LoadExcel.jsp 응답은 어떻게 확인하나요?

**답변**

서버모듈 1.0은 내부 logLevel에 따라 로그 출력이 달라지며, Down2Excel과 `LoadExcel.jsp`에 `IBLog.nLogLevel = 6;`처럼 설정하면 전체 로그가 출력됩니다. 레벨은 LOG_OFF=0, LOG_FATAL=1, LOG_ERROR=2, LOG_WARN=3(기본), LOG_INFO=4, LOG_DEBUG=5, LOG_TRACE=6입니다. 추가로 다음을 확인합니다.

- `LoadExcel.jsp` 하단의 `e.printStackTrace();`로 에러 로그를 확인할 수 있습니다.
- 서버의 lib 폴더에 있는 파일이 변경되었는지 확인합니다.
- `Down2Excel.jsp` 안에 `System.out.println()`으로 버전을 찍어 보는 부분이 있으므로 이를 `LoadExcel.jsp`에 넣어 서버모듈 버전을 확인합니다.
- `LoadExcel.jsp`로 호출된 request의 response 내용이 정상적으로 왔는지 확인합니다.

**적용 버전**: 서버모듈 1.0

**키워드**: IBLog.nLogLevel, LOG_TRACE, 서버 로그, printStackTrace, 서버모듈 버전 확인, LoadExcel 처리중

---

### [XLS-0476] LoadExcel로 업로드한 엑셀 파일의 용량·크기를 서버 LoadExcel.jsp에서 확인하려면 어떻게 하나요?

**질문**

- LoadExcel로 엑셀을 업로드할 때 업로드되는 파일의 용량을 확인하는 전용 메서드가 있나요? 서버 쪽 JSP에서 용량을 체크하려면 어떻게 해야 하나요?
- LoadExcel로 업로드한 엑셀 파일의 크기를 서버 쪽 LoadExcel.jsp에서 알고 싶습니다. 어떤 코드로 파일 크기를 구할 수 있나요?

**답변**

LoadExcel 시 업로드 파일의 용량을 체크하는 전용 메서드는 없습니다. 서버 쪽 `LoadExcel.jsp`에서 다음 방법으로 확인할 수 있습니다.

- `request.getContentLength()`로 업로드된 파일의 용량을 체크합니다.
- `ibExcel.getUploadFileName()`으로 서버에 저장된 업로드 파일명을 얻은 뒤 `File fn = new File(uploadFileName);`처럼 파일 객체를 만들고 `fn.length()`를 호출하면 파일 크기를 알 수 있습니다.

**키워드**: getContentLength, getUploadFileName, fn.length, 업로드 파일 용량, 파일 크기 체크

---

### [XLS-0477] 서버 jar가 중복되거나 버전이 섞여 있어 Down2Excel 오류가 날 때 점검 방법

**질문**

- 서버에 ibsheet7 jar나 POI 등 jar가 중복되거나 버전이 섞여 있으면 Down2Excel 오류나 옵션 미동작이 생기나요? 어떻게 정리해야 하나요?
- 예전 버전에서는 엑셀 다운로드가 잘 됐는데 새 버전으로 바꾸니 에러가 납니다. 서버 jar 충돌을 어떻게 점검하나요?
- 새 프로젝트에 서버모듈을 적용했더니 엑셀 다운로드 시 에러가 발생합니다. 기존 프로젝트에서 쓰던 jar와 충돌하는 것으로 보입니다.

**답변**

클라이언트가 아니라 서버 lib의 jar 충돌일 수 있습니다. 서버 lib 파일들의 버전이 서로 맞지 않거나 jar가 중복 호출되면 Down2Excel이 오류를 낼 수 있습니다.

- 엑셀 다운로드에 필요한 jar는 종속 라이브러리 5개와 ibsheet로 시작하는 jar 파일입니다. 불필요하거나 의심되는 jar를 제거하면서 확인합니다.
- ibsheet7 jar가 두 버전(예: 1.1.63, 1.1.87) 함께 있으면 하나를 지우고 빠진 lib 파일을 보충합니다. jar가 둘 적용되어 `AutoSizeColumn`이 잘 동작하지 않는 경우도 가장 높은 버전 하나만 남기고 다시 확인합니다.
- maven에서 poi 등 jar가 중복 호출되면 pom.xml에서 중복을 제거합니다.
- 서버모듈 1.1.83은 함께 배포되는 jar 중 poi, json-simple 등 기존 프로젝트에 이미 있는 jar와 중복되는 것을 제외하고 나머지를 넣어 확인합니다. 종속 라이브러리 지원 버전은 명확하지 않으나 poi 3.10에서는 정상 동작이 확인되었습니다.

**적용 버전**: 서버모듈 1.1.83(poi 3.10에서 확인)

**키워드**: Down2Excel, jar 충돌, pom.xml, AutoSizeColumn, poi, ibsheet7 jar, 서버모듈

---

### [XLS-0478] Down2Excel options에 merge:1을 주면 엑셀 파일이 손상되었다는 메시지가 나올 때

**질문**

- Down2Excel() 사용 시 options에 merge:1로 설정하면 엑셀 파일이 손상되었다는 메시지가 나옵니다. 원인이 무엇인가요?

**답변**

Maven 프로젝트의 `pom.xml`에 `poi-ooxml-schema`가 없는 것이 원인으로 의심됩니다. 서버모듈 2.0.85를 적용했을 때는 정상적으로 저장되는 것이 확인되었으므로 해당 의존성이 포함되어 있는지 점검합니다.

**적용 버전**: 서버모듈 2.0.85에서 정상 확인

**키워드**: Down2Excel, merge:1, poi-ooxml-schema, pom.xml, 파일 손상, 서버모듈 2.0.85

---

### [XLS-0479] itext-2.1.6.jar와 itext-2.1.7.jar는 무엇이 다른가요?

**질문**

- 서버에 itext-2.1.6.jar가 있는데 배포된 서버모듈 패키지에는 itext-2.1.7.jar가 들어 있습니다. 두 버전은 무엇이 다른가요?

**답변**

itext-2.1.6.jar와 itext-2.1.7.jar는 별 차이점이 없습니다.

**키워드**: itext-2.1.6.jar, itext-2.1.7.jar, 서버모듈, jar 버전

---

### [XLS-0480] 서버모듈 jar를 새 버전(2.1.21 이후)으로 교체한 뒤 엑셀 다운로드가 되지 않을 때(dom4j 누락)

**질문**

- 서버모듈 jar를 새 버전으로 교체한 뒤 엑셀 다운로드가 되지 않고, 이전 버전 jar로 되돌리면 정상 동작합니다. 원인은 무엇인가요?

**답변**

서버모듈 2.1.21에서 추가된 `ReportXmlUrl` 기능 때문에 lib에 dom4j-1.6.1.jar가 있어야 하는데, 이 jar가 없으면 엑셀 다운로드가 동작하지 않는 현상이 나타납니다. 해당 라이브러리를 lib에 추가합니다.

**적용 버전**: 서버모듈 2.1.21 이상

**키워드**: dom4j-1.6.1.jar, ReportXmlUrl, 서버모듈 2.1.21, 엑셀 다운로드, lib

---

### [XLS-0481] Down2Excel 호출 시 500 에러, classNotFound, JSP import 오류(package does not exist)가 날 때

**질문**

- down2Image.jsp의 import 경로에 빨간 줄이 표시되거나 Down2Excel 실행 시 classNotFound 에러가 납니다. 무엇을 확인해야 하나요?
- Down2Excel 호출 시 500 에러가 나거나 JSP 컴파일 오류(package ... does not exist)가 발생합니다. 원인과 확인 방법은 무엇인가요?

**답변**

서버모듈 jar(ibsheet7-1.1.XX.jar)가 lib에 등록되지 않았거나 로딩되지 않았거나, IBSheet 서버모듈이 사용하는 jar 파일이 모두 올라가지 않아 발생했을 가능성이 큽니다.

- lib 폴더에 ibsheet7-XXX.jar, poi-3.13-all(또는 poi), poi-ooxml, poi-ooxml-schema가 들어 있는지, pom.xml에 해당 파일의 경로가 잡혀 있는지 확인합니다.
- `System.out.println(com.ibleaders.ibsheet.util.Version.getVersion());`로 jar 라이브러리를 확인하고 없는 jar를 추가합니다.

**키워드**: classNotFound, Down2Excel, 500 에러, ibsheet7-1.1.XX.jar, poi-ooxml, Version.getVersion, pom.xml

---

### [XLS-0482] 서버모듈 1.x와 2.x의 JSP와 클래스를 섞어 쓰면 엑셀 다운로드 시 '에러가 발생하였습니다.'가 나오나요?

**질문**

- 엑셀 다운로드 시 '에러가 발생하였습니다.'가 뜨거나 JSP에서 ibsheet7 관련 클래스 import가 되지 않습니다. 서버모듈 1.x와 2.x를 섞어 써도 되나요?

**답변**

서버모듈 1.x와 2.x는 JSP와 클래스 구성이 달라 섞어 쓰면 안 됩니다. 2.x용 Down2Excel.jsp를 1.x 서버모듈(예: ibsheet7-1.1.118.jar)에 적용하면 IBSheetDown 객체에서 충돌이 일어나 정상 동작하지 못할 수 있고, 서버모듈 2.0 환경에서 1.0 기준 방식으로 class를 추가해 쓰면 사용되지 않을 수 있습니다. 사용 중인 서버모듈 버전에 해당하는 JSP와 라이브러리로 교체합니다.

**키워드**: Down2Excel.jsp, IBSheetDown, 서버모듈 1.x, 서버모듈 2.x, ibsheet7-1.1.118.jar

---

### [XLS-0483] 엑셀 다운로드와 업로드가 서로 다른 버전의 서버모듈 jar를 참조할 때 오류

**질문**

- 엑셀 다운로드와 업로드가 정상적으로 되지 않습니다. 다운로드와 로드가 서로 다른 버전의 서버모듈 jar를 참조하는데 문제가 되나요?

**답변**

다운로드 쪽과 로드 쪽이 서로 다른 jar(예: 1.1.26.jar, 2.0.54.jar)를 참조하는데 Maven 설정으로 한쪽 jar만 import되어 있으면, 다른 쪽(엑셀 로드)에서 오류가 발생합니다. 업그레이드 시 붙여넣기 실수가 원인이라면 하나의 jar만 참조하도록 통일합니다. Maven 설정(pom.xml)의 jar 버전을 바꾸고 해당 버전의 jsp를 적용한 뒤, down2excel.jsp의 `webRootPath`와 loadexcel.jsp의 `setTempFolder`를 기존과 동일하게 설정합니다.

**키워드**: pom.xml, webRootPath, setTempFolder, down2excel.jsp, loadexcel.jsp, jar 버전

---

### [XLS-0484] 로컬(개발)에서는 엑셀 다운로드·업로드가 되는데 서버(운영)에서만 안 되거나 500 에러가 날 때

**질문**

- 엑셀 다운로드가 로컬에서는 잘 되는데 운영서버에 올리면 500 에러가 발생합니다.
- 로컬 개발 환경에서는 엑셀 다운로드가 정상인데 개발·운영 서버에서는 동작하지 않습니다. 무엇을 확인해야 하나요?
- 같은 소스인데 로컬에서는 4단 헤더를 잘 찾아 엑셀이 업로드되고 서버(리눅스)에서는 헤더를 찾지 못합니다.
- 엑셀 다운로드가 개발 환경에서는 잘 되는데 운영 환경에서는 아무 반응이 없습니다.

**답변**

개발과 운영(로컬과 서버)의 서버모듈 jar와 종속 라이브러리가 달라서 발생하는 경우가 많습니다.

- 서버모듈과 종속 라이브러리가 로컬과 서버에 동일하게 올라가 있는지 확인합니다. `ibsheet.jar`만 넣고 다른 라이브러리를 확인하지 않으면 문제가 생기며, 정상 동작하는 환경을 기준으로 WEB-INF/lib 아래 파일들을 맞춥니다.
- 서버모듈 1.1.80처럼 해당 버전에 필요한 jar 파일 목록과 서버에 올라간 파일을 비교합니다.
- 서버모듈 ibsheet7.2.0.53.jar의 경우 batik-all-xml.jar, commons-codec-1.10.jar, commons-logging-1.1.3.jar, log4j-1.2.13.jar, poi-3.13-all.jar가 운영 서버에 있는지 확인합니다. jar가 충돌해도 오류가 날 수 있으므로 Down2Excel.jsp의 catch 구문에서 `printstacktrace` 주석을 풀어 서버 로그에서 에러를 확인합니다.

**키워드**: WEB-INF/lib, jar 목록, poi-3.13-all.jar, batik-all-xml.jar, printstacktrace, Down2Excel.jsp, 로컬 서버 차이

---

### [XLS-0485] 개발·운영 서버모듈 jar가 동일한데 엑셀 문서 결과가 다른 이유

**질문**

- 개발 서버와 운영 서버의 서버모듈 jar 파일이 동일한데도 엑셀 문서 결과가 서로 다릅니다. 원인이 무엇인가요?

**답변**

jar 파일이 동일해도 Java 버전이 다르면 엑셀 문서 결과가 달라질 수 있습니다. 그 외의 경우에는 개발과 운영의 서버모듈 버전을 맞추면 됩니다.

**키워드**: Java 버전, 서버모듈, 엑셀 결과 차이, 개발 운영

---

### [XLS-0486] 윈도우 테스트 서버에서는 되는 엑셀 업로드가 유닉스 운영 서버에서 동작하지 않을 때

**질문**

- IBSheet7 엑셀 업로드가 윈도우 테스트 서버에서는 되는데 유닉스 운영 서버에서는 동작하지 않습니다. 어디를 점검해야 하나요?

**답변**

먼저 LoadExcel.jsp에서 `setTempFolder`(임시 저장 폴더 설정)에 지정한 경로가 정상인지 확인합니다. 엑셀 업로드는 서버측 POI 라이브러리와 관련이 있으므로 안 될 때 서버에 어떤 오류가 발생하는지 확인하고, 제공되는 POI3.9 라이브러리(`poi-3.9-20121203.jar`, `poi-ooxml-3.9-20121203.jar`, `poi-ooxml-schemas-3.9-20121203.jar`) 외에 다른 버전의 POI 파일이 서버에 있지 않은지 확인합니다.

**키워드**: setTempFolder, LoadExcel.jsp, POI3.9, poi-3.9-20121203.jar, 유닉스, 엑셀 업로드

---

### [XLS-0487] 서버에 올리면 엑셀 다운로드·업로드가 아무 반응이 없거나 경로 에러(500)가 날 때 확인 항목

**질문**

- 로컬과 달리 서버에 올리면 엑셀 다운로드·업로드가 아무 반응이 없거나 경로 에러(500)가 납니다. 어떤 항목을 확인해야 하나요?

**답변**

WEB-INF/lib 하위에 ibsheet7 서버모듈 jar와 poi 라이브러리가 모두 올라갔는지, jsp 파일이 해당 위치에 있는지 확인합니다. ibsheet.cfg의 `Down2Excel_url`, `LoadExcel_url`에 설정한 jsp 경로가 실제 파일 경로와 일치하는지도 확인합니다. 경로 에러(500)가 날 때도 이 경로에 jsp 파일이 있는지 확인합니다.

**키워드**: Down2Excel_url, LoadExcel_url, WEB-INF/lib, ibsheet.cfg, 500, jsp 경로

---

### [XLS-0488] 엑셀 업로드 시 파일 선택창은 뜨지만 이후 진행되지 않고 응답 500 오류가 날 때

**질문**

- 엑셀 업로드 시 파일 선택창은 뜨지만 이후 진행되지 않고 응답 500 오류가 발생합니다. 원인이 무엇인가요?

**답변**

업로드 jsp에 외부 jar를 사용하는 로직을 추가했는데 서버에 해당 jar가 없으면 compile error가 발생해 500 오류가 납니다. 제공되는 jsp를 그대로 올려 사용하면 정상 동작합니다.

**키워드**: 엑셀 업로드, 500, compile error, 외부 jar, jsp

---

### [XLS-0489] 서버에서 실제 사용되는 서버모듈 jar·POI 버전을 확인하고 Down2Excel 오류 구간을 보려면(Version.getVersion, setLog)

**질문**

- Down2Excel 엑셀 다운로드 오류의 정확한 원인을 확인하려면 서버모듈에서 어떤 로그를 켜고 무엇을 확인해야 하나요?
- 엑셀·텍스트 업로드나 다운로드 오류가 서버에서만 발생합니다. 서버에서 실제로 사용되는 서버모듈 jar와 POI 라이브러리 버전을 확인하려면 어떻게 하나요?

**답변**

- 버전 확인: 서버모듈 JSP 상단에 `System.out.println(Version.getVersion());`을 넣으면 jar와 POI 버전 정보가 서버 로그에 출력됩니다. 엑셀 다운로드는 Down2Excel.jsp, 엑셀 업로드는 LoadExcel.jsp, 텍스트 업로드는 LoadText.jsp에 넣습니다. import하는 패키지명에 따라 `com.ibleaders.ibsheet7.util.Version.getVersion()` 또는 `com.ibleaders.ibsheet.util.Version.getVersion()`을 사용합니다.
- 다운로드 로그: 다운로드 처리 코드에서 `down = new IBSheetDown();` 다음에 `down.setLog(true);`를 추가하면 더 정확한 오류 구간을 확인할 수 있습니다. 서버 콘솔에는 POI 관련 클래스별 jar path, jar Version, Required Version이 출력됩니다.
출력된 버전이 제공된 서버모듈의 라이브러리 버전과 일치하는지, 로컬 환경과 서버 환경에 차이가 없는지 확인합니다.

**키워드**: Version.getVersion, setLog, IBSheetDown, Down2Excel.jsp, LoadExcel.jsp, LoadText.jsp, POI 버전

---

### [XLS-0490] 리눅스 서버에 배포한 뒤 엑셀 업로드 시 예외 alert이 뜰 때 서버 로그로 원인 확인(POI 누락)

**질문**

- 리눅스 서버에 배포한 뒤 엑셀을 업로드하면 예외가 발생했다는 alert이 뜹니다. 서버모듈 2.x 환경에서 서버 로그로 원인을 어떻게 확인하나요?

**답변**

에러 로그상 POI가 없어 발생하는 문제일 수 있습니다. POI가 없으면 서버모듈 2.0은 SAXParser를 사용해 엑셀을 업로드·다운로드하는데, 이 기능이 제대로 동작하지 않을 수 있습니다. Down2Excel.jsp 상단에 `System.out.println(Version.getVersion());`을 넣어 jar와 POI 버전을 확인하고, LoadExcel.jsp에서 `load.setLog(true);`를 사용해 처리 과정 로그에서 문제 부분을 확인한 뒤 필수 jar 중 누락된 것이 없는지 점검합니다.

**키워드**: SAXParser, POI, setLog, Version.getVersion, LoadExcel.jsp, 서버모듈 2.0

---

### [XLS-0491] 엑셀 업로드·다운로드 시 ZipSecureFile ThresholdInputStream ClassCastException 오류

**질문**

- 엑셀 업로드(LoadExcel) 시 ZipSecureFile$ThresholdInputStream cannot be cast to ZipFile$ZipFileInputStream 형태의 ClassCastException이 발생합니다. 원인과 확인 방법은 무엇인가요?
- 엑셀 다운로드 시 로컬에서는 정상인데 서버에서만 ClassCastException이 납니다.

**답변**

라이브러리 버전이 맞지 않거나 다른 라이브러리와 충돌하면서 발생한 오류일 수 있습니다. 로그상 poi의 ZipSecureFile 클래스와 java.util.zip.ZipFile 클래스가 충돌하는 것으로 보입니다.

- 로컬에서는 정상인데 서버에서만 오동작한다면 로컬과 서버의 라이브러리가 동일한지 확인합니다. 서버모듈 제공 jar(batik-all-xml.jar, commons-codec-1.10.jar, commons-logging-1.1.3.jar, log4j-1.2.13.jar, poi-3.13-all.jar)가 서버에 정상적으로 올라가 있는지 확인합니다.
- 충돌하는 라이브러리를 제거해야 할 수 있으며, 프로젝트에 `ZipFile.java` 파일이 있다면 제거한 뒤 다시 빌드해 테스트합니다.
- 서버모듈 버전은 LoadExcel.jsp 상단의 `//System.out.println(com.ibleaders.ibsheet7.util.Version.getVersion());` 주석을 해제하고 업로드한 뒤 서버 로그로 확인합니다.

**키워드**: ClassCastException, ZipSecureFile, ZipFile.java, poi-3.13-all.jar, LoadExcel.jsp, Version.getVersion

---

### [XLS-0492] Down2Excel.jsp의 Synchronizer.init 값을 5에서 10으로 올리면 부하는? bToken이 false로 나오는 오류

**질문**

- Down2Excel.jsp의 Synchronizer.init(5)를 10으로 바꾸면 서버 부하가 얼마나 늘어나나요?
- bToken이 false로 나오는 오류가 발생하는데 어떻게 하나요?

**답변**

`Synchronizer.init` 값은 동시에 처리할 수 있는 엑셀 다운로드 작업 수를 제한하며, 5에서 10으로 올리면 서버의 최대 부하(메모리/CPU)도 최대 약 2배까지 증가할 수 있습니다. `bToken`이 false가 되는 것은 동시 접속이 설정 수를 초과할 때뿐 아니라 다운로드 시점에 서버 가용 메모리가 부족할 때도 발생하므로 메모리 부족 신호일 수 있고, 이때 값을 올리면 오류가 더 잦아지거나 OutOfMemory가 발생할 수 있습니다. 먼저 bToken=false 시점의 서버 메모리 사용량을 파악하며, `bToken = Synchronizer.use(true);`를 쓰면 bToken이 false가 되는 조건이 완화됩니다.

**키워드**: Synchronizer.init, bToken, Synchronizer.use, Down2Excel.jsp, OutOfMemory, 동시 다운로드

---

### [XLS-0493] 서버모듈(jsp) 엑셀 다운로드의 서버 부하와 대용량(DirectDown2Excel 10만 건) Out Of Memory 대처

**질문**

- 서버모듈(jsp)로 엑셀을 다운로드할 때 동시접속자가 많거나 엑셀 다운로드 기능이 많으면 서버 부하가 생기나요?
- DirectDown2Excel로 10만 건 정도를 엑셀 다운로드하면 메모리 관련 Out Of Memory 오류가 발생합니다. 대처 방법이 있나요?

**답변**

서버모듈(jsp 파일)로 다운로드하면 서버의 메모리를 사용하므로 동시접속자가 많거나 엑셀 다운로드 기능이 많으면 서버에 부하가 발생합니다. 대용량에서 Out Of Memory가 나면 다음을 확인합니다.

- 다운로드하는 파일의 확장자가 xlsx인지 확인합니다. xlsx이면 메모리 사용량이 줄어듭니다.
- 서버모듈 2.0은 메모리 사용량이 더 줄어들지만 업그레이드가 필요합니다(서버모듈 1.1.79 사용 사례).
- 업그레이드 후에도 줄지 않으면 메모리 증설을 고려합니다.

**적용 버전**: 서버모듈 2.0에서 메모리 사용량 추가 감소

**키워드**: DirectDown2Excel, Out Of Memory, xlsx, 서버모듈 2.0, 서버 부하, 메모리

---

### [XLS-0494] 운영 서버 엑셀 다운로드 시 tmp 폴더의 poi-sxssf-sheet xml 파일을 찾지 못하는 FileNotFoundException

**질문**

- 운영 서버에서 엑셀 다운로드 시 java.io.FileNotFoundException으로 tmp 폴더의 poi-sxssf-sheet xml 파일을 찾지 못한다는 오류가 납니다. 원인과 해결 방법은 무엇인가요?

**답변**

WAS를 실행하는 계정이 tmp 폴더에 대한 권한이 없어서 발생하는 문제입니다. 그 계정에 tmp 폴더 접근 권한을 주거나, ibsheet7-1.1.7x.jar로 버전을 올리고 Down2Excel.jsp에서 `Down2Excel ibExcel = new Down2Excel( true );`로 설정합니다.

**적용 버전**: ibsheet7-1.1.7x.jar 이상

**키워드**: FileNotFoundException, tmp 폴더, poi-sxssf-sheet, new Down2Excel( true ), WAS 계정 권한

---

### [XLS-0495] 컬럼이 수백 개일 때 엑셀 다운로드가 Down2excel.zip으로 받아지며 'Zip bomb detected' 오류가 나는 경우

**질문**

- 엑셀 다운로드 시 컬럼 개수가 많아지면 Down2excel.zip 파일로 내려받아집니다. 원인이 무엇인가요?

**답변**

컬럼 개수가 수백 개 이상이 되면 `java.io.IOException: Zip bomb detected!` 에러가 발생합니다. 정확한 컬럼 개수 기준은 확인되지 않았으며, 서버모듈 2.0.53에서 확인된 사례입니다.

**적용 버전**: 서버모듈 2.0.53에서 확인

**키워드**: Zip bomb detected, Down2excel.zip, 컬럼 수, 서버모듈 2.0.53

---

### [XLS-0496] Down2Excel TempFile 템플릿 파일에 DRM이 걸려 있어도 되나요?

**질문**

- Down2Excel에서 TempFile로 사용하는 파일에 DRM이 걸려 있어도 되나요?
- TempFile 템플릿은 반드시 DRM을 해제해야 하나요?

**답변**

DRM이 걸린 파일은 사용할 수 없습니다. TempFile은 사용자 PC가 아니라 서버에서 POI 라이브러리를 통해 직접 처리되므로, DRM이 걸려 있으면 파일에 접근 자체가 되지 않습니다. TempFile로 쓰는 파일은 반드시 DRM이 해제된 상태여야 합니다.

**키워드**: TempFile, Down2Excel, DRM, POI, 템플릿

---

### [XLS-0497] 엑셀 다운로드 파일이 0KB(용량 0)로 내려오는 원인과 해결

**질문**

- 엑셀 다운로드 시 파일은 내려오는데 파일 사이즈가 0으로 나옵니다.
- 레진 서버 환경에서 엑셀 다운로드를 하면 파일이 0KB로 내려옵니다.

**답변**

원인은 두 가지가 있습니다.

- 임시 파일 경로 미설정: `down2excel.jsp`가 예전에는 파일을 생성하지 않고 바로 내려보냈지만 최신 버전에서는 파일을 쓰고 그 파일을 다운로드하는 방식으로 바뀌었습니다. 이 방식에서 임시 파일 경로 설정을 하지 않으면 파일 크기가 0으로 내려옵니다.
- 응답에 파일 크기 미지정: 레진 서버 환경에서는 응답에 파일 사이즈를 알려주지 않아 0KB로 내려오는 경우가 있으며, 서버모듈에서 `response.setContentLength`를 추가해 파일 크기를 지정합니다.

**키워드**: 0KB, 파일 사이즈 0, response.setContentLength, down2excel.jsp, 레진, 임시 폴더

---

### [XLS-0498] 엑셀 다운로드 503 에러나 간헐적 다운로드 실패, 서버 temp 폴더 용량 문제

**질문**

- 운영 서버에서 엑셀 다운로드 시 503 에러가 나거나 간헐적으로 zip 파일이 내려옵니다.
- 엑셀 다운로드를 구현했는데 에러가 발생하지 않는데도 간헐적으로 파일이 내려오지 않습니다.

**답변**

서버 temp 폴더의 용량이 가득 차 임시 파일을 쓰지 못하는 현상일 수 있습니다. Down2Excel 사용 시 temp 폴더에 임시 파일을 쓰지 않는 `ibsheet7-1.1.80.jar`로 교체하면 해결됩니다. 에러 없이 파일이 떨어지지 않는 간헐적 현상은 서버모듈 1.1.112 버전에서 처리되었으므로, 해당 서버모듈을 적용하고 `Down2Excel.jsp`도 함께 제공된 파일로 교체해 확인합니다. 정확한 원인이 파악되지 않은 경우에도 서버 Temp 폴더의 파일 용량을 먼저 점검합니다.

**적용 버전**: ibsheet7-1.1.80.jar에서 해결, 서버모듈 1.1.112에서 처리

**키워드**: 503, temp 폴더, ibsheet7-1.1.80.jar, 서버모듈 1.1.112, Down2Excel.jsp, zip 파일

---

### [XLS-0499] 서버에서 엑셀 다운로드·업로드가 안 될 때 임시 폴더(ib_tmp, tmpFolder) 확인

**질문**

- 엑셀 다운로드가 잘 되다가 운영에서 갑자기 안 되고 XML을 만드는 부분에서 예외가 발생합니다.
- 로컬에서는 정상인데 서버에 올리면 다운로드한 엑셀이 열리지 않고 서버에 IO 에러가 보입니다.
- 서버가 여러 대(클러스터)인 환경에서 Down2Excel로 다운로드하면 에러가 납니다.
- 유닉스 서버에서 엑셀 로드(업로드)가 되지 않습니다.

**답변**

서버모듈은 엑셀 파일을 생성·업로드할 때 임시 폴더를 사용합니다. 서버모듈을 사용하면 `java_temp\ib_tmp` 폴더가 자동 생성되고 업로드된 엑셀 파일이 이 위치에 저장됩니다. 다음을 확인합니다.

- 임시 폴더의 쓰기 권한이 없어졌거나 부족하면(IO 에러) 다운로드·열기가 실패할 수 있습니다. 서버 쪽 권한과 소유권을 점검하고 권한을 충분히 부여하면(예: 777) 정상 동작한 사례가 있습니다. 권한 문제일 때 `Down2Excel.jsp`에서 `Down2Excel ibExcel = new Down2Excel(false);`처럼 false를 넣어 볼 수 있습니다.
- 서버가 여러 대인 환경에서는 `ib_tmp` 폴더가 한 서버에만 생성되고 나머지에는 생성되지 않을 수 있습니다. 나머지 서버에도 `ib_tmp` 폴더를 수동으로 생성하면 정상 동작한 사례가 있습니다.
- 같은 서버에서 IBSheet를 쓰는 다른 시스템과 함께 운영하면 컨테이너별로 폴더 접근 권한이 다른지 확인합니다. 단독 서버면 무시해도 됩니다.
- 유닉스 서버에서 엑셀 로드가 안 되면 `tmpFolder` 경로가 서버 환경에 맞게 설정되어 있는지 확인합니다.

**키워드**: ib_tmp, java_temp, tmpFolder, 임시 폴더 권한, new Down2Excel(false), 클러스터, 유닉스

---

### [XLS-0500] 엑셀 다운로드가 무반응이거나 '처리중' 상태로 멈출 때 ibsheet.cfg 경로 확인

**질문**

- 엑셀 다운로드를 누르면 대기 이미지나 처리중 메시지만 뜬 채 멈추고 파일이 내려오지 않습니다.
- jar와 lib는 정상 등록되어 있는데 엑셀 다운로드를 하면 아무 반응이 없거나 업그레이드 후 안 됩니다.
- 엑셀 다운로드가 동작하지 않을 때 먼저 확인해야 할 경로는 무엇인가요?

**답변**

`ibsheet.cfg`에 설정한 엑셀 다운로드 경로(`Down2Excel_Url`)가 실제 JSP 위치와 맞지 않는 경우가 많습니다.

- `down2Excel()` 메서드를 호출하면 cfg에 설정된 경로의 JSP로 연결됩니다. 경로가 틀렸거나 제품 제공 파일이 아닌 JSP(예: down2ExcelLoad.jsp)를 호출하면 다운로드되지 않습니다.
- JSP 경로를 바꾸었다면 `ibsheet.cfg`에도 반영합니다. 웹 서버와 WAS를 분리한 환경에서는 JSP가 있는 경로를 http 주소로 직접 호출하도록 써도 됩니다.
- 브라우저 개발자 도구의 네트워크 탭에서 다운로드 시 호출되는 페이지의 response status를 확인합니다. 404가 나오면 경로를 맞춥니다.

**키워드**: ibsheet.cfg, Down2Excel_Url, down2Excel, 404, 경로 설정, 개발자 도구

---

### [XLS-0501] 다운로드 다이얼로그에서 텍스트 파일 다운로드(Down2Text)가 동작하지 않을 때

**질문**

- 다운로드 다이얼로그에서 텍스트 파일 다운로드 라디오 버튼을 선택하면 다운로드가 동작하지 않습니다.
- 7.0.13.25 버전에서 down2Text로 텍스트 다운로드가 잘 되지 않습니다. 버전이 낮아서 그런가요?

**답변**

7.0.13.25 버전에서도 텍스트 다운로드를 사용할 수 있으며, cfg 설정이 잘못된 것이 원인일 수 있습니다. 백엔드 설정이 정상이면 텍스트 파일 다운로드가 동작해야 합니다. 다음을 확인합니다.

- `IBSheet.cfg`의 `Down2Text_Url`(예: `./jsp/Down2Text.jsp`)이 텍스트 다운로드 URL로 호출되도록 설정되어 있는지 확인합니다.
- 해당 JSP가 제공된 JSP와 동일하게 적용되어 있는지 확인합니다.
- 설정이 정상인데도 오류가 나면 JSP의 `e.printStackTrace();` 주석을 해제하고 서버 콘솔 로그에서 에러 내용을 확인합니다.

**적용 버전**: 7.0.13.25에서도 지원

**키워드**: Down2Text_Url, Down2Text.jsp, down2Text, 텍스트 다운로드, IBSheet.cfg

---

### [XLS-0502] IIS 환경에서 엑셀 다운로드·리포트 URL 호출이 안 될 때 확인할 설정

**질문**

- Visual Studio의 브라우저에서 보기로는 엑셀 리포트 URL이 정상 호출되는데 IIS에서는 호출되지 않습니다.
- IIS 환경에서 엑셀 다운로드가 되지 않고 maxPostSize 한계가 원인으로 보입니다.

**답변**

IIS에서만 호출이 안 되면 다음을 확인합니다.

- IIS의 익명 인증 설정 때문에 호출되지 않는 것일 수 있습니다.
- 다운로드 요청 크기가 `maxPostSize` 한계를 넘는 경우, IIS에서는 `maxAllowedContentLength` 값을 변경합니다. 값을 늘리거나 무제한으로 바꿉니다.

**키워드**: IIS, maxAllowedContentLength, maxPostSize, 익명 인증, 엑셀 리포트

---

### [XLS-0503] 특정 화면에서 엑셀 다운로드 시 400 에러가 발생하는 원인

**질문**

- 특정 페이지에서 엑셀 다운로드를 하면 400 에러가 발생합니다.
- 요청의 content-length가 긴 화면에서만 엑셀 다운로드 시 400 bad request가 납니다.

**답변**

두 가지 원인을 확인합니다.

- 다운로드 버튼에 href를 걸고 `return false;` 처리하는 방식이 원인일 수 있습니다. 이 경우 이미지에 onClick 이벤트를 바로 거는 방식으로 변경합니다.
- 요청 content-length가 긴 화면에서만 발생하면, 서버가 JEUS인 경우 content-length가 허용 길이를 초과할 때 400 bad request가 발생할 수 있습니다. JEUS 매뉴얼에 Header Maxcount 초과 시 400 에러가 난다고 되어 있으므로 서버 설정을 확인합니다.

**키워드**: 400 에러, bad request, content-length, JEUS, href, onClick

---

### [XLS-0504] ibsheet.css 수정 후 엑셀 다운로드가 안 될 때 배경색 표기 확인

**질문**

- ibsheet.css를 수정한 뒤 엑셀 다운로드가 되지 않습니다. css의 어떤 부분을 확인해야 하나요?

**답변**

`ibsheet.css`에서 GMCell의 배경색이 `#fff`처럼 3자리 색상 표기로 되어 있던 것이 원인이었던 사례가 있습니다. 해당 색상을 모두 `#ffffff`처럼 6자리로 변경하면 정상 동작합니다.

**키워드**: ibsheet.css, GMCell, #fff, #ffffff, 엑셀 다운로드 안 됨

---

### [XLS-0505] xlsx 다운로드 시 temp 폴더·poifiles 관련 FileNotFoundException, IOException 오류

**질문**

- xlsx로 엑셀을 다운로드하면 윈도우에서는 정상인데 리눅스 서버에서는 파일 복구 경고가 뜨고 poi-sxssf-sheet 임시 파일 FileNotFoundException이 납니다.
- xlsx로 엑셀 다운로드 시 'java.io.IOException: 그런 파일이나 디렉터리가 없습니다' 오류가 간헐적으로 발생합니다.
- xlsx로 엑셀을 다운로드할 때 운영 서버에서만 오류가 납니다. 서버의 temp 폴더와 관련해 무엇을 확인해야 하나요?

**답변**

xlsx 다운로드는 서버 temp 폴더(`System.getProperty("java.io.tmpdir")`로 확인) 아래에 `poifiles` 폴더를 만들고 그 안에 파일을 쓴 뒤 다운로드합니다. 다운로드 쪽에는 temp 폴더를 지정하는 옵션이 없으므로 temp 폴더에 권한을 주어야 합니다.

- temp 폴더가 존재하는지, 쓰기 권한이 있는지, temp 아래 `poifiles` 폴더가 존재하고 권한이 있는지 확인합니다.
- 어떤 이유로 `poifiles` 폴더가 삭제되면 IOException이 발생합니다. 이를 막기 위해 poifiles 폴더가 없으면 생성하는 로직이 추가된 패치가 제공되었으며, 적용은 web-inf/lib의 `poi-3.13-all.jar`를 삭제하고 제공된 4개 jar를 넣은 뒤 Down2Excel.jsp의 `down.setXlsxTempFolderMode(true);` 부분을 주석 처리합니다. 반대로 poi 라이브러리가 있을 때 temp 아래 poifiles에 쓰는 동작을 끄려면 이 줄의 주석을 해제합니다.
- xlsx 저장 시 temp 폴더를 생성하는 기능이 최신 서버모듈에 추가되었으므로 최신 버전을 사용합니다. 서버모듈 1.x대에서 temp 폴더가 존재하고 쓰기 권한이 있는데도 발생한 사례가 있으며 xls 확장자는 두 환경 모두 정상이었습니다.

**키워드**: poifiles, java.io.tmpdir, setXlsxTempFolderMode, poi-sxssf, FileNotFoundException, poi-3.13-all.jar, IOException

---

### [XLS-0506] 시트의 이미지를 xls로 다운로드하면 마지막 이미지 하나만 출력되는 이유

**질문**

- 시트에 이미지가 있는 상태에서 엑셀로 다운로드하면 이미지가 제일 마지막 것 하나만 내려옵니다. xlsx는 정상인데 xls는 안 됩니다.

**답변**

서버에 poi3.6 jar가 하나 읽혀서 발생한 문제였습니다. 사용 중인 poi 버전을 출력해 확인한 뒤 해당 poi3.6 jar를 삭제하고 서버를 재시작한 다음 xls로 다운로드하면 정상 동작합니다. xlsx 확장자는 처음부터 정상 동작합니다.

**키워드**: poi3.6, 이미지 다운로드, xls, 마지막 이미지, poi 버전 출력

---

### [XLS-0507] 엑셀 업로드 시 xls 외 확장자에서 'could not initialize class org.apache.xmlbeans.xmlbeans' 오류

**질문**

- 엑셀 업로드 시 xls 확장자 외에는 could not initialize class org.apache.xmlbeans.xmlbeans 오류가 발생합니다.

**답변**

xlsx 업로드가 되지 않던 사례에서 `FileExt` 설정을 하니 업로드가 되었습니다. 서버를 내렸다가 다시 올려도 정상적으로 업로드되었습니다(엑셀 2016, poi-3.9 환경).

**키워드**: FileExt, xmlbeans, xlsx 업로드, poi-3.9, 엑셀 업로드

---

### [XLS-0508] 오픈소스 보안취약점 점검에서 지적된 POI를 업데이트한 서버모듈 배포본

**질문**

- 오픈소스 보안취약점 점검에서 지적된 POI 라이브러리를 업데이트한 최신 IBSheet7 서버모듈 배포본이 있나요? 어떤 POI 버전으로 올라가나요?

**답변**

오픈소스 보안취약점 대응 배포본은 POI 라이브러리를 poi-5.4로 업데이트했으며, `ibsheet7-2.1.47.jar` 배포본은 오픈소스 보안패치가 완료된 jar입니다. 배포된 공통 JAR 폴더의 라이브러리는 필요한 라이브러리 목록이므로 WEB-INF/lib 폴더에 모두 적용합니다.

**적용 버전**: poi-5.4, ibsheet7-2.1.47.jar

**키워드**: poi-5.4, ibsheet7-2.1.47.jar, 보안취약점, 오픈소스, WEB-INF/lib

---

### [XLS-0509] xlsx로 다운로드한 파일이 일부 PC의 Excel 2016에서 열리지 않을 때

**질문**

- xlsx로 엑셀 다운로드를 받은 파일이 일부 PC의 Excel 2016에서 열리지 않습니다. 제품의 영향인가요?

**답변**

서버모듈로 받았다면 파일은 POI 라이브러리를 통해 만들어지며 서버모듈에서는 특별한 이슈가 없었습니다. Excel 2016은 낮은 버전이 아니므로 열리지 않을 이유가 뚜렷하지 않습니다. 예전에 클라이언트 모듈로 만든 파일이 Excel 2007에서 오류가 난 적이 있습니다. 서버모듈이라면 POI 라이브러리가 올라가 있는지와 문제가 되는 파일을 확인합니다.

**키워드**: Excel 2016, xlsx 안 열림, POI 라이브러리, 서버모듈, 엑셀 다운로드

---

### [XLS-0510] 엑셀 다운로드에서 AutoSizeColumn과 SheetDesign을 함께 1로 설정하면 오류가 날 때

**질문**

- 엑셀 다운로드에서 AutoSizeColumn과 SheetDesign을 함께 1로 설정하면 오류가 납니다. POI 유무나 서버모듈 버전과 관련이 있나요?

**답변**

POI가 있는 경우와 없는 경우의 엑셀 다운로드에서 `SheetDesign`과 `AutoSizeColumn`을 적용하는 순서가 서버모듈 2.0.46부터 바뀌었습니다. 두 옵션을 함께 쓸 때 문제가 생기면 POI 라이브러리가 제대로 등록되어 있는지 확인합니다.

**적용 버전**: 서버모듈 2.0.46 이후

**키워드**: AutoSizeColumn, SheetDesign, 서버모듈 2.0.46, POI 등록

---

### [XLS-0511] 초기 버전에서 업그레이드한 뒤 엑셀 다운로드가 '처리중입니다'에서 멈추거나 업로드가 안 될 때

**질문**

- 오래된 초기 버전에서 최신 계열 버전으로 올린 뒤 엑셀 다운로드는 '처리중입니다.'가 계속되거나 엑셀 업로드가 되지 않습니다.

**답변**

초기 버전은 서버모듈 없이 JSP가 라이브러리를 직접 사용해 엑셀 다운로드·업로드를 처리했습니다. 이후 버전은 화면에서 파일에 필요한 전문을 추출해 보내고 서버모듈이 관련 라이브러리로 파일을 만들거나 읽는 방식이어서, 전문을 처리하는 서버모듈 라이브러리(jar)와 JSP의 버전이 맞아야 정상 동작합니다. 서버모듈 라이브러리와 배포된 JSP를 함께 교체하고, 기존 JSP를 백업한 뒤 `Down2Excel.jsp`와 `LoadExcel.jsp`의 서버 경로 관련 값을 찾아 적용합니다. 운영보다 개발환경에서 먼저 테스트합니다.

**키워드**: Down2Excel.jsp, LoadExcel.jsp, 서버모듈 업그레이드, 처리중입니다, jar와 JSP 버전

---

### [XLS-0512] JDK·WAS를 교체(OpenJDK 등)하면 엑셀 다운로드와 IBSheet7에 영향이 있나요? OpenJDK 11은 지원되나요?

**질문**

- WAS와 JDK를 교체(openjdk 1.8 등)할 때 IBSheet7에 문제가 없는지, 어느 부분이 영향을 받는지 궁금합니다.
- OpenJDK 11 환경에서 엑셀 다운로드를 사용할 수 있나요? 지원되나요?

**답변**

`ibsheet.js`는 WAS나 JDK 교체와 무관하고, 시트 내용을 엑셀로 다운로드·업로드하는 서버모듈이 관련됩니다. open jdk 1.8.0과 amazon tomcat-8.5 환경에서 테스트한 결과 에러 없이 모두 잘 동작했습니다. JDK·WAS를 교체할 때는 ibmsg, `ibsheet.cfg` 파일의 MIME 설정과 쿠키 허용 같은 환경 설정에 주의해야 합니다. 반면 OpenJDK 11 환경에서는 엑셀 다운로드가 지원되지 않습니다.

**키워드**: OpenJDK 11, open jdk 1.8.0, JDK 교체, WAS 교체, ibsheet.cfg, 서버모듈

---

### [XLS-0513] 닷넷(.NET) 환경에서 그리드와 차트를 한 엑셀 파일로 동시에 내려받을 수 있나요?

**질문**

- 닷넷(.NET) 환경에서 한 화면의 그리드와 그래프(차트)를 한 엑셀 파일로 동시에 내려받을 수 있나요?

**답변**

닷넷 버전 1.0은 지원하지 않고 2.0은 지원합니다. 다만 2.0으로 버전 업그레이드가 필요한데 유지보수가 되어 있지 않아 제품 배포는 어렵습니다.

**적용 버전**: 닷넷 버전 1.0 미지원, 2.0 지원

**키워드**: 닷넷, 엑셀 차트 동시 다운로드, 그리드 차트, 닷넷 2.0, 유지보수

---

### [XLS-0514] 닷넷 프레임워크 4.5 환경에서 엑셀 다운로드가 되지 않으면 서버에 어떤 파일이 필요한가요?

**질문**

- 닷넷 프레임워크 4.5 환경에서 엑셀 다운로드가 되지 않습니다. 서버에 어떤 파일이 있어야 하나요?

**답변**

닷넷 서버에 엑셀 다운로드에 필요한 dll 파일이나 aspx 파일이 없어서 발생할 수 있습니다. 이 경우 해당 파일이 포함된 1.1.0.28 버전을 적용해야 합니다.

**적용 버전**: 1.1.0.28

**키워드**: 닷넷 프레임워크 4.5, dll, aspx, 1.1.0.28, 엑셀 다운로드 불가

---

### [XLS-0515] PHP 환경에서도 서버모듈로 엑셀 다운로드를 쓸 수 있나요? 대용량 다운로드는 어떻게 구성하나요?

**질문**

- 엑셀 다운로드를 실행했는데 동작하지 않습니다. PHP 환경에서도 서버모듈로 엑셀 다운로드를 사용할 수 있나요?
- 자바를 쓰지 않는 PHP 환경에서 15000건이 넘는 대용량 엑셀 다운로드를 하려는데 서버모듈은 jsp로만 제공됩니다. 어떻게 해야 하나요?

**답변**

서버모듈 다운로드는 자바와 닷넷만 지원하며 PHP는 지원하지 않습니다. 자바를 쓰지 않는 PHP 환경에서 대용량 엑셀 다운로드가 필요할 때는 외부 도메인의 서버를 이용해 다운로드하는 방법도 가능하지만, 그러면 해당 서버의 안정성에 따라 시스템의 운영 안정성이 결정되어 심각한 이슈가 될 수 있습니다. 따라서 사이트의 운영 서버에 직접 구성(개발)해야 합니다.

**키워드**: PHP, 서버모듈 지원 언어, 닷넷, jsp, 대용량 엑셀 다운로드

---

### [XLS-0516] AWS나 웹방화벽 환경에서 iframe이 제한되어 엑셀 업로드·다운로드가 되지 않는 원인은?

**질문**

- AWS에 올린 뒤 엑셀 업로드나 다운로드가 동작하지 않는 경우가 있나요? 원인이 무엇인가요?
- 웹방화벽 환경에서 기본 파일 관련 설정을 처리한 뒤에도 그리드의 엑셀 다운로드가 되지 않습니다. 원인은 무엇인가요?

**답변**

그리드의 엑셀 다운로드 기능은 iframe을 통해 이루어지므로, iframe의 접근을 제한하는 설정이 있으면 엑셀 업로드/다운로드에 문제가 생깁니다.

- AWS 설정 중 iframe의 접근을 제한하는 속성이 들어가 있어서 엑셀 업로드/다운로드에 문제가 된 사례가 있습니다. 이미 정상적으로 사용 중이라면 별도로 고려하지 않아도 됩니다.
- 웹방화벽에서 iframe이 차단되면 다운로드가 되지 않으며, 이 경우 클라우드 서비스 업체에서 해당 설정을 변경해 iframe을 허용해야 해결할 수 있습니다.

**키워드**: iframe 차단, AWS, 웹방화벽, 엑셀 다운로드 불가, 엑셀 업로드 불가

---

### [XLS-0517] oldjsp 방식으로 엑셀 다운로드를 쓰는 환경에서 IE 10, 11에서만 다운로드가 되지 않을 때 해결 방법은?

**질문**

- oldjsp 방식으로 엑셀 다운로드를 사용하는 환경에서 IE 10, 11에서만 엑셀 다운로드가 되지 않습니다. 어떻게 해결하나요?

**답변**

기존에 `ibsheet.js` 파일만 적용해 oldjsp 방식을 쓰던 환경에서 IE 10, 11 엑셀 다운로드가 되지 않은 사례가 있습니다. 통합 jar가 포함된 제품으로 교체하면 해결되는 경우가 있습니다.

**키워드**: oldjsp, IE10, IE11, 통합 jar, 엑셀 다운로드 불가

---

### [XLS-0518] 서버가 이중화된 환경에서 엑셀 리포트 다운로드나 이미지 다운로드가 되지 않는 이유는?

**질문**

- 서버가 이중화되어 있는 환경에서 엑셀 리포트로 다운로드가 적용되지 않습니다. 이중화 환경에서도 사용할 수 있나요?

**답변**

서버가 이중화되어 있으면 엑셀 리포트 다운로드의 URL 호출 자체가 되지 않으며, 이런 경우에는 이미지 다운로드도 되지 않습니다.

**키워드**: 서버 이중화, 엑셀 리포트, URL 호출, 이미지 다운로드, 이중화 환경

---

### [XLS-0519] 엑셀 다운로드를 크로스 도메인(http, https) 환경에서 사용할 수 있나요?

**질문**

- 엑셀 다운로드를 크로스 도메인 환경에서 사용할 수 있나요? http와 https 모두 해당합니다.

**답변**

엑셀 다운로드는 크로스 도메인 환경에서도 가능한 것으로 테스트되었습니다.

**키워드**: 크로스 도메인, http https, 엑셀 다운로드 환경, 도메인 호환

---

### [XLS-0520] PC에 엑셀이 설치되어 있지 않으면 엑셀 다운로드 파일을 저장하거나 사용할 수 없나요?

**질문**

- 엑셀 다운로드를 하려는 PC에 엑셀이 설치되어 있지 않아도 다운로드한 파일을 저장할 수 있나요?
- ActiveX 버전 IBSheet에서 엑셀 다운로드를 하려는데 PC에 엑셀 프로그램이 설치되어 있지 않습니다. 파일만이라도 받을 수 있는 방법이 있나요?

**답변**

엑셀 다운로드를 하면 엑셀 툴이 설치되어 있지 않은 경우 저장할 수 없습니다. ActiveX 버전은 엑셀 프로그램이 설치되어 있지 않으면 엑셀 다운로드를 사용할 수 없습니다.

**키워드**: 엑셀 미설치, 엑셀 프로그램 필요, ActiveX 엑셀 다운로드, 엑셀 설치 요건

---

### [XLS-0521] IBSheet7로 받은 엑셀이 ActiveX 버전(IBSheet3)보다 다운로드가 느리고 파일이 큰 이유는?

**질문**

- 예전 ActiveX 버전 IBSheet3으로 받은 엑셀에 비해 IBSheet7로 받은 엑셀은 다운로드가 느리고 같은 행 수인데도 파일이 크고 열 때 버벅거립니다. 왜 차이가 나나요?

**답변**

ActiveX인 IBSheet3은 사용자 PC의 Excel 프로그램을 실행해 파일을 작성하지만, Non-ActiveX인 IBSheet7은 브라우저에서 라이브러리로 동작해 PC 프로그램을 실행할 수 없습니다. 그래서 조회된 데이터를 서버로 보내 오픈소스 라이브러리 POI로 파일을 생성한 뒤 내려받으며, 이 과정과 기반 기술의 차이로 더 느리고 파일 크기도 다를 수 있습니다. 데이터가 많을수록 차이가 커지고 서버 메모리가 부족하면 파일 생성이 실패할 수 있습니다.

**키워드**: IBSheet3, POI, 엑셀 다운로드 속도, 파일 크기 차이, ActiveX 비교

---

### [XLS-0522] ActiveX 버전에서 엑셀 업로드 시 m365 환경에서 문제가 생기는 원인과 해결 방법은?

**질문**

- ActiveX 버전에서 엑셀 업로드 시 m365 환경에서 문제가 발생합니다. 원인과 해결 방법이 있나요?

**답변**

ActiveX는 엑셀 업로드 시 클라이언트에 설치된 excel을 실행해 파일을 읽는데, m365가 ActiveX에서 엑셀 프로그램을 호출하는 방식과 맞지 않아 발생한 문제로 보입니다. 해결하려면 제품을 수정해야 하지만 EOS된 제품이라 수정이 불가합니다.

**키워드**: m365, ActiveX 엑셀 업로드, EOS, 엑셀 호출 방식, ActiveX 호환

---

### [XLS-0523] 한컴 오피스로 엑셀 다운로드를 사용할 수 있나요? html 버전에서도 가능한가요?

**질문**

- 한컴 오피스로 엑셀 다운로드를 사용할 수 있나요? html 버전에서도 가능한지 궁금합니다.

**답변**

한컴 오피스는 html 버전에서 지원되지 않습니다.

**키워드**: 한컴 오피스, html 버전, 엑셀 다운로드 지원, 오피스 호환

---

### [XLS-0524] 엑셀 다운로드를 하면 제목만 나오고 내용이 나오지 않을 때 MS Office 서비스팩을 확인하나요?

**질문**

- 엑셀 다운로드를 하면 제목만 나오고 내용이 나오지 않습니다. 어떻게 해야 하나요?

**답변**

MS Office 2007은 SP3부터 가능한데 SP1도 설치되어 있지 않은 환경에서 발생할 수 있습니다. SP1, SP3을 설치하거나 그 이상 버전의 오피스로 업그레이드해야 합니다.

**키워드**: MS Office 2007, SP1, SP3, 제목만 다운로드, 오피스 업그레이드

---

### [XLS-0525] Down2Excel로 만든 엑셀 파일을 사용자 PC로 내려받지 않고 서버에 저장하려면 어떻게 하나요?

**질문**

- Down2Excel 사용 시 엑셀 파일을 사용자 PC로 내려받지 않고 서버에 저장하려면 어떻게 하나요? 서버에서 처리하는 방법을 알고 싶습니다.

**답변**

서버모듈 코드에서 다음과 같이 처리합니다.

- `ibExcel.getDownloadFileName()`으로 파일명을 얻고 `FileOutputStream`으로 서버 경로에 `workbook.write`로 저장한 뒤 닫습니다.
- 이후 `response.reset()`으로 헤더 정보를 제거합니다.
- 시트의 대기 이미지는 응답에 `parent.mySheet.HideProcessDlg()`를 호출하는 스크립트를 출력해 제거합니다.

**키워드**: ibExcel.getDownloadFileName, FileOutputStream, workbook.write, HideProcessDlg, 서버에 엑셀 저장

---

### [XLS-0526] JDK 1.5에서 엑셀 다운로드 소스를 컴파일하면 HSSFCellUtil.setCellStyleProperty 인자 타입 오류가 납니다

**질문**

- JDK 1.5 환경에서 엑셀 다운로드 소스를 컴파일하면 HSSFCellUtil.setCellStyleProperty의 인자 타입이 맞지 않는다는 오류가 납니다. 어떻게 해결하나요?

**답변**

`setCellStyleProperty`의 마지막 인자가 Object인데, JDK 1.6은 short 값을 자동 변환하지만 1.5는 변환하지 않는 것으로 보입니다. Down2Excel 소스에서 `Short.valueOf(HSSFCellStyle.SOLID_FOREGROUND)`, `Short.valueOf(colorIndex)`처럼 Short 객체로 변환해 전달해야 합니다.

**키워드**: HSSFCellUtil.setCellStyleProperty, Short.valueOf, JDK 1.5, HSSFCellStyle, 컴파일 오류

---

### [XLS-0527] 리눅스·유닉스 서버에서 Down2Excel의 AutoSizeColumn, AutoColumnSize 사용 시 오류가 나거나 동작하지 않는 이유

**질문**

- Unix 운영체제 서버에서 엑셀 다운로드 시 NoClassDefFoundError: sun/awt/X11GraphicsEnvironment 오류가 발생합니다. 어떻게 피할 수 있나요?
- Down2Excel 함수에서 AutoColumnSize 기능을 사용하는데 제대로 동작하지 않습니다. 서버가 리눅스일 때 필요한 조치가 있나요?

**답변**

서버 운영체제에 따라 다음과 같이 조치합니다.

- Unix 서버에서 `NoClassDefFoundError: sun/awt/X11GraphicsEnvironment` 오류가 나는 경우: POI와 Unix 운영체제 사이의 문제로 보이며 근본적인 해결은 어렵습니다. `Down2Excel`에서 `AutoSizeColumn` 속성을 사용하지 않으면 오류를 피할 수 있습니다.
- 리눅스 서버에서 `AutoColumnSize`가 제대로 동작하지 않는 경우: 서버에 굴림 폰트를 설치해야 합니다.

**키워드**: AutoSizeColumn, AutoColumnSize, X11GraphicsEnvironment, NoClassDefFoundError, 굴림 폰트, 리눅스 서버

---

### [XLS-0528] 엑셀 다운로드 서버 JSP에서 setData를 호출할 때 setService와의 호출 순서는 어떻게 하나요?

**질문**

- 엑셀 다운로드 서버 JSP에서 request.getAttribute("Data")로 받은 데이터를 down.setData(data)로 넣었는데도 오류가 납니다. 호출 순서에 주의할 점이 있나요?

**답변**

`String data = (String) request.getAttribute("Data"); down.setData(data);` 코드는 `setService`를 호출하기 전에 실행해야 합니다. 이렇게 해도 오류가 계속되면 추가 확인이 필요합니다.

**키워드**: setData, setService, request.getAttribute, 호출 순서, 엑셀 다운로드 서버 JSP

---

### [XLS-0529] IE11에서 IBSheet 엑셀 다운로드만 되지 않을 때 Down2Excel.jsp 응답 헤더를 어떻게 수정하나요?

**질문**

- IE11에서 IBSheet 엑셀 다운로드가 되지 않습니다. 다른 시스템에서의 다운로드는 되는데 시트 다운로드만 안 됩니다. 어떻게 해결하나요?

**답변**

다른 시스템의 다운로드 응답 헤더가 `Content-Type: application/x-unknown-content-type`이었고, `Down2Excel.jsp`의 `Workbook workbook = ibExcel.makeExcel();` 다음에 `response.setHeader("Content-Type","application/x-unknown-content-type");`를 추가하자 다운로드가 된 사례가 있습니다. 해당 브라우저의 설정 문제일 가능성이 있는 사례입니다.

**키워드**: IE11, Content-Type, application/x-unknown-content-type, Down2Excel.jsp, ibExcel.makeExcel

---

### [XLS-0530] WebSphere에서 IE로 https 엑셀 다운로드 시 이 인터넷 사이트를 열 수 없습니다 메시지가 나옵니다

**질문**

- WebSphere 환경에서 IE로 엑셀 다운로드(Down2Excel)를 하면 '이 인터넷 사이트를 열 수 없습니다' 메시지가 나오며 다운로드되지 않습니다. 원인과 해결은?

**답변**

쿠키를 사용할 때 WebSphere가 응답 헤더에 no-cache 값을 자동으로 넣는데, IE는 SSL(https) 통신에서 헤더에 이런 값이 있으면 xls, doc 같은 오피스 파일을 받지 않기 때문에 발생합니다. WebSphere 설정을 바꾸는 것이 원칙이나 서버 설정을 바꾸기 어렵다면 `Down2Excel.jsp`에서 다음과 같이 헤더를 수정합니다.

```
response.setHeader("CookiesConfigureNoCache","false");
response.setHeader("Pragma","private,no-cache");
response.setHeader("Cache-Control","private,no-store,no-cache,max-age=0,must-revalidate");
```

**키워드**: WebSphere, CookiesConfigureNoCache, Cache-Control, Pragma, IE https 다운로드

---

### [XLS-0531] Tomcat에서는 되던 엑셀 다운로드가 Resin 서버에서 0KB로 내려오고 파일이 손상되었다고 나옵니다

**질문**

- Tomcat에서는 되던 엑셀 다운로드가 Resin 운영 서버에서는 0KB로 내려오고 파일을 열면 손상되었다고 나옵니다. 어떻게 해결하나요?

**답변**

Resin에서는 Down2Excel JSP에 다음을 적용해야 합니다.

- `setHeader()` 전에 `response.reset();`을 한 번 호출한 뒤 `Content-Type`을 `application/octet-stream`, `Content-Description`을 `JSP Generated Data`로(필요하면 `Content-Disposition`도) 설정합니다.
- `out.clear();`와 `out = pageContext.pushBody();` 두 줄은 주석 처리합니다.
- `setContentLength()`로 파일 크기를 지정(`ByteArrayOutputStream`에 `workbook.write(bos)` 후 `response.setContentLength(bos.size());`)해야 한다는 답변도 있으나, 앞의 두 가지만 적용해도 파일이 내려온 사례가 있습니다.

**키워드**: Resin, 0KB, response.reset, out.clear, pageContext.pushBody, setContentLength

---

### [XLS-0532] Down2Excel 다운로드 시 java.io.IOException: response already committed 오류가 나면 어떻게 하나요?

**질문**

- WebLogic에서 Down2Excel로 다운로드할 때 java.io.IOException: response already committed(JspWriterImpl.clear) 오류가 자주 발생합니다. 원인과 해결 방법은?
- 엑셀 다운로드 시 콘솔에 java.io.IOException response already committed 메시지가 나타납니다. 어떻게 조치하나요?
- Down2Excel.jsp를 통해 엑셀을 다운로드하는 중 ioexception이 발생합니다. 어떻게 조치하나요?

**답변**

응답에 200 헤더가 이미 나간 뒤 헤더 정보를 다시 바꿔 보내야 할 때 나오는 로그입니다. `Down2Excel.jsp`에서 `out.flush()` 이후 finally에서 `out.clear()`를 호출하는 것 때문에 발생할 수 있습니다. 다음 중 하나로 조치합니다.

- 방법1: 하단(마지막)의 `out.clear()`를 제거(주석 처리)합니다. `out.clear`와 `pageContext.pushbody()`를 주석 처리해 조치한 사례도 있습니다.
- 방법2: `out.clear(); out = pageContext.pushBody();` 두 줄을 `ServletOutputStream out2 = response.getOutputStream();` 호출 이전으로 옮기거나 그 앞에 추가합니다.
처리는 flush() 전에 하는 것이 좋습니다.

**키워드**: response already committed, IOException, out.clear, pageContext.pushBody, Down2Excel.jsp, WebLogic

---

### [XLS-0533] JEUS에서 엑셀 다운로드는 되지만 PageContextImpl.release에서 ClassCastException이 발생합니다

**질문**

- JDK 1.4 환경에서 엑셀 다운로드는 되지만 PageContextImpl.release에서 ClassCastException: jeus.servlet.jsp.BodyContentImpl 오류가 발생합니다. 원인이 무엇인가요?

**답변**

JSP의 `out.clear()` 처리와 관련된 것으로 보이며, 이 부분은 JEUS(제우스) 쪽에 확인해 볼 필요가 있을 수 있습니다. 엑셀 다운로드 자체는 되지만 페이지 컨텍스트를 해제하는 `PageContextImpl.release`에서 `ClassCastException`이 발생하는 상황입니다.

**키워드**: JEUS, ClassCastException, BodyContentImpl, PageContextImpl.release, out.clear

---

### [XLS-0534] Down2Excel 호출 시 404 에러가 나거나 처리중입니다 메시지만 계속 표시되고 다운로드되지 않는 이유

**질문**

- Down2Excel 호출 시 404 에러가 나거나 처리중입니다 알림창만 뜨고 엑셀이 다운로드되지 않습니다. poi 라이브러리와 jsp 파일은 있습니다. 원인이 무엇인가요?
- Down2Excel을 호출하면 그리드에 '처리중입니다' 메시지가 계속 떠 있고 다시 클릭해야 동작합니다. 샘플 소스대로 호출했는데 원인이 무엇인가요?

**답변**

`ibsheet.cfg`의 `Down2ExcelUrl`에 설정한 호출 경로와 실제 Down2Excel 파일의 경로가 맞지 않아 404(Not Found) 에러가 나는 것이 원인입니다. 요청이 실패하면 처리중 메시지가 사라지지 않을 수 있습니다. 개발자도구의 네트워크 탭에서 `down2Excel()` 호출 시점에 호출되는 jsp 경로를 확인하고, `ibsheet.cfg`의 `Down2ExcelUrl`에 정확한 경로를 설정합니다.

**키워드**: Down2ExcelUrl, 404 에러, 처리중입니다, ibsheet.cfg, 네트워크 탭

---

### [XLS-0535] Down2Excel.jsp를 WEB-INF 아래에 두거나 서블릿으로 처리할 때 ibsheet.cfg의 Down2Excel_Url은 어떻게 지정하나요?

**질문**

- Down2Excel.jsp를 WEB-INF 이하 폴더에 두었더니 엑셀 다운로드가 잘 되지 않습니다. ibsheet.cfg에는 어떻게 경로를 지정해야 하나요?
- 엑셀 다운로드 jsp 파일을 web-inf 아래에 두었더니 DirectDown2Excel은 컨트롤러로 포워딩해 잘 되는데 Down2Excel은 경로를 찾지 못합니다. 경로를 어떻게 설정하나요?
- 서버에서 엑셀 다운로드를 JSP가 아니라 Java 서블릿으로 처리하고 싶습니다. 어떻게 구성하고 어떤 점에 주의해야 하나요?
- ibsheet.cfg의 Down2Excel URL을 down2excel.screen처럼 jsp가 아닌 확장자로 설정했더니 엑셀 다운로드가 되지 않습니다. 어떻게 해야 하나요?

**답변**

- WEB-INF 이하 폴더에 `Down2Excel.jsp`가 있는 경우: `ibsheet.cfg`에서 `Down2Excel_Url` 경로를 `.do` 형식으로 지정하고 해당 경로를 controller에 정의해 둡니다. `Down2Excel_Url`에는 `.jsp` 대신 컨트롤러 이름을 줄 수 있으므로, 컨트롤러를 하나 만들고 경로를 그 컨트롤러로 수정하면 됩니다.
- JSP 대신 서블릿으로 처리하는 경우: JSP의 내용을 서블릿(Java)으로 옮기고 `Down2Excel_Url`에 서블릿 주소(예: `/jsp/Down2Excel.do`)를 지정합니다. `LoadExcel.jsp` 내용을 Java로 옮길 때는 `res.setHeader("Content-Type", "text/html;charset=UTF-8");`가 반드시 있어야 합니다. JSP를 직접 호출해도 되지만 서블릿 주소를 호출하는 방식이 권장됩니다.
- 주의: 프레임워크가 jsp 확장자 파일을 screen으로 매핑해 주는 환경에서 cfg에 `down2excel.screen`으로 설정하자 엑셀 다운로드가 되지 않았고, `down2excel.jsp`로 변경하니 정상 동작한 사례가 있습니다.

**키워드**: Down2Excel_Url, WEB-INF, controller, 서블릿, LoadExcel.jsp, DirectDown2Excel

---

### [XLS-0536] Down2Excel 실행 시 에러가 나거나 Down2Excel_URL을 .do로 바꿀 때 MultipartResolver 설정을 확인해야 하나요?

**질문**

- 보안 점검에서 ibsheet.cfg의 Down2Excel_URL 경로가 지적되어 .do 호출로 바꾸려 합니다. 엑셀 다운로드에 문제가 없을까요?
- Down2Excel을 실행하면 에러가 납니다. 어떤 설정을 확인해야 하나요?

**답변**

`ibsheet.cfg`의 `Down2Excel_URL`을 `.do`로 호출할 수는 있지만 중간에 서블릿을 거치므로, 프레임워크에 `MultipartResolver`가 설정되어 있으면 엑셀 다운로드 과정에서 오류가 발생할 수 있습니다. 이 경우 리졸버 부분의 수정이 필요할 수 있습니다. Down2Excel 실행 시 에러가 나는 경우에는 `IBMultipartResolver` 설정이 되어 있는지 확인하고 설정해야 합니다.

**키워드**: IBMultipartResolver, MultipartResolver, Down2Excel_URL, .do 호출, 리졸버

---

### [XLS-0537] 크로스 도메인 환경에서 Down2Excel 호출 시 403 오류가 나거나 https에서 URL이 이상하게 만들어지면?

**질문**

- 엑셀 다운로드를 시도하면 403 에러(권한 없음)가 표시됩니다. 라이선스 문제인지 다른 원인인지, 어떻게 해결하나요?
- cross domain 환경에서 Down2Excel()을 https로 사용했더니 URL이 이상하게 만들어집니다. 해결된 버전이 있나요?

**답변**

- 403 에러(권한 없음): `ibsheet.cfg`의 `down2excel_url`을 다른 도메인(크로스 도메인)의 jsp로 설정했을 가능성이 있습니다. 403은 서버 설정에서 반환하는 것이므로 서버에서 권한을 허용하거나, `down2excel_url`이 같은 서버에 있는 jsp를 호출하도록 설정합니다.
- https에서 URL 이상: cross domain 환경에서 https로 `Down2Excel()`을 사용할 때 URL이 이상해지는 현상은 7.0.0.0-20130802-18-RP06 패치 버전으로 처리되었으므로 해당 패치 이상의 버전을 사용합니다.

**적용 버전**: 7.0.0.0-20130802-18-RP06 패치에서 수정

**키워드**: down2excel_url, 크로스 도메인, 403 에러, https URL, 7.0.0.0-20130802-18-RP06

---

### [XLS-0538] 닷넷(MVC) 환경에서 엑셀 다운로드를 하려면 Down2Excel_Url을 어떻게 설정하나요?

**질문**

- 닷넷 환경(MVC 방식)에서 엑셀 다운로드를 하려면 어떻게 처리해야 하나요?

**답변**

닷넷용 서버모듈이 있습니다. `down2Excel()` 함수를 호출하면 `ibsheet.cfg`에서 `Down2Excel_Url`로 설정된 경로의 aspx 파일이 호출됩니다. `down2Excel()` 함수에 설정별 파라미터가 있으므로 원하는 형태로 지정할 수 있습니다.

**키워드**: Down2Excel_Url, 닷넷 서버모듈, aspx, MVC, down2Excel()

---

## Multipart·프레임워크 충돌

### [XLS-0539] Spring·JBOSS 등 프레임워크 환경에서 엑셀 다운로드·업로드 시 NullPointException이 발생하는 원인과 해결 방법

**질문**

- Spring 프레임워크 환경에서 엑셀 다운로드나 업로드를 하면 NullPointException이 발생합니다. jar와 js 파일, 환경 설정을 모두 했는데도 원인이 무엇인가요?
- JBOSS 환경에서 엑셀 다운로드를 하면 NullPointException이 발생합니다. 어떤 원인으로 발생하고 어떤 방법으로 해결할 수 있나요?
- 스프링 개발환경에서 엑셀 서버모듈을 구현하는데 서블릿에서 setService를 호출할 때 에러가 발생합니다. 원인이 무엇인가요?
- 제품과 jar를 업그레이드한 뒤 DirectDown2Excel에서 에러가 납니다. 원인이 무엇인가요?

**답변**

IBSheet의 엑셀 기능(문서연동 모듈)은 시트 데이터가 많아 일반 post로 전달하면 서버가 받지 못하는 경우를 막기 위해 기본적으로 Multipart 형식으로 서버와 통신합니다. Spring이나 JBOSS 같은 프레임워크가 Multipart 데이터를 프레임워크에서 모두 가져가면 서버가 시트 데이터를 받지 못해 시트가 파일을 생성하지 못하고 `NullPointException`이 발생할 수 있습니다. 스프링 환경에서 서블릿의 `setService` 호출 시 에러가 나는 것도 스프링의 `MultipartResolver`가 request 객체를 가져가기 때문으로 추정됩니다. js 7.0.13.50-20160407-13, jar 1.1.75로 업그레이드한 뒤 `DirectDown2Excel`에서 에러가 나는 경우도 서버가 MultiPart로 전송된 데이터를 받지 못해 나타나는 같은 증상입니다.
해결 방법은 다음과 같습니다.

- `MultiPartResolver`를 설정해 시트 데이터인 경우 return시키는 로직을 추가합니다.
- JSP 페이지를 서블릿으로 구현하면 필터링에 걸리지 않고 처리할 수 있습니다.
- Multipart가 아닌 post 형식으로 데이터를 넘기도록 설정합니다.

**적용 버전**: js 7.0.13.50-20160407-13, jar 1.1.75 환경에서 보고된 사례 포함

**키워드**: NullPointException, MultipartResolver, MultiPartResolver, setService, DirectDown2Excel, Multipart, JSP 서블릿

---

### [XLS-0540] 전자정부 프레임워크 환경에서 엑셀 다운로드 시 java.lang.NullPointerException이 발생합니다

**질문**

- 전자정부 프레임워크 환경에서 엑셀 다운로드 시 java.lang.NullPointerException이 발생합니다. 원인과 해결 방법은?

**답변**

jsp가 `WEB-INF` 아래에 있으면 multipart로 보낸 데이터가 프레임워크를 통과하면서 사라져 발생합니다. jsp 위치를 `WEB-INF` 밖으로 빼면 해결되며, `WEB-INF` 아래에 꼭 두어야 한다면 `MultipartResolver`를 설정해야 합니다.

**키워드**: NullPointerException, 전자정부 프레임워크, WEB-INF, MultipartResolver, jsp 위치

---

### [XLS-0541] 프레임워크의 Multipart 처리로 엑셀 다운로드가 안 될 때 post 방식(Multipart:0)으로 보내려면 어떻게 하나요?

**질문**

- 엑셀 업로드 없이 다운로드만 사용하는 시스템에서 프레임워크의 Multipart 처리와 충돌할 때 가장 간단하게 해결하는 방법과 주의할 서버 설정은 무엇인가요?
- 프레임워크에서 Multipart를 처리하는 환경에서 엑셀 다운로드 파일 생성이 안 됩니다. Down2Excel을 post 방식으로 전송하려면 어떻게 하나요?
- Spring 프레임워크에서 엑셀 다운로드 시 Multipart 때문에 데이터가 손실될 때, post 방식으로 내려받는 방법과 그 제약사항은 무엇인가요?

**답변**

엑셀 다운로드는 시트 정보를 XML 전문으로 만들어 대량 데이터 처리를 위해 Multipart 방식으로 전송합니다. 프레임워크가 Multipart 처리를 가져가면 파일 생성이 안 되거나 데이터가 손실될 수 있어 MultipartResolver 처리가 필요합니다.

- `Down2Excel({Multipart:0})`처럼 `Multipart:0` 인자를 주어 호출하면 Multipart가 아닌 post 형식으로 전달되어 프레임워크에서의 데이터 손실이 발생하지 않습니다.
- post 형식은 서버에 따라 `MaxPostSize`와 `MaxParameterCount` 제한이 있으므로, 데이터가 잘리면 해당 속성을 -1(무제한 처리)로 추가 설정하거나 값을 늘립니다.
- 엑셀 업로드는 파일을 서버로 전송해야 하므로 post로 보낼 수 없어, 이 방법은 엑셀 다운로드에서만 사용할 수 있습니다. 업로드를 위해서는 MultipartResolver 처리가 여전히 필요합니다. 서버 설정을 바꾸기 어렵거나 이후 엑셀 업로드도 사용한다면 서버모듈 JSP를 서블릿으로 변환해야 합니다.

**키워드**: Multipart:0, Down2Excel, MultipartResolver, MaxPostSize, MaxParameterCount, Spring, 엑셀 다운로드

---

### [XLS-0542] 엑셀 모듈 사용 중 서버 오류 로그에 파일이 차단되었다고 나오고 기능이 동작하지 않습니다

**질문**

- 엑셀 관련 모듈을 쓰는데 서버 오류 로그에 파일이 차단되었다고 나오고, 얼마 전까지 잘 되던 기능이 동작하지 않습니다. 원인이 무엇인가요?

**답변**

서버에 찍힌 오류가 파일 차단으로 나타난다면, XSS 공격 예외처리 때문에 파일 전송이 차단된 것인지 또는 프레임워크 단에서 Multipart에 대한 Filter 처리를 한 것인지 확인합니다. Multipart Filter 처리라면 `MultipartResolver`를 설정해 시트의 엑셀 관련 모듈만 예외 처리하도록 할 수 있습니다.

**키워드**: 파일 차단, XSS, Multipart Filter, MultipartResolver, 엑셀 모듈 차단

---

### [XLS-0543] 엑셀 업로드에도 다운로드의 Multipart:0 같은 처리를 쓸 수 있나요? 업로드 전송 방식은 무엇인가요?

**질문**

- 엑셀 다운로드에서 쓰는 Multipart:0 처리와 같은 기능을 엑셀 업로드에서도 제공하나요?
- 엑셀 다운로드는 multipart 속성의 post 방식으로 받고 있는데, 엑셀 업로드도 post 방식을 쓸 수 있나요?

**답변**

엑셀 업로드에는 `Multipart:0` 같은 처리 기능이 제공되지 않습니다. 엑셀 업로드는 현재 Post 방식이며 enctype이 `Multipart/form-data`로 동작합니다. 프레임워크가 multipart 요청일 때 request를 가로채서 null이 되는 현상이 있으며, 이를 우회하는 방법을 정리한 가이드 문서가 있습니다.

**키워드**: Multipart:0, 엑셀 업로드, enctype, Multipart/form-data, post 방식, 프레임워크 request null

---

### [XLS-0544] 엑셀 다운로드/업로드를 MultiPart로 전송할 때 헤더 설정 없이 사용할 수 있는 버전이 있나요?

**질문**

- 엑셀 다운로드/업로드를 MultiPart로 전송할 때 헤더에 ibsheet 값을 설정해야 합니다. 헤더 설정 없이 사용할 수 있는 버전이 있나요?

**답변**

이 문제는 패치된 버전이 있습니다. poi3.13을 이용해 개발된 버전은 헤더 설정 없이 데이터 다운로드/업로드가 가능합니다.

**적용 버전**: poi3.13 기반 버전

**키워드**: MultiPart, 헤더 설정, poi3.13, 엑셀 다운로드/업로드, 패치 버전

---

### [XLS-0545] Down2Excel로 건수가 많은 데이터를 내려받으면 일부 행만 나오거나 서버 오류가 납니다

**질문**

- Down2Excel 로 건수가 많은 데이터를 엑셀로 내려받으면 일부 행만 나오거나 서버에서 데이터가 없다는 오류가 납니다. 원인과 해결 방법은 무엇인가요?
- LazyLoad 로 조회해 일부 행만 렌더링된 상태에서 Down2Excel 로 다운로드하면 렌더링된 데이터까지만 내려오는데 이것이 맞는 동작인가요?

**답변**

Down2Excel 시 서버로 넘어가는 시트 데이터가 WAS의 POST 크기 제한에 걸려 잘리거나 오류가 날 수 있습니다. Tomcat은 기본 Post size를 넘는 정보면 전달이 안 될 수 있으므로 `maxPostSize`, `maxParameterCount`를 늘리거나 무제한으로 설정하세요. 데이터가 적을 때 내려오지 않는 경우는 데이터 자체를 확인해야 합니다.
`LazyLoad`로 조회한 경우에도 조회된 전체 데이터가 메모리상에 존재하므로 렌더링된 행뿐 아니라 전체 데이터가 다운로드되는 것이 정상입니다. 일부만 내려온다면 서버 쪽 PostSize 제한에 걸린 것일 수 있습니다.

**키워드**: Down2Excel, maxPostSize, maxParameterCount, LazyLoad, Tomcat, 대량 데이터, 행 잘림

---

### [XLS-0546] 엑셀 다운로드 시 서버 에러가 납니다. 다운로드 데이터 양을 제한할 수 있나요?

**질문**

- 엑셀 다운로드 시 서버 쪽에서 에러가 나는 것 같은데, 다운로드할 데이터 양을 제한할 수 있는 기능이 있나요?

**답변**

`Down2Excel`에 다운로드 데이터를 제한하는 기능은 제공되지 않습니다. 용량을 제한하려면 WAS 쪽에서 파라미터 길이에 제한을 두거나, 서버 쪽에서 조회된 데이터의 길이를 확인해 처리하는 방법을 시도해 볼 수 있습니다. OOM이 발생한다면 DB에서 데이터를 담는 부분에서 발생하는 것은 아닌지도 확인해야 합니다.

**키워드**: Down2Excel, 데이터 양 제한, OOM, WAS, 서버 에러

---

### [XLS-0547] 엑셀 다운로드·업로드 요청 HTTP 헤더에 X-CSRF-TOKEN을 설정할 수 있나요?

**질문**

- 엑셀 다운로드·업로드 요청의 HTTP 헤더에 X-CSRF-TOKEN 값을 넣어야 합니다. POST 파라미터로는 해결되지 않는데 헤더 속성을 변경하는 옵션이 있나요?

**답변**

제품에서 HTTP 헤더에 X-CSRF-TOKEN 값을 설정하는 기능은 지원하지 않습니다(form submit 형태로 동작). 따라서 엑셀 다운로드 방식을 xhr 형태로 구현해야 합니다. 다운로드나 업로드 함수에 `DebugMode:1`을 설정하면 시트 정보를 추출할 수 있으며, 추출한 정보를 ajax로 Down2Excel.jsp나 LoadExcel.jsp 쪽에 전달하면 됩니다(관련 함수는 ibsheetinfo.js에 있음).

**키워드**: X-CSRF-TOKEN, DebugMode, Down2Excel.jsp, LoadExcel.jsp, ibsheetinfo.js, xhr

---

## SheetDesign·색상·폰트

### [XLS-0548] 엑셀 다운로드 시 색상이 화면과 다르게(팔레트 유사색, 파랑·갈색·붉은색) 나오는 이유

**질문**

- 시트에 지정한 배경색이 엑셀로 내려받으면 화면과 다른 색으로 표시됩니다. 화면 색 그대로 내려받을 수 있나요?
- Down2Excel로 엑셀 파일을 내려받으면 헤더 글자색이 파란색으로 나옵니다. 검정색으로 받을 수 있나요?
- Down2Excel로 받은 엑셀의 하늘색 헤더를 복사해 새 엑셀 파일에 붙여넣으면 색상이 다르게(갈색 등) 보입니다.
- 다운로드한 엑셀의 내용을 새로 연 엑셀 파일로 옮기면 헤더 색상이 붉게 바뀝니다.
- SheetDesign:1로 엑셀을 다운로드할 때 서버모듈이 헤더 색상 값을 어떻게 엑셀에 적용하나요?

**답변**

`Down2Excel`에 `SheetDesign:1`을 지정하면 시트의 폰트명·폰트 크기·배경색을 엑셀에 반영할 수 있지만, 현재 그리드 테마를 기준으로 엑셀 색상 팔레트 중 가장 유사한 색이 선택되므로 화면 색이 그대로 내려오지 않습니다. 시트에서 텍스트가 검정이어도 팔레트의 유사색으로 바뀌어 파란색 등으로 나올 수 있으며, 색상 설정은 `down2Excel.jsp` 안에 있고 폰트 색상은 `HeaderFontColor`에 대한 것만 설정됩니다.

- 색 변환 과정: 클라이언트가 보내는 전문의 `<HeaderBackColor>13230581</HeaderBackColor>` 같은 값을 서버모듈이 파싱하고, `(값/256/256)%256, (값/256)%256, 값%256` 공식으로 RGB(201.225.245)로 바꾼 뒤 POI 2003 팔레트에서 가장 유사한 색의 인덱스를 찾아 `FillForegroundColor`에 넣습니다(서버모듈 1.1.26, xls 기준).
- 다운로드한 파일을 새 엑셀 파일에 복사·붙여넣기하면 색이 달라지는 것은 엑셀 팔레트 때문이며 제품 문제가 아닙니다. 다운로드된 파일에는 시트 색상이 팔레트에 추가되지만 새 파일은 윈도우 기본 색상이 팔레트로 지정되어 있어 다르게 보입니다.
- 색을 쓰지 않으려면 `SheetDesign:0`으로 다운로드하는 방법이 있습니다. 그렇지 않으면 파란색 등으로 나와도 변경할 수 없습니다.

**적용 버전**: 서버모듈 1.1.26, xls 형식 기준(색 변환 과정)

**키워드**: SheetDesign, 엑셀 팔레트, HeaderBackColor, HeaderFontColor, down2Excel.jsp, FillForegroundColor

---

### [XLS-0549] 엑셀 다운로드 시 글자(폰트) 색상, 데이터 영역 bold가 반영되지 않는 이유

**질문**

- 셀 단위로 폰트 색상(예: 빨간색)을 지정했는데 엑셀로 다운로드하면 검정색으로 나옵니다.
- 화면 시트에는 컬럼의 FontColor가 적용되는데 Down2Excel로 엑셀을 내려받으면 글자색이 검은색으로만 나옵니다.
- Down2Excel로 엑셀을 내려받을 때 SetCellFontColor로 지정한 셀 글자색이 엑셀에 적용되지 않습니다.
- SheetDesign을 1로 설정했는데도 엑셀 다운로드에 CSS가 적용되지 않습니다. 배경색과 글자색은 어떻게 적용하나요?

**답변**

버전에 따라 폰트 색상 지원 여부가 다릅니다.

- 이전 버전에서는 엑셀 다운로드 시 `CellBackColor`(셀 배경색)만 적용되고 `FontColor`(글자색) 적용은 지원되지 않습니다. `SheetDesign:1`을 적용해도 폰트명, 폰트 크기, 배경색 등은 반영되지만 폰트색은 기본 검정색만 지원됩니다. `SheetDesign:1`일 때 전달되는 정보는 `<SheetFontName><SheetFontSize><HeaderBackColor><SumBackColor>` 정도이며 데이터 영역의 bold나 색상 기능도 지원하지 않습니다.
- Down2Excel은 시트 정보를 백엔드로 보낼 때 데이터가 많아지면 성능 문제로 폰트 색상을 추출하지 않아 검은색으로 나옵니다. 폰트 색상 다운로드 기능은 IBSheet 7.0.13.218-20230518-1538-M, 백엔드 모듈 ibsheet7-2.1.6.jar에서 추가되었으므로 제품을 업그레이드하면 해결됩니다.
- 7.0.13.179(서버모듈 ibsheet7-2.0.83) 버전에서는 헤더 배경색이 첫 번째 컬럼의 색상으로만 전체 헤더에 적용되고, 데이터 행은 배경색이 적용되지 않고 글자색만 적용되는 것으로 알려져 있습니다. 배경색·글자색은 CSS 설정이 아니라 `SetCellBackColor`, `SetCellFontColor`로 지정해야 하며, 최신 버전에서는 헤더 배경색을 컬럼마다 별도로 설정할 수 있습니다.

**적용 버전**: 7.0.13.218-20230518-1538-M, ibsheet7-2.1.6.jar에서 폰트 색상 추가 / 7.0.13.179 기준 동작 상이

**키워드**: FontColor, SetCellFontColor, SheetDesign:1, 폰트 색상, ibsheet7-2.1.6.jar, SetCellBackColor, bold

---

### [XLS-0550] OnSearchEnd에서 행에 적용한 배경색·폰트 변경을 엑셀 다운로드에 반영할 수 있나요?

**질문**

- OnSearchEnd에서 특정 행에 적용한 배경색이나 폰트 변경을 Down2Excel로 내려받은 엑셀 파일에도 적용하고 싶습니다.

**답변**

`SheetDesign`에서 지원하는 스타일 외에 각 행의 색상 등 스타일을 엑셀 파일에 적용하는 기능은 지원되지 않습니다. 모든 행과 셀의 스타일 정보를 서버로 보내면 파라미터 크기가 감당할 수 없이 커질 우려가 있기 때문입니다. 서버 쪽에서 workbook 객체를 가져와 스타일을 적용하는 로직을 직접 구현하는 방법은 있습니다.

**키워드**: OnSearchEnd, Down2Excel, SheetDesign, 행 스타일, workbook

---

### [XLS-0551] 엑셀 다운로드 시 데이터 영역·편집불가·홀짝 행·트리 레벨 배경색이 반영되지 않을 때

**질문**

- Down2Excel로 시트에서 지정한 배경색(헤더, 합계행, 셀·행·컬럼 색 등)이 엑셀에 반영되지 않습니다.
- Down2Excel로 내려받으면 편집 불가 컬럼의 회색이 데이터 행에는 칠해지지 않습니다(헤더는 정상).
- SheetDesign:1로 엑셀 다운로드를 해도 readonly 셀의 회색 배경이 나오지 않고 흰색으로 출력됩니다.
- 트리 시트를 Down2Excel로 엑셀 다운로드할 때 상위 레벨 행의 배경에 색을 입히고 싶습니다.

**답변**

`Down2Excel`에 `SheetDesign:1`을 지정해야 색상 정보가 엑셀에 생성됩니다. 이 옵션은 헤더행 배경색·폰트명·폰트 크기·합계행 색상 등을 반영하며, 데이터 영역과 소계행 색상은 자동으로 반영하지 않습니다.

- 편집 가능/불가능(readonly)과 짝수/홀수(alternate) 행의 배경색은 속도 문제로 엑셀에 칠하지 않습니다. 엑셀에서 배경색이 필요하면 해당 셀에 실제로 배경색을 지정해야 하며, 별도로 색상을 지정하면 다운로드 속도가 저하될 수 있습니다.
- API로 행/열/셀에 색을 넣었거나(`CellBackColor`, `RowBackColor`, `ColBackColor`) 조회 JSON 속성(`SaveName#BackColor` 등)으로 지정한 색은 `SheetDesign:1`을 쓰면 반영됩니다.
- 트리 시트의 레벨별 배경색은 조회 JSON에서 `backcolor`를 표현하면 됩니다.

**키워드**: SheetDesign:1, CellBackColor, RowBackColor, ColBackColor, readonly 배경색, alternate, backcolor

---

### [XLS-0552] 엑셀 다운로드 시 소계·합계 행 배경색이 칠해지지 않을 때 해결 방법

**질문**

- SetSubSumBackColor로 소계 행에 배경색을 적용했는데 엑셀로 저장하면 색이 반영되지 않습니다.
- 엑셀 다운로드 시 합계행의 배경색이 엑셀에 내려받아지지 않습니다.
- Down2Excel로 엑셀을 다운로드할 때 소계와 합계에 SetCellBackColor로 지정한 배경색이 엑셀에 적용되지 않습니다.
- SheetDesign으로 엑셀을 다운로드하면 소계 행의 배경색이 칠해지지 않습니다.

**답변**

엑셀 저장 시 `Down2Excel()`의 `SheetDesign: 1` 속성을 지정하면 소계·합계 행의 스타일이 반영됩니다. 다만 소계는 여러 줄이라 `SheetDesign:1`만으로는 화면 디자인이 엑셀에 기본 적용되지 않으므로 다음과 같이 합니다.

- 소계 행: `SetSubSumBackColor`(`SubSumBackColor`)로 소계 행 색을 지정한 뒤 `Down2Excel`에 `SheetDesign:1`을 주어 다운로드합니다(`NumberFormatMode`와는 관련이 없습니다). 서버모듈이 jar 버전이면 이 방법으로 되고 .net은 적용되지 않으면 패치가 필요합니다.
- 합계 행: 테마에 따라 다르지만 대체로 엑셀로 내려받지 못하므로 `SetSumBackColor`로 합계행 색을 지정한 뒤 다운로드합니다. 단 Default 테마의 `#eaf1fb`와 비슷한 계열은 내려받아지지 않습니다.
- 소계·합계에 `SetCellBackColor`로 지정한 배경색이 적용되지 않던 증상은 서버모듈 1.1.129 버전 배포로 처리되었습니다.
- 확인 기준: 7.0.13.134, ibsheet7-2.0.62.jar에서 헤더와 합계 배경색은 정상 반영되지만 소계 행은 `SubSumBackColor`로 칠해 주어야 다운로드되었습니다.

**적용 버전**: 서버모듈 1.1.129에서 수정, 7.0.13.134·ibsheet7-2.0.62.jar 기준 확인

**키워드**: SetSubSumBackColor, SetSumBackColor, SheetDesign:1, 소계 배경색, 합계행, 서버모듈 1.1.129

---

### [XLS-0553] 엑셀 다운로드 시 헤더 배경색·폰트 크기·글꼴을 공통으로 바꾸려면(Down2Excel.jsp)

**질문**

- 엑셀 다운로드 시 헤더의 배경색이나 폰트 크기를 모든 다운로드에 공통으로 변경하고 싶습니다. 어디에서 수정하는 것이 가장 쉬운가요?
- 엑셀 다운로드 시 헤더에만 배경색을 넣고 싶은데 SheetDesign을 쓰면 전체 디자인이 적용됩니다.
- 엑셀 다운로드 시 헤더 배경색이나 글꼴 같은 서식을 화면과 다르게 지정하려면 어디에서 설정하나요?

**답변**

`Down2Excel.jsp`에서 수정하는 것이 가장 쉽습니다. 엑셀 다운로드/업로드 때는 화면에 보이는 시트 정보가 서버로 전송되며, 다운로드 결과를 화면과 다르게 설정하려면 `Down2Excel.jsp`의 환경변수를 수정합니다. `setFontSize`, `setFontName`, `setHeaderBackColor` 등 다운로드 시 공통으로 적용할 항목이 제공됩니다. `SheetDesign:1`은 헤더뿐 아니라 폰트명, 폰트 크기 등 전체 디자인을 적용하므로, 헤더만 따로 지정하려면 `Down2Excel.jsp`에 주석 처리되어 있는 `down.setHeaderBackColor("#FF2233");` 줄의 주석을 풀어 색을 설정합니다.

**키워드**: Down2Excel.jsp, setHeaderBackColor, setFontSize, setFontName, SheetDesign, 헤더 배경색

---

### [XLS-0554] 엑셀로 다운로드할 때만 헤더 배경색을 화면과 다르게 지정하는 방법

**질문**

- 엑셀로 다운로드할 때만 헤더 배경색을 다른 색으로 지정해서 내려받고 싶습니다.
- 엑셀로 다운로드할 때만 헤더의 배경색을 화면과 다르게 지정할 수 있나요?

**답변**

다운로드하는 동안만 헤더 색을 바꾸었다가 되돌립니다. 다운로드 전에 `GetHeaderBackColor()`로 기존 헤더 색을 보관하고, `SetHeaderBackColor`(`HeaderBackColor`)로 원하는 색(예: 빨간색)으로 바꾼 뒤 `Down2Excel({SheetDesign:1})`로 다운로드하고, 완료 후 `SetHeaderBackColor`로 원래 색을 되돌립니다. `SheetDesign`을 1로 설정해야 시트에 지정한 색으로 다운로드됩니다.

**키워드**: GetHeaderBackColor, SetHeaderBackColor, HeaderBackColor, Down2Excel, SheetDesign:1

---

### [XLS-0555] 크롬·엣지에서 엑셀 다운로드 시 헤더 배경이 검정색으로 나오는 현상

**질문**

- 크롬, 엣지 브라우저에서 엑셀 다운로드 시 헤더 부분 배경색이 검정색으로 나옵니다. 원인과 해결 방법이 무엇인가요?

**답변**

헤더 배경에 gradient를 적용했을 때 엑셀 다운로드가 이를 지원하지 않아 나타나는 증상입니다. `HeaderBackColor` 함수로 색을 직접 칠해야 하며, `ibsheetinfo.js`의 `IBS_InitSheet` 함수에서 시트의 `InitColumns` 호출 이후 `HeaderBackColor`에 화면 색상과 최대한 비슷한 색을 적용합니다.

**키워드**: HeaderBackColor, gradient, 헤더 검정색, ibsheetinfo.js, IBS_InitSheet, InitColumns

---

### [XLS-0556] 엑셀 다운로드에 시트의 배경색·헤더·폰트 디자인이 반영되지 않을 때(SheetDesign:1)

**질문**

- 시트의 배경색을 변경했는데 엑셀로 다운로드하면 적용되지 않습니다. 시트 디자인을 엑셀에 반영하려면 어떻게 하나요?
- Down2Excel로 내려받은 엑셀에 헤더가 내려오지 않거나 배경색·폰트 크기 등 시트 디자인이 반영되지 않습니다.
- 엑셀로 다운로드하면 화면 그리드에 있던 스타일이 사라집니다. 스타일을 유지한 채 내려받으려면 어떻게 하나요?
- 화면마다 엑셀 다운로드 결과가 다릅니다. 어떤 화면은 디자인과 머지가 적용되는데 새 화면은 적용되지 않습니다.
- 모든 다운로드에 SheetDesign을 공통으로 적용하려면 어떻게 하나요?

**답변**

`Down2Excel` 호출 시 `SheetDesign:1`을 지정하면 헤더 디자인, 테두리·정렬, 행 색상, 폰트명, 폰트 크기, 배경색 같은 시트 디자인이 엑셀에 반영됩니다. 다만 폰트 색상은 지원하지 않습니다. 이 속성을 지정하지 않았거나(기본값 0은 디자인을 반영하지 않음) 속성명에 오타가 있으면 반영되지 않습니다. `SheetDesign:2`는 1과 같이 디자인은 반영하되 셀 테두리는 그리지 않고, `3`은 셀 테두리와 디자인을 모두 반영하지 않습니다. 단, 엑셀은 시트 색상과 가장 유사한 팔레트 기준으로 내려받기 때문에 화면과 동일한 색상으로 내려오지는 않습니다.

- 이전에 정상이던 표 모양이 갑자기 사라졌다면 이 파라미터가 빠지지 않았는지, 파라미터를 넣어 주는 공통 파일이 배포에서 누락되지 않았는지 확인합니다.
- 모든 다운로드에 공통으로 적용하려면 시트 초기화 공통 함수에서 `SetDown2ExcelConfig`로 설정합니다. 예: `sheet.SetDown2ExcelConfig({SheetDesign:1})`. 화면별로 결과가 다르면 시트 생성 함수(createIBSheet)에서 `SetDown2ExcelConfig`로 SheetDesign:1, AutoSizeColumn:0, Merge:1, Mode:2를 설정한 화면과 같은 설정이 새 화면에도 적용되는지 확인합니다.
- 전체 폰트와 폰트 크기는 `Down2Excel.jsp`에서 설정할 수 있고, 헤더는 배경색, 굵게 설정 여부, 글자색, 폰트, 폰트 크기를 별도로 설정할 수 있습니다.

**키워드**: SheetDesign, SheetDesign:1, SetDown2ExcelConfig, Down2Excel, 시트 디자인, 엑셀 다운로드 스타일

---

### [XLS-0557] SheetDesign 값(0, 1, 2, 3)별 동작과 테두리 제외, 배경색 48가지·속도 제약

**질문**

- Down2Excel의 SheetDesign 인자는 값에 따라 어떻게 동작하나요? 폰트색이나 배경색 반영에 제약이 있나요?
- 엑셀로 다운로드할 때 셀 테두리를 없애고 싶습니다. 어떤 옵션 값을 설정하면 되나요?
- Down2Excel, DirectDown2Excel로 엑셀을 내려받을 때 시트의 테두리를 빼고 받으려면 어떻게 설정하나요?

**답변**

`SheetDesign`은 IBSheet의 디자인을 엑셀에 반영하는 인자로 폰트명, 폰트크기, 배경색 등을 지원하며 사용하면 처리 속도가 느려질 수 있습니다.

- `0`(기본값): 디자인을 반영하지 않습니다.
- `1`: 시트 디자인을 반영합니다.
- `2`: 1과 같이 디자인은 반영하되 셀 테두리(외곽선)는 그리지 않습니다.
- `3`: 셀 테두리와 시트 디자인을 모두 반영하지 않습니다. 테두리를 없앨 때 `SheetDesign:3`을 쓰면 `Down2Excel.jsp`의 `ibExcel.setDefaultFontName("맑은고딕");`, `ibExcel.setDefaultFontSize((short)10);` 기능이 같이 동작합니다.
- 셀 배경색은 엑셀 문서 하나에 동시에 최대 48가지만 지원되어 초과하면 가장 유사한 색으로 대체됩니다.
- 폰트색은 가이드상 검은색으로만 표시되지만 7.0.13.218-20230518-1538-M 버전에서 폰트 색상 다운로드 기능이 추가되었습니다.

**적용 버전**: 7.0.13.218-20230518-1538-M에서 폰트 색상 기능 추가

**키워드**: SheetDesign:2, SheetDesign:3, 테두리 제외, setDefaultFontName, 배경색 48가지, DirectDown2Excel

---

### [XLS-0558] SheetDesign:1로 엑셀 다운로드 시 폰트 색상·굵기·disable 색상·제목 일부 bold가 반영되지 않는 이유

**질문**

- 엑셀로 다운로드할 때 SheetDesign을 1로 설정했는데 시트에 지정한 글꼴 색상이 엑셀에 반영되지 않습니다.
- 엑셀 다운로드 시 SheetDesign:1을 지정했는데도 폰트와 헤더 색상이 제대로 나오지 않습니다. 흰색 폰트를 사용할 수 있나요?
- 엑셀 다운로드할 때 시트의 폰트 굵기 등 서식을 맞춰서 내려받을 수 있나요?
- 시트에서 disable 된 색상 정보를 추출해 엑셀 다운로드 파일에 넣을 수 있나요?
- Down2Excel로 내려받을 때 상단 title의 첫째 줄에만 bold 처리와 글자 색을 입히고 싶습니다.

**답변**

`SheetDesign:1`은 폰트명, 폰트크기, 배경색상만 반영합니다. 일반적으로 다음은 반영되지 않으며 변경할 수 없습니다.

- 폰트 색상: 폰트는 기본 검정색으로만 내려오므로 흰색 폰트는 사용할 수 없습니다.
- 폰트 굵기(bold): 반영되지 않습니다.
- 시트에서 disable 된 색상 정보: 추출해서 엑셀에 만드는 기능이 없습니다.
- 제목(title)의 첫째 줄처럼 일부분에만 bold와 색상을 적용하는 기능은 지원되지 않습니다.

**키워드**: SheetDesign:1, 폰트 색상, bold, disable 색상, 제목 bold, 흰색 폰트

---

### [XLS-0559] SheetDesign:1 엑셀 다운로드 시 타이틀 글자색이 흰색으로 나올 때

**질문**

- 엑셀 다운로드 시 타이틀 컬럼 글자색이 검정이어야 하는데 흰색으로 나와 보이지 않습니다.

**답변**

`SheetDesign:1`인 경우 `Down2Excel.jsp`에서 색상을 변경하고 있어서 그렇습니다. 글자색은 `Down2Excel.jsp`의 색상 설정을 확인합니다.

**키워드**: SheetDesign:1, Down2Excel.jsp, 타이틀 글자색, 흰색 글자

---

### [XLS-0560] 엑셀 다운로드 시 폰트명·글자 크기(ExcelFontSize, setFontSize)가 적용되지 않을 때

**질문**

- Down2Excel로 엑셀을 내려받을 때 ExcelFontSize를 지정해도 글자 크기가 적용되지 않습니다.
- DirectDown2Excel.aspx에 SetDefaultFontName과 SetDefaultFontSize를 설정했는데 폰트 크기가 설정값과 다르게 나옵니다.
- Down2Excel로 엑셀을 내려받을 때 기본 폰트를 맑은고딕으로 바꾸고 싶습니다.
- 버전을 올린 뒤 SheetDesign:1로 엑셀을 내려받으면 이전보다 폰트와 폰트 크기가 화면 시트 값으로 커져서 내려옵니다.
- 닷넷 환경에서 Down2Excel의 fontSize, fontName 설정을 바꿔도 엑셀에 적용되지 않습니다.

**답변**

SheetDesign 값에 따라 적용되는 폰트 설정이 다릅니다.

- `ExcelFontSize` 인자는 SheetDesign이 0 또는 3일 때만 적용됩니다. `setDefaultFontName`/`setDefaultFontSize`(또는 사용자 환경설정의 `String defaultFontName`, 기본값 `Dotum`)는 SheetDesign이 0이거나 설정하지 않았을 때 적용되므로, 맑은고딕으로 바꾸려면 이 값을 `맑은고딕`으로 바꿉니다.
- SheetDesign:1(또는 2)이면 폰트명·크기·배경색을 화면 시트에서 가져오므로 `ExcelFontSize`와 jsp의 defaultFontName, defaultFontSize는 무시됩니다. 값을 강제로 지정하려면 `Down2Excel.jsp`, `DirectDown2Excel.jsp`의 주석 처리된 `down.setFontSize(20);`를 해제하거나 `SetFontName`, `SetFontSize`를 설정하고, `ExcelFontSize`가 안 먹으면 `setFontSize` 부분의 주석이 해제되어 있는지 확인합니다. `OnBeforeDownload`에서 전문의 SheetFontSize 값을 바꾸는 방법도 있습니다.
- 2.0.65 버전부터 SheetDesign:1이면 FontSize와 FontName이 화면 시트를 따라가도록 수정되었습니다(이전에는 돋움, 폰트 10으로 고정). 이전과 같은 결과가 필요하면 `Down2Excel.jsp`에서 `down.setFontName('돋움')`과 `down.setFontSize(10)`을 설정합니다.
- 닷넷 환경에서 sheetDesign을 사용하려면 `down2Excel.aspx`에서 `defaultFontsize`를 막고 `setFontsize`를 사용합니다.
- 폰트명과 크기는 보통 화면에서 전문으로 결정되며, `Down2Excel.jsp`의 사용자 환경설정 4번과 5번을 설정할 수도 있습니다. `SheetDesign` 값에 따라 달라지므로 화면에서 `SheetDesign`을 무엇으로 설정했는지 먼저 확인합니다.

**적용 버전**: 2.0.65에서 SheetDesign:1 폰트 동작 변경

**키워드**: ExcelFontSize, setFontSize, setDefaultFontName, SetFontName, down2Excel.aspx, SheetDesign, 맑은고딕

---

### [XLS-0561] 엑셀 다운로드에서 나눔고딕 등 폰트명이 돋움으로 표시되거나 폰트 Family를 지정할 수 있나요?

**질문**

- 시트 폰트가 나눔고딕이고 SheetDesign:1로 엑셀을 내려받았는데 엑셀에서 폰트가 돋움으로 표시됩니다.
- Down2Excel로 엑셀을 내려받을 때 폰트 Family를 지정할 수 있나요? 시트의 폰트는 그대로 내려오나요?

**답변**

Down2Excel 호출 시점에는 폰트명을 따로 지정할 수 없습니다(`ExcelfontSize` 등은 지정 가능). `SheetDesign:1`을 사용하면 시트에 있는 폰트명이 내려가지만, `ibsheet.css`에 지정된 폰트가 해당 PC에도 설치되어 있어야 정상적으로 적용됩니다.

- 나눔고딕은 'NanumGothic' 또는 '나눔고딕'이라는 이름으로만 내려받을 수 있습니다. 브라우저에서 폰트를 'Nanum Gothic'으로 설정했고 PC에 해당 폰트가 없어서 생기는 현상일 수 있습니다. `Down2Excel.jsp`에서 `ibExcel.setFontName('NanumGothic')` 또는 `ibExcel.setFontName('나눔고딕')`으로 설정합니다.

**키워드**: 나눔고딕, NanumGothic, setFontName, 폰트 Family, SheetDesign:1, ibsheet.css

---

### [XLS-0562] SheetDesign:1 다운로드 시 NumberFormatException, XSSFColor.setRgb 오류, 행 배경색·정렬 문제의 수정 버전

**질문**

- 엑셀 다운로드 시 sheetDesign:1을 설정하면 서버 콘솔에 java.lang.NumberFormatException: For input string: '?1' 오류가 납니다.
- Down2Excel에 SheetDesign:1 옵션을 주고 다운로드하면 NoSuchMethodError: org.apache.poi.xssf.usermodel.XSSFColor.setRgb([B) 오류가 납니다.
- 특정 행의 배경색을 변경한 뒤 sheetdesign:1로 엑셀을 다운로드하면 텍스트 정렬이 center(가운데)로만 출력됩니다.
- 행 단위로 BackColor를 지정한 조회 데이터를 엑셀로 다운로드하면 색상이 들어간 행의 배경색이 그려지지 않습니다.

**답변**

구버전 서버모듈에서 발생하던 증상으로 버전 업그레이드로 해결됩니다.

- `NumberFormatException: For input string: '?1'`: 서버모듈 1.1.87.jar에서 발생했으며 `ibsheet7-1.1.133.jar`로 올리면 정상 동작합니다.
- `XSSFColor.setRgb([B)` NoSuchMethodError: 서버모듈 `ibsheet7-2.0.1.jar` 배포로 처리되었습니다.
- 배경색을 바꾼 행이 sheetdesign:1에서 가운데 정렬로만 출력되는 증상: IBSheet 7.0.0.0-20140703 버전과 서버모듈 1.1.31 배포로 처리되었습니다. jdk 1.4용 서버모듈은 `ibsheet7-1.1.34-1.4` 배포로 처리되었습니다.
- 행 단위 BackColor가 엑셀에서 그려지지 않는 증상: 20141115 버전과 1.1.17.jar에서 나타난 현상이며 상위 버전으로 올리면 정상 표시됩니다.

**적용 버전**: ibsheet7-1.1.133.jar, ibsheet7-2.0.1.jar, 7.0.0.0-20140703·서버모듈 1.1.31(jdk 1.4용은 ibsheet7-1.1.34-1.4), 20141115·1.1.17.jar 사용 시 발생

**키워드**: NumberFormatException, XSSFColor.setRgb, ibsheet7-1.1.133.jar, ibsheet7-2.0.1.jar, 서버모듈 1.1.31, 정렬 center

---

### [XLS-0563] SheetDesign:1 사용 시 다운로드 중단, zip 파일로 저장, 파일 손상 경고, 색상 미적용 오류와 우회

**질문**

- InitHeaders를 설정한 시트에서 엑셀 다운로드가 되지 않습니다. 스크립트 에러가 납니다.
- 컬럼 개수가 많은 시트를 엑셀 다운로드하면 엑셀 파일이 아니라 zip 파일로 떨어집니다.
- 엑셀 다운로드 파일을 열 때 '파일 형식 및 확장명이 일치하지 않습니다'라는 경고가 뜹니다.
- 그라데이션 헤더를 쓰는 엑셀 다운로드 파일이 열 수 없는 파일이라고 나옵니다.
- Down2Excel에서 SheetDesign:1을 설정했는데 엑셀에 색상 정보가 적용되지 않습니다.

**답변**

원인별로 확인합니다.

- `SheetDesign:1`을 주면 스크립트 에러가 발생해 다운로드가 진행되지 않는 경우가 있으며, 우선 `SheetDesign:1`을 빼고 진행하는 방법이 있습니다. 파일 형식·확장명 불일치 경고도 `Down2Excel()`에서 `SheetDesign:1`을 제거하면 정상 저장된 사례가 있습니다(정확한 원인은 별도 분석 필요).
- SheetDesign:1에서 컬럼 개수가 많으면 IO Exception(zip bomb) 에러가 나 zip 파일로 내려올 수 있습니다. 메모리 문제로 추정되며 `SheetDesign:0`으로 설정하면 정상 다운로드됩니다.
- 그라데이션 헤더를 쓰면서 `sheetDesign:1`과 `UserMerge`를 함께 쓴 경우 파일을 열 수 없었으며, `sheetDesign`을 0으로 하고 `UserMerge`를 쓰지 않으니 정상 다운로드되었습니다. 그라데이션 색상을 정상 표현하지 못해 생기는 문제로 보입니다.
- 크롬에서 오류가 나는데 서버모듈이 매우 오래된 버전(ibsheet7-1.1.4)이면 버전 업데이트가 이상적이지만, 어렵다면 `ibsheet.css`의 그라데이션 부분을 주석 처리합니다.
- `setUsePOI(false)`를 사용하면 SheetDesign 색상 정보가 엑셀에 반영되지 않습니다. IBSheet7은 POI 4.x 버전을 지원하지 않으므로 POI 3.13 버전을 사용해야 합니다.

**키워드**: SheetDesign:0, zip bomb, UserMerge, 그라데이션, setUsePOI(false), ibsheet.css, 파일 형식 확장명 불일치

---

### [XLS-0564] 닷넷(dotnet) 서버모듈에서 sheetDesign:1 엑셀 다운로드가 느린 이유

**질문**

- 엑셀 다운로드에서 sheetDesign:1을 적용하면 5000건 정도에서도 시간이 오래 걸립니다. dotnet 서버 모듈에서 원인과 개선 여부가 궁금합니다.

**답변**

dotnet 서버 모듈에서 `sheetDesign: 1`을 사용하면 셀마다 스타일을 적용하므로 syncfusion의 style API 사용 수에 따라 성능이 크게 떨어집니다. 공통 스타일을 각 셀이 공유하도록 수정해 API 사용 수를 줄인 결과 23개 컬럼 30000건에서 약 30초로 개선되었습니다(Java 대비로는 10배 가량 느린 수준). 개선은 2.0.0.3 버전 릴리즈에 반영되었습니다.

**적용 버전**: 2.0.0.3 릴리즈에서 개선

**키워드**: sheetDesign:1, dotnet, syncfusion, 성능 저하, 2.0.0.3, 엑셀 다운로드 속도

---

### [XLS-0565] 시트의 머지(헤더 머지 포함)가 엑셀 다운로드에 반영되지 않을 때(Merge 속성)

**질문**

- 시트에서는 머지되어 있는데 엑셀로 다운로드하면 머지가 반영되지 않습니다(헤더 머지 포함).

**답변**

`Down2Excel`의 `Merge` 속성을 `1`로 설정하면 시트의 머지가 엑셀에도 적용됩니다(기본값 `0`은 머지를 사용하지 않음). 시트 디자인까지 반영하려면 `SheetDesign:1`을 함께 지정합니다. 예: `mySheet.Down2Excel({Merge:1, SheetDesign:1})`. 자세한 규칙은 도움말의 '엑셀 다운시 머지 적용 처리' 항목을 참고합니다.

**키워드**: Merge:1, Down2Excel, SheetDesign:1, 엑셀 머지, 헤더 머지

---

### [XLS-0566] SheetDesign:0으로 디자인을 뺀 채 엑셀 헤더에만 배경색을 넣을 수 있나요?

**질문**

- SheetDesign을 0으로 설정해 시트 디자인을 뺀 채 엑셀을 다운로드할 때, 다운로드된 엑셀 파일의 헤더에만 배경색을 넣을 수 있나요?

**답변**

SheetDesign을 빼면 엑셀 파일을 만들기 위해 `down2Excel.jsp`로 보내는 전문에서 디자인 관련 내용이 모두 빠집니다. 엑셀 파일에만 디자인을 주려면 `onBeforeDownload` 시점에 해당 전문에 접근하여 헤더 배경색과 관련된 내용을 추가하면 가능합니다.

**키워드**: SheetDesign, onBeforeDownload, 헤더 배경색, down2Excel.jsp, 전문

---

### [XLS-0567] 엑셀 다운로드 글꼴 크기는 어떻게 지정하고, 제목(Title) 문자열에만 다른 폰트를 쓸 수 있나요?

**질문**

- Down2Excel로 엑셀을 다운로드할 때 글꼴 크기를 개별적으로 지정하려면 어떻게 하나요?
- Down2Excel에서 title로 주어지는 문자열에만 다른 폰트를 지정할 수 있나요?
- Down2Excel로 엑셀을 내려받을 때 그리드 위에 제목(Title)을 넣고, 데이터 영역은 그대로 둔 채 제목의 글꼴 크기나 bold만 바꿀 수 있나요?

**답변**

- 글꼴 크기: `Down2Excel`에서 `ExcelFontSize`를 설정하거나, `Down2Excel.jsp`에서 `FontSize`를 설정합니다.
- 제목(Title) 문자열에만 따로 폰트를 설정하는 방법은 없습니다. 전체에 적용되는 `ExcelFontSize`나 `down2Excel.jsp` 안의 font 관련 설정은 있지만 Title 전용 설정은 아닙니다.
- 상단 제목(Title) 영역 속성에 관한 설명은 서버모듈 2.0(Java) 개발자가이드의 '4.7.4 Header 및 Footer 기능' 장을 참고합니다.

**키워드**: ExcelFontSize, FontSize, Title 폰트, 글꼴 크기, Header 및 Footer 기능, Down2Excel.jsp

---

### [XLS-0568] 엑셀 다운로드 시 특정 컬럼 너비만 넓히거나 화면 컬럼 너비가 엑셀에 적용되지 않을 때 어떻게 하나요?

**질문**

- Down2Excel로 엑셀을 내려받을 때만 특정 컬럼의 너비를 더 넓게 하고 싶습니다. 화면에 보이는 컬럼 너비는 그대로 두려면 어떻게 하나요?
- 엑셀 다운로드 시 화면의 컬럼 너비가 엑셀에 적용되지 않고 다운로드됩니다. 원인이 무엇이고 어떻게 해결하나요?

**답변**

- 다운로드할 때만 특정 컬럼 너비를 늘리려면 `Down2Excel` 호출 직전에 `SetColWidth`로 해당 컬럼 너비를 늘리고, 호출 뒤에 원래 너비로 되돌립니다. 예: `mySheet.SetColWidth(3, 300);mySheet.Down2Excel(params);mySheet.SetColWidth(3, 85);`
- 화면의 컬럼 너비가 엑셀에 적용되지 않는 것은 시트의 너비를 받아 엑셀에서 표현하는 너비로 계산할 때 엑셀 너비를 넘어가는 경우의 예외 처리가 없기 때문입니다. 해당 처리를 넣어 down2excel 파일을 수정해야 합니다.

**키워드**: SetColWidth, Down2Excel, 컬럼 너비, 엑셀 너비 초과, down2excel

---

## 다운로드 숫자·날짜·텍스트 서식

### [XLS-0569] 엑셀 다운로드 시 화면에는 129로 보이는 값이 129.0으로 나오면 NumberFormatMode를 쓰나요?

**질문**

- 화면에는 129처럼 소수점 없이 표시되는 값이 엑셀 다운로드 시에는 129.0으로 나옵니다. 엑셀에서도 화면처럼 표시할 수 있나요?

**답변**

`Down2Excel` 함수의 `NumberFormatMode` 속성을 사용합니다. 서버모듈 jar(WEB-INF/lib의 ibsheet로 시작하는 파일) 이름이 1로 시작하면 `ibsheet7-1.1.64.jar` 이상부터 지원되고, 2로 시작하는 jar는 모두 지원됩니다.

**적용 버전**: 서버모듈 1.1.64 이상(2로 시작하는 jar는 모두 지원)

**키워드**: NumberFormatMode, 129.0, 소수점 .0 표시, Down2Excel, ibsheet7-1.1.64.jar

---

### [XLS-0570] 통화 서식이 적용된 값을 엑셀로 다운로드할 때 숫자로 내려받으려면 어느 버전이 필요한가요?

**질문**

- 통화 서식이 적용된 값을 엑셀로 다운로드할 때 숫자로 내려받고 싶습니다. IBSheet7과 서버모듈은 어느 버전부터 처리가 가능한가요?

**답변**

통화 서식을 숫자로 다운로드하는 처리는 IBSheet7 7.0.13.99 버전과 서버모듈 1.1.98.jar 이상 버전부터 가능합니다.

**적용 버전**: 7.0.13.99 이상, 서버모듈 1.1.98.jar 이상

**키워드**: 통화 서식, 숫자로 다운로드, 7.0.13.99, 서버모듈 1.1.98.jar, 엑셀 다운로드

---

### [XLS-0571] 엑셀 다운로드 시 날짜 데이터가 간단한 날짜 서식이 아니라 사용자 지정 형식으로 나오는 이유는?

**질문**

- 엑셀 다운로드 시 날짜 데이터가 간단한 날짜 서식이 아니라 텍스트나 사용자 지정 형식으로 출력됩니다. 간단한 날짜 형식으로 받으려면 어떻게 해야 하나요?

**답변**

`WEB-INF/lib`의 `ibsheet7-1.x.x.jar` 파일명 끝 숫자가 84보다 작으면 날짜 데이터가 사용자 지정 형식으로 다운로드됩니다(예: `ibsheet7-1.1.76.jar`). 간단한 날짜 형식으로 다운로드하려면 ibsheet7로 시작하는 jar 파일을 패치된 제품으로 교체해야 합니다.

**적용 버전**: 서버모듈 jar 끝 숫자 84 이상

**키워드**: 날짜 서식, 간단한 날짜, 사용자 지정 형식, ibsheet7 jar 교체, jar 끝 숫자 84

---

### [XLS-0572] 서버모듈로 저장한 엑셀에서 컨트롤+방향키가 빈 셀을 건너뛰고 시트 끝으로 이동하는 현상은 해결됐나요?

**질문**

- 서버모듈로 저장한 엑셀에서 컨트롤 + 방향키로 이동하면 빈 셀이 있어도 시트 끝으로 이동합니다. 연속된 데이터의 끝 셀로 이동하게 하려면 어떻게 하나요?

**답변**

서버모듈 2.0으로 저장한 엑셀에서 컨트롤 + 방향키 이동 시 빈 셀이 있어도 시트 끝으로 이동하는 현상은 IBSheet7 서버모듈 2.1.89 배포로 처리되었습니다.

**적용 버전**: 서버모듈 2.1.89 배포

**키워드**: 컨트롤 방향키 이동, 시트 끝 이동, 서버모듈 2.1.89, 엑셀 저장, 빈 셀

---

### [XLS-0573] 서버모듈(1점대 jar)로 엑셀 다운로드할 때 SetCellFontColor로 바꾼 헤더 폰트색이 반영되지 않는 이유는?

**질문**

- 서버모듈(1점대 jar)로 엑셀 다운로드할 때 헤더 특정 셀에 SetCellFontColor로 바꾼 폰트색이 반영되지 않습니다. 해결 방법이 있나요?

**답변**

서버모듈 1점대에서 헤더 배경색은 적용되도록 처리되었지만 헤더 폰트색은 엑셀 다운로드에 적용되지 않습니다. 서버모듈 버전을 업그레이드해도 헤더 폰트색은 사용할 수 없습니다.

**적용 버전**: 서버모듈 1점대

**키워드**: SetCellFontColor, 헤더 폰트색, 엑셀 다운로드 헤더, 서버모듈 1점대, 미지원

---

### [XLS-0574] 다운로드한 엑셀에서 셀 배경색을 두 번 클릭해야 적용되거나 조건부 서식이 안 걸리는 현상은 어느 버전에서 해결되나요?

**질문**

- Down2Excel로 다운로드한 엑셀 파일에서 데이터가 있는 셀은 색상 버튼을 두 번 클릭해야 배경색이 칠해집니다. 한 번 클릭으로 바뀌게 하려면 어떻게 하나요?
- 엑셀로 다운로드한 문서에서 셀 배경색을 두 번 클릭해야 적용되거나 조건부 서식이 걸리지 않는 경우가 있습니다. 해결된 버전이 있나요?

**답변**

색상을 두 번 클릭해야 배경색이 적용되거나 조건부 서식이 적용되지 않던 현상은 엑셀 서버모듈 패치로 처리되었습니다. 서버모듈 2.0.91 이상(`ibsheet7-2.0.91.jar` 배포)부터 정상 동작하며 2.0.92 버전이 배포되었으므로, 서버모듈을 해당 버전 이상으로 사용하면 됩니다.

**적용 버전**: 서버모듈 2.0.91 이상(ibsheet7-2.0.91.jar)

**키워드**: 배경색 두 번 클릭, 조건부 서식, 서버모듈 2.0.91, ibsheet7-2.0.91.jar, Down2Excel

---

### [XLS-0575] 다운로드한 엑셀에서 병합을 풀 때 '선택 영역에는 데이터값이 여러개가 있습니다.' 메시지가 나오지 않게 하려면?

**질문**

- 다운로드한 엑셀 파일에서 병합을 풀 때 '선택 영역에는 데이터값이 여러개가 있습니다.' 메시지가 뜨는데 이 메시지가 나오지 않게 하려면 어떻게 하나요?

**답변**

다운로드한 엑셀에서 병합을 풀 때 '선택 영역에는 데이터값이 여러개가 있습니다.' 메시지가 나타나는 문제는 서버모듈 `ibsheet7-2.0.68.jar` 배포로 처리되었습니다.

**적용 버전**: ibsheet7-2.0.68.jar

**키워드**: 병합 해제 경고, 선택 영역에는 데이터값이 여러개가 있습니다, ibsheet7-2.0.68.jar, 엑셀 셀 병합, 서버모듈 2.0.68

---

### [XLS-0576] 엑셀 다운로드 시 숫자에 .0/.00이 붙거나 앞의 0이 사라질 때 NumberTypeToText 사용

**질문**

- 조회 후 InitCellProperty로 행마다 Int와 Float로 달리 표시했더니 엑셀 다운로드 시 Int 값에도 .00이 붙습니다.
- Down2Excel로 엑셀을 다운로드하면 화면에는 1로 보이는 숫자가 1.0처럼 .0이 붙어 내려옵니다. 컬럼 타입은 float입니다.
- 엑셀 다운로드 후 셀을 선택하면 맨 앞의 0이 제거되어(예: 02103이 2103으로) 보입니다.
- 엑셀 다운로드 시 숫자 컬럼을 숫자가 아닌 text 타입으로 내려받고 싶습니다. 어떤 옵션을 설정하나요?

**답변**

엑셀 다운로드 시에는 value 값이 전달됩니다. `Down2Excel`의 `NumberTypeToText`를 1(true)로 설정하면 값이 text로 전달되고 엑셀의 서식도 text 서식이 되어 숫자 타입으로 지정된 컬럼이 텍스트 셀 서식을 가집니다. 이 경우 맨 앞의 0이 유지되고 `.0`/`.00`이 붙지 않습니다.

- Float(실수형) 컬럼은 엑셀로 내려받을 때 `.0`이 붙을 수 있으므로 소수점을 표시하지 않으려면 컬럼 타입을 `Int`(정수)로 변경하거나 `NumberTypeToText`를 지정합니다.
- 텍스트로 받으면 엑셀에서 바로 합계를 계산하는 용도에는 적합하지 않습니다.
- Integer로 지정한 컬럼이 통화 서식으로 내려올 때 텍스트로 받으려면 같은 기능(`NumberTypeToText`)을 사용합니다. 숫자형으로 내려오게 하는 것은 제품 수정이 필요한 사항이었습니다.

**키워드**: NumberTypeToText, Down2Excel, 엑셀 다운로드 서식, 앞자리 0, 소수점 .0, 텍스트 서식

---

### [XLS-0577] 엑셀 다운로드 시 %(퍼센트) 표기가 사라지거나 셀 서식 불안전 알림이 뜰 때

**질문**

- InitCellProperty로 셀 포맷을 0.0%로 바꿨는데 엑셀로 다운로드하면 %가 표시되지 않습니다.
- 숫자와 %가 함께 있는 컬럼을 엑셀로 다운로드하면 셀 서식이 불안전하다는 알림이 뜹니다. 타입을 Text로 바꿔도 비슷한 알림이 뜹니다.

**답변**

엑셀 저장 시 숫자형 자료는 %라는 문자를 인식할 수 없어 숫자형 데이터로 전달됩니다. `Down2Excel()`의 파라미터 `NumberTypeToText`를 1로 설정해 다운로드하면 %가 출력된 채로 저장됩니다.
엑셀 다운로드는 각 컬럼의 포맷에 따라 서식을 만들고 포맷이 없으면 일반 서식으로 생성합니다. 시트에서 내려줄 수 있는 서식 종류가 한정되어 있어 `%`가 포함된 값도 백분율 서식이 아니라 일반 또는 text 서식으로만 생성되므로, 엑셀이 값과 서식이 맞지 않는다고 오류 안내를 표시합니다. 외부 라이브러리로 만든 엑셀 문서를 엑셀에서 직접 만든 것과 동일한 서식으로 내려받기는 어렵습니다.

**키워드**: NumberTypeToText, 퍼센트, %, InitCellProperty, 셀 서식 오류, Down2Excel

---

### [XLS-0578] Text 컬럼이 엑셀에서 숫자 서식이 아닌 일반 서식으로 내려오거나 숫자 코드에 콤마가 붙을 때

**질문**

- 시트의 숫자 컬럼을 엑셀로 다운로드하면 서식 없이 일반으로 내려옵니다. 숫자 서식에 맞춰 내려받으려면 어떻게 하나요?
- Text 타입 컬럼의 값을 엑셀로 다운로드할 때 숫자형 셀 서식으로 내려받을 수 있나요?
- Down2Excel로 내려받을 때 숫자만 있는 코드 값에 콤마가 붙어서 내려옵니다.

**답변**

컬럼 타입에 따라 서식이 정해집니다.

- 숫자 컬럼은 서식에 맞춰 내려오며, 일반으로 내려오는 경우는 컬럼 타입이 text인 숫자형 문자일 가능성이 있습니다. Text 컬럼은 엑셀에서 숫자형 셀 서식을 가질 수 없으며, 텍스트를 숫자형으로 바꾸어 내려받는 기능은 없으므로 화면에서 type을 숫자로 바꿉니다.
- 서식이 없는 일반 서식으로 내려받는 것은 가능합니다.
- 숫자로만 이루어진 코드 값에 콤마가 붙는 것은 숫자 서식이 적용되기 때문으로 보이며, 필요하다면 해당 시트 컬럼을 Text 타입으로 내려받는 방법을 고려할 수 있습니다.

**키워드**: Text 컬럼, 숫자 서식, 일반 서식, 콤마, 숫자형 문자, 엑셀 다운로드

---

### [XLS-0579] Type:Int·Float 컬럼이 엑셀에서 통화 서식으로 내려올 때 NumberExMode:1로 숫자 서식 지정

**질문**

- Type을 Int로 지정한 컬럼을 Down2Excel로 내려받으면 엑셀 서식이 통화로 나옵니다. 숫자 서식으로 내려받을 수 있나요?
- Down2Excel로 다운로드한 엑셀에서 숫자 셀이 문자 형식으로 표시됩니다. 셀 서식을 숫자로 저장하려면 어떤 옵션을 쓰나요?
- 엑셀 다운로드 시 숫자 서식이 통화로 내려오는데 회계 서식으로 바꿀 수 있나요?
- 다운로드 받은 엑셀 파일에서 숫자 컬럼끼리 수식을 지정하고 싶은데 수식 지정이 되지 않습니다.

**답변**

`Type`이 `Int`, `Float`인 컬럼은 기본적으로 엑셀 셀 서식이 통화로 내려갑니다. 통화 서식이면 수식을 지정할 수 있으므로 수식이 안 되면 먼저 셀 서식을 확인합니다.

- `Down2Excel({NumberExMode:1})`로 설정하면 '통화'가 아닌 '숫자' 서식으로 내려받을 수 있습니다. 이 옵션은 매뉴얼에 설명이 누락되어 있습니다.
- jsp에서 설정해 모든 시트에 적용할 수도 있지만 2.0 서버모듈에서만 `down.setNumberExMode(true);`로 설정할 수 있고, 1.0 서버모듈은 `Down2Excel()`의 인자로만 설정할 수 있습니다.
- '회계' 서식으로는 설정하기 어렵습니다.

**적용 버전**: 2.0 서버모듈에서만 setNumberExMode 가능

**키워드**: NumberExMode, 통화 서식, 숫자 서식, setNumberExMode, 회계 서식, Down2Excel

---

### [XLS-0580] 엑셀 다운로드 시 Text 컬럼이 일반 서식으로 내려와 앞자리 0이 사라질 때(TextToGeneral:0)

**질문**

- 엑셀 다운로드 시 Text 타입 컬럼의 셀 서식이 텍스트가 아닌 일반으로 내려옵니다. 텍스트 서식으로 받으려면 어떤 옵션을 써야 하나요?
- Down2Excel로 내려받으면 사번처럼 앞자리가 0인 컬럼값(00, 01 등)의 0이 사라집니다.
- Text 타입 컬럼(숫자로 된 문자)을 내려받으면 엑셀에서 셀 서식이 숫자로 바뀌거나 지수 형태로 보입니다.
- 엑셀 다운로드 시 우편번호처럼 0으로 시작하는 값에 포맷팅을 적용하면 앞의 0이 없어진 채로 받아집니다.

**답변**

시트의 Text 타입 컬럼은 엑셀로 내려받을 때 기본적으로 '일반' 서식으로 처리되어, 숫자로만 된 문자열은 엑셀에서 숫자나 지수 형태로 바뀌고 앞자리 0이 사라질 수 있습니다. `Down2Excel` 인자에 `TextToGeneral:0`을 지정하면 텍스트 서식으로 내려받습니다(일반 서식이 1(Default), 텍스트 서식이 0).

- 시트 영역 밖의 서식은 엑셀 기본 서식인 일반이라 바꿀 수 없고, 다운로드된 시트 영역 안의 텍스트 컬럼에 한해 변경됩니다.
- 0으로 시작하는 코드(예: 우편번호)는 포맷팅 대신 템플릿 기능을 이용해 텍스트 서식으로 내려받는 방법도 사용해야 할 것으로 보입니다.
- 데이터 없이 내려받은 엑셀의 Text 컬럼에 0001을 입력하면 1로 바뀌는 경우에도 서버모듈 1.0, 2.0 모두 최신 버전에서는 `TextToGeneral: 0`으로 텍스트 서식이 적용됩니다. 서버모듈 2.0은 2.1.7 배포 이전에는 Text 컬럼에 텍스트 서식이 적용되지 않았으므로 구버전이면 업그레이드가 필요할 수 있습니다.
- `TextToGeneral:0`, `AllTypeToText:1`, `NumberTypeToText:1`을 줘도 다운로드 데이터 안의 값 없는 셀이 일반 서식으로 받아지는 현상은 ibsheet.js 7.0.13.221, jar 2.1.7에서 패치된 이력이 있으므로 제품 버전을 확인합니다.

**적용 버전**: 서버모듈 2.0은 2.1.7 이후, ibsheet.js 7.0.13.221·jar 2.1.7에서 값 없는 셀 서식 패치

**키워드**: TextToGeneral, TextToGeneral:0, Text 컬럼, 앞자리 0, 텍스트 서식, Down2Excel

---

### [XLS-0581] AllTypeToText와 TextToGeneral, NumberTypeToText의 관계와 텍스트·일반 서식으로 내려받는 방법

**질문**

- Down2Excel에서 숫자 컬럼을 제외한 컬럼을 모두 text로 다운로드하려고 AllTypeToText를 설정하면 어떻게 동작하나요?
- 엑셀 다운로드 시 아무 서식 없이 순수한 엑셀 포맷으로만 받으려면 어떤 옵션을 주어야 하나요?
- 행마다 셀 타입을 다르게 준 시트를 엑셀로 다운로드하면 화면 그대로 내려오지 않습니다.
- Down2Excel 호출 시 AllTypeToText 속성이 적용되지 않는 것처럼 보이거나, TextToGeneral:0 으로 설정했는데 일부 text 컬럼이 일반 서식으로 내려옵니다.
- DirectDown2Excel로 내려받을 때 Text 타입 컬럼의 숫자 데이터가 엑셀에서 일반 서식으로 내려옵니다.

**답변**

`AllTypeToText:1`은 모든 컬럼을 Text로 인식해 다운받을지 결정하는 인자입니다. 도움말에는 모든 컬럼을 text로 다운로드한다고 되어 있지만 실제로는 `TextToGeneral` 설정에 따라 text 서식과 일반 서식으로 나뉘어 내려갑니다.

- 일반 서식: `Down2Excel({AllTypeToText:1, NumberTypeToText:1})`. 텍스트 서식: 여기에 `TextToGeneral:0`을 추가합니다.
- text 타입과 popupedit 타입을 모두 text 서식으로 내려받는 인자도 `AllTypeToText`이며, 사용 중인 버전이 지원하지 않으면 업그레이드가 필요합니다. DirectDown2Excel에서 Text 타입 컬럼의 숫자 데이터가 일반 서식으로 내려오던 증상은 IBSheet7 7.0.4.4-20141114-11 버전 배포로 처리되었으며 `AllTypeToText`를 사용합니다.
- 행마다 셀 타입을 조건에 따라 다르게 주면 생성되는 전문에 컬럼별 타입과 포맷이 담기므로 정상 다운로드되지 않습니다. 이때는 `Down2Excel()`에 `AllTypeToText:1`, `TextToGeneral:0`을 함께 넣어 호출합니다.
- `AllTypeToText`가 적용되지 않는 것처럼 보이면 `TextToGeneral:0` 설정 여부를 먼저 점검합니다. 반대로 `AllTypeToText`와 함께 쓰면 `TextToGeneral`이 무시된다는 사례도 있으므로(근거가 부족한 안내), 두 인자를 함께 쓸 때 일부 text 컬럼이 일반 서식으로 내려오면 `AllTypeToText`를 함께 사용하고 있지 않은지 확인합니다.

**적용 버전**: 7.0.4.4-20141114-11에서 DirectDown2Excel Text 서식 처리

**키워드**: AllTypeToText, TextToGeneral, NumberTypeToText, DirectDown2Excel, popupedit, 일반 서식

---

### [XLS-0582] 엑셀 다운로드 시 AutoSum·CalcLogic 계산 결과를 값이 아닌 엑셀 수식으로 내려받을 수 있나요?

**질문**

- 엑셀 다운로드 시 CalcLogic을 적용한 컬럼이나 AutoSum 행이 계산 수식이 아닌 값(텍스트)으로만 내려옵니다. 수식 자체를 내려받을 수 있나요?
- 엑셀 다운로드할 때 AutoSum이나 CalcLogic 컬럼의 계산 결과를 값이 아닌 엑셀 수식으로 내려받을 수 있나요? 어떻게 설정하나요?

**답변**

기본적으로 `CalcLogic`을 적용한 컬럼이나 AutoSum 행은 엑셀에 계산된 값(텍스트)만 내려가고 계산 수식은 내려가지 않으며, 일반적으로 수식을 다운로드하는 기능은 제공되지 않는다고 안내됩니다. 다만 비공개 기능이 있어서, `InitColumns`에서 `Type:"AutoSum"` 또는 `"AutoAvg"` 컬럼을 만들거나 `CalcLogic`으로 계산식을 적용한 뒤 다운로드 함수에 `UseFormula:1`을 설정하면 수식이 적용되어 내려받아집니다. `CalcLogic`은 `"|A|*|B|"` 같은 간단한 사칙연산만 가능하고 Function 형태는 지원하지 않습니다. xls는 제약이 많으므로 xlsx 다운로드를 권장합니다.

**키워드**: UseFormula, CalcLogic, AutoSum, AutoAvg, 엑셀 수식, InitColumns

---

### [XLS-0583] 다이렉트 다운로드에서 텍스트 컬럼을 일반 형식으로 내릴 때 셀의 삼각형 표시를 없앨 수 있나요?

**질문**

- 다이렉트 다운로드를 할 때 텍스트 타입 컬럼이 일반 형식으로 내려오고 셀에 삼각형이 표시됩니다. 이를 없애거나 바꿀 수 있나요?

**답변**

일반 형식으로 다운로드하는 방법은 있지만, 코드성 데이터(예: 0011)를 일반으로 바꾸면 11로 변환되므로 그렇게 처리할 수 없습니다.

**키워드**: 다이렉트 다운로드, 엑셀 다운로드, 일반 형식, 텍스트 컬럼, 코드성 데이터

---

### [XLS-0584] CSV로 내려받아 엑셀로 열면 16자리 이상 숫자가 0으로 바뀌는 이유

**질문**

- 숫자로 구성된 text 컬럼에서 16자리 이상 데이터를 CSV로 내려받아 엑셀로 열면 16자리 이후가 0으로 바뀝니다.

**답변**

CSV 파일 자체에는 데이터가 정상적으로 들어 있지만, 엑셀로 열면서 12자리 이상이 지수 형태로 바뀌고 16자리 이후부터 0으로 변경됩니다. 엑셀이 일반 컬럼의 데이터를 16자리 이상 처리하지 못해 나타나는 현상이며, CSV는 일반 text 에디터로 열어야 정확히 볼 수 있습니다. 엑셀 파일도 해당 셀을 더블클릭하면 동일하게 16자리 이후가 0으로 바뀝니다. `Down2Text`에서 `TextToGeneral:0`을 설정하도록 합니다.

**키워드**: CSV, 16자리, Down2Text, TextToGeneral:0, 지수 형태

---

### [XLS-0585] ApproximateType으로 반올림한 Float 값이 엑셀 다운로드에서는 원래 값으로 나올 때

**질문**

- Float 컬럼에 ApproximateType을 1(반올림)로 설정해 시트에는 28.56이 29로 표시되는데, 엑셀로 다운로드하면 원래 값인 28.56으로 나옵니다. 29로 저장하려면 어떻게 하나요?

**답변**

`ApproximateType`으로 반올림한 값이 엑셀 다운로드에서 원래 값으로 나오는 경우 `Down2Excel`의 `TextToGeneral` 옵션을 사용해 볼 수 있습니다. 확정된 해결 방법은 아니므로 적용 후 결과를 확인합니다.

**키워드**: ApproximateType, TextToGeneral, 반올림, Float, Down2Excel

---

### [XLS-0586] 엑셀 다운로드 때만 날짜 포맷이나 구분자를 화면과 다르게 지정할 수 있나요?

**질문**

- 화면은 그대로 두고 엑셀로 다운로드할 때만 날짜 구분자(.)를 -로 바꿔서 내려받을 수 있나요?
- 컬럼 날짜 포맷이 Ymd인데 엑셀로 다운로드할 때는 Ym(년월)로만 표시하고 싶습니다.
- 날짜 포맷이 yyyy/MM/dd인데 엑셀로 다운로드하면 yyyy-MM-dd로 나타나는 원인은 무엇인가요?
- ibmsg의 날짜·숫자 포맷을 다른 나라 형식으로 바꾸면 다운로드한 파일의 값도 정상적으로 표시되나요?

**답변**

엑셀 다운로드는 화면에 보이는 그대로 내려가므로, 화면은 두고 다운로드할 때만 날짜 구분자를 따로 바꾸는 것은 안 됩니다. 구분자를 바꾸려면 ibmsg 파일에서 `SYS_DateSeparator`를 `-`로 바꾸고 `SYS_d`, `SYS_g`, `SYS_m`, `SYS_M`도 같이 바꿔 화면을 바꾼 뒤 다운로드합니다. ibmsg의 날짜·숫자 포맷을 다른 나라 형식으로 바꾼 경우에는 해당 언어의 OS에서 다운로드하면 값이 정상적으로 표시됩니다.
구분자가 아니라 표시 단위(예: 년월일을 년월로)만 다운로드 시점에 바꾸려면 `OnBeforeDownload` 이벤트를 사용합니다. 엑셀 다운로드를 호출하면 직전에 이 이벤트가 발생하므로, 서버로 전달될 문자열 `frm.Data.value`에서 해당 컬럼의 포맷 정보를 `replace`로 `yyyy.MM.dd`에서 `yyyy.MM`으로 바꾼 뒤 `frm.submit()`으로 다운로드 폼을 서브밋합니다.
화면 포맷이 `yyyy/MM/dd`인데 엑셀에서 `yyyy-MM-dd`로 나타나는 현상은 제품 오류로 보이는 현상입니다.

**키워드**: SYS_DateSeparator, OnBeforeDownload, ibmsg, 날짜 구분자, frm.Data.value, 엑셀 다운로드 날짜 포맷

---

### [XLS-0587] Format:####-## 컬럼을 CSV로 다운로드해 엑셀에서 열면 2025-03이 Mar-25로 보이는 이유

**질문**

- Format:####-## 컬럼을 CSV로 다운로드해 엑셀에서 열면 2025-03이 Mar-25처럼 바뀌어 보입니다. 화면과 동일하게 표시할 수 있나요?
- CSV로 다운로드한 파일을 엑셀에서 열 때 년월 값이 화면과 다르게 표시됩니다.

**답변**

Excel 프로그램 자체의 특성입니다. 별다른 설정이 없으면 Excel은 년-월 형태의 값을 `Mar-25`처럼 바꿔 보여 줍니다. CSV 파일을 메모장으로 열면 해당 컬럼은 `####-##` 형태로 정상 저장되어 있습니다. CSV는 텍스트 파일이라 엑셀에서 표시되는 방식을 제어할 수 없으므로, Excel로 CSV를 열었을 때 화면과 동일하게 표시하는 것은 불가능합니다.

**키워드**: CSV 다운로드, Mar-25, Format:####-##, 년월 표시, 엑셀 날짜 자동 변환

---

### [XLS-0588] Type:Text 컬럼에 날짜 Format(yyyy-MM, ym)을 지정하면 엑셀 다운로드 값이 이상해집니다

**질문**

- 날짜 컬럼 데이터가 201301인데 Type:Text, Format:yyyy-MM으로 설정하고 엑셀로 다운로드하면 1900-01로 나옵니다.
- Text 타입에 Format을 ym으로 지정하고 엑셀로 다운로드한 데이터를 편집하려 하면 이상한 값으로 바뀝니다.

**답변**

Type:Text 컬럼에 날짜 Format을 지정한 경우 증상별로 다음과 같이 조치합니다.

- 데이터가 `201301`인 Text 컬럼에 `Format:yyyy-MM`을 지정해 다운로드했을 때 엑셀에 `1900-01`로 나오는 경우: Type:Text 컬럼에는 `yyyy-MM` 같은 날짜 Format을 지정하면 안 됩니다. Format을 빼고, 조회 데이터에 구분자를 붙인 값(`yyyy-MM` 형태)으로 내려줍니다.
- Text 타입에 `Format:ym`을 지정하고 엑셀로 다운로드한 데이터를 편집할 때 이상한 값으로 바뀌는 경우: ibmsg 파일에서 `SYS_DateSeparator`와 `SYS_m`의 구분자를 동일하게 설정합니다.

**키워드**: Type:Text, Format, yyyy-MM, SYS_DateSeparator, SYS_m, 엑셀 다운로드 1900-01

---

### [XLS-0589] 날짜 컬럼 Format을 Ym으로 지정했는데 엑셀 다운로드에서는 년월일로 내려옵니다

**질문**

- 날짜 컬럼에 format을 Ym으로 지정해 화면에는 년월로 조회되는데, 엑셀로 다운로드하면 년월일 형식으로 내려옵니다.
- 엑셀 다운로드에서 날짜 형식이 YYYY-MM-DD로 지정되어 내려오는 문제를 해결할 방법이 있나요?

**답변**

엑셀 다운로드 1.1.69 버전에서 날짜 형식이 `YYYY-MM-DD`로 지정되어 내려오는 현상이 있었고, 1.1.71 버전에서 패치되었습니다. 1.1.71 이상의 최신 버전을 사용하면 됩니다.

**적용 버전**: 엑셀 다운로드 1.1.69에서 발생, 1.1.71에서 패치

**키워드**: Ym, YYYY-MM-DD, 엑셀 다운로드, 날짜 포맷, 년월 다운로드, 1.1.71

---

### [XLS-0590] 엑셀 다운로드 시 컬럼 포맷에 %를 붙이려면 JSP에서 역슬래시를 몇 개 써야 하나요?

**질문**

- 컬럼 포맷에 %를 붙인 상태에서 엑셀로 다운로드하려고 합니다. % 표시를 위해 포맷 문자열을 JSP에서 어떻게 지정해야 하나요?

**답변**

%를 붙이려면 포맷 문자열에 역슬래시가 2개 붙어야 하며, JSP 해석에 따라서는 4개를 붙여야 하는 경우가 있습니다.

**키워드**: % 포맷, 역슬래시, JSP, 엑셀 다운로드 포맷, Format

---

### [XLS-0591] 엑셀로 다운로드한 파일에서 숫자 포맷 컬럼에 수식을 적용해도 동작하지 않는 원인

**질문**

- 엑셀로 다운로드한 파일에서 숫자 포맷으로 지정한 컬럼에 수식을 적용해도 동작하지 않습니다. 원인이 무엇인가요?

**답변**

서버에서 조회할 때 숫자 포맷 컬럼에 공백 문자열(`' '`)을 넣어 내려주는 것이 원인으로 확인된 사례가 있습니다. 숫자 포맷 컬럼에 공백 문자열이 내려가지 않도록 서버 데이터를 확인합니다.

**키워드**: 숫자 포맷, 수식 미동작, 공백 문자열, 엑셀 다운로드, 서버 조회 데이터

---

### [XLS-0592] 엑셀 다운로드에서 0 값을 '-'·공백·0으로 표시하려면 어떻게 하나요? (ZeroToReplaceChart, AllowNull)

**질문**

- 숫자형 컬럼에 ZeroToReplaceChart로 0을 '-'로 표시하게 했는데 엑셀로 다운로드하면 0으로 내려옵니다. 엑셀에도 '-'로 내려받을 수 있나요?
- Float 컬럼의 0 값을 대체 문자로 공백 처리했더니 화면은 공백인데 엑셀 다운로드에서는 빈값이 0으로 나옵니다.
- Type:Int, Format:NullInteger로 설정한 컬럼의 값을 엑셀로 다운로드할 때 0으로 표시되도록 내려받고 싶습니다.
- DirectDown2Excel로 내려받을 때 Type이 AutoSum인 컬럼의 값이 0이면 엑셀에 0으로 나오지 않습니다.

**답변**

증상별로 다음과 같이 조치합니다.

- `ZeroToReplaceChart`로 0을 '-'로 표시했는데 엑셀에는 0으로 내려오는 경우: `ZeroToReplaceChart` 설정으로는 엑셀에 '-'가 내려가지 않습니다. 해당 컬럼 값을 null로 조회하고 `AllowNull:1`을 지정하면 엑셀에서는 공백으로 나옵니다. 반드시 '-'가 필요하면 원 데이터를 가공해야 하는데, Type:Text로 두고 숫자에 구분자(, .)를 붙인 문자열과 '-'를 데이터로 내려주면 엑셀에도 그대로 받아집니다. 다만 이 방식은 숫자형 편집 시의 포맷이 지정되지 않으므로 사용자가 수정하지 않는 컬럼에만 쓸 수 있습니다.
- Float 컬럼의 0을 공백으로 표시했는데 엑셀에서 0으로 나오는 경우: 정수부에 0이 나와야 하면 Format은 `#,##0.##`처럼 유지하고 `AllowNull:1`을 설정합니다. 그러면 공백이 허용되며 엑셀 다운로드에서도 공백으로 내려받아집니다.
- `Format:NullInteger` 컬럼을 엑셀에서 0으로 받고 싶은 경우: `Format:Integer`로 바꾸면 0으로 내려받을 수 있습니다.
- `DirectDown2Excel`에서 AutoSum 컬럼의 0이 엑셀에 나오지 않는 경우: 포맷을 `Integer`로 지정하고 DB 데이터 값을 0으로 한 다음 엑셀을 다운로드합니다.

**키워드**: ZeroToReplaceChart, AllowNull, NullInteger, AutoSum, DirectDown2Excel, 0 값 엑셀 표시, 대체 문자

---

### [XLS-0593] AutoSum·정수 컬럼을 엑셀로 다운로드하면 123이 123.0처럼 .0이 붙는 이유와 해결 방법

**질문**

- Type:AutoSum 컬럼의 합계가 화면에는 정수로 보이는데 엑셀로 다운로드하면 .0이 붙어 소수점 이하가 표시됩니다. 화면처럼 정수로 받으려면 어떻게 하나요?
- AutoSum 타입 컬럼의 합계를 엑셀로 다운로드하면 정수 뒤에 .0이 붙고 0도 0.0으로 나옵니다.
- 정수 데이터 컬럼을 엑셀로 다운로드하면 숫자 뒤에 .0이 붙거나 27,000.0처럼 소수점이 나옵니다.
- AutoSum 타입 컬럼에 포맷을 Integer로 설정했는데 엑셀로 다운로드하면 0.0처럼 소수점 첫째 자리가 붙어서 내려갑니다.

**답변**

AutoSum은 Float형 타입이고 기본 포맷이 `#,##0.######`(소수점이 있으면 표시하고 없으면 표시하지 않는 포맷)입니다. 시트는 이 포맷으로 전문을 정상 전송하지만 엑셀이 이를 `#,##0.0#####`로 바꿔 자동으로 .0이 붙습니다. 정수 데이터 컬럼도 Type과 Format이 Float 형태로 설정되어 있으면 엑셀에서 소수점(.0)이 붙습니다.

- 해결: AutoSum 컬럼에 `Format:Integer`(또는 `Format:#,##0`)를 지정합니다. 숫자형 셀 서식(`#,##0`)으로 다운로드되어 .0이 붙지 않으며 `NumberFormatMode:1`을 따로 설정하지 않아도 됩니다. `#.###` 또는 `NullInteger`를 Format으로 지정하는 방법도 있습니다. 일반 정수 컬럼은 `Type:Int`, `Format:Integer`로 지정합니다.
- 시트를 공통 함수로 만든다면 AutoSum 타입이면서 별도 포맷이 없는 경우 Format을 `Integer`로 강제 지정하는 방법도 깔끔합니다.
- `Format:Integer`를 지정했는데도 엑셀에서 `0.0`처럼 나오면 `Down2Excel.jsp` 파일을 열어 `isUTF8` 값을 현재 설정된 값의 반대 값으로 설정해 봅니다.

**키워드**: AutoSum, Format:Integer, NullInteger, isUTF8, 정수 .0 붙음, 엑셀 다운로드 소수점, #,##0.######

---

### [XLS-0594] Float 컬럼을 엑셀로 다운로드하면 정수에 .0이 붙거나 화면과 자릿수가 다릅니다 (NumberFormatMode)

**질문**

- Float 컬럼이나 Format:#,###.# 컬럼을 엑셀로 다운로드하면 정수가 5.0, 100.0처럼 소수점 0이 붙거나 자릿수가 화면과 다르게 나옵니다. 화면 그대로 받으려면?
- Type:Float, Format:NullFloat로 정의한 컬럼에서 정수 데이터를 조회한 뒤 엑셀로 다운로드하면 값 뒤에 .0이 붙습니다.
- Type:Float 컬럼에 % 포맷을 적용했는데 엑셀로 다운로드하면 0%가 0.0%로 내려옵니다. 화면에 표시된 대로 0%로 받으려면 어떻게 하나요?
- 화면 그리드에서는 소수점이 있는 실수로 표시되는 컬럼이 Down2Excel로 받은 엑셀에서는 정수 형태로만 내려옵니다. 엑셀 셀 서식을 어떻게 맞추나요?

**답변**

Down2Excel은 엑셀 서식을 컬럼 단위로 지정하고, 소수점이 없어도 '.'만 출력되는 것을 피하려고 `#,##0.0###`처럼 0을 포함한 서식을 쓰기 때문에 정수에도 0이 붙습니다. Float 컬럼은 내부적으로 `#,##0.######` 포맷이라 정수와 실수를 모두 표현하지만 엑셀은 이 포맷을 지원하지 않고 `#,##0.0#####`나 `#,###.0#####`만 지원하며, 이 포맷은 값이 정수여도 .0을 붙입니다. 기본 동작에서는 한 컬럼에 하나의 포맷만 적용됩니다.

- 해결: `Down2Excel` 호출 시 `NumberFormatMode:1`을 설정합니다(예: `mySheet.Down2Excel({NumberFormatMode:1})`). 컬럼 단위가 아니라 셀 값을 기준으로 정수/실수 서식이 셀별로 지정되어 5는 5, 0.5는 0.5, 0%는 0%처럼 화면 표시에 맞게 내려갑니다. 값마다 셀 Format을 적용하므로 데이터가 많을수록 속도가 느려집니다. 예제: https://jsfiddle.net/023kjdbz/1
- 화면은 실수인데 엑셀에서 정수로만 내려오면 컬럼 Type과 셀 Format이 맞는지 먼저 확인합니다. 셀의 값을 기준으로 서식을 설정하는 `NumberExMode: 1`을 `Down2Excel` 파라미터로 추가하라고 안내된 사례도 있습니다.
- 정수 데이터만 조회되는 컬럼은 `Type:Int`로 설정해도 됩니다.
- `NumberTypeToText`로 1.0을 1로 내려받는 방법도 있으나(오래된 버전은 해당 기능에 맞는 js와 jar 파일 필요), `NumberTypeToText`와 `TextToGeneral` 조합보다 `NumberFormatMode` 설정을 권장합니다.

**키워드**: NumberFormatMode, Down2Excel, Float, NullFloat, 정수 .0 붙음, NumberTypeToText, 소수점 자릿수

---

### [XLS-0595] InitCellProperty로 셀 단위로 바꾼 타입·포맷이 엑셀 다운로드에 반영되지 않습니다

**질문**

- InitCellProperty로 셀 단위로 타입과 포맷(소수점 자리 등)을 바꿨는데 엑셀 다운로드에는 반영되지 않고 초기 컬럼 설정대로 내려갑니다. 방법이 있나요?
- InitCellProperty로 특정 셀의 Format(소수점 자릿수, % 등)을 바꿨는데 엑셀로 다운로드하면 바꾼 서식이 반영되지 않고 컬럼 서식대로 나옵니다.
- PointCount:0인 Float 컬럼의 일부 셀을 InitCellProperty로 소수점 1자리로 바꿨습니다. 엑셀로 다운로드할 때도 해당 셀을 소수점 1자리로 받으려면 어떻게 하나요?

**답변**

`Down2Excel`은 헤더의 컬럼 정보와 데이터를 따로 서버로 보내므로 셀 단위 포맷까지 가져갈 방법이 없고, 초기에 설정된 컬럼 정보대로 다운로드됩니다. 그래서 `InitCellProperty`로 셀 단위로 바꾼 타입·포맷·이미지는 엑셀에 반영되지 않습니다. 상황별 대안은 다음과 같습니다.

- 소수점 같은 설정을 엑셀에도 적용하려면 `SetColProperty`로 설정하는 방법을 사용합니다.
- 숫자 타입(Int, Float, AutoSum) 컬럼의 값은 서버로 컬럼 타입에 맞게(예: 1.0이 아니라 1) 전달되므로 셀에 바꾼 Format이 반영되지 않습니다. `Down2Excel` 옵션에 `NumberTypeToText:1`을 지정하면 숫자 타입 데이터도 화면에 보이는 문자열로 전달되어 원하는 형태로 다운로드할 수 있습니다. `TextToGeneral:0`을 함께 지정하는 방법도 있습니다. 엑셀에서 데이터 계산이 필요 없는 경우에 사용합니다.
- `NumberFormatMode:1`은 `Type:Float`이고 `Format`이 `Float`, `NullFloat` 또는 사용자 정의 포맷(`#,###.######`)일 때만 데이터를 비교해 엑셀 셀 서식을 지정합니다. `PointCount:0`이면 시트가 내부적으로 정수형 컬럼(`#,##0`)으로 판단해 `NumberFormatMode:1`이 동작하지 않으므로, `PointCount`를 제거하고 `OnLoadData` 이벤트에서 바인딩 전 데이터를 가공(예: 12.55를 12로, 특정 조건에서는 12.1로 교체)한 뒤 `NumberFormatMode:1`로 다운로드합니다. 샘플: https://jsfiddle.net/dezqwotb

**키워드**: InitCellProperty, SetColProperty, NumberTypeToText, TextToGeneral, NumberFormatMode, PointCount, 셀 단위 포맷

---

### [XLS-0596] 엑셀로 다운로드한 숫자 컬럼의 셀 서식이 사용자 정의로 지정되어 자릿수 늘림/줄임 버튼을 쓸 수 없습니다

**질문**

- 숫자 컬럼을 엑셀로 다운로드하면 셀 서식이 사용자 정의로 지정되어 엑셀의 자릿수 늘림/줄임 버튼을 사용할 수 없습니다. 숫자 서식으로 받는 방법이 있나요?

**답변**

다운로드할 때 해당 컬럼의 Format을 `Float` 또는 `NullFloat`로 설정하고 `PointCount`를 지정합니다.

**키워드**: Format, Float, NullFloat, PointCount, 사용자 정의 서식, 자릿수 늘림

---

### [XLS-0597] Format이 ###,###,###,### 인 숫자 컬럼을 엑셀로 내려받으면 10,000이 0,10,000으로 나오는 원인

**질문**

- Format이 `###,###,###,###`인 숫자 컬럼을 엑셀로 내려받으면 10,000이 0,10,000처럼 출력됩니다. 원인과 해결 방법은 무엇인가요?

**답변**

`ExportMode:2`로 설정했을 때 나타나는 현상입니다. `ExportMode:1`로 바꾸면 정상적으로 출력됩니다.

**키워드**: ExportMode, ExportMode:1, ExportMode:2, 0,10,000, 천 단위 쉼표

---

### [XLS-0598] 엑셀로 다운로드한 xls 파일에서 쉼표(천 단위) 서식을 적용하면 숫자 앞에 $ 기호가 붙습니다

**질문**

- 엑셀로 다운로드한 int·float 숫자 컬럼에서 엑셀의 쉼표(천 단위) 서식을 적용하거나 편집하면 숫자 앞에 달러($) 기호가 붙습니다. 어떻게 해결하나요?

**답변**

xls 형식에서는 콤마 서식을 붙일 때 무조건 `$` 통화기호가 붙으며, `NumberFormatMode`를 1 또는 2로 설정해 파일 내 서식을 바꿔도 해결되지 않습니다. 해결 방법은 xlsx로 내려받는 것뿐입니다. 서버모듈 2.0은 `down2Excel.jsp`의 사용자 환경 설정 #4에서 `setFileType('xlsx')`로 설정합니다.

**키워드**: $ 기호, xlsx, setFileType, down2Excel.jsp, 쉼표 서식, NumberFormatMode

---

### [XLS-0599] Float 셀에 배경색을 주고 NumberFormatMode:1로 xlsx 다운로드하면 다른 셀에도 배경색이 칠해집니다

**질문**

- Float 타입 셀에 배경색을 지정하고 NumberFormatMode:1로 xlsx 다운로드하면 색을 지정하지 않은 셀에도 배경색이 칠해져 내려옵니다. 해결 방법이 있나요?

**답변**

Float 타입 셀에 배경색을 적용하고 `Down2Excel` 인자에 `NumberFormatMode:1`을 준 채 xlsx로 다운로드하면 배경색을 지정하지 않은 셀에도 배경색이 적용되는 오류가 있었으며, 서버모듈 1.1.135 패치 버전에서 처리되었습니다. 해당 버전 이상의 서버모듈을 사용합니다.

**적용 버전**: 서버모듈 1.1.135에서 수정

**키워드**: NumberFormatMode, 배경색, xlsx, 서버모듈 1.1.135, Down2Excel, Float 셀

---

### [XLS-0600] FormatFix 속성은 엑셀 다운로드 값에 어떤 영향을 주나요? (문자열로 내려오거나 지수 형태로 나올 때)

**질문**

- Down2Excel로 금액 컬럼을 다운로드하면 숫자가 아니라 문자열로 내려옵니다. 컬럼 정의에 FormatFix:1이 있는데 이것이 원인인지, 어떻게 하면 숫자로 받을 수 있나요?
- Type:Float, Format:Float, PointCount:1 컬럼의 실제 데이터가 -1.576334e-10 같은 지수 형태여서 화면에는 0.0으로 보이는데 엑셀로 다운로드하면 지수 형태로 나옵니다. 화면 값으로 받으려면?

**답변**

`FormatFix` 속성이 설정되면 해당 컬럼의 값이 포맷이 적용된 문자열(celltext, 화면에 표시되는 값)로 설정됩니다.

- 엑셀에 숫자가 아니라 문자열로 내려오는 경우: `FormatFix`가 원인이므로 `FormatFix` 속성을 제거하면 숫자로 받을 수 있습니다.
- 실제 데이터가 `-1.576334e-10` 같은 지수 형태여서 화면에는 `0.0`으로 보이는데 엑셀에는 지수 형태로 나오는 경우: `InitColumns`의 `FormatFix` 속성을 1로 지정하면 celltext 값(화면에 표시되는 값)으로 다운로드할 수 있습니다.

**키워드**: FormatFix, celltext, InitColumns, 지수 형태, 문자열로 다운로드, Down2Excel

---

### [XLS-0601] 엑셀 다운로드에서만 컬럼 Format을 다르게 하려면(포맷 제거·마스킹 해제·소수 12자리) 어떻게 하나요?

**질문**

- 화면에서는 컬럼 값을 Format으로 마스킹해 보여 주되 Down2Excel로 내려받는 엑셀에는 마스킹 없이 원본 값이 나오게 하려면 어떻게 해야 하나요?
- 사업자번호처럼 포맷이 적용된 컬럼을 화면에서는 포맷대로 보이게 하되, 엑셀로 다운로드할 때는 포맷을 빼고 숫자만 내려받고 싶습니다.
- 소수점 12자리 데이터가 시트에는 6자리까지만 표시되고 엑셀로 다운로드해도 6자리까지만 나옵니다. 12자리까지 모두 다운로드하려면 어떻게 설정하나요?

**답변**

`Down2Excel`은 화면에 표시된 형태(Format이 적용된 값) 그대로 다운로드하는 것이 기본 동작입니다. 시트가 만드는 전문에 `1111-1111-1111`처럼 포맷이 포함되거나 마스킹된 값이 만들어지고, 엑셀은 받은 데이터를 그대로 생성할 뿐입니다. 엑셀에서만 다른 포맷이 필요하면 `Down2Excel()` 호출 직전에 `SetColProperty`로 해당 컬럼 속성을 바꾸고, 다운로드가 끝나면 원래 설정으로 되돌립니다.

- 포맷을 빼고 숫자만 받기: `Format`을 빈 값으로 바꿔 다운로드한 뒤 원래 포맷(예: `####-####-####-####`)으로 다시 지정합니다.
- 마스킹 없이 원본 받기: `Format`을 원본 표시 포맷(예: `###########`)으로 바꿔 `Down2Excel()`을 호출하고, 다시 마스킹 포맷(예: `###****####`)으로 되돌립니다. Format에서 `#`은 숫자 자리 표시, `*`는 해당 위치의 값을 *로 표시합니다.
- 소수점 12자리까지 받기: `{Format:'Float', PointCount:'12'}`로 바꿔 다운로드한 뒤 `{Format:'Float'}`로 되돌립니다.

**키워드**: SetColProperty, Down2Excel, Format, PointCount, 마스킹, 사업자번호, 포맷 제거

---

### [XLS-0602] Type:Popup 컬럼에 Format:Integer를 지정하면 엑셀 다운로드 파일을 열 때 데이터 손실 메시지가 뜹니다

**질문**

- 엑셀로 다운로드한 파일을 열면 데이터가 손실되었다는 메시지가 뜹니다. 컬럼이 Type:Popup, Format:Integer로 설정되어 있는데 원인이 무엇인가요?

**답변**

Type:Popup 컬럼은 기본적으로 텍스트 컬럼으로 동작합니다. 여기에 Format:Integer 같은 숫자 포맷을 함께 지정한 설정이 엑셀 파일을 열 때 데이터 손실 메시지가 나오는 원인이므로, Type과 Format 조합을 맞춰야 합니다.

**키워드**: Type:Popup, Format:Integer, 데이터 손실 메시지, 엑셀 다운로드 오류, Type과 Format 조합

---

### [XLS-0603] Type:Text, Format:PhoneNo 컬럼을 엑셀로 다운로드하면 전화번호 포맷이 적용되지 않습니다

**질문**

- Type:Text, Format:PhoneNo로 지정한 컬럼을 엑셀로 다운로드했는데 전화번호 포맷이 제대로 붙지 않습니다. 원인이 무엇이고 어떻게 해결하나요?

**답변**

PhoneNo 포맷은 데이터에 공백이 많아 전체 자릿수가 길어지면 적용되지 않습니다. 데이터의 공백을 제거한 뒤 다운로드하면 정상적으로 포맷이 적용됩니다.

**키워드**: PhoneNo, Type:Text, 전화번호 포맷, 데이터 공백, 엑셀 다운로드

---

### [XLS-0604] 엑셀 다운로드에서 IdNo, SaupNo 다중 포맷(배열 Format)이 의도한 형태로 출력되지 않습니다

**질문**

- 사업자번호 컬럼에 Format:["IdNo","SaupNo"] 다중 포맷을 지정했는데 엑셀 다운로드에서는 123-45-67891이 아니라 123456-7891 형태로 출력됩니다. 왜 그런가요?

**답변**

엑셀을 만드는 서버모듈은 다중 포맷을 지원하지 않습니다. 그래서 `Format:["IdNo","SaupNo"]` 같은 배열 포맷은 엑셀에서 의도한 형태로 출력되지 않으므로, 컬럼의 Format을 단일 포맷(예: `Format:"IdNo"`)으로 변경해 확인해야 합니다.

**키워드**: 다중 포맷, IdNo, SaupNo, Format 배열, 서버모듈, 엑셀 다운로드 포맷

---

### [XLS-0605] 컬럼 Format을 #,,로 설정한 데이터를 엑셀로 다운로드하면 값이 보이지 않습니다

**질문**

- 컬럼 Format을 `#,,`로 설정하고 1000000을 조회하면 1로 보이는데, 이 데이터를 엑셀로 다운로드하면 값이 보이지 않습니다. 해결 방법이 있나요?

**답변**

`#,,` 포맷 데이터가 엑셀에서 보이지 않는 현상은 최신 버전에서는 정상 동작합니다. 이후 버전에서 개선되었으므로 최신 버전을 사용하는 것을 권장합니다.

**키워드**: Format #,,, 천 단위 생략, 엑셀 다운로드 값 안 보임, 최신 버전

---

### [XLS-0606] 엑셀 다운로드에서 헤더는 나오는데 특정 컬럼 데이터가 비어 있습니다 (Type 대소문자 오류)

**질문**

- ColInsert 등으로 동적으로 만든 컬럼은 화면 조회는 정상인데 엑셀로 다운로드하면 데이터가 내려오지 않습니다. 어떤 점을 확인해야 하나요?
- 엑셀 다운로드를 하면 헤더는 추출되는데 특정 컬럼의 데이터가 엑셀에 나타나지 않습니다. 컬럼 Type을 int로 설정한 경우인데 원인이 무엇인가요?

**답변**

컬럼 `Type` 값이 정확하지 않으면 헤더는 추출되어도 데이터가 내려오지 않을 수 있으므로 먼저 컬럼 Type을 확인합니다.

- `Type`을 소문자(예: `int`)로 설정하면 헤더는 추출되지만 데이터가 추출되지 않아 엑셀 다운로드가 되지 않습니다. 올바른 대소문자로 수정합니다.
- `ColInsert` 등으로 동적으로 만든 컬럼의 Type을 `NullFloat`로 지정하거나 `FLOAT`처럼 대소문자를 틀리게 쓰면 데이터가 내려오지 않을 수 있습니다. `Float`처럼 정확한 Type 값으로 교체하면 해결됩니다.

**키워드**: Type 대소문자, ColInsert, 엑셀 다운로드 데이터 누락, Float, 동적 컬럼, 헤더만 다운로드

---

### [XLS-0607] Down2Excel과 DirectDown2Excel의 엑셀 행 높이가 다른 이유와 ExcelRowHeight 설정 방법

**질문**

- Down2Excel과 DirectDown2Excel로 내려받은 엑셀 파일의 행 높이가 서로 다르게 나옵니다. 왜 차이가 나나요?
- DirectDown2Excel로 엑셀을 내려받을 때 데이터 행의 높이를 지정하려면 어떻게 하나요? Down2Excel에서 쓰던 ExcelRowHeight 인자를 쓰고 싶습니다.

**답변**

`Down2Excel`은 `RowHeights` 전문에 각 행의 높이를 계산해 설정합니다. 계산할 때 `DataRowHeight`(cfg) 값을 기본값으로 쓰고(없으면 기본 높이), `MultiLineText`로 행 높이가 바뀐 경우도 반영합니다. `DirectDown2Excel`은 데이터를 보내지 않아 `RowHeights`에 값이 없으므로 엑셀의 기본 높이로 설정됩니다.
`DirectDown2Excel`에서 데이터 행 높이를 지정하려면 `ExcelRowHeight`를 설정합니다. 이 인자는 `Down2Excel`에 있었고 `DirectDown2Excel`에는 없었으나, 이후 `DirectDown2Excel`에도 추가된 것으로 알려져 있습니다.

**키워드**: ExcelRowHeight, RowHeights, DataRowHeight, MultiLineText, 행 높이, DirectDown2Excel

---

### [XLS-0608] 엑셀 다운로드 시 셀 줄바꿈은 WordWrap으로 어떻게 제어하나요? 줄바꿈을 해제하거나 적용되지 않을 때 확인할 점은?

**질문**

- 시트 데이터를 엑셀로 다운로드할 때 엑셀 셀 안에서 줄바꿈 처리가 되도록 하고 싶습니다. 어떤 속성을 설정해야 하나요?
- Down2Excel로 내려받을 때 화면에서 wrap으로 줄바꿈된 셀을 엑셀에서는 줄바꿈 없이 한 줄로 받고 싶습니다. 어떤 인자를 쓰나요?
- 엑셀 다운로드 시 줄바꿈을 하지 않도록 JSP에서 `setWordWrap`을 false로 설정했는데 Down2Excel은 정상이고 DirectDown2Excel에서는 적용되지 않습니다.
- 엑셀 다운로드 시 WordWrap:1을 설정했는데 다운로드한 파일에서 데이터 줄바꿈이 적용되지 않고 한 줄로 보입니다. 원인이 무엇인가요?
- WordWrap(자동 줄바꿈) 속성을 주고 엑셀을 다운로드하면 엑셀에서 열을 추가할 때 매우 느려집니다. 해결 방법이 있나요?

**답변**

엑셀 다운로드의 셀 줄바꿈은 `Down2Excel`의 `WordWrap` 속성으로 정하며 기본값은 1입니다. 그래서 엑셀에서 칸을 좁히면 데이터가 다음 줄로 넘어갑니다.

- 줄바꿈 해제: `Down2Excel`, `DirectDown2Excel` 인자로 `WordWrap:0`(`wordwrap:0`)과 `ExcelRowHeight`를 함께 설정합니다. `WordWrap:0`만 설정하면 줄바꿈은 해제되지만 로우 높이는 시트를 따라가므로 `ExcelRowHeight`를 따로 지정해야 하며, 이 작업을 할 때 시트의 align을 반드시 지정해야 합니다. 서버 JSP에서는 `Down2Excel.jsp`, `DirectDown2Excel.jsp`에서 주석 처리된 `down.setWordWrap(false);`를 해제하거나 `Down2Excel.jsp`의 [ 사용자 환경 설정 #6 ]에서 `setWordWrap(false)`로 설정합니다.
- 서식(줄넘김·테두리)을 끄는 기능은 이미 있으며, 테두리보다는 줄넘김 때문에 속도 차이가 나는 경우가 더 많습니다. 배경 테두리는 `SheetDesign:2`로 설정합니다.
- `DirectDown2Excel`에서 JSP의 `setWordWrap(false)`가 적용되지 않는 증상은 IBSheet7 7.0.13.41 버전 배포로 처리되었습니다.
- 줄바꿈이 엑셀에 적용되지 않으면 먼저 호출 옵션에 `WordWrap:false`(또는 0)가 들어 있지 않은지 확인합니다. 다운로드 함수를 감싼 공통 함수 등에서 강제로 설정했을 수 있고, `DirectDown2Excel`은 대량 데이터용이라 성능 이슈 때문에 `SheetDesign:0`, `WordWrap:0`, `AutoSizeColumn:0` 같은 기능을 강제로 꺼서 호출하는 경우가 있을 수 있습니다. 이 값이 원인인 사례가 있었으며 버전 업그레이드와는 무관했습니다.
- 줄바꿈 문자열은 파일에 정상적으로 들어 있는데 엑셀의 [홈 > 자동 줄 바꿈] 기능이 꺼진 상태로 열려 한 줄로 보이는 경우도 있으며, 이때는 엑셀에서 자동 줄 바꿈을 설정합니다.
- `WordWrap` 속성을 주고 내려받은 엑셀에서 열을 추가할 때 매우 느려지는 현상은 제품 측에서 해결할 방법이 없어 `WordWrap` 기능을 뺄 수밖에 없습니다.

**적용 버전**: 7.0.13.41에서 수정

**키워드**: WordWrap, setWordWrap, ExcelRowHeight, DirectDown2Excel, SheetDesign, 줄바꿈, 자동 줄 바꿈

---

### [XLS-0609] Html 타입 데이터의 <br> 태그가 DirectDown2Excel로 내려받은 엑셀에 그대로 표시됩니다

**질문**

- 시트에서 `<br>`로 줄바꿈한 Html 타입 데이터를 DirectDown2Excel로 내려받으면 엑셀에 br 태그가 그대로 표시됩니다. 어떻게 해결하나요?

**답변**

`DirectDown2Excel`은 시트에서 헤더 정보만 보내고 데이터는 DB에서 가져옵니다. 따라서 DB에서 데이터를 받아오는 서버 로직에서 `<br>` 태그를 제거해야 합니다.

**키워드**: br 태그, Html 타입, DirectDown2Excel, 서버 로직, 태그 제거

---

### [XLS-0610] DirectDown2Excel로 내려받은 엑셀의 날짜가 시분초까지 나오거나 구분자·서식이 적용되지 않습니다

**질문**

- date 타입 컬럼의 format을 Ymd로 설정했는데 DirectDown2Excel로 내려받은 엑셀에는 시분초까지 나옵니다. 어떻게 해결하나요?
- ibmsg에서 `date_d`의 구분자를 -로 바꿔 조회는 정상인데, DirectDown2Excel로 내려받은 엑셀에서는 다시 /로 바뀌어 나옵니다. 해결 방법은 무엇인가요?
- DirectDown2Excel로 다운로드하면 날짜 형식 컬럼에 엑셀 서식이 적용되지 않습니다. 서버모듈 jar 버전과 관련이 있나요?

**답변**

- 시분초까지 나오는 경우: ibmsg에서 `SYS_d` 값을 올바르게 설정합니다. 엑셀에 `SYS_G` 값처럼 시분초까지 나오는 경우에 해당합니다.
- ibmsg의 `date_d` 구분자를 `-`로 바꿨는데 엑셀에서 `/`로 나오는 현상은 jar 버전 1.1.64에서 패치되었습니다. 1.1.63 jar를 사용하던 환경에서 상위 버전으로 교체한 뒤 정상 동작했습니다.
- 날짜 컬럼에 엑셀 서식이 적용되지 않는 현상은 서버모듈 jar 중 서식이 잘 반영되지 않던 중간 버전이 있었던 것으로 예상됩니다. 최신 jar(예: `1.1.67.jar`)에서는 정상 동작하므로 교체한 뒤 확인합니다.

**적용 버전**: jar 1.1.64에서 구분자 패치(1.1.63에서 발생), 서버모듈 1.1.67.jar 이상 권장

**키워드**: SYS_d, SYS_G, date_d, ibmsg, jar 1.1.64, 1.1.67.jar, 날짜 서식

---

### [XLS-0611] 엑셀 다운로드 시 합계·소계 행이나 #BackColor로 지정한 셀 배경색이 적용되지 않는 이유는?

**질문**

- 엑셀로 다운로드하면 합계행과 소계행의 색상이 일부 컬럼에만 적용되고 나머지에는 적용되지 않습니다. 왜 그런가요?
- Java 서버모듈로 엑셀을 다운로드할 때 데이터에 컬럼명#BackColor 형태의 컬럼을 추가해 셀 배경색을 지정했는데 색상이 적용되지 않습니다. 무엇을 확인해야 하나요?

**답변**

배경색이 엑셀에 반영되지 않는 원인은 두 가지입니다.

- 소계·합계 행: 컬럼에 `BackColor` 속성을 주지 않으면 해당 컬럼은 색상 없이 엑셀로 내려옵니다. 색을 적용할 모든 컬럼에 `BackColor`를 지정합니다.
- `컬럼명#BackColor` 컬럼으로 셀 배경색을 지정하는 경우(Java 서버모듈): 접미어 `#BackColor`의 대소문자 규칙을 정확히 맞춰야 합니다. 소문자나 오타(`bcakcolor`)로 쓰면 배경색이 적용되지 않습니다.

**키워드**: BackColor, #BackColor, 합계행 색상, 소계행 색상, 엑셀 셀 배경색, Java 서버모듈

---

### [XLS-0612] 시트에서 *로 가려 표시한 값을 엑셀 다운로드 시 원래 값으로 내려받으려면 어떻게 하나요?

**질문**

- 시트에서는 주민번호처럼 일부를 *로 가려서 보여주고 엑셀 다운로드할 때는 가려진 숫자까지 모두 내려받으려면 어떻게 하나요?

**답변**

엑셀 다운로드 직전에 셀별로 값을 변경할 수 있는 `OnExportEncryption` 이벤트를 사용합니다. 해당 컬럼의 `SaveName`을 확인해 `return mySheet.GetCellValue(Row,Col);`로 원래 값을 반환하면 원래 값으로 다운로드됩니다.

**키워드**: OnExportEncryption, GetCellValue, SaveName, 마스킹 값 엑셀 다운로드, 엑셀 다운로드 원본 값

---

### [XLS-0613] colmerge가 true인 숫자 컬럼을 엑셀로 내려받으면 선택 시 합계가 배로 보이는데 어떻게 하나요?

**질문**

- colmerge가 true인 숫자 컬럼을 엑셀로 다운로드하면 엑셀에서 셀을 선택했을 때 표시되는 합계가 배가 되어 보입니다. 어떻게 해야 하나요?

**답변**

엑셀에서 숫자 셀을 드래그해 여러 개 선택하면 평균, 개수, 합계가 표시되는데, 머지된 숫자 컬럼에서는 이 합계가 배로 보일 수 있습니다. `Merge:2`로 다운로드해 부속 셀을 채우지 않도록 합니다.

**키워드**: Merge:2, colmerge, 머지 셀 합계, 엑셀 합계 두 배, 엑셀 다운로드 머지

---

### [XLS-0614] SumValue()로 넣은 합계 값이 엑셀 다운로드 결과에 나오지 않을 때 확인할 점은?

**질문**

- SumValue()로 시트의 합계 행에 원하는 값을 직접 넣었는데, 엑셀로 다운로드해 보면 넣은 값이 나오지 않습니다. 어떤 원인이 있고 어떻게 해결하나요?

**답변**

정확한 원인은 확인되지 않았지만, 한 사례에서는 `SetConfig`에 지정했던 `NoFoucsMode`(원문 표기 그대로) 설정을 제거하자 `SumValue()`로 넣은 합계 값이 정상적으로 출력되었습니다. 같은 설정을 사용 중이라면 제거해 보는 방법을 시도할 수 있습니다.

**키워드**: SumValue, SetConfig, NoFoucsMode, 합계 값 엑셀 다운로드, 합계행 값 누락

---

### [XLS-0615] display:none으로 숨긴 시트에 SetCellValue로 넣은 값이 엑셀에 내려가지 않는 이유는?

**질문**

- display:none으로 숨긴 시트에 행을 추가하고 SetCellValue로 값을 넣은 뒤 엑셀로 내리면 추가한 행은 내려가는데 입력한 값은 내려가지 않습니다. 어떻게 해야 하나요?

**답변**

시트를 `display:none`으로 숨기면 `SetCellValue`로 입력한 값이 엑셀에 내려오지 않는 사례가 있으며, `display:none`을 제거하면 정상적으로 내려갔습니다. `display:none` 대신 `visibility:hidden`을 쓰는 방법은 시트가 계속 보이는 문제가 있었고, 정확한 원인은 확인되지 않았습니다.

**키워드**: display:none, SetCellValue, 숨긴 시트 엑셀 다운로드, visibility:hidden, 값 누락

---

### [XLS-0616] 그리드를 PDF로 변환하면 체크박스가 0으로 표기되는데 이미지로 출력할 수 있나요?

**질문**

- 그리드를 PDF로 변환하면 체크박스가 제대로 표시되지 않고 0으로 표기됩니다. 체크박스를 이미지로 PDF에 출력할 수 있는 방법이 있나요?

**답변**

PDF 변환 시 체크박스 이미지가 정상적으로 출력되지 않을 수 있고, `trueValue`, `FalseValue` 값으로 데이터가 출력되게 할 수는 있습니다. 체크박스 이미지가 필요한 출력물이라면 어려운 것으로 알려져 있습니다.

**키워드**: PDF 변환, 체크박스 PDF, trueValue, FalseValue, 체크박스 이미지

---

### [XLS-0617] 시트 화면에는 원래 값을 보이고 엑셀 다운로드 파일에서만 주민번호 같은 값을 마스킹하려면?

**질문**

- 시트 화면에는 원래 값을 그대로 보여 주고 엑셀 다운로드 파일에서만 주민번호 같은 값을 마스킹해서 내려받고 싶습니다. 어떤 이벤트나 방법으로 처리할 수 있나요?

**답변**

`OnExportEncryption(row, col, saveName, value)` 이벤트를 사용합니다. 이벤트 안에서 `saveName`별로 분기하여 마스킹한 값을 return하는 방식으로 처리합니다. 예를 들어 주민번호는 `value.substring(0,8)`만 남기고 뒤를 `******`로 바꾸는 함수를 컬럼별로 호출합니다.

**키워드**: OnExportEncryption, saveName, 엑셀 다운로드 마스킹, 주민번호 마스킹, substring

---

### [XLS-0618] InitCellProperty로 셀별로 바꾼 포맷·정렬·타입이 엑셀 다운로드나 엑셀 로드에 반영되지 않는 이유는?

**질문**

- InitCellProperty로 셀마다 다른 포맷을 설정했을 때 그 셀별 포맷을 엑셀 다운로드에도 그대로 적용할 수 있나요? 셀마다 포맷을 다르게 해서 다운로드하고 싶습니다.
- 초기화 시 컬럼 정렬을 Left로 두고 InitCellProperty로 Center로 바꾼 뒤 엑셀 다운로드하면 Left로 내려갑니다. 해결 방법이 있나요?
- InitCellProperty로 셀의 타입을 교체한 뒤 엑셀 로드를 실행하면 변경한 셀 타입이 반영되지 않습니다. 해결 방법이나 우회 방법이 있나요?

**답변**

`InitCellProperty`로 셀별 포맷이나 정렬, 타입을 바꿀 수는 있지만 그 변경은 엑셀 처리에 반영되지 않습니다.

- 엑셀 다운로드: 셀별로 다른 포맷은 엑셀 다운로드에 적용할 수 없습니다. `InitCellProperty`로 바꾼 정렬도 반영되지 않고 초기 설정(예: Left)대로 내려가며, 이를 지원하기는 어렵습니다.
- 엑셀 로드(업로드): `InitCellProperty`로 바꾼 설정(예: 셀 타입 교체)은 엑셀 로드에 반영되지 않으며, 시트를 다시 그리는 작업이 필요할 것으로 보입니다.

**키워드**: InitCellProperty, 셀별 포맷, 엑셀 정렬 미반영, 엑셀 로드, 셀 타입 변경

---

### [XLS-0619] xls로 엑셀을 다운로드하면 컬럼이 많을 때 특정 컬럼부터 서식·테두리가 적용되지 않는 이유와 해결 방법은?

**질문**

- 시트 화면에는 배경색·테두리·숫자 포맷이 정상인데 엑셀로 내려받으면 특정 행·열 이후부터 서식이 적용되지 않거나 깨집니다. 원인과 해결 방법은 무엇인가요?
- 엑셀 다운로드 시 특정 컬럼(예: 46번째) 이후부터 셀 서식·스타일이 정상 적용되지 않습니다. 컬럼 수가 많을 때 나타나는 원인과 해결 방법은 무엇인가요?

**답변**

xls 확장자로 다운로드하면 지정할 수 있는 스타일(선, 폰트, 색상 등)의 개수에 한계가 있습니다. 서버모듈에서 xls로 다운로드할 때 컬럼 개수가 42개를 넘어가면 셀 스타일(폰트, 테두리 등)이 반영되지 않으며, 컬럼이 많이 조회되면 특정 컬럼 이후 Border가 표시되지 않거나 디자인이 깨질 수 있습니다. xlsx로 다운로드하면 설정할 수 있는 스타일 개수가 더 많아 해결됩니다. 확장자를 xlsx로 지정해(`FileName:'test.xlsx'`) 다운로드합니다.

**키워드**: FileName, xlsx, xls 스타일 한계, 컬럼 42개, 테두리 누락, 셀 서식 깨짐

---

### [XLS-0620] readOnly 셀을 회색으로 표시하는데 엑셀로 다운로드할 때도 그 색이 반영되게 하려면?

**질문**

- readOnly 셀을 회색으로 표시하고 있는데, 엑셀로 다운로드할 때도 그 색이 반영되게 하려면 어떻게 설정하나요?

**답변**

읽기 전용(편집 불가) 색상은 자동으로 반영되지 않으므로 `SetColBackColor()`로 해당 컬럼의 색상값을 지정한 뒤 `SheetDesign:1`로 엑셀 다운로드합니다. 이 방식은 조회 데이터와 색상 정보를 함께 추출하므로 데이터가 많으면 속도 이슈가 생길 수 있습니다.

**키워드**: SetColBackColor, SheetDesign:1, readOnly 색상, 엑셀 셀 색상, 편집 불가 색상

---

### [XLS-0621] 엑셀 다운로드할 때 긴 데이터가 있는 컬럼 너비를 데이터 길이에 맞춰 자동 조정할 수 있나요?

**질문**

- 엑셀 다운로드할 때 긴 데이터가 들어가는 컬럼의 너비를 그 데이터 길이에 맞춰 자동으로 조정할 수 있나요?

**답변**

해당 방식은 지원되지 않습니다. 가장 넓게 차지할 컬럼에는 `Width` 값을 주지 않도록 하지만, 엑셀 다운로드는 컬럼 너비를 HeaderText 크기에 맞춰 내려받으므로 가장 긴 글자에 맞춰 내려오지는 않을 것으로 보입니다.

**키워드**: Width, HeaderText, 엑셀 컬럼 너비, 컬럼 너비 자동 조정, 데이터 길이

---

### [XLS-0622] 화면에 0으로 표시되는 데이터를 엑셀 다운로드 시 빈값으로 내려받을 수 있나요?

**질문**

- 화면에 0으로 표시되는 데이터를 엑셀로 다운로드할 때 빈값으로 내려받을 수 있나요?

**답변**

그런 기능은 없습니다. 화면에 0으로 표시되는 데이터를 엑셀 다운로드 시 빈값으로 내려받는 기능은 제공되지 않습니다.

**키워드**: 엑셀 다운로드 0 값, 빈값 다운로드, 0 표시, 엑셀 다운로드 제약

---

### [XLS-0623] 트리 시트를 엑셀로 다운로드할 때 2레벨 빈 셀에 1레벨 값을 채워 내려받을 수 있나요?

**질문**

- 트리 시트에서 2레벨 셀에 값이 없을 때 엑셀로 다운로드하면서 1레벨 셀의 값을 2레벨에 넣어 내려받을 수 있나요?

**답변**

그런 기능은 없습니다. 꼭 필요하다면 동일한 시트를 하나 더 숨겨 두고, 숨겨진 시트에 데이터를 모두 채워 조회한 뒤 그 시트를 다운로드하는 방법을 쓸 수 있습니다.

**키워드**: 트리 시트, 엑셀 다운로드, 숨겨진 시트, 레벨 값 채우기, 상위 레벨 값

---

### [XLS-0624] html 태그를 제거하고 공백으로 열을 맞춘 여러 줄 데이터가 엑셀 가운데 정렬에서 어긋나는 이유는?

**질문**

- 셀의 html 태그를 제거하고 공백으로 열을 맞춘 여러 줄 데이터를 엑셀로 다운로드하면 가운데 정렬이 어긋납니다. 해결할 수 있나요?

**답변**

엑셀 자체가 이런 정렬을 잘 지원하지 못해 구현이 어렵습니다. 한 줄짜리 데이터는 공백이 포함되어도 정렬이 맞지만, 여러 줄 데이터에 공백이 있으면 가운데 정렬에서 정렬이 맞지 않습니다. 가운데 정렬 대신 왼쪽 정렬로 하면 공백도 정상적으로 정렬됩니다.

**키워드**: 엑셀 가운데 정렬, 공백 정렬, 여러 줄 데이터, 왼쪽 정렬, html 태그 제거

---

### [XLS-0625] 같은 기준 값의 여러 행을 엑셀에서 하나로 병합된 것처럼 보이게 하고 테두리를 기준 단위로만 표시하려면?

**질문**

- 엑셀 다운로드 시 같은 기준 값의 여러 행이 하나로 병합된 것처럼 보이고, 테두리가 기준 단위로만 나오게 할 수 있나요?

**답변**

해당 모양은 데이터를 머지한 뒤 텍스트를 최상단에 위치시키기 위해 `VAlign`을 `Top`으로 설정하는 방법밖에 없습니다. 중간에 여러 줄인 셀은 `MultiLineText:1`로 해서 한 셀에 값을 넣어야 하며, 값을 별도 row로 불러오면 여러 줄일 때 border 라인이 생기는 것은 어쩔 수 없습니다. IBSheet는 row 단위로 데이터를 조회하며 개별 셀에 대한 css를 별도로 설정하는 것은 지원하지 않습니다.

**키워드**: VAlign, MultiLineText, 엑셀 머지, 테두리 그룹, 그룹 단위 border

---

### [XLS-0626] 병합된 셀을 엑셀로 내려받으면 건수·합계가 병합 영역 수만큼 중복 집계되는데 Merge:2는 어떻게 쓰나요?

**질문**

- 병합(Merge)된 셀을 엑셀로 내려받으면 병합 영역 값이 중복 집계되어 합계가 두 배로 나옵니다. 병합 데이터를 하나로 인식시키는 옵션이 있나요?
- 엑셀로 다운로드하면 병합된 영역의 셀 수만큼 데이터 건수가 카운트됩니다. 일반 엑셀처럼 병합 영역을 1건으로 카운트되게 할 수 있나요?

**답변**

`Down2Excel`의 `Merge` 속성을 `Merge:2`로 지정해 다운로드하면 셀 병합 시 부속 셀의 값은 설정하지 않는 형태로 저장됩니다. 병합 시작 셀에만 데이터가 적용되고 나머지는 빈 셀이 되어 병합 데이터가 하나로 인식됩니다. 단, 엑셀 모듈(dll)의 버전이 2.x.x.dll로 시작해야 하며, 모듈 버전이 이에 해당하지 않으면 해당 기능을 사용할 수 없습니다.

**적용 버전**: 엑셀 모듈(dll) 2.x.x.dll

**키워드**: Merge:2, Down2Excel, 병합 셀 중복 집계, 부속 셀, 엑셀 모듈 dll

---

### [XLS-0627] 엑셀 다운로드 시 컬럼 전체에 Text 속성을 적용해서 내려받을 수 있나요?

**질문**

- 시트 데이터를 엑셀로 다운로드할 때 컬럼 전체에 Text 속성을 적용해서 내려받을 수 있는지 궁금합니다.

**답변**

엑셀 다운로드 시 컬럼 전체에 Text 속성을 적용하는 것은 지원되지 않습니다.

**키워드**: Text 속성, 엑셀 다운로드, 셀 서식, 컬럼 전체

---

### [XLS-0628] 엑셀 다운로드 시 시트의 셀 정렬(머지 셀 포함)을 그대로 반영할 수 있나요?

**질문**

- 엑셀로 다운로드할 때 시트에 표시된 셀 정렬 상태(왼쪽·가운데·오른쪽) 그대로 내려받을 수 있나요?
- 엑셀로 다운로드할 때 userMerge로 머지한 셀이 중앙 정렬로 나오는데, 셀 단위로 정렬을 강제로 지정할 수 있나요?

**답변**

현재는 시트에 표시된 셀 정렬 상태를 그대로 엑셀에 반영하는 기능이 지원되지 않으며, 엑셀로는 문자열은 왼쪽, 숫자형은 오른쪽, 헤더는 가운데 정렬로 내려갑니다. `userMerge`로 머지한 셀의 정렬도 셀 단위로 강제로 지정할 수 없습니다. 엑셀 다운로드는 시트에 적용된 서식을 그대로 내려받기 때문입니다. 추후 개선 예정이나 일정은 정해지지 않았습니다.

**키워드**: 셀 정렬, 엑셀 다운로드, userMerge, 머지 셀, 정렬 반영

---

### [XLS-0629] ZeroToReplaceChar로 숨긴 0이 엑셀 다운로드에서는 0으로 나옵니다. 빈 값으로 낼 수 있나요?

**질문**

- ZeroToReplaceChar로 시트 화면에서는 0이 안 보이게 했는데 엑셀로 다운로드하면 0이 나옵니다. 엑셀에서도 0을 빈 값으로 출력할 수 있나요?

**답변**

불가능합니다. 엑셀 다운로드는 전문이 0으로 추출되어 전달되기 때문입니다. `ZeroToReplaceChar`로는 시트 화면 표현만 가능하고, 엑셀로 내려받으면 셀서식이 숫자로 들어갑니다.

**키워드**: ZeroToReplaceChar, 0 값, 엑셀 다운로드, 빈 값, 셀서식

---

### [XLS-0630] 엑셀 머지 해제 시 문자열은 모든 셀에, 숫자는 상단 셀에만 값이 들어가게 할 수 있나요?

**질문**

- 엑셀 다운로드에서 머지를 허용한 뒤 엑셀에서 병합을 풀 때, 문자열 포맷은 각 셀에 모두 값이 들어가고 숫자형 포맷은 제일 상단 셀에만 들어가게 할 수 있나요?

**답변**

불가능합니다. 병합을 풀었을 때 문자열은 모든 셀에, 숫자형은 최상단 셀에만 값이 들어가도록 포맷별로 구분하는 기능은 구현할 수 없습니다.

**키워드**: 머지, 병합 해제, 엑셀 다운로드, 문자열, 숫자형

---

### [XLS-0631] 엑셀 다운로드 파일 셀 왼쪽 상단에 세모 경고(숫자가 텍스트로 서식 지정)가 나옵니다

**질문**

- 엑셀로 다운로드한 파일의 셀 왼쪽 상단에 세모가 표시되며 '이 셀의 숫자는 텍스트로 서식이 지정되었거나 아포스트로피가 앞에 옵니다.' 경고가 나옵니다. 패치로 없앨 수 있나요?

**답변**

일반 셀에 숫자가 들어 있을 때 엑셀 자체가 권장 서식에 대한 경고를 띄우는 것입니다. POI 내부에서 수정이 불가능하여 패치로 없애기는 어렵습니다.

**키워드**: 세모 경고, 숫자가 텍스트로 서식, 아포스트로피, POI, 엑셀 다운로드

---

### [XLS-0632] 셀 색상을 칠한 뒤 엑셀 다운로드할 때 색상이 반영되지 않습니다

**질문**

- 셀에 색상을 칠한 뒤 엑셀 다운로드할 때 셀 색상 정보를 반영하고 싶습니다. 어떻게 해야 하나요?

**답변**

사용 중인 제품 버전이 낮으면 셀 색상 정보를 엑셀 다운로드에 반영할 수 없습니다. 셀 색상 반영을 지원하는 버전으로 제품을 업그레이드해야 합니다.

**키워드**: 셀 색상, 엑셀 다운로드, 버전 업그레이드, 배경색

---

### [XLS-0633] 엑셀 다운로드 시 글자 색상·굵기·폰트를 셀별로 반영할 수 있나요?

**질문**

- 셀의 글자 색상(Font Color)과 굵기(Bold)가 적용된 상태 그대로 엑셀로 내보내고(Excel Export) 싶습니다. 방법이 있나요?
- 시트를 엑셀로 다운로드할 때 다운로드되는 엑셀의 폰트 색상을 지정할 수 있나요?
- 시트에서 글자 폰트와 굵기를 설정한 뒤 엑셀로 다운로드하면 그대로 반영되나요? 셀별·행별로 지정한 경우는 어떤가요?

**답변**

- 셀의 글자 색상과 글자 굵기를 엑셀 저장에 반영하는 기능은 지원되지 않습니다.
- 그리드 전체에 적용된 폰트나 크기는 반영할 수 있지만, 셀 1개 또는 각 셀별로 지정한 폰트·굵기는 받아올 수 없습니다. 셀 단위가 아닌 행 단위로 지정하는 경우에도 폰트는 불가능합니다.
- 폰트 색상 지정은 과거(2013년 당시) 버전에서는 지원되지 않았다는 안내가 있습니다.

**키워드**: Font Color, Bold, 폰트, 글자 색상, 엑셀 다운로드, 셀별 서식

---

### [XLS-0634] 엑셀 다운로드 시 테두리 일부 제거, 색상, 2중 테두리, 템플릿 테두리를 지정할 수 있나요?

**질문**

- 엑셀 다운로드할 때 컬럼 단위로 테두리를 그리지 않거나 테두리 색상, 2중 테두리를 지정할 수 있나요?
- 템플릿 파일을 사용하는 엑셀 다운로드에서 결과 엑셀의 셀에 테두리가 칠해지도록 할 수 있나요?

**답변**

전체 테두리를 그리지 않게 할 수는 있으나, 일부 영역(컬럼 단위 등)만 테두리를 그리지 않도록 설정하는 기능은 없습니다. 테두리 색상과 2중 테두리도 지원하지 않습니다. 또한 템플릿 파일로 엑셀 다운로드할 때 테두리를 칠하는 기능도 지원되지 않습니다.

**키워드**: 테두리, 2중 테두리, 테두리 색상, 템플릿 파일, 엑셀 다운로드

---

### [XLS-0635] 엑셀 다운로드 시 글꼴, 글자 크기, 자간을 변경할 수 있나요?

**질문**

- 엑셀로 다운로드할 때 글꼴, 글자 크기, 자간을 변경할 수 있는 방법이 있나요?

**답변**

엑셀 다운로드 시 자간(글자 간격) 변경은 지원되지 않습니다. 글꼴과 크기 변경은 엑셀 리포트 샘플을 참고해야 합니다.

**키워드**: 자간, 글꼴, 글자 크기, 엑셀 리포트, 엑셀 다운로드

---

## 병합(Merge)·합계행·푸터

### [XLS-0636] 엑셀 다운로드를 하면 데이터 행은 없고 헤더만 내려오는 원인은 무엇인가요?

**질문**

- 엑셀 다운로드를 실행하면 데이터 행은 내려오지 않고 헤더만 내려옵니다. 원인이 무엇이고 어떻게 해결하나요?

**답변**

7.0.10.0-20150226-16 버전의 그룹 기능 패치에 문제가 있어 엑셀 다운로드 시 헤더만 내려오는 현상이 발생했습니다. 이후 패치된 최신 버전에서는 엑셀 다운로드가 다시 정상 동작하므로, 해당 버전을 사용 중이면 최신 버전으로 교체합니다.

**적용 버전**: 7.0.10.0-20150226-16에서 발생

**키워드**: 엑셀 다운로드 헤더만, 데이터 행 미출력, 그룹 기능 패치, 7.0.10.0-20150226-16

---

### [XLS-0637] 헤더가 3줄인 시트에서 엑셀 다운로드 시 오류가 나면 어느 버전에서 정상 동작하나요?

**질문**

- 헤더가 3줄인 시트에서 엑셀 다운로드를 하면 오류가 납니다. 정상 동작하는 버전이 있나요?

**답변**

헤더가 3줄이면 엑셀 다운로드 시 오류가 나는 현상은 7.0.0.0 [20130103-19] 버전에서는 발생하지 않고 정상 동작합니다.

**적용 버전**: 7.0.0.0 [20130103-19]에서 정상

**키워드**: 헤더 3줄, 엑셀 다운로드 오류, 7.0.0.0, 정상 동작 버전

---

### [XLS-0638] 엑셀 다운로드에서 헤더 개별 셀의 배경색·폰트색을 적용하려면 어느 버전부터 사용할 수 있나요?

**질문**

- 엑셀 다운로드 시 헤더의 개별 셀에 폰트 색상을 지정해 파일에 적용하고 싶습니다. 이 기능은 IBSheet7의 어느 버전부터 사용할 수 있나요?
- 헤더 첫 번째 컬럼에 SetCellColor로 배경색을 적용하고 시트 디자인 옵션으로 엑셀 다운로드하면, 그 배경색이 모든 헤더에 적용됩니다. 해결되었나요?

**답변**

헤더 개별 셀의 색상은 엑셀 다운로드에서 다음 버전부터 정상 적용됩니다.

- 헤더 개별 셀의 폰트 색상 등 색상 관련 기능은 7.0.13.208-20221007-1248-M 버전부터 엑셀 다운로드에서 사용할 수 있습니다.
- 헤더 첫 번째 컬럼에 `SetCellColor`로 배경색을 적용하고 시트 디자인 옵션으로 엑셀 다운로드할 때 그 배경색이 모든 헤더에 적용되는 증상은 IBSheet7 7.0.13.207 버전과 서버모듈 2.1.1 배포로 처리되었습니다.

**적용 버전**: 7.0.13.208-20221007-1248-M 이상(헤더 폰트색), 7.0.13.207 및 서버모듈 2.1.1(헤더 배경색 전체 적용 수정)

**키워드**: 헤더 셀 색상 엑셀 다운로드, SetCellColor, 헤더 폰트 색상, 7.0.13.208-20221007-1248-M, 서버모듈 2.1.1

---

### [XLS-0639] 엑셀 다운로드에서 헤더가 2행인 시트의 헤더가 1행만 나오거나 멀티라인 레코드의 헤더 텍스트가 반복되는 현상은?

**질문**

- DotNet 서버모듈(dll)로 엑셀 다운로드를 할 때 시트의 헤더행이 2개인 경우 헤더가 1개 행만 출력됩니다. 어느 버전에서 해결되나요?
- 멀티라인 레코드를 사용할 때 엑셀 다운로드에서 병합된 헤더는 정상인데 병합되지 않은 헤더에는 위 행의 텍스트가 아래 행에도 표시됩니다.

**답변**

엑셀 다운로드에서 헤더 행이 잘못 출력되는 증상은 다음 버전에서 처리되었습니다.

- DotNet 서버모듈 dll로 다운로드할 때 헤더행이 2개인 시트에서 헤더가 1개만 보이는 증상: DotNet 서버모듈 dll 1.1.0.13 버전에서 처리되었습니다. 기존에 사용하던 1.1.0.11 dll을 1.1.0.13 dll로 교체합니다.
- 멀티라인 레코드 사용 시 병합되지 않은 헤더 텍스트가 아래 행에도 반복 표시되는 현상: IBSheet7 7.0.13.144 버전에서 패치되었습니다.

**적용 버전**: DotNet dll 1.1.0.13에서 수정, 7.0.13.144에서 수정

**키워드**: 헤더 2행 1행만 출력, DotNet dll 1.1.0.13, 멀티라인 레코드, 헤더 텍스트 중복, 7.0.13.144

---

### [XLS-0640] 엑셀 다운로드 시 헤더가 가로로 병합되지 않거나 SetMergeCell 강제 병합이 반영되지 않을 때 수정 버전은?

**질문**

- 엑셀로 다운로드하면 시트의 헤더가 가로로 병합되지 않고 나뉘어 표시됩니다. 어떻게 해결하나요?
- SetMergeCell로 헤더를 강제 병합한 상태에서 엑셀 다운로드를 하면 병합이 반영되지 않습니다. 해결 방법이 있나요?

**답변**

엑셀 다운로드에서 헤더 병합이 반영되지 않는 증상은 다음과 같이 처리되었습니다.

- 헤더가 가로로 병합되지 않고 나뉘어 표시되는 현상은 제품 오류였으며 IBSheet7 7.0.13.29 버전에서 패치되었습니다.
- `SetMergeCell`로 헤더를 강제 병합한 상태에서 병합이 반영되지 않는 현상은 원인이 확인되지 않았지만 수정 이력이 있어, 서버모듈(엑셀 처리 모듈) 1.1.135.jar와 `ibsheet.js` 7.0.13.259-20240823-1503 배포로 처리되었습니다.

**적용 버전**: 7.0.13.29에서 수정; 7.0.13.259-20240823-1503 및 서버모듈 1.1.135.jar

**키워드**: 엑셀 다운로드 헤더 병합, SetMergeCell, 7.0.13.29, 7.0.13.259-20240823-1503, 서버모듈 1.1.135.jar

---

### [XLS-0641] 피벗 후 병합된 행을 엑셀로 다운로드하면 병합이 풀리는 현상은 어떻게 해결하나요?

**질문**

- 피벗 후 병합된 행 2개를 엑셀로 다운로드하면 병합이 풀립니다. 해결 방법이 있나요?

**답변**

7.0.13.1-20150423-15 버전의 문제로 보이며, 이후 버전에서 개선되었으므로 최신 버전 사용을 권장합니다. 해당 버전을 쓰고 있다면 최신 버전으로 교체해 확인합니다.

**적용 버전**: 7.0.13.1-20150423-15에서 발생

**키워드**: 피벗 병합 풀림, 엑셀 다운로드 병합, 7.0.13.1-20150423-15, 최신 버전

---

### [XLS-0642] 필터를 적용하거나 필터행이 있는 상태에서 엑셀 다운로드하면 헤더 병합이 풀리거나 파일이 손상되는 이유는?

**질문**

- 헤더가 2줄인 시트에서 필터 적용 전 엑셀 다운로드는 병합되는데, 필터 적용 후 다운로드하면 헤더 병합이 되지 않습니다.
- 서버모듈 1점대와 poi3.16을 사용할 때 필터행이 있는 상태로 엑셀을 다운로드하면 머지가 풀리거나 파일이 손상됩니다. 어떻게 해결하나요?

**답변**

필터가 적용되었거나 필터행이 있는 상태에서 엑셀을 다운로드할 때 병합이 풀리는 증상은 버전 업으로 처리되었습니다.

- 헤더가 2줄인 시트에서 필터 적용 후 다운로드 시 헤더 병합이 되지 않는 증상: IBSheet7 7.0.13.270 버전 배포로 처리되었습니다.
- 서버모듈 1점대에서 `poi3.16`을 사용할 때 필터행이 있으면 머지가 풀리거나 파일이 손상되는 현상: 7.0.13.268에서 수정되었습니다. 버전 업이 어려운 경우 다운로드 전에 `HideFilterRow()`로 필터행을 숨기고 다운로드 후 `ShowFilterRow()`로 다시 표시하는 방식으로 우회합니다.

**적용 버전**: 7.0.13.270에서 처리(필터 적용 후 헤더 병합), 7.0.13.268에서 수정(서버모듈 1점대 poi3.16 필터행)

**키워드**: 필터행 엑셀 다운로드, 헤더 병합 풀림, HideFilterRow, ShowFilterRow, 7.0.13.268, 7.0.13.270, poi3.16

---

### [XLS-0643] 시트의 셀 병합(헤더·데이터)이 엑셀 다운로드에 반영되지 않을 때 Merge:1, OnlyHeaderMerge

**질문**

- 엑셀 다운로드 시 화면에 보이는 것처럼 머지되어 내려오지 않습니다. Down2Excel에서 어떤 속성을 설정해야 하나요?
- 그리드에서 머지된 헤더와 데이터를 엑셀에서도 동일하게 머지하려면 어떻게 하나요? 머지가 안 된 채 내려옵니다.
- 엑셀 다운로드 시 데이터 영역은 머지하지 않고 헤더 영역만 머지하려면 어떤 속성을 사용하나요?
- 엑셀 다운로드 시 merge:1 인자를 넣었는데 적용되지 않습니다. 원인은 무엇이고 어떻게 확인하나요?

**답변**

`Down2Excel`에 `Merge:1`을 지정하면 화면의 머지가 엑셀에 반영됩니다.

- 공통 다운로드 함수 등에서 엑셀 다운로드 옵션에 `Merge:1`이 주석 처리되어 있다면 활성화합니다. `UserMerge:1`을 쓰고 있었다면 `Merge:1`로 바꿔야 머지가 반영됩니다.
- `Merge:1`은 헤더와 데이터 영역 전체에 머지를 적용합니다. 단, `DownRows`를 설정한 경우에는 `Merge:1`을 설정해도 머지가 되지 않습니다. 헤더만 머지하려면 `OnlyHeaderMerge:1`을 설정하며, 헤더 머지를 적용하려면 `Merge:1`과 `OnlyHeaderMerge:1`을 함께 설정해야 합니다(`OnlyHeaderMerge`만 설정하면 머지가 적용되지 않습니다).
- `Down2Excel`을 직접 호출하지 않고 재정의한 별도 메서드를 거치면 `merge:1` 인자가 적용되지 않을 수 있습니다. 콘솔에서 `Down2Excel({merge:1})`을 직접 호출해 정상 동작하면 재정의한 메서드를 점검합니다.
- 머지가 되지 않거나 머지된 컬럼이 깨지면 `Merge`, `UserMerge`를 1 또는 True로 설정했는지, 히든 컬럼이 있는지도 점검합니다. 화면과 동일한 형태로 다운로드해야 머지가 적용되며, 자세한 내용은 도움말 Appendix의 '엑셀 다운시 머지 적용 처리' 항목을 참고합니다.

**키워드**: Merge:1, OnlyHeaderMerge, Down2Excel, UserMerge, 엑셀 머지, 헤더 머지, DownRows

---

### [XLS-0644] Down2Excel Merge 속성 값 1, 2, 3의 차이와 합계가 중복 계산될 때

**질문**

- Down2Excel에서 Merge 옵션을 1로 줄 때와 2로 줄 때 다운로드한 엑셀 파일은 어떤 차이가 있나요?
- 엑셀 다운로드의 Merge 속성에서 값 2번과 3번은 무엇이 다른가요?
- 엑셀 다운로드 후 머지된 셀에 값이 모두 들어 있어 엑셀에서 합계가 중복 계산됩니다.

**답변**

`Merge` 속성 값에 따라 병합된 영역의 셀에 값을 어떻게 남길지가 달라집니다. 다운로드한 엑셀에서 머지를 풀었을 때 셀의 값이 하나만 남게 할지, 풀린 셀 전부에 값이 남게 할지를 정하는 설정이며, 2번과 3번의 차이도 병합된 영역의 셀에 모두 값을 설정할지에 대한 여부입니다. `Down2Excel({merge:2})`로 내려받으면 셀 병합 시 부속 셀의 값은 설정하지 않아 합계가 중복되지 않고 계산됩니다. 자세한 내용은 Down2Excel 매뉴얼의 `Merge` 속성을 참고합니다.

**키워드**: Merge:2, Merge 속성, Down2Excel, 합계 중복, 머지 셀 값

---

### [XLS-0645] Merge:1을 줘도 엑셀 머지가 적용되지 않거나 깨질 때(DownCols, DownRows, 히든 컬럼)

**질문**

- SetMergeCell이나 msPrevColumnMerge로 화면에서 병합한 셀을 Down2Excel의 Merge:1로 내려받았는데 엑셀에는 병합이 적용되지 않습니다.
- Down2Excel에서 Merge:1을 설정하고 내려받았는데 엑셀에서 머지가 정상적으로 되지 않습니다.
- 엑셀 다운로드 시 숨겨진 행(HiddenRow)이 있으면 Merge를 지정해도 머지가 반영되지 않습니다.
- 엑셀 다운로드 시 '엑셀 다운로드 시 오류가 발생하였습니다.'라는 alert이 뜨는데 콘솔에서 Down2Excel()을 직접 실행하면 정상입니다.

**답변**

`Merge:1`은 화면에 보이는 그대로 다운로드해야 머지가 정상 반영됩니다.

- 다운로드 대상 컬럼이 화면에 보이는 컬럼과 동일해야 합니다. 중간에 히든 컬럼이 있으면 `DownCols`로 히든 컬럼을 제외하고 내려받습니다. `OnSearchEnd`에서 `SetMergeCell`로 병합한 경우도 마찬가지입니다. `DownCols`에 `GetColHidden`으로 가려낸 화면에 보이는 컬럼만 `|`로 이어 지정하고 `SheetDesign:1, Merge:1`로 호출합니다. 예: `Down2Excel({SheetDesign:1, Merge:1, DownCols:getVisibleCols(mySheet)})` (`getVisibleCols`는 히든이 아닌 컬럼 index를 `|`로 이어 반환하는 사용자 함수).
- `DownRows`(`Visible` 포함)나 `DownRow`를 사용하면 `Merge:1`을 설정해도 머지가 자동으로 취소되거나, `DownRow` 설정 시 헤더만 머지되어 내려옵니다. `DownCols`와 `DownRows`를 함께 쓰면 머지가 안 될 수도, 일부만 될 수도, 화면과 같게 될 수도 있으므로 `DownCols`에 화면 정보를 그대로 지정합니다.
- 숨겨진 행을 제외하고 `Merge`를 적용하려면 `DownRows`가 필요하지만 `DownRows`를 적용하는 순간 `Merge`가 반영되지 않습니다. 숨겨 둔 별도의 IBSheet에서 숨겨진 행을 삭제한 뒤 머지를 계산해 다운로드하는 형태로 소스를 변경해야 할 수 있습니다.
- `ShowSubSum`과 병합을 함께 쓸 때 `setCellMerge` 병합 대상 컬럼 사이에 숨김 컬럼이 있는 경우일 수 있습니다.
- '엑셀 다운로드 시 오류가 발생하였습니다.' alert이 뜨고 콘솔에서 `Down2Excel()`을 직접 실행하면 정상 다운로드되면, 호출 시 넘기는 인자 설정(예: `DownCols`와 `Merge:1`을 동시에 사용하는 부분)이 잘못된 경우일 수 있습니다.
- 자세한 규칙은 도움말 Appendix의 '엑셀 다운시 머지 적용 처리' 항목을 참고합니다.

**키워드**: Merge:1, DownCols, DownRows, GetColHidden, SetMergeCell, 히든 컬럼, SheetDesign:1

---

### [XLS-0646] SetMergeCell·SetCellValue로 만든 강제 머지(특히 헤더)가 엑셀 다운로드에서 풀리거나 깨질 때

**질문**

- SetMergeCell로 헤더를 강제 머지했는데 엑셀로 다운로드하면 머지가 풀립니다. 무엇을 확인해야 하나요?
- SetMergeCell로 머지한 영역을 서버모듈을 이용한 엑셀 다운로드로 받을 때 머지된 상태로 내려받을 수 있나요?
- 엑셀 다운로드 시 Merge:1과 DownCols를 설정했는데 SetMergeCell로 강제 머지한 헤더만 머지가 깨집니다.
- 가로로 머지된 헤더의 첫 번째 셀만 SetCellValue로 바꾸면 화면에서는 정상인데 구버전에서 엑셀 다운로드를 하면 헤더 머지가 깨져 보입니다.

**답변**

`SetMergeCell`로 강제 머지한 영역은 다음 조건에서 엑셀에 반영됩니다.

- `SetMergeCell()`로 머지한 내용은 엑셀 다운로드에 그대로 반영되지 않고 `MergeSheet`에 설정된 속성대로만 반영된다는 안내가 있습니다. 또한 `Down2Excel()`의 `Merge` 속성이 1(또는 2)이어야 하며 기본값 0은 머지를 반영하지 않습니다.
- 화면에 보이는 컬럼과 다운로드하는 컬럼이 같으면(`DownCols` 설정) 머지된 상태로 내려오며, `Down2Excel`의 `merge` 속성이 1이면 정상 다운로드됩니다.
- 강제 머지 후 다운로드하면 데이터 행은 머지 계산을 하지만 헤더 행은 머지 계산을 하지 않습니다. 꼭 적용해야 한다면 `OnBeforeDownload` 이벤트에서 전문을 수정해 Merge 부분에 계산된 머지 정보를 넘깁니다.
- 헤더 행 강제 머지의 엑셀 다운로드 반영은 IBSheet7 7.0.13.224 버전 배포로 처리되었습니다. 헤더를 가로로 머지하고 `SetCellValue`로 값을 바꾼 뒤 `Merge:1`로 내려도 반영되지 않던 현상은 ibsheet.js 7.0.13.259-20240823-1503과 ibmsg, 서버모듈 1.1.135 jar, 최신 jsp를 함께 적용하도록 안내됩니다.
- 머지된 첫 번째 셀만 `SetCellValue`로 바꾸면 화면에서는 전체가 바뀐 것처럼 보이지만 머지에 포함된 나머지 셀의 실제 데이터는 교체되지 않습니다. 최신 버전은 화면에 보이는 그대로 Merge를 계산해 보내지만 이전 버전은 머지가 깨져 보이므로, `GetMergedStartCell`/`GetMergedEndCell`로 머지 범위를 구해 범위 안의 모든 셀에 같은 값을 설정합니다.

**적용 버전**: 7.0.13.224, 7.0.13.259-20240823-1503, 서버모듈 1.1.135

**키워드**: SetMergeCell, MergeSheet, GetMergedStartCell, OnBeforeDownload, 강제 머지, SetCellValue, Merge:1

---

### [XLS-0647] ShowFooterRow 푸터 행이 엑셀 다운로드에서 안 되거나 머지가 어긋날 때(ExcludeFooterRow)

**질문**

- ShowFooterRow()로 푸터 행을 추가해 사용하는데, 엑셀 다운로드를 하면 푸터 행에 설정한 머지가 적용되지 않습니다.
- ShowFooterRow로 푸터행을 표시한 시트를 Down2Excel로 다운로드하면 다운로드가 되지 않습니다.
- SetMergeCell로 강제 머지한 시트를 Down2Excel의 footer 옵션으로 내려받으면 푸터 행과 마지막 행이 머지된 채로 내려옵니다.
- DownCols와 Merge를 함께 써서 엑셀을 다운로드하면 푸터행의 값과 머지가 맞지 않습니다.

**답변**

푸터 행은 버전에 따라 엑셀 다운로드 동작이 다릅니다.

- `ShowFooterRow()`로 추가한 푸터 행의 머지가 동작하지 않는 증상은 157 버전에서 푸터 행 머지가 동작하도록 패치되었습니다.
- 7.0.13.65 버전에서는 `ShowFooterRow` 사용 시 다운로드가 되지 않으며 푸터행의 엑셀 다운로드를 고려하지 않은 것으로 보입니다. 대안으로 `Down2Excel`의 `TitleText`와 `UserMerge`를 이용해 합계 값을 시트 위쪽에 타이틀처럼 표기하는 방법이 있습니다.
- footer 옵션 사용 시 푸터 행과 마지막 행이 머지된 채로 내려오는 현상은 서버모듈 1.0과 2.0 모두 최신 버전에서는 정상 동작하므로 최신 서버모듈을 사용합니다.
- `DownCols`와 `Merge:1`을 함께 쓰면 푸터행의 머지를 100% 유지하기 어렵습니다. 푸터행을 제외하고 내리려면 Down2Excel 옵션에 `ExcludeFooterRow:1`을 지정합니다.

**적용 버전**: 157 버전에서 푸터 행 머지 패치, 7.0.13.65에서 ShowFooterRow 다운로드 불가

**키워드**: ShowFooterRow, ExcludeFooterRow, TitleText, UserMerge, 푸터 행, footer

---

### [XLS-0648] Down2Excel UserMerge·TitleText·Header 옵션의 용도와 틀고정 시 마지막 행 누락

**질문**

- Down2Excel의 UserMerge 옵션은 무엇을 병합하나요? 시트에서 병합한 셀을 엑셀에 반영하려고 UserMerge를 써도 되나요?
- Down2Excel로 엑셀을 내려받을 때 시트 상단에 타이틀을 넣으려면 어떻게 설정하나요?
- 엑셀 다운로드에서 Header 옵션을 적용하면 UserMerge와 줄바꿈 값이 정상 인식되지 않습니다.
- 틀고정을 사용한 시트를 엑셀로 다운로드하면 마지막 행이 누락됩니다.

**답변**

- `UserMerge`는 시트의 데이터를 병합하는 옵션이 아니라, 다운로드하는 엑셀 파일 상단에 title을 설정하고 그 title을 병합하는 기능입니다. 상단 타이틀은 `Down2Excel()`의 `TitleText`와 `UserMerge` 속성을 사용합니다. 시트에서 병합한 셀을 엑셀에 반영하려는 용도로 쓰면 올바른 사용법이 아니므로 `UserMerge`를 제거하고 `Merge:1` 등 병합 옵션을 사용합니다.
- `Header` 옵션은 배열 구조이므로 object 배열 형태로 지정하며, 각 object가 하나의 헤더 행을 의미합니다.
- 틀고정 시트를 버튼 클릭으로 다운로드하면 마지막 행이 누락되고 콘솔에서 API를 직접 호출하면 정상인 경우, 화면 공통 스크립트에 `userMerge`를 수행하는 부분이 있는지 확인합니다. 해당 라인을 주석 처리하자 정상 다운로드된 사례가 있습니다.

**키워드**: UserMerge, TitleText, Header, 틀고정, 마지막 행 누락, Down2Excel

---

### [XLS-0649] 서버모듈 버전 문제로 Down2Excel 머지(Merge)가 이상하게 내려오거나 적용되지 않을 때

**질문**

- Down2Excel로 내려받은 엑셀의 머지(병합)가 이상하게 나옵니다. 원인이 무엇인가요?
- 서버모듈 ibsheet7-1.1.27.jar로 Down2Excel을 할 때 Merge를 설정했는데 적용되지 않습니다.

**답변**

서버모듈 1.0과 2.0이 동시에 사용되고 있는 경우일 수 있으므로 하나의 서버모듈만 사용하도록 한 뒤 다시 테스트합니다. 서버모듈 버전이 너무 낮으면(예: ibsheet7-1.1.27.jar) `Merge` 설정이 `Down2Excel`에 반영되지 않을 수 있으므로 서버모듈을 최신 버전으로 올립니다. 계속 문제가 발생하면 추가 점검이 필요합니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.27.jar에서 Merge 미반영

**키워드**: Merge, 서버모듈 1.0, 서버모듈 2.0, ibsheet7-1.1.27.jar, Down2Excel, 머지 이상

---

### [XLS-0650] AppendPrevSheet와 Merge를 함께 쓰면 일부 행부터 병합이 안 되는 문제의 수정 버전

**질문**

- Down2Excel에서 AppendPrevSheet와 Merge 옵션을 함께 사용해 여러 시트(소계 사용 시트 포함)를 한 엑셀 시트로 내려받으면 일부 행부터 병합이 제대로 되지 않습니다.

**답변**

해당 증상은 IBSheet7 7.0.13.285-20251217-1703-M 버전 배포로 처리되었습니다. 이 버전 이상으로 교체해 확인합니다.

**적용 버전**: 7.0.13.285-20251217-1703-M에서 수정

**키워드**: AppendPrevSheet, Merge, Down2Excel, 소계, 7.0.13.285

---

### [XLS-0651] Down2Hml()로 내려받으면 헤더 행의 머지가 풀리는 이유

**질문**

- Down2Hml()로 내려받으면 헤더 행의 머지가 풀려 버립니다. 머지가 유지되도록 할 수 있나요?

**답변**

`Down2Hml()`로 내려받을 때는 머지 기능을 지원하지 않아 헤더 행의 병합이 풀립니다. 이를 위한 추가 개발도 없습니다.

**키워드**: Down2Hml, 머지, 헤더 병합, 한글 다운로드

---

### [XLS-0652] 서브 그리드와 메인 그리드를 연결해 하나의 엑셀로 다운로드하는 SheetMerge 사용법

**질문**

- 서브 그리드와 메인 그리드를 연결해서 하나의 엑셀로 다운로드하는 SheetMerge 함수는 어떻게 사용하나요?

**답변**

`SheetMerge`는 서브그리드와 메인그리드의 컬럼을 연결한 하나의 시트를 생성해 주는 기능입니다. 엑셀 다운로드 전에 감춰진 시트에 이 함수를 적용하여 시트 객체를 하나 생성하고, 이후 조회, 저장을 순서대로 수행합니다.

**키워드**: SheetMerge, 서브 그리드, 메인 그리드, 엑셀 다운로드, 감춰진 시트

---

### [XLS-0653] 소계·합계(누계) 행이 있는 시트를 Merge로 엑셀 다운로드하면 병합이 풀리거나 어긋나는 이유와 대처는?

**질문**

- 소계·누계를 표시하는 시트에서 ExcludeSubSum과 Merge를 함께 선언하고 Down2Excel로 내려받으면 머지가 제대로 되지 않습니다. 제품 제약인가요?
- 합계/소계행이 있는 화면에 hidden 컬럼을 추가하고 Down2Excel로 내려받으면 합계/소계행의 병합이 정상적으로 되지 않습니다. 어떻게 해결하나요?
- OtherColText로 화면에서는 소계와 데이터 영역이 병합되어 보이는데 엑셀로 내려받으면 병합이 풀립니다. 어떻게 다운로드해야 하나요?

**답변**

엑셀 다운로드의 머지 계산은 `DownCols`, `DownRows`, `HiddenColumn` 같은 옵션 때문에 데이터가 시트와 달라질 수 있어 시트와 다르게 구현되어 있고 매우 느립니다. 소계/누계를 함께 계산하는 것은 불가능해 소계에 대한 머지 처리는 처음부터 고려되지 않았습니다. 따라서 `ExcludeSubSum`과 `Merge`를 함께 쓰면 머지가 제대로 되지 않을 수 있으며, 소계/누계를 사용하는 시트는 가급적 머지를 풀고 다운로드해야 합니다. 소계/누계 행은 다운로드 옵션에 따라 데이터 포맷이 맞지 않을 수도 있습니다.
병합 유지가 꼭 필요하면 다음 방법을 시도해 볼 수 있습니다.

- hidden 컬럼이 있는 화면에서는 `HiddenColumn` 인자를 삭제하고, 내려받을 컬럼을 `DownCols`로 정의하며, `Merge:1`로 내려받습니다.
- `OtherColText`로 소계와 데이터 영역을 병합한 시트는 `SheetDesign:1`, `Merge:1` 옵션을 주고, `DownCols`에는 숨김 컬럼과 Seq, Status, DelCheck 타입 컬럼을 제외한 컬럼만 지정하는 공통 다운로드 함수(`makeHiddenSkipCol` 사용)로 `Down2Excel`을 호출합니다.

**키워드**: ExcludeSubSum, Merge, DownCols, HiddenColumn, OtherColText, 소계 병합, makeHiddenSkipCol

---

### [XLS-0654] 숨김 컬럼이 있을 때 SetMergeCell·Merge:1 병합이 엑셀 다운로드에 반영되지 않는 이유와 해결 방법은?

**질문**

- SetMergeCell로 강제 병합한 셀을 Down2Excel의 Merge:1로 내려받았는데 엑셀에서는 병합이 적용되지 않습니다. 원인과 해결 방법은?
- SetMergeCell로 머지한 셀이 엑셀 다운로드 결과에서는 병합되지 않고 나옵니다. HiddenColumn 옵션을 사용 중인데 어떻게 해야 하나요?
- 가로 병합된 영역의 중간 컬럼을 hidden 처리하고 DownCols 없이 엑셀로 내려받으면 숨김 컬럼의 병합이 풀립니다. 병합을 유지하려면 어떻게 하나요?
- 머지 여부를 판단하는 히든 컬럼을 두고 그 값에 따라 머지하는데, 이 컬럼은 엑셀로 내려받지 않으면서 머지 상태는 유지할 수 있나요?

**답변**

화면에 보이는 컬럼 구성과 다운로드할 컬럼 구성이 다르면 `Merge:1`을 줘도 병합이 잘 반영되지 않습니다. 예를 들어 일부 컬럼을 숨긴 상태에서 `HiddenColumn:1, Merge:1`로 내려받으면 병합이 반영되지 않습니다. 해결 방법은 다음과 같습니다.

- `HiddenColumn` 대신 `Mode`를 0이 아닌 값으로 지정합니다. 예: `Mode:2, SheetDesign:1, StartCol:1, Merge:1`
- `Mode`로 해결되지 않으면 `DownCols`에 `GetColHidden`으로 숨김이 아닌 컬럼의 인덱스만 `|`로 이어 지정해 화면에 보이는 컬럼 그대로 내려받습니다. 이처럼 `HiddenColumn` 대신 `DownCols`를 설정해 보는 방법이며, 그래도 병합이 반영되지 않으면 추가 확인이 필요합니다.
- 가로 병합된 영역의 중간 컬럼을 hidden 처리했고 `DownCols`를 쓰지 않아 숨김 컬럼의 병합이 풀리면, `OnBeforeDownload` 이벤트에서 숨겨진 컬럼을 보이게 하고 `OnDownFinish` 시점에 다시 숨기는 방식으로 우회할 수 있습니다.
- 머지 여부를 판단하는 히든 컬럼은 엑셀에서도 그 값대로 머지된 상태로 보이려면 `DownCols`로 지정된 컬럼에 포함되어야 하며, 히든 컬럼 중 일부는 보이게 하고 일부는 숨기는 구분은 할 수 없습니다.

**적용 버전**: 7.0.13.249에서 확인(OnBeforeDownload 우회)

**키워드**: SetMergeCell, Merge:1, HiddenColumn, DownCols, Mode:2, OnBeforeDownload, OnDownFinish

---

### [XLS-0655] Merge:2로 내려받은 엑셀의 병합을 풀면 값이 첫 번째 칸이 아닌 위치에 들어 있는 문제는?

**질문**

- Down2Excel에서 Merge:2로 내려받은 엑셀의 병합을 풀면 어떤 값은 첫 번째 칸에, 어떤 값은 세 번째 칸에 들어 있습니다. 어떻게 해결하나요?

**답변**

병합 영역의 첫 셀이 아닌 위치에 값이 들어가는 현상은 `2.0.24.jar`에서 수정되었으므로 해당 서버 모듈 버전 이상으로 교체합니다. 다만 첫 컬럼이 히든 컬럼인 상태에서 `HiddenColumn`을 함께 쓰면 문제가 계속될 수 있어, `HiddenColumn`을 빼고 `DownCols`에 내려받을 컬럼을 지정해야 할 수 있습니다.

**적용 버전**: 2.0.24.jar에서 수정

**키워드**: Merge:2, 2.0.24.jar, HiddenColumn, DownCols, 병합 해제 값 위치

---

### [XLS-0656] 단위데이터 행(2개 행) 시트를 엑셀로 내려받으면 단위데이터를 넘어 여러 행이 머지되는 원인은?

**질문**

- 단위데이터 행(2개 행)을 쓰는 시트를 엑셀로 내려받으면 단위데이터를 넘어 여러 행이 머지되어 내려옵니다. 원인과 해결 방법은 무엇인가요?

**답변**

`Down2Excel()`에서 `DownRows`로 일부만 내려받으면 머지 계산이 다운로드되는 컬럼만 보고 머지 영역을 다시 계산해 화면과 다른 머지가 될 수 있는 것으로 보입니다. 우선 `DownRows`를 빼고 `HiddenColumn:1`로 처리해 볼 수 있습니다.

**키워드**: DownRows, HiddenColumn, 단위데이터 행, 엑셀 머지 범위, Down2Excel

---

### [XLS-0657] 엑셀 다운로드에서 합계가 두 줄로 나오거나 합계행을 숨긴 뒤 오류가 날 때 DownSum 설정은?

**질문**

- 합계 컬럼을 숨기고 합계 내용을 데이터로 넣은 뒤 엑셀로 다운로드하면 합계가 두 줄로 나옵니다. 어떻게 하나요?
- 엑셀 다운로드 전에 마지막 합계행을 RowHidden으로 숨기고 ExportMode를 2로 사용하면 오류가 발생합니다. 숨기지 않으면 정상인데 어떻게 해야 하나요?

**답변**

`Down2Excel`의 `DownSum` 설정으로 합계행 다운로드를 조절합니다.

- 합계 컬럼을 숨기고 합계 내용을 데이터로 넣어 숨김 데이터도 함께 내려야 하는 경우, 합계가 두 줄로 나오면 `DownSum` 설정을 적용합니다.
- 합계행을 `RowHidden`으로 숨긴 뒤 `ExportMode:2`로 내릴 때 오류가 나는 경우: 정확한 원인은 알 수 없지만, 조회 후 합계행에 글자색·배경색을 설정하는 로직이 있는 상태에서 그 행을 숨기고 내리면 null에 color 속성을 설정하면서 오류가 나는 것으로 보입니다. `DownSum:0`을 설정하면 합계행을 제외하고 내릴 수 있습니다.

**키워드**: DownSum, DownSum:0, ExportMode, RowHidden, 합계행 두 줄, 합계행 제외

---

### [XLS-0658] 화면에서 SetSumValue로 바꿔 표시한 합계가 엑셀 다운로드에서는 AutoSum 원래 값으로 나오는 이유는?

**질문**

- 화면에서 합계행 값을 다른 숫자로 바꿔 표시했는데 엑셀로 내려받으면 AutoSum 원래 값이 나옵니다. 화면 그대로 다운로드하려면 어떻게 하나요?

**답변**

AutoSum 컬럼은 Hidden 처리하고 화면용 컬럼을 추가해 `SetSumValue()`로 원하는 합계값을 설정한 경우, 엑셀 다운로드에서 모든 컬럼을 내려받거나 `DownCols`에 숨겨진 AutoSum 컬럼이 포함되면 원래 계산값이 내려받아질 수 있습니다. 화면과 동일하게 보이는 컬럼들만 `Down2Excel`의 `DownCols`로 설정하면 그대로 다운로드됩니다.

**키워드**: SetSumValue, AutoSum, DownCols, Down2Excel, 합계값 불일치

---

### [XLS-0659] SetRowHidden으로 숨긴 행을 엑셀 다운로드에서 제외하려면 어떻게 하나요?

**질문**

- SetRowHidden으로 행을 숨긴 뒤 엑셀로 내려받을 때 숨긴 행이 포함되지 않게 하려면 어떻게 해야 하나요?

**답변**

엑셀 다운로드 인자에 `DownRows:"Visible"`을 사용합니다. `SetRowHidden`으로 숨긴 행을 내려받는 파일에서 제외하려는 경우의 방법입니다.

**키워드**: DownRows, SetRowHidden, 숨긴 행 제외, 엑셀 다운로드 Visible

---

## DownCols·숨김·행 범위 지정

### [XLS-0660] 필터링하거나 숨긴 행을 제외하고 화면에 보이는 행만 엑셀로 내려받으려면 어떻게 하나요?

**질문**

- 엑셀 다운로드 시 필터링한 결과(화면에 보이는 행, 숨긴 행 제외)만 내려받고 싶은데 전체 데이터가 내려받아집니다. 어떻게 하나요?
- 필터를 적용하거나 일부 행을 숨긴 뒤 Down2Excel로 내려받으면 숨겨진 행까지 내려받아집니다. 보이는 행만 내려받으려면 어떻게 하나요?
- SetRowHidden으로 숨긴 행까지 Down2Excel 결과에 출력됩니다. 숨겨진 행은 제외하고 보이는 행만 엑셀로 내려받으려면 어떻게 하나요?
- 헤더가 2줄인 시트를 엑셀로 저장할 때 Summary도 두 줄로 나옵니다. 윗줄을 없애고 아래 한 줄만 나오게 할 수 있나요?

**답변**

`Down2Excel` 호출 시 `DownRows`를 `Visible`로 지정하면 필터링되었거나 `SetRowHidden`으로 숨겨진 행을 제외하고 화면에 보이는 행만 내려받습니다. 지정하지 않으면 필터와 관계없이 조회된 전체 데이터(숨긴 행 포함)가 내려받아집니다.
예: `Down2Excel({DownRows:"Visible"})` 또는 `Down2Excel({SheetDesign:1,Merge:1,FileName:'ExcelList.xls',DownRows:'Visible'})`
`ShowFilterRow`로 필터링한 상태에서 전체 데이터가 받아지는 경우나, 헤더가 2줄인 시트에서 Summary의 윗줄을 제외하고 아래 한 줄만 받으려는 경우에도 같은 `DownRows:"Visible"` 파라미터를 추가합니다. `Visible: 1` 설정과 `DownRows:"Visible"` 설정을 함께 적용했을 때 필터된 정보만 정상 다운로드된 사례도 있습니다. 자세한 내용은 `Down2Excel` 매뉴얼을 참고합니다.

**키워드**: DownRows, Visible, Down2Excel, 필터 행만 다운로드, 숨긴 행 제외, SetRowHidden, ShowFilterRow

---

### [XLS-0661] 다운로드 다이얼로그(DownloadDialog) 사용 시 DownRows가 적용되지 않아 필터된 행만 받으려면?

**질문**

- 다운로드 다이얼로그(DownloadDialog)를 사용해 엑셀을 내려받을 때 필터링된 행만 내려받으려면 어떻게 하나요? DownRows가 적용되지 않습니다.

**답변**

다운로드 다이얼로그에 표시되는 데이터는 전체 데이터이며 이는 바꿀 수 없습니다. 이 경로에서는 `DownRows` 속성을 쓸 수 없어 `SetDown2ExcelConfig()`로 전역 설정하면 필터된 행만 내려받아집니다.

**키워드**: DownloadDialog, SetDown2ExcelConfig, DownRows, 다운로드 다이얼로그, 필터 행 다운로드

---

### [XLS-0662] 트리를 접은 상태에서 엑셀 다운로드 시 DownTreeHide를 지정해도 펼쳐서 받을 수 없나요?

**질문**

- 트리를 접은 상태에서 DownTreeHide를 어떻게 지정해도 엑셀 다운로드가 펼쳐진 상태로 되지 않습니다. 펼쳐서 받을 수 있나요?

**답변**

`DownRows`에 `Visible`이 지정되어 있으면 화면에 보이는 행만 다운로드하므로, 트리를 접은 상태에서는 화면 인쇄나 엑셀 다운로드 시 펼쳐진 데이터로 받을 수 없습니다. 이 경우 `DownRows` 속성을 빼거나, 숨김 시트에 시트 내용을 복사해 다운로드하는 방법을 고려할 수 있습니다.

**키워드**: DownTreeHide, DownRows, Visible, 트리 접힘 엑셀 다운로드, 숨김 시트

---

### [XLS-0663] Down2Excel의 DownRows에 행 index를 직접 지정해 헤더만 받거나 특정 행을 제외하려면?

**질문**

- Down2Excel의 DownRows에 내려받을 행을 직접 지정하려면 값을 어떤 형식으로 넘겨야 하나요? 지정했는데 적용되지 않습니다.
- 데이터가 있어도 엑셀 다운로드 시 헤더만 내려받고 싶습니다. Down2Excel의 어떤 속성을 어떻게 설정하면 되나요?
- 엑셀 다운로드 시 헤더 아래의 1행(검색행 등)을 내려받지 않으려면 어떻게 하나요? StartRow를 설정하면 되나요?

**답변**

`DownRows`에는 내려받을 행 index를 `|`로 이어 붙인 문자열로 넘깁니다.

- 헤더만 내려받기: `{DownRows:"0"}`처럼 `"0"`을 지정하면 데이터가 있어도 헤더만 내려받습니다.
- 특정 행 제외 방법 1: `"0|2|3|4|5"`처럼 헤더를 포함하고 제외할 행을 뺀 행 index를 나열합니다. 필터 후에는 `GetRowHidden(i) == 0`인 행의 index만 모아 전달할 수도 있습니다.
- 특정 행 제외 방법 2: 제외할 행을 `SetRowHidden`으로 숨기고 `DownRows:"Visible"`로 내려받은 뒤 `OnDownFinish` 이벤트에서 다시 보이게 합니다.
헤더 아래 행을 제외하는 데는 `StartRow`가 맞지 않습니다. `StartRow`는 엑셀 문서에서 다운로드를 시작할 번호를 지정하는 속성입니다. 속성명 철자나 값의 따옴표 형식이 잘못되면 `DownRows` 지정이 적용되지 않습니다.

**키워드**: DownRows, StartRow, GetRowHidden, SetRowHidden, OnDownFinish, 헤더만 다운로드, 행 제외 다운로드

---

### [XLS-0664] 선택한 행이나 체크박스로 체크한 행만 엑셀로 다운로드하려면 DownRows를 어떻게 지정하나요?

**질문**

- 마우스로 선택한 일부 행만 엑셀로 다운로드하려면 어떻게 하나요? 예를 들어 10개 행 중 1, 3, 8, 9행만 선택한 뒤 엑셀 다운로드로 내려받고 싶습니다.
- 체크박스로 선택한 행만 골라서 엑셀로 내려받으려면 어떻게 하나요? Down2Excel에서 특정 행만 지정하는 방법이 궁금합니다.
- 엑셀 다운로드 시 필터링 후 체크박스가 선택된 행만 다운로드할 수 있나요?
- GetSelectionRows로 얻은 선택 행만 DownRows에 넣어 엑셀을 내려받으면 머지된 헤더가 포함되지 않습니다. 헤더를 함께 받으려면?

**답변**

`Down2Excel`의 `DownRows`에 내려받을 행의 index를 지정하면 해당 행의 데이터만 다운로드됩니다.

- 선택한 행: `DownRows`에 `GetSelectionRows()`가 반환하는 값(또는 `GetSelectRow()`로 얻은 선택 행 값)을 넣습니다.
- 체크한 행: `FindCheckedRows`(또는 `FindCheckedRow`)로 체크된 행의 값을 가져와 `DownRows`에 설정합니다. 예: `var arr = mySheet.FindCheckedRow(0);` 후 `mySheet.Down2Excel({DownRows:arr});`
- 필터링 후 체크된 행처럼 조건이 붙는 경우의 행 선별 로직은 `DownRows`를 이용해 직접 구현해야 합니다.
주의: `DownRows`에 선택 행 번호만 전달하면 헤더 행 index가 빠져 머지된 헤더가 포함되지 않습니다. `HeaderRows()` 개수만큼 `0|1|` 같은 헤더 행 index 문자열을 만들어 `GetSelectionRows()` 결과 앞에 붙여 전달하면 헤더도 함께 내려받습니다.

**키워드**: DownRows, GetSelectionRows, GetSelectRow, FindCheckedRow, Down2Excel, 선택 행 다운로드, 체크 행 다운로드

---

### [XLS-0665] 헤더에 체크박스를 두고 체크한 컬럼만 엑셀로 다운로드하려면 어떻게 구현하나요?

**질문**

- 헤더 영역에 컬럼별 체크박스를 표시하고, 체크한 컬럼만 엑셀로 다운로드하게 하려면 어떻게 구현하나요?
- 헤더에 체크박스를 두고 체크된 컬럼만 엑셀로 다운로드하게 하는 UI를 제공하는 기능이나 샘플이 있나요?

**답변**

제품 내 기능이나 별도의 샘플은 제공되지 않으므로 직접 구현합니다. 헤더에 빈 행을 하나 추가해 그 행을 체크박스로 만듭니다(예: `SetHtmlHeaderValue` 또는 `HtmlHeaderValue` 함수로 체크박스 HTML 삽입). 체크박스를 누를 때 이벤트에서 컬럼별 checked 상태를 배열에 갱신해 두고, 다운로드 시 체크된 컬럼의 saveName을 `|`로 이어 `Down2Excel`의 `DownCols`에 넣어 호출합니다. 컬럼 saveName은 `ColSaveName(0,i)`로 얻을 수 있습니다.

**키워드**: DownCols, Down2Excel, SetHtmlHeaderValue, HtmlHeaderValue, ColSaveName, 헤더 체크박스

---

### [XLS-0666] 엑셀 다운로드에서 일부 컬럼이 빠지거나 시트가 비어서 내려오는 원인은 무엇인가요?

**질문**

- 엑셀 다운로드 시 일부 컬럼이 다운로드되지 않습니다. DownCols를 사용하고 있는데 원인이 무엇인가요?
- ColInsert로 추가한 컬럼이 엑셀 다운로드에서 빠집니다. 원인이 무엇인가요?
- 엑셀로 다운로드할 때 시트의 특정 컬럼들만 다운로드되지 않고 빠집니다. 원인과 해결 방법은 무엇인가요?
- 동적으로 컬럼을 생성하는 시트만 엑셀로 내려받으면 비어 있고, 드래그해서 Ctrl+C 복사도 되지 않습니다. 원인이 무엇인가요?

**답변**

원인은 크게 두 가지입니다.

- 컬럼의 `SaveName`이 `201443`처럼 숫자로만 되어 있는 경우: `DownCols`를 사용하면 시트가 이를 컬럼 index로 인식해 해당 컬럼을 제외하고 서버로 전송합니다. `ColInsert`로 추가한 컬럼이 빠지는 것도 같은 원인이며, 제품에서는 숫자로만 된 `SaveName`을 지원하지 않으므로 `SaveName`에 숫자만 쓰지 않습니다.
- 컬럼 `Type`이 정의되어 있지 않은 경우: 화면에서 시트의 타입이 정의되어 있지 않으면 해당 컬럼이 다운로드되지 않으며, 타입을 정의하면 내려받아집니다. 동적으로 컬럼을 생성하는 시트가 비어서 내려오는 경우도 컬럼 `Type` 설정 문제이므로 `Type` 설정을 먼저 확인합니다.

**키워드**: SaveName, DownCols, ColInsert, 컬럼 Type, 엑셀 컬럼 누락, 빈 엑셀 다운로드

---

### [XLS-0667] 엑셀 다운로드 시 'An error has occured while downloding the file' 오류가 발생합니다.

**질문**

- 엑셀 다운로드 시 특정 시트에서만 'An error has occured while downloding the file' 오류가 납니다. 병합 헤더와 CalcLogic을 쓰는 시트인데 원인이 무엇인가요?

**답변**

엑셀로 보내는 전문은 컬럼을 `|` 구분자로 이어 붙여(`col1|col2|col3|...`) 생성합니다. 컬럼의 `SaveName`에 `|` 문자가 들어 있으면 이 과정에서 영향을 받아 오류가 날 수 있습니다. 해당 컬럼의 `SaveName`을 `|`가 없는 이름으로 변경해 봅니다.

**키워드**: SaveName, occured while downloding the file, | 구분자, 엑셀 다운로드 오류, CalcLogic

---

### [XLS-0668] 엑셀 다운로드로 내려받을 수 있는 최대 컬럼 수는 몇 개이고, 컬럼이 많아 안 될 때는 어떻게 하나요?

**질문**

- 엑셀 2007 형식으로 컬럼이 300개인 시트를 다운로드하려고 합니다. 엑셀 다운로드로 내려받을 수 있는 컬럼 수는 몇 개인가요?
- 컬럼 수가 많은 시트(피벗 등)를 Down2Excel로 다운로드하면 먹통이 되고 다운로드가 되지 않습니다. 원인과 해결 방법은 무엇인가요?

**답변**

엑셀 2003 형식(xls)은 엑셀 자체가 256개 컬럼만 지원하므로 256컬럼까지만 다운로드할 수 있고, 컬럼 수가 이보다 많으면 다운로드가 되지 않을 수 있습니다. 2007 형식(xlsx)은 16,384컬럼까지 다운로드할 수 있으므로 `Down2Excel`의 `FileName` 확장자를 xlsx로 지정해 다운로드합니다.

**키워드**: Down2Excel, FileName, xlsx, 엑셀 최대 컬럼 수, 256컬럼, 16,384컬럼

---

### [XLS-0669] 파일 다운로드 팝업에 Text 컬럼은 보이는데 Button 타입 컬럼이 표시되지 않는 이유는?

**질문**

- 파일 다운로드 팝업(다이얼로그)에 Text 타입 컬럼은 표시되는데 Button 타입 컬럼은 표시되지 않습니다. 원인이 무엇인가요?

**답변**

`DialogExceptCols`는 팝업 다이얼로그에 보이지 않아야 할 컬럼들을 정의하는 속성입니다. 버튼 컬럼이 `DialogExceptCols`에 포함되도록 설정되어 있어 표시되지 않는 것일 수 있으니 해당 설정을 확인합니다.

**키워드**: DialogExceptCols, 다운로드 다이얼로그, Button 컬럼, 팝업 컬럼 표시, 엑셀 다운로드 팝업

---

### [XLS-0670] 엑셀 다운로드에서 숨김(히든) 컬럼을 제외하거나 숨김 상태로 내려받으려면 HiddenColumn과 DownCols를 어떻게 쓰나요?

**질문**

- Down2Excel로 엑셀을 내려받을 때 숨김(히든) 컬럼은 다운받지 않게 하려면 어떻게 하나요?
- 엑셀 다운로드의 HiddenColumn 속성은 어떤 기능인가요? 시트에서 숨긴 열이 엑셀에서 어떻게 처리되는지 알고 싶습니다.
- 엑셀로 다운로드할 때 특정 열을 숨김 상태로 내려받고, 엑셀에서 열과 열 사이를 더블클릭하면 다시 표시되게 하려면 어떻게 하나요?
- 클라이언트 모듈로 엑셀을 내려받을 때 숨김 컬럼을 숨긴 채로 내려받을지 보이게 내려받을지는 어떤 인자로 정하나요?

**답변**

`HiddenColumn`은 시트에서 숨긴 컬럼을 엑셀에도 그대로 반영할지 정하는 인자입니다. 다운로드 전에 `SetColHidden()`으로 열을 숨기고 `Down2Excel({HiddenColumn:1})`로 내려받으면 엑셀에서도 열이 숨김 상태이며, 열과 열 사이를 더블클릭하면 숨긴 컬럼이 다시 나타납니다. 안내에 따라 `hiddenColumn`을 `true`로 주면 숨김 컬럼을 다운받지 않도록 할 수 있다고 표현하기도 합니다.
숨김 컬럼을 다운로드 대상에서 아예 제외하려면 `DownCols`로 내려받을 컬럼을 지정합니다.

- `DownCols`에 `Visible`을 지정하면 숨겨진 컬럼은 다운로드되지 않습니다. 헤더 우클릭 메뉴의 엑셀 다운로드 로직이 `ibsheet-common.js`에 있다면 그곳에서 `downCols:"Visible"`를 넣습니다.
- 히든이 아닌 컬럼의 index만 직접 모아 지정할 수도 있습니다. 예: `Down2Excel({SheetDesign:1, Merge:1, DownCols:getVisibleCols(mySheet)})` (`GetColHidden`으로 히든이 아닌 컬럼 index를 모아 `|`로 이어 반환하는 사용자 함수)

**키워드**: HiddenColumn, DownCols, SetColHidden, GetColHidden, Down2Excel, 숨김 컬럼 제외, 히든 컬럼 다운로드

---

### [XLS-0671] 엑셀 다운로드에 Hidden 컬럼이 포함되거나 값이 나오지 않을 때 Mode와 HiddenColumn은 어떻게 쓰나요?

**질문**

- ActiveX에서는 Down2Excel 시 Hidden 컬럼이 내려오지 않았는데 IBSheet7로 마이그레이션한 뒤에는 Hidden 컬럼이 엑셀에 내려옵니다. 어떻게 하나요?
- Down2Excel에 Mode:0을 주어 모든 컬럼을 다운로드했는데 히든 컬럼의 값이 나오지 않습니다. 어떻게 확인해야 하나요?

**답변**

IBSheet7에서는 `HiddenColumn:1`로 처리되어 숨김 컬럼이 엑셀에 내려옵니다. `Down2Excel()`의 `Mode`를 `Mode:2`로 설정하면 숨김 컬럼을 내려받지 않을 수 있습니다.
`Down2Excel()`을 옵션 없이 호출하면 히든 컬럼을 포함한 전체 데이터가 내려옵니다. 히든 컬럼을 화면처럼 숨기기 처리하려면 `HiddenColumn:1` 속성을 추가할 수 있습니다. `Mode:0`만 넣었을 때 히든 컬럼의 값이 빠지는 현상은 재현되지 않으므로, 함께 지정한 다른 옵션을 확인합니다.

**키워드**: Mode:2, Mode:0, HiddenColumn, Down2Excel, Hidden 컬럼, ActiveX 마이그레이션

---

### [XLS-0672] DownloadDialog나 여러 시트 다운로드(Down2ExcelBuffer)에서 HiddenColumn 설정이 적용되지 않는 이유는?

**질문**

- DownloadDialog에 HiddenColumn을 true로 넘겼는데 Down2Excel과 달리 숨김 컬럼이 다운로드되지 않습니다. 왜 그런가요?
- Down2ExcelBuffer로 여러 시트를 내려받을 때 hiddencolumn을 설정했는데도 숨긴 컬럼이 엑셀에 다운로드됩니다. 왜 그런가요?

**답변**

- DownloadDialog: `HiddenColumn = true` 옵션을 지원하지 않으며 `Down2Excel`과 동작 방식이 다릅니다. `Down2Excel`은 그리드 전체 컬럼을 기준으로 다운로드하고 `HiddenColumn` 옵션으로 숨김 컬럼 포함 여부를 제어하지만, DownloadDialog는 `DownCols` 파라미터에 지정한 컬럼만 다운로드하므로 `HiddenColumn`이 적용되지 않습니다. 이 경우 `DownCols`로 내려받을 컬럼을 지정합니다.
- 여러 시트 다운로드(`Down2ExcelBuffer`): 첫 번째 시트에만 `downcol`과 `hiddencolumn:1`이 설정되어 있고 나머지 시트는 `appendPrevSheet`를 사용하면서 설정하지 못하면, 설정이 없는 시트는 숨김 컬럼까지 모두 다운로드됩니다. 시트별로 숨김 컬럼 설정이 적용되었는지 확인합니다.

**키워드**: HiddenColumn, DownloadDialog, Down2ExcelBuffer, appendPrevSheet, DownCols, 숨김 컬럼 미적용

---

### [XLS-0673] AutoSizeColumn:1과 HiddenColumn:1을 함께 써도 숨김이 반영되지 않을 때 확인할 점은?

**질문**

- AutoSizeColumn:1로 열 너비를 자동 설정한 상태에서 HiddenColumn:1로 열을 숨기려는데 숨김이 되지 않습니다. 두 옵션을 함께 쓸 수 없나요?
- 엑셀 다운로드 시 숨겨진 컬럼을 받고 싶지 않아 HiddenColumn을 설정했는데 설정이 반영되지 않습니다. jar 1.1.67 환경에서 무엇을 확인해야 하나요?

**답변**

7.0.13.185 버전과 서버 모듈 2.0.85 조합에서는 `AutoSizeColumn: 1`과 `HiddenColumn: 1`을 동시에 사용할 수 있는 것으로 확인됩니다. 숨김이 적용되지 않는다면 사용 중인 제품 버전과 서버 모듈 버전을 먼저 확인합니다.
jar 1.1.67 버전으로 테스트했을 때도 `HiddenColumn` 설정은 정상적으로 동작했습니다. 그래도 반영되지 않으면 브라우저 캐시를 확인해 볼 수 있으며, 확정된 원인은 아닙니다.

**적용 버전**: 7.0.13.185, 서버 모듈 2.0.85에서 동시 사용 확인 / jar 1.1.67에서 HiddenColumn 정상

**키워드**: AutoSizeColumn, HiddenColumn, 서버 모듈 버전, 숨김 컬럼 미반영, 브라우저 캐시

---

### [XLS-0674] Down2Excel로 화면의 일부 컬럼(또는 행)만 엑셀로 내려받으려면 DownCols를 어떻게 지정하나요?

**질문**

- Down2Excel로 엑셀을 다운로드할 때 화면의 모든 컬럼이 아니라 원하는 컬럼만 내려받으려면 어떻게 하나요?
- Down2Excel로 엑셀을 내려받을 때 지정한 특정 컬럼만 받으려면 어떻게 하나요?
- IBSheet8에 있는 CanExport 같은 기능을 IBSheet7에서도 사용할 수 있나요? 엑셀로 다운로드할 때 내려받을 컬럼을 어떻게 제한하나요?
- 엑셀 다운로드에서 컬럼이 일부만 다운로드되거나 첫 번째 컬럼이 받아지지 않습니다. 원인이 무엇인가요?

**답변**

IBSheet7에서는 IBSheet8의 `CanExport` 같은 기능을 사용할 수 없으므로, `Down2Excel()` 호출 시 `DownCols`(`downCols`) 옵션으로 내려받을 컬럼을 지정합니다. 내려받을 컬럼의 index를 `1|3|4|5|8|9`처럼 `|`로 구분해 넣으면 해당 컬럼만 다운로드됩니다. 행도 함께 고르려면 `DownRows`를 같이 사용합니다. 예: 5컬럼 시트에서 4건을 조회한 뒤 1~2번째 컬럼을 제외하고 1, 3행만 받으려면 `{FileName:'myFile.xls',DownCols:'2|3|4',DownRows:'1|3'}`처럼 지정해 `Down2Excel`을 호출합니다.
`DownCols`에 값이 들어 있으면 지정한 컬럼만 다운로드되므로, 숨겨진 컬럼이 다운로드되지 않는다면 `DownCols`에 값을 넣고 있지 않은지 확인합니다. `DownCols` 값을 잘못 지정하면 일부 컬럼만 내려오거나 첫 번째 컬럼이 빠집니다. 예를 들어 `Mode:-1`로 설정해 사용하면서 `DownCols`를 1컬럼부터 설정하면 첫 번째 컬럼이 다운로드되지 않은 사례가 있으므로 `DownCols` 값을 올바르게 지정해야 합니다.

**키워드**: DownCols, DownRows, CanExport, Down2Excel, 특정 컬럼만 다운로드, 컬럼 선택 다운로드

---

### [XLS-0675] 엑셀 다운로드 시 숨김(hidden) 컬럼이 함께 내려오는데 아예 제외하려면 어떻게 하나요?

**질문**

- IBSheet7에서 Down2Excel로 엑셀을 내려받을 때 숨겨진 컬럼은 제외하고 화면에 보이는 컬럼만 다운로드하려면 어떻게 해야 하나요?
- Down2Excel로 엑셀을 다운로드할 때 숨김(hidden) 처리한 컬럼이 엑셀에 숨김 상태가 아니라 아예 없는 상태로 내려가게 하려면 어떻게 하나요?
- 엑셀 다운로드 시 Hidden 처리한 컬럼이 함께 내려옵니다. 숨긴 컬럼을 다운로드 대상에서 아예 제외하려면 어떻게 하나요?
- 엑셀 다운로드 시 히든된 컬럼은 제외하고 다운로드하려면 어떻게 하나요? ExportMode:2에서 Mode를 줘도 히든 컬럼이 다운로드됩니다.

**답변**

숨김 컬럼이 엑셀에 아예 없는 상태로 내려가게 하려면 `Down2Excel`의 `DownCols`에 내려받을 컬럼(숨기지 않은 컬럼)의 인덱스만 `|`로 이어 지정합니다. `Mode` 옵션을 줬는데도 숨김 컬럼이 내려오는 경우에도 같은 방법을 씁니다.

- 컬럼 인덱스를 직접 적을 수 있습니다. 예: `DownCols:'1|2|3|4'`는 1~4번 컬럼만 다운로드합니다.
- 컬럼이 많으면 `LastCol()`까지 반복하면서 `GetColHidden(i)`가 숨김이 아닌(0인) 컬럼의 인덱스를 모아 `join('|')`으로 이어 반환하는 공통 함수(예: `makeHiddenSkipCol`)를 만듭니다. 그 값을 `SheetDesign:1, Merge:1`과 함께 `DownCols`에 넣어 `Down2Excel`(또는 `DirectDown2Excel`)을 호출합니다. 컬럼별 hidden 속성을 for 루프로 확인해 hidden이 아닌 컬럼의 saveName을 `|`로 이어 붙이는 함수나 `ColHidden()`으로 컬럼을 추출하는 함수를 만들어 변수로 넣을 수도 있습니다.
- `DownCols:'Visible'` 지정이 동작하지 않을 때도 같은 방법을 씁니다. 이 함수를 `ibsheetinfo.js` 파일 맨 아래에 공통 함수로 붙여 두고 다운로드 처리에서 호출할 수 있습니다.
- `GetCellProperty(0,i,'Type')`으로 타입을 확인하면 `Seq`, `Status`, `DelCheck` 타입 컬럼도 함께 제외할 수 있습니다.
- 클라이언트 모듈에서는 `Mode`가 0으로 강제 설정되어 해당 옵션이 지원되지 않으므로, `ExportMode:2`로 다운로드할 때는 `DownCols`로 히든 컬럼을 제외하도록 구현해야 합니다.

**키워드**: DownCols, GetColHidden, makeHiddenSkipCol, ExportMode, Down2Excel, 숨김 컬럼 제외, 히든 컬럼 제외

---

### [XLS-0676] 컬럼 번호를 직접 적지 않고 Status·Seq·체크박스·이미지 타입이나 숨김 컬럼을 제외해 엑셀로 내려받으려면?

**질문**

- 엑셀로 다운로드할 때 상태(Status), 체크박스, 순번(Seq) 같은 특정 타입의 컬럼과 숨김 컬럼을 컬럼 번호 하드코딩 없이 제외하려면 어떻게 하나요?
- 엑셀 다운로드 시 Hidden 컬럼은 제외하고 내리고 있는데, CheckBox나 Radio 타입 컬럼도 제외하고 싶습니다. 어떤 방식으로 처리하면 되나요?
- 엑셀 다운로드에서 숨겨진 컬럼은 제외하되, 숨김 컬럼 중 특정(필수) 컬럼만은 포함해서 내려받으려면 어떻게 하나요?
- 다운로드에서 downCols로 다운받을 컬럼만 지정하는 방법을 알고 있습니다. 이미지 컬럼은 무조건 제외되도록 공통으로 처리하려면 어떻게 해야 하나요?

**답변**

`DownCols`에 넣을 값을 함수로 만들어 사용합니다. 공통 코드에서 `LastCol()`까지 컬럼을 loop로 돌면서 `GetCellProperty(0,i,'Type')`으로 컬럼 타입을 읽어 `Status`, `DelCheck`, `Seq`(예제에 따라 `CheckBox`도) 타입이거나 `GetColHidden(i)`가 숨김인 컬럼은 건너뛰고, 남은 컬럼의 인덱스를 `|`로 이어 반환합니다. 이 값을 `DownCols`로 지정해 `Down2Excel`을 호출하면 컬럼 번호를 직접 적지 않아도 됩니다.

- CheckBox나 Radio, 이미지 같은 특정 타입의 컬럼도 같은 방식으로 컬럼 타입을 확인해 제외하는 형태로 `downCols` 값을 구성하면 됩니다.
- 숨김 컬럼은 제외하되 필수 컬럼은 포함하려면, 컬럼을 반복하면서 `GetColHidden(i)`가 숨김이 아니면 인덱스를 추가하고, 숨김이라도 `GetCellProperty(1, i, 'KeyField')`가 1인 필수 컬럼이면 추가한 뒤 `|`로 이은 문자열을 `DownCols`에 넣어 `Down2Excel`을 호출합니다.

**키워드**: DownCols, GetCellProperty, GetColHidden, LastCol, KeyField, 타입별 컬럼 제외, 필수 컬럼 포함

---

### [XLS-0677] 엑셀 다운로드에서 제외할 컬럼만 지정하거나 숨김 컬럼만 내려받는 속성이 있나요?

**질문**

- 엑셀 다운로드에서 DownCols로는 내려받을 컬럼만 지정할 수 있는데, 다운로드하지 않을 컬럼만 지정하는 방법은 없나요?
- 엑셀 다운로드할 때 특정 컬럼만 제외하고 내려받는 속성이 있나요? 어떻게 처리하나요?
- 시트 조회 시에는 숨김 처리한 컬럼을 엑셀 다운로드할 때에만 출력하려면 어떻게 하나요? 숨김 컬럼만 내려받는 속성이 있나요?

**답변**

다운로드하지 않을 컬럼만 지정하는 속성(API)이나 숨김 컬럼만 내려받는 속성은 제공되지 않습니다. `DownCols`에 내려받을 컬럼이 들어가도록 문자열을 만드는 함수를 구현해 사용해야 합니다.

- 제외할 컬럼 목록(인덱스 또는 SaveName을 `|`로 구분)을 받아 `LastCol()`까지 반복하며 목록에 없는 컬럼의 인덱스만 모아 `DownCols`로 넘기는 공통 함수(`makeSkipCol`)를 만들어 사용합니다. SaveName은 `SaveNameCol`로 인덱스로 바꿉니다.
- 조회 시 숨긴 컬럼을 엑셀 다운로드에만 출력하려면 `GetColHidden`으로 컬럼의 숨김 여부를 확인해 `DownCols`에 넣어주는 스크립트로 처리합니다. 같은 `saveName`을 가진 숨김 컬럼을 별도로 만들고 `Down2Excel` 시 `DownCols`로 그 컬럼을 다운로드하게 하는 방법도 있습니다.

**키워드**: DownCols, makeSkipCol, SaveNameCol, GetColHidden, 컬럼 제외 속성, 제외할 컬럼 지정

---

### [XLS-0678] 엑셀 다운로드에서 체크박스·이미지 컬럼을 내려받지 않으려면 DownCols를 어떻게 지정하나요?

**질문**

- 엑셀 다운로드 시 체크박스나 이미지 같은 컬럼은 내려받지 않으려면 어떻게 하나요? 숨김 처리해도 엑셀에서 숨기기를 취소하면 보입니다.
- 엑셀 다운로드를 할 때 이미지 컬럼만 제외하고 나머지 컬럼을 내려받으려면 어떻게 하나요? 다운로드할 컬럼을 지정하는 옵션(downCols 등)이 있나요?
- 엑셀 다운로드 시 이미지 컬럼을 이미지 대신 URL 값으로 내려받을 수 있나요? 이미지 컬럼을 내려받지 않게 할 수도 있나요?
- 엑셀 다운로드 시 특정 컬럼만(예: 체크박스 컬럼 제외) 내려받고 싶습니다. Down2Excel에서 어떻게 지정하나요?

**답변**

`Down2Excel`의 `DownCols`(`downCols`) 속성에 내려받을 컬럼 index들을 문자로 조합하여 넣으면 해당 컬럼만 다운로드되므로, 체크박스·이미지 컬럼처럼 불필요한 컬럼은 `DownCols`에서 빼고 지정하면 제외됩니다. 숨김(hidden) 속성으로 처리해 내려받은 컬럼은 엑셀에서 숨기기를 취소하면 보이므로, 아예 내려받지 않으려면 `DownCols`로 받을 컬럼을 지정해야 합니다. 이미지 컬럼을 이미지 대신 URL 값으로 내려받는 기능은 없으며, 이미지 컬럼을 다운로드하지 않게 하는 것은 `DownCols`로 가능합니다.

**키워드**: DownCols, 이미지 컬럼 제외, 체크박스 컬럼 제외, Down2Excel, 엑셀 다운로드 컬럼 제외

---

### [XLS-0679] 엑셀 다운로드에 DownCols를 설정했는데 클라이언트 모듈(ExportMode:3)에서는 적용되지 않나요?

**질문**

- 엑셀 다운로드에 DownCols를 설정했는데 적용되지 않습니다. 클라이언트 모듈(ExportMode:3)로 내려받는 경우에도 동작하나요?

**답변**

`ExportMode:3`이 적용되어 클라이언트 모듈로 다운로드되는 경우 `DownCols`가 동작하지 않을 수 있습니다. 클라이언트 모듈에서 `DownCols`가 지원되는지는 확인되지 않았으므로, `DownCols`가 필요하면 서버모듈로 다운로드하는 방식을 사용하는 것이 좋습니다.

**키워드**: ExportMode:3, DownCols, 클라이언트 모듈, 서버모듈, DownCols 미적용

---

### [XLS-0680] 서버모듈의 Batik 관련 라이브러리를 제거해도 엑셀 다운로드에 문제가 없나요?

**질문**

- 보안 취약점 때문에 서버모듈의 Batik 관련 라이브러리를 제거하고 싶습니다. 제거해도 엑셀 다운로드에 문제가 없는지, 어떤 우회 방법이 있는지 알려 주세요.

**답변**

Batik 관련 라이브러리는 이미지 컬럼이 포함된 시트를 다운로드할 때 사용되므로, 이미지 컬럼을 포함해 내려받는다면 반드시 있어야 합니다. 이미지 컬럼을 제외하고 내려받는다면 제거해도 문제가 없습니다. 이 경우 `Down2Excel` 호출 시 `downCols` 속성에 이미지 컬럼을 뺀 컬럼만 넣으면 해당 컬럼만 다운로드됩니다. 단, 화면에 보이는 컬럼과 다운로드 컬럼이 다르면 머지가 유지되지 않습니다.

**키워드**: Batik, 서버모듈, 이미지 컬럼, downCols, 보안 취약점

---

### [XLS-0681] DownCols로 컬럼을 지정해 내려받으면 병합이 깨지거나 엉뚱한 행이 병합되는 문제는 어떻게 해결하나요?

**질문**

- 강제로 머지한 데이터가 엑셀로 다운로드할 때 머지되지 않습니다. 머지를 유지하려면 어떻게 해야 하나요?
- 숨김 컬럼을 빼려고 엑셀 다운로드에서 downcols로 컬럼을 지정하면 값이 서로 다른 특정 행의 데이터가 병합되어 나옵니다. 어느 버전에서 수정되었나요?
- SetMergeCell로 헤더를 머지하고 머지된 마지막 컬럼을 숨긴 뒤 Down2Excel의 DownCols를 설정해 내려받으면 헤더 머지가 반영되지 않습니다. 해결된 버전이 있나요?

**답변**

엑셀 다운로드에서 머지는 화면에 보이는 그대로 다운로드해야 유지됩니다. 히든 컬럼이 중간에 있으면 히든 컬럼도 제외하고 내려야 하므로, `DownCols`를 설정해 화면에 보이는 그대로 내리면 됩니다.
버전별로 처리된 증상은 다음과 같습니다.

- `downcols`로 다운로드 컬럼을 지정했을 때 값이 다른데도 특정 행의 데이터가 병합되는 현상은 IBSheet7 7.0.0.0-20131122-14 버전 배포로 처리되었습니다.
- `SetMergeCell`로 헤더를 머지하고 머지된 마지막 컬럼을 숨긴 뒤 `DownCols`를 설정해 내려받을 때 헤더 머지가 반영되지 않는 증상은 IBSheet7 7.0.13.225 버전 배포로 처리되었습니다.
해당 증상이 보이면 위 버전 이상으로 교체합니다.

**적용 버전**: 7.0.0.0-20131122-14에서 수정(행 병합 오류), 7.0.13.225에서 처리(헤더 머지)

**키워드**: DownCols, SetMergeCell, 엑셀 머지 유지, downcols 병합 오류, 7.0.13.225

---

### [XLS-0682] 화면에 Format·UserFormat(마스킹)이 적용된 컬럼을 엑셀에는 다른 포맷이나 원본 값으로 내려받으려면?

**질문**

- 그리드에 표시된 날짜 컬럼과 다른 포맷(년월일시분초 등)으로 엑셀 파일에 내려받고 싶습니다. 가능한가요?
- 화면에서는 Format이 적용되어 *로 가려 보이거나 시간이 hh:mm으로 표시되는 컬럼을, 엑셀로 다운로드할 때는 포맷을 뺀 값으로 내려받고 싶습니다. 방법이 있나요?
- UserFormat으로 개인정보를 마스킹해 표시하는 컬럼을 엑셀로 다운로드할 때는 마스킹 없이 원본 값이 나가게 하려면 어떻게 하나요?

**답변**

화면에 표시된 컬럼과 다운로드되는 컬럼이 서로 다른 masking을 가질 수는 없으며, 엑셀에는 화면에 보이는 그대로 내려갑니다. 화면 컬럼을 `Format` 미적용 상태로 내려받는 방법은 없고, 전문의 데이터 값만 바꿔서는 안 되며 함께 전송되는 format도 바꿔야 해서 쉽지 않습니다. `CellValue`는 포맷 적용 전 데이터를 가지지만 엑셀 다운로드 시에는 포맷이 적용된 데이터가 넘어가므로 `UserFormat` 마스킹도 그대로 내려갑니다.
대신 같은 값을 가진 컬럼을 감춘(`Hidden:1`) 컬럼으로 하나 더 추가합니다. 다른 포맷이 필요하면 그 컬럼의 `Format`에 `yyyy:MM:dd HH:mm:ss` 같은 포맷을 주고, 포맷 없이 받으려면 Format 없이 원본 데이터를 넣습니다. 그런 다음 엑셀 다운로드 시 화면 컬럼은 빼고 이 숨김 컬럼이 내려가도록 `DownCols`를 지정합니다. `DownCols`에는 컬럼 index 또는 SaveName을 `|`로 조합한 문자열을 넣습니다. 단, `DownCols`를 사용하면 머지가 있는 시트는 엑셀에서 머지가 깨질 수 있습니다.

**키워드**: DownCols, Format, UserFormat, CellValue, 원본 값 다운로드, 마스킹 해제, 날짜 포맷

---

### [XLS-0683] 다운받은 엑셀에서만 일부 컬럼의 정렬을 좌측으로 바꾸려면 어떻게 하나요?

**질문**

- 다운받은 엑셀에서만 일부 컬럼의 셀을 좌측 정렬로 내려받고 싶습니다. 화면 정렬은 그대로 두고 엑셀만 바꾸는 방법이 있나요?

**답변**

다운로드 전에 정렬을 변경해서 내리는 방법도 가능하지만, 원하는 정렬을 지정한 숨김 컬럼을 두고 `downCols`로 해당 컬럼을 다운로드하는 방법이 더 빠를 것으로 보입니다.

**키워드**: downCols, 엑셀 정렬 변경, 숨김 컬럼, 좌측 정렬, 엑셀 다운로드 정렬

---

## TempFile·ReportXML 템플릿

### [XLS-0684] ReportXML·ReportXMLURL 기능은 서버모듈 1.x와 2.0에서 어떻게 지원되나요? 2.0에서는 무엇으로 대체하나요?

**질문**

- 서버모듈 2.0에서 ReportXMLURL 기능을 쓰고 싶은데 동작하지 않습니다. 대안이 있나요?
- 엑셀 다운로드 시 사용하던 ReportXML 기능을 서버모듈 2.0에서도 쓰고 싶은데 지원되나요? 지원하지 않는다면 대신 쓸 수 있는 기능이 있나요?
- ActiveX 버전에서는 XML로 엑셀 다운로드의 컬럼 크기 등을 커스터마이징했는데, HTML 버전에서도 같은 기능을 쓸 수 있나요?

**답변**

ActiveX 버전에서 XML로 컬럼 크기 등을 지정하던 기능에 해당하는 ReportXML 기능을 HTML 버전에서도 제공하지만, 서버모듈 1.* 에서만 동작하며 그 외 서버모듈 버전에서는 동작하지 않습니다.

- 서버모듈 2.0에서는 ReportXML 기능이 제거되었으며, 대신 `TempFile` 기능을 사용합니다.
- 서버모듈 2.0 대는 `ReportXMLURL`도 지원하지 않습니다. `Header`나 `Footer` 기능으로 일부 대체할 수 있지만 `TitleText`가 없는 경우에만 동작하므로 함께 사용할 수 없습니다. `ReportXMLURL`을 사용하려면 서버모듈 1.x를 사용해야 합니다.

**적용 버전**: ReportXML은 서버모듈 1.*에서만 동작, 서버모듈 2.0 이상에서는 제거

**키워드**: ReportXML, ReportXMLURL, 서버모듈 2.0, TempFile, Header, Footer, TitleText

---

### [XLS-0685] 서버모듈 1.x ReportXML 예제처럼 Col2에 End를 넣어도 제대로 출력되지 않을 때 대처 방법은?

**질문**

- 엑셀 다운로드 서버모듈 1.x에서 ReportXML을 사용하는데, 예제 코드처럼 Col2에 End를 넣어도 제대로 출력되지 않습니다. 어떻게 해야 하나요?

**답변**

1.x 서버모듈(1.1.39)에서는 예제 코드와 달리 `Col2`에 `End`를 넣어도 실제로는 제대로 출력되지 않을 수 있습니다. 확정된 해결책은 아니지만 Col 부분에 소문자 `end`를 넣거나 `Colindex`로 숫자를 넣어 시도해 볼 수 있습니다.

**적용 버전**: 서버모듈 1.1.39

**키워드**: ReportXML, Col2, End, Colindex, 서버모듈 1.1.39

---

### [XLS-0686] 엑셀 리포트로 다운로드할 때 셀 테두리는 어떻게 설정하나요?

**질문**

- IBSheet7 엑셀 리포트 샘플로 엑셀을 다운로드할 때 셀 테두리는 어떻게 설정하나요?

**답변**

`<BorderSet>` 안에 `<BorderStyle>`을 사용하거나 `<Label>` 안에 `<BorderStyle>`을 사용하면 됩니다. 엑셀 리포트 샘플의 `report.jsp`는 `ibsheet.js` 파일이 있는 폴더에 두어야 합니다.

**키워드**: BorderSet, BorderStyle, Label, 엑셀 리포트, 셀 테두리, report.jsp

---

### [XLS-0687] 엑셀 서버모듈 2.0의 SAXParser 설정을 java 1.6에서 써도 되나요? 권장 java 버전은 무엇인가요?

**질문**

- 엑셀 서버모듈 2.0의 SAXParser 설정이 java 1.6 환경에서도 문제없이 쓰이나요? 서버모듈 2.0에 권장되는 java 버전이 따로 있나요?

**답변**

서버모듈 2.0은 SAXParser를 설정할 수 있는데, 이 부분이 java 1.6 버전에서는 권장되지 않습니다. 권장 java 버전은 1.7입니다.

**적용 버전**: 서버모듈 2.0, java 1.7 권장

**키워드**: SAXParser, 서버모듈 2.0, java 1.6, java 1.7, 권장 버전

---

### [XLS-0688] IBSheet7에서 서버 사이드 엑셀 다운로드로 만든 파일에 DRM을 적용할 수 있나요?

**질문**

- IBSheet7에서 서버 사이드 엑셀 다운로드 기능으로 엑셀 파일에 DRM을 적용할 수 있나요? 어떤 방식으로 적용하나요?

**답변**

기존 서블릿 파일을 참고하여 서버에서 동작할 컨트롤러를 구현하고, 다운로드1이 아닌 다운로드2 방식에서 DRM 설정을 하여 사용할 수 있습니다.

**키워드**: DRM, 서버 사이드 엑셀 다운로드, 서블릿, 컨트롤러, 다운로드2

---

### [XLS-0689] 다운로드한 엑셀 파일에 인쇄 설정을 적용할 수 있나요? 버전 제한이 있나요?

**질문**

- 다운로드한 엑셀 파일에 인쇄 설정을 적용하고 싶습니다. 가능한가요?

**답변**

서버모듈에는 인쇄 설정을 하는 기능이 있습니다. 다만 사용 중인 제품 버전이 너무 낮으면 지원되지 않습니다.

**키워드**: 엑셀 인쇄 설정, 서버모듈, 버전 제한, 엑셀 페이지 설정

---

### [XLS-0690] Down2Excel에서 ReportXMLUrl로 지정한 엑셀 리포트 양식이 반영되지 않는 이유

**질문**

- Down2Excel에서 ReportXMLURL로 JSP로 만든 XML 페이지를 지정했는데 엑셀 다운로드 시 설정한 XML이 반영되지 않습니다. 원인이 무엇인가요?
- 정의해 둔 엑셀 리포트 양식으로 다운로드하려면 Down2Excel에서 무엇을 설정하나요?
- 이전 ActiveX에서 쓰던 ReportXML을 엑셀 다운로드에 설정했는데 동작하지 않습니다. ReportXMLURL에 파라미터를 붙여 넘길 때 무엇을 확인하나요?

**답변**

엑셀 리포트 양식으로 다운로드하려면 `Down2Excel`에서 `ReportXMLUrl`을 설정합니다. 엑셀 리포트 작업은 매뉴얼의 6.4장을 참고합니다. 설정했는데도 XML이 반영되지 않으면 다음을 확인합니다.

- JSP로 XML 페이지를 만든 경우 xml 선언부(`<?xml version='1.0' encoding='UTF-8' standalone='no'?>`)가 맨 첫 줄에 있어야 합니다. `<%@page ...%>` 지시문을 먼저 쓰고 xml 선언부를 그 뒤에 두면 XML이 반영되지 않을 수 있습니다.
- `ReportXMLURL`에 파라미터를 붙여 넘길 때 param 앞에 `?`가 빠져 있으면 문제가 되므로, param 앞에 `?`를 넣어 수정합니다.

**키워드**: ReportXMLUrl, ReportXMLURL, 엑셀 리포트 양식, 리포트 XML, xml 선언부, Down2Excel

---

### [XLS-0691] Down2Excel의 ExcelRowHeight를 바꿔도 엑셀 행 높이가 적용되지 않는 이유

**질문**

- Down2Excel의 ExcelRowHeight 값을 변경해도 엑셀 행 높이가 적용되지 않습니다. reportXML을 쓰는 경우 어떻게 하나요?
- Down2Excel에서 TempFile(템플릿 파일)에 설정한 행 높이가 적용되지 않고 무시됩니다. 매뉴얼과 다르게 동작하는 것인가요?

**답변**

`ExcelRowHeight`가 엑셀에 적용되지 않는 경우는 사용 방식에 따라 원인이 다릅니다.

- reportXML을 사용하는 환경(서버모듈 1.0): 엑셀 리포트의 `RowHeight` 요소에 값을 설정해야 합니다.
- `TempFile`(템플릿 파일)을 사용하는 경우: `TempFile`에 설정한 행 높이를 적용하는 기능은 구현되어 있지 않아 무시됩니다. 매뉴얼의 `ExcelRowHeight` 관련 설명이 잘못되어 있으며, 기능을 추가하려면 전체적인 설계 변경이 필요해 지원이 어렵습니다.

**적용 버전**: reportXML 사용 시 서버모듈 1.0

**키워드**: ExcelRowHeight, RowHeight, reportXML, TempFile, 엑셀 행 높이, Down2Excel

---

### [XLS-0692] 엑셀 다운로드 시 디자인과 파일명이 적용되지 않을 때 어떤 옵션을 쓰나요?

**질문**

- 엑셀 다운로드를 했더니 디자인 적용과 파일명 적용이 되지 않습니다. 이 증상은 어떤 옵션으로 처리하나요?

**답변**

엑셀 다운로드에서 디자인과 파일명이 적용되지 않는 증상은 `multipart:0` 옵션으로 처리할 수 있습니다.

**키워드**: multipart:0, multipart, 엑셀 다운로드, 파일명 미적용, 디자인 미적용

---

### [XLS-0693] Down2Excel에서 TitleAlign을 left로 설정해도 가운데 정렬로 나오는 이유

**질문**

- Down2Excel에서 TitleAlign을 left로 설정했는데 엑셀 헤더 부분이 가운데 정렬로 나옵니다. 왜 그런가요?
- Down2Excel에서 TitleText와 함께 TitleAlign을 left로 설정했는데도 제목이 기본값인 가운데 정렬로 다운로드됩니다. 원인이 무엇인가요?

**답변**

`TitleAlign`이 적용되지 않는 원인은 두 가지입니다.

- `TitleAlign`은 `TitleText`를 설정한 경우에만 동작하는 인자입니다. 시트 헤더 행의 정렬과는 무관하므로 헤더 행의 정렬은 이 인자로 바뀌지 않습니다.
- 사용 중인 서버모듈 버전이 `TitleAlign`을 지원하지 않는 버전이면 적용되지 않습니다. 1.1.26 버전에서는 `TitleAlign`이 지원되지 않아 버전 업그레이드가 필요하며, 2.x 최신 버전으로 2.1.5가 배포되었습니다.

**적용 버전**: 1.1.26 미지원, 2.1.5 배포

**키워드**: TitleAlign, TitleText, Down2Excel, 엑셀 제목 정렬, 헤더 정렬, 서버모듈 버전

---

### [XLS-0694] Down2Excel의 TempFile로 미리 만든 엑셀 서식 파일에 시트 데이터를 채워 내려받으려면?

**질문**

- 엑셀 다운로드 시 템플릿 엑셀 파일에 시트 데이터를 채워 넣으려면 어떻게 하나요?
- Down2Excel로 엑셀을 내려받을 때 미리 만들어 둔 엑셀 파일의 지정한 위치에 시트 데이터를 넣어서 받을 수 있나요? 어떤 속성을 쓰나요?
- TempFile을 쓸 때 startCol, startRow는 템플릿의 어느 위치부터 적용되나요?
- 엑셀 다운로드 시 기존에 있는 서식 파일에 데이터를 써서 내려받으려면 어떤 옵션과 조건이 필요한가요?

**답변**

`Down2Excel()`의 `TempFile` 속성으로 템플릿 엑셀을 지정하면, 미리 준비된 엑셀 파일의 지정한 위치에 시트 데이터를 append합니다.

- `TempFile`: 템플릿 엑셀의 경로와 파일명을 지정합니다.
- `startCol`, `startRow`: 템플릿 파일 안에서 시트로부터 전달받은 데이터를 쓰기 시작할 컬럼과 행 번호입니다. 엑셀 다운로드 시 파라미터로 함께 지정해야 합니다. Title 영역을 함께 쓰려면 둘 다 0으로 설정하는 것이 맞을 것으로 보입니다.
- `TempRoot`: `TempFile`이 들어갈 폴더를 `Down2Excel.jsp`에서 `TempRoot`로 지정해야 합니다. 예제의 `Down2Excel.jsp`에는 Template excel 파일 경로를 지정하도록 되어 있습니다.
사용하는 시트 버전(`ibsheet.js` 또는 `ibsheet7.jar` 버전)에 따라 이 기능을 쓸 수 있거나 없을 수 있습니다. 데이터를 채운 이후 엑셀의 pivot 기능을 실행하는 방법은 확인되지 않았습니다.

**키워드**: TempFile, startRow, startCol, TempRoot, Down2Excel.jsp, 템플릿 엑셀

---

### [XLS-0695] Down2Excel 템플릿(TempFile) 경로는 어떻게 지정하고, 다운로드가 안 될 때 무엇을 확인하나요?

**질문**

- Down2Excel의 템플릿 기능을 사용할 때 템플릿 파일 경로를 어떻게 지정해야 하나요?
- Down2Excel로 템플릿 파일을 이용해 엑셀을 다운로드하도록 설정했는데 다운로드가 되지 않습니다. 무엇을 확인해야 하나요?
- DirectDown2Excel 사용 시 TempFile 속성과 setTempRoot는 어떤 관계인가요? xlsx에서도 동작하나요?
- Down2ExcelBuffer로 시트 두 개를 내려받으며 TempFile 속성을 지정했는데 의도한 모양으로 다운로드되지 않습니다.

**답변**

템플릿 파일은 서버 jsp에서 `setTempRoot`로 설정한 경로와 요청 시 `TempFile`로 보낸 파일명을 조합한 경로에서 찾습니다. 경로가 맞지 않으면 다운로드가 되지 않거나 의도한 모양으로 내려오지 않으므로 다음을 확인합니다.

- 템플릿 경로는 WAS Root로 시작하는 절대경로로 지정해야 합니다.
- `TempFile` 속성에는 파일명을 지정하고, 그 파일이 위치한 경로는 `Down2Excel`의 `setTempRoot`에서 지정합니다. `setTempRoot`에 설정한 경로에 TEMPLATE 파일이 있어야 합니다.
- 현재 템플릿은 xls에서만 정상 동작하며, xlsx에서는 동작하지 않는 부분이 있습니다.

**키워드**: TempFile, setTempRoot, 템플릿 경로, WAS Root, DirectDown2Excel, Down2ExcelBuffer

---

### [XLS-0696] 닷넷 환경에서 Down2Excel 템플릿(TempFile)이 적용되지 않을 때 tempPath는 어떻게 설정하나요?

**질문**

- 닷넷 환경에서 Down2Excel 템플릿을 사용해 엑셀에 로고 등을 넣으려는데 잘 적용되지 않습니다. 어떤 설정이 필요한가요?

**답변**

닷넷 환경에서는 다음 설정이 필요합니다.

- `Down2Excel.aspx`의 `tempPath`는 드라이브를 포함한 물리적 경로여야 합니다.
- `Down2Excel()`의 `TempFile`에는 템플릿으로 사용할 파일명을 넣어야 합니다.
- 템플릿 파일은 DRM이 해지된 파일이어야 합니다.

**키워드**: tempPath, Down2Excel.aspx, TempFile, 닷넷 엑셀 템플릿, DRM, 물리적 경로

---

### [XLS-0697] TempFile로 현재 날짜 같은 데이터를 원하는 위치에 넣거나 TitleText에 배경색을 줄 수 있나요?

**질문**

- Down2Excel 엑셀 다운로드에서 TempFile 기능으로 현재 날짜나 다른 데이터를 원하는 위치에 넣거나, TitleText에 배경 색상을 줄 수 있나요?

**답변**

지원되지 않습니다. `TempFile` 기능으로 현재 날짜나 다른 데이터를 원하는 위치에 넣는 기능과 `TitleText`에 배경 색상을 주는 기능은 제공되지 않습니다. 필요하면 `DirectDown2Excel`을 호출하고 해당 서버 페이지에서 제공 jar 대신 POI를 이용해 엑셀을 직접 구현한 사례가 있습니다.

**키워드**: TempFile, TitleText, DirectDown2Excel, POI, 배경 색상, 엑셀 직접 구현

---

### [XLS-0698] TempFile 방식으로 엑셀을 다운로드할 때 셀에 Border(테두리)를 적용할 수 있나요?

**질문**

- TempFile 방식으로 엑셀을 다운로드할 때 셀에 Border(테두리)를 적용하고 싶습니다. 옵션이 있나요?

**답변**

Border를 적용하는 내부 옵션은 검토되었으나 제품 기능 취지에 어긋나 추가되지 않았으므로 옵션으로는 지원되지 않습니다. 대안으로 `Down2Excel.jsp`에서 다운로드 시점에 파일을 서버에 저장한 뒤 그 파일로 workbook 객체를 생성하여 원하는 스타일을 지정할 수 있습니다. `Down2Excel.jsp`의 STEP1, STEP2 주석 부분을 참고합니다.

**키워드**: TempFile, Border, 테두리, Down2Excel.jsp, workbook, STEP1

---

## 버전 업그레이드·수정 이력

### [XLS-0699] 엑셀 다운로드 시 빈 날짜 셀(Type:Date, Format:Ymd)이 undefined로 표시되는 현상은 어느 버전에서 해결되나요?

**질문**

- 날짜 컬럼 값이 비어 있을 때 엑셀로 다운로드하면 빈 값 대신 undefined로 표시됩니다. 빈 값으로 나오게 하려면 어떻게 해야 하나요?
- Type이 Date이고 Format이 Ymd인 컬럼의 셀이 비어 있을 때 엑셀로 다운로드하면 undefined로 내려받아집니다. 해결된 버전이 있나요?

**답변**

빈 날짜 데이터(Type:Date, Format:Ymd 컬럼의 빈 셀)를 엑셀로 다운로드할 때 undefined로 표시되는 현상은 클라이언트 모듈 `ibexcel.js` 7.0.0.43-20240926-15 버전에서 수정되었습니다. 7.0.0.43 이전 버전(예: 7.0.0.41)을 사용 중이라면 해당 버전 이상의 클라이언트 모듈(`ibexcel.js`)로 교체합니다.

**적용 버전**: 7.0.0.43-20240926-15에서 수정

**키워드**: undefined, ibexcel.js, Type:Date, Format:Ymd, 빈 날짜, 7.0.0.43

---

### [XLS-0700] Format:Hm 컬럼을 클라이언트 모듈로 엑셀 다운로드하면 0.undefined로 출력되는 현상

**질문**

- Type:Text, Format:Hm으로 00:00 형태로 표시되는 컬럼을 클라이언트 모듈로 엑셀 다운로드하면 값이 0.undefined로 출력됩니다. 해결 방법이 있나요?

**답변**

클라이언트 모듈로 엑셀을 다운로드할 때 발생하는 현상으로, 클라이언트 모듈 7.0.0.33-20210504-18 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.0.33-20210504-18에서 수정

**키워드**: Format:Hm, 0.undefined, 클라이언트 모듈, 7.0.0.33-20210504-18

---

### [XLS-0701] 클라이언트 모듈 엑셀 다운로드 오류(필터행, TrueValue/FalseValue, IE 다운로드 불가) 수정 버전

**질문**

- 클라이언트 모듈 엑셀 다운로드에서 필터행을 사용하거나 체크 컬럼에 TrueValue, FalseValue를 사용할 때 오류가 납니다. 수정된 버전이 있나요?
- 클라이언트 모듈 엑셀 다운로드가 Chrome에서는 되는데 IE 등 다른 브라우저에서는 되지 않습니다. 어떻게 해결하나요?

**답변**

클라이언트 모듈 수정 내역입니다.

- ibsheet.js 7.0.13.66-20161012-16 버전에서 엑셀 다운로드 시 Format(날짜, 주민, 우편 등) 처리가 변경되었고, 필터행 사용 시 오류와 체크 컬럼에 `TrueValue`, `FalseValue` 사용 시 오류가 수정되었습니다.
- IE에서 다운로드가 되지 않는 오류는 ibexcel.js의 중복된 변수 처리 때문에 발생했으며, ibsheet.js 7.0.13.66-20161012-16과 ibexcel.js 7.0.0.1-20161012-17 파일로 교체하면 수정됩니다.

**적용 버전**: ibsheet.js 7.0.13.66-20161012-16, ibexcel.js 7.0.0.1-20161012-17에서 수정

**키워드**: TrueValue, FalseValue, 필터행, ibexcel.js, 7.0.13.66-20161012-16, 7.0.0.1-20161012-17, IE

---

### [XLS-0702] 클라이언트 모듈 Down2Excel에서 SetSubSumBackColor로 바꾼 소계행 색이 엑셀에 반영되지 않을 때

**질문**

- 클라이언트 모듈로 Down2Excel을 사용할 때 SetSubSumBackColor로 바꾼 소계행 색이 화면에는 보이지만 엑셀에는 반영되지 않습니다. 해결된 버전이 있나요?

**답변**

해당 문제는 클라이언트 모듈 7.0.13.215-20230330-1127-M 버전에서 수정되었으며, 해당 버전으로 교체하면 됩니다.

**적용 버전**: 7.0.13.215-20230330-1127-M에서 수정

**키워드**: SetSubSumBackColor, Down2Excel, 소계행, 클라이언트 모듈, 7.0.13.215-20230330-1127-M

---

### [XLS-0703] 클라이언트 모듈 엑셀 다운로드에서 헤더 병합과 틀고정이 함께 있으면 행이 누락되는 현상

**질문**

- 클라이언트 모듈로 엑셀을 다운로드할 때 헤더 병합과 틀고정이 함께 있으면 행이 누락됩니다. 어느 버전에서 해결되나요?

**답변**

헤더 병합과 틀고정이 함께 있을 때 엑셀 다운로드에서 행이 누락되는 증상은 IBSheet7 7.0.13.114 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.114에서 수정

**키워드**: 헤더 병합, 틀고정, 행 누락, 클라이언트 모듈, 7.0.13.114

---

### [XLS-0704] 엑셀 다운로드에서 트리 모양 표현과 틀고정을 지원하는 버전(클라이언트·서버모듈)

**질문**

- 엑셀 다운로드 시 트리 모양으로 내려받고 싶은데 POI 업그레이드가 어려운 환경입니다. 클라이언트 모듈에서는 사용이 불가능한가요?
- 엑셀 다운로드에서 트리 구조 표현이나 틀고정 기능을 지원하나요? 클라이언트모듈과 서버모듈별로 어느 버전부터 지원하나요?

**답변**

클라이언트 모듈 엑셀 다운로드의 트리 기능과 클라이언트모듈·서버모듈 엑셀 다운로드의 틀고정 기능은 7.0.13.217-20230511-1605-M 버전에서 추가되었습니다. 클라이언트 모듈의 트리 모양 엑셀 다운로드는 ibsheet.js 7.0.13.217-20230511-1605, ibexcel.js 7.0.0.37-20230511-16 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: ibsheet.js 7.0.13.217-20230511-1605(-M), ibexcel.js 7.0.0.37-20230511-16부터

**키워드**: 트리, 틀고정, 7.0.13.217-20230511-1605-M, ibexcel.js, 7.0.0.37-20230511-16, 클라이언트 모듈

---

### [XLS-0705] DirectDown2Excel이 클라이언트 모듈에서 동작하지 않는 현상(7.0.13.104부터)

**질문**

- DirectDown2Excel이 클라이언트 모듈(client module)에서 동작하지 않습니다. 7.0.13.103까지는 정상이다가 7.0.13.104부터 발생합니다. 해결 버전이 있나요?

**답변**

7.0.13.104 버전부터 발생한 것으로 보이는 문제로, IBSheet7 7.0.13.120-20180615-18 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.104부터 발생, 7.0.13.120-20180615-18에서 수정

**키워드**: DirectDown2Excel, 클라이언트 모듈, 7.0.13.104, 7.0.13.120-20180615-18

---

### [XLS-0706] 2행 헤더에서 같은 이름의 하위 헤더가 반복될 때 HeaderMatch 업로드 값이 엉뚱한 영역에 적용되는 현상

**질문**

- 그룹 헤더(전/후) 아래에 같은 이름의 하위 헤더가 반복되는 2행 헤더 시트에서 HeaderMatch로 LoadExcel하면 값이 엉뚱한 영역에 적용됩니다. 해결 방법이 있나요?

**답변**

해당 문제는 서버모듈 1.1.44에서 해결되었습니다. 다만 ibsheet.js 1.0.0.0 버전에서는 LoadExcel() 동작 시 SheetId가 누락되어 데이터 바인딩이 되지 않으므로, 제품(ibsheet.js)과 서버모듈을 함께 업그레이드해야 합니다.

**적용 버전**: 서버모듈 1.1.44에서 수정

**키워드**: HeaderMatch, LoadExcel, 서버모듈 1.1.44, SheetId, 2행 헤더

---

### [XLS-0707] loadExcel 업로드 시 날짜 타입 컬럼이 첫 행만 입력되는 현상

**질문**

- loadExcel로 엑셀을 업로드할 때 날짜 타입 컬럼 데이터가 첫 번째 행만 입력되고 나머지 행은 입력되지 않습니다. 원인과 해결 방법이 있나요?

**답변**

서버모듈 ibsheet7-1.1.51.jar를 사용할 때 발생한 증상이며, ibsheet7-1.1.69.jar로 업그레이드하면 정상 동작합니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.51.jar에서 발생, ibsheet7-1.1.69.jar에서 정상

**키워드**: loadExcel, ibsheet7-1.1.51.jar, ibsheet7-1.1.69.jar, 날짜 타입, 서버모듈

---

### [XLS-0708] 여러 시트에서 LoadExcel 연속 실행 시 Cannot read properties of undefined (reading 'FA') 오류

**질문**

- top window의 레이어 팝업 시트와 iframe 시트가 있을 때 iframe 시트에서 LoadExcel 실행 후 레이어 시트에서 LoadExcel을 실행하면 Cannot read properties of undefined (reading 'FA') 오류가 납니다.

**답변**

해당 증상은 IBSheet7 7.0.13.293 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.293에서 수정

**키워드**: LoadExcel, reading 'FA', iframe, 레이어 팝업, 7.0.13.293

---

### [XLS-0709] LoadExcel로 가져온 데이터는 정상 수신되는데 시트에는 조회된 데이터가 없다고 나올 때

**질문**

- LoadExcel로 가져온 데이터는 정상 수신되는데 시트에는 조회된 데이터가 없다고 로드됩니다. 어떻게 해결하나요?

**답변**

해당 현상은 ibsheet.js 7.0.13.73-20161229-13, ibexcel.js 7.0.0.8-20161215-10 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: ibsheet.js 7.0.13.73-20161229-13, ibexcel.js 7.0.0.8-20161215-10에서 수정

**키워드**: LoadExcel, ibexcel.js, 7.0.13.73-20161229-13, 7.0.0.8-20161215-10

---

### [XLS-0710] LoadExcel 후 행을 추가하면 바로 위 행의 다중 selectBox 값이 지워지는 현상

**질문**

- LoadExcel로 엑셀 파일을 업로드한 뒤 행을 추가하면 바로 위 행의 다중 selectBox 값이 지워집니다. 해결 버전이 있나요?

**답변**

해당 증상은 IBSheet7 7.0.13.199-20220308-1501 버전 배포로 처리되었으므로 해당 버전 이상으로 교체합니다.

**적용 버전**: 7.0.13.199-20220308-1501에서 수정

**키워드**: LoadExcel, selectBox, 행 추가, 7.0.13.199-20220308-1501

---

### [XLS-0711] IE9 호환성 보기(쿼크모드)에서 한글 헤더 엑셀을 LoadExcel하면 처리중 이미지만 뜨는 현상

**질문**

- IE9 호환성 보기(쿼크모드)에서 한글 텍스트 헤더의 엑셀을 LoadExcel로 올리면 처리중 이미지만 뜨고 데이터가 올라가지 않습니다. 해결된 버전이 있나요?

**답변**

IE9 호환성 보기(쿼크모드)에서 한글 텍스트 헤더인 경우 LoadExcel 시 처리중 이미지만 표시되고 데이터가 올라가지 않는 현상은 IBSheet7 7.0.13.22-20150909-17 버전에서 처리되었습니다.

**적용 버전**: 7.0.13.22-20150909-17에서 수정

**키워드**: LoadExcel, IE9, 쿼크모드, 한글 헤더, 7.0.13.22-20150909-17

---

### [XLS-0712] IE7 이하에서 LoadExcel 결과 데이터({data:[[...]]})가 시트에 표시되지 않는 현상

**질문**

- LoadExcel 할 때 데이터가 {data:[[{...}]]} 형태로 묶이는데 IE7 이하에서는 이렇게 묶으면 데이터가 시트에 표시되지 않습니다. 해결된 버전이 있나요?

**답변**

LoadExcel 결과 데이터가 묶이는 형태 때문에 IE7 이하에서 시트에 데이터가 표시되지 않는 증상은 서버모듈 ibsheet7-1.1.17.jar 배포로 처리되었습니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.17.jar

**키워드**: LoadExcel, IE7, ibsheet7-1.1.17.jar, 서버모듈

---

### [XLS-0713] 트리 시트가 포함된 화면에서 LoadExcel 시 진행 중 이미지가 계속 표시되고 데이터가 나오지 않을 때

**질문**

- 트리 시트가 포함된 화면(시트 1개 이상)에서 LoadExcel을 하면 진행 중 이미지가 계속 표시되고 화면에 아무것도 나오지 않습니다. 일반 화면은 정상입니다.

**답변**

트리가 포함된 화면에서 LoadExcel 시 진행 중 이미지가 계속 표시되고 데이터가 나오지 않는 증상은 1.1.23 버전 배포로 처리되었습니다.

**적용 버전**: 1.1.23에서 수정

**키워드**: LoadExcel, 트리, 진행 중 이미지, 1.1.23

---

### [XLS-0714] 서버모듈 2.0.50에서 병합된 영역이 있는 엑셀을 LoadExcel하면 최상단 데이터만 들어가는 현상

**질문**

- 서버모듈 2.0.50에서 병합된 영역이 있는 엑셀을 LoadExcel로 올리면 병합 영역에 최상단 데이터만 들어갑니다. 1.0 대에서는 동일하게 들어갔습니다.

**답변**

서버모듈 1.0 대에서는 병합된 영역에 데이터가 동일하게 들어갔지만 2.0.50에서는 최상단 데이터만 들어가는 현상이 있었습니다. 해당 증상은 서버모듈 2.0.51 버전 배포로 처리되었습니다.

**적용 버전**: 서버모듈 2.0.50에서 발생, 2.0.51에서 수정

**키워드**: LoadExcel, 병합 영역, 서버모듈 2.0.51, 2.0.50

---

### [XLS-0715] JEUS 업그레이드 및 Java 1.6에서 1.8로 변경 후 LoadExcel 오류(InputStream 데이터 잘림)

**질문**

- JEUS를 업그레이드하고 Java를 1.6에서 1.8로 바꾼 뒤부터 LoadExcel 시 오류가 발생합니다. 어떻게 해결하나요?

**답변**

JEUS 환경에서 InputStream의 데이터가 잘려서 들어가는 현상에 대한 패치가 1.1.38 버전에서 이루어졌습니다. 같은 현상이면 해당 패치가 반영된 버전을 적용해 볼 수 있습니다.

**적용 버전**: 1.1.38에서 패치

**키워드**: LoadExcel, JEUS, InputStream, Java 1.8, 1.1.38

---

### [XLS-0716] LoadExcel의 Append 속성이 적용되지 않을 때 지원 버전

**질문**

- LoadExcel에서 Append 속성을 사용하려는데 적용되지 않고 동작하지 않습니다. 이 속성은 어느 버전부터 지원되며 무엇을 교체해야 하나요?

**답변**

LoadExcel의 Append 속성은 20130528 이후 버전에서 지원됩니다. 그보다 이전 버전의 js와 jsp를 사용 중이라면 20130528 이후 버전의 js와 jsp 파일로 교체합니다.

**적용 버전**: 20130528 이후

**키워드**: LoadExcel, Append, 20130528, js, jsp

---

### [XLS-0717] SheetAX의 LoadExcel2 함수가 IBSheet7에 없을 때 대체 방법

**질문**

- SheetAX에서 IBSheet7으로 전환 중인데 기존 LoadExcel2 함수가 IBSheet7에는 없습니다. 변경된 것인가요? 어떤 함수로 대체하나요?

**답변**

`LoadExcel2`는 LoadExcel()의 startExcelRow, endExcelRow 관련 오류 때문에 만들어진 함수로 기능이 LoadExcel과 동일합니다. IBSheet7에는 없으므로 API 명을 `LoadExcel`로 바꿔 사용합니다.

**키워드**: LoadExcel2, LoadExcel, SheetAX, startExcelRow, endExcelRow

---

### [XLS-0718] MS Office를 2007에서 2013으로 올려도 Down2Excel, LoadExcel에 문제가 없나요?

**질문**

- MS Office 버전을 2007에서 2013으로 올릴 계획인데 IBSheet7의 Down2Excel과 LoadExcel 사용에 문제가 없나요?

**답변**

MS Office 버전을 2007에서 2013으로 올려도 IBSheet7의 `Down2Excel`, `LoadExcel` 기능에는 이상이 없습니다.

**키워드**: Down2Excel, LoadExcel, Office 2007, Office 2013, 호환

---

### [XLS-0719] 엑셀 다운로드 파일에 암호를 설정하려면 어떤 버전과 속성(workbookPassword)이 필요한가요?

**질문**

- 엑셀 다운로드 시 파일에 암호(패스워드)를 설정하려면 서버모듈·POI·ibsheet.js가 각각 어떤 버전 이상이어야 하고 어떤 속성을 지정해야 하나요?
- 엑셀 다운로드 시 파일에 암호를 걸 수 있는 ibsheet.js 버전이 필요합니다. 구버전 IBSheet7을 쓰고 있는데 어떤 버전으로 올려야 하나요?
- 서버모듈이 1점대(ibsheet7-1.x.x.jar)일 때 엑셀 다운로드 파일에 암호를 설정하려면 Down2Excel.jsp를 어떻게 수정하나요?

**답변**

엑셀 암호화는 POI 3.10 이상을 사용하면서 서버모듈 1.1.76 또는 서버모듈 2.0.36 이상을 설치한 시스템에서 사용할 수 있습니다. 암호는 `workbookPassword` 속성으로 설정하며, 이 속성은 2015년 이후 버전부터 지원되므로 7.0.13.XX 버전이면 사용 가능합니다. 정확한 버전은 ibsheet.js 상단 주석으로 확인합니다.

- 서버모듈 `ibsheet7-1.1.76-3.10.jar`에 맞는 ibsheet.js는 7.0.13.57 버전입니다. 서버모듈도 함께 올려야 하므로 이왕이면 최신 버전으로 올리는 편이 낫습니다.
- 서버모듈 사용 방법은 버전에 따라 다르며, 1점대는 `ibsheet7-1.x.x.jar`, 2점대는 `ibsheet7-2.x.x.jar`입니다. 1점대에서 POI 3.10(엑셀 암호 기능 구현 버전)을 사용할 때는 `Down2Excel.jsp`의 `workbook.write(out2);`를 주석 처리하고, 그 아래 주석 처리된 `ProtectXLSX.encryptXLSX(...)` 코드로 대체합니다.

**적용 버전**: POI 3.10 이상, 서버모듈 1.1.76 또는 2.0.36 이상, ibsheet.js 7.0.13.57(서버모듈 ibsheet7-1.1.76-3.10.jar 기준)

**키워드**: workbookPassword, 엑셀 암호 설정, POI 3.10, ProtectXLSX, Down2Excel.jsp, ibsheet7-1.1.76-3.10.jar, 7.0.13.57

---

### [XLS-0720] Down2Excel·DirectDown2Excel로 4만 건을 다운로드하면 OutOfMemory가 발생하는 이유와 해결 방법은?

**질문**

- Down2Excel이나 DirectDown2Excel로 40,000건, 10개 컬럼을 엑셀 다운로드하면 OutOfMemory가 발생하며 다운로드되지 않습니다. 어떻게 해결하나요?

**답변**

구버전(ibsheet.js 7.0.0.0-20140731, 서버모듈 1.1.36)에서 `Down2Excel`과 `DirectDown2Excel` 모두 동일하게 발생한 사례입니다. 최신 버전(ibsheet, 서버모듈 2.0)으로 업그레이드하는 것이 가장 좋고, 여의치 않으면 서버모듈을 1.1.7x 대로 올리면 됩니다.

**적용 버전**: 서버모듈 2.0 또는 1.1.7x 이상

**키워드**: OutOfMemory, Down2Excel, DirectDown2Excel, 서버모듈 업그레이드, 대용량 엑셀 다운로드

---

### [XLS-0721] 엑셀 다운로드 시 컬럼이 많으면 셀 스타일이 일부 적용되지 않을 때 서버모듈 jar만 업그레이드해도 되나요?

**질문**

- 엑셀 다운로드 시 컬럼이 많으면 셀 스타일이 정상적으로 적용되지 않습니다. 서버모듈 jar만 업그레이드하려는데 ibsheet.js 버전이 아주 오래되었습니다. 어떻게 해야 하나요?

**답변**

증상 해결을 위해 서버모듈 jar를 업그레이드하더라도, 코어 `ibsheet.js` 버전이 너무 낮으면 jar만 업그레이드할 수 없습니다. `ibsheet.js`와 jar를 함께 최신으로 올려야 하며, 대상 버전은 `ibsheet.js` 7.0.13.207-20220920-1022, 서버모듈 jar 1.1.125입니다.

**적용 버전**: ibsheet.js 7.0.13.207-20220920-1022, 서버모듈 jar 1.1.125

**키워드**: 셀 스타일 미적용, ibsheet.js 업그레이드, 서버모듈 jar 1.1.125, 7.0.13.207-20220920-1022, 컬럼 많을 때 스타일

---

### [XLS-0722] IBSheet7 서버모듈 2.x와 IBSheet8 서버모듈을 한 프로젝트에서 함께 쓰면 어떤 문제가 생기나요?

**질문**

- 한 프로젝트에서 IBSheet7과 IBSheet8을 함께 쓰면 엑셀 다운로드·업로드 시 어느 서버모듈 jar가 사용되는지 모호하다는데, 무슨 문제인가요?

**답변**

IBSheet7 서버모듈 2.x와 IBSheet8 서버모듈은 클래스명이 동일해서, 두 jar를 함께 두면 다운로드·업로드 시 어느 jar가 사용될지 알 수 없습니다. 의도와 다른 jar가 사용되면 오류가 생길 수 있습니다.

**키워드**: IBSheet8 서버모듈, 클래스명 중복, 서버모듈 2.x, jar 충돌, 엑셀 다운로드 업로드

---

### [XLS-0723] 서버모듈이 남기는 쿠키에 만료 기간이 있나요? 서버모듈 버전별로 어떻게 다른가요?

**질문**

- 서버모듈 사용 시 남는 쿠키 값에 만료 기간이 있나요? 서버모듈 버전별로 차이가 있는지 궁금합니다.

**답변**

서버모듈 1.0은 1.1.134.jar에서 쿠키 만료기간이 추가되었고 그 전까지는 만료일이 없었습니다. 서버모듈 2.0은 만료일이 있으며, 정확하지는 않지만 약 한 시간 정도로 알려져 있습니다.

**적용 버전**: 서버모듈 1.1.134.jar에서 쿠키 만료기간 추가

**키워드**: 서버모듈 쿠키, 쿠키 만료 기간, 1.1.134.jar, 서버모듈 2.0, 쿠키 만료일

---

### [XLS-0724] 엑셀 다운로드 시 setExcelDownLoadHeader·setCellWidth 예외나 nullpoint 오류가 나면 어느 버전으로 올리나요?

**질문**

- 엑셀 다운로드에서 xls 확장자 처리 중 Common.setExcelDownLoadHeader의 StringIndexOutOfBoundsException(String index out of range: -1)이 발생합니다. 수정된 버전은?
- 엑셀 다운로드 시 `Common.setCellWidth`에서 입력 문자열 `0-35`로 NumberFormatException이 발생합니다. ibsheet7-1.1.26.jar를 쓰는데 해결 방법이 있나요?
- 엑셀 다운로드 파일은 정상적으로 내려오는데 nullpoint 오류가 함께 나옵니다. 서버모듈 1.1.29를 사용 중인데 해결된 버전이 있나요?

**답변**

엑셀 다운로드 중 서버에서 나는 예외는 증상별로 다음 버전에서 처리되었습니다.

- xls 확장자 처리 중 `Common.setExcelDownLoadHeader`의 `StringIndexOutOfBoundsException`(String index out of range: -1): 1.1.133 버전 배포로 처리되었습니다.
- `Common.setCellWidth`에서 입력 문자열 `0-35`로 `NumberFormatException`이 발생하는 증상: IBSheet7 js 7.0.13.53 버전과 서버모듈 `ibsheet7-1.1.77.jar` 배포로 처리되었습니다(문의 당시 사용 중이던 jar는 `ibsheet7-1.1.26.jar`).
- 파일은 정상적으로 내려오지만 nullpoint 오류가 함께 나는 증상: IBSheet 7.0.0.0-20140703 버전과 서버모듈 1.1.31 배포로 처리되었습니다(사용 중이던 서버모듈은 1.1.29).
해당 증상이 나타나면 위 버전 이상을 적용합니다.

**적용 버전**: 1.1.133에서 수정; 7.0.13.53 및 ibsheet7-1.1.77.jar; 7.0.0.0-20140703 및 서버모듈 1.1.31

**키워드**: StringIndexOutOfBoundsException, setExcelDownLoadHeader, NumberFormatException, setCellWidth, nullpoint, 엑셀 다운로드 예외

---

### [XLS-0725] 엑셀 다운로드에서 ExcelFontSize를 10으로 지정하면 글꼴 크기가 12로 바뀌는 현상은 어느 버전에서 수정되나요?

**질문**

- 엑셀 다운로드에서 ExcelFontSize를 10으로 지정할 때만 글꼴 크기가 12로 바뀌고 6~9, 11은 정상입니다(xls 다운로드). 해결 버전이 있나요?

**답변**

`ExcelFontSize`를 10으로 지정하면 글꼴 크기가 12로 바뀌는 현상은 서버모듈 `ibsheet7-2.1.41.jar` 배포로 처리되었습니다.

**적용 버전**: ibsheet7-2.1.41.jar

**키워드**: ExcelFontSize, 글꼴 크기 12, xls 다운로드, ibsheet7-2.1.41.jar, 엑셀 폰트 크기

---

### [XLS-0726] 트리 시트를 엑셀로 다운로드할 때 트리 구조 반영 옵션을 false로 하면 기준 컬럼 앞에 ?가 붙는 현상은?

**질문**

- 트리 시트를 엑셀로 다운로드할 때 트리 구조 반영 옵션을 false로 하면 트리 기준 컬럼 값 앞에 ?가 붙어 글자가 깨집니다. 어느 버전에서 수정되었나요?

**답변**

트리 구조를 엑셀에 반영하는 옵션을 false로 했을 때 트리 기준 컬럼 앞에 ?가 붙는 현상은 서버모듈 `ibsheet7-2.1.42.jar`에서 수정되었습니다. 해당 버전을 적용하면 됩니다.

**적용 버전**: ibsheet7-2.1.42.jar에서 수정

**키워드**: 트리 엑셀 다운로드, 트리 구조 반영 옵션, 기준 컬럼 물음표, ibsheet7-2.1.42.jar, 글자 깨짐

---

### [XLS-0727] xlsx 형식으로 다운로드한 엑셀 파일을 열 때 복구 메시지가 뜨면 어떻게 해결하나요?

**질문**

- xlsx 형식으로 다운로드한 엑셀 파일을 열 때 복구 메시지가 뜹니다. 어떻게 해결하나요?

**답변**

xlsx 형식으로 다운로드한 엑셀 파일을 열 때 복구 메시지가 뜨는 증상은 `1.1.128.jar` 배포로 처리되었습니다. 해당 버전의 jar를 적용하면 됩니다.

**적용 버전**: 1.1.128.jar

**키워드**: xlsx 복구 메시지, 1.1.128.jar, 엑셀 열 때 복구, xlsx 다운로드

---

### [XLS-0728] 엑셀 다운로드 시 시트 이미지가 내려오지 않는 현상(jdk 1.4 환경)은 어느 서버모듈에서 해결되나요?

**질문**

- 엑셀 다운로드 시 시트 이미지가 내려오지 않습니다. jdk 1.4 환경에서 서버모듈 1.1.29를 사용 중인데 해결된 버전이 있나요?

**답변**

엑셀 다운로드 시 시트 이미지가 내려오지 않는 증상은 jdk 1.4용 서버모듈 `ibsheet7-1.1.32-1.4` 배포로 처리되었습니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.32-1.4

**키워드**: 시트 이미지 엑셀 다운로드, jdk 1.4, ibsheet7-1.1.32-1.4, 서버모듈 1.1.29, 이미지 미다운로드

---

### [XLS-0729] 엑셀 열이 많을 때 Excel 2016에서만 서식 오류가 나는 현상은 어느 서버모듈 버전에서 수정되나요?

**질문**

- 엑셀 열이 많아졌을 때 서식 오류가 발생합니다. 엑셀 2007에서는 오류가 없고 2016에서만 발생하는데, 수정된 버전이 있나요?

**답변**

엑셀 열이 많을 때 서식 오류가 발생하는 증상(엑셀 2007에서는 정상이고 2016에서만 발생)은 서버모듈 1.1.125 버전 배포로 처리되었습니다.

**적용 버전**: 서버모듈 1.1.125

**키워드**: 엑셀 열 많을 때 서식 오류, 엑셀 2016, 서버모듈 1.1.125, 엑셀 2007, 셀 서식

---

### [XLS-0730] 엑셀 저장 시 악센트가 붙은 영문자(외국인 이름 등)가 있으면 저장이 안 되는 문제는 어떻게 해결하나요?

**질문**

- 엑셀 저장 시 외국인 이름처럼 영문자 위에 악센트(`) 같은 기호가 붙은 특수문자가 포함되면 엑셀 파일 저장이 되지 않습니다. 해결 방법이 있나요?

**답변**

해당 증상은 서버모듈 패치 버전 `ibsheet7-1.1.91.jar` 배포로 처리되었습니다. 기존에 사용하던 `ibsheet7-1.1.67.jar`를 제거하고 패치 jar를 추가하는 방식으로 적용합니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.91.jar

**키워드**: 악센트 문자, 엑셀 저장 오류, 특수문자, ibsheet7-1.1.91.jar, ibsheet7-1.1.67.jar

---

### [XLS-0731] 엑셀리포트 XML의 Range에서 Col2를 End로 지정하면 오류가 나는 현상은 어느 서버모듈 jar에서 해결되나요?

**질문**

- 엑셀리포트 XML의 Range에서 Col2를 End로 지정하면 오류가 나고 숫자로 지정하면 오류가 나지 않습니다. 해결된 서버모듈 jar 버전이 있나요?

**답변**

해당 증상은 최신 서버모듈 jar에서는 정상 작동하는 것으로 보입니다. 기존 jar를 `ibsheet7-1.1.72.jar`로 교체한 뒤 확인해 보고, 그래도 문제가 있으면 추가 확인이 필요합니다.

**적용 버전**: ibsheet7-1.1.72.jar

**키워드**: 엑셀리포트 XML, Range End, Col2, ibsheet7-1.1.72.jar, 서버모듈 jar 교체

---

### [XLS-0732] 엑셀 업로드·다운로드 후 Temp 폴더에 임시 파일이 삭제되지 않고 쌓이는 현상은 어느 버전에서 수정되나요?

**질문**

- LoadExcel을 할 때 Temp 폴더에 파일이 쌓이는 현상이 있습니다. 서버모듈 1.1.24에서 발생했는데 해결된 버전이 있나요?
- 엑셀 다운로드 시 Temp 폴더에 poi-sxffs-sheet*.xml 같은 임시파일이 생성되고 삭제되지 않습니다. 해결 방법이 있나요?

**답변**

Temp 폴더에 임시 파일이 쌓이는 현상은 다음 버전에서 처리되었습니다.

- LoadExcel 시 Temp 폴더에 파일이 쌓이는 현상: 서버모듈 1.1.25에서 패치되었으나 1.1.32에서 다시 발생했고, IBSheet 7.0.0.0-20140724-16과 `ibsheet7-1.1.33.jar` 배포로 처리되었습니다(최초 발생 버전은 1.1.24).
- 엑셀 다운로드 시 `poi-sxffs-sheet*.xml` 같은 임시파일이 생성되고 삭제되지 않는 현상: 서버모듈 1.1.70 버전에서 해결되었습니다.

**적용 버전**: 7.0.0.0-20140724-16, 서버모듈 1.1.33(업로드); 서버모듈 1.1.70(다운로드)

**키워드**: Temp 폴더 파일 쌓임, poi-sxffs-sheet, ibsheet7-1.1.33.jar, 서버모듈 1.1.70, LoadExcel 임시파일

---

### [XLS-0733] 엑셀 로드 시 헤더 매핑이 맞지 않아 데이터가 올라오지 않는 경우(머지 헤더·헤더 순서·헤더 깨짐)는 어떻게 하나요?

**질문**

- 머지된 헤더 행이 있는 시트에 엑셀을 로드하면 데이터가 올라가지 않습니다. 서버모듈 버전에 따라 헤더 매칭 방식이 다른가요?
- 엑셀 로드 시 헤더 매핑으로 올리는데 엑셀의 헤더 순서가 시트와 달라(예: 시트는 가|나|다, 엑셀은 다|마|가) 정상적으로 로드되지 않습니다. 해결된 버전이 있나요?
- 엑셀 로드 시 데이터 행의 개수는 추가되는데 데이터가 표시되지 않습니다. 개발자도구 요청 본문에서 헤더 텍스트가 깨져 나와 헤더 매치가 안 됩니다. 해결된 버전이 있나요?

**답변**

헤더 매칭으로 엑셀을 로드할 때 데이터가 올라오지 않으면 증상별로 확인합니다.

- 머지된 헤더 행이 있는 시트: 서버모듈 1.1.31 기준에서는 맨 아래 헤더 텍스트를 기준으로 데이터가 올라갔지만, 최신 버전으로 오면서 모든 헤더 텍스트가 일치해야 엑셀 업로드가 됩니다.
- 엑셀의 헤더 순서가 시트와 달라 헤더 매핑 로드가 정상 동작하지 않는 증상: 서버모듈 `ibsheet7-1.1.36.jar` 배포로 처리되었습니다.
- 헤더 텍스트가 깨져 헤더 매치가 되지 않아 행만 추가되고 데이터가 표시되지 않는 증상(개발자도구 요청 본문에서 헤더 텍스트가 깨져 나옴): 서버모듈 `ibsheet7-1.1.11-sp.jar` 배포로 처리되었습니다.

**적용 버전**: 서버모듈 1.1.31 기준(맨 아래 헤더 기준), ibsheet7-1.1.36.jar, ibsheet7-1.1.11-sp.jar

**키워드**: 헤더 매치, 머지 헤더, 헤더 순서 다름, 헤더 텍스트 깨짐, ibsheet7-1.1.36.jar, ibsheet7-1.1.11-sp.jar, 엑셀 로드 데이터 미표시

---

### [XLS-0734] 엑셀 업로드 시 일부 컬럼 값이 올라오지 않거나 엑셀 컬럼 수가 시트보다 많을 때 문제는 어느 버전에서 수정되나요?

**질문**

- 헤더 매치로 엑셀을 로드하면서 일부 컬럼만 매치하는데, 히든 컬럼보다 뒤쪽에 있는 컬럼은 로드되지 않습니다. 앞쪽으로 옮기면 로드됩니다. 어떻게 해결하나요?
- 엑셀 업로드를 하는데 딱 한 컬럼의 값만 업로드되지 않습니다. 컬럼명이 중복되는 컬럼도 아닙니다. 서버모듈 2.1.18.jar에서 해결된 버전이 있나요?
- Java 17 환경에서 엑셀 업로드 시 엑셀 파일의 컬럼 수가 시트의 컬럼 수보다 많으면 문제가 발생합니다. 수정된 버전이 있나요?

**답변**

서버모듈 2.1.32 계열 배포에서 다음 증상이 처리되었습니다.

- 헤더 매치로 엑셀을 로드할 때 일부 컬럼만 매치하고 중간에 히든 컬럼이 있으면 히든 컬럼 뒤쪽 컬럼이 로드되지 않는 증상: `2.1.32.jar` 패치로 처리되었습니다.
- 컬럼명 중복이 아닌데 한 컬럼의 값만 엑셀 업로드가 되지 않는 증상: 서버모듈 `ibsheet7-2.1.18.jar`에서 발생했으며 `ibsheet7-2.1.32.jar` 배포로 처리되었습니다.
- Java 17 환경에서 엑셀 파일의 컬럼 수가 시트의 컬럼 수보다 많을 때 발생하는 업로드 문제: 서버모듈 `ibsheet7-2.1.32-jakarta.jar` 배포로 처리되었습니다.

**적용 버전**: 2.1.32.jar 패치, ibsheet7-2.1.32.jar, ibsheet7-2.1.32-jakarta.jar(Java 17)

**키워드**: 히든 컬럼 뒤 컬럼 미로드, 헤더 매치, 한 컬럼만 업로드 안 됨, ibsheet7-2.1.32.jar, ibsheet7-2.1.32-jakarta.jar, Java 17

---

### [XLS-0735] 엑셀 업로드 옵션(noheader·startrow·ColumnMapping)이 동작하지 않을 때 어느 jar 버전에서 수정되나요?

**질문**

- 엑셀 업로드 시 noheader, startrow:2 옵션을 사용하면 xls 확장자는 잘 되는데 xlsx는 잘 안 됩니다. 서버모듈 1.1.37.jar를 사용 중인데 해결된 버전이 있나요?
- 엑셀 업로드에서 ColumnMapping(순번 매칭)이 동작하지 않아 jar 버전을 낮춰 쓰고 있습니다. 어떤 버전에서 해결되었나요?

**답변**

엑셀 업로드 옵션이 동작하지 않는 증상은 다음과 같이 처리되었습니다.

- `noheader`, `startrow` 옵션을 쓴 엑셀 업로드가 xlsx에서 안 되는 증상: 서버모듈 `ibsheet7-1.1.37.jar`에서 발견되어 `ibsheet7-1.1.46.jar` 버전 배포로 처리되었습니다.
- 35 버전 jar에서 동작하지 않던 `ColumnMapping`(순번 매칭): 36 jar에서 수정되어 배포되었습니다. 문제가 있으면 jar를 계속 하위 버전으로 낮추지 말고 36 jar에서 안 되는 현상을 확인해야 합니다. 27 버전에서는 `StartRow`가 정상 동작하는 것이 확인되었습니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.46.jar; ColumnMapping은 35 jar에서 발생, 36 jar에서 수정

**키워드**: noheader, startrow, ColumnMapping, xlsx 업로드, ibsheet7-1.1.46.jar, 36 jar

---

### [XLS-0736] 엑셀 로드 시 컬럼 개수를 제한(MaxColumns·setMaxColumns)하려면 어느 서버모듈 버전부터 가능한가요?

**질문**

- 엑셀 서버모듈 jar(ibsheet7-1.1.41.jar)에 setMaxColumns 메소드가 없습니다. MaxColumns 제약 기능은 어느 jar 버전부터 사용할 수 있나요?
- 엑셀 파일을 로드할 때 컬럼 개수를 제한해서 10개 컬럼만 로드하고 싶습니다. 이런 기능을 지원하는 버전이나 방법이 있나요?

**답변**

`setMaxColumns` 메소드로 쓰는 `MaxColumns` 제약 기능은 서버모듈 jar 1.1.50 버전에서 만들어졌습니다. 1.1.41 jar에는 없으므로 1.1.50 버전의 jar 파일과 jsp 파일을 교체 적용해야 사용할 수 있습니다. 한편 엑셀 로드 시 컬럼 개수를 제한하는 요청은 서버모듈 `ibsheet7-1.1.36.jar` 버전 배포로 처리되었다는 안내도 있어, 안내된 버전이 서로 다릅니다. 사용하는 jar에 `setMaxColumns` 메소드가 없으면 1.1.50 이상의 jar와 jsp로 교체합니다.

**적용 버전**: 서버모듈 1.1.50 이상(MaxColumns/setMaxColumns), ibsheet7-1.1.36.jar 배포 안내도 있음

**키워드**: setMaxColumns, MaxColumns, 컬럼 개수 제한, ibsheet7-1.1.50, ibsheet7-1.1.36.jar

---

### [XLS-0737] 엑셀 로드 시 큰 숫자나 소수 값이 다르게 올라오는 현상(2147483647·37.1088898 등)은 어느 버전에서 수정되나요?

**질문**

- xlsx 내부 XML에는 원본 값이 정상인데 업로드하면 값이 다르게 올라옵니다. 소수가 포함된 긴 숫자에서 재현되는데 해결된 버전이 있나요?
- 엑셀의 큰 숫자를 로드하면 정수 표현 범위만큼만 표시되어 2147483647 같은 값이 들어가거나, Int형 컬럼에서 11자리 이상 숫자가 이상한 값으로 출력됩니다. 해결된 버전이 있나요?
- Float 컬럼(PointCount:6)에 통화서식 엑셀의 37.108900을 로드하면 ibsheet7-1.1.64.jar에서는 정상인데 ibsheet7-1.1.76.jar에서는 37.1088898로 보입니다. 해결된 버전은?

**답변**

엑셀 로드 시 숫자 값이 다르게 올라오는 증상은 다음 버전에서 처리되었습니다.

- xlsx 파일 내부 XML에 원본 값이 지수로 변환되지 않고 정상으로 들어 있는데도 업로드 시 값이 다르게 올라오는 증상(예: 소수가 있는 긴 숫자 `11111111111.111`): `ibsheet8-1.0.10.jar` 배포로 처리되었습니다.
- 정수 표현 범위보다 큰 숫자를 로드할 때 2147483647처럼 범위 한도까지만 표시되거나 Int형 컬럼에서 11자리 이상 숫자가 이상하게 출력되는 증상: 서버모듈 `ibsheet7-1.1.52.jar` 배포로 처리되었습니다.
- Float 컬럼(`PointCount:6`)에 통화서식 엑셀 값 37.108900을 로드할 때 `ibsheet7-1.1.76.jar`에서 37.1088898로 보이는 증상(`ibsheet7-1.1.64.jar`에서는 정상): `1.1.77.jar` 버전 배포로 처리되었습니다.

**적용 버전**: ibsheet8-1.0.10.jar; 서버모듈 ibsheet7-1.1.52.jar; 1.1.77.jar에서 수정

**키워드**: 엑셀 로드 숫자 변형, 2147483647, 37.1088898, PointCount, ibsheet7-1.1.52.jar, 1.1.77.jar, ibsheet8-1.0.10.jar

---

### [XLS-0738] Type:Date, Format:Ym 컬럼에 날짜 서식 엑셀을 로드하면 197001이 들어가는 현상은 어느 서버모듈에서 수정되나요?

**질문**

- 컬럼이 Type:Date, Format:Ym일 때 날짜 서식의 엑셀을 로드하면 197001 값이 들어갑니다. 서버모듈 1.1.38 jdk1.4 환경에서 해결된 버전이 있나요?

**답변**

`Type`이 `Date`이고 `Format`이 `Ym`인 컬럼에 날짜 서식 엑셀을 로드하면 197001이 들어가는 증상은 서버모듈 `ibsheet7-1.1.42.jar` 배포로 처리되었습니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.42.jar

**키워드**: Format Ym, Type Date, 197001, 날짜 서식 엑셀 로드, ibsheet7-1.1.42.jar

---

### [XLS-0739] 한셀로 만든 파일을 엑셀 업로드하면 정상 동작하나요? 지원되는 서버모듈 버전은?

**질문**

- 한셀로 만든 파일을 엑셀 업로드하려고 하는데 정상적으로 동작하나요?

**답변**

한셀 업로드 관련 건은 서버모듈 2.1.6 버전 배포로 처리되었습니다. 한셀로 만든 파일을 업로드하려면 서버모듈 2.1.6 이상을 적용합니다.

**적용 버전**: 서버모듈 2.1.6

**키워드**: 한셀, 엑셀 업로드, 서버모듈 2.1.6, 한셀 파일 로드

---

### [XLS-0740] LoadExcel이 어떤 PC에서는 되고 어떤 PC에서는 안 되는 현상(IE·크롬 모두)은 어느 서버모듈에서 해결되나요?

**질문**

- LoadExcel을 할 때 어떤 PC에서는 잘 되고 어떤 PC에서는 안 됩니다. IE와 크롬 모두 마찬가지입니다. 해결된 버전이 있나요?

**답변**

LoadExcel이 PC에 따라 되다 안 되다 하는 증상은 서버모듈 `ibsheet7-1.1.111.jar` 배포로 처리되었습니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.111.jar

**키워드**: LoadExcel, PC별 동작 차이, ibsheet7-1.1.111.jar, IE 크롬

---

### [XLS-0741] 엑셀 로드 실패 시 서버가 보내는 Grids[0].LoadExcelError() 스크립트에서 오류가 나는 현상은 어느 버전에서 수정되나요?

**질문**

- 서버모듈 ibsheet7-1.1.74.jar 사용 중 엑셀 로드에 실패하면 서버가 Grids[0].LoadExcelError()를 호출하는 스크립트를 보내는데 화면에서 스크립트 오류가 납니다. 해결 버전이 있나요?

**답변**

엑셀 로드 후 에러가 났을 때 클라이언트로 전송되는 `LoadExcelError` 호출 스크립트에서 오류가 나는 증상은 서버모듈 `ibsheet7-1.1.81.jar`와 IBSheet7 7.0.13.61 배포로 처리되었습니다.

**적용 버전**: ibsheet7-1.1.81.jar, 7.0.13.61 배포

**키워드**: LoadExcelError, 스크립트 오류, ibsheet7-1.1.81.jar, 7.0.13.61, 엑셀 로드 실패

---

### [XLS-0742] 서버모듈에서 Synchronizer 반환이 제대로 되지 않는 현상은 어느 jar 버전에서 해결되나요?

**질문**

- 서버모듈 ibsheet7-1.1.50.jar를 사용하는데 Synchronizer 반환이 제대로 되지 않습니다. 해결된 버전이 있나요?

**답변**

Synchronizer 반환이 제대로 되지 않는 증상은 서버모듈 `ibsheet7-1.1.50.jar`에서 발생했으며 `ibsheet7-1.1.76.jar` 배포로 처리되었습니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.76.jar

**키워드**: Synchronizer, Synchronizer 반환, ibsheet7-1.1.76.jar, ibsheet7-1.1.50.jar

---

### [XLS-0743] 엑셀 다운로드를 하면 데이터가 내려오지 않는 현상은 어느 버전에서 정상 동작하나요?

**질문**

- 엑셀 다운로드를 하면 데이터가 내려오지 않습니다. 정상 동작하는 버전이 있나요?

**답변**

엑셀 다운로드 시 데이터가 내려오지 않는 현상은 7.0.0.0-20140603-16 버전에서는 정상 동작하는 것으로 보입니다. 확정된 내용은 아니므로 해당 버전에서 확인해 볼 수 있습니다.

**적용 버전**: 7.0.0.0-20140603-16에서 정상(추정)

**키워드**: 엑셀 다운로드 데이터 미출력, 7.0.0.0-20140603-16, 정상 동작 버전

---

### [XLS-0744] xlsx로 다운로드하면 파일이 열리지 않고 소켓 exception이 나는 경우(조회 데이터 없음·헤더만 내림)는?

**질문**

- xlsx로 다운로드하면 파일은 내려받아지지만 열리지 않고 소켓 exception이 발생합니다. 조회된 데이터가 없거나 헤더만 내릴 때 발생하는데 해결 버전이 있나요?

**답변**

조회된 데이터가 없거나 헤더만 내릴 때 xlsx 다운로드 파일이 열리지 않고 소켓 exception이 발생하는 현상은 IBSheet7 7.0.13.46-20160229-19 버전에서 처리되었습니다.

**적용 버전**: 7.0.13.46-20160229-19에서 수정

**키워드**: xlsx 다운로드 열리지 않음, 소켓 exception, 데이터 없음 헤더만, 7.0.13.46-20160229-19

---

### [XLS-0745] directdown2excel 사용 시 서버 처리가 오래 걸리고 쿠키가 null이라는 오류가 나면 어떻게 해결하나요?

**질문**

- directdown2excel을 사용할 때 서버에서 시간이 오래 걸리고 쿠키가 null이라는 오류가 납니다. 어떻게 해결하나요?

**답변**

20130201 이후에 패치된 버전에서는 이 현상이 없습니다. 다만 엑셀 쪽 문제로 POI 3.7로 만든 최신 jar와 그에 맞는 js를 함께 사용해야 하며, 7.0.0.0-20131018-09 및 `ibsheet7-1.1.10.jar`가 해당합니다. 해결 여부는 확정적이지 않습니다.

**적용 버전**: 20130201 이후 패치, 7.0.0.0-20131018-09

**키워드**: directdown2excel, 쿠키 null, 처리 지연, POI 3.7, ibsheet7-1.1.10.jar, 7.0.0.0-20131018-09

---

### [XLS-0746] 엑셀 다운로드 시 여러 시트 한 파일 스크립트 오류나 'ChildNode가 정의되지 않았습니다' 오류는 어느 버전에서 해결되나요?

**질문**

- 시트 여러 개를 한 엑셀 파일로 다운로드할 때 스크립트 오류가 발생합니다. 어느 버전에서 수정되었나요?
- ExcelDown을 할 때 ChildNode가 정의되지 않았습니다 라는 에러가 발생합니다. 원인과 해결 방법은 무엇인가요?

**답변**

구버전에서 나타나는 엑셀 다운로드 스크립트 오류이며 버전 교체로 해결됩니다.

- 여러 시트를 한 엑셀 파일로 다운로드할 때 스크립트 오류가 나는 현상은 7.0.0.0-20130227-16 버전에서 발생하며, IBSheet7 7.0.0.0-20130305-10 버전에서 패치되었습니다.
- `ExcelDown` 시 'ChildNode가 정의되지 않았습니다' 오류는 7.0.0.0.2013.09 버전처럼 오래된 버전에서 발생한 사례로, 7.0.13.48 버전으로 교체하자 정상 동작했습니다. 오래된 버전을 사용 중이라면 버전 교체를 검토합니다.

**적용 버전**: 7.0.0.0-20130305-10에서 수정, 7.0.13.48에서 정상

**키워드**: 여러 시트 한 엑셀 파일, ChildNode, ExcelDown, 7.0.0.0-20130305-10, 7.0.13.48, 스크립트 오류

---

### [XLS-0747] 엑셀 다운로드를 xhr 방식으로 전송해 쿠키와 무관하게 동작시키려면 어느 버전이 필요한가요?

**질문**

- 서버 모듈에서 form submit 방식이 아닌 xhr 형태로 전송해 cookie 유무와 관련 없이 동작하게 할 수 있나요? 해당 기능이 반영된 버전이 있나요?

**답변**

서버 모듈에서 form submit 방식 대신 xhr 형태로 전송하여 cookie 유무와 관련이 없도록 하는 수정은 IBSheet7 7.0.13.230-20231012-1907과 서버모듈 `ibsheet7-2.1.9.jar`(poi3.13) 배포로 처리되었습니다.

**적용 버전**: 7.0.13.230-20231012-1907, ibsheet7-2.1.9.jar

**키워드**: xhr 전송, form submit, cookie 무관, 7.0.13.230-20231012-1907, ibsheet7-2.1.9.jar

---

### [XLS-0748] 엑셀 다운로드할 때도 별도로 만든 대기 이미지를 띄우려면 어느 버전부터 가능한가요?

**질문**

- 대기 이미지를 별도로 띄워 사용하는데, 엑셀 다운로드할 때도 별도의 대기 이미지를 띄우고 싶습니다. 가능한 버전이 있나요?

**답변**

엑셀 다운로드 시에도 별도의 대기 이미지를 띄우고 싶다는 요청은 IBSheet7 7.0.0.0-20130927-09-M 버전 배포로 처리되었습니다.

**적용 버전**: 7.0.0.0-20130927-09-M에서 반영

**키워드**: 엑셀 다운로드 대기 이미지, 별도 대기 이미지, 7.0.0.0-20130927-09-M, 로딩 이미지

---

### [XLS-0749] Down2Pdf 호출 시 에러가 나거나 disposesheet 후 스타일을 못 가져와 실패하면 어느 버전에서 해결되나요?

**질문**

- Down2Pdf를 호출하면 에러가 발생합니다. 해결된 버전이 있나요?
- disposesheet 후에 스타일을 가져오지 못해 Down2Pdf가 동작하지 않습니다. 해결된 버전이 있나요?

**답변**

Down2Pdf 관련 증상은 다음 버전에서 처리되었습니다.

- `Down2Pdf` 호출 시 에러가 발생하는 증상: IBSheet7 7.0.13.72-20161215-10 버전 배포로 처리되었습니다.
- `disposesheet` 후에 스타일을 가져오지 못해 `Down2Pdf`가 동작하지 않는 증상: IBSheet7 7.0.13.70-20161117-13 버전 배포로 처리되었습니다.

**적용 버전**: 7.0.13.72-20161215-10, 7.0.13.70-20161117-13에서 수정

**키워드**: Down2Pdf, disposesheet, PDF 다운로드 오류, 7.0.13.72-20161215-10, 7.0.13.70-20161117-13

---

### [XLS-0750] 엑셀 다운로드 시 그리드 데이터의 (system) 같은 문자열이 웹방화벽에 걸려 badRequest로 차단되는 현상은?

**질문**

- 데이터가 로드된 상태에서 엑셀을 다운로드하면 그리드 안의 (system) 같은 문자열이 웹 방화벽에 걸려 badRequest가 뜨고 다운로드가 되지 않습니다. 제품 쪽 조치가 가능한가요?

**답변**

그리드 데이터의 `(system)` 같은 문자열이 웹방화벽에 걸려 엑셀 다운로드가 막히는 증상은 IBSheet7 7.0.0.34-20220829 버전 배포로 처리되었습니다.

**적용 버전**: 7.0.0.34-20220829에서 수정

**키워드**: 웹방화벽, badRequest, 엑셀 다운로드 차단, (system) 문자열, 7.0.0.34-20220829

---

### [XLS-0751] Chrome 125에서 Down2Excel 호출 시 서버 통신은 되는데 파일이 다운로드되지 않는 현상은 어느 버전에서 해결되나요?

**질문**

- Chrome 125에서 mySheet.Down2Excel() 같은 엑셀 다운로드 함수를 호출하면 서버 통신은 성공하지만 파일이 다운로드되지 않습니다. 해결 버전이 있나요?

**답변**

Chrome 125에서 `Down2Excel()` 같은 엑셀 다운로드 함수를 호출했을 때 서버 통신은 성공하지만 파일이 다운로드되지 않는 증상은 7.0.0.41-20240321-13 버전 배포로 처리되었습니다.

**적용 버전**: 7.0.0.41-20240321-13에서 수정

**키워드**: Chrome 125, Down2Excel, 파일 다운로드 안 됨, 7.0.0.41-20240321-13

---

### [XLS-0752] ColDelete() 사용 후 엑셀로 출력하면 오류가 발생하는 현상은 어느 버전에서 수정되나요?

**질문**

- ColDelete() 사용 후 엑셀로 출력하면 오류가 발생합니다. 해결 방법이 있나요?

**답변**

`ColDelete()` 사용 후 엑셀로 출력할 때 오류가 발생하는 증상은 IBSheet7 7.0.13.183-20210513-1353-M 버전 배포로 처리되었습니다. 배포된 버전에서 정상 동작이 확인되었습니다.

**적용 버전**: 7.0.13.183-20210513-1353-M에서 수정

**키워드**: ColDelete, 엑셀 출력 오류, 7.0.13.183-20210513-1353-M, 컬럼 삭제 후 다운로드

---

### [XLS-0753] 엑셀 다운로드를 실행할 때 나타나는 팝업창에 스크롤이 생기는 현상은 어느 버전에서 수정되나요?

**질문**

- 엑셀 다운로드를 실행할 때 나타나는 팝업창에 스크롤이 생기는 현상이 있습니다. 이 현상이 수정된 버전이 있나요?

**답변**

엑셀 다운로드 시 팝업에 스크롤이 생기는 현상은 IBSheet7 7.0.0.0-20140731-16 버전 배포로 처리되었습니다.

**적용 버전**: 7.0.0.0-20140731-16

**키워드**: 엑셀 다운로드 팝업, 팝업 스크롤, 7.0.0.0-20140731-16

---

### [XLS-0754] 서버모듈로 엑셀 다운로드·업로드를 쓰려면 jar와 jsp를 어떻게 배치하고 cfg에 무엇을 설정하나요?

**질문**

- 서버모듈로 엑셀 다운로드·업로드를 사용하려면 jar와 jsp 파일을 어떻게 배치하고 cfg에는 무엇을 설정해야 하나요?
- IBSheet7에서 엑셀 업로드를 사용하려면 어떤 모듈과 문서를 참고해야 하나요?

**답변**

1) lib 폴더의 jar를 서버의 WEB-INF/lib에 적용합니다.
2) jsp 폴더의 파일을 프로젝트의 특정 경로에 둡니다(jsp가 lib의 jar를 이용해 다운로드 로직을 처리합니다).
3) ibsheet.js와 같은 위치의 ibsheet.cfg에 `Down2Excel_Url`, `LoadExcel_Url`, `Down2Text_Url` 등으로 jsp 위치를 지정합니다.
4) 화면에서 엑셀 다운로드를 하면 브라우저 콘솔 네트워크 탭에서 해당 url이 호출되는지 확인합니다.
사용 방법은 서버모듈과 서버모듈 개발자가이드 문서를 참고합니다. 제품 패키지에서 서버모듈 jar는 bin 폴더의 서버모듈 폴더에, 서버모듈 도움말은 doc 폴더의 01 엑셀관련 아래 서버모듈 폴더에 있습니다.

**키워드**: WEB-INF/lib, Down2Excel_Url, LoadExcel_Url, Down2Text_Url, ibsheet.cfg, 서버모듈, jsp

---

### [XLS-0755] 새 서버모듈로 교체한 뒤 다운로드가 정상 동작하지 않거나 메모리가 소진될 때 jsp를 최신으로 교체하는 방법

**질문**

- 서버모듈을 2.0으로 올리고 JSP를 교체했는데 다운로드 로직이 정상 동작하지 않습니다(주로 directdown2excel). 어떻게 해결하나요?
- 엑셀 다운로드 시 xlsx 파일이 10MB 정도 되면 WAS 메모리가 소진됩니다. 서버모듈 jar 버전에 비해 JSP 파일은 어떻게 점검하나요?
- 새 서버모듈을 적용할 때 엑셀 다운로드/업로드용 jsp도 바꿔야 하나요? Jakarta EE와 Java EE는 다른가요?

**답변**

jsp는 엑셀모듈 코어(ibsheet7 jar)를 import해 다운로드/업로드하는 로직이 있으므로 서버모듈 jar 버전에 맞춰 관련 jsp를 모두 최신으로 업데이트해야 합니다. Jakarta EE와 Java EE 모두 이 jsp 내용을 적용합니다.

- 최신 서버모듈 2.0 기준 jsp로 기존 jsp를 전체 대체하고, 기존 jsp에 커스텀한 내용이나 기존 사용자 환경설정 내용은 파일 비교를 통해 수정된 내용만 새 파일에 다시 적용합니다.
- 메모리 문제는 Down2Excel.jsp의 [사용자 환경 설정 #0-1]을 참고해 수정하고 [사용자 환경 설정 #0-2]를 서버 환경에 맞게 설정합니다.
- jsp를 모두 업데이트한 뒤에도 다운로드 로직이 정상 동작하지 않으면 setService 전에 `String data = request.getParameter("Data"); down.setData(data);`를 추가합니다.

**키워드**: Down2Excel.jsp, directdown2excel, setService, setData, jsp 최신화, 서버모듈 2.0, Jakarta EE

---

### [XLS-0756] 엑셀 서버모듈 jar 셋팅과 에러 디버깅 방법은 어디에서 확인하나요? (IBSheet8 기준 자료 적용 여부)

**질문**

- 엑셀 서버모듈 jar 셋팅이나 에러 디버깅 방법은 어디에서 확인할 수 있나요?
- IBSheet8 기준으로 작성된 엑셀 모듈 자료도 IBSheet7에 동일하게 적용되나요? jsp를 쓸 수 없는 환경은요?

**답변**

기술지원 포털(https://portal.ibsheet.com/support/solutions/folders/72000394868)에 엑셀 모듈 셋팅과 에러 디버깅에 대한 내용이 있습니다. IBSheet8 기준으로 작성되었으나 jar 셋팅이나 에러 관련 내용은 동일하므로 IBSheet7에서도 참고할 수 있습니다. jsp를 쓸 수 없는 환경이면 jsp의 로직을 서블릿으로 작성하며 이 경로에 예제가 있습니다.

**키워드**: portal.ibsheet.com, 서버모듈 셋팅, 에러 디버깅, 서블릿, jar 셋팅

---

### [XLS-0757] 엑셀 서버모듈이 log4j를 사용하나요? WAS의 log4j 파일을 지워도 되나요?

**질문**

- IBSheet7 엑셀 서버모듈이 log4j를 사용하나요? WAS의 lib에 log4j 파일이 있는데 지워도 엑셀 동작에 문제가 없는지, 서버모듈 사용 여부는 어떻게 확인하나요?

**답변**

엑셀 다운로드·업로드 모듈(ibsheet7-2.X.jar)에는 log4j로 로그를 남기는 구간이 있어 배포 시 `log4j-1.2.13.jar`가 기본 포함됩니다. 이 파일이 WAS의 WEB-INF/lib에 있다면 삭제해도 엑셀 동작에는 이상이 없습니다. 서버모듈 사용 여부는 WEB-INF/lib에 ibsheet7로 시작하는 jar 파일이 있는지, `Down2Excel_Url` 등에 설정된 경로에 파일이 있는지로 확인합니다. 둘 다 없다면 서버모듈을 쓰지 않는 것이므로 WAS의 log4j 파일은 다른 곳에서 쓰는 것인지 따로 확인합니다.

**키워드**: log4j-1.2.13.jar, ibsheet7-2.X.jar, WEB-INF/lib, Down2Excel_Url, 서버모듈 사용 여부

---

### [XLS-0758] Tomcat 환경에서 엑셀 다운로드·업로드가 모두 동작하지 않을 때 서버모듈 jar 위치

**질문**

- Tomcat 환경에서 엑셀 다운로드와 업로드가 모두 동작하지 않습니다. 서버모듈 jar를 어디에 넣어야 정상 동작하나요?

**답변**

엑셀 다운로드와 업로드가 되지 않던 환경에서 Tomcat의 lib 쪽에 서버모듈 jar(ibsheet7 1.1.83.jar)를 넣자 정상 동작한 사례가 있습니다.

**키워드**: Tomcat, lib, ibsheet7 1.1.83.jar, 서버모듈 jar

---

### [XLS-0759] 엑셀 업로드 시 '엑셀 파일을 읽는 도중 예외가 발생하였습니다' 오류와 WEB-INF/lib 하위 폴더의 충돌 jar

**질문**

- 엑셀 업로드 시 엑셀 파일을 읽는 도중 예외가 발생하였다는 오류가 나옵니다. jar 충돌이 원인일 수 있나요?

**답변**

WEB-INF/lib 폴더 아래 back이라는 폴더에 충돌하는 jar 파일이 있으면 이 오류가 발생할 수 있습니다. 해당 폴더를 제거하자 정상 동작하는 것이 확인되었습니다.

**키워드**: WEB-INF/lib, jar 충돌, 엑셀 업로드, back 폴더

---

### [XLS-0760] 서버모듈 jar 버전 문제로 생기는 증상(ReportXML Col2, Down2Excel cannot be resolved, XML root 요소 오류)

**질문**

- Down2Excel에서 ReportXML을 사용할 때 Col2의 End 부분을 숫자로 계산해 넣어도 제대로 나오지 않습니다.
- 서버모듈 jar를 1.1.127.jar로 업데이트했더니 `Down2Excel cannot be resolved to type` 오류가 발생합니다.
- 로컬에서는 엑셀 다운로드가 정상인데 서버에서는 받은 파일을 열면 XML에 root 요소가 있어야 한다는 메시지가 나옵니다.

**답변**

서버모듈 jar 버전과 관련된 증상입니다.

- ReportXML 사용 시 Col2 설정이 맞지 않는 이슈는 jar 버전이 낮아서 발생하며, jar를 1.1.125 버전으로 올리면 정상적으로 나옵니다.
- `1.1.127.jar`로 업데이트한 뒤 `Down2Excel cannot be resolved to type` 오류가 나면 해당 jar 파일이 손상되었을 수 있으며, `1.1.128.jar`로 교체했더니 정상 동작한 사례가 있습니다.
- 서버에서 받은 엑셀 파일을 열 때 XML root 요소 오류가 나는 현상은 ibsheet7-1.1.80 jar로 업데이트하여 처리되었습니다. 정확한 원인은 확인되지 않았으며 임시 폴더에 파일을 사용하면서 발생하는 문제로 추측됩니다.

**적용 버전**: 서버모듈 jar 1.1.125, 1.1.128, ibsheet7-1.1.80에서 해결

**키워드**: ReportXML, Col2, Down2Excel cannot be resolved, 1.1.125, 1.1.128, ibsheet7-1.1.80

---

### [XLS-0761] 업그레이드 후 엑셀 다운로드·업로드 오류, js·jar·jsp 버전을 맞춰야 하는 경우

**질문**

- 제품을 업그레이드한 뒤 Down2Excel로 엑셀을 내려받으면 `IBSheet info not valid.`와 `download Excel data is not valid.` 오류가 납니다.
- 업그레이드 후 jar와 jsp를 넣었는데도 엑셀 다운로드·업로드 오류가 납니다.
- 시트를 업그레이드했더니 엑셀 다운로드 파일이 손상된 파일로 열립니다.
- 새 LoadExcel.jsp 적용 후 ibExcel.setMaxRows 사용 시, 또는 down2Excel.jsp의 SetTempRoot 사용 시 오류가 납니다.

**답변**

js, jsp, jar의 버전이 서로 맞지 않으면 오류가 납니다.

- 화면단 js 파일만 업그레이드하고 jar 파일을 올리지 않으면 엑셀 다운로드 파일이 손상된 파일로 내려올 수 있습니다. js와 jar를 함께 업그레이드합니다.
- `IBSheet info not valid.`, `IBSheet setSheetInfo Exception.`, `download Excel data is not valid.` 오류가 업그레이드 후 나는 경우 화이트 패키지(엑셀 로드 쪽)를 업데이트하면 정상 동작한 사례가 있습니다.
- 엑셀 다운로드·업로드를 jsp가 아니라 서블릿(컨트롤러)에 `down2excel.jsp`와 `loadExcel.jsp`의 내용을 넣어 구현했다면, 새 내용을 jsp가 아니라 컨트롤러 쪽에 적용해야 합니다.
- `ibExcel.setMaxRows(100);`는 jar 33 버전이 필요합니다. JSP만 교체하고 jar를 적용하지 않으면 서버 에러가 나므로 jar도 함께 교체합니다.
- `SetTempRoot()`가 undefined로 나오면 서버에 서로 다른 버전의 jar(예: 1.1.91과 1.1.26)가 함께 있고, 1.1.26 버전은 `tempRoot`를 지원하지 않기 때문입니다. 오래된 jar를 삭제합니다.

**적용 버전**: jar 33 버전(setMaxRows), jar 1.1.26은 tempRoot 미지원

**키워드**: IBSheet info not valid, download Excel data is not valid, setMaxRows, SetTempRoot, jar 버전, 화이트 패키지, 컨트롤러

---

### [XLS-0762] Down2Excel의 ExcelRowHeight, ExcelHeaderRowHeight로 엑셀 행 높이를 지정하려면? 값이 적용되지 않는 이유는?

**질문**

- Down2Excel로 내려받은 엑셀의 행 높이가 너무 높게 내려옵니다. 행 높이를 줄이거나 조절하려면 어떻게 하나요?
- Down2Excel로 엑셀을 다운로드할 때 화면의 행 높이와 상관없이 데이터 행 높이를 지정하거나 고정하려면 어떻게 하나요?
- 엑셀로 다운로드할 때 헤더와 데이터 행의 높이를 지정하려면 어떤 옵션을 사용하나요?
- Down2Excel에서 ExcelHeaderRowHeight, ExcelRowHeight를 20으로 설정했는데 엑셀의 행 높이가 설정한 값과 다르게 나옵니다. 왜 그런가요?
- Down2Excel에 ExcelHeaderRowHeight 옵션을 줘도 다운로드한 엑셀의 헤더 행 높이가 바뀌지 않습니다.

**답변**

`Down2Excel(opt)`의 옵션으로 다운로드되는 엑셀의 행 높이를 지정합니다. 화면에서 보이는 높이와 상관없이 엑셀의 행 높이를 고정하고 싶을 때 사용합니다.

- 데이터 행 높이: `ExcelRowHeight`
- 헤더 행 높이: `ExcelHeaderRowHeight`
설정한 값과 다른 높이로 나오는 것은 서버모듈에 따라 두 옵션의 동작이 다르기 때문입니다. 서버모듈 2.0에서는 값이 픽셀로 적용되어 20이면 행 높이가 20이 되고, 서버모듈 1.0에서는 값의 75%에 해당하는 행 높이(20이면 15)가 적용됩니다. 또한 사용 중인 jar 버전이 낮으면 `ExcelHeaderRowHeight`를 지원하지 않아 값이 적용되지 않으므로, 해당 옵션을 지원하는 버전의 jar로 교체합니다.

**적용 버전**: 서버모듈 1.0은 지정값의 75%, 서버모듈 2.0은 픽셀 값 그대로 적용

**키워드**: ExcelRowHeight, ExcelHeaderRowHeight, Down2Excel, 행 높이, 서버모듈, jar

---

### [XLS-0763] ibmsg 날짜 구분자(SYS_DateSeparator, SYS_d)가 엑셀 다운로드에 반영되지 않습니다

**질문**

- ibmsg에서 날짜 구분자(SYS_DateSeparator, SYS_d)를 /에서 .로 바꿨는데 엑셀 다운로드 파일에는 여전히 /로 내려옵니다.

**답변**

`SYS_DateSeparator`와 `SYS_d`를 모두 `.`로 바꿔도 엑셀 다운로드에 반영되지 않는 것은 서버모듈 jar 1.1.63 버전의 오류입니다. 최신 버전 서버모듈로 교체합니다.

**적용 버전**: jar 1.1.63에서 발생

**키워드**: SYS_DateSeparator, SYS_d, ibmsg, 날짜 구분자, jar 1.1.63

---

### [XLS-0764] 엑셀 다운로드 시 헤더가 3줄인데 2줄만 내려올 때

**질문**

- 엑셀 다운로드 시 헤더가 3줄인데 엑셀에는 2줄만 내려옵니다. 사용 중인 JSP와 모듈이 오래된 버전입니다.

**답변**

사용 중인 JSP가 구버전이고 엑셀 모듈과 제품 버전이 너무 낮은 경우입니다. 최신 엑셀 모듈(서버모듈)을 받아 JSP와 함께 적용한 뒤 다시 확인합니다.

**키워드**: 헤더 줄 수, 엑셀 다운로드, 서버모듈, JSP 버전

---

### [XLS-0765] 엑셀 다운로드 파일 인쇄 미리보기에 '헤더 테스트', '푸터 테스트'가 보입니다

**질문**

- 엑셀로 다운로드한 파일을 인쇄 미리보기하면 인쇄창 상단과 하단에 '헤더 테스트', '푸터 테스트'라는 글씨가 보입니다.

**답변**

이 증상은 서버모듈 1.1.66.jar에서 발생하는 문제로 알려져 있습니다.

**적용 버전**: 서버모듈 1.1.66.jar

**키워드**: 헤더 테스트, 푸터 테스트, 인쇄 미리보기, 서버모듈 1.1.66.jar

---

### [XLS-0766] 엑셀 다운로드 시 일정 부분부터 선(테두리)이 그려지지 않을 때

**질문**

- 엑셀로 다운로드하면 일정 부분부터 선이 그려지지 않습니다. 서버모듈 1.1.4 jar를 사용 중입니다.

**답변**

서버모듈 1.1.4 jar에서는 현상이 재현되지만 1.1.22 정도 버전으로 테스트하면 발생하지 않습니다. 서버모듈을 1.1.109 버전으로 교체하되, 개발 환경에 먼저 적용해 문제가 없는지 확인한 뒤 운영에 적용합니다.

**적용 버전**: 서버모듈 1.1.4에서 발생, 1.1.22 이상에서 미발생

**키워드**: 선 안 그려짐, 테두리, 서버모듈 1.1.4, 서버모듈 1.1.109, 엑셀 다운로드

---

### [XLS-0767] 엑셀 변환 시 '변환할 수 없는 문자' 오류와 함께 빈 엑셀 파일이 내려올 때

**질문**

- 대량 데이터를 페이지 단위로 로딩한 뒤 엑셀로 변환하면 변환할 수 없는 문자가 포함되어 있다는 오류와 함께 빈 엑셀 파일이 내려옵니다.

**답변**

서버모듈 `1.1.27.jar` 환경에서 발생한 증상으로, 최신 버전에서는 에러 없이 정상 동작합니다. 서버모듈을 최신 버전으로 교체합니다.

**적용 버전**: 1.1.27.jar에서 발생, 최신 버전에서 정상

**키워드**: 변환할 수 없는 문자, 빈 엑셀 파일, 서버모듈 1.1.27.jar, 엑셀 다운로드

---

### [XLS-0768] 엑셀 다운로드 시 헤더 색상(setHeaderFontColor, HeaderBackColor) 관련 에러

**질문**

- 엑셀을 2007 포맷으로 다운로드할 때 setHeaderFontColor 부분에서 에러가 발생합니다.
- 엑셀 다운로드 시 IE에서는 되는데 크롬에서만 에러가 나고, SheetDesign을 설정한 경우에만 발생합니다.

**답변**

구버전의 버그입니다.

- 2007 포맷 다운로드 시 `setHeaderFontColor`에서 에러가 나는 버그가 있었습니다. jar 버전을 최신으로 올리면 발생하지 않을 수 있습니다.
- `SheetDesign`을 설정한 경우 크롬에서만 `HeaderBackColor`가 NaN으로 넘어가 오류가 납니다. 구버전의 문제로 보이며 상위 버전으로 교체하면 해결될 수 있습니다.

**키워드**: setHeaderFontColor, HeaderBackColor, SheetDesign, NaN, 2007 포맷, 크롬

---

### [XLS-0769] 엑셀 다운로드를 하면 웹페이지 화면의 높이가 늘어나는 현상

**질문**

- 엑셀 다운로드를 하면 웹페이지 화면의 높이가 늘어납니다.

**답변**

이전 버전에서 엑셀용 Form 태그에 높이가 잡혀서 발생한 현상입니다. 최신 제품에서는 패치되었으므로 최신 버전을 사용합니다.

**키워드**: 화면 높이 늘어남, Form 태그, 엑셀 다운로드, 최신 버전

---

### [XLS-0770] 업그레이드 후 엑셀 다운로드 글씨 크기가 너무 커졌을 때

**질문**

- 제품을 업그레이드한 뒤 엑셀 다운로드 시 글씨 크기가 너무 커지고 보기 좋지 않습니다.

**답변**

이전(old) 버전의 jsp를 사용하면 폰트 사이즈를 강제로 수정할 수 있습니다.

**키워드**: 엑셀 글씨 크기, 폰트 사이즈, old jsp, 업그레이드

---

## 미지원 기능·제약

### [XLS-0771] ctrl+p 키로 엑셀 다운로드 컬럼 선택 다이얼로그(SetExcelColDialog)를 쓸 수 있나요?

**질문**

- ActiveX에서는 ctrl+p 키로 엑셀 다운로드할 컬럼을 고르는 다이얼로그(SetExcelColDialog)가 떴는데 IBSheet7에서도 가능한가요?

**답변**

IBSheet7에서는 ctrl+p 키로 엑셀 다운로드할 컬럼을 선택하는 다이얼로그 창(`SetExcelColDialog`)을 지원하지 않습니다.

**키워드**: SetExcelColDialog, ctrl+p, 엑셀 컬럼 선택, 엑셀 다운로드, ActiveX

---

### [XLS-0772] 닷넷 서버모듈에서 엑셀 컬럼 너비 자동 설정이나 헤더 색상만 지정할 수 있나요?

**질문**

- 닷넷 서버모듈로 엑셀을 내려받을 때 컬럼 너비를 자동으로 설정하거나 헤더 색상만 따로 설정할 수 있나요?

**답변**

닷넷 서버모듈 환경에서는 엑셀 다운로드 시 컬럼 너비 자동 설정과 헤더 색상만 설정하는 기능이 모두 지원되지 않습니다.

**키워드**: 닷넷, 서버모듈, 컬럼 너비 자동, 헤더 색상, 엑셀 다운로드

---

### [XLS-0773] 엑셀 다운로드 시 URL 값을 HYPERLINK 함수나 클릭 가능한 링크로 출력할 수 있나요?

**질문**

- 엑셀로 내려받을 때 그리드 셀 값에 =HYPERLINK 같은 엑셀 하이퍼링크 함수를 적용해 링크로 동작하게 출력할 수 있나요?
- 엑셀 다운로드할 때 url이 들어 있는 컬럼 값을 엑셀에서 클릭 가능한 링크로 처리할 수 있나요?

**답변**

IBSheet7에서는 엑셀 출력 시 하이퍼링크 함수를 적용하는 기능이 지원되지 않습니다. 시트 화면에서는 html 컬럼에 링크 태그로 표현할 수 있지만, 엑셀 다운로드 시에는 html 컬럼의 내용이 태그가 포함된 텍스트로 전달됩니다. 하이퍼링크 속성을 연결해서 사용할 수 있는 기능은 제품 안에 없습니다.

**키워드**: HYPERLINK, 하이퍼링크, 엑셀 다운로드, html 컬럼, 링크

---

### [XLS-0774] 피벗테이블을 화면과 다르게 엑셀로 내려받거나 엑셀 업로드할 수 있나요?

**질문**

- 피벗테이블에서 일부 row 컬럼을 머지해 보여주는데, 엑셀 다운로드 시에는 머지된 데이터를 컬럼으로 나눠 내려받고 싶습니다. 가능한가요?
- 피봇 테이블을 엑셀로 다운로드하거나 업로드할 수 있나요?

**답변**

- 다운로드: `시트ID_pivot.down2Excel()`로 다운로드할 수 있지만, 피벗테이블에 보이는 모양과 다르게 다운로드하는 것은 지원되지 않습니다. 원하는 피벗 모양을 히든으로 만들어 그것을 다운로드하는 방법을 고려해 볼 수 있습니다.
- 업로드: 피벗은 업로드가 되지 않습니다. 업로드하면 행으로 빠진 컬럼들의 데이터가 올라가지 않습니다(숫자는 올라감).

**키워드**: 피벗, pivot, down2Excel, 엑셀 업로드, 머지, 엑셀 다운로드

---

### [XLS-0775] 다중 라인 레코드 시트를 엑셀 한 줄로 내려받을 수 있나요?

**질문**

- 다중 라인 레코드를 사용하는 시트를 엑셀로 내려받을 때 한 개 라인으로 표현해서 내려받을 수 있나요?

**답변**

다중 라인 레코드를 한 개 라인으로 표현해서 엑셀로 내려받는 기능은 없습니다.

**키워드**: 다중 라인 레코드, 엑셀 다운로드, 한 줄, 멀티라인

---

### [XLS-0776] 엑셀 다운로드 시 3줄 헤더 중 일부 헤더 행만 선택해 받을 수 있나요?

**질문**

- 엑셀 다운로드 시 헤더가 3줄인데 그중 2줄만 다운로드할 수 있나요? 헤더 행 일부를 선택해 받는 방법이 있나요?

**답변**

데이터 행은 `DownRows`, `DownCols`로 다운로드할 행이나 컬럼을 지정할 수 있지만, 헤더 행은 선택해서 내려받을 수 없습니다.

**키워드**: DownRows, DownCols, 헤더 행, 다중 헤더, 엑셀 다운로드

---

### [XLS-0777] 컬럼 구분자 없이 공백으로 나뉜 텍스트 파일을 시트에 로드할 수 있나요?

**질문**

- 컬럼 구분자 없이 공백으로만 나뉜 텍스트 파일 데이터를 시트에 로드할 수 있나요?

**답변**

컬럼 구분자가 없는 텍스트 파일은 지원되지 않아 시트에 로드할 수 없습니다.

**키워드**: 텍스트 파일, 컬럼 구분자, 로드, 공백 구분

---

### [XLS-0778] 엑셀 다운로드 시 시트에 없는 컬럼이나 HTML 테이블·모달 내용을 함께 받을 수 있나요?

**질문**

- 엑셀 다운로드 시 시트에 없는 컬럼을 추가해서 내려받을 수 있나요? 예를 들어 피벗 결과에 추가 컬럼을 더 넣은 형태로 다운로드하고 싶습니다.
- IBSheet7에서 엑셀 다운로드할 때 시트에 들어 있지 않고 일반 HTML 테이블에 있는 내용도 함께 받을 수 있나요?
- 시트가 담겨 있는 modal의 내용(Table 태그 포함)을 엑셀로 저장하거나 출력할 수 있나요?

**답변**

불가능합니다. 엑셀 다운로드는 시트 생성 시 설정한 컬럼 정보를 서버로 넘겨 처리하므로, 시트에 없는 컬럼이나 시트 밖의 일반 HTML 테이블, 시트가 담긴 modal 내용에 대한 저장·인쇄는 지원되지 않습니다.
시트에 없는 컬럼이 필요하면 `ColInsert`로 컬럼을 실제로 추가하고 데이터를 가공한 뒤 다운로드해야 합니다.

**키워드**: ColInsert, 시트에 없는 컬럼, HTML 테이블, modal, 엑셀 다운로드

---

### [XLS-0779] 비밀번호 컬럼을 엑셀 다운로드할 때 *로 받을지 원본으로 받을지 설정할 수 있나요?

**질문**

- 비밀번호 컬럼을 엑셀로 다운로드할 때 `*`로 받을지 원본 데이터로 받을지 설정할 수 있나요?

**답변**

엑셀 다운로드 시 비밀번호 컬럼을 `*`로 받을지 원본 데이터로 받을지 선택하는 설정은 지원되지 않습니다.

**키워드**: 비밀번호 컬럼, Pass, 엑셀 다운로드, 마스킹

---

### [XLS-0780] 다이렉트 엑셀 다운로드에서 소계를 함께 내려받을 수 있나요?

**질문**

- 다이렉트 엑셀 다운로드로 내려받을 때 소계를 함께 다운로드할 수 없나요? 소계는 어디에서 처리해야 하나요?

**답변**

불가능합니다. 시트가 데이터를 만드는 것이 아니기 때문에 다이렉트 엑셀 다운로드에서는 소계를 받을 수 없으며, 소계는 쿼리에서 처리해야 합니다.

**키워드**: 다이렉트 엑셀 다운로드, 소계, 쿼리, 엑셀 다운로드

---

### [XLS-0781] 엑셀 다운로드 시 특정 시트만 A3 용지로 인쇄 설정할 수 있나요?

**질문**

- 엑셀로 다운로드할 때 여러 시트 중 특정 시트만 A3용지로 지정해 다운로드할 수 있나요? 다운로드한 파일의 인쇄 설정을 시트별로 지정하고 싶습니다.

**답변**

다운로드한 파일의 인쇄용지 설정 기능은 제공됩니다. 다만 해당 기능이 적용된 버전을 사용해야 합니다.

**키워드**: A3, 인쇄용지, 엑셀 다운로드, 인쇄 설정, 버전

---

### [XLS-0782] 엑셀 다운로드 파일의 용지 방향·배율·한 페이지 맞춤 인쇄를 제품에서 설정할 수 있나요?

**질문**

- 엑셀로 다운로드해서 출력할 때 용지 방향과 배율을 지정해서 내려받을 수 있나요?
- 시트를 엑셀로 다운로드해 인쇄할 때 '한 페이지에 모든 열 맞추기'를 선택하면 컬럼이 적은 시트가 페이지에 꽉 차게 인쇄되지 않습니다. 제품에서 설정할 수 있나요?

**답변**

지원하지 않습니다. 엑셀 다운로드는 단순히 데이터를 export하는 기능이어서 파일 자체의 출력 설정(용지 방향, 배율)을 바꿔줄 수 없습니다. 컬럼이 적은 시트를 다운로드한 엑셀에서 페이지에 꽉 차게 인쇄되도록 하는 기능도 제품에서 제공하지 않으며, 제품 쪽에서 할 수 있는 방법이 없습니다.

**키워드**: 용지 방향, 배율, 한 페이지에 맞추기, 엑셀 인쇄, 엑셀 다운로드

---

### [XLS-0783] 엑셀 다운로드 파일에서 편집 불가 셀을 잠그거나 특정 셀 수정을 막을 수 있나요?

**질문**

- 엑셀로 다운로드한 파일에서 특정 셀을 사용자가 수정하지 못하도록 막는 기능을 제공하나요?
- 엑셀 다운로드 시 화면에서 편집 불가(Edit 불가)로 설정한 셀을 엑셀에서도 수정할 수 없게 잠글 수 있나요?

**답변**

지원하지 않습니다. 다운로드한 파일의 특정 셀을 수정하지 못하게 만들거나 화면의 편집 불가(Edit 불가) 설정을 엑셀에 반영해 락을 거는 기능은 제공되지 않습니다. 엑셀에서 편집을 막는 것은 셀을 선택해 잠그는 방식이 아니라 시트 보호 > 사용자 권한 설정 > 편집 가능 셀 지정 과정으로 이루어지기 때문입니다.
화면에 보이는 컬럼과 행의 다운로드, 머지된 상태의 반영 같은 기능은 지원하며, 지원 가능한 속성은 API 문서의 options에서 확인합니다.

**키워드**: 셀 잠금, 편집 불가, 시트 보호, Edit, 엑셀 다운로드

---

### [XLS-0784] 모든 화면의 엑셀 다운로드에 행 높이·폰트 같은 Down2Excel 공통 속성을 한곳에서 지정하려면?

**질문**

- 화면마다 개발자가 Down2Excel을 직접 호출하고 있어 공통 파라미터를 한곳에서 지정하고 싶습니다. 방법이 있나요?
- Down2Excel의 ExcelRowHeight를 화면마다 지정하기 어려울 때 모든 시트의 엑셀 다운로드에 행 높이를 공통으로 적용하려면 어떻게 하나요?
- 엑셀 다운로드 시 fontsize 같은 폰트 관련 속성을 기본값으로 정해 Down2Excel을 사용하는 모든 시트에 일괄 적용하려면 어떻게 하나요?
- 엑셀로 다운로드할 때 엑셀 파일의 행 높이나 문자(글자) 크기를 전체적으로 지정하려면 어디에서 어떻게 설정해야 하나요?

**답변**

시트를 생성한 뒤 시트 id를 받아 `SetDown2ExcelConfig()`로 공통 파라미터를 지정하고, 각 화면에서는 `Down2Excel()`만 호출하도록 구성합니다. 보통 `ibsheetinfo.js`에서 설정하며, 다운로드 전체에 적용되는 행 높이, 문자 크기, fontsize 같은 폰트 속성도 이렇게 기본값으로 일괄 적용할 수 있습니다.

```
// ibsheetinfo.js의 IBS_InitSheet() 하단
sheet.SetDown2ExcelConfig({ "ExcelRowHeight":"22", "ExcelHeaderRowHeight":"24" });
```

`ibsheetinfo.js`에 이미 해당 설정 구간이 있다면 그 구간에 속성만 추가하면 됩니다. 다른 방법으로 `Down2Excel`을 감싸서 공통으로 속성을 지정할 수도 있습니다.

```
sheet.oldDown2Excel = sheet.Down2Excel;
sheet.Down2Excel = function(a){ a.ExcelRowHeight = "45"; sheet.oldDown2Excel(a); }
```

**키워드**: SetDown2ExcelConfig, ibsheetinfo.js, IBS_InitSheet, oldDown2Excel, ExcelRowHeight, 공통 파라미터

---

### [XLS-0785] 엑셀 다운로드 전에 사유 입력·비밀번호 확인 같은 공통 처리를 넣으려면 어떻게 하나요?

**질문**

- 화면마다 Down2Excel을 직접 호출하는 구조에서 엑셀 다운로드 전에 다운로드 사유 입력 같은 공통 처리를 넣으려면 어떻게 하나요?
- 엑셀 다운로드 전에 사용자로부터 비밀번호 등을 입력받아 체크한 뒤 다운로드를 진행하는 기능을 공통으로 구현하려면 Down2Excel.jsp를 수정해야 하나요, 다른 방법이 있나요?

**답변**

`Down2Excel.jsp`를 수정하지 않고 `ibsheetinfo.js`에서 처리할 수 있습니다.

- `Down2Excel` 함수를 오버라이드하여 다운로드 전에 공통 처리(예: 다운로드 사유 입력)를 넣습니다.
- 또는 `OnBeforeDownload` 이벤트를 오버라이드해 다운로드 전에 체크합니다. `IBS_InitSheet` 함수 안에서 `IBS_EventOverride`로 `OnBeforeDownload`를 오버라이드하고, 체크를 통과하지 못하면 `sheet.HideProcessDlg()` 호출 후 중단하며, 통과하면 `frm.submit()`으로 다운로드를 진행합니다.
- `IBS_EventOverride` 함수는 `ibsheetinfo.js` 하단에 이벤트명, 시트 id, 실행 함수, 호출 위치(0 화면 이벤트 앞, 1 뒤)를 인자로 받도록 직접 선언해야 합니다.

**키워드**: OnBeforeDownload, IBS_EventOverride, IBS_InitSheet, Down2Excel 오버라이드, ibsheetinfo.js, HideProcessDlg

---

### [XLS-0786] Down2Excel의 KeyFieldMark를 0으로 하는 설정을 모든 시트에 전역으로 적용할 수 있나요?

**질문**

- down2Excel의 KeyFieldMark를 0으로 하는 설정을 모든 시트에 전역으로 적용할 수 있는 방법이 있나요?

**답변**

전역으로 설정하는 옵션은 없습니다. 대신 `ibsheetinfo.js` 같은 전역 스크립트에 임의의 `down2Excel(args)` 함수를 선언해, `args.KeyFieldMark`가 undefined이면 `args.KeyFieldMark = 0`으로 설정한 뒤 `args.sheetobj.down2Excel(args)`를 실행하는 방식으로 처리합니다.

**키워드**: KeyFieldMark, down2Excel(args), args.sheetobj, ibsheetinfo.js, 전역 설정

---

### [XLS-0787] 숫자형 데이터를 Down2Excel로 내려받으면 엑셀 셀 서식이 통화로 나옵니다. 숫자 서식으로 바꾸려면?

**질문**

- 숫자형 데이터를 Down2Excel로 내려받으면 엑셀 셀 서식이 통화로 나옵니다. 숫자 서식으로 바꾸려면 어떻게 하나요?

**답변**

`Down2Excel` 인자로 `NumberExMode:1`을 설정합니다. 개별 호출에 인자를 넣기 어려워 속성처럼 공통으로 지정하려는 경우 그런 속성은 없고, 시트 생성 후 `SetDown2ExcelConfig()`를 다시 호출해야 하며 그것도 어렵다면 `methodOverride()`로 재정의해야 합니다.

**키워드**: NumberExMode, SetDown2ExcelConfig, methodOverride, 통화 서식, 숫자 서식

---

### [XLS-0788] 다운로드 다이얼로그(DownloadDialog)를 표시하고 다운로드 후에도 닫지 않으려면 어떻게 설정하나요?

**질문**

- DownloadDialog로 엑셀 다운로드 다이얼로그를 띄웠을 때, 다운로드가 완료된 뒤에도 다이얼로그 창을 닫지 않고 유지하려면 어떤 파라미터를 지정하나요?
- IBSheet7에서 다운로드 다이얼로그를 표시하려면 ibsheet.cfg에서 어떤 값을 설정하고, 사용자 액션 시 어떤 함수를 어떤 옵션으로 호출해야 하나요?

**답변**

`ibsheet.cfg`에 다음을 설정하고, 사용자 액션 시 `mySheet.DownloadDialog({RemainsAfter:1});`을 호출합니다.

- `DialogUrl`: 다이얼로그 파일 호출 위치입니다. 미설정 시 기본 내장 다이얼로그가 표시되며, 예: `./dialog`이고 경로는 ibsheet.js 기준입니다.
- `DialogTheme`: 다이얼로그 디자인으로, 예: `DLG|DlgTheme` 형식(Prefix|폴더명)입니다.
- `RemainsAfter:1`: `DownloadDialog` 파라미터에 지정하면 다운로드가 완료된 뒤에도 다이얼로그 창을 닫지 않습니다(기본 0).
그 밖의 옵션은 Down2Excel 설정값과 동일하게 적용할 수 있습니다.

**키워드**: DownloadDialog, RemainsAfter, DialogUrl, DialogTheme, 다운로드 다이얼로그, ibsheet.cfg

---

### [XLS-0789] Down2Excel로 내려받은 엑셀 파일에 필터가 적용된 상태로 받으려면 EnableFilter를 어떻게 쓰나요?

**질문**

- Down2Excel로 내려받은 엑셀 파일에 필터가 적용된 상태로 받고 싶습니다. 호출할 때 어떤 인자를 지정해야 하며 서버모듈은 어떻게 해야 하나요?

**답변**

패치된 서버모듈 jar(ibsheet로 시작하는 파일)를 적용한 뒤 다운로드 함수를 `mySheet.Down2Excel({ EnableFilter: 1 });`처럼 호출하면 엑셀 파일에 필터가 적용됩니다.

**키워드**: EnableFilter, Down2Excel, 엑셀 필터, 서버모듈 jar, 패치

---

### [XLS-0790] 시트 우클릭 ActionMenu로 Down2Excel을 실행한 뒤 다시 실행하면 전체 시트가 선택됩니다

**질문**

- 시트의 우클릭 ActionMenu로 엑셀 다운로드를 한 번 실행한 뒤 다시 실행하면 마우스를 움직일 때마다 셀이 선택되고 전체 시트가 선택됩니다. 원인이 무엇인가요?

**답변**

시트 안의 우클릭 ActionMenu에서 `Down2Excel`을 호출하면 처음 한 번만 정상이고, 이후에는 선택할 때 전체 시트가 선택되는 현상이 나타납니다. 별도의 버튼을 만들어 다운로드를 호출하면 반복해서 실행해도 정상 동작합니다.

**키워드**: ActionMenu, Down2Excel, 우클릭 메뉴, 전체 시트 선택, 별도 버튼

---

### [XLS-0791] Down2Excel로 받은 엑셀로 피벗테이블을 만들면 값이 없는 셀도 요약에 포함됩니다

**질문**

- Down2Excel로 내려받은 엑셀 파일로 피벗테이블을 만들면 데이터 값이 없는 셀도 요약에 포함됩니다. 해결된 버전이 있나요?

**답변**

Down2Excel로 받은 파일의 피벗테이블 요약에 값이 없는 셀이 포함되는 증상은 서버모듈 ibsheet7-1.1.34-1.4 배포로 처리되었으므로, 해당 버전 이상의 서버모듈로 교체합니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.34-1.4에서 수정

**키워드**: 피벗테이블, 빈 셀 요약, 서버모듈, ibsheet7-1.1.34-1.4, Down2Excel

---

### [XLS-0792] 피벗 후 Down2Excel을 호출하면 피벗 전 형태로 내려옵니다. 피벗된 형태로 받으려면 어느 시트에서 호출하나요?

**질문**

- 피벗 기능으로 바꾼 양식 그대로 엑셀로 다운로드하려면 어느 시트 객체에서 Down2Excel을 호출해야 하나요? 피벗 다운로드가 되지 않습니다.
- 그리드를 피벗한 뒤 Down2Excel로 엑셀을 내려받으면 피벗 전 형태로 다운로드됩니다. 피벗된 형태로 내려받으려면 어떻게 하나요?
- IBSheet7 피벗 기능으로 표시한 시트를 피벗 설정이 적용된 상태 그대로 파일로 다운로드하는 기능을 제공하나요? 가능하다면 적용 방법은 무엇인가요?
- 원본 시트를 피벗 테이블로 변경한 뒤 피벗 결과를 엑셀로 다운로드하려면 어떻게 하나요?

**답변**

피벗 관련 함수를 호출하면 피벗된 데이터를 표시하는 새 시트가 생성되며, 이 시트의 이름(시트 ID)은 원본 시트명에 `_Pivot`을 붙인 형태(`원본시트명_Pivot`, 예: `mySheet_Pivot`)입니다. 원본 시트가 아니라 이 Pivot 시트에서 `Down2Excel()`을 호출해야 피벗이 적용된 상태로 다운로드됩니다. 예: `mySheet_Pivot.Down2Excel()`

- 다운로드 기능을 공통화했다면 시트에 `_Pivot`이 있는지에 따라 다운로드할 시트를 분기 처리해야 합니다.
- 다운로드가 되지 않으면 버튼 클릭 시 가져오는 시트 id가 올바른지 확인합니다.

**키워드**: Down2Excel, _Pivot, mySheet_Pivot, 피벗 다운로드, 피벗 시트

---

## 다운로드 실패·파일 열기 오류

### [XLS-0793] 엑셀 다운로드가 정상 완료됐는지 에러가 났는지 브라우저에서 확인할 수 있나요?

**질문**

- 엑셀 다운로드가 정상 완료됐는지 또는 에러가 났는지를 화면(브라우저)에서 체크할 수 있는 방법이 있나요? 서버모듈과 클라이언트 모듈 각각 궁금합니다.

**답변**

브라우저에서 엑셀 다운로드 에러를 체크하는 방법은 없습니다. 클라이언트 모듈은 에러가 나도 파일을 정상 다운로드시키고 파일을 열 때 경고 문구가 뜨며, 서버모듈도 파일이 정상 다운로드됐는지 화면에서 판단할 수 없습니다. 다만 서버모듈의 Down2Excel.jsp에서는 처리가 가능합니다.

**키워드**: 엑셀 다운로드, 에러 체크, Down2Excel.jsp, 클라이언트 모듈, 서버모듈

---

### [XLS-0794] 엑셀 다운로드 시 콘솔에 404 에러가 표시되고 다운로드되지 않을 때

**질문**

- 엑셀 다운로드 시 콘솔에 404 에러가 표시되고 다운로드가 되지 않습니다. 설정을 제대로 한 것인지 알고 싶습니다. 어디를 확인해야 하나요?

**답변**

404 에러는 클라이언트 쪽 문제가 아니라 서버 쪽 문제입니다. 먼저 jsp를 java 쪽으로 변경하는 작업을 해 봅니다.

**키워드**: 404, 엑셀 다운로드, jsp, 서버모듈

---

### [XLS-0795] 'generateAsync is not a function' 오류로 엑셀 다운로드가 되지 않을 때

**질문**

- Down2Excel 엑셀 다운로드 시 'Uncaught (in promise) TypeError: generateAsync is not a function' 오류가 나면서 다운로드가 되지 않습니다. 어떻게 해야 하나요?

**답변**

이 오류는 클라이언트 모듈인 ibexcel.js에서 발생하는 에러입니다. 클라이언트 모듈을 사용해야 할 특별한 이유가 없다면 서버모듈을 사용하도록 전환합니다.

**키워드**: generateAsync, ibexcel.js, Down2Excel, Promise, 서버모듈 전환

---

### [XLS-0796] 엑셀 다운로드 파일에서 빈 셀을 오름차순 정렬하면 서버모듈과 클라이언트 모듈의 위치가 다른 이유

**질문**

- Down2Excel로 내려받은 엑셀에서 값이 없는 텍스트 셀을 오름차순 정렬하면 IBSheet3와 달리 빈 셀이 맨 아래로 갑니다. 이유와 맞출 방법이 있나요?

**답변**

서버모듈은 poi 라이브러리로 파일을 만들 때 빈값을 엑셀에서는 보이지 않지만 내부적으로 값이 들어간 형태로 만들고, 클라이언트 모듈은 jszip 라이브러리로 브라우저에서 빈값을 쓰지 않고 빈 상태로 둡니다. 이 처리 차이로 텍스트 오름차순 정렬 시 빈 셀 위치가 달라지며, 엑셀 프로그램 기준으로 빈 셀은 최하단에 위치합니다. 기반 기술이 다르고 기존 사용자에 대한 영향이 커서 이 차이를 바꾸는 수정은 어렵고, 빈 셀에 값을 추가해 정렬상 위쪽에 위치시키는 것도 어렵습니다.

**키워드**: poi, jszip, 빈 셀, 오름차순 정렬, Down2Excel

---

### [XLS-0797] 엑셀 다운로드에서 셀 배경색은 나오는데 글자색(font color)이 적용되지 않을 때

**질문**

- 엑셀 다운로드 시 시트의 셀 배경색은 나오는데 글자색(font color)이 엑셀에 적용되지 않습니다. 서버모듈 다운로드에서도 글자색을 지원하나요?
- 서버모듈과 클라이언트모듈로 엑셀을 다운로드할 때 글자색(font color)이 반영되는 기능은 어느 버전에서 추가되거나 개선되었나요?

**답변**

과거 서버모듈(시트 정보와 데이터를 서버로 전송하여 다운로드하는 방식)은 font-color를 지원하지 않았고, 브라우저에서 바로 다운로드하는 클라이언트 모듈은 font-color 지원이 가능했습니다. 서버모듈 엑셀 다운로드의 font color 기능이 추가되고 클라이언트 모듈의 font color 기능이 개선된 버전은 7.0.13.218-20230518-1538-M입니다. 글자색이 반영되지 않으면 해당 버전 이상인지 확인하고, 이전 버전이면 업그레이드하거나 클라이언트 모듈 방식으로 다운로드합니다.

**적용 버전**: 7.0.13.218-20230518-1538-M부터(서버모듈 font color 추가, 클라이언트 모듈 개선)

**키워드**: font color, 글자색, 서버모듈, 클라이언트 모듈, 7.0.13.218-20230518-1538-M

---

### [XLS-0798] 특정 PC에서만 엑셀 업로드가 안 되거나 '보안정책에 의하여 파일을 전송할 수 없다'는 메시지가 나옵니다

**질문**

- 특정 PC에서만 엑셀 업로드 시 파일 선택 후 진행되지 않고 업로드 다이얼로그도 뜨지 않습니다. 다른 PC에서는 같은 파일이 올라가는데 원인이 무엇인가요?
- 엑셀 업로드에서 파일 찾기까지는 되는데 파일을 선택해 열기를 누르면 IE가 멈추고 더 진행되지 않습니다. 원인을 어떻게 확인하나요?
- 엑셀 업로드를 사용하는데 한 PC에서만 업로드하면 자료가 보이지 않고 다른 PC에서는 잘 올라갑니다. 원인이 무엇인가요?
- 파일 업로드(전송) 시 보안정책에 의하여 파일을 전송할 수 없다는 메시지가 표시됩니다. 원인이 무엇이고 무엇을 확인해야 하나요?

**답변**

PC나 사내에 설치된 보안 프로그램이 파일의 외부 전송을 막고 있는 경우일 수 있습니다. 요청이 서버까지 도달하지 않으면 제품 설정으로는 해결할 수 없습니다.

- 다른 PC에서는 같은 파일이 잘 올라가고 특정 PC에서만 안 되면 그 PC의 보안 프로그램이 네트워크를 통한 파일 전송을 막는지 확인합니다.
- 보안 프로그램의 차단 화면에 `Outgoing Transfer Blocked`와 민감정보가 발견되어 전송이 차단되었다는 내용이 표시될 수 있습니다. 민감한 내용이 없는 간단한 엑셀 파일로 테스트해 정상 동작하면 파일 내용 때문에 차단된 것입니다.
- 피들러로 확인했을 때 `The request body did not contain the specified number of bytes. Got 0, expected ...` 메시지가 나오면 파일이 외부로 전송되지 못하는 것으로 보입니다.
- 개발자 도구의 네트워크에서 request로 보낸 파일이 response에 전문으로 들어오는지도 확인합니다.
- 차단이 확인되면 사내 보안 부서에 해당 업무 시스템 주소를 허용 대상으로 등록하도록 요청합니다.

**키워드**: 보안 프로그램, 파일 전송 차단, Outgoing Transfer Blocked, 특정 PC, 엑셀 업로드, 피들러

---

### [XLS-0799] 엑셀 다운로드 파일을 열 때 '프로그램 전송 문제', '표시 형식 손실', '파일 형식이 다르다' 등의 메시지가 나옵니다

**질문**

- DirectDown2Excel로 받은 엑셀을 열 때 프로그램 전송에 문제가 있다는 메시지가 나옵니다. Excel 2013에서 원인과 해결 방법은 무엇인가요?
- 엑셀 다운로드 후 파일을 열면 '파일오류:표시 형식의 일부가 손실되었을 수 있습니다.' 메시지가 뜹니다. 시분초를 Format:##:##:##으로 지정했는데 원인이 무엇인가요?
- 엑셀 다운로드 파일을 열면 파일 형식(xls)이 지정한 형식과 다르고 원본 파일이 손상되었다는 메시지가 표시됩니다. 어떻게 해결하나요?
- 많은 건수를 조회해 엑셀로 다운로드하면 로딩중만 뜨고 반응이 없습니다. 파일을 열면 '파일 형식 또는 파일 확장명이 잘못되어 파일을 열 수 없습니다' 메시지가 나옵니다.

**답변**

메시지별로 다음을 확인합니다.

- 프로그램 전송에 문제가 있다는 메시지: Excel 옵션의 고급 > 일반 항목에서 DDE(동적 데이터 교환) 항목이 체크되어 있으면 새 파일을 만들어 저장한 뒤 다시 열어도 열리지 않습니다. 이 DDE 체크를 해제해야 하며, IBSheet로 받은 파일뿐 아니라 다른 엑셀 파일도 열리지 않는 PC 설정 문제입니다.
- '표시 형식의 일부가 손실되었을 수 있습니다': `##:##:##`는 엑셀의 사용자 지정 서식으로 만들 수 없는 포맷이라 나오는 메시지이며, 시:분:초 값은 `Format:Hms`를 사용해야 합니다.
- '파일 형식이 지정한 형식과 다르고 원본 파일이 손상되었다': 근본 원인은 확인되지 않았으며 WAS를 재시작한 뒤 정상 동작했던 사례가 있으므로, 같은 증상이면 WAS 재시작 후 다시 다운로드해 볼 수 있습니다.
- 2만 건 같은 많은 데이터를 다운로드한 파일에서 '파일 형식 또는 파일 확장명이 잘못되어 파일을 열 수 없습니다'가 나오면 xls 형식으로 다운로드하면 정상적으로 열립니다.

**키워드**: DirectDown2Excel, DDE, Format:Hms, 표시 형식 손실, 파일 형식 또는 파일 확장명, 엑셀 다운로드, xls 형식

---

### [XLS-0800] 엑셀 다운로드 시 'ServletOutputStream is already closed!' 예외가 발생하는 원인과 ERROR 로그를 줄이는 방법

**질문**

- Down2Excel.jsp 엑셀 다운로드에서 'ServletOutputStream is already closed!' 예외와 'response has already been committed' 로그가 반복됩니다. 원인이 무엇인가요?
- 엑셀 다운로드 중 연결이 끊겨 발생하는 ServletOutputStream 예외가 ERROR 로그로 계속 남습니다. 불필요한 로그를 줄이려면 어떻게 하나요?

**답변**

서버가 엑셀 파일을 만들어 응답으로 전송하는 방식이므로, 전송이 끝나기 전에 연결이 끊기면 이미 끊어진 연결에 데이터를 기록하려다 이 예외가 발생합니다. 사용자가 다운로드 도중 새로고침하거나 다른 화면으로 이동한 경우, 또는 앞단 웹서버나 L4 장비가 연결을 끊은 경우입니다. 'Cannot forward to error page' 메시지는 원인이 아니라 결과이고 실제 원인은 'ServletOutputStream is already closed!' 쪽입니다. 기능 결함이 아니며 서버 기반 생성 방식에서는 완전히 없앨 수 없고, 다운로드 시간이 길수록 자주 발생합니다.
기능에는 영향이 없는 예외이므로 로그를 줄이는 방향을 권장합니다. 메시지와 예외 스택을 함께 기록하는 주체가 ErrorPageFilter이므로 해당 로거를 제외하면 스택 전체가 출력되지 않습니다. log4j2 기준으로 다음과 같이 설정하며, ERROR 레벨로 기록되는 로그라서 레벨을 낮추는 방식으로는 제거되지 않고 off로 설정해야 합니다.

```
<Logger name="org.springframework.boot.web.servlet.support.ErrorPageFilter" level="off"/>
```

**키워드**: ServletOutputStream, ErrorPageFilter, response has already been committed, Down2Excel.jsp, log4j2, ERROR 로그

---

### [XLS-0801] xlsx 다운로드·엑셀 로드가 쓰는 WAS 임시 폴더(java.io.tmpdir)의 위치·권한 오류와 더미 파일 처리 방법

**질문**

- Down2Excel로 xlsx를 내려받으면 응답은 200인데 파일이 안 내려오고 SXSSFWorkbook.createSheet의 IOException(지정된 경로를 찾을 수 없음)이 납니다. 원인은?
- xlsx 다운로드나 엑셀 로드를 할 때 서버의 어느 경로에 임시 파일이 생기고 어떤 권한이 필요한가요? 경로는 어떻게 바꾸나요?
- xlsx로 엑셀을 다운로드할 때 임시 폴더에 더미 파일이 계속 생성됩니다. 어떻게 하면 생성되지 않나요?

**답변**

xlsx 다운로드와 엑셀 로드 모두 WAS의 temp 디렉토리에 파일을 씁니다. 이 디렉토리에 읽기/쓰기 권한이 있어야 하며, 경로는 `System.getProperty("java.io.tmpdir")`로 확인할 수 있습니다.

- 증상: xlsx로 내려받을 때 응답은 200인데 파일이 내려오지 않고 `SXSSFWorkbook.createSheet`에서 `IOException`(지정된 경로를 찾을 수 없음)이 납니다. 임시 폴더가 삭제되었거나 쓰기 권한이 없으면 이 오류가 날 수 있으며, 로그의 깨진 글자는 '지정된 경로를 찾을 수 없습니다'일 가능성이 큽니다.
- 조치: 위 방법으로 위치를 확인하고 폴더 존재 여부와 권한을 점검합니다. Java 임시 폴더라 WAS를 재기동하면 다시 생성됩니다. 최신 서버모듈 jar에는 temp 폴더가 없으면 생성하는 로직이 있으므로 jar를 교체할 수 있으며, 교체 시 기존 jar는 삭제해야 합니다.
- 엑셀 로드 시 temp 디렉토리를 바꾸려면 `load.setTempPath(tempPath);`를 설정합니다.
- xlsx 다운로드 때마다 임시 폴더에 더미 파일이 계속 생성되는 것을 피하려면 xls 확장자로 변경합니다. xls는 임시 파일을 생성하지 않으므로, 반드시 xlsx를 쓰지 않아도 되는 화면은 xls로 바꾸고 제품 업그레이드를 검토합니다.

**키워드**: java.io.tmpdir, SXSSFWorkbook, IOException, load.setTempPath, xlsx 임시 폴더, 더미 파일, 지정된 경로를 찾을 수 없습니다

---

### [XLS-0802] xlsx 확장자로 지정했는데 파일을 열 수 없다는 오류가 나거나 xls로 내려오는 이유는?

**질문**

- 엑셀 다운로드에서 확장자를 xlsx로 지정했더니 '파일 형식 또는 파일 확장자가 잘못되어 파일을 열 수 없습니다' 오류가 납니다. 따로 설정해야 하나요?
- jar 1.1.37을 사용하며 Down2Excel 파일명을 xlsx 확장자로 하면 엑셀에서 '파일 형식 또는 파일 확장명이 잘못되어 파일을 열 수 없습니다.' 메시지가 나옵니다.
- down2Excel로 엑셀을 내려받으면 확장자가 xls로 고정되어 있는데 xlsx로 바꿀 수 있나요? jsp에 확장자 옵션을 추가하니 오류가 납니다.
- 엑셀 다운로드 시 확장자를 xlsx로 지정했는데도 xls 파일로 내려받아집니다. 원인이 무엇인가요?

**답변**

원인별로 확인합니다.

- 구버전 JSP를 사용 중인 경우: 서버모듈 jar를 올려 두었어도 실제로 구버전(old) JSP를 사용하면 xlsx 확장자를 지원하지 않아 '파일 형식 또는 파일 확장자가 잘못되어 파일을 열 수 없습니다' 오류가 납니다. 새 서버모듈(`ibsheet7-1.1.61.jar`)을 넣고 다운로드 JSP(`down2excel.jsp`)가 그 jar를 바로 사용하도록 수정해야 합니다.
- 구버전 jar인 경우: jar 1.1.37에서 xlsx로 받으면 같은 메시지가 나는 현상은 1.1.41.jar에서 `Down2Excel.jsp`의 `setHeaderFontColor` 설정에 대한 오류가 처리되면서 수정되었으므로 1.1.41 이상의 최신 jar를 사용합니다.
- 확장자가 xls로 고정되는 구버전(oldjsp 사용, 7.0.0.0-20120601 버전)은 xlsx로 변경하는 기능이 지원되지 않아 업그레이드가 필요합니다.
- 확장자 지정값에 오타가 있는 경우: `xlsx`를 `xlxs`로 잘못 지정하면 xls로 다운로드되므로 철자를 바로잡으면 정상 동작합니다.

**적용 버전**: 1.1.41.jar에서 수정, 서버모듈 ibsheet7-1.1.61.jar 적용, 7.0.0.0-20120601 버전은 미지원

**키워드**: xlsx 지정 오류, 파일 형식 또는 파일 확장자가 잘못, 구버전 JSP, ibsheet7-1.1.61.jar, setHeaderFontColor, xlxs 오타, down2excel.jsp

---

### [XLS-0803] xlsx 다운로드 시 한글 파일명이 깨지는 현상은 어느 버전에서 해결되나요?

**질문**

- xlsx 파일 다운로드 시 한글 파일명이 깨지는 현상이 계속되었는데 버전을 올리니 해결되었습니다. 어느 버전에서 어떤 이유로 해결되나요?

**답변**

2.0.33 버전으로 업그레이드하면 해결됩니다. 2.0.26 버전에서는 엑셀 생성 시 java 임시 폴더에 만드는 파일의 이름을 사용자가 지정한 파일명으로 만들었는데 가비지가 많이 생겨 동일한 이름으로 고정하는 작업을 했고, 이와 관련되어 해결된 것으로 보입니다. 제품 내부 사안이라 changelog에는 기록되어 있지 않습니다.

**적용 버전**: 2.0.33에서 해결

**키워드**: xlsx 한글 파일명 깨짐, 2.0.33, 2.0.26, java 임시 폴더, changelog

---

### [XLS-0804] 엑셀 다운로드 시 'The maximum number of cell styles was exceeded' 오류가 나는 이유는?

**질문**

- 최신 버전 적용 후 엑셀 다운로드에서 `The maximum number of cell styles was exceeded` 오류가 발생합니다. 원인과 해결 방법은?

**답변**

JSP 파일의 위치가 정상 위치와 달라서 발생한 사례입니다. JSP를 정상적인 위치에 적용하면 해결됩니다.

**키워드**: maximum number of cell styles, JSP 위치, 셀 스타일 최대 개수, 최신 버전 적용 후 오류

---

### [XLS-0805] 엑셀 다운로드가 에러 로그 없이 실패할 때 서버 오류를 확인하는 방법

**질문**

- Down2Excel.jsp로 엑셀 다운로드를 하는데 일부 환경에서 안 되거나 에러 메시지 없이 실패합니다. 자세한 에러는 어떻게 확인하나요?
- 엑셀 다운로드가 되지 않거나 500 에러가 나는데 에러 로그를 찾을 수 없습니다.
- 엑셀 다운로드가 에러나 경고 없이 로딩만 계속됩니다.
- 로컬에서는 되는데 서버(Linux 등)에 올리면 엑셀 다운로드가 계속 실패합니다.

**답변**

서버모듈 JSP(`Down2Excel.jsp`, `ibsheet.cfg`의 `Down2Excel_Url`에 설정된 JSP)의 try-catch 구문에서 catch 부분의 `e.printStackTrace();`가 주석 처리되어 있습니다. 이 주석을 해제한 뒤 WAS(서버 콘솔) 로그에서 에러 내용을 확인하면 원인을 파악할 수 있습니다. 텍스트 로드/다운로드 JSP도 같은 방식으로 `printStackTrace` 주석을 풀어 서버 로그를 확인합니다.

서버에서만 실패할 때 추가 점검:

- JSP 맨 위에 `System.out.println(com.ibleaders.ibsheet7.util.Version.getVersion());`을 넣어 POI 라이브러리가 제대로 참조되는지 확인합니다. import 패키지명이 다르면 `com.ibleaders.ibsheet.util.Version`을 사용합니다.
- temp 디렉토리에 읽기/쓰기 권한이 있어야 하므로 `System.getProperty`로 `java.io.tmpdir` 값을 읽어 경로를 확인합니다.

별도로 로드텍스트로 텍스트 파일을 화면에 불러올 때 건수가 특정 수를 넘으면 동작하지 않는 경우에도 서버모듈의 텍스트 처리 JSP에서 catch 부분의 `printStackTrace` 주석을 풀고 서버 로그를 확인합니다. 서버 라이브러리 문제나 데이터 문제일 수 있으므로 로컬과 개발 서버에 올라간 라이브러리 버전이 서로 다른지도 확인합니다.

**키워드**: printStackTrace, Down2Excel.jsp, Down2Excel_Url, 엑셀 다운로드 안 됨, 서버 로그, java.io.tmpdir

---

### [XLS-0806] 개발에서는 되는데 운영·특정 서버에서만 엑셀 다운로드가 안 되는 이유

**질문**

- 엑셀 다운로드 시 '처리중입니다'가 뜬 뒤 파일이 내려받아지지 않습니다. 개발에서는 되고 운영에서만 안 됩니다.
- 엑셀 다운로드가 1번 서버에서는 잘 되는데 2번 서버에서만 되지 않고 에러 로그도 없습니다.
- 잘 되던 엑셀 다운로드가 갑자기 되지 않습니다.
- 중복된 jar 파일을 삭제했는데도 엑셀 다운로드가 해결되지 않습니다.

**답변**

다음 순서로 점검합니다.

- `Down2Excel.jsp`가 HTTP 200으로 응답하는지 확인합니다. 200이 아니면 JSP 위치가 잘못되었거나 서버모듈 jar가 없을 수 있습니다.
- 200으로 응답하는데도 다운로드되지 않으면 서버모듈 버전을 확인합니다. 개발에서는 되고 운영에서만 안 된다면 서버모듈 버전이 다르거나 파일이 누락되었을 가능성이 있습니다.
- 잘 되던 다운로드가 갑자기 안 되는 경우는 대부분 lib 문제입니다. 최근 배포나 서버 작업으로 lib가 변경된 적이 있는지 확인합니다.
- 특정 서버에서만 안 되면 해당 서버의 접근 권한이 모두 열려 있는지 확인하고, 그 외 에러는 `Down2Excel.jsp`의 catch 쪽 `printStackTrace` 주석을 풀어 로그로 확인합니다.
- jsp에서 Data를 받지 못하는 현상이면 컨트롤러에서 Data를 받고 있는지 먼저 확인합니다.

**키워드**: Down2Excel.jsp, 처리중입니다, 서버모듈 버전, lib, 접근 권한, 운영 서버

---

### [XLS-0807] 엑셀 다운로드 시 '처리중입니다'가 사라지지 않거나 쿠키값이 내려오지 않는 이유

**질문**

- 엑셀 다운로드 시 '처리중입니다' 메시지가 사라지지 않는 현상이 특정 서버에서만 발생합니다. 브라우저 문제인가요?
- 엑셀 다운로드 시 서버에서 쿠키값이 가끔 내려오지 않습니다.

**답변**

브라우저가 아니라 서버의 쿠키 설정과 관련이 있을 수 있습니다. 서버에서 쿠키를 허용하지 않는 경우, 또는 엑셀 다운로드 작업 중 에러가 발생한 경우에 쿠키값이 내려오지 않거나 처리중 메시지가 남을 수 있습니다. 서버에서 쿠키를 사용할 수 있도록 설정을 확인해 허용하고, 다운로드 중 에러가 발생하지 않는지 서버 로그도 확인합니다. 정확한 원인은 환경에 따라 다를 수 있습니다.

**키워드**: 쿠키, 처리중입니다, 엑셀 다운로드, 서버 설정

---

### [XLS-0808] 특정 조건에서 IE8에서만 엑셀 다운로드가 되지 않을 때 방화벽 확인

**질문**

- 엑셀 다운로드가 대부분 잘 되는데 특정 화면·특정 조건에서 IE8에서만 다운로드가 되지 않습니다. 다른 브라우저에서는 정상입니다.

**답변**

방화벽이 요청을 막는 경우일 수 있습니다. 시트는 크로스 도메인을 사용하기 위해 브라우저별로 조금씩 다른 형식으로 호출하는데, 방화벽이 호출 형식과 내용(hijacking 코드가 있을 수 있는지 등)을 복합적으로 판단해 막을 수 있습니다. 막은 경우 방화벽에 로그가 남으므로 방화벽 로그를 확인합니다.

**키워드**: 방화벽, IE8, 크로스 도메인, 엑셀 다운로드 안 됨, hijacking

---

### [XLS-0809] 엑셀 다운로드 시 '엑셀 어플리케이션이 없다'는 메시지가 뜨는 원인

**질문**

- 엑셀 다운로드를 받을 때 엑셀 어플리케이션이 없다는 메시지가 뜹니다. 어떤 원인을 확인해야 하나요?

**답변**

PC에 엑셀(스프레드시트 어플리케이션)이 설치되어 있지 않아서 나타나는 메시지일 수 있습니다. 다운로드한 파일을 열 수 있는 엑셀 프로그램이 설치되어 있는지 먼저 확인합니다.

**키워드**: 엑셀 어플리케이션, 엑셀 다운로드, 엑셀 미설치, 메시지

---

### [XLS-0810] 엑셀 다운로드 후 셀의 >, <, & 문자가 gt, lt, amp로 바뀌어 보이는 이유

**질문**

- 엑셀 다운로드 후 셀 안의 >, <, & 문자가 gt, lt, amp 등으로 치환되어 표시됩니다. 원인이 무엇인가요?

**답변**

제품에서 해당 문자를 변환하는 기능을 제공하지 않습니다. 사용 중인 환경에서 자체적으로 적용한 필터가 문자를 치환하는 것은 아닌지 확인합니다.

**키워드**: 특수문자, gt lt amp, 엑셀 다운로드, 필터, 문자 치환

---

### [XLS-0811] 엑셀 다운로드 후 대기(처리중) 이미지가 사라지지 않는 원인

**질문**

- 엑셀 다운로드를 실행한 뒤 대기(로딩) 이미지가 사라지지 않습니다.
- 초창기 버전에서 최신 버전으로 올린 뒤 엑셀 다운로드 시 파일은 받아지는데 '처리중입니다.' 표시가 사라지지 않습니다.
- 서버 보안 설정(Content-Security-Policy 등)을 적용한 뒤 엑셀 다운로드 후 대기 이미지가 사라지지 않고 멈춥니다.

**답변**

원인별로 확인합니다.

- 오래된 버전(20120613 버전)에서 발생한 사례가 있으며 이후 버전에서 개선되었으므로 최신 버전을 사용합니다.
- 초창기 버전에서는 `Down2Excel.jsp`와 `LoadExcel.jsp`가 poi 라이브러리를 직접 처리했지만 최신 버전에서는 `ibsheet7.jar`가 처리하도록 바뀌어 Down2Excel.jsp 호출 시 가져가는 전문 내용이 달라졌습니다. `Down2Excel.jsp`, `LoadExcel.jsp` 등을 최신으로 바꾸고 서버모듈을 설치합니다. 이전 Down2Excel.jsp에 CallBack 함수 처리 구간이 있었다면 1.x 대, 없었다면 2.x 대 서버모듈이 필요한 것으로 보입니다.
- 엑셀 다운로드는 iframe으로 통신해 다운로드 완료 여부를 직접 알 수 없으므로 `downloadToken` 쿠키 값으로 판단합니다. WAS 설정 등으로 쿠키를 쓰거나 읽을 수 없으면 대기 이미지를 감추는 로직이 실행되지 않으며 IBSheet에서 별도 예외 처리를 할 수 없습니다. 7.0.13.236-20231205-0953과 `ibsheet7-2.1.13.jar` 이상으로 업그레이드하면 iframe 대신 xhr 통신을 쓸 수 있고, xhr은 callback이 있어 쿠키로 확인하지 않습니다.

**적용 버전**: 20120613 버전에서 발생, 7.0.13.236-20231205-0953·ibsheet7-2.1.13.jar에서 xhr 통신 사용

**키워드**: downloadToken, 대기 이미지, 처리중입니다, iframe, xhr, Down2Excel.jsp, 쿠키

---

### [XLS-0812] 다운로드한 엑셀 파일이 손상되었다거나 열리지 않는 원인

**질문**

- 엑셀 다운로드 후 파일을 열면 '예기치 않은 입력의 끝입니다.' 오류가 나며 열리지 않습니다.
- xlsx로 다운로드했는데 파일 형식 또는 파일 확장명이 잘못되어 열 수 없다는 메시지가 나옵니다.
- 엑셀 다운로드 후 파일이 손상되었다는 경고가 뜨고 오피스 버전에 따라 아예 열리지 않습니다.
- IE에서 엑셀 파일을 열면 '이 통합문서를 복구하시겠습니까'라는 메시지가 나옵니다.
- 특정 PC에서만 다운로드한 엑셀 파일이 열리지 않습니다.

**답변**

원인별로 확인합니다.

- poi 버전 차이: 숨겨진 컬럼을 포함해 내려받고 buffer를 사용하는 경우 '예기치 않은 입력의 끝입니다.' 오류가 난 사례가 있으며 poi 버전 문제로 해결되었습니다. `HiddenColumn:true`로 보이는 컬럼만 다운로드하는 경우에는 정상이었습니다.
- `xalan.jar` 충돌: xlsx 파일이 열리지 않을 때 `xalan.jar`와 충돌하면 발생할 수 있으며 해당 jar를 빼면 정상 동작합니다. DRM 처리를 한 경우 DRM 처리가 잘못되어 발생할 수도 있으며, 제품이 만든 원본 파일은 정상적으로 열립니다.
- 콤보 드롭다운 리스트를 사용하는 경우: 정상 처리를 위해 `.xlsx` 포맷으로 다운로드합니다. `ComboValidation:1`을 설정한 시트를 xls로 다운로드하면 1000건 정도까지는 정상이고 그 이상이면 파일 손상 메시지가 난 사례가 있으며 xlsx로 다운로드하면 정상입니다.
- IE에서 '이 통합문서를 복구하시겠습니까' 메시지가 나며 파일이 깨지는 현상은 euc-kr 환경에서 정상 동작하지 않는 것으로 확인되었습니다.
- 특정 PC에서만 열리지 않으면 캐시 문제일 수 있으므로 캐시를 삭제한 뒤 다시 시도합니다. `FileName`을 지정하지 않아 xls로 다운로드되더라도 Excel 2013에서 열리지 않는 것은 아닙니다.

**키워드**: 예기치 않은 입력의 끝, xalan.jar, ComboValidation, xlsx, 통합문서를 복구, 파일 손상, HiddenColumn

---

### [XLS-0813] 한셀 등 다른 프로그램으로 엑셀 파일을 열 때 열리지 않거나 값이 어긋나는 경우

**질문**

- 엑셀 파일이 열리지 않습니다. 어떤 점을 확인해야 하나요?
- 시트에서는 비고 컬럼이 비어 있는데 엑셀로 내려받은 파일을 열면 옆 셀의 값이 복사되어 들어가 있습니다.

**답변**

PC에 엑셀 프로그램이 설치되어 있지 않아 한셀로 열고 있는 경우 파일이 열리지 않거나 셀 값이 어긋나 보일 수 있습니다. 서버모듈과 클라이언트 모듈이 내려주는 xlsx는 기본 Excel 프로그램에서의 호환성을 보장하며, 한셀 같은 다른 프로그램에서의 동작까지 모두 보장하지는 않습니다. 먼저 브라우저에서 제공하는 기본 엑셀 프로그램(Excel)으로 열어 확인합니다. 특이한 셀 값이나 문서가 원인이면 보정 로직을 추가한 제품 패치가 필요할 수 있습니다.

**키워드**: 한셀, xlsx, 엑셀 파일 안 열림, 셀 값 복사, Excel 호환성

---

### [XLS-0814] 암호를 설정해 다운로드한 엑셀 파일이 암호가 틀렸다며 열리지 않을 때

**질문**

- 암호를 설정해 다운로드한 엑셀 파일을 열 때 영문자가 포함된 암호를 입력해도 암호가 틀리다며 열리지 않습니다.

**답변**

엑셀 파일을 열어 비밀번호를 입력할 때 IME가 한글 상태여서 발생한 경우입니다. IME를 영문으로 설정하고 입력하면 정상적으로 열립니다.

**키워드**: 엑셀 암호, 비밀번호, IME, 한글 상태, 암호가 틀림

---

### [XLS-0815] 다운로드한 엑셀에서 열을 추가하는 등 편집할 때 매우 느린 이유

**질문**

- IBSheet로 다운로드한 엑셀에서 열을 추가하는 등 편집할 때 매우 느립니다. 새 파일에 값 복사를 하면 정상입니다.

**답변**

자동 줄 바꿈(Word-wrap) 속성을 준 상태로 엑셀을 다운로드하면 열을 추가할 때 매우 느려지는 현상이 있었으며, 이 속성을 적용하지 않으면 해결됩니다. 엑셀 쪽 문제로 보이며 IBSheet 문제는 아닌 것으로 판단됩니다.

**키워드**: 자동 줄 바꿈, Word-wrap, 엑셀 편집 느림, 열 추가, 엑셀 다운로드

---

### [XLS-0816] 엑셀 다운로드 파일에 데이터는 없고 헤더만 있을 때 브라우저 배율 확인

**질문**

- 엑셀 다운로드 파일을 열어 보면 데이터는 없고 헤더만 있으며 조회했던 내용도 사라집니다.

**답변**

브라우저 배율 때문에 발생하는 현상입니다. 브라우저 배율 설정을 확인합니다.

**키워드**: 브라우저 배율, 헤더만 출력, 엑셀 다운로드, 데이터 없음

---

### [XLS-0817] IE에서 Edge로 바꾼 뒤 엑셀 다운로드가 느려지는 원인

**질문**

- IE에서 Edge로 바꾸었더니 엑셀 다운로드 시간이 IE보다 두 배 정도 더 걸립니다. 원인과 개선 방법이 있나요?

**답변**

Windows 보안의 '앱 및 브라우저 컨트롤' 항목에서 평판 기반 보호 기능과 smartscreen 기능으로 인해 다운로드 속도가 저하되는 현상일 수 있습니다. 해당 보안 기능 설정을 확인합니다.

**키워드**: Edge, 다운로드 속도, smartscreen, 평판 기반 보호, 엑셀 다운로드 느림

---

### [XLS-0818] 엑셀 다운로드 후 파일을 자동으로 열리게 할 수 있나요?

**질문**

- 엑셀 다운로드 후 브라우저 알림에서 예를 눌렀을 때 파일이 자동으로 실행되게 할 수 있나요?

**답변**

지원되지 않습니다. IBSheet는 엑셀 다운로드 동작까지만 기능하며, 다운로드한 파일을 여는 동작은 브라우저에서 관리합니다. 특정 확장자의 파일을 무조건 여는 방법은 브라우저 쪽 기능이므로 브라우저 설정 방법을 별도로 확인해 적용해야 합니다.

**키워드**: 파일 자동 열기, 엑셀 다운로드, 브라우저 설정, 다운로드 후 실행

---

### [XLS-0819] hwp 같은 파일을 다운로드할 때 저장되지 않고 브라우저에서 바로 열려 글자가 깨질 때

**질문**

- 시트에서 파일을 다운로드했을 때 hwp 같은 파일이 다운로드되지 않고 브라우저에서 바로 읽혀 글자가 깨집니다.

**답변**

MIME 설정이 되어 있지 않아서 발생하는 것으로 보입니다. 서버의 MIME 설정을 확인합니다.

**키워드**: MIME, hwp, 파일 다운로드, 글자 깨짐

---

### [XLS-0820] 엑셀 다운로드 시 파일명이 Down2Excel.jsp 형태로 저장되는 이유

**질문**

- 엑셀 다운로드 시 대부분의 PC에서는 정상인데 일부 PC에서는 파일이 Down2Excel.jsp?... 형태의 이름으로 저장됩니다.
- 일부 IE 브라우저에서만 엑셀 다운로드 시 Down2Excel.jsp 파일이 내려오고 크롬에서는 정상입니다.

**답변**

원인별로 확인합니다.

- 사용자 브라우저가 호환성 보기나 다른 버전의 브라우저 모드를 사용하면, 서버에서 브라우저별 파일명을 설정하는 부분을 거치지 못해 발생할 수 있습니다. 받은 파일의 확장자를 xls로 바꿔 정상 엑셀 파일인지 확인하고, 개발자도구에서 에뮬레이트 모드를 쓰고 있지 않은지 확인합니다.
- `Down2Excel.jsp`의 `Synchronizer.use` 부분에서 값을 정상적으로 반환하지 않아 발생한 사례도 있습니다. 서버모듈 jar를 교체해야 하며(서버모듈 ibsheet7-1.1.106.jar 적용 사례), jar를 교체하면 ibsheet.js도 함께 교체합니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.106.jar 적용 사례

**키워드**: Down2Excel.jsp, 파일명, 호환성 보기, Synchronizer.use, ibsheet7-1.1.106.jar, 에뮬레이트 모드

---

### [XLS-0821] 엑셀 다운로드 시 server busy 오류가 나고 이후 다운로드가 안 될 때(Synchronizer)

**질문**

- 엑셀 다운로드 시 server busy 오류가 발생하고 이후 다운로드가 되지 않습니다.

**답변**

서버모듈에서 `Synchronizer.init(5);` 옵션을 사용하면, 사용자가 다운로드 도중 작업을 취소하거나 오류가 발생했을 때 자원이 반환되지 않아 그 이후 다운로드가 불가능해질 수 있습니다. 자원을 자동으로 반환하는 기능이 추가된 라이브러리로 업데이트합니다. 그 전까지는 `Synchronizer` 사용을 중단하거나 숫자를 늘리고 필요 시 리셋하도록 합니다.

**키워드**: Synchronizer.init, server busy, 엑셀 다운로드, 자원 반환, 서버모듈

---

### [XLS-0822] DRM 적용 엑셀 다운로드에서 0kb 파일 또는 'package SCSL does not exist' 오류

**질문**

- DRM을 적용한 엑셀 다운로드(Down2Excel)에서 서버에 따라 파일이 0kb로 내려오거나 `package SCSL does not exist` 오류가 납니다.

**답변**

DRM(softcamp)으로 다운로드 파일을 암호화할 때 서버에 해당 모듈 구성이 갖춰지지 않아 발생합니다. 서버마다 구축된 내용이 달라, `scsl.jar`만 있고 softcamp 경로 설정이 없는 경우와 경로 설정은 있는데 jar 파일이 없는 경우가 있었습니다. softcamp 환경을 서버에 맞게 구성하면 해결됩니다.

**키워드**: DRM, softcamp, scsl.jar, package SCSL does not exist, 0kb, Down2Excel

---

### [XLS-0823] 엑셀 다운로드·업로드 시 base.xml 호출이 403 오류가 나는 이유

**질문**

- Down2Excel.jsp로 엑셀 다운로드·업로드를 할 때 같이 호출되는 base.xml이 403 오류가 납니다.

**답변**

엑셀 다운로드·업로드 시 내부적으로 `base.xml`을 호출하는데 이 호출이 POST 전송입니다. 정적인 파일을 POST로 전송하면 서버에서 403이 발생하며, 이는 버전 업그레이드로 해결할 수 있습니다.

**키워드**: base.xml, 403, POST, Down2Excel.jsp, 버전 업그레이드

---

### [XLS-0824] 닷넷 모듈 교체 후 Down2Excel 호출 시 Down.dll을 찾지 못할 때

**질문**

- 닷넷 모듈을 1.1.0.27에서 28로 변경한 뒤 Down2Excel을 호출하면 내부적으로 Down.dll 모듈을 찾지 못합니다.

**답변**

Visual Studio 버전의 차이로 `Down.dll`이 제대로 로드되지 않아 발생하는 것으로 보입니다(dll을 찾을 수 없다는 오류가 표시됩니다).

**적용 버전**: 닷넷 모듈 1.1.0.27에서 28로 변경 시

**키워드**: Down.dll, 닷넷 모듈, Down2Excel, Visual Studio

---

### [XLS-0825] Down2Excel을 호출하면 화면이 새로고침되고 엑셀에 헤더만 내려오는 원인은?

**질문**

- Down2Excel을 호출하면 화면이 새로고침된 것처럼 보이고 내려받은 엑셀에 헤더만 있고 데이터가 없습니다. 원인이 무엇인가요?

**답변**

엑셀 다운로드 전에 그리드를 초기화하는 코드가 있으면 이런 증상이 나타납니다. 그리드 초기화는 조회할 때만 수행하도록 코드를 수정하면 해결됩니다.

**키워드**: Down2Excel, 엑셀 헤더만 다운로드, 그리드 초기화, 화면 새로고침, 데이터 없음

---

### [XLS-0826] 엑셀로 내려받을 때 다중 헤더가 첫 행만 나오거나 DownRows 지정 시 헤더가 빠지는 이유는?

**질문**

- 헤더가 여러 줄(머지된 2행)인데 엑셀로 내려받으면 첫 행만 출력되고 아래 헤더 행이 내려오지 않습니다. 어떻게 해야 하나요?
- 엑셀 다운로드에서 DownRows로 행을 지정해 내려받으면 헤더가 다운로드되지 않습니다. 헤더도 같이 받으려면 어떻게 하나요?

**답변**

원인과 확인 순서는 다음과 같습니다.

- `DownRows`로 다운로드할 행을 지정하면 지정하지 않은 헤더 행은 빠집니다. 헤더 행의 index도 함께 지정하면 헤더가 정상적으로 다운로드됩니다.
- 별도 속성이 없으면 기본적으로 화면의 헤더 행과 데이터 행이 모두 다운로드됩니다. 헤더 행 다운로드 여부는 `DownHeader` 인자가 정하며 기본값이 `1`이라 헤더 여러 줄이 모두 내려갑니다. `Merge` 속성은 병합 여부를 엑셀에 적용할지를 정할 뿐 헤더를 한 줄만 내려받게 하지 않습니다.
- 인자 없이 `Down2Excel()`을 호출해 정상 동작하는지 확인하고, 공통 함수에서 `DownHeader`나 `DownRows`가 설정되어 있는지 확인합니다.

**키워드**: DownHeader, DownRows, Merge, Down2Excel, 헤더 누락, 다중 헤더

---

### [XLS-0827] 엑셀 다운로드 결과에 데이터가 없거나 헤더만 내려올 때 점검할 원인은 무엇인가요?

**질문**

- 엑셀 다운로드 버튼을 누르면 데이터가 전부 사라진 상태로 엑셀이 내려옵니다. 버튼 처리 로직에서 어떤 원인을 점검해야 하나요?
- 엑셀 다운로드를 하면 헤더만 내려오고 데이터가 내려오지 않으며 화면에서도 스크립트 에러가 납니다. 데이터 건수만큼 행은 그려집니다. 원인이 무엇인가요?

**답변**

다음 원인을 확인합니다.

- 다운로드 버튼 처리 함수에서 엑셀 다운로드 분기로 들어가기 전에 그리드를 초기화하는 함수가 호출되면 데이터가 비어 내려옵니다. 다운로드 전에 그리드를 초기화하는 로직이 실행되지 않도록 수정해야 합니다.
- 시트를 초기화할 때 컬럼의 type을 설정하지 않은 경우 헤더만 내려오고 데이터가 내려오지 않는 증상이 나타납니다(화면에서 스크립트 에러가 나고 데이터 건수만큼 행만 그려지는 경우 포함). 시트 초기화 시 각 컬럼에 type을 설정했는지 확인합니다.

**키워드**: 엑셀 다운로드 헤더만, 데이터 없음, 그리드 초기화, 컬럼 type, 스크립트 에러

---

### [XLS-0828] 크롬에서 엑셀을 다운로드하면 파일명 뒤에 숫자와 chrome.exe.xls가 붙는 원인은?

**질문**

- 크롬에서 시트를 엑셀로 다운로드하면 원래 파일명 뒤에 숫자와 chrome.exe.xls가 더 붙은 이름으로 내려옵니다. 원인이 무엇인가요?

**답변**

DRM의 영향으로 보입니다. 제품은 파일을 정상적인 이름으로 내려주는데, 내려받은 이후에 `_숫자_chrome.exe.xls`가 붙는 것으로 보아 DRM이 데이터를 체크해서 파일명을 조작하는 것으로 추정됩니다.

**키워드**: chrome.exe.xls, DRM, 파일명 변경, 크롬 엑셀 다운로드, 엑셀 파일명

---

### [XLS-0829] 특정 데이터 때문에 엑셀 다운로드가 0KB 파일, 빈 파일, 오류로 끝나는 원인과 조치는 무엇인가요?

**질문**

- 엑셀 다운로드 시 화면이 멈추거나 0KB 파일이 생성됩니다. 특정 데이터를 내려받을 때만 발생하는데 원인과 해결 방법은 무엇인가요?
- 엑셀 다운로드에서 전체 데이터를 받으면 빈 파일이 내려오고, 필터링으로 데이터를 줄이면 정상 파일이 내려옵니다. 원인이 무엇인가요?
- 시트에 표시된 데이터에 아스키코드 11, 13 같은 특수문자가 있어 엑셀로 내려받을 때 오류가 납니다. 어떻게 처리하나요?

**답변**

데이터 값이 원인인 경우가 있으며 증상별로 확인합니다.

- 화면이 멈추거나 0KB 파일이 생성되는 경우: 엑셀 엔진은 `=`, `+`, `-`, `@`로 시작하는 셀 값을 수식으로 해석하려 하고, 파싱에 실패하면 저장 프로세스가 중단되어 이런 증상이 나는 것으로 판단됩니다. 내보내기 직전에 첫 글자가 `=+-@`인 값 앞에 작은따옴표(`'`) 또는 공백을 추가하거나, 해당 데이터의 셀 타입을 `Text`로 강제 지정하여 저장합니다.
- 전체 데이터에서만 빈 파일이 내려오는 경우: 서버 콘솔에 `Maximum number of characters in a cell 32767` 메시지가 나오는지 확인합니다. 한 셀에 들어갈 수 있는 길이(32767)를 초과하는 문자열이 오면 워크시트 생성 중 오류가 나서 빈 파일이 내려오는 것으로 보입니다. 이런 컬럼은 엑셀 다운로드에서 제외하거나 조회 시점에 데이터를 줄여 파일이 정상적으로 만들어지게 합니다.
- 아스키코드 11, 13 같은 제어문자로 오류가 나는 경우: 조회 시점에 해당 코드가 변환되도록 처리합니다. `OnLoadData` 이벤트에서 조회 데이터를 `div` 요소의 `innerHTML`에 넣었다가 `innerText`로 꺼내 반환하면 해당 코드가 제거되어 표시됩니다. 이 이벤트는 반드시 값을 return 해야 합니다.

**키워드**: characters in a cell 32767, 0KB 파일, OnLoadData, 수식 문자 시작, 빈 파일

---

### [XLS-0830] 시트를 엑셀로 다운로드하면 특정 행(예: 307번)에서 끊기고 드래그 복사도 같은 행에서 끊기는 원인은?

**질문**

- 900행 정도 되는 시트를 엑셀로 다운로드하면 307번 행까지만 내려받아집니다. 드래그 복사도 같은 행에서 끊깁니다. 원인은 무엇인가요?

**답변**

해당 행의 데이터에 특수 문자가 포함되어 있을 가능성이 있으며, 이 경우 드래그 복사도 그 행에서 끊깁니다. DB에서 해당 필드를 확인해 올바른 문자로 변경해 봅니다.

**키워드**: 엑셀 다운로드 중단, 특수 문자, 드래그 복사, 행 끊김, 데이터 확인

---

### [XLS-0831] 셀에 <텍스트> 형태로 꺾쇠로 감싼 데이터가 있으면 Down2Excel로 내려받은 엑셀에서 잘리는 이유는?

**질문**

- 엑셀 다운로드 시 셀에 `<텍스트>` 형태의 데이터가 있으면 Down2Excel로 내려받은 파일에서 해당 데이터가 잘려서 추출됩니다. 원인과 해결 방법은 무엇인가요?

**답변**

다운로드할 데이터를 JSON으로 만들어 전송하는 과정에서 `replace(/(<([^>]+)>)/ig, '')`처럼 HTML 태그를 제거하는 정규식을 적용하면 `<`로 감싼 데이터가 누락됩니다. `getGridJSON()`으로 뽑은 데이터에는 `<`까지 정상 포함되므로 해당 정규식 로직을 수정해야 할 것으로 보입니다.

**키워드**: getGridJSON, Down2Excel, 꺾쇠 데이터 잘림, HTML 태그 제거 정규식, replace

---

### [XLS-0832] 특정 화면에서만 엑셀 다운로드 시 IBSheetData.isColVisible에서 NullPointerException이 발생합니다

**질문**

- 다른 화면은 되는데 특정 화면에서만 엑셀 다운로드 시 IBSheetData.isColVisible에서 NullPointerException이 발생합니다. 원인과 해결 방법은 무엇인가요?

**답변**

SaveName에 헤더에 들어갈 문구를 그대로 쓰면 엑셀 다운로드 시 `IBSheetData.isColVisible`에서 NullPointerException이 발생합니다. 헤더처럼 `|` 구분자가 들어간 두 줄 한글 문구를 SaveName으로 쓰거나, 조회 후 `Reset()`하고 추가한 컬럼의 SaveName을 Header와 같게 쓴 경우가 해당합니다. SaveName을 헤더 문구와 다른 값(예: 영문)으로 바꾸면 해결됩니다.

**키워드**: SaveName, IBSheetData.isColVisible, NullPointerException, Reset, 헤더 문구

---

### [XLS-0833] ShowFilterRow, SetAutoSumPosition(0) 사용 시 Down2Excel 결과에 KeyFieldMark가 표시되지 않습니다

**질문**

- 컬럼에 KeyField:1을 선언하고 ShowFilterRow 또는 SetAutoSumPosition(0)을 사용한 뒤 Down2Excel로 내려받으면 KeyFieldMark가 표시되지 않습니다. 해결 방법이 있나요?

**답변**

`ShowFilterRow` 또는 `SetAutoSumPosition(0)`을 사용할 때 `Down2Excel` 결과에 `KeyFieldMark`가 표시되지 않는 현상은 서버모듈 43버전, Sheet 108 버전에서 발생하며, 109 버전 릴리즈에서 처리되었습니다.

**적용 버전**: 서버모듈 43버전·Sheet 108 버전에서 발생, 109 버전에서 수정

**키워드**: KeyFieldMark, KeyField, ShowFilterRow, SetAutoSumPosition, Down2Excel

---

### [XLS-0834] 엑셀 다운로드 함수(Down2Excel) 호출 시 스크립트 에러가 나면 ExportMode 설정을 확인해야 하나요?

**질문**

- 엑셀 다운로드 함수(Down2Excel)를 호출하면 스크립트 에러가 발생합니다. 원인이 무엇인가요?

**답변**

`ExportMode`가 2로 설정되어 있으면 `Down2Excel`에서도 스크립트 에러가 발생합니다. `ExportMode` 설정값을 확인합니다.

**키워드**: ExportMode, Down2Excel, 스크립트 에러, ExportMode 2

---

### [XLS-0835] Down2Excel.jsp로 엑셀 다운로드 중 오류가 나도 서버 로그에 아무것도 남지 않을 때 오류를 확인하는 방법

**질문**

- Down2Excel.jsp로 엑셀 다운로드 중 오류가 나도 서버 로그에 아무것도 남지 않습니다. 오류 메시지는 어떻게 확인하나요?

**답변**

`Down2Excel.jsp`는 오류가 발생하더라도 로그를 남기지 않습니다. 오류 메시지를 보려면 catch() 문에 있는 `e.printStackTrace()`의 주석을 해제합니다.

**키워드**: Down2Excel.jsp, printStackTrace, 오류 로그, catch, 서버 로그

---

### [XLS-0836] Down2Excel을 호출했는데 엑셀 대신 페이지가 이동하거나 jsp 파일·웹페이지 파일이 다운로드됩니다

**질문**

- down2excel을 호출하면 엑셀이 다운로드되지 않고 페이지가 이동합니다. JSP 설정 중 무엇을 확인해야 하나요?
- 엑셀 다운로드를 하면 down2excel.jsp 파일이 실행되지 않고 파일 자체가 그대로 다운로드됩니다. 원인이 무엇인가요?
- 특정 PC에서만 Down2Excel로 엑셀 다운로드를 누르면 엑셀 대신 웹페이지 같은 파일이 다운로드됩니다. 원인과 해결 방법은 무엇인가요?

**답변**

증상에 따라 다음을 확인합니다.

- 엑셀이 다운로드되지 않고 페이지가 이동하는 경우: JSP 페이지에서 에러가 나기 때문입니다. `isUTF8`을 `false`로 설정해야 하는데 `true`로 설정해서 에러가 난 사례가 있으므로 `isUTF8` 설정을 확인합니다.
- `down2excel.jsp` 파일 자체가 그대로 다운로드되는 경우: 브라우저로 직접 접근해도 파일이 그대로 다운로드된다면 jsp가 실행되지 않는 서버 설정 문제로 보이므로 서버 설정을 확인합니다.
- 특정 PC에서만 엑셀 대신 웹페이지 같은 파일이 내려오는 경우: 브라우저의 영향이 클 것으로 보입니다. 접속하는 URL에 대한 호환성 보기 모드를 해제하거나 브라우저 > 고급 > 옵션에서 초기화를 해 봅니다.

**키워드**: isUTF8, down2excel.jsp, 호환성 보기, 페이지 이동, jsp 실행 안 됨, 브라우저 초기화

---

## 다운로드 표시·옵션 기타

### [XLS-0837] 엑셀 다운로드 시 조회된 데이터가 없으면 안내 메시지를 띄우는 기능이 있나요? (IBSheet3에 있던 기능)

**질문**

- 이전 버전 IBSheet3에서는 엑셀 다운로드 시 조회된 데이터가 없으면 안내 메시지가 나왔는데, 현재 버전에서는 같은 기능을 쓸 수 없나요?

**답변**

조회된 데이터가 없다는 메시지를 보여주는 별도 기능은 없습니다. `SearchRow()`로 조회된 값을 읽어서 `alert()`으로 경고를 직접 표시해야 할 것으로 보입니다.

**키워드**: SearchRow, alert, 엑셀 다운로드, 조회 데이터 없음, IBSheet3

---

### [XLS-0838] LoadExcel의 MaxFileSize를 초과하면 뜨는 경고 메시지를 원하는 문구로 바꿀 수 있나요?

**질문**

- LoadExcel의 MaxFileSize 제한을 넘는 파일을 올릴 때 뜨는 경고 메시지를 원하는 문구(예: 4MB를 초과할 수 없습니다)로 바꿀 수 있나요?

**답변**

시트가 사용자에게 보여주는 메시지는 ibmsg 파일에 정리되어 있으며, 이 파일은 JavaScript Object 형태로 제공됩니다. `Lang > Alert > SYS_ExceedFileSize` 값을 수정하면 그 값이 경고 메시지로 적용됩니다.

**키워드**: MaxFileSize, SYS_ExceedFileSize, ibmsg, 경고 메시지 변경, LoadExcel

---

### [XLS-0839] 암호가 설정된 엑셀 파일을 LoadExcel로 업로드할 때 암호를 입력받는 다이얼로그가 있나요? 암호는 어떻게 전달하나요?

**질문**

- 암호가 설정된 엑셀 파일을 LoadExcel로 업로드할 때 암호를 입력받는 다이얼로그가 제공되나요? 암호는 어떻게 전달하나요?

**답변**

암호를 입력받는 다이얼로그 창 기능은 지원하지 않으므로 별도로 input 등으로 암호를 입력받아 구현해야 합니다. 입력받은 암호는 `LoadExcel({ WorkbookPassword: '암호값' })`처럼 `WorkbookPassword` 파라미터에 지정합니다. 파라미터명은 `WorkbookPassword`이며 `WordbookPassword`가 아닙니다.

**키워드**: WorkbookPassword, WordbookPassword, LoadExcel, 엑셀 암호, 암호 입력 다이얼로그

---

### [XLS-0840] 엑셀 다운로드 시 데이터 길이에 맞게 엑셀 컬럼 너비를 자동 조정하려면 어느 버전부터 가능한가요?

**질문**

- 엑셀 다운로드 시 데이터 길이에 맞게 엑셀 컬럼 너비가 조정되도록 FitColWidth와 별개로 옵션을 줄 수 있는 방법이 있나요?

**답변**

엑셀 다운로드 시 데이터 길이에 맞게 엑셀 시트의 컬럼 너비를 조정하는 기능은 IBSheet7 7.0.13.261-20241227-1407-M 버전 배포로 처리되었습니다. `FitColWidth`와는 별개의 기능이므로 해당 버전 이상을 적용합니다.

**적용 버전**: 7.0.13.261-20241227-1407-M

**키워드**: 엑셀 컬럼 너비 자동 조정, FitColWidth, 데이터 길이 맞춤, 7.0.13.261-20241227-1407-M

---

### [XLS-0841] 엑셀 다운로드에서 합계·푸터·그룹 행(AutoSum·ShowFooterRow·GroupSumType)이 잘못 표시될 때 수정 버전은?

**질문**

- 엑셀 다운로드에서 AllTypeToText: 1 옵션을 사용하면 합계 데이터의 천단위 구분기호가 사라집니다. 해결된 버전이 있나요?
- 엑셀 다운로드 시 ShowFooterRow로 추가한 행이 다운로드되지 않았는데, 버전 패치 이후 FooterRow도 포함되고 '양식이 맞지 않습니다' 경고가 발생합니다.
- 그룹 행에 GroupSumType으로 건수와 합계를 표시한 시트를 엑셀로 다운로드하면 그룹 행의 값이 나오지 않고 AutoSum 컬럼에 지정한 포맷(#,##0)도 적용되지 않습니다. 해결된 버전이 있나요?
- ShowSubSum을 사용하는 시트에서 엑셀 다운로드 시 AutoSum 합계의 소수점이 누락되고 Format을 지정해도 적용되지 않습니다. 수정된 버전은?

**답변**

엑셀 다운로드에서 합계·푸터·그룹 행이 잘못 표시되는 증상은 다음 버전에서 처리되었습니다.

- `AllTypeToText: 1` 옵션을 사용할 때 합계 데이터에서 천단위 구분기호가 없어지는 현상: IBSheet7 7.0.13.264-20250120-1031 버전으로 처리되었습니다.
- `ShowFooterRow`로 추가한 행이 엑셀 다운로드에 포함되지 않다가 버전 패치 이후 포함되면서 '양식이 맞지 않습니다' 경고 메시지가 발생하는 현상: IBSheet7 7.0.13.121 버전 배포로 처리되었습니다.
- 그룹 행에 `GroupSumType`으로 건수와 합계를 표시했을 때 그룹 행의 값이 나오지 않고 AutoSum 컬럼에 지정한 포맷(`#,##0`)이 적용되지 않는 증상: IBSheet7 7.0.13.82 버전 배포로 처리되었습니다.
- `ShowSubSum()`을 사용하는 AutoSum 합계의 소수점이 누락되는 증상: ibsheet.js 7.0.13.266 버전 배포로 처리되었습니다.

**적용 버전**: 7.0.13.264-20250120-1031(천단위), 7.0.13.121(푸터 행), 7.0.13.82(그룹 행), 7.0.13.266(AutoSum 소수점)

**키워드**: AllTypeToText, ShowFooterRow, GroupSumType, ShowSubSum, AutoSum 소수점, 합계 천단위

---

### [XLS-0842] 엑셀 다운로드에서 셀 서식의 테두리 이중선·대각선을 지원하나요? 어느 버전부터인가요?

**질문**

- 엑셀의 셀 서식(테두리 탭)에서 지원하는 테두리 이중선과 테두리 대각선 기능을 지원할 수 있나요?

**답변**

엑셀 셀 서식의 테두리 탭에서 지원하는 일부 기능(테두리 이중선, 테두리 대각선) 요청은 IBSheet7 7.0.13.118 버전 배포로 처리되었습니다.

**적용 버전**: 7.0.13.118에서 처리

**키워드**: 테두리 이중선, 테두리 대각선, 엑셀 셀 서식, 7.0.13.118

---

### [XLS-0843] 엑셀 다운로드 결과에 틀 고정(·특정 문자 글꼴 색)을 적용하려면 어느 버전이 필요한가요?

**질문**

- IBSheet7 엑셀 다운로드 결과 문서에 틀 고정과 특정 문자의 글꼴 색 설정을 적용할 수 있나요? 지원되는 버전이 궁금합니다.
- 엑셀 다운로드 결과에 틀 고정을 설정하고 싶은데 ibsheet.js 7.0.13.199, 서버모듈 2.0.73 환경에서는 어떻게 해야 하나요?

**답변**

엑셀 다운로드의 틀 고정 기능은 버전에 따라 다음과 같이 안내됩니다.

- 틀 고정과 특정 문자 글꼴 색 설정 기능은 ibsheet.js 7.0.13.218과 서버모듈 jar 2.1.6 버전에서 추가되었습니다.
- 엑셀 다운로드 시 틀 고정을 설정하는 기능이 ibsheet.js 7.0.13.268과 서버모듈 `ibsheet7-2.1.34.jar` 버전 배포로 처리되었다는 안내도 있습니다. ibsheet.js 7.0.13.199, 서버모듈 2.0.73 환경에서 틀 고정이 필요하면 이 버전들로 업그레이드해야 합니다.
두 안내의 버전이 서로 달라 정확한 지원 시점은 확인이 필요하므로, 틀 고정이 적용되지 않으면 더 높은 버전(7.0.13.268, 서버모듈 2.1.34)을 적용해 확인합니다.

**적용 버전**: ibsheet.js 7.0.13.218, jar 2.1.6에서 기능 추가; ibsheet.js 7.0.13.268, jar 2.1.34 배포 안내도 있음

**키워드**: 엑셀 틀 고정, 특정 문자 글꼴 색, 7.0.13.218, 7.0.13.268, ibsheet7-2.1.34.jar, 서버모듈 2.1.6

---

### [XLS-0844] SearchEnd에서 바꾼 셀 포맷이 엑셀 다운로드에 반영되지 않고 초기 설정 포맷으로 나오는 현상은 어느 버전에서 수정되나요?

**질문**

- Float 컬럼을 PointCount:2로 초기화하고 SearchEnd에서 특정 셀의 포맷을 바꿨는데, 엑셀 다운로드하면 변경한 포맷이 아닌 처음 설정한 포맷으로 나옵니다. 수정 버전은?

**답변**

SearchEnd에서 변경한 셀 포맷이 엑셀 다운로드에 반영되지 않고 초기 설정 포맷으로 나오는 현상은 IBSheet7 7.0.0.0-20140515-15 버전 배포로 처리되었습니다.

**적용 버전**: 7.0.0.0-20140515-15에서 수정

**키워드**: SearchEnd, 셀 포맷 변경, PointCount, 엑셀 다운로드 포맷, 7.0.0.0-20140515-15

---

### [XLS-0845] 필터를 적용한 뒤 엑셀 다운로드를 하면 필터된 목록이 아니라 전체 데이터가 내려오는 현상은 어느 버전에서 처리되나요?

**질문**

- 필터를 적용한 뒤 엑셀 다운로드를 하면 필터된 목록이 아니라 전체 데이터가 다운로드됩니다. 필터된 데이터만 받을 수 있나요?

**답변**

필터를 적용한 뒤 엑셀 다운로드를 하면 필터된 목록이 아니라 전체 데이터가 다운로드되는 증상은 IBSheet7 7.0.13.270 버전 배포로 처리되었습니다.

**적용 버전**: 7.0.13.270에서 처리

**키워드**: 필터 적용 엑셀 다운로드, 전체 데이터 다운로드, 필터된 데이터만, 7.0.13.270

---

### [XLS-0846] 라디오버튼(그룹) 컬럼을 엑셀로 다운로드할 때 값이 아닌 텍스트로 표시하려면 어느 버전부터 가능한가요?

**질문**

- 라디오버튼(그룹) 컬럼을 엑셀로 다운로드할 때 값이 아닌 텍스트로 표시하고 싶습니다. 지원하는 버전이 있나요?

**답변**

라디오버튼 그룹 컬럼을 엑셀 다운로드에서 값이 아닌 텍스트로 표시하는 기능은 7.0.13.63 버전 사용 중 요청된 사항으로, IBSheet7 7.0.13.71-20161206-17 버전으로 처리되었습니다.

**적용 버전**: 7.0.13.71-20161206-17에서 처리

**키워드**: 라디오버튼 그룹, 엑셀 다운로드 텍스트 표시, 7.0.13.71-20161206-17, 7.0.13.63

---

### [XLS-0847] 새로 입력한 행이 엑셀 다운로드에서 빠지고 신규 입력 데이터의 정렬도 무시되는 현상은 어느 버전에서 수정되나요?

**질문**

- 데이터를 새로 입력한 뒤 엑셀 다운로드를 하면 조회한 건수만 내려오고 신규 입력 행이 빠지며, 신규 입력 데이터의 정렬도 무시됩니다. 어떻게 해결하나요?

**답변**

새로 입력한 행이 엑셀 다운로드에서 빠지고 정렬도 무시되는 증상은 ibsheet.js 7.0.13.68-20161104-09, ibexcel.js 7.0.0.3-20161104-13 버전 배포로 처리되었습니다.

**적용 버전**: ibsheet.js 7.0.13.68-20161104-09 배포(ibexcel.js 7.0.0.3-20161104-13)

**키워드**: 신규 입력 행 누락, 엑셀 다운로드 정렬, ibexcel.js, 7.0.13.68-20161104-09, 7.0.0.3-20161104-13

---

### [XLS-0848] 엑셀 컬럼이 500개인 파일에서 30~40개 컬럼만 HeaderMatch로 업로드할 수 있나요?

**질문**

- 엑셀 파일의 컬럼이 500개인데 헤더 매칭(HeaderMatch)은 30~40개 컬럼만 하려고 합니다. 이런 경우 사용할 수 있나요?

**답변**

서버 모듈 1.1.29 jar에서는 HeaderMatch가 잘 동작했고, 이 건은 7.0.3.2-20141008-13 제품을 테스트용으로 사용했습니다. 다만 컬럼이 많은 파일에서의 가능 여부는 확인된 내용이 없으므로 사용 환경에서 직접 테스트가 필요합니다.

**적용 버전**: 서버 모듈 1.1.29, 제품 7.0.3.2-20141008-13

**키워드**: HeaderMatch, 서버 모듈 1.1.29, 7.0.3.2-20141008-13, 엑셀 컬럼 수

---

### [XLS-0849] 파일 업로드 시 일부 항목의 한글만 깨져 표시되는 서버모듈 인코딩 판단 오류

**질문**

- EDI 형식 파일을 업로드했더니 대부분은 정상인데 일부 항목의 한글만 이상한 문자로 표시됩니다. 원인과 해결 방법은 무엇인가요?

**답변**

서버모듈이 데이터를 읽으면서 인코딩을 판단해 변환할 때, 특정 글자가 한글인데도 ISO-2022-KR 또는 EUC-Kr로 변환되지 못하고 else 분기로 빠져 WINDOWS-1252로 처리되면서 글자가 깨지는 현상입니다. else 분기를 모두 제거하도록 서버모듈이 패치되었으므로 패치된 서버모듈을 적용합니다.

**키워드**: ISO-2022-KR, EUC-Kr, WINDOWS-1252, 인코딩, 한글 깨짐, 서버모듈

---

### [XLS-0850] Down2Text로 csv를 내려받으면 한글이 깨질 때 서버모듈 버전별 Down2Text.jsp 설정

**질문**

- Down2Text로 csv를 내려받으면 한글이 깨집니다. 서버모듈 1.0과 2.0에 따라 Down2Text.jsp의 사용자 환경설정에서 무엇을 어떻게 바꿔야 하나요?

**답변**

서버모듈 버전은 WEB-INF\lib 폴더의 ibsheet7-X.X.X.jar 파일명 숫자로 구분합니다(2.0.37은 서버모듈 2.0, 1.1.99는 서버모듈 1.0). 서버모듈 2.0은 Down2Text.jsp의 [사용자 환경설정 #2]에서 다운로드 받을 문서 타입 설정 부분을 주석 처리하고, 서버모듈 1.0은 같은 [사용자 환경설정 #2]의 BOM 설정 부분 주석을 제거합니다.

**키워드**: Down2Text, Down2Text.jsp, BOM, 사용자 환경설정 #2, csv, 한글 깨짐

---

### [XLS-0851] Windows Server 2016에서 2025로 업그레이드하면 IBSheet7 서버모듈 다운로드 파일명 인코딩이 깨질 수 있나요?

**질문**

- Windows Server 2016에서 2025로 업그레이드하면 IBSheet7 호환성 문제가 있을까요?

**답변**

서버모듈 다운로드 시 파일명 인코딩이 깨질 가능성이 있습니다. 서버를 업그레이드한 뒤 인코딩 문제나 다른 문제가 생기는지 확인합니다.

**키워드**: Windows Server 2025, 파일명 인코딩, 서버모듈, 호환성

---

### [XLS-0852] XSS 취약점 점검에서 IBSheet 제공 JSP가 지적되었을 때 조치와 특수문자 처리

**질문**

- XSS 취약점 점검에서 IBSheet가 제공하는 JSP 파일이 지적되었습니다. 어떻게 조치하나요? 특수문자는 어떻게 치환해야 하나요?

**답변**

점검 보고서의 조치 방법대로 해당 JSP(예: Down2ExcelPattern.jsp)에 소스를 삽입합니다. 다만 <, >, & 같은 문자를 HTML 특수문자 코드 값으로 치환하면 에러가 발생하므로, 이 문자들을 빈 문자열로 치환하는 로직을 구성합니다.

**키워드**: XSS, Down2ExcelPattern.jsp, 특수문자 치환, JSP, 취약점 점검

---

### [XLS-0853] 보안 설정이 < > 를 다른 문자열로 치환해 엑셀 다운로드 오류가 날 때(IIS 보안, web.xml)

**질문**

- 엑셀 다운로드 시 보안 설정이 `<`, `>`를 다른 문자열로 치환해 다운로드 오류가 납니다. IIS 보안이나 web.xml의 `&lt;` 변환 설정이 영향을 주나요?

**답변**

엑셀 다운로드 시 시트는 다운로드할 데이터를 XML과 유사한 구조(`<`, `>` 사용)로 서버에 전송합니다. 웹 서버 보안 설정(IIS 보안)이나 web.xml의 `<`, `>` 변환(`&lt;`, `&gt;`) 설정이 이 문자를 다른 문자열로 치환하면 전송 데이터가 바뀌어 다운로드 오류가 날 수 있습니다. 파일 다운로드·업로드에서 문제가 생길 소지가 있으므로 해당 변환이 다운로드 요청에 적용되는지 점검합니다.

**키워드**: IIS 보안, web.xml, &lt;, &gt;, 엑셀 다운로드, 문자 치환

---

### [XLS-0854] 시트 데이터에 아스키코드 3번(ETX) 문자가 있으면 엑셀 다운로드가 동작하지 않는 문제

**질문**

- 시트 데이터에 아스키코드 3번(ETX) 특수문자가 포함되어 있으면 엑셀 다운로드 기능이 동작하지 않고 오류가 발생합니다. 원인과 해결 방법은 무엇인가요?

**답변**

엑셀 다운로드 시 시트는 데이터의 시작과 끝을 구분하려고 키보드로 입력할 수 없는 특수 구분 기호를 삽입하는데, 아스키코드 3번(ETX)이 이 구분자와 중복되어 파싱 오류가 생깁니다. cfg의 `DocIODelimMode`를 1로 적용하면 구분자를 신규 방식으로 바꿀 수 있고, 서버모듈 Down2Excel.jsp에서 주석 처리된 `down.setDelimMode(1);`도 주석을 해제합니다. 7.0.13.32 이상, ibsheet7-1.1.68.jar 이상에서 사용할 수 있으므로 그보다 낮은 jar는 올려야 하며, 이때 버전별 jsp 파일도 비교 적용하고 테스트합니다. 업그레이드가 어렵다면 DB에서 해당 문자를 치환하는 방법이 있습니다.

**적용 버전**: 7.0.13.32 이상, ibsheet7-1.1.68.jar 이상

**키워드**: DocIODelimMode, setDelimMode, 아스키코드 3번, ETX, Down2Excel.jsp, ibsheet7-1.1.68.jar

---

### [XLS-0855] Date 컬럼을 09(월)-01(일)-2005(년) 같은 형식으로 다운로드한 파일을 서버모듈로 업로드하면 올라가지 않을 때

**질문**

- Date 타입 컬럼을 `09(월)-01(일)-2005(년)` 같은 형식으로 다운로드한 뒤 그대로 업로드하면 값이 올라가지 않습니다. 서버모듈에서만 그런가요?

**답변**

서버모듈 1.x와 2.x 모두 동일한 현상으로 보이며, 해당 형식을 처리하는 기능이 들어 있지 않은 것으로 보입니다. 클라이언트 모듈에서는 업로드가 됩니다.

**키워드**: Date, 날짜 형식, 업로드, 서버모듈 1.x, 서버모듈 2.x, 클라이언트 모듈

---

### [XLS-0856] 소계가 있는 시트 엑셀 다운로드 시 java.text.ParseException Unparseable date 에러

**질문**

- 소계가 있는 시트에서 엑셀 다운로드 시 특정 조건으로 조회했을 때만 에러가 납니다. java.text.ParseException Unparseable date가 발생하는데 어떻게 해결하나요?

**답변**

`java.text.ParseException: Unparseable date` 에러가 발생하며, Date 컬럼 타입을 Text로 바꾸면 에러가 나지 않습니다. 해결 방법은 두 가지입니다.

- date 컬럼 타입을 Text로 바꾸고 `dmf YMD` 포맷으로 사용합니다.
- 이 현상은 서버모듈 1.1.87에서 해결되었으므로 모듈을 최신 버전으로 패치합니다.

**적용 버전**: 서버모듈 1.1.87에서 해결

**키워드**: Unparseable date, ParseException, 소계, dmf YMD, 서버모듈 1.1.87

---

### [XLS-0857] IBSheet7 다운로드 다이얼로그를 쓰려면 전용 ibsheet.js가 필요한가요? PDF 다운로드 추가는 가능한가요?

**질문**

- IBSheet7에서 엑셀 다운로드 다이얼로그를 쓸 수 있나요? 일반 배포본과 다른 파일이 필요한지, 수정이나 기술지원에 제한이 있는지 궁금합니다.
- 다운로드 다이얼로그에 엑셀·텍스트처럼 같은 다운로드 버튼과 구분값만으로 PDF 다운로드를 추가할 수 있나요?

**답변**

다운로드 다이얼로그는 일반 배포 ibsheet.js가 아니라 다이얼로그가 포함된 전용 ibsheet.js를 써야 하며, 구성이 달라 이후 기술지원이 원활하지 않을 수 있습니다. 이 기능은 별도 제품(금융권 버전)에 있었고 IBSheet8의 다이얼로그가 이를 기반으로 개발되었습니다. IBSheet7은 다이얼로그 소스가 ibsheet.js 내부 코어에 포함되어 있어 수정이 제한적이며, 별도로 PDF 다운로드가 필요하면 기능을 추가하는 제품 패치가 필요해 자체적으로 진행하기 어렵습니다. IBSheet8은 별도 파일(ibsheet-dialog.js)로 제공되어 프로젝트에 맞게 수정할 수 있습니다.

**키워드**: 다운로드 다이얼로그, ibsheet.js, ibsheet-dialog.js, PDF 다운로드, IBSheet8

---

### [XLS-0858] 서버모듈에 malgun.ttf, gulim.ttf 폰트 파일이 포함된 이유와 폰트 라이선스 책임

**질문**

- IBSheet 서버모듈에 malgun.ttf, gulim.ttf 폰트 파일이 포함된 이유는 무엇이고, 폰트 라이선스 문제가 있을 때 어떻게 해야 하는지 알고 싶습니다.

**답변**

Down2Pdf는 그리드를 PDF로 변환할 때 wkhtmltopdf를 사용하는데, 서버에 한글 폰트가 없으면 PDF의 한글이 깨지거나 비어 출력됩니다. 이를 막기 위해 기본 한글 폰트인 malgun.ttf와 gulim.ttf를 편의상 동봉한 것입니다. 이 폰트들은 Microsoft 계열 시스템 폰트로 IBSheet 제품 자체의 라이선스 자산이 아니므로, 운영 서버에 배포해 사용하는 폰트의 저작권과 라이선스는 사용자가 확보하고 관리해야 합니다.

**키워드**: malgun.ttf, gulim.ttf, Down2Pdf, wkhtmltopdf, 폰트 라이선스, 한글 폰트

---

### [XLS-0859] Down2Pdf() 호출 시 응답이 없고 documentexception not found 메시지가 나올 때

**질문**

- Down2Pdf() 호출 시 응답이 없고 class file for com lowagie text documentexception not found 메시지가 나옵니다. ibsheet.cfg에는 down2pdf.jsp 경로만 설정했습니다. 어떻게 해결하나요?

**답변**

Down2Pdf() 호출 시 응답이 없고 documentexception not found 메시지가 나오는 것은 서버에 필요한 jar가 모두 올라가 있지 않기 때문으로 보입니다. jar 파일을 모두 올리면 정상 동작합니다.

**키워드**: Down2Pdf, documentexception, down2pdf.jsp, com.lowagie.text, jar 누락

---

### [XLS-0860] PDF 다운로드 시 down2pdf.jsp에서 tbody가 닫혀 있지 않다는 오류

**질문**

- PDF 다운로드 시 down2pdf.jsp에서 tbody가 닫혀 있지 않다는 오류가 발생합니다. 어떻게 해결하나요?

**답변**

PDF 다운로드 시 down2pdf.jsp에서 tbody가 닫혀 있지 않다는 오류가 발생하는 현상은 7.0.13.118 버전을 적용하면 정상 동작합니다.

**적용 버전**: 7.0.13.118에서 수정

**키워드**: down2pdf.jsp, tbody, PDF 다운로드, 7.0.13.118

---

### [XLS-0861] 트리 시트를 엑셀로 다운로드하면 레벨 앞에 점(...)이 붙습니다. 없애거나 다른 문자로 바꾸려면? (setTreeChar)

**질문**

- 트리 시트를 엑셀로 다운로드하면 레벨 앞에 점(...)이 나타나는데, 이 점을 보이지 않게 하려면 어떻게 하나요?
- 트리 컬럼이 있는 시트를 엑셀로 다운로드하면 트리를 구분하는 문자(...)가 같이 표시됩니다. 이 문자를 없애려면 어떻게 하나요?
- IBSheet7 트리 구조 시트를 엑셀로 다운로드하면 `...`이 붙어서 다운로드됩니다. down2Excel.jsp 설정으로 이 `...`을 없앨 수 있나요?
- 트리 구조 시트를 엑셀로 다운로드할 때 트리에 붙는 표시 문자를 바꾸거나 없앨 수 있나요?

**답변**

서버의 `Down2Excel.jsp`(`down2Excel.jsp`) 사용자 환경 설정(#14)에서 트리 표시 문자를 설정합니다. `down.setTreeChar("");`처럼 빈 문자열로 지정하면 `...`(레벨 표시 문자)이 붙지 않습니다. 이 줄이 주석 처리되어 있으면 주석을 풀어 설정하고, 문자가 지정된 줄이 있으면 문자를 빼거나 해당 `setTreeChar` 부분을 주석 처리해도 됩니다. 원하는 다른 문자로 바꾸려면 같은 설정에 그 문자를 지정합니다. 같은 설정을 `SetTreeChart()`로 부르는 설명도 있으며, jsp에 따라서는 `sTreeChar` 변수의 값을 주지 않으면 같은 효과가 있습니다.

**키워드**: setTreeChar, SetTreeChart, Down2Excel.jsp, 트리 시트 엑셀, 레벨 표시 점, sTreeChar

---

### [XLS-0862] 트리 시트를 엑셀로 다운로드할 때 엑셀의 그룹(접기/펼치기) 기능을 적용하려면 어떻게 하나요?

**질문**

- 트리 모양으로 표시된 시트를 엑셀로 다운로드할 때 엑셀에서도 행을 접고 펼치는(그룹) 기능을 적용할 수 있나요? 클라이언트 모듈도 되나요?

**답변**

서버모듈 2.0.66.jar부터 트리 시트를 엑셀의 그룹으로 내리는 기능이 제공되며, `Down2Excel.jsp`에 사용자 설정 #20 `down.setUseGroupTree(false);`가 추가되어 기본적으로 트리 시트는 그룹 기능이 적용되어 다운로드됩니다. 클라이언트 모듈은 이 기능이 구현되어 있지 않으므로 반드시 서버모듈을 사용해야 합니다.

**적용 버전**: 서버모듈 2.0.66.jar 이상

**키워드**: setUseGroupTree, 트리 엑셀 그룹, 서버모듈 2.0.66.jar, 접기 펼치기, 클라이언트 모듈 미지원

---

### [XLS-0863] 엑셀 다운로드 시 글꼴(폰트명)을 화면과 따로 바꾸려면 어떻게 하나요? (setFontName)

**질문**

- 엑셀 다운로드 시 폰트 크기가 아니라 글꼴(글씨체·폰트명)을 바꾸고 싶습니다. 모든 엑셀 파일에 적용하려면 어디에서 어떻게 설정하나요?
- CSS를 수정해도 엑셀 다운로드 시 돋움 폰트로 내려옵니다. 화면 폰트와 엑셀 다운로드 폰트를 따로 지정하려면 어떻게 하나요?
- Down2Excel.jsp의 기본 폰트에 맑은고딕과 Arial처럼 폰트를 두 개 등록해도 되나요? 해외 PC에는 맑은고딕이 없을 수 있습니다.

**답변**

서버 쪽 `Down2Excel.jsp`(`down2excel.jsp`)의 사용자 환경 설정에서 설정합니다. `setFontName`, `setFontSize`가 주석 처리되어 있으므로 주석을 해제하고 값을 설정합니다. 예: `down.setFontName("맑은고딕")`. 화면 폰트와 엑셀 다운로드 폰트는 이 설정으로 따로 지정하며, CSS를 수정하는 것만으로는 엑셀 폰트가 바뀌지 않는 경우에 사용합니다. 기본 폰트에는 두 개를 등록할 수도 있어, 해외 PC에 맑은고딕이 없을 수 있다면 `String defaultFontName = "맑은고딕;Arial;"`처럼 두 폰트를 등록하면 사용 가능합니다.

**키워드**: setFontName, setFontSize, defaultFontName, 엑셀 글꼴, Down2Excel.jsp, 폰트 변경

---

### [XLS-0864] 엑셀로 내려받은 파일에서 콤보 컬럼을 드롭다운 목록으로 표시하려면(ComboValidation)

**질문**

- 시트의 콤보 컬럼 데이터를 엑셀로 내려받은 파일에서도 드롭다운 콤보로 표시하려면 어떻게 하나요?
- 엑셀로 다운로드한 파일에서 콤보 컬럼이 드롭다운 목록으로 나오게 하려면 어떻게 하나요?

**답변**

`Down2Excel` 호출 시 `ComboValidation` 인자 값을 `1`로 설정하면 다운로드한 엑셀 파일의 콤보 컬럼을 드롭다운으로 받을 수 있습니다.

**키워드**: ComboValidation, Down2Excel, 콤보 드롭다운, 엑셀 다운로드, 콤보 컬럼

---

### [XLS-0865] ComboValidation:1을 줘도 엑셀에 콤보 드롭다운이 안 생기고 텍스트로 내려오는 이유(256byte 제한)

**질문**

- Down2Excel에서 ComboValidation:1을 설정했는데 엑셀에 콤보 드롭다운이 생기지 않고 일반 텍스트로 내려옵니다. 원인이 무엇인가요?
- ComboValidation을 1로 설정해 내려받은 엑셀에서 콤보 목록이 많으면(예: 280건) 드롭박스가 나오지 않습니다.
- 콤보 코드 데이터가 256byte를 넘어 ComboValidation이 적용되지 않을 때 우회할 방법이 있나요?

**답변**

엑셀 자체의 데이터 유효성 검사(목록)가 항목값 전체 길이(글자수 합계)를 255~256byte까지만 지원하기 때문입니다. 콤보 항목 text(ComboCode, ComboText)의 길이 합이 이 한도를 넘으면 제품은 오류를 내지 않고 내부적으로 `ComboValidation:0`으로 처리해 목록 대신 텍스트로 내려오거나 전체가 취소됩니다. 목록이 18건일 때는 정상이어도 280건처럼 많으면 드롭박스가 나타나지 않습니다. 한글·영문·숫자에 따라 실제 한계는 이보다 작을 수 있으며, 엑셀의 제약이라 제품 패치로 해결되지 않습니다.

- 목록 값을 더 짧게 설정하면 드롭다운으로 표시됩니다.
- 우회: 조회 데이터에 코드에 대응하는 명칭이 이미 포함되어 있다면 그 명칭 컬럼을 추가하고 콤보 컬럼은 `hidden:1`로 숨긴 뒤 다운로드하면 엑셀에 정상 출력됩니다.

**키워드**: ComboValidation, 256byte, 콤보 드롭다운, ComboCode, ComboText, hidden:1

---

### [XLS-0866] Down2Excel 엑셀이 1000줄을 넘으면 제한된 보기로 열리고 양식이 깨질 때

**질문**

- Down2Excel로 내려받은 엑셀이 1000줄을 넘으면 파일이 제한된 보기로 열리고 설정한 양식이 깨집니다.

**답변**

시트에 Combo 컬럼이 있고 Down2Excel 옵션에 `ComboValidation:1`을 사용하며 데이터가 1000줄을 넘는 상태에서 `.xls` 확장자로 저장하면 이 현상이 발생합니다. `ComboValidation:1`을 사용하지 않거나 확장자를 `.xlsx`로 바꾸면 해결되며 `.xlsx` 사용을 권장합니다.

**키워드**: ComboValidation:1, 1000줄, xls, xlsx, 제한된 보기

---

### [XLS-0867] ComboValidation을 일부 컬럼만 제외하거나 Int 컬럼·셀별 동적 콤보에 적용할 수 있나요?

**질문**

- Down2Excel에서 ComboValidation:1로 콤보 드롭다운을 유지하는데, 일부 Combo 컬럼만 드롭다운 없이 일반 텍스트로 받을 수 있나요?
- 숫자(Int) 컬럼에서 특정 행만 콤보 타입일 때 엑셀 다운로드에 ComboValidation:1을 줘도 콤보 목록이 적용되지 않습니다.
- 컬럼을 Text로 초기화한 뒤 조회 후 반복문으로 셀마다 콤보로 바꿔 설정하면 ComboValidation이 엑셀에서 select 박스로 표현되지 않습니다.

**답변**

조건별로 제약이 있습니다.

- 특정 Combo 컬럼만 `ComboValidation`에서 제외하는 방법은 없습니다. 우회 방법은 (1) 제외할 Combo 컬럼과 같은 내용의 Text 컬럼을 숨겨 두고 Down2Excel의 `downCols` 인자로 Text 컬럼만 다운로드하거나, (2) `OnBeforeDownload`에서 `frm.Data.value`의 `RecordTypes`에 있는 해당 컬럼 타입을 Text로 replace한 뒤 `frm.submit()`을 호출하는 것입니다.
- Type이 Int인 상태에서는 ComboValidation 다운로드와 콤보 데이터 업로드를 적용하기 어렵습니다. 타입을 반대로 설정해, 초기화 시 `Type:'Combo'`와 `ComboCode`, `ComboText`를 설정하고 `OnSearchEnd`에서 특정 행을 제외한 행의 타입을 `InitCellProperty`로 Int로 바꾼 뒤 다운로드합니다. 업로드 후에는 `OnLoadExcel`에서 같은 방식으로 타입을 Int로 교체합니다. 데이터가 많으면 속도가 느릴 수 있습니다.
- 처음 Text로 설정했다가 조회 이후 반복문으로 셀마다 콤보 타입과 콤보를 다르게 설정하는 방식은 ComboValidation으로 엑셀 select 박스를 만드는 것이 지원되지 않습니다.

**키워드**: ComboValidation, downCols, OnBeforeDownload, RecordTypes, InitCellProperty, OnLoadExcel

---

### [XLS-0868] 엑셀 다운로드·업로드 시 콤보 컬럼의 ComboText와 ComboCode 처리

**질문**

- Down2Excel로 엑셀을 내려받을 때 콤보 컬럼의 ComboText와 ComboCode를 둘 다 내려받을 수 있나요?
- 엑셀 데이터가 ComboCode가 아니라 ComboText로 되어 있는데 Text로 매핑해서 업로드할 수 있나요? 히든 컬럼이 꼭 필요한가요?

**답변**

다운로드에서는 콤보 컬럼의 `ComboText`와 `ComboCode` 중 하나만 내려받을 수 있습니다. 둘을 동시에 내려받고 싶으면 숨김 컬럼을 추가해서 사용합니다. 업로드에서는 Combo 타입 컬럼이 엑셀 데이터의 ComboText와 ComboCode를 모두 인식하므로 히든 컬럼이 필요 없습니다. 다만 데이터 인식을 위해 ComboText가 중복되지 않도록 설정해야 합니다.

**키워드**: ComboText, ComboCode, Down2Excel, 콤보 업로드, 숨김 컬럼

---

### [XLS-0869] 엑셀 다운로드 시 컬럼 정렬(Align)을 바꾸거나 모두 왼쪽 정렬로 통일하려면

**질문**

- 시트에서 엑셀 다운로드를 할 때 컬럼의 정렬(Align)을 바꿔서 내려받고 싶습니다.
- Down2Excel로 엑셀을 내려받을 때 시트에서 보이는 컬럼 정렬과 관계없이 모든 컬럼을 왼쪽 정렬로 통일해서 받고 싶습니다.

**답변**

정렬을 지정하는 별도 인자는 없습니다. 엑셀 다운로드는 시트에서 전문을 생성해 서버로 보내므로, 다운로드 전에 호출되는 `OnBeforeDownload` 이벤트에서 `frm.Data.value` 문자열의 `<ColAlign>` 값을 수정합니다. 예를 들어 `left|left|...` 형태로 replace한 뒤 `frm.submit()`을 호출합니다. `left`의 개수는 다운로드하는 컬럼 개수와 같아야 합니다.

**키워드**: OnBeforeDownload, ColAlign, frm.Data.value, frm.submit, 정렬 통일

---

### [XLS-0870] 엑셀 다운로드 시 HTML 태그나 <br> 문구를 제거하려면(OnBeforeDownload)

**질문**

- Down2Excel로 HTML 타입 컬럼의 값을 엑셀로 다운로드할 때 font 태그 같은 HTML 태그는 제외하고 텍스트만 내려받는 방법이 있나요?
- 셀에 <br/> 문구가 들어 있는 데이터를 엑셀로 다운로드하면 태그가 그대로 찍힙니다.
- Down2ExcelBuffer로 여러 시트를 한 번에 내려받을 때 Type:Html 컬럼 데이터에 들어 있는 <br> 태그를 제거하려면 어떻게 하나요?

**답변**

Down2Excel은 화면 데이터를 문자열 전문으로 만들어 서버로 보내 엑셀을 생성하며, 보내기 전에 `OnBeforeDownload` 이벤트가 발생합니다. 이 이벤트에서 전문(`frm.Data.value`)을 수정한 뒤 `frm.submit()`을 호출하면 변경된 데이터로 엑셀 파일이 만들어집니다.

- 예: `data = data.split('<br>').join(''); frm.Data.value = data; frm.submit();`
- HTML 태그 제거는 마지막 `</CellFormula>` 뒤쪽 데이터 부분에만 `_ibsUtil.removeHTMLTag`를 적용하고 `frm.submit()`을 호출합니다.
- `Down2ExcelBuffer`로 여러 시트를 받을 때는 각 시트가 아니라 Buffer를 건 대상 시트의 `OnBeforeDownload`에서 처리해야 하며 반드시 submit이 필요합니다.

**키워드**: OnBeforeDownload, frm.Data.value, frm.submit, removeHTMLTag, Down2ExcelBuffer, HTML 태그 제거

---

### [XLS-0871] 특정 시트에서만 엑셀 다운로드를 막으려면

**질문**

- 특정 화면의 특정 시트에서만 엑셀 다운로드를 막고 싶습니다. Before 이벤트에서 return으로 막는 것처럼 할 수 있나요?

**답변**

`OnBeforeDownload(type, frm)` 이벤트에서 `return true`를 반환하면 다운로드를 막을 수 있습니다.

**키워드**: OnBeforeDownload, 다운로드 막기, return true, 엑셀 다운로드

---

### [XLS-0872] Html 타입 컬럼을 엑셀로 다운로드하면 태그가 그대로 나오는 이유와 대안

**질문**

- Html 타입 컬럼에서 br tag로 줄바꿈을 했더니 화면에서는 줄바꿈이 되는데 엑셀에서는 br 문자열이 그대로 찍힙니다.
- 컬럼 타입이 Html일 때 엑셀이나 텍스트로 다운로드하면 화면과 달리 HTML 태그가 그대로 저장됩니다. 화면에 보이는 모양대로 저장할 수 있나요?
- 엑셀 다운로드할 때 컬럼 값의 html 태그를 없앨 수 있나요? 안 된다면 윗첨자·아랫첨자를 표현할 방법이 있나요?
- 내용에 표나 이미지 등 html을 넣은 Html 타입 컬럼을 엑셀로 다운로드하면 html 태그가 그대로 나옵니다.

**답변**

Html 타입은 브라우저의 렌더링 엔진으로 화면에 표시되는 화면 조회용 기능이라, 엑셀 다운로드는 Html 타입(Html Tag)을 지원하지 않습니다. 엑셀 다운로드 시 넘어가는 전문 자체가 string이므로 브라우저에 보이는 대로(표, input 버튼, 윗첨자·아랫첨자 포함) 다운로드할 수 없고 태그가 그대로 노출됩니다.

- Html 타입 컬럼은 엑셀 다운로드에서 제외하는 편이 낫습니다. 태그 없이 내려받으려면 컬럼을 하나 더 만들어 그 컬럼을 다운로드하는 형태로 처리합니다.
- 줄바꿈은 데이터의 `<br>`을 `\r\n`으로 바꿔 내리는 방법으로 구현할 수 있습니다. 또는 Html 타입이 아니라 InitColumns에서 Text 타입 컬럼에 `MultiLineText : 1`을 설정하고 데이터의 줄바꿈을 `\n`으로 바꾸면 줄바꿈으로 인식됩니다.
- 이미지는 컬럼 타입 자체를 이미지로 지정한 경우에 다운로드할 수 있습니다.

**키워드**: Html 타입, MultiLineText, br 태그, 엑셀 다운로드, HTML 태그 노출, 첨자

---

### [XLS-0873] 엑셀 다운로드 시 체크박스 값이 1/0으로 나오는데 Y/N 등 다른 값으로 내려받으려면?

**질문**

- IBSheet7에서 체크박스 컬럼을 엑셀로 다운로드하면 값이 0 또는 1로만 나옵니다. Y/N이나 예/아니오 같은 다른 값으로 내려받으려면 어떻게 하나요?
- TrueValue, FalseValue로 Y/N 값을 쓰는 체크박스·라디오 컬럼을 엑셀로 다운로드할 때 Down2Excel에 관련 설정이 있나요?
- Down2Excel로 내려받은 엑셀에서 체크된 체크박스 컬럼 값까지 모두 N으로 나옵니다. 어떤 설정을 확인해야 하나요?
- 엑셀 파일을 시트로 불러올 때 체크박스 컬럼의 데이터가 Y, N으로 되어 있습니다. 이 값을 체크박스 상태로 올바르게 반영하려면 어떻게 설정하나요?
- 기존 ActiveX에서는 Down2Excel로 체크박스 컬럼이 Y와 빈값으로 내려왔는데 IBSheet7에서는 1과 0으로 나옵니다. Y와 빈 값으로 내려받으려면 어떻게 하나요?

**답변**

체크박스는 내부적으로 1 또는 0 값을 가지므로 엑셀 다운로드 시 기본적으로 이 숫자가 내려가며, 체크/해제 이미지 자체는 내려받을 수 없습니다. 컬럼 설정에 따라 다음과 같이 처리합니다.

- 기본(1/0) 컬럼: `Down2Excel()` 인자에 `CheckBoxOnValue`(체크 시 값)와 `CheckBoxOffValue`(해제 시 값)를 지정하면 그 값으로 내려받습니다. `SetDown2ExcelConfig`로 설정할 수도 있고, Y/N 외에 예/아니오 같은 값도 지정할 수 있습니다. 예: `Down2Excel({SheetDesign:1, Merge:1, DownRows:'Visible', CheckBoxOnValue:'Y', CheckBoxOffValue:'N'})`
- Y와 빈값으로 내리려면 `CheckBoxOnValue`를 `Y`, `CheckBoxOffValue`를 빈 값으로 설정합니다. 화면별 호출 파라미터를 모두 고칠 수 없다면 `ibsheetinfo.js`의 `createIBSheet()`에서 `Down2Excel`을 override해 `param`에 두 값을 공통으로 지정합니다. override한 함수는 반드시 두 번째 인자(flag)를 그대로 넘겨 원본을 호출해야 하며, 이 값은 `Down2Excel`과 `DirectDown2Excel`을 구분하는 값입니다.
- 컬럼에 `TrueValue`, `FalseValue`로 Y/N을 설정한 경우: `Down2Excel` 함수에도 `TrueValue`, `FalseValue` 설정이 있습니다. 이때 `CheckBoxOnValue:'Y', CheckBoxOffValue:'N'`을 함께 지정하면 체크된 값까지 모두 N으로 내려올 수 있으므로, 해당 옵션을 빼면 시트 초기화 시 설정한 `TrueValue`, `FalseValue` 값대로 정상 출력됩니다. `InitColumns`에서 `TrueValue`와 `FalseValue`를 설정하면 조회, 저장, 엑셀 다운로드와 업로드 시 설정된 데이터로 적용되므로, 엑셀 업로드 시 Y/N 값을 체크 상태로 반영하려면 이 설정을 사용합니다.

**키워드**: CheckBoxOnValue, CheckBoxOffValue, TrueValue, FalseValue, Down2Excel, 체크박스, SetDown2ExcelConfig

---

### [XLS-0874] 그룹핑한 시트를 엑셀로 내려받을 때 화면 그대로 받거나 그룹 행만 제외하려면?

**질문**

- 조회 후 그룹핑 기능으로 변경된 그리드 내용을 화면에 보이는 모양 그대로 엑셀 파일로 내려받으려면 어떻게 해야 하나요?
- 엑셀 다운로드 시 그룹 행을 제외하려면 어떻게 하나요? 이때 주의할 점이 있나요?

**답변**

그룹핑한 시트에서도 `시트id.Down2Excel();`을 그대로 호출하면 보이는 화면 그대로 그룹핑된 모양이 다운로드됩니다. `Down2Excel`은 매뉴얼의 export 항목에서 확인할 수 있습니다.
그룹 행을 제외하고 내려받으려면 `Down2Excel`에서 `DownRows`를 설정해야 합니다. 다만 내려받을 데이터가 많으면 개별 행을 분기 처리해야 하므로 속도 문제가 발생할 수 있습니다.

**키워드**: Down2Excel, DownRows, 그룹핑, 그룹 행 제외, 엑셀 다운로드 속도

---

### [XLS-0875] Down2Excel로 내려받을 때 시트의 콤보 데이터를 그대로 받으려면 어떻게 설정하나요?

**질문**

- 시트의 콤보 데이터를 Down2Excel로 엑셀 다운로드할 때도 그대로 내려받으려면 어떻게 설정하나요?

**답변**

`Down2Excel({ComboValidation:1})`로 설정하면 시트의 콤보 데이터를 엑셀 다운로드에서도 그대로 받을 수 있습니다.

**키워드**: ComboValidation, Down2Excel, 콤보 데이터, 콤보 엑셀 다운로드

---

### [XLS-0876] Down2Excel로 내려받을 때 헤더의 좌/우 정렬이 엑셀에 반영되나요?

**질문**

- Down2Excel로 내려받을 때 헤더의 좌/우 정렬이 엑셀에 반영되나요? 헤더행이 여러 개일 때는 어떻게 되나요?

**답변**

`Down2Excel()` 실행 시 각 열별로 헤더의 좌우 정렬 값이 엑셀에 반영됩니다. 헤더행이 여러 개이면 마지막 헤더행의 각 셀 정렬을 기준으로 헤더 내 해당 열에 동일하게 설정됩니다. 이 기능은 7.0.13.163-20200514-19 버전에서 추가되었으므로, 정렬이 반영되지 않으면 해당 버전 이상인지 확인합니다.

**적용 버전**: 7.0.13.163-20200514-19부터

**키워드**: Down2Excel, 헤더 정렬, 헤더 좌우 정렬, 엑셀 헤더 정렬 반영

---

### [XLS-0877] 트리 구조 시트를 엑셀로 다운로드할 때 트리 레벨 정보를 함께 내려받으려면?

**질문**

- 트리 구조 시트를 엑셀로 다운로드할 때 트리의 레벨 정보도 엑셀에 함께 내려받고 싶습니다. Down2Excel에 어떤 속성을 지정해야 하나요?

**답변**

`Down2Excel`의 `TreeLevel` 속성 값을 설정하면 트리 레벨 정보를 함께 내려받을 수 있습니다. 자세한 내용은 `Down2Excel` 함수 설명을 참조합니다.

**키워드**: TreeLevel, Down2Excel, 트리 레벨, 트리 엑셀 다운로드

---

### [XLS-0878] 엑셀 다운로드에서 합계행이 빠지거나 제외되지 않는 이유와 DownSum 설정 방법은?

**질문**

- 시트에 있는 합계행도 엑셀로 다운로드할 수 있나요? Down2Excel에 어떤 인자를 설정해야 하나요?
- AutoSum을 사용하는 시트를 엑셀로 다운로드하는데 합계행이 포함되지 않습니다. 합계행을 다운로드에 포함하려면 어떻게 해야 하나요?
- Down2Excel에 ExcludeSubSum 옵션을 지정했는데 누계(합계) 영역이 엑셀에서 제외되지 않습니다. 옵션 버그인가요?

**답변**

합계행의 다운로드 여부는 `Down2Excel`의 `DownSum` 인자가 정합니다. `DownSum:1`을 지정하면 합계행도 함께 내려받으며 이 값이 기본값(default)입니다.

- 합계행이 빠졌다면 `DownSum`이 0으로 지정되어 있는지 확인합니다. `ibsheetinfo.js`에 자체 로직을 추가해 둔 경우 그 안에서 `DownSum : 0`으로 지정해 두지 않았는지 살펴보고, 1로 변경하면 합계행이 정상적으로 다운로드됩니다.
- `ExcludeSubSum`을 지정했는데 누계(합계) 영역이 제외되지 않는 것은 버그가 아니며 `ExcludeSubSum`은 정상 동작합니다. 제외되지 않던 영역이 합계 영역이라면 그 영역은 `ExcludeSubSum`이 아니라 `DownSum` 옵션의 대상입니다.

**키워드**: DownSum, ExcludeSubSum, AutoSum, Down2Excel, 합계행 다운로드, ibsheetinfo.js

---

### [XLS-0879] 엑셀 다운로드 시 컬럼 너비를 데이터 길이에 맞춰 자동으로 설정하려면 어떻게 하나요?

**질문**

- 엑셀로 다운로드할 때 컬럼 너비가 데이터 크기에 맞게 자동으로 넓어지게 하려면 어떻게 하나요? 기준은 헤더인가요, 데이터인가요?
- 엑셀로 다운로드할 때 열 너비가 컬럼의 최대 텍스트 길이에 맞게 자동으로 설정되게 하려면 어떻게 하나요?
- 엑셀로 내려받을 때 컬럼 width 설정과 무관하게 데이터 길이에 맞춰 컬럼 너비가 자동으로 설정되게 하려면 어떻게 하나요?
- Down2Excel로 내려받은 엑셀의 셀(높이와 너비)이 전체적으로 크게 설정됩니다. 컬럼 너비는 어떻게 조절하나요?

**답변**

`Down2Excel()`에 `AutoSizeColumn:1`을 설정하면 컬럼 너비가 데이터 길이에 맞게 자동으로 설정되며, 컬럼에 지정한 width와 무관하게 적용됩니다. `AutoSizeColumn`은 전체 시트를 기준으로 합니다. 이 기능을 쓰려면 서버에 한글 폰트가 설치되어 있어야 하며, 한글 폰트는 아무거나 가능하지만 가급적 사용 중인 폰트를 설치하는 것이 좋습니다.
엑셀 셀의 높이가 크게 나오면 행 높이는 `ExcelRowHeight` 인자로 설정합니다. 컬럼 너비를 직접 지정해야 한다면 엑셀 다운로드 시 발생하는 이벤트에서 서버로 넘어가는 전문을 조작해 변경할 수 있을 것으로 보입니다.

**키워드**: AutoSizeColumn, Down2Excel, ExcelRowHeight, 컬럼 너비 자동, 엑셀 열 너비, 한글 폰트

---

### [XLS-0880] 시트와 엑셀의 컬럼 너비가 다르게 나옵니다. SheetDesign:1과 FitColWidth:0은 언제 쓰나요?

**질문**

- 시트에서는 컬럼이 넓은데 엑셀로 내려받으면 컬럼이 좁게 나옵니다. 어떻게 해야 하나요?
- 엑셀 다운로드 화면을 만들었는데 다운로드한 엑셀의 컬럼 너비가 너무 크게 나옵니다. 원인과 해결 방법은 무엇인가요?

**답변**

- 시트에서는 넓은 컬럼이 엑셀로 내려받을 때 좁게 나오면 `SheetDesign:1`로 설정합니다.
- 엑셀 컬럼 너비가 너무 크게 나오는 경우: `AutoFitColWidth`가 선언되어 있으면 다운로드용 컬럼도 너비가 재조정되어 엑셀 너비가 커집니다. 엑셀 다운로드는 화면에 보이는 컬럼의 너비를 가져가므로, 다운로드만 받는 컬럼은 원하는 너비를 지정하고 해당 컬럼에 `FitColWidth:0`을 주어 너비를 고정한 뒤 다운로드합니다.

**키워드**: SheetDesign, AutoFitColWidth, FitColWidth, 컬럼 너비 불일치, 엑셀 컬럼 너비

---

### [XLS-0881] 엑셀 다운로드 전에 컬럼 너비를 데이터에 맞추거나 서버 전송 전 ColWidths를 직접 수정하려면?

**질문**

- 엑셀 다운로드 시 데이터가 컬럼 너비를 넘치거나 화면에 없던 가로 스크롤이 생깁니다. 컬럼 너비를 데이터 길이에 맞춰 내려받으려면 어떻게 하나요?
- 엑셀 다운로드 시 서버로 전송되는 설정 값(전문)에 들어 있는 컬럼 너비를 서브밋 전에 직접 수정할 수 있나요? 어떤 이벤트에서 처리하나요?

**답변**

두 가지 방법이 있습니다.

- 다운로드 직전에 너비를 데이터에 맞추는 방법: `GetColWidth`로 기존 너비를 변수에 저장하고, `RenderSheet(0)` 후 `FitSizeCol(0)`으로 해당 컬럼 너비를 가장 긴 데이터에 맞춘 다음 `Down2Excel`을 호출합니다. 다운로드가 끝나는 `OnDownFinish`에서 `SetColWidth`로 원래 너비를 되돌리고 `RenderSheet(1)`을 호출합니다.
- 서버로 전송될 전문을 직접 수정하는 방법: `OnBeforeDownload(type, frm)` 이벤트에서 `frm.Data.value`로 전문 문자열을 확인하고 수정한 뒤 `frm.submit()`을 호출합니다. 컬럼 너비는 `<ColWidths>519|158|159|...</ColWidths>`처럼 `|`로 구분된 형태로 담기므로 바꾸려는 컬럼의 너비 값만 수정하면 됩니다.

**키워드**: FitSizeCol, GetColWidth, SetColWidth, OnBeforeDownload, ColWidths, 컬럼 너비 조정, 엑셀 다운로드 너비

---

### [XLS-0882] 숨겨진 시트에 데이터를 붙여 1000건 넘게 다운로드하면 컬럼 너비가 좁게 나오는 원인은?

**질문**

- 클라이언트 모듈로 엑셀을 다운로드할 때 1000건 정도는 컬럼 너비가 정상인데 그 이상이면 컬럼들이 좁게 붙어서 내려옵니다. 조절 방법이 있나요?

**답변**

숨겨진 시트에 전체 데이터를 붙여 다운로드하는 방식에서 숨겨진 시트의 컬럼 너비를 설정하지 않아 생기는 현상일 수 있습니다. `Down2Excel()`에 `AutoSizeColumn:1`을 넣어 다운로드해 보고, 그래도 해결되지 않으면 숨겨진 시트를 생성할 때 컬럼 width를 지정한 뒤 다운로드합니다.

**키워드**: AutoSizeColumn, Down2Excel, 숨겨진 시트, 컬럼 너비 좁음, 클라이언트 모듈, 대량 다운로드

---

### [XLS-0883] 이미지 컬럼이 있는 시트를 엑셀로 다운로드하면 엑셀의 행 높이가 너무 좁게 내려오는 이유는?

**질문**

- 이미지 타입 컬럼이 있는 시트를 엑셀로 다운로드하면 시트의 행 높이나 이미지 크기에 비해 엑셀의 행 높이가 너무 좁게 내려옵니다. 원인과 해결 방법은 무엇인가요?

**답변**

`Down2Excel` 호출 시 `ExcelRowHeight`를 20으로 고정해 지정하면 이미지 크기에 비해 엑셀 행 높이가 좁게 내려옵니다. 이미지 타입 컬럼이 있을 때는 `ExcelRowHeight` 속성을 제거하도록 로직을 수정하면 됩니다.

**키워드**: ExcelRowHeight, Down2Excel, 이미지 컬럼 행 높이, 엑셀 행 높이 좁음

---

### [XLS-0884] Type이 Html인 컬럼을 엑셀로 내려받으면 태그가 그대로 나오는데 텍스트로 받으려면?

**질문**

- Html 타입 컬럼을 엑셀로 다운로드하면 html 태그가 그대로 내려옵니다. 태그를 제거하거나 문자로 치환해 받는 옵션이 있나요?
- Html 타입 컬럼을 엑셀로 내려받을 때 html 태그 없이 화면에 보이는 Text 내용만 받고 싶습니다. Down2Excel에서는 어떻게 처리하나요?
- Type이 Html인 컬럼을 엑셀로 다운로드할 때 화면에 보이는 그대로 다운로드할 수 있나요?
- 엑셀 다운로드 시 html 컬럼의 태그를 치환하려고 onBeforeDownload를 쓰려는데 사용할 수 없습니다. 버전 제약이 있나요?

**답변**

Html 타입 컬럼의 태그가 그대로 내려오는 것은 원래 동작이며, 태그를 제거하거나 화면에 보이는 그대로 내려받는 옵션은 지원되지 않습니다. 다음 방법으로 우회합니다.

- `DownCols`로 다운로드할 컬럼을 지정해 Html 컬럼을 제외합니다. 태그를 뺀 값이 필요하면 Text 내용만 담은 숨김 컬럼을 하나 두고, `Down2Excel`의 `DownCols`에 Html 컬럼은 빼고 숨김 컬럼은 포함한 컬럼 index를 넣어 다운로드합니다.
- 컬럼이 많아 곤란하면 `OnBeforeDownload` 이벤트에서 전문을 추출해 html 태그를 치환할 수 있습니다. `onBeforeDownload`는 7.0.13.43 이후에 적용된 기능이라 그 이전 버전에서는 사용할 수 없으며, 이전 버전에서는 위의 숨김 컬럼과 `DownCols` 방법을 씁니다.

**적용 버전**: 7.0.13.43 이후(onBeforeDownload)

**키워드**: DownCols, OnBeforeDownload, Html 타입 컬럼, html 태그 엑셀 다운로드, 숨김 컬럼, Down2Excel

---

### [XLS-0885] Html 타입으로 표시한 이미지를 엑셀로 내려받으면 이미지 대신 태그가 나오는 이유는?

**질문**

- Html 타입으로 이미지를 표시했는데 엑셀로 내려받으면 이미지가 아니라 태그가 내려옵니다. 이미지가 그대로 내려오게 하려면 컬럼을 어떻게 구성해야 하나요?

**답변**

이미지를 엑셀로 다운로드하려면 해당 컬럼의 type이 이미지여야 합니다. 엑셀 다운로드 시 추출되는 전문이 컬럼 초기화 정보를 기준으로 만들어지므로 `initCellProperty` 등으로 일부 컬럼의 속성만 변경한 것은 처리되지 않습니다. 대안으로 hidden 이미지 컬럼을 만들어 `DownCols`로 이미지 컬럼이 내려오게 하는 방법을 쓸 수 있을 것으로 보입니다.

**키워드**: Html 타입 이미지, DownCols, initCellProperty, 이미지 컬럼 엑셀, hidden 이미지 컬럼

---

### [XLS-0886] 엑셀 다운로드 시 html 컬럼은 빼고 대신 다른 컬럼을 내려받으려면 mode 속성을 쓰나요?

**질문**

- 엑셀 다운로드 시 html 컬럼은 내려받지 않고 대신 다른 컬럼을 다운로드하고 싶습니다. 어떻게 처리할 수 있나요?

**답변**

`Down2Excel`에 `mode` 속성이 있습니다. 다운로드 전에 html 컬럼을 숨기고 다른 컬럼을 보이게 한 뒤 `mode:2`로 설정해 다운로드하고, 다운로드 후 html 컬럼을 다시 보이고 다른 컬럼을 숨기는 로직을 적용하는 방법을 시도해 볼 수 있을 것으로 보입니다.

**키워드**: Down2Excel, mode:2, html 컬럼 제외, 컬럼 숨김 다운로드, 엑셀 다운로드 대체 컬럼

---

### [XLS-0887] 이미지 컬럼이 있는 시트를 엑셀로 내려받을 때 이미지 대신 셀 값이나 경로로 받거나 제외하려면?

**질문**

- 이미지 컬럼이 있는 시트를 엑셀 다운로드하면 이미지가 내려옵니다. ActiveX처럼 이미지 대신 셀 값이 나오게 하려면 어떻게 하나요?
- IBSheet7에서 이미지 컬럼이 있는 시트를 엑셀로 내려받으면 이미지 경로(url)가 출력됩니다. ActiveX처럼 0, 1 같은 인덱스 값으로 저장하는 옵션이 있나요?
- 이미지 타입 컬럼이 있는 시트를 엑셀로 다운로드하면 AllTypeToText를 적용해도 이미지 경로가 표시됩니다. 이미지 컬럼을 빈값으로 내리거나 제외할 수 있나요?

**답변**

ActiveX의 `Down2Excel`에 있던 `IncludeImageType` 인자(기본은 셀 값, IMAGE로 설정하면 이미지 출력)는 IBSheet7에서 없어졌고, 이미지 컬럼은 값이 있으면 무조건 다운로드되며 이미지(IMAGE)로 내려옵니다. `AllTypeToText:1`을 설정하면 이미지 컬럼이 url 경로로 내려오지만, 값이 있는 이미지를 빈값으로 교체하는 방법은 없습니다. 이미지 컬럼 값은 이미지의 url 경로라서 ActiveX(ImageList 인덱스 기준)처럼 0, 1, 2로 내려받는 옵션도 없습니다.
대안은 다음과 같습니다.

- 이미지 컬럼을 내려받지 않으려면 `DownCols`로 다운로드할 컬럼을 지정해 이미지 컬럼을 제외합니다.
- 이미지 대신 셀 값을 받으려면 동일한 값을 갖는 컬럼을 Text 타입으로 추가하고, 엑셀 다운로드 시 IMAGE 컬럼은 제외하여 해당 컬럼이 내려오게 합니다.
- 인덱스 값(예: 0)이 꼭 필요하면 서버로 전송하기 직전에 발생하는 `OnBeforeDownload` 이벤트에서 `frm.Data.value`의 이미지 url 문자열을 0으로 바꾼 뒤 `frm.submit()`하는 로직을 넣을 수 있습니다.

**키워드**: IncludeImageType, AllTypeToText, DownCols, OnBeforeDownload, 이미지 컬럼 엑셀 다운로드, 이미지 경로 url

---

### [XLS-0888] 이미지 컬럼 시트를 엑셀 다운로드할 때 일정 건수 이상에서 Down2Excel.jsp -500 오류가 나는 원인은?

**질문**

- 이미지 컬럼이 있는 시트를 엑셀 다운로드하면 일정 건수 이상일 때만 파일이 내려오지 않고 Down2Excel.jsp 응답이 -500 오류입니다. 원인과 대처는?

**답변**

컬럼 수가 많고 이미지 컬럼이 있을 때 60건 정도는 내려오지만 100건 이상에서만 실패하는 사례가 있습니다. 제품 문제라기보다 이미지 데이터를 불러오는 서버 통신 문제일 수 있습니다. WAS에서 웹서버로 이미지 URL을 호출할 때 문제가 없는지, 별도 timeout 설정 옵션이 있는지 확인합니다. 이미지를 내려받지 않아도 되면 `DownCols`로 이미지 컬럼을 제외할 수 있습니다.

**키워드**: Down2Excel.jsp, -500 오류, DownCols, 이미지 컬럼 다운로드 오류, timeout

---

### [XLS-0889] 엑셀 다운로드에서 StartRow, StartCol 옵션을 지정해도 적용되지 않는 이유는?

**질문**

- 엑셀 다운로드에서 StartRow, StartCol 옵션을 지정했는데 적용되지 않습니다. 이 옵션은 어떤 경우에 사용할 수 있나요?

**답변**

`StartRow`와 `StartCol`은 템플릿을 사용할 때만 쓰는 옵션이라, 템플릿 없이 지정하면 적용되지 않습니다. 내려받을 컬럼을 지정하려는 것이라면 `DownCols`와 혼동하지 않았는지 확인합니다.

**키워드**: StartRow, StartCol, 템플릿, DownCols, 엑셀 다운로드 옵션

---

### [XLS-0890] 엑셀 다운로드 시 콤보 컬럼을 표시 텍스트가 아닌 코드값으로 내려받으려면 어떻게 하나요?

**질문**

- 엑셀 다운로드 시 콤보 컬럼이 표시 텍스트가 아니라 실제 저장된 코드값으로 내려받아지게 하려면 어떻게 하나요?

**답변**

`Down2Excel({DownCode: "CODE"})`로 설정하면 코드값으로 다운로드됩니다. 자세한 내용은 개발자 가이드의 `Down2Excel` Method 항목을 참조합니다.

**키워드**: DownCode, Down2Excel, 콤보 코드값, 엑셀 다운로드 코드값

---

### [XLS-0891] 엑셀로 다운로드하면 KeyField 컬럼의 필수 표시(*)가 같이 내려오는데 제외하려면?

**질문**

- 엑셀로 다운로드하면 KeyField 컬럼의 필수 표시 마크(*)가 같이 내려옵니다. 다운로드할 때 이 마크를 제외하려면 어떻게 하나요?

**답변**

`Down2Excel`의 `KeyFieldMark` 옵션을 0으로 지정하면 KeyField 마크가 엑셀로 다운로드되지 않습니다.

**키워드**: KeyFieldMark, KeyField, Down2Excel, 필수 표시 마크, 엑셀 다운로드 별표

---

### [XLS-0892] 엑셀 다운로드에서 합계, 소계 행, 합계 컬럼을 제외하려면 DownSum·ExcludeSubSum·DownCols를 어떻게 설정하나요?

**질문**

- 엑셀을 내려받을 때 합계 부분은 포함하지 않고 싶습니다. 어떻게 설정하나요?
- Down2Excel로 엑셀을 내려받을 때 소계 행과 합계 컬럼은 제외하고 나머지만 다운로드하려면 어떤 파라미터를 어떻게 설정해야 하나요?

**답변**

- 합계 제외: `DownSum:0`을 지정하면 합계를 포함하지 않고 엑셀로 내려받습니다.
- 소계 행 제외: `ExcludeSubSum: 1`로 설정합니다.
- 합계 컬럼 제외: 합계 컬럼은 숨김 컬럼이 아니므로 자동으로 제외되지 않습니다. `DownCols`에 다운로드할 컬럼 인덱스를 `|`로 구분한 문자열로 지정해야 합니다.

**키워드**: DownSum, ExcludeSubSum, DownCols, 합계 제외, 소계 행 제외, 합계 컬럼 제외

---

### [XLS-0893] Down2Text로 내려받은 파일에서 구분자가 맨 앞 컬럼에 붙어서 나오는 원인은?

**질문**

- Down2Text로 내려받은 파일에서 구분자가 맨 앞 컬럼에 붙어서 떨어져 나옵니다. 원인과 해결 방법은 무엇인가요?

**답변**

숨김(히든) 컬럼이 존재하면 `Down2Text` 결과에서 구분자가 맨 앞 컬럼에 붙어서 내려올 수 있습니다. `DownCols`로 내려받을 컬럼을 지정하는 방법으로 처리합니다.

**키워드**: Down2Text, DownCols, 히든 컬럼, 구분자 위치, 텍스트 다운로드

---

### [XLS-0894] 셀 안의 여러 줄(개행 문자) 데이터를 엑셀에서도 줄바꿈으로 보이게 하려면 어떻게 하나요?

**질문**

- 시트에 여러 줄로 표시되는 데이터가 있는데, 엑셀로 다운로드해도 엑셀에서 여러 줄로 보이게 하려면 어떻게 하나요?
- 데이터에 줄바꿈 문자 `\n`이 있고 컬럼에 Wrap:1만 지정했는데, 엑셀 다운로드에서 줄바꿈이 표시되지 않습니다. 어떻게 해야 하나요?
- 한 셀에 여러 줄의 데이터가 있을 때 엑셀로 다운로드해도 줄바꿈이 그대로 표시되게 하려면 어떻게 하나요?
- 시트 셀의 데이터가 길 때 엑셀로 다운로드하면 엑셀 셀에서 Alt+Enter로 줄바꿈한 것과 같은 효과를 줄 수 있나요?

**답변**

컬럼에 `MultiLineText:1`을 지정하고 조회 데이터에 `\n`을 포함시켜 시트에 여러 줄로 표시되게 하면, 엑셀로 다운로드할 때도 여러 줄로 보입니다. 엑셀 다운로드에서 셀 안의 줄바꿈은 기본적으로 줄바꿈으로 처리되므로, 시트에서 값이 한 줄로 나열되어 보인다면 시트에서 먼저 줄바꿈되어 표시되도록 하면 엑셀에서도 줄바꿈되어 나옵니다.

- `Wrap`은 컬럼 길이보다 긴 데이터를 줄바꿈시키는 속성이며 `\n` 문자를 인식시키는 속성이 아니므로 `Wrap:1`만 지정하면 줄바꿈이 표시되지 않습니다. `MultiLineText:1`을 지정해야 합니다.
- 시트에서 엑셀로 다운로드할 때는 시트의 데이터를 기준으로 하므로, 긴 데이터에 Alt+Enter로 줄바꿈한 것 같은 효과를 주려면 시트 데이터를 가공해야 하며 그렇지 않으면 구현하기 어렵습니다.
- 엑셀을 `LoadExcel`로 불러올 때 셀에 enter(줄바꿈)가 포함되어 있으면, `MultiLineText:1`로 설정된 컬럼은 줄바꿈으로 표시되고 설정되지 않은 컬럼은 `\n`으로 표시되어 데이터가 붙어서 보입니다.

**키워드**: MultiLineText, Wrap, LoadExcel, 엑셀 줄바꿈, 개행 문자, 셀 여러 줄

---

### [XLS-0895] 줄바꿈 기호가 있는 데이터를 엑셀로 내려받으면 행 높이가 모자라 일부 잘리는 이유는?

**질문**

- 엑셀 다운로드할 때 엑셀 행 높이를 설정하거나, 줄바꿈 기호가 있는 데이터의 행 높이를 자동으로 조절할 수 있나요?

**답변**

줄바꿈 기호가 들어간 데이터를 엑셀로 내려받으면 다중 라인이 표시되면서 행 높이가 어느 정도 조절되지만 완벽하게 다 보이지는 않아 위아래 데이터가 일부 잘릴 수 있습니다. 화면의 행 높이 픽셀과 엑셀의 행 높이 픽셀이 약간 다르고 폰트 크기에도 차이가 나기 때문으로 보입니다. 엑셀 행 높이를 직접 설정해도 높이가 잘 적용되지 않습니다.

**키워드**: 엑셀 행 높이, 줄바꿈 기호, 행 높이 잘림, 엑셀 다운로드 행 높이, 다중 라인

---

### [XLS-0896] 데이터 없이 헤더만 엑셀로 다운로드해 업로드용 양식을 만들 때 아래 빈 셀을 텍스트 서식으로 받으려면?

**질문**

- 조회가 되지 않은 시트에서 헤더 부분만 엑셀로 다운로드할 수 있나요?
- 시트로 업로드용 템플릿을 만들어 다운로드할 때 컬럼을 텍스트 서식으로 받고 싶습니다. 헤더만 다운로드하면 아래 셀이 텍스트 서식으로 나오지 않습니다.
- 엑셀 다운로드 시 셀 서식을 텍스트로 받으려고 AllTypeToText 등을 써도 데이터가 없는 빈 셀은 일반 서식입니다. 빈 셀까지 텍스트 서식으로 받을 수 있나요?

**답변**

조회된 데이터와 상관없이 엑셀 다운로드는 되므로 조회 전의 시트에서도 헤더만 내려받을 수 있습니다. 다만 엑셀 서식은 헤더를 포함해 다운로드되는 데이터 안의 셀에만 지정되며, 시트 데이터 외의 다른 영역에는 IBSheet에서 서식을 지정할 수 없습니다. 헤더만 다운로드하면 그 아래 셀은 서식을 제어할 방법이 없어 `AllTypeToText`를 써도 빈 셀은 일반 서식으로 나옵니다.

- 헤더 아래 한 행만 텍스트 속성이 필요하면 빈 행을 추가한 상태로 엑셀 다운로드하면 그 행에도 셀 속성이 적용됩니다.
- 업로드용 양식처럼 여러 행이 필요하면 빈 행을 넉넉하게 넣은 다음 `SheetDesign:2`로 설정해 다운로드하는 방법을 사용합니다.
- 헤더 아래 모든 행(세로줄 전체)에 지정하는 것은 어렵습니다.

**키워드**: SheetDesign:2, AllTypeToText, 헤더만 다운로드, 업로드용 양식, 빈 셀 서식, 텍스트 서식

---

### [XLS-0897] 시트를 엑셀로 다운로드하면 헤더 부분의 값이 null로 나오는 원인은?

**질문**

- 시트를 엑셀로 다운로드하면 헤더 부분의 값이 null로 떨어집니다. 어떤 경우에 발생하고 어떻게 해결하나요?

**답변**

시트 초기화를 1번 이상 수행해서 발생하는 문제이며, `Reset`을 한 번 호출해야 합니다.

**키워드**: Reset, 헤더 null, 시트 초기화, 엑셀 다운로드 헤더, null 출력

---

### [XLS-0898] 헤더 텍스트를 일부는 빨강, 일부는 파랑으로 나눠 표시하면 엑셀 다운로드에 헤더 글자가 나오지 않는 이유는?

**질문**

- 헤더 텍스트를 나눠 일부는 빨강, 일부는 파랑으로 표시했는데 엑셀로 다운로드하면 헤더 글자가 보이지 않습니다. 색상까지 표현하는 방법이 있나요?

**답변**

초기화 시 헤더에 텍스트를 설정하지 않아서 엑셀 다운로드에 글자가 나오지 않는 것입니다. 어떤 방식으로든 헤더 텍스트를 설정해야 하며, 색상대로는 내려오지 않을 것으로 보입니다. 헤더에 이미지를 표시하면 이미지는 다운로드가 가능하므로 그렇게 변경하는 방법이 있습니다.

**키워드**: 헤더 텍스트, 헤더 색상, 엑셀 다운로드 헤더, 헤더 이미지, 헤더 글자 누락

---

### [XLS-0899] CSV로 다운로드한 파일을 엑셀에서 열면 쉼표나 띄어쓰기가 있는 지점부터 줄이 바뀌어 출력되는 원인은?

**질문**

- CSV로 다운로드한 파일을 엑셀에서 열면 데이터에 쉼표나 띄어쓰기가 포함된 지점부터 줄이 바뀌어 출력됩니다. 원인이 무엇인가요?

**답변**

CSV 다운로드는 열 구분자로 컴마(,), 행 구분자로 줄바꿈 문자 `\n`을 사용합니다(엑셀 기본 설정). 데이터에 이 두 문자가 포함되어 있으면 유효한 문자가 아니어서 정상적으로 만들어지지 않으므로 데이터 값을 확인해야 합니다.

**키워드**: CSV 다운로드, 컴마 구분자, 줄바꿈 문자, 엑셀 CSV 줄바꿈, 행 구분자

---

### [XLS-0900] 다운로드 다이얼로그 없이 시트를 엑셀로 내려받는 방법과 DownloadDialog에서 우측 공백이 생기는 문제는?

**질문**

- 엑셀 다운로드 다이얼로그가 아닌 일반 그리드(시트)도 엑셀로 내려받을 수 있나요? 어떤 함수를 사용하나요?
- DownloadDialog에서 ReportXMLURL로 컬럼 수(colcount)를 넘기면 다이얼로그에서 체크한 컬럼 수와 달라 엑셀 오른쪽에 공백이 생깁니다. 어떻게 해결하나요?

**답변**

다이얼로그 없이 일반 시트를 내려받을 때는 `Down2Excel` 함수를 사용합니다.
DownloadDialog에서 `ReportXMLURL`로 컬럼 수(colcount)를 넘기면 다이얼로그에서 선택한 컬럼 수와 달라 엑셀 오른쪽에 공백이 생길 수 있습니다. `ReportXMLURL`은 다이얼로그에서 다운로드 버튼을 누르기 전에 설정되는 구조라서 다이얼로그에서 선택한 컬럼 수와 직접 연동하기 어렵습니다. `ReportXMLURL` 대신 `Header` 속성을 사용하면 다운로드할 컬럼까지 자동으로 계산합니다. `Header`는 행마다 `Text`, `Align`, `Height`, `Style`을 지정하는 배열 형태로 설정합니다.

**키워드**: Down2Excel, DownloadDialog, ReportXMLURL, Header, 엑셀 우측 공백, 다운로드 다이얼로그

---

### [XLS-0901] 텍스트(Text) 파일 다운로드 시 저장되는 파일의 확장자를 바꾸려면 어떻게 하나요?

**질문**

- 텍스트(Text) 파일 다운로드 기능을 사용할 때 저장되는 파일의 확장자를 다른 확장자로 바꾸고 싶습니다. 어떻게 하나요?

**답변**

가능합니다. 다운로드 옵션의 `FileName`에 원하는 확장자를 지정하면 됩니다.

**키워드**: FileName, 텍스트 파일 다운로드, 확장자 변경, Text 다운로드

---

### [XLS-0902] 엑셀 리포트의 헤더 볼드, 히든 컬럼, 타이틀 정렬, AutoSizeColumn 반영 문제는 어느 버전에서 수정되었나요?

**질문**

- 엑셀 리포트 기능에서 헤더 볼드, 히든 컬럼, 타이틀 정렬, AutoSizeColumn, 시트 디자인 1일 때 헤더와 데이터 높이 설정 등이 제대로 반영되지 않습니다. 해결된 버전이 있나요?

**답변**

엑셀 리포트 기능에서 헤더 볼드, 히든 컬럼, 타이틀 정렬, AutoSizeColumn, 시트 디자인 1일 때 헤더·데이터 높이 설정 등이 제대로 반영되지 않는 증상은 서버모듈 ibsheet7-1.1.60.jar로 처리되었으므로 해당 서버모듈 버전 이상으로 교체합니다.

**적용 버전**: 서버모듈 ibsheet7-1.1.60.jar

**키워드**: 엑셀 리포트, ibsheet7-1.1.60.jar, AutoSizeColumn, 헤더 볼드, 히든 컬럼, 서버모듈

---

### [XLS-0903] 피벗 테이블을 만든 뒤 피벗 시트를 엑셀로 다운로드하려면 어떻게 하나요?

**질문**

- 피벗 테이블을 만든 뒤 엑셀로 다운로드하려면 어떻게 하나요? 원본 시트와 피벗 시트 중 화면에 보이는 시트를 내려받고 싶습니다.

**답변**

`ShowPivotDialog()`를 호출하여 만들어진 피벗 시트는 원본 시트명에 `_pivot`이 붙은 이름이 되므로 이 시트를 다운로드하면 됩니다. 원본 시트와 피벗 시트 중 화면에 보이는 시트는 `Visible` 함수로 판단할 수 있습니다.

**키워드**: ShowPivotDialog, _pivot, Visible, 피벗 엑셀 다운로드, 피벗 시트

---

### [XLS-0904] div 탭 안의 두 번째 시트에서 엑셀 다운로드 버튼이 동작하지 않고 시트가 전부 보이는 원인은?

**질문**

- div 탭으로 시트를 구성했는데 두 번째 탭의 시트에서 엑셀 다운로드가 동작하지 않고 시트가 전부 보여집니다. 원인이 무엇인가요?

**답변**

엑셀 버튼이 form 태그 안에 button 태그로 되어 있는 것이 원인으로 보입니다. 다음 세 가지 중 하나로 처리합니다.

- button 태그에 type 속성을 button으로 지정합니다.
- input type=button을 사용합니다.
- button을 form 밖에 배치합니다.

**키워드**: form 태그, button type, 탭 시트 엑셀 다운로드, input type=button, div 탭

---

### [XLS-0905] xlsx로 다운로드할 때 데이터가 많으면 ReportXMLURL 설정이 적용되지 않습니다. 대신 쓸 방법은?

**질문**

- xlsx 확장자로 엑셀을 다운로드할 때 데이터가 많으면 ReportXMLURL에 설정한 내용이 적용되지 않습니다. 대신 사용할 수 있는 방법이 있나요?

**답변**

데이터가 많을 때는 `ReportXMLURL`이 적용되지 않으므로 `TitleText`, `UserMerge` 기능으로 시트 데이터 외의 텍스트를 표시하고 병합해야 합니다. 폰트 굵기·색상 같은 다양한 디자인은 지원하지 않고 Text 표시와 merge만 가능합니다. `ibsheet.js`와 jar를 최신으로 업그레이드하면 이 처리 없이도 동작하지만, 버전 차이가 크므로 개발서버에서 테스트해야 합니다. 7.0.13.259-20240823-1503 최신 버전에서는 이 처리 없이 동작합니다.

**적용 버전**: 7.0.13.259-20240823-1503 최신 버전에서는 처리 없이 동작

**키워드**: ReportXMLURL, TitleText, UserMerge, xlsx 다운로드, 엑셀 제목 텍스트

---

### [XLS-0906] HTML table로 구성된 화면 영역의 데이터를 엑셀 다운로드에 포함시키려면 어떻게 하나요?

**질문**

- 시트가 아니라 HTML table로 구성된 화면 영역의 데이터를 엑셀 다운로드에 포함시키려면 어떻게 하나요? tempfile 양식으로는 되지 않습니다.

**답변**

tempfile을 통해서 구현하는 방법은 없어 보입니다. 화면에 보이지 않는 시트를 하나 만들어 두고, 테이블의 html 데이터를 xml 구조에 맞게 만들어 `LoadSearchData`로 로드한 뒤 엑셀 다운로드를 하는 방식으로 처리합니다.

**키워드**: LoadSearchData, tempfile, HTML table, 숨김 시트, 엑셀 다운로드

---

### [XLS-0907] TempFile 방식 엑셀 다운로드에서 보더 자동 확장이나 파라미터·변수 바인딩이 가능한가요?

**질문**

- 엑셀 다운로드에서 TempFile에 보더를 한 줄만 그려 두면 데이터가 끝나는 곳까지 보더가 자동으로 그려지나요?
- TempFile로 엑셀을 다운로드할 때 파라미터를 넘겨 특정 위치에 표시하거나, 엑셀에 변수를 두고 서버 데이터를 바인딩할 수 있나요?

**답변**

TempFile 방식 엑셀 다운로드에는 다음 제약이 있습니다.

- TempFile을 이용하면 시트 데이터가 있는 영역까지 보더가 그려지지 않습니다. 특정 영역(예: 5*9)에 보더를 그려야 하는 요구사항은 TempFile로는 할 수 있는 방법이 없습니다.
- 파라미터를 넘겨 특정 위치에 파싱해 표시하는 기능과, 엑셀에 변수를 두고 서버에서 받은 데이터를 바인딩하는 기능은 제공되지 않습니다.

**키워드**: TempFile, 엑셀 양식, 보더, 변수 바인딩, 엑셀 템플릿 제약

---

### [XLS-0908] 시트 데이터를 아래한글(HWP) 파일로 다운로드하는 Down2Hml은 어떻게 설정·호출하고 제약은 무엇인가요?

**질문**

- 시트를 한글(HWP) 파일로 다운로드하는 Down2Hml 기능에는 어떤 제약이 있나요? 컬럼이 많거나 이미지, 머지, 트리가 있을 때는 어떻게 표시되나요?
- 시트의 데이터를 아래한글(한글 문서) 파일로 다운로드하는 기능이 있나요? 엑셀이나 PDF가 아닌 아래한글 형식으로 내려받는 방법이 있는지 알고 싶습니다.
- IBSheet에서 Down2Excel처럼 시트 데이터를 한글(HWP) 파일로 내려받는 기능이 있나요? 있다면 어떻게 설정하고 호출하며 제약은 무엇인가요?

**답변**

아래한글 파일(hwpml 형식)로 다운로드하는 비공개 기능(`Down2Hml`)이 있습니다. 이 한글 문서 연동 기능은 초기 개발 때 특정 사이트 요청으로 진행되어 제약이 많으므로 간단한 데이터 다운로드 용도로 사용하는 것이 좋습니다.

- 사용 방법: `ibsheet.cfg`의 `Down2Hml_Url`에 `Down2Hml.jsp` 경로를 설정하고, 화면에서 `Down2Hml()` API를 호출합니다.
- 컬럼이 많으면 정상 표시되지 않을 수 있어 가급적 10개 이내 컬럼만 다운로드하도록 권장합니다.
- 이미지는 다운로드할 수 없고 이미지 경로값으로만 표시됩니다.
- 머지(헤더와 데이터 영역)는 적용되지 않습니다.
- 트리 시트의 노드는 표현할 수 없고 화면에 보이는 데이터만 출력됩니다.

**키워드**: Down2Hml, Down2Hml_Url, Down2Hml.jsp, HWP, hwpml, 아래한글, 한글 다운로드

---

### [XLS-0909] 서버 페이징으로 조회한 시트를 CSV로 다운로드하면 조회된 데이터만 내려오는데 전체 데이터를 받으려면?

**질문**

- 시트를 서버 페이징 방식으로 조회할 때 CSV 다운로드를 하면 조회된 데이터만 내려받아집니다. 전체 데이터를 CSV로 받으려면 어떻게 처리하나요?

**답변**

서버 페이징 조회 후 CSV를 다운로드하면 조회된 데이터만 내려옵니다. 전체 데이터가 필요하면 `OnBeforeDownload()`에서 서버로 전송되는 데이터 중 화면 데이터를 제외하고 헤더만 전송하도록 처리할 수 있습니다.

**키워드**: OnBeforeDownload, CSV 다운로드, 서버 페이징, 전체 데이터 다운로드, 헤더만 전송

---

### [XLS-0910] CSV 저장 시 쉼표(,)가 포함된 데이터를 큰따옴표로 감싸는 기능은 어느 버전부터 지원되나요?

**질문**

- 시트 정보를 CSV로 저장할 때 컬럼 데이터 안에 쉼표(,)가 들어 있으면 값을 큰따옴표로 감싸는 기능이 있나요?

**답변**

해당 기능은 1.1.126 버전에서 추가된 것으로 확인됩니다. CSV 저장 시 쉼표가 포함된 데이터를 큰따옴표로 감싸려면 이 버전 이후를 사용합니다.

**적용 버전**: 1.1.126에서 기능 추가

**키워드**: CSV 저장, 큰따옴표, 쉼표 포함 데이터, 1.1.126, CSV 따옴표 처리

---

### [XLS-0911] CSV 파일을 엑셀로 열면 셀 서식이 일반서식이 되어 0 데이터가 사라지는데 제품에서 막을 수 있나요?

**질문**

- CSV 파일을 엑셀로 열면 셀 서식이 일반서식이 되어 0 데이터가 없어집니다. 제품에서 이 셀 서식 문제를 처리하거나 방지할 수 있는 방법이 있나요?

**답변**

csv 파일을 엑셀로 열면 셀 서식이 일반서식이 되어 0 데이터가 없어집니다. csv 파일은 엑셀 파일이 아니기 때문에 셀 서식을 조작할 수 없어 제품에서 처리하기 어렵습니다.

**키워드**: CSV, 셀 서식, 일반서식, 0 데이터 소실, CSV 엑셀 열기

---

### [XLS-0912] 엑셀 다운로드에 데이터 외 별도 행(조회 데이터 없음 안내 문구, 상단 합계)을 넣으려면 어떻게 하나요?

**질문**

- 조회 데이터가 0건일 때 엑셀로 다운로드하면 헤더행과 합계행만 나옵니다. 여기에 '조회된 데이터가 없습니다' 문구를 함께 출력하려면 어떻게 하나요?
- 엑셀로 다운로드할 때 데이터 행 위쪽에 합계 데이터를 따로 넣고 싶습니다. 어떻게 하나요?

**답변**

- 데이터 행 위에 별도 데이터(예: 합계 행)를 넣으려면 엑셀 리포트 기능을 사용합니다.
- 조회 데이터가 없을 때 안내 문구를 넣으려면: 헤더행과 합계행 사이에 문구행을 넣는 것은 제품 기능 추가 없이는 어렵습니다. 제품 변경 없이는 엑셀 풋터 기능으로 문구를 추가할 수 있으며, 풋터행은 합계행 다음에 붙으므로 데이터가 없을 때는 합계행을 제외하는 방식을 씁니다. `ibsheetinfo.js`의 다운로드 함수에서 행 수가 0이면 `DownloadDialog`의 option에 `Footer`(`Text`, `Align`, `Height`, `Style`)를 지정하고 `DownloadSum` 체크를 해제합니다. 서버모듈(IE9 이하)과 엑셀 클라이언트 모듈(IE10 이상) 모두에서 동작합니다.

**키워드**: Footer, DownloadSum, DownloadDialog, 엑셀 리포트, 조회 데이터 없음 문구, 풋터

---

### [XLS-0913] 데이터 행 없이 Down2Excel로 업로드용 양식을 내려받으면 Text형 컬럼이 일반형으로 인식되는 문제는?

**질문**

- 엑셀 업로드용 양식을 만들려고 데이터가 없는 시트에서 Down2Excel로 내려받았는데 Text형이어야 할 컬럼이 일반형으로 인식됩니다. 방법이 있나요?

**답변**

데이터 행 없이 서식을 지정해서 내려받는 것은 불가능합니다. 대안은 두 가지입니다.

- 서식을 직접 지정해 둔 엑셀 파일을 서버에 올려 두고 내려받게 합니다.
- 빈 데이터 행을 넣은 뒤 내려받습니다.

**키워드**: Down2Excel, 업로드용 양식, Text 서식, 빈 데이터 행, 엑셀 서식 지정

---

### [XLS-0914] 데이터가 없는 중간 행이 엑셀 다운로드에서 사라지는 원인과 빈 행을 유지하는 방법은?

**질문**

- 데이터가 없는 중간 행(예: 2~3번째 행)이 있는 시트를 엑셀 다운로드하면 그 빈 행이 사라집니다. 빈 행을 그대로 유지하려면 어떻게 하나요?

**답변**

다운로드 옵션에 `DownRow`가 지정되어 있으면 비어 있는 행이 사라질 수 있습니다. `DownRow`를 지우고 다운로드하면 비어 있는 행도 정상적으로 내려옵니다.

**키워드**: DownRow, 빈 행 사라짐, 엑셀 다운로드 빈 행, 다운로드 옵션

---

### [XLS-0915] 수정·삭제한 행을 플래그로 구분해 일부 행만 엑셀로 내려받을 수 있나요?

**질문**

- 화면에서 수정·삭제한 데이터를 구분해서 일부 행만 엑셀로 내려받고 싶습니다. 플래그로 나눠서 다운로드할 수 있나요?

**답변**

플래그로 나누어 내려받는 방식은 지원되지 않습니다. 화면에 체크박스 컬럼을 하나 두고 사용자가 체크한 데이터만 `Down2Excel`의 `DownRows` 파라미터에 넣어 다운로드합니다.

**키워드**: DownRows, Down2Excel, 체크박스 컬럼, 수정 삭제 행 다운로드, 일부 행 다운로드

---

### [XLS-0916] 엑셀 다운로드 시 텍스트와 이미지를 한 셀에 혼합하여 출력할 수 있나요?

**질문**

- 엑셀 출력(다운로드) 시 텍스트와 이미지를 혼합하여 출력할 수 있나요? 지원되는 방법이 있나요?

**답변**

엑셀 출력 시 텍스트와 이미지를 혼합하여 출력하는 기능은 지원되지 않습니다.

**키워드**: 엑셀 다운로드, 이미지, 텍스트 혼합, 엑셀 출력

---

### [XLS-0917] 엑셀 다운로드 시 이미지 크기를 원본·지정 크기로 조절할 수 있나요?

**질문**

- 엑셀 다운로드할 때 이미지를 원본 크기로 내려받거나 이미지 크기를 지정할 수 있나요?
- 이미지를 엑셀로 다운로드하면 셀의 너비와 높이에 맞춰 이미지가 내려옵니다. 초기화 때 설정한 이미지 크기로 내리거나 크기를 조절할 수 있나요?
- 엑셀 다운로드 시 화면에는 보이는 사진 중 일부만 엑셀에 나오지 않습니다. 이미지 크기를 조정하는 기능이 있나요?

**답변**

엑셀 다운로드 시 이미지는 셀의 크기에 맞춰 내려옵니다. 원본 크기로 다운로드하거나, 초기화에서 설정한 이미지 크기로 내려받거나, 다운로드되는 이미지의 크기를 지정·조절하는 기능은 지원되지 않습니다.
이미지를 조정하는 기능이 없으므로 이미지를 업로드할 때 리사이즈하도록 구현해서 사용해야 합니다.

**키워드**: 이미지 크기, 엑셀 다운로드, 원본 크기, 리사이즈, 이미지 컬럼

---

### [XLS-0918] 시트의 이미지를 엑셀에 포함해 다운로드하려면 어떻게 하나요?

**질문**

- 시트의 이미지를 엑셀로 다운로드할 수 있나요? 이미지가 엑셀에 포함되게 하려면 어떻게 하나요?
- 엑셀 다운로드에서 이미지 컬럼의 이미지가 다운로드되지 않습니다. 특정 셀만 이미지로 설정하거나 text 셀에 image 값을 준 경우도 되나요?

**답변**

`setImageList()`를 사용해 이미지 컬럼을 생성한 뒤 다운로드하면 됩니다.
엑셀 다운로드는 컬럼별 속성과 데이터를 서버로 보내므로 셀별 속성대로는 다운로드할 수 없습니다. 특정 셀만 image로 지정했거나 text 셀에 image 값을 설정한 경우는 이미지가 다운로드되지 않으며, 컬럼 속성이 image여야만 이미지로 다운로드할 수 있습니다.

**키워드**: setImageList, image 컬럼, 엑셀 다운로드, 이미지 다운로드, 셀별 속성

---

### [XLS-0919] OnBeforeDownload 이벤트 함수가 동작하지 않는 이유와 여러 시트를 한 엑셀 파일로 합치는 방법

**질문**

- 엑셀 다운로드 시 OnBeforeDownload, OnDownFinish 이벤트 함수가 적용되지 않습니다. 샘플에서는 정상 동작하는데 무엇을 확인해야 하나요?
- 시트 하나를 Reset한 뒤 다시 조회하는 방식으로 여러 시트 분량의 엑셀 데이터를 하나의 엑셀 파일로 합쳐 내려받을 수 있나요?

**답변**

`Down2Excel()`을 호출하면 `OnBeforeDownload(type,frm)` 이벤트가 발생하며, 이 이벤트 함수 안에서 `frm.submit()`을 호출해야 실제 다운로드가 이루어집니다. `frm.submit()`을 빠뜨리면 `OnBeforeDownload`, `OnDownFinish`가 동작하지 않는 것처럼 보이고, 호출을 넣으면 두 이벤트가 모두 정상 발생합니다.
여러 시트(또는 한 시트를 Reset 후 여러 번 조회한 결과)의 데이터를 하나의 엑셀 파일로 합치려면 이 이벤트를 이용합니다.

- `Down2Excel()`을 호출할 때마다 `OnBeforeDownload`에서 서버로 보낼 시트 전문(`frm.Data.value`)을 전역 변수(배열)에 담아 둡니다.
- 마지막 시트에서 합친 값을 `frm.Data.value`에 넣고 한꺼번에 `frm.submit()`으로 전송합니다.
- 대기 이미지는 `HideProcessDlg()`로 없앱니다.

**키워드**: OnBeforeDownload, OnDownFinish, frm.submit, frm.Data.value, HideProcessDlg, 엑셀 합치기

---

### [XLS-0920] OnReadyExcelDown 이벤트에서 요청 전문(frm)에 접근하거나 특수문자·SQL injection 검사 문제를 처리하려면?

**질문**

- OnReadyExcelDown 이벤트에서 frm.Data.value로 값을 읽으면 에러가 납니다. 어떤 방식으로 접근해야 하나요?
- 일부 특정 PC나 IE 버전에서만 데이터에 작은따옴표가 있으면 Down2Excel 오류가 발생합니다. 어떻게 처리하나요?
- 방화벽의 SQL injection 검사 때문에 엑셀 다운로드 요청에서 특수문자가 문제가 됩니다. 요청 전문을 전달할 때 어떻게 처리할 수 있나요?

**답변**

`OnReadyExcelDown` 이벤트에서 `frm.Data.value`로 접근하면 에러가 납니다. 다음처럼 `elements`를 순회하며 접근해야 합니다.

```
var len = frm.elements.length;
for (i = 0; i < len; i++) {
  frm.elements[i].value
}
```

일부 특정 PC나 IE 버전에서 데이터에 작은따옴표가 있을 때 `Down2Excel` 오류가 나거나, 방화벽의 SQL injection 검사 때문에 요청의 특수문자가 문제가 되는 경우에는, 요청 전문을 서버로 전달할 때 `OnReadyExcelDown` 이벤트와 `Down2Excel.jsp`의 `ibExcel.getData()`, `ibExcel.setData()`를 이용하여 처리할 수 있습니다.

**키워드**: OnReadyExcelDown, frm.elements, ibExcel.getData, ibExcel.setData, SQL injection, 작은따옴표

---

### [XLS-0921] 엑셀 다운로드 시 text 컬럼의 큰따옴표 뒤 글자가 사라지면 어떻게 해결하나요?

**질문**

- 엑셀 다운로드할 때 text 컬럼에 특수문자(큰따옴표)가 포함되어 있으면 그 뒤의 글자가 사라집니다. 어떻게 해결하나요?

**답변**

`ibsheet.cfg`에서 `DocIODelimMode:1`을 설정하고 Down2Excel에서 `SetDelimMode(1)`을 활성화하면 됩니다.

**키워드**: DocIODelimMode, SetDelimMode, 큰따옴표, text 컬럼, 특수문자

---

### [XLS-0922] XSS 필터·보안 설정으로 시트 전송 데이터가 변형되어 엑셀 다운로드가 실패할 때(SaveNames does not exists 등)

**질문**

- 엑셀 다운로드를 post 방식으로 전송하면 SaveNames does not exists 오류가 발생하고 파일이 만들어지지 않습니다. 원인과 해결 방법이 무엇인가요?
- 서버모듈을 서블릿으로 변환해 사용하는데 화면에서 보낸 시트 Data가 XSS 필터를 통과하면서 <, > 등이 다른 문자로 변환됩니다. 어떻게 처리해야 하나요?
- 닷넷 환경에서 Down2Excel() 함수를 실행하면 무한 대기 상태가 되다가 500 error가 발생합니다. 원인이 무엇인가요?
- XSS 필터를 적용한 뒤 Down2Excel 다운로드에서 Common.setRowHeight의 NumberFormatException이 발생하고, 기술문서의 조치를 적용해도 같습니다. 어떻게 해결하나요?

**답변**

화면에서 서버로 전송하는 Data는 `<0_IBCC></0_IBCC><0_IBCT></0_IBCT>` 같은 XML 형식입니다. 서버 보안 설정이나 XSS 필터 때문에 `<`, `>` 등이 다른 문자로 바뀌거나 `<,>` 같은 태그가 막히면 정상 XML 구조로 전달되지 못해 `SaveNames does not exists` 오류나 닷넷에서의 무한 대기 후 500 error가 발생합니다. 다음 중 하나로 조치합니다.

- 태그 구분자 변경: `ibsheet.cfg`에 `MarkupTagDelimiter`를 `#,$,@,!`처럼 설정하면 기본 `<0_IBCC></0_IBCC>`가 `#0_IBCC$@0_IBCC!`로 바뀌어 전송됩니다. `Down2Excel.jsp`의 사용자 환경설정 #1에서 `down.setMarkupTagDelimiter("#", "$", "@", "!");`로 같은 문자를 지정합니다. 보안 수준에 걸리지 않는 문자를 써야 합니다.
- 닷넷: cfg에 `MarkupTagDelimiter="[,],[/,]"`를 추가하고 `Down2Excel.aspx`에서 `setMarkupTagDelimiter("[", "]", "[/", "]");`를 설정합니다.
- 서블릿으로 변환해 쓰는 경우: request로 받은 Data 값을 원래의 `<0_IBCC></0_IBCC><0_IBCT></0_IBCT>` 형태가 되도록 치환해도 됩니다.
그래도 해결되지 않으면 `request.getParameter("Data")`로 받은 데이터가 XML 구조인지 확인합니다.
XSS 필터 적용 후 `Common.setRowHeight`에서 NumberFormatException이 나고 기술문서의 조치를 적용해도 같다면, 해당 옵션 없이 구성한 서버모듈 JSP에서 Class import 부분까지 제거되었을 수 있습니다. import 구문을 추가하고 `setMarkupTagDelimiter`를 적용한 JSP를 사용하면 같은 서버모듈 버전에서 정상 동작합니다.

**키워드**: MarkupTagDelimiter, setMarkupTagDelimiter, SaveNames does not exists, XSS 필터, Down2Excel.aspx, NumberFormatException

---

### [XLS-0923] 화면마다 Down2Excel의 HiddenColumn 값을 다르게 주려면 공통 OnSelectMenu에서 어떻게 처리하나요?

**질문**

- ibsheetinfo.js의 공통 OnSelectMenu 이벤트에서 엑셀다운로드 메뉴를 처리할 때, 화면마다 Down2Excel의 HiddenColumn 값을 다르게 줄 수 있나요?

**답변**

공통 핸들러에서 변수로 `HiddenColumn` 값을 정하도록 합니다. 기본값을 `var HCol = 0;`으로 두고 `window[sheetid].DownHiddenCol == 1`이면 `HCol = 1`로 바꿔 `Down2Excel`의 `HiddenColumn`에 `HCol`을 전달합니다. 화면에서는 시트 초기화(`IBS_InitSheet(mySheet, initdata)`) 전에 `mySheet.DownHiddenCol = 1;`처럼 변수를 설정합니다.

**키워드**: HiddenColumn, DownHiddenCol, OnSelectMenu, IBS_InitSheet, ibsheetinfo.js, 엑셀 숨김 컬럼

---

### [XLS-0924] Down2Excel로 받은 엑셀 파일에서 열 삽입 같은 수정 작업이 오래 걸리면 WordWrap을 어떻게 설정하나요?

**질문**

- Down2Excel로 받은 엑셀 파일에서 열 삽입처럼 수정 작업을 하면 시간이 오래 걸립니다(행 삽입은 빠름). 원인과 해결 방법은 무엇인가요?

**답변**

다운받은 엑셀 파일을 수정할 때 시간이 많이 걸리는 것은 대부분 `Down2Excel()`의 `WordWrap` 속성과 관련이 있습니다. 이 값을 `0`으로 설정하면 엑셀 파일이 가벼워집니다.

**키워드**: WordWrap, Down2Excel, 엑셀 수정 느림, 엑셀 파일 용량, 열 삽입

---

### [XLS-0925] 대용량 데이터를 xlsx로 엑셀 다운로드하면 WAS 메모리 부족이나 다운로드 에러가 납니다. Down2Excel.jsp에서 어떻게 해결하나요?

**질문**

- 서버모듈로 대량 데이터를 xlsx로 엑셀 다운로드하면 WAS 메모리가 부족해지거나 다운로드 에러가 납니다. Down2Excel.jsp에서 어떻게 해결하나요?

**답변**

대용량 xlsx 다운로드에서 메모리가 부족해지는 이유와 해결은 다음과 같습니다.

- 원인: `Down2Excel` 생성자 인자가 없거나 false이면 다운로드할 데이터를 서버 메모리에 모두 보관하므로 가용 메모리가 부족할 때 힙 메모리 에러(OOME)가 날 수 있습니다.
- 해결: `Down2Excel.jsp`의 [사용자 환경 설정 #0]에서 `Down2Excel` 생성자 인자를 true로 설정합니다. 그러면 `SXSSFWorkbook`을 사용해 최대 액세스 행 수(`setBufferSize` 값, 기본 100)만 메모리에 두고 나머지는 임시 파일(`java.io.tmpdir`, 읽기/쓰기 권한 필요)에 기록하므로 메모리 부족 없이 큰 파일을 만듭니다.
- 제약: xlsx 확장자에서만 지원되며 xls는 전체 데이터를 메모리에 올립니다. `setBufferSize` 값에 따른 속도 차이는 테스트 이력이 없으므로 서버의 가용 메모리에 맞게 설정합니다.

**키워드**: SXSSFWorkbook, setBufferSize, OOME, 사용자 환경 설정 #0, 대용량 엑셀, java.io.tmpdir

---

### [XLS-0926] 닷넷 환경에서 엑셀 다운로드에 DRM을 적용하려면 IBSheet7.DLL과 Down2Excel.aspx를 어떻게 수정하나요?

**질문**

- 닷넷으로 개발된 환경에서 엑셀 다운로드 시 DRM을 적용하려면 어떤 파일을 어떻게 수정해야 하나요?
- 닷넷 환경에서 DRM을 적용할 때 Down() 호출 후 저장된 정보에 대한 결과를 Return해 주어야 하는 것 아닌가요?

**답변**

닷넷에서는 `IBSheet7.DLL`과 `Down2Excel.aspx` 파일을 수정해야 합니다. 다운로드하기 전에 DRM이 개입할 수 있는 여지를 만든 `IBSheet7.DLL`과 `Down2Excel.aspx`로 교체하여 적용합니다. 닷넷에서 DRM을 적용할 때 `Down()` 이후 저장된 정보에 대한 결과를 Return하지 않는 동작은 닷넷 쪽의 버그입니다.

**키워드**: IBSheet7.DLL, Down2Excel.aspx, 닷넷 DRM, Down(), DRM 적용

---

### [XLS-0927] 엑셀 다운로드 전에 사유를 DB에 저장하는 것 같은 사전 처리를 공통으로 넣으려면 Down2Excel의 URL 속성을 어떻게 쓰나요?

**질문**

- 엑셀 다운로드 전에 사유를 DB에 저장하는 것처럼 다운로드되기 전에 처리할 일을 공통으로 넣을 수 있는 방법이 있나요?
- 엑셀 다운로드 전에 다운로드 사유를 입력받아 DB에 저장해야 합니다. Down2Excel 흐름에서 어떻게 처리하나요?

**답변**

`Down2Excel` 함수의 `URL` 속성을 사용하면 백엔드를 호출할 때 중계 페이지를 한 번 거칠 수 있습니다. 이 중계 페이지에서 사유를 DB에 저장하는 처리를 먼저 수행한 뒤 Down2Excel 페이지로 포워딩하는 방식으로 처리합니다. 자세한 사용법은 도움말의 Down2Excel `URL` 항목을 참고합니다.

**키워드**: Down2Excel URL, 중계 페이지, 사유 DB 저장, 포워딩, 다운로드 전 처리

---

### [XLS-0928] 시트 데이터를 엑셀로 다운로드할 때 여러 파일을 zip으로 묶어 한 번에 받을 수 있나요?

**질문**

- 시트 데이터를 엑셀로 다운로드할 때 여러 파일을 zip 파일로 묶어서 한 번에 받을 수 있는 기능이 있나요? 직접 구현할 수 있는 방법도 있나요?

**답변**

zip으로 압축해 다운로드하는 기능은 지원하지 않습니다. 다만 `Down2Excel.jsp`는 생성된 문서를 바로 다운로드하는 것이 기본인데, JSP 소스에 생성된 문서를 서버에 저장하는 부분이 주석 처리되어 있으므로 주석을 풀어 특정 경로에 파일을 생성한 뒤 그 파일을 압축하여 다운로드하는 방식으로 구현하면 압축된 엑셀 파일을 내려받을 수 있을 것으로 보입니다.

**키워드**: zip 압축, Down2Excel.jsp, 엑셀 압축 다운로드, 서버 저장, 미지원

---
