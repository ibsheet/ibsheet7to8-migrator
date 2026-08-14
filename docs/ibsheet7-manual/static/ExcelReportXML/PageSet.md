# PageSet 요소 ***(Data Structure)***

> 엑셀 파일의 페이지 설정 부분을 의미 합니다.<br>
> 엑셀 메뉴의 `파일 > 페이지설정` 부분과 거의 흡사하며, 페이지에 대해 설정해야 하는 각종 속성을 설정 합니다.


## Info

**하위요소**

|Name|Description|
|---|--------|
|`<PaperSize>`|엑셀의 용지 크기 설정<br>`A3`, `A4`, `B4`, `B5` 중 하나 (Default: `A4`)|
|`<Orientation>`|엑셀의 용지 방향 설정<br>- `Portrait` : 세로 (Default)<br>- `Landscape` : 가로|
|`<Margins>`|엑셀의 여백 설정<br>요소의 속성으로 여백을 설정하며, 기본은 엑셀의 기본 설정에 따름|
|`<Scaling>`|엑셀의 용지 배율 설정<br>`축소/확대 배율` 사용시와 `자동맞춤` 사용시에 따라 `True`/`False` 로 설정<br>`자동맞춤` 사용시 용지너비/용지높이를 엑셀에서 설정할 수 있는 값으로 설정 (Default: 축소/확대 배율)|
|`<CenterOnPage>`|엑셀 페이지의 가운데에 대한 설정<br>가로 가운데는 `Horizontal` 속성을, 세로 가운데는 `Vertical` 속성을 `true` 로 설정 (Default: 둘 다 `false`)|
|`<RowsRepeat>`|엑셀의 반복 행 설정<br>시작 행은 `Row1`, 마지막 행은 `Row2` 속성에 설정. 1개 행만 반복시 `Row2` 생략 가능 (Default: 반복 행 없음)|
|`<ColsRepeat>`|엑셀의 반복 컬럼 설정<br>시작 컬럼은 `Col1`, 마지막 컬럼은 `Col2` 속성에 설정. 1개 컬럼만 반복시 `Col2` 생략 가능 (Default: 반복 컬럼 없음)|
|`<DefaultRowHeight>`|엑셀 각 행의 기본 높이 설정 (Default: 13.5)|
|`<DefaultFont>`|엑셀의 기본 글꼴 설정<br>`Name` : 글꼴, `Bold` : 굵기, `Italic` : 기울임 여부, `size` : 글자 크기, `UnderLine` : 밑줄 (`None \| Single \| Double`), `Strikethrough` : 취소선 사용 여부, `Superscript` : 위첨자 사용 여부, `Subscript` : 아래첨자 사용 여부, `Color` : 글자 색상|


## Example
```xml
<?xml version="1.0" ?>
<Excel>
  <PageSet>
    <PaperSize>A4</PaperSize>
    <Orientation>Landscape</Orientation>
    <Margins Top="1.5" Header="1.3" Left="1" Right="1" Bottom="1.5" Footer="1.3">True</Margins>
    <Scaling>
      <Adjust Value="100">true</Adjust>
      <Fit Height="1" Width="1">false</Fit>
    </Scaling>
    <RowsRepeat Row1="6" Row2="6">True</RowsRepeat>
    <ColsRepeat Col1="1" Col2="1">False</ColsRepeat>
    <DefaultRowHeight>17</DefaultRowHeight>
    <DefaultFont Name="돋움체" size="9"/>
  </PageSet>
</Excel>
```
