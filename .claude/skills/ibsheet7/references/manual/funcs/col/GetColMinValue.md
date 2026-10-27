# GetColMinValue ***(col method)***

> 해당 컬럼의 최소값을 가져옵니다. <br>
> `주의` 숫자타입(Int, Float, AutoSum)의 컬럼만 지원합니다.


### Syntax
```javascript
ObjId.GetColMinValue(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|


### Returns
***Number, 해당 컬럼의 최소값***

### Example
```javascript
// Index가 1인 컬럼의 최소값을 가져온다.
mySheet.GetColMinValue(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||