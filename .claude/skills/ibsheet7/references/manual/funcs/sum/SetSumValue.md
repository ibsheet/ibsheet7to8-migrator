# SetSumValue ***(sum method)***

> 합계 셀의 값을 설정 합니다.<br>
> `참고` 데이터타입이 `AutoSum`인 컬럼의 합계 셀은 자동 산출 대상 셀이기 때문에 설정이 불가능 합니다.

### Syntax
```javascript
ObjId.SetSumValue(DataRow, Col, Value);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|DataRow|`Number`|<span class="required">필수</span>|단위 데이터행의 Index|
|Col|`Long or String`|<span class="required">필수</span>|합계 셀의 Column Index 또는 SaveName|
|Value|`Number or String`|<span class="required">필수</span>|포맷 적용 안된 형태의 CellValue 값|



### Returns
***none***

### Example
```javascript
// 합계행의 첫번째 셀에 '합 계 : ' 문자열 설정
mySheet.SetSumValue(0, 0, '합 계 : ');

// 합계행의 첫번째 셀에 '합\n계' 문자열 설정 후 시트 렌더링
mySheet.SetSumValue(0, 0, '합\n계');
mySheet.RenderSheet(2);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||