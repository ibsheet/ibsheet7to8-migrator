---
name: ibsheet7
description: IBSheet7(웹 그리드 컴포넌트, ibsheet.js / ibleaders.js / ibsheetinfo.js / ibexcel.js, 서버모듈 ibsheet7-x.y.z.jar)의 코드 작성, API·이벤트·속성 사용법, 오류·증상 해결을 도와준다. 사용자가 IBSheet, IBSheet7, 아이비시트, createIBSheet, InitColumns, InitHeaders, SetConfig, DoSearch, DoSave, LoadSearchData, GetSaveJson, SaveName, OnSearchEnd, OnChange, Down2Excel, LoadExcel, ShowSubSum, SetMergeCell, IBUpload, IBChart 등을 언급하거나 "시트", "그리드"로 조회·저장·엑셀 다운로드/업로드·머지·트리·정렬·필터·합계·스타일·라이선스(License is not valid)·브라우저 호환·성능 문제를 물으면, IBSheet라는 단어가 없어도 프로젝트에 ibsheet 파일이 있으면 반드시 이 스킬을 사용한다. IBSheet8이 아닌 IBSheet7 전용이다.
---

# IBSheet7 개발 지원

IBSheet7은 `createIBSheet()`로 만든 시트 객체에 `InitColumns`, `DoSearch`, `DoSave` 같은 메서드를 호출해 쓰는 웹 그리드다. 이름이 비슷한 IBSheet8과 API가 다르므로(예: `create`가 IBSheet7은 동기, IBSheet8은 비동기) 기억에 의존해 답하면 틀리기 쉽다. 그래서 이 스킬은 **`references/`의 공식 매뉴얼과 Q&A 지식집을 먼저 찾아보고, 거기에 근거해서** 답하도록 구성했다. 문서에 없는 속성·함수·동작을 지어내지 말고, 근거를 못 찾으면 못 찾았다고 말한다.

## 작업 흐름

1. **질문 유형 분류** — 아래 셋 중 어디에 가까운지 판단한다.
   - *사용법/코드 작성* ("~하려면 어떻게 코드를 짜나") → 매뉴얼(`references/manual/`)에서 해당 함수·이벤트·속성 문서를 읽는다.
   - *증상/오류 해결* ("~가 안 된다", "오류가 난다", "깨진다") → Q&A(`references/qna/`)를 키워드로 검색한다. 10년 이상 쌓인 실제 문의 5,800여 건이라 같은 증상이 이미 있을 확률이 높다.
   - *환경/배포/업그레이드* (라이선스, 서버모듈, JDK/Tomcat, 버전 교체) → `references/guides/`와 Q&A의 01·10·14 파일.
2. **검색** — 아래 "문서 찾는 법"대로 Grep → 해당 부분만 Read. 파일이 수백 KB라 통째로 읽지 않는다.
3. **버전 확인** — Q&A 항목에 `7.0.13.xxx` 같은 "적용 버전"이 있으면 사용자의 ibsheet.js 버전과 비교한다. "해당 버전 이상으로 교체하면 해결"인 경우가 많다. 사용자의 버전을 모르면 물어보거나 "버전에 따라 다를 수 있다"고 밝힌다.
4. **답변** — 동작하는 코드(전체 흐름이 필요하면 `createIBSheet` → 초기화 → 조회/저장까지)와 근거 문서(매뉴얼 경로 또는 Q&A ID 예: `[INIT-0001]`)를 함께 제시한다. 환경 의존적이거나 추정 원인인 항목은 단서를 그대로 전달한다.

## 문서 찾는 법

### 매뉴얼 — `references/manual/`
함수·이벤트·속성별로 파일이 하나씩 있고(`funcs/…/DoSearch.md`처럼 이름이 곧 API 이름) 각 폴더에 `index.md` 목록이 있다. API 이름을 알면 Glob으로 바로 찾는다.

