# GetDataLastRow ***(row method)***

> 데이터 행의 마지막 인덱스를 확인한다. <br>
> 헤더, 필터, 합계행은 인덱스에서 제외되며, 데이터행이 존재하지 않는 경우 `-1` 을 반환합니다.


### Syntax
```javascript
ObjId.GetDataLastRow();
```

### Info
***none***



### Returns
***Number, 데이터행의 마지막 인덱스 (Default: -1)***

### Example
```javascript
// 시트 마지막 인덱스를 확인
console.log("getDataLastRow:", mySheet.GetDataLastRow());
```


### Since

|version|desc|
|---|---|
|7.0.13.37||