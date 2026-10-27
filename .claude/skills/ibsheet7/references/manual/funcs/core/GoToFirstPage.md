# GoToFirstPage ***(core method)***

> 가장 첫번째의 페이지로 이동 합니다. <br>
> `주의` 이 기능을 사용하기 위해서는 `SetConfig` 메소드에서 `SearchMode` 속성을 이용하여 `페이징 모드(1)`로 설정 해야 합니다.

### Syntax
```javascript
ObjId.GoToFirstPage();
```

### Info
***none***



### Returns
***none***

### Example
```javascript
// 페이징 모드 설정
mySheet.SetConfig({
  "SearchMode": 1,
  "Page": 30
});

// 가장 첫번째의 페이지로 이동
mySheet.GoToFirstPage();
```


### Since

|version|desc|
|---|---|
|7.0.0.0||