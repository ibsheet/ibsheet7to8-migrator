# OnHScroll ***(event)***

> 가로스크롤 시 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_OnHScroll(hpos, oldhpos, isLeft, isRight, section) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|hpos|`Long`|가로 스크롤 값|
|oldhpos|`Long`|이전 가로 스크롤 값|
|isLeft|`Boolean`|가로 스크롤이 좌측 끝에 위치했는지 여부|
|isRight|`Boolean`|가로 스크롤이 우측 끝에 위치했는지 여부|
|section|`Int`|스크롤 섹션값 (항상 1이 반환)|



### Example
```javascript
function mySheet_OnHScroll(hpos, oldhpos, isLeft, isRight, section) {
  //가로스크롤시 수행할 로직
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||