# LoadSearchData ***(search method)***

> 규격에 맞는 xml 또는 Json 형식의 데이터를 시트에 로드 합니다. <br>
> 데이터 형식이 Json 구조인 경우 객체 또는 형태의 문자열 모두 사용 할 수 있습니다. <br>
> CallBack 함수를 설정한 경우 `OnSearchEnd` 이벤트 이전에 CallBack 함수가 호출 됩니다.

### Syntax
```javascript
ObjId.LoadSearchData(Content, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Content|`String`|<span class="required">필수</span>|규격에 맞는 조회 xml 또는 json 형식의 데이터 객체 또는 문자열|
|Opt|`Object`|<span class="optional">선택</span>|조회 처리 옵션|
|Opt.Append|`Boolean`|<span class="optional">선택</span>|Append 조회 여부 (Default: 0)|
|Opt.AppendRow|`Number`|<span class="optional">선택</span>|Append 조회 시 데이터를 붙여넣을 위치 설정|
|Opt.CallBack|`Function`|<span class="optional">선택</span>|CallBack 함수|
|Opt.Event|`Boolean`|<span class="optional">선택</span>|완료 이벤트 발생 여부 (Default: 1)|
|Opt.Fx|`Boolean`|<span class="optional">선택</span>|포맷팅된 데이터 조회 처리 여부 (Default: 0)|
|Opt.Sync|`Boolean`|<span class="optional">선택</span>|동기 조회 여부 (Default: 0)|
|Opt.Wait|`Boolean`|<span class="optional">선택</span>|대기 이미지 표시 여부 (Default: 1)<br>동기 조회인 경우에는 설정값에 상관없이 대기 이미지를 표시하지 않음|



### Returns
***none***

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
|7.0.5.4|Fx:2 옵션 추가|
|7.0.6.0|대기이미지 표시여부 속성 추가 (Wait)|
|7.0.13.43|CallBack, Event 속성 추가|
