# DataInsert ***(row method)***

> 데이터 행을 신규 생성하고, 생성된 행의 Index를 반환합니다.<br>
> `row`인자와 `level`인자의 설정에 따라 아래의 표와 같이 처리 됩니다.

### Syntax
```javascript
ObjId.DataInsert(row, level, [opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|row|`Long`|<span class="optional">선택</span>|생성할 위치의 행 Index|
|level|`Number`|<span class="optional">선택</span>|트리 레벨|
|opt|`Object`|<span class="optional">선택</span>|설정 옵션|
|opt.Focus|`Boolean`|<span class="optional">선택</span>|생성된 행으로 포커스 이동할지 여부 (Default: 1)|
|opt.CellEvent|`Boolean`|<span class="optional">선택</span>|[OnSelectCell](/docs/event/OnSelectCell) Event 발생 여부|

### Enum
  * row

|Name|Description|
|----|---------------|
|`설정이 없는 경우`|선택된 행 아래 생성|
|`row < 0`|마지막 행에 생성|
|`row >= 전체 행`|마지막 행에 생성|
|`row < 데이터 첫 행`|첫 행에 생성|
|`그 외의 경우`|설정값 위치에 생성|

### Returns
***Number,	생성된 행의 Index***

### Example
```javascript
// 첫 행에 생성
mySheet.DataInsert(0);

// 마지막 행에 생성
mySheet.DataInsert(-1);

// 현재 선택된 행의 바로 아래에 생성
mySheet.DataInsert();
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.112|opt.Focus 인자 추가|