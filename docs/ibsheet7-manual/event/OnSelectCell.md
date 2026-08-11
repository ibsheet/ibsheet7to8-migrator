# OnSelectCell ***(event)***

> 특정 셀이 선택되었을 때 이벤트가 발생합니다. <br>
> 기존에 선택되었던 셀 정보와 새로 선택된 셀 정보를 모두 반환하므로 선택된 셀에 대한 처리 로직을 기재할 수 있습니다.



### Syntax
```javascript
function 오브젝트ID_OnSelectCell(OldRow, OldCol, NewRow, NewCol,isDelete) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|OldRow|`Long`|이전 선택 셀의 Row Index|
|OldCol|`Long`|이전 선택 셀의 Column Index|
|NewRow|`Long`|현재 선택 셀의 Row Index|
|NewCol|`Long`|현재 선택 셀의 Column Index|
|isDelete|`Boolean`|추가된 행을 DelCheck를 통해 삭제하는 경우, 같은 위치를 기준으로 OnSelectCell 이벤트가 발생하는데, 이때 행 삭제됨을 구분해 주기 위한 값|



### Example
```javascript
function mySheet_OnSelectCell(OldRow, OldCol, NewRow, NewCol,isDelete) {
  alert("셀("+ OldRow + "," + OldCol + ")을 선택하였다가 셀(" + NewRow + "," + NewCol +")을 선택하였습니다.");
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||