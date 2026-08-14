# 조회 ETC 요소 ***(Data Structure)***

> 조회 또는 저장 데이터 이외의 여분의 기타 데이터를 의미 합니다. <br>
> 이 요소의 Value 값은 Key:Value 형태의 반복으로 구성되며 IB Sheet 내의 데이터 이외의 데이터를 가져와 다른 용도로 사용하는 경우에 설정하여 사용합니다.<br>
> 이 요소를 통해 가져온 데이터는 `EtcData` Method를 통해 확인 할 수 있고 다른 값으로도 변경이 가능 합니다.



## Info
***none***

## Example
```json
// 조회 시 사용하기
{
  Etc: {"name":"홍길동", "age":"30"},
  Data:[
    (조회된 데이터 중략)
  ]
}

// 저장 시 사용하기
{
  Etc: {"name":"홍길동", "age":"30"},
  Result : {Code:0, Message:"결과 메시지."}
}
```