# RemoveAll ***(core method)***

> 헤더행을 제외한 모든 데이터 행을 제거 합니다.

### Syntax
```javascript
ObjId.RemoveAll([opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|opt|`Object`|<span class="optional">선택</span>|설정하고자 하는 시트 데이터행 삭제 옵션|
|opt.SumRow|`Object`|<span class="optional">선택</span>|AutoSum 컬럼만 지우도록 설정|



### Returns
***none***

### Example
```javascript
// 시트의 데이터영역 클리어 처리
mySheet.RemoveAll();

// AutoSum 컬럼만 지우기
var opt = { "SumRow" : "AutoSum" };
mySheet.RemoveAll(opt);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||