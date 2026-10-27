# 저장 RESULT 요소 ***(Data Structure)***

> 저장 데이터의 결과를 의미 합니다. <br>
> 이 요소의 Value  값은 Key:Value 형태로 Key 값으로는 Code, Message, Result 를 설정 할 수 있습니다.



## Info
***none***

## Example
```json
// 전체데이터 처리 결과 : 저장 성공의 경우
{
  Result:{ Code:0, Message: "정상적으로 처리되었습니다." }
}

// 전제데이터 처리 결과 : 저장 실패의 경우
{
  Result:{ Code:-1, Message: "저장에 실패하였습니다." }
}

// 각 행단위 트랜잭션 처리 결과의 경우
{
  Result:{ Result: "OK|DUP|MISS|NO" }
}
```