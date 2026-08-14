# OnGroupFinish ***(event)***

> 그룹핑 처리가 완료된 시점에 이 이벤트가 발생합니다.


### Syntax
```javascript
function 오브젝트ID_ OnGroupFinish(Group) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Group|`String`|그룹 기준 컬럼의 SaveName을 구분자 `"|"`로 연결한 문자열|


### Example
```javascript
function mySheet_OnGroupFinish(group) {
  console.log("그룹기준 컬럼 : ", group.split("|").join(", "));
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.12.1||