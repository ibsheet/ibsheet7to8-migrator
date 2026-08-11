# 저장 TR 요소 ***(Data Structure)***

> 저장 완료된 데이터의 트랜잭션 결과를 의미합니다.<br>
> 이 요소는 RESULT 요소 안에 사용되며, 각 행단위 트랜잭션 결과를 묶어 놓은 요소로 이 요소 안에 사용되는 TD 요소가 각 행단위의 결과를 의미합니다.



## Info
***none***



## Example
```xml
<?xml version='1.0' ?>
<SHEET>
  <RESULT>
    <TR>
      <TD>OK</TD>
      <TD>DUP</TD>
      <TD>MISS</TD>
      <TD>NO</TD>
    </TR>
  </RESULT>
</SHEET>
```