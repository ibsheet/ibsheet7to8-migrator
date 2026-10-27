# SetExtendLastCol ***(col method)***

> 마지막 컬럼의 너비를 전체 너비에 맞게 자동으로 맞출것인지 여부를 설정 합니다.


### Syntax
```javascript
ObjId.SetExtendLastCol(Extend);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Extend|`Boolean`|<span class="required">필수</span>|마지막 컬럼 너비 확장 여부 (Default: 0)|



### Returns
***none***

### Example
```javascript
// 마지막 컬럼을 전체 너비에 맞추도록 설정
mySheet.SetExtendLastCol(1);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||