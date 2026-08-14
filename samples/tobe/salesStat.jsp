<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%--
  샘플 TOBE 2 - ../asis/salesStat.jsp 의 IBSheet8 변환 결과

  이 샘플은 "이름만 바꾸면 에러 없이 동작만 달라지는" 계열의 참조 구현이다.
  각 자리에 [동일유지] / [값반전] / [값분기] / [레벨이동] / [구조이동] 주석을 달았다.
  근거는 docs/property-mapping.md 의 Merge · Drag/Select · Sort 계열 절.
--%>
<div id="sheetArea"></div>
<div>총 매출: <span id="totalAmt">0</span></div>

<script type="text/javascript" src="<c:url value='/js/ibsheet/ibsheet.js'/>"></script>
<%-- down2Excel 은 본체가 아니라 이 플러그인 소속이다(+서버 모듈 설치 필요).
     빠뜨리면 검증 3종은 PASS인데 브라우저에서 'down2Excel is not a function' 으로 죽는다. --%>
<script type="text/javascript" src="<c:url value='/js/ibsheet/plugins/ibsheet-excel.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/ibsheet/ibsheet-migration.js'/>"></script>
<script type="text/javascript">

var mySheet;

// ---------------------------------------------------------------------------
// 초기화
// ---------------------------------------------------------------------------
function fnInitSheet() {
    var OPT = {
        Cfg: {
            // SearchMode:2 → 0 : FastLoad 상향(의도된 규칙).
            // 이 시트는 Lines 타입(메모)을 쓰므로 행 높이가 가변이다 →
            // AutoRowHeight 를 함께 켜야 스크롤·렌더링이 정확하다(SearchMode 0·3 에서만 지원).
            SearchMode: 0,
            Page: 50,

            // ── Merge : v7 MergeSheet 한 number → v8 영역별 속성으로 분리 ──
            // [값분기] MergeSheet:7 = msHeaderOnly(5) + msPrevColumnMerge(2)
            // MergeSheet 의 msHeaderOnly 와 HeaderMergeMode 가 요구하는 "헤더 병합 켜기"가
            // 둘 다 HeaderMerge 로 모인다 → 값을 하나로 합쳐 지정한다(중복 지정 주의)
            HeaderMerge: 3,            //   헤더 병합 ON (★>0 필수. 열 우선)
            DataMerge: 0,              //   데이터 영역은 병합하지 않음
            PrevColumnMerge: 2,        //   msPrevColumnMerge + 헤더 대상 → 헤더 영역만
            // [값반전] HeaderMergeMode:1(ColMerge 따름) → IgnoreHeaderColMerge:0
            //   ★이 속성은 HeaderMerge > 0 일 때만 적용된다. HeaderMergeMode 를 HeaderMerge 로
            //     옮기면(예: 0→0) '헤더 병합 안함'이 되어 병합이 사라지고 이 설정도 무시된다.
            IgnoreHeaderColMerge: 0,
            // [동일유지] PrevColumnMergeMode - v8 에도 동명 존재. PrevColumnMerge 로 바꾸면 기능이 꺼진다.
            //            v7 default=1, v8 default=0 이므로 v7 에서 0 이었으니 그대로 0.
            PrevColumnMergeMode: 0,

            // ── Drag ──
            // [값분기] DragMode:1(행 드래깅) → CanDrag:true. v7 number(-1/0/1) → v8 boolean
            CanDrag: true,
            // [동일유지] DragCell:0(행 단위) → v8 DragCell:0. 값 정의까지 같다.
            // [값반전] DragRowSelection:1(행) → DragCell:0(행) — 두 v7 속성이 같은 결론이므로 하나로 합쳤다.
            DragCell: 0,

            // ── Sort ──
            // [값분기] HeaderSort:2(아이콘만 표시, 실제 정렬 안 함) → HeaderSortMode:2
            //          ★SortIcons 가 아니다. SortIcons 는 아이콘 표시/클릭 위치 축이다.
            CanSort: 1,                //   HeaderSort 0/1 축 = CanSort (1은 v8 기본값이라 생략 가능)
            HeaderSortMode: 2,
            // UseDefaultSortImage:1 → SortIcons:1 (아이콘 표시)
            SortIcons: 1,
            // [동일유지] GroupSort - v8 에도 동명·동값 존재. 치환하지 않는다.
            //            (GroupSortMain 은 오름/내림(1|2)이라 0 은 유효값도 아니다)
            GroupSort: 0,
            HeaderSortActionMode: 1,   // 동일

            // ── 행 높이 ──
            // [동일유지] AutoRowHeight - Wrap 이 아니다. ★default 반대(v7 1 / v8 0)라 명시 필수
            AutoRowHeight: true,

            // ── 스크롤 ──
            // [동일유지] TouchScrolling - TouchScroll(스크롤바 모양 0~4)이 아니다.
            //   ★v7 2(지연 이동)는 v8 boolean 에 대응이 없어 1(동작)로 흡수했다. 지연 동작은 미지원.
            TouchScrolling: 1,
            WheelScrollCount: 3,       // WheelScrollSize → WheelScrollCount (이전 표기 WhellScrollCount 는 오타)

            // ── [구조이동] 평평한 Cfg 키 → 객체 안으로 ──
            // Down2Excel_Url / Down2Pdf_Url → Cfg.Export.*  (키만 바꾸면 v8 이 무시한다)
            Export: {
                Down2ExcelUrl: "/excel/salesDown.do",
                Down2PdfUrl:   "/pdf/salesDown.do"
            },
            // CountFormat + CountPosition + PagingPosition → Cfg.InfoRowConfig 통합
            InfoRowConfig: {
                Layout: ["Count", "Paging"],   // 상단 Count, 하단 Paging
                Space: "Top"
            }

            // NoImageUrl 은 옮기지 않았다 - v8 DefaultImage 는 Col 속성이고 Type:"Img" 컬럼에만
            // 적용된다. 이 시트에는 Img 컬럼이 없어 대상이 없다. (Cfg 에 두면 v8 이 무시한다)
        },
        // [레벨이동] DataRowHeight / HeaderRowHeight 는 v8 에서 Cfg 가 아니라 행 속성이다.
        //            Def 로 각 영역의 기본값을 준다.
        Def: {
            Row:    { Height: 24 },    // DataRowHeight:24
            Header: { Height: 30 }     // HeaderRowHeight:30
        },
        Cols: [
            // SaveName → Name + statDTOList. 접두사 strip (config stripPrefixes)
            // [동일유지] ColMerge - v8 에도 동명 col 속성이 있다. Span(cell colspan)이 아니다.
            {Header:"지역",   Type:"Text",  Name:"region", Width:100, ColMerge:1},
            {Header:"지점",   Type:"Text",  Name:"branch", Width:120, ColMerge:1},
            {Header:"상품",   Type:"Text",  Name:"item",   Width:150, ColMerge:0},
            // AutoSum:1 → FormulaRow:"Sum" (Foot 영역에 합계행 생성, id 는 "FormulaRow")
            {Header:"수량",   Type:"Int",   Name:"qty",    Width:80,  FormulaRow:"Sum"},
            {Header:"매출액", Type:"Int",   Name:"amt",    Width:120, FormulaRow:"Sum"},
            // PointCount:2 → Format 패턴으로 자리수 지정
            {Header:"비율",   Type:"Float", Name:"ratio",  Width:80,  Format:"#,##0.00"},
            // MultiLineText:1 → Type:"Lines" (여러 줄 입력)
            {Header:"메모",   Type:"Lines", Name:"memo",   Width:200},
            // 단가는 계산에만 쓰므로 화면에서 감춘다
            {Header:"단가",   Type:"Int",   Name:"price",  Width:80,  Visible:0}
        ],
        // IBSheet7 전역 함수 명명 규칙 → Events. 함수명은 유지하고 참조만 연결한다(fn_parity).
        Events: {
            // OnClick → onAfterClick (★onClick 아님 - v8 onClick 은 발생 시점이 더 앞선다)
            // OnButtonClick 도 v8 에 전용 이벤트가 없어 같은 이벤트로 들어온다 → 핸들러에서 분기
            onAfterClick:  mySheet_OnClick,
            onAfterSave:   mySheet_OnSaveEnd,
            onAfterChange: mySheet_OnChange
        }
    };
    mySheet = IBSheet.create({id: "mySheet", el: "sheetArea", options: OPT, height: 400});

    // [레벨이동] SumBackColor / SumFontBold / SumFontColor / FocusSumRow 는 v8 에서 합계행의
    // 행 속성이다. FormulaRow 로 생성된 행을 id 로 잡아 설정한다.
    var sumRow = mySheet.getRowById("FormulaRow");
    if (sumRow) {
        mySheet.setAttribute(sumRow, null, "Color",     "#EEEEEE");  // SumBackColor
        mySheet.setAttribute(sumRow, null, "TextStyle", 1);          // SumFontBold:1 → TextStyle 1(Bold)
        mySheet.setAttribute(sumRow, null, "TextColor", "#0000FF");  // SumFontColor
        mySheet.setAttribute(sumRow, null, "CanFocus",  0);          // FocusSumRow:0
    }
}

