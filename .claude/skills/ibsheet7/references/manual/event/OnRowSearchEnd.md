# OnRowSearchEnd ***(event)***

> `DoSearch`나 `LoadSearchData` 메서드를 통해 데이터가 조회되는 과정에서 행단위로 발생합니다. <br>
> 특정 행의 데이터를 기준으로 판단하여 Cell에 색상이나 배경색등을 표현하고자 하는 경우 유용하게 쓰일수 있습니다. <br>
> `주의` 이 기능은 조회 중에 행단위로 한번씩 발생함으로 이벤트 안에 로직이 복잡하거나 반복문이 들어가는 경우 조회속도가 저하될 수 있습니다.



### Syntax
```javascript
function 오브젝트ID_OnRowSearchEnd (row) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|row|`Integer`|행의 인덱스|


### Example
```javascript
function mySheet_OnRowSearchEnd(row) {
  //3번컬럼이 check되어있고, 4번 컬럼의 값이 100보다 클때, 6번 컬럼의 글자 색상을 붉은색으로 변경한다.
  if( mySheet.GetCellValue(row,3) == 1 && mySheet.GetCellValue(row,4) > 100){
    mySheet.SetCellFontColor(row ,6 ,"#FF0000");
  }
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||