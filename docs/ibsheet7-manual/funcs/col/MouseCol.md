# MouseCol ***(col method)***

> 마우스가 위치한 셀의 컬럼 Index를 확인합니다. <br>
> 데이터 영역이 아닌 경우는 –1을 반환합니다.

### Syntax
```javascript
ObjId.MouseCol();
```

### Info
***none***


### Returns
***Number, 마우스가 위치한 컬럼의 Index***

### Example
```javascript
// 마우스 이동시 해당 위치의 컬럼 Index 확인
function mySheet_OnMouseMove(button, shift, x, y) {
    console.log("MouseColIndex:", mySheet.MouseCol());
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||