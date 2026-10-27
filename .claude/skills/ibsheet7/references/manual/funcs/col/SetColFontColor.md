# SetColFontColor ***(col method)***

> 대상 컬럼 전체의 글자색을 설정 합니다. 헤더 행을 제외한 데이터 행의 글자색만 처리 합니다. <br>
> 컬럼이 존재하지 않는 경우 에러메시지 없이 글자색 설정은 취소 됩니다. <br>
> 색상 설정은 WebColor로 설정 합니다. <br>
> 2개행 이상의 단위데이터행 구조에서 Col 인자에 Index를 설정할 경우 모든 행에 대해서 처리를 하고, SaveName으로 설정할 경우 해당 SaveName이 포함된 행에 대해서만 처리 합니다.

### Syntax
```javascript
ObjId.SetColFontColor(Col, Color);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|
|Color|`String`|<span class="required">필수</span>|색상 값|


### Returns
***none***

### Example
```javascript
//컬럼 글자색을 빨간색으로 설정
mySheet.SetColFontColor(1, "#FF0000");

//2컬럼 글자색을 1컬럼 글자색으로 설정
mySheet.SetColFontColor(2, mySheet.GetColFontColor(1));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
