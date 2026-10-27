# AutoFitColWidth ***(cfg)***

> 특정 시점에서 컬럼의 너비를 자동으로 조정하는 `FitColWidth()` 함수를 호출합니다. <br>
> 적용하고자 하는 시점을 구분자 `"|"` 로 연결하여 설정합니다.



### Type
`string`


### Options

|Value|Description|
|-----|-----------|
|search|조회 및 로드 시점|
|resize|시트 resize 되는 시점|
|init|초기화 및 removeall 시점|
|colhidden|컬럼 숨김/보임 시점|
|rowtransaction|로우 추가/삭제/숨김/보임 이후 시점|
|colresize|넓이가 변경된 컬럼을 제외한 나머지 컬럼의 FitColWidth|

### See also
  * [FitColWidth method](/docs/funcs/col/FitColWidth)

### Since

|version|desc|
|---|---|
|7.0.8.0|AutoFitColWidth, MouseHoverMode 속성 추가|
