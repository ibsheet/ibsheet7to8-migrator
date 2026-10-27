# GetChildRows ***(search method)***

> 대상 행의 특정 레벨까지의 자식행을 확인 합니다. <br>
> MaxLevel 인자를 설정하지 않는 경우 모든 자식 행에 대해서 처리 합니다.

### Syntax
```javascript
ObjId.GetChildRows(Row, [MaxLevel]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|
|MaxLevel|`Integer`|<span class="optional">선택</span>|확인할 자식행의 제한 레벨 (Default: -1)<br>-1인 경우 모든 자식행을 의미|



### Returns
***String, 대상 자식행들의 문자열 조합***

### Example
```javascript
// Index가 4인 행의 모든 자식 행 Index 확인
console.log('childRows: ', mySheet.GetChildRows(4));

// 자기 자신의 레벨 기준 +2 레벨까지 확인
console.log('childRows: ', mySheet.GetChildRows(4, mySheet.GetRowLevel() + 2));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||