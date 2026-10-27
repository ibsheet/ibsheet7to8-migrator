# SetMouseHoverMode ***(core method)***

> 마우스 Hover 모드를 설정 합니다.

### Syntax
```javascript
ObjId.SetMouseHoverMode(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Number`|<span class="required">필수</span>|대상 행 Index<br>- `0` :	사용 안함 (Default)<br>- `1` :	셀 단위 Hover 처리<br>- `2` :	행 단위 Hover 처리|



### Returns
***none***

### Example
```javascript
// 쎌 단위 Hover 모드 설정
mySheet.SetMouseHoverMode(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||