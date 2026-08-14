# OnDecryption ***(event)***

> 조회를 하는 과정에서 각 셀에 들어가야 할 데이터를 수정하거나 암호화 모듈과 연동하여 사용하기 위해 각 셀과 EtcData 요소에 대해 발생하는 이벤트입니다.<br>
> 데이터를 조회하는 과정에서 값이 A 인 경우, B라고 표시해야 된다거나, 혹은 데이터가 암호화 되어 내려와 이를 표현하기 전에 복호화 해야 하는 경우 이 이벤트를 통해 작업할 수 있습니다.



### Syntax
```javascript
function 오브젝트ID_OnDecryption(Row,Col,SaveName,Value){}
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Row|`Long`|셀의 Row Index(EtcData에 대해서는 -1)|
|Col|`Long`|셀의 Col Index(EtcData에 대해서는 -1)|
|SaveName|`String`|컬럼의 SaveName이나 EtcData 의 KEY|
|Value|`String`|셀에 들어갈 데이터 나 EtcData의 Value|



### Example
```javascript
function mySheet_OnDecryption(Row, Col, SaveName, Value){
  /* 값을 매개변수로 복호화를 수행하는 Dec 사용자 함수를 호출하여 리턴한다*/.
  return Dec(Value);
}
```

### See also


### Since

|version|desc|
|---|---|
|7.0.0.0||