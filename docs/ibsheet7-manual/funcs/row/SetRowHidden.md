# SetRowHidden ***(row method)***

> 단일 또는 다중행에 대한 숨김 여부를 설정 합니다.

### Syntax
```javascript
ObjId.SetRowHidden(Row, Hidden);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long or String`|<span class="required">필수</span>|특정 행의 Row Index 혹은 구분자 `|`로 연결된 문자열|
|Hidden|`Boolean`|<span class="required">필수</span>|조회 처리 옵션|



### Returns
***none***

### Example
```javascript
// 1행을 숨김 처리
mySheet.SetRowHidden(1, 1);

// 2, 3, 7번 행을 숨김 처리
mySheet.SetRowHidden("2|3|7", 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||