| 폴더 | 내용 |
|---|---|
| `start/` | Quick Start, 시트 구조(client↔서버 조회/저장 흐름), 개발 실습 — 처음 만드는 사용자에게 가장 먼저 |
| `intro/` | 제품 특징, 배포 파일 구성(`files.md`: 각 js/cfg/jar의 용도) |
| `props/` | `Config.md`(ibsheet.cfg 전역 설정)와 `PropertyList/`(속성 159개: 컬럼·헤더·Cfg 속성) |
| `funcs/init` | `SetConfig`, `InitHeaders`, `InitColumns` |
| `funcs/search`, `funcs/save` | 조회(`DoSearch`, `DoSearchPaging`, `LoadSearchData`…) / 저장(`DoSave`, `GetSaveJson`, `LoadSaveData`…) |
| `funcs/row`, `cell`, `col` | 행·셀·컬럼 조작 |
| `funcs/core` | 가장 큰 폴더(200여 개). 그 외 일반 메서드(`Get*/Set*` 화면·동작 설정, `DoPrint`, `FitSize` 등) |
| `funcs/merge`, `tree`, `group`, `sum`, `filter`, `pivot` | 병합, 트리, 그룹, 소계·합계·계산, 필터, 피벗 |
| `funcs/export`, `import` | 엑셀/텍스트 다운로드·업로드 (`Down2Excel`, `LoadExcel`…) |
| `funcs/globalModule` | 전역 함수 |
| `event/` | `OnSearchEnd`, `OnChange`, `OnClick` 등 70여 개 이벤트 (인자·발생 조건) |
| `appx/` | 컬럼 타입별 설명(`columnType/`: text·number·date·combo·checkbox·html·etc), Theme, 필터, 엑셀 머지, 자주 쓰는 메서드(`frequentmethod.md`), 파일 업로드/다운로드 |
| `static/` | 조회·저장용 **JSON / XML / TreeJSON 데이터 형식** 명세와 엑셀 ReportXML 템플릿 |

컬럼에 쓸 `Type`(Text, Int, Float, Date, Combo, CheckBox, Button, Html, AutoSum, Status 등)이 궁금하면 `appx/columnType/index.md`부터 본다. 서버가 돌려줄 데이터 형식을 정해야 하면 `static/JSON/`을 본다.

### Q&A 지식집 — `references/qna/`
`00_목차.md`에 파일별 소주제와 항목 수가 있다. 증상 키워드로 파일을 고른다.

| 파일 | 주제 |
|---|---|
| `01_설치_배포_라이선스` | 설치 파일, 라이선스 오류(License is not valid/expired), 캐시, 버전 교체 |
| `02_시트생성_초기화` | 시트 생성·초기화, ibsheet.cfg, 안 그려질 때, Reset/삭제 |
| `03_컬럼타입_속성_1/2` | 숫자·날짜 Format, 콤보, 체크박스, 팝업, 입력 제한 |
| `04_조회_저장_데이터` | DoSearch/DoSave, 페이징, JSON/XML, 서버 연동 오류 |
| `05_이벤트` | 이벤트 발생 조건·순서, OnChange 오동작 |
| `06_행_셀_컬럼조작API` | 값 읽기/쓰기, 행 추가/삭제, 포커스, 숨김 |
| `07_셀_행_컬럼병합` | 머지 |
| `08_트리_그룹_계층` | 트리, 그룹행 |
| `09_정렬_필터_합계_계산` | 정렬, 필터, 소계/합계, CalcLogic, 피벗 |
| `10_엑셀_PDF_CSV입출력_1/2` | 엑셀·CSV·PDF 입출력, 서버모듈, POI, DRM |
| `11_성능_메모리` | 속도·대용량 |
| `12_화면표시_스타일_사용자조작_1/2` | 스타일·CSS·너비/높이·스크롤·복사붙여넣기·포커스 |
| `13_브라우저_OS호환` | IE/Chrome/Edge, 모바일, 웹접근성, 쿼크모드 |
| `14_프레임워크_외부연동` | Spring/전자정부, jQuery, iframe, 탭, 모달, SPA |
| `15_부가컴포넌트` | IBChart, IBUpload, IBTab, IBCalendar 등 |
| `16_제품일반` | 지원 범위·정책, 보안(CSP), IBSheet8·ActiveX 전환 |
| `ibsheet7_server_qna_merged` | 서버모듈 전용(라이선스, JDK17/21·Jakarta, POI, 다운/업로드 오류, DRM, 서식) |

