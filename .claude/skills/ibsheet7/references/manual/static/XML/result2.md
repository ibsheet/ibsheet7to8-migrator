# 저장 RESULT 요소 ***(Data Structure)***

> 저장 데이터의 결과를 의미합니다.



## Info

|Name|Description|
|---|--------|
|CODE|처리 결과 코드|
|MESSAGE|처리 결과 메시지|

## Example
```xml
<!--저장 성공의 경우 -->
<?xml version="1.0" ?>
<SHEET>
  <RESULT CODE="0" MESSAGE="정상적으로 처리되었습니다.">
</SHEET>

<!--저장 실패의 경우 -->
<?xml version="1.0" ?>
<SHEET>
  <RESULT CODE="-1" MESSAGE="저장에 실패하였습니다.">
</SHEET>
```