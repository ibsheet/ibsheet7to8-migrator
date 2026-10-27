# ColLeft ***(col method)***

> 컬럼의 왼쪽 위치를 확인합니다.

### Syntax
```javascript
ObjId.ColLeft(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|



### Returns
***Long, 특정컬럼 왼쪽 위치 값***

### Example
```javascript
//컬럼의 왼쪽 위치를 파악
var iLeft = mySheet.ColLeft(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||