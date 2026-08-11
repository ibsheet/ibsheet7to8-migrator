# ibsheet7to8-migrator

**Simple and fast migration tool for upgrading IBSheet7 projects to IBSheet8.**
IBSheet7 프로젝트를 IBSheet8으로 손쉽게 업그레이드할 수 있는 마이그레이션 도구입니다.

![status](https://img.shields.io/badge/version-1.1.0-blue)
![python](https://img.shields.io/badge/python-3.8%2B-3776AB)
![node](https://img.shields.io/badge/node-18%2B-339933)
![deps](https://img.shields.io/badge/dependencies-none-success)

> ⚡ **바로 시작 → [빠른시작.md](빠른시작.md)** (1페이지 요약)
> 📘 **처음 사용하시나요? → [사용가이드.md](사용가이드.md)** (설치·배치 → 설정 → 사용 → 결과 해석 → 후속 작업)
> 📝 **버전별 변경 이력 → [CHANGELOG.md](CHANGELOG.md)**

---

## 이 도구가 하는 일

IBSheet7의 JSP/JavaScript 코드를 IBSheet8 API로 변환합니다. **"안전한 변환은 자동으로, 위험한 변환은 분리해서"** 가 설계 원칙입니다.

| 레이어 | 담당 | 처리 대상 |
|---|---|---|
| **결정론** | `engine/migrate_core.py` | 1:1 동일 시그니처 메서드·속성값 — 자동·안전 |
| **판단** | AI 에이전트 + `docs/` | 반환값 의미 변경, 접두사 strip, 미지원 API 재구성 — 컨텍스트 필요 |
| **검증** | `verify/` 3종 | 잔존 0 / 구문 OK / 함수 누락 0 을 스스로 증명 |

위험한 변환을 스크립트가 멋대로 하지 않고 `needs_review`로 분리하는 것, 그리고 결과를 스스로 검증하는 것이 신뢰성의 핵심입니다.
검증 3종은 **순수 Python**이라 어떤 AI로 변환했든 결과가 동일한 기준으로 판정됩니다.

- ✅ JSP/JS의 IBSheet7 API → IBSheet8 정적 변환 + 정합성 검증
- ❌ 백엔드(컨트롤러·매퍼 SQL), 실제 브라우저 동작/QA — 변환 후 별도 수행
- ❌ IBSheet8 라이브러리·라이선스 (벤더를 통해 별도 도입)

## ⚠️ 변환 결과는 브릿지 헬퍼에 의존합니다

IBSheet7↔8의 구조적 불일치(행/열 인덱스 체계 차이, 반환값 의미 변경, 사라진 API)는 **표준 브릿지 헬퍼**가 흡수합니다.
변환 결과에 `getValue2`·`setAttribute2`·`getRowByIndex7`처럼 **`2`/`7`로 끝나는 함수**가 있으면 이 헬퍼의 함수입니다.

**`helpers/ibsheet-migration.js` 를 웹앱에 배포하고, IBSheet8 본체 다음에 불러오세요.**

```html
<script src="/js/ibsheet/ibsheet.js"></script>
<script src="/js/ibsheet/ibsheet-migration.js"></script>
```

> **검증 3종은 정적 검사라 이 파일이 없어도 PASS가 나옵니다.** 배포 누락은 검증으로 잡히지 않습니다.
> 브릿지를 **쓰면 안 되는 예외 6가지**는 [docs/conventions.md](docs/conventions.md) §5-1과 [samples/](samples/)를 참고하세요.

```
ibsheet-migration/
├── AGENTS.md                     ← ★ 규칙 원본(Single Source of Truth). 모든 AI가 이걸 따름
├── CLAUDE.md                     ← Claude Code 진입점 (AGENTS.md 포인터)
├── GEMINI.md                     ← Gemini 진입점 (AGENTS.md 포인터)
├── .github/copilot-instructions.md ← GitHub Copilot 진입점 (AGENTS.md 포인터)
├── migrate.config.example.json   ← 프로젝트별 컨벤션 템플릿
├── docs/                         ← 지식 베이스 (.md) — 추측 금지의 근거
│   ├── method-mapping.md         IBSheet7→8 메서드 1:1 대조표
│   ├── property-mapping.md       Cfg/Col 속성 변환 (SaveName→Name, Hidden→Visible 반전 등)
│   ├── event-mapping.md          이벤트명 + evtParam 변환
│   ├── deprecated-removed.md     미지원/삭제 API와 대체 패턴
│   └── conventions.md            실전 컨벤션 & 알려진 함정
├── helpers/                      ← 런타임 표준 헬퍼 (.js)
│   └── ibsheet-migration.js      IBSheet7↔8 인덱스·값·속성 브릿지 (변환 대상 프로젝트에 포함)
├── samples/                      ← 참조 예제 (ASIS/TOBE 한 쌍)
│   ├── README.md                 브릿지를 쓴 자리 / 쓰지 않은 자리 정리
│   ├── asis/orderList.jsp        IBSheet7 원본
│   └── tobe/orderList.jsp        IBSheet8 변환 결과 (검증 3종 PASS)
├── migrate.py                    ← 실행 CLI (변환+검증 진입점. convert/verify/rules/doctor)
├── engine/                       ← 변환 엔진 (.py)
│   ├── migrate_core.py           결정론 변환 (자동 + 검토항목 리포트)
│   └── rules/migrate_rules.json  변환 규칙 (확장 가능)
└── verify/                       ← 검증 (.py)
    ├── residue_scan.py           IBSheet7 PascalCase 잔존 스캔 (=0 통과)
    ├── jscheck.py                JS 구문 검증 (JSP 태그 제거 후 node --check)
    └── fn_parity.py              ASIS 함수 누락 검사 (=0 통과)
```

## 빠른 사용

변환과 검증 3종을 한 명령으로 묶은 CLI(`migrate.py`)가 진입점입니다.

```bash
python migrate.py doctor                              # 실행 환경 점검 (python·node·구성요소)
python migrate.py convert myfile.jsp --out build/     # 변환 + 검증 3종
python migrate.py convert src/ --out build/           # 디렉터리 일괄 (트리 구조 보존)
python migrate.py verify build/myfile.jsp --asis myfile.jsp   # 검증만
python migrate.py rules                               # 규칙 통계 + 자기점검
```

**종료코드**

| 코드 | 의미 |
|---|---|
| `0` | 변환·검증 완료 |
| `1` | 검증 실패 (JS 구문 오류 또는 ASIS 함수 누락) |
| `2` | **판단 변환 필요** — 자동 변환하면 위험한 항목이 남았다는 신호. 실패가 아니다 |
| `3` | 사용법 오류 |

`2`가 나오면 리포트의 `needs_review` 항목을 `docs/` 매뉴얼 근거로 한 건씩 변환한 뒤
`migrate.py verify`로 마무리합니다. 이 단계가 AI 에이전트의 몫입니다.

> CLI는 변환 결과가 **브릿지 헬퍼를 호출하면 배포 안내를 함께 출력**합니다.
> 검증 3종은 정적 검사라 헬퍼 배포 누락을 잡지 못하기 때문입니다.

엔진·검증 스크립트를 직접 호출해도 됩니다:

```bash
python engine/migrate_core.py  myfile.jsp --out myfile.tobe.jsp --report report.json
python verify/residue_scan.py  myfile.tobe.jsp
python verify/jscheck.py       myfile.tobe.jsp
python verify/fn_parity.py     myfile.jsp myfile.tobe.jsp
```

## AI 에이전트와 함께 쓰기

이 툴킷은 **특정 AI에 종속되지 않습니다.** 규칙 원본은 `AGENTS.md` 하나이고,
각 AI 도구가 자동으로 읽는 진입점 파일은 모두 이를 가리키는 얇은 포인터입니다:

| AI 도구 | 자동 인식 진입점 |
|---|---|
| Claude Code | `CLAUDE.md` |
| Gemini (CLI 등) | `GEMINI.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| 그 외 (Codex 등 범용) | `AGENTS.md` (직접 인식) |

이 폴더를 변환 대상 프로젝트 루트에 두거나 작업 디렉터리로 지정하면, 어떤 AI 에이전트든
`AGENTS.md`의 5단계 워크플로우(결정론 변환 → 판단 변환 → 자기 검증)를 규칙대로 수행합니다.
**규칙을 수정할 때는 `AGENTS.md`만 고치면** 모든 도구에 동일하게 반영됩니다.

프로젝트별 컨벤션은 `migrate.config.example.json`을 `migrate.config.json`으로 복사해 조정하세요
(`stripPrefixes`/`keepPrefixes`/`urlConvention`).

## 전제

| 항목 | 버전 | 용도 |
|---|---|---|
| Python | 3.8+ | 변환 엔진·검증 스크립트 (외부 패키지 불필요, 표준 라이브러리만 사용) |
| Node.js | 18+ | JS 구문 검증(`jscheck`) — `node --check` 호출 |
| AI 코딩 도구 | 택1 | 판단 변환 수행 (Claude Code / Gemini / Copilot 등). 없으면 자동 변환까지만 |

## 규칙을 수정할 때

**`AGENTS.md` 하나만 고칩니다.** `CLAUDE.md`/`GEMINI.md`/`.github/copilot-instructions.md`는 이를 가리키는 포인터일 뿐입니다.
변환 지식(매핑·함정)은 `docs/`, 자동 변환 규칙은 `engine/rules/migrate_rules.json`에 있습니다.

기여·규칙 보강 절차는 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

## 관련

- **Claude Code 플러그인 버전**(고객 배포용): 동일한 엔진·지식·헬퍼를 플러그인으로 패키징해 별도 배포합니다.
  두 채널은 **이 리포지토리를 기준본으로 동기화**하며, 플러그인 쪽은 경로만 `${CLAUDE_PLUGIN_ROOT}` 기준으로 바뀝니다(`docs/` → `knowledge/`).

## 라이선스

**독점 소프트웨어** — 아이비리더스와 유효한 계약을 체결한 고객의 내부 사용에 한합니다.
제3자 재배포·파생 도구 제작은 허용되지 않습니다. 전문은 [LICENSE](LICENSE) 참고.

- `helpers/ibsheet-migration.js`는 변환 결과의 런타임 의존 파일이므로 **이용자 웹 애플리케이션에 배포할 수 있습니다**(LICENSE §3).
- IBSheet8 라이브러리·라이선스는 포함되지 않으며 벤더를 통해 별도 도입해야 합니다.

## 문의 / 기술지원

- 배포처: 아이비시트 기술지원 · 회사명: 아이비리더스
- 연락처: **1644-5615** (ARS 2번) · 홈페이지: www.ibsheet.com
