# ShowCalendar ***(core method)***

> 현재 선택된 셀에서의 달력 팝업을 출력합니다. <br>
> `제약사항` 데이터 타입이 `Text` 이고, `날짜 포맷` 형태를 사용하는 셀에서만 사용이 가능합니다.

### Syntax
```javascript
ObjId.ShowCalendar();
```

### Info
***none***



### Returns
***none***

### Example
```javascript
// 데이터 타입이 `Text` 이고, 날짜 포맷 형태를 사용하는 Index가 3인 컬럼에서 onclick 시 달력 팝업 출력
function mySheet_OnClick(row, col) {
  if (col === 3) {
    mySheet.ShowCalendar();
  }
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||