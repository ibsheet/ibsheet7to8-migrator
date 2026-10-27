# ShowProcessDlg ***(core method)***

> 시트 중앙 위치에 대기중 이미지를 표시합니다.<br>
> 표시된 대기중 이미지는 `HideProcessDlg` 메소드를 이용하여 닫을 수 있습니다.

### Syntax
```javascript
ObjId.ShowProcessDlg(type);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|type|`String`|<span class="required">필수</span>|대기중 이미지 종류<br>- `Search` : 조회 대기 이미지 (Default)	[(SetSearchingImage 참조)](/docs/funcs/core/SetSearchingImage)<br>- `Save` : 저장 대기 이미지	[(SetSavingImage 참조)](/docs/funcs/core/SetSavingImage)<br>- `Download` : 다운로드 대기 이미지	[(SetDownloadingImage 참조)](/docs/funcs/core/SetDownloadingImage)<br>- `Upload` : 업로드 대기 이미지	[(SetUploadingImage 참조)](/docs/funcs/core/SetUploadingImage)|



### Returns
***none***

### Example
```javascript
// 조회중 대기 이미지 출력
mySheet.ShowProcessDlg('Search');
```


### Since

|version|desc|
|---|---|
|7.0.0.0||