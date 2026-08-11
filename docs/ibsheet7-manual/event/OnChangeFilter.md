# OnChangeFilter ***(event)***

> 필터행의 셀의 값을 바꾸거나 옵션이 변경되었을 때 이벤트가 발생합니다.<br>
> 사용자의 값 변경외에도, `SetFilterOption` 함수를 이용했을때도 이벤트가 발생하게 됩니다.



### Syntax
```javascript
function 오브젝트ID_OnChangeFilter() { }
```

### Parameters
***none***



### Example
```javascript
//SearchMode:3 일때 필터링 조건이 변경된 경우 조회
function mySheet_OnChangeFilter() {
    // 필터행 QueryString 문자열로 변환
    var fp = mySheet.GetFilterParam(0, 1);
    var info = {PageParam:"page", Param:"id=ibleaders&seq=1&"+fp};
    mySheet.DoSearchPaging("list.jsp", info);
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||