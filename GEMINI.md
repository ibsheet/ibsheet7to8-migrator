# IBSheet7 → IBSheet8 마이그레이션 규칙 (Gemini 진입점)

> **규칙 원본은 [`AGENTS.md`](./AGENTS.md) 하나다.** 이 파일은 Gemini(예: Gemini CLI)가
> 자동으로 읽는 진입점일 뿐이며, 실제 작업 규칙·워크플로우·변환 지침은 모두 `AGENTS.md`에 있다.
> 규칙을 수정할 때는 이 파일이 아니라 **`AGENTS.md`를 고친다.**

**작업 전 반드시 [`AGENTS.md`](./AGENTS.md)를 먼저 읽고**, 거기에 정의된 5단계 워크플로우
(결정론 변환 → 판단 변환 → 자기 검증)와 절대 규칙을 그대로 따른다.

- 지식 문서: `./docs/`
- 변환 엔진: `./engine/` · 검증 스크립트: `./verify/`
- 프로젝트별 컨벤션: `./migrate.config.example.json` → `migrate.config.json`
