# OnDropEnd ***(event)***

> 행 단위 Drag를 시작 후 Drop 시점에 이벤트가 발생합니다.<br>
> 이벤트 인자중 Type 인자는 트리구조에서 Drop 위치의 상세 값을 전달 합니다.<br>
> Type : `1` (Drop 위치 행의 `상단`), `2` (Drop 위치 행의 `중앙`), `3` (Drop 위치 행의 `하단`)


### Syntax
```javascript
function 오브젝트ID_OnDropEnd(FromSheet, FromRow, ToSheet, ToRow, X, Y, Type) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|FromSheet|`Object`|Drag 위치 Sheet 객체|
|Row|`Long`|Drag 위치 Sheet 객체의 Row Index|
|ToSheet|`Object`|Drop 위치 Sheet 객체|
|ToRow|`Long`|Drop 위치 Sheet 객체의 Row Index|
|X|`Integer`|Drop 위치의 X 좌표|
|Y|`Integer`|Drop 위치의 Y 좌표|
|Type|`Integer`|트리 구조인 경우 Drop 위치의 타입|



### Example
```javascript
// 드래그 행을 드랍위치에 추가하고 드래그 시트에서 삭제
function mySheet_OnDropEnd(FromSheet, FromRow, ToSheet, ToRow, X, Y, Type) {

  var NewRow = ToObj.DataInsert(ToRow);

  for (var c = 0; c <= Obj.LastCol(); c++) {
    ToObj.SetCellValue(NewRow, c, Obj.GetCellValue(Row, c));
  }

  Obj.RowDelete(Row);
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||