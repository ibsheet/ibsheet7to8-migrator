# DirectDown2Excel ***(export method)***

> 서버에서 데이터를 구성한 후 엑셀을 다운로드 합니다.<br>
> 헤더타이틀이나 각 컬럼의 서식(포맷)정보만 서버로 전달하고, 데이터 부분은 별도의 페이지(혹은 서블릿)를 통해 데이터를 java.util.List(java.util.Map) 구조로 생성하여 "SHEETDATA"라는 이름으로 request객체에 담아 `DirectDown2Excel.jsp` 파일에 전달하면 헤더 정보와 데이터를 조합하여 엑셀 파일을 다운 받습니다.

### Syntax
```javascript
ObjId.DirectDown2Excel([parameters]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|AllTypeToText|`Boolean`|<span class="optional">선택</span>|날짜 데이터를 날짜 서식으로 다운로드 받을지 여부 (Default: 0)|
|AppendPrevSheet|`Boolean`|<span class="optional">선택</span>|Buffer 모드 사용시 이전 워크시트에 Append 적용 여부 (Default: 0)|
|AutoSizeColumn|`Boolean`|<span class="optional">선택</span>|컬럼 넓이 자동 조절 여부 (Default: 0(컬럼 넓이 자동 조절 안함))|
|ComboValidation|`Boolean`|<span class="optional">선택</span>|콤보의 드롭다운 형식 다운로드 여부 (Defualt: 0)|
|DownCols|`String`|<span class="optional">선택</span>|다운로드 받을 열들을 `|` 로 연결 (Default: "")(사용안함)|
|DownCombo|`String`|<span class="optional">선택</span>|콤보의 TEXT/CODE 형태의 다운로드 여부 (Default: "TEXT")|
|DownHeader|`Boolean`|<span class="optional">선택</span>|헤더의 다운로드 여부 (Default: 1)|
|ExcelFontSize|`Number`|<span class="optional">선택</span>|폰트 크기 설정 (Default: 0)|
|ExcelHeaderRowHeight|`String`|<span class="optional">선택</span>|헤더 높이 설정 (Default: "")(사용안함)|
|ExcelRowHeight|`String`|<span class="optional">선택</span>|엑셀의 행높이 설정 (Default: "")(사용안함)|
|ExtendParam|`String`|<span class="optional">선택</span>|서버로 전달할 추가 파라미터<br>Get방식의 QueryString으로 연결하여 설정 (Default: "")(사용안함)|
|ExtendParamMethod|`String`|<span class="optional">선택</span>|ExtendParam인자의 전송 방식 (Default: GET)|
|FileName|`String`|<span class="optional">선택</span>|저장할 파일 명 (Default: "Excel.xls")|
|HiddenColumn|`Boolean`|<span class="optional">선택</span>|열숨김 반영 여부 (Default: 0)|
|KeyFieldMark|`Boolean`|<span class="optional">선택</span>|KeyField 마크(*)를 다운 여부 (Default: 1(다운 받음))|
|Mode|`Number`|<span class="optional">선택</span>|다운로드 모드<br>- `-1`: Status, Delcheck, Result 타입 및 Hidden 칼럼을 제외하고 다운로드<br>- `0` : 모든 컬럼을 다운로드<br>- `1` : Status, DelCheck 타입을 제외하고 다운로드<br>- `2` : Hidden컬럼을 제외하고 다운로드|
|Merge|`Number`|<span class="optional">선택</span>|헤더의 머지의 다운로드 적용 방식 설정<br>- `0` : 사용 안함<br>- `1` : 사용함(셀 병합시 부속셀의 값 설정 함)<br>- `2` : 사용함(셀 병합시 부속셀의 값은 설정하지 않음)|
|Multipart|`Boolean`|<span class="optional">선택</span>|다운로드 받을 데이터 전달 방식 (Default: 1)|
|NumberFormatMode|`Number`|<span class="optional">선택</span>|실수 형태의 데이터 타입에 대한 셀서식 설정 방식 설정<br>- `0` : 컬럼 단위 Format 기준 셀서식 설정 (Default)<br>- `1` : 셀의 값 기준에 따라 정수 또는 실수 포맷형태의 셀서식 설정<br>- `2` : 일반 서식으로 설정 (별도의 셀 서식포맷을 설정하지 않음)|
|NumberTypeToText|`Boolean`|<span class="optional">선택</span>|숫자타입 셀 데이터를 문자 타입으로 다운로드 받을지 여부<br>숫자타입 컬럼의 일부 셀에 포맷을 변경하여 문자열을 삽입하는 경우 사용 (Default: 0)|
|ReportXMLURL|`String`|<span class="optional">선택</span>|엑셀파일에 타이틀이나 패턴등을 별도의 xml파일을 통해 설정|
|SheetDesign|`Number`|<span class="optional">선택</span>|디자인 다운로드 적용 여부<br>- `0` : 셀 외곽선을 제외한 모든 디자인 적용 안함 (Default)<br>- `1` : 모든 셀 스타일을 적용<br>- `2` : 셀 외곽선을 제외한 셀 스타일을 적용<br>- `3` : 셀 외곽선 및 스타일을 모두 적용 안함|
|SheetName|`String`|<span class="optional">선택</span>|엑셀WorkSheet이름 (Default: "Sheet")|
|TextToGeneral|`Boolean`|<span class="optional">선택</span>|Type:”Text”의 엑셀 서식 형식 (Default: 1(일반))|
|TitleAlign|`String`|<span class="optional">선택</span>|타이틀 정렬 설정 (Default: "center"(중앙정렬))|
|TitleText|`String`|<span class="optional">선택</span>|IBSheet 위쪽에 제목이나 기타 자료들의 문자열 설정<br>컬럼 구분자 `|`로 연결, 행 구분자 `\r\n`로 연결, 해당 셀안에서 줄바꿈처리를 하려면 `\r` 또는 `\n`을 설정 (Default: "")(사용안함)<br>![s](/assets/imgs/ibsheet7_titletext.png)|
|URL|`String`|<span class="optional">선택</span>|엑셀 데이터를 생성할 페이지 (Default: "")(사용안함)|
|UserMerge|`String`|<span class="optional">선택</span>|해당 영역에 대한 머지처리 (Default: "")(사용안함)<br>![s](/assets/imgs/ibsheet7-usermerge.png)|
|WordWrap|`Boolean`|<span class="optional">선택</span>|줄바꿈 처리 여부(Default: 1)(줄바꿈 허용)|
|ReqHeader|`Boolean`|<span class="optional">선택</span>|Request Header에 사용자가 지정한 헤더 정보를 설정합니다. 이 인자를 설정하면 UseXhr을 true로 설정한 것과 동일하게 동작합니다.|
|UseXhr|`Boolean`|<span class="optional">선택</span>|iframe를 통한 form submit 방식으로 통신하는 기존 방식과 다르게 엑셀 다운로드시 통신 방식을 xhr로 설정합니다. 프레임웍의 각종 보안처리로 인하여 iframe를 사용할 수 없다거나 Cookie(파일 다운로드 완료 후 화면의 대기이미지 닫을 때 필요)를 읽고 쓸수 없을 때 이 속성을 true로 설정해주세요.|



### Returns
***none***

### Example
```javascript
// DirectDown2Excel 순서
// 1. DirectDown2Excel 메소드 호출 -> 2. DB 조회 -> 3. "SHEETDATA를 담아 DirectDown2Excel.jsp페이지로 전달" -> 4. DirectDown2Excel.jsp에서 엑셀 다운

