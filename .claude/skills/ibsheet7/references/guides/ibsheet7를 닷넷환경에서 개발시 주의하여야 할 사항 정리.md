# ibsheet7를 닷넷환경에서 개발시 주의하여야 할 사항 정리

닷넷에서 아이비시트 개발시 주의/참고 사항

1. mine 타입 문제

ibsheet에서 사용하는 파일 중에는 확장자가 없거나 특이한 확장자(cfg,jp,en등)를 사용하곤 하는데, IIS에서는 등록되지 않는 확장자에 대한 요구는 무시하는게 기본이다.

따라서 확장자를 일반적으로 사용하는 확장자로 변경하거나 확장자를 mine 타입에 등록해야만 정상적으로 사용할 수 있다. 확장자를 IIS에 등록하기 어려운 경우에는 cfg나 msg파일을 javascript 변수로 등록하고 ibsheetinfo.js 파일을 열어 시트 생성구문에 이 변수를 등록하여 사용합니다.ex) ibsheetinfo.js 파일의 내용

//ibmsg 파일 내용

var _ibmsg = {

    "Lang" : {

        "Alert" : {

            "SYS_CanReloadStart" : "",

            "SYS_CanReloadChanges" : "모든 변경사항을 서버에 반영합니다.",

            "SYS_CanCancelChanges" : "모든 변경사항을 취소합니다.",

            "SYS_And" : "and",

            "SYS_CanReloadSelect" : "모든 선택을 지웁니다.",

…

};

//ibsheet.cfg 파일 내용

var _ibcfg = {

    "Cfg": {

        "Down2Excel_Url": "../aspx/Down2Excel.aspx",

        "LoadExcel_Url": "../aspx/LoadExcel.aspx",

        "DirectLoadExcel_Url": "../aspx/DirectLoadExcel.aspx",

        "Down2Text_Url": "../aspx/Down2Text.aspx",

        "LoadText_Url": "../aspx/LoadText.aspx"        …

};

//시트 초기화 함수

function createIBSheet(sheetid, width, height, locale) {

    var div_str = "";

    if (!locale) locale = "";

    Grids.Locale = locale;

    Grids.Config = _ibcfg;

    Grids.Msg = _ibmsg;

    div_str += "<div id='DIV_" + sheetid + "' style='width:" + width + ";height:" + height + ";'>";

    div_str += "<script> IBSheet('<ibsheet Sync=\"1\" Data_Sync=\"0\"> </ibsheet>',\"DIV_" + sheetid + "\", \"" + sheetid + "\"); </script>"

    div_str += "</div>\n";

    //<![CDATA[

    document.write(div_str);

    //]]>

}

2. 엑셀 다운시 request보안 문제

ibsheet.cfg 파일에서 Down2Excel.aspx 파일에 대한 경로를 지정하고 Down2Excel()메서드를 호출하면 다음과 같은 경고페이지가 나타나게된다.

경고 페이지가 나타나는 원인은 엑셀 다운로드시 시트에서 서버쪽으로 넘어가는 데이터에 문제가 있을 수 있다고  IIS에서 오진 하는 것인데 이를 해결하기 위해서는 web.config에 다음과 같이 한줄을 설정해 주어야 한다.

<?xml version="1.0"?>

<configuration>

  <system.web>

    <httpRuntime requestValidationMode="2.0" />

  </system.web>

</configuration>

http://msdn.microsoft.com/en-us/library/hh882339.aspx

3. xml이나 json 타입의 파일을 사용하는 예제는 iis에서 조회가 되지 않음

iis는 xml이나 html 같은 정적파일을 Post 방식으로 호출할 수 없다. 이는 서버설정을 변경하여 임시적으로 허용하게끔 할수도 있으나 별로 권장하지 않고, 가급적 시트에서 데이터를 가져오고자 하는 경우에는 파일의 확장자를 asp나 aspx 로 변경하여 사용할 것을 권한다.