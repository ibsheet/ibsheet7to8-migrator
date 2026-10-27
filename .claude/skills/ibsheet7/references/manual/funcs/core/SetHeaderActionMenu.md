# SetHeaderActionMenu ***(core method)***

> 헤더 영역에서 사용할 컨텍스트 메뉴를 설정합니다.<br>
> `menuCode` 인자 설정시 사전 정의 코드를 사용하는 경우 별도 코드 작성없이 해당 기능이 처리되고, 그렇지 않은 경우에는 `OnSelectMenu` 이벤트에서 처리 할 수 있습니다.<br>
> menuText 인자를 설정하지 않는 경우 기본메뉴로 설정처리 됩니다.<br>
> 기본으로 제공 되는 사전 정의 코드는 아래 Enum 참조

### Syntax
```javascript
ObjId.SetHeaderActionMenu(menuText, menuCode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|menuText|`String`|<span class="required">필수</span>|메뉴명을 구분자 `|`로 연결한 문자열|
|menuCode|`String`|<span class="required">필수</span>|메뉴코드를 구분자 `|`로 연결한 문자열|

### Enum

|Code|Description|
|----|-----------|
|_ibColSortAsc|대상 컬럼 오름 차순 정렬|
|_ibColSortDesc|대상 컬럼 내림 차순 정렬|
|_ibColHidden|대상 컬럼 숨김|
|_ibCancelColHidden|헤더메뉴로 숨긴 컬럼 출력|
|_ibSaveColPosition|현재 컬럼정보 저장 (위치, 컬럼 숨김여부, 너비)|
|_ibResetColPosition|저장된 컬럼정보 삭제|
|_ibRestoreColPosition|컬럼정보 초기화|
|_ibShowFilter|필터행 출력|
|_ibHideFilter|필터행 숨김|

### Returns
***none***

### Example
```javascript
// 컬럼 정렬 메뉴 구성
mySheet.SetHeaderActionMenu("오름차순 정렬|내림차순 정렬", "_ibColSortAsc|_ibColSortDesc");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||