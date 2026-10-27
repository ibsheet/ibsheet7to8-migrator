# ClearUnload ***(core method)***

> 페이지에 있는 모든 IBSheet를 삭제 하고, 사용하던 메모리를 강제로 해제 합니다. <br>
> 모든 IBSheet 에 대한 처리를 수행 하므로, 사용중인 하나의 IBSheet 를 통해 1회만 호출해야 합니다. <br>
> 이 기능은 body 태그의 `onunload` 이벤트에서 사용해야 합니다.

### Syntax
```javascript
ObjId.ClearUnload(removeEvent);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|removeEvent|`Boolean`|<span class="optional">선택</span>|시트의 이벤트 리스너 삭제 여부 선택|



### Returns
***none***

### Example
```javascript
// 시트 객체 삭제 및 메모리 강제 해제 처리
function clearSheet() {
  mySheet.ClearUnload();
}
<body onunload='clearSheet();'></body>

// jQuery 에서의 사용
$( window ).unload(function() {
  mySheet.ClearUnload();
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.40|removeEvent 추가|