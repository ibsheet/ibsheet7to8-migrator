# MoveColumnFail ***(col method)***

> 컬럼 이동 처리에 대한 취소 처리 여부를 설정합니다. <br>
> `참고` [OnBeforeColumnMove](/docs/event/OnBeforeColumnMove) 이벤트 내애서만 설정이 가능 하며, 실패 설정시 컬럼 이동은 처리 되지 않습니다.

### Syntax
```javascript
ObjId.MoveColumnFail(Flag);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Flag|`Boolean`|<span class="required">필수</span>|컬럼 이동 실패 여부|


### Returns
***none***

### Example
```javascript
// Index가 0인 컬럼을 Index가 3 이후의 위치로 이동시 취소 처리
function mySheet_OnBeforeColumnMove(col, newPos) {
  if (col == 0 && newPos > 3) {
    mySheet.MoveColumnFail(1);
  }
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||