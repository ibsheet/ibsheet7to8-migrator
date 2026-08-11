# GetColFontColor ***(col method)***

> 대상 컬럼의 폰트 색상을 확인 합니다. <br>
> 대상 컬럼에 폰트 색상 설정이 없는 경우 ''으로 반환 하고, 설정이 있는 경우 WebColor 16진수 표기법 문자열로 반환 합니다.

### Syntax
```javascript
ObjId.GetColFontColor(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|



### Returns
***String, 설정된 색상값***

### Example
```javascript
// index가 2인 컬럼의 글자색을 확인
console.log(mySheet.GetColFontColor(2));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||