# GetColWidth ***(col method)***

> 대상 컬럼의 너비를 확인 합니다. <br>
> 픽셀 단위의 너비를 설정할 수 있고, 값을 0으로 설정하면 해당 컬럼 내의 Text 중 가장 긴 값에 맞게 너비를 자동 조정합니다.<br>
> 컬럼이 존재하지 않는 경우 에러메시지는 표시하지 않지만 처리는 취소 됩니다.


### Syntax
```javascript
ObjId.GetColWidth(Col);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Col|`Long or String`|<span class="required">필수</span>|특정 컬럼의 Column Index 또는 SaveName|


### Returns
***Integer, 특정컬럼의 너비 픽셀 값***

### Example
```javascript
// Index가 3인 컬럼의 너비 확인
console.log("colWidth:", mySheet.GetColWidth(3));

// SaveName이 'sDeptName'인 컬럼의 너비 확인
console.log("colWidth:", mySheet.GetColWidth('sDeptName'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||