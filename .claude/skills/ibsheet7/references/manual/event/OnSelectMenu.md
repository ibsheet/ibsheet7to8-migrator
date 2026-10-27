# OnSelectMenu ***(event)***

> 컬럼 팝업 메뉴가 아닌 ActionMenu에 설정된 메뉴가 표시되고, 사용자가 특정한 메뉴 항목을 선택할 때 이벤트가 발생합니다.<br>
> 이벤트에서 반환하는 Text는 메뉴항목에 표시된 글자와 동일하므로 각각 해당하는 기능을 처리합니다.<br>
> `Col` 인자는 컬럼의 ActionMenu 선택시에만 사용 할 수 있습니다.



### Syntax
```javascript
function 오브젝트ID_OnSelectMenu(Text, Code, Col) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Text|`String`|선택된 메뉴 문자열|
|Code|`String`|선택된 메뉴 코드 문자열|
|Col|`Long`|대상 컬럼의 Index|



### Example
```javascript
// 메뉴설정
mySheet.SetActionMenu("입력|행복사|-|행삭제|Clear|엑셀다운로드");

function mySheet_ OnSelectMenu(Text, Code) {
  // text 또는 code값으로 Action수행
  switch(text) {
    case "첫행입력" :
      mySheet.DataInsert(0);
      break;
    case "마지막행입력" :
      mySheet.DataInsert(-1);
      break;
	  case "입력" :
	    mySheet.DataInsert();
	    break;
    case "행복사":
	    mySheet.DataCopy();
	    break;
	  case "행삭제":
      mySheet.RowDelete();
      break;
	  case "Clear": //RemoveAll
	    mySheet.RemoveAll();
		  break;
	  case "엑셀다운로드":
		  mySheet.Down2Excel();
		  break;
	  default:
      break;
	}
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.16|Col 인자 추가|