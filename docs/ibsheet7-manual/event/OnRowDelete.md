# OnRowDelete ***(event)***

> RowDelete 또는 신규행의 DelCheck 타입 클릭 후 행 삭제 시점에 발생하는 이벤트입니다.


### Syntax
```javascript
function 오브젝트ID_OnRowDelete(row, api) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|row|`Long`|대상 행 Index|
|api|`boolean`|메소드(RowDelete) 호출에 의한 삭제 여부|



### Example
```javascript
function mySheet_OnRowDelete(row, api) {
  //행 삭제 시 대상 행 및 메소드호출 여부
  console.log("DeleteRow : " + row + "CallApi : " + api)
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.13.58||