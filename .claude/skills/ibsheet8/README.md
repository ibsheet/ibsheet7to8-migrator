# IBSheet8 Skill for Claude Code

[IBSheet8](https://www.ibsheet.com) 그리드 개발용 [Claude Code](https://claude.com/claude-code) 스킬입니다.
설치하면 Claude 가 IBSheet8 관련 작업을 할 때 이 가이드를 자동으로 참조합니다.

`Cfg`/`Cols`/`Events` 옵션 구조, `loadSearchData`/`getSaveJson` 같은 핵심 API,
컬럼 타입별 주의사항, 편집 매트릭스, 이벤트 타이밍, 그리고 실제 개발에서 자주 밟는
함정과 그 해결책을 담고 있습니다. IBSheet8 공식 매뉴얼 전문도 함께 포함되어 있어
상세 API 를 찾아볼 때 별도 검색 없이 참조됩니다.

---

## 설치

### 프로젝트 단위로 설치 (팀 공유)

해당 프로젝트에서만 쓰고, 저장소에 커밋해 팀원과 공유하려면:

```bash
git clone https://github.com/ibsheet/ibsheet8-skill.git .claude/skills/ibsheet8
```

### 사용자 단위로 설치 (모든 프로젝트)

로그인한 계정의 모든 프로젝트에서 쓰려면:

```bash
# macOS / Linux
git clone https://github.com/ibsheet/ibsheet8-skill.git ~/.claude/skills/ibsheet8

# Windows (PowerShell)
git clone https://github.com/ibsheet/ibsheet8-skill.git "$env:USERPROFILE\.claude\skills\ibsheet8"
```

설치 후 Claude Code 를 재시작하면 `/ibsheet8` 로 직접 호출할 수 있고,
아래 상황에서는 Claude 가 스스로 로드합니다.

## 언제 자동으로 동작하나

대화나 코드에 다음이 등장하면 트리거됩니다.

- `ibsheet`, `IBSheetReact`, `IBSheet.create`, `IB시트`, `시트`, `그리드 옵션`
- `loadSearchData`, `getSaveJson`, `getRowsByChecked`, `EnumKeys`
- `Cfg` / `Cols` / `Events` 식별자

단순 HTML `<table>` 이나 MUI DataGrid, ag-Grid, TanStack Table 작업에는 로드되지 않습니다.

## 구성

```
SKILL.md                          스킬 본문 — 핵심 API + 함정 모음
├── references/
│   ├── core/                     초기화, 컬럼/이벤트 속성, API, 고급 패턴
│   ├── features/                 그룹핑, 소계, 피벗, 수식, 트리, Export/Import, 검증, 커스텀 플러그인
│   ├── integration/              React · Vue 연동, IBSheet7 → IBSheet8 마이그레이션
│   ├── troubleshooting/          자주 발생하는 오류, Playwright 셀 클릭
│   └── ibsheet-official-manual/  IBSheet8 공식 매뉴얼 전문 (1,100여 문서)
└── assets/templates/             바로 쓰는 예제 — basic / crud / advanced / framework
```

### 레퍼런스 가이드

| 분류 | 내용 |
|------|------|
| **Core** | 초기화(기본 / Cfg / 컬럼), 컬럼 Type·Format 속성, 이벤트 전체 목록, API 메서드, 페이징·건수 표시, 고급 패턴 |
| **Features** | 그룹핑, FormulaRow·SubTotal, 피벗, 수식, Attribute Formula, 트리 그리드, 틀고정·셀병합, Excel/PDF Export·Import, 입력값 검증, `window.IBSheet.Plugins` 커스텀 메서드 |
| **Integration** | React 컴포넌트화, Vue 컴포넌트화, IBSheet7 → IBSheet8 전환 가이드 |
| **Troubleshooting** | 초기화·데이터·이벤트·메모리·스타일·통신 오류별 원인과 해결, Playwright/MCP 로 IBSheet 셀·버튼·콤보 클릭하기 |

### 템플릿

| 분류 | 파일 |
|------|------|
| Basic | `simple-grid.html`, `readonly-grid.html` |
| CRUD | `standard-crud.html`, `batch-crud.html` |
| Advanced | `master-detail.html`, `tree-grid.html`, `pivot-table.html` |
| Framework | `react-component.jsx`, `vue-component.vue` |

## 다루는 함정들 (일부)

실제 개발 중 발견해 원인까지 규명한 항목들입니다.

- 저장 변경분은 `getSaveJson` — `getRowsByStatus` 를 따로 부르면 중복 전송
- dirty 체크는 `hasChangedData(1)` — `getRowsByStatus` 는 `setValue` 만 한 셀을 못 잡는다
- `@ibsheet/react` v1.1.0 은 `options` prop 이 바뀌어도 sheet 를 재생성하지 않는다 (`key` prop 으로 강제 remount)
- 컬럼 숨김은 `Visible: 0` 만 동작 — `Hidden` 은 조용히 무시된다
- 셀 tooltip 키는 `Tip` — `Tooltip` / `TooltipFormula` 는 존재하지 않는 키
- `Type:'Enum'` 의 `Enum` / `EnumKeys` 문자열은 leading `|` 가 필수
- `Float`/`Int` 컬럼은 string 데이터를 받지 않는다 (Number 변환 필요)
- `display:none` 컨테이너에서 mount 하면 행 높이 계산이 무효가 된다 (탭 전환 함정)
- `fitSize()` 는 컨테이너 리사이즈 메서드가 아니다

## 참고

- 공식 문서: <https://docs.ibsheet.com>
- 제품 소개: <https://www.ibsheet.com>

IBSheet8 은 상용 제품으로, 사용에는 별도 라이선스가 필요합니다.
`references/ibsheet-official-manual/` 의 매뉴얼 문서 저작권은 IBSheet 에 있습니다.

## 기여

오래된 내용이나 빠진 함정을 발견하면 Issue 나 Pull Request 로 알려주세요.
새 함정을 추가할 때는 **증상 → 원인 → 해결 코드** 순으로 적고,
재현하거나 검증한 방법을 함께 남겨주시면 좋습니다.
