# 저장 MESSAGE 요소 ***(Data Structure)***

> 서버로부터 저장 처리 중 발생하는 메시지를 처리하기 위한 요소 입니다.<br>
> 이 요소가 설정된 경우 조회 완료 후 발생하는 `OnSearchEnd` 이벤트에서 message 인자에 값이 설정되어 이벤트가 발생합니다.



## Info
***none***

## Example
```json
// 저장시 시 사용하기
{
  Message: "저장이 완료되었습니다.",
  Data:[
    (저장 데이터 중략)
  ]
}
```