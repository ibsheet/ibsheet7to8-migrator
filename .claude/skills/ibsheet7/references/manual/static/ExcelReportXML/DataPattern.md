# DataPattern 요소 ***(Data Structure)***

> 시트에서 내려진 데이터의 기준 글자를 찾아 엑셀 영역에 일정 패턴을 설정 합니다.<br>
> 시트에서 내려지는 데이터는 `<Excel>` > [`<IBSheetSet>`](/docs/static/ExcelReportXML/IBSheetSet) 요소에 의해 엑셀의 x 번째 행부터 내려 집니다. 이렇게 내려진 데이터의 특정 컬럼에 해당하는 데이터가 기준에 맞을 때, 이 요소에서 설정된 일정 패턴을 적용 합니다.


## Info

**하위요소**

|Name|Description|
|---|--------|
|`<Standard>`|패턴을 설정할 데이터의 기준을 설정|


## Example
```xml
<?xml version="1.0" ?>
<Excel>
  <DataPattern>
    <Standard SheetCol="0" Word="소계*">
      <Range Col1="1" Col2="End" RowHeight="25">
        <CellFormat><!-- (중략) --></CellFormat>
        <BorderStyle><!-- (중략) --></BorderStyle>
      </Range>
    </Standard>
  </DataPattern>
</Excel>
```
