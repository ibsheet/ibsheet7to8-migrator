# IBSheet 성능 향상 방법

제품 성능 개선 방법

시트의 성능 부분에는 크게 3가지 요소가 있습니다.

생성 속도

조회 속도

조회 후 반응속도

각각의 요소에 관련하여 성능을 올리기 위한 방법은 아래와 같습니다.

생성 속도 개선

초기화 시 cfg,msg 파일을 javascript 변수화 시키기ibsheet는 createIBSheet()함수를 통해 객체가 생성될 때 ajax 통신으로 통해 3가지 필요파일(ibsheet.css,ibmsg,ibsheet.cfg)을 불러옵니다.파일의 크기가 크진 않지만 동기형태로 파일을 불러오면서 성능 저하가 있을 수 있습니다. 따라서 최신 제품에서는 해당 파일의 내용을 json 형태로 javascript로 저장하는 방법을 제공합니다. 방법은 아래와 같습니다.

//cfg 파일의 내용을 javascript 변수에 담음.

var _IBSHEET_CFG =  {

    "Cfg" : {

        "Down2Excel_Url" : "../jsp/Down2Excel.jsp",

        "LoadExcel_Url" : "../jsp/LoadExcel.jsp",

        "DirectLoadExcel_Url" : "../jsp/DirectLoadExcel.jsp",

        "Down2Text_Url" : "../jsp/Down2Text.jsp",

        "LoadText_Url" : "../jsp/LoadText.jsp",

        ..... 중략  .....

    }

}

//createIBSheet 함수에서 변수를 적용

function createIBSheet(sheetid, width, height, locale) {

    var div_str = "";

    if (!locale) locale = "";

    Grids.Locale = locale;

    //ibmsg, ibsheet.cfg 파일을 변수로 대체

    Grids.Config = _IBS_Config;

    Grids.Msg = _IBS_Message;

   ....  중략 ....

}

시트에서 테마를 사용시 문제(Theme 함수)

시트 하나당 ibsheet.css 파일을 호출하는데 만약 Theme를 설정하였다면Main/ibsheet.css 파일을 호출 후 해당 설정한 테마를 다시 호출 합니다.

만약 화면에 시트가 2개이고 테마를 이용한다면 ibsheet.css 파일은 총 4회가 호출되게 됩니다.

시트의 디자인을 바꾸고 싶다면 Main/ibsheet.css 파일을 수정하는걸 권장하며

그게 여의치 않다면 ibsheet.cfg 파일에 SkipDefaultTheme를 1로 설정하면 Main/ibsheet.css 파일의 호출을 생략하게 됩니다.

다수의 시트를 생성할 때 성능 문제하나의 시트 객체가 생성되는 데 걸리는 시간은 약 0.15초 입니다. 그런데 시트 객체는 기본적으로 동기형태로 생성되기 때문에 여러개의 시트를 사용하는 화면에서는 그만큼 페이지 오픈시 많은 시간이 소요 됩니다. 가령 10개 시트를 사용하는 화면을 오픈한다면 적어도 1.5초에서 2초 가량을 시트 생성에만 사용하게 됩니다. 따라서 이렇게 여러개의 시트를 사용하는 화면에서는 큐를 통해 비동기형태로 생성하는 방법을 제공합니다.방법은 아래와 같습니다.

var initSheet2 = {};

initSheet2.Cfg =  { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:1, DataRowMerge:1 };

initSheet2.Cols = [

{Header:"NO","Type":"Seq","Hidden":0,"Width":30,"Align":"Center","ColMerge":1,"SaveName":"sSeq"},

{Header:"상태","Type":"Status","Hidden":1,"SaveName":"sStatus"},

{Header:"사원번호","Type":"Text","Hidden":1,"Width":80,"Align":"Left","SaveName":"사원번호S2","ColMerge":1,"EditLen":8},

{Header:"이수구분","Type":"Combo","Hidden":0,"Width":100,"Align":"Left","SaveName":"이수구분","ColMerge":1},

<w:t>......

];

//시트 생성 함수를 Queue에 담는다.

