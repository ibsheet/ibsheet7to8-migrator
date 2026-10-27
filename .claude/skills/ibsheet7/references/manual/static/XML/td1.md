# 조회 TD 요소 ***(Data Structure)***

> 해당 행의 각 컬럼별 조회 데이터를 의미 합니다.<br>
> 이 요소는 `<TR>` 요소 안에 사용되며 해당 행의 컬럼개수 만큼 반복 사용합니다.



## Info

|Name|Description|
|---|--------|
|Align|정렬 설정|
|BackColor|해당 셀의 배경색상|
|ComboCode|콤보타입일경우 해당셀의 콤보 코드값을 설정|
|ComboText|콤보타입일경우 해당셀의 콤보 텍스트값을 설정|
|Edit|해당 셀의 Edit 허용 여부|
|FontBold|Bold 설정 여부|
|FontColor|해당 셀의 폰트색상|
|FontItalic|기울이기 설정 여부|
|FontStrike|취소선 설정 여부|
|FontUnderline|밑줄 설정 여부|
|Image|해당 셀의 이미지 경로 (ImageList 인덱스 사용가능)|
|ToolTip|표시할 풍선도움말 문자열|


## Example
```xml
<!--조회된 내역-->
<?xml version="1.0" ?>
<SHEET>
  <DATA>
    <TR BackColor="#FFFF00" FontColor="#00FF00" EDIT="0">
      <TD BackColor="#FF0000" Edit="0"></TD>
      <TD FontColor="#00FF00" Edit="0"></TD>
      <TD Image="0">006</TD>
      <TD>홍길동</TD>
      <TD>10000</TD>
      <TD></TD>
      <TD>20030201</TD>
      <TD>200302</TD>
      <TD>0201</TD>
      <TD>770101-1234567</TD>
      <TD>123-45-67890</TD>
      <TD>1111-2222-3333-4444</TD>
      <TD>가</TD>
      <TD>abc</TD>
      <TD>150-080</TD>
      <TD>0</TD>
      <TD>180101</TD>
      <TD ComboText="대기|진행|완료" ComboCode="1|2|3">0101</TD>
      <TD></TD>
    </TR>
  </DATA>
</SHEET>
```