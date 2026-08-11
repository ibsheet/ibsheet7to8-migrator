# SetHeaderCursor ***(core method)***

> 헤더 행의 마우스 오버시 커서 모양을 설정합니다.

### Syntax
```javascript
ObjId.SetHeaderCursor(cursor);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|cursor|`String`|<span class="required">필수</span>|커서 사용 여부<br>- `default` : 기본모양<br>- `pointer` : 포인터 모양|



### Returns
***none***

### Example
```javascript
// 헤더의 마우스 커서포인터를 손가락 모양으로 변경한다.
mySheet.SetHeaderCursor('Pointer');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||