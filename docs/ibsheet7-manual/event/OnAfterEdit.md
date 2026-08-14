# OnAfterEdit ***(event)***

> 셀의 값을 편집한 직후에 발생하는 이벤트입니다.


### Syntax
```javascript
function 오브젝트ID_OnAfterEdit(Row, Col) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|해당 셀의 Row Index|
|Col|`Long`|해당 셀의 Column Index|



### Example
```javascript
//값을 편집한 직후 이벤트가 발생한다.
function mySheet_OnAfterEdit(Row, Col) {
    alert("입력을 마칩니다.");
}
```

### See also
  * [OnBeforeEdit event](/docs/event/OnBeforeEdit)


### Since

|version|desc|
|---|---|
|7.0.0.0||