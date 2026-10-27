# SetStartEdit ***(core method)***

> 현재 포커스 되어 있는 셀을 편집모드로 변경 합니다.

### Syntax
```javascript
ObjId.SetStartEdit(select, text);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|select|`Boolean`|<span class="optional">선택</span>|편집시 기존 값에 대한 select 처리 여부|
|text|`String`|<span class="optional">선택</span>|편집모드시 표시할 문자열 (빈값인 경우 이전 셀의 값으로 표시)|



### Returns
***none***

### Example
```javascript
// 현재 포커스 셀을 편집모드로 변경 처리
mySheet.SetStartEdit();
```


### Since

|version|desc|
|---|---|
|7.0.0.0||