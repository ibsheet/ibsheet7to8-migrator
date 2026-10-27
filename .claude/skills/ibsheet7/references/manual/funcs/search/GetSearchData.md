# GetSearchData ***(search method)***

> Ajax 통신을 이용하여 시트에 로드할 데이터를 받아서 반환합니다. <br>
> 반환된 데이터를 복호화 등의 가공 처리후 `LoadSearchData` 메소드를 통해 데이터를 로드 할 수 있습니다. [LoadSearchData](/docs/funcs/search/LoadSearchData) <br>
> 이 기능을 사용시 Ajax 통신은 `동기` 방식으로 처리 됩니다.

### Syntax
```javascript
ObjId.GetSearchData(PageUrl, Param, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|PageUrl|`String`|<span class="required">필수</span>|서버에 요청할 페이지 url|
|Param|`String`|<span class="optional">선택</span>|조회 조건 Query String or JSON (Default: "")|
|Opt|`Object`|<span class="optional">선택</span>|조회 처리 옵션|
|Opt.ReqHeader|`Object`|<span class="optional">선택</span>|요청헤더 설정 값 객체 (Default: {})|


### Returns
***String, 서버 응답 결과 문자열***

### Example
```javascript
// 로드 대상 데이터 받기
var data = mySheet.GetSearchData('data.jsp', 'p1=aa&p2=bb');

// 데이터 가공
data = decryptionData(data); // 사용자정의 함수

// 가공된 데이터 로드
mySheet.LoadSearchData(data);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||