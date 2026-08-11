# GetSaveJson ***(save method)***

> 저장 할 데이터를 Json 객체로 반환합니다. <br>
> Validation 체크 결과가 실패인 경우 아래와 같이 결과 코드 및 메시지를 Json 객체로 반환 합니다.<br>
> - IBS000	NoTargetRows	처리 대상 행이 없는 경우<br>
> - IBS010	KeyFieldError	필수 입력 누락인 경우<br>
> - IBS020	InvalidInputError	Validation 체크 오류인 경우<br>
> - IBS030	EditLenError	저장 Cell 값이 EditLen보다 긴경우<br>
> - IBS040	MinLenError	저장 Cell 값이 MinLen보다 짧은경우

### Syntax
```javascript
ObjId.GetSaveJson([Option]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Option|`Boolean`|<span class="optional">선택</span>|저장 처리 옵션|
|Option.AllSave|`Boolean`|<span class="optional">선택</span>|전체 저장 여부|
|Option.StdCol|`Number or String`|<span class="optional">선택</span>|대상이 되는 기준 컬럼의 Index 또는 SaveName|
|Option.StdColValue|`String`|<span class="optional">선택</span>|기준 컬럼의 추출 대상 값을 구분자 `|` 로 연결한 문자열|
|Option.ValidEditLen|`Boolean`|<span class="optional">선택</span>|저장시 EditLen 속성을 통한 길이 체크 여부|
|Option.ValidMinLen|`Boolean`|<span class="optional">선택</span>|저장시 MinLen 속성을 통한 길이 체크 여부|
|Option.ValidFullInput|`Boolean`|<span class="optional">선택</span>|FullInput 체크 여부|
|Option.ValidKeyField|`Boolean`|<span class="optional">선택</span>|필수입력 체크 여부|
|Option.AllTypeToText|`Boolean`|<span class="optional">선택</span>|Json data 텍스트로 구성 여부|

### Returns
***Object, 저장할 데이터의 Json 객체***

### Example
```javascript
// 변경 데이터 가져오기
var saveData = mySheet.GetSaveJson();
console.log('saveData: ', saveData);

// 모든 데이터 가져오기
var saveData = mySheet.GetSaveJson({
  "AllSave": 1
});
console.log('saveData: ', saveData);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||