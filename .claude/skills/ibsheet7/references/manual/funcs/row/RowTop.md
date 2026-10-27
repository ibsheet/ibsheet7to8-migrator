# RowTop ***(row method)***

> 특정 행의 상단 시작위치의 offsetTop 값을 확인 합니다. <br>
> 시트 table 의 최상단 위치를 기준점 (Default: 0)으로 하여 처리 합니다. <br>
> `row` 인자 설정이 잘못된 경우 별도 처리 없이 `-1`을 반환 합니다.

### Syntax
```javascript
ObjId.RowTop(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|



### Returns
***Long, 행의 상단 위치***

### Example
```javascript
// 1행의 상단 위치를 확인
console.log("rowTop:", mySheet.RowTop(1));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||