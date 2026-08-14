# InputText 요소 ***(Data Structure)***

> 엑셀 영역에 표시할 글자를 설정 합니다.<br>
> 이 요소는 부모인 `<Range>` 요소에서 선택한 엑셀의 셀 영역에 글자를 표시 합니다.<br>
> `주의` 표시하는 글자 중에 특수문자(`&`, `<`, `>`, `'`, `"`)가 있는 경우 변환문자로 변환하거나 CDATA Section을 사용 합니다.<br>
> 줄바꿈 글자를 설정할 때는 `\n` 을 포함하여 설정 합니다.


## Info
***none***


## Example
```xml
<?xml version="1.0" ?>
<Excel>
  <Label>
    <Range Row1="3" Col1="end" Row2="3" Col2="end" RowHeight="15">
      <InputText><![CDATA[단위 [원화:만원]]]></InputText>
    </Range>
  </Label>
</Excel>
```
