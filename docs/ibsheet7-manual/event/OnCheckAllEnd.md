# OnCheckAllEnd ***(event)***

> 체크박스 타입 컬럼이 전체체크가 수행된 후 완료시점에 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_OnCheckAllEnd(Col, Value) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Col|`Integer`|해당 컬럼의 Index|
|Value|`Boolean`|체크여부|



### Example
```javascript
function mySheet_OnCheckAllEnd(Col, Value) {
  alert(Col + "번째 컬럼의 전체체크 수행이 완료되었습니다.");
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||