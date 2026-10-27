# LeftSection, CenterSection, RightSection 요소 ***(Data Structure)***

> 엑셀 페이지의 머리글과 바닥글의 각 섹션을 설정 합니다.<br>
> 이 요소들은 머리글 또는 바닥글의 각 영역에 표시할 글자나 이미지를 설정 합니다.


## Info

**하위요소**

|Name|Description|
|---|--------|
|`<Font>`|해당 영역의 글꼴 설정<br>`Name` : 글꼴, `Bold` : 굵기, `Italic` : 기울임 여부, `size` : 글자 크기, `UnderLine` : 밑줄 (`None \| Single \| Double`)|
|`<InputText>`|해당 영역에 표시할 글자 설정<br>PCDATA 영역에 표시하고자 하는 글자를 아래 예약어와 함께 사용 가능|

**InputText 예약어**

|Name|Description|
|---|--------|
|&P|페이지번호|
|&N|전체페이지수|
|&D|날짜|
|&T|시간|
|&F|파일명|
|&A|워크시트명|
|문자열|표시문자열|


## Example
```xml
<?xml version="1.0" ?>
<Excel>
  <!--머리글 설정하기-->
  <CustomHeader>
    <LeftSection>
      <font Name="돋움체" Size="12"/>
      <InputText><![CDATA[&D]]></InputText>
    </LeftSection>
    <RightSection>
      <font Name="돋움체" Size="12"/>
      <InputText><![CDATA[IBSheet 엑셀 리포트]]></InputText>
    </RightSection>
  </CustomHeader>
</Excel>
```
