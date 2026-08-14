<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%--
  샘플 TOBE — ../asis/orderList.jsp 의 IBSheet8 변환 결과
  브릿지를 쓴 자리와, 브릿지를 쓰지 않고 공식 API를 유지한 자리에 [브릿지]/[공식] 주석을 달았다.
  이벤트 핸들러는 ASIS 함수명을 그대로 유지하고 Events에서 참조로 연결한다(fn_parity 통과).
--%>
<div id="sheetArea"></div>
<div>합계: <span id="totalAmt">0</span></div>

<script type="text/javascript" src="<c:url value='/js/ibsheet/ibsheet.js'/>"></script>
<%-- IB_Preset(STATUS·DelCheck 등)은 본체가 아니라 이 플러그인에 정의된 window.IB_Preset 이다.
     빠뜨리면 검증 3종은 PASS인데 브라우저에서 'IB_Preset is not defined' 로 죽는다. --%>
<script type="text/javascript" src="<c:url value='/js/ibsheet/plugins/ibsheet-common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/ibsheet/ibsheet-migration.js'/>"></script>
<script type="text/javascript">

var mySheet;

// ---------------------------------------------------------------------------
// 초기화
// ---------------------------------------------------------------------------
function fnInitSheet() {
    var OPT = {
        Cfg: {
            // SearchMode:2 → 0 : IBSheet8 강점인 FastLoad 가상 스크롤로 상향(의도된 규칙).
            // 이 시트는 Lines/Html/Img/Icon/Button 타입과 피벗·NoVScroll을 쓰지 않아 제약에 걸리지 않는다.
            SearchMode: 0,
            Page: 50,
            // MergeSheet:5(msHeaderOnly) → 헤더만 병합 = HeaderMerge 지정 + DataMerge:0
            // v7은 병합 방향을 지정하지 않으므로 헤더 구조에 따라 v8 1~6 중 선택(여기서는 열 우선)
            HeaderMerge: 3,
            DataMerge: 0,
            CanEdit: 1
        },
        // setActionMenu 브릿지는 sheet.Def.Row 가 있어야 Menu를 주입한다 → 미리 선언
        Def: {
            Row: { Menu: {Items: []} }
        },
        Cols: [
            // Type:"CheckBox" → "Bool" / UpdateEdit → ChangeEdit / InsertEdit → AddEdit
            {Header:"선택",       Type:"Bool", Name:"chk",     Width:40,  ChangeEdit:1, AddEdit:1},
            // Type:"Status" → Type:"Text" + Extend:IB_Preset.STATUS (IBSheet8에 Status 타입 없음)
            {Header:"상태",       Type:"Text", Name:"status",  Width:50,  Extend:IB_Preset.STATUS},
            // Type:"DelCheck" → Type:"Bool" + Extend:IB_Preset.DelCheck
            {Header:"삭제",       Type:"Bool", Name:"delChk",  Width:40,  Extend:IB_Preset.DelCheck},
            // SaveName의 orderDTOList. 접두사 strip (리스트 변수 접두사 → 컬럼 Name은 plain)
            {Header:"사업자번호", Type:"Text", Name:"bizNo",   Width:120, FormatFix:1, Format:"###-**-#####"},
            // Hidden:false → Visible:1 (★값 반전)
            {Header:"거래처",     Type:"Text", Name:"custNm",  Width:150, Visible:1},
            // Type:"Combo" → "Enum" / ComboText·ComboCode → Enum·EnumKeys (첫 글자가 구분자)
            {Header:"구분",       Type:"Enum", Name:"gubun",   Width:80,  Enum:"|매입|매출", EnumKeys:"|1|2"},
            // ColMerge → ★치환하지 않는다. v8에도 ColMerge(col)이 동명·동의미로 존재
            // (Span은 cell 속성 colspan으로 전혀 다른 개념)
            {Header:"수량",       Type:"Int",  Name:"qty",     Width:80,  ColMerge:0},
            {Header:"단가",       Type:"Int",  Name:"price",   Width:100},
            // UpdateEdit:0 + InsertEdit:0 → CanEdit:0 통합
            {Header:"금액",       Type:"Int",  Name:"amt",     Width:120, CanEdit:0},
            // Hidden:true → Visible:0 (★값 반전)
            {Header:"비고",       Type:"Text", Name:"remark",  Width:200, Visible:0}
        ],
        // IBSheet7 전역 함수 명명 규칙 → Events 객체. 함수명은 유지하고 참조만 연결한다.
        Events: {
            onSearchFinish: mySheet_OnSearchEnd,
            onAfterChange:  mySheet_OnAfterEdit,
            // OnClick → onAfterClick (★onClick 아님. v8 onClick 은 발생 시점이 더 앞선다)
            onAfterClick:   mySheet_OnClick,
            onSelectMenu:   mySheet_OnSelectMenu
        }
    };
    mySheet = IBSheet.create({id: "mySheet", el: "sheetArea", options: OPT, height: 400});
    // [브릿지] SetActionMenu → setActionMenu ("|" 문자열 → Def.Row.Menu.Items 배열)
    mySheet.setActionMenu("행추가|행복사|*-|삭제|엑셀내려받기");
}

