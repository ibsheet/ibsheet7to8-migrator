# SetPageCount ***(core method)***

> `SearchMode`에서 사용되는 Page 개수를 설정합니다. [SearchMode 참조](/docs/props/PropertyList/SearchMode)<br>
> 설정한 Page 값은 설정 이후 다시 조회하는 시점부터 적용 됩니다.

### Syntax
```javascript
ObjId.SetPageCount(page, renderPage);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|page|`Number`|<span class="required">필수</span>|Page 개수|
|renderPage|`Number`|<span class="required">필수</span>|렌더링 페이지 단위 행의 개수 (`smServerPaging2`에서만 사용)|



### Returns
***none***

### Example
```javascript
// Page 개수를 30으로 설정
mySheet.SetPageCount(30);

// smServerPaging2 에서 Page 개수를 1000, renderPage를 50으로 설정
mySheet.SetPageCount(1000, 50);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||