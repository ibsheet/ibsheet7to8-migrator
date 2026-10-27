# 조회 DATA 요소 ***(Data Structure)***

> 조회된 데이터 영역을 의미하는 요소로 일반적으로 `<SHEET>` 요소 안에 사용하여 이 요소 안의 데이터를 조회된 데이터로 표현합니다.<br>
> 이 요소 안에 사용되는 `<TR>` 요소는 조회된 각 행의 데이터를 의미하며, 하나도 사용되지 않은 경우 조회된 데이터가 없는 것으로 처리됩니다.



## Info

|Name|Description|
|---|--------|
|TOTAL|조회 할 전체 건수<br>`실시간 서버 페이징 조회시 이 속성을 반드시 설정해야 합니다.`|
|COLORDER|컬럼 순서를 SaveName 과 `|`를 연결한 문자열|
|COLSEPARATOR|컬럼을 구분하는 문자열|



## Example
```xml
<!-- 전체건수가 1000건이고, 조회건수가 100건인경우 -->
<?xml version="1.0" ?>
<SHEET>
  <DATA TOTAL="1000">
    <TR>(조회된 데이터 중략)</TR>
  </DATA>
</SHEET>

<!-- COLORDER 사용 조회 -->
<?xml version="1.0" ?>
<SHEET>
  <DATA COLORDER=" amt | prod_nm | count ">
    <TR>(조회된 데이터 중략)</TR>
  </DATA>
</SHEET>

<!-- COLSEPARATOR 사용 조회 -->
<?xml version="1.0" ?>
<SHEET>
  <DATA COLSEPARATOR="|">
    <TR> |001|10000|아이비리더스|1</TR>
    <TR> |001|10000|아이비리더스|1</TR>
  </DATA>
</SHEET>

```