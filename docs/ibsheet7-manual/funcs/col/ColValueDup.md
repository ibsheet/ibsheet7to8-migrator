# ColValueDup ***(col method)***

> 단일 또는 다중 컬럼에 대한 중복 데이터 존재 여부를 확인 합니다.<br>
> 중복된 데이터가 없는 경우는 -1를 반환 하고, 중복된 데이터가 있는 경우 첫번째 중복 데이터 행의 Index를 반환 합니다.

### Syntax
```javascript
ObjId.ColValueDup(Cols, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Cols|`Long or String`|<span class="required">필수</span>|컬럼의 Index 또는 SaveName을 구분자 `|`로 연결한 문자열|
|Opt|`Object`|<span class="optional">선택</span>|옵션 정보|
|Opt.CaseSensitive|`Boolean`|<span class="optional">선택</span>|대/소문자 구분 비교 여부 (Default: 1)|
|Opt.IncludeDelRow|`Boolean`|<span class="optional">선택</span>|트랜잭션 상태가 삭제인 행을 포함 여부 (Default: 1)|
|Opt.IncludeSumRow|`Boolean`|<span class="optional">선택</span>|합계/소계/누계 행 포함 여부 (Default: 1)|
|Opt.IncludeEmpty|`Boolean`|<span class="optional">선택</span>|빈값 포함 여부 (Default: 1)|


### Returns
***Number, 중복 행의 Index***

### Example
```javascript
//1컬럼에 중복된 값이 존재하는 행의 Index 확인
var Row = mySheet.ColValueDup("1");

//2,3,7 컬럼에 중복된 값이 존재하는 행의 Index 확인
var Row = mySheet.ColValueDup("2|3|7");

//삭제된 행과 빈값을 제외하고 중복 체크하기
var Row = mySheet.ColValueDup("2|3|7",{
  "IncludeDelRow" : 0,
  "IncludeEmpty" : 0
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.12.3|인자 구조 변경, IncludeEmpty 인자 속성 추가|