# DataCopy ***(row method)***

> 현재 선택행의 데이터를 복사하여 바로 아래에 동일한 데이터의 행을 추가합니다.<br>
> 생성된 행의 Index를 반환하며, 선택 행이 없는 경우 -1를 반환합니다.<br>
> 트리 구조인 경우 `IncludeChild` 인자 값이 `true` 이면 자식레벨의 행을 모두 포함하여 복사 하며,부모행이 삭제 상태인 경우 InvalidChildNodeCopy 에러 메시지를 표시하고 처리를 중단합니다.<br>
> `SetFocusAfterRowTransaction` 이 `false`로 설정되어 있으면 포커스를 새로 생성된 행으로 이동하지 않습니다.

### Syntax
```javascript
ObjId.DataCopy([IncludeChild]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|IncludeChild|`Boolean`|<span class="optional">선택</span>|자식 레벨의 행까지 복사하는지 여부 (Default: 0)|



### Returns
***Long, 복사하여 생성된 행의 Row Index***

### Example
```javascript
// 선택행을 복사하여 바로 아래에 신규 입력 행을 생성
mySheet.DataCopy();

// 자식 레벨까지 모두 복사
mySheet.DataCopy(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||