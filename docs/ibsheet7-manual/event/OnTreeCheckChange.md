# OnTreeCheckChange ***(event)***

> 트리구조의 시트에서 트리 기준 컬럼에 대한 체크박스 사용 모드인 경우 해당 체크박스의 값이 변경시 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_OnTreeCheckChange(Row, Col, Value, Level, HasChild) {}
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|대상 행의 Index|
|Col|`Long`|대상 컬럼의 Index|
|Value|`Boolean`|변경된 체크박스의 값|
|Level|`Number`|대상 행의 트리 레벨|
|HasChild|`Boolean`|대상 행의 자식노드 존재 여부|



### Example
```javascript
// 해당 행의 자식노드가 있는 경우 자식노드에 동일한값 처리
function mySheet_OnTreeCheckChange(row, col, value, level, hasChild) {
  var childRows = [];
  // 자식행이 있는 경우
  if (hasChild) {
    // 해당 행의 바로 아래의 자식행 정보 수집
    childRows = mySheet. GetChildRows(row, level + 1).split("|");
    for (var i = 0, len = childRows.length; i < len; i++) {
      // 자식행에 동일한 체크값 설정
      mySheet.SetTreeCheckValue(childRows[i], value);
    }
  }
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.9.0||