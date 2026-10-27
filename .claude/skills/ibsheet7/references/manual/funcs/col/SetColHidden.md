# SetColHidden ***(col method)***

> 대상 컬럼의 숨김 여부를 설정 합니다.

### Syntax
```javascript
ObjId.SetColHidden([info], [opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|info|`Object`|<span class="required">필수</span>|대상 컬럼 처리 정보 객체 배열 집합|
|info.Col|`Long or String`|<span class="required">필수</span>|대상 컬럼의 Index 또는 SaveName|
|info.Hidden|`Boolean`|<span class="required">필수</span>|숨김 여부|
|opt|`Object`|<span class="optional">선택</span>|옵션 설정 객체|
|opt.ValidCol|`Boolean`|<span class="optional">선택</span>|컬럼에 대한 유효성 체크 여부 (Default :1)|



### Returns
***none***

### Example
```javascript
// Index가 3인 컬럼 숨김 처리
mySheet.SetColHidden(3, 1);

// Index가 3, 6, 7 컬럼에 대한 숨김 처리
mySheet.SetColHidden([
  {Col: 3, Hidden:1},
  {Col: 6, Hidden:1},
  {Col: 7, Hidden:1}
]);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.61|SetColHidden 메소드의 인자 구조 변경 (기존 방식 처리도 지속적으로 지원)|
