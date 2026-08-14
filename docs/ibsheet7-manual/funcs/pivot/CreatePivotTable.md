# CreatePivotTable ***(pivot method)***

> 피벗 테이블은 대화형 테이블의 일종으로, 데이터의 나열 형태에 따라서 `합계`나 `카운트` 등의 계산을 하는 기능이 있습니다.<br>
> 데이터가 있는 IBSheet의 값이 변경되더라도 피벗 테이블에 자동 반영되지 않으므로 원하는 시점에 이 메소드를 다시 호출 해야 합니다.


### Syntax
```javascript
ObjId.CreatePivotTable([Info], DataSheet);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Info|`Object`|<span class="required">필수</span>|피벗 테이블 설정 객체 집합|
|Info.Rows|`String`|<span class="required">필수</span>|행 레이블 필드에 설정할 컬럼의 Index 또는 SaveName을 구분자 `|`로 연결한 문자열|
|Info.Cols|`String`|<span class="required">필수</span>|열 레이블 필드에 설정할 컬럼의 Index 또는 SaveName을 구분자 `|`로 연결한 문자열|
|Info.Value|`String`|<span class="required">필수</span>|계산 대상 컬럼의 Index 또는 SaveName을 구분자 `|`로 연결한 문자열|
|Info.ValueType|`String`|<span class="required">필수</span>|계산 대상 컬럼별 계산 방법을 구분자 `|`로 연결한 문자열 (`Sum` : 합계, `Count` : 건수)|
|Info.DefaultView|`String`|<span class="optional">선택</span>|계산 결과 값이 없는 경우 표시할 문자열|
|Info.SortRow|`Boolean`|<span class="optional">선택</span>|행 레이블에 대한 Sort 처리 여부|
|Info.AutoFitColWidth|`String or Array`|<span class="optional">선택</span>|FitColWidth 자동 호출 위치 설정<br>- `init` : 초기화 및 데이터 클리어 이후<br>- `search` : 조회 및 엑셀 로드 이후<br>- `resize` : 시트 Resize 이후<br>- `colhidden` :	컬럼 숨김/보임 이후<br>- `rowtransaction` : 로우 추가/삭제/숨김/보임 이후<br>- `colresize` : 넓이가 변경된 컬럼을 제외한 나머지 컬럼의 FitColWidth|
|Info.CalcSumRatio|`Number`|<span class="optional">선택</span>|합계 비율 모드<br>- `0` : 기본 합계<br>- `1` : 총 합계 비율<br>- `2` : 열 합계 비율<br>- `3` : 행 합계 비율|
|DataSheet|`Object`|<span class="required">필수</span>|원본 데이터가 있는 IBSheet의 객체|



### Returns
***none***

### Example
```javascript
// Index가 5,6,7 인 컬럼을 행 레이블 필드로 설정하고, Index가 8,9,10 인 컬럼을 열 레이블의 필드로 설정하여
// Index가 13 인 컬럼에 대한 요약정보(합계)를 표시하는 피벗 테이블 구성
mySheet.CreatePivotTable({
  "Rows": "5|6|7",
  "Cols": "8|9|10",
  "Value": "13",
  "ValueType": "Sum"
}, dataSheet);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.0|AutoFitColWidth, CalcSumRatio 인자 속성 추가|