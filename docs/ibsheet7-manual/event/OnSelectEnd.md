# OnSelectEnd ***(event)***

> 마우스 드래그 또는 키 입력으로 셀 영역 선택 완료 시점에 이벤트가 발생 합니다.


### Syntax
```javascript
function 오브젝트ID_OnSelectEnd(Rows, Cols) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Rows|`String`|선택된 행의 Index를 구분자 `"|"`로 연결한 문자열|
|Cols|`String`|선택된 컬럼의 Index를 구분자 `"|"`로 연결한 문자열|



### Example
```javascript
function mySheet_OnSelectEnd(Rows, Cols) {
  console.log("SelectedRows:", Rows, "SelectedCols", Cols);
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.13.26||