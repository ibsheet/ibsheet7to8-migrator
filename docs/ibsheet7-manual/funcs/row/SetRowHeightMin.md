# SetRowHeightMin ***(row method)***

> 행의 최대 높이 값을 설정 합니다. <br>
> 데이터 행의 높이를 자동으로 설정한 경우에만 적용이 되며, DataRowHeight 보다 작게 설정한 경우 DataRowHeight의 값으로 설정 됩니다.

### Syntax
```javascript
ObjId.SetRowHeightMin(MinHeight);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|MinHeight|`Integer`|<span class="required">필수</span>|해당 행에 설정 할 최소 높이값|



### Returns
***none***

### Example
```javascript
// 최소 높이를 10픽셀로 설정
mySheet.SetRowHeightMin(10);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||