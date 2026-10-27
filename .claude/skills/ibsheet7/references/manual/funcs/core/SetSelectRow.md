# SetSelectRow ***(core method)***

> 포커스를 이동할 행을 설정 합니다. <br>
> `SetSelectCol` 메소드와 함께 사용하며, 두 속성을 모두 사용한 `SelectCell` 메소드를 이용할 수 있습니다.

### Syntax
```javascript
ObjId.SetSelectRow(row, event);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|row|`Long`|<span class="required">필수</span>|행의 Index|
|event|`Boolean`|<span class="optional">선택</span>|이벤트 처리 여부|



### Returns
***none***

### Example
```javascript
// Index가 5인 행으로 포커스 이동.
mySheet.SetSelectRow(5);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||