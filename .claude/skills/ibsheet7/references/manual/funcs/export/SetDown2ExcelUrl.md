# SetDown2ExcelUrl ***(export method)***

> 엑셀 다운로드 기능을 처리할 서버 페이지 경로를 설정 합니다.

### Syntax
```javascript
ObjId.SetDown2ExcelUrl(Url);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Url|`String`|<span class="required">필수</span>|설정할 서버 페이지 Url|


### Returns
***none***

### Example
```javascript
// 엑셀 다운로드 경로를 설정
mySheet.SetDown2ExcelUrl("/jsp/Down2Excel.jsp");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||