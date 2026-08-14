# SetHeaderMode ***(core method)***

> 헤더의 옵션을 설정 합니다. <br>
> `InitHeaders` 메소드에서 설정한 옵션을 초기화 이후 변경하고자 할 때 사용합니다.

### Syntax
```javascript
ObjId.SetHeaderMode([opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|opt|`Object`|<span class="required">필수</span>|설정 옵션 객체|
|opt.ColMove|`Boolean`|<span class="optional">선택</span>|마우스 드래그를 이용한 컬럼 이동 허용 여부|
|opt.ColResize|`Boolean`|<span class="optional">선택</span>|마우스 드래그를 이용한 컬럼 리사이즈 허용 여부|
|opt.HeaderCheck|`Boolean`|<span class="optional">선택</span>|헤더의 전체체크 사용 여부|
|opt.Sort|`Number`|<span class="optional">선택</span>|헤더 클릭을 통한 컬럼 Sort 옵션<br>- `0` : Sort 기능 사용 안함<br>- `1` : Sort 기능 사용<br>- `2` : Sort 아이콘만 표시 처리<br>- `3` : colSpan 아닌 헤더 셀만 Sort 기능 사용|




### Returns
***none***

### Example
```javascript
// Sort 처리방법 변경
mySheet.SetHeaderMode({
  "Sort" : 0
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||