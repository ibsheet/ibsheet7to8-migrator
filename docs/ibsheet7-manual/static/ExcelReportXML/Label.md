# Label 요소 ***(Data Structure)***

> 엑셀의 셀에 원하는 글자를 설정 합니다.<br>
> 시트에서 자동으로 내리는 데이터는 `<Excel>` > [`<IBSheetSet>`](/docs/static/ExcelReportXML/IBSheetSet) 요소에 의해 처리되지만, 그 외 엑셀의 특정 영역(Range)에 글자를 쓰기 위해서는 이 요소를 사용 합니다.


## Info

**하위요소**

|Name|Description|
|---|--------|
|`<Range>`|Label을 설정하는 엑셀의 셀 영역에 대한 요소|


## Example
```xml
<Label>
  <Range Row1="1" Col1="1" Row2="1" Col2="End" RowHeight="40">
    <CellFormat>
      <Merge>true</Merge>
      <Alignment Horizontal="Center" Vertical="Center"/>
      <Interior BackColor="255,255,133" Pattern="xlGray50" PatternColor="192,192,192"/>
      <Font Name="굴림" Bold="True" Size="15" />
    </CellFormat>
    <InputText><![CDATA[모델별 용량 금액 리스트]]></InputText>
    <BorderStyle>
      <TopEdge Style="Continuous" Weight="Medium"/>
      <BottomEdge Style="Continuous" Weight="Medium"/>
    </BorderStyle>
  </Range>
</Label>
```