IBQueue.AddItem({

    context : window,

method : IBS_InitSheet, 

// InitColumns에 대한 설정을 여기서 하면 됩니다. 

//IBS_InitSheet에서 InitColumns설정을 하므로 이 함수를 method에 설정 

//하면 됩니다.

    params : [mSheet2,initSheet2], // IBS_InitSheet에 parameter 값을 설정 합니다.

callback : function(obj) {

//시트 생성외의 다른 로직을 추가 합니다.

//예) mSheet2.SetPagingPosition(0);

// mSheet2.SetCountPosition(0);

    }

});

var initSheet3 = {};

initSheet3.Cfg = { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:1, DataRowMerge:1 };

initSheet3.Cols = [

{Header:"NO","Type":"Seq","Hidden":0,"Width":30,"Align":"Center","ColMerge":1,"SaveName":"sSeq"},

{Header:"상태","Type":"Status","Hidden":1,"SaveName":"sStatus"},

{Header:"사원번호","Type":"Text","Hidden":1,"Width":80,"Align":"Left","SaveName":"사원번호S3","ColMerge":1,"EditLen":8},

{Header:"일련번호","Type":"Text","Hidden":1,"Width":60,"Align":"Left","SaveName":"일련번호","ColMerge":1,"EditLen":100},

{Header:"가족관계","Type":"Combo","Hidden":0,"Width":70,"Align":"Left","SaveName":"가족관계","ColMerge":1},

  .......

]; 

//시트 생성 함수를 Queue에 담는다.

IBQueue.AddItem({

        context : window,

        method : IBS_InitSheet, 

        params : [mSheet3,initSheet3], 

        callback : function(obj) {

        }

});

//Queue에 담았던 시트를 실행한다. (모두 비동기 형태로 한꺼번에 실행된다.)

IBQueue.Start(function() {

//시트를 그리면서 조회를 하고자 할 경우 callback에서 처리

//예) doAction("search");

});

조회 속도 개선

브라우져의 종류 따른 성능 차이브라우져 별 성능은 다음과 같습니다.IE 6~8 <  "약 10배 성능 차이" < IE 9 ~ 11 < "약 2배 성능 차이" < chrome, FF, Edge

 조회 성능 개선 옵션조회 속도를 향상하기 위한 조회 함수에 Fx라는 옵션을 두고 있습니다. 사용법은 다음과 같습니다.mySheet.DoSearch("getData.do",param , {Fx:1또는 2});이 기능을 사용하려면 조회 데이터의 정합성이 맞아야 합니다. IBSheet는 숫자 포멧을 사용하는 컬럼에 "1234" 조회 되거나 "1,234" 가 조회 되거나 다 알맞게 맞춰줍니다. 또 날짜 컬럼에 "2018-04-23" 이 조회 되거나 "20180423"이 조회 되도 모두 알맞게 Formating을 해주게 됩니다. 하지만 이 옵션을 사용할때는 숫자는 반드시 콤마가 제거된 "1234" 형식으로 조회 되어야 하고 날짜는 구분자가 포함된 "2018-04-23" 형식으로 조회 되어야 합니다.자세한 정합성 내용은 개발자 가이드 문서 마지막에 위치한 Appendix 2장에 설명되어 있습니다.

OnSearchEnd,OnRowSearchEnd 이벤트 대신 OnLoadData 이벤트 사용.조회데이터가 많지 않은 생각보다 시간이 많이 걸리는 경우 확인해 보면 조회 이후 전체 데이터를 스켄하면서 SetRowBackColor()나 SetCellEditable()식의 함수를 통해 조회된 데이터를 수정하는 경우가 많은데 위와 같은 함수가 한번 호출될때 마다 화면에 즉시 렌더링이 이루어지면서 브라우져의 자원을 사용하게 됩니다. 따라서 위와 같은 업무는 데이터를 시트에 로딩하기 전에 미리 조회데이터에 삽입하여 로딩하는 것이 훨씬 성능이 좋습니다. 도움말 ‘6.2.1.1 DATA 요소’의 구조로 데이터를 만들어서 리턴시켜 주면 됩니다.

ex) 성능이 느린 방법

function mySheet_OnSearchEnd(code,msg){

  var sr = mySheet.GetDataFirstRow(),lr = mySheet.GetDataLastRow();

  for(var i=sr;i<=lr;i++){

    //가령 CheckD 컬럼이 값이 3인 경우 배경색을 바꾸고, Flag 컬럼의 편집불가로 한다.

    if( mySheet.GetCellValue( i , "CheckD" ) == "3"){

      mySheet.SetRowBackColor(i, "#FFDDEE");

      mySheet.SetCellEditable(i, "Flag" , 0);

}

}

}

