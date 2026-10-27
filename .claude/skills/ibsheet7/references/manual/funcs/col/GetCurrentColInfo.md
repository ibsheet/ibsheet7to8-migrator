# GetCurrentColInfo ***(col method)***

> 현재 컬럼들의 위치, 숨김, 너비 정보를 확인합니다. <br>
> 반환되는 값은 헤더 메뉴에 있는 localStorage 에 저장되는 정보와 동일합니다. <br>
> localStorage 에 저장하지 않고 그 외의 저장소에 저장하여 관리 하는 경우에 사용합니다.

### Syntax
```javascript
ObjId.GetCurrentColInfo();
```

### Info
***none***



### Returns
***String	현재 컬럼들의 숨김, 너비, 위치 정보 값***

### Example
```javascript
// 현재 컬럼들의 정보를 확인 한다.
console.log("colInfo:", mySheet.GetCurrentColInfo());
```


### Since

|version|desc|
|---|---|
|7.0.13.30||