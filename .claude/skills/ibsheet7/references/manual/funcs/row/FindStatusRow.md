# FindStatusRow ***(row method)***

> 트랜잭션 상태에 해당하는 행번호를 `;` 로 조합하여 반환합니다.<br>
> 트랜잭션 상태는 RIUD의 문자열을 `|`로 연결하여 설정하면 트랜잭션인 행의 번호를 모두 반환합니다.

### Syntax
```javascript
ObjId.FindStatusRow(sStatus);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|sStatus|`String`|<span class="required">필수</span>|찾고자 하는 트랜잭션 상태 코드를 `|`로 연결한 문자열|



### Returns
***String, 트랜잭션 상태에 해당하는 행번호를 ";"로 조합한 문자열 (Default: "")***

### Example
```javascript
// 수정 상태인 행을 확인
console.log("findStatusRow:", mySheet.FindStatusRow("U|D"));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||