# OnTreeChild ***(event)***

> 자식을 조회하지 않은 상태에서 부모 노드에서 트리 확장기능을 선택했을 때 이벤트가 발생 합니다.<br>
> 이벤트가 발생하는 자식노드를 `DoSearchChild` 조회 함수로 조회하는 기능을 처리할수 있습니다.<br>
> 트리 형태 데이터를 한꺼번에 조회하지 않고, 트리 확장 버튼을 눌렀을 때 자식 레벨의 데이터를 조회하기 위한 용도로 사용됩니다.

### Syntax
```javascript
function 오브젝트ID_OnTreeChild(Row)
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|확장할 부모 행의 Index|


### Example
```javascript
// 자식데이터 조회하기
function mySheet_OnTreeChild(Row){
  var url = "";
  // 4컬럼 : 트리컬럼

  switch(mySheet.GetCellValue(Row, 4)){
  case "서울" :
    url = " type15_dat(1).xml";
    break;
  case "인천":
    url = "type15_data(2).xml";
    break;
  }

  mySheet.DoSearchChild(Row, url, "", 1);
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||