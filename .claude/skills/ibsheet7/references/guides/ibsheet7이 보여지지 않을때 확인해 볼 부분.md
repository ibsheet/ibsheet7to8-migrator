# ibsheet7이 보여지지 않을때 확인해 볼 부분

아이비시트 가 보여지지 않을때 확인해 볼 부분

우선적으로 페이지가 오픈되면서 javascript 상에 오류 확인.아이비시트는 자바스크립트를 사용함으로 시트 초기화 로직이 리딩되기 전에 스크립트 오류가 발생하면 시트는 그려지지 않습니다. 개발자도구의 콘솔 부분에 오류가 혹시 없는지 확인하여 주세요.

스니핑 툴을 이용해 시트가 필요로 하는 파일이 모두 로딩되었는지 확인할 것.[스니핑 툴]IE9,10의 브라우져 사용시에는 개발자 도구>네트웍크, 그 이하 브라우져의 경우에는 www.fiddler2.com 에서 프로그램을 다운 받아 설치 후 확인해 보세요.내려져야 하는 파일은 다음과 같습니다.

ibsheet.js

아이비시트 코어

ibsheetinfo.js

아이비시트 초기화 관련 상수,함수

ibmsg 

시트에서 보여지는 메세지

ibsheet.cfg

시트 공통 정의

ibsheet.css

아이비시트 디자인

base.xml

내부통신용 파일

[IE의 개발자 도구 화면]

위 6가지 파일에 결과가 404 가 있어서는 안됩니다.우선 해당 파일이 해당위치에 있는 지 확인합니다. 그리고 만일 해당파일이 폴더에 존재하는데도 불구하고 404로 나타난다면 일반적으로 WAS에서 지정한 Mine 타입을 지원하지 않는 경우 입니다.(IIS나 jeus 서버에서 주로 발생합니다.) 

이 경우 일단 cfg 타입에 대해서는 "plain/text"로 was에 정의하여 주어야 합니다. 그리고 ibmsg와 같이 확장자가 없는 파일을 was에서 허용하지 않는 경우에는 ibmsg파일을 ibmsg.txt 와 같은 파일로 확장자를 붙여주고, ibsheetinfo.js 파일안에 createIBSheet() 함수를 열어 locale 값이 없는 경우 txt로 변경하도록 로직을 구성하시면 됩니다.

/*

 * IBSheet를 생성(호출 위치에서 동적 생성)

 */

function createIBSheet(sheetid, width, height, locale) {

    var div_str = "";

    if (!locale) locale = "txt";  //이렇게 수정

    Grids.Locale = locale;

    div_str += "<div id='DIV_" + sheetid + "' style='width:" + width + ";height:" + height + ";'>";

    div_str += "<script> IBSheet('<ibsheet Sync=\"1\" Data_Sync=\"0\"> </ibsheet>',\"DIV_" + sheetid + "\", \"" + sheetid + "\"); </script>"

    div_str += "</div>\n";

    //<![CDATA[

    document.write(div_str);

    //]]>

}

위 두가지가 확실하다면 ibsheet.js 파일을 메모장으로 Open한 뒤 다른이름으로 저장할 때 보여지는 "인코딩" 값과 ibmsg나 ibsheet.cfg 파일의 인코딩이 동일한 지 확인해 보세요. 인코딩이 다른 경우 ibmsg나 ibsheet.cfg 파일의 인코딩을 변경하여 저장한 후 확인해 보세요.