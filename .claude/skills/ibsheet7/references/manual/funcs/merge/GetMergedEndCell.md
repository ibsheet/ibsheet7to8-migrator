# GetMergedEndCell ***(merge method)***

> 대상 셀이 포함된 셀 병합 영역에 대한 마지막 셀의 정보를 확인합니다. <br>
> 2개행 이상의 단위데이터행 구조에서 Col 인자에 Index를 설정할 경우 첫번째 행의 해당인덱스 셀에 대해서 처리를 하고 <br>
> SaveName으로 설정할 경우 설정한 행의 단위데이터행 내 해당 SaveName 셀에 대해서 처리합니다.

### Syntax
```javascript
ObjId.GetMergedEndCell(Row, Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|
|Col|`Long or String`|<span class="required">필수</span>|대상이 되는 컬럼 또는 SaveName|


### Returns
***String	셀의 병합 마지막 셀의 행, 컬럼의 Index를 구분자 ','로 연결한 문자열***

### Example
```javascript
// (2, 3) 셀이 포함된 셀 병합 영역의 셀 병합 시작 셀 확인
console.log('endCell: ', mySheet.GetMergedEndCell(2, 3));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||