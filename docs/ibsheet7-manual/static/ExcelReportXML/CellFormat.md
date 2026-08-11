# CellFormat 요소 ***(Data Structure)***

> 엑셀 영역의 머지나 정렬, 색상, 글꼴 등을 설정 합니다.<br>
> 이 요소는 부모인 `<Range>` 요소에서 선택한 엑셀의 셀 영역에 대한 각종 속성을 설정 합니다.


## Info

**하위요소**

|Name|Description|
|---|--------|
|`<Merge>`|엑셀의 셀 영역을 머지할지 여부 설정<br>`TRUE` 또는 `FALSE` 로 설정 (Default: `FALSE`)|
|`<Alignment>`|엑셀의 셀 영역의 정렬 설정<br>`Horizontal` : `Left`, `Center`, `Right`<br>`Vertical` : `Top`, `Center`, `Bottom`|
|`<Interior>`|엑셀의 셀 영역의 배경 색 및 패턴 설정 (엑셀 셀서식의 `무늬` 설정과 동일)|
|`<Font>`|엑셀의 셀 영역의 글꼴 설정<br>`Name` : 글꼴, `Bold` : 굵기, `Italic` : 기울임 여부, `size` : 글자 크기, `UnderLine` : 밑줄 (`None \| Single \| Double`)|

**Interior 속성**

|Name|Description|
|---|--------|
|BackColor|영역의 배경색을 설정|
|PatternColor|영역의 패턴색을 설정|
|Pattern|영역의 패턴을 설정<br>`xlSolid`, `xlGray75`, `xlGray50`, `xlGray25`, `xlGray16`, `xlGray8`, `xlHorizontal`, `xlVertical`, `xlDown`, `xlUp`, `xlChecker`, `xlSemiGray75`, `xlLightHorizontal`, `xlLightVertical`, `xlLightDown`, `xlLightUp`, `xlGrid`, `xlCrissCross`|


## Example
```xml
<?xml version="1.0" ?>
<Excel>
  <Label>
    <Range Row1="3" Col1="end" Row2="3" Col2="end" RowHeight="15">
      <CellFormat>
        <Alignment Horizontal="Right" Vertical="Center"/>
        <Font Name="굴림" Bold="True" Size="9" />
      </CellFormat>
      <InputText><![CDATA[단위 [원화:만원]]]></InputText>
    </Range>
  </Label>
</Excel>
```
