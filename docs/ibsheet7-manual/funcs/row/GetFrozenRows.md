# GetFrozenRows ***(row method)***

> 고정행 설정을 확인 합니다.<br>
> 상단에 설정한 개수의 행을 고정행으로 출력합니다.<br>
> 조회 전 호출 시 데이터 조회 완료 시점에 해당 개수만큼 조회된 데이터를 고정행으로 출력합니다.

### Syntax
```javascript
ObjId.GetFrozenRows();
```

### Info
***none***



### Returns
***Integer, 설정 값***

### Example
```javascript
// 고정행 설정을 확인
console.log("getFrozenRows:", mySheet.GetFrozenRows());
```


### Since

|version|desc|
|---|---|
|7.0.0.0||