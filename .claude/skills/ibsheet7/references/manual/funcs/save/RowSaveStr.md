# RowSaveStr ***(save method)***

> 행의 데이터를 각 컬럼의 SaveName을 이용하여 저장 시 사용되는 Query String 형태로 조합하여 반환합니다. <br>
> Ex ) SaveName1=Value1&SaveName2=Value2&...<br>
> 한글은 UrlEncoding 되어 반환됩니다.


### Syntax
```javascript
ObjId.RowSaveStr(Row, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|해당 행의 Row Index|
|Opt|`Object`|<span class="optional">선택</span>|저장 처리 옵션|
|Opt.ValidKeyField|`Boolean`|<span class="optional">선택</span>|KeyField 체크 여부 (Default: 1)|
|Opt.ValidFullInput|`Boolean`|<span class="optional">선택</span>|FullInput 체크 여부 (Default: 1)|


### Returns
***String, 행의 데이터***

### Example
```javascript
// Index가 1인 행의 저장 문자열을 가져온다.
var saveData = mySheet.RowSaveStr(1);

console.log('saveData: ', saveData);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.12.4|ValidKeyField, ValidFullInput 인자 속성 추가|