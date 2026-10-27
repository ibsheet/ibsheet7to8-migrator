# GetColFontBold ***(col method)***

> 대상 컬럼의 폰트에 bold 적용 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetColFontBold(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|


### Returns
***Boolean, Bold 설정 값***

### Example
```javascript
//인덱스가 1인 컬럼에 Bold 설정여부를 확인
console.log(mySheet.GetColFontBold(1));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||