성능이 좋은 방법

function mySheet_OnLoadData(json){

  var jsonObj = $.parseJSON(json); //json문자를 object화 한다.

  var data = jsonObj["Data"];

  for(var i=0;i<data.length;i++){

    if(data[i]["CheckD"] == "3"){

      data[i]["BackColor"] = "#FFDDEE";

      data[i]["Flag#Edit"] = 0;

}

}

return jsonObj; 

}

조회 후 반응속도 개선3.1) Page 설정시트 초기화시 설정하는 Page 값에 따라 행에 대한 버퍼사이즈가 결정되는데, 일반적으로 20~50정도로 설정하면 적당합니다. 이 값이 너무 크거나 작은 경우 대량의 데이터가 화면에 올라오거나 너무 빈번하게 렌더링하면서 성능 저하를 일으킬수 있습니다.잘 모를때는 이 값을 설정하지 않는 것이 좋습니다.

시트 초기화시 SetConfig에 Page 속성을 통해 행에 대한 버퍼 크기를 설정 할 수 있습니다.

var cfg = {SearchMode:smLazyLoad, Page:20};mySheet.SetConfig(cfg);3.2) ColPage 설정ibsheet는 기본적으로 행단위 버퍼링을 합니다. 따라서 조회 된 데이터를 20~50 행 단위로 잘라서 배열로 보관하면서 화면에 표시합니다. 그런데 컬럼이 많은 경우에는 열단위로도 버퍼링을 설정할 수 있습니다.시트 초기화시 SetConfig에 ColPage 속성을 통해 열에 대한 버퍼 크기를 설정 할 수 있습니다.var cfg = {SearchMode:smLazyLoad, ColPage:10};mySheet.SetConfig(cfg); 

3.3) ChildPage 설정트리를 사용하는 화면에서는 ChildPage 속성을 5~10정도로 설정하시면 성능을 향상 시킬수 있습니다.

var cfg = {SearchMode:smLazyLoad, ChildPage : 10};mySheet.SetConfig(cfg);3.4) Render 속성 사용Hidden된 컬럼이 많은 경우 Render:0 속성을 통해 해당 컬럼을 TD 테그로 생성하지 않게 막을 수 있습니다. ibsheet는 기본적으로 Hidden:1로 설정된 컬럼이라 하더라도, 후에 SetColHidden()함수를 통해 컬럼이 보여줘야 할 경우를 대비하여 해당 컬럼에 대한 TD 테그를 생성하게 되는데 히든된 컬럼이 많은 경우, 쓸데없이 생성되는 TD테그로 인해 전체적인 성능이 저하될 수 있습니다이와 같은 경우, 해당 컬럼 설정시 Render:0 을 설정함으로써 해당 컬럼이의 TD 생성을 막을 수 있습니다. (이 속성을 사용하는 경우, 컬럼이 눈에 보여지지 않을 뿐 컬럼에 대한 소팅, 소개,엑셀 다운등 모든 기능은 정상 작동합니다.)Render 기능 사용하는 컬럼은 모두 오른쪽 끝에 두어야 합니다.

