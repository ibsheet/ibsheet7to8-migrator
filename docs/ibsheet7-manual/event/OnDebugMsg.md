# OnDebugMsg ***(event)***

> 모든 기능 처리 과정 중 발생하는 디버깅용 메시지가 있을 때 이벤트가 발생합니다. <br>
> `ShowDebugMsg` method의 인자를`0`으로 설정하는 경우 디버깅용 메시지가 이 이벤트를 통해서 호출되고, `-1`로 설정하는 경우 사용자가 볼 수 있도록 메시지 팝업 형태로 표시됩니다.



### Syntax
```javascript
function 오브젝트ID_OnDebugMsg(Msg) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|Msg|`String`|디버그 메시지|


### Example
```javascript
function mySheet_OnDebugMsg(Msg) {
  txtErr.value = txtErr.value + «\n>>>> » + Msg ;
}

//디버그 메시지 표시를 위한 TextArea 생성
<textarea name="txtErr" rows=10 cols=70></textarea>
```

### See also
  * [ShowDebugMsg method](/docs/funcs/ShowDebugMsg)

### Since

|version|desc|
|---|---|
|7.0.0.0||