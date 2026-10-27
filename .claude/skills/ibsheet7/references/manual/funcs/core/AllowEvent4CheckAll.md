# AllowEvent4CheckAll ***(core method)***

> 데이터 타입이 `CheckBox` 인 컬럼에 대한 전체선택 기능을 사용할 때 OnChange 이벤트를 발생 할지 여부를 설정 합니다. <br>
> 일반적으로 OnChange를 사용하지 않는 대량 데이터에 대한 처리 성능을 향상 시키고자 할때 사용 합니다.

### Syntax
```javascript
ObjId.AllowEvent4CheckAll(event);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|event|`Boolean`|<span class="required">필수</span>|`OnChange` Event 발생여부 (Default: 1)|



### Returns
***none***

### Example
```javascript
// 전체 선택시 OnChange 이벤트 발생하지 않도록 설정
mySheet.AllowEvent4CheckAll(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||