# ShowGroupRow ***(group method)***

> 그룹 행을 생성 또는 보이도록 설정 합니다. <br>
> 생성된 그룹 행에 헤더의 컬럼을 `Drag & Drop` 방식으로 이동하면 해당 컬럼을 기준으로 그룹핑 할 수 있습니다. <br>
> 그룹핑은 대상 컬럼을 기준으로 트리 구조 형태로 표현 되며 그룹행의 우측 상단의 버튼을 통해 펼치기 / 접기 기능을 사용 할 수 있습니다.

### Syntax
```javascript
ObjId.ShowGroupRow(Cols, Format);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Cols|`Long or String`|<span class="required">필수</span>|그룹핑 하고자 하는 컬럼의 Index 또는 SaveName을 구분자 `|`로 연결한 문자열|
|Format|`String`|<span class="optional">선택</span>|아래의 키를 이용한 그룹기준 컬럼의 데이터 포맷 (Default: "")<br> - `{%s}` : 해당 셀의 값<br>- `{%c}` : 자식노드 개수|


### Returns
***none***

### Example
```javascript
// 그룹행 생성
mySheet.ShowGroupRow();

// Index가 3인 컬럼을 기본 그룹 기준 컬럼으로 설정하여 생성
mySheet.ShowGroupRow('3');

// SaveName이 'sDept', 'sName'인 컬럼을 기본 그룹 기준 컬럼으로 설정하여 생성
mySheet.ShowGroupRow('sDept|sName');

// 그룹 기준 컬럼 포맷 설정
mySheet.ShowGroupRow('', '{%s} ({%c}건)');

// 그룹 기준 컬럼 포맷 일부에 스타일 설정
mySheet.ShowGroupRow('', '{%s} <font color="gray">({%c}건)</font>');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.10.0|Format 인자 추가|
|7.0.12.1|그룹기준 컬럼 및 Format 에 대한 동적 변경 기능 추가|
