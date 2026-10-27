# SetColFontUnderline ***(col method)***

> 대상 컬럼의 폰트에 underline 적용 여부를 설정 합니다.

### Syntax
```javascript
ObjId.SetColFontUnderline(Col, Underline);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|
|Underline|`Boolean`|<span class="required">필수</span>|밑줄 여부|


### Returns
***none***

### Example
```javascript
// Index가 3인 컬럼의 폰트에 underline 적용
mySheet.SetColFontUnderline(3, 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||