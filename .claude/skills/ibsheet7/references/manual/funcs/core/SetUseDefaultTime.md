# SetUseDefaultTime ***(core method)***

> 셀의 Format 이 `Hm` 또는 `Hms` 이고, 셀의 데이터가 빈 값(공백)인 상태에서 편집 모드로 변경시 시스템의 현재 시간을 기본으로 설정할지 여부를 설정 합니다. <br>
> `0` 으로 설정하면 시스템 현재 시간을 표시하지 않고 공백상태로 표시합니다.

### Syntax
```javascript
ObjId.SetUseDefaultTime(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Boolean`|<span class="required">필수</span>|현재 시간 표시 여부 (Default: 1)|



### Returns
***none***

### Example
```javascript
// 현재 시간을 표시하지 않도록 설정
mySheet.SetUseDefaultTime(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||