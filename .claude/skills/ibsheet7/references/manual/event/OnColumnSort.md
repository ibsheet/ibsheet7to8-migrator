# OnColumnSort ***(event)***

> `ColumnSort` 함수를 실행했을 때 콜백 함수로서 호출됩니다.


### Syntax
```javascript
function 오브젝트ID_OnColumnSort(Col, Order) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Col|`Long or String`|소트가 처리된 컬럼 인덱스<br> SortEventMode 가 1인 경우 `"|"`로 구분|
|Order|`String`|소트 방향 문자열<br> SortEventMode 가 1인 경우 `"|"`로 구분|



### Example
```javascript
function mySheet_OnColumnSort(Col, Order) {
  //ColumnSort 함수를 실행되었을 때 콜백 함수로 호출되어 실행.
  if(order == "ASC") {
    alert(col + "번째 컬럼이 오름차순으로 정렬되었습니다.");
  } else {
    alert(col + "번째 컬럼이 내림차순으로 정렬되었습니다.");
  }
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.13.106||