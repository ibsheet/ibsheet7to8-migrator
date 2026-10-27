# GetColEditable ***(col method)***

> 대상 컬럼의 편집 가능 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetColEditable(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|


### Returns
***Boolean, Edit 가능 여부***

### Example
```javascript
//Index가 5인 컬럼의 Edit 가능 여부를 확인
mySheet. GetColEditable (5);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||