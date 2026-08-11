# SetShowButtonImage ***(core method)***

> `Popup`, `Combo`, `Date` 데이터 타입 등에서 버튼 이미지에 대한 표시 방법을 설정 합니다.

### Syntax
```javascript
ObjId.SetShowButtonImage(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Number`|<span class="required">필수</span>|버튼 이미지 표시 방법<br>- `0` : Focus가 있을 때만 콤보, 달력, 팝업 이미지 표시<br>- `1` : Edit 가능할때 달력, 팝업 이미지 표시<br>- `2` : 항상 달력, 팝업 이미지 표시<br>- `3` : Edit 가능할때 콤보, 달력, 팝업 이미지 표시 (Default)<br>- `4` : 항상 콤보, 달력, 팝업 이미지 표시|




### Returns
***none***

### Example
```javascript
// Focus가 있을 때만 콤보, 달력, 팝업 이미지 표시 설정
mySheet.SetShowButtonImage(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||