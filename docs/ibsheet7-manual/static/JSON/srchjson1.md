# 조회 JSON ***(Data Structure)***

> 조회 함수를 통해 읽어들이는 JSON 전체 구조는 아래와 같습니다.
> `json 생성시 요소명은 대소문자를 정확하게 구분해야 합니다`



## Info

|Name|Required|Description|
|---|----|--------|
|Data|<span class="required">필수</span>|조회 데이터의 시작 요소|
|Total|<span class="optional">선택</span>|전체 데이터 개수 설정 요수|
|Etc|<span class="optional">선택</span>|기타 데이터 설정 요소|
|Message|<span class="optional">선택</span>|서버 메시지 설정 요소|
|Result|<span class="optional">선택</span>|서버 처리 결과 설정 요소|


## Example
```json
{
  // 선택항목. TOTAL 요소
  Total:0,

  // 선택항목. ETC 요소
  Etc {"key_name":"key_value", "key_name2":"key_value2"},

  // 선택항목 MESSAGE 요소
  Message : "메시지",

  // 필수항목. DATA 요소
  Data:[
  // 필수항목. 데이터 단위 설정
    {C1:"데이터1", C2: "데이터2"}
  ],
  // 선택항목 RESULT 요소
  Result : {Code:0, Message:"정상적으로 처리되었습니다."}
}
```