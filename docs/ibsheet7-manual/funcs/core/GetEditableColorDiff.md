# GetEditableColorDiff ***(core method)***

> 편집가능 여부에 따른 셀의 배경색을 구분하여 표시할지 여부를 확인 합니다.

### Syntax
```javascript
ObjId.GetEditableColorDiff();
```

### Info
***none***



### Returns
***Integer, 설정 값***

|Enum|Description|
|----|-----------|
|0|편집불가능한 셀을 구분없이 표시|
|1|편집불가능한 셀을 css에서 설정한 색상으로 표시|
|2|편집불가능한 셀을 css의 설정값과 기본배경색의 조합으로 표시|

### Example
```javascript
// 편집가능 여부에 따른 셀의 배경색을 구분여부 확인
console.log("editableColorDiff:", mySheet.GetEditableColorDiff());
```


### Since

|version|desc|
|---|---|
|7.0.0.0||