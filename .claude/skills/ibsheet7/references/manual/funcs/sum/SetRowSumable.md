# SetRowSumable ***(sum method)***

> 대상 행에 대한 합계 계산시 계산 포함 여부를 설정 합니다.

### Syntax
```javascript
ObjId.SetRowSumable(Row, Sum);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|
|Sum|`Boolean`|<span class="required">필수</span>|합계 계산 포함 여부|



### Returns
***none***

### Example
```javascript
// Index가 2인 행에 대한 합계 계산시 제외 하도록 설정
mySheet.SetRowSumable(2, 0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||