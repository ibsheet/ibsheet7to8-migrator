# SetRowHaveChildValue ***(search method)***

> 대상 행의 HaveChild 속성을 설정 합니다. <br>
> `HaveChild` 속성은 자식 노드에 대한 데이터를 실제 가지고 있지 않고, 자식 노드 펼치기시 동적으로 자식 노드의 데이터를 로드 할때 사용 하는 속성입니다. <br>
> 일반적으로 조회시 조회 데이터 속성으로 설정하여 사용하고, 이 후 동적으로 변경이 필요한 경우 이 기능을 사용 합니다.

### Syntax
```javascript
ObjId.SetRowHaveChildValue(Row, HaveChild);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|
|HaveChild|`Boolean`|<span class="required">필수</span>|속성 설정값|



### Returns
***none***

### Example
```javascript
// Index가 4인 행의 HaveChild 속성을 0으로 변경
mySheet.SetRowHaveChildValue(4, 0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||