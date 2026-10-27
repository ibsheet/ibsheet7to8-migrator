# OnUserResize ***(event)***

> End-User가 마우스를 이용하여 상단 헤더의 컬럼 너비를 변경할때 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_OnUserResize(Col, Width) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Col|`Long`|해당 Column Index|
|Width|`Long`|해당 컬럼 너비|



### Example
```javascript
function mySheet_OnUserResize(Col, Width) {
   alert(Col + "컬럼의 너비가 " + Width + "로 변경되었습니다".)
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||