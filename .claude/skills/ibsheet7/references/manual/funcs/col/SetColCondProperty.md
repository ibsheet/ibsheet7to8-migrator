# SetColCondProperty ***(col method)***

> 대상 컬럼의 조건에 따른 스타일을 설정 합니다. <br>
> `주의` Int, Float, AutoSum 과 같이 Number 형태의 데이터 타입인 경우에만 설정이 가능 합니다.<br>
> cond 인자 설정은 결과가 boolean형태로 반환되로록 설정하여야 하며 비교값은 `%d`를 사용합니다.

### Syntax
```javascript
ObjId.SetColCondProperty(Col, Cond, Prop);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|
|Cond|`String`|<span class="required">필수</span>|설정할 조건 (예: "%d > 1000")|
|Prop|`Object`|<span class="optional">선택</span>|설정할 컬럼 속성|

### Enum
  * Prop

|Name|Type|Required|Description|
|----|----|-----|--------------|
|BackColorT|`String`|<span class="optional">선택</span>|조건 결과가 true 인 경우의 배경색|
|BackColorF|`String`|<span class="optional">선택</span>|조건 결과가 false 인 경우의 배경색|
|FontColorT|`String`|<span class="optional">선택</span>|조건 결과가 true 인 경우의 폰트 색상|
|FontColorF|`String`|<span class="optional">선택</span>|결과가 false 인 경우의 폰트 색상|
|EditT|`String`|<span class="optional">선택</span>|조건 결과가 true 인 경우의 편집 가능 여부|
|EditF|`String`|<span class="optional">선택</span>|조건 결과가 false 인 경우의 편집 가능 여부|
|CursorT|`String`|<span class="optional">선택</span>|조건 결과가 true 인 경우의 커서 모양 default	기본 모양 pointer	포인터 모양|
|CursorF|`String`|<span class="optional">선택</span>|조건 결과가 false 인 경우의 커서 모양 default	기본 모양 pointer	포인터 모양|

### Returns
***none***

### Example
```javascript
// Index가 3인 컬럼의 셀 값이 100 보다 작으면 blue, 그렇지 않은 경우 red 폰트 색상 적용
mySheet.SetColCondProperty(3, '%d < 100', {
    'BackColorT': 'blue',
    'BackColorF': 'red'
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||