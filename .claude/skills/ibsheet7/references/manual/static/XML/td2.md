# 저장 TD 요소 ***(Data Structure)***

> 각 행의 트랜잭션 결과를 의미합니다. <br>
> 이 요소는 TR 요소안에 사용되며 각 행의 트랜잭션 결과를 의미합니다. 따라서 트랜잭션 개수가 3개라면 이 요소도 3번 반복 사용해야 합니다.



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