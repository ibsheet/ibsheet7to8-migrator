# GetLeftCol ***(col method)***

> 시트의 가장 좌측에 위치하고 있는 컬럼의 Index를 확인 합니다.<br>
> 고정 컬럼 설정이 있는 경우 고정 컬럼 영역 이후의 컬럼의 Index를 반환 합니다.

### Syntax
```javascript
ObjId.GetLeftCol();
```

### Info
***none***


### Returns
***Number, 컬럼의 Index***

### Example
```javascript
// 시트의 좌측에 위치한 컬럼의 Index 확인
console.log("leftCol:", mySheet.GetLeftCol());
```


### Since

|version|desc|
|---|---|
|7.0.0.0||