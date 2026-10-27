# OnLoadExcel ***(event)***

> `LoadExcel` 처리가 완료된 후에 이벤트가 발생합니다.
> Code, Msg 인자는 실패의 경우에만 해당 값이 전달 됩니다.



### Syntax
```javascript
function 오브젝트ID_OnLoadExcel(result, code, msg) { }
```

### Parameters
|Parameter|Type|Description|
|-----|-----|--------------|
|result|`Boolean`|로드한 결과. 성공 : true, 실패 : false|
|Code|`Number`|결과 코드|
|Msg|`String`|결과 메시지|

<br>
로드 중 에러 발생시, 각 음수 코드에 대응하는 에러는 다음과 같습니다. <br>

| Code | Msg | Description |
|----------|----------|------------|
|`-1`| Ibmsg 파일의 SYS_OverMaxRow | load.setMaxRow로 설정한 갯수보다 더 많이 행을 로드하려는 경우|
|`-2`| Ibmsg 파일의 SYS_OverMaxColumns |load.setStrictHeaderMatch 설정시, 시트 헤더가 엑셀에 하나라도 존재하지 않는 경우|
|`-3`| Ibmsg 파일의 SYS_NoMatchedHeader | load.setMaxColumns로 설정한 갯수보다 더 많이 열을 로드하려는 경우 |
|`-10`| Ibmsg 파일의 SYS_OverMaxFileSize | load.setMaxFileSize로 설정한 사이즈보다 더 사이즈가 큰 파일을 로드하려는 경우<br>(서버모듈 2.0에서만 발생합니다.)|
|`-500`| Ibmsg 파일의 SYS_LoadExcelError | 엑셀 로드시 오류가 발생한 경우 |
|그외| 사용자 메세지 | |
### Example
```javascript
function mySheet_OnLoadExcel(result, code, msg) {
  if(result) {
    alert("엑셀 로딩이 완료되었습니다.");
  } else {
   //오류일 경우 에러 메세지 표시
    alert(msg);
  }
}
```

### See also
  * [LoadExcel method](/docs/funcs/import/LoadExcel)

### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.13|Code, Msg 인자 추가|
|7.0.13.243|모든 에러 Code, Msg OnLoadExcel 로 전달 하도록 수정|