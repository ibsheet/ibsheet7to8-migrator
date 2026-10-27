# SetImageList ***(core method)***

> 이미지 경로에 대한 Index를 설정합니다. 중복된 Index 를 설정하는 경우에는 마지막 설정한 값을 유지 합니다.

### Syntax
```javascript
ObjId.SetImageList(index, path);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|index|`Number`|<span class="required">필수</span>|이미지 Index|
|path|`String`|<span class="required">필수</span>|이미지 경로|



### Returns
***none***

### Example
```javascript
// 이미지 리스트 설정
var images = ["/img/a.gif", "/img/b.gif", "/img/c.gif"];

for (var i = 0, len = images.length; i < len; i++) {
  mySheet.SetImageList(i, images[i]);
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||