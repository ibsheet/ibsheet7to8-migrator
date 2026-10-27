# Reset ***(core method)***

> 초기 로드시 설정된 모든 기본 속성을 제거하고 초기 상태로 되돌립니다.

### Syntax
```javascript
ObjId.Reset(KeepTheme);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|KeepTheme|`Boolean`|<span class="optional">선택</span>|적용되어 있는 테마 유지 여부 (Default: 0)|



### Returns
***Object, 새로 생성된 시트 객체***

### Example
```javascript
// 이전 설정을 클리어하고 다시 초기화 설정 처리
mySheet.Reset();
IBS_InitSheet(mySheet, info);

// 이전 설정했던 테마를 유지하고 클리어 처리
mySheet.Reset(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||