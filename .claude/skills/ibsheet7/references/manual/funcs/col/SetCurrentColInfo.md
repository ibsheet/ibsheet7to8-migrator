# SetCurrentColInfo ***(col method)***

> 컬럼들의 위치, 숨김, 너비 정보를 설정 합니다.<br>
> `주의` 인자로 설정되는 값은 반드시 [GetCurrentColInfo](/docs/funcs/col/GetCurrentColInfo)의 반환 값이어야 합니다.

### Syntax
```javascript
ObjId.SetCurrentColInfo(Info);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Info|`String`|<span class="required">필수</span>|설정할 컬럼 정보 문자열|


### Returns
***none***

### Example
```javascript
// 이전 컬럼 정보를 설정 한다.
var prevColInfo = 저장된 이전 컬럼 정보(GetCurrentColInfo)
mySheet.SetCurrentColInfo(prevColInfo);
```


### Since

|version|desc|
|---|---|
|7.0.13.30||