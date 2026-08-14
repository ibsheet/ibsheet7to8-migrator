# FilteredRowCount ***(filter method)***

> 필터행이 있는 경우 필터링 된 행의 개수를 반환합니다.<br>
필터행이 없는 경우 -1을 반환 합니다.<br>
`주의 : 행 추가 후 바로 FilteredRowCount 를 사용하면 정확한 결과가 반환되지 않을 수 있습니다.`<br>`행 추가 후 값을 입력 뒤 FilteredRowCount 를 사용하시기를 바랍니다.`

### Syntax
```javascript
ObjId.FilteredRowCount();
```

### Info
***none***


### Returns
***none***

### Example
```javascript
// 필터링 결과 건수 확인
console.log('filteredRows: ', mySheet.FilteredRowCount());
```


### Since

|version|desc|
|---|---|
|7.0.0.0||