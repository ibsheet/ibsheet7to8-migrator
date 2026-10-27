# Config 속성이란

>  모든 IBSheet7에 공통으로 다양한 속성을 설정하고자 할 때 정의 합니다. <br>
> `ibsheet.cfg` 파일에서 xml 또는 json 형태로 설정 가능 합니다.
>

```javascript
// 엑셀 다운로드 URL 설정 예시 (ibsheet.cfg)

// Json 형태의 포맷
{
  "Cfg": {
    "Down2Excel_Url" : "../jsp/Down2Excel.jsp"
  }
}
// Xml 형태의 포맷
<SHEET>
  <Cfg Down2Excel_Url="../jsp/Down2Excel.jsp"/>
</SHEET>

```

### ReadMore
  * [기본 속성 설정하기](/docs/start/dev-example)