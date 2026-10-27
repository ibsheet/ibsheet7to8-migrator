# IBSheet 7 서버모듈 Q&A 정리집

IBSheet 7의 서버모듈(엑셀·텍스트·PDF 다운로드와 엑셀·텍스트 업로드를 서버에서 처리하는 `ibsheet7-X.X.X.jar`와 `Down2Excel.jsp`, `LoadExcel.jsp` 등 JSP, .NET 서버모듈)에 관한 기술 질문과 답변을, 유사한 것끼리 합치고 불필요한 내용을 걷어내어 질문·답변 124개 항목으로 정리한 문서입니다. 검색 증강 생성(RAG)용 지식 데이터로 쓰기 위해 항목 하나만 읽어도 이해되도록 작성했습니다.

## 이 문서에 대하여

- **범위**: IBSheet 7 서버모듈의 라이선스, 제품 업그레이드와 JDK 17·21·Jakarta(Tomcat 10 이상) 전환, 서버 환경(WAS, JDK, POI 등 라이브러리) 오류, 엑셀·CSV·PDF 다운로드와 업로드의 옵션과 오류, 대용량·메모리, DRM과 엑셀 비밀번호, 엑셀 서식·이미지, 접근성 모드, 제품·서버모듈 배포 버전 이력과 지원 정책을 다룹니다. 원본은 2008-08 ~ 2026-10 사이에 접수된 문의 1,273건입니다. (IBSheet 7의 클라이언트 화면 기능 문의는 별도 문서에서 다룹니다.)
- **제품 구성**: 서버모듈은 크게 서버모듈 1.0 대(`ibsheet7-1.1.xx.jar`, POI 3.9~3.13 기준)와 서버모듈 2.0 대(`ibsheet7-2.0.xx.jar`, `2.1.xx.jar`, POI 3.13 이상, Jakarta용 `-jakarta` jar 별도)로 나뉘고, 클라이언트 모듈(`ibexcel.js`, `ExportMode:2`)과 .NET 서버모듈이 따로 있습니다. 같은 증상이라도 서버모듈 종류, `ibsheet.js` 버전, POI 버전, WAS에 따라 원인과 해결 방법이 다르므로 항목마다 해당 조건을 적었습니다.
- **항목 구성**: `### [분류-번호] 질문 제목` 아래에 **질문**(실제로 겪는 증상·요구 상황), **답변**(원인과 조치), **키워드**(검색에 쓰이는 표현)가 있습니다. 같은 주제의 문의는 하나의 항목에 질문 여러 개로 묶었습니다. 코드는 실제 답변에 있던 것만 실었습니다.
- **연결 표기**: 관련 항목은 `"항목 제목"([분류-번호])` 형태로 서로 연결했습니다.
- **제외한 내용**: 질문자·업체·프로젝트·담당자·연락처·이메일·IP 주소·라이선스 키·다운로드 링크 같은 식별 정보는 싣지 않았습니다. 인사·감사·접수 확인·일정 조율처럼 기술 내용이 없는 대화와, 답변이 "배포함", "전달함"처럼 버전 번호나 처리 사실만 있는 문의는 별도 항목으로 만들지 않고 "서버모듈·제품 배포 버전 이력"([REL-01])에 모았습니다. 영업·가격·계약 협의, 방문·원격 일정, 고객 소스 전체, 이미지·덤프·로그 첨부는 싣지 않았습니다. 해결 방법이 기록에 없는 증상은 "기록에 없음"처럼 확인된 현황만 그대로 적었습니다.
- **버전 정보 주의**: 항목에 적힌 버전·지원 범위는 그 문의를 처리한 당시의 정보이며, 이후 새 버전이 나왔거나 정책이 바뀌었을 수 있습니다. 특히 POI 지원 범위는 시기별로 달라졌습니다.("서버모듈별로 지원하는 POI 버전 범위와 그 변화"([LIB-03]) 참고) 오래된 답변이 최신 답변과 다를 때는 항목 안에서 시점을 구분해 적었습니다.

## 분류 안내

- **LIC** · 라이선스: 4개 항목 (LIC-01 ~ LIC-04)
- **UPG** · 제품 업그레이드·JDK/Jakarta 전환: 6개 항목 (UPG-01 ~ UPG-06)
- **ENV** · 서버 환경(JDK·WAS·POI 라이브러리 오류): 30개 항목 (ENV-01 ~ ENV-30)
- **LIB** · 라이브러리(POI 등) 구성: 3개 항목 (LIB-01 ~ LIB-03)
- **DWN** · 엑셀·텍스트·PDF 다운로드: 18개 항목 (DWN-01 ~ DWN-18)
- **UPL** · 엑셀·텍스트 업로드: 18개 항목 (UPL-01 ~ UPL-18)
- **DRM** · DRM(문서보안)·엑셀 비밀번호: 6개 항목 (DRM-01 ~ DRM-06)
- **PRF** · 대용량·메모리·속도: 12개 항목 (PRF-01 ~ PRF-12)
- **FMT** · 엑셀 서식·이미지·표현 한계: 20개 항목 (FMT-01 ~ FMT-20)
- **MSC** · 그 밖의 시트 사용 질문: 4개 항목 (MSC-01 ~ MSC-04)
- **REL** · 제품 배포·버전 이력·지원 정책: 3개 항목 (REL-01 ~ REL-03)

## LIC · 라이선스

### [LIC-01] 라이선스를 재발급·교체했는데 계속 invalid/경고 메시지가 뜬다

**질문**
- 라이선스를 재발급받아 적용했는데도 계속 invalid(또는 License is not valid) 메시지가 뜬다.
- 운영 서버에 적용했더니 라이선스가 없다는 메시지가 뜬다.
- 최근 받은 라이선스를 운영에 적용했는데 일부 메뉴에서만 라이선스 만료 알림창이 뜬다.
- 다운로드를 JSP가 아닌 `.do`로 호출하도록 `ibsheet.cfg`를 수정한 뒤부터 라이선스 경고가 뜬다.

**답변**
원인은 사례마다 달랐고, 기록에 남은 확인 결과는 다음과 같습니다.
- **예전 라이선스 키를 계속 불러오는 경우**: 원격으로 확인해 보니 이전 키가 계속 읽히고 있었습니다. 서버를 재기동한 뒤 다시 확인하도록 안내했습니다.
- **도메인이 누락된 경우**: 운영에 적용했을 때 라이선스가 없다고 나온 사례에서, 발급 시 도메인이 빠져 있어 도메인을 추가해 재발급했습니다.
- **일부 메뉴에서만 만료 알림이 뜨는 경우**: 해당 시스템은 IBSheet 외에 IBChart도 사용하고 있었습니다. IBChart 폴더 안의 license 파일 내용을 최근 재발급한 라이선스로 교체하라고 안내했습니다. IBSheet와 IBChart의 라이선스 파일은 각자의 폴더에 따로 있습니다.
- **`.do`로 다운로드를 호출하도록 `ibsheet.cfg`를 바꾼 경우**: `ibsheet.cfg` 파일이 정상적으로 호출되지 않아서 생긴 경고로 보이며, 서버에 해당 확장자의 마임타입(MIME type)을 등록하자 정상 동작했습니다.

**키워드**: 라이선스 invalid, License is not valid, 라이선스 재발급 후에도 경고, 이전 라이선스 키, 서버 재기동, 도메인 누락, ibsheet.cfg, 마임타입, IBChart 라이선스 폴더

### [LIC-02] "Version is incorrect" 경고가 뜬다 (제품 버전과 라이선스 불일치)

**질문**
- 시트 제품을 최신으로 올렸더니 `IBSheet version incorrect(1)` 또는 "Version is incorrect" 경고가 뜬다.
- 라이선스 발급 버전은 7.0.13인데 신청서에는 7.0.4로 적었다. 발급 버전이 달라도 상관없는가?

**답변**
- 제품 코어(ibsheet.js)는 라이선스 유효기간(마지막으로 발급한 라이선스 일자)과 제품 버전이 맞는지 검사합니다. 시트 제품은 최신인데 라이선스가 예전 버전용이면 이 경고가 뜨므로 **라이선스를 재발급**받아 교체해야 합니다. 라이선스 발급 양식을 작성해 메일로 보내는 방식으로 진행했습니다.
- 제품을 최신으로 올리는 배포 때마다 같은 안내가 반복되었습니다(JDK 17·21 전환 배포 포함). 운영에 반영할 때 라이선스 갱신을 함께 요청해야 합니다.
- 신청서에 적은 버전(7.0.4)과 발급 버전(7.0.13)이 달라도 상관없다고 답변했습니다.

**키워드**: Version is incorrect, version incorrect(1), 라이선스 버전 불일치, 제품 최신화 후 라이선스, 라이선스 갱신, 발급 버전

### [LIC-03] 라이선스 재발급·개발용·운영용 발급은 어떻게 요청하나 (주소·포트·IP·환경 변경 포함)

**질문**
- 개발용 라이선스를 받고 싶다. 운영 서버 라이선스를 발급받고 싶다.
- 개발계 주소가 일부 빠져서 다시 요청한다. 서버 포트가 바뀌었다.
- 서버를 클라우드로 이관하거나 IP·도메인이 바뀌었다. 윈도우 2012 서버를 2019로 바꾸면 영향이 있는가?
- 개발용 라이선스로는 엑셀 다운로드가 안 되는가?

**답변**
- 라이선스는 **발급 양식**(제품 패키지의 라이선스 폴더에 있는 "라이선스 발급" 문서)에 사용할 서버의 URL 정보를 적어 기술지원 메일로 회신하면 발급합니다. 개발용도 같은 방식입니다.
- 주소가 일부 빠졌거나 포트가 바뀐 경우에는 정보를 보완해 재발행했습니다. 포트가 계속 바뀌는 경우에는 모든 포트를 허용하는 형태로 재발행한 사례가 있습니다.
- **서버 OS 버전은 영향이 없습니다.** 다만 클라우드로 이관하면서 IP나 도메인이 바뀌면 라이선스를 다시 발급받아 적용해야 합니다.
- 구매한 업체인지 확인된 경우에 발급했습니다.
- 개발용 라이선스로 엑셀 다운로드가 안 되는지는 질문에 응답 기록이 없습니다. (.NET 서버모듈에서 개발 서버만 302 응답이 오는 현상이었고, 답변란에는 "안 되면 다시 연락이 올 것"이라고만 남아 있습니다.)

**키워드**: 라이선스 발급 양식, 개발 라이선스, 운영 라이선스, 재발행, 도메인, 포트 변경, IP 변경, 클라우드 이관, 서버 OS 변경

### [LIC-04] 라이선스와 엑셀 다운로드·업로드는 관계가 있나

**질문**
- 로컬에서는 되는데 운영(또는 테스트 서버)에서 엑셀을 내려받으면 "파일이 없다"는 메시지가 나온다. 라이선스를 받지 않아서인가?
- 라이선스를 재발급받아 교체했더니 엑셀 다운로드가 안 된다. 연관이 있는가? (CSV, TXT는 잘 내려온다.)
- 테스트 서버에만 엑셀이 깨져서 내려온다. 테스트 서버에 라이선스가 없어서 생기는 문제인가?

**답변**
엑셀 다운로드 문제는 대부분 **라이선스와 무관**하다고 답변했습니다. 확인한 원인은 다음과 같습니다.
- "파일이 없다"는 메시지: `Down2Excel.jsp` 경로가 맞지 않거나 파일이 경로에 없는지부터 확인합니다.
- 엑셀만 안 내려오고 CSV·TXT는 되는 경우: POI 라이브러리 문제로 봅니다. `WEB-INF/lib`에 POI 3.13-all과 3.2-final이 함께 들어 있었고, 3.2를 제거한 뒤 다시 시도하도록 안내했습니다. (중복 버전 문제는 "POI와 함께 써야 하는 라이브러리 목록"([LIB-01]) 참고)
- 특정 서버에서만 엑셀이 깨지는 경우: 그 서버의 서버모듈 버전과 `lib` 폴더의 라이브러리 구성이 다른 경우가 많으므로 서버모듈 버전부터 확인합니다. ("서버모듈 버전과 필요한 라이브러리 확인 방법"([LIB-02]) 참고)

**키워드**: 라이선스 무관, 엑셀 다운로드 안 됨, 파일이 없다, Down2Excel.jsp 경로, 엑셀 손상, CSV는 되는데 엑셀만 안 됨

## UPG · 제품 업그레이드·JDK/Jakarta 전환

### [UPG-01] JDK 17/21, Tomcat 10 이상(Jakarta)으로 올리면 서버모듈이 동작하지 않는다

**질문**
- JDK를 1.8에서 17(또는 21)로, WAS를 Tomcat 10/11로 올리는데 엑셀 다운로드·업로드가 오류를 낸다.
- Tomcat 10부터 서블릿 API 네임스페이스가 `javax.servlet`에서 `jakarta.servlet`으로 바뀌어 기존 서버모듈(jar, JSP)이 `javax`를 참조하다가 에러가 난다.
- Jakarta EE 대응 jar를 받을 수 있는가? (예: 기존 `ibsheet7-2.0.x`, `ibsheet7-2.1.13` 사용 중)

**답변**
Jakarta 환경에서는 제품을 아래처럼 **한 벌로 교체**해야 한다고 안내했습니다. 일부 파일만 바꾸면 오류가 납니다.
1. **ibsheet.js(코어)**: jar가 업데이트되면 ibsheet.js도 같이 최신으로 교체합니다. 기존 화면의 조회·저장·엑셀 다운로드를 테스트합니다.
2. **메시지 파일(ibmsg)**: ibsheet.js가 최신화되면서 추가된 메시지가 있으므로 함께 교체합니다.
3. **서버모듈 jar**: Jakarta EE로 컴파일한 `ibsheet7-2.1.xx-jakarta.jar`가 코어입니다. (전달한 예: 2.1.26 → 2.1.32-jakarta → 2.1.48-jakarta 순으로 배포) 기존 jar 목록 파일(예: `7.0.53.jar.txt`)에 적힌 이전 jar는 삭제합니다.
4. **lib 폴더의 jar**: Jakarta jar는 `lib` 폴더의 jar들로 개발되었으므로 모두 적용합니다. 중복 jar가 있으면 **버전이 높은 하나만** 남깁니다. 버전이 다른 중복 jar가 있으면 오동작할 수 있습니다. (예: 기존 `poi-3.13-20191017.jar`가 있고 배포본에 `poi-5.4.0.jar`가 있으면 기존 poi를 삭제)
5. **엑셀 처리 JSP**: `ibsheet.cfg`에 `Down2Excel_Url` 등으로 설정한 엑셀 처리 JSP(`Down2Excel.jsp`, `LoadExcel.jsp` 등)를 배포본 JSP로 교체합니다. 사용자 환경설정 변수를 고쳐 쓰던 경우 교체 후 기존 값과 같게 다시 맞춥니다. (예: `String webRootPath = "c:/temp/test"; ibExcel.setWebRoot(webRootPath);`) JSP에 DRM 로직이나 개발자가 넣은 코드가 있으면 그 부분도 다시 반영합니다.
6. **라이선스**: 제품을 최신으로 올리면 라이선스를 교체해야 합니다. 그렇지 않으면 "Version is incorrect" 경고가 뜹니다. ("Version is incorrect 경고가 뜬다"([LIC-02]) 참고)

또한 기록에는 다음 내용이 있습니다.
- 연말정산 영역용으로 쓰던 별도 jar·js는 따로 제공하지 않으므로 전달한 제품으로 모두 교체해야 합니다.
- JDK 1.5 이하이거나 JDK 11 이상인 환경에서는 해당 버전에 맞는 jar를 따로 재배포해야 하므로 먼저 연락이 필요합니다.
- Jakarta 지원 jar의 배포는 유지보수 계약이 유효한 경우에 이루어졌습니다. 무상 유지보수가 만료된 사이트는 유상 유지보수로 전환한 뒤에 기술지원과 제품 배포가 가능하다고 답변한 사례가 있습니다.
- 설치 가이드는 IBSheet8 기준으로 쓰였지만 jar 설정과 에러 관련 내용은 같으므로 참고할 수 있습니다.

**키워드**: Jakarta, javax, jakarta.servlet, JDK 17, JDK 21, Tomcat 10, Tomcat 11, ibsheet7-jakarta.jar, 서버모듈 교체, 중복 jar, Down2Excel.jsp, LoadExcel.jsp, ibmsg

### [UPG-02] 서버모듈을 2.0에서 2.1로 올렸더니 엑셀 다운로드가 안 된다 (JDK 11 / POI 4.1.2)

**질문**
- `ibsheet7-2.0.*`에서 `ibsheet7-2.1.*`로 바꿨더니 엑셀 다운로드가 되지 않는다. 수정할 부분이 있는가?

**답변**
몇 개 파일만 교체하면 일부 기능에서 오류가 날 수 있으므로 **전체 패키지**를 기준으로 적용해야 합니다. 특히 JDK 11에서 정상 동작하려면 Apache POI와 관련 라이브러리(jar, JSP)를 함께 맞춰야 합니다. 기존에 POI 3.13을 쓰고 있다면 JDK 11 전환 시 POI 4.1.2로 올려야 합니다.

1. **POI 관련 라이브러리**: `poi-3.13-all.jar`를 `poi-4.1.2.jar` 등으로 교체합니다. 같은 이름의 jar가 있으면 높은 버전만 남깁니다. `lib`에 적용할 목록은 다음과 같습니다.
   `batik-all-1.17.jar`, `commons-codec-1.13.jar`, `commons-collections4-4.4.jar`, `commons-compress-1.19.jar`, `commons-io-2.11.0.jar`, `commons-logging-1.1.3.jar`, `commons-math3-3.6.1.jar`, `curvesapi-1.06.jar`, `poi-4.1.2.jar`, `poi-ooxml-4.1.2.jar`, `poi-ooxml-schemas-4.1.2.jar`, `servlet-api.jar`, `SparseBitSet-1.2.jar`, `xml-apis-ext-1.3.04.jar`, `xmlbeans-3.1.0.jar`, `xmlgraphics-commons-2.9.jar`
2. **엑셀 모듈 코어(jar)**: 환경이 Jakarta EE인지 Java EE인지 확인해 맞는 jar를 적용합니다. Jakarta 환경은 따로 문의해야 합니다. JDK 1.8 이상을 권장합니다.
3. **JSP**: 제품 패키지의 서버모듈 jsp 폴더의 JSP를 최신으로 교체하되, 기존 JSP와 비교해서 수정된 부분만 반영합니다. Jakarta EE와 Java EE 모두 같은 JSP를 쓸 수 있습니다.
4. **그리드 코어(ibsheet.js)**: jar만 바꾸면 오류가 날 수 있으므로 ibsheet.js도 최신으로 올립니다. (당시 7.0.13.278) `ibsheet.css`는 기존 디자인과 비교한 뒤 선택적으로 적용하도록 권장했습니다.
5. **라이선스**: 기존과 같은 방식으로 적용합니다.

**키워드**: ibsheet7-2.0, ibsheet7-2.1, JDK 11, POI 4.1.2, POI 3.13, 엑셀 다운로드 안 됨, 패키지 전체 교체, ibsheet.css

### [UPG-03] 엑셀을 xlsx로 받으면 "파일 형식 또는 확장명이 잘못되었다"며 열리지 않는다

**질문**
- `Down2Excel`의 파일명에 `xlsx`를 지정하면 `.xlsx`로 내려오지만 열면 "파일 형식 또는 파일 확장명이 잘못되어 열 수 없습니다"라는 오류가 난다. JSP에서 확장자를 xlsx로 설정하는 구간도 바꿔 봤지만 같다.

**답변**
- **원인은 제품(코어) 버전이 xlsx를 지원하지 않는 낮은 버전**이었습니다. xlsx(2007) 형식은 제품 버전 `7.0.0.0-20130906-11`부터 지원합니다. 서버모듈 jar만 올려서는 해결되지 않고 제품 코어(ibsheet.js)도 함께 올려야 합니다.
- 구버전은 엑셀 다운로드·업로드가 JSP 파일만으로 동작했지만, 최신 버전은 `ibsheet7-X.X.X.jar`와 기능별 JSP를 함께 사용합니다. 업그레이드할 때는 "IBSheet7 버전 업그레이드 주의사항[서버모듈2.0]" 문서를 참고하도록 안내했습니다.
- 함께 확인하도록 안내한 것: 서버 JAVA 버전(1.5 이하이거나 11 이상이면 해당 버전용 jar 재배포가 필요), 그리고 jQuery 버전입니다. jQuery 1.6.2에서 `clearInterval` 처리 오류가 확인되어 업그레이드를 안내했고, jQuery 1.x/2.x는 보안 취약점이 여러 건 보고되어 결국 3.x로 올려야 한다고 덧붙였습니다.
- 라이선스 발급이 필요하면 발급 양식을 작성해 회신합니다. ("라이선스 재발급·개발용·운영용 발급은 어떻게 요청하나"([LIC-03]) 참고)

**키워드**: xlsx 열리지 않음, 파일 형식 또는 파일 확장명이 잘못, 7.0.0.0-20130906-11, 코어 버전, jQuery 1.6.2 clearInterval, 업그레이드 주의사항

### [UPG-04] 자바 버전을 올리거나 서버모듈을 쓰면 추가 비용·이슈가 있나

**질문**
- JDK 1.7에서 1.8로 올릴 예정인데 버전 업 이슈가 있는가? 서버모듈을 사용하면 추가 라이선스 비용이 발생하는가?
- 엑셀 다운로드 시 암호화(비밀번호 설정)가 필요해서 제품 버전을 올리려 한다. 갱신된 라이선스만 적용하면 되는가, 내부 라이브러리 함수도 바꿔야 하는가?
- POI 3.17 이후 버전을 지원하는가? (3.17 이후는 복호화 지원이 늘어난 것으로 보인다)

**답변**
- JDK 1.7 → 1.8은 이슈가 없고, 서버모듈을 써도 **추가 라이선스 비용은 없습니다**. 다만 사용 중인 js가 크롬 이슈가 모두 해결된 버전이 아니면 크롬 이슈까지 고려해 js와 jar를 함께 최신으로 올리도록 권했고, 이때도 별도 라이선스 비용은 없다고 안내했습니다.
- 엑셀 파일 비밀번호는 **서버모듈**에서 제공하는 기능입니다. 엑셀 모듈은 크게 두 가지입니다. (1) 클라이언트 모듈: 서버로 데이터를 보내지 않고 브라우저에서 다운로드·업로드를 처리, (2) 서버모듈: 데이터를 서버로 보내 서버에서 처리. 비밀번호 기능은 (2)에 있고 제약 사항이 있어 샘플 예제와 readme를 전달했습니다. 샘플의 jar와 JSP로 교체하면 되고, jar만 교체하는 것이므로 라이선스 체크는 따로 없습니다. 연말정산 쪽 엑셀 다운로드는 이 기능을 지원하지 않습니다. 이 샘플은 POI 3.10 기반으로 만든 것이었습니다.
- POI 3.17 이후 지원 여부는 별도 가이드(지원 건)로 안내했다고만 기록되어 있어 답변 내용은 이 기록에 없습니다. POI 5.x를 쓰는 환경(보안 취약점 점검으로 POI를 5.4로 올린 사례)은 서버모듈과 맞는 ibsheet.js(7.0.13.291)를 추가로 배포해 호환되게 했습니다. 사용 중인 시트7 버전을 알 수 없어 배포한 서버모듈과 맞는 버전을 새로 보낸 것입니다. 시트8 서버모듈(`ibsheet8-*.jar`)을 혼용하는 환경에서 라이선스 검증 오류(-99)가 난 사례는 이 기록에 해결 내용이 없습니다.

**키워드**: JDK 1.8 업그레이드, 서버모듈 추가 비용, 엑셀 비밀번호, 엑셀 암호화, POI 3.17, POI 5.4, 7.0.13.291, 클라이언트 모듈, 서버모듈

### [UPG-05] 서버모듈 버전별로 같이 넣어야 하는 jar 목록 (사례)

**질문**
- 서버모듈을 적용하려는데 기존에 있던 `commons-codec-1.5.jar`, `commons-logging-1.1.2.jar`는 지우고 배포받은 파일을 적용하면 되는가?
- `batik-all-xml.jar`가 포함한 `org.apache.commons.io.IOUtils` 클래스와 `commons-io-2.11.0.jar`의 클래스가 같아서 다른 솔루션과 충돌한다. `batik-all-xml.jar`는 필수인가? Maven에서 지원하지 않는 라이브러리여서 다른 라이브러리(예: `batik-transcoder-1.15`)로 대체할 수 있는가?
- 보안 점검 때문에 `commons-compress` 등 오픈소스 취약점 조치가 필요하다. 조치 방법은 jar 업데이트, 방어 코드 적용, 취약점 기능 미사용 시 예외 처리 중에서 선택할 수 있다고 들었다.
- 서버모듈에서 필요한 기타 라이브러리 버전과 현재 프로젝트 라이브러리 간의 호환성은?

**답변**
- 서버모듈 배포 때 안내한 라이브러리와 이름이 같은 기존 jar(예: `commons-codec-1.5`, `commons-logging-1.1.2`)는 **삭제하고 배포받은 파일을 적용**하면 됩니다.
- **시점별 최종 jar 목록(사례)**
  - **서버모듈 2.1.31 + POI 4.1.2 (2024-12)**: `commons-codec-1.17.1.jar`, `commons-collections4-4.4.jar`, `commons-compress-1.19.jar`, `commons-logging-1.1.3.jar`, `commons-math3-3.6.1.jar`, `curvesapi-1.06.jar`, `ibsheet7-2.1.31.jar`(기존 ibsheet jar는 삭제 후 적용), `poi-4.1.2.jar`, `poi-ooxml-4.1.2.jar`, `poi-ooxml-schemas-4.1.2.jar`, `SparseBitSet-1.2.jar`, `batik-all-1.17.jar`, `commons-io-2.11.0.jar`, `xml-apis-ext-1.3.04.jar`, `xmlgraphics-commons-2.9.jar`, `xmlbeans-3.1.0.jar`
  - **서버모듈 2.1.25 + POI 3.13 (2024-07)**: `batik-all-1.17.jar`, `commons-codec-1.10.jar`, `commons-io-2.11.0.jar`, `commons-logging-1.2.jar`, `dom4j-1.6.1.jar`, `ibsheet7-2.1.25.jar`, `poi-3.13.jar`, `poi-ooxml-3.13.jar`, `poi-ooxml-schemas-3.13.jar`, `xml-apis-ext-1.3.04.jar`, `xmlbeans-3.1.0.jar`, `xmlgraphics-commons-2.9.jar`
  - **POI 5 계열(2024-05)**: 제품 공유 폴더의 `서버모듈 2.0/Java/lib/poi-5` 안의 jar와 `ibsheet7-2.1.24.jar`를 배포했고 `ibsheet.js`는 7.0.13.253-20240529-1501이었습니다. 이 시점에는 POI 5.2를 지원하면서 `batik-all-xml.jar` 관련 라이브러리도 모두 교체될 예정이라고 하며 예상 목록으로 `batik-all-1.14`, `commons-codec-1.15`, `commons-compress-1.21`, `commons-io-2.11.0`, `poi-5.2.0`, `poi-ooxml-5.2.0`, `poi-ooxml-lite-5.1.0`, `xmlbeans-5.0.2`, `log4j-api-2.17.1` 등을 안내했습니다.
- `batik-all-xml.jar`의 대체 가능 여부를 묻는 질문에는 위처럼 최종 필요한 jar 목록으로 답했고, 클래스 중복(`IOUtils`)으로 충돌이 나는 경우에는 사용하는 jar 구성을 위 목록에 맞춰 정리하라는 취지입니다. (이후 `batik-all-1.17`로 바뀌었고 관련 문제는 "라이브러리 충돌·누락 사례 모음"([ENV-21])에 있음)
- 취약점 조치 방식(점검 시스템 가이드에 따라 jar 업데이트, 방어 코드, 예외 처리)은 점검 주체가 정하는 것이며, jar를 올리는 경우 **Java 8 지원 범위에서만 가능**하다는 점과 jar 간 의존성·영향도를 함께 고려하라는 설명이 있었습니다. ("보안 점검(오픈소스 취약점)으로 라이브러리 버전을 올려야 할 때"([ENV-06]) 참고)

**키워드**: 서버모듈 필수 jar, ibsheet7-2.1.31, ibsheet7-2.1.25, batik-all-xml 대체, commons-io 충돌, POI 5.2, 라이브러리 호환성

### [UPG-06] 제품·서버모듈·JSP 버전이 서로 맞지 않아 생기는 문제 (연말정산 sp.jar, DirectDown2Excel.jsp, WAS 공용 lib)

**질문**
- 버전을 올린 뒤 `DirectDown2Excel.jsp`에서 `import="com.ibleaders.ibsheet7.ibsheet.excel.DirectDown2Excel"`을 제대로 불러오지 못한다. (`ibsheet.js` 7.0.13.258)
- `DirectDown2Excel()`의 workbook을 만드는 구간에서 `out of index` 오류가 난다. (연말정산 쪽 jar와 다른 시스템의 `ibsheet.js`를 따로 가져옴)
- 개발은 되는데 운영에서 엑셀 업로드 시 특정 컬럼(Z열) 이후 데이터가 안 올라간다. (POI 3.16)
- `ibsheet7-2.1.13.jar`/`ibsheet.js` 7.0.13.236에서는 업로드가 안 되고 `ibsheet7-2.0.59.jar`/7.0.13.165에서는 된다.
- 엑셀 다운로드 시 제공되는 기능 중 날짜를 간단한 날짜로 표시할 수 있는가?
- 보안 점검에서 다운로드 때 쿠키에 그리드 ID가 있고 만료 기간이 1년이다. 이 만료 기간을 1개월로 줄이거나 `HttpOnly`로 바꾸는 방법이 있는가?
- `ibsheet.js`를 최신으로 올린 뒤 엑셀 다운로드 시 `System.FormatException: 인식할 수 있는 숫자를 찾지 못했습니다`(.NET)가 난다. / 합계 행의 숫자 데이터에 콤마가 붙지 않는다.
- 엑셀 다운로드 시 글자색이 적용되지 않는다.
- 엑셀 업로드에서 `12503155`가 `12503156`으로 변환되어 올라간다.
- Java 17이 지원되는가? (2020년에 구축된 시스템)

**답변**
- **`DirectDown2Excel.jsp` 불일치**: `Down2Excel.jsp`는 서버모듈 2.1.9에 맞춰 쓰는데 `DirectDown2Excel`은 서버모듈 1.x를 사용해서 생긴 문제입니다. 서버모듈 버전에 맞는 `DirectDown2Excel.jsp`를 보내 주었습니다. 한 시스템에서 JSP끼리, jar끼리 버전을 섞어 쓰지 않아야 합니다.
- **연말정산 jar와 다른 시스템의 js 혼용**: `ibsheet7-1.1.11-sp.jar`와 `ibsheet.js` 7.0.13.165처럼 서버모듈과 제품 버전이 맞지 않아 생긴 현상으로 보고 서버모듈을 더 최신으로 올리거나 연말정산 쪽 시스템 버전에 맞추라고 안내했습니다. (다른 사례: 연말정산 쪽은 `ibsheet.js` 7.0.13.165, 인사시스템은 7.0.13.266, 최신 jar는 `ibsheet7-2.1.34.jar`를 적용해 잘 돌아가지만 연말정산 쪽 js 버전이 낮아 엑셀 모듈이 잘 동작하지 않을 수 있어 나중에 문제가 되면 js를 업데이트해야 한다고 정리했습니다. OEM 업체가 연말정산용 패키지 5 버전을 새로 내놓았다고 하는 기록도 있습니다.)
- **WAS 공용 lib를 보는 경우**: `WEB-INF/lib`에 라이브러리가 모두 있는데도 poi 파일이 없다는 에러가 나는 사례는 `WEB-INF/lib`가 아니라 **WAS의 기본 lib 폴더**를 바라보는 것으로 보고 `WEB-INF/lib`의 라이브러리를 WAS 기본 lib 폴더로 옮기라고 안내했습니다.
- **날짜 서식**: `ibsheet7-1.1.76.jar` 사이트에는 첨부한 jar로 교체하면 날짜 서식으로 다운로드되며(그 버전부터 날짜 서식), 같은 맥락으로 연도·날짜 형식이 달라지는 문의는 jar 교체로 해결되었습니다.
- **쿠키 만료 1년, HttpOnly**: `HttpOnly`는 WAS 설정에서 할 수 있으나 설정하면 브라우저가 쿠키를 차단해 쿠키가 생성되지 않습니다. 시트는 엑셀 다운로드 메서드를 실행하면 대기 이미지를 띄우고 response의 `document.cookie` 값에 따라 지우기 때문에, 쿠키를 차단하면 대기 이미지가 닫히지 않습니다. 그래서 쿠키가 아니라 **XHR 통신**으로 닫도록 `UseXhr:true`를 설정해야 합니다. `HttpOnly`를 설정하고 엑셀 다운로드를 쓰려면 `ibsheet.js`(7.0.13.257) 최신 코어 파일, 서버모듈 최신 버전(당시 기준 `ibsheet7-1.1.134.jar` 이상, 안내한 것은 `ibsheet7-1.1.135.jar`), JSP(`Down2Excel.jsp` 등)를 비교해 적용해야 합니다.
```
mySheet.Down2Excel({UseXhr: true})
mySheet.DirectDown2Excel({UseXhr: true})
// ReqHeader 옵션 사용 예시
mySheet.Down2Excel({ReqHeader: {'Content-Type':'application/json; charset=UTF-8;'}})
mySheet.DirectDown2Excel({ReqHeader: {'Content-Type':'application/json; charset=UTF-8;'}})
```
- **.NET**: `ibsheet.js`만 올리고 .NET 서버모듈을 그대로 둔 경우의 `FormatException`은 .NET 2.0.0.6에서 비슷한 오류 패치가 되어 있으니 **2.0.0.6**(닷넷 3.5용도 포함)을 보내 주고 테스트하라고 안내했습니다. 합계 행 콤마 문제는 **2.0.0.7 dll**을 배포했습니다.
- **글자색**: 서버모듈 1.0에는 글자색 기능이 없고 2.0에는 있다고 답했습니다. 데이터가 많지 않다면 클라이언트 모듈로 다운로드해도 됩니다.
- **`12503155` → `12503156`**: xlsx로 엑셀 파일을 로드할 때 숫자가 변환되어 로드되는 부분(특정 컬럼 이상이 로드되지 않는 현상 포함)을 수정한 제품을 배포했습니다. 같은 사이트는 그동안 접수한 버그를 자체 테스트했다고 하며, xlsx 로드 시 숫자가 변환되어 올라오는 부분이 있는지 테스트하라고 안내했습니다.
- **Java 17**: 서버모듈 쪽 jar, lib, jsp 등을 교체해야 하며, 2020년에 구축된 시스템이라도 내부 `ibsheet.js` 버전이 예전이면 **전문도 바뀌었기 때문에 `ibsheet.js`도 교체**해야 할 가능성이 있습니다. 교체한다면 현재 `ibsheet.js` 버전과 서버모듈 버전을 확인해 Java 17용 제품을 배포하며, `ibsheet.js` 버전이 오래되었다면 패치 내역에 대한 영향도도 확인해야 합니다.
- 제품 버전이 올라가면 문서 연동 때 생성되는 **전문 내용이 바뀌므로** 서버모듈도 교체해야 합니다. 서버모듈 1.1.x가 패치되면서 POI 권장 범위가 제한되어(3.9~3.13) 기존에는 상위 POI(3.16)를 써도 되던 사이트가 업그레이드 후에는 쓸 수 없게 된 사례가 있습니다. 이 경우 상위 POI를 지원하는 2.x 서버모듈로 교체하거나 POI를 3.13으로 낮춰야 합니다.

- 서버모듈 1.1.81 jar와 새로 받은 JSP를 모두 넣었더니 오류가 난 사례는 **jar만 올리고 JSP는 기존 그대로** 사용하자 잘 되었습니다. 반대로 구버전 `down2excel.jsp`(서버모듈 없이 쓰던 oldjsp)를 쓰고 있었다면 서버모듈과 함께 있는 JSP로 교체해야 합니다. 버전별 JSP 적용 방법은 안내서를 확인해야 합니다.

**키워드**: DirectDown2Excel.jsp 버전 불일치, 연말정산 sp.jar, WAS 공용 lib, 쿠키 만료 HttpOnly, UseXhr, ReqHeader, .NET 2.0.0.6, 2.0.0.7, 전문 변경, POI 권장 범위 제한

## ENV · 서버 환경(JDK·WAS·POI 라이브러리 오류)

### [ENV-01] JDK 버전을 올리면 IBSheet7에 영향이 있나 (1.8 마이너, 8→17·21·22, 1.6→1.8)

**질문**
- JDK 1.8 안에서 마이너 업그레이드를 하는데 IBSheet와 연관성이 있는가?
- JDK 8에서 22로 올리는데 영향이 있는가?
- Weblogic 11 → JEUS 8.5, Java 1.6 → 1.8로 클라우드 환경으로 옮기는데 영향이 없는가? (`ibsheet.jar` 파일이 없고 java 파일로만 있음)
- JDK 1.6에서 1.8로 올렸는데 이미지가 있는 컬럼의 시트를 다운로드하면 엑셀 파일이 내려오지 않는다.
- 패치 버전을 받고 개발에서만 테스트했는데 운영에 반영하려면 어떻게 테스트해야 하는가? (개발은 JDK 1.8, 운영은 JDK 1.7)

**답변**
- **JDK 1.8 범위 내(같은 Java 8) 업그레이드는 IBSheet 사용에 직접적인 영향이 없고**, 재컴파일이나 버전 교체 같은 별도 조치도 필요 없습니다. `ibsheet.js`는 브라우저에서 동작하는 자바스크립트 모듈이므로 서버 JDK와 무관하고, 엑셀모듈(jar)은 JDK 1.8 이상을 지원합니다. 다만 JDK 업데이트 버전에 따라 TLS나 보안 기본값이 바뀌는 경우가 있으므로 업그레이드 후 엑셀 다운로드·업로드 같은 주요 기능이 정상 동작하는지 확인하라고 안내했습니다.
- **JDK를 8 이후(17, 21, 22)로 올리는 경우**는 POI 버전과 `javax` → `jakarta` 문제가 있어 제품 교체가 필요합니다. ("JDK 17/21, Tomcat 10 이상(Jakarta)으로 올리면 서버모듈이 동작하지 않는다"([UPG-01]) 참고) JDK 8에서 22로 올리는 사이트의 경우 안내 정책은 (1) 8버전으로 업그레이드, (2) 용역비 발생(3m/m), (3) 이미 도입된 수량의 제품은 무상이지만 증설 시 증설 수량만큼 비용이 발생한다는 것이었습니다. (영업 담당 답변)
- Java 1.6 → 1.8, Weblogic → JEUS 사례는 `ibsheet.jar`가 없고 java 파일만 있다면 구버전(oldjsp) 방식으로 보이는데, oldjsp는 POI를 직접 import해서 쓰던 것으로 기억하는데 POI가 없다고 하면 자사 모듈이 아닌 것 같아 확인이 필요합니다. Java 업그레이드는 필요하다고 하니 업그레이드 이후 영향도를 분석해서 진행하는 것이 좋고, java 파일 안에 JDK 하위 버전에서만 지원하는 요소가 있는지는 알 수 없어 업로드/다운로드 java 파일에 문제가 없다고 말하기 어렵다고 답했습니다.
- **JDK 1.6 → 1.8 후 이미지 컬럼 시트 다운로드가 안 되는 사례**: 기존에는 이미지는 안 내려와도 엑셀은 내려왔는데, 운영 서버에서는 SSL이 적용되어 있어 버그 때문에 이미지를 다운로드하지 못해 엑셀은 내려오고 이미지만 빠졌던 것이었습니다. js, jar를 업데이트하거나 **이미지 컬럼은 다운로드하지 않도록** 해야 합니다. 다운로드 로직에서 컬럼을 loop로 돌면서 `GetCellProperty`로 확인하는 부분이 이미 있으므로 `mySheet.GetCellProperty(1, 1, "Type")`으로 이미지 컬럼이면 `DownCols`에 넣지 않으라고 안내했습니다. ("이미지 컬럼을 제외하고 다운로드하는 방법"([FMT-04]) 참고)
- 패치 버전을 개발(JDK 1.8)에서만 테스트하고 운영(JDK 1.7)에 반영하는 사례는 히스토리상 **JDK 버전에 따라 되고 안 되던 내용**이므로 JDK 1.7 환경에서 되는지 테스트해야 한다고 설명했습니다.

**키워드**: JDK 업그레이드, JDK 1.8 마이너, JDK 22, JDK 1.6, JDK 1.7, TLS, 용역비, oldjsp, 증설 비용, 운영 테스트

### [ENV-02] POI 버전이 맞지 않아 생기는 오류 모음 (NoSuchMethodError, NoClassDefFoundError)

**질문**
- POI를 3.15로 두고 `ibsheet7-2.1.42.jar`로 올렸더니 `java.lang.NoSuchMethodException: org.apache.poi.ss.usermodel.Workbook.setRepeatingRowsAndColumns(int, int, int, int, int)`가 난다.
- `ibsheet7-1.1.76.jar` 사용 중에 POI를 4.1.2로 올렸더니 `NoSuchMethodError: CellStyle.setVerticalAlignment(short)`가 난다. (POI 3 버전이 오픈소스 취약점에 걸려 일괄 POI 4로 올리는 중)
- 제공받은 jsp, lib, js를 적용한 뒤 `NoSuchMethodError: org.apache.commons.io.IOUtils.byteArray()`가 난다.
- POI 3.10 / 3.14 / 3.15를 쓰고 있는데 4.1.2를 받아도 문제가 없는가? Java 17에서 POI 3.14를 써도 되는가?
- 취약점 점검 때문에 `poi-3.13-all.jar`, `batik-all-xml.jar` 같은 lib 업데이트가 있는가? (권장 버전: poi 3.17, xmlbeans 2.6.0, batik 1.19.0)
- 파일이 오래 되어 오류가 난다: POI 3.12를 넣었는데 `ibsheet7-2.1.47-jakarta.jar`로 POI 4.x가 안 된다.
- `poi-scratchpad-3.9.jar`가 있는데 상관이 있는가?

**답변**
- **POI만 올려서는 해결되지 않고 관련 파일이 모두 같이 업데이트되어야 합니다.** 보안 점검 때문에 POI를 올릴 때는 `ibsheet.js`(코어), `ibmsg`(메시지), 서버모듈 jar(예: `ibsheet7-1.1.76.jar`를 제거하고 `ibsheet7-2.1.35.jar`), `lib` 폴더의 jar 전체, JSP를 모두 최신으로 적용합니다. 중복 jar가 있으면 버전이 높은 것을 적용합니다. 이 `lib` jar는 카드사 보안 점검 내용을 기반으로 취합한 것이며 JDK 8 기준입니다. 이렇게 한 뒤에도 다운로드 로직(주로 `DirectDown2Excel`)이 정상적으로 돌지 않으면 `setService` 전에 `String data = request.getParameter("Data"); down.setData(data);`를 추가해 보도록 안내했습니다. (적용 대상 버전의 예: `ibsheet.js` 7.0.13.271)
- 구체적인 jar 목록과 적용 방법은 "서버모듈을 2.0에서 2.1로 올렸더니 엑셀 다운로드가 안 된다 (JDK 11 / POI 4.1.2)"([UPG-02])에 있습니다. 취약점 점검에 맞춰 lib를 올리려면 `ibsheet.js`와 `ibsheet7-*.jar`를 함께 올려야 하며, 안내한 예는 `ibsheet.js` 7.0.13.278, `ibsheet7-2.1.39.jar`, POI 4.1.2 기반 lib입니다.
- `setRepeatingRowsAndColumns`(POI 3.15) 오류 사례는 POI 4를 배포해 해결했습니다. `IOUtils.byteArray()` 오류는 `commons-io` 버전이 낮아서 생기는 문제로 보이며 연락이 없어 종료되었습니다.
- **Java 17에서는 POI 4.1.0 이상을 권장**합니다. POI 3.14는 2016년 3월에 나와 최신 Java를 고려하지 않았고, POI 3.x(3.11 이상)는 JDK 1.6 이상, POI 4.0.1 이상은 JDK 8 이상이 필요합니다. 그래서 POI 3.14를 Java 17에서 쓰면 정상 동작을 보장할 수 없습니다. POI는 최소 4.0 이상, 가능하면 5.x를 권장합니다.
- `dom4j`(예: 2.1.4)를 따로 넣어야 하는 경우는 `NoClassDefFoundError: org/dom4j/io/SAXReader`가 나는 사례입니다. 전달한 jar에 dom4j가 없었던 사례이고 `ReportXMLURL`에 dom4j가 필요합니다. ("ReportXMLURL이 적용되지 않을 때"([ENV-03]) 참고)
- `poi-scratchpad-3.9.jar`는 IBSheet와 관련이 없는 파일입니다.
- 서버모듈 2.1.47-jakarta를 쓰면서 POI 4.x가 안 돼 POI 3.12를 넣은 사례는 **권장 버전이 아니어서** 확인이 필요하다고 안내했습니다.
- `IBChart`를 쓰는 사이트에서 POI 3 취약점 때문에 모듈을 올린 뒤 IBChart PDF 다운로드가 `NoClassDefFoundError: org/apache/fop/svg/PDFTranscoder`로 실패한 사례는, `batik-all` 에서 `batik-all-1.17`로 올라가며 패키지/클래스 구조가 크게 바뀌어 한글을 정확히 인식하지 못하는 문제가 있어 원인 파악이 안 되었습니다. 대신 PDF 다운로드 시 **차트 이미지를 PNG로 변환해 PDF에 붙이는 방식**으로 개발하기로 논의했고, 이 경우 PDF 확대 시 이미지 선명도가 떨어질 수 있다고 안내했습니다. (서버모듈 `ibsheet7-2.1.37.jar` 전달)

**키워드**: NoSuchMethodError, NoSuchMethodException, POI 4.1.2, POI 3.14, Java 17 POI, commons-io, batik-all-1.17, dom4j, 취약점 점검, IBChart PDF

### [ENV-03] ReportXMLURL이 적용되지 않는다 (dom4j 누락, POI 4 이상)

**질문**
- 전달받은 `reportXML`을 넣었는데도 적용이 안 된다.
- POI를 4.0으로 올리면 `ReportXMLURL`을 못 쓰는데 다른 대안은?
- `ReportXMLURL` 기능이 ActiveX와 다르게 만들어진다. (`\n` 데이터가 자동 줄바꿈되지 않음, XML의 `StartRow`가 적용되지 않음)

**답변**
- **`dom4j.jar` 누락**이 원인인 경우가 있습니다. 해당 사례는 dom4j 라이브러리를 넣어 해결했습니다. `ReportXMLURL`을 쓰려면 dom4j가 import되어야 합니다. (예: `ibsheet7-2.1.44-jakarta.jar` + dom4j)
- ReportXML 줄바꿈(`\n`)이나 `StartRow` 적용 문제는 서버모듈 업데이트(`ibsheet7-2.1.50-jakarta.jar`, `ibsheet.js` 7.0.13.298)로 해결했습니다.
- 여러 시트를 한 워크시트에 받을 때 `ReportXMLURL`을 쓰면 2번째 시트의 데이터가 첫 번째 시트에 붙어서 내려오는 문제는 같은 패치에서 **`AppendSheetGap`** 옵션(시트 사이에 띄울 행 수, 예: `AppendSheetGap: 1` 또는 `2`)을 추가해 처리했습니다. ActiveX에서는 시트마다 빈 행이 2개 생겨 구분되었습니다.
- `Down2Excel(true)` 같은 파일 버퍼 모드에서는 `ReportXMLURL`을 쓸 수 없습니다. ("ReportXMLURL을 못 쓰는 대용량 다운로드에서 제목·머리글을 넣으려면"([PRF-02]) 참고)

- `ReportXMLURL`을 쓰는데 데이터가 90건 정도 되면 `IllegalArgumentException: Attempting to write a row[0] in the range [0,205] that is already written to disk`가 나면서 `ReportXMLURL`에 설정한 내용이 다운로드되지 않는 사례는 서버모듈 `1.1.123.jar`와 맞는 JSP를 배포해 처리했습니다. 이때 PDF 다운로드에는 `flying-saucer-core-9.0.2.jar`, `flying-saucer-pdf-9.0.2.jar`, `itext-2.1.7.jar`가 필요하다고 함께 안내했고 `Down2Pdf.jsp`에서 빨간 줄이 뜨는 것은 관련 jar가 없어서였습니다.

**키워드**: ReportXMLURL, dom4j, NoClassDefFoundError SAXReader, AppendSheetGap, ReportXML StartRow, ReportXML 줄바꿈

### [ENV-04] WAS·웹서버 설정 한도와 환경 오류 (WebtoB, JEUS, JBoss, 405, LinkageError)

**질문**
- 개발을 끝내고 개발 서버에 적용했는데 모든 화면에서 엑셀 다운로드가 안 된다. (WebtoB + JEUS, 다른 사이트 소스를 그대로 셋팅했는데 거기서는 잘 된다)
- JEUS에서 버전을 올린 뒤 `java.lang.LinkageError: 로드 제한조건 위반 … javax/xml/namespace/QName`이 난다.
- 두 번째 `LoadExcel`부터 405 에러가 나고 호출 URL이 두 번 나간다. (Tomcat, JEUS; jsp, .do 모두)
- JBoss를 업그레이드했더니 엑셀 업로드 오류가 난다. (Java 17, `javax.servlet.http.HttpServletRequest cannot be resolved`)
- Jakarta EE 환경을 구축하고 제품을 올린 뒤 비밀번호 설정 다운로드에서 `NoClassDefFoundError`가 난다.
- 엑셀 업로드 시 컬럼이 엑셀 `AA`를 넘어 49개인데 Z번째(26) 컬럼 이후가 로드되지 않는다. (은행권 공통 프레임워크, `2.0.83.jar`)
- `UserMerge:"0,0,1,12 1,0,0,0"`의 `1,0,0,0` 설정에서 에러가 나서 제거하니 에러는 없지만 엑셀의 헤더(NO 컬럼)가 늘어난다.
- `TitleText`가 자바 버전 업그레이드 후 마지막 릴리즈(253)부터는 포함하면 엑셀 다운로드가 되지 않는다.

**답변**
- **WebtoB + JEUS**: WebtoB의 `MaxBodySize`, JEUS의 `max-post-size` 설정을 확인하라고 안내했습니다. 모든 화면에서 안 되는 경우 서버 설정 한도부터 의심합니다.
- **JEUS `LinkageError`**: 전자정부 프레임워크에 있는 java 파일(컨트롤러 방식)을 전달했습니다. ("JSP를 쓸 수 없는 Spring 환경에서 서버모듈을 쓰려면"([DWN-12]) 참고)
- **405 에러 / 호출 URL이 두 번 나감**: 적용 후 개발·로컬에서는 정상이라고 하고 통합 테스트 때 문제가 되면 연락하기로 하여 종료되었고 원인은 기록에 없습니다.
- **JBoss/Jakarta 오류**: 서버모듈을 올리려던 이유가 엑셀 비밀번호 다운로드였으나 사이트는 비밀번호 방식이 아니라 다운로드 로그를 남기는 방식으로 구현해 oldjsp로 처리했습니다. Jakarta EE 환경에서 비밀번호 다운로드 오류 사례는 안내대로 적용한 뒤 잘 되었다고 회신받았습니다. (구체 내용은 기록에 없음)
- **49개 컬럼 중 Z 이후 로드 안 됨**: 기존에 `2.0.83.jar`를 쓰던 사이트로, 이후 상세 기록이 없습니다.
- **`UserMerge`/`TitleText` 문제**와 `javax` → `jakarta`로 바뀐 환경의 문제는 `ibsheet7-2.1.39-jakarta.jar`를 배포해 처리했습니다.
- Jakarta 버전 jar는 시기별로 다음처럼 배포되었습니다: `ibsheet7-2.1.32-jakarta`(2024-12), `2.1.39-jakarta`(2025-06~07), `2.1.44-jakarta`(2025-11), `2.1.45-jakarta`(2025-12, 2026-03), `2.1.48-jakarta`(2026-09), `2.1.49`/`2.1.50-jakarta`(2026-09). 자세한 이력은 "제품 버전 이력"([REL-01])에 모았습니다.

- `xlsx` 다운로드·로드가 안 되는 환경에서 **`xalan.jar`**와 충돌하면 xlsx 파일을 열 때 오류(`파일 형식 또는 파일 확장명이 잘못되었다`)가 나므로 이 파일을 삭제하면 해결됩니다. `xalan 2.5.D1`은 2.5.0으로 올리는 것만으로도 오류가 나지 않는다고 확인되었습니다. ('로컬은 되고 개발·운영에서만 안 되는 업로드·다운로드'([ENV-08]) 참고)

**키워드**: WebtoB MaxBodySize, JEUS max-post-size, LinkageError, 405 Method Not Allowed, JBoss, Jakarta NoClassDefFoundError, UserMerge, TitleText 오류

### [ENV-05] 여러 워크시트를 여러 그리드로 업로드하기, 엑셀 서블릿 샘플

**질문**
- 한 엑셀 파일 안의 여러 시트(어학 정보, 학력 정보, 가족 사항 등)를 각각의 그리드로 한 번에 읽어 업로드·저장할 수 있는가?
- IBSheet7용 업로드/다운로드 JSP를 서블릿으로 변환한 파일을 받고 싶다.

**답변**
- **`LoadExcelBuffer`로 구현**할 수 있습니다. 시트마다 `LoadExcel`을 호출할 때 `WorkSheetName`(워크시트 이름)을 지정하고, 모두 호출한 뒤 `LoadExcelBuffer(false)`로 버퍼링을 끝내면 파일 대화상자가 열려 한 번에 올라갑니다.
```
sheet1.LoadExcelBuffer(true);
var param1 = {WorkSheetName:"정규직"};
sheet1.LoadExcel(param1);   // 정규직 워크시트의 내용을 sheet1에 업로드
var param2 = {WorkSheetName:"비정규직"};
sheet2.LoadExcel(param2);   // 비정규직 워크시트의 내용을 sheet2에 업로드
sheet1.LoadExcelBuffer(false);  // 버퍼링 종료 (파일 다이얼로그 오픈)
```
- 서블릿 변환 파일은 전자정부프레임워크 샘플을 전달했습니다. ("JSP를 쓸 수 없는 Spring 환경에서 서버모듈을 쓰려면"([DWN-12]) 참고)

**키워드**: LoadExcelBuffer, WorkSheetName, 여러 워크시트 업로드, 다중 시트 그리드, 엑셀 서블릿, 전자정부프레임워크 샘플

### [ENV-06] 보안 점검(오픈소스 취약점)으로 라이브러리 버전을 올려야 할 때

**질문**
- 정기 점검에서 `Apache Commons Compress 1.19`에서 취약점이 발견되어 1.27.1로 올려야 한다. (운영 환경은 Java 8이고, Java 9에서만 지원되는 버전이면 예외 처리 예정)
- POI 3 버전이 오픈소스 취약점에 걸려 POI 4로 일괄 업그레이드할 계획인데 주의사항과 필요한 파일은?

**답변**
- Java 8 기준으로 최종 적용하도록 안내한 jar 목록은 다음과 같습니다.
  `batik-all-1.17.jar`, `commons-codec-1.17.1.jar`, `commons-collections4-4.4.jar`, `commons-compress-1.27.1.jar`, `commons-io-2.13.0.jar`, `commons-logging-1.1.3.jar`, `commons-math3-3.6.1.jar`, `curvesapi-1.06.jar`, `poi-4.1.2.jar`, `poi-ooxml-4.1.2.jar`, `poi-ooxml-schemas-4.1.2.jar`, `SparseBitSet-1.2.jar`, `xml-apis-ext-1.3.04.jar`, `xmlbeans-3.1.0.jar`, `xmlgraphics-commons-2.9.jar`, `servlet-api.jar`
- POI 등 일부 lib만 바꾸는 것으로는 해결되지 않고 **제품 전체(ibsheet.js, ibmsg, 서버모듈 jar, lib, JSP)** 를 같이 올려야 합니다. ("POI 버전이 맞지 않아 생기는 오류 모음"([ENV-02]) 참고)
- 엑셀모듈은 POI 등 오픈소스 라이브러리와 함께 구성되므로, 보안 점검에서 구버전 라이브러리의 알려진 취약점이 확인되면 엑셀모듈과 번들 라이브러리(POI 등)를 취약점이 패치된 최신 버전으로 업데이트해서 대응합니다.

**키워드**: 오픈소스 취약점, Commons Compress 1.27.1, 보안 점검, POI 4.1.2, 취약점 스캔, commons-codec 1.17.1, commons-io 2.13.0

### [ENV-07] Jakarta·Spring Boot 3·Gradle 환경에서 서버모듈 jar를 쓸 때 (javax 불일치, 컴파일 오류)

**질문**
- Spring Boot 3.3.3으로 올렸더니 `javax.servlet`이 `jakarta.servlet`으로 바뀌어 `LoadExcel`, `Down2Excel` 구현에 문제가 있다. Jakarta를 쓰는 버전이 있는가?
- 프로젝트가 Java 17 + jakarta인데 `LoadExcel.jsp`는 이전 Java EE를 사용해 컴파일에 문제가 있다. 프로젝트의 Java/EE 버전은 바꿀 수 없다.
- Jakarta jar를 받아 JSP 대신 컨트롤러로 구현하던 중 `IBSheetDown` 클래스 안에서 NullPointerException이 난다.
- `IBSheetDown.setService`, `IBSheetLoad.setService`, `Down2Image`, `Print2Pdf` 객체 생성 부분에서 오류가 난다. (JSP 내장 객체 `request`, `response`는 `javax.servlet.http`인데 jar는 `jakarta.servlet.http`를 인자로 받음) 기존에 쓰던 `com.ibleaders.ibsheet7.ibchart.IBChartImage` 클래스가 없어졌다.
- 버전 업그레이드 후 `Down2Excel.jsp` 호출 시 404가 난다. JSP를 모두 java로 옮긴 뒤 컴파일 시 `IBSheetDown` 클래스를 찾지 못한다. (IntelliJ, Gradle)
- Jakarta 버전으로 바꾼 뒤 `Down2Excel.jsp`를 실행하는데 반응이 없다.

**답변**
- 서버측 엑셀 처리 모듈은 **jakarta로 컴파일한 jar로 교체**해야 합니다. `javax`용 jar와 `jakarta`용 jar를 섞으면 `request`/`response` 타입이 맞지 않아 `setService`에서 오류가 납니다. 제품을 업그레이드하려면 먼저 `ibsheet.js` 버전(메모장으로 열면 상단에 표시)과 `WEB-INF/lib`의 `ibsheet7*.jar` 이름을 확인하고, **유상 유지보수 계약**이 되어 있어야 한다고 안내했습니다.
- 제공한 jar 구성(사례): Jakarta 환경은 `서버모듈 2.0/Java/bin/<버전>/jakarta/<버전>/lib-poi4`의 lib와 해당 버전의 jakarta jar(예: 2.1.18, 2.1.22, 2.1.25, 2.1.32)를 함께 적용하고, `servlet-api.jar`도 jakarta용(`jakarta-lib`)으로 교체해야 합니다. Jakarta 릴리즈 기준 마지막 버전을 안내할 때 2.1.32를 배포했고(2025-02 시점), 이후 2.1.34(javax용)가 있어 구분해야 했습니다. 서버모듈 JSP는 jakarta 버전과 맞는 것으로 같이 교체합니다.
- **Gradle 사용 시**: IntelliJ에서 jar를 모듈 의존성으로 추가해도 Gradle이 `ibsheet7-*.jar`를 못 찾을 수 있습니다. 프로젝트 루트에 `libs/` 폴더를 만들어 jar를 두고 `build.gradle`에 다음을 추가해 해결했습니다.
```
dependencies {
    implementation files('libs/ibsheet7-2.1.32-jakarta.jar')
}
```
  JSP를 컨트롤러로 옮기는 작업은 "JSP를 쓸 수 없는 Spring 환경에서 서버모듈을 쓰려면"([DWN-12])을 참고합니다.
- `IBChartImage` 클래스가 없어진 점과 `Print2Pdf`는 해당 사이트에서 쓰지 않아 고려 대상에서 제외해도 된다고 정리되었습니다.
- Spring Boot 환경에서 `Down2Excel.jsp`까지는 진입하고 200이 나오는데 "파일 다운로드 중 에러가 발생했습니다"만 나올 때는 **JSP 대신 Controller를 쓰도록** 안내했고 다음 설정을 추가하게 했습니다.
```
// 다운로드
String Data = request.getParameter("Data");
down.setData(Data);
down.setService(request, response);
// 업로드
String Data = request.getParameter("columnTag");
load.setData(Data, tempfile.getAbsolutePath());
load.setService(request, response);
```
- 컨트롤러에서 `IBSheetDown` 내부 NullPointerException이 나던 사례는 어떤 데이터가 안 들어갔는지 확인이 어려워 담당자에게 전달했다고만 기록되어 있습니다.

**키워드**: Jakarta, javax, Spring Boot 3, Gradle, IntelliJ, build.gradle files(), ibsheet7-jakarta.jar, IBSheetDown 클래스 못 찾음, servlet-api jakarta, 유상 유지보수

### [ENV-08] 로컬(Tomcat)은 되는데 개발·운영(JEUS 등)에서만 안 되는 업로드·다운로드 (Multipart, xalan, JDK 11)

**질문**
- `1.1.133.jar`로 교체했는데 로컬은 잘 되고 개발 서버에서는 우클릭 엑셀 다운로드 때 `NullPointerException`(`Common.getData`)이 난다.
- 엑셀 업로드 시 로컬에서는 되는데 개발·운영(JEUS)에서만 `IndexOutOfBoundsException`이 난다.
- 특정 화면의 엑셀을 열면 "내용에 문제가 있습니다. 이 통합 문서의 내용을 최대한 복구하시겠습니까?"가 뜨고, 전문을 확인하니 `</worksheet>` 태그가 닫혀 있지 않다. (POI 3.13, 연말정산 jar와 함께 사용)
- `xalan 2.5.D1`을 같이 쓰는데 엑셀 파일이 영향을 받는다. (다른 솔루션에 종속되어 변경 불가) IBSheet8도 같은 이슈가 있는가?
- 업로드 시 `OpenXML4JRuntimeException: Fail to save: an error occurs while saving the package`가 난다. (`ibsheet7-1.1.76.jar`)
- 로컬에서 7MB 이상 파일을 올리면 `loadExcel.jsp`가 여러 번 호출된다.

**답변**
- **`DirectDown2Excel` Multipart 설정**: 로컬은 `Multipart` 속성이 있든 없든 잘 되는데 개발 서버는 **`Multipart:0`을 설정해야 다운로드**되는 것으로 보여 그렇게 안내했습니다. ("`download excel data is not valid` 등 데이터 전송 오류"([FMT-13]) 참고)
- **JEUS에서 데이터 일부가 잘려서 발생하는 `IndexOutOfBoundsException`**: 같은 이슈로 수정된 `ibsheet7-1.1.12-sp.jar`와 JSP를 배포했습니다.
- **`</worksheet>`가 닫히지 않는 엑셀**: 원인은 **JDK 11**이었습니다. 다른 팀이 JDK 11을 설치했는데 컨테이너에서 JDK를 명시하지 않아 자동으로 11을 바라봤고, JDK를 8로 바꾸니 잘 되었습니다. (`ibsheet7-2.1.18.jar`와 `2.1.32.jar`를 함께 올린 상태에서 2.1.18을 지웠을 때부터 다운로드가 안 된 사례)
- **xalan**: Jsp Servlet으로 쓸 때 xalan 2.5.D1이 엑셀 파일에 영향을 줍니다. `Down2Excel.jsp`의 `try`문 위에 `System.setProperty("javax.xml.transform.TransformerFactory","com.sun.org.apache.xalan.internal.xsltc.trax.TransformerFactoryImpl");`를 추가하고 `finally`문 안에 `System.clearProperty("javax.xml.transform.TransformerFactory");`를 추가합니다. 이는 JAXP가 Xalan 대신 다른 XML 파서를 쓰도록 설정했다가 동작이 끝나면 초기화하는 동작입니다. **Java Controller 방식으로 구현했다면 이 구문 없이 정상 다운로드**됩니다. IBSheet8도 서버모듈을 JSP Servlet으로 쓰는 경우는 같은 구문을 적용해야 합니다.
- **`Fail to save` 오류**: 트리 시트 검색 시 트리가 펼쳐지는 기능과 함께 최신 버전(`ibsheet.js` 7.0.13.266, `ibsheet7-2.1.34.jar`)을 배포했습니다. 기존에 `ibsheet7-1.1.x.jar`로 엑셀 다운로드/업로드를 처리하던 사이트에는 **1.1.x는 더 이상 기능 추가나 수정이 되지 않으므로 반드시 2.1.x로 교체**하라고 안내했고, 교체 후 다운로드 로직이 정상 동작하지 않으면 `setService` 전에 `request.getParameter("Data")`를 `down.setData(data)`로 넣어 보게 했습니다.
- **여러 번 호출되는 문제**: 같은 소스인데 운영에서는 정상, 로컬에서는 30MB 정도 파일을 올리면 `loadExcel.jsp`가 여러 번 호출되는 것으로 보였습니다. 엑셀 로드 코드를 모두 지우고 `System.out.println("==========")`만 둬도 여러 번 찍혔고(openjdk 1.8.0_332), 파일 크기 5MB까지는 1회, 7MB는 여러 번 호출되는 것을 확인했습니다. 파일 크기에 제한이 있어 그 크기를 넘으면 여러 번 호출하는 것으로 보고, `input type="file"`을 만들어 action을 `loadexcel.jsp`로 지정해 같은 파일로 테스트해 보라고 안내했습니다.

**키워드**: Multipart 0, JEUS, IndexOutOfBoundsException, JDK 11 컨테이너, xalan, TransformerFactory, Fail to save package, 1.1.x 지원 종료, loadExcel 여러 번 호출

### [ENV-09] 다운로드한 엑셀에 이미지가 비는 환경 원인 (이미지 서버 IP/도메인 불일치, SSL 인증서)

**질문**
- 로컬 Tomcat에서는 엑셀에 이미지가 잘 내려오는데 JEUS(개발, 운영)에서는 엑셀은 내려오는데 이미지가 모두 비어 있다. `java.net.ConnectException: Connection refused:connect`가 난다.
- 운영 서버에서만 이미지가 포함되어 내려오지 않는다. 주소창에 경로를 치면 이미지가 뜬다. `setAllowDownloadRemoteImg(true)`도 소용없고 `SSLHandshakeException: PKIX path building failed`가 난다.
- `FileNotFoundException: https://…:443/1` 에러가 로그에 여러 번 올라온다. (`loadPicture`, `DirectDown2Excel`)

**답변**
- **서버에서 본 이미지 주소와 브라우저에서 본 주소가 다른 경우**: 서버는 이미지 URL로 직접 접속해서 내려받는데, 클라우드/라우터 환경에서는 브라우저 IP와 서버가 접근하는 실제 IP가 달라 이미지가 없는 서버로 접속해 실패합니다. 서버 로그를 찍을 수 있도록 `ibsheet7-2.1.32-image-logging.jar`로 로그를 찍으면 `filePath: http://…/upload2/image/image.png 이미지 다운로드 중 에러 발생!! java.net.ConnectException: Connection refused`처럼 나옵니다. CMD에서 `ping`을 해서 연결이 안 되면 그 IP의 이미지에 접근할 수 없다는 뜻입니다. **`down.setWebServerDomain("http://<이미지가 실제로 있는 서버 주소>")`를 `Down2Excel.jsp`에 설정**해서 해결했습니다. (개발 서버는 실제 IP, 운영 서버는 라우터 뒤에서 두 서버가 같은 IP를 바라보는 구성이라 그 IP로 지정)
- **SSL 인증서 문제**: `https://`로 접근해서 이미지를 가져와야 하는데 그 URL에 대한 접근 권한이 보안상 막혀 있어 발생했습니다. 서버에서 권한을 부여하거나 이미지 URL을 변경해야 하지만 적용이 어려워, 해당 화면은 **클라이언트 모듈**(7.0.0.41-20240321-13)을 적용해 해결했습니다. 비슷한 문의가 오면 클라이언트 모듈로 적용하도록 안내하면 됩니다.
- `FileNotFoundException: https://…:443/1`은 `DirectDown2Excel`로 받을 시트에 이미지 컬럼이 포함되어 있고 백엔드가 그 경로에서 이미지를 찾지 못해서 나타난 증상입니다. `DownCols`로 이미지 컬럼을 제외하도록 안내했습니다.
```
function makeSkipCol(sobj){
  var lc = sobj.LastCol();
  var colsArr = new Array();
  for(var i=0;i<=lc;i++){
    if(sobj.GetCellProperty(0, i, "Type") != "Image" ){ colsArr.push(i); }
  }
  return colsArr.join("|");
}
var skipCol = makeSkipCol(mySheet);
var param = {URL:"...", ExtendParam:"...", DownCols:skipCol};
mySheet.DirectDown2Excel(param);
```

**키워드**: setWebServerDomain, 이미지 다운로드 실패, Connection refused, ibsheet7 image-logging, SSLHandshakeException, PKIX, 클라이언트 모듈 대체, 이미지 컬럼 제외

### [ENV-10] POI 3.13의 JDK 한계, 다른 jar와의 충돌 (resin.jar, commons-io), 파일명 헤더

**질문**
- POI 3.13 버전을 적용할 수 있는 서버모듈을 요청한다.
- POI를 3.9에서 4.1.1로 바꿨더니 `NoSuchMethodError: CellStyle.setVerticalAlignment(short)`가 난다. (`ibsheet7-1.1.135`)
- JDK 1.7, POI 3.13, `ibsheet7-2.1.24` 환경에서 엑셀 다운로드 시 이상한 오류가 난다. (resin)
- `commons-io`(낮은 버전)와 서버모듈 2.0의 `batik-all-xml.jar`가 충돌한다. (`FileUtils.readFileToByteArray`에서 `NoSuchMethodError`)
- 로컬에서는 xlsx 로드가 되는데 운영에서는 안 된다. `ZipSecureFile$ThresholdInputStream cannot be cast to java.util.zip.ZipFile$ZipFileInputStream`. (POI 3.16, `ibsheet7-1.1.116.jar`와 `2.0.68.jar`가 같이 올라가 있음)
- 다운로드할 때 `response already committed`가 난다. (WebLogic, xlsx)
- 다운로드 파일명을 서버에서 바꾸고 싶다.
- `setLog(true)`와 `DirectLoadExcel`의 `ColumnMapping`을 설정하면 `NumberFormatException: For input string: ""`가 난다.
- 트리 시트를 받을 때 "…"는 지우고 엑셀 노드는 표시하고 싶다.
- 컬럼 숫자 `0`을 int에 넣는 부분에서 에러가 난다.

**답변**
- **POI 3.13은 JDK 9까지 사용할 수 있는 라이브러리**이고 JDK 10 이상을 쓰려면 POI 4 이상으로 올려야 합니다. (Apache Bugzilla 62187, 63270 참고)
- `setVerticalAlignment(short)` 오류는 서버모듈 jar가 POI 3용인데 POI만 올려서 생기며, 서버모듈을 POI 4용으로 같이 교체해야 합니다. ("POI 버전이 맞지 않아 생기는 오류 모음"([ENV-02]) 참고)
- **resin.jar 충돌**: `resin.jar`(레진 서버용 jar)가 있으면 오류가 납니다. POI가 Java가 가진 특정 클래스를 호출하는데 `resin.jar`에 같은 클래스가 있어 그쪽 메서드가 호출되는 것이어서 `resin.jar`를 빼기로 했습니다.
- **commons-io와 batik 충돌**: 새로 정리한 jar로 교체하니 해결되었습니다. 낮은 `commons-io`가 먼저 로드되면 같은 오류가 날 수 있으므로 `commons-io` 버전을 맞춥니다.
- **`ZipSecureFile` 캐스트 오류**: 1.x와 2.x jar가 같이 올라가 있던 환경이라 서버모듈 `ibsheet7-1.1.128.jar`와 `commons-codec-1.10`, `commons-collections4-4.1`, `commons-logging-1.2`, `curvesapi-1.04`, `xmlbeans-2.6.0` jar를 배포해 정리했습니다.
- `response already committed`(WebLogic, xlsx로 받을 때 파일이 깨짐)는 서버 로그를 보내 주기로 했으나 해결되었다고만 기록되어 있습니다.
- **파일명 변경**: `down.setFileHeader();` 아래에서 `response.setHeader("Content-Disposition", "attachment; filename=excel.xlsx");`로 파일명을 다시 설정하는 형태로 안내했습니다.
- `setLog(true)` + `ColumnMapping` 오류는 오류가 나지 않도록 패치한 jar를 배포했습니다.
- **트리 시트의 "…"** 를 지우면서 노드 표시는 유지하려면 `down.setTreeChar("")`만으로는 안 되어, 화면에서 `Down2Excel({ ExtendParam:"TreeData=Y"})`로 트리 데이터임을 표시하고 `Down2Excel.jsp`에서 `down.getExtendParam("TreeData")`로 확인해 `Y`이면 `down.saveToFile(경로)`로 서버에 저장한 뒤 POI로 열어 "…"가 포함된 셀의 문자열을 빈 값으로 치환해 `_modified` 파일로 다시 저장하고 원본을 지운 뒤 수정본을 내려받게 하는 샘플을 안내했습니다. (`ExtendParam`을 설정하지 않은 화면은 값이 빈값이므로 `downToBrowser()`로 일반 처리)

**키워드**: POI 3.13 JDK 9, JDK 10 이상 POI 4, resin.jar 충돌, commons-io, ZipSecureFile, response already committed, Content-Disposition, setLog ColumnMapping, 트리 다운로드 노드 표시

### [ENV-11] "그런 파일이나 디렉터리가 없습니다" — 임시 폴더(ib_tmp)가 사라질 때 (JEUS, xlsx 다운로드)

**질문**
- 엑셀 다운로드를 하면 콘솔에 `java.io.IOException: 그런 파일이나 디렉터리가 없습니다`가 난다. (JEUS, `ibsheet7-2.0.40.jar` / `1.1.79.jar` + POI 3.11)
- 엑셀 다운로드에 간헐적으로 문제가 있다. temp 파일이 없어져서 다운로드가 되지 않는다. (JEUS 8, `ibsheet7-2.0.54.jar`)
- 서버가 두 대인데 한쪽은 해결되고 다른 한쪽은 해결되지 않는다. (폴더 권한 777, tmp 경로 출력도 정상, xlsx로 다운로드)
- 지속적으로 엑셀 다운로드가 안 되고 WAS를 재기동하면 해결된다. (`SXSSFWorkbook.createAndRegisterSXSSFSheet`에서 `No such file or directory`)

**답변**
- **동작 원리**: `Down2Excel`을 호출하면 시트 정보를 긴 문자열로 만들어 서버로 보내고, 서버는 그 전문으로 엑셀 파일을 **임시 폴더(또는 지정 폴더)에 만든 뒤** 클라이언트로 보내고 임시 폴더에 만든 파일은 삭제합니다. 기본 temp 경로는 Java에 설정된 temp 폴더(`System.getProperty("java.io.tmpdir")`) 밑에 `ib_tmp` 폴더를 만들고 그 안에 파일을 씁니다. `ib_tmp` 폴더가 생성되지 않았다면 폴더를 만들고 쓰는데 이때 쓰기 권한이 제한되면 오류가 납니다.
- **확인·조치 순서**
  1. 서버 temp 폴더에 쓰기 권한이 있는지 확인합니다. WAS가 여러 대라면 특정 WAS의 임시 폴더 쓰기 권한이 막혀 있는지 확인합니다. `java.io.tmpdir` 위치를 확인해 해당 디렉터리 권한을 777로 변경합니다.
  2. xlsx로 받을 때 임시 폴더에 엑셀 파일을 만들지 않는 옵션이 있습니다. 매뉴얼에는 안내되지 않은 방식이며 권장하지 않지만 `Down2Excel.jsp` 옵션 설정 부분에 `down.setXlsxTempFolderMode(false);`를 적용합니다. ("POI 3.8 이하나 SXSSF 임시 파일 때문에 생기는 문제"([PRF-09]) 참고)
  3. temp 폴더가 JEUS 등에서 지워지는 경우에는 **폴더가 없으면 다시 만드는 로직이 들어간 jar/POI**를 적용합니다. (JEUS 8 사례는 `POI3.13` 폴더의 jar를 배포했습니다.) POI 3.11처럼 낮은 POI에는 패치된 POI가 나갈 수 없어, WAS 엔지니어에게 temp가 왜 지워지는지와 안 지우는 방법, 지워져도 다시 만들 수 있는지 문의하라고 안내했습니다. ("엑셀 다운로드에서 OutOfMemoryError(힙 부족)가 난다"([PRF-01])의 임시 폴더 소실 항목 참고)
- 서버 두 대 중 한쪽만 해결되지 않은 사례는 확인 후 연락하기로 하고 종료되었고 원인은 기록에 없습니다.

- **`poifiles` 폴더**: 서버모듈은 xlsx(특히 비밀번호 다운로드) 때 `System.getProperty("java.io.tmpdir")/poifiles`에 임시 파일을 만들고, 작업이 끝나면 삭제합니다. 이 폴더는 **원래 만들어 두는 폴더가 아니며** 작업 중 잠깐 생겼다가 사라집니다. OS 차원의 tmp 정리(일정 주기 자동 삭제)나 다중 WAS 환경에서 아직 폴더가 만들어지지 않은 인스턴스로 요청이 분배되면 `디렉터리를 찾을 수 없다`가 발생합니다. 이를 해소하기 위해 **`poifiles`가 없으면 자동으로 생성하는 로직을 추가한 서버모듈 jar**를 배포했고(2024-03, 2024-05의 POI 3.13 폴더, 2026-04), 폴더를 만들지 말지에 대한 옵션도 추가되었습니다. 임시 파일 경로를 NAS로 바꿨더니 `tmp` 파일이 0KB로 생성되고 한 번 실패하면 이후 모든 요청이 실패하는 사례(WAS 재시작 시 정상화)도 폴더가 없으면 생성하는 jar로 안내했습니다. POI가 `poifiles`를 지우는 원인은 정확히 파악되지 않았습니다. 멀티 스레드에서 `java.io.IOException` 문제가 생긴다는 기록은 있습니다.

**키워드**: 그런 파일이나 디렉터리가 없습니다, ib_tmp, java.io.tmpdir, JEUS temp 삭제, setXlsxTempFolderMode, 임시 폴더 재생성

### [ENV-12] Spring Boot·프레임워크 환경에서 DirectDown2Excel을 쓸 때 (MultipartHttpServletRequest, FP 포워딩)

**질문**
- Spring Boot에서 `DirectDown2Excel`을 multipart로 전송하면 `MultipartHttpServletRequest`로 cast되어 `getInputStream`이 비어 `IBSheetDown.setData`에서 `NullPointerException`이 난다. cast되어도 쓸 수 있는 방안, 또는 multipart가 아닌 다른 방식은? (`Multipart:0` POST는 parameter size 제한 때문에 추천하지 않는다고 들었음)
- `Down.setService()`의 `setData()` 구간에서 오류가 난다. (`DirectDown2Excel.jsp`에서 Request는 나오는데 Response에서 오류)
- jar 교체 이후 `DirectDown2Excel`이 안 된다. (컨트롤러가 `ModelAndView("forward…")`를 반환하는 구조)
- ActiveX에서 쓰던 key mapping 버전을 받아 적용했더니 엑셀 다운로드 시 `NumberFormatException`이 난다. (서버모듈 1.1.76, `down2excel.jsp`를 서블릿으로 바꿔 쓰고 있어 2.x로 변경이 어려움)
- 패치 파일을 적용한 뒤 `NumberFormatException: For input string: "2"` / `"f"`가 난다.
- Spring Boot로 엑셀 업로드/다운로드를 하는데 업로드 시 한글이 깨진다. `pageEncoding`을 빼면 업로드 한글은 깨지고, 넣으면 화면 한글이 깨진다.
- 스프링 부트로 전환하면서 엑셀 업로드·템플릿 다운로드·PDF 기능이 적용되지 않는다.

**답변**
- **multipart cast 문제**: 안내한 처리 방식을 쓰지 않고 사이트가 **멀티파트 데이터를 직접 받아 `data`를 뽑은 뒤 `setData`** 하는 방식으로 해결했다고 기록되어 있습니다. (`request.getParameter("Data")`로 받은 값을 `setService` 전에 `setData`로 넣는 방식은 "Jakarta·Spring Boot 3·Gradle 환경에서 서버모듈 jar를 쓸 때"([ENV-07]) 참고)
- **FP 포워딩**: `DirectDown2Excel`을 구현할 때 FP 페이지를 서블릿으로 만들어 `SHEETDATA`를 만들어 넘기는 구간이 있는데, VO를 return해서 `DirectDown2Excel.jsp`로 넘기고 있었습니다. 가이드대로라면 `RequestDispatcher`로 request와 response를 forward해야 하는데 그 구간이 없었고, VO만 return하면 Response 객체가 넘어가지 않아 세션이나 쿠키가 공유되지 않는 것으로 보였습니다. `RequestDispatcher`를 선언해서 처리하라고 안내했습니다.
- **jar 교체 후 DirectDown2Excel 안 됨**: jar 문제가 아니라 `DirectDown2Excel.jsp`에서 이전에 `String data = request.getParameter("Data"); ibExcel.setData(data);`로 request 데이터를 설정하던 구문이 JSP가 바뀌면서 누락된 것으로 보았습니다. `down.setService` 호출 전에 `request.getParameter("Data")`를 `down.setData(data)`로 넣으라고 안내했습니다. 컨트롤러에서는 `HttpServletRequest`로 받으면 multipart/form-data를 `request.getParameter("Data")`로 받을 수 있습니다.
- **`NumberFormatException`**: 제품(`ibsheet.js`) 7.0.13.208-20221007-1248 버전에서 전문이 달라져 서버모듈이 맞지 않아 생기는 현상이며 **서버모듈 1.1.128**을 배포해 해결했습니다.
- **인코딩**: 화면단 한글은 meta 태그의 Encoding을 맞추는 것이고 `pageEncoding`은 JSP의 인코딩을 맞추는 것이어서 둘 다 필요하다고 안내했습니다. 해당 페이지에 meta 인코딩을 넣어 테스트해 보라고 했습니다.
- 스프링 부트 적용 가이드는 별도 안내로 처리되었고 이후 문의가 없어 완료되었습니다.

**키워드**: Spring Boot, MultipartHttpServletRequest, 멀티파트 cast, RequestDispatcher forward, NumberFormatException, ibsheet7-1.1.128, pageEncoding, meta charset

### [ENV-13] JDK 11·17 지원 시점별 배포 이력 요약 (jakarta 2.1.18, 연말정산 sp.jar 등)

**질문**
- JAVA 9 이상에서 컴파일 오류가 나서 `javax` → `jakarta`로 수정·재컴파일된 버전을 요청한다. (`ibsheet.js` 7.0.13.110 사용)
- Java 11 환경에서 보유한 `ibsheet 7` 최종 버전으로 작동 시 오류가 난다. Java 11 이상에서 작동 가능한 IBSheet 8 제품과 POI 4.1.2를 요청한다.
- 서버모듈 2.1.2에서 Java 11 지원이 가능한가? (POI 라이브러리 이슈로 엑셀 다운로드가 정상적이지 않음)
- 연말정산 업로드가 새 서버에서만 되지 않는다. (JEUS 7)
- 서버모듈 2.1.10 jar에서 `The method isEmpty() is undefined for the type String` 오류가 난다.
- 한 화면에 시트 3개를 하나의 엑셀 파일로(`SheetName` 1/2/3) 다운로드하고 싶다. / `Down2ExcelBuffer`로 여러 엑셀 파일을 다운로드하면 `NullPointerException: IBSheetData.isAllTypeToText()`가 난다.

**답변**
- **Java 11 (2023-02)**: JDK 11에서는 POI 3.13이 되지 않을 가능성이 있어 POI를 바꾸고 관련 lib를 함께 넣어야 합니다. 이에 **POI 4.1.2**를 배포했고 `ibsheet7-2.1.2`는 POI 3.13과 4.1.2를 모두 지원합니다.
- **Java 17 / Jakarta (2024-02~03)**: `jakarta`로 컴파일한 버전과 `ibsheet.js` 7.0.13.244-20240229-1548을 같이 배포했고(`ibsheet7-2.1.18-jakarta.jar`), 서버모듈(`ibsheet7-2.1.18.jar`), 클라이언트 모듈(7.0.0.40-20231013-10), 개발 문서도 함께 전달했습니다. JSP 내용이 기존과 다르므로 모두 교체하고 엑셀 로드 쪽에 `LoadExcelCallbackInterface` 부분을 삽입합니다. `ibsheet.js`도 함께 올려야 하고 "IBSheet7 버전 업그레이드 주의사항[서버모듈 2.0]" 문서를 참고합니다.
- **연말정산 서버측 모듈**(`ibsheet7-1.1.11-sp.jar`)도 Java 17을 지원하지 못하므로, 연말정산 쪽도 `ibsheet.js`를 최신화하고 서버측 처리를 배포한 jar를 통한 다운로드로 바꾸도록 소스를 수정해야 합니다.
- **JEUS 7에서 가끔 보고되는 오류**(`getInputStream` 읽기 중 `IndexOutOfBoundsException`)는 패치된 jar(`ibsheet7-1.1.11-sp.jar`를 제거하고 첨부 jar로 교체)를 적용합니다.
- `isEmpty()` 오류는 **컴파일을 잘못한 jar**였습니다. `Down2ExcelBuffer`로 여러 시트/파일을 받을 때 `isAllTypeToText()` NPE는 `ibsheet.js` 7.0.13.222-20230629-1421과 서버모듈 `ibsheet7-2.1.9.jar` 배포로 해결했습니다. (JDK 11로 올린 사이트에서 `Down2ExcelBuffer` 엑셀이 깨져 열리지 않던 사례도 제품 적용 후 정상)

**키워드**: ibsheet7-2.1.18-jakarta, JDK 11 지원, POI 4.1.2 2.1.2, 연말정산 sp.jar, Down2ExcelBuffer NPE, ibsheet7-2.1.9

### [ENV-14] ibsheet.com의 공개 js를 가져다 쓰는 경우, 라이브러리 목록 불일치, POI 5를 이미 쓰는 환경

**질문**
- `ibsheet.js`와 `ibsheetinfo.js`를 ibsheet.com에서 import해 쓰고 있는데 엑셀 다운로드가 안 된다.
- 다른 모듈이 POI 5.x를 쓰고 JDK 11이라 POI를 제거하기도 버전을 낮추기도 어렵다. 클라이언트 모듈에서는 `DownCols`가 안 되어 서버모듈로 안내받았다. 폰트는 Arial, 크기는 10pt로 받고 싶고 `DownCols`도 쓰고 싶다.
- 서버모듈 2.0.85 환경에서 POI 4.1.2와 POI 3.14 jar가 섞여 있는 로그가 나온다. (로컬과 운영 라이브러리 환경이 다름)
- 한 응답에서 `getOutputStream()이 이미 호출되었습니다`가 난다. (`Down2Excel.jsp`)
- 배포한 jar의 `log4j`에 취약점이 있는가?

**답변**
- **ibsheet.com의 js를 가져다 쓰는 경우**: ibsheet.com 서버의 이상에 따라 시스템 사용이 제한될 수 있고, 엑셀 다운로드/업로드 같은 문서연동 모듈은 그 서버의 URL로 포팅되지 않으므로 **반드시 동일 서버에 제품을 포팅**해야 합니다. 동작 원리는 `ibsheet.js`(엔진)가 호출되는 시점에 ajax로 `ibsheet.cfg`, `ibmsg`, `Main` 폴더의 `ibsheet.css`를 호출하는 것이고, `ibsheet.cfg`에는 엑셀 다운로드/업로드 경로 설정이 있어 개발/운영 서버의 경로로 지정해야 합니다. 그렇지 않으면 CORS 오류가 납니다. 이 파일들은 파일 호출이 아니라 변수로 설정해 처리할 수도 있고 `ibsheetinfo.js`의 `createIBSheet`에서 바인딩합니다. ("ibsheet.cfg·ibmsg 로딩 실패"([ENV-15]) 참고) 개발자 가이드 3장과 4장 앞부분에 설명이 있습니다.
- **POI를 쓸 수 없는 환경**: 클라이언트 모듈(`ibexcel.js`)을 쓰면 `Down2Excel_Url` 경로가 아니라 브라우저 내장 객체로 xlsx를 받습니다. 서버모듈은 기본적으로 POI(기준 3.13)로 다운로드하지만, POI 버전을 맞추기 어렵거나 POI를 쓸 수 없는 경우를 위해 **비공개로 SAXParser와 jxl로 처리하는 모듈이 내장**되어 있습니다. `Down2Excel.jsp`와 `LoadExcel.jsp`에 각각 `setUsePOI(false)`를 설정합니다. (설정 코드는 "서버모듈 1.x와 2.x의 메모리 동작 차이, 그리고 한계"([PRF-06]) 참고, JSP를 java 파일로 만들어 `ibsheet.cfg`의 URL에 서블릿 이름을 설정할 수도 있음) 폰트와 폰트 크기는 `Down2Excel.jsp`의 사용자 환경 설정 #5, #6의 주석을 풀어 `down.setFontName("Arial");`, `down.setFontSize(10);`로 설정하고(헤더 폰트도 함께 설정됨), `DownCols`는 서버모듈에서 정상 동작하므로 `Down2Excel()` 호출 시 인자로 추가합니다. (예: `mySheet.Down2Excel({DownCols:"1|2|4|5|6"})`)
- **라이브러리 목록 불일치**: 로컬과 운영의 라이브러리 환경이 달라서로 보고, 제품 배포 시 서버모듈 쪽에 제공된 jar로 맞추라고 했습니다. 서버모듈 2.0.85의 종속 라이브러리는 `batik-all-xml.jar`, `commons-codec-1.10.jar`, `commons-logging-1.1.3.jar`, `log4j-1.2.13.jar`, `poi-3.13-all.jar`입니다. (서버모듈 2.0은 `log4j-1.2.13.jar`를 포함해 배포되었으나 1.0은 `log4j`를 쓰지 않습니다. 해당 jar는 삭제해도 되며 사이트가 `log4j`로 처리하는 부분이 있는지만 확인합니다.)
- `getOutputStream()이 이미 호출되었습니다`는 JSP 내용을 `1.1.76.jar`용 내용으로 교체하자 해결되었다고 기록되어 있어 원인은 불명입니다.

**키워드**: ibsheet.com js, CORS, ibsheet.cfg 경로, 변수 처리, setUsePOI(false), SAXParser, POI 5 충돌, log4j, 서버모듈 2.0.85 lib

### [ENV-15] Spring 환경에서 엑셀 다운로드·업로드가 NullPointerException으로 실패한다 (MultipartResolver)

**질문**
- 엑셀 다운로드를 JSP로 처리하다 서블릿(스프링)으로 뺐더니 엑셀 다운로드·업로드 때 `NullPointerException`이 난다.
- `Down2Excel`이 안 되고 서버에서 `getData()`를 찍으면 `nodata`가 나오며 exception으로 떨어진다. (Spring Boot)
- `MultipartResolver`까지 다 설정했는데 `LoadExcel`이 안 되고 에러도 안 찍힌다. (Spring Boot)
- Spring Boot라 JSP를 바로 호출할 수 없다. 프레임워크 설정(filter)이 따로 있는가?
- 멀티파트를 빼 버렸더니 엑셀 파일이 제대로 출력된다. 나중에 업로드할 때 멀티파트가 없어도 시트를 사용하는 데 문제는 없는가?
- `mySheet.Down2Excel({Multipart:0})`로 바꾸니 `SaveNames does not exists` 오류가 나고, 파일명을 넣어도 같다.
- 웹로직 버전 업그레이드 이후 `Down2Excel` 때 `java.io.IOException: Stream closed`가 난다.
- `MultipartFilter`를 적용하니 `Down2Excel`에서 에러가 난다. / `MultipartException: could not parse multipart servlet request … there is no @multipartConfig or multipart-config in deployment descriptors`가 난다.
- 패치된 제품을 받았는데 `java.io.IOException: Stream closed`가 난다. (`DirectDown2Excel.jsp`)
- 한 사이트가 Down2Excel을 `Down2Excel.jsp`로 바꿔 쓰는데 엑셀이 아닌 `down2excel.jsp` 파일 내용이 그대로 다운로드된다.

**답변**
- **원인**: 엑셀 다운로드는 기본적으로 **multipart 형식**으로 데이터를 보냅니다. 시트의 데이터가 많을 때 일반 POST로 보내면 서버가 받지 못하는 경우를 막기 위한 것입니다. 그런데 Spring 프레임워크에서는 `MultipartResolver` bean이 있으면(또는 기타 방법으로 멀티파트 리졸버가 동작하면) 멀티파트 데이터를 프레임워크가 모두 가져가서 서버모듈이 파라미터를 받지 못해 `NullPointerException`이 납니다. `Stream closed`나 `getData()` 오류도 같은 원인입니다.
- **해결 방법 1 — 멀티파트 리졸버를 우회**: `context-common.xml`(또는 `dispatcher-servlet.xml`)에 IBSheet용 리졸버를 등록하고, 아래 클래스를 추가합니다. IBSheet에서 온 요청(`SheetWork` 파라미터가 있거나 `AjaxComponent: IBUpload` 헤더가 있는 요청)은 멀티파트가 아닌 것처럼 `false`를 돌려주어 Spring 리졸버가 처리하지 못하게 합니다.
```
<!-- custom for IBUpload multi file resolver -->
<bean id="ibupload.MultiCommonsMultipartResolver" class="egovframework.ib.util.IBMultipartResolver">
  <property name="maxUploadSize" value="100000000" />
  <property name="maxInMemorySize" value="100000000" />
</bean>
```
```
public class IBMultipartResolver extends CommonsMultipartResolver {
  public boolean isMultipart(HttpServletRequest request) {
    //ibsheet를 통한 호출, 다운로드나 업로드 시 SheetWork 라는 파라미터를 보냄
    String sheetwork = request.getParameter("SheetWork");
    if(sheetwork != null) { return false; }
    //ibupload를 통한 호출
    String Ajax = request.getHeader("AjaxComponent");
    if("IBUpload".equals(Ajax) ){ return false; }
    return (request != null && ServletFileUpload.isMultipartContent(request));
  }
}
```
- **해결 방법 2 — 다운로드를 POST로**: `mySheet.Down2Excel({Multipart:0});`로 multipart가 아닌 POST로 보냅니다. 엑셀 **업로드는 파일을 서버로 보내야 하므로 POST 방식으로 바꿀 수 없습니다.** POST 방식은 서버에 따라 `MaxPostSize`와 `MaxParameterCount` 제한이 있습니다. (`Multipart:0`을 쓴 뒤 `SaveNames does not exists`가 나온 사례는 전문의 `<` `>`가 서버 필터에서 변형된 경우로, 시트가 보내는 전문이 xml과 유사한 구조(`<0_IBCC></0_IBCC>…<SaveNames>…`)여서 필터에 걸리지 않게 해야 합니다. 이 경우 `MarkupTagDelimiter`를 쓰도록 안내했습니다.)
- **Spring Boot**는 자동으로 멀티파트 리졸버가 설정되므로 위 방법 1은 필요하지 않습니다. 서블릿으로 변환할 때 **생성자 호출 이후에 추가해야 할 내용**이 있고, 스프링이 던져 준 데이터를 잘 받아 시트 로직 쪽에 넘기는 부분만 작성하면 됩니다. 샘플 소스에 `/* 매우 중요 */` 주석이 달린 부분이 있어야 하며, **서버모듈 2.0.77.jar 이후**부터 동작합니다. 스프링 부트용 서블릿 샘플은 제품 공유 폴더(`product/서버모듈/spring servlet`)에 있습니다.
- 멀티파트를 빼서 엑셀이 출력되는 사례는 위 설명대로 프레임워크가 멀티파트를 가져가지 못하게 우회하는 처리를 적용하라고 다시 안내했습니다. (이후 업로드에도 같은 방식이 필요)
- `DirectDown2Excel.jsp`에서 데이터를 `String data = ibExcel.getData();`가 아니라 `String data = (String)request.getAttribute("DATA");`로 받던 사이트는 새 JSP에도 동일하게 적용하라고 안내했습니다. (Stream closed)
- 프레임워크 설정으로 JSP가 실행되지 않고 내용이 그대로 표시되는 사례는 JSP를 `WEB-INF` 쪽으로 옮겨 보자고 했으나 사이트가 `web.xml` 설정을 바꿔 처리했습니다.
- WEB-INF 이동은 이 사이트에서만 필요한 조치였고 일반 안내는 아닙니다.
- 엑셀 업로드 때 `ExcelAction.do`처럼 제3자 업체가 제공한 서블릿을 호출하는 경우는 해당 업체에 재문의하도록 안내하고 원격을 종료했습니다.

**키워드**: MultipartResolver, IBMultipartResolver, SheetWork, Multipart 0, Spring Boot 엑셀, NullPointerException Spring, Stream closed, SaveNames does not exists, MarkupTagDelimiter

### [ENV-16] Spring Security·보안 정책 때문에 다운로드·업로드가 막힐 때 (X-Frame-Options, 요청 자체가 보안 이슈)

**질문**
- 엑셀 업로드 시 `Refused to display '…LoadExcel.jsp?SheetWork=LoadExcel' in a frame because it set 'X-Frame-Options' to 'deny'`가 난다. Spring `context-security.xml`에서 `frame-options disabled`로 해결되지만 다른 방법이 없는가?
- 엑셀 업로드가 안 된다.
- 보안팀에서 엑셀 다운로드 때 호출되는 `Down2Excel()`이 보안에 문제가 있다고 빼라고 했다. (구체적인 점검 문서는 없음)
- 접속하는 PC별로 다운로드가 되는 PC와 안 되는 PC가 있다. (운영 서버 2대, JBoss)

**답변**
- **X-Frame-Options**: Spring Security를 적용하면 `X-Frame-Options`가 http header에 추가되어 iframe으로 동작하는 기능이 정상 동작하지 않습니다. IBSheet의 엑셀 다운로드/업로드는 내부적으로 **iframe을 만들어 그 iframe으로 통신**합니다. 제품에서 iframe 없이 통신하는 기능은 없으므로 다음과 같이 설정해서 해결합니다.
```
<headers>
  <frame-options disabled="true"></frame-options>
</headers>
```
- **보안팀이 서버 호출 자체를 문제 삼는 경우**: 서버모듈은 `Down2Excel()` 호출 시 시트 구성 정보와 조회된 데이터가 request에 실려 서버로 전송되므로(발생하는 request 자체가 문제라면 서버모듈을 쓸 수 없습니다) **클라이언트 모듈**을 써야 합니다. 클라이언트 모듈은 HTML5 방식으로 브라우저에서 엑셀을 생성하며 IE10 이상(IE 계열은 10 이상, Edge, Chrome, Safari 등)에서만 가능하고 `ibexcel.js`를 포함해야 하며, `ibsheet.cfg`에 `ExportMode=2`(개별 시트의 cfg에 설정하면 그 시트만)를 설정합니다. **xlsx 형식만 지원**하고 xls는 지원하지 않습니다. 보안 취약점 점검 결과 문서가 있으면 보내 달라고 안내했습니다. (서버모듈은 오픈소스 라이브러리(POI)와 `ibsheet7-1.x.jar` 또는 `ibsheet7-2.x.jar`가 WAS에 올라가야 하며 jar는 서버모듈 버전에 따라 다릅니다)
- **PC별로 다운로드가 다른 경우**: 서버 2대의 lib가 다른 것은 아닌지(ear로 deploy해서 lib가 다를 수 없다고 함), 서버모듈인지 클라이언트 모듈인지(`Down2Excel.jsp`로 request가 가면 서버모듈), WAS 종류(JBoss; JEUS는 간혹 temp 폴더 쓰기 권한이 없어 안 되는 경우가 있음)를 확인했고, 정상적으로 안 될 때 서버 로그를 확인하기로 했습니다.

**키워드**: X-Frame-Options, Spring Security, frame-options disabled, iframe 통신, 클라이언트 모듈 전환, 보안 점검, ExportMode 2, ibexcel.js

### [ENV-17] "getOutputStream()이 이미 호출되었습니다" 같은 JSP 응답 오류

**질문**
- 운영 중인 시스템에서 가끔 `java.lang.IllegalStateException: 이 응답을 위해 getOutputStream()이 이미 호출되었습니다`가 난다. (`Down2Excel.jsp`)

**답변**
- `Down2Excel.jsp`를 호출하는 형태로 쓸 때 JSP의 응답 처리 방식에서 이런 오류가 생길 수 있어 **`Down2Excel.jsp`의 내용을 서블릿으로 작성**하라고 안내했습니다. (1) `ibsheet.cfg`에서 `Down2Excel_Url`을 서블릿 경로로 바꾸고(예: `"/DirectLoadExcel/jsp/Down2Excel.do"`) (2) `Down2Excel.jsp`의 내용을 서블릿으로 그대로 복사해 만들되 `out.clear(); out = pageContext.pushBody();` 부분은 주석 처리합니다.
- 다른 사례에서는 JSP의 내용을 `1.1.76.jar`용 내용으로 교체했더니 해결되었습니다. ("업로드·다운로드가 동작하지 않을 때 확인할 설정과 코드"([UPL-10]) 참고)

**키워드**: getOutputStream already called, IllegalStateException, Down2Excel 서블릿 전환, out.clear pushBody 주석

### [ENV-18] DirectDown2Excel에 데이터가 비어 있거나 변환 오류가 날 때 (SaveName, 문자 인코딩, AutoSizeColumn)

**질문**
- `DirectDown2Excel`로 다운로드했는데 엑셀은 정상적으로 열리는데 안에 데이터가 없다. (Spring 3.1.2)
- `DirectDown2Excel` 구현 중 `java.lang.Exception: List format invalidate`가 난다.
- `DirectDown2Excel` 시 `ParseException: Unparseable date`가 난다.
- 컬럼이 427개일 때 `Zip bomb detected! The file would exceed certain limits`가 난다.
- 서버 모듈 jsp로 서블릿을 만들었더니 `Down2Excel`에서 한글이 깨지고 `java.lang.Error: Probable fatal error: No fonts found`가 난다.
- 컬럼 80개, 2000건의 화면에서 숫자형 컬럼 화면은 받아지는데 텍스트형 컬럼 화면은 오류가 난다. 건수를 줄이면 받아진다.
- 엑셀 다운로드 시 `NullPointerException`이 난다. (`getExtendParam`, 파라미터가 null로 떨어짐)

**답변**
- **데이터가 비어 있을 때**: `DirectDown2Excel`은 (1) 화면에서 함수를 호출하면 (2) URL에 설정된 페이지가 데이터를 조회해 map으로 만들고 (3) 데이터와 함께 `DirectDown2Excel.jsp`로 포워딩하는 순서로 동작합니다. 2번에서 데이터를 만들 때 **시트의 `SaveName`과 쿼리에서 돌린 name 값이 같은지** 확인해야 합니다. 예를 들어 컬럼이 `SaveName:"project_number"`, `"project_name"`이면 `search_list= [{project_number=1111111111111, project_name=가나다}]`처럼 담겨 있어야 합니다. `List format invalidate`는 `HashMap`으로 데이터를 가져오는 과정의 매핑이 맞지 않았던 사례입니다.
- **인코딩과 `AutoSizeColumn`**: 한글이 깨지는 것은 폰트 문제가 아니라 `new String(request.getParameter("Data").getBytes("8859_1"),"utf-8")`로 데이터를 인코딩하는 부분 때문이었습니다. `String Data = request.getParameter("Data"); down.setData(Data);`로 써야 합니다. 서버의 `No fonts found` 에러는 **`AutoSizeColumn`** 때문이므로 제거하고 테스트합니다.
- **`Zip bomb detected!`**: 컬럼 427개 사례는 서버모듈 2.0.79를 배포해 해결했습니다. (POI의 압축 한도 검사에 걸린 사례)
- **숫자 컬럼은 되고 텍스트 컬럼은 오류가 나는 경우**: 정수형은 텍스트에 비해 데이터 크기가 작아 내려오는 것이므로 데이터 건수의 제한이라기보다 **서버의 POST 데이터 제한**부터 확인하도록 안내했습니다. (JEUS) ("서버 설정 한도와 서버 파일 쓰기·크기 제한"([DWN-08]) 참고)
- 파라미터가 null로 떨어져 NPE가 나는 경우도 WAS 쪽 파라미터 길이 제한을 풀어 보도록 안내했습니다. Tomcat은 `MaxPostSize`와 `MaxParameterCount`를 무제한으로 설정합니다.
- `Unparseable date` 사례는 답변이 기록에서 잘려 있어 결론이 없습니다.
- 서블릿으로 구성할 때 생기는 마크업 지정(`MarkupTagDelimiter`)은 "download excel data is not valid 등 데이터 전송 오류"([FMT-13]) 참고입니다.

**키워드**: DirectDown2Excel 데이터 없음, SaveName 일치, List format invalidate, Zip bomb detected, No fonts found, AutoSizeColumn, 8859_1 인코딩, MaxParameterCount

### [ENV-19] 제품 파일을 바꿨는데 반영되지 않는 경우 (브라우저 캐시, JSP 컴파일, JEUS 길이 불일치)

**질문**
- `ibsheet.js`만 넣으면 된다고 했는데 IE에서 캐시를 지우지 않으면 버전이 바뀌지 않는다. 서버모듈은 그대로 둬도 되는가?
- JSP를 수정해서 반영했는데 반영이 안 된다. (temp 경로를 Linux WAS 서버 경로로 변경)
- LoadExcel 시 JEUS에서 `IndexOutOfBoundsException`이 난다. (서버모듈 1.1.11)
- LoadText 시 일정 용량 이상을 업로드하면 개발 서버에서만 안 된다. 응답에 아무 내용도 안 찍힌다. (JEUS `ServletInputStreamImpl.read`의 `IndexOutOfBoundsException`)
- 서블릿으로 만들어 테스트했더니 `StringIndexOutOfBoundsException: String index out of range: -19`가 난다.
- 4.x POI를 쓰는 프레임워크에서 IBSheet 서버모듈이 정상 동작하는가? (SI 업체의 프레임워크가 자체적으로 POI 4.x를 사용)
- `ReportXml`이 동작하지 않는다. (Tomcat 9, 제품 7.2.*)

**답변**
- **브라우저 캐시**: 서버의 파일이 바뀌면 브라우저가 캐시를 사용하는 경우 한 번은 캐시를 날려야 합니다. 이후 파일 변경이 없다면 그대로 써도 됩니다. `ibsheet.js` 업그레이드에 서버모듈은 별도 패치할 필요가 없다고 안내한 사례입니다. (서버모듈과 맞춰야 하는 경우는 "JDK 17/21, Tomcat 10 이상(Jakarta)으로 올리면…"([UPG-01]) 참고)
- **JSP가 반영되지 않는 경우**: 반영이 왜 안 됐는지 확인하라고 안내했습니다. (JEUS에서 컴파일이 잘 안 되어 이전 JSP가 호출될 수 있음. "그런 파일이나 디렉터리가 없습니다"([ENV-11]) 참고)
- **JEUS의 `IndexOutOfBoundsException`**: JEUS에서 `request.getContentLength()`의 크기와 `request.getInputStream()`의 크기가 달라서 생기는 오류입니다. 일반 버전은 **1.1.38**, 연말정산은 **1.1.12-sp**에서 패치되었고 연말정산 시스템에는 `1.1.12-sp.jar`를 전달했습니다. LoadText 사례도 이후 보낸 테스트 버전으로 해결되었습니다. `StringIndexOutOfBoundsException`은 `ibsheet7-1.1.116.jar`를 배포했습니다.
- **POI 4.x(2021-02 기준)**: 해당 시점에는 4.x POI에서 서버모듈이 동작하는 것을 **지원하지 않는다**고 답했습니다. (이후 2023년부터 POI 4.1.2를 지원하는 서버모듈이 배포됨. "서버모듈의 POI 지원 범위 변화"([LIB-03]) 참고) `ReportXml`은 서버모듈 2.*에서 지원하지 않으며, 시트 상단 안내문구 용도라면 `TitleText`나 `UserMerge`를 쓰도록 안내했습니다.
- 업로드할 때 `StartRow` 같은 호출이나 서버 환경별 오류는 제품 배포로 이어지는 경우가 많아, 패치된 버전 이력은 "제품 버전 이력"([REL-01])에 모았습니다.

**키워드**: 브라우저 캐시, ibsheet.js 교체, JSP 컴파일, getContentLength 불일치, JEUS IndexOutOfBounds, ibsheet7-1.1.12-sp, POI 4.x 미지원 시점

### [ENV-20] JEUS 같은 WAS에서 임시 폴더 권한·계정 문제와 대기 이미지가 안 닫히는 문제

**질문**
- JEUS 계정에 따라 temp 폴더에 접근할 수 없어서 엑셀 다운로드가 안 된다. `ib_tmp`와 `poifiles` 폴더의 경로를 어떻게 잡아야 하는가?
- 점심 전까지 멀쩡하던 엑셀 다운이 갑자기 안 된다. `ib_tmp` 권한은 `drwxr-xr-x`이다. 다른 솔루션처럼 폴더 생성 시 권한을 다시 부여하는 로직이 있는가?
- Tomcat 구동 계정(A)과 파일 관리 계정(B)이 달라 `chmod 777` 후 B로 실행하는데 파일을 업데이트하면 엑셀 다운이 안 될 때가 있다. 어디의 권한을 처리해야 하는가?
- 로컬에서는 잘 되는데 Unix 서버에서만 접근 권한이 없다고 나온다.
- 운영에서는 다운로드 후 대기 이미지가 사라지는데 개발(JEUS)에서는 계속 남아 있다. (엑셀 업로드도 같은 현상)
- `DirectDown2Excel`의 로딩바를 `RowHandler`로 쿠키 처리하도록 했는데 다운로드가 끝나면 쿠키 값을 지워도 로딩바가 남는다.

**답변**
- **임시 폴더**: 엑셀 다운로드에서 쓰는 임시 폴더는 Java가 temp 폴더로 지정한 경로 밑에 생기며, 일반적으로 `ib_tmp`와 `poifiles` 두 폴더가 생성됩니다. `poifiles`는 `Down2Excel.jsp`의 `setXlsxTempFolderMode()`로 생성되지 않게 설정할 수 있고, 한 공공기관 사이트는 이 옵션을 설정해 쓴다고 안내했습니다. 따라서 그 사이트에서는 `ib_tmp`만 Java temp 폴더 밑에 생성됩니다. Tomcat이 갖고 있는 Java temp 폴더는 `ps -ef | grep java.io.tmpdir`로 확인할 수 있습니다.
- **JEUS 계정**: JEUS 사용자는 temp 폴더에 대한 쓰기·생성 권한이 있어야 합니다. 두 개의 JEUS 계정을 쓰면서 두 폴더의 소유자가 서로 다른 계정이었고 권한이 755라서 소유자 외에는 폴더 안에 생성·삭제를 할 수 없어 문제가 생긴 사례가 있었습니다. 두 계정의 group이 같아서 **775**로 바꾸자 해결되었습니다. 안 되면 `ib_tmp` 폴더를 삭제하고 쓸 JEUS 계정에 Java temp 폴더 접근 권한을 775로 준 뒤 다시 시도합니다. 파일 업데이트 후 안 되는 경우도 temp 폴더의 권한을 확인하는 것이 방향이며, 경로는 `System.getProperty("java.io.tmpdir")`로 확인합니다. 폴더 권한을 다시 부여하는 로직은 제품에 없다고 답했습니다.
- **대기 이미지가 안 닫히는 JEUS 사례**: 다운로드 과정은 쿠키와 관련됩니다. 시트는 서버를 호출하기 전에 `setInterval()`로 특정 쿠키 값을 계속 감시하고, 서버는 엑셀 파일을 생성해 다운로드하는 과정에서 그 쿠키에 정상 처리를 의미하는 값을 넣어 내려줍니다. 화면은 쿠키 값의 변화를 감지해 대기 이미지를 지웁니다. JEUS는 서버 설정에 따라 쿠키를 쓸 수도 못 쓸 수도 있어 이 현상이 생깁니다. **`ibsheet.cfg`에 `DownWaitImageVisible:0`(또는 false)** 을 설정하면 대기 이미지가 나타나지 않지만 `OnDownFinish` 이벤트도 발생하지 않습니다. (쿠키가 차단되는 환경에서는 `UseXhr:true`로 XHR 방식을 쓰면 `OnDownFinish`가 정상 동작합니다. "다운로드 완료 시점 감지"([DWN-15]) 참고)
- 엑셀 업로드에서 대기 이미지가 안 사라지는 경우는 `LoadExcel` 응답이 error로 오는 경우였고, `LoadExcel.jsp`의 사용자 환경 설정에서 Temp 폴더 위치를 고치고 `Version()` 로그를 찍어 lib가 정상 등록되었는지 확인하도록 안내했습니다.

**키워드**: ib_tmp, poifiles, 폴더 권한 775, JEUS 계정, 쿠키 대기 이미지, DownWaitImageVisible, java.io.tmpdir, ps -ef

### [ENV-21] 라이브러리 충돌·누락 사례 모음 (poi 중복, xmlbeans 버전, endorsed xml-apis, batik, WEB-INF 위치)

**질문**
- 제우스 쪽 `poi-3.2-FINAL` 위에 `poi-ooxml-3.16`을 올려서 `NoSuchFieldError: RAW_XML_FILE_HEADER`가 난다.
- WebLogic에서 xlsx 다운로드만 안 된다. (xmlbeans 2.3로 올려놨는데도 오류)
- JDK 1.5 / Tomcat 5.0.28 환경에서 xlsx 다운로드 때만 `NoSuchMethodError: org.w3c.dom.Node.setTextContent`가 난다.
- Img 타입 필드가 있으면 `NoClassDefFoundError: org/apache/batik/transcoder/TranscoderInput`이 난다.
- 서버모듈 lib를 추가했더니 프로젝트의 파일 업로드 쪽 lib와 충돌하는 것 같다. (`NoSuchMethodError: org.apache.commons.io.IOUtils.readFully`)
- `com.ibleaders.ibsheet.util.Version cannot be resolved to a type`이 나며 `Down2Excel()`이 진행되지 않는다. / JBoss에서 `IBSheetDown cannot be resolved to a type`으로 JSP 컴파일이 안 된다.
- 102개 컬럼을 `LoadExcel`했는데 25개 컬럼만 로드된다. (로컬 Tomcat은 되고 개발·운영 WebSphere는 안 됨)
- PDF 다운로드를 했는데 `XRRuntimeException: Can't load the XML resource … 요소 유형 "input"은(는) 짝이 맞는 종료 태그로 종료되어야 합니다`가 난다. (보내 준 jar를 확인하고 PDF 관련 다른 jar를 삭제함)
- `Down2Hml`이 `NoSuchFieldError: titleAlign`으로 실패한다. `Down2Hml`이 동작하는 기본 사양은?

**답변**
- **POI 충돌**: 서버 WAS의 `lib/application`에 `poi-3.2-FINAL`이 있어서 충돌한 것이므로 **WAS 쪽 POI를 삭제하고** 테스트하라고 안내했습니다. 같은 맥락으로 POI 3.16도 된다고 하니 그대로 쓰라고 한 사례(제품은 3.9 기준)가 있습니다.
- **xmlbeans 버전**: WebLogic에서 xlsx만 안 될 때는 **xmlbeans 2.3**이 필요한데 2.2.0이 올라가 있었습니다(WebLogic path로 lib가 잡혀 있었음). 버전을 고쳐서 바꾸라고 했습니다. 다른 사례에서는 서버모듈 2.0(또는 2.0.50)을 배포했습니다.
- **JDK 1.5/Tomcat 5.0.28 `setTextContent` 오류**: 동일 환경을 구축해 테스트하니 재현되었고 `common\endorsed\xml-apis.jar`가 원인이었습니다. 이 파일을 지우자 잘 되었습니다.
- **batik**: 서버모듈 2.0은 엑셀 다운로드 때 batik의 라이브러리를 일부 사용하므로 batik은 같이 들어 있어야 합니다. 이미지 처리는 `batik-all-xml.jar`가 하며, 로드되지 않은 상태에서 이미지 컬럼을 받으면 `NoClassDefFoundError`가 납니다. jar 안에서 batik을 쓰는 클래스는 `Down2Image.java`(차트), `ImageHelper.java`(차트·시트), `SVGHelper.java`(시트)이고, `ImageHelper`의 svg를 이미지로 만드는 메서드는 `Down2Hml` 사용 때, `SVGHelper`는 `Down2Excel`로 시트와 차트를 같이 다운로드할 때 쓰입니다.
- **`commons-io` 충돌**: 오래된 문의여서 종료되었고 위 batik 사용 정보만 전달했습니다. ("서버모듈의 POI 지원 범위 변화"([LIB-03]) 참고)
- **`Version cannot be resolved` / JSP 컴파일 오류**: 서버모듈을 import했지만 정상 구동이 안 되고 있었고, lib(jar)를 Tomcat 서버 경로의 폴더에 두고 import하고 있었습니다. lib 폴더를 프로젝트의 **`WEB-INF` 폴더 아래로 옮기고** 다시 import하고 재구동하자 해결되었습니다. 어떤 jar를 참조하는지는 `Down2Excel.jsp` 상단의 주석 `System.out.println(com.ibleaders.ibsheet7.util.Version.getVersion());`를 풀어 서버 콘솔의 라이브러리 정보를 확인합니다.
- **25개 컬럼만 로드**: `System.out.println(com.ibleaders.ibsheet.util.Version.getVersion());`로 라이브러리 버전을 확인하고 `setLog(true)`로 로그를 찍어 보도록 했습니다. POI 라이브러리가 올라오지 않은 것으로 보여 POI 3.13을 서버에 올려 보자고 했으나 이후 연락이 없었습니다.
- **PDF `input` 종료 태그 오류**: `lib` 폴더 안의 모든 파일을 삭제한 뒤 **IBSheet 관련 라이브러리만** 넣고 테스트하라고 안내했습니다(중복이 많아 현재 상태로는 테스트가 어려움).
- **`Down2Hml` 사양**: 클라이언트는 IBSheet, IBChart를 표현할 수 있는 웹 표준 기반의 모든 브라우저(IE6+, Chrome, Firefox, Safari 등)이고, 서버는 JDK 1.5 이상의 Java 환경에서 현재 IBSheet7 서버모듈의 라이브러리(POI 제외)가 필요합니다. `NoSuchFieldError: titleAlign`은 `ibsheet7-1.1.69.jar`(종속 jar 포함)와 `Down2Hml` 파일을 다시 전달했습니다.

**키워드**: NoSuchFieldError, poi 충돌, xmlbeans 2.3, endorsed xml-apis, batik-all-xml, IOUtils.readFully, Version cannot be resolved, WEB-INF/lib, Down2Hml, PDF XRRuntimeException

### [ENV-22] 인코딩 문제 (JSP pageEncoding, euc-kr 서버, 한글 파일명, ANSI 업로드 파일)

**질문**
- `Down2Excel.jsp`의 `utf-8`을 `UTF-8`로 바꿨더니 정상 동작한다. 페이지 인코딩의 대소문자 차이가 있는가? (`Page-encoding specified in XML prolog (UTF-8) is different from that specified in page directive (utf-8)`)
- 서버 인코딩이 euc-kr인데 `DirectLoadExcel.jsp`는 utf-8이어서 `NullPointerException`(`arrangeColumnOrder`)이 난다.
- 한글 파일명이 깨진다. (FF 브라우저에서만, IE는 정상, JEUS)
- 로컬에서는 업로드가 잘 되는데 서버에 올리면 안 된다. (JBoss, 업로드 파일의 인코딩이 ANSI)
- `Multipart:0`을 적용해 다운로드는 되는데 한글이 깨진다.

**답변**
- 대부분의 서버는 page encoding의 대소문자를 구분하지 않지만, **간혹 WebLogic, JBoss처럼 구분하는 서버가 있어** 그런 문제가 생길 수 있습니다. 이후 제품 소스는 대문자 `UTF-8`로 배포될 예정이라고 안내했습니다.
- 서버 인코딩이 euc-kr이고 JSP가 utf-8이라서 생긴 현상이었습니다. (JSP 인코딩과 서버 인코딩을 맞춥니다)
- FF에서만 한글 파일명이 깨지는 사례는 **`ksc5601`로 설정**하자 해결되었다고 기록되어 있습니다.
- JBoss에서 업로드 파일의 인코딩이 **ANSI**여서 파일 접근이 안 되었고, 원격으로 **UTF-8로 저장**하자 올라갔습니다. 같은 사이트에서 비슷한 문의가 이전에도 있었습니다.
- `Multipart:0`에서 한글이 깨지는 경우에는 화면 페이지, `Down2Excel.jsp` 페이지 인코딩, 텍스트 자체 인코딩이 모두 UTF-8이라면 서블릿에서 `Down2Excel.jsp`로 **포워딩하기 전에 데이터 인코딩을 확인**해야 합니다. JSP를 바로 호출할 때는 한글 깨짐이 없다고 하므로 JSP를 직접 호출해서 쓰는 쪽으로 안내하는 것이 낫다는 기록입니다.
- 서블릿 안에 넣어서 만들었더니 오류가 나고 `getData()`에 데이터가 없는 사례는 `Multipart:0`을 쓰라고 안내했습니다. ("Spring 환경에서 엑셀 다운로드·업로드가 NullPointerException으로 실패한다"([ENV-15]) 참고)

**키워드**: pageEncoding 대소문자, UTF-8 utf-8, euc-kr, ksc5601, 한글 파일명, ANSI 업로드 파일, 포워딩 인코딩

### [ENV-23] 서블릿으로 옮길 때의 응답 헤더와 SHEETDATA 전달 (LoadExcel text/html, IE9 이하, setAttribute)

**질문**
- 업로드를 `.do`로 호출하고 싶은데 파일이 안 넘어가는 것 같다. 무조건 JSP를 호출해야 하는가?
- `DirectLoadExcel`을 하는데 IE9에서 파일 다이얼로그 창은 안 뜨고 서블릿만 호출된다. (Chrome, IE11은 정상)
- `DirectDown2Excel()`에서 `download excel data is not valid`가 난다. `SHEETDATA`를 `setAttribute`로 넘긴다.
- 개발 서버를 JEUS에서 Resin으로 바꾼 이후 파일 다운로드 시 엑셀 파일이 0KB로 내려온다.
- Spring Boot 2로 설정했는데 `MultipartResolver` 설정 자체가 없다. (엑셀 다운로드 `NullPointerException`)

**답변**
- `ibsheet.cfg`의 `LoadExcel_Url`에 서블릿 경로를 넣고 그 서블릿에 `LoadExcel.jsp` 내용을 넣으면 됩니다. 중간에 파일 객체가 넘어오지 않는 것은 프레임워크의 간섭으로 보이며, WEB-INF 바깥 경로에 `LoadExcel.jsp`를 두고 그 경로로 설정해 보는 방법이 있습니다.
- **IE9 이하의 파일 다이얼로그**: IE9 이하 브라우저에서는 엑셀 업로드 시 보이는 파일 다이얼로그를 임의로 띄울 수 없어 편법을 씁니다. 먼저 서버 쪽을 호출하고 서버가 돌려주는 페이지의 iframe에서 파일 다이얼로그를 띄우는 스크립트를 넣는 방식이어서, **IE9 이하에서는 다이얼로그를 띄우려고 서버를 한 번 호출하고 사용자가 파일을 선택하면 실제 파싱을 위한 request가 한 번 더** 나갑니다. 그 사례는 `DirectLoadExcel.jsp`를 서블릿으로 만드는 과정에서 `Down2Excel`과 같은 응답 헤더를 넣는 실수를 했습니다. **`Down2Excel`의 응답은 `application/octet-stream`(엑셀 파일)이고 `LoadExcel`/`DirectLoadExcel`의 응답은 `text/html`이어야** 합니다.
- **`SHEETDATA`**: `setAttribute`로 넘기는데 `DirectDown2Excel`에서 `getAttribute`로 받지 못해 생기는 오류입니다. `DirectDown2Excel.jsp`를 서블릿으로 만들어 그 서블릿으로 포워딩하는 로직을 넣으면 데이터를 가져올 수 있다고 안내했습니다.
- **Resin**: 이전 페이지에서 `out.clear()`를 호출하고 있었기 때문입니다. Resin은 이것을 호출하면 파일 다운로드가 안 됩니다.
- **Spring Boot 2**: `MultipartResolver`를 설정해 주고 샘플로 보낸 서블릿을 넣어 보라고 안내했으나 JEUS 버전에서 Spring Boot를 설치할 수 없어 곧 다운그레이드할 예정이라고 하여 그때 다시 문의하기로 했습니다. 설정 예시는 "Spring 환경에서 …"([ENV-15])와 같고, 설정 방법 중에는 `egovframework`의 기존 리졸버와 IBSheet용 리졸버를 같이 선언하고 `alias`로 IBSheet용 리졸버를 `multipartResolver` 이름에 연결하는 방식(기존 리졸버 선언 아래에 IBSheet용 bean을 추가한 뒤 `<alias name="ibupload.MultiCommonsMultipartResolver" alias="multipartResolver"/>`로 지정)도 안내했습니다. Excel 관련 JSP를 WEB-INF 바깥쪽으로 빼서 쓰는 방법도 대안으로 안내했습니다.

**키워드**: 서블릿 전환, LoadExcel_Url, text/html, application/octet-stream, IE9 파일 다이얼로그, SHEETDATA setAttribute, Resin out.clear, multipartResolver alias

### [ENV-24] 보안 점검·모의해킹 지적 사항 대응 (XXE, 외부 참조, 수식 삽입, 오픈소스 취약점)

**질문**
- 웹 취약점 개선 요청이 왔다. 대상 `POST …/Down2Image.jsp`(`svg` 파라미터)에서 XXE(XML External Entity Injection) 유형이다.
- 모의해킹에서 대량송금 파일 업로드 시 조작이 가능하다는 지적이 나왔다. 엑셀 파일에 해킹 관련 코드를 넣고 업로드하면 그 코드가 뽑혀 나온다.
- 엑셀 업로드에서 "최대 열 수 설정값 초과" 오류가 난다. (특정 데이터를 올렸을 때)
- 엑셀 데이터가 `통합 문서 연결` 기능으로 작성된 경우 업로드에서 값을 읽지 못한다. 외부 문서 참조 여부를 체크하는 기능이 있는가?
- VLOOKUP을 사용해서 쓴 데이터도 특정 데이터가 업로드되지 않는다.
- 사용 중인 오픈소스(Log4j 1.2.16, Apache PDFBox 1.2.1, iText 2.1.7)에 취약점이 발견되었다. 시트에서 쓰는 라이브러리인가? 교체 후 어떤 기능을 확인해야 하는가?
- 서버모듈 jar도 보안 점검을 통과한 라이브러리로 업데이트해 달라.

**답변**
- **XXE**: 7.0.13.298, `ibsheet7-2.1.50.jar`(poi3, batik-1.17 포함)로 배포해 대응했습니다. 엑셀 업로드에서 XXE 같은 특정 데이터를 올렸을 때 열 수 초과 오류가 나는 것은 제품이 차단하는 동작이며 이슈는 종료되었습니다.
- **XXE 차단 메시지**: 기존에 "XXE Security violation detected"로 나오던 메시지를 "XXESecurityException"으로 바꿔 달라는 요청에 따라 수정한 `ibsheet7-2.1.47.jar`를 재배포했습니다.
- **통합 문서 연결·외부 참조·VLOOKUP**: `ibsheet7-2.1.41.jar`를 적용하면 해결되었습니다. 이 사례에서 `엑셀 업로드 시 외부 문서 참조 여부를 체크하는 기능`을 묻는 질문도 같은 버전으로 처리되었습니다. (한 질문의 답변 일부는 "무시 필요, 버전별 테스트 중"으로 기록되어 있어 상세 내용은 기록에 없음)
- **Log4j·PDFBox·iText**: 질문한 라이브러리는 IBSheet와 연관이 없다고 답했습니다. (서버모듈 1.0은 `log4j`를 쓰지 않고 2.0은 `log4j-1.2.13.jar`가 포함되어 배포되었음. "다운로드 때 서버 오류·권한·라이브러리 충돌"([DWN-07]), "ibsheet.com의 공개 js를 가져다 쓰는 경우, 라이브러리 목록 불일치, POI 5를 이미 쓰는 환경"([ENV-14]) 참고)
- **오픈소스 취약점 일반**: 서버모듈 jar는 POI 5.4로 업데이트한 버전이 배포되었습니다(2025-05). ("보안 점검(오픈소스 취약점)으로 라이브러리 버전을 올려야 할 때"([ENV-06]) 참고)
- 이외 보안과 관련해 엑셀 다운로드 때 `Formula Injection`에 해당하는 문자열은 다운로드할 수 없다는 메시지(`SYS_ExcelFormulaInjection`)가 추가되었습니다. ("ibsheet.js 업그레이드 후 메시지 키가 그대로 보인다"([ENV-26]) 참고)

**키워드**: XXE, XXESecurityException, 모의해킹, Down2Image svg, 통합 문서 연결, 외부 참조, Formula Injection, ibsheet7-2.1.41, ibsheet7-2.1.47, ibsheet7-2.1.50

### [ENV-25] `setData`에서 NullPointerException이 난다 — 제품·서버모듈 버전 불일치와 Data 파라미터 누락

**질문**
- 보내준 `ibsheet7-2.1.36.jar`와 공통 JSP를 적용했더니 엑셀 다운로드 시 `NullPointerException: Cannot invoke "String.split(String)" because "this.sheetData" is null`이 난다. (IBSheet7과 IBSheet8을 함께 사용)
- 가이드대로 `sheetData = request.getParameter("Data")`로 받은 값을 출력해 보면 정상인데 `down.setData(sheetData)` 시점에 `NullPointerException`이 난다.
- `DirectDown2Excel`의 `setService`에서 NullPointerException이 난다. (버전업그레이드 후 `Down2Excel`은 되는데 `DirectDown2Excel`은 안 됨)
- 로컬은 되는데 개발에서만 `setData`/`getData` 쪽 NullPointerException이 난다.

**답변**
- `export.jsp` 같은 다른 JSP를 거치면 **Multipart로 보낸 내용이 사라져서** 서버모듈이 Multipart 데이터를 처리할 수 없는 현상입니다. 이 사례는 JSP를 업데이트할 때 **`request.getParameter("Data");`로 시트에서 보낸 전문을 받은 다음 `setData`를 해 주는 부분을 누락**한 것이 원인이었습니다. 다음처럼 `setService` 전에 넣습니다.
```
String data = request.getParameter("Data");
down.setData(data);
down.setService(request, response);
```
  (IBSheet8은 정상 동작했지만 최신이 아니어서 최신으로 다시 배포하기로 했습니다.)
- `setData`가 지원되지 않는 낮은 버전의 jar를 쓰고 있어 같은 증상이 나는 경우도 있습니다. 가이드대로 값을 받아도 `setData` 시점에 null이 나던 사례는 jar 버전이 낮아서였고 `ibsheet7-2.0.88.jar`를 적용하고 그에 맞게 JSP를 수정하라고 안내했습니다. (확장자 `x`를 제거해서 사용)
- `DirectDown2Excel`만 안 되는 사례는 `request.getParameter("Data")`로 받은 값을 `down.setData(...)`로 설정하자 잘 되었습니다. 이 구문은 jar/JSP를 업그레이드한 뒤 누락되기 쉬우므로 "Spring 환경에서 엑셀 다운로드·업로드가 NullPointerException으로 실패한다"([ENV-15]), "Spring Boot·프레임워크 환경에서 DirectDown2Excel을 쓸 때"([ENV-12])도 함께 확인합니다.

**키워드**: setData NullPointerException, request.getParameter("Data"), sheetData is null, export.jsp, Multipart 사라짐, ibsheet7-2.0.88, DirectDown2Excel 누락 구문

### [ENV-26] ibsheet.js를 업그레이드한 뒤 화면에 메시지 키가 그대로 보인다 (ibsheetinfo.js 메시지 누락)

**질문**
- `ibsheet.js`를 업그레이드했는데 추가된 기능의 메시지 파일은 그대로여서 일부 화면에서 메시지 키가 그대로 노출된다. (예: 업로드 다이얼로그 헤더 드롭다운에 `SYS_DlgHeaderSelectText`)

**답변**
- `ibsheetinfo.js` 하단의 언어 메시지 정의 구간에 일부 메시지가 누락된 것이 원인입니다. 최신 버전에 대응해 추가해야 하는 메시지는 다음과 같습니다(한국어 기준). 다국어 설정을 쓰는 경우 각 언어별 메시지 파일에도 같은 키를 추가하고 번역해야 합니다.
  - `Lang > Alert` 구간: `"SYS_ExcelColInfoSaveError":"체크된 컬럼이 존재 하지 않습니다."`, `"SYS_ExcelFormulaInjection":"Formula Injection 에 해당하는 문자열은 다운로드 할 수 없습니다."`
  - `Lang > Text` 구간: `SYS_Min`(최소), `SYS_Max`(최대), `SYS_PivotFilter`(필터된 행 제외), `SYS_FilterOption`(필터 옵션), `SYS_FilterInfoMessageAxbil`(검색어와 연산자는 공백으로 구분한다는 필터 안내 문구), `SYS_CalendarInfoSel`(현재 선택됨), `SYS_CalendarCurrentY`(올해), `SYS_CalendarCurrentM`(이번 달), `SYS_CalendarCurrentD`(오늘 날짜)
  - `Lang > Format` 구간: `"SYS_DateFilterSeparator" : "|"`
- 메시지 키가 그대로 보이면 우선 `ibmsg`(또는 `ibsheetinfo.js`의 메시지 정의)가 `ibsheet.js` 버전에 맞는지 확인합니다. ("JDK 17/21, Tomcat 10 이상(Jakarta)으로 올리면 서버모듈이 동작하지 않는다"([UPG-01])에서도 `ibmsg` 교체를 안내)

**키워드**: SYS_DlgHeaderSelectText, ibmsg 누락, 메시지 키 노출, ibsheetinfo.js 메시지, SYS_ExcelFormulaInjection

### [ENV-27] 서버모듈 jar가 어떤 버전인지 확인하는 방법과, 업그레이드 후에도 옛 jar가 읽히는 경우

**질문**
- 사용 중인 jar(예: `ibsheet7-2.0.81.jar`)의 정확한 버전을 알고 싶다. 업그레이드에 필요한 필수 라이브러리를 알려 달라. (POI 3.8, xmlbeans 미사용)
- jar를 교체했는데도 여전히 엑셀 업로드 시 몇몇 컬럼이 로드되지 않는다.
- 엑셀 다운로드가 안 된다. 서버를 재기동하니 된다. (lib가 덜 올라갔던 듯함)

**답변**
- 파일명만으로는 정확한 버전을 알기 어려우므로 jar를 열어 **`META-INF/MANIFEST.MF`** 의 버전 정보를 확인합니다. 로그로는 `System.out.println(com.ibleaders.ibsheet.util.Version.getVersion());`(서버모듈 2.x) 또는 `com.ibleaders.ibsheet7.util.Version.getVersion()`(1.x)을 찍어 읽히는 jar를 확인합니다. ("서버모듈 버전과 필요한 라이브러리 확인 방법"([LIB-02]) 참고)
- 서버모듈 `ibsheet7-2.0.86.jar(사이트 전용 빌드)`, 제품 7.0.13.176 사이트에는 기존 POI 3.8(`poi-3.8-20120326.jar`, `poi-ooxml-3.8-…`, `poi-ooxml-schemas-3.8-…`)을 삭제하고 **`poi-3.13-20191017.jar`, `poi-ooxml-3.13-20191017.jar`, `poi-ooxml-schemas-3.13-20191017.jar`, `xmlbeans-2.3.0.jar`** 4개 파일을 적용하도록 안내했습니다. `xmlbeans`를 미사용이라고 해도 신규 POI 3.13 사용 시 필수이므로 함께 적용합니다.
- **`WEB-INF/lib`에 `ibsheet7`로 시작하는 jar가 여러 개 있으면 안 됩니다.** 컬럼이 특정 위치 이후로 안 올라오던 사례는 `Version.getVersion()` 로그에서 `ibsheet7-2.1.15.jar`가 읽히고 있었고, 그 jar를 지우고 다시 해 보라고 했을 때 정상 동작했습니다.
- 서버를 재기동하니 해결된 사례는 `lib`가 덜 올라간 것으로 보이며 원인은 기록에 없습니다.

**키워드**: MANIFEST.MF, Version.getVersion, jar 버전 확인, 중복 ibsheet7 jar, poi-3.13-20191017, xmlbeans-2.3.0

### [ENV-28] Log4j 보안 이슈가 IBSheet7 서버모듈에 영향을 주나

**질문**
- Log4j 취약점이 이슈인데 IBSheet7에 기본 탑재된 `log4j-1.2.13.jar`에 문제가 없는가? `jms appender`를 쓰는 부분이 있는가?
- IBSheet7 서버모듈에서 LOG4J 2.0 이상 버전을 사용하는가? 사용한다면 버전은?
- 한 사이트(`pom.xml`에서 `log4j-core` 검색)에서 개별 조치가 필요한가?

**답변**
- 서버모듈을 쓸 때 함께 배포되는 `log4j-1.2.13.jar`는 **극히 일부 구간에서만 로깅 처리**에 쓰이므로 이 jar가 없어도 제품 동작에 문제가 없습니다. `jms appender` 관련 구간은 없습니다.
- 버전별 사용 현황: **서버모듈 1.x(`ibsheet7-1.X.X`)는 log4j를 사용하지 않고**, 서버모듈 2.x(`ibsheet7-2.x.x`)만 사용합니다. 2.x에서는 POI 없이 xls 확장자 파일을 다운로드할 때만 쓰이며 필수 라이브러리가 아닙니다. (한 답변에는 버전이 "1.1.43"으로 표기되어 있으나 같은 시기 다른 답변에서는 `log4j-1.2.13.jar`로 안내되어 있어 표기가 일치하지 않습니다.)
- 2021-12-14자로 **log4j를 아예 참조하지 않는 제품이 릴리즈**되었고, 그 서버모듈로 업그레이드하더라도 기존 build path에 포함된 log4j jar는 삭제해야 합니다. 최신 버전은 메일로 전달했습니다.
- 서버모듈의 문서연동 기능을 Java 모듈로 쓰지 않는 시스템(VAN 시스템)은 문제가 되는 log4j와 연관이 없고, 구축 당시 서버모듈을 쓰기 위해 `pom.xml`에 `log4j-1.2.13.jar`를 설정해 두었다면 그 구간을 삭제하면 됩니다. 서버모듈 1.1.43/1.1.123 같은 1.x를 쓰는 사이트는 log4j와 무관하므로 서버에 있는 파일을 삭제하면 됩니다.

**키워드**: Log4j, log4j-1.2.13.jar, jms appender, Log4j 취약점, 서버모듈 1.x, 서버모듈 2.x, pom.xml

### [ENV-29] POI 버전과 비밀번호 다운로드·빌드 경로 문제 (3.10 요구, getMaxCellStyles, VerifyError)

**질문**
- 비밀번호 다운로드 때문에 POI를 3.10으로 모두 적용했는데도 `java.lang.NoSuchMethodError: org.apache.poi.ss.SpreadsheetVersion.getMaxCellStyles()I`가 난다.
- 비밀번호 다운로드가 되었다 안 되었다 한다. (`Can't open the specified file`) 개발 서버에서만 `Invalid to flush BodyContent`가 난다.
- `java.lang.VerifyError`가 난다. (서버모듈 1.1.83, POI 3.9)
- 서버모듈 1.0 대의 배포 jar 목록을 보내 달라.
- `LoadExcel.jsp`에서 `setUsePoi(true)`를 설정하면 업로드가 안 된다. (POI 3.16, xlsx)
- 자체 `excelutil.java`가 POI 3.16 기반인데 POI를 다운그레이드하면서 교체 방법을 모르겠다.
- 서버모듈 1.1.83을 쓰는데 JSP를 커스텀한 것 같다. 서버모듈을 다시 받고 싶다.
- `Down2Excel.jsp`의 비밀번호 구간에서 오류가 난다.
- `NoSuchMethodError: org.apache.poi.…log(I[Ljava/lang/Object;)V`가 로딩에서 난다.

**답변**
- **POI 버전은 `poi`, `poi-ooxml`, `poi-ooxml-schemas`를 모두 같은 버전(3.10)으로** 맞춰야 합니다. 일부만 3.10으로 하면 `getMaxCellStyles()`처럼 `NoSuchMethodError`가 납니다. 3.13이 올라가면 비밀번호 다운로드가 안 된다고 3.10으로 낮추려 했던 사이트에는 3.13을 쓰지 않는 이유를 물었고 바꿔도 안 될 것 같다고 답했습니다. (비밀번호 기능은 POI 3.10 이상이 필요: "엑셀 다운로드 파일에 열기 비밀번호를 설정하려면"([DRM-05]) 참고)
- **비밀번호는 xlsx에만** 적용됩니다. 특정 파일이 원복되면서 xls에 비밀번호를 걸다 보면 `Can't open the specified file` 같은 오류가 나며, `FileName`에 xlsx를 넘기도록 해서 해결한 사례가 있습니다. 비밀번호를 설정하면 내부적으로 `System.getProperty("java.io.tmp")`(java.io.tmpdir) 아래 `/poifiles` 경로에 임시 파일을 만드는데 그 경로 권한이 없으면 `Invalid to flush BodyContent`가 날 수 있습니다. (비밀번호 설정 다운로드 때만 그 경로에 씀. "임시 폴더(ib_tmp)가 사라질 때"([ENV-11]) 참고)
- 비밀번호 구간에서 `Down2Excel()`에 `WorkbookPassword`와 URL을 같이 붙여 내리면 문제가 될 수 있어 비밀번호를 제거하고 다운로드해 보도록 안내했고, 컴파일 때 build path에 poi가 들어 있지 않아서 JSP 컴파일 오류가 난 경우는 POI를 추가한 뒤 해결되었습니다. **비밀번호 기능은 POI 라이브러리가 반드시 필요**합니다.
- **`VerifyError`**는 컴파일한 버전과 런타임 버전이 다를 때 나오는 메시지여서 다시 컴파일해서 배포하라고 안내했습니다.
- **서버모듈 1.0 대 배포 jar 목록**(2021-12): `commons-codec-1.6.jar`, `dom4j-1.6.1.jar`, `flying-saucer-core-9.0.2.jar`, `flying-saucer-pdf-9.0.2.jar`, `ibsheet7-1.1.124.jar`, `itext-2.1.7.jar`, `json-simple-1.1.1.jar`, `poi-3.9-20121203.jar`(또는 `poi-3.10-FINAL-20140208.jar`), `poi-ooxml-3.9-20121203.jar`, `poi-ooxml-schemas-3.9-20121203.jar`, `xmlbeans-2.3.0.jar`
- **서버모듈 1점대는 POI 3.13까지만** 사용할 수 있고, 1.1.83과 그에 맞는 JSP를 보내 비교해 보라고 했습니다. `POI log` `NoSuchMethodError`는 POI 3.13으로 맞추자 해결되었습니다.
- `ReportXMLURL`을 쓰려고 서버모듈 1.0을 쓰는 경우 `dom4j-1.6.1.jar`, `flying-saucer-core-9.0.2.jar`, `flying-saucer-pdf-9.0.2.jar`, `itext-2.1.7.jar`, `json-simple-1.1.1.jar`를 함께 배포했고, `ReportXMLURL`의 XML에서 도움말과 다르게 `medium` 대신 `xlmedium`으로 써야 하는 부분이 있어(2021-12) 서버모듈 1.1.124를 배포했습니다.
- 자체 `excelutil.java`가 POI 3.16 기반인 경우는 IBSheet 쪽 코드가 아니므로 사이트가 POI 3.10에 맞춰 `excelutil.java`를 고치겠다고 했습니다.
- 서버모듈 1.0에는 `Down2Excel`에서 `true` 인자를 주면 `SXSSF` 방식으로 처리됩니다. (서버모듈 1.1.61에서 추가) 1.0 대에서 SXSSF가 없다는 이전 답변을 정정한 내용입니다. 이 정정으로 `DirectDown2Excel`과 데이터를 담는 방식의 차이만 있고 로직은 대체로 같다고 볼 수 있습니다. ("서버모듈 1.x와 2.x의 메모리 동작 차이, 그리고 한계"([PRF-06]) 참고)

**키워드**: POI 3.10, SpreadsheetVersion.getMaxCellStyles, 비밀번호 다운로드 POI, poifiles 권한, VerifyError, 서버모듈 1.0 jar 목록, xlmedium, build path poi

### [ENV-30] .NET 서버모듈(ASP.NET) 환경 사례 모음

**질문**
- .NET 3.5에서 개발하던 소스를 4.0으로 올렸더니 기존 엑셀 다운로드가 되지 않는다. 4.0 dll을 받아 적용했는데도 안 된다.
- `Down2Excel.aspx`에서 `SetFileType`이라는 이름이 현재 컨텍스트에 없다. (`CS0103`)
- 다운로드 15,000건을 `Down2Excel`로 받는데 "처리중입니다"만 뜨고 다운로드가 안 된다.
- `LoadExcel.aspx` 호출 시 `HttpRequestValidationException: 클라이언트(ColumnTag/Data=…)에서 잠재적 위험이 있는 Request.Form 값을 발견했습니다`가 난다. (`web.config`와 `LoadExcel.aspx`에 `ValidateRequest="false"`를 지정해도 같음)
- 엑셀 데이터는 3건인데 14건이 로드된다.
- IBSheet 엑셀 다운로드 관련 DLL(`IBSheet7-4.0.dll`, `Syncfusion…`)을 닷넷 3.5 버전으로 제공받을 수 있는가?
- `SetMergeCell`로 병합한 컬럼이 엑셀 다운로드에서는 풀려서 나온다.
- .NET 서버모듈의 `ColMerge`가 엑셀에 반영되지 않는다.

**답변**
- **.NET 3.5와 4.0**: 서버모듈 dll은 프레임워크 버전에 맞아야 합니다. 닷넷 4.0용 dll(`1.1.0.28`)과 lib, aspx 파일을 배포했고, 3.5 환경에는 3.5용 dll을 따로 배포했습니다. .NET 서버모듈은 Syncfusion을 사용하는데 성능이 그다지 좋지 않아, 15,000건처럼 건수가 많아 4.0으로도 해결되지 않으면 **클라이언트 모듈**을 쓰도록 안내하는 것이 좋다고 정리했습니다. 다운로드한 dll 이름의 `_`나 마지막 문자는 메일 정책 때문에 바뀌어 있으므로 확장자를 `.dll`로 되돌려 씁니다.
- **`SetFileType`이 없는 경우**: 사이트에 올라간 dll이 `1.1.0.1`로 `2.0.0.3`(닷넷 4.0)이 아니었던 사례입니다. dll 버전을 맞춰 테스트하도록 안내했습니다.
- **`HttpRequestValidationException`**: 엑셀 다운로드/로드 때 시트 정보는 XML과 유사한 구조(`<0_IBCC></0_IBCC>…`, `<` `>` 포함)로 전송되기 때문에 ASP.NET 요청 검증에 걸린다는 설명을 전달했습니다. 프레임워크 필터에서 `<`, `>`가 `&lt;`, `&gt;`로 바뀌거나 막히는 문제에는 다른 사례에서 `MarkupTagDelimiter`를 설정하라고 안내했습니다. ("download excel data is not valid 등 데이터 전송 오류"([FMT-13]) 참고) (이 질문의 답변 원문은 설명 부분만 기록되어 있고 구체적인 조치는 기록에 없음)
- **엑셀에 3건인데 14건 로드**: 엑셀에서 `Ctrl+End`를 누르면 14행까지 편집되어 있었습니다. Java 버전은 이를 처리하지만 **.NET 버전은 지원하지 않아** `OnLoadExcel`에서 빈 행을 지우거나 `OnLoadData`에서 빈 행을 제외하고 데이터를 다시 구성하는 방법밖에 없다고 답했습니다. (Java의 `SkipEmptyRow`는 "LoadExcel 옵션 사용 팁"([UPL-11]) 참고)
- **병합이 풀리는 문제**: `ColMerge:0` 선언 누락이 원인이었던 사례, .NET 4.0 기준 테스트에서는 병합이 정상 동작하는 사례, `OnSearchEnd`에서 `SetMergeCell`로 병합했는데 엑셀에서는 풀리다가 정상 동작이 확인된 사례가 있습니다. 문제가 재현되면 `har` 파일과 .NET 버전, 서버모듈 버전 또는 `IBSheet7-4.0.dll`을 함께 보내 달라고 안내했습니다.
- **.NET에서 지원하지 않는 속성 목록**은 "다운로드한 엑셀의 서식·색상·행 높이 옵션"([DWN-13])에 있고, .NET Down2Pdf 폰트는 "PDF 다운로드"([DWN-09])에 있습니다.
- .NET 서버모듈 버전 이력(2.0.0.3 4.0, 2.0.0.5 AutoSum Text, 2.0.0.6/2.0.0.7 FormatException·합계 콤마, 2.0.0.8 Down2Pdf 폰트, 1.1.0.28 닷넷 4.0, 1.1.0.29 서버 예외 시 대기 이미지)은 "제품 버전 이력"([REL-01])에 모았습니다.

**키워드**: .NET 서버모듈, ASP.NET, IBSheet7-4.0.dll, Syncfusion, HttpRequestValidationException, 닷넷 3.5 4.0, SetFileType 오류, ColMerge

## LIB · 라이브러리(POI 등) 구성

### [LIB-01] 서버모듈과 함께 넣어야 하는 라이브러리, POI는 한 버전만 남긴다

**질문**
- 서버모듈을 쓰려면 어떤 라이브러리가 필요한가? 우리 서버에 있는 `commons-logging.jar`를 지우고 배포한 `commons-logging-1.1.3.jar`를 넣었더니 시스템에 접속이 안 된다.
- 엑셀 다운로드 때 시트 이미지/PDF/보고서 XML에는 무슨 라이브러리가 필요한가?
- 이전에 로컬 `poi-3.13-all`과 `3.2-final`이 함께 들어 있어서 엑셀 다운로드가 안 됐다. (POI 3.6, 3.10, 3.13-all, 3.14를 모두 쓰고 있는 사이트도 있었음)
- 전자정부 프레임워크(maven `pom.xml`)에서 `batik-all.jar`는 어떻게 처리해야 하는가?

**답변**
- **POI는 한 버전만** 남겨야 합니다. 같은 이름의 jar가 여러 버전 있으면 가장 높은 버전만 남기고, 다른 버전은 모두 삭제합니다. `poi`, `poi-ooxml`, `poi-ooxml-schemas`는 **같은 버전의 세 개 파일**이 한 세트입니다. 예를 들어 POI 3.9를 쓴다면 `poi-3.9-20121203.jar`, `poi-ooxml-3.9-20121203.jar`, `poi-ooxml-schemas-3.9-20121203.jar` 세 개를 모두 지우고 새 버전을 적용합니다. 서버(WAS)의 공용 lib에 이미 POI가 있는 경우에도 충돌하므로 확인합니다. (예: WAS가 가진 `poi-3.2-FINAL`)
- **서버모듈 1.0(1.1.x) 배포 lib 목록**(2.x가 아닌 1.x 서버모듈): `commons-codec-1.6.jar`, `dom4j-1.6.1.jar`, `flying-saucer-core-9.0.2.jar`, `flying-saucer-pdf-9.0.2.jar`, `itext-2.1.7.jar`, `json-simple-1.1.1.jar`, `poi-3.9-20121203.jar`, `poi-ooxml-3.9-20121203.jar`, `poi-ooxml-schemas-3.9-20121203.jar`, `xmlbeans-2.3.0.jar`. 이 중 **`flying-saucer`와 `itext`로 시작하는 lib는 `Down2Pdf()`에 필요한 파일**입니다.
- **서버모듈 2.0(POI 3.13 기준) 종속 라이브러리**: `batik-all-xml.jar`, `commons-codec-1.10.jar`, `commons-logging-1.1.3.jar`, `log4j-1.2.13.jar`(필수 아님), `poi-3.13-all.jar`. POI를 3.13으로 올리는 경우에는 `poi-3.13-20191017.jar`, `poi-ooxml-3.13-20191017.jar`, `poi-ooxml-schemas-3.13-20191017.jar`, `xmlbeans-2.3.0.jar` 네 개를 적용합니다. (xmlbeans를 쓰지 않던 사이트도 POI 3.13에서는 필수)
- **서버모듈 2.1.x + POI 4.1.2(또는 Java 17 환경)**: `batik-all-1.17.jar`, `commons-codec-1.13.jar`, `commons-collections4-4.4.jar`, `commons-compress-1.19.jar`, `commons-io-2.11.0.jar`, `commons-logging-1.1.3.jar`, `commons-math3-3.6.1.jar`, `curvesapi-1.06.jar`, `poi-4.1.2.jar`, `poi-ooxml-4.1.2.jar`, `poi-ooxml-schemas-4.1.2.jar`, `servlet-api.jar`, `SparseBitSet-1.2.jar`, `xml-apis-ext-1.3.04.jar`, `xmlbeans-3.1.0.jar`, `xmlgraphics-commons-2.9.jar`. 보안 점검용 최신 조합과 시점별 목록은 "서버모듈 버전별로 같이 넣어야 하는 jar 목록"([UPG-05]), "보안 점검(오픈소스 취약점)으로 라이브러리 버전을 올려야 할 때"([ENV-06]), "서버모듈을 2.0에서 2.1로 올렸더니 엑셀 다운로드가 안 된다"([UPG-02])를 참고합니다.
- **용도별 필수 lib**: `batik-all-xml.jar`(또는 `batik-all-1.17`)는 **이미지가 있는 엑셀 다운로드**, `Down2Hml`, 시트와 차트를 함께 다운로드할 때 필요합니다. 없으면 `NoClassDefFoundError: org/apache/batik/transcoder/...`가 납니다. `dom4j`는 `ReportXMLURL`에, `flying-saucer`/`itext`는 PDF에 필요합니다. `log4j`는 서버모듈 2.x가 일부 로깅에만 쓰며 필수가 아닙니다. ("Log4j 보안 이슈가 IBSheet7 서버모듈에 영향을 주나"([ENV-28]) 참고)
- **`commons-logging-1.1.3.jar`**는 자사 모듈이 로그를 찍기 위해 필요한 파일이지만, `commons-logging`을 쓰지 않고 `setLog` 함수가 잘 되면 필요 없습니다. 서버의 기존 `commons-logging.jar`를 지우고 넣었더니 접속이 안 된 사례는 기존 파일과 같이 두었을 때 접속이 되었던 경우입니다.
- **maven(전자정부 프레임워크)**: `batik-all`은 서버 lib 폴더를 바라보도록 system scope로 설정합니다. 배포되는 전자정부 샘플의 설정 예는 다음과 같습니다.
```
<dependency>
  <groupId>batik</groupId>
  <artifactId>batik-all</artifactId>
  <version>1.0</version>
  <scope>system</scope>
  <systemPath>${basedir}/src/main/webapp/WEB-INF/lib/batik-all-xml.jar</systemPath>
</dependency>
```
  `pom.xml`을 바꾸지 않고 서버 lib만 정리하면 commit 후 오류가 다시 날 수 있습니다.
- Gradle 환경에서 Nexus에 없는 jar를 쓰려면 로컬 `libs/`에 두고 `implementation files('libs/…jar')`로 지정해야 하며(다른 프로젝트에서 안 되면 Nexus에 있는 버전, 예: 1.1.133을 쓰도록 안내), 자세한 내용은 "Jakarta·Spring Boot 3·Gradle 환경에서 서버모듈 jar를 쓸 때"([ENV-07])에 있습니다.

**키워드**: 필수 라이브러리, POI 한 버전만, poi-ooxml-schemas, batik-all-xml, dom4j, flying-saucer, itext, commons-logging, xmlbeans, maven system scope

### [LIB-02] 서버모듈 버전과 로딩된 라이브러리를 확인하는 방법

**질문**
- 사용 중인 서버모듈과 라이브러리 버전을 어떻게 확인하는가? (엑셀 다운로드가 로컬에서만 되고 서버에서는 안 된다)
- POI 라이브러리가 실제로 참조되고 있는지 확인하려면?
- 새 jar를 적용했는데도 같은 오류가 난다. 로그에 찍힌 폴더에 `ibsheet7` jar가 없다.

**답변**
- **서버모듈 버전 확인**: `WEB-INF/lib`에서 `ibsheet7`로 시작하는 jar를 찾습니다. **jar 이름이 2로 시작하면 서버모듈 2.0**이고 `com.ibleaders.ibsheet.util.Version.getVersion()`을, **1로 시작하면 서버모듈 1.0**이고 `com.ibleaders.ibsheet7.util.Version.getVersion()`을 `Down2Excel.jsp`에서 `System.out.println`으로 찍습니다. 각 JSP의 `System.out.println(com.ibleaders.ibsheet7.util.Version.getVersion());`는 주석 처리되어 있으므로 주석을 풀면 서버 콘솔에서 사용 중인 라이브러리 정보(어떤 jar가 어느 경로에서 읽히는지)를 확인할 수 있습니다. 이 정보로 라이브러리 버전이 서버모듈 종류에 맞는지 확인합니다. jar 이름만으로 모를 때는 `META-INF/MANIFEST.MF`에서도 확인합니다.
- **POI를 실제로 쓰는지**: `IBSheetDown()` 생성자 아래에 `down.setLog(true);`를 넣으면 POI 사용 여부와 jar 경로가 로그로 출력됩니다. (`Class Info : org.apache.poi.ss.usermodel.Workbook … jar path … jar Version … Required Version : POI 3.8 beta3 or later` 같은 블록이 나옴)
- **jar가 안 보일 때**: WAS 로그에 찍힌 user library 위치에 `ibsheet7` jar가 없으면 컨테이너 lib나 다른 user library 폴더를 확인해야 하고, 서버에서 `find` 명령으로 `ibsheet7-x.jar`의 위치를 찾아 교체합니다. 교체 후에는 `Down2Excel` 때 jar 버전을 찍는 로그에 바뀐 버전이 나옵니다.
- 업그레이드 후 옛 jar가 같이 읽히는 경우(`ibsheet7` jar가 여러 개), 로컬에서는 되고 서버에서는 안 되는 경우(서버 간 lib 차이, 개발 PC에서 빌드해 올리면서 lib 누락)는 "서버모듈 jar가 어떤 버전인지 확인하는 방법과, 업그레이드 후에도 옛 jar가 읽히는 경우"([ENV-27])에 있습니다. 어떤 jar가 누락되었는지는 필수 라이브러리 목록과 대조합니다. ("서버모듈과 함께 넣어야 하는 라이브러리, POI는 한 버전만 남긴다"([LIB-01]) 참고)
- `e.printStackTrace();`의 주석 처리 여부(`Down2Excel.jsp`, `LoadExcel.jsp`의 catch 구간)도 먼저 확인해 서버 콘솔에서 에러 내용을 봅니다.

**키워드**: Version.getVersion, setLog(true), MANIFEST.MF, ibsheet7 jar 확인, 로딩된 POI 확인, user library, find ibsheet7

### [LIB-03] 서버모듈별로 지원하는 POI 버전 범위와 그 변화

**질문**
- 서버모듈 1.x와 2.x는 POI 몇 버전까지 쓸 수 있는가? POI 3.14, 3.15, 3.16, 3.17 이상, 4.x, 5.x는?
- POI 3.7을 쓸 수 있는가? Java 11 / POI 상위 버전은 언제 지원되는가?
- POI 4.x를 쓰는 프레임워크에서 IBSheet 서버모듈이 정상 동작하는가?

**답변**
- 아래 표는 문의 시점별 답변을 모은 것으로, **시기에 따라 지원 범위가 달라졌습니다.** (오래된 답변은 당시 기준입니다)

  | 시점(문의 시기) | 서버모듈 | 지원 POI |
  |---|---|---|
  | 2019-11 | 1.1.114 | POI **3.13까지**, 3.14는 안 됨. commons-codec 버전도 맞춰야 함 |
  | 2020-05 | 1.0(1.x) | POI 3.7부터 지원, **POI로만 다운로드 가능** |
  | 2020-05 | 2.0 | POI 3.7: xls는 POI, xlsx는 POI를 쓰지 않는 내장 모듈. **3.8 이상**은 라이브러리가 모두 들어 있으면 POI로 다운로드 (권장 3.13-all, 3.10~3.15 가능, 4.x 서버모듈은 아직 없음) |
  | 2020-03 | 1.x/2.x | POI는 3.15까지는 대충 동작하나 그 이상은 오류, **3.13 권장** |
  | 2020-10 | 2.0 | 3.13 기준이며 **3.14까지** 사용 가능. POI 3.15는 xls 다운로드는 되나 xlsx가 안 됨 |
  | 2021-02 | 2.0 | POI 4.x와 같이는 **지원하지 않음**. Java 11/상위 POI는 IBSheet8이 나간 상태라고 안내 |
  | 2023-02 | 2.1.2 | POI **3.13과 4.1.2** 모두 지원(JDK 11이면 4.1.2) |
  | 2024-02~03 | 1.1.133 / 2.x | 1.1.133은 POI 3.13까지(3.13 이상은 xlsx 다운로드 에러), 2.x는 **최대 3.14**(3.16은 미지원) |
  | 2024-07 | 2.x | 최소 POI 3.8 beta부터 가능. POI 3.7은 당장 되지만 문제 가능성이 있어 1.x(1.1.135) 안내 |
  | 2025-05 | 2.1.x | POI **5.4**로 업데이트한 버전 배포 |
  | 2026-03 | `ibsheet.js` 7.0.13.291 | POI **5.4**에서도 서버모듈과 호환되도록 추가 배포 |
  | 2026-09 | 2.1.48-jakarta | 번들 lib에 `poi-5.4.0.jar` 포함 (JDK 8 이상 필요, JDK 1.6 환경은 POI 5.x 적용 불가) |
- **POI 3.13은 JDK 9까지**만 쓸 수 있고, JDK 10 이상은 POI 4 이상이 필요합니다. Java 17에서는 POI 4.1.0 이상(가능하면 5.x)을 권장합니다. ("POI 버전이 맞지 않아 생기는 오류 모음"([ENV-02]), "POI 3.13의 JDK 한계…"([ENV-10]) 참고)
- 서버모듈 1.1.x가 패치되면서 POI 권장 범위가 3.9~3.13으로 제한되어, 기존에는 POI 3.16으로도 되던 사이트가 업그레이드 후 안 되는 경우가 있습니다. ("제품·서버모듈·JSP 버전이 서로 맞지 않아 생기는 문제"([UPG-06]) 참고)
- POI를 쓸 수 없거나 버전을 맞추기 어려운 환경에서는 내장 SAX 파서(xlsx)를 쓰는 `setUsePOI(false)`가 있습니다. ("서버모듈 1.x와 2.x의 메모리 동작 차이, 그리고 한계"([PRF-06]) 참고)
- 서버모듈 2.0은 `poi-scratchpad`와 무관하고, 비밀번호 다운로드는 POI 3.10 이상과 서버모듈 2.0.36 이상(xlsx)이 필요합니다. ("엑셀 다운로드 파일에 열기 비밀번호를 설정하려면"([DRM-05]) 참고)
- 엑셀 업로드에서 POI가 없으면 xls는 내부 파서를 쓰고, xlsx는 `LoadExcel.jsp`의 `SetUsePoi(false)` 설정에 따라 POI 참조 여부를 정합니다. xls의 내부 파서는 예외적인 서식에서 POI보다 덜 안정적이므로 개발/운영 서버모듈을 맞추는 것이 좋습니다. ("업로드 데이터가 비어 올라오는 경우…"는 "엑셀 업로드 숫자·날짜 값이 변형된다"([UPL-17]) 참고)

**키워드**: 서버모듈 POI 지원 범위, POI 3.13, POI 3.14, POI 3.16, POI 4.1.2, POI 5.4, JDK 9, setUsePOI, 시점별 지원

## DWN · 엑셀·텍스트·PDF 다운로드

### [DWN-01] Down2Excel과 DirectDown2Excel은 어떻게 다르고, 어떤 경우에 쓰나

**질문**
- `DirectDown2Excel`로 다운로드할 때 `String data = ibExcel.getData();`에 데이터가 비어 있다.
- Down2Excel로 40개 컬럼 × 3만 건(또는 컬럼 30개 × 7만 건, 2만 건)을 내려받으면 브라우저가 멈추거나 다운로드가 안 된다.
- `DirectDown2Excel`로 CSV를 받고 싶은데 10만 건에서 out of memory가 난다.
- 이전에 `Down2Excel`의 `OnDownFinish` 이벤트에서 쓰던 `blob` 인자가 `DirectDown2Excel`로 바꾸자 사용되지 않는다.

**답변**
- **대량 데이터는 `Down2Excel`로는 어렵고 `DirectDown2Excel`을 쓰도록** 안내했습니다.
- `DirectDown2Excel` 쪽 JSP에서 `ibExcel.getData()`에 데이터가 없으면 `String data = request.getParameter("Data");`로 받아 보도록 안내했습니다.
- `DirectDown2Excel`로 CSV를 내려받는 방식은 지원되지 않습니다. 10만 건 CSV에서 out of memory가 났을 때 `Down2Text()`는 가능하지만 원하는 형태가 아니므로 건수를 줄이거나 다른 방법을 찾아야 한다고 답변했습니다.
- `blob` 인자는 클라이언트 모듈에서 base64로 받도록 만든 기능입니다. `DirectDown2Excel`은 서버모듈이라 `blob` 인자를 쓸 수 없습니다.
- 7만 건 × 30컬럼 사례는 형식을 `xls`에서 `xlsx`로 바꾸자 정상적으로 내려왔다고 합니다.
- 2만 건 정도에서 다운로드가 안 될 때는 WAS의 `maxPostSize`와 `maxParameterCount` 설정을 확인하도록 안내했습니다. ("서버 설정 한도와 서버 파일 쓰기·크기 제한"([DWN-08]) 참고)
- 클라이언트 모듈로 내려받으려면 `ibsheet.cfg`에 `ExportMode:2`를 설정하고 화면에 `ibexcel.js`를 링크해야 합니다. 클라이언트 모듈로 테스트하다 같은 파일명으로 반복 다운로드하면 브라우저가 "복구하시겠습니까?"라는 알림창을 띄운 사례는 기록에 처리 내용이 없습니다.

- **`ExportMode` 값**: `1`은 서버에서 엑셀 파일 생성(기본), `2`는 클라이언트에서 엑셀 파일 생성, `3`은 클라이언트 브라우저에서 시도해 브라우저 버전이 여의치 않으면 서버에서 실행합니다. 클라이언트에서 엑셀 파일이 만들어지는지 확인하려면 IE 개발자 도구(F12) 네트워크 탭에서 엑셀 다운로드 함수를 호출할 때 서버 쪽 URL 전송이 있는지 보면 됩니다.

**키워드**: Down2Excel, DirectDown2Excel, 대용량 다운로드, 브라우저 멈춤, out of memory, getData, request.getParameter("Data"), blob, OnDownFinish, ExportMode, ibexcel.js, 클라이언트 모듈

### [DWN-02] DirectDown2Excel에 추가 인자(ExtendParam)를 넘기고 받는 방법 / 414 오류

**질문**
- `ExtendParam`으로 보낸 값은 서버에서 어떻게 받는가? (JSP, .NET)
- `ExtendParam`을 `{param:"1", Eparam:"2"}` 같은 JSON으로 넘길 수 있는가?
- 인자가 많아 `ExtendParamMethod: "POST"`로 보내려 한다. 값은 어떤 형식으로 넘어가는가?
- 한 사이트는 정상인데 다른 사이트에서는 브라우저 콘솔에 `414 request-uri too large`가 뜬다.
- 특정 화면에서만 IE에서 다운로드가 안 되고 크롬은 된다. (`ExtendParam`으로 2,000자 이상 전달)

**답변**
- `ExtendParam`은 URL에 `?`로 파라미터를 붙여 가므로 서버에서는 `request.getParameter`로 받으면 됩니다. .NET(`Down2Excel.aspx`)에서는 `Request.QueryString["num"]`처럼 받는다고 했습니다.
- JSON은 안 되고 `"키=값&키=값"` 형식의 문자열이어야 합니다.
```
var param = {URL:"/sub/ex/bussDeptList.jsp", ExtendParam:"DECNO=3422&PartMngNO=982211"};
mySheet.DirectDown2Excel(param);
```
- 414 오류는 `ExtendParam`이 길어서 URL이 너무 길어진 것이므로 **`ExtendParamMethod`를 `POST`로 설정**합니다.
- IE에서만 안 되던 사례는 `ExtendParam`으로 2,000자 이상을 전달하는 경우 시트가 `querystring`을 URL 뒤에 자동으로 붙여, POST로 보내도 URL이 매우 길어지는 현상이었습니다. `OnBeforeDownload` 이벤트에서 `frm.action`의 뒷부분을 잘라내 form의 input으로 옮겨 전달하도록 바꿨습니다.
```
function mySheet_OnBeforeDownload(downloadType, frm) {
  var pos = frm.action.indexOf("DirectDown2Excel")+16;
  var qstring = frm.action.substring(pos);
  var action  = frm.action.substring(0, pos);
  frm.action = action;
  if(qstring.substring(0,2)=="&&"){qstring = qstring.substring(2);}
  if(qstring.substring(0,1)=="&"){qstring = qstring.substring(1);}
  var items = qstring.split("&");
  for(var i=0;i<items.length;i++){
    var item = items[i].split("=");
    var inp = document.createElement("input");
    inp.name = item[0];
    inp.value = decodeURIComponent(item[1]);
    frm.appendChild(inp);
  }
  frm.submit();
}
```
- `ibExcel.getExtendParam("DRM_YN")`처럼 값을 읽을 때 NullPointerException이 나는 사례는 `setService`를 호출하기 **전에** `getExtendParam`을 호출해서였습니다. `setService` 이후에 호출해야 합니다.
- `ExtendParam`을 GET 방식으로 보내 데이터 제한이 생기는 문제는 멀티파트 요청에 utf-8 인자를 추가하는 방식으로 개선해 배포했습니다.

**키워드**: ExtendParam, ExtendParamMethod, POST, 414 request-uri too large, URL 길이, OnBeforeDownload, DirectDown2Excel 인자, Request.QueryString

### [DWN-03] DirectDown2Excel이 서버에서 데이터를 받는 방법 (SHEETDATA, 중계 페이지)

**질문**
- `DirectDown2Excel()`에서 서버가 조회한 데이터를 JSON 구조로 `SHEETDATA`에 담아도 되는가?
- 페이징된 시트를 CSV로 받아야 해서 `Down2Text_Url`을 중계 페이지로 두고 `down.setDirectRequestData()`로 `SHEETDATA`를 시트에 포함시켰는데, 화면에서 보낸 데이터와 `SHEETDATA` 데이터가 이어 붙어서 내려온다.
- `DirectDown2Excel`에 URL을 지정했는데 그 URL을 타지 않는다. (.NET 2.0)

**답변**
- 서버 쪽에서 `SetAttribute`에 **`SHEETDATA`라는 이름**으로 담아야 하고, 데이터는 JSON이 아닌 **List 또는 Map 형태**여야 합니다.
- 중계 페이지에서 화면 데이터와 `SHEETDATA`가 겹쳐 내려오는 문제는 개발 이슈로 넘어가 기술지원은 종료되었고, 기록에 해결 방법이 없습니다.
- .NET에서 URL을 타지 않은 사례는 원격으로 확인해 보니 지정한 경로가 맞지 않아 오류 페이지(`ErrorPage.aspx`)로 리다이렉트(`Object moved`)된 것이었습니다. 경로를 확인합니다.
- 서버에서 예외가 났을 때 화면에 오류를 표시하는 방법을 물은 건에는 500 에러용 간단한 템플릿을 메일로 전달했다고만 기록되어 있습니다. DirectDown2Excel이 404 또는 500을 내는 경우는 서버 에러 로그를 확인해야 원인을 알 수 있습니다.

**키워드**: SHEETDATA, SetAttribute, setDirectRequestData, Down2Text_Url, 중계 페이지, Object moved, ErrorPage.aspx, DirectDown2Excel 404/500

### [DWN-04] 다운로드 파일명·확장자 문제 (xlsx, TempFile, 점(.)이 있는 파일명)

**질문**
- `Down2Excel`의 `TempFile`에 `xlsx`를 넣으면 동작하지 않는다. (서버모듈 2.0)
- `Down2Excel.jsp`에서 `setFileType`을 `xlsx`로 하면 파일명이 `파일명.xls.xlsx`로 표시된다.
- `Down2Excel` 때 서버 콘솔에 NullPointerException이 난다.
- 지정한 파일명의 `Type:"Float"` 컬럼이 빈 값으로 내려온다.

**답변**
- `FileName`의 확장자와 `TempFile`의 확장자는 **같아야** 합니다.
- `.xls.xlsx`로 표시되던 현상은 제품에서 수정해 배포했습니다.
- 파일명에 `.`(점)이 들어 있으면 NullPointerException이 나는 문제가 있어 파일명에 `.`을 쓰지 않도록 답변을 받았습니다.
- `Type:"Float"` 컬럼이 비어 내려온 사례는 컬럼 정의에 `Type:"float"`(소문자)로 선언되어 있었기 때문입니다. **`Float`로 정확히 대소문자를 맞춰야** 합니다.

**키워드**: TempFile, FileName 확장자, setFileType, 파일명.xls.xlsx, 파일명에 점, NullPointerException, Type Float 대소문자, 빈 값 다운로드

### [DWN-05] 트리 데이터를 내려받을 때 붙는 "…" 제거, 줄바꿈이 안 되는 경우

**질문**
- 트리 데이터를 다운로드하면 `...`이 보이는데 없애고 싶다.
- `Down2Excel`로 받으면 줄바꿈이 처리되지 않는다. (WordWrap 속성은 지정하지 않음)

**답변**
- `Down2Excel.jsp`에서 `down.setTreeChar("\u2026");`를 **주석 처리**하거나 `down.setTreeChar("");`로 설정합니다.
- 줄바꿈이 안 되던 .NET 사례는 `Down2Excel.aspx`에서 `SetWordWrap(false);`를 쓰고 있어서였습니다. 이 줄을 주석 처리하고 사용하도록 안내했습니다.
- .NET 모듈에서는 `Down2Excel`의 `ComboValidation`을 지원하지 않는다고 답변했습니다.

**키워드**: setTreeChar, 트리 다운로드, 말줄임표, setWordWrap, 줄바꿈, .NET, ComboValidation 미지원

### [DWN-06] 텍스트(CSV) 다운로드의 인코딩·행 구분자·마지막 줄

**질문**
- 텍스트 다운로드 시 UTF-8로 내려오는데 ANSI로 받을 수 있는가?
- `Down2Text()`의 행 구분자가 `\r\n`(ASCII 13·10)으로 내려오는데 `\n`(10)만 쓰고 싶다.
- `Down2Text`로 받을 때 마지막 행에 개행 문자가 붙는데 데이터 행까지만 받고 싶다.
- `Down2Text()` 호출 뒤의 스크립트가 동작하지 않는다.
- `Down2Text()`로 받으면 데이터가 정상적으로 내려오지 않는다.

**답변**
- 인코딩은 `Down2Text({ DownloadEncoding : "EUC-KR" })`로 지정합니다. 지정하지 않으면 **CSV는 자동으로 EUC-KR**을 씁니다.
- 행 구분자는 서버모듈 2.0에서 `down.setTextLine("\n");`로 지정할 수 있습니다. 서버모듈 1.5에도 같은 옵션을 추가해 배포했습니다.
- 마지막 개행 문자 제거는 기능을 반영해 배포했습니다.
- `Down2Text()` 이후 스크립트가 멈춘 사례는 요청 본문에서 `<`가 다른 문자로 치환되어 있었습니다. `Down2Excel.jsp`의 `down.setMarkupTagDelimiter("")` 설정과 같은 값이어야 해서 **`Down2Text.jsp`에도 같은 설정을 넣었더니** 정상적으로 다운로드되었습니다. `Down2Excel`이 안 되던 다른 사례(js 7.0.13.108)도 `MarkUpDelimiter` 설정으로 해결되었습니다.
- 원격으로 샘플 데이터를 만들어 확인하니 정상적으로 내려왔다는 기록도 있습니다. (원인 기록 없음)

**키워드**: Down2Text, DownloadEncoding, EUC-KR, CSV 인코딩, setTextLine, 행 구분자, 마지막 개행, setMarkupTagDelimiter, Down2Text.jsp

### [DWN-07] 다운로드 때 서버 오류·권한·라이브러리 충돌

**질문**
- 로컬에서는 되는데 개발 서버에서만 권한 오류로 다운로드가 안 된다. 유닉스에서 `permission denied`가 뜬다.
- 로그에 `IOException`이 난다.
- `Down2Excel` 때 `NoSuchMethod` 류의 예외가 서버 콘솔에 찍힌다.
- 제품을 모두 최신으로 올렸는데 `the method getDownError() is undefined for the type Down2Excel` 오류가 찍힌다.
- 예제(`ibsheet_sample.zip`)를 실행하니 `Down2Excel.jsp`에서 오류가 난다.
- resin 서버에서 `Down2Excel`을 호출하면 0바이트로 내려온다.
- 서버 콘솔에 `response already committed` 오류가 난다.

**답변**
- 로컬은 되고 서버에서만 권한 오류가 나는 사례에서는 **임시(tmp) 디렉터리 권한**을 의심해 확인하도록 안내했습니다. `String tmpPath = System.getProperty("java.io.tmpdir");`로 temp 경로를 확인하고, IOException이 나면 해당 디렉터리의 권한(777)을 확인하도록 안내했습니다.
- `NoSuchMethod…` 예외는 **jar 누락 또는 충돌**이 원인입니다. 중복·구버전 jar를 정리합니다. ("서버모듈 버전과 필요한 라이브러리 확인 방법"([LIB-02]) 참고)
- 전달된 예제 안의 JSP가 **서버모듈 1.0 기반**이어서 생긴 오류가 있었습니다. 예제 압축 파일의 `serverModule_java` 폴더 안 jsp 폴더의 내용으로 덮어쓰면 됩니다.
- `getDownError()`가 정의되지 않았다는 오류는 PC를 재부팅하자 해결되었다고만 기록되어 있습니다.
- resin의 0바이트, `response already committed`, 유닉스 `permission denied`는 기록에 해결 내용이 없습니다.

**키워드**: 권한 오류, permission denied, java.io.tmpdir, IOException, NoSuchMethodError, jar 충돌, getDownError, 서버모듈 1.0 JSP, 0 byte, response already committed

### [DWN-08] 서버 설정 한도와 서버 파일 쓰기·크기 제한

**질문**
- Down2Excel로 2만 건 정도를 받는데 다운로드가 안 된다.
- Down2Excel 시 브라우저로 다운로드하지 않고(Response 제거) 서버에 파일만 쓰고 싶은데 로컬은 되고 개발 서버는 안 된다.
- 서버모듈에서 파일 크기 제한을 걸고 싶다.
- 윈도우에서 리눅스로 서버를 옮긴 뒤 `DirectDown2Excel`로 받은 컬럼 폭이 0.3mm 정도로 매우 작다.
- 멀티파트 필터(`MultipartFilter`, `MultipartResolver`)를 적용하면 `Down2Excel`이나 `setService`에서 오류가 난다.

**답변**
- 다운로드가 안 될 때는 WAS의 **`maxPostSize`, `maxParameterCount`** 값을 확인합니다.
- 파일 크기 제한은 JSP에서 걸어도 이미 데이터가 서버로 넘어온 뒤라 부하는 마찬가지입니다. **`Down2Excel()` 실행 전에 건수로 막는 방법**을 권했습니다.
- 컬럼 폭이 작게 내려오는 현상은 OS 영향으로 보고된 적이 없고, `AutoSizeColumn`이 적용되어 있다면 그 옵션을 제거해 보도록 했습니다.
- 멀티파트 설정(MultipartResolver) 오류는 관련 가이드를 메일로 안내했습니다. (구체적 설정 내용은 기록에 없음)
- 서버에 파일만 쓰는 방식은 본인이 해결했다고 하여 기록에 방법이 없습니다.

**키워드**: maxPostSize, maxParameterCount, 파일 크기 제한, 리눅스 컬럼 폭, AutoSizeColumn, MultipartFilter, MultipartResolver, Spring

### [DWN-09] PDF 다운로드 (한글 깨짐·잘림·0KB·폰트)

**질문**
- PDF를 받았는데 한글이 나오지 않는다.
- PDF 다운로드 시 시트가 잘린다.
- `UnsupportedClassVersionError` 때문에 PDF 생성이 안 된다.
- 특정 프로젝트에서 Down2Pdf가 오류가 나고 PDF가 0KB로 내려온다.
- HTML을 PDF로 변환하는 기능을 쓰는데 다운로드하지 않고 서버의 특정 폴더에 저장하려니 NullPointerException이 난다.
- 배포 패키지에 포함된 MS 폰트(`gulim.ttf`, `malgun.ttf` 등)의 재배포 권한과, 삭제했을 때의 영향이 궁금하다. (.NET 서버모듈 Down2Pdf)

**답변**
- **한글이 안 나오는 경우**: `down2pdf.jsp`의 `setFontFolder` 함수로 ttf 파일이 있는 경로를 지정합니다.
- `UnsupportedClassVersionError`는 해당 사이트에 맞는 jar를 배포(Redmine 처리)해 해결했습니다. 0KB 사례는 `XMLResource`를 로딩하는 과정에서 클래스가 없어 생긴 문제였고 며칠 뒤 해결되었다는 메일이 왔습니다.
- HTML을 `down2pdf.jsp`로 던지는 방식은 시트를 이용한 방식이 아니어서 제품이 기대하는 **`data` 파라미터가 없어** 오류가 난 것이었습니다. `data`를 멀티파트 형태로 보내도록 안내했습니다.
- 시트가 잘리는 현상은 분석 결과로 `close()` 메서드에서 `useDTD`, `isLandscape`, `dpi`, `inputData`, `htmlData` 같은 변수를 초기화하는 코드가 제시되었으나 결론은 기록에 없습니다.
- **.NET 서버모듈의 폰트**: 기존에는 `malgun.ttf`, `gulim.ttf` 두 파일명만 참조해 다른 폰트를 쓰려면 파일명을 바꿔야 했습니다. .NET 서버모듈 v2.0.0.8부터 **폰트 폴더 안의 `.ttf`/`.otf`를 모두 인식**하고, 폰트명은 확장자를 뺀 파일명을 씁니다. 기존 malgun/gulim 참조도 유지되고(3.5/4.0 모두 적용), 폰트 폴더가 없거나 접근에 실패해도 기존 동작에 영향이 없습니다. 따라서 사용 권한이 있거나 자유롭게 재배포 가능한 오픈소스 폰트(예: Noto Sans KR, 나눔고딕)를 그대로 쓰고, 라이선스 이슈가 되는 MS 폰트는 삭제해도 됩니다. 이 변경은 dll 내부 수정이라 aspx와 다른 라이브러리(Syncfusion, wkhtmltopdf.exe 등)는 교체하지 않아도 됩니다.
  - 적용 순서: 운영 중인 서버모듈 폴더의 기존 `IBSheet7-3.5.dll` 또는 `IBSheet7-4.0.dll`을 백업 → 새 dll을 같은 위치에 덮어씀 → 폰트 파일(.ttf/.otf)을 폰트 폴더에 배치 → IIS 응용 프로그램 풀 재시작 후 PDF 다운로드 확인. (메일 정책으로 dll이 차단될 수 있어 확장자를 바꿔 보내므로 받은 뒤 `.dll`로 되돌려 사용)
  - 폰트를 두는 위치는 `Down2Pdf.aspx` 상단 [사용자 환경 설정]에서 고릅니다. **방법 1** `ModulePath`: `wkhtmltopdf.exe`가 있는 폴더에 폰트를 함께 넣고 그 경로를 지정(예: `ModulePath = "c:/inetpub/wwwroot/bin/";`). **방법 2** `FontWebPath`: 웹에서 접근 가능한 경로에 폰트를 올리고 폴더 경로를 지정(예: `FontWebPath = "http://example.com/static/font/";`, 끝의 `/`까지 포함). wkhtmltopdf 최신 버전에서는 방법 2를 권장했습니다.
  - 사용할 폰트는 `Down2Pdf`의 `FontTo` 인자로 지정합니다.
```
mySheet.Down2Pdf({ FontTo: "NotoSansKR" });
mySheet.Down2Pdf({ FileName: "myPDF", FontTo: "NanumGothic" });
```
  - MS 폰트 재배포 권한에 대한 증빙 문서 제공 여부는 이 기록에서 확인되지 않습니다. 개선 내용만 안내되었습니다.

**키워드**: Down2Pdf, PDF 한글 깨짐, setFontFolder, UnsupportedClassVersionError, PDF 0KB, FontTo, ModulePath, FontWebPath, wkhtmltopdf, MS 폰트 재배포, Noto Sans KR, 나눔고딕, .NET 서버모듈 2.0.0.8

### [DWN-10] 엑셀 다운로드 때 보고서 XML(ReportXMLURL)을 적용했는데 내용이 반영되지 않는다

**질문**
- `Down2Excel`의 `ReportXMLURL`을 설정해 다운로드했더니 `java.io.IOException : Invalid to flush BodyContent : no backing stream behind it`가 난다.
- 다운로드는 되는데 `ReportXMLURL`의 내용이 반영되지 않는다.

**답변**
현장 방문으로 확인했을 때 `ReportXMLURL`로 지정한 페이지의 XML 형식이 맞지 않았습니다. 고쳐서 어느 정도 반영되었습니다.
- `<?xml version="1.0" encoding="UTF-8" ?>`가 **첫 줄**에 있어야 하는데 3번째 줄에 있어 앞의 빈 줄을 제거했습니다.
- `BackColor`, `Color` 지정에서 `RGB(192,0,0)`처럼 쓴 부분을 `192,0,0` 형식으로 바꿨습니다.
- 태그 철자 `Horizantal`을 `Horizontal`로 고쳤습니다.
- `IOException` 자체는 사이트에서 따로 처리한 것으로 보인다고 합니다.

**키워드**: ReportXMLURL, Invalid to flush BodyContent, XML 선언 첫 줄, BackColor, Horizontal 오타, 보고서 XML

### [DWN-11] 다운로드 파일명·시트명·글꼴·템플릿(TempFile) 옵션

**질문**
- 다운로드 때 대기 이미지("처리중입니다")가 끝난 뒤에도 사라지지 않는다. 대기 이미지를 아예 표시하지 않을 수 있는가?
- 엑셀 다운로드 파일명을 공통으로 지정하면서 개별 시트 이름을 `_시트 이름`처럼 붙이고 싶다. (`SetDown2ExcelConfig`로는 안 되는 것 같다)
- 시트에 적용된 글꼴이 아닌 다른 글꼴로 엑셀을 출력하고 싶다.
- `reportXML`의 `title`로 보냈는데 다운로드된 엑셀의 시트 이름에 파일명이 들어갔고, 시트가 여러 개면 같은 이름이 `[1]`, `[2]`로 붙는다.
- `TempFile`이 잘 설정되지 않는다. (원격으로 보니 `setTempRoot`에 경로와 파일명을 함께 지정)
- 엑셀 머리글에 이미지(워터마크)를 넣고 싶다. (`setWebServerDomain`으로 이미지를 설정했는데 엑셀에 이미지가 보이지 않음)
- 헤더 `backColor`를 헤더 선언부에 넣었는데 적용되지 않는다.
- 헤더 문자열에 `/n`을 넣어 개행했는데 엑셀에서는 일렬로 나온다. (더블클릭하면 개행됨)
- 헤더행을 빼려고 `DownHeader:0`을 설정하면 `reportXML` 디자인이 아예 적용되지 않는다. / 헤더 행이 1개 이상이면 머지된 형태로만 나오고 헤더 문구가 공란으로 다운로드된다. (.NET)

**답변**
- **대기 이미지 숨기기**: 시트는 조회, 저장, 엑셀 다운/업로드 때 기본적으로 대기 이미지를 표시합니다. 엑셀 다운로드에서 표시하지 않으려면 `ibsheet.cfg`에 `DownWaitImageVisible : 0`을 설정합니다. 시트 전체에 적용되며, **설정하면 `OnDownFinish` 이벤트가 발생하지 않습니다.**
```
{ "Cfg" : { "Down2Excel_Url" : "../jsp/Down2Excel.jsp", ..., "DownWaitImageVisible" : "0" } }
```
- **파일명 공통 지정**: `ibsheetinfo.js`에서 `Down2Excel` 함수를 오버라이드해 `FileName`을 조정합니다. `SetDown2ExcelConfig`에 공통으로 들어갈 문자열(예: `DummyFileName`)을 넣고, 오버라이드 함수에서 `GetDown2ExcelConfig()`로 읽어 `FileName`에 붙입니다.
```
sheet.SetDown2ExcelConfig({ SheetDesign:1, DummyFileName : "공통접두어" });
sheet._orgDown2Excel = sheet.Down2Excel;
sheet.Down2Excel = function(arg){
  var downConfig = sheet.GetDown2ExcelConfig();
  if(downConfig && downConfig["DummyFileName"]){
    if ('FileName' in arg) { arg.FileName = downConfig["DummyFileName"]+"_"+ arg.FileName; }
    else { arg.FileName = downConfig["DummyFileName"]; }
  }
  sheet.ExportMode = 3;
  sheet._orgDown2Excel(arg);
}
```
  `SetDown2ExcelConfig`를 쓰지 않고 오버라이드 함수에서 파일명을 직접 지정해도 됩니다.
- **글꼴**: 서버모듈 1.x는 `Down2Excel.jsp`의 `setDefaultFontName()`, `setFontName()`을 씁니다. `SheetDesign`이 0일 때는 `SetDefaultFontName`을, 1 또는 2일 때는 `SetFontSize`, `SetFontName`을 씁니다. 서버모듈 2.x는 `setHeaderFontName()`(헤더 글꼴), `setFontName()`(전체 글꼴)을 씁니다.
- **시트명**: 워크시트 이름은 `Down2Excel()`의 **`SheetName`** 인자로 지정합니다. `FileName`을 `SheetName` 자리에 넣으면 시트 이름에 파일명이 들어가고, 시트가 여러 개면 같은 이름이 반복되어 `[1]`, `[2]`가 붙습니다. `SheetName`을 지정하지 않으면 `sheet`로 만들어집니다.
- **TempFile(템플릿)**: `setTempRoot`에는 경로만 지정하고 파일명은 `TempFile` 인자로 지정합니다. `TempFile`이 xlsx이면 `FileName`도 xlsx로 받아야 합니다(확장자를 맞춤). 헤더 컨텍스트 메뉴로 받는 경우의 공통 설정은 `ibsheetinfo.js`의 `onSelectMenu` 오버라이드 안에서 인자를 추가했습니다.
- **머리글 이미지(워터마크)**: `setWebServerDomain`이 아니라 Sheet7·8 공통으로 `Down2Excel`의 **`TempFile`** 인자로 구현합니다. (1) 엑셀의 머리글 기능으로 이미지가 포함된 빈 엑셀 파일(템플릿)을 만들고 (2) 서버에 저장한 뒤 (3) `Down2Excel.jsp`의 사용자 환경 설정 #13을 참고해 저장 폴더를 `setTempRoot`로 지정하고 (4) 호출 시 `TempFile`에 파일명을 추가합니다. **`TempFile`을 쓰면 `SheetDesign`이 적용되지 않습니다.** 둘을 같이 쓰려면 `SheetDesign:1`로 일반 다운로드한 파일에서 데이터를 모두 지우고 헤더 색상, border를 남긴 채 머리글에 이미지를 추가해 템플릿으로 쓰라고 안내했습니다.
- **헤더 배경색**: 헤더 선언부에서는 지정할 수 없고 `ibsheet.css`에서 전체 시트의 헤더 배경색을 바꾸거나 개별 시트에서 `SetHeaderBackColor()`로 바꿉니다.
- **헤더 개행**을 위해 `/n` 같은 문자열을 넣었는데 엑셀에서 개행이 안 되는 사례는 그 사이트가 클라이언트 모듈로 대체해 쓰기로 해서 답변이 기록에 없습니다.
- `DownHeader:0`에서 `reportXML` 디자인이 적용되지 않는 현상과 헤더 행이 여러 개일 때 헤더 문구가 공란으로 나오는 .NET 현상은 각각 서버모듈 2.1.48(2026-08), .NET 2.0.0.6 dll 배포로 처리했습니다.

**키워드**: DownWaitImageVisible, OnDownFinish, 파일명 공통 지정, SetDown2ExcelConfig, GetDown2ExcelConfig, setFontName, setHeaderFontName, SheetName, TempFile, setTempRoot, 엑셀 머리글 이미지, SetHeaderBackColor, DownHeader

### [DWN-12] JSP를 쓸 수 없는 Spring 환경에서 서버모듈을 쓰려면 (컨트롤러 방식)

**질문**
- 제공하는 JSP를 java(컨트롤러) 쪽으로 빼서 엑셀 다운로드는 해결했는데 `DirectDown2Excel`은 어떻게 하는가?
- `Down2Excel.jsp`를 서블릿 형태로 바꾸는 방법은?
- Spring(`.do`) 컨트롤러에서 `IBSheetDown`을 쓰도록 구현했는데 호출이 되지 않는다. (프레임워크에서 JSP를 쓸 수 없는 환경)
- 컨트롤러 방식을 쓰면 메모리 누수 차단이나 최소 메모리 사용 기준으로 어떤 도움이 되는가?

**답변**
- 컨트롤러 방식은 특별히 코드가 바뀌는 것이 아니라 JSP에 있던 코드를 서블릿(컨트롤러)에서 호출되도록 옮기는 것입니다. 호출 URL은 `ibsheet.cfg` 또는 js에서 `Down2Excel` 함수를 호출할 때 바꿔 줍니다. (`Down2ExcelUrl` 메서드로 호출 URL을 동적으로 바꿀 수도 있음) 컨트롤러에서 하는 일은 `IBSheetDown` 객체 생성 후 `setEncoding("UTF-8")`, `setService(request, response)`, `setFileType("xlsx")`, `downToBrowser()` 호출입니다. 화면에서는 `grid.SetDown2ExcelUrl('/orgn/downExcel.do');`로 지정합니다.
- `DirectDown2Excel`도 도움말에 나온 내용 그대로(`/exportTest.do` 예제 참고) 컨트롤러에 구현합니다. `DirectLoadExcel`에서 `SHEETDATA`가 null이면 서블릿으로 작성하는 방법을 안내했습니다. ("엑셀 업로드가 느리거나 서버 메모리를 과하게 쓴다"([PRF-03]) 참고)
- JSP를 쓸 수 없는 환경은 포털 가이드("서버 모듈 다운로드(Down2Excel)/업로드(LoadExcel) 시 JSP를 쓸 수 없는 환경일 때")로 안내했고, 그 사이트는 `ibsheet.js`가 너무 낮은 버전이라 jar 교체를 보류했습니다.
- 컨트롤러 방식이 메모리 누수 차단이나 최소 메모리 사용에 어떤 도움이 되는지에 대해서는 연구소 답변을 재전달했다고만 기록되어 있습니다.
- 다른 톰캣 서버로 `Down2Excel.jsp`만 옮긴 사례에서는 `HSSFWorkbook cannot be resolved to a type` 같은 오류가 났는데, 이는 새 서버에 **POI와 dom4j jar가 없어** JSP가 컴파일되지 않은 것이었습니다. `Down2Excel.jsp`는 단독으로 동작하지 않으므로 기존 서버의 `WEB-INF/lib`에 있던 jar들(POI, dom4j, 관련 라이브러리)을 새 서버의 같은 위치에 복사하고 톰캣을 재시작해야 합니다. 구성은 `webapps/ROOT/jsp`에 `Down2Excel.jsp`, `LoadExcel.jsp`, `DirectLoadExcel.jsp`, `Down2Text.jsp`, `LoadText.jsp` 등을 두고, `webapps/ROOT/WEB-INF/lib`에 POI 3.13 관련 jar와 dom4j 등을 두는 것입니다. 이후 `ibsheet.cfg`의 `Down2Excel_Url` 등을 새 서버 주소로 바꿉니다. 오류가 나면 먼저 JDK 버전보다 POI 라이브러리가 신규 서버에 제대로 배치되어 있는지 확인하라고 안내했고, 신규 서버가 Tomcat 10 이상(JDK 상향)이면 `javax`에서 `jakarta`로 바뀌어 Jakarta 버전이 필요하다고 덧붙였습니다. 데이터가 많아 서버 WAS 메모리가 죽는 사례도 방문해서 jar와 파일들을 제 위치에 넣어 주는 방식으로 지원했습니다.

**키워드**: 컨트롤러 방식, JSP 없이 서버모듈, IBSheetDown, SetDown2ExcelUrl, Spring .do, DirectDown2Excel 컨트롤러, Down2Excel.jsp 이전, HSSFWorkbook cannot be resolved

### [DWN-13] 다운로드한 엑셀의 서식·색상·행 높이 옵션 (SheetDesign, TextToGeneral 등)

**질문**
- 엑셀 행 표준 높이가 16.5인데 `Down2Excel` 생성 엑셀 시트 행 높이도 조정하고 싶다.
- 데이터 행에 색상을 넣어서 다운로드할 수 있는가?
- 헤더의 특정 row, col에만 색상을 바꿀 수 있는가? (API에는 헤더 전체 변경만 있어 보인다)
- `SheetDesign:1`로 받았는데 헤더 배경색이 너무 옅은 회색이라 짙게 하고 싶다.
- 헤더 글자색을 흰색으로 바꿨는데 엑셀에서는 검은색으로 내려온다.
- 근무시간을 시간·분(예: 18, 00)으로 나눠 입력하는데 내려받은 양식의 서식이 [일반]이라 `00`이 비어서 올라간다. 다운로드 때 해당 컬럼 서식을 텍스트로 지정할 수 있는가?
- 엑셀 다운로드에 `=SUM(H2:H5)` 같은 함수식을 포함할 수 있는가?
- IE에서는 다운로드한 엑셀이 읽기 모드로 열린다.
- 하나의 시트에서 `removeAll()` → `search()`를 반복하며 조회 결과마다 엑셀 워크시트를 다르게 해서 한 파일로 받을 수 있는가?
- .NET 서버모듈은 Java 서버모듈과 차이가 많은데 쓸 수 있는 속성만 알려 달라.

**답변**
- **행 높이**: `Down2Excel()` 호출 시 `ExcelHeaderRowHeight`(헤더 행)와 `ExcelRowHeight`(데이터 행)를 설정합니다. 둘이 같으면 `ExcelRowHeight`만 설정하면 됩니다.
```
mySheet.Down2Excel({ExcelRowHeight:16.5})
```
- **색상**: `SheetDesign:1`로 색상·폰트 요소를 엑셀에 적용할 수 있지만, 배경색은 헤더 행에 적용된 것만 되고 **데이터 행의 배경색은 안 됩니다.** 헤더의 특정 셀 색상은 `SetCellBackColor()`로 바꿉니다(헤더 Row index는 0부터). `SheetDesign:1` 헤더 색은 브라우저 색상과 엑셀 팔레트가 완전히 같지 않아 엑셀 테마 중 가장 비슷한 색이 선택되므로, 더 짙게 하려면 시트 테마를 무채색 계열이 아닌 기본 테마(블루)로 쓰는 것을 고려하라고 안내했습니다. 헤더 글자색은 `Down2Excel.jsp`에서 **`setHeaderFontColor`** 주석을 풀고 색상을 지정합니다.
- **서식 옵션**(시트의 모든 컬럼이 영향을 받으며 특정 컬럼만 지정할 수 없음)
  - 서식을 지정하지 않은 컬럼은 엑셀에서 일반(General)으로, 포맷을 지정한 컬럼은 그 서식으로 내려옵니다.
  - `TextToGeneral:0`(기본 1): 텍스트 컬럼을 일반이 아닌 텍스트 서식으로 받고 싶을 때 설정.
  - `NumberTypeToText:1`(기본 0): 숫자 타입 셀을 Text 타입(텍스트 서식이 아님)으로 받고 싶을 때. `TextToGeneral:1`이면 일반 서식으로 내려오고 설정된 포맷은 무시됨.
  - `AllTypeToText:1`(기본 0): 모든 컬럼 타입을 Text 타입으로. 설정된 포맷은 무시됨.
```
// 텍스트 타입만 텍스트 서식으로
sheet.Down2Excel({TextToGeneral:0});
// 숫자형 컬럼을 text로
sheet.Down2Excel({NumberTypeToText:1, TextToGeneral:0});
```
- 엑셀 함수식은 다운로드·업로드에서 **제공하지 않습니다.**
- IE에서 읽기 모드로 열리는 것은 제품이 파일을 만드는 것과 관련이 없고 브라우저 환경이나 OS 사용자 권한 문제로 보인다고 답했습니다.
- 여러 번 조회한 결과를 워크시트별로 한 파일에 받는 방법은 **공개되지 않은 방법이며 정식 지원 기능이 아닙니다.** 가능한 사용을 자제하고, 오류가 나도 추가 패치는 어렵다는 전제로 안내했습니다. 조회가 끝날 때마다 `Down2Excel`을 `DebugMode:1`(요청이 나가지 않음)로 호출해 전문을 변수에 담아 두었다가 마지막에 `Down2ExcelBuffer`로 처리합니다. 워크시트를 다르게 하려면 조회마다 `SheetName`을 다르게 합니다.
```
var data = [];
data.push(mySheet.Down2Excel({DebugMode:1, FileName:"test.xlsx", SheetName:"sheet1"}));
// 최종 다운로드 시
Grids["g_down2ExcelBuffer"] = data.join("\x03")+"\x03";
mySheet.Down2ExcelBuffer(false);
```
- **.NET 서버모듈에서 지원하지 않는 속성**
  - `Down2Excel`: `AppendPrevSheet`, `DownSum`, `CheckBoxOnValue`, `CheckBoxOffValue`, `OnlyHeader`, `Merge`(기록 그대로), `PrintSetup`, `ExcelFontSize`, `ExcelHeaderRowHeight`, `URL`, `ExtendParamMethod`, `AllTypeToText`, `DownTreeHide`, `KeyFieldMark`, `TreeLevel`, `AutoSizeColumn`, `ExcludeSubSum`, `ComboValidation`, `TempFile`, `NumberFormatMode`
  - `LoadExcel`: `StartCol`, `UseDOM`
- **ExportMode**: 다운로드는 `ExportMode:2`(클라이언트 모듈), 업로드는 `ExportMode:1`(서버모듈)을 써야 하면 기본을 2로 두고 엑셀 업로드 때만 1로 설정하거나 다운로드 때 2로 설정합니다. ("DRM·암호가 걸린 파일을 브라우저에서 읽는 경우…"([DRM-03]) 참고)

**키워드**: ExcelRowHeight, ExcelHeaderRowHeight, SheetDesign, 헤더 배경색, setHeaderFontColor, SetCellBackColor, TextToGeneral, NumberTypeToText, AllTypeToText, 엑셀 서식 텍스트, 엑셀 함수식, DebugMode, Down2ExcelBuffer, .NET 지원 속성

### [DWN-14] 다운로드한 엑셀에서 헤더 색이 흰색이거나 머지·여러 그리드 합치기가 안 된다

**질문**
- `Down2Excel`로 받으면 특정 컬럼부터 헤더 색상이 흰색(없음)으로 보인다. (헤더 2줄, 컬럼 30~40개, 합계 영역도 같다)
- 내려받은 파일의 내용을 복사해서 새 엑셀 파일에 붙여 넣으면 헤더 색상이 변경된다.
- 헤더 색상과 글자색을 다르게 지정했는데 글자색이 적용되지 않는다.
- `Merge:1`을 설정했는데 엑셀에서 셀 머지가 되지 않는다. (`DownRows:"Visible"`, `HiddenColumn:1`, `SheetDesign:1`을 함께 설정)
- 65,000건이 넘는 경우 엑셀 두 번째 워크시트의 상단 검색 조건 부분이 머지되어 들어간다.
- 하나의 워크시트 안에 여러 그리드를 받을 수 있는가?
- 컬럼을 숨겼다 보였다 하는 화면에서 `Down2Excel`을 하면 화면에 보이는 것과 다른 컬럼들이 내려온다.
- 용지에 맞춰서 헤더 데이터를 자동으로 크기에 맞게 출력하고 싶다.
- `The maximum number of cell styles was exceeded. You can define up to 4000 styles in a .xls workbook` 오류가 난다.

**답변**
- **xls 포맷의 스타일 한계**: 컬럼이 40개 이상으로 많으면 시트의 style을 xls 포맷이 수용하지 못해 헤더 색상이 흰색으로 나오는 등의 문제가 생깁니다. **xlsx로 바꾸면 해결**됩니다. 헤더 색이 붙여 넣기 후 달라지는 현상도 xls로 내려받은 파일이어서 생긴 것이고, xlsx로 받으면 정상이었습니다. `The maximum number of cell styles was exceeded … 4000 styles in a .xls workbook` 오류는 xls 형식의 한도이며, 이 사례에는 덤프 생성 가이드 문서를 전달했습니다.
- **헤더 글자색**: 헤더 폰트 컬러는 서버 쪽 전문에 포함되어 넘어가지 않고 **`Down2Excel.jsp`의 `setHeaderFontColor()`** 로 설정해야 합니다. 모든 엑셀 다운로드에 적용되므로, 특정 시트만 다르게 하려면 `Down2ExcelUrl()` 메서드로 분리한 JSP를 호출하고 그 페이지에서 글자색을 바꿉니다.
- **`DownRows`를 설정하면 머지가 반영되지 않습니다.** 개발자 가이드의 부록 4 "엑셀 다운 시 머지 적용 처리" 부분을 참고하라고 안내했습니다.
- **65,000건 초과 시 두 번째 시트에 머지가 들어가는 문제**: 첫 번째 시트에 들어갈 `UserMerge`가 두 번째 시트에도 반영되면서 데이터가 깨지는 현상이며, 데이터 양이 많으므로 `FileName`의 확장자를 xlsx로 바꿔 받아 보라고 안내했습니다.
- **여러 그리드를 한 워크시트에**: `Down2ExcelBuffer`를 사용하고 두 번째 시트의 `Down2Excel()`에 **`AppendPrevSheet:true`** 를 줍니다.
- **숨긴 컬럼**: `Down2Excel()`은 숨긴 컬럼을 포함한 모든 컬럼이 내려옵니다. `HiddenColumn`을 쓰더라도 엑셀에서 숨기기만 한 것이므로 내려받는 컬럼 자체를 제어하려면 `DownCols`에 내려받을 컬럼을 지정합니다.
- **용지에 맞춘 출력**: 예전에 문의했을 때 템플릿 엑셀을 써야 한다는 안내를 받은 사이트에 `TempFile` 사용 방법을 안내했습니다. ("다운로드 파일명·시트명·글꼴·템플릿(TempFile) 옵션"([DWN-11]) 참고)

**키워드**: 헤더 색상 흰색, xls 스타일 한계, 4000 styles, setHeaderFontColor, Down2ExcelUrl, DownRows 머지, UserMerge, AppendPrevSheet, DownCols, HiddenColumn

### [DWN-15] 다운로드가 끝난 시점을 알고 싶다 (UseXhr, DownWaitImageVisible과 OnDownFinish)

**질문**
- `DownWaitImageVisible`을 설정하면 `OnDownFinish` 이벤트가 발생하지 않는다. `Down2Excel.jsp`에서 스크립트 태그를 보내서 다운로드 성공·실패 둘 다 처리하는 방법은 없는가?
- 쿠키가 차단되는 환경에서 대기 이미지 해제와 `OnDownFinish`를 쓰고 싶다.

**답변**
- **`UseXhr` 옵션**을 쓰면 다운로드를 **XHR(Ajax) 방식**으로 처리해 쿠키 설정 없이 완료 시점을 확인할 수 있습니다. 쿠키가 차단되는 환경에서 권장하는 방법입니다.
- 엑셀 다운로드는 기본적으로 화면에 숨겨진 iframe을 통해 form 전송 방식으로 처리되고, 이 방식에서는 브라우저가 파일을 직접 내려받기 때문에 화면의 스크립트가 다운로드 완료 시점을 알 수 없어 서버 응답에 설정되는 값(쿠키)으로 완료 여부를 판단합니다. `UseXhr`를 설정하면 요청이 form 전송이 아니라 XHR 방식으로 바뀌어 응답을 스크립트가 직접 받으므로 완료 시점을 바로 확인할 수 있고 완료 확인용 쿠키를 쓰지 않습니다. 그래서 쿠키가 막혀도 **대기 이미지 해제와 `OnDownFinish`가 정상 동작**합니다.
```
showLoading();
sheet.Down2Excel({
    UseXhr   : true,
    FileName : 'excel2.xlsx',
    SheetName: 'sheet-test'
});
function sheet_OnDownFinish() {
    hideLoading();
}
```
- 기존에 쓰던 인자(`FileName`, `SheetName`, `DownCols` 등)는 그대로 두고 `UseXhr`만 추가하면 되고 **서버모듈 쪽 수정 사항은 없습니다.**
- (참고) `DirectDown2Excel`에 `UseXhr:true`를 같이 쓴 사례(`ExtendParam`으로 파라미터 전송)에서 jar 교체 후 오류가 난 것은 `DirectDown2Excel.jsp`에서 `request.getParameter("Data")`를 `setData`하는 구문이 누락된 것이 원인이었습니다. ("Spring 환경에서 엑셀 다운로드·업로드가 …"([ENV-15]), "Spring Boot·프레임워크 환경에서 DirectDown2Excel을 쓸 때"([ENV-12]) 참고)

**키워드**: UseXhr, OnDownFinish, DownWaitImageVisible, XHR 다운로드, 쿠키 차단, 다운로드 완료 감지

### [DWN-16] ExtendParam에 JSON 같은 구조를 담아 서버(JSP)에서 꺼내려면

**질문**
- `LoadExcel`/`Down2Excel` 때 `ExtendParam`을 전달하는데 백엔드에서 어떻게 받는가? (서버모듈 1.1.126 기준) 파라미터가 여러 개이거나 배열·불린 같은 구조일 때는?

**답변**
- **동작 방식**: `Down2Excel`은 화면 시트의 데이터 전문을 POST body에 담아 서버로 전송하고, `ExtendParam`에 지정한 문자열은 그 전문 안에 함께 실려 전달됩니다. 서버에서는 `Down2Excel ibExcel = new Down2Excel(...)`, `ibExcel.setService(...)`로 전문을 파싱한 뒤 `ibExcel.getExtendParam()`으로 `ExtendParam` 문자열을 꺼냅니다. `ExtendParam`은 QueryString 형식(`키=값&키=값`) 문자열이며 `ExtendParamMethod`로 GET 또는 POST 중 어떤 방식으로 실을지 지정합니다.
- **클라이언트**: 전달할 값을 JSON 객체로 구성한 뒤 문자열로 직렬화해 하나의 키에 담습니다.
```
var jsonParam = {
    sawon_name : "홍길동",
    sawon_no   : "12345",
    deptList   : ["A001", "A002"],
    useYn      : true
};
mySheet.Down2Excel({
    FileName          : "IBLeaders.xlsx",
    ExtendParam       : "jsonParam=" + encodeURIComponent(JSON.stringify(jsonParam)),
    ExtendParamMethod : "POST"
});
```
- **서버(`Down2Excel.jsp`)**: (1) `ExtendParam` 문자열을 Map으로 바꾸는 헬퍼를 `<%! %>` 선언부에 추가합니다. `&`로 나눈 뒤 `=` 앞뒤를 키와 값으로 분리하고 값은 `URLDecoder.decode(val, "UTF-8")`로 디코딩합니다(이미 디코딩된 경우는 원본 유지). (2) `ibExcel.setService()` 이후, `makeExcel()` 호출 전에 `String exParam = ibExcel.getExtendParam();`로 받아 헬퍼로 Map을 만들고 `jsonParam`에서 JSON 문자열을 꺼내 파싱합니다. (json-simple의 `JSONParser`, `JSONObject`, `JSONArray`를 쓸 경우 해당 import 필요) 전달받은 값으로 DB 조회, 파일명·시트명 변경(`ibExcel.setSheetName(0, 이름 + " 근태내역")`) 같은 분기 처리를 할 수 있습니다.
- `DirectLoadExcel`의 `ExtendParam`을 받는 방법과 `setService` 이후에 호출해야 한다는 주의는 "업로드할 때 추가 인자(ExtendParam)로 서버에서 구분·전달하기"([UPL-01]), "다운로드 때 서버 오류…"([DWN-02])에 있습니다.

**키워드**: ExtendParam JSON, getExtendParam, ExtendParamMethod, encodeURIComponent, json-simple, Down2Excel 추가 파라미터

### [DWN-17] 다운로드 확장자를 모든 화면에서 xlsx로 기본 적용하려면

**질문**
- `Down2Excel`의 `FileName`으로 xlsx를 지정할 수는 있지만 화면이 많아서 `Down2Excel.jsp`에서 기본값을 xlsx로 적용하고 싶은데 설정하는 부분이 없다. (서버모듈 1.1.116)

**답변**
- 1.x 서버모듈에는 기본 다운로드 확장자를 `.xlsx`로 일괄 설정하는 옵션이 **없습니다.** 클라이언트가 보낸 XML 전문(`frm.Data`) 안의 `<FileName>` 태그 값을 그대로 읽어 파일명과 확장자를 만들도록 설계되어 있기 때문입니다. 그래서 JSP 대신 **클라이언트 쪽에서 공통 처리**하는 방식을 안내했습니다.
- **방법 1(권장) 공통 JS에서 `Down2Excel`을 재정의**합니다. 공통 script 파일에 래핑 함수를 추가하면 화면 수정 없이 일괄 적용됩니다. `FileName`이 있고 `.xlsx`로 끝나지 않으면 `.xls`를 제거하고 `.xlsx`를 붙이며, `FileName`이 없으면 기본값(`"download.xlsx"`)을 줍니다.
```
IBSheet.prototype.orgDown2Excel = IBSheet.prototype.Down2Excel;
IBSheet.prototype.Down2Excel = function(opt) {
  var options = opt || {};
  if (options.FileName) {
    if (!options.FileName.match(/\.xlsx$/i)) {
      options.FileName = options.FileName.replace(/\.xls$/i, '') + ".xlsx";
    }
  } else {
    options.FileName = "download.xlsx";
  }
  this.orgDown2Excel.apply(this, arguments);
};
```
- **방법 2 `OnBeforeDownload` 이벤트에서 전문의 `<FileName>` 값을 바꿉니다.** 시트 생성 시 공통 이벤트로 바인딩해 `type == "EXCEL"`이고 `frm.Data`가 있으면 `frm.Data.value`에서 `<FileName>`과 `</FileName>` 사이를 찾아 `.xls`를 제거하고 `.xlsx`를 붙인 뒤 `frm.submit()` 합니다(기존 이벤트가 있으면 그것을 호출).
- 다른 안내와 함께 보면, `Down2Excel.jsp`의 `down.setFileType("xlsx", true)`를 쓰는 방법(`"excel"`이 아니라 `"xlsx"`)도 있습니다. ("다운로드 파일명·확장자 문제"([DWN-04]), "엑셀 컬럼 수 한계(256), 폰트, 헤더 테두리 같은 서식 제한"([FMT-10]) 참고)

**키워드**: xlsx 기본 확장자, Down2Excel 재정의, OnBeforeDownload FileName, setFileType xlsx, 공통 처리

### [DWN-18] 다운로드한 엑셀의 헤더 색상·글자색이 화면과 다르다 (서버모듈 1.x와 2.x 차이)

**질문**
- 다운로드한 엑셀 파일에 시트의 헤더 색상이 적용되지 않는다.
- 화면에서는 헤더 배경색이 하늘색이고 글자색이 흰색인데 엑셀에서는 배경색이 진한 초록이고 글자는 흰색이다. (.NET)
- 헤더 글자색을 흰색으로 했는데 엑셀에서는 검은색으로 내려와 회색 배경에서 글자가 안 보인다. (`SheetDesign:1`)
- `keyField` 컬럼의 헤더 색상을 다르게 지정해 다운로드하려는데 헤더 행 첫 번째 셀의 색상이 그대로 적용되어 내려온다. 컬럼명에 색깔이 다르게 나오도록 했는데 서버모듈 1.x에서는 안 된다.
- 엑셀 다운로드 시 `fontcolor` 적용이 안 된다.

**답변**
- **헤더 색상이 적용되지 않는 경우**(`ibsheet.js` 7.0.13.218): 서버모듈 `ibsheet7-1.1.128.jar`를 배포해 해결했습니다.
- **첫 번째 헤더 셀에 색상이 있으면 모든 셀이 그 색으로 덮어쓰이는 오류**는 `ibsheet.js` 7.0.13.208에서 패치된 내용입니다. 따라서 `ibsheet.js`를 업그레이드해야 하며 업그레이드 관련 문서와 함께 배포했습니다.
- **헤더 텍스트별로 색상이 다르게 다운로드되는 기능은 서버모듈 2.x에만** 들어 있고 1.x를 사용하면서는 적용할 수 없습니다.
- **글자색 문제**: 이 패치는 `ibsheet.js` 7.0.13.208-20221007과 `ibsheet7-2.1.1-220929-1454.jar`에서 사용할 수 있습니다. 단 해당 사이트의 유지보수가 만료되어 유지보수가 되어야 진행 가능하다고 안내했습니다. 서버모듈 1.0에는 글자색 기능이 없고 2.0에는 있으며, 데이터가 많지 않다면 클라이언트 모듈로 다운로드해도 된다고 답했습니다. `Down2Excel.jsp`의 `setHeaderFontColor()`로 설정하는 방법도 있습니다. ("다운로드한 엑셀에서 헤더 색이 흰색이거나 머지·여러 그리드 합치기가 안 된다"([DWN-14]) 참고)
- **.NET에서 엑셀 모듈을 업데이트한 뒤 헤더 디자인이 달라지는 현상**은 수정된 패치 버전(dll)을 배포했습니다. 첨부된 패치 파일 이름에서 확장자의 `_`(언더바)를 제거하고 사용합니다. (2026-03)
- 새 jar를 적용해도 로그에 바뀐 버전이 나오지 않는 경우(`ibsheet7` jar가 로그의 user library 위치에 없음)는 컨테이너 lib나 다른 user library 폴더를 확인하라고 했고, 서버에서 `find` 명령으로 `ibsheet7-x.jar`의 위치를 찾아 교체하게 했습니다. 교체가 잘 되면 `Down2Excel` 시 jar 버전을 찍는 로그에 바뀐 버전이 나옵니다.

**키워드**: 헤더 색상 엑셀, 헤더 글자색, SheetDesign, ibsheet7-1.1.128, ibsheet7-2.1.1, 서버모듈 2.x 전용 기능, .NET 헤더 디자인

## UPL · 엑셀·텍스트 업로드

### [UPL-01] 업로드할 때 추가 인자(ExtendParam)로 서버에서 구분·전달하기, DirectLoadExcel의 FP 페이지 연결

**질문**
- `ExtendParam:param` 값을 `DirectLoadExcel.jsp`에서 어떻게 쓰는가?
- `LoadExcel.jsp`의 주석 구간(업로드 파일을 서버에 저장)을 모든 화면에 쓰지 않고 일부 화면에만 적용하려고 `LoadExcelSaveFile.jsp`라는 JSP를 따로 만들고 `ibsheet.cfg`도 고쳤더니 `LoadExcelSaveFile is not a function`이 난다.
- `DirectLoadExcel`이 FP 페이지로 잘 넘어가고 FP 페이지에서 처리도 잘 되었는데 대기 이미지가 닫히지 않고 응답 데이터가 실행되지 않는다.
- `DirectLoadExcel`이 되지 않는다. (서버모듈 1.0 사이트를 2.0으로 올린 경우)
- 컬럼 순서를 바꾼 뒤 `DirectLoadExcel`로 올렸더니 잘못된 값이 들어간다.
- `gridEdtFileUpload` 같은 공통 함수의 콜백 파라미터에 업로드 파일명을 넣고 싶다.
- `DirectLoadExcel` 샘플이 필요하다.
- LoadExcel/LoadText JSP가 파일을 잘 읽고 HTML 코드를 돌려주는데 데이터가 화면에 반영되지 않는다. (덤프에는 서버에서 정상적으로 데이터를 전송)

**답변**
- 화면에서 보낸 `ExtendParam`은 `이름=값&이름=값` 형태의 querystring입니다. 서버에서는 `load.getExtendParam("이름")`으로 값을 꺼냅니다. (예: `load.getExtendParam("brand_cd")`) 화면에서 보낸 `FP`, `PID`도 같은 방식으로 받습니다.
- 일부 화면에서만 다르게 처리해야 하면 JSP를 따로 만들 필요 없이 **`LoadExcel` 호출 때 `ExtendParam`을 같이 보내 화면을 구분**하고, `LoadExcel.jsp`에서 다음 세 값으로 서버에 파일을 쓰는 로직을 구현하면 됩니다. 새 함수(`LoadExcelSaveFile`)는 제품에 없는 이름이므로 호출할 수 없습니다.
```
File uploadFile = load.getUploadFile();
String uploadFileName = uploadFile.getName();
String uploadFilePath = uploadFile.getAbsolutePath();
```
- **FP 페이지 연결(서버모듈 1.0 → 2.0)**: 화면에서 `DirectLoadExcel({ExtendParam:"FP=../DirectLoadExcel_data.jsp&PID=p01223"})`로 호출하면 `DirectLoadExcel.jsp`가 `FP`로 지정한 페이지로 포워딩해야 합니다. 서버모듈 1.0에서는 `ExtendParam` 값을 꺼내는 기능이 없어 jar를 디컴파일해 로직을 JSP에 넣고 `getRequestDispatcher`를 고쳐 쓰던 사이트였습니다. 서버모듈 2.0에서는 `ExtendParam` 값을 꺼내는 함수와 FP를 다시 설정하는 함수가 있으므로 **`sendDirectToFP` 대신 `sendDirectTo`** 를 써서 FP 페이지를 다시 지정합니다.
```
String url = load.getExtendParam("FP");
String PID = load.getExtendParam("PID");
load.sendDirectTo(url+"?PID="+PID);
```
- FP 페이지에서 대기 이미지가 닫히지 않던 사례는 FP 페이지에서 결과 코드를 설정하는 코드(`pageContext.setAttribute("resultCode", resultCode);`, `pageContext.setAttribute("resultMsg", resultMsg);`)가 **누락**되어 결과 코드가 전달되지 않은 것이었습니다.
- 응답 데이터가 실행되지 않던 사례는 `LoadExcel`/`LoadText` JSP가 HTML(`<script>window.parent.postMessage(...)`)을 돌려주는데 `Content-Type`이 `application/json`으로 나가고 있어서였습니다. JSP에서 `response.setContentType("text/html;charset=utf-8");`, `response.setCharacterEncoding("utf-8");`를 추가해 보도록 안내했습니다. (다운로드는 jar에서 `setContentType`을 설정해 주므로 JSP에서 필요하지 않음)
- 컬럼 순서를 바꾼 뒤 잘못된 값이 들어간 사례는 컬럼 생성 순서를 바꾸면서 `LoadExcel` 때 쓰는 **`ColumnMapping`이 바뀐 컬럼 순서와 맞지 않았기 때문**이었습니다. 제품은 정상적으로 패치되어 있었습니다.
- 콜백의 `d` 파라미터에 파일명이 들어 있습니다.
```
var params = { Mode : 'FullText', CallBack: function(d){ console.log(d); } }
// {"Result":{"Code":1,"Message":"ExcelDone"},"fileType":"text","fileExt":"xlsx","fileName":"…","sheetData":[]}
```
- 서버모듈 1.x용 `DirectLoadExcel` 샘플이 필요한 사이트에는 샘플을 전달했습니다.

**키워드**: ExtendParam, getExtendParam, DirectLoadExcel, FP, sendDirectTo, sendDirectToFP, getUploadFile, ColumnMapping, 업로드 파일명 콜백, Content-Type text/html, 대기 이미지 안 닫힘

### [UPL-02] 파일 선택 후 아무 반응이 없거나 로딩만 계속된다 — 환경 원인 점검 (보안 프로그램, Nginx, 확장 프로그램)

**질문**
- 엑셀 업로드 시 파일 탐색기는 열리는데 선택 후 아무 반응이 없고 네트워크 통신도 없다.
- 특정 PC에서만 로딩 화면이 반복되며 업로드가 안 된다.
- 테스트 서버에서는 잘 올라가는 엑셀이 운영 서버에서는 계속 처리중 이미지만 나타난다.
- 로컬에서는 업로드가 되는데 서버에 반영하면 업로드가 실행되지 않는다. (덤프 첨부)
- 일부 PC에서 `1033 인코딩에 대해 사용할 수 있는 데이터가 없습니다`(.NET)라는 메시지와 함께 업로드가 되지 않는다.

**답변**
- **보안 프로그램이 파일 전송을 막은 사례**: 사내 보안 프로그램이 파일 전송을 막아 두었고, 이전 담당자가 요청해 특정 사이트만 허용했는데 허용 기간이 지난 것이었습니다. 허용을 다시 받아 해결했습니다.
- **브라우저 확장 프로그램이 전송을 막은 사례**: 사내 정책으로 설치된 확장 프로그램이 있어 특정 PC만 전송이 안 되었습니다. 시크릿 모드로 실행하면 파일이 정상 전송되어 그렇게 쓰도록 안내했습니다.
- **Nginx 신규 설치로 요청 크기 제한에 걸린 사례**: 로그가 없어서 확인해 보니 `/LoadExcel.jsp?SheetWork=LoadExcel`에서 `413 (Request Entity Too Large)`가 발생했습니다. 서버 쪽 요청 크기 제한을 확인합니다.
- 서버로 전송된 파일을 서버에서 정상적으로 읽었다는 덤프 응답(`ExcelDone`)이 있는데 화면에 반영되지 않으면 응답의 Content-Type을 확인합니다. ("업로드할 때 추가 인자(ExtendParam)로 서버에서 구분·전달하기"([UPL-01]) 참고)
- 엑셀 다운로드/업로드는 모두 **서버에서 처리하는 동작이므로 PC와는 무관**합니다. 문제의 PC에서 편집해 저장한 파일을 정상 PC에서도 올릴 수 없다면 그 PC의 엑셀 문제나 데이터 문제로 보입니다. 이 사례는 개발자 도구 콘솔에서 `Down2Excel()`을 직접 실행하며 xlsx 확장자 `FileName`으로 받은 파일을 문제의 PC에서 편집 후 업로드해 보라고 안내했고, 같은 내용의 경험이 없어서 원인은 기록에 없습니다.
- 서버 로그를 보려면 `LoadExcel.jsp`의 try-catch에서 `e.printStackTrace();` 주석이 풀려 있는지 확인합니다. 다운로드가 특정 화면에서만 안 되는 것인지도 같이 확인하고, 디자인 파일(템플릿)을 쓰는 경우에는 `Down2Excel.jsp`의 `setTempRoot()` 경로가 맞는지 확인합니다.

**키워드**: 업로드 무반응, 파일 선택 후 반응 없음, 보안 프로그램 파일 전송 차단, 크롬 확장 프로그램, 시크릿 모드, Nginx 413, Request Entity Too Large, 특정 PC만 안 됨

### [UPL-03] 업로드한 값이 달라진다 (소수점 버림, 날짜에 000000, 반올림, '^' 문자)

**질문**
- 엑셀에서 계산식으로 나온 값(화면에는 46, 실제는 45.5)을 업로드하면 소수점이 버려진다. (`Type:AutoSum`, `Format:"#,##0"`)
- `Type:Text` 컬럼에 날짜를 올리면 `"20250201000000"`처럼 `000000`이 붙어서 온다.
- 엑셀 업로드 시 특정 데이터의 소수 자리가 반올림된다.
- `LoadExcel` 시 `msg`에 `^`가 있으면 `OnLoadExcel`이 동작하지 않는다.
- 엑셀 업로드 시 `\t` 문자가 있으면 데이터가 로드되지 않는다. (`Mode:"FullLoad"`)
- 컨텍스트 메뉴에서 엑셀 업로드를 쓰는데 시트의 마지막 줄에 이상한 문자가 들어간다.
- 은행명 컬럼에 `A`라고 쓰고 올렸더니 `A은행`로 인식되고 아래 셀도 덮어써진다.

**답변**
- 소수점 버림은 업로드 값이 그대로 올라온 뒤 **`Format`에 따라 버림 처리된 것**입니다. 소수점 몇 자리까지 처리하고 그 이하는 어떻게 할지 업무 요건을 정해야 합니다. 예를 들어 소수점 2자리에 나머지는 버림 처리라면 다음과 같이 설정합니다.
```
Type:AutoSum, Format:"#,##0.#0", Approximatetype:"2"
```
- 날짜에 `000000`이 붙는 것은 `Type:Text` 컬럼에 날짜 데이터를 쓰고 포맷을 지정하지 않으면 엑셀에서 시·분·초까지 모두 붙어서 나오기 때문입니다. `Format:"Ymd"` 또는 `Format:"yyyy-MM-dd"`처럼 포맷을 지정합니다.
- 소수 자리 반올림 문제는 개발팀 이슈 링크로만 전달되어 답변 내용이 기록에 없습니다. `msg`에 `^`가 있을 때 `OnLoadExcel`이 동작하지 않는 문제는 제품 7.0.13.243과 서버모듈 2.1.17을 배포했습니다.
- `\t`가 들어 있으면 JSON.parse 오류가 나는 문제는 데이터 파서 부분을 아래처럼 바꾸면 더 유연하게 파싱할 수 있다고 안내했습니다(JSON.parse보다 느림).
```
var A;
try{
  A = new Function("return " + data.replace(/^[^\<\{]*\{/, '{').replace(/\}[^\}]*$/, '}'));
  A = A();   // A.Result.Code 등
}catch(e){ }
```
- 마지막 줄에 이상한 문자가 들어간 사례는 `onLoadExcel`에서 바인딩되는 데이터의 특정 컬럼 값으로 공통 코드를 가져와 넣을 때 **전체 행 수를 잘못 계산**했기 때문입니다. 필터 행이 있으면 마지막 행까지 넣어야 하는데 그렇게 하지 않아 생긴 오류였습니다.
- 은행명 `A` → `A은행` 사례는 해당 컬럼의 정보와 내부 로직을 고객 쪽(해당 시스템)에서 만든 것이어서 유지보수 업체에 문의하도록 안내했습니다.

**키워드**: 엑셀 업로드 소수점, Format 버림, Approximatetype, 날짜 000000, Format Ymd, 반올림, ^ 문자, \t JSON.parse, onLoadExcel 행 수 계산

### [UPL-04] 업로드할 때 특정 컬럼만 반영하거나 수정 가능한 컬럼을 제한하고 싶다

**질문**
- 엑셀 다운로드 후 특정 컬럼만 수정해서 올려야 하는데 옆 컬럼을 잘못 수정해도 업로드되지 않게 할 수 있는가?
- 선별해서 다운로드한 엑셀에서 2개 컬럼(C, D) 데이터만 고쳐서 올렸을 때 그리드의 C, D만 반영하고 싶다. 현재는 hidden 컬럼과 표시 컬럼 값까지 모두 바뀐다. (그리드와 엑셀의 컬럼 순서가 다르다)

**답변**
- 특정 컬럼 이외에는 수정되었어도 업로드되지 않게 하는 기능은 **제공하지 않습니다.** 엑셀 다운로드/업로드는 시트의 데이터를 전문으로 뽑아 엑셀을 만들거나 시트에 로드하는 기능만 제공합니다.
- 필터링 등으로 보이는 데이터만 받고 싶다면 `Down2Excel`에서 `DownRows:"Visible"`을 설정합니다.
- 올린 파일을 기존 데이터에 반영하는 것은 같은 시트에서는 처리할 수 없습니다. 들어오는 파일의 행 수, 컬럼 수가 기존 데이터와 맞는지 서버에서 검증할 수 없어 화면 데이터는 무조건 삭제 후 처리되기 때문입니다. 꼭 필요하다면 **숨긴 시트를 하나 더 만들어** 다음 순서로 처리하는 방법이 가능하다고 안내했습니다.
  1. 화면에 보일 시트(A)와 감춰진 시트(B)를 같은 형태로 생성
  2. 조회 조건에 따라 보이는 데이터를 엑셀로 다운로드
  3. 사용자가 엑셀에서 원하는 컬럼의 데이터를 변경
  4. 감춰진 시트(B)로 엑셀 업로드
  5. B 시트의 `OnLoadExcel()` 이벤트에서 C, D 컬럼의 데이터를 `getRangeValue()`로 추출
  6. 추출한 데이터를 A 시트에 `setRangeValue()`로 반영
  - 주의: 감춰진 시트의 데이터 건수가 보이는 건수보다 많으면 붙여넣기가 안 될 수 있고, 엑셀 업로드 시 서버 오류가 나면 반영되지 않을 수 있습니다. 사용자 편집을 C, D만 하고 서버 저장도 C, D만 되어야 한다면 화면에서 제어하기보다 서버에서 C, D만 업데이트하도록 처리하는 것이 맞다고 했습니다.

**키워드**: 특정 컬럼만 업로드, 업로드 컬럼 제한, DownRows Visible, 숨김 시트, getRangeValue, setRangeValue, 엑셀 업로드 반영 범위

### [UPL-05] 텍스트(CSV) 업로드의 인코딩·BOM 문제

**질문**
- 외부 기관에서 받은 수신 파일(EUC-KR로 추정)을 `LoadText`로 올리면 한글이 깨진다. 파일을 수정하지 않고 바로 올리고 싶다.
- CSV를 다운로드해서 엑셀로 열면 한글이 깨지는데 메모장으로 열면 정상이다.
- 엑셀에서 만든 CSV(셀 하나에 탭으로 구분)를 올리면 파일이 잘 올라가지 않는다. 메모장으로 열면 각 행의 앞뒤에 `"`가 붙어 있다.

**답변**
- **LoadText 인코딩**: EUC-KR 파일을 그대로 올릴 수 있도록 기능을 추가해 배포했습니다. 다운로드한 ANSI CSV를 로드하려면 `sheet.LoadText({Encoding:"EUC-KR"})`처럼 설정합니다.
- **CSV 다운로드 인코딩**은 `Down2Excel.jsp`의 `setDownEncoding` 함수로 정해지고, 설정하지 않으면 운영 시스템의 기본 문자셋으로 받습니다. 기본 문자셋이 UTF-8이면 엑셀로 열 때 BOM이 없어 한글이 깨져 보입니다. 해결 방법은 두 가지입니다.
  1. ANSI로 다운로드: `ibText.setDownEncoding("EUC-KR");` 로 설정합니다. 이 파일을 엑셀로 열어도 깨지지 않습니다.
  2. UTF-8로 받으면서 BOM 설정: `ibText.setBomType(TextOption.UnicodeBomType.UTF8);`가 `Down2Excel.jsp`(테스트 쪽 JSP)에 설정되어 있어야 하고(주석 해제), `LoadExcel.jsp`에도 `ibText.setRemoveBom(true);`가 있어야 합니다(주석 해제). 확장자에 `x`가 붙은 배포 파일은 `x`를 지우고 사용합니다.
- 엑셀에서 만든 CSV가 올라가지 않던 사례는 두 가지가 겹친 것이었습니다. 하나는 한 셀에 탭으로 컬럼을 구분해 헤더 행과 데이터 행을 만들다 보니 각 행의 앞뒤에 `"`가 붙은 것이고, 다른 하나는 인코딩이 **UTF-8(BOM)** 이어서 첫 셀이 들어가지 않은 것입니다. `LoadText.jsp`에서 `ibText.setRemoveBom(true);`를 설정하거나 메모장에서 다른 이름으로 저장하면서 UTF-8(BOM 없음)로 저장하도록 안내했습니다.

- **데이터에 콤마가 있는 CSV**: `LoadText`로 읽을 때 정상적이지 않던 현상은 패치해 배포했습니다(제품 7.0.13.236, `ibsheet7-2.1.13`, 기존 jar는 삭제 후 적용).
- **`Down2Text`로 받은 파일을 `LoadText`로 올리면 안 올라가는 사례**: 서버모듈 2.1.9 배포 후 (1) 화면에 보이는 컬럼 수와 파일 내 컬럼 수가 같아야 하고 (2) 헤더 행의 **`KeyFieldMark`를 인식하지 못하므로** 그 마크를 제외하고 헤더 텍스트를 넣어야 한다고 안내했습니다.
- **텍스트 업로드 인코딩 옵션(2016~)**: `LoadText` 메서드에 `Encoding` 속성을 추가했고(`mySheet.LoadText({"Encoding":"euc-kr"})`), `LoadText.jsp`에는 `setLoadEncoding` 전역 메서드를 추가했습니다(서버모듈 1.1.85). `LoadText.jsp`의 `setLoadEncoding`이 `LoadText` 메서드의 `Encoding`보다 우선하므로 메서드의 `Encoding`을 쓰려면 `LoadText.jsp`의 `setLoadEncoding` 줄을 주석 처리합니다. 리눅스/JEUS에서 ANSI csv가 깨지면 `ibText.setLoadEncoding("euc-kr")`로 강제하는 안내도 있었습니다. (원래 기본 euc-kr이지만 설정이 안 먹는 경우)

**키워드**: LoadText, Encoding EUC-KR, setDownEncoding, setBomType, setRemoveBom, UTF-8 BOM, CSV 한글 깨짐, 첫 셀 누락

### [UPL-06] 업로드 오류를 사용자에게 알리고 메시지를 바꾸려면 (MaxRows, 헤더 불일치, 파일 크기 초과)

**질문**
- `LoadExcel.jsp`의 `setMaxRows`로 건수 제한이 걸렸을 때 try-catch의 exception/error를 타지 않고 `OnLoadExcel`로 `result:false`, `Code:-1`이 온다. 안내 메시지를 주고 싶은데 어디서 담아야 하는가?
- `load.setMaxFileSize(1024*5)`로 제한했을 때 돌아오는 메시지 이름을 바꾸고 싶다.
- `onLoadExcel()` 처리를 각 화면마다 넣어야 하는가?
- 서버에서 파일 용량을 확인해 다운로드를 막도록 구현했는데 화면에서 `OnDownFinish`를 발생시키고 대기 이미지를 닫고 싶다.
- 서버에서 예외가 났을 때 대기 이미지를 닫고 이벤트를 발생시키고 싶다. (.NET)

**답변**
- `MaxRows`, `MaxColumns`, `StrictHeaderMatch`를 설정했을 때는 Exception이나 Error 메시지로 가지 않고 **`LoadExcel`의 반환 메시지**로 전달됩니다. `OnLoadExcel()` 콜백에서 `result`, `code`, `msg`로 확인합니다.
  - 행 수 초과: `{Code:-1, Message:"OverMaxRow"}`
  - 헤더 매치 오류: `{Code:-2, Message:"NoMatchedHeader"}`
  - 컬럼 수 초과: `{Code:-3, Message:"OverMaxColumn"}`
  이 `Message`는 `ibmsg`의 `"Text":{"SYS_"+Message : ""}` 키로 처리되며 설정된 value가 사용자에게 보입니다. 보이는 메시지를 바꾸려면 `ibmsg`에서 해당 키를 찾아 수정합니다.
- `onLoadExcel()`을 화면마다 넣을 필요 없이 **이벤트를 오버라이드**해 공통으로 처리합니다. (`ibsheetinfo.js`의 `ibsheet_OnLoadExcelEventOverride`가 예)
- **파일 크기 초과 메시지**는 `LoadExcel.jsp`의 catch에서 `e.getMessage()`가 `-10^OverMaxFileSize`인지 분기해서 직접 출력합니다.
```
} catch (Exception e) {
  OutputStream out2 = response.getOutputStream();
  if("-10^OverMaxFileSize".equals(e.getMessage())){
    out2.write(("<script>alert('파일사이즈를 초과 하였습니다.'); </script>").getBytes());
  }else{
    out2.write(("<script>var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[0].LoadExcelError(); </script>").getBytes());
  }
  out2.flush();
}
```
- **다운로드 중 서버 예외**: 서버에서 예외가 났을 때 시트의 대기 이미지를 없애고 alert를 띄우는 방식은 기본 구현이 아니며 `OnDownFinish`는 발생시킬 수 없습니다. 시트는 숨겨진 iframe으로 서버와 통신하므로 iframe 쪽으로 script 태그를 돌려주면 됩니다. `Down2Excel.jsp`의 Exception 처리 부분에서 `<script>alert('…'); … targetWnd.Grids[0].HideProcessDlg(); </script>`를 출력합니다. `Grids` 배열을 순회하며 `HideProcessDlg()`를 호출하면 시트가 여러 개인 화면에서도 처리할 수 있습니다. .NET 서버모듈은 같은 취지로 1.1.0.29 dll과 `loadexcel.aspx`를 배포했습니다.

**키워드**: OnLoadExcel, OverMaxRow, OverMaxColumn, NoMatchedHeader, OverMaxFileSize, ibmsg SYS_, HideProcessDlg, LoadExcelError, 서버 예외 처리, 대기 이미지 닫기

### [UPL-07] 헤더 불일치·StartRow·ColumnMapping·여러 시트 업로드

**질문**
- 헤더 길이가 20자를 넘으면 데이터가 빈 값으로 올라간다. 내려받은 파일을 바로 올리면 되는데 수정해서 올리면 특정 컬럼만 안 올라간다. (.NET)
- 헤더매치를 썼는데 빈 행만 올라온다. 조회된 데이터를 그대로 내려서 올려도 같다.
- 시트의 헤더는 2줄인데 엑셀 파일의 헤더는 1줄이다. 파일이 올라가지 않는다.
- `columnMapping`이 무슨 뜻인가?
- 엑셀 파일에 시트가 여러 개인데 시트별로 그리드에 올릴 수 있는가?
- `.xlsm` 확장자를 업로드할 수 있는가?
- 서버에 있는 엑셀 파일을 `LoadExcel.jsp`에서 불러와 시트로 보낼 수 있는가?
- `LoadText`로 올리는 텍스트 파일 전체를 첫 칸에 넣을 수 있는가?
- 엑셀 업로드 시 파일 열기 마법사(대화창)에 데이터가 두 줄만 보인다.

**답변**
- 헤더 길이 문제의 원인은 헤더 텍스트 **끝에 붙은 `\n`** 이었습니다. 내려받은 엑셀을 바로 올리면 `\n`까지 포함해 비교해 들어가지만, 파일을 수정하면 엑셀이 헤더 끝의 `\n`을 지우는 것으로 보이고 그 컬럼들의 데이터가 사라집니다. 헤더 텍스트에 붙은 `\n`을 제거하라고 했습니다.
- 빈 행으로만 올라온 사례는 `startRow`를 2로 넣어 문제가 된 것으로, `Down2Excel`로 내려받은 엑셀에 title을 설정하지 않았다면 `startRow`를 따로 설정할 필요가 없습니다. 1로 넣거나 빼고 올리라고 안내했습니다.
- 화면 헤더는 2줄이고 엑셀 헤더는 1줄인 경우는 엑셀의 헤더를 맞추거나 `Mode`를 `NoHeader` 또는 `HeaderSkip`으로 써야 합니다.
- `columnMapping`은 엑셀의 컬럼 index를 시트의 index에 매핑하는 설정입니다. 예를 들어 엑셀의 3번째 컬럼을 시트의 첫 번째에 넣고 싶으면 `columnMapping:'3|2|1'`과 같이 지정합니다.
- 다중 시트 업로드는 `LoadExcelBuffer()`를 이용해 `LoadExcel()` 할 때 **`WorkSheetNo`를 매핑**해 쓰도록 안내했습니다.
- **지원 확장자는 `xls`, `xlsx`뿐**이라서 `.xlsm`은 업로드할 수 없습니다. (다른 사례에서는 화면에서 `LoadExcel({FileExt:"xls|xlsx|xlsm"})`로 허용하고, `LoadExcel.jsp`에서 `xlsm`이면 그 파일을 읽어 다시 엑셀 파일로 저장한 뒤 그 엑셀을 읽어 들이는 방식으로 처리했다는 기록이 있습니다. 서버 내 파일을 시트로 보내려는 질문도 같은 형태였습니다.)
- `LoadText`는 각 열 사이에 구분자(기본은 탭 `\t`)가 필요하고, 컬럼에 맞는 헤더 정보도 필요합니다. 텍스트 전체를 첫 칸에 넣는 용도로는 쓸 수 없습니다. 데이터를 시트에 올리지 않고 뽑아서 서버로 보내는 것이 목적이면 `onLoadData` 시점에서 로드되는 데이터를 꺼내 처리하는 방법이 있습니다.
- 업로드 대화창에 데이터가 두 줄만 보인 사례는 화면 해상도가 낮게 설정되어 화면이 크게 보이면서 시트가 보여질 영역이 작아져서 생긴 것으로 보고, 해상도를 바꾸고 배율을 100%로 설정해 보도록 안내했습니다.
- 한 사이트가 자체 엑셀 업로드 경로(고객사 쪽 `ExcelAction.do`)에서만 특정 컬럼이 로드되지 않았고 IBSheet의 `LoadExcel.jsp`를 직접 호출하면 잘 되어, 해당 로직을 만든 업체에 문의하도록 안내한 사례도 있습니다.

- 엑셀 파일에서 **`LoadExcel`은 첫 번째 탭의 worksheet를 우선 로드**하며, 시트의 헤더가 2줄이면 엑셀의 헤더 텍스트도 2줄이어야 합니다. 시트 헤더 텍스트를 복사해 파일 헤더에 붙여 넣어도 안 올라가던 사례는 이 조건 때문이었습니다. 헤더 3줄 시트에서 `HeaderMatch`가 이상하게 올라가는 문제와 헤더 텍스트에 `
`이 포함될 때 매칭되지 않는 문제는 패치 배포로 처리했습니다. `KeyField`를 넣은 헤더 아이콘 때문에 업로드가 안 되던 사례는 헤더를 제외한 값을 `StartRow`로 잡고 있었던 것이 원인이었습니다.

**키워드**: 헤더 불일치, 헤더 \n, StartRow, HeaderMatch, HeaderSkip, NoHeader, ColumnMapping, WorkSheetNo, LoadExcelBuffer, xlsm, LoadText 구분자

### [UPL-08] 업로드 임시 폴더(TempFolder) 미지정·권한 문제

**질문**
- 로컬에서는 엑셀 다운로드가 잘 되는데 개발 서버에서는 안 된다. (확인해 보니 업로드가 안 되는 것이었다)
- 엑셀 파일을 읽으면 문자열이 깨져 나오고 "엑셀 파일을 읽는 도중 예외가 발생하였습니다"가 뜬다. 서버 로그에 `FileNotFoundException`이 있다.
- `java.io.FileNotFoundException: d:\….xlsx (Access is denied)`가 난다.
- 업로드 시 `setTempFolder` 폴더에 쓰는 시점이 언제인가? 폴더가 없으면 만들어 주는 로직이 없는가?
- 엑셀 업로드 창은 뜨는데 로딩창이 뜨면 콘솔에 에러가 난다.
- 엑셀 로드 때 에러가 나는지 로그로 확인하고 싶다.

**답변**
- 업로드가 안 되는 가장 흔한 환경 원인은 **`LoadExcel.jsp`의 `setTempFolder`가 지정되지 않았거나 지정한 폴더에 접근 권한이 없는 것**입니다. `LoadExcel.jsp` 사용자 환경 설정 #2에서 임시 폴더 경로를 정확히 지정하고 권한이 있는 폴더(예: `d:/` 드라이브 권한이 없던 사례는 권한이 있는 폴더로 변경)로 바꾸면 해결되었습니다. 업로드 때 쓰는 폴더를 바꾸려면 `setTempFolder` 정보를 변경합니다.
- 폴더가 없으면 만드는 로직을 넣으려고 검토했지만 윈도우 서버가 아닌 환경에서는 권한 설정 때문에 만들어도 의미가 없을 것이어서, **서버를 처음 설정할 때 폴더를 만들고 권한을 설정**하는 것이 맞다고 답했습니다.
- 서버 로그는 `LoadExcel.jsp`의 try-catch에서 `e.printStackTrace();` 주석을 풀어 확인합니다.
- 로딩창 뜰 때 콘솔 에러가 나는 사례는 권한 문제로 판단했으나 연락이 없어 종료되었습니다.

**키워드**: setTempFolder, 업로드 임시 폴더, Access is denied, FileNotFoundException, 폴더 권한, 엑셀 파일을 읽는 도중 예외, e.printStackTrace

### [UPL-09] 업로드 건수가 많을 때 빈 행(SkipEmptyRow)·동시 처리(Synchronizer)

**질문**
- 10개 행 정도의 데이터를 올리는데 서버에서는 몇만 건이 루프를 돌다가 뻗었다.
- `DirectLoadExcel.jsp`의 `Synchronizer.init(1);`이 병행 처리 작업 개수를 정의하는 것으로 아는데, 설정해도 처음 요청 한 건만 진행되는 건가?

**답변**
- 엑셀에서 `Ctrl+End`를 누르면 엑셀이 인식하는 맨 마지막 행으로 이동합니다. 10개 행이라고 생각해도 몇만 건 아래까지 포커스가 가는 파일일 수 있습니다. 이 경우 `LoadExcel`에서 `SkipEmptyRow`를 설정하면 처리됩니다. 최신 매뉴얼과 가이드를 메일로 다시 안내하기로 했습니다. ("엑셀 업로드에서 서버가 죽는다"([PRF-07]) 참고)
- `Synchronizer.init(n)`은 동시에 처리할 엑셀 작업 개수와 관련된 설정으로, 질문 사례는 7.1.121 모듈을 전달했다는 기록만 있고 동작 설명은 남아 있지 않습니다. (다른 사례에서 `Synchronizer.init(5)`/`Synchronizer.use(false)` 같은 설정을 2점대 제품에서 대체할 방법을 묻는 질문은 `ibsheet7-2.1.42.jar` 배포로 처리되었으며 대체 함수는 기록에 없습니다.)

**키워드**: SkipEmptyRow, Ctrl+End, 빈 행 루프, Synchronizer.init, 동시 업로드 개수

### [UPL-10] 업로드·다운로드가 동작하지 않을 때 확인할 설정과 코드 (사례 모음)

**질문**
- 엑셀 파일이 비어서 다운로드되어 서버(Resin) 설정을 바꿨더니 내용(한글)이 깨지고 `LoadExcel`도 되지 않는다.
- 자바(컨트롤러)에서 `LoadExcel`을 호출하는데 화면으로 데이터가 뿌려지지 않는다.
- `LoadExcel`이 안 된다. (서버 페이징 조회 모드를 쓰는 시트)
- 전역 cfg는 클라이언트 모듈로 두고 개별 시트에 `ExportMode:1`을 줬는데 계속 클라이언트 모듈로 동작한다.
- `Down2ExcelBuffer`로 받았는데 뒤에 이어서 받은 시트의 헤더 병합이 풀린다.
- `Down2Excel`을 하는데 시트에 데이터가 있는데도 헤더만 다운로드된다.
- `LoadExcel`에서 `StartRow`를 4로 했는데 5행부터 출력되고, `Mode`를 `NoHeader`로 했는데 1~5열이 공백이다.
- 엑셀 업로드가 서버 2대 중 한 대에서만 안 된다. (두 서버의 설정이 다르고 공통 모듈은 손댈 수 없다)
- 개발에서는 잘되던 업로드가 운영으로 옮긴 뒤 "엑셀 파일을 읽는 도중 에러가 발생하였습니다"로 안 된다. (운영 서버 2대)
- 엑셀 다운로드 반응이 없다. (.NET)
- IE 문서 모드 10에서 `LoadExcel` 시 서버 콘솔에 에러가 난다.

**답변**
- **Resin**: `LoadExcel.jsp` 상단의 `out.clear(); out = pageContext.pushBody();` 부분이 **있으면 안 되며** 아예 빼면 정상 동작했습니다.
- **자바에서 호출하는 경우**: `LoadExcel.jsp`에는 `contentType="text/html;charset=UTF-8"` 설정이 있어 되었던 것인데, 자바(컨트롤러)로 옮기면 `res.setHeader("Content-Type", "text/html;charset=UTF-8");`이 있어야 합니다.
- **서버 페이징 조회 모드에서는 `LoadExcel`이 되지 않습니다.** 조회할 때와 `LoadExcel()`할 때 조회 모드를 바꿔 쓰도록 안내했습니다. (예: `mySheet.SetConfig({SearchMode:2 or 3, Page:100, FrozenCol:8});`)
- **ExportMode가 계속 클라이언트 모듈로 동작**: 대소문자를 맞췄는지 확인해야 하고(복사해서 넣었다고 했으나 오타였음), **`ExportMode:2`가 남아 있으면 클라이언트 모듈로 동작**하므로 `Down2ExcelBuffer`로 받을 때 병합이 풀리는 것도 이 구문을 제거하면 해결됩니다.
- **헤더만 다운로드**: `InitColumns`에서 `"Type":"text"`(소문자)로 선언했기 때문입니다. `"Type":"Text"`로 써야 합니다.
- **`StartRow`·`NoHeader` 이상**: 보낸 전문의 `UserSaveName`에 `SaveName`이 **중복**되어 있었습니다. 중복을 제거하고 다시 업로드합니다.
- **서버 2대 중 1대만 안 되는 경우**: 서버마다 `MultipartResolver` 설정을 확인해야 합니다. 질문 사례는 최종 실서버에서 정상 업로드된다는 연락이 왔고 서버모듈 1.1.117을 다시 배포하기로 했습니다. 다른 사례는 임시 폴더 설정이 잘 되어 있고 `MultipartResolver` 관련 설정도 하지 않았으며, 운영 서버 2대 설정이 같다고 해서 원인이 확인되지 않았습니다. (원격 확인 중에는 잘 올라가는 경우도 있었음)
- **.NET**: `MarkupTagDelimiter`를 넣는다고 하면서 `LoadExcel.aspx`에 자기 마크업 태그가 아닌 예제를 그대로 사용하고 있었고, `LoadExcel`의 `Mode`도 잘못 설정되어 있어 함께 고쳤습니다.
- IE 문서 모드 10에서 서버 콘솔 에러가 나는 사례는 개발팀 이슈 시스템에 답변이 달렸다고만 기록되어 있습니다.

- **IE10 이하에서의 NullPointerException**: IE10 이하까지는 contentType이 없는 `LoadExcel`이 한 번 호출되고, 서버모듈은 그 호출이 오면 contentType 값을 비교해 `parent.document.getElementById('IBSheetLoadExcelFileFinder').click()`으로 파일 찾기 창을 띄웁니다. 이때 나머지 로직을 타면서 의미 없는 NPE가 나는데 `e.printStackTrace();`를 주석 처리하면 되고 어쩔 수 없는 동작입니다.
- **서버 페이징 모드에서의 업로드 오류**(IE11): `page` 값보다 작은 데이터만 올라가면서 row 수만큼 공백이 추가될 수 있으므로 **업로드 전에 조회 모드를 바꾸고 업로드 완료 후 다시 바꾸라**고 안내했습니다.
- **새 jar를 덮어썼더니 `download is not valid`가 난 사례**: 보내 준 `WEB-INF`의 모든 jar를 덮어쓴 것이 원인이었고, 롤백한 뒤 `ibsheet7-1.1.120.jar`만 덮어쓰고 JSP는 병합해 적용하라고 안내했습니다. 같은 맥락으로 `ibsheet7-1.1.81.jar`와 새 JSP를 모두 넣었더니 오류가 난 사례는 **jar만 올리고 JSP는 기존대로 사용**하자 해결되었습니다. (JSP 교체 여부는 버전에 따라 다르므로 안내서를 확인)
- **`xlsx` 업로드가 안 되던 환경에서 `dom4j.jar`를 추가하자 `poi-3.10`으로 xlsx 업로드가 가능**했던 사례도 있습니다.
- **`LoadExcel.jsp`에 `{Code:` 문자열로 코드를 구하는 부분을 추가한 사이트**에서 최신 jar의 `OnLoadData` 파싱 변경 때문에 업로드가 안 되던 사례는 다음처럼 수정했습니다.
```
int start = result.indexOf("{\"Code\":") +8;
int end = result.indexOf(",", start);
int code = Integer.parseInt(result.substring(start,end));
```

**키워드**: pageContext.pushBody, Resin, LoadExcel 서버 페이징, SearchMode, ExportMode 대소문자, Down2ExcelBuffer 병합, Type text 대소문자, UserSaveName 중복, MultipartResolver, MarkupTagDelimiter

### [UPL-11] LoadExcel 옵션 사용 팁 (MaxRows 화면별 지정, 헤더 불일치 알림, ColumnMapping 공백, SkipEmptyRow)

**질문**
- `LoadExcel.jsp`에 설정한 `MaxRows`를 화면마다 다르게 하고 싶다.
- `getExtendParam`을 쓰면 null이 나온다.
- 헤더매치를 쓰는데 헤더와 다르면 예외를 띄워 주고 싶다.
- `NoHeader`와 `ColumnMapping`을 쓸 때 컬럼 index를 지정하지 않은 항목(`ColumnMapping:'||7'`)이 있으면 서버모듈 2.0에서 오류가 난다.
- 엑셀의 빈 행까지 업로드된다.
- 시트의 숨겨진 컬럼을 다운로드하려면? / 양식 파일에 데이터를 넣어 올릴 때 설정은?
- 헤더가 3줄인 시트에서 `LoadExcel`이 마지막 헤더 기준으로 `HeaderMatch`를 한다. 첫 번째 헤더 기준으로 매핑할 수 있는가?
- `LoadExcel` 시 `Down2Excel`로 받은 파일의 1~2행 데이터가 올라가지 않는다. (`HeaderSkip`, `StartRow:6`)

**답변**
- **화면별 MaxRows**: `LoadExcel` 호출 시 `ExtendParam`으로 보내고 `LoadExcel.jsp`에서 받아 설정합니다. **`load.setService` 이후에** `getExtendParam`을 호출해야 합니다. (null이 나오는 경우는 이 순서 문제였을 수 있어 코드를 분석해 달라고 안내하고 종료한 사례도 있음)
```
mySheet.LoadExcel({ExtendParam : "MaxRows=100"});
// LoadExcel.jsp
String maxorws = load.getExtendParam("MaxRows");
load.setMaxRows(maxorws);
```
- **헤더 불일치 알림**: `OnLoadExcel(result, code, msg)`를 설정해 `code < 0`이면 `msg`를 사용자에게 보여 줍니다. ("업로드 오류를 사용자에게 알리고 메시지를 바꾸려면"([UPL-06]) 참고)
- **`ColumnMapping:'||7'`**: 서버모듈 2.0에서 첫 번째 `|` 앞에 값이 없으면 오류가 났습니다. 고객에게는 공백으로 컬럼 index를 넣도록 안내해 해결했고, 컬럼 index 없이도 가능하도록 제품을 수정했습니다.
- **빈 행 건너뛰기**: `LoadExcel`에 엑셀의 빈 행을 건너뛰는 기능이 추가되었습니다. `setSkipEmptyRow(true)` 또는 `LoadExcel` 옵션 `{ SkipEmptyRow : 1 }`로 쓰며 기본값은 true입니다. 비어 있는 행이 업로드되는 문제는 서버모듈 1.1.107을 전달했습니다.
- **숨겨진 컬럼 다운로드**는 `Down2Excel`의 `DownCols`를 지정하고, 업로드 양식은 `LoadExcel`의 `Mode`, `StartRow`, `StartCol`을 설정합니다.
- **3줄 헤더**: 고객이 실제 원한 것은 전혀 다른 엑셀 파일이 올라왔을 때 경고하는 것이었습니다. 그래서 `Mode:"NoHeader"`로 읽어 들이고 `OnLoadExcel()`에서 첫 번째 행을 보고 잘못된 파일인지 판단하라고 안내했습니다.
- **StartRow 지정 오류**: `HeaderSkip`, `StartRow:6`으로 했는데 내려받은 엑셀은 헤더 없이 시작 행이 4였기 때문입니다. `StartRow:4`로 바꾸면 정상 동작합니다.
- 서버모듈 1.0과 2.0에서 `Int`/`Float` 타입 값이 올라오는 방식이 다르다는 이슈(1234.999 → 1.0은 1235, 2.0은 1234 등), `HeaderMatch` 시 마지막 컬럼 두 개가 로드되지 않는 이슈, 엑셀의 시간(11:15)이 `0.555`처럼 올라오는 이슈, 합계행이 포함된 xls를 올리면 합계행 값이 로드되지 않는 이슈는 이슈 등록 후 기록상 결론이 없습니다. (일감 관리자가 없어 완료 처리되거나 원격 요청 후 기록 없음)

**키워드**: MaxRows 화면별, getExtendParam, setMaxRows, OnLoadExcel code, ColumnMapping, SkipEmptyRow, DownCols, StartRow, HeaderSkip, NoHeader, 헤더 3줄

### [UPL-12] 업로드한 값의 형식 문제 (날짜 서식, 지수형 숫자, 하루 차이, 콤보 공백, 저장 건수 잘림)

**질문**
- `yyyy-mm-dd h:mm` 서식의 엑셀 날짜 컬럼이 괴상하게 올라오거나 업로드되지 않는다.
- 텍스트 컬럼에 긴 숫자를 올리면 지수형(`1.23E+15`)으로 들어온다. 엑셀 컬럼이 text여도 같다.
- 업로드하면 날짜가 하루 전날로 바뀐다. (예: 2016.11.30 → 2016.11.29)
- 엑셀에서 `0.715`가 `0.71`로, `0.915`가 `0.92`로 반올림되어 표시된다.
- 엑셀 업로드 시 콤보 컬럼의 데이터가 누락된다. (공백이 있는 항목)
- `KeyField`가 설정된 컬럼을 내려받으면 헤더 타이틀 옆에 `(*)`가 붙는데 이 파일을 다시 올리면 그 컬럼이 업로드되지 않는다.
- 2000건을 업로드하려는데 30건만 들어온다. / 1만 5천 건을 올리면 `DataSizeOver` 메시지가 나온다. (5천 건은 잘 올라감, 40컬럼 정도)
- 엑셀 업로드 후 저장될 데이터를 확인하니 길이가 0이다.

**답변**
- **`yyyy-mm-dd h:mm` 서식**: 엑셀의 서식이 `yyyy-mm-dd h:mm`일 때 날짜를 제대로 읽지 못했습니다. 우선은 서식을 `yyyy-mm-dd hh:mm`으로 바꾸도록 안내했고, 이후 `LoadExcel`에서 `yyyy-MM-dd h:mm` 포맷의 날짜를 읽는 기능을 추가해 배포했습니다.
- **지수형 숫자**: 엑셀 변환은 셀이 가진 value(수식 입력줄 값)가 아니라 **워크시트에 보이는 text를 기준**으로 변환됩니다. 이미 지수형으로 바뀐 상태에서는 셀 서식을 텍스트로 바꿔도 그대로 지수형으로 나타납니다. 템플릿 파일에서 텍스트 컬럼은 해당 열의 셀 서식을 **미리 텍스트로 지정한 뒤** 데이터를 입력해야 합니다.
- **날짜가 하루 전날로 바뀌는 문제**는 클라이언트 모듈에서 발생한 사례로 기록되어 있습니다. (서버모듈과 별개)
- **`0.715` → `0.71` 반올림**: 해당 화면에서 `LoadExcel.jsp`를 커스터마이징해서 쓰고 있었고 그 부분이 원인이었습니다.
- **콤보 컬럼 누락**: `InitColumns`의 `ComboText`에 컬럼 너비를 맞추려고 텍스트 뒤에 공백을 넣고 있었는데, 시트의 데이터는 자동 트림되어 엑셀로 내려올 때 공백이 포함되지 않습니다. 공백이 없는 텍스트를 공백이 포함된 `ComboText`에 올리려고 해서 생기는 문제입니다. 업로드 후 이벤트에서 데이터를 가공해야 합니다.
- **`KeyField`의 `(*)`**는 질문만 있고 답변이 기록에 없습니다.
- **일부 건수만 들어오는 문제**: 2000건 중 30건만 들어오는 것이 아니라 **저장할 때 30건만 저장**되는 것이었습니다. 서버의 **`MaxPostSize`, `MaxParameterCount`** 값을 늘려야 합니다. `DataSizeOver`도 서버의 `MaxPostSize`를 조정해야 합니다.
- 저장 데이터 길이가 0인 경우는 `GetSaveJson()`으로 추출한 데이터를 먼저 확인하도록 안내했습니다. 서버로 전송된 후 저장 작업에서 오류가 난 것인지, 추출 자체가 안 된 것인지, POST 전송 시 서버 설정(`MaxPostSize`)에 걸려 데이터가 잘려서 가는 것인지 구분해야 합니다.

**키워드**: 엑셀 날짜 서식, yyyy-mm-dd h:mm, 지수형 숫자, 셀 서식 텍스트, 날짜 하루 전, 반올림, ComboText 공백, DataSizeOver, MaxPostSize, MaxParameterCount

### [UPL-13] ExtendParam의 역할, 엑셀에 없는 값 채우기, 파일 선택 취소 이벤트

**질문**
- `LoadExcel`에서 `ExtendParam`을 썼는데 넣은 값이 로드되는 데이터에 포함되지 않는다.
- 엑셀 파일에 포함되지 않은 컬럼 값(히든 컬럼)을 `LoadExcel` 때 시트에 추가할 수 있는가?
- `LoadExcel()`에서 파일 열기 창의 **취소** 버튼 이벤트를 잡을 수 있는가? (엑셀 업로드 창 취소 시점)
- `LoadExcel` 후 데이터가 시트에 뿌려지기 전에 `replace`할 수 있는가? / 엑셀과 그리드의 날짜 포맷이 다를 때 값을 중간에서 바꿀 수 있는가?
- `LoadExcel`에서 헤더행을 무시하고 올리고 싶다.

**답변**
- **`ExtendParam`은 서버쪽으로 전달할 데이터를 넣는 용도**입니다. 값을 넣으면 로드되는 데이터에 포함되어 내려오는 것이 아닙니다. 엑셀 업로드에 값을 넣어 처리하는 로직(예: 시트의 데이터를 일괄 변경)이 있다면 그것은 사이트에서 만든 커스터마이징입니다.
- 시트에 로딩되는 데이터를 엑셀 파일 안에 넣을 수 없다면 `LoadExcel()`로 처리할 방법이 없고, `onLoadFinish()` 같은 이벤트에서 데이터를 추가하거나 가공해야 합니다.
- 데이터를 받아 시트에 로드하기 전에 처리하려면 **`onLoadData()`** 에서 하면 됩니다.
- **파일 선택 창 취소 이벤트는 없습니다.** 브라우저에서 지원하지 않는 부분이어서 억지로 만들더라도 브라우저별로 동작을 보장하기 어렵습니다. 대신 파일을 선택했을 때 서버로 파일을 보내기 직전에 발생하는 `OnLoadFileSelect` 이벤트가 있어 여기서 블록 처리를 할 수 있습니다.
```
function mySheet_OnLoadFileSelect (frm, filename) {
  cc.showBlockUI();
}
```
- 헤더행을 무시하고 올리려면 `Mode`를 `"HeaderSkip"`으로 설정합니다.

**키워드**: ExtendParam 용도, onLoadData, onLoadFinish, OnLoadFileSelect, 파일 선택 취소, 엑셀에 없는 컬럼 값, HeaderSkip

### [UPL-14] 서버모듈 버전에 따라 setMaxRows·setMaxColumns 동작이 달라진다 (2.0.64 → 2.1.18, OnLoadExcel 오류 처리)

**질문**
- `ibsheet7-2.0.64.jar`에서는 `setMaxColumns`를 설정하면 설정값만큼만 로드됐는데 지금은 error로 throw된다.
- 구버전 기준으로는 `setMaxRows` 설정값까지만 읽어 오는데 신버전은 `setMaxRows` 설정을 초과한 값도 읽어 온다. (`setMaxRows`가 무시되는 것으로 추정, exception도 없음) `setMaxWorkSheets`는 모든 경우에서 설정된 개수까지만 화면에서 확인된다. `ibsheet_OnLoadExcelEventOverride()`, `ibsheet_OnMessageEventOverride()`에 브레이크를 걸어도 멈추지 않는다.
- `load.setMaxRows(100)`을 설정하고 100개 이상 로드하면 Exception이 나고 화면의 대기 이미지가 닫히지 않는다.
- `setMaxRows`, `setMaxColumns`, `setStrictHeaderMatch`는 내부적으로 `postMessage`를 리턴하고 `setMaxFileSize`, `setUsePOI`는 Exception으로 throw한다. Exception으로 throw하면 `OnLoadExcel`에서 어떤 에러인지 구분할 수 없다.
- `setOverLimitAllow`를 false로 하거나 빼면 `setMaxRows`, `setMaxColumns`가 안 도는가? (`load.setOverLimitAllow(true); //비공개 은행 전용`)
- `LoadExcel` 때 공통으로 기본 파일 사이즈 제한(예: `MaxFileSize:200`)을 걸고 싶다. (`1.1.131.jar`)
- 앞서 안내받은 `request.getContentLength()` 검사 코드를 JSP 상단에 붙였더니 `getOutputStream() has already been called for this response`가 난다.

**답변**
- `ibsheet7-2.0.64.jar`에서 `ibsheet7-2.1.18.jar`로 올린 뒤 `setMaxRows`, `setMaxColumns`의 동작이 달라진 것이 확인되었습니다(테스트 불충분이었다고 사과). **2.1.18에서 기존(2.0.64)과 같은 동작을 하려면 함수명을 바꿉니다.**
  - `SetMaxRows` → `setMaxRowsLimit`
  - `SetMaxColumns` → `setMaxColsLimit`
  이후의 처리는 개발팀 이슈로 정리되었고, `setMax*` 설정값과 오류 코드 분리 같은 요청도 같은 이슈로 접수되었습니다.
- **오류 알림 정책 변경**: `ibsheet.js` 7.0.13.248-20240402-1527 이전까지는 엑셀 로드에서 에러가 나면 제품 내부에서 alert를 자동으로 띄웠으나, `setMaxRows` 등을 설정하고 사용자에게 알리려면 `OnLoadExcel` 이벤트에서 표시해야 했습니다. 제품의 일관성이 없어서 **강제로 alert를 띄우는 로직을 삭제하고 `OnLoadExcel` 이벤트에서 alert를 띄우도록** 제품을 수정했습니다. 이를 위해 `ibsheetinfo.js`에 `OnLoadExcel` 이벤트 오버라이드가 필요하고(`window[ibSheet.id + "_OnLoadExcel"]`로 기존 화면의 `OnLoadExcel`을 변수에 담았다가 새로 정의하는 방식), 서버모듈 `ibsheet7-1.1.134.jar`를 적용하고 서버모듈 JSP 폴더의 `loadexcel.jsp`, `directloadexcel.jsp`의 `catch(Exception e)` 부분을 참고해 기존 소스를 수정합니다. 도움말 `OnLoadExcel`에 에러 관련 코드와 msg가 설명되어 있으며 `ibmsg`에 에러 관련 코드가 있어야 합니다. (함께 패치한 내용: `FindText(row,'')` 오류, `CellComboItem` 오류, `ibsheet.js` 7.0.13.248-20240402-1527)
- **공통 기본 파일 크기 제한**: JSP 상단 크기 검사 코드를 쓸 때 `getOutputStream()`이 이미 호출되었다는 오류가 나면 앞에 `out.clear(); out=pageContext.pushBody();`를 두고 안내문 스크립트를 보내는 방식으로 바꿔야 합니다. 이후 JS 버전을 올릴 때는 이 부분도 함께 업그레이드해야 한다고 고지했습니다.
```
out.clear();            //out → jsp 자체 객체
out=pageContext.pushBody();  //out → jsp 자체 객체
int iLen = request.getContentLength();
if( iLen > 1048576 ){
  OutputStream out4 = response.getOutputStream();
  out4.write(("<script>try{var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[targetWnd.Grids.g_targetExcelSheetID].ShowAlert('엑셀 파일을 읽는 도중 예외가 발생하였습니다.', 'U'); targetWnd.Grids.OnLoadExcelError(targetWnd.Grids[targetWnd.Grids.g_targetExcelSheetID], 'EXCEL'); }catch(e){}</script>").getBytes("UTF-8"));
  out4.flush();
  return;
}
LoadExcel ibExcel = new LoadExcel();
ibExcel.setService(request, response);
```
  (이 코드의 크기 검사 기준 등은 사용자가 정하는 값입니다. "엑셀 업로드가 느리거나 서버 메모리를 과하게 쓴다"([PRF-03]) 참고)
- `setOverLimitAllow`에 대한 질문은 개발팀 이슈 번호를 참고하라고만 안내되었고, `OnLoadExcel` 이벤트에 들어오는 코드 값이 매뉴얼과 케이스가 다르다는 지적과 이벤트가 타는 경로를 순서대로 알고 싶다는 요청도 같은 이슈로 접수되었습니다.

- 모든 시트에 **공통으로 기본 파일 사이즈 제한**을 걸려면 `createIBSheet` 쪽에서 시트 생성 시 `window[sheetid].SetLoadExcelConfig({MaxFileSize:2000})` 형태로 설정합니다. (단위 MB, 2000이면 약 2GB로 제한)

**키워드**: setMaxRowsLimit, setMaxColsLimit, setMaxRows 동작 변경, OnLoadExcel 오버라이드, 7.0.13.248, setOverLimitAllow, getOutputStream already called, MaxFileSize 공통

### [UPL-15] xlsx로 올릴 때 26번째(AA열) 이후 컬럼이 로드되지 않는다 (패치 이력)

**질문**
- `xlsx`로 `LoadExcel`을 하면 엑셀의 `AA`(27번째)열부터 로드되지 않는다. `xls`는 정상이다.
- `LoadExcel.jsp`에 30개 컬럼 제한을 설정했는데 28개 컬럼만 올라간다. (AA 컬럼부터 안 됨, 다른 은행 개발 시스템에서도 확인)
- 개발에서는 문제가 없는데 운영에서 특정 컬럼(Z열) 이후 데이터가 업로드되지 않는다. (Z열을 지워서 AA열이 Z열이 되게 해도 Z열까지만 올라감, POI 3.16)
- 업로드할 컬럼이 엑셀 AA를 넘어 49개인데 Z번째 컬럼 이후가 로드되지 않는다. (`2.0.83.jar`)
- 은행 대량이체 화면에서 xlsx 컬럼 이상 로드가 되지 않는 현상이 있다.

**답변**
- **xlsx로 `LoadExcel`할 때 엑셀의 AA(26개) 컬럼 이후가 로드되지 않는 현상은 제품 문제**였고 수정되었습니다. 그동안 해당 업무 화면에는 26개 컬럼을 load하는 요건이 없어서 늦게 발견되어 패치된 것입니다. 패치 버전은 `ibsheet7-2.1.18.jar`(2023-12)였고, 서버모듈 2.0.34를 쓰던 사이트에는 같은 수정이 포함된 버전을 따로 배포했으며(2024-01), 이후 xlsx로 올릴 때 숫자가 변환되어 올라오는 부분이 있는지 테스트하라고 안내했습니다.
- 운영에서만 Z열 이후가 안 올라오던 사례(POI 3.16)는 `WEB-INF/lib`에 라이브러리가 다 있는데 poi 파일이 없다는 에러가 떴고, `WEB-INF/lib`가 아니라 **WAS의 기본 lib 폴더**를 바라보는 것으로 보여 라이브러리를 WAS 기본 lib 폴더로 옮기라고 안내했습니다. ("제품·서버모듈·JSP 버전이 서로 맞지 않아 생기는 문제"([UPG-06]) 참고)
- 제품 버전이나 jar가 오래된 사례(`2.0.83.jar`)는 최신 서버모듈로 교체해서 해결합니다. 같은 증상으로 jar를 교체했는데도 안 되던 사례는 `WEB-INF/lib`에 `ibsheet7`로 시작하는 jar가 여러 개 남아 있던 것이 원인이었습니다. ("서버모듈 jar가 어떤 버전인지 확인하는 방법과, 업그레이드 후에도 옛 jar가 읽히는 경우"([ENV-27]) 참고)
- POI 3.16으로 바꿔 해결했다는 사이트가 있었으나 **POI 3.16은 지원하지 않으며 서버모듈 2.x 기준 최대 3.14까지** 쓰도록 안내하고 3.14로 교체하라고 했습니다. (`NoClassDefFoundError: Could not initialize class org.apache.poi.openxml4j.opc.internal.marshallers.ZipPackagePropertiesMarshaller` 사례, 2024-03)
- 서버모듈 1.1.133에서는 POI 3.13까지 사용 가능하며 **3.13 이상(예: 3.17)은 xlsx로 다운로드할 때 에러가 난다**고 확인되었습니다. (2024-02)

**키워드**: xlsx AA열 로드 안 됨, 26개 컬럼 이후, 컬럼 제한 28개, ibsheet7-2.1.18, POI 3.16 미지원, ZipPackagePropertiesMarshaller

### [UPL-16] 한셀이나 xls에서 저장한 xlsx 파일이 올라가지 않는다

**질문**
- 한셀로 만든 xlsx 파일을 올리면 데이터가 로드되지 않는다.
- xlsx로 엑셀을 올리면 올라가지 않는다. xlsx는 못 올리는 것인가?
- 개발자 자리에서 업로드할 때는 오류가 없는데 담당자 자리에서 업로드하면 `org.apache.poi.openxml4j` 에러가 난다.
- 엑셀 업로드 시 계좌번호 컬럼의 셀 서식이 백분율이거나 다른 서식일 때 업로드가 안 되고 서버에서 응답을 못 받는다. (POI 3.8)
- 엑셀 업로드 시 `엑셀 파일을 읽는 도중 예외가 발생하였습니다`가 난다. (VLOOKUP 수식이 포함된 엑셀)

**답변**
- **한셀 파일**: 서버는 POI로 엑셀 파일을 읽는데 한셀이 POI가 읽을 수 있는 구조로 만들지 않았을 가능성이 있습니다. xlsx는 바이너리 정보를 읽어 들이고 xls는 파일 자체를 읽어 들이므로 xls로 저장하면 잘 될 수 있다고 답변했습니다. 개발팀 의견으로는 못 읽는 형식이 있을 것이라 파일을 받아 분석하겠다고 했으나 유지보수가 되어 있지 않아 분석이 어렵고 연락이 되지 않아 완료 처리되었습니다.
- **xlsx가 올라가지 않는 경우의 확인 항목**: xls, xlsx 둘 다 업로드는 가능하므로 고객이 어떤 파일을 올리는지부터 확인합니다. (1) 고객이 엑셀 옛날 버전(2003 등)을 쓰는 경우 최신 서버모듈에서 지원하지 않는 형식이어서 안 올라갈 수 있습니다. (2) **xls로 받은 엑셀 파일을 편집하면서 xlsx로 저장한 경우** 내부 로직이 xls 형식이어서 제대로 올라가지 않을 수 있습니다. (3) 편집 과정에서 파싱이 안 되는 내용이 들어갔거나 내부 내용이 문제인 경우도 있습니다. 설치된 엑셀, 엑셀 파일, 내용, 다른 PC에서도 동일한지 등을 확인합니다.
- **셀 서식이 백분율일 때** 오류가 나는 증상은 패치된 jar(`ibsheet7-2.0.86.jar(사이트 전용 빌드)`)를 배포했습니다.
- **VLOOKUP 수식이 들어간 엑셀**에서 특정 데이터가 업로드되지 않거나 `01`, `02`처럼 0으로 시작하는 값이 수식 결과에서 사라지는 문제는 `ibsheet7-2.1.41.jar`, `2.1.34.jar` 등으로 처리했습니다. (수식 결과 읽기 관련 패치)
- 다른 환경에서만 오류가 나는 사례는 라이브러리가 다 올라갔는지, 에러 로그가 어떻게 찍히는지부터 확인하라고 안내했고, 두 개의 IBSheet 버전을 쓰는 사이트에서 담당자 자리에서만 되지 않던 사례는 연락이 없어 종료되었습니다.

**키워드**: 한셀 xlsx, xls를 xlsx로 저장, 엑셀 2003, 셀 서식 백분율, VLOOKUP 업로드, 수식 결과 읽기, 엑셀 파일을 읽는 도중 예외

### [UPL-17] 엑셀 업로드 숫자·날짜 값이 변형된다 (15자리 보정, 날짜에 000000, POI 없이 내장 파서가 동작)

**질문**
- 엑셀에서 `30`으로 입력한 금액이 `29.9999999999996`으로 읽힌다. (엑셀 숫자 앞에 `'`를 붙이면 정상)
- `13000`이나 `40000` 같은 값이 `12999.99999998`처럼 올라와 내부 validation에서 제거된다. (xls)
- 엑셀 값 `55500`이 `55499`로 표시된다. 소수 `3.4`를 더블클릭해 수정하면 `3.39999999999`로 바뀐다.
- 날짜 서식 데이터를 올리면 `000000`이 붙어서 나온다. (`Type:"Date"`, Format 미설정)
- 사용자가 날짜 서식을 `yyyymmdd`로 바꾸고 `20201130`을 입력하면 `57200123012100` 같은 값으로 변경되고, 금액 `2200000`이 `792305240000000`으로 바뀐다.
- 엑셀 파일에 `0.5`를 읽으면 시트에서 `0`이 없어진다.
- `LoadExcel(Mode:"FullLoad")`일 때 엑셀의 줄바꿈 기호가 있으면 데이터를 그대로 반환해 `JSON.parse`로 파싱할 수 없다.
- 서버가 영문 언어 설정이어서 년월일 위치가 바뀌었다.
- `Text`에 `Ymd` 포맷을 가진 값이 페이지 다운로드와 전체 다운로드에서 다르게 표시된다.
- 업로드 시 값이 1원씩 가감된다.

**답변**
- **15자리 보정**: 엑셀 2007부터는 값을 저장할 때 엑셀 내부에서 **15자리 float 숫자로 보정**해서 저장하는데, 시트가 보정된 값을 처리하지 못해 `29.9999999999996`, `55499` 같은 값이 나옵니다. **서버모듈 2.0.57 이후 버전부터는 15자리 이후 값을 round 처리**하도록 패치되었습니다. (`12999.99999998` 사례는 테스트 버전으로 확인 후 `ibsheet7-2.0.82.jar`, `0.5`의 `0`이 사라지는 사례는 `2.0.25.jar`, 1원 가감 사례는 `ibsheet7-1.1.124.jar`를 배포)
- **날짜에 `000000`**: 날짜 서식 데이터를 올리면 서버모듈 안에서 **년월일시분초 형식으로 변환**되어 시분초가 없는 데이터는 `000000`으로 채워졌습니다. 다양한 날짜 포맷(시분초 포맷)에 대응하려는 동작이었으나, 입력 데이터의 날짜 서식을 크게 **년월일 포맷인지 년월일시분초 포맷인지** 구분해 년월일 서식이면 그 형식으로 읽어 불필요한 시분초가 붙지 않도록 패치했습니다. (`ibsheet7-2.0.85.jar(사이트 전용 빌드)`, 2021-02) 사용자가 시분초까지 입력해서 올리면 그 형식대로 14자리가 표시되고, 팝업 다이얼로그에는 14자리 날짜가 표시되지만 **확인 버튼을 눌러 바닥 시트에 들어가는 시점에는 바닥 시트의 날짜 컬럼 `Format`을 따릅니다.** 이미 다른 사이트는 날짜 관련 컬럼의 헤더 텍스트를 보고 시트의 `dateFormat`을 적용하는 방식으로 우회하고 있었습니다.
- **POI가 없는데 내장 파서가 동작하던 사례**: 날짜 서식을 `yyyymmdd`로 바꾸고 입력하면 월 위치 데이터가 분으로 이동하고 월은 `01`이 되는 변환 오류가 나던 사이트였고, 방문해 확인해 보니 **운영 배포 때 POI 라이브러리가 누락**되어 개발 서버에서는 POI로 xls가 잘 파싱되었지만 운영에서는 POI가 없어 jexcel 기반 내장 파서로 구동되어 날짜 형식이 문제가 된 것이었습니다. POI가 없으면 아예 오류가 나도록 패치한 `ibsheet7-2.0.83.jar`를 전달했습니다. (같은 사이트는 POI 업그레이드를 할 수 없어 POI 3.8을 쓰고 있었고, numbers 앱에서 export한 xlsx 파일을 엑셀로 다시 저장한 파일과 달라 사이트 전용 빌드 `2.0.83`에서도 소수점으로 표시된 사례가 있었음)
- **FullLoad의 줄바꿈**: `ibsheet7-2.0.80.jar`를 배포해 처리했습니다. `\t`가 있을 때의 JSON 파싱 우회는 "업로드한 값이 달라진다"([UPL-03])에 있습니다.
- **`Ymd` 표시 차이**(페이지 내려받기 vs 전체 내려받기): `ibsheet7-1.1.118.jar`를 배포해 처리했습니다.
- **서버 로케일이 영문일 때 날짜 순서가 바뀌는 문제**와 위 사례들은 이력 관리를 위해 등록된 건이며, 해당 사이트는 한 주 동안 매일 방문 지원하기로 한 이슈였습니다.
- **엑셀 파일 자체의 문제**: 한 사례는 사용자가 보낸 xlsx가 numbers에서 export한 파일이고, 지원팀이 받은 파일은 그 파일을 엑셀로 다시 저장한 것이어서 결과가 달랐습니다. 원본 파일을 정확히 받아 확인해야 합니다.

**키워드**: 15자리 float, 29.9999999999996, 55499, 날짜 000000, ibsheet7-2.0.57, ibsheet7-2.0.85 사이트 전용 빌드, POI 없음 내장 파서, jexcel, FullLoad 줄바꿈, ibsheet7-2.0.83

### [UPL-18] LoadText: 한글 헤더·인코딩에 따라 데이터가 비어 올라온다 (BOM 제거, 서버모듈 1.1.82)

**질문**
- 서버모듈 jar를 패치한 뒤 텍스트 파일의 인코딩에 따라 시트 데이터가 다르게 로드된다. (utf-8이면 row만 생기고 빈칸, euc-kr이면 데이터가 보임. 이전 1.1.69에서는 반대)
- 헤더가 2줄인 csv 파일을 `LoadText({Mode:'HeaderMatch', Deli:',', FileExt:'csv'})`로 로드하는데 헤더 1줄이 데이터로 로드된다.
- csv 파일을 로드할 때 한글이 깨진다.
- `DirectLoadExcel` 샘플의 `com.ibleaders.ibsheetLoader.IBSheetLoad` 참조 라이브러리를 모르겠다.

**답변**
- 서버모듈 **1.1.81 이하**에서는 한글 헤더가 포함된 경우 파일 인코딩이 **utf-8일 때만** 정상 로딩되고 euc-kr은 읽지 못했습니다(한글 헤더를 읽지 못해 컬럼 매핑을 못 하고 빈칸으로 로드). **서버모듈 1.1.82**에서 파일 인코딩에 따라 헤더를 읽지 못하는 현상을 패치했고 **BOM이 있는 경우 제거하는 옵션**도 추가되었습니다.
- utf-8로 파일을 만들 때 메모장 등으로 생성하면 자동으로 BOM이 들어가고, BOM을 제거하지 않으면 utf-8 파일을 정상적으로 읽지 못할 수 있습니다. 그래서 utf-8 파일을 로드하는 경우 `LoadText.jsp`의 **`SetRemoveBom(true)`**(사용자 환경 설정 #4)를 활성화(주석 해제)합니다. 테스트용으로 보낸 `ibsheet7-1.1.999.jar`는 당시 최신 버전(1.1.118)의 문제를 패치한 것이었습니다.
- 헤더 2줄 csv와 csv 한글 깨짐은 `ibsheet7-2.0.85.jar`에서 패치되었습니다.
- `DirectLoadExcel` 샘플은 서버모듈 2.0 제품의 JSP들이 잘못 들어 있었으므로 샘플의 `sheet/jsp/` JSP들을 기존 프로젝트에서 쓰는 JSP로 교체하면 테스트할 수 있습니다. ("텍스트(CSV) 업로드의 인코딩·BOM 문제"([UPL-05]) 참고)

**키워드**: LoadText 인코딩, SetRemoveBom, UTF-8 BOM, 한글 헤더, ibsheet7-1.1.82, euc-kr 헤더, csv 헤더 2줄

## DRM · DRM(문서보안)·엑셀 비밀번호

### [DRM-01] DRM이 걸린 엑셀을 업로드(LoadExcel)하려면 어떻게 해야 하나

**질문**
- 엑셀 업로드 시 DRM이 걸린 파일을 시트가 읽게 하려면 어떻게 하는가? 복호화 모듈을 제공받을 수 있는가?
- 기존 ActiveX 시트에서는 DRM과 상관없이 잘 됐는데 IBSheet7(서버모듈)에서는 왜 안 되는가?
- 업로드 때 공통으로 DRM을 처리할 수 있는 위치가 있는가? (JSP, ASP.NET)
- 파일을 선택하는 시점에 DRM·암호가 걸렸는지 알 수 있는가?
- DRM 복호화가 필요한데 IBUpload 업로드 시에도 DRM 적용이 되는가?

**답변**
- **이유**: ActiveX는 사용자 PC에서 엑셀을 직접 열어 읽으므로 DRM이 파일을 열 때 자동으로 복호화되어 신경 쓸 필요가 없었습니다. IBSheet7(서버모듈)은 파일을 서버로 전송하고 서버에서 POI 라이브러리로 읽기 때문에, **서버에서 복호화를 해 주어야** 합니다. 제품에는 DRM 복호화 모듈이 포함되어 있지 않고 DRM 처리와 관련된 제어 기능도 없습니다.
- **복호화 모듈**은 DRM 업체에서 서버용 복호화 모듈(소스)을 받아야 합니다. 업체마다 방식이 다르므로 설치·사용법은 DRM 업체에 문의해야 합니다.
- **삽입 위치**: `LoadExcel.jsp`에 DRM 처리 구간이 주석으로 준비되어 있습니다. 서버에 저장된 업로드 파일(`uploadFileName`, 사용자가 올린 원래 이름은 `uploadFileNameOrg`)을 가져와 복호화한 뒤, **시트가 처음에 쓴 파일을 지우고 복호화된 파일을 같은 이름으로 교체**합니다. 이 구간에서 처리하면 모든 업로드에 공통으로 적용됩니다. 서버에서 복호화가 정상적으로 되었는지는 복호화된 파일을 열어 보면 확인할 수 있습니다. 서버모듈 2.x의 `LoadExcel.jsp`에 있는 주석 구간은 다음과 같습니다.
```
/** 서버로 전송된 파일을 가공해서 사용해야 할 경우. (예, DRM 복호화 등)
// 서버에 저장된 파일 객체
File uploadFile = load.getUploadFile();
String uploadFileName = uploadFile.getName();
String uploadFilePath = uploadFile.getAbsolutePath();
// TODO
// 업로드된 엑셀 파일을 가공함 (예, 엑셀문서를 DRM 처리함)

// 가공된 파일을 ibSheet에서 읽을 수 있도록 처리.
load.loadFile(uploadFile);
**/
```
  이 로직을 쓰려면 `File uploadFile`부터 `load.loadFile(uploadFile);`까지의 주석을 모두 풀어야 합니다.
- **ASP.NET**: `loadexcel.aspx`에 `if (frm == "") { String uploadFileName = GetUploadFileName(); … LoadExcelFile(); }` 구간이 있고, `uploadFileName`은 업로드 파일을 쓴 경로를 돌려줍니다. 그 아래에 DRM 해제 로직을 넣고 암호화된 파일을 삭제한 뒤 복호화된 파일을 `uploadFileName`으로 교체합니다. .NET 서버모듈(닷넷 4.0, 1.1.0.28)을 전달할 때도 aspx에 DRM 주석 처리된 위치에서 처리하라고 안내했습니다.
- 파일을 선택하는 시점에는 암호나 DRM이 걸렸는지 알 수 없고, 서버로 전송되어 라이브러리로 읽은 뒤에야 알 수 있습니다.
- IBUpload가 HTML 버전이 아니면 DRM 적용이 안 된다고 답변한 기록이 있습니다.
- 사용자가 직접 DRM을 해제해서 올리는 방법도 가능합니다.
- **ExportMode와의 관계**: `ExportMode:2`(클라이언트 모듈)로 쓰는 .NET 사이트가 DRM 처리를 했는데도 오류가 났다는 사례가 있습니다. 클라이언트 모듈은 서버를 거치지 않으므로 서버의 복호화 로직이 적용되지 않습니다. ("DRM 파일을 브라우저에서 읽는 경우"([DRM-03]) 참고)

**키워드**: DRM, 문서보안, LoadExcel DRM 복호화, LoadExcel.jsp, uploadFileName, uploadFileNameOrg, getUploadFile, loadFile, 파일명 교체, ActiveX와 차이, 복호화 모듈, loadexcel.aspx

### [DRM-02] DRM 복호화를 넣었는데 업로드 오류가 난다 (INVALID HEADER SIGNATURE, Zip File is closed 등)

**질문**
- DRM 해제 로직을 넣은 뒤 `INVALID HEADER SIGNATURE`가 난다. / `java.lang.IllegalStateException: Zip File is closed`가 난다. / `Unable to read entire header; 257 bytes read; expected 512 bytes`가 난다.
- 복호화에 성공했다는 로그는 찍히는데 그 뒤 `ibExcel.LoadExcelFile()` 이후부터 진행이 멈추고 오류도 안 뜬다.
- 문서보안이 해제된 파일인데도 업로드 시 스크립트에서 메시지가 나온다. / 엑셀 업로드 시 "보안파일은 업로드할 수 없습니다"가 뜬다.
- 복호화된 파일 이름이 원본과 달라서 `setFileName`으로 지정했더니 해제된 파일만 지워지고 암호화된 원본이 남는다.
- DRM 모듈에서 파일 이름은 잘 나오는데 경로에 파일 이름까지 붙어서 나와 처리가 안 된다.
- 서버가 2대인데 한 곳에서만 복호화에 실패한다.
- `LoadExcel.jsp`에 DRM 해제 로직을 넣은 뒤 `ibExcel.writeToBrowser();`에서 에러가 난다. / `getLoadForm`을 찾을 수 없다.
- 특정 컬럼이 업로드되지 않는다. (DRM 해제 로직을 걷어낸 뒤에도 같음)

**답변**
- **복호화된 파일을 원래 이름으로 교체**해야 합니다. DRM 처리가 끝난 파일을 원본 파일 이름으로 바꿔 주지 않으면 `INVALID HEADER SIGNATURE` 같은 오류가 납니다. 파일이 손상되었는지도 확인합니다. 엑셀에서 손상되었다고 나오면 POI도 읽을 수 없습니다.
- **Zip File is closed / 진행 멈춤**은 대체로 DRM과의 충돌이었습니다. `LoadExcel.jsp`에서 `System.out.println(com.ibleaders.ibsheet7.util.Version.getVersion());`을 로그로 찍어 jar 구성을 확인하고, DRM 로직을 걷어낸 뒤에도 문제가 나는지 비교합니다. 진행이 멈춘 사례는 복호화 시 만들어진 파일의 내용이 깨져 있던 DRM 문제였습니다. 서버모듈 2.0.91 환경에서는 DRM 복호화가 비동기로 동작해 **복호화가 끝나지 않은 암호화된 파일을 시트가 읽는** 문제가 확인되었습니다. 이 사이트는 ReportXML과 TempFolder 지정도 필요해 서버모듈 1.0으로 되돌아가라고 안내하고 종료했습니다.
- 오류 로그를 보려면 `LoadExcel.jsp`의 try-catch에서 `e.printStackTrace();` 주석을 풉니다. DRM이 걸려 있지 않은데도 "엑셀 파일을 읽는 도중 예외가 발생하였습니다"가 나오면 서버 로그를 보내 달라고 안내했습니다.
- 복호화 후에도 파일을 읽지 못하는 경우, 로드가 오래 걸릴 때는 `OnLoadFileSelect` 이벤트에서 화면을 block 처리하고 `OnLoadExcel`에서 unblock 처리하도록 안내했습니다.
- **경로에 파일 이름이 붙는 문제**: `uploadFile.getAbsolutePath()`는 파일명이 붙은 전체 경로를 돌려주며, 경로만 돌려주는 함수는 없으므로 문자열을 잘라서 쓰라고 안내했습니다. 업로드 파일명(`getUploadFileName()`)과 서버에 저장한 파일명이 다른 경우는 같은 이름으로 저장하고 읽도록 정리했습니다.
- **원본 암호화 파일 삭제**: 서버모듈에서 지우기는 어렵고 `new File(원본파일경로).delete()`로 직접 지우도록 안내했습니다.
- **서버 2대 중 1대만 실패**: 서버마다 DRM 키 값이 달랐고, 한 서버에서 정상 로드되었다면 IBSheet 쪽 문제가 아니므로 DRM 업체에 정상 키 값을 문의해야 합니다. 같은 경우 DRM 서버가 내려가서 동작하지 않았던 사례도 있었습니다.
- IE에서는 DRM이 해제된 파일이 전송되고 크롬에서는 DRM 파일이 그대로 전송된 사례가 있어, DRM 쪽에서 URL이나 브라우저별로 해제 여부를 구분하는지 확인하라고 안내한 기록이 있습니다. 로컬에서는 되는데 운영에서만 에러가 나는 경우 POI 3.9와 3.13이 함께 설치되어 있는 사례(둘 중 하나만 남기기, 엑셀 비밀번호 기능은 3.10 이상이 필요하므로 3.13만 남김)도 있었습니다.
- `LoadExcel.jsp` 수정 중 `ibExcel.writeToBrowser();`에서 오류가 난 사례는 운영에 이미 최신 제품이 적용되어 있어 운영 소스를 받아 DRM 로직을 다시 적용하라고 안내했습니다. `getLoadForm()` 로직은 IE9 이하 업로드 지원용으로 최신 버전에서는 코어로 들어갔으므로 제거해도 됩니다.
- 일부 컬럼만 업로드되지 않던 사례는 `dom4j-1.6.1.jar`를 함께 배포해 해결했습니다. xlsx는 POI를 거치지 않고 **모든 워크시트의 내용을 시트로 전송**하므로, 모든 워크시트의 컬럼 개수를 검사하게 된다는 설명을 한 기록도 있습니다("보안파일은 업로드할 수 없습니다"가 서버모듈 2.0.34에서 2.1.18로 교체한 직후 나온 사례의 답변).
- 업로드 파일이 손상되었거나 로컬에서만 안 되는 경우는 lib 파일 구성, `LoadExcel.jsp`의 DRM 해제 처리, 운영 화면의 `LoadExcel()` 동작 여부를 순서대로 확인하도록 안내했습니다.

**키워드**: INVALID HEADER SIGNATURE, Zip File is closed, DRM 비동기, 복호화 후 업로드 실패, 파일명 교체, getAbsolutePath, 원본 삭제, OnLoadFileSelect, DRM 키, 보안파일은 업로드할 수 없습니다, dom4j

### [DRM-03] DRM·암호가 걸린 파일을 브라우저(클라이언트 모듈)에서 읽는 경우, 로드 실패를 화면에서 알리려면

**질문**
- 엑셀 파일 암호나 DRM 때문에 `LoadExcel.jsp`에서 오류가 나면 시트에는 로딩 이미지만 계속 표시된다. 오류를 받아 사용자에게 알려줄 방법이 있는가?
- `LoadExcelBuffer(true)`, `LoadExcel()`, `LoadExcelBuffer(false)`를 호출하는 화면에서 DRM을 풀지 않은 파일을 올리면 `Cannot read properties of undefined (reading 'SheetWork')`가 난다. 에러를 잡아 표시할 수 있는가?
- `LoadExcel` 실패 시 `OnLoadExcel`로 들어오지 않고 반환값도 없다.
- `LoadExcelBuffer()`로 읽은 엑셀 파일을 서버에도 저장하고 싶다.

**답변**
- 파일을 서버로 전송해 읽은 뒤에야 오류를 알 수 있습니다. `LoadExcel.jsp`의 try-catch에서 읽기가 실패하면 `alert`를 띄우는 코드가 이미 있으므로 이 부분을 주석 처리하지 않았다면 파일 전송 뒤의 반환 메시지로 사용자가 알 수 있습니다. 로딩 이미지가 닫히지 않는다면 서버 쪽에서 에러가 난 것이므로 `e.printStackTrace();` 주석을 풀고 WAS 로그를 확인합니다.
- **DRM이 걸린 파일을 브라우저에서 확인하는 방법은 없습니다.** 엑셀 업로드를 브라우저에서 바로 처리하는 클라이언트 모듈 구성인 사이트에는 다음과 같이 백엔드를 호출하는 방식으로 안내했습니다.
  1. `WEB-INF/lib`의 ibsheet jar를 최신으로 올립니다. (2.1.5 → 2.1.39 사례)
  2. jar 버전에 맞게 엑셀 처리 JSP도 최신으로 올립니다.
  3. 업로드할 때만 서버모듈을 쓰도록 `ExportMode`를 바꿉니다.
```
sheet.ExportMode=1;  // 엑셀 파일과 데이터를 백엔드로 전송
sheet.LoadExcel();
sheet.ExportMode = 2; // 엑셀 다운로드는 브라우저에서 처리하도록 원래 값으로 되돌림
```
  4. `OnLoadExcel` 이벤트가 result, 에러 코드, msg를 받아 사용자에게 오류를 표시하도록 처리합니다.
- `LoadExcelBuffer()`로 읽은 파일을 서버에도 저장하려면 **`Cfg.ExportMode:1`(서버모듈, 속성이 없으면 기본값)** 이어야 합니다. 클라이언트 모듈에서는 파일 저장도, `<input type="file">`로 먼저 저장한 뒤 서버에서 읽어 시트에 넣는 방법도 구현할 수 없습니다. 서버모듈에서는 위 `LoadExcel.jsp`의 `uploadFile` 구간(`DRM-01`)의 TODO 위치에 업로드한 `File`을 서버에 저장하는 로직을 추가하면 됩니다. 시트 옵션 정보를 서버로 보내는 방법은 `LoadExcel` 호출뿐이고, 그때 파일 탐색기가 반드시 열리므로 `<input type="file">`로 먼저 올리는 방식으로는 구현할 수 없습니다.

**키워드**: LoadExcel 오류 처리, 무한 로딩, OnLoadExcel, LoadExcelBuffer, ExportMode, 암호 걸린 엑셀, 클라이언트 모듈 DRM, SheetWork, 업로드 파일 서버 저장

### [DRM-04] 엑셀·텍스트 다운로드에 DRM을 적용하려면 (서버에 저장 후 처리)

**질문**
- 엑셀 다운로드 시 DRM을 걸고 싶다.
- 브라우저로 보내기 전에 파일을 따로 처리한 뒤 보내고 싶다. (.NET, 파일명 바꿔치기)
- 다운로드한 엑셀을 열려고 하면 "프로그램으로 명령을 전송하는데 문제가 있습니다"가 가끔 뜬다.
- 텍스트(CSV)로 다운로드하면 한글이 깨진다. 특정 확장자일 때만 내용이 깨진다.
- 엑셀 다운로드 때 DRM 처리를 넣은 뒤 개발에서는 되는데 운영에서는 에러가 난다.

**답변**
- `Down2Excel.jsp`에서 "다운로드 1. 생성된 엑셀 문서를 바로 다운로드 받음" 부분을 주석 처리하고 **"다운로드 2. 생성된 엑셀 문서를 서버에 저장" 부분**으로 처리합니다. 서버에 저장한 파일을 DRM 처리한 뒤 브라우저로 보냅니다. 임시 경로를 쓰려면 다음과 같이 합니다.
```
String tmpdir = System.getProperty("java.io.tmpdir")+"/";
down.saveToFile(tmpdir);
File file = new File(tmpdir + fileName);
```
  `d:/`는 임의 경로를 뜻하는 예시입니다.
- .NET 사례에서는 처리된 파일을 브라우저로 전송하는 구간(`Response.ClearHeaders()`, `Response.ContentType`, `Response.AppendHeader("Content-Disposition", …)`, `Response.WriteFile(…)`, `Response.Flush()`)의 기본 전송 로직을 주석 처리하고 서버에 있는 파일을 따로 보내도록 안내하려 했으나, 질문 의도가 정확히 확인되지 않았고 해당 사이트가 유지보수 만료여서 지원이 이어지지 않았습니다.
- "프로그램으로 명령을 전송하는데 문제가 있습니다"는 다운로드 직후 2~3초 동안 DRM 모듈이 암호화를 하는 도중에 파일을 열어서 생기는 것으로 추정했습니다. 해결 방안으로 (1) 서버에서 미리 암호화해서 내려주거나 (2) 브라우저에서 바로 열지 말고 저장한 뒤 열도록 안내하거나 (3) 엑셀 옵션 > 고급 > 일반에서 "DDE(동적 데이터 교환)를 사용하는 다른 응용 프로그램 무시" 체크를 해제하는 방법을 제시했습니다.
- CSV 한글 깨짐은 증상에 따라 다릅니다. (1) CSV를 엑셀로 열었을 때 깨지면 `down2text.jsp`에서 주석 처리된 `setBomType` 함수의 주석을 해제합니다. (2) 메모장 등 편집기로 열었을 때 깨지면 DRM 때문에 나타나는 증상이므로 DRM을 해제하고 테스트합니다. 확장자에 따라 내용이 깨지는 사례(`.txt`는 정상, 다른 확장자는 깨짐)도 DRM 쪽 문제로 보고 있습니다.
- 개발은 되고 운영만 에러인 사례는 POI 3.9와 3.13이 함께 설치된 버전 충돌이었습니다. ("DRM 복호화를 넣었는데 업로드 오류가 난다"([DRM-02]) 참고)

**키워드**: 엑셀 다운로드 DRM, saveToFile, 서버에 저장, java.io.tmpdir, 프로그램으로 명령을 전송, DDE, CSV 한글 깨짐, setBomType, Down2Text

### [DRM-05] 엑셀 다운로드 파일에 열기 비밀번호를 설정하려면 (WorkbookPassword)

**질문**
- 엑셀 다운로드 시 파일을 열 때 비밀번호를 입력하도록 하고 싶다. 서버모듈 버전은 상관없는가?
- 주석을 풀어 적용했는데 다운로드는 되지만 맞는 비밀번호를 입력해도 열리지 않는다. / 비밀번호가 일치하지 않는다고 나온다. / 특정 PC에서는 다운로드 자체가 안 된다.
- `ProtectXLSX.encryptXLSX`가 포함된 부분을 쓰면 파일명이 깨지고 다운로드가 안 된다. (리눅스, jakarta 전환 후)
- 로컬에서는 되는데 개발 서버에서는 `encryptXLSX()` 뒤로 로그가 찍히지 않고 멈춘다.
- JSP가 너무 많아서 `Down2Excel.jsp`마다 비밀번호를 적용하기 어렵다. 공통 처리가 가능한가?
- 서버에 파일 저장 경로가 `d:/`로 되어 있는데 서버 경로라면 폴더를 만들 수 없다.
- POI 4.12를 적용해 테스트하니 다운로드한 엑셀이 열리지 않는다.

**답변**
**기능의 전제**
- 비밀번호 기능은 **xlsx 확장자일 때만** 적용되고, 서버모듈(POI 사용)에서만 동작합니다. 공식적으로 지원하는 기능이 아니라 특수한 목적으로 만들어져 특정 버전에서만 쓸 수 있다고 안내한 기록(2017)이 있습니다. 워크북 비밀번호는 POI 3.10에서 만들어졌으므로 POI는 3.10 이상이어야 합니다. 비밀번호의 자릿수나 규칙은 시트가 검증하지 않으므로 필요하면 `Down2Excel()` 호출 전에 입력값을 직접 검증해야 합니다.
- 비밀번호를 설정하려면 파일이 서버의 특정 경로에 먼저 저장된 뒤 비밀번호가 걸리므로, 비밀번호가 없을 때처럼 브라우저로 바로 내려가지 않습니다.
- 서버모듈 버전별 요건: 서버모듈 1.1.84는 이 기능을 쓸 수 없어 **1.1.120**(또는 1.1.76-3.10) jar와 JSP, POI 3.10으로 교체해야 했습니다. 서버모듈 2.x에서는 **2.0.36** jar에서 개발되었고, 화면에서 파일명에 `xlsx` 확장자를 붙여 호출하면 그 버전부터 쓸 수 있습니다. 화면에서는 확장자 없이 또는 `.xls`로 보내고 `Down2Excel.jsp`의 `down.setFileType()`으로 확장자를 바꾸는 사이트에서는 비밀번호가 동작하지 않는 버그가 있었고 **2.0.88**에서 최종 패치되었습니다. 간단한 확인 방법은 `setFileType`이 `"excel"`/`"xlsx"` 중 무엇으로 설정되어 있는지 보는 것입니다.

**서버모듈 1점대에서 쓰는 방법**
- `Down2Excel.jsp`에서 `workbook.write(out2);`를 주석 처리하고 `com.ibleaders.ibsheet7.ibsheet.excel.ProtectXLSX.encryptXLSX("d:/", ibExcel.getWorkbookPassword(), workbook, out2);`의 주석을 해제합니다. 화면에서는 `WorkbookPassword`를 넘깁니다.
```
var param = {FileName:"ExcelDownloadText.xlsx", WorkbookPassword:"1234abcd", SheetDesign:1, Merge:1, AutoColumnSize:1};
mySheet.SetDown2ExcelUrl("../jsp/Down2Excel_password.jsp");
mySheet.Down2Excel(param);
```

**서버모듈 2점대에서 쓰는 방법**
```
//화면단에서 비밀번호 받기
var pass = document.getElementById("pass").value;
mySheet.Down2Excel({FileName:"test.xlsx", WorkbookPassword:pass});
```
`Down2Excel.jsp`에서 "다운로드 1. 생성된 문서를 브라우저를 통해 다운로드"(`down.downToBrowser();`)는 주석 처리하고, "다운로드 2. 생성된 엑셀 문서를 서버에 저장" 부분의 `/* … */` 주석을 해제합니다. 여기서 `String passWord = down.getWorkbookPassword();`로 전달된 비밀번호를 취득하고 `down.saveToFile(경로)`로 서버에 저장합니다. 저장 경로(`d:/` 등)는 서버에서 임시 파일을 저장할 경로로 바꿔 쓰는 예시 값입니다. 임시 경로가 필요하면 `System.getProperty("java.io.tmpdir")+"/"`를 쓰고, 비밀번호 처리는 `fileName.toLowerCase().endsWith(".xlsx") && !"".equals(passWord)`일 때 별도 파일(`encrypt.xlsx`)을 만들어 진행하는 예시를 안내했습니다.

**공통 비밀번호를 쓰고 싶을 때**: `String passWord = down.getWorkbookPassword();` 대신 다음처럼 `Down2Excel.jsp`에서 고정 값을 공통으로 지정할 수 있다고 안내했습니다.
```
String passWord = Base64.getEncoder().encodeToString("1234".getBytes());
```
(`java.util.Base64`를 사용)

**오류별 확인 결과**
- 비밀번호를 맞게 넣어도 열리지 않거나 특정 PC에서만 안 되는 경우: **`commons-codec`을 가장 높은 버전 하나(1.10)만 남기고 모두 삭제**하도록 안내했습니다. 서버모듈 2.x의 공식 배포 버전은 1.10이고 최소 버전은 1.6이며, 사용 중인 `decodeBase64`는 기록상 "104 버전까지"는 써야 한다고 안내되어 있습니다(표기 그대로). `NoSuchMethodError: org.apache.commons.codec.binary.Base64.decodeBase64(...)`가 났던 사례가 이 경우입니다. 원인을 보려면 catch 안의 `e.printStackTrace();` 주석을 풉니다.
- 리눅스에서 `encryptXLSX` 호출이 포함되면 파일명이 깨지고 다운로드가 안 되는 증상: POI가 비밀번호를 설정하는 과정에서 폰트 정보를 확인하는데 서버에 **freetype 라이브러리**가 없어서 생기는 것으로 추정했습니다. `ldconfig -p | grep freetype`로 설치 여부를 확인하고, 없으면 리눅스 서버에 폰트 관련 라이브러리와 기본 폰트를 설치합니다.
- 일부 사례(원격으로 이것저것 해 보다가 갑자기 됨)는 원인이 확인되지 않았습니다.
- POI 4.12를 적용했을 때 파일이 열리지 않은 사례는 서버모듈 2.1.3 jar를 배포해 처리했습니다.

- 비밀번호 기능은 서버모듈 **2.0.36**에서 추가되었고 xlsx일 때만 가능합니다. POI 3.15에서는 xls 다운로드는 되나 xlsx 다운로드가 되지 않아 지원이 어렵다고 답했고(당사 엑셀모듈은 POI 3.13 기준, 3.14까지 사용 가능), 서버모듈 2.1.3·POI 3.13에서 비밀번호 다운로드 오류가 난 사례는 `ibsheet.js` 7.0.13.232-20231106-1644와 `ibsheet7-2.1.11.jar`를 배포했습니다. ActiveX의 `ExcelDownloadPassword` 같은 API는 IBSheet7에 동일하게 없고, `Down2Excel`의 `WorkbookPassword` 인자로 넘기면 됩니다. 사용자에게 비밀번호를 받으려면 팝업이나 input 같은 입력 구간을 화면에 만들어야 합니다.

**키워드**: WorkbookPassword, 엑셀 비밀번호, 엑셀 암호화, ProtectXLSX, encryptXLSX, saveToFile, setFileType, POI 3.10, commons-codec, freetype, ibsheet7-2.0.36, ibsheet7-2.0.88, 서버모듈 1.1.120

### [DRM-06] 열기 비밀번호가 걸린 엑셀을 업로드할 수 있나

**질문**
- IBSheet 3.x에서는 암호화된 엑셀을 업로드할 때 암호 입력 창이 있었는데 IBSheet7에서도 되는가?
- 비밀번호가 걸린 엑셀을 업로드할 때 비밀번호를 입력하면 풀어서 올리는 기능을 구현하고 싶다.
- POI를 3.17 이상(또는 4.1)으로 올려 암호화된 엑셀을 DB로 읽어 들이려 한다. 그러면 IBSheet 엑셀 익스포트가 안 된다.
- 엑셀 업로드 시 암호가 걸린 파일에서 무한 로딩이 된다.

**답변**
- **열기 암호가 걸린 파일의 업로드는 지원하지 않습니다.** 쓰기 암호만 걸린 파일은 업로드할 수 있습니다. (읽는 기능은 POI 버전이 올라가야 하는데 당시에는 POI 3.14까지만 쓸 수 있다고 답변했습니다. 그 뒤 POI 버전 지원 범위는 이 문서의 POI 버전 항목([LIB-03])을 참고하세요.)
- 파일을 열 때 암호 입력 창이 뜨는 것은 ActiveX의 동작입니다. ActiveX는 클라이언트 PC의 엑셀을 직접 실행해서 엑셀이 알아서 창을 띄웠지만, IBSheet7은 파일을 서버로 보내 서버에서 읽습니다.
- 암호를 지정해 업로드되게 하려면 기능을 새로 개발해야 합니다. 이때 사용자에게 입력받은 비밀번호를 `LoadExcel`의 인자로 넘기면 보안 문제가 생길 수 있으므로, 업무 프로세스에서 해당 업무의 엑셀 비밀번호를 동일하게 규정하고 서버 쪽 `LoadExcel.jsp` 환경설정에 비밀번호를 넣는 방식으로 개발해야 한다고 안내했습니다.
- 사용자가 직접 암호 또는 DRM을 해제해서 올리거나, 서버에 복호화를 설치해야 합니다. 암호 걸린 파일에서 로딩 이미지가 계속 표시되는 현상은 서버 쪽 에러이므로 `LoadExcel.jsp`의 try-catch를 확인합니다. ("DRM·암호가 걸린 파일을 브라우저에서 읽는 경우…"([DRM-03]) 참고)
- POI 3.17로 올려서 암호화된 xls를 읽던 사이트(서버모듈 2.0.49, POI 3.10 → 3.17)는 시트 엑셀 익스포트가 실행되지 않았습니다. 업그레이드 계획은 없다고 답했고, `ibsheet7.jar`에 xlsx 비밀번호가 설정된 부분을 읽어 처리하는 코드가 있으니 그것을 참고하라고 안내했습니다.

**키워드**: 암호 걸린 엑셀 업로드, 열기 암호, 쓰기 암호, 암호 입력 창, POI 3.17, 무한 로딩

## PRF · 대용량·메모리·속도

### [PRF-01] 엑셀 다운로드에서 OutOfMemoryError(힙 부족)가 난다 — xls와 xlsx, 파일 버퍼 모드

**질문**
- Down2Excel(또는 DirectDown2Excel)로 다운로드하면 `OutOfMemoryError: Java heap space`(또는 `GC overhead limit exceeded`)가 난다. 메모리를 얼마나 늘려야 하는가? 최대 몇 건까지 가능한가?
- 힙 덤프를 분석해 보니 `Down2Excel.makeExcel()`에서 메모리 누수가 있어 보인다. (서버모듈 1.1.113)
- xlsx로 받는데도 OOME가 난다. 컬럼 105개, 1만 행이 넘는 7MB 정도의 내용에서 서버가 죽는다.
- 이미지가 포함되면 OOME가 나고 이미지를 빼면 정상 다운로드된다.
- 엑셀 다운로드 때 서버 temp 폴더에 xml 임시 파일이 쌓이고 0바이트 파일이 많아 리눅스 파일 개수 한계로 톰캣이 죽는다.
- xlsx 다운로드 중 에러가 나다가 WAS를 재기동하면 다시 된다.

**답변**
**원인과 건수 기준**
- 건수 기준은 정해져 있지 않습니다. 서버의 동시 접속자, 서버가 하는 일, 데이터 크기에 따라 모두 다릅니다. 메모리를 얼마나 늘려야 하는지도 단정할 수 없고, 서버모듈 2.0이라도 xlsx로 받는다고 OOME가 없어지는 것은 아닙니다.
- 힙 메모리 오류는 메모리 누수가 아니라 **`.xls` 확장자로 받을 때 전체 데이터가 한 번에 메모리(힙)에 올라가는 구조** 때문에 발생합니다. 대용량을 xls로 받으면 빈번하게 일어납니다. xls는 행·열 한도도 있습니다(엑셀 2003 기준).
- 이미지가 포함된 경우는 특정 시점에 올라가는 이미지 크기의 합이 서버 가용 메모리보다 크면 OOME가 납니다. 이미지를 빼고 다운로드하거나 10개씩 끊어 받는 방식으로 해결했습니다.

**확장자에 따른 동작과 설정**
- `xls`: 전체 데이터를 메모리에 올리고 처리합니다.
- `xlsx`: 일부 행만 메모리에 두고 나머지는 임시 파일에 쓰는 방식으로 동작(임시 파일 위치는 `System.getProperty("java.io.tmpdir")`)해 메모리를 적게 씁니다. OOME를 피하려면 `FileName`에 xlsx 확장자를 지정하거나 `Down2Excel.jsp`에서 `setFileType`으로 공통 지정합니다.
```
mySheet.Down2Excel({FileName:"test.xlsx"});
```
- `Down2Excel.jsp`의 **[사용자 환경 설정 #0-1]**: 생성자를 `new Down2Excel(true)`로 바꿉니다. `new Down2Excel()`/`new Down2Excel(false)`는 `XSSFWorkbook`을 쓰고 데이터가 서버 메모리에 모두 남아 힙 오류를 일으킬 수 있고, `true`는 `SXSSFWorkbook`을 쓰며 메모리에 보관할 행 수만 유지하고 나머지는 임시 파일에 씁니다. 반드시 xlsx 확장자를 써야 하고 **`ReportXMLURL`은 쓸 수 없습니다**.
```
// 변경 전
Down2Excel ibExcel = new Down2Excel();
// 변경 후 (메모리 대신 파일버퍼 사용)
Down2Excel ibExcel = new Down2Excel(true);
```
- **[사용자 환경 설정 #0-2]**: `ibExcel.setBufferSize(1000);` 처럼 파일 버퍼 크기를 조정합니다. 100~5000 사이이고 기본값은 100입니다. 값이 작으면 파일 입출력이 늘고, 크면 메모리 사용이 늘어납니다.
- **[사용자 환경 설정 #16]**: 임시 파일 삭제 설정이 있으므로 서버에 임시 파일을 만든 뒤 삭제 처리가 되는지 확인합니다. POI 3.13 이상이어야 temp 폴더를 정확히 정리합니다.
- 임시 경로(`java.io.tmpdir`)는 읽기/쓰기 권한이 있어야 합니다.
- 서버모듈 2.0.71 이상은 스트리밍 방식을 지원하며 기본값은 "사용 안 함"입니다. `down = new IBSheetDown(); … down.setExcelBuffer(100);` 처럼 메모리에 올릴 행 수를 지정합니다. (SXSS 워크북으로 설정됨)
- **DirectDown2Excel**(서버모듈 1점대): `new DirectDown2Excel()`의 기본값(`true`)이 파일 버퍼를 쓰며 xlsx 확장자일 때만 동작합니다. 대용량이면서 이미지를 쓰면 `new DirectDown2Excel(false)`를 쓰라는 안내가 있으나 `false`는 모든 데이터를 메모리에 올려 대용량에서는 실패할 수 있습니다. 클라이언트 옵션을 `true`로 해도 서버가 데이터를 조회하는 단계에서 메모리가 부족하면 다운로드가 실패하므로 조회 쿼리 단계부터 메모리 관리가 필요합니다. 한 사례에서는 DirectDown2Excel 사용 시 임시 폴더에 파일이 계속 쌓이는 문제로, 임시 폴더를 만들지 않는 `false` 옵션(서버모듈 1.1.80에서 추가)을 안내했습니다.
- **임시 파일 XML이 수천 개 쌓여 `TOO MANY OPEN FILES`가 나면서 WAS가 멈추는 사례**(오픈 파일 최대값 65,000, `ibsheet7-1.1.76.jar`, POI 3.9)에는 서버모듈 최신 버전과 최신 `Down2Excel.jsp`를 보내면서 다음 세 가지를 **반드시 추가**하고 테스트하도록 안내했습니다. (1) `ibExcel.setBufferSize(1000);` (버퍼 사이즈, 기본은 사용 안 함, 100~5000 사이 값 사용 가능) (2) `Synchronizer.setProcess(ibExcel);` (오류 발생 시 강제 종료 후 자원 반환) (3) `ibExcel.close();` (사용한 객체 종료 처리). 업로드(`LoadExcel`)에서 `Synchronizer.release();`가 `try` 아래에 있는 구버전(55 버전 등)은 상위 버전에서 `finally`로 들어가 있으므로 버전을 올리면 해결됩니다.
- **임시 폴더가 사라져서 xlsx 다운로드가 실패**하는 경우가 있습니다. WAS를 재기동하면 임시 폴더가 다시 만들어져 정상화됩니다. 근본 해결 방법으로는 (1) WAS 재기동, (2) temp 폴더가 없으면 다시 만들도록 수정해 다시 컴파일한 POI 교체, (3) 같은 로직이 추가된 `ibsheet7-*.jar`로 교체를 안내했습니다. (교체를 요청할 때는 `ibsheet.js` 상단의 버전과 `WEB-INF/lib`의 jar 이름이 필요)
- 한 번에 받기 어려운 양은 업무 화면에서 다운로드를 나누는 방식을 고려하라고 안내한 사례가 있습니다. (예: 시트 12개를 4개씩 3개 파일로 쪼개 받고 싶다는 요구에 대해, DRM을 쓰고 있어 `Down2ExcelBuffer`로도 어렵고 서버 메모리도 부족할 것이므로 고객과 업무를 나눠 다운로드하도록 안내)
- 1.x 서버모듈에서 2.x로 올리고 JDK 1.6 환경이라 POI 5.x를 쓸 수 없어서 POI는 기존 버전을 두고 jar와 js만 올린 사례도 있습니다. 이때 1점대에서 쓰던 "병합 영역 2번째 행부터 값 비우기" 처리는 2점대 JSP가 Workbook을 넘기지 않아 이식할 수 없었고, 병합 영역의 모든 행에 같은 값이 들어간다고 고지했습니다.
- 힙 덤프 분석에서 `org.apache.xmlbeans … Saver$TextSaver` 스택이 보이는 OOME 사례(국가 통계 시스템)는 개발팀 이슈 링크만 기록되어 있어 결론이 기록에 없습니다. vlookup 수식이 들어간 엑셀 업로드 때 "엑셀 파일을 읽는 도중 예외"와 메모리 과다 사용 사례는 최신 제품을 적용한 뒤 다시 논의하기로 했다고만 기록되어 있습니다.

**키워드**: OutOfMemoryError, OOME, Java heap space, GC overhead limit exceeded, xls xlsx 차이, Down2Excel(true), SXSSFWorkbook, setBufferSize, setExcelBuffer, 파일 버퍼, java.io.tmpdir, 임시 파일 누적, DirectDown2Excel(false), 이미지 포함 OOME

### [PRF-02] ReportXMLURL을 못 쓰는 대용량 다운로드에서 제목·머리글을 넣으려면

**질문**
- `Down2Excel(true)`를 쓰면 `ReportXMLURL`이 제한된다는데 어떤 부분이 제한되는가?
- `ReportXMLURL`을 쓰면 데이터 건수가 많을 때 병합은 반영되는데 텍스트가 표시되지 않는다. 제목·날짜·조건을 넣으려면 어떻게 하는가?

**답변**
- 파일 버퍼 방식(`Down2Excel(true)`, xlsx)은 일부 행만 메모리에 두고 나머지를 디스크에 기록하는 구조라서 엑셀 다운로드 시 머릿글·바닥글을 설정하는 **`ReportXMLURL` 기능이 제한**됩니다. ("엑셀 다운로드에서 OutOfMemoryError가 난다"([PRF-01]) 참고)
- 대신 **`TitleText`, `TitleAlign`, `UserMerge`**로 제목과 병합 영역을 지정합니다. 단, `ReportXMLURL`과 똑같이 만들 수는 없습니다.
```
var titleText = title+"\r\n"+today+"\r\n"+strCondition;
var userMerge = "0,0,1,"+exportcount+" 1,0,1,"+exportcount+" 2,0,1,"+exportcount;
var params = { Merge:1, SheetDesign:1, TitleText:titleText, UserMerge:userMerge,
   FileName:sheetName + ".xlsx", SheetName:sheetName, HiddenColumn:print_hidden, DownCols:(targetCol == "" ? null : targetCol) };
this.IBSObject.Down2Excel(params);
```
  `UserMerge`는 "시작 행, 시작 열, 병합할 행 수, 병합할 열 수"를 공백으로 구분해 나열합니다. (예: `"0,0,2,8 2,1,1,5 3,1,1,5 4,0,1,5 4,6,1,2"`)
- 제목 행(1~3행) 스타일은 `Down2Excel.jsp`에서 `Workbook workbook = ibExcel.makeExcel();` 아래에 `workbook.getSheetAt(0)`의 1~3행을 가져와 폰트(크기·굵기·밑줄), 정렬, 행 높이를 `CellStyle`로 설정하는 코드를 붙여서 지정합니다. 병합되어 있으므로 첫 셀에만 스타일을 적용합니다.
- 다른 방식으로, 임시 파일을 ZIP으로 열어 `xl/styles.xml`에 폰트·셀 스타일을 DOM으로 추가하고 `xl/worksheets/sheet1.xml`의 1~3행만 StAX 스트리밍으로 수정하는 방식(`Down2Excel(true)` → SXSSFWorkbook 스트리밍 생성 → 임시 파일 저장 → 위 수정 → 전송 → 임시 파일 삭제)도 JSP로 안내한 기록이 있습니다. xlsx 대량 다운로드에서 OOME 가능성이 있어 전달한 대안입니다.

**키워드**: ReportXMLURL 제한, TitleText, TitleAlign, UserMerge, 엑셀 제목 행, 머릿글, Down2Excel(true), 대용량 제목

### [PRF-03] 엑셀 업로드가 느리거나 서버 메모리를 과하게 쓴다 — 파일 크기 제한

**질문**
- LoadExcel로 3만 건(또는 몇천 건)을 읽는데 느리다. OOME가 난다.
- 사용자가 60MB 이상 파일을 올려서 서버가 죽었다. 최대 행 제한을 걸었지만 업로드 후에 체크해서 메모리를 계속 쓴다.
- 업로드 전에(JSP 또는 `LoadExcel` 호출 전에) 파일 크기를 제한하는 방법은?
- `LoadExcel`과 `DirectLoadExcel`은 어떻게 다른가?
- 엑셀을 업로드하면 천 건이 넘는 데이터를 DB에 넣을 때 건당 1초 정도로 느리다.
- 엑셀 다운로드 후 다시 저장한 파일은 업로드가 느려졌다. (xlsx)
- 업로드 속도가 느린 이유가 로드한 내용을 서버에 저장하려는 것이라면, 로드 없이 서버에 바로 저장할 수 있는가?

**답변**
- LoadExcel은 파일을 서버로 보내 서버에서 읽고 결과를 다시 화면으로 응답하는 방식이라 파일이 크면 느리고 OOME가 날 수 있습니다. 서버에 올라온 뒤에는 파일 전체를 읽어야만 제한(워크시트 수, 행·컬럼 수) 처리를 할 수 있으므로, **서버로 보내기 전에 파일 크기를 막는 것이 효과적**입니다. POI의 버퍼링(SXSSF) 방식은 다운로드에만 적용되고 업로드에는 적용할 수 없습니다.
- **화면에서 제한**: `LoadExcel`, `DirectLoadExcel`의 `MaxFileSize`(단위 MB) 속성을 씁니다. 제품 7.0.13.27 이상, IE는 11 이상에서 사용할 수 있습니다. 공통 설정은 `SetLoadExcelConfig`로 합니다. 빈번한 엑셀 작업이면 1~2MB 정도로 제한하길 권했습니다.
```
mySheet.LoadExcel({MaxFileSize:2});
mySheet.SetLoadExcelConfig({"FileExt": "xlsx", "MaxFileSize": 2});
```
- **서버(JSP)에서 제한**: `LoadExcel.jsp`, `DirectLoadExcel.jsp` 상단에서 `request.getContentLength()`를 검사해 기준보다 크면 `LoadExcelError`를 호출하고 돌려보냅니다.
```
int iLen = request.getContentLength();
if( iLen > 1048576 ){
    OutputStream out4 = response.getOutputStream();
    out4.write(("<script>var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[0].LoadExcelError({Code:-4,Msg:'업로드 파일은 1Mbyte 이하만 가능합니다'}); </script>").getBytes("UTF-8"));
    out4.flush();
    return;
}
```
- 은행 업무 서버에서 60MB 이상 파일 업로드로 서버가 문제를 겪은 사례에서는, 용량이 큰 파일은 서버가 일단 읽은 뒤 제한 개수만큼만 올리므로 `setMaxColumns`를 `Limit`로 올린 것보다 **파일 자체가 전송되도록 허용한 것이 문제**라고 답했습니다. 이 사이트는 이전부터 대용량 엑셀을 올려 쓰던 사용자들 때문에 용량 제한을 두지 않았고 "스레드가 5분 이상 멈춰 있으면 kill"하는 처리를 `LoadExcel.jsp`에 넣었던 것으로 기억한다는 기록이 있으며, 안정적인 운영을 위해서는 특정 용량 이상은 업로드하지 못하게 하라고 권했습니다. 용량 제한은 `ibsheetinfo.js`의 업로드 호출 함수 params에 `MaxFileSize:2`(2MB)를 주는 방식으로 적용했습니다. `setMaxColumnLimit`가 undefined로 나온 경우는 개발 환경의 jar가 낮은 버전이어서였습니다. 제품을 올린 뒤 1만 건 초과 시 오류 알림이 뜨지 않은 사례는 "엑셀 업로드 제한 오류가 나는데 알림이 뜨지 않는다"([PRF-04])에 정리했습니다.
- **LoadExcel과 DirectLoadExcel의 차이**: 둘 다 화면의 시트 정보와 엑셀 파일을 서버로 보내고, 서버에 파일을 쓴 뒤 내용을 읽습니다. `LoadExcel`은 읽은 정보를 화면으로 응답하고, `DirectLoadExcel`은 읽은 정보를 **바로 DB에 저장**하는 로직(사용자 구현)으로 넘깁니다. 결국 파일을 서버에 쓸 때 용량이 크면 OOME가 나므로 파일 크기 제한이 필요합니다.
- DB 저장이 느린 경우: 시트는 엑셀 데이터를 서버로 넘기는 역할만 하고, 받은 내용을 DB에 저장하는 것은 사용자가 만든 로직입니다. 행마다 DB로 보내고 있는 것으로 보여 **다건 insert를 한 번에 하는 방식으로 저장 로직을 점검**하라고 안내했습니다.
- 다시 저장한 엑셀 파일이 느린 이유: 파일을 다시 저장하면 엑셀 내부 구조가 바뀌어, 시트에서 바로 받은 원본은 POI가 숫자 셀로 인식하지만 다시 저장한 파일은 **수식 셀**로 인식합니다. 수식에서 값을 추출하는 시간이 조금 더 걸려 셀이 많으면 누적됩니다. 제품에서 지원하기 어려운 사항이라고 답했습니다.
- 로드 없이 서버에 바로 저장하려면 `DirectLoadExcel`로 서버의 저장 로직 마지막에 완료 응답을 돌려주면 됩니다. (예: `request.getAttribute("SHEETDATA")`의 List로 저장한 뒤, 저장 건수를 `alert`로 표시하고 `window.parent.postMessage('IBSheetOnLoadExcel^…^2^EXCEL^Append=0{"Result":{"Code":1,"Message":"ExcelDone"},"data":[]}', '*')`를 `out.println`으로 출력)
- `DirectLoadExcel`에서 `request.getAttribute("SHEETDATA")`가 null일 때는 JSP 대신 서블릿(컨트롤러, `IBSheetLoad`)으로 작성하는 방안과 서버모듈 2.1.5 jar를 안내했습니다.

**키워드**: LoadExcel 속도, 엑셀 업로드 OOME, MaxFileSize, SetLoadExcelConfig, getContentLength, LoadExcelError, DirectLoadExcel, SHEETDATA, 수식 셀 인식, 대용량 업로드 제한

### [PRF-04] 엑셀 업로드 제한 오류가 나는데 알림이 뜨지 않는다 (1만 건 초과, Timeout)

**질문**
- 제품(ibsheet.js)을 올린 뒤 대량이체 화면에서 1만 건을 올리면 업로드 공통 팝업이 나타나지 않고 오류 메시지 alert도 뜨지 않는다. (이전에는 오류 메시지가 떴다)

**답변**
- 원인: ibsheet.js 버전을 올리면서 그 사이에 패치된 **업로드 오류 처리 구간**을 함께 수정해야 했는데 반영되지 않았습니다.
- 수정은 두 곳입니다.
  1. `LoadExcel.jsp`에서 `targetWnd.Grids[0].LoadExcelError();`를 `targetWnd.Grids[0].LoadExcelError({"Code":-500});`로 바꿉니다. 주석 포함 5곳 모두 변경합니다.
  2. `ibsheetinfo.js`의 `ibsheet_OnLoadExcelEventOverride`에 `case -110`(Timeout 강제 종료 메시지)과 `default`(기타 음수 에러는 기존 경고창으로 처리)를 추가합니다.
```
case -110 :   // Timeout 강제 종료 메시지 처리
   alert(window[gid].Lang.Alert[msg]);
   break;
default:
   window[gid].ShowAlert(msg, "U");
   break;
```
- 이렇게 하면 1만 건 이상 업로드 시 오류 메시지가 나오면서 업로드가 취소됩니다.

**키워드**: LoadExcelError, Code -500, -110, Timeout 강제 종료, ibsheet_OnLoadExcelEventOverride, 업로드 1만 건 제한

### [PRF-05] 엑셀 다운로드가 오래 걸리거나 타임아웃·504가 난다

**질문**
- 1,000건 이상 다운로드하면 오류가 난다. WAS의 Read Timeout을 늘려도 같다. (제우스)
- 개발·운영(제우스)에서만 Down2Excel이 간헐적으로 실패하고 로딩바가 계속 표시되며 한참 뒤 "URL not found"가 뜬다. 서버 로그에는 특별한 오류가 없다.
- 엑셀로 받을 때 `504 Gateway Timeout`이 온다.
- 54만 건을 엑셀로 받는데 6분이 걸린다. (DirectDown2Excel을 쓰면 더 빠르다고 들었다)
- 이미지가 2,000개 정도 들어 있는 시트를 받으면 느리다.
- 41컬럼 × 2,675건을 받는데 몇십 분 걸리고 다운로드가 안 된다. 특정 화면에서는 받아도 엑셀이 깨진다.
- PAMS 같은 시스템에서 엑셀 업로드·다운로드 때문에 CPU 점유율이 과하다.
- 시트가 3개 있는 화면에서 한 시트의 다운로드만 느리다.

**답변**
- **Read Timeout**: 엑셀 다운로드 시 화면의 시트 정보와 데이터를 multipart 형태로 전송하는데, 데이터가 너무 크면 서버가 다 읽기 전에 시간이 초과되어 `Read timed out`이 발생할 수 있습니다. **WAS의 read-timeout 설정을 확인하고 더 길게** 설정하도록 안내했습니다.
- **504 Gateway Timeout**: HTTPS가 적용된 환경에서 이미지가 있는 시트를 다운로드하면 row가 한 건이어도 발생하는 사례가 있습니다. (1) `DownCols`로 이미지 컬럼을 제외하고 다운로드하거나 (2) 서버를 호출하지 않고 `ExportMode:2`로 클라이언트에서 바로 다운로드합니다.
- **이미지가 많을 때의 속도**: JPEG, PNG, GIF를 모두 지원하기 위해 `ImageInputStream`으로 이미지를 생성하는 부분이 있고, 이를 `BufferedInputStream`으로 교체하면 소폭 개선(2,000개 기준 평균 35.7초 → 28.9초)할 수 있으나 그 이상 빠르게 하기는 어렵다고 분석했습니다. 수정 jar는 유지보수 계약이 되어 있는지 확인한 뒤 jar와 ibsheet.js를 배포하는 조건이었습니다.
- **특정 화면에서만 느리거나 데이터가 깨지는 경우**: 시트는 엑셀 다운로드 때 데이터의 시작과 끝을 구분하는 특수 구분 기호(키보드로 입력할 수 없음)를 삽입하는데, 특정 데이터에 이 구분 문자열이 포함되면 문제가 생깁니다. 서버모듈을 올리고 이 부분을 적용하지 않아서 생긴 것으로 보고 두 가지를 안내했습니다. (1) `ibsheet.cfg`에 `DocIODelimMode:1` 설정 (2) `Down2Excel.jsp`에서 주석 처리된 `down.setDelimMode(1);` 주석 해제.
- **54만 건 사례**: DirectDown2Excel로 받으면 10분 넘게 걸린다는 이야기에 대해 조회 속도와 큰 차이가 없을 것이라고 답했고, 고객 쪽에서 개인정보 암호화 모듈을 DirectDown2Excel 경로에서 태우고 있어 그것 때문인 것 같다고 하여 테스트 후 공유하기로 했습니다. 일부 PC에서만 다운로드가 안 되는 사례도 문의에 있었으나 답변 기록에는 원인이 없습니다.
- **CPU 점유율 과다**: 조회 건수·다운로드 행 수 제한은 업무 결정이 필요한 사항이라 제품 관련 설정만 안내했습니다. 업로드는 파일 크기 제한(`MaxFileSize`), 다운로드는 스트리밍 방식(`down.setExcelBuffer(100)` 등)을 쓰도록 했습니다. ("엑셀 업로드가 느리거나 서버 메모리를 과하게 쓴다"([PRF-03]), "엑셀 다운로드에서 OutOfMemoryError가 난다"([PRF-01]) 참고)
- 시트 3개 중 1개만 느린 사례와 41컬럼 × 2,675건이 느린 사례의 "속도" 자체는 고객 쪽에서 서버 설정을 바꿔 해결했다는 기록만 있습니다.

**키워드**: Read timed out, read-timeout, 504 Gateway Timeout, 이미지 다운로드 속도, DocIODelimMode, setDelimMode, CPU 점유율, 엑셀 다운로드 지연, ExportMode 2

### [PRF-06] 서버모듈 1.x와 2.x의 메모리 동작 차이, 그리고 한계

**질문**
- 서버모듈 1.1.xx에서 xlsx로 받는데도 OOME가 난다. (SXSSF 방식으로 알고 있었는데 왜 그런가?)
- 서버모듈을 1.0에서 2.0으로 올리면 성능을 개선할 수 있는 옵션이 있는가? 건수 제한이 얼마나 늘어나는가?
- 3만 건 이상을 `DirectDown2Excel`로 내릴 때 운영 서버에서 에러가 난다. 3만 건 이상에는 부적합한가?
- 3만 건이 느려서 브라우저에서 직접 다운로드하고 싶다.
- 엑셀 다운로드 속도가 너무 느리다. (4,000라인 정도)
- 다운로드한 엑셀에서 데이터를 편집하려고 하면 매우 느리다.

**답변**
- **1.0 대 서버모듈**은 확장자에 따라 `HSSF`(xls), `XSSF`(xlsx) 방식으로 처리해 데이터를 메모리에 모두 올립니다. **2.0 대부터 `SXSSF`를 통해 메모리가 개선**되었다고 안내했습니다. 그러나 이 설명은 이후 **정정**되었습니다. 서버모듈 1.0에서도 `Down2Excel`을 호출할 때 인자를 `true`로 주면 `SXSSF` 방식으로 처리되며(서버모듈 1.1.61에서 추가), 이 부분을 다르게 안내한 이전 답변을 정정했습니다. 그래서 메모리 부족 문제는 서버모듈을 최신 1.x(`1.1.121` 이상) 또는 2.0 대로 바꾸고 파일 버퍼 모드를 쓰도록 안내했습니다. 단순히 1.0에서 2.0으로 올린다고 건수 제한이 획기적으로 늘어난다고 보장할 수 없고, 성능 개선 옵션도 따로 없습니다.
- 1점대에서도 파일 버퍼 방식을 쓸 수 있는 버전이 있습니다. `ibsheet7-1.1.106`이나 `1.1.81`처럼 다운로드할 데이터를 모두 메모리에 올리는 버전은 **1.1.127**, **1.1.121**로 교체해 `Down2Excel(true)` 방식을 쓰도록 안내했습니다. 교체할 때는 "IBSheet7 버전 업그레이드 주의사항" 문서를 따라야 하고, jar만 교체하고 JSP는 그대로 둔 채 잘 된다고 하는 경우는 서버 jar가 반영되지 않았을 가능성이 크다고 안내했습니다.
- 서버모듈 1.*에서는 옵션(스타일, 병합 등)이 적용되어 있으면 제거해 보고 `Down2Excel.jsp`의 사용자 환경 설정 #0의 옵션을 적용하도록 했고, 그래도 해결되지 않으면 서버모듈 2.* 로 올리도록 했습니다. xlsx로 받더라도 이미지가 많거나 디자인(`SheetDesign:1`)이 많아질수록 메모리 사용률이 올라갑니다.
- **서버에서 `ResultSet`을 `List`로 만들 때 메모리가 부족한 경우**(DB에서 데이터를 한꺼번에 받는 경우)는 서버모듈로 해결할 수 없고, 건수를 제한하거나 **핸들러(`RowHandler`, `ResultHandler`, iBatis/MyBatis의 `ObjectHandler` 등)로 엑셀 다운로드를 직접 구현**해야 한다고 답했습니다. 대용량 다운로드를 위해 시트의 엑셀 모듈 대신 핸들러로 직접 구현하라는 안내도 같은 취지입니다.
- 내부 SAX 파서로 읽고 쓰려면 POI를 쓰지 않는 설정이 있습니다. xlsx 파일에만 동작합니다.
```
//Down2Excel.jsp
down = new IBSheetDown();
down.setUsePOI(false);
//LoadExcel.jsp
load = new IBSheetLoad();
load.setUsePOI(false);
```
- **클라이언트 모듈**(서버를 경유하지 않는 방식)은 1천 건 이상은 권장하지 않아서 그 이하일 때 쓰라고 안내했고, 3만 건이라면 서버모듈 외에 다른 방법이 없다고 답했습니다. 클라이언트 모듈은 IE10 이상 모던 브라우저에서 지원되며, DRM이 걸린 엑셀 파일을 읽을 수 없고 많은 데이터는 권장하지 않는 것이 단점입니다.
- 다운로드한 엑셀의 편집이 매우 느린 사례는 `Down2Excel` 시 **`WordWrap` 기능을 끄면** 정상 동작할 것이라고 안내했습니다. 4,000라인이 느린 사례(제품 7.0.13.99, jar 2.0.52)는 2.0.85 버전을 배포했습니다.
- `DirectDown2Excel`은 xlsx 확장자이면 기본적으로 `SXSSF` 방식으로 다운로드하도록 jar 내부에서 설계되어 있습니다. JSP에 `org.apache.poi.ss.usermodel.Workbook`이 import되어 있다고 해서 SXSSF가 아닌 것은 아닙니다. 다만 `Down2Excel`도 xlsx면 SXSSF를 쓰는지 묻는 질문에는 "1.0 대는 확장자에 따라 HSSF/XSSF, 2.0 대부터 SXSSF로 메모리가 개선되었다"고 답했습니다.
- 컬럼이 338개인 화면에서 3천 건을 받다가 OOME로 시스템이 다운된 사례(서버모듈 1.1.118, POI 3.9 기반)는, 서버 메모리를 쓰는 구조라 데이터량이나 동시 접속자가 많으면 OOME가 날 수 있고 WAS 메모리를 올리는 방법밖에 없다고(다운로드 개수 제한 기능은 없음) 답했습니다. 대신 **POI 3.13 기반으로 개발한 모듈은 서버 메모리를 쓰지 않고 temp 폴더에 이어 쓴 뒤 최종 한 개의 파일을 내려주므로** jar를 교체하면 OOME도 해결되고 대용량 속도도 빨라진다고 안내했습니다. 교체 방법: (1) `ibsheet.cfg`의 JSP 경로에 첨부한 JSP를 적용(사용자 지정 변수는 기존과 같게), (2) 첨부한 `lib` 폴더를 `WEB-INF/lib`에 적용(기존 POI 3.9와 기존 `ibsheet7-1.1.118.jar` 삭제).
- 서버모듈 2.0은 서버 메모리 자원 효율에 초점을 맞춰 만들어져 기능은 1.0보다 부족합니다. 2.0으로 올렸더니 기존과 너무 다르다는 문의에는 "그냥 1.0을 쓰는 게 맞을 듯"하다고 답한 기록이 있습니다. (예: `ReportXMLURL`은 1.0에서만 쓸 수 있고, 2.0에서는 사용할 수 없습니다.) 서버모듈 2.0에 1점대에서 쓰던 일부 처리 로직이 이식되지 않는 사례도 있습니다.
- 서버모듈은 POI 3.13 또는 4.1을 지원하고, 서버의 `WEB-INF/lib`에 관련 jar가 있어야 합니다. 제품 패키지의 `lib-3.13` 또는 `lib-poi4` 폴더 중 **하나만** 적용하고(내용이 중복되면 안 됨), 기존 jar는 모두 삭제한 뒤 `ibsheet7-2.1.0.jar`를 적용합니다. 어떤 jar를 참조하는지는 `Down2Excel.jsp`의 `System.out.println(Version.getVersion());` 주석을 풀어 확인하고, 에러가 나면 Exception의 `e.printStackTrace();` 주석을 풀어 봅니다.

**키워드**: 서버모듈 1.0, 서버모듈 2.0, SXSSF, XSSF, HSSF, ibsheet7-1.1.127, setUsePOI, SAX 파서, RowHandler, ResultHandler, 클라이언트 모듈 한계, WordWrap, lib-3.13, lib-poi4

### [PRF-07] 엑셀 업로드에서 서버가 죽는다 — 100만 셀, 여러 시트, 빈 행 (setMaxRows, 오류 코드)

**질문**
- 엑셀에서 `Ctrl+End`를 눌렀을 때 100만 행(셀)까지 데이터가 있다고 나오는 파일을 올리면 서버가 죽는다. 빈 행까지 100만 행인 파일이다. 서버 CPU를 100% 점유한다. (`setSkipEmptyRow(true)`, `setMaxRows(100)`도 소용이 없다)
- 엑셀 파일에 시트가 3개 있고 필요한 시트는 첫 번째 시트(42컬럼 × 16행)뿐인데, 서버 힙 덤프를 보니 마지막 시트(2만 행 이상)까지 로드했다. 첫 번째 시트만 읽는 것이 기본 동작이 될 수 없는가?
- 10~35MB 파일을 올리면 응답은 200인데 화면에서는 계속 진행 중이라는 메시지만 뜬다.
- 5MB 정도 파일에 빈 행까지 100만 행이 있다. `setMaxRow(500)`을 설정하면 오류 메시지 없이 아무 반응이 없다.
- 업로드 용량과 행 수 제한을 각각 5MB, 2만 행으로 두고 있는데 더 크게 풀고 싶다. LoadExcel 성능을 높이거나 DirectLoadExcel로 해결할 수 있는가?
- 엑셀 업로드 후 서버 메모리 과다 사용의 근본 해결책은?

**답변**
- 서버모듈은 **들어온 파일 전체를 읽은 뒤** 매핑되는 워크시트를 찾아 파싱합니다. 필요한 시트가 하나뿐이어도 전체 파일을 읽으므로 메모리 오류가 데이터 파싱 전에 이미 발생할 수 있습니다. 이 경우 worksheet를 지정하는 옵션이나 `LoadExcel.jsp`의 행·컬럼·워크시트 수 제한 옵션은 **파일을 먼저 읽은 뒤에 적용**되므로 효과가 없습니다.
- OOM이 나는 경우는 대체로 두 가지입니다. (1) **파일 용량이 너무 큰 경우**, (2) **엑셀 파일에서 `Ctrl+↓` 등으로 포커스가 최하단에 있는 경우** 엑셀이 그 위치까지 데이터가 있는 것으로 보고 워크북 객체를 만들면서 과하게 루프를 돌게 되는 경우. (2)는 `LoadExcel.jsp`의 `setMaxRows`/`setMaxColumns`로 행·컬럼 수를 제한합니다.
- **파일 크기 제한**(근본 대책): `LoadExcel`의 `MaxFileSize`(IE는 11부터)를 먼저 쓰고, IE 10 이하에서는 동작하지 않으므로 서버(`LoadExcel.jsp`)에서도 `request.getContentLength()`로 다시 검사합니다. (예: 크기 초과 시 `throw new Exception("에러 발생 파일 사이즈 초과");`) 서버 메모리가 정상적으로 파일을 읽었다고 해도 시트가 화면(클라이언트)에서 정상 처리하지 못합니다.
```
sheet.LoadExcel({MaxFileSize:5}) // IE는 11부터 지원
int filesize = request.getContentLength();
if(filesize>30){ throw new Exception("에러 발생 파일 사이즈 초과"); }
```
- 제한 크기에서도 오류가 나면 **서버 메모리를 늘리는 수밖에** 없습니다. 서버 자원을 쓰지 않는 방법으로 클라이언트 업로드 방식(`ibexcel.js` 추가)이 있지만 xlsx만 가능하고 DRM 파일은 처리할 수 없습니다. 10~35MB 파일에 대해서는 "서버에서 OutOfMemoryError가 났을 것이고, 큰 파일은 서버에 쓰지 못하게 해야 한다"고 답했습니다.
- `setMaxRow` 제한이 걸렸을 때 아무 반응이 없던 사례는 `OnLoadExcel` 이벤트에서 `msg`를 받아 처리해야 했습니다. 개발팀이 확인해 준 오류 유형별 메시지는 다음과 같습니다.
  - JSP 예외: `setService` 호출 시 메모리 확인 `-11^IBSheet_Server_OutOfMemory`, 파일 읽을 때 `-10^OverMaxFileSize`
  - `IBSheetOnLoadExcel` 메시지: 데이터를 가져올 때 데이터 크기 비교 `-1^OverMaxRow`, `-3^maxColumns[n] over`, 전문과 엑셀의 헤더가 일치하지 않을 때 `-2^NoMatchedHeader`
- 업로드 성능을 개선하려면 최신 서버모듈 2.0과 `setUsePOI(false)`(내부 SAX 파서, xlsx만) 설정을 안내했습니다. (설정 코드는 "서버모듈 1.x와 2.x의 메모리 동작 차이, 그리고 한계"([PRF-06]) 참고) `LoadExcel`이 `DirectLoadExcel + DoSearch`로 볼 수 있는지 묻는 질문에는 최신 서버모듈과 위 설정을 안내했으며 직접적인 답은 기록에 없습니다.
- 파일 업로드 시 "메모리 방식 / 임시 디렉터리를 만들었다가 삭제하는 방식"이 있는지 묻는 질문에는, 해당 사이트는 POI를 쓰는 버전이 아니라 지원이 어렵고, 임시 폴더를 통해 엑셀 파일을 생성하는 기능은 **다운로드 관련 기능이고 업로드에는 제공되지 않는다**고 답했습니다.
- 낮은 버전 jar에서는 `LoadExcel`의 `MaxFileSize`를 쓸 수 없어서(11MB 파일에서 서버가 죽은 사례), `MaxFileSize`를 지원하는 서버모듈 2.0.61 jar와 JSP를 배포했습니다. 대용량 파일 업로드 때 서버 인스턴스 하나가 죽던 사례에는 OOME 처리가 추가된 서버모듈 2.0.60 jar를 배포했습니다.
- `LoadExcel.jsp`가 SAX 방식인지 DOM 방식인지 묻는 사례에서, 전달된 JSP는 DOM 방식이었고 `NPOIFSFileSystem`을 쓰려면 POI 3.10 이상이 필요하다고 답했습니다. 컨트롤러 방식으로 옮기는 것은 코드가 특별히 바뀌는 것이 아니라 서블릿에서 호출되도록 코드를 옮기는 것이며, 이때 `ibsheet.cfg`나 js에서 `Down2ExcelUrl`로 호출 URL을 바꿔 줍니다. ("JSP를 쓸 수 없는 Spring 환경에서 서버모듈을 쓰려면"([DWN-11]) 참고)
- `onLoadExcel`에서 `for` 루프로 데이터를 강제 변환하느라 400건 업로드에 1분이 걸린 사례도 있었습니다. 데이터 수가 많아질수록 느려지므로 이벤트 안에서 전체 행을 돌며 값을 바꾸는 처리는 피해야 합니다.
- 서버 코드에서 요청 본문을 읽는 부분을 고친 사례도 있습니다. 기존에는 `DataInputStream`으로 `request.getContentLength()`만큼 `in.read(data.dataBytes, totalBytesRead, formDataLength)`로 읽었는데, 수정본은 `request.getInputStream()`을 1024바이트씩 `ByteArrayOutputStream`에 쓴 뒤 `data.dataBytes = baos.toByteArray();`로 받도록 바꿨습니다.

**키워드**: 엑셀 업로드 서버 다운, Ctrl+End 100만 행, setMaxRows, setMaxColumns, setSkipEmptyRow, OverMaxFileSize, OverMaxRow, NoMatchedHeader, IBSheet_Server_OutOfMemory, OnLoadExcel, 여러 시트 업로드, MaxFileSize, ibexcel.js

### [PRF-08] Down2Excel과 DirectDown2Excel의 처리 방식 차이와 속도

**질문**
- 6,500건 × 117컬럼을 엑셀로 저장하는 데 40분이 걸렸다. 서버에서 하는 작업이 무엇이고 어떻게 빠르게 하는가?
- `DirectDown2Excel`을 쓰라고 안내받았는데 샘플을 직접 만들기가 어렵다. 두 방식의 차이와 서비스 단 샘플을 더 줄 수 있는가? DB 조회도 오래 걸리는데 무엇이 더 효과적인가?
- `DirectDown2Excel`로 다운로드가 끝나는 시점에 반환값을 받고 싶다.

**답변**
- **`Down2Excel()`**: 시트에 조회된 데이터를 하나의 문자열로 묶어 `ibsheet.cfg`에서 지정한 URL로 전달하고, 공통 JSP(`Down2Excel.jsp`)가 받은 내용으로 엑셀 파일을 생성해 클라이언트로 돌려줍니다. 대량이면 클라이언트에서 데이터를 조합하는 시간과 서버에서 엑셀을 만드는 시간이 모두 들어 오래 걸립니다.
- **`DirectDown2Excel()`**: 화면에서는 시트의 기본 정보(헤더 타이틀, 컬럼 유형 등)만 서버로 보내고 서버에서 DB의 데이터를 직접 가져와 엑셀을 만들어 다운로드합니다. 화면에서 데이터를 조합하는 시간과 서버로 대량 데이터를 보내는 트래픽을 줄일 수 있어 대량 다운로드에서 성능이 좋습니다. 단 조회 시간이 오래 걸리는 쿼리라면 `DirectDown2Excel`에서도 데이터를 가져오는 시간이 오래 걸립니다. 그래도 많은 데이터를 받으려면 `DirectDown2Excel`을 써야 합니다.
- 제공한 샘플이 최선이고, 프레임워크까지 포함한 샘플은 제공하지 않는다고 답했습니다. `DirectDown2Excel`의 콜백 인터페이스는 별도 문서("IBSheetHTML DirectDown2Excel Callback Interface")가 있고 요청 시 전달했습니다. 도움말(개발자 가이드)의 `DirectDown2Excel()` 설명에 자세한 내용이 있습니다.
- 다운로드 완료 시점의 반환값을 받는 방법은 기록에 답변이 없고, 대기 이미지가 뜨지 않는 문제에 대한 덤프 생성 가이드와 임의 진행 바를 쿠키로 닫는 참고 코드를 안내했습니다. ("엑셀 다운로드 진행 표시(대기 이미지)가 닫히지 않거나 끊긴다"([PRF-10]) 참고)
- 클라이언트 모듈로 서버를 거치지 않는 방법이 있으나 천 건 이상은 권장하지 않습니다. ("서버모듈 1.x와 2.x의 메모리 동작 차이, 그리고 한계"([PRF-06]) 참고)

**키워드**: Down2Excel DirectDown2Excel 차이, 대량 다운로드 속도, DirectDown2Excel 콜백, 서버에서 DB 직접 조회, 클라이언트 조합 시간

### [PRF-09] POI 3.8 이하나 SXSSF 임시 파일 때문에 생기는 문제 (setXlsxTempFolderMode)

**질문**
- 엑셀 다운로드와 텍스트 다운로드가 안 된다. (`Down2Excel`에서 500 에러, POI 3.8 사용)
- 서버에서 OutOfMemoryError가 간헐적으로 나는데 엑셀 다운로드를 의심한다. `Down2Excel.jsp`의 `setXlsxTempFolderMode` 기본값이 무엇인가?
- 서버모듈 2.0을 적용했더니 2만 4천 건을 받을 때 `NoSuchMethodError: org.apache.poi.xssf.streaming.SXSSFWorkbook.getSheetAt(I)…`가 난다. (`ExcelPOIHandler.deleteSXSSFTempFiles`)

**답변**
- 서버모듈 2.0의 권장 POI는 **3.8 beta3 이상**이고, POI 3.8에서도 `Down2Excel`의 기능적 결함은 없습니다. 다만 xlsx 대용량 다운로드에서는 서버모듈 2.0이 `XSSF`가 아니라 `SXSSF`로 내려받고, SXSSF가 만든 시트는 운영체제 임시 폴더에 남는데 이를 `poi-ooxml`의 `dispose` 메서드로 지웁니다. **`dispose`는 POI 3.9 이상부터 지원**하므로 3.8을 쓰면 임시 폴더를 수동으로 정리해야 합니다.
- 정리하면 (1) POI 3.8에서도 엑셀 기능은 쓸 수 있지만 임시 폴더에 파일이 남는 문제가 있어 수동 관리가 필요합니다. (2) 수동 관리가 어려우면 `Down2Excel.jsp`의 사용자 환경 설정 17번 `setXlsxTempFolderMode`의 인자를 `false`로 지정해 SXSSF가 아닌 XSSF 방식으로 받습니다(대용량 처리 속도는 현저히 느려짐). (3) 운영 서버의 POI를 제공하는 3.13으로 올립니다.
- `setXlsxTempFolderMode`는 WAS의 temp 폴더를 사용하지 않는 기능이고 **기본은 "사용"** 입니다. 주석을 풀어 쓰지 않는 설정으로 바꾸면 메모리 사용량이 더 늘어납니다. 메모리 문제가 엑셀 다운로드에서 의심되면 데이터가 많지 않은 화면은 클라이언트 모듈(`ExportMode`를 2로 설정하고 `ibexcel.js`를 화면에 링크, IE10 이상)로 받아 다운로드 부하를 분산하라고 안내했습니다.
- `SXSSFWorkbook.getSheetAt` `NoSuchMethodError`는 서버모듈 2.0과 맞지 않는 낮은 POI 버전이 올라가 있는 경우입니다. 이 사례는 서버모듈 1.0이 메모리 오류로 엑셀 다운로드·업로드를 할 수 없어 방문해서 서버모듈 2.0을 적용했고, temp 폴더에 권한이 전혀 없는 상태였습니다. (원인이 된 POI 버전 정리 방법은 "POI와 함께 써야 하는 라이브러리 목록"([LIB-01]) 참고)

**키워드**: setXlsxTempFolderMode, SXSSF, dispose, POI 3.8, deleteSXSSFTempFiles, NoSuchMethodError SXSSFWorkbook, 임시 폴더 수동 삭제, ExportMode 2

### [PRF-10] 엑셀 다운로드 진행 표시(대기 이미지)가 닫히지 않거나 도중에 끊긴다

**질문**
- 다운로드가 끝나도 대기 이미지가 닫히지 않는다.
- 엑셀 다운로드가 오래 걸릴 때 진행 중 바가 중간에 끊긴다. `WaitTimeOut`과 관련이 있는가?
- 한 시트의 다운로드만 느리고 끝난 뒤에도 대기 이미지가 닫히지 않는다.

**답변**
- 진행 바는 다운로드 시작점에 쿠키에 값을 넣고 `OnDownFinish()` 시점에 값을 지워 이미지를 숨기는 방식으로 동작합니다. 도중에 끊긴다면 **세션(30분으로 설정된 경우)보다 오래 걸리는 다운로드에서 세션이 끊겨 다운로드가 안 되는 것**으로 보입니다. `WaitTimeOut`은 조회/저장과의 시간만 설정하므로 엑셀 다운로드와는 무관합니다.
- 임의의 진행 바를 만들어 쿠키로 닫는 참고 코드는 다음 순서로 동작합니다. (1) 임의의 진행 바 생성 (2) 동시에 `Interval` 객체 생성 (3) 엑셀 다운로드가 완료된 뒤 임의의 쿠키 값을 만들어 `response.addCookie(cookie);`로 클라이언트에 전송 (4) `Interval`이 쿠키 값의 변화를 감지하면 진행 바를 닫음. 대기 이미지가 뜨지 않는 문제는 덤프 생성 가이드 문서로 원인을 분석했습니다.
- 한 시트만 느리고 대기 이미지가 닫히지 않던 사례는 서버 설정을 바꿔 해결했다는 기록만 있습니다. 로딩 이미지가 닫히지 않으면 서버 측 에러를 의심해 `e.printStackTrace()`를 확인하라고 안내한 사례는 "DRM·암호가 걸린 파일을 브라우저에서 읽는 경우…"([DRM-03])에 있습니다.

- 사이트가 `DirectDown2Excel` 호출 후 서버 쪽 처리를 제공 모듈 대신 **직접 POI로 구현**하면서 대기 이미지를 닫지 못하는 사례에서는, 쿠키를 이용하는 방식에서 **전문의 `downloadTokenValue` 값과 `fileDownloadToken` 쿠키 값이 일치**해야 한다고 정정해서 안내했습니다.

**키워드**: 대기 이미지, 로딩바 안 닫힘, OnDownFinish, 쿠키, WaitTimeOut, 세션 만료, 다운로드 진행 바

### [PRF-11] 엑셀 열 너비·행 높이가 화면과 다르거나 편집이 느리다

**질문**
- Wrap과 멀티라인을 적용했는데 다운로드한 엑셀에서 위쪽 20줄 정도만 화면과 같은 높이로 나오고 그 아래는 기본 폭·높이로 좁게 나온다.
- 시트에서 만든 엑셀 파일에서 컬럼·행을 추가하거나 수정하면 매우 느린데, 시트 내용을 빈 엑셀에 붙여 넣고 수정하면 빠르다. 25,000건을 받아 편집하면 "응답 없음"이 된다.

**답변**
- 엑셀 다운로드 때 시트는 헤더, 컬럼, 행 높이, 조회 데이터를 전문으로 만들어 서버로 보냅니다. **화면에 렌더링된 행까지는 화면의 행 높이로** 보내고, **렌더링되지 않은 행은 기본값(21)의 높이**로 전문을 만듭니다. 모든 행을 화면에 표시하는 방식(`SearchMode: 0`)이면 모든 행의 높이대로 받을 수 있지만 데이터가 많을수록 화면 렌더링 속도가 영향을 받습니다. 다운로드할 모든 행(헤더 포함)의 높이를 같게 하려면 `ExcelRowHeight`를 사용합니다.
```
// 모든 행의 높이를 50px로 설정
mySheet.Down2Excel({ExcelRowHeight:50});
```
- 편집이 느린 경우는 `WordWrap` 속성과 관련이 있을 것으로 보고 공통에서 `WordWrap:0`으로 설정하라고 안내했고, `SheetDesign`도 `0`으로 설정해 보라고 안내했습니다. 25,000건 사례는 엑셀 관련 속성을 모두 제거한 뒤에도 편집이 느린지 확인해 달라고 안내했습니다.

**키워드**: ExcelRowHeight, 엑셀 행 높이, 렌더링 안 된 행, SearchMode, WordWrap, SheetDesign, 엑셀 편집 느림

### [PRF-12] 엑셀 다운로드 중 "Server Busy"가 나오거나 동시에 한 건만 처리된다 (Synchronizer)

**질문**
- 소스가 동일한데 운영에서만 `[엑셀 다운로드 중 오류가 발생하였습니다.]`가 뜬다. (`Server Busy`, Synchronizer, `ibsheet7-1.1.83.jar`)
- `DirectLoadExcel.jsp`의 `Synchronizer.init(1);`로 정의하면 1건의 엑셀 업로드가 진행 중일 때 다른 요청은 바로 리턴하는 것 아닌가?
- 엑셀 업로드 때 기존에 쓰던 `Synchronizer.init(5);`, `Synchronizer.use(false);`를 새 버전에서 대체할 함수가 있는가?
- 다운로드 오류 후 `WAS`를 재기동하거나 `Synchronizer.init(10)` 개수를 조정해도 계속 오류가 난다. (경기신용보증재단: DRM 서버가 내려가서 동작하지 않았던 사례도 있음)

**답변**
- `Synchronizer`는 동시에 처리할 엑셀 작업의 개수를 제한합니다. 오류 발생이나 사용자 취소 등으로 `Synchronizer`가 해제되지 않으면 이후 요청이 `Server Busy`로 거절될 수 있습니다. 이를 위해 **오류 발생·사용자 취소 등으로 해제되지 않은 경우 자동으로 해제하는 기능을 추가한 서버모듈 `ibsheet7-1.1.126.jar`** 를 배포했습니다(확장자 `jarx`를 `jar`로 바꿔서 사용).
- 이때 `Down2Excel.jsp`에 다음 두 가지를 추가해야 하며 관련 JSP를 함께 전달했습니다.
```
Synchronizer.setProcess(ibExcel); // 오류 발생 시 강제 종료 후 자원 반환 처리
ibExcel.close();                  // 사용한 객체 종료 처리
```
- 한 사이트(`Synchronizer.init(1)`)의 질문에는 7.1.121 모듈을 전달했다는 기록만 있고, `Synchronizer.init(5)`/`use(false)`를 2.x에서 대체할 함수를 묻는 질문은 `ibsheet7-2.1.42.jar` 배포로 처리되었으며 대체 함수는 기록에 없습니다.
- DRM 서버가 내려가서 다운로드가 안 되던 사례는 원인이 IBSheet가 아니라 DRM 서버였습니다. ("엑셀·텍스트 다운로드에 DRM을 적용하려면"([DRM-04]) 참고)

**키워드**: Synchronizer, Server Busy, Synchronizer.setProcess, ibExcel.close, ibsheet7-1.1.126, 동시 다운로드 제한

## FMT · 엑셀 서식·이미지·표현 한계

### [FMT-01] 다운로드한 엑셀의 서식(텍스트·숫자·날짜)을 원하는 대로 만들려면

**질문**
- ActiveX에서는 날짜·숫자 컬럼도 Text 서식으로 내려왔는데 IBSheet7에서는 어떻게 하는가? (모든 컬럼을 텍스트 서식으로 받고 싶다)
- `AllTypeToText`를 true로 하면 셀이 "텍스트"가 아니라 "일반"으로 내려온다. 텍스트 서식으로 받는 방법은?
- 다운로드한 엑셀의 서식이 어떻게 되는가? (타입별)
- `Type:"Int"`로 받으면 통화 서식으로 떨어진다. 숫자 서식으로 내릴 수 있는가?
- `Float` 컬럼인데 매출 금액에 콤마가 안 보이고 일반 서식으로 내려온다.
- 텍스트 컬럼 타입이 숫자로 내려오지 않아 합계 계산이 안 된다.
- `2021.11.02` 형태의 날짜를 엑셀에서도 그대로 받고 싶다. (엑셀에서는 `2021-11-02`로 나온다)
- `mmddyyyy` 포맷을 `DirectDown2Excel`로 내리면 서식이 적용되지 않는다.
- `ZeroToReplaceChar:"-"`, `EmptyToReplaceChar:"-"`가 `DirectDown2Excel`에서 적용되지 않는다.
- 콤보 컬럼에서 특정 몇 개만 `ComboText`가 아닌 `ComboCode` 값으로 내리고 싶다.
- 엑셀에서 쉼표 스타일을 누르면 금액 앞에 `$`가 붙는다.
- 엑셀 서식이 일반인 컬럼에 `1111111111.11`을 입력해 올리면 지수 형태로 바뀐다. (서버모듈 2.0, 1.0은 정상)
- 화면에서는 주민번호를 `*`로 마스킹하고 엑셀 다운로드에서는 원본 값이 보이게 하고 싶다.

**답변**
- **모든 컬럼을 텍스트 서식으로**: `Down2Excel`에서 다음 인자를 함께 설정합니다.
```
sheet.Down2Excel({NumberTypeToText:1, AllTypeToText:1, TextToGeneral:0});
```
  - `TextToGeneral`: `Type:"Text"` 컬럼을 일반 서식으로 받을지 텍스트 서식으로 받을지(기본 1=일반). **서식 관련 인자**입니다.
  - `NumberTypeToText`: `Type:"Int", "Float"`을 Text 타입으로 받을지(기본 0). **타입 관련 인자**입니다.
  - `AllTypeToText`: `Int`, `Float`를 제외한 나머지 컬럼 타입을 Text 타입으로 받을지(기본 0). 이 인자는 원래 설정된 `Format`도 모두 무시합니다.
  - 콤보는 `TextToGeneral`의 영향을 받지 않고 일반으로 내려옵니다.
  - 매뉴얼에 "AllTypeToText 사용 시 TextToGeneral 설정값을 무시한다"고 적힌 부분은 설정값이 아니라 **앞 문장의 포맷을 무시한다는 뜻**으로 보아야 하며, 설명이 잘못되어 있어 수정하겠다고 답변했습니다. 텍스트 타입 컬럼만 텍스트 서식으로 받으려면 `TextToGeneral:0`, 날짜·콤보 등 다른 컬럼도 텍스트 타입으로 바꾸고 텍스트 서식으로 받으려면 `AllTypeToText:1, TextToGeneral:0`을 같이 씁니다.
- **타입별 기본 서식**: `Type:"Text"`는 일반(기본, `TextToGeneral`로 결정), `Type:"Date"`는 날짜 서식, `Type:"Int"`는 통화 서식, `Type:"Float"`/`AutoSum`(`Format`을 설정하지 않았거나 `Float`로 설정한 경우)은 사용자 지정 서식입니다.
- `Float` 금액에 콤마가 없는 경우는 `NumberFormatMode:1`을 설정해 보라고 안내했습니다. ("엑셀 업로드·다운로드 값 형식"([FMT-02]) 참고) `Int`를 통화가 아닌 숫자 서식으로 내릴 수 있는지는 추가 문의가 없어 완료 처리되었고 답변이 기록에 없습니다.
- **텍스트 컬럼 합계**: 텍스트로 설정된 컬럼을 일반 서식으로 내려도 숫자형이 아니면 **합계 계산이 정확히 되지 않습니다.**
- **날짜 구분자**: 화면에 보이는 포맷에 `.`가 `DateSeparator`가 되도록 설정하면 엑셀도 그렇게 내려옵니다. `Date` 타입에 `Ymd`를 쓴 경우 (1) `ibmsg`에서 `"SYS_DateSeparator":"."`, `"SYS_d":"yyyy.MM.dd"`로 바꾸거나 (2) `Format`에 `Ymd` 대신 `yyyy.MM.dd`를 설정합니다. 두 방법 모두 보이는 대로 다운로드됩니다.
- **`DirectDown2Excel`의 한계**: `MM-dd-yyyy` 포맷이 정상 반영되지 않아 기능 구현이 필요하다고 답했고, 해당 사이트는 쿼리를 수정해 처리하기로 했습니다. `ZeroToReplaceChar`/`EmptyToReplaceChar`는 화면 표시용 속성이며 내부 값은 빈 값/0 그대로여서 저장이나 문서 연동에는 적용되지 않으므로, `DirectDown2Excel`에서는 **쿼리(또는 쿼리 결과)에서 빈 값/0을 치환하는 로직을 직접 구현**해야 합니다.
- **콤보 컬럼의 일부만 코드 값으로**: 그런 기능은 없고, 원하는 형태의 **숨김 컬럼을 하나 만들고 `DownCols`로 엑셀 다운로드 때 그 컬럼을 내려받게** 하면 됩니다.
- **`$` 표시, 서식 오류**: xls로 다운로드할 때 생기는 증상이며 **xlsx로 받으면 해결**됩니다. (`mySheet.Down2Excel({FileName:"test.xlsx"})`) 제품 수정은 어렵다고 답했습니다.
- 서버모듈 2.0에서 일반 서식 셀의 `1111111111.11`이 Text 컬럼에 지수 형태로 올라오는 문제는 1.0과 달라서 이슈로 등록되었고 처리 결과가 기록에 없습니다. 주민번호 마스킹과 원본 다운로드 요구는 메일로 답변했다는 기록만 있습니다.

- `TextToGeneral:0`으로 호출했는데 **빈 데이터가 일반 서식으로** 내려오던 증상은 `ibsheet.js` 7.0.13.221과 서버모듈 `2.1.7`(기존 2.0.45 삭제)로 패치했습니다. `Float` 컬럼의 쉼표 스타일에서 달러 표시가 되는 문제에는 최신 서버모듈과 `NumberTypeToText` 가이드를 보냈습니다.

**키워드**: TextToGeneral, NumberTypeToText, AllTypeToText, 엑셀 텍스트 서식, 엑셀 서식 일반, 날짜 구분자, DateSeparator, ZeroToReplaceChar, EmptyToReplaceChar, 쉼표 스타일 $, 통화 서식, 지수형

### [FMT-02] 엑셀 다운로드에서 숫자 서식·콤마·DownCols 공통 제외 등 자주 쓰는 옵션

**질문**
- 엑셀 다운로드에서 컬럼 이름에 `_except` 같은 정해진 문자열이 있으면 그 컬럼을 빼고 다운로드하고 싶다. JSP마다 설정하지 않고 공통으로 하는 방법은?
- 엑셀 다운로드 시 내용에 맞춰 컬럼 너비를 자동으로 조절하는 옵션이 있는가?
- 숨김 처리된 컬럼은 아예 다운로드하지 않고, 엑셀 시트의 맨 첫 줄을 비워 두고 싶다.
- `Down2Excel`로 받으면 시트에 보이는 것과 다른 컬럼이 내려온다.
- 같은 CSV를 `Down2Text`로 받을 때 구분자를 세미콜론(`;`)으로 바꾸고 싶다.
- 제목과 소제목의 폰트 크기와 정렬을 각각 설정하고 싶다.
- 엑셀 다운로드 시 비밀번호의 자릿수 설정 옵션이 있는가?

**답변**
- **컬럼 제외**: `Down2Excel()` 호출 시 `DownCols`에 숨김 처리되지 않은 컬럼만 직접 지정하거나, `ColHidden`인 컬럼은 내려받지 않도록 함수를 하나 만들어 쓰라고 안내했습니다. `_except` 같은 이름 규칙을 공통으로 처리하는 방법은 메일 답변으로 안내했다고만 기록되어 있습니다.
- **컬럼 너비 자동 조절**: 전용 옵션은 없고 우회 방법이 있습니다. `fitSize("컬럼명", 1)`을 `Down2Excel` 호출 전에 실행하면(두 번째 인자 1=norender) 화면에는 반영되지 않고 컬럼의 가장 긴 문자열(1~100행 범위) 기준으로 너비가 조정됩니다. 다운로드가 끝나는 `onExportFinish` 이벤트에서 `sheet.setColWidth("컬럼명", 50)`처럼 원래 너비로 되돌립니다. (v8 문서를 기준으로 안내한 내용)
- **첫 줄 비우기**: `Down2Excel()`에는 `startRow`가 없으므로 `TitleText`에 빈값을 하나 지정해서 받아 보도록 안내했습니다.
- 숨긴 컬럼은 `DownCols`로 내려받을 컬럼을 지정합니다. ("다운로드한 엑셀에서 헤더 색이 흰색이거나 머지·여러 그리드 합치기가 안 된다"([DWN-14]) 참고)
- `Down2Text`의 구분자는 `ColDelim`으로 지정합니다. (`mySheet.Down2Text({FileName:'myfile.csv', ColDelim:";"})`)
- 제목·소제목 스타일은 `Header`에 `Style`을 지정하는 방식을 안내했습니다.
```
Header: [ { Text: "제목", Align: "Center", Height: 30,
  Style: { FontSize: 25, FontBold: true, FontName: "맑은 고딕", FontColor: "#123456", BackColor: "#99FF88", Border: 0 } }, {...} ]
```
- 비밀번호의 자릿수 같은 규칙은 시트가 검증하지 않으므로 `Down2Excel()` 호출 전에 입력값을 직접 검증해야 합니다. ("엑셀 다운로드 파일에 열기 비밀번호를 설정하려면"([DRM-05]) 참고)

**키워드**: DownCols, fitSize, onExportFinish, 컬럼 너비 자동, TitleText 빈값, ColDelim, Down2Text 구분자, Header Style

### [FMT-03] 엑셀 다운로드에서 지원하지 않는 표현

**질문**
- 셀 기준으로 상하좌우 테두리의 선 두께·스타일을 각각 다르게 적용할 수 있는가? 미리 만든 템플릿을 쓰는 방법은?
- 별도 도형 객체를 추가해 글씨를 적을 수 있는가? 대체로 셀 메모를 삽입할 수 있는가?
- 구글 스프레드시트(`gsheet`) 확장자로 다운로드할 수 있는가?
- 체크한 항목별로 하나의 엑셀 파일에 각각의 시트로 내려받고, 첫 시트는 체크한 전체를 보여 주고 싶다.
- `Down2Text`로 받은 CSV를 엑셀에서 열 때 컬럼 너비를 설정할 수 있는가?
- 엑셀 파일을 읽기 전용으로 내릴 수 있는가?
- 엑셀에서 열 때 특정 PC에서 파일이 잘 열리지 않는다.
- 비밀번호를 걸어 다운로드한 엑셀이 열리지 않는다.

**답변**
- **지원하지 않습니다.**
  - 셀의 상하좌우 테두리 스타일·두께·색상을 개별 지정해서 다운로드하는 것
  - 시트 위에 도형 객체를 추가해 텍스트를 표시하는 것, 셀 메모(Comment) 삽입
  - 구글 스프레드시트 확장자(`xls`, `xlsx`만 가능)
  - 읽기 전용으로 내리는 기능
  - 체크 항목별 시트 분리처럼 범용적이지 않은 형태(지원이 어렵다고 답변)
  - CSV를 엑셀로 열 때 컬럼 너비 지정(엑셀에서도 컬럼 너비를 크게 지정한 뒤 CSV로 저장하고 다시 열면 너비가 줄어 있음)
- 특정 PC에서 열리지 않던 사례는 PC에 엑셀 프로그램이 없고 한셀로 열고 있었기 때문입니다. 브라우저가 제공하는 기본 엑셀 프로그램으로 다시 열어 보라고 안내했고, 한셀은 보증하지 않는 프로그램입니다.
- 비밀번호를 건 엑셀 파일이 열리지 않는 경우는 **Excel 2010 이상**을 설치해야 한다고 안내했습니다.
- 시트 위에 제목 외에 데이터 위쪽에 텍스트를 찍는 기능은 `TitleText`, `ReportXMLURL` 두 가지뿐이며, 상단 제목 텍스트가 `...`로 잘려 내려온다는 문의는 이 두 파라미터의 값을 확인하라고 안내했습니다.

**키워드**: 엑셀 테두리, 도형, 셀 메모, gsheet, 읽기 전용, 한셀, Excel 2010, 지원하지 않는 기능, TitleText

### [FMT-04] 엑셀 다운로드에서 이미지가 안 나오거나 크기가 이상하다

**질문**
- 이미지 컬럼에 base64 데이터를 조회했는데 화면에는 보이는데 엑셀 다운로드에서는 이미지가 나오지 않는다. (15,000건)
- 로컬은 되는데 운영에서는 이미지가 다운로드되지 않는다. 오류에 `The file at … should be served over HTTPS`가 보인다. / 에러도 없이 이미지가 안 내려온다. / 운영 반영 후 이미지가 안 내려온다.
- 이미지가 포함된 엑셀을 내릴 때 서버 콘솔에 `Connection time out`이 찍힌다. (클라우드 전환 사업)
- 이미지가 엄청 크게 내려온다. 이미지 크기를 조절할 수 있는가?
- 병합된 셀의 이미지가 첫 번째 행 크기로만 보인다.
- `The Maximum length of cell contents (text) is 32,767 characters` 오류가 난다.
- 서버모듈 1.0에서 `setImageProcessType` 값 1, 2가 동작하지 않는다.

**답변**
- **이미지가 안 내려오는 경우**: 이미지 파일을 temp 폴더에 쓰는 로직은 없고, 전문으로 전달받은 **이미지 URL을 서버가 직접 내려받는 기능**입니다. 그래서 서버에서 이미지가 있는 서버나 경로에 접속하지 못하면(방화벽 등) 이미지가 빠집니다. 이미지 서버/경로에 대한 방화벽을 열라고 안내했습니다.
- 운영 반영 후 이미지가 안 내려오는 경우는 `Down2Excel.jsp`의 사용자 환경 설정 15번 **`setWebServerDomain()`** 정보를 세팅하라고 안내했습니다.
- 이미지 오류가 나면 `Down2Excel.jsp`의 exception 부분에서 에러 로그를 찍어 확인합니다. 이미지가 많아질수록(xlsx 사용 시에도) 서버가 죽는 문제가 있어 이미지 크기·건수가 서버 메모리보다 클 때 OOME가 납니다. ("엑셀 다운로드에서 OutOfMemoryError(힙 부족)가 난다"([PRF-01]) 참고)
- **이미지 크기**: 이전 ActiveX는 이미지 컬럼의 값을 이미지 인덱스(값이 없으면 -1)로 내려받았고, 지금은 이미지가 **셀 크기에 맞춰** 내려옵니다. `Down2Excel`의 `ImageProcessType`으로 조절합니다.
  - 0: 셀의 가로/세로에 꽉 차게(기본값)
  - 1: 셀의 중앙에 이미지를 원본 크기로 표시(xls 형식에서는 적용되지 않음)
  - 2: 이미지의 원본 가로/세로 비율을 유지하면서 셀에 맞춤
  - 정상적인 이미지 처리를 위해서는 시트 옵션을 `Merge:2`로 설정합니다.
  ```
  sheet.Down2Excel({ ImageProcessType : 1 });
  ```
- **base64 이미지, 병합 셀 이미지**: base64 이미지 컬럼 사례에는 샘플 코드(jsfiddle)로 안내했습니다. 병합된 셀 안의 이미지 크기 문제는 릴리즈 배포로 처리했습니다.
- **32,767자 초과 오류**: 이미지 `src`(base64)가 셀 텍스트에 그대로 들어가 길이가 넘은 경우입니다. 서버 호출 전에 발생하는 `OnBeforeDownload` 이벤트에서 전문 문자열(`frm.Data.value`)의 이미지 `src` 값을 빈 값으로 치환한 뒤 `frm.submit()` 하는 방식으로 안내했습니다.
- 서버모듈 1.0의 `setImageProcessType` 1, 2가 동작하지 않는 문제(2.0은 정상)는 "나중에 시간 나면 처리"로 기록되어 결론이 없습니다.

**키워드**: 엑셀 이미지 다운로드, ImageProcessType, setWebServerDomain, 이미지 URL 접속, base64 이미지, 32767, OnBeforeDownload, Merge 2

### [FMT-05] 엑셀 다운로드에서 머지(병합)가 반영되지 않거나 화면이 느리다

**질문**
- 시트에서 `SetRowMerge`를 했는데 엑셀 다운로드 시 화면과 다르게 내려온다. (`Merge:0, 1, 2` 모두 시도)
- 머지된 시트를 다운로드하면 엑셀에서 머지되지 않은 채로 내려온다.
- 머지된 데이터를 다운로드했는데 엑셀에서 머지 영역을 1건으로 계산하고 싶다.
- 머지된 화면이 느려서 못 쓰겠다.

**답변**
- 코드가 기재되지 않아 판단이 어렵다고 보고 원격 지원을 안내한 사례와, 재현되지 않는 사례(`ColMerge` 속성이 적용되지 않는 현상은 내부에서 재현되지 않음, har/dll/aspx를 보내 달라고 요청)가 있습니다.
- `DownRows`를 설정하면 머지가 반영되지 않는 제약이 있습니다. ("다운로드한 엑셀에서 헤더 색이 흰색이거나 머지·여러 그리드 합치기가 안 된다"([DWN-14]) 참고)
- **머지된 화면이 느린 경우**: `PrevColumnMergeMode`를 쓰려면 `MergeSheet`가 앞 컬럼 머지여야 합니다. 설정과 컬럼 위치를 바꿉니다.
```
mySheet1.SetConfig({SearchMode:2, PrevColumnMergeMode:0, Page:50, MouseHoverMode:0, MergeSheet:msPrevColumnMerge + msHeaderOnly});
```
  이 사례는 시트의 컬럼 위치 변경(예: 회사 컬럼과 직급 컬럼의 위치를 바꾸면 정상적인 머지가 가능)을 안내했습니다.

- 병합한 **이미지 컬럼**은 `Merge:2`로 설정해야 내려오며, 서버모듈 104 이하에서는 지원하지 않아 109 버전으로 올리라고 안내했습니다. `Down2Excel`이 jar가 없던 2012년 시절 파일(oldjsp)이면 병합이 정상적으로 되지 않으므로 최신 버전으로 업그레이드해야 하고 유지보수 계약이 있어야 추가 진행이 가능하다고 답했습니다. 병합 영역의 이미지가 **첫 번째 행 크기로만** 보이는 문제는 릴리즈로 처리했습니다.

**키워드**: SetRowMerge, 엑셀 머지 안 됨, Merge 옵션, PrevColumnMergeMode, MergeSheet, 머지 화면 느림

### [FMT-06] 콤보 컬럼을 엑셀 드롭다운으로 내려받기 (ComboValidation, DownCombo)

**질문**
- 엑셀 다운로드를 콤보(드롭다운) 형태로 받으려고 `ComboValidation:1`을 설정했는데 콤보 형태로 내려오지 않는다. (콤보 건수가 100건 이상일 때 드롭다운이 없다 / 280건일 때 드롭다운이 안 나온다)
- `DirectDown2Excel`에서 `ComboValidation`은 어떻게 쓰는가? 콤보 데이터를 code 또는 text로 보이게 하고 싶다.
- 엑셀에서 드롭다운으로 선택한 Text 값을 업로드할 때 Code 값으로 올릴 수 있는가?

**답변**
- 엑셀 자체의 드롭다운 목록 제약으로 **목록 전체 문자열이 255~256자(바이트)를 넘으면 드롭다운을 만들 수 없습니다.** 그러면 콤보 형태가 아니라 값으로 내려옵니다. 이때 값은 `DownCombo` 설정에 따라 내려오고 기본은 text입니다. 드롭다운이 안 만들어지는데 code로 받고 싶으면 `DownCombo="CODE"`로 설정합니다.
- `DirectDown2Excel`에서도 엑셀 콤보 리스트로 표시하려면 `ComboValidation:1`을 설정하고, code 값이나 text 값으로 표시하려면 `DownCombo`를 설정합니다.
- 업로드할 때는 `Type:"Combo"`로 설정하면 Text 형식의 데이터도 code 값으로 매칭해 줍니다. `Type:"Combo"`가 아닌 컬럼을 Code로 조회하는 기능은 없고, 로드 전후에 직접 가공해야 합니다. (`OnLoadData`는 시트에 바인딩하기 전에, `OnLoadExcel`은 바인딩 후에 발생하며 데이터가 많으면 `OnLoadExcel`이 속도 저하의 원인이 됩니다. `OnLoadData`는 조회·저장·엑셀 업로드 모두에서 발생하므로 구분하는 구문이 필요합니다.)
- .NET 서버모듈은 `ComboValidation`을 지원하지 않습니다.

**키워드**: ComboValidation, DownCombo, 엑셀 드롭다운, 255자, 256바이트, 콤보 text code 다운로드, Type Combo 업로드

### [FMT-07] 엑셀 다운로드에서 다른 서버의 이미지·이미지 경로 (setWebRoot, setAllowDownloadRemoteImg)

**질문**
- 이미지가 링크로 되어 있고 다른 도메인에 있는데 이미지를 같이 다운로드하려면?
- `DirectDown2Excel()`로 다른 도메인의 이미지를 받을 수 있는가?
- 이미지가 다른 파일 서버에 있는데 없는 이미지일 경우 엑셀 파일이 손상되었다고 나온다. 이미지 경로가 잘못된 경우 대표 이미지로 처리할 수 있는가?
- `ibExcel.setWebRoot`로 경로를 지정하는 부분은 무엇인가?
- 이미지를 350개는 받는데 700개는 받지 못한다. (중계 페이지가 이미지를 만들어서 돌려주는 방식)
- 엑셀 칸 세로가 작아서 이미지가 찌그러진다. (772×1079 픽셀)
- 컬럼 Type이 Image인데 `InitCellProperty`로 Text 타입으로 바꿨더니 엑셀에서 값이 내려오지 않는다.

**답변**
- **`Down2Excel`로 다른 서버(도메인)의 이미지**를 받으려면 `Down2Excel.jsp`의 사용자 환경 설정 7번 **`ibExcel.setAllowDownloadRemoteImg(true);`** 를 설정합니다. (제품에는 `SetAllowRemoteImge()` 같은 이름으로도 언급되었으나 같은 기능입니다) 이 기능을 쓰지 못해 `DirectDown2Excel`에서 `setWebServerDomain()`에 다른 서버 도메인을 지정해 받던 사이트도 있었습니다.
- `DirectDown2Excel()`은 이미지를 쓸 수 있지만 **같은 서버의 이미지가 들어 있는 경우에만** 가능하며 `new DirectDown2Excel(false)`로 설정해야 합니다. 다른 서버 것도 내려온다는 사이트가 있어 확인이 필요하다고 기록되어 있습니다.
- **없는 이미지를 대체 이미지로 내려주는 기능은 없습니다.**
- **`setWebRoot`**: 이미지가 동일 서버에 있을 때 `setWebRoot`로 웹 서버의 로컬 경로를 지정해 그 경로의 이미지에 접근합니다. 경로는 `setWebRoot + url 값`으로 구성해 `File` 객체로 이미지를 가져옵니다. 단 `setAllowDownloadRemoteImg(true)`이면 이 속성을 쓸 수 없습니다. 예: `setWebRoot`를 `c:/temp`로 설정하고 이미지 셀 값이 `http://aaa.com/test/image/btn.jpg`이면 `http://aaa.com`을 제거한 `c:/temp/test/image/btn.jpg`에서 이미지를 찾습니다.
- **이미지 경로 설정 세 가지**(`Down2Excel.jsp`): (1) `setWebRoot`(위 설명) (2) `setAllowDownloadRemoteImg`: 이미지 URL이 다른 도메인에 있을 때 true로 설정하며 이미지 셀 값은 `http` 또는 `https`로 시작해야 합니다. (3) `setWebServerDomain`: 물리적인 로컬 접근(`setWebRoot`)으로 이미지를 찾지 못했을 때 동작하는 값이며, 같은 도메인이지만 `test/image/imageDown.jsp?idx=365`처럼 이미지 로딩 방식인 경우 웹 서버 도메인을 설정해야 합니다. 설정하지 않으면 프로토콜, 서버명, 포트 번호를 조합해 기본값을 만듭니다. (예: `setWebServerDomain`이 `http://aaa.com/test/`이고 이미지 셀 값이 `/image/imageDown.jsp?idx=365`이면 `http://aaa.com/test/image/imageDown.jsp?idx=365`에서 이미지를 찾음) 환경에 맞게 설정했는데도 이미지가 나오지 않으면 서버 내에서 http/https 요청이 정상 호출되는지 확인합니다. 보안상 서버 간 요청이 막혀 있을 수 있어, 서버가 이미지 경로에 접근할 수 있게 보안을 풀거나 `setWebRoot`로 로컬 접근하도록 해야 합니다. `loadPicture … Image-loadingFailed` 오류는 서버가 그 DNS로 접근할 수 없어 나는 것이며 같은 원인으로 이미지가 엑셀에 나오지 않으므로 `webRoot`를 설정하도록 안내했습니다.
- 이미지가 많아 일부만 받아지는 경우는 서버 에러도 없었고 **xlsx로 포맷을 바꿔서 받으니 해결**되었습니다.
- 이미지 찌그러짐은 `ExcelRowHeight`(`DirectDown2Excel`)로 해 보겠다고 했고, 시트에서 `SetDataRowHeight()`로 세로 행 길이를 조정해서 받아 보라고 안내했습니다.
- **Image 타입 컬럼은 `InitCellProperty`로 Text 타입으로 바꿔도** 엑셀에서 값이 내려오지 않는 것으로 확인되었습니다.

- **이미지가 모두 안 나오고 아래 100개만 나오는 사례**(`ibsheet.js` 7.0.13.152, `ibsheet7-1.1.76.jar`)는 사용 버전 확인만 기록되어 있고 해결이 기록에 없습니다. 폐쇄망에서 이미지가 안 보이는지 묻는 질문에는 제품이 **이미지를 엑셀 파일에 직접 붙이는 형태**로 동작하므로 폐쇄망이어도 이미지가 보인다고 답했습니다. 옛 버전에서는 이미지 파일 하나라도 오류가 나면 전체를 skip하는 현상이 있어 최신 서버모듈로 교체하도록 안내했습니다.

**키워드**: setAllowDownloadRemoteImg, setWebRoot, setWebServerDomain, 다른 도메인 이미지, DirectDown2Excel 이미지, 이미지 대체, Image 타입 InitCellProperty

### [FMT-08] 데이터에 들어 있는 특수문자 때문에 다운로드가 실패하거나 깨진다

**질문**
- 4월 데이터부터 엑셀 다운로드가 안 된다. (최초 조회에서는 됨)
- 엑셀 다운로드 시 NullPointerException이 난다. (전자정부 프레임워크)
- 엑셀 다운로드 시 `Bad Request`가 발생한다.
- 셀 데이터가 32,767자를 넘으면 에러가 나는데 32,767자만 표현하도록 자를 수 있는가?
- `Down2Excel`을 이용하는데 Null 데이터일 경우 컬럼에 선이 나타나지 않는다.
- 컬럼명이 `AMTC1`, `ABC2`처럼 `C+숫자`로 끝나면 문제가 된다. (새로 추가된 모듈 테스트)
- 특정 화면에서 `&`나 싱글쿼테이션 문자가 저장 시 치환된다(`&` → `&amp;`).
- `&quot;`로 된 데이터가 엑셀 로드가 안 된다.

**답변**
- **제어 문자**: 데이터 중간에 특수문자 `\b`가 들어 있어 오동작한 사례가 있어 입력 시 특수문자를 제거하는 유효성 체크를 넣어 달라고 안내했습니다. `\u0002`, `\u0003` 값이 포함되어 NullPointerException이 난 사례는 `ibsheet.cfg`에서 `DocIODelimMode`를 1로 설정하고 `Down2Excel.jsp`에서 `down.setDelimMode(1);`의 주석을 제거하도록 안내했습니다. ("엑셀 다운로드가 오래 걸리거나 타임아웃·504가 난다"([PRF-05])의 구분 기호 설명 참고)
- **`System(` 문자열**: 데이터에 `"System("` 문자열이 포함된 경우에만 `Bad Request`가 발생했고, 방화벽 또는 스위치 쪽의 보안 설정을 확인하라고 안내했습니다.
- **32,767자 초과**: `Down2Excel.jsp`에서 `String data = ibExcel.getData();`와 `ibExcel.setData(data);` 사이에 전문을 행 구분자(`\u0005`)와 컬럼 구분자로 나누어 각 셀의 길이가 32,767을 넘으면 `substring(0, 32767)`로 자르고 다시 합치는 로직을 넣으라고 샘플 코드를 안내했습니다. (대략적인 샘플이므로 필요에 따라 가공)
- **Null 데이터 셀에 선이 없음**: 전문을 `split`으로 자를 때 맨 마지막이 공백이면 배열이 생성되지 않는 Java `split`의 특성과 관련이 있다고 안내했습니다. (이전 지원 건과 같은 원인)
- 컬럼명이 `C+숫자`일 때의 문제와 `&` 치환 문제는 이슈가 계속 남아 있거나 Redmine 처리 내용으로 안내했다고만 기록되어 있습니다. `&quot;` 데이터는 `&quot;`로 로드되도록 제품을 수정했습니다.
- 이외 원인: 초창기 `oldjsp`를 쓰던 사이트는 **현재는 지원하지 않는다**고 안내하고 최신 jsp, jar를 넣자 해결되었습니다. 다른 사람 PC는 되는데 자기 PC만 안 되던 사례는 jar를 import하지 않은 것이 원인이었습니다.

- **셀 문자 수 한계**: 한 컬럼의 데이터가 32,000자를 넘어 다운로드가 안 되는 사례(서버 메시지가 한 셀 최대 길이 초과)는 엑셀 자체의 한계라고 설명했습니다. 이와 별개로 시트가 전문에서 쓰는 **구분 문자**가 데이터에 들어 있으면 NumberFormatException이나 0KB 파일이 생기는데, 서버모듈이 쓰는 구분 상수는 `TREE_CHAR`(`…`), `DELIM_TITLE`(``), `DELIM_SHEET`(``), `DELIM_HEADER`(``), `DELIM_ROW`(``), `DELIM_CELL_DATA`(``), `DELIM_CELL`(``), `SIGN_TREE_LEVEL`(``), `DELIM_LOAD_RESPONSE`(``, `LoadExcel`/`LoadText`에서 `postMessage` 전송용 로딩정보와 JSON 데이터의 구분자)입니다. 특정 컬럼을 추가한 뒤 0KB 파일이 되고 `NumberFormatException`이 난 사례에 이 목록을 안내했습니다. 문제 컬럼을 제거하면 정상 다운로드되므로 데이터에 위 제어 문자가 섞이지 않았는지 확인합니다.

**키워드**: 다운로드 특수문자, \b, 제어문자, DocIODelimMode, setDelimMode, Bad Request, System(, 32767자 자르기, split 마지막 공백, oldjsp

### [FMT-09] 엑셀 다운로드에 계산식(CalcLogic)을 반영하려면, 컨텍스트 메뉴 공통 적용

**질문**
- 엑셀 다운로드 시 `CalcLogic`이 반영되는 기능은 어디까지 가능한가?
- 모든 화면에서 같은 컨텍스트 메뉴를 보여 주고 싶다. 그 메뉴에서 엑셀 다운로드를 호출하는 방법은?
- 엑셀 다운로드 시 `CountFormat`/`countPosition`에 나오는 정보를 커스터마이징할 수 있는가?

**답변**
- **CalcLogic 반영 범위**: 시트 컬럼 생성 시 부여한 `CalcLogic`의 계산식이 엑셀 파일에 반영됩니다.
  - 지원: 셀 간 계산식(사칙연산) (예: `CalcLogic:"(|A|/2)*100+|C|"`), 합계/소계 행에 대한 계산식(`ShowSubSum()` 함수나 `AutoSum`, `AutoAvg` 타입을 통한 합계 행)
  - 불가: 자바스크립트 함수 사용(예: `"CalcLogic":"Math.round(|A|/7)"`), 외부 자바스크립트 함수를 통한 설정(예: `"CalcLogic":{"TriggerCols":"B|D","Function":function(info){...}}`)
- **공통 컨텍스트 메뉴**: 시트를 생성하는 함수(`IBS_InitSheet()`, `ibsheetinfo.js`에 위치)에서 `SetActionMenu`를 설정하면 모든 화면에 같은 메뉴가 적용됩니다. 메뉴 선택 처리는 `OnSelectMenu` 이벤트를 공통 오버라이드(`IBS_EventOverride`)로 정의합니다.
```
sheet.SetActionMenu("행추가|엑셀다운로드");
IBS_EventOverride("OnSelectMenu", sheet.id, function(sheetid, menuText){
  switch(menuText){
    case '행추가': window[sheetid].DataInsert(); break;
    case '엑셀다운로드': window[sheetid].Down2Excel(); break;
  }
}, 1);
```
  `IBS_EventOverride`는 이벤트명, 시트 ID, 오버라이드에서 쓸 함수, 호출 위치(0: 화면에서 정의한 이벤트보다 앞, 1: 뒤. 기본 0)를 받는 함수로 `ibsheetinfo.js`에 추가합니다. 한 번 오버라이드된 이벤트는 다시 오버라이드하지 않도록 `isOverride` 표식을 확인합니다. 다른 사이트에서는 `IBSheet.js`와 `IBSheet7.js` 같은 별도 파일로 시트 API를 매핑해 쓰던 사례도 있다고 안내했습니다.
- `CountFormat`의 예약어를 가지고 처리해야 합니다.

**키워드**: CalcLogic 엑셀, 합계 행 계산식, ShowSubSum, AutoSum, SetActionMenu, OnSelectMenu, IBS_EventOverride, 공통 컨텍스트 메뉴, CountFormat

### [FMT-10] 엑셀 컬럼 수 한계(256), 폰트, 헤더 테두리 같은 서식 제한

**질문**
- 컬럼이 256개(또는 287개)인데 엑셀 다운로드가 가능한가? (`Invalid column index (256). Allowable column range for BIFF8 is (0..255) or ('A'..'IV')`)
- `SheetDesign:1`과 `ExcelFontSize`를 같이 쓸 때 서버모듈(1.0 / 2.0)에 따라 폰트 크기 반영이 반대로 동작한다.
- 엑셀 다운로드 시 폰트 크기와 글꼴을 바꾸고 싶다.
- 엑셀 헤더 쪽 스타일에서 테두리 설정이 가능한가?
- 일부 셀 이후부터 테두리가 안 그려지고 값도 소수 둘째자리까지 표시되지 않는다. 화면은 0.0인데 엑셀에는 소수 둘째자리로 표시된다.
- 엑셀 다운로드 시 파일 확장자를 xlsx로 통일하고 싶다. (`down.setFileType("excel",true)`로 했는데 안 된다)

**답변**
- **xls는 컬럼 수가 256개로 제한**되어 있습니다. xlsx로 확장자를 바꾸면 처리할 수 있습니다. xls에는 스타일(선, 색상) 제한도 있어 스타일이 다 적용되지 않으면 xlsx로 받도록 안내했습니다.
- 폰트: `Down2Excel.jsp`에서 `setFontSize()`, `setDefaultFontSize()`(크기), `setFontName`, `setDefaultFontName`(글꼴, `SheetDesign` 값에 따라 둘 중 하나)로 변경합니다.
- 헤더 테두리: `Header:[{Text:"TEST",Align:"Center",Height:"40",Border:"10",Style:{FontSize:"11",FontBold:true,FontColor:"#000000","Border":0}}]` 형태로 `Border` 속성값을 0 또는 1로 설정할 수 있다고 유선으로 안내했습니다.
- 소수 자리가 다르거나 테두리가 일부 셀 이후부터 안 그려진 사례는 원격으로 **엑셀 다운로드를 xlsx로 받도록 바꾸고 컬럼의 `Format`을 변경**해 처리했습니다.
- xlsx 통일은 `down.setFileType("xlsx", true);`로 써야 합니다. (`"excel"`로 쓰면 안 됨) 확장자를 바꾸는 다른 방법으로 `String data = ibExcel.getData(); data = data.replaceAll(".xls</FileName>", ".xlsx</FileName>");`처럼 받은 전문을 가공하는 방법도 안내했습니다. 이전에 `Excel.xls.xlsx`로 내려오던 문제는 같은 주제입니다. ("다운로드 파일명·확장자 문제"([DWN-04]) 참고)
- `SheetDesign`과 `ExcelFontSize`가 서버모듈에 따라 반대로 동작하는 이슈는 이슈로 등록되었으며 처리 결과가 기록에 없습니다.

**키워드**: xls 256 컬럼, BIFF8, Invalid column index, setFontSize, setDefaultFontSize, 헤더 Border, setFileType xlsx

### [FMT-11] 엑셀로 내려온 숫자·문자 값이 이상하다 (앞자리 0 손실, Float이 비어 있음, null 표시)

**질문**
- Text 타입에 핸드폰 번호처럼 숫자 값이 들어 있는데 엑셀에서는 일반 서식으로 바뀌면서 맨 앞의 0이 없어진다.
- Float 컬럼을 내려받지 못한다. (서버가 만든 JSON의 숫자 값이 문자열 `"21"` 형태)
- 실수형 컬럼을 엑셀의 숫자 서식으로 받고 싶다. text 컬럼인데 숫자형 컬럼이 되게 할 수 있는가?
- 엑셀 다운로드 때 숫자 서식을 가진 컬럼이 "통화" 서식으로 내려오는데 숫자로 바꿔 달라.
- 숫자가 10자리를 넘으면 세 자리 콤마가 빠진 채 통화 서식으로 내려온다.
- 엑셀에서 `20.01`을 입력하고 시트에 로드하면 `201`이 로드된다.
- `DirectDown2Excel`에서 `SHEETDATA`에 null이 있으면 엑셀에도 null이라고 찍힌다.
- 클라이언트 모듈로 받을 때 Text 컬럼에 `"\u0000"`이 있으면 정상적인 엑셀 파일이 만들어지지 않는다.
- html 컬럼을 엑셀로 받으면 빈 값으로 내려온다.
- "엑셀 다운로드 중 에러가 발생하였습니다"가 난다. (합계행 `SetSumValue`)
- 금액이 있는 컬럼을 클릭하면 통화기호가 달러(`$`)로 바뀐다.

**답변**
- **앞자리 0**: `AllTypeToText:1`만 설정하면 일반 서식으로 내려오므로 **`AllTypeToText:1, TextToGeneral:0`** 을 같이 설정합니다. ("다운로드한 엑셀의 서식(텍스트·숫자·날짜)을 원하는 대로 만들려면"([FMT-01]) 참고)
- **Float 컬럼이 내려오지 않음**: 컬럼 Type은 number인데 서버가 만든 JSON 데이터가 문자열(`"pre_yy01":"21"`)이기 때문입니다. 데이터를 숫자(`21`, `0`)로 만들어 주는 것이 근본 해결입니다. 계산 로직과 관련이 없는 화면이라면 컬럼 Type을 `Text`로 바꿔도 정상 다운로드는 됩니다. 합계행 오류는 Date 타입(7번째 index) 컬럼에 Text 형태의 `SumValue`를 적용해서였고, `SetSumValue(7, …)`를 `SetSumValue(6, …)`로 바꾸도록 안내했습니다.
- **text → 숫자**: 기본적으로 설정된 컬럼 타입을 따라가므로 text를 숫자로 바꿔서 내릴 수 없습니다. 실수형을 엑셀 숫자 서식으로 받는 것도 불가능하고 `Down2Excel.jsp`에서 worksheet를 얻어 직접 열의 서식을 변환하는 방법밖에 없다고 답했습니다.
- **통화 → 숫자 서식, 콤마 누락, `20.01` → `201`, null 표시**는 제품에서 수정해 배포했습니다. (xlsx에서만 가능한 설계라는 안내도 있음) `$` 표시는 xls 확장자 때문이어서 xlsx로 받으면 정상입니다.
- **`\u0000` 포함**: 클라이언트 모듈에 패치했습니다. 서버모듈에서도 해당 문자(Null)는 무시되어 클라이언트도 무시되도록 처리(7.0.0.9)했습니다.
- **html 컬럼**: 엑셀로 받아도 코드가 내려오거나 아예 내려오지 않을 수 있고, 오류가 나면 그 컬럼의 다운로드가 안 될 수 있으므로 `DownCols`에서 html 컬럼은 제외해야 합니다. 브라우저가 해석한 내용(볼드, 색상 등)을 엑셀에 담을 수는 없습니다.
- 컬럼 색상을 다운로드 중에 임의로 바꾸는 것은 안 되고, `SheetDesign`으로 시트에 적용된 스타일대로 받을 수 있습니다.

**키워드**: 앞자리 0 사라짐, AllTypeToText, TextToGeneral, Float 컬럼 빈 값, JSON 숫자 문자열, 통화 서식, 콤마 누락, 엑셀 숫자 서식, html 컬럼 다운로드, null 표시

### [FMT-12] 여러 시트를 한 엑셀에 담기, 시작 열, 주석, 푸터 행, 숨김 컬럼 제외 코드

**질문**
- 여러 시트(그리드)를 하나의 엑셀 파일(여러 시트 탭)에 받고 싶다. 두 번째 시트는 엑셀의 두 번째 컬럼부터 그려지게 할 수 있는가?
- 엑셀에 주석을 넣을 수 있는가? 화면의 form Data를 같이 다운로드하려면?
- 푸터 행(`FooterRow`)도 엑셀로 내려받을 수 있는가?
- 선별적으로 머지하거나, 중복된 값은 표시되지 않게 할 수 있는가?
- `HiddenColumn`을 설정하면 숨겨서 내려오는데 아예 내려받지 않게 하고 싶다.
- 사용자가 엑셀 다운로드 버튼을 누른 뒤 다른 페이지로 이동해도 앞 페이지의 다운로드가 완료되게 하고 싶다.
- 엑셀 다운로드 시 글꼴, 크기, 행 높이를 조정할 수 있는가? `SheetDesign` 사용 예가 필요하다.
- 다운로드한 엑셀을 열 때 같은 파일명이면 중첩으로 열리게 할 수 있는가?
- 기존 시트 데이터와 새로 올릴 엑셀 내용을 비교해 차이만 알 수 있는가?
- 엑셀 다운로드 시 "255자를 초과할 수 없다"는 메시지가 나온다.
- 파일 확장자를 xlsx로 넣고 싶다.

**답변**
- **여러 시트를 한 엑셀 파일에**: 받고자 하는 시트를 `Down2Excel()`로 받고 그 앞과 뒤에 `Down2ExcelBuffer(true)`, `Down2ExcelBuffer(false)`를 호출합니다. 하나의 워크시트 안에 여러 그리드를 받을 때는 두 번째 시트의 `Down2Excel()`에 `AppendPrevSheet:true`를 줍니다. (`ExportMode:2`로 클라이언트 모듈 동작 중이면 병합이 풀립니다. "업로드·다운로드가 동작하지 않을 때 확인할 설정과 코드"([UPL-10]) 참고) `Down2Excel`에는 그리드의 시작 열을 지정하는 기능이 없고, `TitleText`에서만 시작 열 설정이 가능합니다.
- **주석/조회 조건 등**: `TitleText`와 `UserMerge`로 엑셀에 정보를 같이 보여 줄 수 있습니다. 서버에서 타이틀이나 `UserMerge`를 처리하기는 쉽지 않아 화면의 데이터를 넘기는 것이 단순하다고 안내했습니다. `TitleText`는 서식 지정이 불가능하므로 서식이 필요하면 `Header` 옵션을 사용합니다.
- **푸터 행**은 처음부터 엑셀 다운로드를 고려하지 않고 만든 기능이어서 빠져 있고, 추가하려면 서버모듈과 같이 진행해야 해서 가능 여부와 기간을 모른다고 답했습니다. 이후 푸터 행 다운로드는 신규 요청으로 배포(클라이언트 모듈도 동일 요청)했다는 기록이 있습니다.
- **머지**: `Merge:1`이면 머지가 적용되어 다운로드됩니다. `Merge:2`로 하면 부속 셀(중복 셀)에 값을 설정하지 않습니다.
- **숨김 컬럼 제외**: `DownCols`에 내려받을 컬럼만 지정합니다. 시트마다 지정하기 어렵다면 다음처럼 히든 컬럼을 제외하는 함수를 만들어 씁니다.
```
mySheet.Down2Excel({ SheetDesign:1, Merge:1, DownCols: getVisibleCols(mySheet) });

function getVisibleCols(sheet) {
  var i = 0, len = 0, res = [];
  for (i = 0, len = sheet.LastCol(); i <= len; i++) {
    if (!sheet.GetColHidden(i)) { res.push(i); }
  }
  return res.join('|');
}
```
- **다른 페이지로 이동해도 다운로드**: `top` 객체에 iframe을 만들어 두고 다운로드 target을 그 iframe으로 잡아 보라고 안내했습니다.
- **같은 파일명 중첩 열기**는 엑셀 자체의 기능이어서 제품에서 할 수 없다고 답했습니다. 업로드한 엑셀과 기존 데이터의 차이만 알아내는 기능도 없고, 컬럼·행 수가 같다면 `for` 루프와 셀 값 비교로 직접 해야 합니다.
- **255자 메시지**는 xlsx로 받으면 나타나는 메시지라 확장자를 xlsx로 받으라고 안내했습니다(기록 그대로). 확장자는 `FileName`에 `파일명.xlsx`를 넣으면 됩니다.

- **여러 시트를 `DirectDown2Excel`로 한 파일에**(사용자 템플릿 포함): `Down2ExcelBuffer`를 `true`로 설정한 뒤 `DirectDown2Excel`을 호출하면 여러 시트를 한 엑셀 파일에 받을 수 있습니다. 호출 방법은 `Down2Excel`과 같고 **URL 인자는 모두 같은 페이지**로 지정합니다. 데이터를 처리하는 JSP에서는 `DirectDown2Excel`을 호출한 시트 순서대로 데이터를 만들어 `"SHEETDATA"` 뒤에 1부터 일련번호를 붙여 `setAttribute`합니다. 첫 번째 시트는 일련번호 없이 `"SHEETDATA"`, 두 번째 시트부터 `"SHEETDATA1"` 같은 식으로 설정합니다. 이 기능이 동작하지 않으면 제품 버전이 낮은 것이므로 `ibsheet.js` 버전과 `WEB-INF/lib`의 `ibsheet7` jar 이름을 확인합니다.

**키워드**: Down2ExcelBuffer, AppendPrevSheet, 여러 시트 한 파일, TitleText, UserMerge, FooterRow 엑셀, Merge 2, DownCols 숨김 컬럼 제외, getVisibleCols

### [FMT-13] "download excel data is not valid" 등 데이터 전송 오류, SaveName 규칙, 특정 페이지에서만 요청이 안 나감

**질문**
- `Down2Excel` 후 서버 콘솔에 `엑셀다운로드 중 에러가 발생했습니다. download excel data is not valid`가 난다.
- `Down2Excel()`이 특정 화면에서만 동작하지 않는다. (덤프 확인)
- 특정 페이지에서만 엑셀 다운로드가 안 되고 `Down2Excel()` 호출까지는 정상인데 request가 나가지 않는다.
- 엑셀을 다운로드할 때 5만 건 이상이 나오는 화면이 다운된다. (`DirectDown2Excel`, `Down2Excel` 모두)
- 6만 5천 건이 넘는 엑셀을 xlsx로 받았더니 서버 로그에 에러가 나고 파일이 열리지 않는다.
- 하나의 엑셀 다운로드에서 일부 PC에서만 안 된다. (IE11)
- 운영은 되는데 테스트 서버에서는 `down.downToBrowser();`에서 오류가 난다.
- .NET에서 날짜 컬럼이 로컬에서는 정상인데 운영에서만 `yyyy-MM-dd`로 이상하게 나온다.

**답변**
- **`download excel data is not valid`**: `Down2Excel()`에서 `MultiPart:0`으로 설정되어 있었고 POST로 넘어가는 데이터가 3MB 정도여서 생긴 문제로 보고 `MultiPart:0` 속성을 지워 보라고 안내했습니다. `DirectDown2Excel`에서 이 오류가 난 사례에서는, 시트가 엑셀 다운로드 시 데이터를 multipart로 보내는데 프레임워크의 필터가 걸려 있으면 multipart가 정상적으로 모듈에 전달되지 않기 때문이라고 설명했습니다. 해결 방안은 (1) `MultiPartResolver`를 설정하거나 (2) `DirectDown2Excel` 시 `Multipart:0`으로 POST 전송하는 것이며, POST로 보낼 때 `<`, `>`가 필터에 걸려 `&lt;0_IBCC&gt;`처럼 치환되면 `MarkupTagDelimiter`를 쓰도록 안내했습니다.
- **SaveName 규칙**: `savename`을 동적으로 생성하면서 시작 문자가 숫자이거나 특수문자가 포함된 경우가 원인이었습니다. SaveName은 제품 내에서 변수명으로 쓰이고 자바스크립트 변수 명명 규칙을 따르므로, `_`(언더바)를 제외한 특수문자는 쓸 수 없고 변수명 시작은 반드시 숫자를 제외한 문자여야 합니다. SaveName이 중복되어도 같은 증상이 납니다.
- **특정 페이지에서만 request가 안 나감**: `ibsheet.cfg`에 설정된 `Down2Excel.jsp` 경로가 맞는지부터 봐야 하며, 호출까지는 되고 request가 나가지 않는 원인은 기록에 없습니다. 고객 쪽에서 다시 보고 연락하기로 했습니다.
- **5만 건 이상**: 클라이언트 모듈을 쓰는 경우 크롬에서는 다운이 되지만 다른 브라우저에서는 안 될 확률이 높으므로 서버모듈로 가는 것이 맞고, 원격으로 `DirectDown2Excel`을 만들어 주었으나 `getOutputStream() has already been called for this response` 오류가 남았습니다. (더 시간을 두고 찾기로 함) 6만 5천 건 초과는 `DirectDown2Excel.jsp`를 변경해서 다시 보냈고 이후 에러 없이 처리되었습니다.
- IE11에서 일부 PC만 안 되는 사례는 오래되어 완료 처리되었습니다. 테스트 서버에서 `downToBrowser()` 오류가 나는 사례는 관련 서버모듈을 보내 주었습니다.
- .NET 날짜 이상은 로컬과 서버의 `ibsheet7-4.0.dll` 버전이 달랐고, 로컬 dll을 서버에 반영하자 같아졌습니다.
- `DirectDown2Excel()`을 `new DirectDown2Excel()`(`false` 옵션 없이) 쓸 때도 이미지 처리가 가능하도록 개선 요청을 받아 **서버모듈 1.1.85**로 릴리즈했습니다.

**키워드**: download excel data is not valid, MultiPart 0, MarkupTagDelimiter, SaveName 규칙, request 안 나감, getOutputStream has already been called, 6만 5천 건, ibsheet7-4.0.dll 버전

### [FMT-14] 다운로드한 엑셀의 열 너비가 화면·이전 제품과 다르다 (setColWidthRatio, AutoSizeColumn, ###)

**질문**
- IBSheet3에서 7로 전환 중인데 다운로드한 엑셀의 행 높이와 셀 너비가 IBSheet3와 같게 나오도록 하고 싶다.
- 시트의 컬럼 너비를 넓힌 뒤 엑셀 다운로드를 하면 너비가 적용되지 않는다.
- 화면에서는 숫자로 나오는데 엑셀 다운로드 시 `###`으로 나타난다.
- 엑셀로 내려받은 숫자 컬럼 서식을 숫자형으로 내려받고 싶다. (기본은 통화 서식)

**답변**
- **너비는 제품·서버모듈 버전마다 계산 방식이 달라 동일하게 내려오지 않습니다.** (IBSheet3와 7뿐 아니라 IBSheet7의 서버모듈 1.0과 2.0 사이도 다름) 그래서 `Down2Excel.jsp` 사용자 환경 설정에서 **`setColWidthRatio`** 로 너비를 조절합니다. `setColWidthRatio(1)`이면 기존에 내려받던 너비 그대로, `setColWidthRatio(2)`이면 두 배, `0.8`이면 80% 너비로 받습니다.
- 컬럼 너비가 적용되지 않는 사례는 같은 덤프와 서버모듈로 테스트했을 때 재현되지 않았고(Office 2013), 사용자 PC가 Office 2010이라 Office를 업그레이드해 다시 확인해 달라고 요청했습니다.
- **`###`로 나오는 경우**: 컬럼의 너비가 작아서 나타나는 현상이었습니다. `Down2Excel` 시 **`AutoSizeColumn:1`** 을 설정해 봅니다. 헤더명이 한글일 때는 정상적으로 계산하지 못할 수 있고, OS에 한글 폰트가 없어도 계산이 안 될 수 있으므로 **한글 폰트를 반드시 설치**해야 합니다.
- **숫자 서식**: 숫자형 컬럼은 기본적으로 통화로 셀 서식이 내려옵니다. 숫자형 서식으로 내리려면 `NumberExMode`를 추가합니다. `Down2Excel()`의 인자로 추가하거나 서버모듈 2.0 대에서는 `Down2Excel.jsp`의 사용자 환경 설정 #16에서 `down.setNumberExMode(true);`의 주석을 제거해 모든 시트에 적용할 수 있습니다. (서버모듈 1.0에서는 함수 인자로만 가능)
```
var options = {SheetDesign:1, StartCol:1, HiddenColumn:1, Merge:1, FileName:"엑셀파일.xls", NumberExMode:1}
SheetBasis.Down2Excel(options);
```
- 같은 맥락으로 엑셀의 쉼표 스타일 버튼을 누를 때 금액 앞에 `$`가 붙는 현상은 xls에서만 나타나며, `NumberFormatMode`를 1 또는 2로 설정해 셀 서식을 일반으로 바꿔도 동일합니다. POI가 xls와 xlsx를 만드는 방식이 달라서 생기는 현상이어서 **xlsx로 받아야 해결**됩니다. 콤보 컬럼을 엑셀 드롭다운으로 내리려면 `ComboValidation:1`을 설정합니다. ("다운로드한 엑셀의 서식(텍스트·숫자·날짜)을 원하는 대로 만들려면"([FMT-01]), "콤보 컬럼을 엑셀 드롭다운으로 내려받기"([FMT-06]) 참고)
- xls로 받을 때 **특정 오피스에서만 AQ 컬럼 이후부터 테두리가 안 보이는 문제**는 Apache POI 라이브러리 버그로 확인되어 제품에서 패치할 수 없다고 답했고, 아래 표처럼 xlsx나 IB_JXL 엔진을 쓰면 정상이었습니다. (xls 셀 스타일이 많은 경우 특정 셀부터 서식이 안 먹는 문제도 "엑셀 컬럼 수 한계(256), 폰트, 헤더 테두리 같은 서식 제한"([FMT-10]) 참고)

  | 형식 | Excel 2010 | Excel 2013 | Excel 2016 |
  |---|---|---|---|
  | XLS (POI) | 정상 | AQ 컬럼부터 에러 | AQ 컬럼부터 에러 |
  | XLSX (POI) | 정상 | 정상 | 정상 |
  | XLS (IB_JXL) | 정상 | 정상 | 정상 |
  | XLSX (IB_JXL) | 정상 | 정상 | 정상 |

**키워드**: setColWidthRatio, 엑셀 열 너비, AutoSizeColumn, ### 표시, NumberExMode, setNumberExMode, xls AQ 컬럼 테두리, IB_JXL

### [FMT-15] 서버모듈 2.0은 워크북 객체에 접근해 직접 가공할 수 없다 (makeExcel 사용 코드 호환)

**질문**
- 사이트가 `Down2Excel` 내부의 `makeExcel` 함수를 꺼내 써서 로직을 구현하고 있다. 2점대 jar에서 같은 기능을 하는 함수가 있는가?

**답변**
- 서버모듈 1.0에서는 생성된 워크북에 접근해 사용자가 개별 워크시트의 내용이나 스타일을 처리할 수 있었지만 **서버모듈 2.0은 워크북을 서버모듈 내부에서 생성한 뒤 완성된 파일만 클라이언트로 내려보내기 때문에** 이전 버전과 같은 작업이 어렵습니다. 서버모듈 2.0은 POI 없이도 내부적으로 xlsx 파일을 생성하는 모듈이 탑재되어 있어 1.0과 같은 동작 방식을 허용하지 않습니다.
- 따라서 `makeExcel`로 워크북을 직접 다루는 부분이 해당 파일 다운로드의 주요 기능이라면 서버모듈 2.0으로 업그레이드가 어려울 수 있습니다.
- 같은 맥락에서 서버모듈 1.0의 `Down2Excel.jsp`에서 `Workbook workbook = ibExcel.makeExcel();`로 워크북을 얻어 행 높이나 셀 스타일을 바꾸는 코드는 1.0에서 쓸 수 있는 방식이고, 2.0에 그대로 이식되지 않는 처리(예: 병합 영역 값 비우기)가 있음을 고지한 사례가 있습니다. ("엑셀 다운로드에서 OutOfMemoryError(힙 부족)가 난다"([PRF-01]) 참고)

**키워드**: makeExcel, Workbook 접근, 서버모듈 2.0 제한, 서버모듈 1.0 워크북 가공, 업그레이드 호환성

### [FMT-16] xls로 내려받으면 생기는 서식 문제 정리 — xlsx로 받으면 해결되는 증상들

**질문**
- 엑셀에서 쉼표 스타일을 누르면 금액 앞에 `$`가 붙는다. (POI만 쓴 다른 프로젝트는 안 붙는다)
- `SheetDesign:1`에서 `ibExcel.setHeaderBackColor`로 `#DDDDDD`(회색)를 주면 `#DDDDFF`(하늘색)이 적용된다. 크롬에서 받으면 헤더가 검은 스타일로 내려온다.
- 웹에서 홀수/짝수 줄 색 구분을 줬는데 엑셀에서는 적용되지 않는다. 웹과 무관하게 엑셀에서만 원하는 환경을 만들 수 있는가?
- 숫자값(금액, 수량)의 표시 형식을 숫자형으로 바꾸려 했더니 사용자 지정 서식으로 자동 변경된다.
- 풋터 행 3줄 중 마지막 2줄의 일부 스타일이 깨진다. (Excel 2010 이하는 정상, 2013 이후부터 깨짐)
- Office 2010은 정상인데 2013에서는 이상하게 내려온다. (27건이지만 셀이 많음, DM 셀까지)
- 데이터 행의 body 색상이 적용되지 않는다. (`SheetDesign:1`)
- 5번째 행, 503번째 행의 높이가 다른 행과 다르게 내려온다.

**답변**
- **`$` 표시**: POI 라이브러리 문제가 아니라 **엑셀 포맷(xls) 관련** 내용이며 xlsx로 바꾸면 정상 처리됩니다. (xls 포맷은 이 문제를 지원하지 않음) 엑셀 내부에서 서식이 변환되는 부분은 제품으로 변경하기 어렵습니다.
- **헤더 색상**: xls 포맷에는 엑셀의 **기본 팔레트**에서 제공되는 색상만 정의되어 있어 표현할 수 없는 색상은 다른 색으로 바뀌거나 skip됩니다(제품과 무관). 원하는 색을 쓰려면 xlsx 포맷을 씁니다. (`var param = {FileName:"test.xlsx", SheetDesign:1}; mySheet.Down2Excel(param);`) 또한 `SheetDesign:1`이면 **`mySheet.SetHeaderBackColor()` 적용이 우선**이고, `Down2Excel.jsp`에서 `setHeaderBackColor`를 `#000000`으로 쓰면 적용되지 않습니다. 홀수/짝수 줄 색 구분처럼 웹과 무관하게 엑셀에서만 설정하는 기능은 지원하지 않습니다.
- **풋터 스타일 깨짐**: xls 확장자로 만든 파일이 엑셀 버전에 따라 style이 깨지는 현상으로, 2010 이하는 정상이고 2013 이후에서 일부 깨집니다. xlsx는 정상입니다. 같은 원인으로 40개 이상의 컬럼이 있을 때 특정 컬럼부터 서식이 안 먹거나 `AQ` 컬럼 이후 테두리가 안 보이는 현상, 컬럼 수 256개 제한, `4000 styles` 오류가 있습니다. ("엑셀 컬럼 수 한계(256), 폰트, 헤더 테두리 같은 서식 제한"([FMT-10]), "다운로드한 엑셀에서 헤더 색이 흰색이거나 …"([DWN-14]), "열 너비가 화면·이전 제품과 다르다"([FMT-14]) 참고)
- **구버전 JSP/POI 3.7 사례**: `Down2Excel.jsp` 안에서 처리하는 구버전(oldjsp)과 POI 3.7을 쓰고 있으면 xlsx를 적용할 수 없는 버전이라고 안내했고, 업그레이드 의향이 없어 종료되었습니다.
- **body 색상**: 제품 버전 7.0.0.0-20130620-11부터 데이터 행에 색상이 적용됩니다. (이전 버전은 업그레이드 필요)
- **행 높이가 다른 문제**(5번째·503번째 행)는 서버모듈 74 버전에서 행 높이 관련 패치가 있어 최신 서버모듈을 보냈습니다.
- 그 밖에 xlsx로 바꿔도 충돌이나 문제가 생길 여지는 없느냐는 질문에는 서버모듈과 종속 라이브러리가 올라가 있고 라이브러리 간 충돌이 없다면 별문제 없으며, **확장자에 따라 `HSSF`/`SXSSF` 클래스 사용 여부만 결정**될 뿐이라고 답했습니다. ("엑셀 다운로드에서 OutOfMemoryError(힙 부족)가 난다"([PRF-01]) 참고)

**키워드**: xls 서식 문제, xlsx 권장, $ 표시, 헤더 배경색 팔레트, SetHeaderBackColor 우선, 풋터 스타일, Excel 2013, 행 높이

### [FMT-17] 엑셀의 날짜 서식이 로케일 인덱스로 저장될 때 (`yyyy-mm-dd h:mm`)

**질문**
- `yyyy-mm-dd h:mm` 서식이 제대로 인식되지 않는다. 이전에 개선 버전을 받았는데 다시 안 된다.
- `DirectDown2Excel`로 받을 때 `ibmsg`에서 `SYS_d = "MM-dd-yyyy"`로 설정하면 Date 컬럼에 `-1` 값이 전달된다. (`Down2Excel`은 정상)

**답변**
- 엑셀 파일 안에는 사용자가 서식 문자열을 직접 입력한 경우와 달리, 셀에 날짜를 넣었는데 서식이 `yyyy-mm-dd h:mm`으로 **보이는** 경우에는 **엑셀 기본 셀 서식 중 한국어 로케일에서 그 서식을 가리키는 정해진 인덱스**만 기록됩니다. 정확한 서식 문자열이 파일에 없고 로케일에 따른 인덱스만 있으면 서버에서 프로그램으로 인덱스를 처리할 때 미국 표준의 `d/m/yy h:mm`으로 해석됩니다. 그래서 파일에 서식이 엑셀 기본 인덱스인 경우 `d/m/yy`는 `yyyy-MM-dd`, `d/m/yy h:mm`은 `yyyy-MM-dd HH:mm`으로 변환해 해석하도록 패치했습니다. **한국에서 쓸 때는 문제가 없지만 해외에서 쓰면 문제가 생길 수 있으니 유의**해야 합니다. 이 패치는 이후에도 제품 버전에 따라 배포되었습니다. ("엑셀 업로드·다운로드 값 형식"([UPL-12]) 참고)
- **`DirectDown2Excel`의 날짜**: `Down2Excel`은 시트가 화면에 보이는 그대로(예: 포맷 `MM-dd-yyyy`, 데이터 `02-25-2018`)를 전문으로 생성해 서버로 보내지만, `DirectDown2Excel`은 **포맷만** 전문으로 보냅니다(`MM-dd-yyyy`). 그래서 중계 페이지에서 날짜 데이터를 `02-25-2018` 형태로 구성해야 합니다. 질문에서 받은 결과표는 다음과 같습니다. 데이터가 `20180101`일 때는 `-1`, `2018-01-01`일 때는 `-1`, `2018/01/01`일 때는 `-1`, `2018.01.01`일 때는 `-1`, `01012018`일 때는 `-1`, `01-01-2018`, `01/01/2018`, `01.01.2018`일 때는 정상입니다. (포맷과 같은 형태의 날짜일 때만 정상)

**키워드**: yyyy-mm-dd h:mm, 날짜 서식 인덱스, 로케일, d/m/yy, DirectDown2Excel 날짜 -1, SYS_d, MM-dd-yyyy

### [FMT-18] 엑셀 업로드에서 지원하지 않거나 특별한 처리가 필요한 경우 (다중 라인 레코드, 확장자 검증, 특정 컬럼 교체)

**질문**
- 다중 라인 레코드를 쓰는데 `LoadExcel()`로 올리면 첫 번째 데이터 라인만 들어간다.
- `LoadExcel.jsp`에서 엑셀이 아닌 파일을 올릴 때 확장자 검증 로직이 있는가? (jar 안에 묶여 있어 확인이 안 됨)
- 시트에 데이터가 있는 상태에서 엑셀 데이터를 로드해 특정 컬럼의 데이터만 교체할 수 있는가?
- 3.x에서 쓰던 `LoadExcel(true, 3, filepath)`처럼 파일 경로를 지정해 불러오고, 한 번의 파일 전송으로 여러 워크시트를 여러 시트에 넣을 수 있는가? (2020년 문의)
- 특정 컬럼을 이동시킨 뒤 `LoadText()` 또는 `LoadExcel()` 하면 시트 안의 데이터가 사라진다.

**답변**
- 다중 라인 레코드는 **원래 지원하지 않습니다.** 서버모듈 버전과 관계없이 구조상 안 됩니다.
- **확장자 검증**: 서버모듈 `1.1.113.jar`와 `LoadExcel.jsp`를 배포해 대응했습니다.
- **특정 컬럼만 교체**: 데이터를 조회하거나 엑셀을 로드하거나 시트에 데이터가 로드되는 시점에 `OnLoadData` 이벤트가 발생합니다. 이 이벤트는 조회와 엑셀 로드에서 모두 발생하므로 응답 결과의 `"Result"`의 `"Message"` 값이 `"ExcelDone"`인 경우에만 동작하도록 분기해야 합니다. `OnLoadData` 시점에 원본 데이터를 `GetSaveJson("all")`로 가져와 변수에 담아 두고, 그 변수의 데이터를 엑셀에서 가져온 데이터로 가공한 뒤 return합니다.
- **파일 경로 지정과 한 번에 여러 워크시트**: (2020년 답변) 파일 경로를 지정하는 방법은 7.0 도움말에 없고, 한 번의 파일 전송으로 여러 워크시트의 데이터를 여러 시트에 넣는 방법은 **없으며** `LoadExcel` 호출 수만큼 파일 다이얼로그가 뜬다고 답했습니다. 이후(2026년) 답변에서는 `LoadExcelBuffer`로 구현할 수 있다고 안내했으므로 최신 버전 기준은 "여러 워크시트를 여러 그리드로 업로드하기"([ENV-05])를 따릅니다.
- 컬럼을 이동한 뒤 데이터가 사라지는 이슈는 이슈로 등록되었으며 처리 결과가 기록에 없습니다.

**키워드**: 다중 라인 레코드 미지원, 확장자 검증, OnLoadData ExcelDone, GetSaveJson all, LoadExcel 경로 지정 불가, 업로드 특정 컬럼 교체

### [FMT-19] 엑셀 다운로드에서 줄바꿈(WordWrap) 처리와 헤더만 Wrap 적용

**질문**
- `Down2Excel({WordWrap:0})`로 다운로드하면 시트 안의 줄바꿈이 모두 이상한 기호로 내려온다. 헤더에만 Wrap을 적용하고 싶다.
- 헤더 줄바꿈이 엑셀에서 일렬로 나온다.

**답변**
- `WordWrap:0`이면 줄바꿈 문자가 이상한 기호로 보이는 것은 POI의 Wrap을 쓰지 않고는 방법이 없다고 보았습니다. 헤더에만 Wrap을 넣고 싶을 때는 `Down2Excel.jsp`에 직접 로직을 넣으라고 안내했습니다. `Workbook workbook = ibExcel.makeExcel();` 뒤에 `Sheet sheet = workbook.getSheetAt(0);`로 첫 시트를 얻어, 헤더 영역의 행 수(`HeaderRows` 값과 `TitleText`의 줄바꿈 개수를 더한 값)만큼 각 행의 셀을 돌며 `CellStyle`의 `setWrapText(true)`를 적용합니다. 이를 위해 전문에서 `<HeaderRows>…</HeaderRows>` 같은 값을 꺼내는 `getParam(data, key)` 함수(`data.indexOf("<"+key+">")`와 `"</"+key+">"` 사이 문자열을 반환)를 `<%! %>`에 추가합니다. (1.0 서버모듈에서만 쓸 수 있는 방식: "서버모듈 2.0은 워크북 객체에 접근해 직접 가공할 수 없다"([FMT-15]) 참고)
- 줄바꿈이 처리되지 않는 .NET 사례(`SetWordWrap(false)`), 엑셀 편집이 느린 경우의 `WordWrap` 끄기는 "다운로드 파일명·확장자 문제"([DWN-05]), "서버모듈 1.x와 2.x의 메모리 동작 차이, 그리고 한계"([PRF-06])에 있습니다. 헤더 문자열의 `/n` 개행이 엑셀에서 안 되는 사례는 "다운로드 파일명·시트명·글꼴·템플릿(TempFile) 옵션"([DWN-11])에 있습니다. 업로드 때 셀 안의 줄바꿈이 사라지던 문제는 서버모듈 2.0.27에서 수정되었습니다. (2.0.26의 버그, 2.0.50/2.0.36 등으로 배포)

**키워드**: WordWrap 0, 헤더 Wrap, setWrapText, 줄바꿈 기호, makeExcel, 헤더 줄바꿈

### [FMT-20] 엑셀·CSV·PDF 다운로드에서 자주 나오는 그 밖의 질문

**질문**
- xls로 받으면 65,000건 이후는 시트가 추가되는데 65,000건 이상을 한 시트에 담을 수 있는가?
- CSV로 받는 방법은? (메모장으로는 정상인데 엑셀에서 열면 한글이 깨진다. 파일명을 지정하면 `.txt`가 붙는다)
- `Down2Pdf`로 받은 PDF를 열면 오류가 난다. (iText lib 있음, 한글 폰트 지정)
- 이미지 컬럼 데이터가 URL이라 엑셀 다운로드 시 마지막 행의 마지막 이미지만 다운로드된다.
- `Down2Excel()`을 `document.frm.mySheet.Down2Excel();`처럼 쓰고 있다.
- 엑셀 다운로드 시 가로 길이를 페이지 크기에 맞게 고정할 수 없는가?
- `DownRows`, `DownHeader`를 정의했는데 헤더가 내려오지 않는다.
- 헤더가 같은 컬럼이 여러 개일 때 값이 컬럼 순서와 다르게 로드된다.
- 폴라리스 오피스에서 수정한 엑셀을 업로드하면 오류가 난다.
- `DirectDown2Excel`로 헤더만 나오고 데이터 영역이 비어 있다. (resultMap으로 VO를 쓰는 사이트)
- 엑셀이 만들어질 때 "The content of an excel record cannot exceed 8224 bytes"가 난다.

**답변**
- **xls 건수**: xls 포맷은 최대 65,000건(행)까지 지원하며 POI나 제품에서 해결할 수 없고 65,000건 이상을 한 시트에 받으려면 **xlsx**밖에 없다고 답했습니다.
- **CSV(`Down2Text`)**: `mySheet.Down2Text({FileName:'myfile.csv', ColDelim:","})`로 받습니다. 한글이 깨지면 `Down2Text.jsp`에서 서버모듈 버전에 맞게 처리해야 합니다. 서버모듈 버전은 `WEB-INF\lib`의 `ibsheet7-X.X.X.jar`로 확인하며 숫자로 구분합니다(예: 2.0.37은 서버모듈 2.0, 1.1.99는 서버모듈 1.0). **서버모듈 2.0**은 `Down2Text.jsp`의 [사용자 환경설정 #2]에서 다운로드 문서 타입 설정 부분을 주석 처리하고(2.0.39에서 패치, `down.setFileType("csv");`로 설정하면 안 깨짐), **서버모듈 1.0**은 [사용자 환경설정 #2]의 BOM 설정 부분의 주석을 제거합니다. 파일명 뒤에 `.txt`가 붙고 한글이 깨지는 현상은 1.1.43 이하 버전에서 나타나므로 최신 서버모듈로 올려야 합니다. 클라이언트 모듈은 여전히 같은 문제가 있을 수 있고, `Down2Text`로 받는 파일의 확장자 변경 기능은 `ibsheet7-1.1.40` 즈음에 추가되었습니다.
- **PDF 열기 오류 확인 목록**: `Down2Pdf.jsp`가 서버에 있고 `ibsheet.cfg`에 경로가 적혀 있는지, iText lib가 올라와 있는지, 서버의 폰트 파일 경로와 encoding 설정, 한글 폰트 ttf 파일이 있는지 확인합니다. `Down2Pdf.jsp` 20라인 정도에 있는 `ibPdf.setFontFolder("I:/down");`의 경로가 맞아야 한글이 깨지지 않습니다. lib 폴더에 다른 종류의 pdf 관련 jar(easyPdf, ExportPdf, pdfbox-1.2.1 등)가 있으면 삭제해야 합니다. (pdfbox-1.2.1.jar를 제거하자 한글이 정상 동작한 사례) lib 목록은 "서버모듈과 함께 넣어야 하는 라이브러리, POI는 한 버전만 남긴다"([LIB-01])를 참고합니다.
- **이미지 컬럼**: 옛 버전에서는 이미지 파일 하나라도 오류가 나면 전체가 skip되는 현상이 있었고 최신 서버모듈을 배포하면서 데이터 한 건만 남겨 테스트해 보라고 안내했습니다. (`ibsheet7-1.1.74`에서 `1.1.109`로 교체하자 정상으로 나온 사례, 건수가 많을 때 이미지가 텍스트(URL)로 나오는 사례도 동일)
- **호출 방식 오류**: `document.frm.mySheet.Down2Excel();`로 쓰고 있었고 서버 쪽에 라이브러리도 반영하지 않은 사례가 있었습니다. 정상 호출은 `mySheet.Down2Excel()`입니다.
- **가로 길이를 페이지에 맞춤**: 제공하지 않는 기능입니다. 해상도, 컬럼 크기 등을 고려해 POI로 별도 구현해야 합니다.
- **`DownRows`와 헤더**: `DownRows`는 데이터 행 기준이므로 헤더 index를 반드시 넣어 줘야 헤더가 내려옵니다. (`DownRows`를 쓰면 머지가 반영되지 않는 제약은 "다운로드한 엑셀에서 헤더 색이 흰색이거나 …"([DWN-14]) 참고)
- **같은 헤더가 여럿**: 헤더 타이틀이 같은 컬럼이 몇 개 있을 때 값이 순서와 다르게 로드되는 이슈는 패치된 `ibsheet7-1.1.96.jar`를 배포했습니다.
- **폴라리스 오피스 xls**: 서버에서 파싱하는 것은 Apache POI이므로 폴라리스 오피스가 만든 xls를 POI가 읽는 데 문제가 없는지는 폴라리스 오피스 제작사에 문의해야 한다고 판단했습니다.
- **`DirectDown2Excel`에서 헤더만 나오는 경우**: 서버에서 목록을 가져올 때 `resultMap`으로 VO를 쓰고 있어 넘어오는 `savename`이 `_`(언더바) 구분자와 대문자로 와서 `SaveName` 매칭이 되지 않았습니다. 컬럼명을 camelCase로 맞춰야 하는지는 서버 쪽에서 바꿔야 한다고 답했습니다. ("DirectDown2Excel에 데이터가 비어 있거나 변환 오류가 날 때"([ENV-18]) 참고)
- **8224 bytes 오류**: `DirectDown2Excel`로 받으면서 서버에 임시로 저장했다가 다시 다운로드할 때 xlsx에서 xls로 변환되며 문자열 중 변환 오류 문자가 있는 것으로 보고, 특정 화면은 확장자를 xlsx로 받거나 변환하는 로직을 빼라고 안내했습니다.
- `mySheet.Down2Excel` 이후 개발자 도구 콘솔의 `ArrayIndexOutOfBoundsException: -1`은 파일은 정상 다운로드되는데 예전에는 안 뜨던 오류이며 전체 업그레이드를 진행할 때 같이 해결될 것으로 보았습니다.

**키워드**: xls 65000건, CSV 다운로드, Down2Text, setFontFolder, pdfbox 제거, DownRows 헤더, 이미지 URL 다운로드, 폴라리스 오피스, 8224 bytes

## MSC · 그 밖의 시트 사용 질문

### [MSC-01] 접근성 모드(Accessibility:2)와 컬럼 정보 설정 팝업 (공공·금융 접근성 심사)

**질문**
- 접근성 심사를 위해 가로·세로 스크롤에 포커스가 가야 하고(가장 바깥 div에 `max-height`와 `tabindex`), 합계 행 처리, 틀 고정 제거, 팝업을 통한 값 수정, 더보기 메뉴(레이어) 복원 버튼, 체크박스를 input checkbox로, `th` 처리, 링크 텍스트를 button/a 태그로 바꾸는 이슈가 반영되었는가?
- `Accessibility:2`에서 대량이체 등록 때 `HeaderMatch`로 데이터가 들어가지 않는다.
- `Type:Button`은 `Title`을 설정해야 접근성 모드에서 기능을 읽어 주는데 `Title`을 쓰면 브라우저 툴팁이 떠서 UX가 안 좋다. `aria-label`로 설정하는 기능이 있으면 좋겠다.
- 개별 화면마다 컬럼 정보 설정 팝업 div를 추가하는 구간을 공통 페이지로 처리해 달라.

**답변**
- **운영 방식**: 접근성 심사 때만 `ibsheetinfo.js`의 `Accessibility:2` 속성을 설정해 접근성 모드로 바꾸고 운영은 기존과 같은 형태로 생성·동작하는 것을 기준으로 답변했습니다. 접근성 모드를 설정해도 **현재 운영 시스템에 적용된 버전에서는 지원되지 않는 기능이 있으므로 최신 버전 적용과 추가 패치가 필수**입니다. `ibsheetinfo.js` 코드 수정이 필요하면 가이드는 제공하지만 실제 코드 수정·반영 담당자를 지정해야 합니다.
  1. 합계 행: `ibsheetinfo.js`에 `if(sheet.Accessibility === 2){ sheet.SetSumRowHidden(1); }` 조건문을 추가해 접근성 모드일 때만 합계 행이 감춰지게 합니다.
  2. 스크롤 포커스: `Accessibility:2`일 때 시트 생성 시 상위 div에 `tabindex`와 스크롤 표시를 추가하도록 패치했습니다. 수정된 제품을 적용한 뒤 `ibsheetinfo.js`에 접근성 모드를 설정해야 tab으로 스크롤 이동이 가능하고, 포커스 상태에서는 방향키로 스크롤됩니다.
  3. 틀 고정 제거: `ibsheetinfo.js`에 개발/품질에서만 `FrozenCol`을 설정하는 조건 코드가 있으므로 그 조건을 삭제하면 틀 고정이 빠집니다.
  4. 팝업으로 값 수정: `Accessibility:2`이면 기본적으로 시트 내 편집이 불가하므로 팝업 처리는 개발팀이 해야 합니다.
  5. 더보기 메뉴 복원: 컨텍스트 메뉴(컬럼 감추기/보이기/정보 저장 등) 기능은 그리드 외부 버튼으로 레이어 팝업을 연결해 개발해야 하고 샘플 페이지를 제공합니다. 필터링 생성/감추기 같은 기능은 제공되지 않습니다.
  6. 체크박스: 접근성 모드가 추가된 버전을 적용하고 `Accessibility:2`를 설정하면 `input checkbox`로 자동 생성됩니다.
  7. `th`: `Accessibility:2`이면 상단 헤더 table은 `aria-hidden:true`로 바뀌고 데이터 table에 `<tr><th>…`가 추가됩니다.
  8. 링크 텍스트: 컬럼 타입을 `Button`으로 바꾸고 `onButtonClick` 이벤트로 처리하도록 가이드했으며 제품 수정 이슈는 없습니다.
- **`HeaderMatch` 문제**(`Accessibility:2`에서 대량이체 등록): `Accessibility:2` 설정 상태에서 엑셀 업로드 시 `HeaderMatch`가 정상 동작하지 않아 업로드 결과가 바닥 시트에 반영되지 않는 문제로 확인되어 7.0.13.285-20251217-1703에서 수정했습니다. 업로드 다이얼로그의 `select` 태그가 생성되지 않도록 수정했고, 샘플 프로젝트의 `ibsheetinfo.js` 내 `_bankCodeMapping2` 함수 일부를 고쳤습니다. 해결하려면 `ibsheet.js`와 `ibsheetinfo.js`를 모두 적용합니다.
- **`aria-label`** 요청은 개발팀 이슈로 접수되었고 처리 결과는 기록에 없습니다.
- **컬럼 정보 설정 팝업 공통화**: 개별 화면의 팝업 div를 공통 페이지로 빼 달라는 요청에 따라 **ajax로 팝업 페이지를 호출해 화면에 append하는 방식**으로 바꾸고 팝업 페이지와 `ibsheetinfo.js`를 전달했습니다. 팝업 페이지는 공통화되었지만 개별 화면에 [컬럼 정보 설정] 버튼을 추가하는 작업은 화면 개발자가 해야 합니다.

**키워드**: Accessibility 2, 접근성 심사, SetSumRowHidden, tabindex, aria-hidden, 컬럼 정보 설정 팝업, ibsheetinfo.js, 7.0.13.285

### [MSC-02] 시트 설정·표시 관련 자주 나온 질문 (페이징, 합계 행, 테마 css, 이전 값 등)

**질문**
- 페이징 네비게이션이 화면에 보이지 않는다. (`searchMode=4`, `DoSearchPaging`)
- 조회가 끝나고 나서 마지막 행에 특정 데이터를 보여 주고 싶은데 스크롤·소팅과 상관없이 항상 보이게 할 수 있는가?
- 사용자가 편집한 뒤 편집하기 전의 데이터를 알 수 있는가?
- 조회한 값을 천 단위로 나눈 값으로 보여 주고 싶다. 다시 조회하지 않고 보여지게 할 수 있는가?
- 답글처럼 보이도록 데이터에 들여쓰기하는 기능이 있는가?
- `onSearchEnd`에서 for loop로 값을 바꾸는데 `onChange`에도 로직이 있어 여기서도 발생한다.
- 테마(`setTheme`)를 적용한 화면에 테마별 css.js를 include해도 되는가? 메인 테마가 아닌 다른 테마를 쓰는 화면이 깨진다.
- 7개의 시트를 각각의 `OnSearchEnd`에서 다음 시트를 조회하면 `Stack over Flow`가 난다.
- 탭을 눌러 다른 화면으로 갔다 돌아오면 화면이 늘어나 있다. (IE에서만)
- 멀티 체크박스 컬럼의 필터에서도 멀티로 체크하는 기능이 있는가?
- 시트 안에 다른 형식의 시트가 들어가는 화면을 구성하고 싶다.
- 콤보 에디터에서 필터링을 쓰는데 `combotext`에 `\t`를 넣어 여러 개로 표시할 때 일치하는 글자를 탭으로 구분된 항목에서 추출할 수 있는가?
- 행을 클릭할 때 해당 행이 하늘색으로 선택되는 것을 없애고 싶다.
- `Type:Button`의 `ClassName`으로 버튼 스타일을 바꿨는데 변하지 않는다.
- 스크롤바를 두껍고 진하게 하고 싶다. 모바일에서 스크롤 크기가 너무 작다.
- 스크롤을 마우스로 내리면 간헐적으로 화면이 하얗게 나온다. (화면 캡처 프로그램을 설치한 PC에서는 검게 나옴)
- 고정 컬럼(`SetFrozenCol`)이 있는 그리드에 `LoadSearchData`를 하면 데이터 영역에 아무것도 표시되지 않는다.
- 헤더 전체 체크 시 발생하는 이벤트를 잡고 싶다.
- `Type:"Html"` 컬럼에 `<b>test</b>`를 저장하면 저장이 되지 않는다.
- `SYS_SYS_InvalidPaste` 팝업이 뜨고, 데이터 조회 후 글자 수 범위 초과 알림창이 뜬다.

**답변**
- **페이징 네비게이션**: `searchMode=4`, `DoSearchPaging`으로 조회할 때 **Total 값이 없으면 안 나옵니다.** Total 값을 붙여서 가져오고, `mySheet.SetCountPosition(2); mySheet.SetPagingPosition(1);`을 설정해야 나옵니다. (서버 페이징 모드에서 엑셀 업로드 때도 Total이 필요: "서버 페이징 조회 모드에서는 `LoadExcel`이 되지 않습니다"([UPL-10]) 참고)
- **합계 행 고정**: (1) 행을 맨 아래가 아니라 맨 위에 넣고 `FrozenRows`로 고정하거나 (2) `dtAutoSum`으로 합계 행을 만든 뒤 `SumValue`와 `SumText`로 값을 강제로 입력합니다.
- **이전 값**: `OnChange` 이벤트에서 `oldvalue`가 옵니다. (도움말에 없다고 해서 도움말을 첨부해 줌)
- **천 단위**: 천 단위로 재계산된 컬럼을 추가하고 `CalcLogic`을 설정해 처리합니다.
- **들여쓰기**: 따로 제공하는 기능은 없고, Text 컬럼이고 레벨 값이 있으면 `onBeforeDataLoad`에서 레벨 값에 따라 데이터 앞에 공백을 추가하는 방법을 안내했습니다.
- **`onSearchEnd` 대신**: `onSearchEnd`보다 `onLoadData`에서 처리하는 것이 더 빠릅니다.
- **테마 css**: `ibcfg`, `ibmsg`, `ibcss`를 변수로 처리하는 방식(`ibsheetinfo.js`나 공통 파일에 한 번에 설정)을 쓰는데, 화면마다 `ibsheet.cfg.js`, `ibmsg.js`, `ibsheet.css.js`를 직접 include하면 같은 네트워크 트래픽이 발생하므로 `baseFileExt`로 처리할 수 있습니다. 테마별로 다른 css를 불러오면서 같은 `_ibcss` 변수를 써야 한다면 `ibsheet.cfg.js`에서 `SkipDefaultTheme:1`로 설정하고 Main css를 쓰는 화면도 모두 `SetTheme`를 호출하게 한 뒤 테마별 화면에 맞는 css를 include합니다. 테마 css에도 `var _ibcss={`처럼 변수 처리를 해 두어야 합니다.
- **`Stack over Flow`**: 시트마다 `OnSearchEnd`에서 다음 시트를 조회하지 말고 **한 함수에서 호출**하도록 권했습니다.
- **탭 이동 후 늘어남**: `AutoFitColWidth`를 쓰라고 안내했습니다.
- **멀티 체크박스 필터**: 그런 기능은 없습니다.
- **시트 안에 시트**: 서브 그리드 예제를 만들어 보냈습니다.
- **콤보 필터**: `Combofilter=1`로 설정해 보라고 안내했습니다.
- **행 선택 색상**: `SetSelectionMode(0)`을 시트 초기화 이후에 설정하면 그 시점부터 셀 단위 선택으로 바뀌어 행 전체가 하늘색으로 표시되지 않습니다. (현재 모드는 `GetSelectionMode()`로 확인)
- **Button ClassName**: 셀 속성에 `ClassName`을 지정할 때는 `GMCellButton`까지 쓰지 말고 **뒤에 붙는 postfix만** 넣습니다. (예: `ClassName:"Big"`이면 `GMCellButtonBaseBig` 등) 해당 css class는 반드시 해당 테마의 `ibsheet.css`에 정의되어 있어야 합니다. 기본 class는 `GMCellButtonBase`(기본 스타일), `GMCellButton`(활성), `GMCellButton0`(비활성), 각각의 `:hover`입니다.
- **스크롤바**: `CustomScroll`은 브라우저 스크롤이 아니라 이미지로 만든 스크롤을 쓰는 속성이며 스타일은 `ibsheet.css`의 `.GMCustScroll1~3`을 따르고 이미지는 `HScroll.gif` 위치 값을 가져와 표시합니다. 원하는 크기와 색상의 스크롤은 직접 디자인해서 이미지를 별도로 만들어 적용해야 합니다. `CustomScroll`을 설정하지 않거나 0이면 브라우저 스크롤이 표시됩니다. 모바일에서는 개별 시트가 아니라 전역 Cfg(`ibsheet.cfg`)의 **`TouchScroll`** 로만 설정할 수 있습니다. (예: `"CustomScroll":0, "TouchScroll":1`이면 모바일에서는 `CustomScroll1` 크기로 표시)
- **스크롤 시 하얀 화면**: `LazyLoad` 방식에서 사용자가 스크롤을 잡고 이동하면 아직 렌더링되지 않은 메모리의 데이터를 계산해 렌더링하므로 일시적으로 하얀 화면이 보입니다. 회피하려면 일반 조회 방식(`SetConfig({SearchMode:0})`)을 쓰거나 스크롤 지연 처리(`SetConfig({SearchMode:2, DeferredVScroll:1})`, `ScrollInfoFormat`, `ScrollInfoPosition`)를 씁니다. 화면 캡처 프로그램으로 검게 보이는 현상은 PC에 설치된 보안 프로그램의 영향으로 보이며 IBSheet는 PC에 설치되는 제품이 아니라 다른 프로그램과 충돌해 화면이 바뀌지는 않는다고 답했습니다.
- **고정 컬럼 + `LoadSearchData`**: 샘플에서는 재현되지 않으며 (1) 엑셀 import 후 return되는 데이터를 개발자 도구 네트워크에서 확인하고 (2) 시트 초기화 시 `Cfg`의 `FrozenCol`(예: `FrozenCol:3, FrozenColRight:2`) 설정을 확인하고 (3) 설정하지 않는 경우 `SetFrozenCol()`을 쓰면 되며(조회 전·후 어느 시점이나 가능) (4) 별도의 엑셀 로직 대신 시트의 `LoadExcel()`을 쓰라고 안내했습니다.
- **헤더 전체 체크 이벤트**: `OnCheckAllEnd()` 이벤트에서 `Value`로 check/uncheck를 구분해 처리합니다.
- **Html 타입 저장**: `<`, `>` 같은 태그는 보안 취약성 문제도 있어 `&lt;`, `&gt;`로 변환해서 저장해야 하며, 조회할 때는 `OnLoadData` 이벤트에서 이스케이프된 문자만 다시 치환합니다.
```
function mySheet_OnLoadData(data){
  return data.replace(/&lt;/gi,"<").replace(/&gt;/gi,">");
}
```
- **`SYS_InvalidPaste`**: 편집이 불가한 셀에 `Ctrl+V`로 붙여넣기를 시도하면 `ibmsg`의 `SYS_InvalidPaste` 메시지를 출력합니다. 최신 버전으로 올리면서 `ibmsg`를 교체하지 않아 해당 키와 매핑되는 메시지를 못 찾은 것이므로 `ibmsg`도 같이 교체합니다. 메시지를 표시하지 않으려면 `ibsheet.cfg`에 `InvalidPasteMsgMode:1`을 설정합니다. **글자 수 초과 메시지**는 `EditLen`이 설정된 컬럼에 사용자가 편집할 때 보다 긴 문자열이 들어오면 나오는 것이며 조회 완료 시점에 자동으로 체크하지는 않으므로 `EditLen` 설정을 확인하고 필요 없으면 제거합니다.
- **체크박스 값이 0으로 뽑힘**(`GetCellValue`), 업로드 팝업 헤더 드롭다운의 첫 항목이 공백인 문제(`ibsheetinfo.js` 수정 방법을 메일로 전달) 등은 기록에 상세 해결이 없습니다.

**키워드**: SetCountPosition, SetPagingPosition, FrozenRows, OnChange oldvalue, CalcLogic, onLoadData, SetTheme, SkipDefaultTheme, SetSelectionMode, ClassName postfix, CustomScroll, TouchScroll, DeferredVScroll, OnCheckAllEnd, InvalidPasteMsgMode, EditLen

### [MSC-03] 한글 깨짐이 발생하는 AJAX 통신(UseXhr)과 서버 인코딩 필터

**질문**
- JSP에서 받은 데이터를 `setData`로 시트에 넣으니 에러는 없는데 한글이 깨진다. (`UseXhr:1`)

**답변**
- `UseXhr:1`을 쓰면 AJAX 통신이므로 UTF-8로 통신하는데, WAS 설정의 `CharacterEncodingFilter`(예: euc-kr)를 타게 되어 문제가 생깁니다. 이 부분은 제품에서 할 수 없고 **`CharacterEncodingFilter`에서 전송이 UTF-8로 돌도록** 설정해야 합니다.

**키워드**: UseXhr 한글 깨짐, CharacterEncodingFilter, euc-kr, AJAX 인코딩

### [MSC-04] IBChart 관련 짧은 질문 (Down2Image, GetSVG, Y축 간격)

**질문**
- 닷넷 환경에서 차트의 `Down2Image` 사용 방법은?
- `GetSVG()`로 추출한 이미지 크기가 600px로 고정된다.
- 데이터 값이 `0.0002`, `0.0003`처럼 차이가 크지 않은데 라인이 바닥에 깔려서 나온다.
- 차트에서 Y축은 `5`로, 데이터 라벨은 `5.0000`으로 다르게 표시하고 싶다.

**답변**
- 닷넷에서의 `Down2Image` 사용법은 샘플을 만들어 전달했습니다.
- `GetSVG()`: 차트 7.1.0.0-20131015-15부터 너비·높이를 `%`로 지정하면 추출되는 width, height가 600, 400으로 고정됩니다. 고정 px를 쓰거나 `%`를 쓴다면 `myChart.options.exporting.sourceWidth = $("#myChart").width(); myChart.options.exporting.sourceHeight = $("#myChart").height();`를 추가로 설정합니다.
- 라인이 바닥에 깔리면 `YAxis`의 `tickInterval`을 `0.005`로 설정해 봅니다.
- Y축과 데이터 라벨을 다르게 표시하는 것은 origin 데이터를 넣어 봐도 Y축 값과 데이터 값을 다르게 표시할 수 없다고 답했습니다.
- IBChart 자체의 질문은 `ibchart7_qna_merged.md`(IBChart 7 Q&A 정리집)에서 다룹니다.

**키워드**: Down2Image, GetSVG, sourceWidth, tickInterval, IBChart

## REL · 제품 배포·버전 이력·지원 정책

### [REL-01] 서버모듈·제품(ibsheet.js) 배포 버전 이력 (패치 내용별)

**질문**
- 어떤 증상이 어느 버전에서 수정되었는가? 내 환경에는 어떤 버전을 받아야 하는가?

**답변**
아래는 문의 처리 기록에 남은 배포 이력을 시기순(최신 먼저)으로 정리한 것입니다. 버전 번호는 당시 기록 그대로이며, 기록에 없는 버전은 포함하지 않았습니다.

**서버모듈 2.1.x (jakarta/javax)와 `ibsheet.js`**

| 시기 | 배포 버전 | 해결·변경 내용 |
|---|---|---|
| 2026-09 | `ibsheet7-2.1.50-jakarta.jar` + `ibsheet.js` 7.0.13.298 | 여러 시트를 한 워크시트에 받을 때 시트 사이 간격 `AppendSheetGap` 추가, `ReportXMLURL`의 `\n` 줄바꿈과 `StartRow` 적용 |
| 2026-09 | `ibsheet7-2.1.49-jakarta.jar` (javax용은 `2.1.49`로 재배포) | POI 5.x 대응 후 날짜 필드가 일반 숫자로 표시되는 문제, `IBCellStyle` NullPointerException |
| 2026-09 | `ibsheet7-2.1.48-jakarta.jar` + `ibsheet.js` 7.0.13.297 | JDK 21·Tomcat 11 대응(번들 lib에 `poi-5.4.0`). 2026-08에는 2.1.48로 `DownHeader:0`일 때 `reportXML` 디자인이 안 먹는 문제도 처리 |
| 2026-01 | `ibsheet7-2.1.47.jar` | XXE 차단 메시지를 `XXESecurityException`으로 변경 |
| 2025-12 | `ibsheet7-2.1.45-jakarta.jar`, `2.1.43`, `2.1.42` | Java 17/21 Jakarta 대응, POI 4(`poi-4-batik-all-1.17`) 조합, 버전업 후 다운로드 오류 |
| 2025-12 | `ibsheet.js` 7.0.13.285-20251217-1703 | `Accessibility:2`에서 `HeaderMatch`로 업로드가 안 되는 문제 수정 |
| 2025-11 | `ibsheet7-2.1.44-jakarta.jar` | `ReportXMLURL`(dom4j) |
| 2025-10 | `ibsheet7-2.1.41.jar` | 통합 문서 연결·외부 참조 값 읽기, VLOOKUP 수식 데이터 업로드 |
| 2025-06~10 | `ibsheet7-2.1.39(-jakarta).jar` + `ibsheet.js` 7.0.13.274~278 | POI 4.1.2 lib 조합, `UserMerge`·`TitleText` 오류 |
| 2025-06 | `ibsheet7-2.1.37.jar` | POI 3 취약점 대응 후 IBChart PDF 다운로드 |
| 2025-05 | `ibsheet7-2.1.35.jar` + `ibsheet.js` 7.0.13.271-20250425-0829 | POI 취약점 점검(JDK 8 기준 lib), 1.1.76에서 2.1로 교체 |
| 2025-02~03 | `ibsheet7-2.1.34.jar` + `ibsheet.js` 7.0.13.266-20250206-1524, 7.0.13.270-20250329 | 트리 시트 검색 시 펼침, 엑셀 업로드 `Fail to save` 오류, VLOOKUP 결과 `01`, `02`(2024-12 문의) |
| 2025-02 | `ibsheet7-2.1.32.jar` | Jakarta 릴리즈의 마지막 버전으로 안내 |
| 2024-12 | `ibsheet7-2.1.32-jakarta.jar` + `ibsheet.js` 7.0.13.260-20241128-1851, `2.1.31` | Java 17 Jakarta, POI 4.1.2 취약점 lib, `HeaderMatch` Date 14자리 |
| 2024-05~09 | `ibsheet7-2.1.25.jar`, `2.1.26`, `2.1.24` + `ibsheet.js` 7.0.13.253~257 | jakarta 컴파일+POI 4.1.2, POI 5 lib 조합 |
| 2024-02~03 | `ibsheet7-2.1.18(-jakarta).jar` + `ibsheet.js` 7.0.13.244-20240229-1548, 클라이언트 모듈 7.0.0.40 | Java 17 지원, 연말정산 sp.jar 대체 |
| 2024-02 | `ibsheet7-2.1.17.jar` + `ibsheet.js` 7.0.13.243 | `LoadExcel` `msg`에 `^`가 있을 때 `OnLoadExcel` 안 되던 문제 |
| 2023-10~12 | `ibsheet7-2.1.13.jar` + `ibsheet.js` 7.0.13.236, `2.1.11` + `7.0.13.232-20231106` | CSV 데이터에 콤마가 있을 때 `LoadText`, 비밀번호 다운로드 오류 |
| 2023-05~10 | `ibsheet7-2.1.9.jar` + `ibsheet.js` 7.0.13.222-20230629, `2.1.7` + `7.0.13.221` | `Down2ExcelBuffer` NPE, `TextToGeneral:0` 빈 셀 |
| 2023-01~03 | `ibsheet7-2.1.2~2.1.5.jar` | POI 3.13/4.1.2 지원, 콤보 코드 `DirectDown2Excel`, `DirectLoadExcel` FP 절대경로 |
| 2022-08 | `ibsheet7-2.1.0.jar` + `ibsheet.js` 7.0.13.205-20220802-1514 | 2.x 신규 계열(POI도 함께 올려야 함) |

**서버모듈 2.0.x**

| 시기 | 배포 버전 | 해결·변경 내용 |
|---|---|---|
| 2023-09 | `ibsheet7-2.0.92.jar` | `setFileType("excel", true)` 안 먹는 문제 |
| 2023-02 | `ibsheet7-2.0.86.jar(사이트 전용 빌드)` | 셀 서식이 백분율일 때 업로드 오류 |
| 2022-04 | `ibsheet7-2.0.90.jar` | 업그레이드 후 대기 이미지 안 닫힘 |
| 2021-02~2022-01 | `ibsheet7-2.0.88.jar`, `2.0.87`, `2.0.85~84` | `setData` 지원, 합계 0 표시, CSV 한글·헤더 2줄 |
| 2020-10~2021-02 | `ibsheet7-2.0.83.jar`, `2.0.82`, `2.0.81`, `2.0.80` | POI 없으면 오류 발생, `12999.99999998` 보정, FullLoad 줄바꿈 |
| 2020-01~09 | `ibsheet7-2.0.78.jar`, `2.0.79`, `2.0.76`, `2.0.75` | `.xls.xlsx` 파일명, 마지막 컬럼 누락, `Zip bomb` 한도, 헤더 정렬 |
| 2018~2020 | `ibsheet7-2.0.71`, `2.0.65`, `2.0.63`, `2.0.62`, `2.0.61`, `2.0.60`, `2.0.57`, `2.0.54` | 컬럼 폭, 파일명에 `.`, 대량이체 숫자 오류, `setMaxColumns`, `MaxFileSize`, OOME, 15자리 round, `TempFile` |
| 2017~2018 | `ibsheet7-2.0.39`, `2.0.36`, `2.0.27`, `2.0.25`, `2.0.22` | CSV BOM(2.0.39), **비밀번호 다운로드(2.0.36)**, IE 파일 다이얼로그 중복 호출(2.0.27), `getUploadFile`(2.0.22) |

**서버모듈 1.1.x**

| 시기 | 배포 버전 | 해결·변경 내용 |
|---|---|---|
| 2024-02~07 | `ibsheet7-1.1.134.jar`, `1.1.133`, `1.1.135` | `setMaxRows` 오류 알림 정책 변경(`OnLoadExcel`), 쿠키 `HttpOnly`용 `UseXhr`(1.1.134 이상) |
| 2023-03~12 | `ibsheet7-1.1.128.jar`, `1.1.126`, `1.1.125`, `1.1.123` | `NumberFormatException`(js 7.0.13.208 이후), `Synchronizer` 자동 해제(1.1.126), `Ym` 날짜(1.1.125 버그), `ReportXML` 대량 |
| 2019~2022 | `ibsheet7-1.1.124.jar`, `1.1.123`, `1.1.122`, `1.1.121`, `1.1.120`, `1.1.118`, `1.1.116`, `1.1.114`, `1.1.113` | 업로드 1원 가감, `xlmedium`, `NumberFormatMode:1` 소계 색칠, 날짜 1899-12-31, 수식 결과 로드(1.1.118), 확장자 검증(1.1.113) |
| (기능 추가 버전) | `ibsheet7-1.1.85.jar`, `1.1.82`, `1.1.80`, `1.1.61`, `1.1.38`, `1.1.12-sp` | `LoadText` `Encoding`(1.1.85), `LoadText` BOM·한글 헤더(1.1.82), 임시 폴더 안 만드는 `false` 옵션(1.1.80), **`Down2Excel(true)` SXSSF**(1.1.61), JEUS `IndexOutOfBounds`(1.1.38, 연말정산 1.1.12-sp) |

**.NET 서버모듈**

| 시기 | 배포 버전 | 해결·변경 내용 |
|---|---|---|
| 2026-08 | v2.0.0.8 (3.5/4.0) | Down2Pdf가 폰트 폴더의 `.ttf`/`.otf`를 모두 인식 |
| 2026-03 | 헤더 디자인 패치 dll | .NET에서 모듈 업데이트 후 헤더 디자인이 달라지던 문제 |
| 2024-06~11 | 2.0.0.5, 2.0.0.6, 2.0.0.7 | `AutoSum` 아닌 컬럼 Text, `FormatException`, 합계 행 콤마 |
| 2025-05 | 2.0.0.3 (닷넷 4.0) | `SetFileType` 지원 |
| 2018~2021 | 1.1.0.28 (닷넷 4.0), 1.1.0.29 | 닷넷 4.0 지원, 서버 예외 시 대기 이미지 닫기 |

- **서버모듈 jar 이름의 `1.x`와 `2.x`**: 서버모듈 1.0 대(`ibsheet7-1.1.x`)는 기본적으로 서버 메모리에 데이터를 올리고(1.1.61부터는 `Down2Excel(true)`로 파일 버퍼 모드 가능) `Workbook`에 접근할 수 있으며 `ReportXMLURL`, `ReportXML`을 지원하고 POI 3.9~3.13 기준입니다. 2.0 대(`ibsheet7-2.0.x`, `2.1.x`)는 POI 3.13 이상 지원, 내부 xlsx 생성 모듈과 SAX 파서를 갖추었고 `Workbook`에는 접근할 수 없으며 `Down2Excel(true)` 파일 버퍼 모드에서는 `ReportXMLURL`을 쓸 수 없습니다. 1.1.x는 더 이상 기능 추가·수정이 되지 않으니 2.1.x로 교체하라고 안내했습니다(2025-03). (자세한 차이는 "서버모듈 1.x와 2.x의 메모리 동작 차이, 그리고 한계"([PRF-06]), "서버모듈 2.0은 워크북 객체에 접근해 직접 가공할 수 없다"([FMT-15]) 참고)
- **제품 버전과 서버모듈은 같이 올려야** 합니다. `ibsheet.js` 버전이 올라가면 문서 연동 때 생성되는 전문이 바뀌어 서버모듈 교체가 필요한 경우가 있고, 반대로 `ibsheet.js` 7.0.13.208 이후에는 서버모듈 1.1.128이 필요했습니다. 구버전 jar를 그대로 두면 `NumberFormatException` 같은 오류가 납니다.

**키워드**: 버전 이력, 패치 이력, ibsheet7-2.1.50, ibsheet7-2.1.48, ibsheet7-1.1.128, ibsheet7-2.0.36, 닷넷 2.0.0.8, 서버모듈 번호 체계

### [REL-02] 서버모듈 종류와 용어 (1.0, 1.5, 2.0, sp, OEM)

**질문**
- 서버모듈 1.0, 1.5, 2.0은 어떻게 다른가? `ibsheet7-1.1.11-sp.jar`는 무엇인가? 클라이언트 모듈은?

**답변**
- **서버모듈 1.0 / 1.x**(`ibsheet7-1.1.xx.jar`): POI 3.7~3.13 기준, 확장자에 따라 HSSF/XSSF 방식(파일 버퍼 모드는 1.1.61부터 `Down2Excel(true)`). 업로드·다운로드 JSP를 함께 쓰며 `Workbook` 접근과 `ReportXML`이 가능합니다. 더 이상 기능 추가·수정이 되지 않습니다. (문의 기록에는 "서버모듈 1.5"라는 표기도 있으며 같은 1.x 계열의 lib 목록으로 안내되었습니다.)
- **서버모듈 2.0 / 2.x**(`ibsheet7-2.0.xx.jar`, `2.1.xx.jar`): 서버 메모리 사용 효율에 초점을 맞춘 구조로 POI 3.13 기준(이후 4.1.2, 5.x 지원 버전), 내장 xlsx 모듈을 가집니다. 기능은 1.0보다 부족한 부분이 있습니다. Jakarta용 jar(`-jakarta`)가 따로 있습니다.
- **`ibsheet7-1.1.11-sp.jar` / `1.1.12-sp`**: **연말정산용 서버측 처리 모듈**입니다(OEM 계열 사이트가 쓰던 jar). 릴리즈된 지 12년 이상 되어 오류 대부분이 최신 버전에서는 패치되었으며 Java 17을 지원하지 못합니다. 해당 사이트는 패키지 버전 5에서 연말정산용 `ibsheet.js`와 최신 jar를 함께 올렸다고 하며, 연말정산 쪽도 서버측 처리를 최신 jar 기반으로 바꾸는 것이 권장됩니다. 연말정산 쪽 엑셀 다운로드의 일부 기능(예: 비밀번호)은 지원하지 않습니다.
- **클라이언트 모듈**: `ibexcel.js`와 `ExportMode:2`로 브라우저에서 바로 다운로드·업로드합니다. IE10 이상 모던 브라우저, xlsx만, 소량 데이터 권장, DRM 업로드 불가. `ExportMode`는 1(서버, 기본), 2(클라이언트), 3(브라우저를 시도해 안 되면 서버)입니다.
- **OEM으로 공급한 경우**(OEM 업체 등) 제품 직접 기술지원이 어려워 해당 업체를 통해 확인·지원을 받도록 안내했습니다.

**키워드**: 서버모듈 1.0, 서버모듈 1.5, 서버모듈 2.0, sp.jar, 연말정산용 서버모듈, 클라이언트 모듈, ExportMode, OEM

### [REL-03] 유지보수 계약·제품 배포와 기술지원 정책 (일반 원칙)

**질문**
- 서버모듈 jar를 교체하면 영향도가 있는가? 서버모듈을 쓰면 추가 라이선스 비용이 있는가? 유지보수가 만료되었는데 제품 배포를 받을 수 있는가?
- 이전에 받았던 서버모듈 jar·JSP를 다시 받을 수 있는가?

**답변**
- **추가 비용**: 서버모듈을 사용한다고 해서 **추가 라이선스 비용은 발생하지 않습니다.** 이미 도입한 수량의 제품은 무상이며 증설할 때는 증설 수량만큼 비용이 발생한다는 안내가 있었습니다. ("자바 버전을 올리거나 서버모듈을 쓰면 추가 비용·이슈가 있나"([UPG-04]), "JDK 버전을 올리면 IBSheet7에 영향이 있나"([ENV-01]) 참고)
- **유지보수가 만료된 사이트**는 제품 배포와 기술지원이 어렵고, **유상 유지보수 체결 후**에 제품(jar, js, JSP) 교체와 원격 지원이 가능하다고 안내했습니다. 유지보수 담당 영업 부서 연락처를 안내하고 종료하는 식으로 처리되었습니다. 이는 서버모듈 jar를 교체하는 경우(Jakarta 대응, POI 취약점 대응 포함)에도 같습니다. 무상 유지보수 기간이 종료되었는지 확인해야 합니다.
- **jar 교체의 영향도**: `ibsheet7-xxx.jar` 교체 자체는 영향도가 크지 않으나 JSP·`ibsheet.js`와 맞춰야 하고, 환경(JDK, POI)과 맞는 제품을 받아야 합니다. 이미 구축된 시스템이면 기존 서버모듈이 있을 것이므로 먼저 `WEB-INF/lib`의 `ibsheet7-X.X.X.jar`와 `ibsheet.cfg`의 `Down2Excel_Url` 경로를 확인하고 연락하라고 안내했습니다. jar와 JSP는 현재 사용하는 Java 버전에 맞는 제품이 나가야 합니다.
- **배포 형식**: 메일 정책으로 jar, js, dll 등의 확장자가 차단될 수 있어 `jarx`, `jx`, `zi`, `jax`처럼 확장자를 바꾸거나 마지막 글자를 뺀 파일로 보내며, 받은 뒤 원래 확장자(`jar`, `js`, `zip`, `dll`)로 되돌려 사용하도록 안내했습니다. 파일이 5MB 정도로 잘려 나뉘어 전달되기도 했습니다.
- **기술지원 범위**: 제품이 아닌 사이트가 자체 구현한 코드(예: HSSF로 직접 구현한 엑셀 다운로드, 고객사가 커스터마이징한 `LoadExcel.jsp`, 제3자 프레임워크의 서블릿)는 지원할 수 없다고 답변했습니다. 장애 분석에는 `e.printStackTrace()`가 주석 처리되어 있는지부터 확인하고 서버 로그를 요청합니다. ("라이브러리(POI 등) 구성"의 "서버모듈 버전과 로딩된 라이브러리를 확인하는 방법"([LIB-02]) 참고)

**키워드**: 유지보수 계약, 제품 배포 정책, 추가 라이선스 비용, 증설 비용, 확장자 변경 배포, 기술지원 범위

