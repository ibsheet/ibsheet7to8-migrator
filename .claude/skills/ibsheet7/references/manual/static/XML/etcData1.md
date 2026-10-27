# 조회/저장 ETC-DATA 요소 ***(Data Structure)***

> 조회/저장 데이터 이외의 여분의 기타 데이터를 의미 합니다.<br>
> 이 요소는 IB Sheet 내의 데이터 이외의 데이터를 가져와 다른 용도로 사용하는 경우에 설정하여 사용합니다. <br>
> 이 요소를 통해 가져온 데이터는 [GetEtcData](/docs/funcs/core/GetEtcData) Method를 통해 확인 할 수 있고 다른 값으로도 변경이 가능합니다.




## Info

|Name|Description|
|---|--------|
|KEY|대표 키 이름|

## Example
```xml
<!--조회 시 사용하기-->
 <?xml version="1.0" ?>
 <SHEET>
   <ETC-DATA>
     <ETC KEY="name">홍길동</ETC>
     <ETC KEY="age">30</ETC>
   </ETC-DATA>
  <DATA>
    (조회된 데이터 중략)
   </DATA>
</SHEET>

<!--저장 시 사용하기-->
 <?xml version="1.0" ?>
 <SHEET>
   <ETC-DATA>
     <ETC KEY="name">홍길동</ETC>
     <ETC KEY="age">30</ETC>
   </ETC-DATA>
   <RESULT CODE="0" Message="결과 메시지"/>
</SHEET>
```