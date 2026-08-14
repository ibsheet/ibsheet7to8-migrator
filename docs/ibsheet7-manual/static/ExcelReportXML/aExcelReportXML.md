# 엑셀리포트 XML

### 엑셀 다운로드 함수([Down2Excel](/docs/funcs/export/Down2Excel), [DirectDown2Excel](/docs/funcs/export/DirectDown2Excel))를 통해 엑셀로 내릴 때, 엑셀의 용지나 머리글/바닥글과 같은 속성을 설정하는 XML 입니다.

## 전체 구조

```xml
<?xml version='1.0' ?>
<Excel>
  <!-- IBSheetSet 요소 -->
  <IBSheetSet>
    <StartRow>6</StartRow>
    <ViewCols>1|2|3|4</ViewCols>
    <Data>조회한 데이터</Data>
  </IBSheetSet>

  <!-- PageSet 요소 -->
  <PageSet>
    <PaperSize>A4</PaperSize>
    <Orientation>Portrait</Orientation>
    <CenterOnPage Horizontal="True" Vertical="False"/>
    <RowsRepeat Row1="1" Row2="1" />
    <ColsRepeat Col1="1" Col2="1" />
    <DefaultRowHeight>18</DefaultRowHeight>
    <!-- (중략) -->
  </PageSet>

  <!-- ColumnWidth 요소 -->
  <ColumnWidth Col1="1" Col2="End">20</ColumnWidth>

  <!-- RowHeight 요소 -->
  <RowHeight Row1="5" Row2="6">30</RowHeight>

  <!-- CustomHeader 요소 -->
  <CustomHeader>
    <LeftSection><!-- (중략) --></LeftSection>
    <CenterSection><!-- (중략) --></CenterSection>
    <RightSection><!-- (중략) --></RightSection>
  </CustomHeader>

  <!-- CustomFooter 요소 -->
  <CustomFooter>
    <LeftSection><!-- (중략) --></LeftSection>
    <CenterSection><!-- (중략) --></CenterSection>
    <RightSection><!-- (중략) --></RightSection>
  </CustomFooter>

  <!-- Label 요소 -->
  <Label>
    <Range Row1="5" Col1="1" Row2="4" Col2="10"><!-- (중략) --></Range>
  </Label>

  <!-- DataPattern 요소 -->
  <DataPattern>
    <Standard SheetCol="0" Word="소계*">
      <Range Row1="5" Col1="1" Row2="4" Col2="10"><!-- (중략) --></Range>
    </Standard>
  </DataPattern>

  <!-- BorderSet 요소 -->
  <BorderSet>
    <Range Row1="5" Col1="1" Row2="4" Col2="10"><!-- (중략) --></Range>
  </BorderSet>
</Excel>
```

## 사용하는 XML 요소

|요소명|설명|
|---|---|
|[IBSheetSet 요소](/docs/static/ExcelReportXML/IBSheetSet)|엑셀에 내릴 IBSheet 부분을 설정<br>이 부분은 필수이고, 반드시 맨 처음 설정해야 함|
|[PageSet 요소](/docs/static/ExcelReportXML/PageSet)|엑셀의 페이지 설정|
|[ColumnWidth 요소](/docs/static/ExcelReportXML/ColumnWidth)|엑셀의 컬럼 너비 설정|
|[RowHeight 요소](/docs/static/ExcelReportXML/RowHeight)|엑셀의 행의 높이 설정|
|[CustomHeader 요소](/docs/static/ExcelReportXML/CustomHeader)|엑셀의 용지 설정의 머리글 설정|
|[CustomFooter 요소](/docs/static/ExcelReportXML/CustomFooter)|엑셀의 용지 설정의 바닥글 설정|
|[Label 요소](/docs/static/ExcelReportXML/Label)|엑셀의 셀에 표시할 문자열 설정|
|[DataPattern 요소](/docs/static/ExcelReportXML/DataPattern)|엑셀에서 기준 글자를 찾아 일정한 패턴을 설정|
|[BorderSet 요소](/docs/static/ExcelReportXML/BorderSet)|엑셀의 영역별 테두리 설정|
