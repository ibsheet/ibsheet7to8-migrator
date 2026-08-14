# DoRowSearch ***(search method)***

> 특정 행의 셀 데이터를 조회 합니다.

### Syntax
```javascript
ObjId.DoRowSearch(Row, PageUrl, Param, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|
|PageUrl|`String`|<span class="required">필수</span>|서버에 요청할 페이지 url|
|Param|`String`|<span class="optional">선택</span>|조회 조건 Query String (Default: "")|
|Opt|`Object`|<span class="optional">선택</span>|조회 처리 옵션|
|Opt.ReqHeader|`Object`|<span class="optional">선택</span>|요청헤더 설정 값 객체 (Default: {})|
|Opt.Sync|`Boolean`|<span class="optional">선택</span>|동기 조회 여부<br>- `0` : 비동기 방식 (Default)<br>- `1` :	비동기 순차 처리 방식<br>- `2` :	동기 방식|
|Opt.Wait|`Boolean`|<span class="optional">선택</span>|대기 이미지 표시 여부 (Default: 1)|


### Returns
***none***

### Example
```javascript
//3컬럼의 데이터가 바뀌었을 때 해당 행의 데이터를 DB에서 읽어옴
function mySheet_OnChange(Row, Col, Value) {
  if (Col == 3) {
    var opt = { Wait : 1, Sync : 1 };
    mySheet.DoRowSearch(Row, "grid_rowdata.html",  "" , opt);
  }
}
// 1. 이미지 미표시, 비동기 조회
var opt = { Wait : 0, Sync : 0 };
mySheet.DoRowSearch(Row, "grid_rowdata.html",  "" , opt);

// 2. 이미지 표시, 비동기 순차처리 조회
var opt = { Wait : 1, Sync : 1 };
mySheet.DoRowSearch(Row, "grid_rowdata.html",  "" , opt);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||