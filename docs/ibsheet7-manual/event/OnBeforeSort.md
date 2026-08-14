# OnBeforeSort ***(event)***

> Sort 이벤트가 발생되기 전에 발생하는 이벤트입니다.<br>
> 헤더 클릭시 소트이벤트 발생전에 호출됩니다.<br>
> 소트 수행 전 대기 이미지 호출 등에 활용됩니다.



### Syntax
```javascript
function 오브젝트ID_OnBeforeSort(col) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|col|`Int`|Sort 선택한 컬럼 인덱스 확인|


### Example
```javascript
function mySheet_OnBeforeSort(col) {
  console.log(“SortColumn : “ + col);
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.13.75||