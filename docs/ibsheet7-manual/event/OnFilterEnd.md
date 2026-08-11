# OnFilterEnd ***(event)***

> 필터링이 완료된 후에 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_ OnFilterEnd(RowCnt, FirstRow) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|RowCnt|`Long`|필터링된 이후 행의 개수|
|FirstRow|`Long`|필터링된 이후 첫번째 행의 Index|



### Example
```javascript
function mySheet_ OnFilterEnd(RowCnt, FirstRow) {
  // 필터링 완료된 이후 처리할 로직
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||