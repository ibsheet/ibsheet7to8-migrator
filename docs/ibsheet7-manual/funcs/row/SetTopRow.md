# SetTopRow ***(row method)***

> 최상단의 행 번호를 설정 합니다. <br>
> 상단 헤더 영역을 제외하고 데이터 영역 안에서 최상단의 행을 설정하며 해당 행이 선택된 상태로 설정되지는 않습니다.

### Syntax
```javascript
ObjId.SetTopRow(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|



### Returns
***none***

### Example
```javascript
// 최상단 행 번호를 설정
mySheet.SetTopRow(100);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||