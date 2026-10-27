# DirectLoadExcel ***(import method)***

> 엑셀 문서를 읽어 들이는 것은 동일 하지만, 엑셀 문서의 내용을 IBSheet에 담지 않고 서버쪽에서 지정한 페이지로 전달합니다. <br>
> 엑셀로 넘어온 데이터를 받아줄 페이지를 별도로 개발하여야 하고, `DirectLoadExcel`의 `ExtendParam` 을 통해 엑셀의 내용을 받아 줄 포워딩 페이지`(FP=/jsp/excelsave.jsp)`경로를 필수로 설정해야 합니다.<br>
> 서버쪽 페이지에서 request 객체 안에 `"SHEETDATA"` 라는 이름으로 엑셀의 내용을 받아야 하고, SHEETDATA안의 내용은 List(Map)으로 구성되고, Map의 키는 IBSheet 각 컬럼의 SaveName이 됩니다.

### Syntax
```javascript
ObjId.DirectLoadExcel([parameters]);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|ColumnMapping|`String`|<span class="optional">선택</span>|엑셀 컬럼 번호 (Default :"")|
|EndRow|`String`|<span class="optional">선택</span>|엑셀 로딩완료 행번호 (Default: 0)|
|ExtendParam|`String`|<span class="required">필수</span>|서버로 전달될 파라미터를 QueryString 형태로 넣음 (저장작업을 수행할 `FP`는 필수)|
|FileExt|`String`|<span class="optional">선택</span>|업로드 가능한 파일 확장자 (Default :"")|
|MaxFileSize|`Number`|<span class="optional">선택</span>| 파일의 사이즈를 제한시 사용<br>설정 단위 MB|
|Mode|`String`|<span class="optional">선택</span>|엑셀 로딩 방식 <br>- `HeaderMatch` : 엑셀 타이틀과 시트 헤더 타이틀을 비교하여 매칭되는 컬럼에 데이터를 로딩 (Default)<br>- `NoHeader` : 엑셀 첫행부터 시트 데이터로 간주하여 데이터를 차례대로 시트에 로딩<br>- `HeaderSkip` : 엑셀 첫행부터 시트의 헤더 행 수 만큼을 헤더데이터로 간주하여 무시하고 그 다음행부터 로딩|
|SkipEmptyRow|`Boolean`|<span class="optional">선택</span>|엑셀의 빈 행 제거 (Default: 1)|
|StartRow|`String`|<span class="optional">선택</span>|엑셀 로딩 행번호 (Default: 1)|
|WorkSheetNo|`String`|<span class="optional">선택</span>|엑셀 WorkSheet 번호 (Default: 1)|
|WorkSheetName|`String`|<span class="optional">선택</span>|엑셀 WorkSheet 이름 (Default: "")|
|ReqHeader|`Boolean`|<span class="optional">선택</span>|Request Header에 사용자가 지정한 헤더 정보를 설정합니다. 이 인자를 설정하면 UseXhr을 true로 설정한 것과 동일하게 동작합니다.|
|UseXhr|`Boolean`|<span class="optional">선택</span>|iframe를 통한 form submit 방식으로 통신하는 기존 방식과 다르게 업로드시 통신 방식을 xhr로 설정합니다. 프레임웍의 보안처리로 인하여 iframe를 사용할 수 없을 때 이 속성을 true로 설정해주세요.|



### Returns
***none***

### Example
```javascript
// 시트 화면 페이지
var param = "FP=/server/excelsave.jsp";
mySheet.DirectLoadExcel({ExtendParam:param});

// excelsave.jsp 페이지
String PRINT_STR = "";

List keys = new ArrayList();

List li = (List)request.getAttribute("SHEETDATA");

for(int i=0;i<li.size();i++){

  Map mp = (Map)li.get(i);

  // 시트 헤더 내용
  if(i == 0){
      Iterator it = mp.keySet().iterator();
      while(it.hasNext()){
        String key = (String)it.next();
        PRINT_STR += key+"\t";
        keys.add(key);
      }
      PRINT_STR += "\n";
  }

  // 시트 데이터 내용
  for(int c=0;c<keys.size();c++){
    PRINT_STR += mp.get(keys.get(c))+"\t";
  }
  PRINT_STR += "\n";

  PRINT_STR += li.get(i)+"\n";
}
//서버 콘솔에서 확인
System.out.println(PRINT_STR);
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.13.27|MaxFileSize 속성 추가|
|7.0.13.114|SkipEmptyRow 속성 추가|
|7.0.13.230|ReqHeader, UseXhr 속성 추가|