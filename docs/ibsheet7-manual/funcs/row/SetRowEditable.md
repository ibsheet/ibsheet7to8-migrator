# SetRowEditable ***(row method)***

> 행의 Edit 가능 여부를 설정 합니다. <br>
> 전체 Edit 가능 여부가 가능일 때 변경 가능하며, ColEditable 설정값이 불가인 경우는 RowEditable 설정이 무시됩니다. <br>
> Edit 허용 가능으로 설정해도 Column, Row, Cell의 Edit 가능여부 설정에 따라 Edit 가능 여부가 결정됩니다.<br>
> `주의` edit 인자 설정과 상관 없이 `Popup`, `Seq`, `Status`, `Img`, `Result` 타입은 편집이 불가능합니다.

### Syntax
```javascript
ObjId.SetRowEditable(Row, Editable);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|
|Editable|`Boolean`|<span class="optional">선택</span>|행의 Edit 가능 여부|



### Returns
***none***

### Example
```javascript
// 1행의 Edit 가능 여부를 0으로 설정
mySheet.SetRowEditable(1,0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||