// ---------------------------------------------------------------------------
// 조회 / 저장
// ---------------------------------------------------------------------------
function fnSearch() {
    var url = "<c:url value='/order/selectOrderList.do'/>";
    // 폼 필드 접두사(orderCommonDTO.)는 컬럼이 아니므로 strip 금지 → 그대로 유지
    mySheet.doSearch(url, "custNm=" + document.frm.elements["orderCommonDTO.custNm"].value);
}

function fnSave() {
    // ColValueDup(index 반환) → getRowsByDup(행객체 배열) → 비교를 .length > 0 으로 재작성
    if (mySheet.getRowsByDup("bizNo").length > 0) {
        alert("사업자번호가 중복되었습니다.");
        return;
    }
    mySheet.doSave("<c:url value='/order/saveOrderList.do'/>");
}

// ---------------------------------------------------------------------------
// 행 추가 / 삭제
// ---------------------------------------------------------------------------
function fnAddRow() {
    // [브릿지] DataInsert(0) → addRow2(0) (IBSheet7 인덱스를 next/parent로 변환)
    var newRow = mySheet.addRow2(0);
    // [브릿지] setValue2 — Enum 컬럼에 화면표시값("매입")을 넣어도 EnumKeys("1")로 자동 교체된다
    mySheet.setValue2(newRow, "gubun", "매입");
    mySheet.setValue2(newRow, "qty", 1);
}

function fnDelRow() {
    // GetSelectRow(index) → getFocusedRow(행객체) → 숫자 비교(selRow < HeaderRows()) 제거
    var selRow = mySheet.getFocusedRow();
    if (!selRow) {
        alert("삭제할 행을 선택하세요.");
        return;
    }
    // [브릿지] RowDelete → removeRow2 (IBSheet7처럼 삭제 전 onRowDelete 발생)
    mySheet.removeRow2(selRow);
}

function fnClearStatus() {
    var selRow = mySheet.getFocusedRow();
    if (!selRow) return;
    // [브릿지] SetRowStatus(row, "R") → clearRowStatus (Added/Changed/Deleted/Moved 일괄 클리어)
    mySheet.clearRowStatus(selRow);
}

// ---------------------------------------------------------------------------
// 편집 제어
// ---------------------------------------------------------------------------
function fnLockRow() {
    var selRow = mySheet.getFocusedRow();
    if (!selRow) return;
    // [브릿지] 셀 단위 CanEdit → ChangeEdit/AddEdit로 분해됨 (Button 컬럼이면 Disabled까지)
    mySheet.setAttribute2(selRow, "qty", "CanEdit", 0);
    // 행/열 단위는 공식 setAttribute와 동작이 같지만 호출 형태를 통일해 둔다
    mySheet.setAttribute2(selRow, null, "CanEdit", 0);
    mySheet.setAttribute2(null, "price", "CanEdit", 0);
}

function fnFocusBizNo() {
    // [브릿지] SelectCell(행index, 열index) → focus(행객체, 열이름)
    //   IBSheet7 index HeaderRows() = 첫 데이터행. getRowByIndex7이 헤더/필터/합계 오프셋을 보정한다.
    var firstDataRow = mySheet.getRowByIndex7(mySheet.getHeaderRows().length);
    mySheet.focus(firstDataRow, mySheet.getColByIndex7(3));
}

