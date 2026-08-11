# SetLoadTextConfig ***(import method)***

> LoadText 메소드의 기본 속성을 정의 합니다.<br>
> 이 메소드를 통해 정의한 속성은 [LoadText](/docs/funcs/import/LoadText) 메소드의 기본값으로 처리가 됩니다.

### Syntax
```javascript
ObjId.SetLoadTextConfig([Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Opt|`Object`|<span class="optional">선택</span>|기본으로 정의할 속성 객체 ([LoadText](/docs/funcs/import/LoadText) 참고)|


### Returns
***none***

### Example
```javascript
// Mode 속성에 대한 기본값 정의
mySheet.SetLoadTextConfig({
  "Mode": "HeaderMatch"
});
```


### Since

|version|desc|
|---|---|
|7.0.13.27||