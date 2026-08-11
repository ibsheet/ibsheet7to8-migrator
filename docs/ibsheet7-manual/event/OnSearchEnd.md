# OnSearchEnd ***(event)***

> 조회 함수를 이용하여 조회 처리를 완료하고, 내부적인 처리를 마친 후 이벤트가 발생합니다. <br>
> 조회 중 오류 메시지가 발생한 경우 이벤트 인자인 code로 설정되므로, code가 0보다 작은 경우 오류 처리 로직을 작성하여 처리합니다. <br>
> `Response` 인자는 서버에서 정상적으로 처리 되지 않은 경우에만 전달됩니다. (HTTP 응답코드가 100 보다 작거나 400보다 큰 경우에만 전달)


### Syntax
```javascript
function 오브젝트ID_OnSearchEnd(Code, Msg, StCode, StMsg, [Response]) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Code|`Long`|처리결과 코드(0 이상이면 정상, 그외는 오류 처리)<br><span style="color:blue;">-3</span> : 요청 Url이 잘못된 경우나 네트워크 오류 등으로 결과를 받지 못한 경우<br><span style="color:blue;">-4</span> : 정상적인 응답은 받았으나 데이터 파싱처리중 오류가 발생한 경우(대부분 데이터 이상)<br><span style="color:blue;">-5</span> : 응답 결과가 빈값인 경우<br><span style="color:blue;">-6</span> : 서버에 연결하여 응답을 대기하는 시간이 초과된 경우(WaitTimeOut 초과)<br><span style="color:blue;">그외</span> : 사용자 정의 코드|
|Msg|`String`|처리결과 메시지|
|StCode|`Integer`|HTTP 응답 코드|
|StMsg|`String`|HTTP 응답 메시지|
|Response|`String`|서버 응답 결과|


### Example
```javascript
function mySheet_OnSearchEnd(code, message) {
  if(code == 0) {
    alert(message);
    //조회 후 작업 수행
  } else {
    alert("조회 중에 오류가 발생하였습니다..");
  }
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.30|Response 인자 추가|