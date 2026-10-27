# RenderSheet ***(core method)***

> 시트의 랜더링 처리 여부 설정 합니다. <br>
> `0` 설정 시점 이후 부터 `1` 설정 시점 이전까지 랜더링 처리를 중단하고, `1` 설정 시점에 시트 전체에 대한 랜더링 처리를 합니다.<br>
> 댜량의 `ColHidden`, `DataInsert`, `InitCellProperty` 를 처리하는 경우 성능 개선을 위해 이 기능을 사용 합니다.<br>
> 설정 값이 `2`인 경우는 강제적으로 시트 전체에 대한 랜더링 처리를 합니다.

### Syntax
```javascript
ObjId.RenderSheet(Render);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Render|`Number`|<span class="required">필수</span>|설정값<br>- `0` : 설정 이후 랜더링을 처리하지 않음<br>- `1` : 이전 처리에 대한 랜더링 처리함<br>- `2` : 시트 전체를 강제 랜더링함|




### Returns
***none***

### Example
```javascript
// 다량의 ColHidden 처리
mySheet.RenderSheet(0);

for (var i = 0; i < 50; i++) {
    mySheet.SetColHidden(i, 1);
}

mySheet.RenderSheet(1);

// 강제 랜더링 처리
mySheet.RenderSheet(2);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||