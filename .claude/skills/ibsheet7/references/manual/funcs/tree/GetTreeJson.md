# GetTreeJson ***(search method)***

> 트리 구조의 시트 데이터를 계층 구조 형태의 Json 객체로 반환 합니다.

### Syntax
```javascript
ObjId.GetTreeJson(opt);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|opt|`Object`|<span class="optional">선택</span>|조회 처리 옵션|
|opt.ChildPropName|`String`|<span class="optional">선택</span>|자식 노드를 담을 속성명|



### Returns
***Object, 시트의 데이터에 대한 계층 구조형태의 Json 객체***

### Example
```javascript
// 시트의 데이터를 계층 구조 형태의 Json 객체로 반환
var data = mySheet.GetTreeJson();
console.log('data: ', data);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||