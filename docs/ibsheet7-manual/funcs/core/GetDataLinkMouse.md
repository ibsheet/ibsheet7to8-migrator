# GetDataLinkMouse ***(core method)***

> 특정 컬럼에 대한 마우스 링크 여부를 확인합니다.

### Syntax
```javascript
ObjId.GetDataLinkMouse(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Number or String`|<span class="required">필수</span>|특정 컬럼의 Index 또는 SaveName|



### Returns
***Boolean, 설정된 링크 값***

### Example
```javascript
// Index가 5인 컬럼에 대한 확인
console.log("dataLineMouse:", mySheet.GetDataLinkMouse());
```


### Since

|version|desc|
|---|---|
|7.0.0.0||