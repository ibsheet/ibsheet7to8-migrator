# SetCountFormat ***(core method)***

> 건수 정보의 출력 포맷을 설정 합니다.

### Syntax
```javascript
ObjId.SetCountFormat(format);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|format|`String`|<span class="required">필수</span>|예약어를 이용한 출력 포맷<br>- `BOTTOMDATA` : View 영역의 하단에 위치한 행의 번호<br>- `BOTTOMDATA2` : View 영역의 하단에 위치한 행의 번호(소계,누계행 제외)<br>- `TOTALROWS` : 서버페이징에서의 전체 조회 대상 데이터 건수(소계,누계 포함)<br>- `TOTALROWS2` : 서버페이징에서의 전체 조회 대상 데이터 건수(소계,누계 제외)<br>- `SEARCHROWS` : 조회된 데이터 건수 (상태값 : "")<br>- `INSERTROWS` : 입력 데이터 건수 (상태값 : "입력")<br>- `UPDATEROWS` : 수정 데이터 건수 (상태값 : "수정")<br>- `DELETEROWS` : 삭제 데이터 건수 (상태값 : "삭제")<br>- `ROWCOUNT` : 전체 데이터 건수<br>- `SELECTDATAROW` : 현재 선택된 행의 번호<br>- `FILTEREDCOUNT` : 필터링된 데이터 건수<br>- `FILTEREDCOUNT2` : 필터링된 데이터 건수 (소계,누계 제외)<br>- `HIDDENROWS` : 히든 처리된 행 건수<br>- `EXCEPTHIDE` : 전체 조회건수에서 히든처리된 행을 뺀 데이터 건수<br>- `ROWVIEWCOUNT` : ROWCOUNT - HIDDENROWS<br>- `FILTEREDVIEWCOUNT` : 필터 적용하기 전, 히든처리된 행 건수를 제외|



### Returns
***none***

### Example
```javascript
// 입력,수정,삭제 건수 출력 포맷 설정
mySheet.SetCountFormat('입력: INSERTROWS건 / 수정: UPDATEROWS / 삭제: DELETEROWS /');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.108|HIDDENROWS, EXCEPTHIDE, ROWVIEWCOUNT FILTEREDVIEWCOUNT 예약어 추가|
|7.0.13.126|BOTTOMDATA2, TOTALROWS2 예약어 추가|