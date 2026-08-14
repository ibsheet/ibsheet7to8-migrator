# GetRowData ***(row method)***

> 행의 데이터를 Json 객체로 생성하여 반환 합니다.<br>
> 2개행 이상의 단위데이터행 구조인 경우 단위데이터행 전체를 반환 합니다.

### Syntax
```javascript
ObjId.GetRowData(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|



### Returns
***Object, 해당 행의 데이터 객체***

### Example
```javascript
// 1행의 Json 객체를 확인
console.log("getRowData:", mySheet.GetRowData(1));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||