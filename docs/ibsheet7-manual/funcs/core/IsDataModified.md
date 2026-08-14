# IsDataModified ***(core method)***

> IBSheet의 데이터의 트랜잭션 발생 여부를 확인 합니다.

### Syntax
```javascript
ObjId.IsDataModified();
```

### Info
***none***



### Returns
***Boolean, 데이터의 트랜잭션 발생 여부***

### Example
```javascript
// 저장시 데이터 트랜잭션 발생 여부에 따른 분기 처리
if (mySheet.IsDataModified()) {
  // 저장 처리
  mySheet.DoSave('save.jsp');
} else {
  console.log('저장 대상 데이터가 없습니다.');
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||