# SetConfig ***(init method)***

> 시트 초기화시 필요한 속성을 설정합니다.<br>
> `ibsheet.cfg` 에서의 설정보다 `우선 처리` 됩니다. <br>
> 초기화 이후 재설정이 필요한 경우에는 반드시 `Refresh` 인자를 `1(true)`로 설정하여야 설정한 속성들이 적용되며, 이 경우 해당 시트의 데이터는 모두 초기화 되므로 사용시 반드시 `조회 이전에 호출`해야 합니다.


### Syntax
```javascript
ObjId.SetConfig([Cfg], Refresh);
```

### Info
|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|Cfg|`Object`|<span class="required">필수</span>|전달되는 인자의 형식은 `json` 타입으로 설정 하고자 하는 정보를 json 형태로 구성하여 전달합니다. (자세한 사항은 아래 표 참조)|
|Refresh|`Boolean`|<span class="optional">선택</span>|설정 후 갱신 처리 여부 (Default: 0)|

### Enum
  * **Cfg**

|Name|Type|Required|Description|
|----|----|-----|--------------|
|Alternate|`Boolean`|<span class="optional">선택</span>|`DataAlternateBackColor` 사용여부 (Default: 1)|
|AutoCloseDialog|`Boolean`|<span class="optional">선택</span>|콤보목록, 달력팝업, 액션메뉴 팝업의 자동닫기 여부 설정 (Default: 0) <br>자동닫기 설정시 `MouseOut` 시점에 자동으로 닫히게 됩니다.|
|AutoFitColWidth|`String or Array`|<span class="optional">선택</span>|FitColWidth에 대한 적용 시점 설정입니다. 적용하고자 하는 설정값을 구분자 `|` 로 연결하여 설정합니다. (Default : "")<br>- `search` : 조회 및 로드 시점<br>- `resize` : 시트 Resize 시점<br>- `init` : 초기화 및 RemoveAll 호출시점<br>- `colhidden` : 컬럼 숨김/보임 시점|
|AutoSumCalcMode|`Number`|<span class="optional">선택</span>|별합된 셀에 대한 합계 계산 처리 방법 설정 (`0` : 모든 셀에 대한 합계 계산 (Default), `1` : 병합된 셀의 부속셀은 제외하고 계산)|
|CachePageCount|`Number`|<span class="optional">선택</span>|페이지 캐싱 개수|
|ChildGrid|`Object`|<span class="optional">선택</span>|트리구조에서 하위 그리드생성시 사용할 초기화 정보|
|ChildPage|`Number`|<span class="optional">선택</span>|트리구조에서 자식행의 페이지 단위 개수 (Default: 0)|
|ClearFilterOff|`Boolean`|<span class="optional">선택</span>|필터행 셀에 값이 있고 사용안함으로 변경했을 때, 필터행의 셀값 삭제 유무|
|ClearRowBackColorUID|`Boolean`|<span class="optional">선택</span>|상태값에 따라 행 색상이 변경되었을 때, 저장함수 호출 이후 행 배경색 상태|
|ClickHeaderMapping|`Boolean`|<span class="optional">선택</span>|셀 클릭시 매핑되는 헤더를 표시할지 여부 (0: 표시하지 않음(Default), 1: 표시)|
|ClickHeaderMappingColor|`String`|<span class="optional">선택</span>|셀 클릭시 매핑되는 헤더 표시 색상 (Default: “#eef0de”)|
|ColPage|`Number`|<span class="optional">선택</span>|한번에 표시할 컬럼의 개수 (Default: 사용안함)|
|CountFormat|`Number`|<span class="optional">선택</span>|건수 정보의 출력 포맷 (세부 사항은  [SetCountFormat](/docs/funcs/core/SetCountFormat) 메서드 참조)|
|CountPosition|`Number`|<span class="optional">선택</span>|건수 정보 출력 위치 (`0` : 사용안함 (Default), `1` : 좌측 상단, `2` : 우측 상단, `3` : 좌측 하단, `4` : 우측 하단)|
|ComboMaxHeight|`Number`|<span class="optional">선택</span>|콤보리스트 최대 높이 설정|
|Convert2ByteChar|`Number`|<span class="optional">선택</span>|전각문자 입력시 반각으로 치환하는 기능 설정|
|CopyEdit|`Boolean`|<span class="optional">선택</span>|값 복사 할때 포맷을 포함할지 여부 설정|
|CookieInfoSave|`Boolean`|<span class="optional">선택</span>|컬럼의 위치, 컬럼너비, 컬럼 정렬 등에 대한 정보를 쿠키에 저장하는 기능|
|CurrentColInfo|`String`|<span class="optional">선택</span>|설정하고자 하는 컬럼 정보 문자열|
|DataRowHeight|`Number`|<span class="optional">선택</span>|데이터 행의 기본 행 높이 (단위:px)|
|DataRowMerge|`Boolean`|<span class="optional">선택</span>|전체행의 가로머지 허용여부 (0: 머지 허용하지 않음 (Default), 1: 머지 허용 함)|
|DeferredHScroll|`Boolean`|<span class="optional">선택</span>|가로 스크롤에 대한 지연 처리 모드 사용 여부 (`0` :	사용 안함 (Default), `1` :	사용 함)|
|DeferredVScroll|`Boolean`|<span class="optional">선택</span>|세로 스크롤에 대한 지연 처리 모드 사용 여부 (`0` :	사용 안함 (Default), `1` :	사용 함)|
|DragCell|`Boolean`|<span class="optional">선택</span>|드래그시 셀 단위 드래그 여부 설정 (0:	행 단위 드래깅 (Default), 1: 셀 단위 드래깅)|
|DragMode|`Number`|<span class="optional">선택</span>|드래그 처리 방법<br>* `-1` :	드래그 사용 안함<br>* `0` : 일반(셀 또는 행 범위 셀렉션), Ctrl 키 이용: 행 드래깅 (Default)<br>* `1` : 일반(행 드래깅), Ctrl 키 이용(셀 또는 행 범위 셀렉션)|
|DragRowSection|`Boolean`|<span class="optional">선택</span>|드래그 대상 단위 설정 (`0` : 셀 단위 (Default), `1` :	행 단위)|
|EditArrowBehavior|`Number`|<span class="optional">선택</span>|편집모드 상태에서 방향 키 입력에 대한 동작 방법<br>- `0` :	좌,우,상,하 모두 셀 이동 하지 않음<br>- `1` : 상,하만 셀 이동 처리 (Default)<br>- `2` :	좌,우만 셀 이동 처리<br>- `3` : 좌,우,상,하 |모두 셀 이동 처리|
|EditEnterBehavior|`String`|<span class="optional">선택</span>|편집모드 상태에서 Enter 키 입력에 대한 동작 방법<br>- `tab` : 편집 완료 후 오른쪽 셀로 포커스 이동 (Default)<br>- `down` : 편집 완료 후 아래 셀로 포커스 이동<br>- `newline` : 줄바꿈되어 개행 처리 됨<br>- `none` : 편집 완료 후 포커스 유지<br>- `editTab` : 편집 완료 후 다음 편집 가능한 셀로 이동|
|EditTabInsert|`Boolean`|<span class="optional">선택</span>|MultiLineText 셀에 Tab키 입력 활성화 여부 (`0` : 사용 안함 (Default), `1` : 사용함)|
|EnhancedFloatSum|`Number`|<span class="optional">선택</span>|AutoSum 타입에서의 부동 소수점 보정 사용여부 (`0` : 사용 안함 (Default), `1` : 사용함)|
|ExportMode|`Number`|<span class="optional">선택</span>|엑셀 다운로드시 서버모듈, 클라이언트모듈 설정 클라이언트 모듈의 경우 `ibexcel.js` 파일 필요<br>- `1` : 서버모듈 (Default)<br>- `2` : 클라이언트모듈(`IE10 이상부터 지원`)<br>- `3` : 클라이언트모듈 -> 서버모듈 (ibexcel.js가 없으면 서버모듈로 동작)|
|FastRender|`Boolean`|<span class="optional">선택</span>|전체 헤더 체크 할 경우 reRender 시 빠른 조회 사용 여부 (단, 화면 깜빡임이 일어남 , Default : 1)|
|FilterDateType|`Boolean`|<span class="optional">선택</span>|날짜 형식 필터에 달력팝업 사용여부 설정 (`0` : 달력팝업 사용안함 (Default), `1` : 달력팝업 사용)|
|FilterOperator|`String`|<span class="optional">선택</span>|필터링시 컬럼간 연산자 설정 (`and` : 논리 곱 연산 (Default), `or` :	논리 합 연산)|
|FilterRow|`Boolean`|<span class="optional">선택</span>|필터행 사용 여부 (`0` : 사용 안함 (Default), `1` : 사용함)|
|FitSizeColHeaderMode|`Boolean`|<span class="optional">선택</span>|컬럼에 대한 FitSize 처리시 컬럼간 셀병합이 되어있는 헤더를 포함하여 처리할지 여부 설정 (`0` : 포함하여 처리 (Default), `1` : 제외하고 처리)|
|FitSizeColMode|`Boolean`|<span class="optional">선택</span>|헤더의 컬럼 사이를 더블클릭시 처리되는 FitSize 처리 모드 설정 (`0` : 화면에 보여지는 행 범위 내에서 처리 (Default), `1` :	전체 행 범위에서 처리)|
|FocusSumRow|`Boolean`|<span class="optional">선택</span>|합계행의 셀에 대한 Focus 허용 여부 설정 (`0` :	포커스 허용 안함 (Default), `1` : 포커스 허용)|
|FrozenCol|`Number`|<span class="optional">선택</span>|좌측 고정컬럼의 수 (Default: 0)|
|FrozenColRight|`Number`|<span class="optional">선택</span>|우측 고정컬럼의 수 (Default: 0)|
|GroupRow|`Boolean`|<span class="optional">선택</span>|그룹행 사용 여부 (`0` : 그룹행 사용 안함 (Default), `1` : 그룹행 사용함)|
|GroupSort|`Boolean`|<span class="optional">선택</span>|그룹핑시 기준컬럼에 대한 Sort 처리여부 설정 (`0` :	Sort 처리 없이 현재 상태로 그룹핑, `1` : Sort 처리 후 그룹핑 (Default))|
|HeaderCheckMode|`Boolean`|<span class="optional">선택</span>|전체체크 선택시 필터링된 행만 체크합니다 (`0` :	모든행에 대한 처리 (Default), `1` : 필터링된 행에 대한 처리)|
|HeaderCheckSync|`Boolean`|<span class="optional">선택</span>|헤더의 전체체크박스에 대한 자동 설정/해제 기능 (0: 사용 안함 (Default), 1: 사용함)|
|HeaderMergeMode|`Boolean`|<span class="optional">선택</span>|헤더의 머지 방식 서정 (0:	ColMerge 속성 설정값에 상관없이 머지 처리(Default), 1: ColMerge 속성에 따라 머지 처리)|
|HeaderRowHeight|`number`|<span class="optional">선택</span>|헤더 행의 높이 (단위:px)|
|ibEditTitle|`String`|<span class="optional">선택</span>|셀의 타이틀 값 설정 (default: ”ibEdit”)|
|ImageStatus|`Boolean`|<span class="optional">선택</span>|상태값을 이미지로 표시할지 여부여부 (0: 입력, 수정, 삭제 Text로 표시 (Default), 1: 입력, 수정, 삭제 이미지로 표시)|
|InvalidInputBehavior|`Number`|<span class="optional">선택</span>|편집 완료시점에 입력값이 invalid 인 경우에 대한 처리 방법 설정<br>* `0` : alert 메시지 후 해당 셀 편집상태 유지 (Default)<br>* `1` : alert 메시지 후 해당 셀 편집종료(입력값 취소 처리)<br>* `2` :	alert 메시지 후 해당 셀 편집상태 유지 (입력값 취소 처리)|
|InvalidInputCallBack|`function`|<span class="optional">선택</span>|편집 완료시점에 입력값이 invalid 인 경우에 콜백설정|
|JustCheck|`Boolean`|<span class="optional">선택</span>|체크박스 타입에서 셀 클릭이 아닌 체크박스 클릭에 대해서만 선택/취소가 가능하도록 설정 (0: 셀 클릭시 체크 (Default), 1: 체크박스 클릭시 체크)|
|JustCheckSize|`Number`|<span class="optional">선택</span>|JustCheck가 true인 경우 셀 내에서 체크 박스로 간주될 크기 설정|
|KeyFieldPosition|`String`|<span class="optional">선택</span>|필수 입력 표시 위치 설정 (Left:	왼쪽에 표기 (Default), Right: 오른쪽에 표기)|
|MaxSort|`Number`|<span class="optional">선택</span>|헤더클릭을 이용한 연계 소팅 최대 개수를 설정 (Default: 3)|
|MergeSheet|`Number`|<span class="optional">선택</span>|머지 종류 (Default: 0) [SetMergeSheet](/docs/funcs/merge/SetMergeSheet) Method 참고|
|MouseHoverMode|`Number`|<span class="optional">선택</span>|시트내의 행 또는 셀에 MouseOver에 대한 Hover 방식을 설정 (0: 사용 안함 (Default), 1: 셀단위 Hover, 2: 행단위 Hover)|
|NewRowDeleteMode|`Boolean`|<span class="optional">선택</span>|“입력” 상태인 행의 삭제 컬럼 체크시 confirm 메시지 사용 여부 설정 (0: 사용 안함 (Default), 1: 사용함)|
|NextPageCall|`Number`|<span class="optional">선택</span>|다음 페이지 호출 시점 백분율|
|NoFocusMode|`Boolean`|<span class="optional">선택</span>|포커스 행 표시 사용여부 설정 (0: 포커스 행 표시함(Default), 1: 포커스 행 표시하지 않음)|
|NullLastOnAscOrder|`Number`|<span class="optional">선택</span>|오름차순 기준으로 소트시 공백 문자의 위치 설정. 내림차순의 경우 반대로 정렬됩니다 (0: 맨 앞에 정렬 (Default), 1: 맨 뒤에 정렬)|
|Page|`Number`|<span class="optional">선택</span>|한번에 표시할 행의 개수 (Default: 20)|
|PagingPosition|`Number`|<span class="optional">선택</span>|페이지 내비게이션이 출력 되는 위치 설정 (0: 사용 안함 (Default), 1: 좌측, 2: 우측)|
|PopupCheckEditMode|`Boolean`|<span class="optional">선택</span>|컬럽팝업 메뉴를 통한 값 설정시 편집가능여부에 따른 처리 여부 (0: 편집가능여부와 무관하게 처리, 1: 편집가능한 경우에만 처리 (Default))|
|PrevColumnMergeMode|`Number`|<span class="optional">선택</span>|LazyLoad 방식인 경우 앞컬럼 머지 방식 설정 (0: 페이지 전체, 1: 페이지내 (Default))|
|ScrollOverSheet|`Number`|<span class="optional">선택</span>|시트 내의 마우스 휠을 이용한 스크롤 이벤트를 부모 element로 전달 여부 (Default: 0)|
|SelectionRowsMode|`Boolean`|<span class="optional">선택</span>|GetSelectionRows 시 포커스행 포함 여부 (Default: 0)|
|SelectionSummary|`String`|<span class="optional">선택</span>|선택영역 요약 정보 표시 설정|
|SearchMode|`Number`|<span class="optional">선택</span>|조회 방식 설정<br>- `0` : **smGeneral** – 일반 조회 모드<br>- `1` : **smClientPaging** – 페이징 모드<br>- `2` : **smLazyLoad** – Lazy Load 모드 (Default)<br>- `3` : **smServerPaging** – 실시간 서버 처리 모드 (스크롤링 방식)<br>- `4` : **smServerPaging2** – 실시간 서버 처리 모드 (페이지 인덱스 방식)|
|SearchXMLbyColOrder|`Boolean`|<span class="optional">선택</span>|XML 로딩시 데이터 로드하는 순서를 결정 (`0` : 컬럼 생성시의 순서대로 로드 (Default), `1` : 현재 보이는 컬럼의 위치를 기준으로 로드)|
|SeqColMerge|`Boolean`|<span class="optional">선택</span>|데이터 행 머지에 Seq 컬럼을 같이 머지할지 여부 (`0` : Seq컬럼 머지 안함 (Default), `1` : Seq 컬럼 머지 사용)|
|SizeMode|`Number`|<span class="optional">선택</span>|사이즈 방식 설정<br>- `0` : 설정된 높이값으로 처리 (Default)<br>- `1` : 스크롤 없이 높이 자동 설정<br>- `2` : 스크롤 없이 너비 자동 설정<br>- `3` : 스크롤 없이 높이/너비 자동 설정<br>- `4` : 설정한 높이 이전까지 스크롤 없이 높이 자동 설정|
|SmartResize|`Boolean`|<span class="optional">선택</span>|OnResize를 OnSmartResize 동작처럼 변환<br>이 값을 `1`로 설정하면 OnSmartResize이벤트는 발생하지 않고 OnResize이벤트가 OnSmartResize 이벤트 처럼 0.3초단위로 동작합니다.<br>`0` : 사용 안함 (Default), `1` : 사용함|
|SortEventMode|`Boolean`|<span class="optional">선택</span>|OnSort 이벤트 발생시 정렬된 모든 컬럼의 정보를 반환 할지 여부 (`0` : 마지막 정렬 컬럼만 반환 (Default), `1` : 정렬된 모든 컬럼 반환)|
|SPage|`Number`|<span class="optional">선택</span>|서버 요청 페이지 단위 행의 개수|
|SumPosition|`Boolean`|<span class="optional">선택</span>|합계행 위치 (`0` : 상단 고정, `1` : 하단 고정(Default))|
|TabStop|`Boolean`|<span class="optional">선택</span>|시트가 포함된 페이지에서 Tab키 에 의한 Tab 이동시 시트를 포함할지 여부 (`0` : Tab키를 사용하여 시트로 이동 불가능, `1` : Tab키 사용하여 시트로 이동 가능 (Default))|
|TableCaption|`String`|<span class="optional">선택</span>|datatable caption 태그 설정 값|
|TableSummary|`String`|<span class="optional">선택</span>|datatable summary 태그 설정 값|
|ToolTip|`Boolean`|<span class="optional">선택</span>|셀의 풍선도움말을 표시합니다 (`0` : 풍선 도움말 미표시 (Default), `1` : 풍선도움말 표시)|
|ToolTipText|`String`|<span class="optional">선택</span>|헤더 영역에서의 툴팁에 표시할 문자열|
|TouchScrolling|`Number`|<span class="optional">선택</span>|터치스크롤 방식 설정 (`0` : 사용안함 (Default), `1` : 일반 사용, `2` : 지연 이동)|
|TreeDragIconMode|`Number`|<span class="optional">선택</span>|트리구조에서 드래그시 드래그 위치 아이콘 표시 모드 (`0` : 이동이 가능한 위치에맞게아이콘 표시 (Default), `1` : 이동이 가능한 위치와 상관없이 아이콘 표시)|
|TreeNodeIcon|`Boolean`|<span class="optional">선택</span>|트리 노드 아이콘 사용 여부 (`0` : 아이콘 사용하지 않음 (Default), `1` : 아이콘 사용)|
|TreeNodeToggleMode|`Number`|<span class="optional">선택</span>|마우스 입력을 통한 Tree 노드 토글시 처리 방법 (`0` : 토글 후 해당 셀에 포커스이동 처리 방법 (Default), `1` : 셀의 포커스 이동 없이 토글 처리 방법)|
|UpdateMergeCells|`Boolean`|<span class="optional">선택</span>|머지된 데이터를 수정시 전체 머지 영역의 데이터 수정 여부 (`0` : 사용 안함 (Default), `1` : 사용함)|
|UseChildGrid|`Boolean`|<span class="optional">선택</span>|트리구조 사용시 ChildGrid 사용여부 (`0` : 사용 안함 (Default), `1` : 사용함)|
|UseDefaultSortImage|`Boolean`|<span class="optional">선택</span>|소트 기능 헤더에 기본 소트 이미지 표시 여부 (`0` : 사용 안함 (Default), `1` : 사용함)|
|UseEditMask|`Boolean`|<span class="optional">선택</span>|편집시 사용자포맷, 날짜에 대한 IBMaskEdit 사용 여부 (`0` : 사용 안함 (Default), `1` : 사용함)|
|UseFindDialog|`Boolean`|<span class="optional">선택</span>|찾기 팝업 다이얼로그 사용 여부 (`0` : 사용 안함, `1` : 사용함 (Default))|
|UseGroupActionMenu|`Boolean`|<span class="optional">선택</span>|그룹행에서 컨텍스트 메뉴 사용 여부 설정 ([SetGroupActionMenu](/docs/funcs/group/SetGroupActionMenu) 참조)<br>`0` : 사용 안함 (Default), `1` : 사용함|
|UseHeaderActionMenu|`Boolean`|<span class="optional">선택</span>|헤더 컨텍스트 메뉴 사용 여부 설정<br>헤더메뉴를 사용함으로 설정하고 헤더메뉴를 설정하지 않는경우 자동으로 기본 메뉴가 출력됩니다. ([SetHeaderActionMenu](/docs/funcs/core/SetHeaderActionMenu) 참조)<br>`0` : 사용 안함 (Default), `1` : 사용함|
|UseHeaderSortCancel|`Boolean`|<span class="optional">선택</span>|헤더 클릭을 통한 컬럼 Sort 처리시 취소 모드 사용 여부<br>- `0` : 사용 안함 (Default) - 헤더 클릭시 Asc / Desc 순으로 처리<br>- `1` : 사용함 - 헤더 클릭시 Asc / Desc / 취소 순으로 처리|
|UseHiddenFilter|`Boolean`|<span class="optional">선택</span>|필터 행 없이 필터링 사용 여부 설정 ([SetFilterValue](/docs/funcs/filter/SetFilterValue) 참조)<br>`0` : 사용 안함 (Default), `1` : 사용함 (필터행이 보이지 않아도 `SetFilterValue`를 사용 할 수 있게 설정)|
|UseJsonTreeLevel|`Boolean`|<span class="optional">선택</span>|Json 형식의 데이터 구조에서 트리형식 구성시 Level 속성을 이용하여 구성할지 여부 설정 (`0` : Level 속성 사용 안함 (Default), `1` :	Level 속성 사용)
|UseNoDataRow|`Number`|<span class="optional">선택</span>|조회된 데이터가 없는 경우, `조회된 데이터가 없습니다` 문구 표시 여부 설정 (`0` : 사용안함, `1` : 사용 (Default))
|UsePivotDialog|`Boolean`|<span class="optional">선택</span>|피벗 설정 팝업 다이얼로그 사용 여부 (`0` : 사용안함, `1` : 사용 (Default))
|VscrollMode|`Number`|<span class="optional">선택</span>|세로스크롤바 표시 설정 (`0` : Auto (Default), `1` :	고정)
|OnePageFilter|`Number`|<span class="optional">선택</span>|smServerPaging2 (SearchMode = 4) 조회 모드를 사용할 때 현재 페이지 내에서 Filter 기능을 사용할지 여부를 설정합니다.

### Returns
***none***

### Example
```javascript
// Page 50의 LazyLoad 방식 + 헤더 머지 설정
mySheet.SetConfig({
  "SearchMode": 2,
  "Page": 50,
  "MergeSheet": 5
});
```


### Since

|version|desc|
|---|---|
|7.0.0.0||
|7.0.4.2|TabStop 속성 추가|
|7.0.8.0|AutoFitColWidth, MouseHoverMode 속성 추가|
|7.0.11.0|PopupCheckEditMode 속성 추가|
|7.0.12.2|Refresh 인자 추가|
|7.0.13.5|FitSizeColHeaderMode, FilterOperator 속성 추가|
|7.0.13.6|UseHeaderActionMode 의 오름차순 정렬, 내림차순 정렬 기본 메뉴 추가|
|7.0.13.10|InvalidInputBehavior 속성 추가|
|7.0.13.11|DeferredHScroll, DeferredVScroll 속성 추가|
|7.0.13.14|CachePageCount 속성 추가|
|7.0.13.17|ImageStatus 속성 추가|
|7.0.13.22|AutoSumCalcMode 속성 추가|
|7.0.13.26|GroupSort 속성 추가|
|7.0.13.30|CurrentColInfo 속성 추가|
|7.0.13.33|UseEditMask 속성 추가|
|7.0.13.34|UseFindDialog, UsePivotDialog 속성 추가|
|7.0.13.48|UseHeaderSortCancel 속성 추가|
|7.0.13.51|FocusSumRow 속성 추가|
|7.0.13.52|TreeNodeToggleMode 속성 추가|
|7.0.13.54|InvalidInputCallBack 속성 추가|
|7.0.13.56|TreeNodeIcon 속성 추가|
|7.0.13.59|Spage 속성 추가|
|7.0.13.61|TableCaption, TableSummary 속성 추가|
|7.0.13.63|ExportMode 속성 추가|
|7.0.13.77|Alternate 속성 추가|
|7.0.13.107|NullLastOnAscOrder 속성 추가|
|7.0.13.108|Convert2ByteChar, ScrollOverSheet 속성 추가|
|7.0.13.109|EnhancedFloatSum 속성 추가|
|7.0.13.110|EditTabInsert, UpdateMergeCells 속성 추가|
|7.0.13.111|HeadercheckSync 속성 추가|
|7.0.13.112|JustCheck, JustCheckSize 속성 추가|
|7.0.13.147|FastRender 속성 추가|
|7.0.13.160|CopyEdit 속성 추가|
|7.0.13.219|OnePageFilter 속성 추가|

