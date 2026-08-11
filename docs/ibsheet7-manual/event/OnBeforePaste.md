# OnBeforePaste ***(event)***

> 시트에 데이터를 붙여넣기 직전에 발생하는 이벤트입니다. <br>
> 데이터를 붙여넣기 전에 발생하며 필요에 따라 붙여넣기를 취소하거나 붙여넣을 값을 수정 할 수 있습니다. <br>
> `false` 리턴시 붙여넣기는 취소되며, 문자열 리턴시 붙여넣을 텍스트가 대체됩니다.

### Syntax
```javascript
function 오브젝트ID_OnBeforePaste(text) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|text|`String`|시트에 붙여넣을 텍스트|


### Example
```javascript
function mySheet_OnBeforePaste(text) {
  if(text == "not allow text") {
  alert("붙여넣기가 최소됩니다.");
  return false;
 }
}

function mySheet_OnBeforePaste(text) {
  if(text == "not allow text") {
    return "allow text";
  }
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||