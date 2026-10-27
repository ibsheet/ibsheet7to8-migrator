# ColInsert ***(col method)***

> 컬럼을 동적으로 생성 합니다. <br>
> Pos 속성을 설정하지 않은 경우 가장 마지막에 컬럼이 생성 됩니다. <br>
> 컬럼타입이 `Seq, Status, DelCheck`인 컬럼은 생성이 불가능 하며 컬럼생성시 `CalcLogic` 속성은 사용이 불가능합니다.<br>
> 생성할 컬럼의 설정 속성 집합 객체는 [InitColumns](/docs/funcs/init/InitColumns) Method의 내용을 참조<br>
> 컬럼의 설정 속성을 설정하지 않은 경우 `Text` 타입의 컬럼으로 생성 됩니다.

### Syntax
```javascript
ObjId.ColInsert([Info]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Info.Pos|`Number or String`|<span class="optional">선택</span>|생성할 위치의 컬럼 Index 또는 SaveName(Default: 마지막 컬럼)|
|Info.Header.<bi>Text|`String`|<span class="optional">선택</span>|헤더에 설정할 문자열 (헤더가 2줄이상인 경우 구분자 `"|"`로 연결한 문자열로 설정) (Default: "")|
|Info.Header.<bi>Align|`String`|<span class="optional">선택</span>|헤더 문자열의 정렬값 (Default: "Center")|
|Info.Col|`Object`|<span class="optional">선택</span>|생성할 컬럼의 설정 속성 집합 객체|


### Returns
***none***

### Example
```javascript
// 마지막 위치에 기본("Text" 컬럼타입) 컬럼을 생성.
var info = {
  Header : {Text : "기본타입"}
};
mySheet.ColInsert(info);

// Index 3의 위치에 "CheckBox" 타입의 컬럼을 생성.
var info = {
  Pos:3,
  Header:{Text: "체크박스",Align: "Left"},
  Col:[{
    Type: "CheckBox",
    Width:60,
    SaveName: "sCheckBox"
  }]
};
mySheet.ColInsert(info);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||