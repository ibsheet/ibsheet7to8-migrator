<%@ page contentType="text/html; charset=UTF-8" %>
<%--
  ASIS 샘플 2 - 매출 통계 화면 (IBSheet7)

  1번 샘플(orderList.jsp)이 다루지 않는 "맨 치환하면 안 되는 계열"을 모은 예제다.
    - Merge   : MergeSheet / HeaderMergeMode / PrevColumnMergeMode / ColMerge
    - Drag    : DragMode / DragCell / DragRowSelection
    - Sort    : HeaderSort / UseDefaultSortImage / GroupSort / OnePageSort
    - 레벨이동: DataRowHeight / HeaderRowHeight / SumBackColor / SumFontBold / NoImageUrl
    - 구조이동: Down2Excel_Url / CountFormat / PagingPosition
    - 기타    : AutoRowHeight / TouchScrolling / WheelScrollSize / Reset / CreatePivotTable
--%>
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

            // 머지 - v7은 한 number에 데이터·헤더 병합을 섞어 담았다
            MergeSheet: 7,              // msHeaderOnly + msPrevColumnMerge
            HeaderMergeMode: 1,         // ColMerge 설정에 따라 헤더 머지
            PrevColumnMergeMode: 0,     // 페이지 전체 기준

            // 드래그
            DragMode: 1,                // 일반 드래그 = 행 드래깅
            DragCell: 0,                // 행 단위 드래깅
            DragRowSelection: 1,        // 드래그 대상 단위 = 행

            // 소트
            HeaderSort: 2,              // Sort 아이콘만 표시(실제 정렬 안 함)
            UseDefaultSortImage: 1,
            GroupSort: 0,               // Sort 없이 현재 상태로 그룹핑
            HeaderSortActionMode: 1,

            // 행 높이 / 합계행 스타일 (v7은 Cfg 레벨)
            AutoRowHeight: 1,
            DataRowHeight: 24,
            HeaderRowHeight: 30,
            SumBackColor: "#EEEEEE",
            SumFontBold: 1,
            SumFontColor: "#0000FF",
            FocusSumRow: 0,

            // 스크롤 / 이미지
            TouchScrolling: 2,          // 지연 이동
            WheelScrollSize: 3,
            NoImageUrl: "/images/noimg.png",

            // Export / 카운트·페이징 (v7은 평평한 Cfg 키)
            Down2Excel_Url: "/excel/salesDown.do",
            Down2Pdf_Url: "/pdf/salesDown.do",
            CountFormat: 1,
            CountPosition: 0,
            PagingPosition: 1
        },
        Cols: [
            {Header:"지역",   Type:"Text",  SaveName:"statDTOList.region", Width:100, ColMerge:1},
            {Header:"지점",   Type:"Text",  SaveName:"statDTOList.branch", Width:120, ColMerge:1},
            {Header:"상품",   Type:"Text",  SaveName:"statDTOList.item",   Width:150, ColMerge:0},
            {Header:"수량",   Type:"Int",   SaveName:"statDTOList.qty",    Width:80,  AutoSum:1},
            {Header:"매출액", Type:"Int",   SaveName:"statDTOList.amt",    Width:120, AutoSum:1},
            {Header:"비율",   Type:"Float", SaveName:"statDTOList.ratio",  Width:80,  PointCount:2},
            {Header:"메모",   Type:"Text",  SaveName:"statDTOList.memo",   Width:200, MultiLineText:1}
        ]
    };
    mySheet = IBS_InitSheet(document.getElementById("sheetDIV"), initSheet);
}

// ---------------------------------------------------------------------------
// 조회 / 초기화
// ---------------------------------------------------------------------------
function fnSearch() {
    mySheet.DoSearch("salesStatAjax.do", fnGetSearchParam());
}

function fnResetSheet() {
    // 시트 설정을 초기 상태로 되돌린 뒤 다시 초기화
    mySheet.Reset(1);
    fnInitSheet();
}

// ---------------------------------------------------------------------------
// 피벗
// ---------------------------------------------------------------------------
function fnMakePivot() {
    mySheet.CreatePivotTable({rows:"region", cols:"item", vals:"amt"});
    // 생성된 피벗 시트를 id로 참조한다 (v7 규칙: 원본id + "_Pivot")
    var pivot = document.getElementById("mySheet_Pivot");
    if (pivot) pivot.style.display = "";
}

// ---------------------------------------------------------------------------
// 엑셀 다운로드
// ---------------------------------------------------------------------------
function fnDownExcel() {
    mySheet.Down2Excel();
}

// ---------------------------------------------------------------------------
// 이벤트 핸들러 (IBSheet7 전역 함수 명명 규칙)
// ---------------------------------------------------------------------------
function mySheet_OnClick(row, col, value, cellx, celly, cellw, cellh, rowtype) {
    if (mySheet.ColSaveName(col) == "statDTOList.branch") {
        openBranchPopup(mySheet.GetCellValue(row, "statDTOList.region"));
    }
}

function mySheet_OnButtonClick(row, col) {
    openDetailPopup(mySheet.GetCellValue(row, "statDTOList.item"));
}

function mySheet_OnSaveEnd(code, msg) {
    // 저장 후 데이터가 화면에 반영된 상태를 전제로 다시 읽는다
    var total = mySheet.GetSumValue("statDTOList.amt");
    document.getElementById("statCommonDTO.totalAmt").value = total;
}

function mySheet_OnChange(row, col, value, oldValue) {
    if (mySheet.ColSaveName(col) == "statDTOList.qty") {
        var price = mySheet.GetCellValue(row, "statDTOList.price");
        mySheet.SetCellValue(row, "statDTOList.amt", value * price);
    }
}

</script>
