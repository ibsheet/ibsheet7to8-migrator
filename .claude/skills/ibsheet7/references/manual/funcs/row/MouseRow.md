# MouseRow ***(row method)***

> 마우스 포인터가 있는 셀의 행 Index를 확인 합니다. <br>
> 시트의 헤더, 데이터 영역이 아닌 경우(`CountRow`, `FillRow`, 시트의 스크롤) 에 `-1` 을 반환 합니다.

### Syntax
```javascript
ObjId.MouseRow();
```

### Info
***none***



### Returns
***Long, 마우스 포인터가 있는 셀의 행 Index***

### Example
```javascript
// 마우스가 눌러졌을 때 행 번호를 확인
function mySheet_OnMouseDown(Button, Shift, X, Y){
  console.log("mouseRow:", mySheet.MouseRow());
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||