# BorderStyle 요소 ***(Data Structure)***

> 엑셀 영역에 테두리 선을 설정 합니다.<br>
> 이 요소는 `<Range>` 요소 하단에 사용되며, `<Range>` 요소에서 선택된 영역에 테두리를 설정 합니다.<br>
> 하위에 사용되는 `<TopEdge>`, `<BottomEdge>`, `<LeftEdge>`, `<RightEdge>` 등의 요소들은 `Style`, `Weight`, `Color` 속성을 각각 갖습니다.


## Info

**Style 속성**

|Value|Description|
|---|--------|
|None|선없음|
|Continuous|연속선|
|Dash|대쉬|
|DashDot|대쉬+점|
|DashDotDot|대쉬+점+점|
|Dot|점선|
|Double|이중선|
|SlantDashDot|기울어진 대쉬+점|

**Weight 속성**

|Value|Description|
|---|--------|
|Hairline|매우 가는선|
|Thin|가는선|
|Medium|중간 굵은선|
|Thick|굵은선|

`Color` 속성은 원하는 색상을 RGB의 구조로 설정 합니다.


## Example
```xml
<?xml version="1.0" ?>
<Excel>
  <Label>
    <Range Row1="3" Col1="1" Row2="3" Col2="end" RowHeight="15">
      <InputText>표시글자</InputText>
      <BorderStyle>
        <TopEdge Style="Dash" Weight="Medium" Color="255,0,0"/>
        <BottomEdge Style="Dash" Weight="Medium" Color="0,0,0"/>
        <LeftEdge Style="Continuous" Weight="Hairline" Color="0,0,255"/>
        <RightEdge Style="Continuous" Weight="Hairline" Color="0,0,0"/>
      </BorderStyle>
    </Range>
  </Label>
</Excel>
```
