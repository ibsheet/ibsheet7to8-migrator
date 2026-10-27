# DataMove ***(row method)***

> 특정 데이터 행을 데이터 영역의 다른 위치로 이동 합니다.<br>
> 트리구조인 경우 자식레벨의 행을 모두 포함하여 이동 합니다. <br>
> `FromRow`인자의 값을 설정하지 않거나 -1로 설정하는 경우 현재 선택되어 있는 행에 대해서 처리 합니다. <br>
> `FromRow`, `ToRow` 의 인자값이 올바르지 않은 경우 별도 처리 없이 -1을 반환 합니다.<br>
> `RowLevel` 의 인자를 설정한 경우 이동 처리시 동일 레벨상에서의 ToRow 설정과 가장 가까운 위치로 처리합니다.<br>
> `FromRow`, `ToRow`의 인자값은 기능 수행전의 상태에서의 행의 Index를 의미합니다. 따라서 설정한 ToRow 인자 값과 처리 후 반환 되는 값이 다를 수 있습니다.

### Syntax
```javascript
ObjId.DataMove(ToRow, FromRow, RowLevel);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|ToRow|`Number`|<span class="required">필수</span>|이동할 위치의 행 Index|
|FromRow|`Long`|<span class="optional">선택</span>|선택된 데이터의 Row Index (Default: -1)|
|RowLevel|`Integer`|<span class="optional">선택</span>|이동 후 선택된 데이터의 트리 레벨 (Default: "원래 레벨 수준")|



### Returns
***Long, 이동된 행의 Top Row Index***

### Example
```javascript
// 12행을 10행으로 이동한다.
mySheet.DataMove(10, 12);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||