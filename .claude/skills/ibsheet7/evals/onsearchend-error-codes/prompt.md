---
tags: [ibsheet7]
max_turns: 25
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

IBSheet7 쓰고 있는데요, mySheet.DoSearch("/emp/list.do", "dept=10") 로 조회한 다음에 조회가 성공했는지 실패했는지 처리하고 싶어요. 실패하면 원인별로 (URL 잘못됐거나 네트워크 오류, 응답은 왔는데 데이터 파싱 오류, 응답이 비어있음, 시간 초과) 다른 메시지를 띄우고 싶은데 코드 좀 짜주세요.
