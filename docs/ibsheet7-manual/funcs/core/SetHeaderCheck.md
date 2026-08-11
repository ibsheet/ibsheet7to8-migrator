# SetHeaderCheck ***(core method)***

> 헤더의 전체 체크박스 값을 설정합니다. <br>
> 설정시 헤더의 설정 값만 변경되고 전체 체크 동작은 처리되지 않습니다.

### Syntax
```javascript
ObjId.SetHeaderCheck(row, col, value);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|row|`Long`|<span class="required">필수</span>|행의 Index|
|col|`Long or String`|<span class="optional">선택</span>|컬럼의 Index 또는 SaveName|
|value|`Boolean`|<span class="optional">선택</span>|체크박스에 설정하고자 하는 값|



### Returns
***none***

### Example
```javascript
// 데이터 클리어후 (0, 3) 헤더셀의 전체체크를 체크하도록 설정
mySheet.RemoveAll();
mySheet.SetHeaderCheck(0, 3, 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||