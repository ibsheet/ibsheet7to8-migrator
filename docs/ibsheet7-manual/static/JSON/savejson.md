# 저장 JSON ***(Data Structure)***

> 저장 함수를 통해 읽어들이는 JSON 전체 구조는 아래와 같습니다.


## Info

|Name|Required|Description|
|---|----|--------|
|RESULT|<span class="required">필수</span>|저장 데이터의 결과 요소|
|ETC-DATA|<span class="optional">선택</span>|기타 데이터 설정 요소|



## Example
```json
{
  // 선택항목. ETC 요소
  Etc: {"key_name":"key_value", "key_name2":"key_value2"},
  // 필수항목. DATA 요소
  Result:{Code: "0", Message: "완료 후 메시지", Result: "행별 트랜잭션 결과"}
}
```