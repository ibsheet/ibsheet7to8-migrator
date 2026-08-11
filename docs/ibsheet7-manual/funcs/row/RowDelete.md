# RowDelete ***(row method)***

> 특정의 단일 또는 다중 데이터 행을 삭제 합니다. <br>
> row인자를 설정하지 않은 경우 현재 focus 위치의 행을 삭제 합니다.

### Syntax
```javascript
ObjId.RowDelete(Row, Confirm, event);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long or String`|<span class="optional">선택</span>|삭제할 행의 Index 또는 행의 Index를 `|` 구분자로 연결한 문자열 (Default: "현재 선택 행")|
|Confirm|`Boolean`|<span class="optional">선택</span>|삭제 전 메세지 표시 여부 (Default: 0)|
|event|`Boolean`|<span class="optional">선택</span>|`OnRowDelete` Event 발생 여부 (Default: 0)|



### Returns
***none***

### Example
```javascript
// 확인 메시지 없이 1행 삭제
mySheet.RowDelete(1, 0);

// 3, 7, 10번 행 삭제
mySheet.RowDelete("3|7|10");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||