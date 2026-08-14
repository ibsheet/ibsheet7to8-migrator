# SelectCell ***(core method)***

> 특정 셀에 포커스를 설정 합니다. <br>
> Focus 인자 속성값을 `0`으로 설정한 경우 Edit 속성 설정과 무관하게 편집모드 설정이 불가능합니다.

### Syntax
```javascript
ObjId.SelectCell(Row, Col, [Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|선택할 셀의 Row Index|
|Col|`Long or String`|<span class="required">필수</span>|선택할 셀의 Column Index 또는 SaveName|
|Opt|`Object`|<span class="optional">선택</span>|설정 옵션 객체|
|Opt.Edit|`Boolean`|<span class="optional">선택</span>|셀 선택시 편집모드 여부를 설정 (Default: 0)|
|Opt.EditText|`String`|<span class="optional">선택</span>|Edit 속성이 1일때 편집상태의 문자열 설정 (Defulat: "")|
|Opt.SelectEditText|`Boolean`|<span class="optional">선택</span>|편집시 기존 값에 대한 select 처리 여부 (Default: 1)|
|Opt.Event|`Boolean`|<span class="optional">선택</span>|OnSelectCell 이벤트 발생 여부 (Default: 1)|
|Opt.Focus|`Boolean`|<span class="optional">선택</span>|셀 선택후 포커스 처리 여부 (Default: 1)|




### Returns
***none***

### Example
```javascript
// (5, 3) 셀로 포커스 이동.
mySheet.SelectCell(5, 3);

// (5, 3) 셀로 포커스 이동 후 편집모드로 전환.
mySheet.SelectCell(5, 3,  {
  "Edit" : 1
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||