// 시트 화면 페이지
// 1. DirectDown2Excel 메소드 호출
var param = {
  URL:"/bussinessList.jsp",
  ExtendParam:"sa_nm=양진열&sa_no=980123",
  FileName:"PersonList.xls"
};
mySheet.DirectDown2Excel(param);

// bussinessList.jsp 페이지
// 2. 엑셀로 내려질 데이터를 DB에서 조회
String sa_name = request.getParameter("sa_nm");
String sa_no = request.getParameter("sa_no");

String query = "SELECT POSTNO, SIDO, SIGUNGU, LEE, ADDRESS FROM POSTNO";
Class.forName(driver);
conn = DriverManager.getConnection(url,id,pwd);
pstmt = conn.prepareStatement(query);
rs = pstmt.executeQuery();

// 3. 데이터를 List(Map)형태로 전환.
// map 데이터 생성시 이름은 반드시 시트의 SaveName과 동일 해야 함.
Java.util.List li = new java.util.List();
java.util.Map mp = null;
while(rs.next()){
  mp = new Java.util.Map();
  mp.put("POSTNO",rs.getString("POSTNO"));
  mp.put("SIDO",rs.getString("SIDO"));
  ..
  ..
  li.add(mp);
}

// 데이터를 반드시 SHEETDATA라는 이름으로 담는다.
request.setAttribute("SHEETDATA", li);

// 4. DirectDown2Excel.jsp 페이지로 forwardingm
String forwardPath = "./DirectDown2Excel.jsp";
if(!"".equals(forwardPath)){
  RequestDispatcher rd = request.getRequestDispatcher(forwardPath);
  rd.forward(request,response);
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.2.0|AllTypeToText 속성 추가|
|7.0.13.26|NumberFormatMode 속성 추가|
|7.0.13.89|Mode 속성 추가|
|7.0.13.230|ReqHeader, UseXhr 속성 추가|