# SetRowHeight ***(row method)***

> 대상 행의 높이를 설정 합니다.

### Syntax
```javascript
ObjId.SetRowHeight(Row, Height);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|설정할 행 Index|
|Height|`Integer`|<span class="required">선택</span>|설정할 행 높이|



### Returns
***none***

### Example
```javascript
// Index가 3인 행의 높이를 25px로 설정
mySheet.SetRowHeight(3, 25);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||