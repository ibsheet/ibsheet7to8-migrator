# SetSelectCol ***(core method)***

> 포커스를 이동할 컬럼을 설정 합니다. <br>
> `SetSelectRow` 메소드와 함께 사용하며, 두 속성을 모두 사용한 `SelectCell` 메소드를 이용할 수 있습니다.

### Syntax
```javascript
ObjId.SetSelectCol(col, event);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|col|`Long or String`|<span class="required">필수</span>|컬럼의 Index 또는 SaveName|
|event|`Boolean`|<span class="optional">선택</span>|이벤트 발생 여부 (Default: 1)|



### Returns
***none***

### Example
```javascript
// Index가 5인 컬럼으로 포커스 이동.
mySheet.SetSelectCol(5);

// SaveName이 sDeptName인 컬럼으로 포커스 이동
mySheet.SetSelectCol("sDeptName");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||