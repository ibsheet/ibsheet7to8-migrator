# SetColEditable ***(col method)***

> 대상 컬럼의 편집 가능 여부 속성을 설정합니다. <br>
> 설정에 대한 적용 범위는 헤더, 합계, 소계, 누계행을 제외한 데이터행 영역에 대하여 처리 합니다. <br>
> `주의` 컬럼의 데이터 타입이 Seq, Status, Result, Popup, Image 인 경우는 설정과 무관하게 편집 불가 입니다.

### Syntax
```javascript
ObjId.SetColEditable(Col, Editable);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|
|Editable|`Boolean`|<span class="required">필수</span>|특정 컬럼의 Edit 가능 여부|


### Returns
***none***

### Example
```javascript
//index가 5컬럼의 Edit 가능 여부를 불가로 설정한다.
mySheet.SetColEditable(5,0);

//index가 5컬럼의 Edit 가능 여부를 가능으로 설정한다.
mySheet. SetColEditable (5,1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||