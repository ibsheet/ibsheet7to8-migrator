# SetEditableColorDiff ***(core method)***

> 편집가능 여부에 따른 셀의 배경색을 구분하여 표시할지 여부를 설정합니다.

### Syntax
```javascript
ObjId.SetEditableColorDiff(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Number`|<span class="required">필수</span>|배경색 구분 처리 모드<br>- `0` : 편집불가능한 셀을 구분없이 표시<br>- `1` : 편집불가능한 셀을 css에서 설정한 색상으로 표시<br>- `2` : 편집불가능한 셀을 css의 설정값과 기본배경색의 조합으로 표시|




### Returns
***none***

### Example
```javascript
// 편집가능 여부에 따른 셀의 배경색을 구분하지 않도록 설정
mySheet.SetEditableColorDiff(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||