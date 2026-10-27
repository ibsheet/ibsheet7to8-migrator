# GetUseDefaultTime ***(core method)***

> 셀의 Format 이 `Hm` 또는 `Hms` 이고, 데어터가 빈 값인 경우, 편집 모드 변경시 시스템의 현재 시간을 기본으로 설정할지 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetUseDefaultTime();
```

### Info
***none***



### Returns
***Boolean, 현재 시간 표시 여부***

### Example
```javascript
// 현재 시간 기본으로 설정 여부 확인
console.log("useDefaultTime:", mySheet.GetUseDefaultTime());
```


### Since

|version|desc|
|---|---|
|7.0.0.0||