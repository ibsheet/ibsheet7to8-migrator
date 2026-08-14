# GetColFontUnderline ***(col method)***

> 대상 컬럼의 폰트에 underline 적용 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetColFontUnderline(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|


### Returns
***Boolean, underline 적용 여부***

### Example
```javascript
//컬럼 전체 글자에 언더라인 설정여부를 확인
console.log(mySheet.GetColFontUnderline(1));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||