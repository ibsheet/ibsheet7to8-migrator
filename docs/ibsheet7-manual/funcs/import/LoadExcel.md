# LoadExcel ***(import method)***

> 엑셀 파일을 읽어 IBSheet에 로딩합니다.

### Syntax
```javascript
ObjId.LoadExcel([Opt]);
```

### Info
|Parameter|Type|Required|Description|
|-----|----|--------|-----------|
|Append|`Boolean`|<span class="optional">선택</span>|기존 데이터에 추가 여부 (Default: 0)|
|ColumnMapping|`String`|<span class="optional">선택</span>|엑셀 컬럼 번호 (Default: "")|
|EndRow|`String`|<span class="optional">선택</span>|엑셀 로딩완료 행번호 (Default: 0)|
|ExtendParam|`String`|<span class="optional">선택</span>|서버로 전달할 추가 파라메터들을 **a=1&b=2** 형태로 넣어줍니다. (Default: "")|
|FileExt|`String`|<span class="optional">선택</span>|업로드 가능한 파일 확장자 (Default: "")|
|MaxFileSize|`Number`|<span class="optional">선택</span>|최대 허용 파일 사이즈(단위:MB)|
|Mode|`String`|<span class="optional">선택</span>|로딩 방식<br> - `HeaderMatch` : 엑셀 타이틀과 시트 헤더 타이틀을 비교하여 매칭되는 컬럼에 데이터를 로딩 (Default)<br>- `NoHeader` : 엑셀 첫행부터 시트 데이터로 간주하여 데이터를 차례대로 시트에 로딩<br>- `HeaderSkip` : 엑셀 첫행부터 시트의 헤더 행 수 만큼을 헤더데이터로 간주하여 무시하고 그 다음행부터 로딩|
|SkipEmptyRow|`Boolean`|<span class="optional">선택</span>|엑셀의 빈 행 제거 (Default: 1)|
|StartRow|`String`|<span class="optional">선택</span>|엑셀 로딩 행번호 (Default: 1)|
|StartCol|`String	`|<span class="optional">선택</span>|엑셀 로딩 컬럼번호 (Default: 1)|
|UseDOM|`Boolean`|<span class="optional">선택</span>|엑셀 로딩시 DOM 기반 파싱 수행 여부 (Default: 0)<br>`true`인 경우 엑셀 파일에 `DOM 기반 파싱`을 수행하며, `false`인 경우 엑셀 파일 파싱에 `SAX방식`을 사용합니다. LoadExcel 호출시 SAX(default)파싱 방식을 사용하여 대용량처리시 메모리를 적게 사용하고 빠른처리가 되지만 엑셀파일의 데이터 파싱중 서식부분에서 오류가 생길 수 있어서 IBSheet에 로드되는 값이 다르게 표현될 수 있습니다.<br>이때 `true`를 사용하여 로드를 하는 경우 데이터 값을 그대로 표현 가능하며, 2003, 2007 형식의 엑셀간의 호환성에 유리합니다.|
|WorkSheetNo|`String`|<span class="optional">선택</span>|엑셀WorkSheet번호 (Default: 1)|
|WorkSheetName|`String`|<span class="optional">선택</span>|엑셀WorkSheet이름 (Default: "")|
|ReqHeader|`Boolean`|<span class="optional">선택</span>|Request Header에 사용자가 지정한 헤더 정보를 설정합니다. 이 인자를 설정하면 UseXhr을 true로 설정한 것과 동일하게 동작합니다.|
|UseXhr|`Boolean`|<span class="optional">선택</span>|iframe를 통한 form submit 방식으로 통신하는 기존 방식과 다르게 업로드시 통신 방식을 xhr로 설정합니다. 프레임웍의 보안처리로 인하여 iframe를 사용할 수 없을 때 이 속성을 true로 설정해주세요.|


### Returns
***none***

### Example
```javascript
// 헤더타이틀을 서로 비교하여 동일한 컬럼끼리 로딩을 하되 7행부터 9 행까지만 읽어서 로딩
mySheet.LoadExcel({Mode:"HeaderMatch",StartRow:"7",EndRow:"9"});

// IBSheet의 첫번째 컬럼에 엑셀의 5번째 컬럼의 값을 로딩하고, IBSheet 의 5번째 컬럼에 엑셀의 1번째 컬럼의 값을 로딩
mySheet.LoadExcel({ColumnMapping:"5|4|3|2|1"});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.27|MaxFileSize 속성 추가|
|7.0.13.111|FileExt 기본값 변경|
|7.0.13.114|SkipEmptyRow 속성 추가|
|7.0.13.230|ReqHeader, UseXhr 속성 추가|