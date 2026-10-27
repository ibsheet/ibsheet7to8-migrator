# GetRowBackColor ***(row method)***

> 대상 행의 배경색을 확인 합니다.<br>
> 설정이 없는 경우에는 `css에 설정된 기본값`으로 반환 합니다.

### Syntax
```javascript
ObjId.GetRowBackColor(Row);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행 Index|



### Returns
***String, 배경 색상***

### Example
```javascript
// Index가 3인 행의 배경색을 확인
console.log("backColor:", mySheet.GetRowBackColor(3));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||