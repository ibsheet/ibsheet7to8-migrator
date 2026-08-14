# ColDelete ***(col method)***

> 컬럼을 동적으로 삭제 합니다.<br>
> col 인자를 설정하지 않은 경우 가장 마지막에 위치한 컬럼을 삭제 합니다.<br>
> 다음의 조건에 해당 하는 컬럼인 경우에는 삭제가 불가능합니다.<br>- 컬럼의 데이터 타입이 Seq, Status, DelCheck 인 경우<br>- 다른 컬럼의 계산식(CalcLogic)에 사용되는 컬럼인 경우<br>- 트리 기준 컬럼(TreeCol 속성 설정이 있는 컬럼)인 경우<br>- 단위데이터행 구조의 FixedMerge에 포함된 컬럼인 경우

### Syntax
```javascript
ObjId.ColDelete(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="optional">선택</span>|대상 컬럼의 Index 또는 SaveName (Default: 마지막 컬럼 Index)|



### Returns
***none***

### Example
```javascript
// Index값이 3인 컬럼을 삭제 한다.
mySheet.ColDelete(3);

// 마지막 컬럼을 삭제 한다.
mySheet.ColDelete();

// SaveName이 "sText"인 컬럼을 삭제 한다.
mySheet.ColDelete("sText");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||