# Down2ExcelBuffer ***(export method)***

> 여러 개의 시트로부터 1개의 엑셀 문서로 다운로드 받습니다.<br>
> `isBuffer`인자를 true로 설정하면 이후로 실행되는 Down2Excel은 실제로 동작하지 않으며, 내부메모리에 버퍼링 됩니다. <br>
> 이후에 isBuffer인자를 false로 설정하는 순간 버퍼링된 모든 시트들이 하나의 엑셀 파일안에 다운로드 됩니다.<br>
> 엑셀 파일명칭은 최초에 설정된 파일명 및 엑셀 파일 포맷이 유효하며, 워크시트명이 고유하지 않고 중복될 경우 자동적으로 괄호가 부여되어 다운로드 됩니다.
### Syntax
```javascript
ObjId.Down2ExcelBuffer(IsBuffer);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|IsBuffer|`Boolean`|<span class="required">필수</span>|버퍼링 여부|



### Returns
***none***

### Example
```javascript
// 이후로는 버퍼링한다. 아무 동작 안함.
firstSheet.Down2ExcelBuffer(true);

// 첫번째 워크시트에 담아두기를 예약함.
firstSheet.Down2Excel({FileName:"excel2",SheetName:"sheet1"});

// 두번째 워크시트에 담아두기를 예약함.
secondSheet.Down2Excel({FileName:"excel2",SheetName:"sheet2"});

// 버퍼링된 모든 엑셀 자료를 1개의 엑셀문서에 모두 모아서 즉시 다운로드 한다.
firstSheet.Down2ExcelBuffer(false);

/*
DirectDown2Excel로 여러개의 시트를 다운로드 하는 경우
  1. Down2ExcelBuffer를 true로 설정
  2. DirectDown2Excel 호출시 URL 인자를 모두 동일 페이지로 설정
  3. 데이터 처리 jsp 페이지에서 호출한 순서에 맞게 "SHEETDATA" 생성
     처음 호출한 시트는 "SHEETDATA"로 설정, 이후 호출한 시트는 일련번호를 붙여서 "SHEETDATA1", "SHEETDATA2" 순으로 설정
  4. Down2ExcelBuffer를 false로 설정
*/
// 시트에서 Down2ExcelBuffer 통해 DirectDown2Excel 호출
firstSheet.Down2ExcelBuffer(true);
firstSheet.DirectDown2Excel({URL:"../jsp/fp.jsp",FileName:"IBLeaders.xls"});
secondSheet.DirectDown2Excel({URL:"../jsp/fp.jsp",FileName:"IBLeaders.xls", SheetDesign:1});
firstSheet.Down2ExcelBuffer(false);

// 데이터 생성 페이지(fp.jsp)
request.setAttribute("SHEETDATA", li);
request.setAttribute("SHEETDATA1", li2);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||