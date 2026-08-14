# OnLoad ***(event)***

> `createIBSheet` 또는 `Reset` 메소드 호출시 시트의 객체가 생성 완료시점에 이 이벤트가 발생합니다.<br>
> 이 이벤트는 `body의 onload 이전에 발생`하며 DOM 엘리먼트 생성이전 시점이기 때문에 시트 객체의 메소드 확장 또는 재정의 목적으로 사용하여야 하며 초기화는 이 이벤트내에서 처리 할 수 없습니다.<br>
> (body 의 onload 이후 시점에서만 가능)



### Syntax
```javascript
function 오브젝트ID_OnLoad() { }
```

### Parameters
***none***



### Example
```javascript
function mySheet_OnLoad() {
  // 시트 객체에 CusomMethod 메소드를 추가
  mySheet.CustomMethod = function(arg1, arg2) {
  }
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.3.0||