# CheckedRows ***(col method)***

> 대상 컬럼에 체크되어있는 행의 개수를 확인 합니다. <br>
> `주의` opt 의 RowLevel, ParentRow 속성을 동시에 설정 할 수 없습니다. 두 속성 모두 설정된 경우 `ParentRow` 설정을 우선적으로 처리 합니다.

### Syntax
```javascript
ObjId.CheckedRows(Col, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|
|Opt|`Object`|<span class="optional">선택</span>|처리 옵션|
|Opt.RowLevel|`Number`|<span class="optional">선택</span>|처리 대상 트리 레벨 (Default :0)|
|Opt.ParentRow|`Number`|<span class="optional">선택</span>|처리 대상 부모 행의 Index|
|Opt.Recursive|`Boolean`|<span class="optional">선택</span>|하위 노드에 대한 재귀 처리 여부 (Default :1)|


### Returns
***Long, 특정 컬럼에 체크된 행의 개수***

### Example
```javascript
var cnt1 = mySheet.CheckedRows(1);
console.log("체크된 행의 개수는 ", cnt1, "개 입니다.");

var cnt2 = mySheet.CheckedRows("chkData");
console.log("체크된 행의 개수는 ", cnt2, "개 입니다.");

// 트리기준 컬럼의 체크박스에 대한 사용
// 트리 레벨이 2인 행 가운데 체크된 개수 확인
var res = mySheet.CheckedRows(1, {RowLevel:2, Recursive:0});

// Index가 5인 행의 자식행 가운데 체크된 개수 확인
var arRes = mySheet.CheckedRows (1, {ParentRow:5, Recursive:1});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.9.0|트리 구조의 트리체크에 대한 처리 지원 (RowLevel, ParaenRow 속성 인자 추가)|