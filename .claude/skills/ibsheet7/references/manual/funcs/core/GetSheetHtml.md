# GetSheetHtml ***(core method)***

> 현재 화면에 보여지는 시트에 대한 html 코드를 반환 합니다.

### Syntax
```javascript
ObjId.GetSheetHtml();
```

### Info
***none***



### Returns
***Object (style, body로 이루어진 객체)***


* Returns Object Info

|Name|Type|Description|
|----|----|-----------|
|result|`Object`|옵션 객체<br>- `style` : 테마의 css 문자열<br>- `body` : html 태그 문자열|

### Example
```javascript
// 시트의 html tag 정보 확인
console.log("htmlInfo:", mySheet.GetSheetHtml());
```


### Since

|version|desc|
|---|---|
|7.0.0.0||