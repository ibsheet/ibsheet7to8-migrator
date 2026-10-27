# SetTreeActionMode ***(search method)***

> 트리구조에서 부모-자식 행간 삭제 체크시의 동작 방법을 설정 합니다.

### Syntax
```javascript
ObjId.SetTreeActionMode(Value);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Value|`Integer`|<span class="required">필수</span>|TreeActionMode 값<br>- 0 : 자식 행이 있으면 삭제 상태로 변경 불가, 부모 행이 삭제 상태이면 삭제 취소 불가<br>- 1 : 삭제 선택시 자식 행까지 모두 삭제 상태로 변경|



### Returns
***none***

### Example
```javascript
// 삭제 선택시 자식행까지 모두 삭제 상태로 변경하도록 설정
mySheet.SetTreeActionMode(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||