// ---------------------------------------------------------------------------
// 집계 / 체크
// ---------------------------------------------------------------------------
function fnSumAmt() {
    // [브릿지] ComputeSum → computeSum (공식 IBSheet8 API에 없음)
    //   ASIS는 HeaderRows()~LastRow() = 전체 데이터행 → 범위 인자를 생략하면 동일 범위
    var total = mySheet.computeSum("amt");
    document.getElementById("totalAmt").innerHTML = total;
    // [공식] 합계행은 사용자 데이터 셀이 아니다 → onAfterChange가 불필요하므로 setValue2 금지
    mySheet.setValue(mySheet.getRowById("FormulaRow"), "amt", total);
}

function fnToggleAll() {
    // CheckAll(열index, b) → setAllCheck(열이름, b). [브릿지] getColByIndex7로 열이름 변환
    mySheet.setAllCheck(mySheet.getColByIndex7(0), 1);
}

function fnReverseCheck() {
    var chkCol = mySheet.getColByIndex7(0);
    // [공식] CheckReverse → 직접 루프. ★4번째 인자는 "렌더 억제"이므로 setValue2(4번째=evt)로 바꾸면 안 된다
    mySheet.getDataRows().forEach(function(r) {
        mySheet.setValue(r, chkCol, r[chkCol] ? 0 : 1, 0);
    });
    mySheet.renderBody();
}

// ---------------------------------------------------------------------------
// 크기 / 부가 데이터
// ---------------------------------------------------------------------------
function fnResize() {
    // [브릿지] 숫자 인자에 px 자동 부여. setSheetHeight는 rerender()까지 수행한다
    mySheet.setSheetWidth(1200);
    mySheet.setSheetHeight(mySheet.getSheetHeight() + 100);
}

function fnReadEtc() {
    // [브릿지] GetEtcData → getEtcData (= sheet.etc?.["totalCount"], 널 안전)
    var totalCount = mySheet.getEtcData("totalCount");
    // SetEtcData는 쓰기 브릿지가 없다 → sheet.etc 속성에 직접 대입
    mySheet.etc.pageNo = 1;
    return totalCount;
}

function fnShowOrigBizNo() {
    var selRow = mySheet.getFocusedRow();
    if (!selRow) return "";
    // [공식] 원본값 문맥 → getValue2(FormatFix 컬럼에서 표시문자열 반환)는 오히려 틀리다
    return mySheet.getAttribute(selRow, "bizNo", "Orig") || mySheet.getValue(selRow, "bizNo");
}

// ---------------------------------------------------------------------------
// 이벤트 핸들러 — ASIS 함수명 유지, Events에서 참조로 연결 (fn_parity 통과)
// ---------------------------------------------------------------------------
function mySheet_OnSearchEnd(evtParam) {
    // [브릿지] 조회 응답의 etc 객체 읽기
    document.getElementById("totalAmt").innerHTML = evtParam.sheet.getEtcData("totalAmt");
}

function mySheet_OnAfterEdit(evtParam) {
    var sheet = evtParam.sheet;
    var row   = evtParam.row;
    var col   = evtParam.col;
    if (col == "qty" || col == "price") {
        // [브릿지] 읽기는 getValue2로 통일해도 안전
        var qty   = sheet.getValue2(row, "qty");
        var price = sheet.getValue2(row, "price");
        // [공식] 변경 핸들러 안에서 파생 컬럼 쓰기 → setValue2는 변경 통지가 연쇄될 수 있어 금지
        sheet.setValue(row, "amt", qty * price);
    }
}

function mySheet_OnClick(evtParam) {
    // ColSaveName(col) → 이벤트 안에서는 evtParam.col (열 이름 문자열)
    if (evtParam.col == "custNm") {
        openCustPopup(evtParam.sheet.getValue2(evtParam.row, "bizNo"));
    }
}

function mySheet_OnSelectMenu(evtParam) {
    // setActionMenu 브릿지가 매핑한 Value 기준으로 분기 (메뉴 표시명이 아님)
    if (evtParam.val == "addRow-below") {
        fnAddRow();
    } else if (evtParam.val == "removeRow") {
        fnDelRow();
    }
}

function openCustPopup(bizNo) {
    window.open("<c:url value='/popup/cust.do'/>?bizNo=" + bizNo, "cust", "width=600,height=400");
}

</script>
