# SetAutoSumPosition ***(sum method)***

> 합계 행의 표시 위치를 설정 합니다.

### Syntax
```javascript
ObjId.SetAutoSumPosition(Position);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Position|`Integer`|<span class="required">필수</span>|합계행의 위치 값<br>- 0 : 상단고정<br>- 1 : 하단고정 (Default)|



### Returns
***none***

### Example
```javascript
// 합계행 상단고정 표시
mySheet.SetAutoSumPosition(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||