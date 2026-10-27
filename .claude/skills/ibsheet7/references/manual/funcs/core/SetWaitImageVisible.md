# SetWaitImageVisible ***(core method)***

> 조회, 저장, 다운로드 등의 기능이 진행중인 동안 표시되는 대기 이미지에 대한 사용 여부를 설정 합니다.


### Syntax
```javascript
ObjId.SetWaitImageVisible(use);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|use|`Boolean`|<span class="required">필수</span>|각종 대기 이미지 표시 여부|



### Returns
***none***

### Example
```javascript
// 대기 이미지를 사용 하지 않도록 설정
mySheet.SetWaitImageVisible(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||