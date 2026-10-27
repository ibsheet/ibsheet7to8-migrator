# BorderSet 요소 ***(Data Structure)***

> 엑셀 워크시트의 셀 테두리를 설정 합니다.<br>
> 이 요소는 하위의 `<Range>` 요소를 이용하여 영역을 선택하고, 그 영역에 테두리와 포맷을 설정 합니다.<br>
> `<Excel>` > [`<Label>`](/docs/static/ExcelReportXML/Label) 요소는 영역에 글자까지 설정할 수 있지만, 이 요소는 글자를 설정할 수 없으며 영역의 테두리 설정을 기본으로 처리 합니다.


## Info

**하위요소**

|Name|Description|
|---|--------|
|`<Range>`|테두리를 설정할 엑셀 영역|


## Example
```xml
<?xml version="1.0" ?>
<Excel>
  <BorderSet>
    <Range Row1="3" Col1="end" Row2="3" Col2="end" RowHeight="15">
      <BorderStyle>
        <TopEdge Style="Double" Weight="thick"/>
        <BottomEdge Style="Double" Weight="thick" Color="0,0,250"/>
        <LeftEdge Style="Double" Weight="thick" Color="0,0,250"/>
        <RightEdge Style="Double" Weight="thick" Color="0,0,250"/>
        <InVertical Style="Double" Weight="thick" Color="0,0,250"/>
        <InHorizontal Style="Double" Weight="thick" Color="0,0,250"/>
      </BorderStyle>
      <CellFormat>
        <Alignment Horizontal="Center" Vertical="Center"/>
        <Interior Pattern="test" PatternColor="255,255,255"/>
        <Font Name="굴림" Bold="True" Italic="True" Size="8" UnderLine="None" Strikethrough="False"/>
      </CellFormat>
    </Range>
  </BorderSet>
</Excel>
```
