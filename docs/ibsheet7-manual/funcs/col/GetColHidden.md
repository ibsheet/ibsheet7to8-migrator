# GetColHidden ***(col method)***

> 대상 컬럼의 숨김 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetColHidden(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|


### Returns
***Boolean, 컬럼의 숨김여부***

### Example
```javascript
//해당 컬럼이 숨겨졌는지 확인
var isHide = mySheet.GetColHidden(12);
var isHide2 = mySheet.GetColHidden("sa_Personal_Id");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||