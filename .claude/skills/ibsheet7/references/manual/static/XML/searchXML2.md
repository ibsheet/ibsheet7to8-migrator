# 저장 XML ***(Data Structure)***

> 저장 함수를 통해 읽어들이는 XML 전체 구조는 다음과 같습니다.



## Info

|Name|Required|Description|
|---|----|--------|
|SHEET|<span class="required">필수</span>|저장 데이터의 최상위 요소|
|RESULT|<span class="required">필수</span>|저장 데이터의 결과 요소|
|ETC-DATA|<span class="optional">선택</span>|기타 데이터 설정 요소|

## Example
```xml
<!--전체 처리 결과를 가져오는 경우 -->
<?xml version='1.0' ?>
<SHEET>
  <!--선택항목. ETC-DATA 요소 -->
  <ETC-DATA>
    <ETC KEY="key_name">key_value</ETC>
  </ETC-DATA>
  <!--필수항목. RESULT 요소 -->
  <RESULT CODE="0"
    MESSAGE="완료 후 메시지">
  </RESULT>
</SHEET>

<!--각 행단위 트랜잭션 결과의 경우 -->
<?xml version='1.0' ?>
<SHEET>
  <!--선택항목. ETC-DATA 요소 -->
  <ETC-DATA>
    <ETC KEY="key_name">key_value</ETC>
  </ETC-DATA>
  <!--필수항목. RESULT 요소 -->
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