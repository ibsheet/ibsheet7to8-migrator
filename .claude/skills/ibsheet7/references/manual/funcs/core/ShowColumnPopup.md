# ShowColumnPopup ***(core method)***

> 대상 셀에 설정되어 있는 컬럼 팝업 메뉴를 출력합니다. <br>
> 컬럼 팝업 메뉴는 `InitColumns` 메소드에서 설정합니다. <br>
> `mousePos` 인자의 설정이 `0`인 경우 대상 셀의 하단에 메뉴가 출력됩니다.

### Syntax
```javascript
ObjId.ShowColumnPopup(row, col, mousePos);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Number`|<span class="required">필수</span>|대상 행의 Index|
|col|`Long or String`|<span class="required">필수</span>|대상 컬럼의 Index 또는 SaveName|
|mousePos|`Number`|<span class="optional">선택</span>|마우스 위치 출력 여부 (Default: 1)|



### Returns
***none***

### Example
```javascript
// (2, 3) 셀에서 컬럼 팝업 메뉴 출력
mySheet.ShowColumnPopup(2, 3);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||