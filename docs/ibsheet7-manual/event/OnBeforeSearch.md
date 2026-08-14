# OnBeforeSearch ***(event)***

> 조회 메소드 호출 시 Ajax 통신 직전에 발생합니다.<br>
> `DoSearch`, `DoSearchChild`, `DoSearchPaging`, `DoRowSearch` 메소드 호출 시 Ajax 통신 전에 발생한다.<br>
> 조회 중 이미지 등을 사용자가 원하는 이미지로 변경하고자 할때 사용한다.



### Syntax
```javascript
function 오브젝트ID_OnBeforeSearch() { }
```

### Parameters
***none***


### Example
```javascript
function mySheet_OnBeforeSearch() {
  alert("조회중입니다.");
}
```

### See also
  * [DoSearch]
  * [DoSearchChild]
  * [DoSearchPaging]
  * [DoRowSearch]


### Since

|version|desc|
|---|---|
|7.0.0.0||