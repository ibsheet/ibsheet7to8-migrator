# OnBeforeSave ***(event)***

> 저장 메소드 호출 시 Ajax 통신 직전에 발생하는 이벤트입니다.<br>
> `DoSave`, `DoAllSave` 메소드 호출 시 Ajax 통신 전에 발생합니다.<br>
> 저장 중 이미지 등을 사용자가 원하는 이미지로 변경하고자 할때 사용합니다.



### Syntax
```javascript
function 오브젝트ID_OnBeforeSave() { }
```

### Parameters
***none***



### Example
```javascript
function mySheet_OnBeforeSave() {
   alert("저장중입니다.");
}
```

### See also
  * [DoSave method](/docs/funcs/save/DoSave)
  * [DoAllSave method](/docs/funcs/save/DoAllSave)

### Since

|version|desc|
|---|---|
|7.0.0.0||