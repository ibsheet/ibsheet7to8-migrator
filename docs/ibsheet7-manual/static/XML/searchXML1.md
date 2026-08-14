# 조회 XML ***(Data Structure)***

> 조회 함수를 통해 읽어들이는 XML 전체 구조는 다음과 같습니다.


## Info

|Name|Required|Description|
|---|----|--------|
|SHEET|<span class="required">필수</span>|조회 데이터의 최상위 요소|
|DATA|<span class="required">필수</span>|조회 데이터의 시작 요소|
|TR|<span class="required">필수</span>|조회 데이터의 각 행 단위 설정 요소|
|TD|<span class="required">필수</span>|조회 데이터의 셀 단위 설정 요소|
|ETC-DATA|<span class="optional">선택</span>|기타 데이터 설정 요소|
|MESSAGE|<span class="optional">선택</span>|서버 메시지 설정 요소|
|RESULT|<span class="optional">선택</span>|서버 처리 결과 설정 요소|

## Example

```xml
<?xml version='1.0' ?>
<SHEET>
  <!-- 선택항목. ETC-DATA 요소 -->
  <ETC-DATA>
    <ETC KEY="key_name">key_value</ETC>
  </ETC-DATA>
  <!-- 선택항목. Message 요소 -->
  <MESSAGE>메시지</MESSAGE>
  <!-- 필수항목. DATA 요소 -->
  <DATA TOTAL="50"
    COLORDER="prod_nm|pay|enter_date|book_chk"
    COLSEPARATOR="구분자">
  <!-- 필수항목. TR 요소 : 행단위 설정 -->
    <TR LEVEL="" HAVECHILD="">
  <!-- 필수항목. TD 요소 : 데이터단위 설정 -->
      <TD> 조회된 데이터 </TD>
    </TR>
  </DATA>
  <!-- 필수항목. Result 요소 -->
  <RESULT CODE="" MESSAGE=""></RESULT>
</SHEET>
```
