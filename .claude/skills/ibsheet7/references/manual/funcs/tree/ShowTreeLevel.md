# ShowTreeLevel ***(search method)***

> 트리 구조에서 자식 노드를 펼쳐서 보이게 할 레벨을 설정 합니다.

### Syntax
```javascript
ObjId.ShowTreeLevel([Level], [ChildStatus]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Level|`Integer`|<span class="optional">선택</span>|보여질 트리 레벨 수준<br>- -1 : 모두 펼치기 (Default)<br>- -0 : 모두 접기<br>- {number} : 해당 레벨까지 펼치기|
|ChildStatus|`Integer`|<span class="optional">선택</span>|보여질 트리 레벨 이하 레벨의 펼침 상태를 설정<br>- 0 : 이전 상태 유지<br>- 1 : 모두 접기<br>- 2 : 모두 펼치기|


### Returns
***none***

### Example
```javascript
// 모든 트리 노드 접기
mySheet.ShowTreeLevel(0, 1);

// 모든 트리 노드 펼치기
mySheet.ShowTreeLevel(-1, 2);

// 1레벨의 트리 노드 까지 펼치기
mySheet.ShowTreeLevel(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||