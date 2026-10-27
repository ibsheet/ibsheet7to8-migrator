# SetMousePointer ***(core method)***

> 시트 내에서의 마우스 커서 모양을 설정 합니다.

### Syntax
```javascript
ObjId.SetMousePointer(cursor);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|cursor|`String`|<span class="required">필수</span>|마우스 커서값<br>- `default` : 기본 모양<br>- `hand` : 포인터 모양|


### Returns
***none***

### Example
```javascript
// 마우스 커서를 포인터로 설정
mySheet.SetMousePointer("hand"));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||