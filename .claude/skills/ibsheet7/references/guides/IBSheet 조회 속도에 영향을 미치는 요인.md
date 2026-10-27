# IBSheet 조회 속도에 영향을 미치는 요인

IBSheet 성능에 영향을 미치는 요인

조회 속도 및 전체 성능에 영향을 미치는 요건을 정리하면 아래와 같습니다.

1. 브라우져의 버젼

Browser의 속도는 다음과 같습니다. (오른쪽으로 갈수록 빨라집니다.)

IE 6,7 <  IE 8   <<< 넘사벽 <<<  IE9< IE10 < IE11 < IE Edge << Chrome, FF

실제로 IE8 과 크롬 사이에서 성능은 20배 이상입니다. 이는 브라우져의 엔진 성능에 따른 편차로 사용자 피씨성능과는 무관한 수치입니다.또한 IE11브라우져의 경우 Edge 브라우져가 나온 이후 특별한 성능개선은 이루어지지 않는  

2. 조회 데이터 구조 에 따른 속도 차이입니다.

조회 데이터의 유형에 따라 성능 차이가 발생합니다.(오른쪽으로 갈수록 빨라집니다.)

기존 TD Tag를 사용하는 XML구조 <<< JSON <= COLSEPARATOR을 사용한 XML구조

3. DOCTYPE 선언부에 따른 속도차이

아래와 같이 하위 브라우저에 대한 호환성이 강한 DOCTYPE 사용시 스크립트 엔진 성능이 저하되어 조회 성능이 떨어질 수 있습니다. (IE10 이하의 브라우져의 경우임.)

성능이 떨어지는 DOCTYPE

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

비교적 속도가 빠른 DOCTYPE

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<!DOCTYPE HTML>

IE Browser에서 F12를 눌러 개발자 도구를 열었을 때 브라우저 모드나 문서 모드가 표준 일 때 가장 빠르게 동작함.

4. DoSearch Method 대신 $.ajax()와 LoadSearchData({fx:2}) 옵션 사용

일반적인 조회 함수인 DoSearch()의 경우, 서버에서 받은 데이터에 대한 정합성 체크를 여러가지로 하게 되는데,이러한 과정에서 조회 시간이 지연됩니다. 따라서 위의 Fx:2 옵션을 사용하면 최소한의 정합성 체크만하고 조회 된 데이터를 화면에 표시함으로 성능을 향상시키게 됩니다.

해당 기능을 사용할 때는 여러 가지 제약(XML은 사용 불가,트리사용불가, 데이터영역 머지 불가 등)이 있기 때문에 반드시 메뉴얼을 참고해야 하셔야 합니다.

메뉴얼 맨 마지막 Appendix 2장 참고

[사용 예]

//일반적이 조회mySheet.DoSearch("test.searchWork.do",param);//LoadSearchData(Fx) 기능을 통한 빠른 조회FastSearch( "test.searchWork.do" , param , mySheet);

//빠른 조회 함수

function FastSearch(url ,param , sheetObj){

$.ajax({

    "type": "post"

    , "dataType":"json"

    , "url": url

    , "data":  param

    ,"timeout":sheetObj.GetWaitTimeOut() *1000

    , "beforeSend": function() {

        //조회 전 대기 이미지 

        if(sheetObj.GetWaitImageVisible()){

            sheetObj.ShowProcessDlg("Search");

        }

      }

    , "success": function(JSON) {

        //정상조회 완료

        mySheet.LoadSearchData(JSON , {Fx:2});

      }

    , "error": function(data, status, err) {

        if(status=="timeout"){

            //응답대기시간 초과

            alert( sheetObj.Lang.Alert.SYS_ErrTimeout);

        }else{

         alert('서버와의 통신이 실패했습니다.');

        }

      }

      ,"complete":function(jqXHR,textStatus){

      }

    });

}

}

5. Row,Column 버퍼 사이즈 조정

초기화 함수에 SetConfig()에 Page 속성값이 크면 클수록 대량의 데이터가 한꺼번에 화면에 로드됨으로 성능에 좋지 않습니다. Page 속성은 가급적 설정하지 않는 게 좋고, 특수한 경우라면10~30 이내로 설정하여 사용하세요.

