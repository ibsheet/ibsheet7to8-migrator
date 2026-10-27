# !SetDown2HmlUrl ***(export method)***

> Hml 다운로드 기능을 처리할 서버 페이지 경로를 설정 합니다.

### Syntax
```javascript
ObjId.SetDown2HmlUrl(Url);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Url|`String`|<span class="required">필수</span>|설정할 서버 페이지 Url|



### Returns
***none***

### Example
```javascript
// Hml 다운로드 경로를 설정
console.log("setDown2HmlUrl:", mySheet.SetDown2HmlUrl("/jsp/Down2Hml.jsp"));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||