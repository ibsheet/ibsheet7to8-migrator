# OnResize ***(event)***

> 너비를 %로 설정할 때, IBSheet의 너비 또는 높이가 변경된 경우 이벤트가 발생합니다.<br>
> 이 이벤트는 사용자가 드래그를 통해 창의 사이즈를 조절하는 경우 굉장히 빈번하게 발생하여 브라우저에 부담을 줄 수 있습니다.<br>
> 따라서 가급적이면 이 이벤트보다는 `OnSmartResize` 이벤트를 사용할 것을 권장합니다.



### Syntax
```javascript
function 오브젝트ID_OnResize(Width, Height) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Width|`Integer`|전체 너비|
|Height|`Integer`|전체 높이|



### Example
```javascript
function mySheet_OnResize(Width, Height) {
  //변경된 정보에 따라 컬럼들의 너비를 재조정한다.
  mySheet.FitColWidth();
}
```

### See also
  * [OnSmartResize event](/docs/event/OnSmartResize)


### Since

|version|desc|
|---|---|
|7.0.0.0||