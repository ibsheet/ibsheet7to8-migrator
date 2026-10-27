# GetTreeActionMode ***(search method)***

> 트리구조에서 부모-자식 행간 삭제 체크시의 동작 방법을 확인 합니다.<br>
> - 0 : 자식이 있으면 삭제 상태로 변경 불가, 부모가 삭제이면 삭제 취소 불가 (Default) <br>
> - 1 : 삭제 선택시 자식 행까지 모두 삭제 상태로 변경

### Syntax
```javascript
ObjId.GetTreeActionMode();
```

### Info
***none***


### Returns
***Integer, 설정 값***

### Example
```javascript
// 부모-자식 행간 삭제 체크시의 동작 방법을 확인
console.log("treeActionMode:", mySheet.GetTreeActionMode());
```


### Since

|version|desc|
|---|---|
|7.0.0.0||