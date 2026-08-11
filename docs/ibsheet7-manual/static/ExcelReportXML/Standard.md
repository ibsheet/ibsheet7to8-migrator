# Standard 요소 ***(Data Structure)***

> 패턴을 설정하는 기준 글자의 기준을 설정 합니다.<br>
> 시트에서 내려진 데이터에 일정한 패턴을 설정할 때, 이 요소가 기준이 되는 정보를 설정 합니다.<br>
> `SheetCol` 속성은 엑셀에 내려지는 시트 데이터 중 기준을 설정할 컬럼 번호나 SaveName을 설정 합니다.<br>
> `Word` 속성은 `SheetCol` 속성에 설정된 컬럼에서 찾을 글자로, `*` 을 이용하여 문자열을 like 비교할 수 있습니다.


## Info

**속성**

|Name|Description|
|---|--------|
|SheetCol|시트에서 내려지는 데이터 컬럼 Index 또는 SaveName|
|Word|찾을 문자열, 찾을 글자 앞뒤로 `*` 사용 가능|

**하위요소**

|Name|Description|
|---|--------|
|`<Range>`|패턴을 설정할 엑셀 영역|


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
      </Range>
    </Standard>
  </DataPattern>
</Excel>
```
