# SetScrollInfoFormat ***(core method)***

> 세로스크롤에 대한 지연 처리 방법 사용시 지연 처리 시간 동안 출력되는 메시지 포맷을 설정 합니다. <br>
> 메시지 포맷 구성은 간단한 마크업 태그를 이용하여 구성 할 수 있습니다. `주의` 포맷 구성에 대한 복잡도에 따라 성능에 영향을 미치므로 가급적이면 간단한 형식을 사용하는 것을 권장 합니다.<br>
> 별도 설정이 없는 경우 `TOPROW or TOTALROWS`를 기본으로 처리 하고, 세로 스크롤에 대한 지연 처리 방법 사용 여부는 `SetConfig` 메소드의 `DeferredVScroll` 속성을 이용하여 설정 합니다.

### Syntax
```javascript
ObjId.SetScrollInfoFormat(format);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|format|`String`|<span class="required">필수</span>|설정할 메시지 포맷 문자열<br>- `TOTALROWS`	: 전체 건수<br>- `TOPROW` : 스크롤 이동시 상단에 위치할 행의 Index<br>- 컬럼의 `Index` 또는 `SaveName` : 상단에 위치할 행에서 해당 컬럼의 셀 값|




### Returns
***none***

### Example
```javascript
// Index가 3인 컬럼의 셀 정보 표시 설정
mySheet.SetScrollInfoFormat('[TOPROW / TOTALROWS] |3|');

// SaveName이 'sDept'인 컬럼의 셀 정보 표시 설정
mySheet.SetScrollInfoFormat('[TOPROW / TOTALROWS] |sDept|');

// 간단안 마크업 태그를 이용한 설정 (셀 정보에 blue 색상 적용)
var format = '[TOPROW / TOTALROWS] <font color="blue">|sName|</font>';
mySheet.SetScrollInfoFormat(format);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||