항목 형식은 `### [분류-번호] 제목` → **질문** → **답변** → **적용 버전** → **키워드**. 그래서 이렇게 검색한다.

```
Grep pattern="OnChange.*(두 번|중복)" path="references/qna" -i   # 증상 키워드
Grep pattern="^### .*Down2Excel" path="references/qna/10_엑셀_PDF_CSV입출력_1.md" output_mode=content   # 제목만 훑기
```

검색 요령: 함수명·속성명(영문)과 한글 증상어를 둘 다 시도한다. 제목 줄(`^### `)만 먼저 훑어 후보를 고른 뒤 그 항목 주변(`-A 25`)만 읽으면 토큰을 아낀다. 한 번에 안 나오면 동의어(예: 머지/병합, 조회/로드, 안 보임/미표시)로 재검색한다.

### 가이드 — `references/guides/`
짧은 운영 문서 모음: 개발 시 주의사항, 시트가 안 보일 때 점검, 버전 업그레이드 주의(서버모듈 1.0/2.0), 성능 향상·조회 속도 요인, 페이지 로딩 속도, 너비 문제, DRM 적용, EUC-KR 서버 저장, JEUS·.NET·전자정부 프레임워크 주의점, 두 버전 공존, 오류 시 화면 덤프 가이드. 증상이 이 제목들과 겹치면 Q&A보다 먼저 읽는다.

## IBSheet7 코드의 기본 골격

문서(`start/quick-start.md`)에서 확인한 표준 흐름이다. 새 코드를 쓸 때 이 틀을 따르고, 세부 옵션은 각 함수 문서로 확인한다.

1. **파일 로드**: `ibleaders.js`(라이선스) → `ibsheetinfo.js` → `ibsheet.js` (+ 클라이언트 엑셀 처리 시 `ibexcel.js`). `ibsheet.css`는 `ibsheet.js`가 자동 참조하므로 따로 링크하지 않는다.
2. **객체 생성**: body 안에서 `createIBSheet("mySheet", "750px", "400px")`. 시트 id가 이후 모든 호출의 객체명이 된다.
3. **초기화는 `onload` 이후**: 생성 전에 시트 함수를 부르면 스크립트 오류가 난다. `SetConfig(cfg)` → `InitHeaders(headers, info)` → `InitColumns(cols)`, 또는 한 번에 `IBS_InitSheet(mySheet, {Cfg, HeaderMode, Cols})`.
4. **컬럼 정의**: `{Type:"Text", Width:100, SaveName:"sText", Align:"Left"}` — `SaveName`이 서버 데이터와 저장 파라미터의 키다.
5. **조회/저장**: `mySheet.DoSearch(url, param)`, `mySheet.DoSave(url, opt)`, 행 추가 `DataInsert`. 결과 처리는 이벤트 함수 `mySheet_OnSearchEnd(code, msg, ...)`처럼 **`시트id_이벤트명`** 규칙으로 선언한다(`code < 0`이 오류).

위는 골격일 뿐이다. 속성 이름·인자·기본값은 반드시 해당 매뉴얼 파일에서 확인한 뒤 쓴다.

## 답변할 때 지킬 점

- 증상 답변은 "원인 → 확인 방법 → 조치" 순서로, 조치가 버전 업그레이드라면 필요한 최소 버전을 명시한다.
- 사용자가 준 코드를 고칠 때는 문제 지점만 최소한으로 바꾸고, 왜 그렇게 바꾸는지 근거 문서와 함께 설명한다.
- 서버모듈(엑셀 다운/업로드) 문제는 서버모듈 종류(1.0 vs 2.0, .NET, 클라이언트 `ibexcel.js`), POI 버전, JDK/WAS 버전에 따라 원인이 갈린다. 이 정보가 없으면 먼저 확인한다.
- Q&A는 문의 처리 당시 기준이다. 오래된 답변과 최신 답변이 다르면 최신을 우선하고, 지원 정책·버전은 최신 배포본 확인을 권한다.
- 문서에서 답을 찾지 못하면 추측으로 속성을 만들지 말고, 찾아본 범위를 알리고 사용자에게 버전·환경·재현 코드를 요청하거나 제조사 문의를 안내한다.
