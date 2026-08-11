# SetTheme ***(core method)***

> 시트에 테마를 설정합니다.

### Syntax
```javascript
ObjId.SetTheme(prefix, folder);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|prefix|`String`|<span class="required">필수</span>|테마에서 사용하는 class의 prefix 값|
|folder|`String`|<span class="required">필수</span>|테마의 폴더 명|



### Returns
***none***

### Example
```javascript
// Blue 테마 설정
mySheet.SetTheme("BL", "Blue");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||