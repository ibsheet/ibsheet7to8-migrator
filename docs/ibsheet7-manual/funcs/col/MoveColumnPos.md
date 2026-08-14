# MoveColumnPos ***(col method)***

> 특정 컬럼을 새로운 컬럼 위치로 이동 시킵니다.<br>
> Event 인자를 1로 설정한 경우 [OnBeforeColumnMove](/docs/event/OnBeforeColumnMove) Event와 [OnAfterColumnMove](/docs/event/OnAfterColumnMove) Event가 발생하여 OnBeforeColumnMove Event 에서 처리할수 있는 컬럼 이동 취소 기능을 처리 할 수 있습니다.<br>
> 0으로 설정할 경우 이벤트 없이 컬럼을 이동시킵니다. 다중 컬럼의 경우 `|` 문자를 구분자로 이어서 인자를 생성합니다.

### Syntax
```javascript
ObjId.MoveColumnPos(Col, NewPos, [Event]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|이동할 컬럼의 Index 또는 SaveName|
|NewPos|`Long or String`|<span class="required">필수</span>|이동될 위치의 컬럼 Index 또는 SaveName|
Event|`Boolean`|<span class="optional">선택</span>|이동되면서 발생하는 이벤트인 OnBeforeColumnMove Event와  OnAfterColumn Event를 발생시킬지 여부 (Default :1)|



### Returns
***Boolean, 이동 처리 성공 여부***

### Example
```javascript
// Index가 3인 컬럼을 Index가 6인 컬럼의 위치로 이동 처리
mySheet.MoveColumnPos(3, 6);

// Index가 1,2인 컬럼들을 Index가 7인 컬럼의 위치로 이동 처리
mySheet.MoveColumnPos("1|2", "7|7");

//각 컬럼의 SaveName으로 설정한 경우
mySheet.MoveColumnPos("stockNm", "payAmt");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.117|다중 컬럼 이동 지원|