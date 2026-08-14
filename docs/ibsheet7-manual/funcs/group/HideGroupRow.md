# HideGroupRow ***(group method)***

> 시트의 그룹행을 삭제하거나 숨김처리 합니다. <br>
> 그룹행 삭제시에는 그룹핑 상태인 경우 모두 초기화 되며 숨김시에는 그룹핑 상태가 그대로 유지 됩니다. <br>
> 숨김상태인 경우 [ShowGroupRow](/docs/funcs/group/ShowGroupRow) 메소드를 통해 보이도록 처리할 수 있습니다.


### Syntax
```javascript
ObjId.HideGroupRow([Del]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Del|`Boolean`|<span class="optional">선택</span>|삭제 여부 (Default :1)|


### Returns
***none***

### Example
```javascript
//그룹행 삭제
mySheet.HideGroupRow();

// 그룹행 숨김
mySheet.HideGroupRow(0)
```


### Since

|version|desc|
|---|---|
|7.0.10.0||