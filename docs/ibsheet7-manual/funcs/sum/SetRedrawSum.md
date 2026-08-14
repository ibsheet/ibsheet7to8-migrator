# SetRedrawSum ***(sum method)***

> 합계 행에 대한 합계 자동 계산 여부를 설정 합니다. <br>
> `0` 으로 설정하면 데이터 변경시 합계행에 대한 자동 계산을 하지 않고, 1로 설정 하는 시점에 자동 계산 처리를 합니다.<br>
> `SetCellValue` 등의 메소드를 통한 대량 셀 데이터 변경시 이 기능을 사용하여 성능을 향상 시킬 수 있습니다.<br>
> `주의` 해당 속성값을 0 으로 설정 후 반드시 1 로 다시 설정해야 합니다.

### Syntax
```javascript
ObjId.SetRedrawSum(Redraw);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Redraw|`Object`|<span class="required">필수</span>|합계행 계산 여부|



### Returns
***none***

### Example
```javascript
// 자동계산 false 설정
mySheet.SetRedrawSum(0) ;

// 데이터 설정
for (var i = 1; i < 1000; i++) {
  mySheet.SetCellValue(i, 1, i, 0);
}

// 자동 계산 처리
mySheet.SetRedrawSum(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||