# SetDown2PdfUrl ***(export method)***

> PDF 다운로드 기능을 처리할 서버 페이지 경로를 설정 합니다.

### Syntax
```javascript
ObjId.SetDown2PdfUrl(Url);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Url|`String`|<span class="required">필수</span>|설정할 서버 페이지 Url|



### Returns
***none***

### Example
```javascript
// PDF 다운로드 경로를 설정
mySheet.SetDown2PdfUrl("/jsp/Down2Pdf.jsp");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||