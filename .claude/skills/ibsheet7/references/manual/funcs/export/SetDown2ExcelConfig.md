# SetDown2ExcelConfig ***(export method)***

> Down2Excel 메소드의 기본 속성을 정의합니다.<br>
> 이 메소드를 통해 정의한 속성은 `Down2Excel` 메소드의 기본값으로 처리 됩니다.

### Syntax
```javascript
ObjId.SetDown2ExcelConfig([Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Opt|`Object`|<span class="optional">선택</span>|기본으로 정의할 속성 (객체 세부 사항은 [Down2Excel](/docs/funcs/export/Down2Excel) 메소드 참고)|



### Returns
***none***

### Example
```javascript
// Merge, FileName 속성에 대한 기본값 정의
mySheet.SetDown2ExcelConfig({
    "FileName": "excel2",
    "Merge": 1
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||