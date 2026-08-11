# SetActionMenu ***(core method)***

> 데이터 영역에서 사용 할 컨텍스트 메뉴를 설정 합니다. <br>
> 컨텍스트 메뉴의 구성에 따라 `object` 형식 또는 `string` 형식으로 설정 할 수 있습니다. (메뉴 사이에 구분선을 넣고자 하는 경우에는 `*-`을 사용)<br>
> `menu` 인자를 빈값으로 설정하면 이전에 설정한 컨텍스트 메뉴가 초기화 됩니다. 동적으로 컨텍스트 메뉴를 사용하지 않고자 할때 menu 인자를 빈값으로 설정하여 사용합니다.<br>
> 컨텍스트 메뉴의 항목을 선택하면 `OnSelectMenu` 이벤트가 발생하며, 해당 메뉴에 대한 처리를 할 수 있습니다.

### Syntax
```javascript
ObjId.SetActionMenu([menu], Code);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|menu|`Array<Object> or String`|<span class="required">필수</span>|컨텍스트 메뉴 객체 또는 설정할 팝업메뉴 문자열 (구분자 `|`로 연결한 문자열)|
|menu.Text|`String`|<span class="required">필수</span>|항목의 문자열|
|menu.Code|`String`|<span class="optional">선택</span>|항목의 코드|
|menu.Icon|`String`|<span class="optional">선택</span>|항목이 좌측에 표시할 아이콘 url|
|menu.Items|`Array<object>`|<span class="optional">선택</span>|해당 메뉴 항목의 자식 메뉴 배열 집합|
|Code|`String`|<span class="optional">선택</span>|컨텍스트 메뉴 코드 (menu 인자가 string 형태인 경우에만 사용)|



### Returns
***none***

### Example
```javascript
// 컨텍스트 메뉴 설정 (간단한 방법 : 메뉴만 설정)
mySheet.SetActionMenu('행입력|행복사|*-|행삭제|*-|엑셀다운로드');

// 컨텍스트 메뉴 설정 (간단한 방법 : 메뉴와 코드 설정)
mySheet.SetActionMenu('행입력|행복사|*-|행삭제|*-|엑셀다운로드', 'Insert|Copy||Del||Export');

// 컨텍스트 메뉴 설정 (object 형태 : 일반)
mySheet.SetActionMenu([
  {"Text": "행입력", "Code": "Insert"},
  {"Text": "행복사", "Code": "Copy"},
  {"Text": "*-"},
  {"Text": "행삭제", "Code": "Del"},
  {"Text": "*-"},
  {"Text": "엑셀다운로드", "Code": "Export"}
]);

// 컨텍스트 메뉴 설정 (object 형태 : 계층구조)
mySheet.SetActionMenu([
  {"Text": "행입력", "Code": "Insert", "Items":
    [
      {"Text": "첫행 입력", "Code": "InsertFirst"},
      {"Text": "마지막행 입력", "Code": "InsertLast"}
    ]},
  {"Text": "행복사", "Code": "Copy"},
  {"Text": "*-"},
  {"Text": "행삭제", "Code": "Del"},
  {"Text": "*-"},
  {"Text": "엑셀다운로드", "Code": "Export"}
]);

// 컨텍스트 메뉴 설정 (object 형태 : 아이콘 사용)
mySheet.SetActionMenu([
  {"Text": "행입력", "Code": "Insert", "Icon": "ico_insert.gif"},
  {"Text": "행복사", "Code": "Copy", "Icon": "ico_copy.gif"},
  {"Text": "*-"},
  {"Text": "행삭제", "Code": "Del", "Icon": "ico_del.gif"},
  {"Text": "*-"},
  {"Text": "엑셀다운로드", "Code": "Export", "Icon": "ico_export.gif"}
]);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||