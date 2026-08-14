# DoSearchChild ***(search method)***

> 트리 구조의 시트에서 Ajax 통신을 이용하여 규격에 맞는 xml 또는 Json 형식의 데이터를 대상 행의 자식 데이터로 로드합니다. <br>
> 이 기능을 사용하기 위해서는 대상 행의 트리 펼침시 발생하는 [OnTreeChild](/docs/funcs/tree/OnTreeChild) 이벤트 내애서 사용하여야 합니다.


### Syntax
```javascript
ObjId.DoSearchChild(Row, PageUrl, [Param], [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|`OnTreeChild` 이벤트에서 받은 행의 Index|
|PageUrl|`String`|<span class="required">필수</span>|서버에 요청할 페이지 url|
|Param|`String`|<span class="optional">선택</span>|조회 조건 Query String (Default: "")|
|Opt|`Object`|<span class="optional">선택</span>|조회 처리 옵션|
|Opt.ReqHeader|`Object`|<span class="optional">선택</span>|요청헤더 설정 값 객체 (Default: {})|
|Opt.Sync|`Boolean`|<span class="optional">선택</span>|동기 조회 여부<br>- `0` : 비동기 방식 (Default)<br>- `1` :	비동기 순차 처리 방식<br>- `2` :	동기 방식|
|Opt.Wait|`Boolean`|<span class="optional">선택</span>|대기 이미지 표시 여부 (Default: 1)|
|Opt.SortCol|`String`|<span class="optional">선택</span>|데이터 로드시 Sort 대상 기준 컬럼의 Index 또는 SaveName을 구분자로 연결한 문자열|
|Opt.SortOrder|`String`|<span class="optional">선택</span>|컬럼에 대한 기본 Sort 정렬 방식을 구분자로 연결한 문자열 (asc: 오름차순, desc: 내림차순)|


### Returns
***none***

### Example
```javascript
// OnTreeChild 이벤트에서 자식 데이터 로드
function mySheet_OnTreeChild(row) {
  var url = '',
    colData = mySheet.GetCellValue(row, 4);

  switch(colData) {
    case 'seoul':
      url = 'childdata_seoul.jsp';
      break;

    case 'inchon':
      url = 'childdata_inchon.jsp';
      break;
  }

  mySheet.DoSearchChild(row, url, '', {
    Wait: 1
  });
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||