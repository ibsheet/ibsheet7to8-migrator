# CreateUniteTable ***(core method)***

> UseChildGrid 사용시에 부모 그리드와 자식 그리드가 컬럼정보가 합쳐진 그리드를 생성합니다.<br>
> 단, 두 그리드의 초기화 정보의 SaveName은 중복되지 않아야 하고 헤더의 줄수가 동일해야 합니다.<br>
> 기타 전체 속성 부분 및 일부 공통 속성은 그리드 초기값으로 생성됩니다.

### Syntax
```javascript
ObjId.CreateUniteTable(sheetId);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|sheetId|`String`|<span class="required">필수</span>|생성할 시트의 Id|



### Returns
***none***

### Example
```javascript
// mySheet2에 mySheet와  ChildGrid의 정보를 취합하여 그리드를 생성한다.
mySheet.CreateUniteTable(mySheet2);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||