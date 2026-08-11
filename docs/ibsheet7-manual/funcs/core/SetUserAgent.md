# SetUserAgent ***(core method)***

> 조회나 저장시 HTTP 헤더 정보에 포함되어 넘어가는 IBUserAgent의 값을 설정 합니다.

### Syntax
```javascript
ObjId.SetUserAgent(value);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|value|`String`|<span class="required">필수</span>|IBUserAgent 설정 값|



### Returns
***none***

### Example
```javascript
// IBUserAgent 설정
mySheet.SetUserAgent("IBSheetCall");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||