# SetDragMode ***(core method)***

> IBSheet7 시트의 drag 방법을 설정 합니다. <br>
> - 설정값이 1인 경우 : `마우스 drag`에 의해 행 또는 셀에 대한 드래깅 처리<br>
> - 설정값이 0인 경우 : `ctrl + 마우스 drag`에 의해 행 또는 셀에 대한 드래깅 처리<br>
> `참고` 마우스 drag에 의한 셀렉션은 이 설정과 반대로 설정 됩니다.

### Syntax
```javascript
ObjId.SetDragMode(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Boolean`|<span class="required">필수</span>|처리모드 (Default: 0)|



### Returns
***none***

### Example
```javascript
// drag 시 행 또는 셀 drag 모드 설정
mySheet.SetDragMode(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||