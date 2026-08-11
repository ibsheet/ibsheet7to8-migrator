# OnBeforeMovePage ***(event)***

> `페이지 인덱스 방식`의 조회모드인 경우 페이지 네비게이션 또는 페이지 이동 메소드를 통해 페이지를 이동하는 경우 이동 전에 이벤트가 발생 합니다.<br>
> 해당 이벤트의 반환값을 `false`로 설정한 경우 페이지 이동이 취소 됩니다.



### Syntax
```javascript
function 오브젝트ID_OnBeforeMovePage(Current, Move) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Current|`Number`|페이지 이동전의 현재 페이지 번호|
|Move|`Number`|이동할 페이지 번호|



### Example
```javascript
function mySheet_OnBeforeMovePage(current, move) {
  // 트랜잭션이 발생한 경우 페이지 이동을 취소 한다.
  if (mySheet.IsDataModified()) {
    return false;
  }
}
```

### See also
  * [SearchMode Cfg](/docs/props/PropertyList/SearchMode)

### Since

|version|desc|
|---|---|
|7.0.0.0||