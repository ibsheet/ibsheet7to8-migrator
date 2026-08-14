# ShowDebugMsg ***(core method)***

> 디버깅용 메시지의 표시 여부를 확인하거나 설정 합니다. <br>
> 디버깅 메시지를 표시하도록 설정하면 시스템 팝업 메시지로 디버깅을 위한 메시지를 표시하고, 표시 불가로 설정하면 [OnDebugMsg](/docs/event/OnDebugMsg) 이벤트가 발생하여 이벤트의 인자를 통해 메시지를 확인할 수 있습니다.

### Syntax
```javascript
ObjId.ShowDebugMsg(Msg);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Msg|`Integer`|<span class="required">필수</span>|디버깅용 메시지 표시여부 설정 (Default: 0)<br>- `-1` : 시스템 팝업 디버그 시작<br>- `0` : 모든 디버그 종료|


### Returns
***Boolean, 디버깅용 메시지 표시 여부***

### Example
```javascript
//저장 처리 과정을 디버깅 메시지를 팝업으로 표시
mySheet.ShowDebugMsg(-1);

//조회
mySheet.DoSearch("list.xml");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
