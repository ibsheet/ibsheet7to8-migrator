# SetClipPasteMode ***(core method)***

> 클립보드에 있는 내용을 시트에 붙여넣기 할때의 처리 방법을 설정합니다.

### Syntax
```javascript
ObjId.SetClipPasteMode(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Number`|<span class="required">필수</span>|붙여넣기 처리 방법<br>- `-1` : 붙여넣기 기능 사용 안함<br>- `0` : 선택 되어있는 해당 셀에 붙여넣기 처리<br>- `1` : 선택 되어있는 셀을 시작점으로 하여 붙여 넣기 처리 (`\t` : 컬럼 구분자 `\r\n` : 행 구분자)<br>- `2` : 1 설정의 방법을 기본으로 하고, 붙여넣을 행이 모자른 경우에 자동으로 행을 추가하며 붙여넣기 처리<br>- `3`: 행을 추가하면서 붙여넣기 처리 (`\t` : 컬럼 구분자 `\r\n` : 행 구분자)<br>- `4` : 선택 영역의 크기와 관계없이 클립보드 내용 붙여넣기 처리|



### Returns
***none***

### Example
```javascript
// 클립보드 붙여넣기 제한 설정
mySheet.SetClipPasteMode(-1);

// 엑셀과 동일한 방식을 붙여넣기 방법 설정
mySheet.SetClipPasteMode(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||