# SetVisible ***(core method)***

> 시트의 표시 여부를 설정 합니다. <br>
> `0`으로 설정하면 건수 정보를 포함한 모든 것이 숨겨져서 보이지 않으며, `1`로 설정하면 모든 정보를 볼 수 있습니다.
### Syntax
```javascript
ObjId.SetVisible(visible);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|visible|`Boolean`|<span class="required">필수</span>|시트 표시 여부|



### Returns
***none***

### Example
```javascript
// 시트를 숨김상태로 설정 한다.
mySheet.SetVisible(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||