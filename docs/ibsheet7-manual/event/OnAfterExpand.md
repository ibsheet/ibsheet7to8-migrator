# OnAfterExpand ***(event)***

> 트리 형태 시트를 사용할 때 + 기호나 – 기호를 클릭하여 트리를 접거나 펼친후에 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_OnAfterExpand(Row, Expand) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|해당 셀의 Row Index|
|Expand|`Long`|7 : 펼치는 경우<br>2 : 접는경우|


### Example
```javascript
function mySheet_OnAfterExpand(Row, Expand) {
   alert( Row + "행, "+ Expand +"의 상태");
}
```

### See also
  * [OnBeforeExpand event](/docs/event/OnBeforeExpand)
  * [GetRowExpand method](/docs/funcs/tree/GetRowExpanded)
  * [SetRowExpand method](/docs/funcs/tree/SetRowExpanded)
  * [GetRowLevel method](/docs/funcs/tree/GetRowLevel)
  * [SetRowLevel method](/docs/funcs/tree/SetRowLevel)
  * [ShowTreeLevel method](/docs/funcs/tree/ShowTreeLevel)

### Since

|version|desc|
|---|---|
|7.0.0.0||