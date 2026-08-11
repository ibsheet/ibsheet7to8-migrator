# SetEndEdit ***(core method)***

> 편집중인 셀이 있는 경우 편집을 종료 처리 합니다.<br>
> `save`인자에 따라서 편집중인 값에 대한 저장/취소 여부를 설정 할 수 있습니다.

### Syntax
```javascript
ObjId.SetEndEdit(save);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|save|`Boolean`|<span class="required">필수</span>|저장 처리 여부|



### Returns
***Boolean, 처리 결과***

### Example
```javascript
// 저장후 편집 종료 처리
mySheet.SetEndEdit(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||