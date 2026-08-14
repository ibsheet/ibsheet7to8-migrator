# 조회 SHEET 요소 ***(Data Structure)***

> 조회된 데이터의 최상위를 의미 합니다.<br>
> 이 요소는 조회 XML의 최 상위 요소로 XML 기본 정의 아래 반드시 하나만 사용해야 합니다. 이 요소 안에 사용되는 `<DATA>` 요소는 조회된 데이터를 의미하며 단 하나만 사용해야 합니다.<br>
> `<ETC-DATA>` 요소는 조회된 데이터 이외의 기타 데이터를 가져오는 요소로 여러 개 사용할 수 있습니다.


## Info
***none***


## Example
```xml
<!-- 조회된 내역이 없는 경우 -->
<?xml version="1.0" ?>
<SHEET>
  <DATA>
  </DATA>
</SHEET>

<!—일반 조회의 경우 -->
<?xml version="1.0" ?>
<SHEET>
  <DATA>
    <TR>
      <TD>R</TD>
      <TD>1234</TD>
      <TD>가나다라</TD>
    </TR>
  </DATA>
</SHEET>
```