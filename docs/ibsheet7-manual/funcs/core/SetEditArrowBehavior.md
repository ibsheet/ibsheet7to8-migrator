# SetEditArrowBehavior ***(core method)***

> 편집모드 상태에서 방향 키 입력에 대한 동작 방법을 설정합니다.


### Syntax
```javascript
ObjId.SetEditArrowBehavior(mode);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|mode|`Number`|<span class="required">필수</span>|동작 방법 설정값<br>- `0` : 좌,우,상,하 모두 셀 이동 하지 않음<br>- `1` : 상,하만 셀 이동 처리 (Default)<br>- `2` : 좌,우만 셀 이동 처리<br>- `3` : 좌,우,상,하 모두 셀 이동 처리<br>- `4` : 커서가 데이터의 좌우측 끝에 위치할때 편집 가능한 셀로 편집을 유지하면서 이동/상,하 이동 처리<br>- `5` : 커서가 데이터의 좌우측 끝에 위치할때 편집 가능한 셀로 편집을 유지하면서 이동/상,하 이동 처리 없음<br>- `6` : 커서가 데이터의 좌우측 끝에 위치할때 편집유무와 관계없이 편집을 종료하면서 이동/상,하 이동 처리<br>- `7` : 커서가 데이터의 좌우측 끝에 위치할때 편집유무와 관계없이 편집을 종료하면서 이동/상,하 이동 없음
 ||

**mode 값 4,5,6,7번은 Internet Explorer 9 이상에서만 동작합니다.**


### Returns
***none***

### Example
```javascript
// 방향키 입력시 셀이동을 하지 않도록 설정
mySheet.SetEditArrowBehavior(0);
```


### Since

|version|desc|
|---|---|
|7.0.0.0|기능추가|
|7.0.13.229|4,5번 추가|
|7.0.13.233|6,7번 추가|