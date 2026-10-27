# ExportMode ***(cfg)***

> 엑셀 Import/Export에 사용할 모듈을 설정합니다.
> 클라이언트 모듈의 경우 `ibexcel.js` 가 include 되어야 합니다.


### Type
`number`


### Options

|Value|Description|
|-----|-----------|
|1|서버모듈 (`Default`)|
|2|클라이언트 `IE10 이상 지원`|
|3|서버모듈,클라이언트모듈 (ibexcel.js가 없으면 서버모듈로 동작)|


### See also
  * [Down2Excel method](/docs/funcs/export/Down2Excel)

### Since

|version|desc|
|---|---|
|7.0.13.63|속성 추가|