var ic = ibCfg([

{Text:"상태",</w:r><w:r><w:tab/></w:r><w:r><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>SaveName:'crudStatus',</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Type:'Status',<w:t>Width:35,</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Align:'Center',<w:t>Hidden: true},

{Text:"",</w:r><w:r><w:tab/></w:r><w:r><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>SaveName:'checked',</w:r><w:r><w:tab/><w:t>Type:'CheckBox',Width:20,</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Align:'Center',<w:t>Sort: false},

{Text:"문서번호",</w:r><w:r><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>SaveName:'ppapDocId',</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Type:'Text',<w:t>Width:100,</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Align:'Center',<w:t>Edit: false},

{Text:"Region",</w:r><w:r><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>SaveName:'region',</w:r><w:r><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Type:'Combo',<w:t>Width:100,</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Align:'Left',<w:t xml:space="preserve">Edit: false , ComboText:regionNms, ComboCode:regionCds},

{Text:"Plant",</w:r><w:r><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>SaveName:'plantCd',</w:r><w:r><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Type:'Combo',<w:t>Width:100,</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Align:'Left',<w:t xml:space="preserve">Edit: false , ComboText:plantNms, ComboCode:plantCds },

.............................. 중 략 ....................................

{Text:"참조자ID",</w:r><w:r><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>SaveName:'referIds',</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Type:'Text',<w:t>Width:100,</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Align:'Center',<w:t xml:space="preserve">Edit: false, Hidden:true,Render:0},

{Text:"참조자이름",</w:r><w:r><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>SaveName:'referNms',</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Type:'Text',<w:t>Width:100,</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Align:'Center',<w:t xml:space="preserve">Edit: false, Hidden:true,Render:0},

{Text:"도면배포일",</w:r><w:r><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>SaveName:'releaseYmd',</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Type:'Text',<w:t>Width:100,</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Align:'Center',<w:t xml:space="preserve">Edit: false, Hidden:true,Render:0},

{Text:"시스템날짜",</w:r><w:r><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>SaveName:'sysYmd',</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Type:'Text',<w:t>Width:100,</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>Align:'Center',<w:t xml:space="preserve">Edit: false, Hidden: true,Render:0}

]);

3.5) 이미지 컬럼이 많은지 체크

이미지 컬럼이 많을 시 각 셀에서 이미지를 랜더링 할 때 속도 저하가 있습니다.

이미지 컬럼을 되도록 많이 설정하지 않는 것을 권장하며 꼭 이미지 컬럼을 써야 한다면 

초기화시에 ImgWidth, ImgWidth를 반드시 설정하시기 바랍니다.

var ic = ibCfg([

{Text:"상태",</w:r><w:r><w:tab/></w:r><w:r><w:tab/></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>SaveName:'crudStatus',<w:t>Type: 'Image',<w:t>Width:35, ImgWidth : '50', ImgHeight: '50’

<w:t>]);

3.6) PrevColumnMergeMode:0 사용시 첫번째 컬럼이 대량으로 Merge되는 경우 성능 문제.

ibsheet는 기본적으로 20개 행 단위로 Table를 생성하여 DIV 넣고 있습니다(SetConfig함수의 Page 속성값). 사용자가 스크롤을 내리면 해당 위치에 보일 DIV객체를 화면에 Load하게 됩니다. 이러한 방식은 화면에 대량의 element가 로드되는 것을 막아 성능을 향상시켜주지만, 단점도 있습니다.

가장 큰 단점이 Merge시 20개 행 단위로 Merge가 분리된다는 것입니다.

[동일한 데이터임에도 불구하고, 페이지 단위로 Merge가 분리됨]

이러한 단점을 극복하기 위해 나온 기능이 PrevColumnMergeMode인데, 이 값을 0으로 설정하면 아래쪽 DIV 안에 데이터를 스캔하여 현재 보여지는 DIV와 동일한 데이터가 있을 경우, 현재 보여지는 DIV 영역으로 끌고 오게 합니다. (해당 기능은 앞 컬럼 기준 머지(msPrevColumnMerge) 에서만 사용가능)

[PrevColumnMergeMode 속성 설정 예]

initSheet.Cfg = { SearchMode: smLazyLoad, MergeSheet : msPrevColumnMerge,

PrevColumnMergeMode : 0};

그런데 만약 맨 앞에 컬럼이 수백 개 행에 걸쳐 동일한 값을 갖는다면 한꺼번에 너무 많은 데이터가 화면으로 Load되면서 성능저하가 일어나게 됩니다.

이러한 경우에는 첫 번째 컬럼을 Merge를 안 하는게 좋지만 꼭 Merge를 해야 한다면 컬럼 초기화 부분에서 Merge 값을 2로 설정 하는게 좋습니다.

[Merge:2 속성을 사용]

initData.Cols = [

 {"Header":"상태","Type":"Status", "Width":80, "SaveName":"sStatus" ... },

 {"Header":"대분류", "Type":"Text" , "Merge":2, "SaveName":"MainTitle"},

 {"Header":"중분류", "Type":"Text" , "Merge":2, "SaveName":"SubTitle"}

.....

];

Merge:2로 설정하면 실제로 RowSpan을 통한 머지를 하는게 아니라 TD 테그의 border-bottom 을 감춰서 마치 Merge된 것처럼 보이게 합니다.