# GetSubSumBackColor ***(sum method)***

> 소계 행의 배경 색상을 확인하거나 설정합니다.

### Syntax
```javascript
ObjId.GetSubSumBackColor(index);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|index|`Number`|<span class="optional">선택</span>|대상 행 index|



### Returns
***String, 현재 설정된 값***

### Example
```javascript
// 소계 행의 배경색 확인
console.log("sumsumBackColor:", mySheet.GetSubSumBackColor());

// Index가 1인  n번째 소계 행의 배경색 확인
console.log("sumsumBackColor:", mySheet.GetSubSumBackColor(1));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||