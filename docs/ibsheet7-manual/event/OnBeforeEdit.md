# OnBeforeEdit ***(event)***

> 셀의 값을 편집하기 직전에 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_OnBeforeEdit(Row, Col) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|해당 셀의 Row Index|
|Col|`Long`|해당 셀의 Column Index|



### Example
```javascript
//셀의 값을 편집하기 직전에 이벤트가 발생
function mySheet_OnBeforeEdit(Row, Col) {
  alert("입력을 시작합니다.");
  
  // col의 saveName이 sTitle 인 경우에는 편집모드로 진입하지 않도록 처리
  if (mySheet.ColSaveName(Col) == "sTitle") return true;
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.262|편집모드로 진입하지 않도록 return true 추가|