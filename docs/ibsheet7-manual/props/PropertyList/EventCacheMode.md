# EventCacheMode ***(cfg)***

> 이벤트 사용여부 체크에 대한 캐싱 사용 여부를 설정합니다. <br>
> 설정값이 `0` 인 경우 이벤트 발생시점에 사용여부를 항상 체크하게 되고, 설정값이 `1` 인 경우 이벤트 발생시점에 사용여부를 이벤트별 최초 1회만 체크하여 `0` 의 설정보다 높은 성능을 보입니다. <br>
> `참고` 캐싱모드 사용시 이벤트를 동적으로 할당하는 경우, 최초 이벤트 발생시점 이전에 할당하여 사용하여야 합니다.


### Type
`boolean`


### Options

|Value|Description|
|-----|-----------|
|0|사용 안함|
|1|사용함 (`Default`)|


### See also

### Since

|version|desc|
|---|---|
|7.0.11.0|PopupCheckEditMode, EventCacheMode, SparklineColor, SparklineNegativeColor 속성 추가|
