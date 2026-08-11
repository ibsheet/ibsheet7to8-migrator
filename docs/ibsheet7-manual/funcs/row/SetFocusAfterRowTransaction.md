# SetFocusAfterRowTransaction ***(row method)***

> 행 추가 / 삭제 / 이동 / 복사 후 포커스 처리 여부를 설정 합니다. <br>
> 2개 이상의 행에 대한 연속 처리시 불필요한 포커스 처리를 막을 수 있어서 처리 속도를 개선 할 수 있습니다.

### Syntax
```javascript
ObjId.SetFocusAfterRowTransaction(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Long`|<span class="required">필수</span>|포커스 설정 여부 (Default: 1)|



### Returns
***none***

### Example
```javascript
// 현재 포커스 행 하위로 10개행을 추가 후 맨마지막 추가된 행에 포커스 설정
mySheet.SetFocusAfterRowTransaction(0);
var newRow = null;
for (var i = 0; i < 10; i++) {
  newRow = mySheet.DataInsert();
}
mySheet.SetSelectRow(newRow);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||