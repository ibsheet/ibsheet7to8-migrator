# GetFilterParam ***(filter method)***

> 필터행의 필터 설정 정보를 Query String 조합 문자열로 반환합니다. <br>
> Query String 문자열 조합시 컬럼별 필터 값과 필터 옵션으로 다음과 같이 구성 됩니다. (필터 설정 옵션은 [SetFilterValue](/docs/funcs/filter/SetFilterValue) 메소드 참고)<br>
> `AllFilter` 인자를 1로 설정한 경우 필터링을 설정한 컬럼에 대해서만 처리 됩니다.<br>
> 이 기능은 필터 설정 정보를 서버에 전달하여 직접 필터링을 처리하고자 하는 경우에 사용 할 수 있습니다.

### Syntax
```javascript
ObjId.GetFilterParam(AllFilter, UrlEncode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|AllFilter|`Boolean`|<span class="optional">선택</span>|전체 필터링 여부 (Default: 0)|
|UrlEncode|`Boolean`|<span class="optional">선택</span>|UrlEncode 여부 (Default: 1)|



### Returns
***String, 필터 설정 정보 문자열***

```html
// 반환 문자열 예
{SaveName}=value&{SaveName}_opt={필터 옵션}

// SaveName이 'sDeptName'이고, 필터 옵션이 11인 경우
sDeptName=인사&sDeptName_opt=11
```

### Example
```javascript
// 필터링 설정 컬럼에 대해서만 추출
console.log('filter: ', mySheet.GetFilterParam(0));
```


### Since

|version|desc|
|---|---|
|7.0.0.0||