# SetGroupActionMenu ***(group method)***

> 그룹행 영역에 설정된 컨텍스트 메뉴를 설정합니다. <br>
> `주의` 이 기능을 사용하려면 초기화 함수[SetConfig](/docs/funcs/init/SetConfig) 설정시 `UseGroupActionMenu:1(true)` 로 설정되어야 합니다.


### Syntax
```javascript
ObjId.SetGroupActionMenu(MenuText, MenuCode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|MenuText|`String`|<span class="required">필수</span>|메뉴명을 구분자 `|`로 연결한 문자열|
|MenuCode|`String`|<span class="required">필수</span>|메뉴코드를 구분자 `|`로 연결한 문자열|

### Enum

  * Code

    - **_ibInitGroupCols**	: 그룹 정보 초기화
    - **_ibSaveGroupCols**	: 그룹 정보 저장
    - **_ibResetGroupCols** :	그룹 정보 저장 취소

### Returns
***none***

### Example
```javascript
// 컬럼 정렬 메뉴 구성
mySheet.SetGroupActionMenu("오름차순 정렬|내림차순 정렬", "_ibColSortAsc|_ibColSortDesc");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||