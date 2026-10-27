# IBSheetSet 요소 ***(Data Structure)***

> 엑셀 파일에 설정될 IBSheet 부분을 의미 합니다.<br>
> 하위의 `<StartRow>` 요소는 시트의 데이터를 엑셀로 내릴 때 엑셀의 시작 행 위치를 설정하며, 엑셀은 시트와 달리 첫 행을 1부터 시작 합니다.<br>
> 하위의 `<ViewCols>` 요소는 시트의 컬럼 중 다운받고자 하는 컬럼을 지정해야 하는 경우 컬럼번호를 `|` 문자열로 조합하여 설정 합니다. 생략하면 호출된 함수의 인자 설정에 따라 다운받을 컬럼이 결정 됩니다.<br>
> `참고` [Label 요소](/docs/static/ExcelReportXML/Label)를 사용할 경우 반드시 설정해야 하며, `<Excel>` 요소 바로 아래 최상단에 설정 합니다.


## Info

**하위요소**

|Name|Description|
|---|--------|
|`<StartRow>`|시트의 데이터를 표시할 엑셀의 시작 행 위치|
|`<ViewCols>`|시트에서 내릴 컬럼 번호, 미설정시 함수 인자 설정에 따름|


## Example
```xml
<?xml version="1.0" ?>
<Excel>
  <IBSheetSet>
    <StartRow>6</StartRow>
    <ViewCols>3|5|7</ViewCols>
  </IBSheetSet>
</Excel>
```
