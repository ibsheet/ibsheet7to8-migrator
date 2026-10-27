# CheckReverse ***(col method)***

> 대상 컬럼의 체크 값을 토글 처리 합니다.

### Syntax
```javascript
ObjId.CheckReverse(Col, [Editable], [Event]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|
|Editable|`Boolean`|<span class="optional">선택</span>|편집가능 불가능을 확인하여 편집가능일때만 변경. (Default :0)|
|Event|`Boolean`|<span class="optional">선택</span>|체크가 바뀔때 OnChange 이벤트를 발생할것인가 여부. (Default :0)|


### Returns
***none***

### Example
```javascript
// 1컬럼의 체크를 반전한다.
mySheet.CheckReverse(1);

// Edit를 체크하고, Event를 발생시킨다.
mySheet.CheckReverse(1, 1, 1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||