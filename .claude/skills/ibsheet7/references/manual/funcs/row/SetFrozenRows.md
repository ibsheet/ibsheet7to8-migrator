# SetFrozenRows ***(row method)***

> 고정행을 설정 합니다. <br>
> 고정행에 합계행, 필터행은 포함되지 않으며 고정행 생성 시 합계행, 필터행이 있는 경우 합계행, 필터행의 아래에 생성됩니다. <br>
> `제약사항`<br>
> - 고정행은 마우스를 이용한 행 선택 및 마우스 드래그를 통한 행 이동을 지원하지 않습니다.<br>
> - `서버페이지 조회 방식`, `단위데이터행`, `데이터 머지`, `트리` 시트 및 `소계`를 사용하는 경우에도 해당 기능이 지원되지 않습니다.<br>
> - 메인 섹션의 행을 모두 고정행으로 설정하는 경우, 시트에서 보여지는 영역내에서 설정한 고정행을 모두 표현할 수 없는 경우 시트가 정상적으로 동작하지 않을 수 있습니다.

### Syntax
```javascript
ObjId.SetFrozenRows(Rows);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|설정할 고정행 개수 (Default: 0)|



### Returns
***none***

### Example
```javascript
// 3개의 고정행을 설정
mySheet.SetFrozenRows(3);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||