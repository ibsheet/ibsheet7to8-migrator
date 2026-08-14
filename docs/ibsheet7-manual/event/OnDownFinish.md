# OnDownFinish ***(event)***

> 엑셀 및 텍스트 파일이 다운로드 완료 되었을때 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_OnDownFinish(downloadType, result){}
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|downloadType|`String`|엑셀/텍스트 종류. "EXCEL", "TEXT"|
|result|`Boolean`|다운로드 오류 여부. 성공 : true, 실패 : false|



### Example
```javascript
function mySheet_OnDownFinish(downloadType, result) {
  alert(downloadType + "다운이 완료되었습니다. 다운로드 결과 :" + result);
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||