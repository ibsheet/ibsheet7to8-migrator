# OnePageFilter ***(cfg)***

> 서버 페이징 조회에서 필터 행의 필터링을 서버 재조회 없이 현재 페이지 내에서 처리할지 여부를 설정합니다.<br>
> 이 속성은 서버 페이징 조회 모드(`SearchMode: 3` smServerPaging, `SearchMode: 4` smServerPaging2)와 관련이 있으나, **`1` 로 변경한 설정이 실제로 동작하는 것은 `SearchMode: 4` (smServerPaging2) 에서만 입니다.**


### Type
`boolean`


### Options

|Value|Description|
|-----|-----------|
|0|필터 행에 값을 입력해도 필터링이 동작하지 않으며, [OnChangeFilter](/docs/event/OnChangeFilter) 이벤트만 발생 합니다.<br>필터된 데이터를 다시 조회하려면 `OnChangeFilter` 이벤트에서 [DoSearchPaging](/docs/funcs/search/DoSearchPaging) 으로 별도 구현해야 합니다.<br>페이지 로드시에는 `OnChangeFilter` 이벤트가 발생하지 않습니다. (`Default`)|
|1|사용자가 필터 행에 필터값을 넣거나 변경하면, 서버 호출 없이 현재 보고 있는 페이지 내의 데이터에서만 필터링 합니다.<br>`SearchMode: 4` (smServerPaging2) 에서만 동작 합니다.|


### See also
- [OnePageSort](/docs/props/PropertyList/OnePageSort)
- [SearchMode](/docs/props/PropertyList/SearchMode)
- [OnChangeFilter](/docs/event/OnChangeFilter)
- [DoSearchPaging](/docs/funcs/search/DoSearchPaging)

### Since

|version|desc|
|---|---|
|7.0.13.219|OnePageFilter 속성 추가|
