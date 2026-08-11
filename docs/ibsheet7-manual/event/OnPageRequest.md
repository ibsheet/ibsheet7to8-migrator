# OnPageRequest ***(event)***

> `서버페이징` 조회시 스크롤이 이동하여 해당 페이지를 새로 로딩하기 위하여 서버에 해당 페이지를 요청할때 발생합니다.


### Syntax
```javascript
function 오브젝트ID_OnPageRequest(page) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|page|`Integer`|요청할 페이지 번호|


### Example
```javascript
function mySheet_OnPageRequest(page) {
  //서버에 해당 페이지를 요청하기 직전에 경고창을 띄운다.
  alert(page + " 페이지를 서버에 요청합니다.");
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||