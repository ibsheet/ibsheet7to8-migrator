# ExportData ***(core method)***

> 시트의 데이터를 인자의 형식으로 추출 합니다. <br>
> 대상 컬럼을 설정하지 않은 경우는 모든 컬럼을 대상으로 합니다.

### Syntax
```javascript
ObjId.ExportData([info]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|info|`Object`|<span class="required">필수</span>|옵션 정보|
|info.Type|`String`|<span class="required">필수</span>|json,xml,csv 중에 하나 선택|
|info.Cols|`String`|<span class="optional">선택</span>|추출할 컬럼 (Default: 모든컬럼)|
|info.ColDelim|`String`|<span class="optional">선택</span>|출력 대상의 컬럼 구분자 (`csv` 형식인 경우에만 사용) (Default: ',')|
|info.FormattedText|`Boolean`|<span class="optional">선택</span>|포멧이 적용된 문자열형식으로 추출할지 여부 (Default: 0)|
|info.Mode|`Number`|<span class="optional">선택</span>|처리 모드 (`csv` 형식인 경우에만 사용)<br>- 0 : 일반 처리 모드<br>- 1 : 추출 대상 컬럼이 빈값인 컬럼은 빈값으로 추출 처리 모드|
|info.NewLine|`String`|<span class="optional">선택</span>|출력 대상의 개행 구분자 (`csv` 형식인 경우에만 사용) (Default: `\r\n`)|
|info.RowDelim|`String`|<span class="optional">선택</span>|출력 대상의 행 구분자 (`csv` 형식인 경우에만 사용) (Default: `\r\n`)|
|info.StyleProperty|`Boolean`|<span class="optional">선택</span>|행과 셀에 대한 스타일 관련 속성값 포함 여부 (`json` 형식인 경우에만 사용가능)|

### Enum
  * StyleProperty

|Target|ProPerty|Description|
|------|--------|-----------|
|`Row`|Edit<br>BackColor<br>FontColor|대상 행의 편집 허용 여부<br>대상 행의 배경색<br>대상 행의 폰트 색상|
|Cell|Edit<br>BackColor<br>FontColor<br>FontBold<br>FontItalic<br>FontStrike<br>FontUnderline|대상 셀의 편집 허용 여부<br>대상 셀의 배경색<br>대상 셀의 폰트 색상<br>대상 셀의 폰트 Bold 여부<br>대상 셀의 폰트 Italic 여부<br>대상 셀의 폰트 Strike 여부<br>대상 셀의 폰트 Underline 여부|


### Returns
***Type으로 지정한 형식의 데이터***

### Example
```javascript
// 시트의 모든 데이터를 json 객체로 추출
var jsonData = mySheet.ExportData({
  "Type": "json"
});
console.log('data: ', jsonData);

// Index가 2, 5, 10 컬럼의 데이터만 추출
var jsonData = mySheet.ExportData({
  "Type": "json",
  "Cols": "2|5|10"
});
console.log('data: ', jsonData);
```


### Since

|version|desc|
|---|---|
|7.0.13.21||
|7.0.13.44|FormattedText , StyleProperty 추가|