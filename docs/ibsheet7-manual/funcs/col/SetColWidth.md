# SetColWidth ***(col method)***

> 대상 컬럼의 너비를 설정 합니다.<br>
> width인자의 설정 값은 0이상의 정수 값으로 설정하여야 하며, 0으로 설정한 경우 컬럼의 가장 긴 문자열에 맞게 FitSize 처리를 합니다.

### Syntax
```javascript
ObjId.SetColWidth(Col, Width);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|
|Width|`Integer`|<span class="required">필수</span>|너비 픽셀 값|


### Returns
***none***

### Example
```javascript
// Index가 3인 컬럼의 너비를 120px로 설정
mySheet.SetColWidth(3, 120);

// Index가 3인 컬럼의 너비에 대한 FitSize 처리
mySheet.SetColWidth(3, 0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||