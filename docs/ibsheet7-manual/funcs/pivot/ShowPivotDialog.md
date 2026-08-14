# ShowPivotDialog ***(pivot method)***

> 사용자가 시트에서 `ctrl + alt + T` 입력시 표시되는 피벗 테이블 설정 팝업을 호출 합니다. <br>
> 피벗 설정 다이얼로그를 통해 생성된 피벗 테이블 시트는 `원본시트명 + "_Pivot"`으로 시트명이 설정됩니다.<br>
> Ex ) mySheet에서 생성한 피벗테이블 결과 시트 : mySheet_Pivot


### Syntax
```javascript
ObjId.ShowPivotDialog();
```

### Info
***none***


### Returns
***none***

### Example
```javascript
// 피벗 테이블 설정 팝업 다이얼로그 출력
mySheet.ShowPivotDialog();
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.10.0|합계 비율 선택 기능 추가|