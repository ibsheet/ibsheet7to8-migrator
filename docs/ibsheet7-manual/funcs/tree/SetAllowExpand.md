# SetAllowExpand ***(search method)***

> 트리 노드의 펼치기/닫기에 대한 허용 여부를 설정 합니다. <br>
> 이 기능은 설정 값이 지속성을 갖지 않고, 1회성으로 처리 되며, 일반적으로 `OnBeforeExpand` 이벤트에서 특정 조건에 따라 펼치기/닫기에 대한 제한을 두고자 할 때 사용 합니다.

### Syntax
```javascript
ObjId.SetAllowExpand(expand);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|expand|`Boolean`|<span class="required">필수</span>|펼치기/닫기에 대한 허용 여부|



### Returns
***none***

### Example
```javascript
function mySheet_OnBeforeExpand(row, expand) {
  // Index가 1인 행에 대한 접기 제한 처리
  if (row === 1 && expand === 2) {
    mySheet.SetAllowExpand(0);
  }
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||