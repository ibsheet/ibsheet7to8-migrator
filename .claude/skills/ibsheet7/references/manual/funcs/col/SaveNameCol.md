# SaveNameCol ***(col method)***

> [InitColumns](/docs/funcs/init/InitColumns)에서 설정된 SaveName을 이용하여 해당하는 컬럼 번호를 확인합니다. <br>
> SaveName에 해당하는 컬럼이 존재하지 않는 경우 –1을 반환합니다.

### Syntax
```javascript
ObjId.SaveNameCol(SaveName);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|SaveName|`String`|<span class="required">필수</span>|저장 변수명|



### Returns
***Number, 컬럼의 Index***

### Example
```javascript
// SaveName이 'sDeptName'인 컬럼의 Index 확인
console.log("colIndex:", mySheet.SaveNameCol('sDeptName'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||