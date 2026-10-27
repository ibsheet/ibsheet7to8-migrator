# GetImageList ***(core method)***

> Index에 해당 하는 이미지 경로를 확인 합니다.

### Syntax
```javascript
ObjId.GetImageList(index);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|index|`Number`|<span class="required">필수</span>|이미지의 Index|


### Returns
***String,해당 인덱스의 이미지 경로***

### Example
```javascript
// Index 가 1인 이미지 경로 확인
console.log("imgPath:", mySheet.GetImageList(1));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||