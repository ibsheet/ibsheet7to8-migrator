<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%--
  샘플 ASIS — IBSheet7 주문 목록 화면
  브릿지 헬퍼가 필요한 케이스와, 브릿지를 쓰면 안 되는 케이스를 함께 담았다.
  변환 결과는 ../tobe/orderList.jsp 참고.
--%>
<div id="sheetArea"></div>
<div>합계: <span id="totalAmt">0</span></div>

<script type="text/javascript" src="<c:url value='/js/ibsheet/ibsheet.js'/>"></script>
<script type="text/javascript">

var mySheet;

// ---------------------------------------------------------------------------
// 초기화
// ---------------------------------------------------------------------------
function fnInitSheet() {
    var initSheet = {
        Cfg: {
            SearchMode: 2,
            Page: 50,
            MergeSheet: 5,
            CanEdit: 1
        },
        Cols: [
            {Header:"선택",       Type:"CheckBox", SaveName:"chk",                   Width:40,  UpdateEdit:1, InsertEdit:1},
            {Header:"상태",       Type:"Status",   SaveName:"status",                Width:50},
            {Header:"삭제",       Type:"DelCheck", SaveName:"delChk",                Width:40},
            {Header:"사업자번호", Type:"Text",     SaveName:"orderDTOList.bizNo",    Width:120, FormatFix:1, Format:"###-**-#####"},
            {Header:"거래처",     Type:"Text",     SaveName:"orderDTOList.custNm",   Width:150, Hidden:false},
            {Header:"구분",       Type:"Combo",    SaveName:"orderDTOList.gubun",    Width:80,  ComboText:"매입|매출", ComboCode:"1|2"},
            {Header:"수량",       Type:"Int",      SaveName:"orderDTOList.qty",      Width:80,  ColMerge:0},
            {Header:"단가",       Type:"Int",      SaveName:"orderDTOList.price",    Width:100},
            {Header:"금액",       Type:"Int",      SaveName:"orderDTOList.amt",      Width:120, UpdateEdit:0, InsertEdit:0},
            {Header:"비고",       Type:"Text",     SaveName:"orderDTOList.remark",   Width:200, Hidden:true}
        ]
    };
    IBSheet_CreateSheet(document.getElementById("sheetArea"), "mySheet", initSheet, 400);
    mySheet.SetActionMenu("행추가|행복사|*-|삭제|엑셀내려받기");
}

// ---------------------------------------------------------------------------
// 조회 / 저장
// ---------------------------------------------------------------------------
function fnSearch() {
    var url = "<c:url value='/order/selectOrderList.do'/>";
    mySheet.DoSearch(url, "custNm=" + document.frm.elements["orderCommonDTO.custNm"].value);
}

function fnSave() {
    if (mySheet.ColValueDup("orderDTOList.bizNo") > 0) {
        alert("사업자번호가 중복되었습니다.");
        return;
    }
    mySheet.DoSave("<c:url value='/order/saveOrderList.do'/>");
}

// ---------------------------------------------------------------------------
// 행 추가 / 삭제
// ---------------------------------------------------------------------------
function fnAddRow() {
    var newRow = mySheet.DataInsert(0);
    mySheet.SetCellValue(newRow, "orderDTOList.gubun", "매입");
    mySheet.SetCellValue(newRow, "orderDTOList.qty", 1);
}

function fnDelRow() {
    var selRow = mySheet.GetSelectRow();
    if (selRow < mySheet.HeaderRows()) {
        alert("삭제할 행을 선택하세요.");
        return;
    }
    mySheet.RowDelete(selRow);
}

function fnClearStatus() {
    var selRow = mySheet.GetSelectRow();
    mySheet.SetRowStatus(selRow, "R");
}

// ---------------------------------------------------------------------------
// 편집 제어
// ---------------------------------------------------------------------------
function fnLockRow() {
    var selRow = mySheet.GetSelectRow();
    mySheet.SetCellEditable(selRow, "orderDTOList.qty", 0);
    mySheet.SetRowEditable(selRow, 0);
    mySheet.SetColEditable("orderDTOList.price", 0);
}

function fnFocusBizNo() {
    mySheet.SelectCell(mySheet.HeaderRows(), 3);
}

// ---------------------------------------------------------------------------
// 집계 / 체크
// ---------------------------------------------------------------------------
function fnSumAmt() {
    var total = mySheet.ComputeSum("orderDTOList.amt", mySheet.HeaderRows(), mySheet.LastRow());
    document.getElementById("totalAmt").innerHTML = total;
    // 합계행에는 계산 결과만 표시 (변경 이벤트 발생 대상 아님)
    mySheet.SetSumValue("orderDTOList.amt", total);
}

function fnToggleAll() {
    mySheet.CheckAll(0, 1);
}

function fnReverseCheck() {
    // 렌더를 억제하고 루프 후 한 번만 갱신
    mySheet.CheckReverse(0);
}

// ---------------------------------------------------------------------------
// 크기 / 부가 데이터
// ---------------------------------------------------------------------------
function fnResize() {
    mySheet.SetSheetWidth(1200);
    mySheet.SetSheetHeight(mySheet.GetSheetHeight() + 100);
}

function fnReadEtc() {
    var totalCount = mySheet.GetEtcData("totalCount");
    mySheet.SetEtcData("pageNo", 1);
    return totalCount;
}

function fnShowOrigBizNo() {
    var selRow = mySheet.GetSelectRow();
    // 원본값(조회 당시 값)을 그대로 봐야 하는 화면
    return mySheet.CellSearchValue(selRow, "orderDTOList.bizNo");
}

// ---------------------------------------------------------------------------
// 이벤트 핸들러 (IBSheet7 = 전역 함수 명명 규칙)
// ---------------------------------------------------------------------------
function mySheet_OnSearchEnd(code, msg) {
    document.getElementById("totalAmt").innerHTML = mySheet.GetEtcData("totalAmt");
}

function mySheet_OnAfterEdit(row, col, value) {
    if (col == "orderDTOList.qty" || col == "orderDTOList.price") {
        var qty   = mySheet.GetCellValue(row, "orderDTOList.qty");
        var price = mySheet.GetCellValue(row, "orderDTOList.price");
        mySheet.SetCellValue(row, "orderDTOList.amt", qty * price);
    }
}

function mySheet_OnClick(row, col, value) {
    if (mySheet.ColSaveName(col) == "orderDTOList.custNm") {
        openCustPopup(mySheet.GetCellValue(row, "orderDTOList.bizNo"));
    }
}

function mySheet_OnSelectMenu(menuValue) {
    if (menuValue == "행추가") {
        fnAddRow();
    } else if (menuValue == "삭제") {
        fnDelRow();
    }
}

function openCustPopup(bizNo) {
    window.open("<c:url value='/popup/cust.do'/>?bizNo=" + bizNo, "cust", "width=600,height=400");
}

</script>
