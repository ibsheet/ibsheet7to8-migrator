# GetCurrentPage ***(core method)***

> 현재의 페이지 Index를 확인 합니다.<br>
> 이 기능을 사용하기 위해 서는 `SetConfig` 메소드에서 `SearchMode` 속성을 이용하여 `페이징 모드`로 설정해야 합니다.

### Syntax
```javascript
ObjId.GetCurrentPage();
```

### Info
***none***



### Returns
***Number, 현재의 페이지 Index***

### Example
```javascript
// 페이징 모드 설정
mySheet.SetConfig({
  "SearchMode": 1,
  "Page": 30
});

// 현재의 페이지 Index 확인
console.log('pageIndex: ', mySheet.GetCurrentPage());
```


### Since

|version|desc|
|---|---|
|7.0.0.0||