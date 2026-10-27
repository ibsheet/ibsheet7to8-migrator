# FindText ***(row method)***

> 컬럼내에 특정 텍스트를 찾아서 행번호를 확인 합니다. <br>
> `StartRow` 인자가 행의 인덱스 범위를 벗어나는 경우 `-1`을 반환 합니다.

### Syntax
```javascript
ObjId.FindText(Col, SearchText, StartRow, FullMatch, CaseSensitive, ExcludeHiddenText, ExcludeCode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|찾고자 하는 컬럼의 Index 또는 SaveName|
|SearchText|`String`|<span class="required">필수</span>|찾을 문자열|
|StartRow|`Number`|<span class="optional">선택</span>|시작 행의 Index (Default: "첫행")|
|FullMatch|`Number`|<span class="optional">선택</span>|글자 동일 종류<br>* `-1` : 전체 동일한 값 (Default)<br>* `0`	: 앞 부분이 같은 값<br>* `1`	: 뒷 부분이 같은 값<br>* `2`	: 일부가 같은 값|
|CaseSensitive|`Boolean`|<span class="optional">선택</span>|대소문자 구분 여부 (Default: 1)|
|ExcludeHiddenText|`Boolean`|<span class="optional">선택</span>|숨김처리된 데이터 제외 여부 (Default: 0)|
|ExcludeCode|`Boolean`|<span class="optional">선택</span>|ComboCode 사용시 Code 검색 포함 여부|



### Returns
***Long, 찾아진 행번호 (Default: -1)***

### Example
```javascript
// 2컬럼내에 "한국"으로 시작하는 데이터의 행 번호를 확인
console.log("findText:", mySheet.FindText(2, "한국", 0, 0, 0));

// 2컬럼내에 전체 글자가 "한국"인 데이터의 행 번호를 확인
console.log("findText:", mySheet.FindText(2, "한국", 0));

// 글자 중에 "은" 이라는 글자가 들어가는 행 번호를 확인
console.log("findText:", mySheet.FindText(2, "은", 0, 2));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||