# DisposeSheet ***(core method)***

> IBSheet 객체를 삭제 한다.

삭제시 사용하던 메모리도 강제로 해제 처리 한다.

### Syntax
```javascript
ObjId.DisposeSheet(removeEvent);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|removeEvent|`Boolean`|<span class="optional">선택</span>|시트의 이벤트 리스너 삭제 여부 선택<br>- 0 : 메모리를 해제합니다. (Default)<br>- 1 : 메모리 해제 및 이벤트를 해제합니다.|



### Returns
***none***

### Example
```javascript
// IBSheet 생성시 이전에 생성한 객체가 있으면 삭제 후 생성 처리
if (typeof mySheet !== "undefined" && typeof mySheet.Index !== "undefined") {
  mySheet.DisposeSheet();
}

createIBSheet2(container, 'mySheet', '100%', '500px');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.40|removeEvent 추가|