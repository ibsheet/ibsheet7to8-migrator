# SetHeaderEventMode ***(core method)***

> 헤더 행에 대한 마우스 이벤트 발생 모드를 설정합니다.

### Syntax
```javascript
ObjId.SetHeaderEventMode(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Number`|<span class="required">필수</span>|이벤트 발생 모드<br>- `0` : 모든 이벤트 발생 안함<br>- `1` : 모든 이벤트 발생 함<br>- `2` : MouseDown, MouseMove 이벤트만 발생 함 (IBSheet(A) 호환 모드)<br>- `3` : 헤더 리사이즈 영역에서 MouseDown 이벤트 발생하지 않음|



### Returns
***none***

### Example
```javascript
// 헤더 행에 대한 마우스 이벤트가 발생하지 않도록 설정
mySheet.SetHeaderEventMode(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.254|HeaderEventMode: 3 추가|