트리를 사용하는 화면에서는 SetConfig()함수에 ChildPage 속성을 10정도로 설정하시면 성능향상을 볼수 있습니다.

컬럼이 많은 화면에서는 가로스크롤에 대해서도 버퍼링이 필요합니다. SetConfig()함수에 ColPage속성을 10정도로 설정하면 10개 컬럼 단위로 렌더링이 이루어지면서 가로로 스크롤이 움질일때 마다 해당 영역을 그리는 형태로 성능이 향상됩니다. 

6. OnRowSearchEnd, OnSearchEnd이벤트에서 대량 데이터 수정 로직이 있는 경우.(매우매우 중요)

조회가 끝나고 나서 발생하는 OnSearchEnd이벤트 내에 전체 데이터에 대한 수정(혹은 폰트나 행,셀에 대한 색상 수정) 로직이 있는 경우, 조회 건수에 비례하여 조회 시간이 오래 걸리게 됩니다.

이는 조회 후에 전체 데이터를 루프돌면서 값을 변경하거나, 색상등을 설정하는 함수를 호출할때 마다 화면에 렌더링이 이루어지기 때문입니다.따라서 OnSearchEnd()에서 해야 하는 작업을 OnLoadData() 이벤트에서 JSON Attribute(개발자 가이드 6.2.1.1 장 참고) 기능으로 처리하면 조회과정에서 이러한 내용이 반영되고 최종적으로 한번만 렌더링이 이루어짐으로 성능이 향상됩니다..

(OnRowSearchEnd는 가급적 사용하지 않느게 좋고, 꼭 필요하다면 조회건수가 작은 경우에만 사용하세요.)

[일반적인 OnSearchEnd 이벤트에서 로직을 구성한 예]

//느린 성능의 로직(조회 후 AMT 컬럼의 값이 100보다 크면 붉색의 굵은 폰트로 변경)

function mySheet_OnSearchEnd(code,msg){

   for(var row=mySheet.GetDataFirstRow() ; row<=mySheet.GetDataLastRow(); row ++){

      if(  mySheet.GetCellValue( row,  "AMT") > 100 ) {

        mySheet.SetCellFontColor( row, "AMT", "#FF0000");

        mySheet.SetCellFontBold( row, "AMT",  true);

     }//end if

   }//end for

}//end onsearchend

[OnLoadData 에서 JSON 안에 기능을 추가한 경우 예]

//빠른 성능의 로직 

function mySheet_OnLoadData(data){

  //조회 된 데이터를 json object로 변경

  var jsonData = $.parseJSON(data);  var rowdata = jsonData["Data"]; //Data의 대/소문자는 업체마다 다를 수 있음.

  for(var i=0;i<rowdata.length;i++){

    if( rowdata[i]["AMT"] > 100 ){

      rowdata[i]["AMT#FontColor"] = "#FF0000";

      rowdata[i]["AMT#FontBold"] = "1";

    }//end if

  }//end for

  return jsonData;  //수정한 데이터를 반드시 리턴해야 됨.

}//end onloadata

7. 감춰진 컬럼이 많은 경우.

화면에 실제로 보여지는 컬럼은 20여개 남짓인데, Hidden으로 감춰진 컬럼이 많은 경우 조회 성능, 혹은 조회 후 클릭 등의 움직임에서 성능 저하가 나타날 수 있습니다.

이는 시트에서 컬럼을 감추더라도, 이후에 ColHidden과 같은 함수를 통해 컬럼이 보여질 것을 대비하여 컬럼영역을 미리 만들어 둠으로 인해 성능 저하가 나타나는 것입니다.

따라서 이후에도 사용자에게 보여질 필요가 없는 컬럼이라면 시트의 오른쪽 끝에 생성하고 Render:0 속성을 설정해 두면 DOM을 만들때 해당 컬럼 부분을 만들지 않아 성능을 향상시킬 수 있습니다.[Render를 사용하는 컬럼에 대한 부분]

initData.Cols = [

 {"Header":"상태","Type":"Status", "Width":80, "SaveName":"sStatus" ... },

 ....

 {"Header":"히든 컬럼1", "Type":"Text" , "Hidden":1 , "Render":0, "SaveName":"sa_code"},

 {"Header":"히든 컬럼2", "Type":"Text" , "Hidden":1 , "Render":0, "SaveName":"ju_code"}

];

