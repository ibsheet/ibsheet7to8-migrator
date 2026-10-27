# OnLoadFileSelect ***(event)***

> Excel, Text 로드시 파일을 선택할 때 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_OnLoadFileSelect(from, fileName) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|From|`String`|엑셀, 텍스트 구분|
|FileName|`String`|파일경로 및 파일 명|



### Example
```javascript
function mySheet_OnLoadFileSelect(from, fileName) {
  if(from == "Excel") {
    console.log(from + "파일이 선택되었습니다. 경로 : " + filename);
  } else if (from == "TEXT") {
    console.log(from + "파일이 선택되었습니다. 경로 : " + filename);
  }
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||