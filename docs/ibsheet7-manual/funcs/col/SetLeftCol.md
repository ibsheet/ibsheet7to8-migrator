# SetLeftCol ***(col method)***

> 시트의 가장 좌측에 위치할 컬럼을 설정 합니다.<br>
> 컬럼의 위치 이동이 아닌 가로 스크롤의 이동으로 처리 됩니다.<br>
> 고정 컬럼 설정이 있는 경우 고정 컬럼 영역 이후의 첫번째에 설정 됩니다. 대상 컬럼을 가장 좌측에 위치할 수 없는 경우 가능한 범위 내에서 가장 좌측으로 설정 됩니다.

### Syntax
```javascript
ObjId.SetLeftCol(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|


### Returns
***none***

### Example
```javascript
//고정컬럼이 설정되어 있을경우
//4컬럼을 수평스크롤 가장 좌측에 보이는 컬럼으로 설정
mySheet.SetLeftCol(4);

//고정컬럼이 설정되어 있지 않을경우
//6컬럼을 수평스크롤 가장 좌측에 보이는 컬럼으로 설정
mySheet.SetLeftCol(6);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||