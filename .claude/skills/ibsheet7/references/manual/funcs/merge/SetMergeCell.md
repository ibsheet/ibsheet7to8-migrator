# SetMergeCell ***(merge method)***

> 대상 셀 영역에 대한 셀 병합 처리를 합니다.<br>
> [SetMergeSheet](/docs/funcs/merge/SetMergeSheet) 메소드 사용의 경우 인접한 셀의 값이 동일한 범위에 대한 자동 셀 병합 처리를 하지만 이 기능을 사용하는 경우 값의 동일성과 무관하게 지정한 셀 범위에 대한 셀 병합 처리를 하게 됩니다.<br>
> 셀 병합 처리시 대상 범위의 행에 대한 갱신 처리가 발생하기 때문에, 다량으로 처리하는 경우 성능 저하 문제가 발생할 수 있습니다. 이 경우 셀 영역 설정 범위를 배열 형식으로 설정 하거나, refresh 인자와 [RenderSheet](/docs/funcs/core/RenderSheet) 메소드를 이용하여 성능 저하 문제를 해결 할 수 있습니다.<br>
> `주의` 셀 영역에 데이터행이 아닌 행이 포함되는 경우 셀 병합은 처리되지 않습니다.

### Syntax
```javascript
ObjId.SetMergeCell(Row, Col, Rows, Cols, Refresh);
ObjId.SetMergeCell([[Row, Col, Rows, Cols], …], Refresh);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|강제머지할 셀의 Row Index|
|Col|`Long`|<span class="required">필수</span>|강제머지할 셀의 Column Index |
|Rows|`Number`|<span class="required">필수</span>|강제머지할 셀의 Row 개수|
|Cols|`Number`|<span class="required">필수</span>|강제머지할 셀의 Col 개수|
|Refresh|`Number`|<span class="optional">선택</span>|대상영역에 대한 갱신 여부 (Default: 1)|


### Returns
***none***

### Example
```javascript
// (1,10) 부터 (2,11) 까지의 영역에 대한 셀 병합
mySheet.SetMergeCell(1, 10, 2, 2);

// Index가 3, 4, 5인 컬럼에 대한 5행, 6행에 대한 각각의 셀병합 처리 (배열 인자 형식 방법)
mySheet.SetMergeCell([
  [5, 3, 2, 1],
  [5, 4, 2, 1],
  [5, 5, 2, 1]
]);

// 다량의 셀병합에 대한 refresh 인자와 RenderSheet 메소드를 이용한 성능 개선 방법
// ---- 각각의 셀 범위 영역에 대한 메소드 호출
mySheet.SetMergeCell(1, 10, 2, 2, 0);
mySheet.SetMergeCell(5, 10, 2, 2, 0);
mySheet.SetMergeCell(10, 10, 2, 2, 0);
...
mySheet.SetMergeCell(30, 10, 2, 2, 0);

// ---- 시트 갱신 처리
mySheet.RenderSheet(2);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||