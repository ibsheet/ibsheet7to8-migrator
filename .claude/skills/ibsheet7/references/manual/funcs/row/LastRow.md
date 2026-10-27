# LastRow ***(row method)***

> 시트의 마지막 행 인덱스를 확인 합니다.<br>
> 헤더행만 있는 경우 `마지막 헤더행의 인덱스` 를 반환 합니다.<br>
> 필터행을 출력하는 경우 `필터행을 포함한 인덱스` 를 반환 합니다. <br>
> 마지막 행은 합계 행일 수도 있고, 데이터 행일 수도 있고, 헤더 행일 수도 있습니다.

### Syntax
```javascript
ObjId.LastRow(Mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Mode|`Number`|<span class="optional">선택</span>|현재 화면상 Index 반환 여부 (`0` : 마지막행 index (Default), `1` : 현재 화면상의 마지막행 index)|



### Returns
***Long, 마지막행의 Index***

### Example
```javascript
// 마지막 행의 Index를 확인
console.log("lastRow:", mySheet.LastRow());

// 현재 화면에 보여지는 마지막 행의 Index를 확인
console.log("lastRow:", mySheet.LastRow(1));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||