# SetScrollInfoPosition ***(core method)***

> 세로 스크롤에 대한 지연 처리 방법 사용시 지연 처리 시간 동안 출력되는 메시지 출력 위치를 설정 합니다. <br>
> 세로 스크롤에 대한 지연 처리 방법 사용 여부는 `SetConfig` 메소드의 `DeferredVScroll` 속성을 이용하여 설정 합니다.

### Syntax
```javascript
ObjId.SetScrollInfoPosition(pos);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|pos|`String`|<span class="required">필수</span>|메시지 출력 위치<br>- `none` : 사용 안함<br>- `center` : 화면 중앙 위치<br>- `scroll` : 세로 스크롤의 스크롤 위치|



### Returns
***none***

### Example
```javascript
// 세로 스크롤의 스크롤 위치에 표시하도록 설정
mySheet.SetScrollInfoPosition('scroll');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||