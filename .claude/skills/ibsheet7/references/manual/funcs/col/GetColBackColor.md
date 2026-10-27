# GetColBackColor ***(col method)***

> 대상 컬럼의 배경색을 확인 합니다.<br>
> 대상 컬럼에 배경색 설정이 없는 경우 ''으로 반환 하고, 설정이 있는 경우 WebColor 16진수 표기법 문자열로 반환 합니다.

### Syntax
```javascript
ObjId.GetColBackColor(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|


### Returns
***none***

### Example
```javascript
// 2컬럼 배경색을 확인한다.
mySheet.GetColBackColor(2);

//SaveName이 sa_Name 인 컬럼의 배경색을 확인한다.
mySheet.GetColBackColor("sa_Name");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||