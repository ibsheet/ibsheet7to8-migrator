# SetCellFont ***(cell method)***

> 대상 셀에 폰트 스타일을 설정 합니다.

### Syntax
```javascript
ObjId.SetCellFont(style, startRow, startCol, endRow, endCol, Value);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|style|`String`|<span class="required">필수</span>|폰트 속성 [(style 참고)](/docs/funcs/cell/GetCellFont)
|startRow|`Long`|<span class="required">필수</span>|영역 시작 셀의 Row Index|
|startCol|`Long or String`|<span class="required">필수</span>|영역 시작 셀의 Column Index 또는 SaveName|
|endRow|`Long`|<span class="required">필수</span>|영역 마지막 셀의 Row Index|
|endCol|`Long or String`|<span class="required">필수</span>|영역 마지막 셀의 Column Index 또는 SaveName|
|Value|`Boolean or String`|<span class="required">필수</span>|폰트속성에 설정 여부 또는 설정값|


### Returns
***none***

### Example
```javascript
// (2, 1) ~ (4, 2) 범위의 셀에 폰트 bold 적용
mySheet.SetCellFont('FontBold', 2, 1, 4, 2, 1);

// (2, 1) ~ (4, 2) 범위의 셀의 폰트 사이즈를 15px로 설정
mySheet.SetCellFont('FontSize', 2, 1, 4, 2, 15);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||