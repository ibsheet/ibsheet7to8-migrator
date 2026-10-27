# SetCountPosition ***(core method)***

> 건수 정보가 출력 되는 위치를 설정합니다.<br>
> 건수 정보 출력 포맷을 설정 하지 않은 경우 `[BOTTOMDATA / TOTALROWS]` 포맷을 기본으로 사용하며, 포맷을 변경 하고자 하는 경우에는 `SetCountFormat` 메소드를 이용하여 변경합니다.

### Syntax
```javascript
ObjId.SetCountPosition(position);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|position|`Number`|<span class="required">필수</span>|건수 정보 출력 위치<br>- `0` : 사용 안함<br>- `1` : 좌측 상단<br>- `2` : 우측 상단<br>- `3` : 좌측 하단<br>- `4` : 우측 하단|



### Returns
***none***

### Example
```javascript
// 건수 정보 출력위치를 우측 하단으로 설정
mySheet.SetCountPosition(4);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||