# GetSelectionRows ***(core method)***

> 사용자가 드레그를 통해 선택한 영역의 행을 구분자로 구분하여 반환합니다. <br>
> 구분자를 설정하지 않으면 기본적으로 `|`로 묶어서 반환합니다.


### Syntax
```javascript
ObjId.GetSelectionRows(DeliChar);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|DeliChar|`String`|<span class="optional">선택</span>|컬럼 구분자 (Default: `|`)|




### Returns
***String, 선택 되어있는 행의 Index 조합 문자열***

### Example
```javascript
// 핸재 선택되어있는 행의 Index 확인
var rows = mySheet.GetSelectionRows();

if (rows.length > 0)  {
  rows = rows.split("|");

  for (var i = 0, len = rows.length; i < len; i++) {
      var row = rows[i];
      console.log("selectedRow " + (i + 1) + ":", row);
  }
} else {
  console.log("selectedRow is none");
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||