# LoadExcelBuffer ***(import method)***

> 1개의 엑셀 문서로부터 여러 개의 IBSheet에 로딩합니다.<br>
> `IsBuffer`인자를 `true`로 설정하면 이후로 실행되는 Down2Excel은 실제로 동작하지 않으며, 내부메모리에 버퍼링됩니다.<br>
> 이후에 isBuffer인자를 `false`로 설정하는 순간 파일 업로드 창이 나옵니다.

### Syntax
```javascript
ObjId.LoadExcelBuffer(IsBuffer);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|IsBuffer|`Boolean`|<span class="required">필수</span>|버퍼링 여부|



### Returns
***none***

### Example
```javascript
//이후로는 버퍼링한다. 아무 동작 안함.
mySheet.LoadExcelBuffer(true);

//엑셀 파일의 첫번째 워크시트 내용을 mySheet에 로드 한다.
mySheet.LoadExcel({Mode:'HeaderMatch',StartRow:'7', WorkSheetNo:1});

// 엑셀 파일의 두번째 워크시트 내용을 mySheet2에 로드 한다.
mySheet2.LoadExcel({WorkSheetNo:2});

// 버퍼링된 모든 엑셀 로딩 자료와 파일을 서버로 보내기 위해 파일 업로드창을 띄운다.
mySheet.LoadExcelBuffer(false);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||