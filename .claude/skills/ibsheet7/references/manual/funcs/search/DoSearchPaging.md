# DoSearchPaging ***(search method)***

> 서버 페이징 방식과 같이 시트의 세로 스크롤 Position 에 해당하는 데이터에 대한 부분 데이터를 시트에 로드 합니다.<br>
> 스크롤의 위치를 변경할 때마다 인자로 설정된 Url이 호출되며 데이터를 해당 위치에 표현합니다. <br>
> `NextPageCall` 속성이 설정되어 있는경우 설정된 시점에 설정된 Url이 호출됩니다. [NextPageCall 참고](/docs/props/PropertyList/NextPageCall) <br>
> 전체 스크롤 사이즈는 조회 데이터의 `Total` 속성 값을 따르며, 조회된 데이터의 구조에 Total 값이 `반드시 있어야` 합니다. [조회TOTAL요소 참고](/docs/static/JSON/total1)<br>
> 해당 기능으로 조회시 Row 및 Cell의 속성, 멀티 트랜잭션 기능 사용에 `제약`이 있습니다.<br>
> `참고 ` 이 메소드를 사용하고자 하는 경우 `SetConfig`에서 `SearchMode: 3 혹은 4`로 설정되어 있어야 합니다.

### Syntax
```javascript
ObjId.DoSearchPaging(Url, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Url|`String`|<span class="required">필수</span>|서버에 요청할 페이지 url|
|Opt|`Object`|<span class="optional">선택</span>|조회 처리 옵션|
|Opt.PageParam|`String`|<span class="optional">선택</span>|페이지 인덱스를 받을 변수명 (Default: "ibpage")|
|Opt.Param|`String`|<span class="optional">선택</span>|조회 조건 Query String or JSON (Default: "")|
|Opt.OrderbyParam|`String`|<span class="optional">선택</span>|헤더 정렬 정보를 받을 변수명 (Default: "iborderby")<br> 값은 "SIDO|SIGUNGU ^ASC|DESC" 와 같이 savename 과 정렬 방향이 "^"로 구분되며 각 이름은 `|`로 구분|
|Opt.UseWaitImage|`Boolean`|<span class="optional">선택</span>|WaitImageVisible 설정이 true 일때  2페이지 이상 조회시 대기 이미지 표시 여부 (Default: 0)|
|Opt.ReqHeader|`Object`|<span class="optional">선택</span>|요청헤더 설정 값 객체 (Default: {})|
|Opt.Sync|`Boolean`|<span class="optional">선택</span>|동기 조회 여부<br>- `0` : 비동기 방식 (Default)<br>- `1` :	비동기 순차 처리 방식<br>- `2` :	동기 방식|
|Opt.CPage|`Number`|<span class="optional">선택</span>|특정 페이지를 기준으로 조회|

### Returns
***none***

### Example
```javascript
// SetConfig 에서 SearchMode 설정
mySheet.SetConfig({
  "SearchMode": 3
});

// 조회 처리
mySheet.DoSearchPaging('data.jsp', 'p1=aa&p2=bb');

// Param JSON 구조로 설정
var param = { "Param":{"p1":100, "p2":"aa"} , "ReqHeader":{"Content-Type":"application/json"}  };
mySheet.DoSearchPaging('data.jsp', param);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.151|CPage 속성 추가|
|7.0.13.157|Param JSON 구조 추가|
