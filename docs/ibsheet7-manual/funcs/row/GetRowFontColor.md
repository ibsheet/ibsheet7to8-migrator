# GetRowFontColor ***(row method)***

> 행 전체의 글자색을 확인 합니다.

### Syntax
```javascript
ObjId.GetRowFontColor(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|



### Returns
***String, 설정 색상***

### Example
```javascript
// 3행의 글자색을 확인
console.log("rowFontColor:", mySheet.GetRowFontColor(3));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||