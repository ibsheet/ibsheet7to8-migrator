# 두개버젼의 IBSheet를 한 시스템에서 사용하는 방법

두개 버젼의 IB Sheet 를 한 시스템에서 사용하는 방법 

기존의 버젼과 신버젼의 ibsheet를 각기 다른 폴더에 넣어주시고, 각 화면에서 ibsheet.js 파일과 ibsheetinfo.js 파일을 인클루드할 때 분기하여 파일을 넣어주시면 됩니다.

그런데 해당 시스템이 frameset을 사용하거나 iframe을 사용하는 경우에는 한가지 더 해주어야 할 것이 있습니다.

ibsheet.js 파일을 인클루드 하기 전에 다음 구문을 한번 실행해 줘야 합니다.

//서로다른 버젼의 IBSheet 제품을 한 시스템에서 사용시 필요함

try{

<w:t>if (top.D_$_) delete top.D_$_;

}catch(e){}

ibsheet는 frame을 사용하는 환경에서 공통을 사용할 내용을 top frame에 미리 저장해 놓고 사용하기 때문에 위와 구문이 안들어가면 먼저 접속한 화면의 ibsheet.js 버젼이 계속 구동됩니다.