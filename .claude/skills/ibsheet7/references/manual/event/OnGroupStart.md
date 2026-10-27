# OnGroupStart ***(event)***

> 그룹핑 처리가 되기전 시점에 이 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_ OnGroupStart(cols) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|cols|`String`|그룹 컬럼 정보|


### Example
```javascript
function mySheet_OnGroupStart(cols) {
  //현재 Group 중인 컬럼
  console.log("Group : "  + col);
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.13.83||