// ---------------------------------------------------------------------------
// 조회 / 초기화
// ---------------------------------------------------------------------------
function fnSearch() {
    mySheet.doSearch({url: "salesStatAjax.do", data: fnGetSearchParam()});
}

function fnResetSheet() {
    // Reset(KeepTheme) → dispose() + 같은 id 로 재생성 (★2단계 변환)
    // v7 Reset 은 새 시트 객체를 반환해 계속 쓸 수 있었지만, v8 dispose 는 DOM·메모리에서
    // 완전히 제거하므로 재생성 없이 두면 이후 호출이 죽은 객체를 참조한다.
    // KeepTheme 인자는 v8 에 대응이 없다 - 테마는 재생성 시 옵션으로 다시 지정한다.
    mySheet.dispose();
    fnInitSheet();
}

// ---------------------------------------------------------------------------
// 피벗
// ---------------------------------------------------------------------------
function fnMakePivot() {
    mySheet.makePivotTable({rows: "region", cols: "item", vals: "amt"});
    // ★피벗 시트 id 규칙이 바뀐다: v7 "원본id_Pivot" → v8 "pivotSheet_" + 원본id
    var pivot = document.getElementById("pivotSheet_mySheet");
    if (pivot) pivot.style.display = "";
}

// ---------------------------------------------------------------------------
// 엑셀 다운로드
// ---------------------------------------------------------------------------
function fnDownExcel() {
    // ★plugins/ibsheet-excel.js 로드 + 서버 모듈 설치가 필요하다(상단 script 참고).
    //   본체에 없는 함수라 빠뜨리면 'down2Excel is not a function' 으로 죽는다.
    mySheet.down2Excel();
}

