# SetEditTabBehavior ***(core method)***

> 편집모드 상태에서 tab 키 입력에 대한 동작 방법을 설정합니다.<br>
> 설정 값이 `editTab`인 경우 `SetEditTabBehavior` 설정을 기준으로 합니다. (편집 유지 제외)<br>

### Syntax
```javascript
ObjId.SetEditTabBehavior(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Number`|<span class="required">필수</span>|동작 방법 설정값<br>- `0` : 다음 편집 가능한 셀로 이동 한다 (편집상태 유지)<br>- `1` : 편집여부와 무관하게 다음셀로 이동 한다 (다음셀이 편집 가능한 경우면 편집상태 유지)<br>- `2` : 편집여부와 무관하게 다음셀로 이동 한다 (다음셀의 편집 여부와 무관하게 편집상태 종료 처리)|




### Returns
***none***

### Example
```javascript
// tab 키 입력시 편집여부와 무관하게 다음셀로 이동 설정.(다음셀이 편집 가능한 경우면 편집상태 유지)
mySheet.SetEditTabBehavior(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||