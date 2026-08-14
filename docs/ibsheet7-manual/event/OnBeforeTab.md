# OnBeforeTab ***(event)***

> 시트에서 탭 키를 누르는 경우 탭 이벤트가 발생하기 전에 발생하는 이벤트입니다.<br>
> 리턴값이 `false` 또는 `0`인 경우 해당 셀에서 포커스를 이동하지 않습니다.<br>
> 편집중인 셀의 경우 편집만 완료합니다.



### Syntax
```javascript
function 오브젝트ID_OnBeforeTab(row, col, oldRow, oldCol) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|row|`Long`|행의 Index|
|col|`Long`|컬럼의 Index|
|oldRow|`Long`|이전 행의 Index|
|oldCol|`Long`|이전 컬럼의 Index|



### Example
```javascript
function mySheet_OnBeforeTab (row, col, oldRow, oldCol) {
  console.log("[OnBeforeTab] new : " + row + ","  + col + ", old : " + oldRow + "," + oldCol);
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.13.84||