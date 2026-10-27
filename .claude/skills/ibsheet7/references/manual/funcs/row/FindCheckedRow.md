# FindCheckedRow ***(row method)***

> 대상 컬럼을 기준으로 체크된 행번호를 구분자 `|`로 연결하여 반환합니다.<br>
> `opt.RowLevel`, `opt.ParentRow`, `opt.Recursive` 인자는 트리구조의 시트에서 트리 기준 컬럼에 대한 체크박스 사용 모드에서만 유효한 인자 속성입니다.<br>
> `opt.RowLevel`, `opt.ParentRow` 속성은 동시에 같이 사용할 수 없으며, 두 속성 모두 설정이 있는 경우 `opt.ParentRow` 속성을 우선 처리합니다.

### Syntax
```javascript
ObjId.FindCheckedRow(Col, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Index 또는 SaveName|
|Opt|`Object`|<span class="optional">선택</span>|설정 옵션 객체|
|Opt.RowLevel|`Number`|<span class="optional">선택</span>|처리 대상 트리 레벨 (Default: 0)|
|Opt.ParentRow|`Index`|<span class="optional">선택</span>|처리 대상 부모 행의 Index|
|Opt.Recursive|`Boolean`|<span class="optional">선택</span>|하위 노드에 대한 재귀 처리 여부 (Default: 1)|
|Opt.ReturnArray|`Boolean`|<span class="optional">선택</span>|배열집합 반환 여부 (Default: 0)|




### Returns
***String or Array, 체크된 행번호를 `|`로 연결한 문자열 또는 배열***

### Example
```javascript
// 1컬럼의 체크된 행 번호를 확인
console.log("findCheckedRow:", mySheet.FindCheckedRow(1));

// 트리 기준 컬럼의 체크박스에 대한 사용, 트리 레벨이 2행인 가운데 체크된 목록을 확인
console.log("findCheckedRow:", mySheet.FindCheckedRow(1, {RowLevel:2, Recursive:0}));

// 5행의 자식행 가운데 체크된 목록을 배열집합으로 확인
var arRes = mySheet.FindCheckedRow(1,{
  ParentRow:5,
  Recursive:1,
  ReturnArray:1
});
console.log("findCheckedRow:", arRes);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||