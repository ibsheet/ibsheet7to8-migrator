# SetColBackColor ***(col method)***

> 대상 컬럼의 배격색을 설정 합니다.<br>
> 적용 범위는 헤더, 합계, 소계, 누계행을 제외한 데이터행 영역에 대하여 처리 합니다.<br>
> color 인자 값이 빈값인 경우 이전 설정을 초기화 합니다.<br>
> 2개행 이상의 단위데이터행 구조인 경우 Col 인자에 Index를 설정할 경우 모든행에 대해서 처리를 하고, SaveName으로 설정할 경우 해당 SaveName인 행에 대해서만 처리 합니다.

### Syntax
```javascript
ObjId.SetColBackColor(Col, Color);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|
|Color|`String`|<span class="required">필수</span>|WebColor 색상 값|



### Returns
***none***

### Example
```javascript
// Index가 3인 컬럼의 배경색을 red 로 설정
mySheet.SetColBackColor(3, 'red');            // WebColor 표준명
mySheet.SetColBackColor(3, '#ff0000');        // WebColor 16진수 표기법
mySheet.SetColBackColor(3, '#f00');           // WebColor 16진수 약식 표기법
mySheet.SetColBackColor(3, 'rgb(255, 0, 0)'); // WebColor RGB 표기법

//SaveName이 "sa_DistQty"인컬럼 배경색을 설정
mySheet.SetColBackColor("sa_DistQty","#FFDDDD");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||