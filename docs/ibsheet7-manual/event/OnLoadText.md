# OnLoadText ***(event)***

> `LoadText` 처리가 완료된 후에 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_OnLoadText(result) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|result|`Boolean`|로드한 결과 (성공 : true, 실패 : false)|


### Example
```javascript
function mySheet_OnLoadText(result) {
  if(result) {
    alert(‘텍스트 파일 로딩이 완료되었습니다.');
  } else {
    alert(‘텍스트 파일 로딩중 오류가 발생하였습니다.');
  }
}
```

### See also
  * [LoadText method](/docs/funcs/import/LoadText)


### Since

|version|desc|
|---|---|
|7.0.0.0||