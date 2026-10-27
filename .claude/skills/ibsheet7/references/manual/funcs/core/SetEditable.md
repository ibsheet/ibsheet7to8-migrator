# SetEditable ***(core method)***

> 모든 데이터영역에 대한 편집 가능 여부를 설정합니다.<br>
> 전체적으로 Edit가 불가능하면 다른 설정에 관계없이 모든 Edit는 불가능합니다.<br>
> - Edit 인자를 설정하지 않는 경우 : 별도처리 없이 -1을 반환<br>
> - Edit 인자의 설정값이 Boolean 범위 외의 값을 설정한 경우 : false 설정과 동일

### Syntax
```javascript
ObjId.SetEditable(edit);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|edit|`Boolean`|<span class="required">필수</span>|편집 가능 여부|




### Returns
***none***

### Example
```javascript
// 시트 전체를 편집 불가로 설정
mySheet.SetEditable(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||