# ibsheet 너비 문제

ibsheet 컬럼 너비 설정 관련 메서드 설명

<w:p w:rsidR="00A40B53" w:rsidRDefault="00A40B53" w:rsidP="00A40B53"><w:proofErr w:type="spellStart"/><w:r><w:rPr><w:rFonts w:hint="eastAsia"/></w:rPr><w:t>컬럼의 너비 합(300px)

컬럼의 너비 합(300px)

시트 전체 너비(700px)

시트 전체 너비(700px)

FitColWidth 함수 호출하기FitColWidth()함수를 호출하면 각 컬럼의 너비를 비율로 계산하여 가로 스크롤이 보여지지 않는 범위 내에서 알맞게 보여줍니다.

[FitColWidth() 함수 호출 모습]

이러한 이유로 매번 시트를 생성하고 나서 또는 조회 하고 나서(OnSearchEnd) FitColWidth()라는 함수를 호출했었는데, 그게 너무 번거로워서 AutoFitColWidth라는 속성을 만들었습니다. 이 속성은 ibsheet.cfg 에 설정하거나 시트 초기화 함수인 SetConfig 함수에 넣어주면 됩니다.

이 속성은 어떠한 액션이 발생할 때 내부적으로 FitColWidth()함수를 호출시켜 줍니다.사용 한 예는 아래와 같습니다.

[ibsheet.cfg에서 공통으로 설정]

{

   .....   "AutoFitColWidth":"search|init|resize"

}

[시트 초기화 구문에서 사용]

// SetConfig 설정 부분

initSheet.Cfg = {MergeSheet:msHeaderOnly , AutoFitColWidth:"search|init|resize"};

initSheet.Cols = [  {Header:"상태",Type:"Text"..},];

IBS_InitSheet(mySheet, initSheet); //ibsheetinfo.js 파일에 함수 정의되어 있음. 이 함수에 SetConfig 호출 부분이 있음

위와 같이 설정하면 시트가 생성 되었을 때(init), 조회 후(search), 크기가 변경(resize)되었을 때 컬럼의 너비를 가로 스크롤이 생기지 않게 조정해 줍니다.

여기서 두 가지의 또 다른 문제가 발생합니다.첫째는 컬럼이 많은 시트에서의 문제인데, 컬럼이 많은 시트에서 위 속성이 적용되다 보면 각 컬럼이 너무 오밀조밀하게 그려질 수 있습니다.

이러한 경우를 피하기 위해서는 시트를 생성할때 너비를 Width 대신 MinWidth로 작성해 주셔야 합니다.

MinWidth로 작성한 경우 최소 너비가 유지 됩니다.

[초기화시 MinWidth 사용]

initSheet.Cfg = {MergeSheet:msHeaderOnly};

//InitColumns 설정 부분initSheet.Cols = [  {Header:"상태",Type:"Text", MinWidth:60},  ....

];

두번째는 너비 변화가 필요 없는 컬럼 (날짜 유형이나 체크박스 등)에까지 너비가 늘어나거나 줄어드는 문제인데 이러한 컬럼은 컬럼 초기화시 FitColWidth:0 속성을 하나 넣어주시면 됩니다.

init_data.Cols = [

           {Header:"No",Type:"Seq",MinWidth:35,SaveName:"seq",Align:"Center"},

           {Header:"일자",Type:"Date",MinWidth:120,SaveName:"nDate", FitColWidth:0},

                          {Header:"업무구분",Type:"Text",MinWidth:100,SaveName:"workCls",Align:"Center"},

                    ...........

               ];

이렇게 설정해 주시면 해당컬럼의 AutoFitColWidth가 동작할때 영향을 받지 않게 됩니다.(사용자가 마우스를 이용하여 컬럼의 너비를 조정하는 것은 가능합니다.)

기타 너비 조정과 관련된 함수.

FitSize() 

함수를 호출하면 호출 순간, 현재 페이지 내에서 각 컬럼의 글자 중 가장 긴 글자에 맞추어 컬럼의 너비가 조정됩니다. 데이터가 많아지면 속도 저하의 원인이 됩니다.[각 컬럼의 가장 긴 글자에 맞춰 너비가 조정됨]

ExtendLastCol()

초기화 시 설정해 두면 시트의 마지막 컬럼의 너비를 늘려 시트너비에 맞춘다.[마지막 컬럼의 너비가 시트크기에 맞게 늘어남]