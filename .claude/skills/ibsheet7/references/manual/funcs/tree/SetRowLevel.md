# SetRowLevel ***(search method)***

> 대상 행의 트리 레벨을 설정 합니다. <br>
> 이 기능은 자식 행이 없는 경우에만 설정 할 수 있으며, 현재 레벨 기준 +1 또는 -1 레벨로 설정 할 수 있습니다. <br>
> +1 레벨로 설정 하는 경우 대상 행은 이전 행의 자식 행으로 포함 되고, -1 레벨로 설정 하는 경우 대상 행은 다음 행의 레벨 보다 작은 경우 다음 행의 부모 행으로 됩니다.

### Syntax
```javascript
ObjId.SetRowLevel(Row,Level);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Row|`Long`|<span class="required">필수</span>|대상 행의 Index|
|Level|`Integer`|<span class="required">필수</span>|해당 행의 트리 레벨값|



### Returns
***none***

### Example
```javascript
// Index가 4인 행의 트리 레벨을 2로 설정
mySheet.SetRowLevel(4, 2);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||