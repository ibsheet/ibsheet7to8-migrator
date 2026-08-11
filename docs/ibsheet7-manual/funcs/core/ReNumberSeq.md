# ReNumberSeq ***(core method)***

> Seq 컬럼의 순번을 재설정합니다.

### Syntax
```javascript
ObjId.ReNumberSeq([Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Opt|`Object`|<span class="optional">선택</span>|조회 처리 옵션|
|Opt.Order|`String`|<span class="optional">선택</span>|넘버링 처리 방식<br>- `asc` : 오름차순 (Default)<br>- `desc` : 내림차순|
|Opt.VisibleRow|`Boolean`|<span class="optional">선택</span>|숨김행 Seq 적용 여부 (Default: 0)|



### Returns
***none***

### Example
```javascript
// 내림 차순으로 재설정 처리
mySheet.ReNumberSeq("desc");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||