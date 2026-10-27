---
tags: [ibsheet7]
max_turns: 25
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

서버모듈로 Down2Excel 쓰는데 mySheet.Down2Excel({FileName:"사원목록"}) 하면 저장 창에 파일명이 깨져서 나와요. 엑셀 안의 데이터는 멀쩡해요. 서버는 톰캣이고 Down2Excel.jsp 그대로 쓰고 있어요. 어디를 고쳐야 하나요?
