# RowCount ***(core method)***

> 전체 데이터 행의 개수를 확인합니다. <br>
> Status 값을 인자로 전달하지 않은 경우 조회된 데이터 행 개수와 신규 입력된 행까지 포함한 전체 데이터 행 개수를 확인합니다. <br>
> Status 값에 따라 조회 / 입력 / 수정 / 삭제 각 상태의 행 개수를 확인 할 수 있습니다.

### Syntax
```javascript
ObjId.RowCount(Status)
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Status|`String`|<span class="optional">선택</span>|트랜잭션 코드<br>- `""` :	모든 행<br>- `R` :	상태값이 조회인 행<br>- `I` :	상태값이 입력인 행<br>- `U` :	상태값이 수정인 행<br>- `D` :	상태값이 삭제인 행<br>- `H` :	히든 처리된 행|



### Returns
***Number, 행의 개수***

### Example
```javascript
// 모든 행의 개수 확인
console.log("rowCount:", mySheet.RowCount());

// 상태값이 입력인 행의 개수 확인
console.log("rowCount(I):", mySheet.RowCount("I"));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||