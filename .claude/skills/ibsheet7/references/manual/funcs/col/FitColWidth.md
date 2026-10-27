# FitColWidth ***(col method)***

> 각 컬럼 너비를 인자로 설정한 비율 단위로 설정하거나 시트의 전체 너비에 맞게 비율 기준으로 재 설정 합니다. <br>
> ratio 인자를 설정하지 않은 경우 모든 컬럼의 너비 합이 시트의 너비에 맞게 현재의 비율로 재설정 되며, ratio 인자를 설정한 경우 해당 비율로 재설정 됩니다.

### Syntax
```javascript
ObjId.FitColWidth(ratio);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|ratio|`String`|<span class="optional">선택</span>|컬럼별 너비 비율을 구분자 `|`로 연결한 문자열|


### Returns
***none***

### Example
```javascript
// 컬럼들의 현재의 너비 비율을 유지하며 시트 너비에 맞게 재설정 처리
mySheet.FitColWidth();

// 시트전체 너비를 기준으로 첫번째 컬럼부터 10%, 20%, 10%, 30% 의 너비 비율로 재설정 처리
mySheet.FitColWidth('10|20|10|30');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||