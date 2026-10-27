# SetDataAutoTrim ***(core method)***

> 데이터에 대한 자동 trim 처리 여부를 설정 합니다.<br>
> 조회, 저장 데이터 및 Cell의 데이터 설정값에 대하여 해당 설정을 적용합니다.

### Syntax
```javascript
ObjId.SetDataAutoTrim(trim);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|trim|`Boolean`|<span class="required">필수</span>|trim 처리 여부|



### Returns
***none***

### Example
```javascript
// trim 처리하지 않도록 설정
mySheet.SetDataAutoTrim(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||