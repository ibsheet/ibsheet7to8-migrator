# euc-kr서버에서 ibsheet 저장 설정

ibsheet7 서버 인코딩이 euc-kr 인 경우 대응 가이드

javascript 는 utf-8 인코딩만 지원한다.따라서 form submit이 아닌 ajax 통신을 하는 경우에는 utf-8으로 인코딩하여 보내야만 서버사이드에서 안전하게 특수문자를 받을 수 있다.그런데 WAS서버에 대한 인코딩 형식이 euc-kr 로 설정되어있고, 이를 변경하지 못하는 상황(레거시 시스템에 일부로 개발되는 프로젝트)에서는 이러한 인코딩이 문제가 될 수 있다.따라서 이러한 환경에서는 어쩔수 없는 방법으로 서버로 전달할 내용을 utf-8 형식으로 두 번씩 인코딩 해주고(이렇게 인코딩하면 사실상 euc-kr에서 인코딩이 필요한 문자가 포함되지 않게 된다) 서버에서도 받은 내용을 두번 디코딩하여 사용해야 한다.아래 내용을 참고할 것.1. 클라이언트 사이드1) FormQueryStringEnc()함수 수정폼의 내용을 서버로 전달할때, 기본적으로 한번 인코딩 해주는 이 함수의 encodeURIComponent 부분을 한번 더 인코딩하도록 수정하여야 한다.[ibsheetinfo.js 의 FormQueryStringEnc() 함수 최하단][기존]

//QueryString을 조합한다.

for (i = 0; i < j; i++) {

 if (name[i] != '') plain_text += encodeURIComponent(name[i]) + "=" + encodeURIComponent(value[i]) + "&";

}

[변경]

//QueryString을 조합한다.

for (i = 0; i < j; i++) {

 if (name[i] != '') plain_text += encodeURIComponent(encodeURIComponent(name[i])) + "=" + encodeURIComponent(encodeURIComponent(value[i])) + "&";

}

2) ibsheet.cfg 파일 설정"SaveEncodeURI"의 값을 1로 설정한다.이렇게 하면 DoSave()함수를 통해 전달되는 시트의 데이터가 두번 인코딩 되어 서버로 전달 된다.단 이 기능은 GetSaveString()함수에는 적용 되지 않는다.

3) GetSaveString() 함수에 대한 오버라이드GetSaveString()하는 경우 한번 더 인코딩 되도록 ibsheetinfo.js 에 createIBSheet();함수에서 해당 메서드를 오버라이드 한다.[ibsheetinfo.js]

/*

 * IBSheet를 생성(호출 위치에서 동적 생성)

 */

function createIBSheet(sheetid, width, height, locale) {

    var div_str = "";

    if (!locale) locale = "";

    Grids.Locale = locale;

    div_str += "<div id='DIV_" + sheetid + "' style='width:" + width + ";height:" + height + ";'>";

    div_str += "<script> IBSheet('<ibsheet Sync=\"1\" Data_Sync=\"0\"> </ibsheet>',\"DIV_" + sheetid + "\", \"" + sheetid + "\"); </script>"

    div_str += "</div>\n";

    //<![CDATA[

    document.write(div_str);

    //]]>

//오버라이드 구문 추가

    GetSaveStringOverride(sheetid); }

 //시트의 메서드를 OverRide한다.

function GetSaveStringOverride(id){

<w:t xml:space="preserve">   window[id].GetSaveStringOld = window[id].GetSaveString;    

     var rtnStr = "";

     window[id].GetSaveString = function(opt){

     </w:r><w:proofErr w:type="spellStart"/><w:r w:rsidRPr="00556886"><w:rPr><w:b/><w:color w:val="FF0000"/><w:szCs w:val="20"/></w:rPr><w:t>var str = window[id].GetSaveStringOld(opt);

     <w:t xml:space="preserve">//넘어온 내용을 한번더 인코딩 한다.

     </w:r><w:proofErr w:type="spellStart"/><w:r w:rsidRPr="00556886"><w:rPr><w:b/><w:color w:val="FF0000"/><w:szCs w:val="20"/></w:rPr><w:t>var items = str.split("&");

     <w:t>for(var i=0;i<items.length;i++){

     </w:r><w:r w:rsidRPr="00556886"><w:rPr><w:b/><w:color w:val="FF0000"/><w:szCs w:val="20"/></w:rPr><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r w:rsidRPr="00556886"><w:rPr><w:b/><w:color w:val="FF0000"/><w:szCs w:val="20"/></w:rPr><w:t>var item = items[i].split("=");

     </w:r><w:r w:rsidRPr="00556886"><w:rPr><w:b/><w:color w:val="FF0000"/><w:szCs w:val="20"/></w:rPr><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r w:rsidRPr="00556886"><w:rPr><w:b/><w:color w:val="FF0000"/><w:szCs w:val="20"/></w:rPr><w:t>rtnStr += "&"+encodeURIComponent(item[0])+"="+encodeURIComponent(item[1]);

     <w:t>}

      return rtnStr.substring(1);

     }

}

