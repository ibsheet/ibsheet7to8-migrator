# OnePageSort ***(cfg)***

> 서버 페이징 조회에서 헤더 클릭을 통한 정렬을 서버 재조회 없이 현재 페이지 내에서 처리할지 여부를 설정합니다.<br>
> 이 속성은 서버 페이징 조회 모드(`SearchMode: 3` smServerPaging, `SearchMode: 4` smServerPaging2)와 관련이 있으나, **`1` 로 변경한 설정이 실제로 동작하는 것은 `SearchMode: 4` (smServerPaging2) 에서만 입니다.**


### Type
`boolean`


### Options

|Value|Description|
|-----|-----------|
|0|헤더를 클릭해 정렬시 클릭된 헤더 정보를 서버로 전송 합니다.<br>([DoSearchPaging](/docs/funcs/search/DoSearchPaging) 함수의 `orderby` 절에 넣어 자동 호출) (`Default`)|
|1|서버 호출 없이, 조회된 데이터 중 현재 보고 있는 페이지 내에서만 자동으로 정렬 합니다.<br>`SearchMode: 4` (smServerPaging2) 에서만 동작 합니다.|


### See also
- [OnePageFilter](/docs/props/PropertyList/OnePageFilter)
- [SearchMode](/docs/props/PropertyList/SearchMode)
- [DoSearchPaging](/docs/funcs/search/DoSearchPaging)

### Since

|version|desc|
|---|---|
|7.0.0.0||
