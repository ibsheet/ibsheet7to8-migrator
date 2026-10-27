# SetEditEnterBehavior ***(core method)***

> 편집모드 상태에서 Enter 키 입력에 대한 동작 방법을 설정합니다.<br>
> 설정 값이 `editTab`인 경우 `SetEditTabBehavior` 설정을 기준으로 합니다. (편집 유지 제외)<br>

### Syntax
```javascript
ObjId.SetEditEnterBehavior(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Number`|<span class="required">필수</span>|동작 방법 설정값<br>- `tab` : 편집 완료 후 오른쪽 셀로 포커스 이동 (Default)<br>- `editTab` : 편집 완료 후 다음 편집 가능한 셀로 이동<br>- `newLine` : 개행 처리 (가능한 경우)<br>- `down` : 편집 완료 후 아래 셀로 포커스 이동<br>- `none` : 편집 완료 후 포커스 유지|




### Returns
***none***

### Example
```javascript
// 편집 완료 후 아래 셀로 포커스 이동 설정
mySheet.SetEditEnterBehavior('down');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||