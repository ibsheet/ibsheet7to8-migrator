# SetTheme ***(globalModule method)***

> 외부 컨트롤에서 사용할 달력팝업의 테마 디자인을 설정합니다. <br>
> 설정하기 위해서는 사전에 테마 디자인을 작업해야 합니다. [Appendix - Theme 만들기 참조](/docs/appx/Theme)


### Syntax
```javascript
IBCalendar.SetTheme(prefix, folder);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|prefix|`String`|<span class="required">필수</span>|테마의 Prefix 값|
|folder|`String`|<span class="required">필수</span>|테마의 폴더명|



### Returns
***none***

### Example
```javascript
//Orange 테마를 적용
IBCalendar.SetTheme("OR", "Orange");
```


### Since

|version|desc|
|---|---|
|7.0.0.0||