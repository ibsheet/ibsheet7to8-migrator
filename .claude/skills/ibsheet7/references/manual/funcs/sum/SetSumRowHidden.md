# SetSumRowHidden ***(sum method)***

> 합계 행의 숨김 여부를 설정합니다.

### Syntax
```javascript
ObjId.SetSumRowHidden(Hidden);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Hidden|`Boolean`|<span class="required">필수</span>|숨김여부|



### Returns
***none***

### Example
```javascript
// 조회 완료 후 조회 데이터가 없으면 합계행을 숨김 처리 한다.
function mySheet_OnSearchEnd() {
  if (mySheet.RowCount() > 0) {
    mySheet.SetSumRowHidden(0);
  } else {
    mySheet.SetSumRowHidden(1);
  }
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||