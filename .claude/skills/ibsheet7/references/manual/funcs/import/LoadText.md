# LoadText ***(import method)***

> 텍스트 파일을 읽어 IBSheet에 로딩합니다.

### Syntax
```javascript
ObjId.LoadText([Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Mode|`String`|<span class="optional">선택</span>|로딩 방식<br>- `HeaderMatch` : 엑셀 타이틀과 시트 헤더 타이틀을 비교하여 매칭되는 컬럼에 데이터를 로딩 (Default)<br>- `NoHeader` : 엑셀 첫행부터 시트 데이터로 간주하여 데이터를 차례대로 시트에 로딩<br>- `HeaderSkip` : 엑셀 첫행부터 시트의 헤더 행 수 만큼을 헤더데이터로 간주하여 무시하고 그 다음행부터 로딩|
|ColSeparator|`String`|<span class="optional">선택</span>|데이터의 컬럼 구분자 (Default: `"\t"`)|
|Append|`Boolean`|<span class="optional">선택</span>|기존 데이터에 추가 여부 (Default: 0)|
|FileExt|`String`|<span class="optional">선택</span>|업로드 가능한 파일 확장자 (Default: "")|
|MaxFileSize|`Number`|<span class="optional">선택</span>|최대 허용 파일 사이즈 (단위:MB)|
|Encoding|`String`|<span class="optional">선택</span>|텍스트 문서의 인코딩 형식 지정 (Default: "")|
|ReqHeader|`Boolean`|<span class="optional">선택</span>|Request Header에 사용자가 지정한 헤더 정보를 설정합니다. 이 인자를 설정하면 UseXhr을 true로 설정한 것과 동일하게 동작합니다.|
|UseXhr|`Boolean`|<span class="optional">선택</span>|iframe를 통한 form submit 방식으로 통신하는 기존 방식과 다르게 업로드시 통신 방식을 xhr로 설정합니다. 프레임웍의 보안처리로 인하여 iframe를 사용할 수 없을 때 이 속성을 true로 설정해주세요.|


### Returns
***none***

### Example
```javascript
// 텍스트 파일로 로딩
mySheet.LoadText();

// 헤더타이틀을 서로 비교하여 동일한 컬럼끼리 로딩을 하며, 컬럼 구분자는 "\t"로 구분
mySheet.LoadText({Mode:"HeaderMatch", ColSeparator:"\t"});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.27|MaxFileSize 속성 추가<br>ColSeparator 속성 추가 (Deli 속성 대체)|
|7.0.13.64|Encoding 속성 추가|
|7.0.13.111|FileExt 기본값 변경|
|7.0.13.230|ReqHeader, UseXhr 속성 추가|