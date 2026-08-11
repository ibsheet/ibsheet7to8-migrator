# Down2Text ***(export method)***

> IBSheet의 내용을 텍스트 파일로 변환하여 다운로드 합니다.

### Syntax
```javascript
ObjId.Down2Text([parameters]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|FileName|`String`|<span class="optional">선택</span>|저장할 파일 명 (Default: "Test.txt")|
|RowDelim|`String`|<span class="optional">선택</span>|행 자료 사이에 표시될 레코드 구분자 (Default :`\n` (엔터 형식))|
|ColDelim|`String`|<span class="optional">선택</span>|셀 자료 사이에 표시될 컬럼 구분자 (Default: "" (공백 형식))|
|DownRows|`String`|<span class="optional">선택</span>|다운로드 받을 행들을 | 로 연결 (Default: ""(모두 받음))|
|DownCols|`String`|<span class="optional">선택</span>|다운로드 받을 열들을 | 로 연결 (Default: ""(모두 받음))|
|DownHeader|`Boolean`|<span class="optional">선택</span>|헤더의 다운로드 여부 (Default: 1)
|DownSum|`Boolean`|<span class="optional">선택</span>|합계의 다운로드 여부 (Default: 1)
|DownCombo|`String`|<span class="optional">선택</span>|콤보의 TEXT / CODE 형태의 다운로드 여부 (Default: "TEXT")
|ExtendParam|`String`|<span class="optional">선택</span>|서버로 전달해야 하는 내용이 있는 경우 Get 방식의  QueryString으로 연결하여 설정 (Default: "")
|DownTreeHide|`Boolean`|<span class="optional">선택</span>|트리의 접혀진 행 다운 여부 (Default: 0 (다운 안받음))
|ReqHeader|`Boolean`|<span class="optional">선택</span>|Request Header에 사용자가 지정한 헤더 정보를 설정합니다. 이 인자를 설정하면 UseXhr을 true로 설정한 것과 동일하게 동작합니다.|
|UseXhr|`Boolean`|<span class="optional">선택</span>|iframe를 통한 form submit 방식으로 통신하는 기존 방식과 다르게 다운로드시 통신 방식을 xhr로 설정합니다. <br> 프레임웍의 각종 보안처리로 인하여 iframe를 사용할 수 없다거나 Cookie(파일 다운로드 완료 후 화면의 대기이미지 닫을 때 필요)를 읽고 쓸수 없을 때 이 속성을 true로 설정해주세요.|


### Returns
***none***

### Example
```javascript
// 텍스트 파일로 내려 받기
mySheet.Down2Text();

// 다운로드할 파일명을 text로 정의하여다운로드 받는다.
mySheet.Down2Text({FileName:"text" });

// 콤보는 코드로 받고, 헤더와 합계는 제외하고 컬럼은 왼쪽에서 3개의 컬럼만 다운로드 한다.
mySheet.Down2Text({DownCombo:"CODE", DownRows:"", DownCols:"0|1|2", DownHeader:0, DownSum:0});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.230|ReqHeader, UseXhr 속성 추가|