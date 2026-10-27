# 조회 DATA 요소 ***(Data Structure)***

> 조회된 데이터 영역을 의미하는 요소로 이 요소 안의 데이터를 조회된 데이터로 표현합니다.<br>
> 이 요소의 Value 값은 배열로 구성되며 하나의 배열 요소가 행 단위 데이터를 의미 합니다.



## Info

* 내부적으로 사용하는 키값

|Key|Description|
|---|-----------|
|BackColor|해당 행의 배경색상|
|Drag|해당행의 Drag 허용 여부 (Default: 1)|
|Edit|해당 행의 Edit 허용 여부|
|Expand|해당 행의 자식 레벨 데이터를 펼칠것인지 여부|
|FontColor|해당 행의 폰트색상|
|HaveChild|트리 형태일 때 해당 행의 Child 데이터가 있으면서 조회하지 않는 경우 사용, 나중에 OnTreeChild Event가 발생할 수 있는 행 설정|
|Hidden|해당 행의 숨김 여부|
|Level|트리 형태일 때 행의 트리레벨 설정 (UseJsonTreeLevel 속성을 사용하는 경우)|
|Merge|해당 행의 RowMerge 허용 여부|
|Sum|해당 행의 합계 계산 허용 여부|

* 셀별 속성

|Name|Description|
|---|------------|
|Align|정렬 설정|
|BackColor|해당 셀의 배경색상|
|ComboCode|콤보타입일경우 해당셀의 콤보 코드값을 설정|
|ComboText|콤보타입일경우 해당셀의 콤보 텍스트값을 설정|
|Cursor|마우스 커서 설정 여부|
|ClassName|Class 명 설정(Type: "Button" 컬럼만 가능)|
|Edit|해당 셀의 Edit 허용 여부 |
|FontBold|Bold 설정 여부|
|FontColor|해당 셀의 폰트색상|
|FontItalic|기울이기 설정 여부|
|FontStrike|취소선 설정 여부|
|FontUnderline|밑줄 설정 여부|
|Image|해당 셀의 이미지 경로 (ImageList 인덱스 사용가능)|
|ToolTip|표시할 풍선도움말 문자열|
|TreeCheck|트리 컬럼의 체크박스 값|


## Example
```json
// 일반 순차 조회의 경우
{
  Data:[
    {BackColor:"#FF0000", FontColor:"#FFFF00", Edit:"0", C1: "", C2: "006", C3: "홍길동", C4: "10000", C5: "20030201"},
    {C1:"",C2:"006",C3:"홍길동","C3#BackColor":"#FF0000", "C3#FontColor":"#00FF00", "C3#Edit":"0", C4: "10000", C5: "20030201"},
    …
  ]
}

// SaveName 매핑 조회
{
  Data:[
    { BackColor:"#FF0000", FontColor:"#FFFF00", Edit:"0", "sStatus": "", "sCode": "006", "sName": "홍길동", "sRank": "10000", "sDate": "20030201"},
    {"sStatus": "", "sCode": "006", "sName": "홍길동", "sName#BackColor":"#FF0000", "sName#FontColor":"#00FF00", "sName#Edit":"0", "sRank": "10000", "sDate": "20030201", “sDate#ClassName”:”myClass”},
    …
  ]
}
```