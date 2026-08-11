# SetUnicodeByte ***(core method)***

> 2byte 이상의 문자에 대한 처리할 byte 설정 값을 설정 합니다.
> 설정 값이 `number` 형태인 경우 해당 `byte 값`으로 계산 처리되고, `utf-8` 인 경우 `utf-8` 형식에 맞게 처리할 수 있습니다.

### Syntax
```javascript
ObjId.SetUnicodeByte();
```

### Info
***none***



### Returns
***Number or String, 설정값 또는 설정모드***

### Example
```javascript
// "utf-8" 모드로 설정
mySheet.SetUnicodeByte("utf-8");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||