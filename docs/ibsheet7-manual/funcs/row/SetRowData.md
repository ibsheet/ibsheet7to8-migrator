# SetRowData ***(row method)***

> 행 단위별 데이터를 설정 합니다. <br>
> 2개행 이상의 단위데이터행 구조인 경우 단위데이터행 전체를 설정 합니다.

### Syntax
```javascript
ObjId.SetRowData(Row, Data, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 또는 추가할 위치의 Row Index|
|Data|`Object or String`|<span class="required">필수</span>|Json 형태의 행 데이터 객체 또는 문자열|
|Opt|`Object`|<span class="optional">선택</span>|설정 옵션 객체|
|Data|`Object or String`|<span class="required">필수</span>|Json 형태의 행 데이터 객체 또는 문자열|
|Opt.Add|`Boolean`|<span class="optional">선택</span>|행 추가 여부 (Default: 0)|
|Opt.Level|`Number`|<span class="optional">선택</span>|트리구조에서 행 추가인 경우 추가될 행의 트리 레벨 값|
|Opt.Event|`Boolean`|<span class="optional">선택</span>|셀값 변경시 OnChange 이벤트 발생 여부 (Default: 1)|
|Opt.StatusMode|`Number`|<span class="optional">선택</span>|상태값 처리 모드<br>- `0` : 대상 행의 상태값을 변경하지 않음<br>- `1` : 인자의 상태값을 무시하고 대상 행의 데이터 변경에 따른 상태값 처리<br>- `2` : 인자의 상태값을 그대로 적용|




### Returns
***none***

### Example
```javascript
//1행을 해당 json 객체로 설정
var data = {sName:"홍길동", sAge:20};
mySheet.SetRowData(1, data);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||