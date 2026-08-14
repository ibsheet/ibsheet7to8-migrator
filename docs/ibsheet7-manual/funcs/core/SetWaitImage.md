# SetWaitImage ***(core method)***

> 처리중 대기 이미지의 url을 설정 합니다. <br>
> 기본적으로 제공하는 처리 중 대기 이미지를 사용자가 원하는 이미지로 변경하기 위한 기능으로 조회 중 대기 이미지와 저장 중 대기 이미지를 모두 포함하고 있는 처리 중 대기 이미지입니다.

### Syntax
```javascript
ObjId.SetWaitImage(url);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|url|`String`|<span class="required">필수</span>|이미지 url|



### Returns
***none***

### Example
```javascript
// 처리중 대기 이미지 url 설정
mySheet.SetWaitImage('./img/process.png');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||