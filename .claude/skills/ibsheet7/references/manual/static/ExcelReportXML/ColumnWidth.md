# ColumnWidth 요소 ***(Data Structure)***

> 엑셀의 각 컬럼에 너비를 설정 합니다.<br>
> 1개 컬럼의 너비 뿐만 아니라 여러 개 컬럼의 너비를 영역으로 설정할 수 있습니다. `Col1` 속성은 영역으로 컬럼 너비를 설정할 때 시작 컬럼의 번호이고, `Col2` 속성은 마지막 컬럼의 번호 입니다.<br>
> 컬럼의 너비를 `-1` 로 설정할 경우 엑셀이 모두 내려진 후 해당 컬럼의 가장 넓은 글자의 너비에 맞춰 자동으로 조정 되며, 일반적으로는 엑셀에서 설정하는 컬럼 너비를 숫자로 설정 합니다.


## Info

**속성**

|Name|Description|
|---|--------|
|Col1|엑셀의 시작 컬럼 번호 (엑셀은 1부터 시작)|
|Col2|엑셀의 마지막 컬럼 번호, 마지막은 `End` 로 설정 가능|


## Example
```xml
<?xml version="1.0" ?>
<Excel>
  <ColumnWidth Col1="1" Col2="End">-1</ColumnWidth>
  <ColumnWidth Col1="8">10</ColumnWidth>
</Excel>
```
