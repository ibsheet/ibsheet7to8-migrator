# SetWaitTimeOut ***(core method)***

> 조회, 저장 등 서버의 응답을 받는 경우 대기할 응답 대기 시간을 설정합니다.<br>
> 설정한 대기 시간 동안 서버의 응답이 없는 경우 `OnSearchEnd`, `OnSaveEnd` 등의 콜백 이벤트의 결과코드가 `-6`으로 반환 됩니다.

### Syntax
```javascript
ObjId.SetWaitTimeOut(time);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|time|`Number`|<span class="required">필수</span>|서버 응답 대기 시간 (단위: 초)|


### Returns
***none***

### Example
```javascript
// 서버 응답 대기 시간을 60초로 설정
mySheet.SetWaitTimeOut(60);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||