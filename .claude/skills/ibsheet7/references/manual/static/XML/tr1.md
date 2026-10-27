# 조회 TR 요소 ***(Data Structure)***

> 조회된 데이터의 각 행 단위 데이터를 의미 합니다. <br>
> 이 요소는 `<DATA>` 요소 하위에 사용되며 조회된 행의 개수만큼 반복 사용합니다.<br>
> `<DATA>` 요소 안에 이 요소가 없는 경우 조회된 데이터가 없는 것으로 처리됩니다.




## Info

|Name|Type|Description|
|---|----|--------|
|BackColor|`String`|해당 행의 배경색상|
|Drag|`Boolean`|해당 행의 Drag 허용 여부 (Default: 1)|
|Edit|`Boolean`|해당 행의 Edit 허용 여부|
|Expand|`Boolean`|해당 행의 자식 레벨 데이터를 펼칠것인지 여부|
|FontColor|`String`|해당 행의 폰트색상|
|HaveChild|`Boolean`|트리형태일때 해당행의 Child 데이터가 있으면서 조회하지 않는경우 사용, 나중에 OnTreeChild Event가 발생할 수 있는 행 설정|
|Hidden|`Boolean`|해당 행의 숨김 여부|
|Level|`Number`|해당 행의 트리 레벨|
|Merge|`Boolean`|해당 행의 RowMerge 허용 여부|
|Sum|`Boolean`|해당 행의 합계 계산 포함 여부|
|TreeCheck|`Boolean`|트리 컬럼의 체크박스 값|



## Example
```xml
<!-- 트리 형태의 데이터 조회하기 1-->
  <?xml version="1.0" ?>
  <SHEET>
    <DATA>
      <TR LEVEL="0">(조회된 데이터 중략)</TR>
      <TR LEVEL="1">(조회된 데이터 중략)</TR>
      <TR LEVEL="2">(조회된 데이터 중략)</TR>
      <TR LEVEL="2">(조회된 데이터 중략)</TR>
      <TR LEVEL="1">(조회된 데이터 중략)</TR>
      <TR LEVEL="2">(조회된 데이터 중략)</TR>
      <TR LEVEL="2">(조회된 데이터 중략)</TR>
      <TR LEVEL="2">(조회된 데이터 중략)</TR>
    </DATA>
</SHEET>

<!-- 트리 형태의 데이터 조회하기 2. Child 데이터 조회하지 않고 나중에 조회하기-->
  <?xml version="1.0" ?>
  <SHEET>
    <DATA>
      <TR LEVEL="0">(조회된 데이터 중략)</TR>
      <TR LEVEL="1" HAVECHILD="1">(조회된 데이터 중략)</TR>
      <TR LEVEL="1" HAVECHILD="1">(조회된 데이터 중략)</TR>
    </DATA>
  </SHEET>
```