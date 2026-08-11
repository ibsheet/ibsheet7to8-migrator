# Down2Excel ***(export method)***

> IBSheet7의 내용을 엑셀 파일로 변환하여 다운로드 합니다.

### Syntax

```javascript
ObjId.Down2Excel([parameters]);
```

### Info

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| AllTypeToText | `Boolean` | <span class="optional">선택</span> | (숫자컬럼을 제외한) 모든 컬럼을 Text 타입으로 다운 받을지 여부 (Default: 0) |
| AppendPrevSheet | `Boolean` | <span class="optional">선택</span> | Buffer 모드 사용시 이전 워크시트에 Append 적용 여부 (Default: 0) |
| AutoSizeColumn | `Boolean` | <span class="optional">선택</span> | Default:0 (컬럼 넓이 자동 조절 안함) |
| CheckBoxOffValue | `String` | <span class="optional">선택</span> | 체크박스의 체크 해제시의 값 (Default: 0) |
| CheckBoxOnValue | `String` | <span class="optional">선택</span> | 체크박스의 체크시의 값 (Default: 1) |
| ComboValidation | `Boolean` | <span class="optional">선택</span> | 콤보의 드롭다운 형식 다운로드 여부 (Defualt: 0) |
| DownCols | `String` | <span class="optional">선택</span> | 다운로드 받을 열들을 설정<br>(ex: "1\|3\|5" 식의 문자열)` |
| DownCombo | `String` | <span class="optional">선택</span> | 콤보의 TEXT/CODE 형태의 다운로드 여부 (Default: "TEXT") |
| DownHeader | `Boolean` | <span class="optional">선택</span> | 헤더의 다운로드 여부 (Default: 1) |
| DownRows | `String` | <span class="optional">선택</span> | 다운로드 받을 행을 설정 <br/> - `""` : 모든 행을 다운로드<br/> - `"5\|12\|14"` : 5,12,14 번 행을 다운로드 |
| DownSum | `Boolean` | <span class="optional">선택</span> | 합계행 다운로드 여부 (Default: 1) |
| DownTreeHide | `Boolean` | <span class="optional">선택</span> | 트리의 접혀진 행 다운로드 여부 (Default: 0) |
| ExcelFontSize | `Number` | <span class="optional">선택</span> | 폰트 크기 설정 (Default: 0) |
| ExcelFontFamily | `Number` | <span class="optional">선택</span> | 폰트 설정 (클라이언트 모듈만 지원) |
| ExcelHeaderRowHeight | `String` | <span class="optional">선택</span> | 헤더 높이 설정 (Default: "")(사용안함) |
| ExcelRowHeight | `String` | <span class="optional">선택</span> | (Default: "")(사용안함) |
| ExcludeSubSum | `Number` | <span class="optional">선택</span> | 소계/누계 행 제외 여부 (Default: 0) |
| ExcludeFooterRow | `Number` | <span class="optional">선택</span> | ShowFooterRow 로 생성한 FooterRow 행 제외 여부 (Default :0)<br>- `0` : 소계, 누계 포함<br>- `1` : 소계 제외<br>- `2` : 누계 제외<br>- `3` : 소계, 누계 제외 |
| ExtendParam | `String` | <span class="optional">선택</span> | 서버로 전달할 추가 파라미터 (Get방식의 QueryString으로 연결하여 설정) (Default: "")(사용안함) |
| ExtendParamMethod | `String` | <span class="optional">선택</span> | ExtendParam인자의 전송 방식 (Default: GET) |
| FileName | `String` | <span class="optional">선택</span> | 저장할 파일 명 (Default: "Excel.xls") |
| HiddenColumn | `Boolean` | <span class="optional">선택</span> | 열숨김 반영 여부 (Default: 0) |
| KeyFieldMark | `Boolean` | <span class="optional">선택</span> | KeyField 마크(\*)를 다운 여부 (Default: 1(다운 받음)) |
| Mode | `Number` | <span class="optional">선택</span> | 다운로드 모드<br>- `-1` : Status, Delcheck, Result 타입 및 Hidden 칼럼을 제외하고 다운로드<br>- `0` : 모든 컬럼을 다운로드<br>- `1` : Status, DelCheck 타입을 제외하고 다운로드<br>- `2` : Hidden컬럼을 제외하고 다운로드 |
| Merge | `Number` | <span class="optional">선택</span> | 헤더의 머지의 다운로드 적용 방식 설정 (Default: 0)<br>- `0` : 사용 안함<br>- `1` : 사용함(셀 병합시 부속셀의 값 설정 함)<br>- `2` : 사용함(셀 병합시 부속셀의 값은 설정하지 않음)|
| Multipart | `Boolean` | <span class="optional">선택</span> | 다운로드 받을 데이터 전달 방식 (Default: 1) |
| NumberExMode | `Number` | <span class="optional">선택</span> | 실수 형태의 데이터 타입에 대한 셀서식 설정 방식 설정 (Default: 0) |
| NumberTypeToText | `Boolean` | <span class="optional">선택</span> | 숫자타입 셀 데이터를 문자 타입으로 다운로드 받을지 여부<br>숫자타입 컬럼의 일부 셀에 포맷을 변경하여 문자열을 삽입하는 경우 사용 (Default: 0) |
| NumberFormatMode | `Boolean` | <span class="optional">선택</span> | 시트의 숫자 컬럼 포맷을 숫자 서식으로 내려받을지 여부 설정<br>- `0` : 컬럼 단위 Format 기준 셀서식 설정<br>- `1` : 셀의 값 기준에 따라 정수 또는 실수 포맷형태의 셀서식 설정<br>- `2` : 일반 서식으로 설정 (별도의 셀 서식포맷을 설정하지 않음) |
| OnlyHeaderMerge | `Boolean` | <span class="optional">선택</span> | 헤더만 머지할지의 여부 (Deafult: 0) |
| PrintSetup | `Object` | <span class="optional">선택</span> | 엑셀파일에 인쇄 설정 셋팅 여부 (자세한 속성은 아래 Enum 참조) |
| ReportXMLURL | `String` | <span class="optional">선택</span> | 엑셀파일에 타이틀이나 패턴등을 별도의 xml파일을 통해 설정 |
| SheetDesign | `Number` | <span class="optional">선택</span> | 디자인 다운로드 적용 여부<br>- `0` : 셀 외곽선을 제외한 모든 디자인 적용 안함 (Default)<br>- `1` : 모든 셀 스타일을 적용<br>- `2` : 셀 외곽선을 제외한 셀 스타일을 적용<br>- `3` : 셀 외곽선 및 스타일을 모두 적용 안함 |
| SheetName | `String` | <span class="optional">선택</span> | 엑셀WorkSheet이름 (Default: "Sheet") |
| TextToGeneral | `Boolean` | <span class="optional">선택</span> | Type:”Text”의 엑셀 서식 형식 (Default: 1(일반)) |
| TitleAlign | `String` | <span class="optional">선택</span> | 타이틀 정렬 설정 (Default: "center"(중앙정렬)) |
| TitleText | `String` | <span class="optional">선택</span> | IBSheet 위쪽에 제목이나 기타 자료들의 문자열 설정<br>컬럼 구분자 \` |
| URL | `String` | <span class="optional">선택</span> | 엑셀 데이터를 생성할 페이지 (Default: "")(사용안함) |
| UserMerge | `String` | <span class="optional">선택</span> | 해당 영역에 대한 머지처리 (Default: "")(사용안함)<br>![s](/assets/imgs/ibsheet7-usermerge.png) |
| WordWrap | `Boolean` | <span class="optional">선택</span> | 줄바꿈 처리 여부 (Default: 1(줄바꿈 허용)) |
| FreezePane | `Number` | <span class="optional">선택</span> | 틀고정 다운로드 옵션<br>- `1` : 헤더 고정<br>- `2` : FrozenCol 고정<br>- `3` : 헤더 + FrozenCol 고정<br>- `4` : FrozenRow 고정<br>- `5` : FrozenRow + FrozenCol 고정 |
| ReqHeader | `Boolean` | <span class="optional">선택</span> | Request Header에 사용자가 지정한 헤더 정보를 설정합니다. 이 인자를 설정하면 UseXhr을 true로 설정한 것과 동일하게 동작합니다. |
| UseXhr | `Boolean` | <span class="optional">선택</span> | iframe를 통한 form submit 방식으로 통신하는 기존 방식과 다르게 엑셀 다운로드시 통신 방식을 xhr로 설정합니다. <br>프레임웍의 각종 보안처리로 인하여 iframe를 사용할 수 없다거나 Cookie(파일 다운로드 완료 후 화면의 대기이미지 닫을 때 필요)를 읽고 쓸수 없을 때 이 속성을 true로 설정해주세요. |

### Enum

* PrintSetup

| Name | Type | Required | Description |
|------|------|----------|-------------|
| PageSize | `String` | <span class="optional">선택</span> | 용지 사이즈를 설정 |
| LandSacpe | `Boolean` | <span class="optional">선택</span> | 용지 방향을 설정, true는 가로, false는 세로 |
| AutoBreak | `Boolean` | <span class="optional">선택</span> | 페이지를 나눌 때 셀 잘림 여부 |
| FitToPage | `Boolean` | <span class="optional">선택</span> | 용지 내에 페이지를 맞춰서 인쇄할 때 사용 |
| FitWidth | `Boolean` | <span class="optional">선택</span> | 페이지 내에 열 맞춤 설정, true로 설정 시 FittoPage(true); 와 FitHeight(false); 를 함께 설정 |
| FitHeight | `Boolean` | <span class="optional">선택</span> | 페이지 내에 행 맞춤 설정, true로 설정 시 FittoPage(true); 와 FitWidth(false); 를 함께 설정 |
| ColorPrint | `Boolean` | <span class="optional">선택</span> | 컬러 인쇄 여부를 설정, 기본값은 true이고 false로 설정하면 흑백인쇄 모드 |
| TopMargin | `Number` | <span class="optional">선택</span> | 위쪽 여백을 cm 단위로 설정 |
| BottomMargin | `Number` | <span class="optional">선택</span> | 아래쪽 여백을 cm 단위로 설정 |
| HeaderMargin | `Number` | <span class="optional">선택</span> | 머리글 부분의 여백을 cm 단위로 설정 |
| FooterMargin | `Number` | <span class="optional">선택</span> | 꼬리글 부분의 여백을 cm 단위로 설정 |
| LeftMargin | `Number` | <span class="optional">선택</span> | 왼쪽 여백을 cm 단위로 설정 |
| RightMargin | `Number` | <span class="optional">선택</span> | 오른쪽 여백을 cm 단위로 설정 |

### Returns

**_none_**

### Example

```javascript
// 엑셀로 내려 받기
mySheet.Down2Excel();

