# SetDown2TextConfig ***(export method)***

> Down2Text 메소드의 기본 속성을 정의 합니다. <br>
> 이 메소드를 통해 정의한 속성은 Down2Text 메소드의 기본값으로 처리 됩니다.

### Syntax
```javascript
ObjId.SetDown2TextConfig([Opt]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Opt|`Object`|<span class="optional">선택</span>|기본으로 정의할 속성 (객체 세부 사항은 [Down2Text](/docs/funcs/export/Down2Text) 메소드 참고)|


### Returns
***none***

### Example
```javascript
// DownHeader 속성에 대한 기본값 정의
mySheet.SetDown2TextConfig({
  "DownHeader": 1
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||