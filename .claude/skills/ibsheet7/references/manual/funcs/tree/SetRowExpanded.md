# SetRowExpanded ***(search method)***

> 대상 행의 자식 노드의 펼침 여부를 설정 합니다. <br>
> `event` 인자를 `0`으로 설정 하는 경우 펼침 또는 닫힘 처리시 OnBeforeExpaned, OnAfterExpaned 이벤트가 발생하지 않습니다.

### Syntax
```javascript
ObjId.SetRowExpanded(Row, Expand, [Event]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|
|Expand|`Boolean`|<span class="required">필수</span>|자식 행의 펼쳐짐 여부|
|Event|`Boolean`|<span class="optional">선택</span>|관련 이벤트 발생 여부 (Default: 1)|



### Returns
***none***

### Example
```javascript
// Index가 4인 행의 자식 노드를 펼침으로 설정
mySheet.SetRowExpanded(4, 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.4.2|Set 메소드의 이벤트 발생여부 인자 추가|