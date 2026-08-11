# SetSelectionSummaryInfoElement ***(core method)***

> 선택 요약 정보 출력 대상 Dom Element를 설정합니다. <br>
> 선택 요약 정보 출력을 시트의 외부에 표현하고자 할 때 사용하며, `input`, `div`, `span` 등의 innerText 를 지원 하는 Dom Element만 설정 할 수 있습니다.

### Syntax
```javascript
ObjId.SetSelectionSummaryInfoElement();
```

### Info
***none***



### Returns
***Object or String, 선택 요약 정보 출력 대상 Dom Element 또는 해당 id***

### Example
```javascript
// id가 'summaryElem'인 div 에 선택 요약 정보 출력 설정
mySheet.SetSelectionSummaryInfoElement('summaryElem');
mySheet.SetSelectionSummaryInfoElement(document.getElementById('summaryElem'));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||