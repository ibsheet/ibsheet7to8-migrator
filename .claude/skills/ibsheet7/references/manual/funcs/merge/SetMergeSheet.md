# SetMergeSheet ***(merge method)***

> 시트의 셀 병합 방법을 설정 합니다.<br>
> 셀 병합은 Page 영역 내에서만 동일한 값에 대해 자동으로 셀 병합 처리 됩니다. 다만 `msPrevColumnMerge`를 사용하는 경우 [SetConfig](/docs/funcs/init/SetConfig)에서 `PrevColumnMergeMode`속성을 `0`으로 설정하면 전체 데이터를 기준으로 처리 할 수 있습니다.<br>
> `주의` 위 방식은 셀 병합 행의 개수가 많아지면 속도가 저하될 수 있습니다.

### Syntax
```javascript
ObjId.SetMergeSheet(Merge);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Merge|`Integer`|<span class="required">필수</span>|머지 종류 (아래 Enum 표 참조)|


### Enum
  * Merge

|Enum|Const|Description|
|----|----|------------|
|0|`msNone`|사용안함|
|1|`msAll`|전체영역 자동 셀 병합|
|2|`msPrevColumnMerge`|이전 컬럼의 셀 병합 영역 내에서의 셀 병합|
|3|`msFixedMerge`|단위 데이터행 구조에서 고정 셀 병합|
|4|`msBaseColumnMerge`|기준 컬럼의 셀 병합 영역 내에서의 셀 병합|
|5|`msHeaderOnly`|헤더영역 자동 셀 병합|
|7|`msHeaderOnly + msPrevColumnMerge`||
|8|`msHeaderOnly + msFixedMerge`||
|9|`msHeaderOnly + msBaseColumnMerge`||



### Returns
***none***

### Example
```javascript
// 헤더 영역만 셀병합 처리 방법 설정
mySheet.SetMergeSheet(5);
mySheet.SetMergeSheet(msHeaderOnly);

// 전체 영역에 대한 msHeaderOnly + msPrevColumnMerge 설정
// ---- 초기화시 PrevColumnMergeMode 속성 설정
mySheet.SetConfig({
    "SearchMode": 2,
    "Page": 50,
    "PrevColumnMergeMode": 0
});

// ---- msHeaderOnly + msPrevColumnMerge 설정
mySheet.SetMergeSheet(7);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||