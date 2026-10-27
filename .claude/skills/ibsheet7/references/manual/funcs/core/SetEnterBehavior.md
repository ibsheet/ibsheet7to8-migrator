# SetEnterBehavior ***(core method)***

> 포커스 상태에서 Enter 키 입력에 대한 동작 방법을 설정 합니다.

### Syntax
```javascript
ObjId.SetEnterBehavior(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`String`|<span class="required">필수</span>|설정값<br>- `tab`	: 오른쪽 셀로 포커스 이동<br>- `edit` :	편집모드로 전환 (Default)<br>- `down` :	아래의 셀로 포커스 이동<br>- `none` :	아무 동작을 하지 않음|



### Returns
***none***

### Example
```javascript
// tab키 입력 동작과 동일하게 설정
mySheet.SetEnterBehavior("tab");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||