Render:0으로 선언된 컬럼은 DOM구성에서만 빠질 뿐 컬럼이 갖는 기능은 모두 수행합니다.(엑셀 다운등 가능) 

Render:0으로 선언된 컬럼들은 반드시 시트 오른쪽 끝에 위치해야 합니다.(다른 보여지는 컬럼 사이에 위치해서는 안됩니다.)

8. 호환성 보기 사용시 문제

IE 브라우져에서 해당 사이트를 "호환성 보기" 목록에 추가하는 경우, 브라우져 내에 구형 엔진형식으로 동작함으로 성능 저하가 일어납니다. 따라서 개발시 페이지 상단에 meta테그를 통해 사용자 설정과 무관하게 브라우져의 성능을 사용하게 끔 하는 것이 좋습니다.

[사용자가 설정한 호환성보기와 무관하게 동작함]

<meta http-equiv="X-UA-Compatible" content="IE=edge">

9. PrevColumnMergeMode:0 을 통해 앞컬럼 머지 기능 사용시 첫번째 컬럼이 대량으로 머지되는 경우 성능 문제.

ibsheet는 기본적으로 20개 행 단위로 Table를 생성하여 DIV 넣고 있습니다. 따라서 사용자가 스크롤을 내리면 해당 위치에 보여질 DIV객체를 화면에 로드하게 됩니다. 이러한 방식은 화면에 대량의 element가 로드되는 것을 막아 성능을 향상시켜주시만, 단점도 있습니다.

가장 큰 단점 중 하나가 데이터 영역에 대한 머지를 할때 20개 행 단위로 머지가 분리된다는 것입니다.

[동일한 데이터임에도 불구하고,페이지 단위로 머지가 분리됨]

이러한 단점을 극복하기 위해 나온 기능이 SetConfig()함수의 PrevColumnMergeMode 인데, 이 값을 0으로 설정하면 아래쪽 DIV 안에 데이터를 스켄하여 현재 보여지는 DIV와 동일한 데이터가 있을 경우, 현재 보여지는 DIV 영역으로 끌고 오게 합니다. (해당 기능은 앞 컬럼 기준 머지(msPrevColumnMerge) 에서만 사용가능)

[PrevColumnMergeMode 속성 설정 예]

initSheet.Cfg = { FrozenCol:2 , MergeSheet:msPrevColumnMerge, PrevColumnMergeMode:0};

그런데 만약 맨 앞에 컬럼이 수백개 행에 걸쳐 동일한 값을 갖는다면 한꺼번에 너무 많은 데이터가 화면으로 로드되면서 성능저하가 일어나게 됩니다.

이러한 경우에는 첫 번째 컬럼을 머지를 안하는게 좋지만 꼭 머지를 해야 한다면 컬럼 초기화 부분에서 Merge 값을 2로 설정하는게 좋습니다.

[Merge:2 속성을 사용]

initData.Cols = [

 {"Header":"상태","Type":"Status", "Width":80, "SaveName":"sStatus" ... },

 {"Header":"대분류", "Type":"Text" , "Merge":2, "SaveName":"MainTitle"},

 {"Header":"중분류", "Type":"Text" , "Merge":2, "SaveName":"SubTitle"}

.....

];

Merge:2로 설정하면 실제로 RowSpan을 통한 머지를 하는게 아니라 TD 테그의 border-bottom 을 감춰서 마치 머지된 것 처럼 보이게 끔 합니다.

10. 잘못된 jquery 사용에 의한 성능 저하 문제

jquery는 편리하게 DOM안에 객체에 이벤트를 부여할 수 있는데, 이러다보니 광범위한 영역에 이벤트를 부여하여 전반적인 성능에 문제가 생기는 경우가 있습니다.

[잘못된 이벤트 등록 예]

$(document).on( "click.object",function(){

      //logic...

});

document 내에 모든 객체에 이벤트가 부여됨으로 성능 저하가 일어나게 됩니다.

11. 루프를 돌면서 이루어지는 대량 렌더링시 성능 저하 문제.

신규행을 50개 추가하기 위해 다음과 같은 로직을 설정하면 굉장히 시간이 오래 걸립니다.

