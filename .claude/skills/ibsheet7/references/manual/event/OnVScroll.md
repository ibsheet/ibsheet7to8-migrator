# OnVScroll ***(event)***

> 세로스크롤 시 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_OnVScroll(vpos, oldvpos, isTop, isBottom) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|vpos|`Long`|세로 스크롤 값|
|oldvpos|`Long`|이전 세로 스크롤 값|
|isTop|`Boolean`|세로 스크롤이 최상단에 위치했는지 여부|
|isBottom|`Boolean`|세로 스크롤이 최하단에 위치했는지 여부|



### Example
```javascript
function mySheet_OnVScroll(vpos, oldvpos, isTop, isBottom) {
  // 세로스크롤시 처리할 로직
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||