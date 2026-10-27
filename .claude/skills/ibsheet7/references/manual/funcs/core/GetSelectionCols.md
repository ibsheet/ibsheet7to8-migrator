# GetSelectionCols ***(core method)***

> 현재 선택 되어있는 컬럼의 Index를 인자로 설정한 구분자로 조합한 문자열을 반환 합니다.

### Syntax
```javascript
ObjId.GetSelectionCols(DeliChar);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|DeliChar|`String`|<span class="optional">선택</span>|컬럼 구분자 (Default: `|`)|



### Returns
***String, 선택 되어있는 컬럼의 Index 조합 문자열***

### Example
```javascript
// 핸재 선택되어있는 컬럼의 Index 확인
var cols = mySheet.GetSelectionCols();

if (cols.length > 0)  {
  cols = cols.split("|");

  for (var i = 0, len = cols.length; i < len; i++) {
      var col = cols[i];
      console.log("selectedCol " + (i + 1) + ":", col);
  }
} else {
  console.log("selectedCol is none");
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||