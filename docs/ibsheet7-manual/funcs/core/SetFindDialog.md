# SetFindDialog ***(core method)***

> `Ctrl+Shift+F` 를 이용한 찾기 다이얼로그의 기본 정보를 설정 합니다.

### Syntax
```javascript
ObjId.SetFindDialog(show, col, fullMatch, firstStart, caseSensitive, keepDialog, findwrap);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|show|`Boolean`|<span class="required">필수</span>|찾기 다이얼로그 사용 여부|
|col|`Long or String`|<span class="optional">선택</span>|컬럼의 Index 또는 SaveName (빈값인 경우 전체 컬럼)|
|fullMatch|`Number`|<span class="optional">선택</span>|텍스트 일치 종류 설정<br>- `-1` : 입력값과 모두 일치<br>- `0` : 입력값과 앞 부분이 일치<br>- `1` : 입력값과 뒤 부분이 일치 (Default)<br>- `2` : 입력값과 가운데 부분이 일치|
|firstStart|`Boolean`|<span class="optional">선택</span>|시작 위치 설정|
|caseSensitive|`Boolean`|<span class="optional">선택</span>|대소 구분 설정|
|keepDialog|`Boolean`|<span class="optional">선택</span>|찾기 후 창 닫기 여부|
|findwrap|`Boolean`|<span class="optional">선택</span>|끝에서 되돌리기 여부|




### Returns
***none***

### Example
```javascript
// 찾기 다이얼로그의 기본값 설정 (대상 컬럼:5, 시작위치:포커스행 다음, 일치종류:가운데일치)
mySheet.SetFindDialog(1, 5, 2, 0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||