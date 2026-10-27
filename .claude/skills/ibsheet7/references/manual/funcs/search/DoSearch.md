# DoSearch ***(search method)***

> Ajax 통신을 이용하여 규격에 맞는 `xml` 또는 `json` 형식의 데이터를 시트에 로드 합니다.

### Syntax
```javascript
ObjId.DoSearch(PageUrl, Param, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|PageUrl|`String`|<span class="required">필수</span>|서버에 요청할 페이지 url (조회 XML 페이지 파일 이름)|
|Param|`String`|<span class="optional">선택</span>|조회 조건 Query String or JSON (Default: "")|
|Opt|`Object`|<span class="optional">선택</span>|조회 처리 옵션|
|Opt.Append|`Boolean`|<span class="optional">선택</span>|Append 조회 여부 (Default: 0)|
|Opt.AppendRow|`Number`|<span class="optional">선택</span>|Append 조회 시 데이터를 붙여넣을 위치 설정|
|Opt.CallBack|`Function`|<span class="optional">선택</span>|조회 후 사용자 정의 콜백함수|
|Opt.Fx|`Boolean`|<span class="optional">선택</span>|포맷팅된 데이터 조회 처리 여부 (Default: 0)|
|Opt.ReqHeader|`Object`|<span class="optional">선택</span>|요청헤더 설정 값 객체 (Default: {})|
|Opt.Sync|`Boolean`|<span class="optional">선택</span>|동기 조회 여부<br>- `0` : 비동기 방식 (Default)<br>- `1` :	비동기 순차 처리 방식<br>- `2` :	동기 방식|



### Returns
***none***

### Example
```javascript
// 일반 조회
mySheet.DoSearch('data.jsp', 'p1=aa&p2=bb');

// 동기 방식 조회
mySheet.DoSearch('data.jsp', 'p1=aa&p2=bb', {
  "Sync": 2
});

// Append 조회
mySheet.DoSearch('data.jsp', 'p1=aa&p2=bb', {
    "Append": 1
});

// 요청 헤더 설정
mySheet.DoSearch('data.jsp', 'p1=aa&p2=bb', {
  "ReqHeader": {
    "ReqHeaderKey": "ReqHeaderValue"
  }
});

// param JSON 구조 사용
mySheet.DoSearch('data.jsp', {"p1":100, "p2":"bb"}, {"ReqHeader":{"Content-Type":"application/json"}});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.164|Param JSON 구조 추가|