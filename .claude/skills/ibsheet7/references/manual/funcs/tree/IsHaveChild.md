# IsHaveChild ***(search method)***

> 대상 행에 자식 행이 존재하는지 여부를 확인 합니다.

### Syntax
```javascript
ObjId.IsHaveChild(Row, [IncludeDelRow]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|
|IncludeDelRow|`Boolean`|<span class="optional">선택</span>|Child 레벨의 행 중 "삭제" 상태의 행을 포함할것인가 여부 (Default: 0)|



### Returns
***Boolean, Child행의 존재 여부***

### Example
```javascript
// Index가 4인 행의 자식 행 존재 여부 확인
console.log('haveChild: ', mySheet.IsHaveChild(4));

// 삭제행까지 포함하여 자식 행 존재 여부 확인
console.log('haveChild: ', mySheet.IsHaveChild(4, 1));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||