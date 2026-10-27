# OnAfterColumnMove ***(event)***

> 사용자가 마우스 드래그를 이용하여 컬럼을 이동하거나 `MoveColumnPos` 함수를 이용하여 컬럼을 이동하고<br>
> 이동이 성공적으로 완료되었을 때 발생하는 이벤트입니다.


### Syntax
```javascript
function 오브젝트ID_OnAfterColumnMove(Col, NewPos) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Col|`Long`|이동한 컬럼의 Index|
|NewPos|`Long`|이동된 위치의 컬럼 Index|



### Example
```javascript
//컬럼이 이동된 후 이벤트가 발생
function mySheet_OnAfterColumnMove(Col, NewPos) {
    alert(Col + " 위치가 " + NewPos + " 위치로 이동되었습니다..");
}
```

### See also
  * [OnBeforeColumnMove event](/docs/funcs/event/OnBeforeColumnMove)
  * [MoveColumnPos](/docs/funcs/col/MoveColumnPos)
  * [MoveColumnFail](/docs/funcs/col/MoveColumnFail)

### Since

|version|desc|
|---|---|
|7.0.0.0||