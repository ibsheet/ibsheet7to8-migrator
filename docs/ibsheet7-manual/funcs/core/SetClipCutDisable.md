# SetClipCutDisable ***(core method)***

> `Ctrl + X`를 이용하여 데이터를 클립보드에 잘라내기 할때의 처리 방법을 설정합니다.

### Syntax
```javascript
ObjId.SetClipCutDisable(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Long`|<span class="required">필수</span>|클립보드 잘라내기 처리 방법<br>- `0` : 잘라내기 가능<br>- `1` : 잘라내기 불가능|



### Returns
***none***

### Example
```javascript
// 클립보드 잘라내기 불가능 설정
mySheet.SetClipCutDisable(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||