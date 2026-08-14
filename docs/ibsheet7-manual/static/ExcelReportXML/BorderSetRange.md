# Range 요소 (BorderSet 요소의 하위) ***(Data Structure)***

> 테두리를 설정할 엑셀의 영역을 의미 합니다.<br>
> `Row1`, `Row2` 는 엑셀의 행번호를 의미하며 엑셀은 행을 1부터 시작하므로 시트의 시작 행과 동일하게 처리하면 안 됩니다. 마지막 행번호를 사용할 경우 `End` 라는 글자로 설정할 수 있습니다.<br>
> `Col1`, `Col2` 도 동일하게 1컬럼부터 시작하며, 마지막 컬럼을 사용할 경우 `End` 라는 글자로 설정할 수 있습니다.<br>
> 설정할 엑셀의 영역이 1개인 경우 `Row1` 과 `Col1` 속성만 사용하고, `Row2` 와 `Col2` 속성은 제외하고 사용할 수 있습니다.


## Info

**속성**

|Name|Description|
|---|--------|
|Row1|엑셀 영역의 시작 행번호 또는 `End`|
|Col1|엑셀 영역의 시작 컬럼번호 또는 `End`|
|Row2|엑셀 영역의 마지막 행번호 또는 `End`|
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
  <BorderSet>
    <Range Row1="11" Col1="1" Row2="13" Col2="End">
      <BorderStyle>
        <TopEdge Style="Double" Weight="thick"/>
        <BottomEdge Style="Double" Weight="thick" Color="0,0,250"/>
        <LeftEdge Style="Double" Weight="thick" Color="0,0,250"/>
        <RightEdge Style="Double" Weight="thick" Color="0,0,250"/>
      </BorderStyle>
      <CellFormat>
        <Alignment Horizontal="Center" Vertical="Center"/>
        <Interior Pattern="test" PatternColor="255,255,255"/>
        <Font Name="굴림" Bold="True" Italic="True" Size="8"/>
      </CellFormat>
    </Range>
  </BorderSet>
</Excel>
```
