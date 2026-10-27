# !Down2Hml ***(export method)***

> IBSheet의 내용을 HwpML 파일로 변환하여 다운로드 합니다.

### Syntax
```javascript
ObjId.Down2Hml(opt);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|opt|`Object`|<span class="optional">선택</span>|다운시 사용할 옵션|

### Enum
  * opt

|Name|Type|Required|Description|
|----|----|------|-------------|
|Title|`Object`|<span class="optional">선택</span>|타이틀 관련 설정 옵션<br>- `Text` : 타이틀 문자열<br>- `Align` : 타이틀 좌우 정렬값 (Left, Center (Default), Right)|
|DocOrientation|`String`|<span class="optional">선택</span>|문서 방향<br>- `Portrait` : 세로 방향 (Default)<br>- `Landscape` : 가로 방향|
|DownCols|`String`|<span class="optional">선택</span>|대상 컬럼의 Index 또는 SaveName을 구분자 `|`로 연결한 문자열|
|ExtendParam|`String`|<span class="optional">선택</span>|전달할 Param 정보|
|FileName|`String`|<span class="optional">선택</span>|저장할 파일명 (확장자 생략 가능) (Default: "IBSheet")|


### Returns
***none***

### Example
```javascript
// 타이틀과 파일명을 설정하여 HwpML 파일로 다운
var params = {
  Title:{Text:"타이틀입니다.", Align:"Center"},
  FileName:"IBSheet_HML"
};
mySheet.Down2Hml(params);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||