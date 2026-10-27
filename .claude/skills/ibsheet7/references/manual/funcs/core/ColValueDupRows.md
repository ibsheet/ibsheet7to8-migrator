# ColValueDupRows ***(core method)***

> 단일 또는 다중 컬럼에 대한 동일한 데이터의 모든 행 Index를 확인합니다.<br>
> `Cols` 인자에 2개 이상의 컬럼을 구분자로 연결한 문자열로 구성한 경우 다중컬럼에 대해서 처리를 합니다.<br>
> - 동일한 데이터가 존재하는 경우 : 첫번째 중복 행을 제외한 중복 행의 Index를 "," 구분자로 연결한 문자열 조합으로 반환<br>
> - 동일한 데이터가 존재하지 않은 경우 : 빈값을 반환<br>
> `IncludeDelRow` 속성을 설정하지 않거나 true로 설정한 경우 트랜잭션 상태가 삭제인 행을 포함하여 처리합니다.<br>
> `IncludeFirstRow` 속성를 true로 설정하는 경우 첫번째 중복행의 Index를 `,` 구분자로 연결한 문자열 조합과 결과 문자열을 `|` 구분자로 연결한 문자열 조합으로 반환합니다.

### Syntax
```javascript
ObjId.ColValueDupRows(Cols, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Cols|`Number or String`|<span class="required">필수</span>|컬럼의 Index 또는 SaveName을 구분자 `|`로 연결한 문자열|
|Opt|`Object`|<span class="optional">선택</span>|옵션 객체|
|Opt.CaseSensitive|`Boolean`|<span class="optional">선택</span>|대/소문자 구분 비교 여부 (Default: 1)|
|Opt.IncludeDelRow|`Boolean`|<span class="optional">선택</span>|트랜잭션 상태가 삭제인 행을 포함 여부 (Default: 1)|
|Opt.IncludeSumRow|`Boolean`|<span class="optional">선택</span>|합계/소계/누계 행 포함 여부 (Default: 1)|
|Opt.IncludeEmpty|`Boolean`|<span class="optional">선택</span>|빈값 포함 여부 (Default: 1)|
|Opt.IncludeFirstRow|`Boolean`|<span class="optional">선택</span>|중복된 행의 최초의 행을 포함할지 여부 (Default: 0)|
|Opt.StartRow|`Number`|<span class="optional">선택</span>|중복 검사를 수행 하고자 하는 부분의 첫행의 Index (Default: "첫 행")|
|Opt.EndRow|`Number`|<span class="optional">선택</span>|중복 검사를 수행 하고자 하는 부분의 마지막행 Index (Default: "마지막 행")|



### Returns
***String, 중복된 모든 행을 ","로 조합한 문자열***

### Example
```javascript
// 4컬럼,5컬럼에 대해 첫번째 행부터 50번째 행까지의 중복검사(삭제행제외, 최초행포함, 1행~50행)
var duprows = mySheet.ColValueDupRows("4|5",{
  "IncludeDelRow"   : 0,
  "IncludeFirstRow" : 1,
  "StartRow"        : 1,
  "EndRow"          : 50
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||