// 파일명을 excel2로 하고 워크시트명은 sheet-test 로 정의하여 내려 받기
mySheet.Down2Excel({"FileName":"excel2", "SheetName":"sheet-test"});

//시트 색상과 머지를 모두 반영하며, 콤보는 코드로, 체크는 Y/N으로 다운로드 받되, 헤더와 합계는 제외하고 컬럼은 왼쪽에서 3개의 컬럼만 다운로드 한다.
mySheet.Down2Excel({
  "SheetDesign": 1,
  "Merge": 1,
  "DownCombo": "CODE",
  "CheckBoxOnValue": "Y",
  "CheckBoxOffValue": "N",
  "DownRows": "",
  "DownCols": "0|1|2",
  "DownHeader": 0,
  "DownSum": 0
});
```

### Since

| version | desc |
|---------|------|
| 7.0.0.0 |  |
| 7.0.2.0 | AllTypeToText 속성 추가 |
| 7.0.13.11 | AppendPrevSheet 속성 추가 |
| 7.0.13.26 | NumberFormatMode 속성 추가 |
| 7.0.13.89 | Mode 속성 추가 |
| 7.0.13.94 | NumberExMode 속성 추가 |
| 7.0.13.110 | ExcelHeaderRowHeight 속성 추가 |
| 7.0.13.111 | PrintSetup 속성 추가 |
| 7.0.13.121 | ExcludeFooterRow 속성 추가 |
| 7.0.13.218 | FreezePane 속성 추가<br>클라이언트 모듈 : 7.0.0.37-20230511-16<br>서버모듈 : ibsheet7-2.1.6.jar |
| 7.0.13.230 | ReqHeader, UseXhr 속성 추가 |
| 7.0.13.245 | ExcelFontFamily 속성 추가 |