<w:tblPr><w:tblStyle w:val="a7"/><w:tblW w:w="0" w:type="auto"/><w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr><w:tblGrid><w:gridCol w:w="9224"/></w:tblGrid><w:tr w:rsidR="00FD77E9" w:rsidTr="00FD77E9"><w:tc><w:tcPr><w:tcW w:w="9224" w:type="dxa"/></w:tcPr><w:p w:rsidR="00FD77E9" w:rsidRDefault="00FD77E9" w:rsidP="00FD77E9"><w:r><w:t>for(var i=0;i<50;i++){

 mySheet.DataInsert();

}

이는 신규행이 하나 추가될 때마다 화면에 그 변경된 내용이 업데이트(렌더링)됨으로 지연이 발생하는 것입니다.

마찬가지로 행이나 컬럼을 감추거나 보이는 행위도 여러 행/열에 걸쳐서 하게 되면 성능지연이 발생합니다.

<w:tblPr><w:tblStyle w:val="a7"/><w:tblW w:w="0" w:type="auto"/><w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr><w:tblGrid><w:gridCol w:w="9224"/></w:tblGrid><w:tr w:rsidR="00FD77E9" w:rsidTr="00FD77E9"><w:tc><w:tcPr><w:tcW w:w="9224" w:type="dxa"/></w:tcPr><w:p w:rsidR="00FD77E9" w:rsidRDefault="00FD77E9"><w:r><w:rPr><w:rFonts w:hint="eastAsia"/></w:rPr><w:t>for(var i=4;i<21;i++){

  mySheet.RowHidden(i , 1); //여러개 행을 감춘다.

}

이러한 로직을 가장 쉽게 개선하는 것은 RenderSheet() 함수를 사용하는 것입니다.

RenderSheet()함수를 사용하면 일시적으로 렌더링을 막았다가 모든 내용이 반영되고 난 다음에 한번에 렌더링을 수행하게 끔 할 수 있습니다.

mySheet.RenderSheet(0); //일시적으로 렌더링을 막음.for(var i=4;i<21;i++){

  mySheet.RowHidden(i , 1); //여러개 행을 감춘다.

}

mySheet.RenderSheet(1); //변경된 내용을 한번에 화면에 보여줌.

12. 데이터 복사시 잘못된 로직으로 인한 성능 저하

특정 시트의 데이터를 다른 시트에 복사한다고 가정하면 가장 쉽게 생각할 수 있는 게, 원본 시트의 데이터 행의 개수만큼 for루프를 돌면서 타겟 시트에 행을 생성하고(DataInsert), CellValue()를 통해 값을 복사하는 것인데, 이러한 방식으로 셀 단위로 한 건 한 건 데이터 값을 입력하게 되면 매번 SetCellValue가 호출될때 마다 렌더링이 이루어 짐으로써 성능 저하가 일어나게 됩니다.

[일반적으로 생각하기 쉬운 행 복사 로직]

//OrgSheet의 체크된 데이터를 TargetSheet에 복사해 넣는다.

for(var i=OrgSheet.GetDataFirstRow() ; i <= OrgSheet.GetDataLastRow() ; i++){

  //체크된 데이터만 복사

  if( OrgSheet.GetCellValue( i , "CHK") ){

    var row = TargetSheet.DataInsert(-1); //마지막 행에 추가

    //세개 컬럼의 값을 복사한다고 가정

    TargetSheet.SetCellValue( row , "Col1" , OrgSheet.GetCellValue( i , "Col1" ) );

    TargetSheet.SetCellValue( row , "Col2" , OrgSheet.GetCellValue( i , "Col2" ) );

    TargetSheet.SetCellValue( row , "Col3" , OrgSheet.GetCellValue( i , "Col3" ) );

  }

}

위와 같은 방법 보다는 원본 시트의 체크된 데이터를 한번에 추출하여, 타겟시트에 한번에 부어주는 형태가 좋습니다.

[위와 동일하게 복사되지만 성능이 빠른 로직]

//CHK 컬럼에 체크된 모든 데이터를 JSON 형태로 추출한다.

var copyData = OrgSheet.GetSaveJson({StdCol:"CHK"});//타겟 시트에 추출한 데이터를 로드한다.TargetSheet.LoadSearchData ( copyData , {Append:1 } );