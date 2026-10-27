# RowHeight 요소 ***(Data Structure)***

> 엑셀의 각 행에 높이를 설정 합니다.<br>
> 1개 행의 높이 뿐만 아니라 여러 개 행의 높이를 영역으로 설정할 수 있습니다. `Row1` 속성은 영역으로 행 높이를 설정할 때 시작 행의 번호이고, `Row2` 속성은 마지막 행의 번호 입니다.


## Info

**속성**

|Name|Description|
|---|--------|
|Row1|엑셀의 시작 행 번호 (엑셀은 1부터 시작)|
|Row2|엑셀의 마지막 행 번호, 마지막은 `End` 로 설정 가능|


## Example
```xml
<?xml version="1.0" ?>
<Excel>
  <RowHeight Row1="2" Row2="5">15</RowHeight>
  <RowHeight Row1="6">5</RowHeight>
</Excel>
```
