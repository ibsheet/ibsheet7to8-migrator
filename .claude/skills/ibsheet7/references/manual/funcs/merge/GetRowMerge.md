# GetRowMerge ***(merge method)***

> 대상 행의 가로 셀 병합 허용 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetRowMerge(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 행의 Row Index|


### Returns
***Boolean, 현재 행의 가로 머지 여부***

### Example
```javascript
// 첫번째 행의 가로 머지 허용여부를 확인
mySheet.GetRowMerge(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
