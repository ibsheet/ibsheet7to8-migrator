# GetCellFont ***(cell method)***

> 대상 셀의 폰트에 적용된 스타일을 확인 합니다.

### Syntax
```javascript
ObjId.GetCellFont(style, startRow, startCol, endRow, endCol);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|style|`String`|<span class="required">필수</span>|폰트 속성|
|startRow|`Long`|<span class="required">필수</span>|영역 시작 셀의 Row Index|
|startCol|`Long or String`|<span class="required">필수</span>|영역 시작 셀의 Column Index 또는 SaveName|
|endRow|`Long`|<span class="required">필수</span>|영역 마지막 셀의 Row Index|
|endCol|`Long or String`|<span class="required">필수</span>|영역 마지막 셀의 Column Index 또는 SaveName|

### Enum
  * style

|Name|Description|
|----|-----------|
|FontName|글꼴|
|FontSize|글자크기|
|FontColor|글자색상|
|FontBold|글자 볼드 여부|
|FontItalic|글자 기울임 여부|
|FontUnderline|글자 밑줄 표시 여부|
|FontStrike|글자 취소선 표시 여부|


### Returns
***Boolan/String , 설정한 속성 값***

### Example
```javascript
// (2, 3)셀의 폰트 사이즈 확인
console.log("fontSize:", mySheet.GetCellFont('FontSize', 2, 3));

// (2, 3)셀의 폰트에 bold 적용 여부 확인
console.log("fontBold:", mySheet.GetCellFont('FontBold', 2, 3));

//글자크기가 10보다 큰 경우 9사이즈로 변경한다.
if (mySheet.GetCellFont("FontSize", 2,1,2,1) >= 10) {
  mySheet.SetCellFont("FontSize", 2,1,2,1,9));
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||