2. 서버사이드

request에 넘어온 내용을 두번 디코딩한다.[save.jsp 내용]

<%@page contentType="text/html;charset=euc-kr"%>

<%@page import="java.util.Enumeration" %>

<%@page import="java.util.Map" %>

<%@page import="java.util.HashMap" %>

<%@page import="java.util.Iterator" %>

<%

Map requestMap = new HashMap();

Enumeration<String> en = request.getParameterNames();

while(en.hasMoreElements()){

<w:t xml:space="preserve">String key = en.nextElement();

<w:t xml:space="preserve">String[] value = request.getParameterValues(key);

<w:t xml:space="preserve">String realkey = java.net.URLDecoder.decode(java.net.URLDecoder.decode(key, "UTF-8"), "UTF-8");

</w:r><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:b/><w:bCs/><w:color w:val="7F0055"/><w:kern w:val="0"/><w:szCs w:val="20"/></w:rPr><w:t>if(value.length==1){

</w:r><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:color w:val="000000"/><w:kern w:val="0"/><w:szCs w:val="20"/></w:rPr><w:tab/><w:t xml:space="preserve">String realValue = </w:r><w:proofErr w:type="spellStart"/><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:color w:val="000000"/><w:kern w:val="0"/><w:szCs w:val="20"/></w:rPr><w:t>java.net.URLDecoder.decode(java.net.URLDecoder.decode(value[0], "UTF-8"), "UTF-8");

</w:r><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:color w:val="000000"/><w:kern w:val="0"/><w:szCs w:val="20"/></w:rPr><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:color w:val="000000"/><w:kern w:val="0"/><w:szCs w:val="20"/><w:u w:val="single"/></w:rPr><w:t>requestMap.put(realkey,realValue);

<w:t>}else{

</w:r><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:color w:val="000000"/><w:kern w:val="0"/><w:szCs w:val="20"/></w:rPr><w:tab/></w:r><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:b/><w:bCs/><w:color w:val="7F0055"/><w:kern w:val="0"/><w:szCs w:val="20"/></w:rPr><w:t>for(int i=0;i<value.length;i++){

</w:r><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:color w:val="000000"/><w:kern w:val="0"/><w:szCs w:val="20"/></w:rPr><w:tab/></w:r><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:color w:val="000000"/><w:kern w:val="0"/><w:szCs w:val="20"/></w:rPr><w:tab/><w:t>value[i] = java.net.URLDecoder.decode(java.net.URLDecoder.decode(value[i], "UTF-8"), "UTF-8");

</w:r><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:color w:val="000000"/><w:kern w:val="0"/><w:szCs w:val="20"/></w:rPr><w:tab/><w:t>}

</w:r><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:color w:val="000000"/><w:kern w:val="0"/><w:szCs w:val="20"/></w:rPr><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:color w:val="000000"/><w:kern w:val="0"/><w:szCs w:val="20"/><w:u w:val="single"/></w:rPr><w:t>requestMap.put(realkey,value);

<w:t>}

}

//화면에서 넘어온 내용 확인

mapPrint(requestMap);

%>

<%!

//확인용.

public static void mapPrint(Map mp){

    String key = "";

    Iterator it = mp.keySet().iterator();

    while(it.hasNext()){

         key = (String)it.next();

         System.out.println("Map Print>>>>>   key:"+key+" value:"+mp.get(key));

    }

}

%>