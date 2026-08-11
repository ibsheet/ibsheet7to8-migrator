# Range 요소 (DataPattern 요소의 하위) ***(Data Structure)***

> 데이터 패턴을 설정할 엑셀의 영역을 의미 합니다.<br>
> `Col1`, `Col2` 는 엑셀의 컬럼번호를 의미하며 엑셀은 컬럼을 1부터 시작하므로 시트의 시작 컬럼과 동일하게 처리하면 안 됩니다. 마지막 컬럼번호를 사용할 경우 `End` 라는 글자로 설정할 수 있습니다.<br>
> `RowHeight` 속성은 영역의 행높이를 픽셀로 설정하며, 설정하지 않을 경우 [`<PageSet>` > `<DefaultRowHeight>`](/docs/static/ExcelReportXML/PageSet) 에서 설정한 기본 행 높이가 사용 됩니다.


## Info

**속성**

|Name|Description|
|---|--------|
|Col1|엑셀 영역의 시작 컬럼번호 또는 `End`|
|Col2|엑셀 영역의 마지막 컬럼번호 또는 `End`|
|RowHeight|엑셀 영역의 행높이, 픽셀단위|

**하위요소**

|Name|Description|
|---|--------|
|`<CellFormat>`|엑셀 영역의 머지, 정렬, 색상이나 글꼴 등을 설정하는 요소|
|`<BorderStyle>`|엑셀 영역에서 테두리를 설정하는 요소|

각 요소의 상세 설명은 [Range 요소 (Label 하위)](/docs/static/ExcelReportXML/LabelRange)의 하위 요소 설명을 참고 하세요.


## Example
```xml
<?xml version="1.0" ?>
<Excel>
  <DataPattern>
    <Standard SheetCol="0" Word="소계*">
      <Range Col1="1" Col2="End" RowHeight="25">
        <CellFormat>
          <Merge>False</Merge>
          <Alignment Horizontal="Center" Vertical="Center"/>
          <Interior BackColor="0,255,0" />
          <Font Name="굴림" Size="12" Bold="True" Italic="True"/>
        </CellFormat>
        <BorderStyle>
          <TopEdge Style="Dash" Weight="Medium" Color="255,0,0"/>
          <BottomEdge Style="Dash" Weight="Medium" Color="0,0,0"/>
          <LeftEdge Style="Continuous" Weight="Hairline" Color="0,0,255"/>
          <RightEdge Style="Continuous" Weight="Hairline" Color="0,0,0"/>
        </BorderStyle>
      </Range>
    </Standard>
  </DataPattern>
</Excel>
```
