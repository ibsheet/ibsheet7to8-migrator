# ValidateFail ***(core method)***

> 저장 처 Validation 결과를 성공 또는 실패로 설정합니다. <br>
> 이 메소드는 저장 처리시 대상 셀별 발생 하는 `OnValidation` 또는 `OnEditValidation` 이벤트 내에서만 사용이 가능 하며 실패로 설정시 저장 처리는 중단 됩니다.
> 유효하지 않은 데이터를 발견하여 저장처리를 중단하고자 할 때 이 속성을 설정하여 처리합니다.

### Syntax
```javascript
ObjId.ValidateFail(fail, message);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|fail|`Number`|<span class="required">필수</span>|저장 처리 중단 여부 설정값<br>- `0` : valid<br>- `1` : invalid (입력값 취소 / 편집 완료)<br>- `2` : invalid (편집상태 유지)|
|message|`String`|<span class="optional">선택</span>|fail 인자 설정값이 2인 경우 표시할 메시지|



### Returns
***none***

### Example
```javascript
// OnValidation 이벤트에서의 사용
function mySheet_OnValidation(row, col value) {
  if (Col == 2 && Value > 100) {
    alert("금액 최대값은 100입니다.");
    mySheet.ValidateFail(1);
  }
}

// OnEditValidation 이벤트에서의 사용
function mySheet_OnEditValidation(row, col value) {
  if (Col == 2 && Value > 100) {
    // alert 으로 메시지를 표시하고 편집상태를 유지
    mySheet.ValidateFail(2, "금액 최대값은 100입니다.");
  }
}
```


### Since

|version|desc|
|---|---|
|7.0.0.0||