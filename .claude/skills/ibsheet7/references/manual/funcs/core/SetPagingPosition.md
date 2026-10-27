# SetPagingPosition ***(core method)***

> 페이지 내비게이션이 출력 되는 위치를 설정 합니다. <br>
> 페이지 내비게이션을 출력 하기 위해서는 [SetCountPosition](/docs/funcs/core/SetCountPosition) 메소드를 통한 건수 정보의 출력 설정이 되어 있어야 하며, 상단 및 하단의 위치는 SetCountPosition 메소드의 설정을 따릅니다.

### Syntax
```javascript
ObjId.SetPagingPosition(position);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|position|`Number`|<span class="required">필수</span>|페이지 네비게이션 출력 위치<br>- `0` :	사용 안함<br>- `1` :	좌측<br>- `2` :	우측|



### Returns
***none***

### Example
```javascript
// 건수 정보 출력위치를 우측 하단, 페이지 내비게이션을 좌측 하단으로 설정
mySheet.SetCountPosition(4);
mySheet.SetPagingPosition(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||