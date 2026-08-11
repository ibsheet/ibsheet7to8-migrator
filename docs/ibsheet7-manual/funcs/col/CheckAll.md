# CheckAll ***(col method)***

> `DelCheck, CheckBox, DummyCheck` 타입의 컬럼에 대한 전체 체크 설정 또는 해제 처리를 합니다.<br>
> 처리를 완료 하면 각 데이터 행 단위로 [OnChange](/docs/event/OnChange)이벤트가 발생합니다.

### Syntax
```javascript
ObjId.CheckAll(Col, Value, [OnChangeEvent]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Value|`Integer`|<span class="required">필수</span>|- `0` : 전체체크 해제 <br>- `1` : 전체체크 <br>- `그외` : 이전값 반대|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|
|OnChangeEvent|`Boolean`|<span class="optional">선택</span>|OnChange 이벤트 발생 여부 (Default :1)|


### Returns
***none***

### Example
```javascript
// Index가 3인 컬럼에 대한 전체 체크 처리
mySheet.CheckAll(3, 1);

// Index가 3인 컬럼에 대한 현재 값 토글 처리
mySheet.CheckAll(3, 2);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||