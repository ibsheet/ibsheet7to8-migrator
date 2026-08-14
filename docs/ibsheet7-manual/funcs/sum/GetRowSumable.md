# GetRowSumable ***(sum method)***

> 대상 행에 대한 합계 계산시 계산 포함 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetRowSumable(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|



### Returns
***Boolean, 설정 값***

### Example
```javascript
// Index가 2인 행에 대한 합계 계산 포함 여부 확인
console.log('sumable: ', mySheet.GetRowSumable(2));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||