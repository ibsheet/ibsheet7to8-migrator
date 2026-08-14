# SetCellEditable  ***(cell method)***

> 대상 셀의 편집 가능 여부 속성을 설정합니다.<br>
> 행 또는 컬럼의 인자가 올바르지 않은 경우에는 별도 처리 없이 InvalidValue를 반환 합니다.<br>
> 편집 가능으로 설정해도 Column, Row, Cell의 편집 가능 여부 설정에 따라 편집 가능 여부가 결정 됩니다.<br>


### Syntax
```javascript
ObjId.SetCellEditable(Row, Col, Edit);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|해당 셀의 Column Index 또는 SaveName|
|Edit|`Boolean`|<span class="required">필수</span>|편집 가능 여부|

### Enum

  * 편집 가능으로 변경할 수 없는 경우는 아래와 같습니다. `(무조건 편집 불가)`

    - 컬럼타입이 `Seq`, `Image`, `Status`, `Result` 인 경우
    - 상태컬럼이 `삭제`인 경우 `DelCheck` 를 제외한 모든 컬럼
    - `계산식(CalcLogic)` 속성이 설정되어 있는 경우
    - `Editable(0)` 이 설정되어 있는 경우
    - 필터행의 Pass 컬럼 타입 셀


### Returns
***none***

### Example
```javascript
// (2, 3) 셀에 대한 편집불가 설정
mySheet.SetCellEditable(2, 3, 0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||