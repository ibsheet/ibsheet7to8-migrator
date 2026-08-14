# ReturnData ***(row method)***

> 특정 행의 데이터를 조회 상태의 문자열로 변경합니다.<br>
> - 조회된 데이터로 되돌리지 못하는 경우 <br>
>   1. `조회된 데이터가 아닌 경우` (ex - 입력 상태의 데이터) <br>
>   2. `상태컬럼이 존재하지 않는 경우`

### Syntax
```javascript
ObjId.ReturnData(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|



### Returns
***none***

### Example
```javascript
// 2행의 데이터를 초기 상태로 변경
mySheet.ReturnData(2);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||