// ---------------------------------------------------------------------------
// 이벤트 핸들러 - ASIS 함수명 유지
// ---------------------------------------------------------------------------
function mySheet_OnClick(evtParam) {
    var sheet = evtParam.sheet;
    // ★v8 에는 Button 전용 클릭 이벤트가 없어 모든 컬럼에서 발생한다 → 컬럼 가드 필수
    if (evtParam.col === "item") {
        mySheet_OnButtonClick(evtParam);
        return;
    }
    if (evtParam.col === "branch") {
        // [브릿지] GetCellValue → getValue2
        openBranchPopup(sheet.getValue2(evtParam.row, "region"));
    }
}

function mySheet_OnButtonClick(evtParam) {
    // ASIS 의 OnButtonClick 본문. onAfterClick 에서 컬럼으로 분기해 호출한다.
    openDetailPopup(evtParam.sheet.getValue2(evtParam.row, "item"));
}

function mySheet_OnSaveEnd(evtParam) {
    // ★발생 시점 차이: v7 OnSaveEnd 는 저장 결과가 화면에 반영·렌더링된 뒤였으나
    //   v8 onAfterSave 는 서버 응답 직후다. "반영됐다"는 전제로 행을 다시 읽으면 안 된다.
    //   합계는 서버 응답값이나 저장 전 계산값을 쓰고, 화면 반영 후 처리가 필요하면
    //   applySaveResult() 이후로 미룬다.
    var sheet = evtParam.sheet;
    // [공식] 합계행은 데이터 셀이 아니므로 getValue2(표시문자열/이벤트) 대신 공식 getValue
    var sumRow = sheet.getRowById("FormulaRow");
    var total = sumRow ? sheet.getValue(sumRow, "amt") : 0;
    document.getElementById("totalAmt").innerText = total;
}

function mySheet_OnChange(evtParam) {
    var sheet = evtParam.sheet;
    if (evtParam.col === "qty") {
        // [브릿지] 읽기는 getValue2 로 통일해도 안전
        var price = sheet.getValue2(evtParam.row, "price");
        // [공식] ★값 변경 핸들러 안에서 파생 컬럼 쓰기는 setValue2 금지
        //        (setValue2 가 onAfterChange 를 강제 발생시켜 변경 통지가 연쇄된다)
        sheet.setValue(evtParam.row, "amt", evtParam.val * price);
    }
}

</script>
