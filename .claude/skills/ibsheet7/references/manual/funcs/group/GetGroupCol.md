# GetGroupCol ***(group method)***

> 현재 설정되어있는 그룹 기준 컬럼의 SaveName을 확인합니다.<br>
> 2개 이상의 컬럼이 설정되어 있는 경우는 `|`를 구분자로 하여 연결된 문자열로 리턴 합니다.


### Syntax
```javascript
ObjId.GetGroupCol();
```

### Info
***none***

### Returns
***String,	그룹 기준 컬럼의 SaveName을 구분자 '|'로 연결한 문자열***

### Example
```javascript
// 그룹 기준 컬럼 확인
console.log('groupCols: ', mySheet.GetGroupCol());
```


### Since

|version|desc|
|---|---|
|7.0.0.0||