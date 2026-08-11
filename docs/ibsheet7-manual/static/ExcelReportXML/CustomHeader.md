# CustomHeader 요소 ***(Data Structure)***

> 엑셀의 페이지 설정의 머리글을 설정 합니다.<br>
> 엑셀 메뉴의 `파일 > 페이지설정` 중 `머리글/바닥글` 설정 탭의 머리글 부분을 설정하는 요소 입니다.


## Info

**하위요소**

|Name|Description|
|---|--------|
|`<LeftSection>`|왼쪽 구역 설정|
|`<CenterSection>`|가운데 구역 설정|
|`<RightSection>`|오른쪽 구역 설정|

각 구역의 상세 설명은 [LeftSection, CenterSection, RightSection 요소](/docs/static/ExcelReportXML/Section)를 참고 하세요.


## Example
```xml
<?xml version="1.0" ?>
<Excel>
  <!--머리글 설정하기-->
  <CustomHeader>
    <LeftSection>
      <font Name="돋움체" Size="12"/>
      <InputText><![CDATA[IB Leaders]]></InputText>
    </LeftSection>
    <RightSection>
      <font Name="돋움체" Size="12"/>
      <InputText><![CDATA[IBSheet 엑셀 리포트]]></InputText>
    </RightSection>
  </CustomHeader>
</Excel>
```
