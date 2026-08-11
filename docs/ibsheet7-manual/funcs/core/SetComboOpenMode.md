# SetComboOpenMode ***(core method)***

> `Combo`, `ComboEdit` 타입의 셀 선택 시점의 처리방법을 설정합니다. <br>
> `1`로 설정하는 경우 선택 시점에 편집모드로 변경되고, 콤보리스트를 출력합니다.

### Syntax
```javascript
ObjId.SetComboOpenMode(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Boolean`|<span class="required">필수</span>|선택시 편집모드 변경 여부|



### Returns
***none***

### Example
```javascript
// "Combo", "ComboEdit" 타입의 셀 선택시 바로 편집모드 변경 모드 설정
mySheet.SetComboOpenMode(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||