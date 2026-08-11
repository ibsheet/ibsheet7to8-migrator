# GetHeaderActionMenu ***(core method)***

> 헤더 영역에서 설정된 컨텍스트 메뉴를 확인 한다.<br>
> `UseHeaderActionMenu` 속성이 0으로 설정된 경우 `-1`을 반환합니다. [UseHeaderActionMenu 참고](/docs/props/PropertyList/UseHeaderActionMenu)

### Syntax
```javascript
ObjId.GetHeaderActionMenu();
```

### Info
***none***


### Returns
***Object, MenuText/MenuCode로 이루어진 객체***

* Returns Info

|Name|Type|Description|
|----|----|-----------|
|menu|`Number or String`|컨텍스트 메뉴 정보 객체<br>- MenuText : 메뉴명을 구분자 `|`로 연결한 문자열<br>- MenuCode : 메뉴코드를 구분자 `|`로 연결한 문자열|


### Example
```javascript
// 헤더의 컨텍스트 메뉴 확인
console.log("headerMenu:", mySheet.GetHeaderActionMenu());
```


### Since

|version|desc|
|---|---|
|7.0.0.0||