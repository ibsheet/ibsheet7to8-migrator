# SetClipCopyMode ***(core method)***

> `Ctrl + C`를 이용하여 데이터를 클립보드에 복사 할때의 처리 방법을 설정 합니다. <br>
> 클립보드 복사을 허용한 경우 마우스 드래그로 데이터 영역을 선택한 경우에는 모두 동일하게 해당 영역에 대한 데이터가 복사됩니다.

### Syntax
```javascript
ObjId.SetClipCopyMode(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Integer`|<span class="required">필수</span>|복사 방법에 따른 설정값<br>- `-1` : 복사 기능 사용 안함<br>- `0`	: Selection 상태가 아닌 Focus 상태인 경우 해당 셀의 데이터만 복사 처리<br>- `1`	: Selection 상태가 아닌 Focus 상태인 경우 해당 행의 데이터 모두 복사 처리<br>- `2`	: Selection 상태가 아닌 Focus 상태인 경우 해당 셀의 데이터만 복사/잘라내기 처리<br>- `3`	: Selection 상태가 아닌 Focus 상태인 경우 해당 행의 데이터 모두 복사/잘라내기 처리|



### Returns
***none***

### Example
```javascript
// 클립보드 복사 제한 설정
mySheet.SetClipCopyMode(-1);

// 행단위 복사 방법 설정
mySheet.SetClipCopyMode(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.2.0|클립보드 복사를 허용하지 않는 모드 추가 (Mode: -1)|