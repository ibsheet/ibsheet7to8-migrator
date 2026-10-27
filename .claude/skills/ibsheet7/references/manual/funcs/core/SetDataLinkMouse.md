# SetDataLinkMouse ***(core method)***

> 특정 컬럼에 대한 마우스 링크 여부를 설정합니다.

### Syntax
```javascript
ObjId.SetDataLinkMouse(col, link);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|col|`Long or String`|<span class="required">필수</span>|컬럼의 Index 또는 SaveName|
|link|`Boolean`|<span class="required">필수</span>|설정값|



### Returns
***none***

### Example
```javascript
// Index가 5인 컬럼에 대한 링크 설정
mySheet.SetDataLinkMouse(5, 1);

// SaveName이 "sDeptName"인 컬럼에 대한 링크 설정
mySheet.SetDataLinkMouse("sDeptName", 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||