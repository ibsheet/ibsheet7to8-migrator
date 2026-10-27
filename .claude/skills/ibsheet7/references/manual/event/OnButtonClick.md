# OnButtonClick ***(event)***

> `Button` 컬럼 타입의 버튼을 클릭할 때 발생하는 이벤트입니다.<br>
> 해당 셀의 Editable이 false인 경우에는 이벤트가 발생하지 않습니다.



### Syntax
```javascript
function 오브젝트ID_OnButtonClick(Row, Col) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|대상 행의 Index|
|Col|`Long`|대상 컬럼의 Index|



### Example
```javascript
function mySheet_OnButtonClick(Row, Col) {
  console.log("[" + Row + "," + Col + "] 셀의 버튼 클릭");
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.13.9||