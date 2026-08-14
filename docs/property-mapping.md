# IBSheet7 → IBSheet8 속성(Property) 변환 대조표

> **근거: `docs/ibsheet7-manual/` (808파일) · `docs/ibsheet8-manual/` (1,027파일) 벤더 매뉴얼 전문.**
> 이 표는 예전에 요약 대조표를 옮겨 적어 만들어졌는데 오류가 다수 있었고, 매뉴얼로 전수 재대조했다 —
> 특히 `Drag`·`Merge`·`Sort` 계열은 "이름 변경 ✅"으로 적혀 있었지만 실제로는
> 값 분기·값 반전·레벨 이동이 필요했다.
> 범례: ✅ 지원 | ⚠️ 일부지원 | ❌ 미지원 | 🚫 불필요
>
> **⚠️ 는 "맨 치환하면 안 된다"는 뜻이다.** 비고를 반드시 읽고 값·레벨까지 함께 옮긴다.

---

## 전역 설정(Cfg) 속성

IBSheet7과 IBSheet8 모두 `Cfg` (PascalCase) 키를 사용한다.  
단, 일부 속성은 이름이 바뀌거나 구조가 변경됨.

```js
// IBSheet7
var OPT = {
  Cfg: {
    SearchMode: 2,
    MergeSheet: 1,
    // ...
  }
};

// IBSheet8 — Cfg 키는 동일, 일부는 이름 변경·값 분기·구조 이동
var OPT = {
  Cfg: {
    SearchMode: 0,      // 2 → 0 : FastLoad 상향(정책). AGENTS.md 「SearchMode 상향 정책」
    DataMerge: 1,       // MergeSheet:1(msAll) → 데이터·헤더 병합으로 분리
    HeaderMerge: 3,     //   ↑ v7은 한 number, v8은 영역별 속성
    // ...
  }
};
```

---

## Cfg 속성 변환 대조표

| IBSheet7 속성 | IBSheet8 적용 방법 | 지원 | 비고 |
|--------------|-------------------|------|------|
| `Alternate` | `(cfg) Alternate` | ✅ | 동일 |
| `AutoClearHeaderCheck` | ❌ 공개 API 로는 대응 없음 | ❌ | v7 은 **`RemoveAll` 호출·조회 시 헤더 전체체크를 자동 초기화**하는 속성이다. 이전에 v8 의 특정 함수로 안내했으나 ①그 함수는 **비공개 API** 라 쓸 수 없고 ②의미도 다르다(데이터 행 값에 맞춰 헤더 체크를 동기화하는 기능). `HeaderCheckMode` 도 "모든 행 vs 보이는 행만 체크" 라 다른 기능이다. **조회·삭제 후 직접 체크를 해제**하도록 코드로 처리한다 — 2026-08-04 정정 |
| `AutoCloseDialog` | `showDialog()` + `CloseOut` | ✅ | Dialog 옵션으로 이동 |
| `AutoCloseDialogTimeout` | `showDialog()` + `CloseTimeout` | ✅ | Dialog 옵션으로 이동 |
| `AutoFitColWidth` | `(col) RelWidth` | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 컬럼 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: 컬럼 속성으로 이동) |
| `AutoRowHeight` | `(cfg) AutoRowHeight` | ⚠️ | **이름 동일 — 치환하지 말 것.** `Wrap`은 v8에서 적용 *조건*일 뿐 대체물이 아니다. ★**default 반대**(v7 `1`=사용 / v8 `0`=사용 안함) → v7에서 생략했다면 v8에 `AutoRowHeight:true` 명시 필요. v8 제약: `SearchMode` 0·3에서만 지원 / `Lines`·`Html`·`Img`·`Button` 타입이나 `Wrap`·`HtmlPrefix`·`HtmlPostfix`·`TextSize` 속성 컬럼이 1개 이상 있어야 적용(아니면 내부적으로 `false`) / 시트 생성 시에만 반영 |
| `AutoSumCalcMode` | `(cfg) CalcMergeMode` | ✅ | 이름 변경 (v8 매뉴얼 `props/cfg/calc-merge-mode.md` 확인). 병합 셀의 합계 계산 방식 |
| `CachePageCount` | `(cfg) MaxPages` | ✅ | 이름 변경 |
| `CalButtonAlign` | ❌ 미지원 | ❌ | |
| `CalButtons` | `(col) CalendarButtons` | ⚠️ | **표기 방식이 다르다.** v7 은 버튼 이름을 `"|"` 로 연결한 문자열, v8 `CalendarButtons` 는 **비트값의 합(number)** 이다(`1`=오늘 · `2`=취소 · `4`=확인 · `8`=어제, 년월일 달력 default `0`). 이전에 `(Calendar) Buttons` 로 안내했으나 `Calendar` (col)은 **v8 비공개 API** 다 — 2026-08-04 정정 |
| `CalWeekNumber` | `showCalendar(Weeks)` | ⚠️ | 메서드 파라미터로 |
| `CellItemsSeparator` | 🚫 불필요 | 🚫 | |
| `CellItemsKeyValueSeparator` | 🚫 불필요 | 🚫 | |
| `CheckActionKey` | ❌ 미지원 | ❌ | 기본: space, enter |
| `CheckActionMode` | 🚫 불필요 | 🚫 | onClick/onAfterClick 사용 |
| `ClipPasteMode` | `(cfg) PasteFocused` | ✅ | 이름 변경 |
| `ComboMaxHeight` | `(cfg) MenuMaxHeight` | ✅ | 이름 변경 |
| `ComboOpenMode` | 🚫 불필요 | 🚫 | 기본적으로 클릭 시 오픈 |
| `ComboSettingMode` | ❌ 미지원 | ❌ | |
| `ComboEditValidation` | 🚫 불필요 | 🚫 | ComboEdit 타입 없음 |
| `Convert2ByteChar` | ❌ 미지원 | ❌ | |
| `CountFormat` | `(cfg) InfoRowConfig.Layout: "Count"` | ⚠️ | **구조 이동 — 맨 치환 대상 아님.** 평평한 Cfg 키를 `InfoRowConfig` 객체 안으로 옮겨야 한다(키만 바꾸면 v8이 무시). ↓[변환 예제](#inforowconfig-카운트페이징-위치-변환-예제) |
| `CountPosition` | `(cfg) InfoRowConfig.Space: "Top"` | ⚠️ | **구조 이동 — 맨 치환 대상 아님.** 평평한 Cfg 키를 `InfoRowConfig` 객체 안으로 옮겨야 한다(키만 바꾸면 v8이 무시). ↓[변환 예제](#inforowconfig-카운트페이징-위치-변환-예제) |
| `CopyEdit` | `(cfg) CopyEdit` | ✅ | 동일 |
| `CssImageUrl` | 🚫 불필요 | 🚫 | |
| `CssUrl` | 🚫 불필요 | 🚫 | |
| `CustomScroll` | `(cfg) CustomScroll` | ✅ | 동일 |
| `DataTypeToInvalidMessage` | 🚫 불필요 | 🚫 | |
| `DataRowHeight` | `(row) Height` | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 행 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: Row 속성으로 이동) |
| `DeferredHScroll` | 🚫 불필요 | 🚫 | |
| `DeferredScrollTime` | 🚫 불필요 | 🚫 | |
| `DeferredVScroll` | 🚫 불필요 | 🚫 | |
| `DirectDownMode` | 🚫 불필요 | 🚫 | |
| `DirectLoadExcel_Url` | `(cfg) Export.DirectLoadExcelUrl` | ⚠️ | **구조 이동 — 맨 치환 대상 아님.** 평평한 Cfg 키를 `Export` 객체 안으로 옮겨야 한다(키만 바꾸면 v8이 무시). ↓[변환 예제](#export-설정-변환-예제) |
| `DocIODelimMode` | ❌ 미지원 | ❌ | |
| `Down2Excel_Url` | `(cfg) Export.Down2ExcelUrl` | ⚠️ | **구조 이동 — 맨 치환 대상 아님.** 평평한 Cfg 키를 `Export` 객체 안으로 옮겨야 한다(키만 바꾸면 v8이 무시). ↓[변환 예제](#export-설정-변환-예제) |
| `Down2Pdf_Url` | `(cfg) Export.Down2PdfUrl` | ⚠️ | **구조 이동 — 맨 치환 대상 아님.** 평평한 Cfg 키를 `Export` 객체 안으로 옮겨야 한다(키만 바꾸면 v8이 무시). ↓[변환 예제](#export-설정-변환-예제) |
| `DownWaitImageVisible` | `(cfg) SuppressMessage` | ✅ | 이름 변경 |
| `DownloadImage` | ❌ 미지원 | ❌ | |
| `DragCell` | `(cfg) DragCell` | ⚠️ | **이름 동일**(값 정의도 동일: 0=행 단위, 1=셀 단위). 단 v8은 `CanDrag:true`일 때만 적용 → `CanDrag` 동반 설정 필요. ↓[Drag/Select 계열](#dragselect-계열-변환-값-분기-주의) |
| `DragMode` | `(cfg) CanDrag` | ⚠️ | **맨 치환 금지 — 값 분기 필요.** v7은 number(-1/0/1), v8은 boolean. ↓[Drag/Select 계열](#dragselect-계열-변환-값-분기-주의) |
| `DragPopup` | `(Dialog) HeadDrag` | ⚠️ | Dialog 옵션으로 이동 |
| `DragRowSelection` | `(cfg) DragCell` | ⚠️ | **맨 치환 금지 — `DragCell`의 반대값으로 매핑한다.** v7 `0`=셀·`1`=행 / v8 `DragCell` `0`=행·`1`=셀. ↓[Drag/Select 계열](#dragselect-계열-변환-값-분기-주의) |
| `EditArrowBehavior` | `(cfg) EditArrowBehavior` | ✅ | **동명 존재.** v7 "편집중 방향키 입력에 대한 동작" = v8 "편집 중 좌/우 방향키로 셀 이동 허용". 이전에 "미지원"으로 적혀 있었다 — 2026-08-04 정정 |
| `EditEnterBehavior` | `(col) AcceptEnters` | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 컬럼 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: 컬럼 속성으로 이동) |
| `EditLenMode` | ❌ 미지원 | ❌ | |
| `EditTabBehavior` | ❌ 미지원 | ❌ | |
| `EditTabInsert` | ❌ 미지원 | ❌ | |
| `EnhancedFloatSum` | ❌ 미지원 | ❌ | |
| `EventCacheMode` | 🚫 불필요 | 🚫 | |
| `ExcelTreeMode` | `down2Excel(downTreeHide)` 인자 사용 | ✅ | 메서드 파라미터로. ★`down2Excel` 은 `plugins/ibsheet-excel.js` 로드 + 서버 모듈 필요 |
| `ExportMode` | `(cfg) AutoExcelMode` | ✅ | 이름 변경 |
| `ExtendLastCol` | `(cfg) FitWidth` 또는 마지막 컬럼에 `RelWidth:1` | ✅ | 방식 변경 |
| `FalseValue` | Formula 또는 Format으로 지원 | ✅ | 방식 변경 |
| `FilterCaseSensitive` | `(col) CaseSensitive` | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 컬럼 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: 컬럼 속성으로 이동) |
| `FilterComboSort` | ❌ 미지원 | ❌ | |
| `FilteredCountFormat` | ❌ 미지원 | ❌ | |
| `FilterDateType` | ❌ 미지원 | ❌ | |
| `FilterInputPopup` | ❌ 미지원 | ❌ | |
| `FitSizeColHeaderMode` | ❌ 미지원 | ❌ | |
| `FitSizeColMode` | ❌ 미지원 | ❌ | |
| `FocusAfterProcess` | `(cfg) FocusedRow`, `(cfg) FocusedCol` 또는 `onRenderFinish` 이벤트 | ⚠️ | 이벤트에서 처리 |
| `FocusAfterRowTransaction` | 각 API의 `focus` 인자 사용 | ⚠️ | API 파라미터 확인 |
| `FocusEditMode` | `(cfg) InEditMode` | ✅ | 이름 변경 |
| `FocusSumRow` | `(row) CanFocus` | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 행 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: Row 속성으로 이동) |
| `GroupSort` | `(cfg) GroupSort` | ✅ | **이름·값 모두 동일 — 치환하지 않는다.** ★`GroupSortMain` 으로 옮기면 안 된다 — 그건 그룹 열의 오름/내림차순(`1`\|`2`)이라 `GroupSort:0` 은 유효값도 아니다 |
| `HeaderCheckMode` | `(cfg) HeaderCheckMode` | ✅ | 동일 |
| `HeaderCheckSync` | ❌ 공개 API 로는 대응 없음 | ❌ | 의미가 맞는 v8 함수가 있으나 **비공개 API** 라 안내하지 않는다. 데이터 행의 체크 상태 변화에 맞춰 헤더 체크를 갱신하려면 `onAfterClick` 등에서 직접 계산해 반영한다 — 2026-08-04 정정 |
| `HeaderEventMode` | 🚫 불필요 | 🚫 | |
| `HeaderRowHeight` | `(row) Height` | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 행 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: Row 속성으로 이동) |
| `HeaderMergeMode` | `(cfg) HeaderMerge` **> 0** + `IgnoreHeaderColMerge` **반대값** | ⚠️ | **맨 치환 금지 — 두 속성을 함께 설정한다.** v7은 **헤더의 가로(ColMerge 방향) 머지 동작 방식**을 정하는 속성이다. v8은 `IgnoreHeaderColMerge`가 **`HeaderMerge > 0`일 때만 적용**되므로, 헤더 병합을 켠 상태(`HeaderMerge`를 `1`~`6` 중 하나)로 두고 `IgnoreHeaderColMerge`에 **`HeaderMergeMode`의 반대값**을 넣는다. ★`HeaderMergeMode:0` → `HeaderMerge:0` 으로 옮기면 헤더 병합이 사라진다. ↓[Merge 계열](#merge-계열-변환-값-분기값-반전-주의) |
| `HeaderSort` | `(cfg) CanSort` / `HeaderSortMode` | ⚠️ | **맨 치환 금지 — 값별로 다른 속성으로 분기.** `SortIcons`가 아니다. ↓[Sort 계열](#sort-계열-변환-값-분기-주의) |
| `HeaderSortActionMode` | `(cfg) HeaderSortActionMode` | ✅ | 동일 |
| `Holiday` | 달력 이벤트에서 별도 구현 | ⚠️ | 수동 구현 필요 |
| `ibEditTitle` | ❌ 미지원 | ❌ | |
| `ImageStatus` | `Extend: IB_Preset.STATUS` | ⚠️ | Preset으로 구현. ★`IB_Preset`은 `plugins/ibsheet-common.js` 로드 필요 |
| `InitRender` | 🚫 불필요 | 🚫 | |
| `InvalidArgsReturnValue` | 🚫 불필요 | 🚫 | |
| `InvalidInputBehavior` | ❌ 미지원 | ❌ | |
| `InvalidPasteMsgMode` | ❌ 미지원 | ❌ | |
| `JsonAttributeDelimiter` | 🚫 불필요 | 🚫 | |
| `JustCheck` | ❌ 미지원 | ❌ | |
| `JustCheckSize` | ❌ 미지원 | ❌ | |
| `KeyFieldPosition` | `(cfg) RequiredPosition` | ✅ | 이름 변경 |
| `LoadExcel_Url` | `(cfg) Export.LoadExcelUrl` | ⚠️ | **구조 이동 — 맨 치환 대상 아님.** 평평한 Cfg 키를 `Export` 객체 안으로 옮겨야 한다(키만 바꾸면 v8이 무시). ↓[변환 예제](#export-설정-변환-예제) |
| `MarkupTagDelimiter` | `(cfg) MarkupTagDelimiter` | ✅ | 동일 |
| `MaxSort` | `(cfg) MaxSort` | ✅ | 동일 |
| `MessageShowLevel` | `(cfg) SuppressMessage` | ✅ | 이름 변경 |
| `MouseHoverMode` | `(cfg) Hover` | ✅ | 이름 변경 |
| `MultiCheckValue` | ❌ 미지원 | ❌ | |
| `NextPageCall` | ❌ 미지원 | ❌ | |
| `NewRowDeleteMode` | ❌ 미지원 | ❌ | |
| `NoImageUrl` | `(col) DefaultImage` | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** v7은 시트 전체 대체 이미지, v8 `DefaultImage`는 **Col 속성**이며 `Type:"Img"` 컬럼에만 적용 → Img 컬럼마다 개별 설정으로 옮길 것 |
| `NullLastOnAscOrder` | ❌ 미지원 | ❌ | |
| `OnePageSort` | `(cfg) SortCurrentPage` | ⚠️ | v7 쪽은 `ibsheet.cfg` 에 두는 설정이라 화면 코드에서는 잘 나타나지 않는다. 의미는 동일 — 서버 페이징(v7 `smServerPaging2`=`SearchMode:4` / v8 `SearchMode:4,5`) 시 **현재 보여지는 페이지 안에서만 정렬**. v8 `1(true)` 이면 Sort 정보를 서버에 보내지 않는다. **2026-08-05 v7 매뉴얼에 페이지가 추가됐다**(`props/PropertyList/OnePageSort.md`) — `smServerPaging2`(`SearchMode:4`)에서만 동작함이 문서로 확인된다. 필터 쪽 짝은 `OnePageFilter` |
| `OnePageFilter` | ❌ 대응 없는 속성 (동작은 v8 기본) | ⚠️ | v7 `1` = **서버 호출 없이 현재 페이지 안에서만 필터링**(`SearchMode:4` 에서만 동작, default `0`). **v8 은 서버 페이징에서 필터가 기본적으로 조회된 데이터 안에서만 동작**하므로 `OnePageFilter:1` 은 **속성을 지우면 그대로 재현된다.** ★반대로 v7 `0`(=필터링 안 하고 `OnChangeFilter` 만 발생)에 의존해 `DoSearchPaging` 으로 직접 재조회하던 화면이라면, v8 에서는 `onBeforeFilter` 에서 `getFilter()` 로 조건을 모아 `doSearchPaging()` 으로 서버에 보내도록 다시 써야 한다(근거: v8 `props/cfg/search-mode.md` 서버 페이징 절) |
| `MergeSheet` | `(cfg) DataMerge` + `HeaderMerge` (+`PrevColumnMerge`) | ⚠️ | **맨 치환 금지 — 값 분기.** v7은 데이터·헤더 병합을 한 number(`msNone`0/`msAll`1/`msPrevColumnMerge`2/`msFixedMerge`3/`msBaseColumnMerge`4/`msHeaderOnly`5, 7~9는 조합)에 담았고 v8은 영역별로 분리. `HeaderMerge`로만 바꾸면 **데이터 영역 병합이 전부 사라진다.** ↓[Merge 계열](#merge-계열-변환-값-분기값-반전-주의) |
| `PrevColumnMergeMode` | `(cfg) PrevColumnMergeMode` | ⚠️ | **이름 동일 — 치환하지 말 것.** `PrevColumnMerge`는 별개 속성(앞컬럼 머지 사용 영역 `0`~`3`)이라 바꾸면 기능이 꺼진다. ★**default 반대**(v7 `1`=페이지 단위 / v8 `0`=전체) → v7에서 생략했다면 v8에 `1` 명시 필요. ↓[Merge 계열](#merge-계열-변환-값-분기값-반전-주의) |
| `PagingPosition` | `(cfg) InfoRowConfig.Layout: ["Paging",""]` 또는 `["","Paging"]` | ⚠️ | **구조 이동 — 맨 치환 대상 아님.** 평평한 Cfg 키를 `InfoRowConfig` 객체 안으로 옮겨야 한다(키만 바꾸면 v8이 무시). ↓[변환 예제](#inforowconfig-카운트페이징-위치-변환-예제) |
| `PasteToNumberFormat` | ❌ 미지원 | ❌ | |
| `PopupCheckEditMode` | ❌ 미지원 | ❌ | |
| `RefreshHeaderMode` | ❌ 미지원 | ❌ | |
| `ReverseSortOrder` | ❌ 미지원 | ❌ | |
| `RowHeightMax` | `(row) MaxHeight` | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 행 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: Row 속성으로 이동) |
| `SaveImage` | 🚫 불필요 | 🚫 | |
| `SaveValidationMode` | ❌ 미지원 | ❌ | |
| `ScrollOverSheet` | `(cfg) ScrollOverSheet` | ✅ | **동명 존재.** v7 "시트 내 휠 스크롤 이벤트를 부모 element 로 전달" = v8 "시트 스크롤이 끝난 뒤 상위 부모 스크롤이 동작". 이전에 "미지원"으로 적혀 있었다 — 2026-08-04 정정 |
| `SearchImage` | 🚫 불필요 | 🚫 | |
| `SearchMode` | `(cfg) SearchMode` | ✅ | 이름 동일. **값 `2`→`0`은 정책상 상향**(FastLoad). v7 `2`=v8 `2`(LazyLoad)로 번호·의미가 같아 필수 변경은 아니며, IBSheet8 성능 강점을 쓰려는 의도적 규칙이다. 제약·예외는 `AGENTS.md` 「SearchMode 상향 정책」. v7 `1`/`3`/`4`는 v8과 번호·의미 동일 |
| `Page` | `(cfg) PageLength` | ✅ | 이름만 바뀐다 — v7 "한번에 표시할 행의 개수"(default 20) = v8 `PageLength`(default 20). ★서버 페이징(`SearchMode:3,4,5`)에서는 이 값과 서버가 주는 건수를 반드시 맞춰야 한다 |
| `SearchSync` | 각 조회 API `sync` 인자 사용 | ✅ | API 파라미터로 이동 |
| `SearchXMLbyColOrder` | 🚫 불필요 | 🚫 | |
| `SelectCellEventMode` | ❌ 미지원 | ❌ | |
| `SelectionRowsMode` | ❌ 미지원 | ❌ | |
| `SelectionSummary` | `(cfg) SelectionSummary` | ✅ | 동일 |
| `SkipDefaultTheme` | 🚫 불필요 | 🚫 | |
| `SmartResize` | 🚫 불필요 | 🚫 | |
| `SortCaseSensitive` | `(col) CaseSensitive` | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 컬럼 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: 컬럼 속성으로 이동) |
| `SortEventMode` | 🚫 불필요 | 🚫 | |
| `SparklineColor` | 🚫 불필요 | 🚫 | |
| `SparklineNegativeColor` | 🚫 불필요 | 🚫 | |
| `SubSumMode` | `makeSubTotal(mode)` 인자 사용 | ✅ | 메서드 파라미터로 이동 |
| `SumBackColor` | `(row) Color` | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 행 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: Row 속성으로 이동) |
| `SumFontBold` | `(row) TextStyle` | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 행 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: Row 속성으로 이동) |
| `SumFontColor` | `(row) TextColor` | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 행 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: Row 속성으로 이동) |
| `SumZeroValue` | ❌ 미지원 | ❌ | |
| `SyncPaste` | ❌ 미지원 | ❌ | |
| `TapHoldTreshold` | ❌ 미지원 | ❌ | |
| `ThemeVersion` | 🚫 불필요 | 🚫 | |
| `Timestamp` | 날짜 형식 내부 timestamp 처리 | ⚠️ | 기본값 변경됨 |
| `ToolTipMode` | `(cfg) StandardTip` | ✅ | 이름 변경 |
| `TouchScrolling` | `(cfg) TouchScrolling` | ⚠️ | **이름 동일 — 치환하지 말 것.** `TouchScroll`은 스크롤바 *모양*(`0`~`4`)으로 무관하다. 단 ①v7 number(`0`사용안함·`1`일반·`2`지연이동) → v8 boolean이라 **`2`(지연 이동)는 대응 없음** ②**default 반대**(v7 `0` / v8 `1`) → v7에서 생략했다면 v8에 `0` 명시 필요 |
| `TreeDragIconMode` | 드래그 시 자동 아이콘 표시 | ⚠️ | 자동 처리 |
| `TreeNodeIcon` | `(cfg) NoTreeLines` | ✅ | 이름 변경 |
| `TreeNodeToggleMode` | ❌ 미지원 | ❌ | |
| `TrueValue` | Formula 또는 Format으로 지원 | ✅ | 방식 변경 |
| `UnicodeByte` | `(cfg) UnicodeByteMode` | ✅ | 이름 변경 |
| `UpdateMergeCells` | `(cfg) MergeCellsMatch` | ✅ | 이름 변경 |
| `UploadImage` | 🚫 불필요 | 🚫 | |
| `UseCache` | `(cfg) UseCache` | ⚠️ | **동명이지만 대상 파일이 다르다** — v7 은 `css`·`msg` 파일 캐시, v8 은 **`img` 파일** 캐시다. 캐시를 끄던 의도가 css/메시지였다면 v8 에서는 다른 방법이 필요하다. 이전에 "미지원"으로 적혀 있었다 — 2026-08-04 정정 |
| `UseDefaultTime` | `(cfg) EditMaskFunc` 활용 | ⚠️ | 수동 구현 필요 |
| `UseDefaultSortImage` | `(cfg) SortIcons` | ✅ | 이름 변경 |
| `UseEditMask` | `(cfg) EditMaskFunc` 외부 라이브러리 연동 | ✅ | 방식 변경 |
| `UseEmptyMerge` | ❌ 미지원 | ❌ | IBSheet8은 공백 데이터 머지가 기본값 |
| `UseFilterHtmlType` | Html 타입 컬럼에 Filter 사용 가능 | ✅ | 기본 지원 |
| `UseFindDialog` | `sheet.showFindDialog()` | ✅ | ibsheet-dialog.js import 필요 |
| `UseHeaderActionMenu` | `(row) Menu` 속성으로 설정 | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 행 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: Row 속성으로 이동) |
| `UseHeaderSortCancel` | Shift+클릭으로 정렬 취소 | ✅ | 기본 동작 |
| `UseGroupActionMenu` | 그룹행 `Menu` 속성 사용 | ⚠️ | **레벨 이동 — Cfg에 두면 v8이 무시한다.** 해당 행 객체마다 설정으로 옮길 것(맨 치환 대상 아님). (기존 메모: Row 속성으로 이동) |
| `UseJsonAttribute` | 기본적으로 데이터에서 Attribute 사용 가능 | ✅ | 기본 지원 |
| `UseJsonTreeLevel` | `IBSheet.v7.convertTreeData(treeData)` | ⚠️ | ibsheet-common.js 필요 |
| `UseNoDataRow` | `(cfg) NoDataMessage` | ✅ | 이름 변경 |
| `UsePivotDialog` | `sheet.createPivotDialog()` | ✅ | 메서드로 이동 |
| `UseTableSuffix` | ❌ 미지원 | ❌ | |
| `UserAgent` | ❌ 미지원 | ❌ | |
| `WaitTimeOut` | `(cfg) Timeout` 또는 각 API timeout 인자 | ✅ | 방식 변경 |
| `WheelScrollSize` | `(cfg) WheelScrollCount` | ✅ | 이름 변경. (이전 표기 `WhellScrollCount`는 오타였다 — v8 매뉴얼 `props/cfg/wheel-scroll-count.md` 기준 `WheelScrollCount`) |

---

## 컬럼(Col) 속성 변경 요약

| IBSheet7 컬럼 속성 | IBSheet8 컬럼 속성 | 비고 |
|------------------|------------------|------|
| `Header` | `Header` | 동일 |
| `Type` | `Type` | 동일 |
| `Name` | `Name` | 동일 |
| `Width` | `Width` | 동일 |
| `Align` | `Align` | 동일 |
| `CanEdit` | `CanEdit` | 동일 |
| `Enum` | `Enum` | 동일 |
| `EnumKeys` | `EnumKeys` | 동일 |
| `Format` | `Format` | 동일 |
| `Hidden` | `Visible` | **값 반전: Hidden:true → Visible:0, Hidden:false → Visible:1** |
| `SaveName` | `Name` | 이름 변경. ★v8에서 `Name`은 **필수**이며 한 시트 내 **중복 불가** (근거: v8 매뉴얼 벤더 마이그레이션 지침) |
| `RowMerge` | `RowMerge` | 동일 |
| `ColMerge` | `ColMerge` | **이름 동일 — 치환하지 말 것.** v8에도 `ColMerge`(col, boolean: `0`=병합 제외, `1`=병합 대상 default)가 같은 의미로 존재한다. `Span`은 **cell의 colspan**으로 전혀 다른 개념 |

---

## 컬럼 Enum(Combo) 변환

### IBSheet7 ComboData → IBSheet8 Enum/EnumKeys

IBSheet7에서는 콤보 항목을 `ComboItem`(표시문자열/코드)이나 `SetColProperty(colName, {ComboText, ComboCode})`로 컬럼과 분리해 설정했다.

IBSheet8에서는 컬럼 정의(Cols)에 `Enum`(표시값)과 `EnumKeys`(저장값) 속성을 **직접** 설정한다.

> ⚠️ **IBSheet8 Enum/EnumKeys 규칙:** 첫 번째 문자가 **구분자**. 관례상 `|`로 시작한다.
> 예: `"|텍스트1|텍스트2|텍스트3"`, `"|키1|키2|키3"`

#### 변환 전 (IBSheet7)
```js
// 컬럼 정의 — Combo 타입, 항목은 별도 지정
{Type:"Combo", Width:"100", SaveName:"status"}

// 콤보 항목을 컬럼과 분리해 전달 (표시문자열 / 코드)
{ComboItem:[0, "status", "진행중|완료|취소", "01|02|03"]}
```

#### 변환 후 (IBSheet8)
```js
// 컬럼 정의에 Enum/EnumKeys 직접 설정 (첫 글자가 구분자)
{Type:"Enum", Width:"100", Name:"status",
 Enum:     "|진행중|완료|취소",
 EnumKeys: "|01|02|03"}
```

- `ComboText` → `Enum` / `ComboCode` → `EnumKeys` (양쪽 모두 앞에 구분자 `|` 추가)
- 런타임 변경은 `setAttribute(row, col, "Enum", ...)` / `"EnumKeys"` + `refreshCell`
- 값 쓰기에 브릿지 `setValue2`를 쓰면 화면표시값을 넣어도 `EnumKeys` 저장값으로 자동 교체된다 (conventions.md §5-1)

> 프로젝트에 시트 초기화 공통 래퍼가 있고 그 안에서 콤보 항목을 주입한다면, 래퍼 쪽도 `Enum`/`EnumKeys`를 채우도록 함께 수정해야 한다.

---

## InfoRowConfig (카운트/페이징 위치) 변환 예제

```js
// IBSheet7 — CountFormat + CountPosition 따로 설정
Cfg: {
  CountFormat: 1,
  CountPosition: 1,  // 1: 상단
  PagingPosition: 1  // 1: 하단
}

// IBSheet8 — InfoRowConfig 통합 관리
Cfg: {
  InfoRowConfig: {
    Layout: ["Count", "Paging"],  // 상단: Count, 하단: Paging
    Space: "Top"
  }
}
```

---

## Export 설정 변환 예제

```js
// IBSheet7
Cfg: {
  Down2Excel_Url: "/download/excel",
  Down2Pdf_Url: "/download/pdf",
  LoadExcel_Url: "/upload/excel"
}

// IBSheet8
Cfg: {
  Export: {
    Down2ExcelUrl: "/download/excel",
    Down2PdfUrl: "/download/pdf",
    LoadExcelUrl: "/upload/excel"
  }
}
```

---

## Merge 계열 변환 (값 분기·값 반전 주의)

> ⚠️ IBSheet7은 데이터 병합·헤더 병합·앞컬럼 병합을 **몇 개의 속성에 섞어** 담았고,
> IBSheet8은 **영역별 속성으로 분리**했다. 이름만 바꾸면 병합이 사라지거나 뒤집힌다.

### v8의 병합 속성 구조

| v8 속성 | 대상 | 값 |
|---|---|---|
| `DataMerge` (cfg) | 조회된 **데이터 영역** | `0`병합안함(default) `1`열기준 `2`행기준 `3`열우선 `4`행우선 `5`열우선사방 `6`행우선사방 |
| `HeaderMerge` (cfg) | **헤더 영역** | `DataMerge`와 동일 체계 |
| `PrevColumnMerge` (cfg) | 앞 열 병합 범위 기준 | `0`사용안함(default) `1`데이터만 `2`헤더만 `3`둘다 |
| `PrevColumnMergeMode` (cfg) | 머지 기준 범위 | `0`전체 셀(default) `1`페이지 단위 |
| `IgnoreHeaderColMerge` (cfg) | `ColMerge`를 헤더에도 적용할지 | `0`적용 `1`적용안함(default) |
| `ColMerge` (col) | 해당 열의 병합 대상 여부 | `0`제외 `1`포함(default) |

### `MergeSheet` (v7) → `DataMerge` + `HeaderMerge`

v7 `MergeSheet`는 병합 **종류**를 하나의 number로 표현했다(`SetMergeSheet`/초기화 `Cfg` 공용).
v8은 이를 **`HeaderMerge` + `DataMerge` + `PrevColumnMerge` 세 속성**으로 분리했다.

**★ 벤더 확정 매핑표** (2026-08-04) — 이 표대로 세 속성을 함께 설정한다.

| v7 `MergeSheet` | 상수 | v8 `HeaderMerge` | v8 `DataMerge` | v8 `PrevColumnMerge` |
|---|---|---|---|---|
| `0` | `msNone` | `0` | `0` | `0` |
| `1` | `msAll` | `5` | `5` | `3` |
| `2` | `msPrevColumnMerge` | `0` | `1` | `3` |
| `3` | `msFixedMerge` | `0` | `1` | `3` |
| `4` | `msBaseColumnMerge` | `0` | `1` | `3` |
| `5` | `msHeaderOnly` | `1` | `0` | `2` |
| `7` | `msHeaderOnly` + `msPrevColumnMerge` | `1` | `1` | `3` |
| `8` | `msHeaderOnly` + `msFixedMerge` | `1` | `1` | `3` |
| `9` | `msHeaderOnly` + `msBaseColumnMerge` | `1` | `1` | `3` |

- v8 `DataMerge`/`HeaderMerge`: `0`=병합 안함 · `1`=열 기준 · `5`=열 우선 사방 병합
- v8 `PrevColumnMerge`: `0`=사용안함 · `2`=헤더만 · `3`=데이터+헤더
- **`msHeaderOnly`(5) 가 섞였는지가 `HeaderMerge` 를 가른다** — 안 섞이면(`2`·`3`·`4`) `HeaderMerge:0`,
  섞이면(`5`·`7`·`8`·`9`) `HeaderMerge:1`
- v7 코드가 숫자 대신 **상수 이름**(`msAll` 등)을 쓰는 경우가 많다 — 엔진이 먼저 숫자로 바꿔준다
  (아래 「v7 전역 상수」 참고). 조합값은 `msHeaderOnly + msPrevColumnMerge` 처럼 **상수 덧셈으로
  적혀 있을 수 있다** — 한쪽만 숫자로 바뀌고 나머지는 `V7CONST_RESIDUE` 검토로 넘어오니
  위 표의 `7`/`8`/`9` 행을 보고 마무리한다

### `SetMergeSheet()` (v7 메서드) → `setAutoMerge()` (v8)

```javascript
// v7
mySheet.SetMergeSheet(msHeaderOnly);          // = 5

// v8 — 위 표의 5행: H1 / D0 / P2. 인자 순서는 (dataMerge, headerMerge, prevColumnMerge)
sheet.setAutoMerge(0, 1, 2);
```

> **★ `setAutoMerge()` 는 호출 시 `Cfg` 의 병합 관련 설정을 전부 초기화하고 전달한 인자만 적용한다**(벤더 확인).
> `Cfg` 로 잡아둔 병합 옵션이 있으면 **빠짐없이 다시 넘겨야 한다.**
> 전체 시그니처: `setAutoMerge(dataMerge, headerMerge, prevColumnMerge, fixPrevColumnMerge, headMerge, footMerge, headPrevColumnMerge, footPrevColumnMerge)`
> `setFixedTop`/`setFixedBottom` 으로 고정한 행은 `Head`/`Foot` 영역이 되어 병합이 적용되지 않으므로
> `headMerge`/`footMerge` 를 따로 설정한다. `SEQ` 열은 병합되지 않는다.
> `GetMergeSheet()` 는 v8 대응이 없다 → `Cfg` 값을 직접 읽는다.


★ v8 `PrevColumnMerge`는 **`DataMerge` 또는 `HeaderMerge`가 설정돼 있어야 동작한다.**

### `AutoExcelMode` — v8 신규. 엑셀 처리 방식을 코드 변경 없이 가른다

v7 에는 대응이 없는 **v8 신규 `Cfg` 옵션**이지만, 마이그레이션에서 매우 유용하다.
`down2Excel()`/`loadExcel()` **호출 코드를 그대로 두고** 내부 처리 경로만 바꾼다.

| 값 | 처리 | 필요한 것 |
|---|---|---|
| `1` (default) | 서버 모듈 (`down2Excel`·`loadExcel`) | `plugins/ibsheet-excel.js` + **서버 모듈** + `Cfg.Export.Url` |
| `2` | 클라이언트 모듈 (내부적으로 `exportData`·`importData`) | **`plugins/jszip.min.js`** — 서버 모듈·`Export.Url` 불필요 |
| `3` | 브라우저 성능 기준 자동 선택 | 두 경로 모두 준비 |

> **v7 서버 모듈을 v8 것으로 교체하기 어려운 프로젝트는 `AutoExcelMode: 2` 로 우회할 수 있다.**
> `showDownloadDialog`(`plugins/ibsheet-dialog.js` 소속) 도 이 값에 따라 내부 경로가 갈린다
> (`funcs/dialog/show-download-dialog.md`).
> 지원 형식은 `xlsx`·`txt`·`csv` 이며 구형 `xls` 는 지원하지 않는다.

### v7 전역 상수 (`ibsheetinfo.js`) — 엔진이 숫자로 바꾼다

IBSheet7은 `ibsheetinfo.js` 에서 전역 상수를 정의했고, 고객 코드가 숫자 대신 이 이름을 쓴다.
**IBSheet8에는 그 파일이 없다** → 그대로 두면 브라우저에서 `... is not defined` 로 죽고,
이름 표기 때문에 값 기반 변환 규칙(`SearchMode:2`→`0` 등)도 걸리지 않는다.
엔진이 **가장 먼저** 숫자로 정규화한다(`V7CONST_*` 규칙 23건).

| 계열 | 상수 → 값 |
|---|---|
| `MergeSheet` | `msNone`0 · `msAll`1 · `msPrevColumnMerge`2 · `msFixedMerge`3 · `msBaseColumnMerge`4 · `msHeaderOnly`5 |
| `SearchMode` | `smGeneral`0 · `smClientPaging`1 · `smLazyLoad`2 · `smServerPaging`3 · `smServerPaging2`4 |
| `SizeMode` | `sizeAuto`0 · `sizeNoVScroll`1 · `sizeNoHScroll`2 · `sizeNoBothScroll`3 · `sizeAdvancedAuto`4 |
| `BasicImeMode` | `imeAuto`0 · `imeHan`1 · `imeEng`2 |
| `SumPosition` | `posTop`0 · `posBottom`1 |
| `VScrollMode` | `vsAuto`0 · `vsFixed`1 |

> 정규화 후에는 `ibsheetinfo.js` 를 로드할 필요가 없다 — 변환 결과에서 `<script>` 태그를 지운다.
> `IBS_MSG_REQUIRED`(필수입력 메시지)도 같은 파일에 있으나 문자열이라 숫자 정규화 대상이 아니다.

### `HeaderMergeMode` (v7) → `HeaderMerge`(>0) + `IgnoreHeaderColMerge`(반대값)

v7 `HeaderMergeMode`는 **헤더의 가로(`ColMerge` 방향) 머지 동작 방식**을 정하는 속성이다.
(v7 매뉴얼 `HeaderMergeMode.md`의 설명은 일부 누락돼 있어 "머지 방식"으로만 적혀 있다.)
**이 매핑은 벤더 확인으로 확정됐다.**

v8은 이 축을 `IgnoreHeaderColMerge`로 옮겼는데, **그 속성은 `HeaderMerge > 0`일 때만 적용된다.**
따라서 **두 속성을 함께** 설정해야 한다.

| v7 `HeaderMergeMode` | 의미 | → v8 |
|---|---|---|
| `0` (default) | `ColMerge` 설정과 무관하게 머지 | `HeaderMerge: 1`~`6` + `IgnoreHeaderColMerge: 1` |
| `1` | `ColMerge`에 따라 머지 | `HeaderMerge: 1`~`6` + `IgnoreHeaderColMerge: 0` |

`IgnoreHeaderColMerge`에는 **`HeaderMergeMode`의 반대값**이 들어간다.

> **★ `HeaderMergeMode: 0` 을 `HeaderMerge: 0` 으로 옮기면 안 된다.**
> `HeaderMerge: 0` 은 "헤더 병합 안함"이라서 헤더 병합이 통째로 사라진다.
> v7 코드에 `HeaderMergeMode` 가 있었다는 것은 **헤더 병합을 쓰고 있었다는 뜻**이므로,
> v8 에서는 `HeaderMerge` 를 **`0` 이 아닌 값**으로 켜 둔 상태에서 `IgnoreHeaderColMerge` 로
> `ColMerge` 추종 여부를 조절한다.

`HeaderMerge` 의 구체적인 값(`1`~`6`: 열 기준 / 행 기준 / 열 우선 / 행 우선 / 열 우선 사방 /
행 우선 사방)은 **헤더 구조를 보고 정한다.** 같은 화면에 `MergeSheet` 도 있었다면 그쪽 변환에서
정한 `HeaderMerge` 값과 **하나로 합친다**(두 v7 속성이 같은 v8 속성을 건드리므로 중복 지정 주의).

v7 에서 `HeaderMergeMode` 를 **생략했다면** v8 `IgnoreHeaderColMerge` 도 생략해도 된다
(v7 default `0` ↔ v8 default `1` 이 서로 대응). 단 그때도 **헤더 병합 자체는 `HeaderMerge` 로
켜 줘야** 한다.

### 치환하지 않는 것

| v7 | 이유 |
|---|---|
| `PrevColumnMergeMode` | v8에 **동명·동의미**로 존재. `PrevColumnMerge`(영역 `0`~`3`)는 별개 속성이라 바꾸면 기능이 꺼진다. 단 **default가 반대**(v7 `1`=페이지 단위 / v8 `0`=전체)라 v7에서 생략했다면 v8에 `1`을 명시해야 동작이 유지된다 |
| `ColMerge` (col) | v8에 **동명·동의미**로 존재(boolean). `Span`은 cell의 colspan으로 무관 |

```js
// IBSheet7
Cfg: {
  MergeSheet: 7,            // msHeaderOnly + msPrevColumnMerge
  HeaderMergeMode: 1,       // ColMerge에 따라 헤더 머지
  PrevColumnMergeMode: 0    // 페이지 전체 기준
}
Cols: [ {SaveName:"qty", ColMerge:0} ]

// IBSheet8
Cfg: {
  // MergeSheet:7 의 msHeaderOnly, 그리고 HeaderMergeMode 가 요구하는 "헤더 병합 켜기"가
  // 둘 다 HeaderMerge 로 모인다 → 값을 하나로 합쳐 지정한다(중복 지정 주의)
  HeaderMerge: 3,           // 헤더 병합 ON (>0 필수. 헤더 구조 보고 1~6 선택)
  DataMerge: 0,             //   데이터 병합은 안 함
  PrevColumnMerge: 2,       // msPrevColumnMerge + 헤더 대상 → 헤더 영역만
  IgnoreHeaderColMerge: 0,  // HeaderMergeMode:1 → 0 ★반대값. HeaderMerge>0 일 때만 적용된다
  PrevColumnMergeMode: 0    // ★이름 그대로. v8 default와 같아 생략 가능
}
Cols: [ {Name:"qty", ColMerge:0} ]   // ★ColMerge 그대로
```

`HeaderMerge: 0` 으로 두면 `IgnoreHeaderColMerge` 가 무시되고 헤더 병합도 사라진다.

---

## Drag/Select 계열 변환 (값 분기 주의)

> ⚠️ 이 계열은 **이름만 바꾸면 동작이 뒤집히거나 기능이 사라진다.** 4개 속성이 서로 얽혀 있고
> v7/v8이 같은 이름을 반대 의미로 쓰는 곳이 있으므로 반드시 값까지 함께 변환한다.

IBSheet7이 **드래그(drag)** 와 **선택(selection)** 을 여러 속성에 나눠 담았는데, IBSheet8은
`CanDrag`(드래그 허용) · `DragCell`(드래그 단위) · `SelectingCells`(선택 단위)로 축을 분리했다.

### 속성별 값 대조

**`DragMode` (v7 number) → `CanDrag` (v8 boolean)** — 3-state → 2-state이므로 정보 손실이 있다.

| v7 `DragMode` | v7 동작 | → v8 | 주의 |
|---|---|---|---|
| `-1` | 드래그 사용 안함 | `CanDrag: false` | |
| `0` (기본) | 일반=범위 셀렉션, **Ctrl=행 드래깅** | `CanDrag: true` | v8에 **Ctrl 전용 드래그 개념이 없다.** `true`로 두면 Ctrl 없이도 드래그되어 v7보다 드래그가 쉬워진다. 드래그를 막아야 하는 화면이면 `false` 검토 |
| `1` | 일반=행 드래깅 | `CanDrag: true` | 유일하게 자연스러운 1:1 |

**`DragCell` (v7) → `DragCell` (v8)** — 이름·값 모두 동일하므로 **치환하지 않는다.**

| 값 | v7 | v8 | |
|---|---|---|---|
| `0` | 행 단위 드래깅 (기본) | 행 단위 드래깅 (기본) | 동일 |
| `1` | 셀 단위 드래깅 | 셀 단위 드래깅 | 동일 |

단 v8 `DragCell`은 **`CanDrag:true`일 때만 적용**된다. v7 코드에 `DragCell`만 있고 `DragMode`가
없었다면 v8에서는 `CanDrag`를 명시하지 않으면 아무 효과가 없다(v8 `CanDrag` 기본값이 `false`).

**`DragRowSelection` (v7) → `DragCell` (v8)** — **`DragCell`의 반대값으로 매핑한다.**

| v7 `DragRowSelection` | → v8 `DragCell` |
|---|---|
| `0` (셀 단위, 기본) | `1` (셀 단위) |
| `1` (행 단위) | `0` (행 단위) |

v7은 `DragCell`과 `DragRowSelection`이 **같은 축을 반대 방향으로 중복 제공**한다
(`DragCell` `0`=행·`1`=셀 / `DragRowSelection` `0`=셀·`1`=행). v8은 `DragCell` 하나로 통합됐으므로,
두 속성이 동시에 설정된 v7 코드는 **값이 서로 모순되지 않는지 확인**한 뒤 하나로 합친다.

**`SelectingCells` (v8)의 v7 대응은 `DragCell`이 아니다.** IBSheet7에서는 속성이 아니라
`Get/SetSelectionMode()` **core 메서드**이며, 값도 반대다 → `docs/method-mapping.md` 참조.
근거: IBSheet8 매뉴얼 벤더 마이그레이션 지침 — *"SelectionMode … SelectingCells (cfg) 속성으로 대체"*.

### 변환 예제

```js
// IBSheet7
Cfg: {
  DragMode: 1,           // 일반 드래그 = 행 드래깅
  DragRowSelection: 0    // 드래그 대상 단위 = 셀
}

// IBSheet8 — CanDrag 명시 + DragRowSelection 값 반전
Cfg: {
  CanDrag: true,   // DragMode:1 → 드래그 허용
  DragCell: 1      // DragRowSelection:0(셀) → DragCell:1(셀) ★값 반전
}
```

---

## Sort 계열 변환 (값 분기 주의)

> ⚠️ v7 `HeaderSort`는 **하나의 number가 값마다 다른 v8 속성으로 흩어진다.** 맨 치환 대상이 아니다.

v7 `HeaderSort`(number 0~3)는 "정렬 기능 on/off + 아이콘만 표시"를 한 속성에 섞어 담았고,
v8은 `CanSort`(기능 허용) · `HeaderSortMode`(클릭 동작) · `SortIcons`(아이콘 표시/클릭 위치)로 분리했다.

| v7 `HeaderSort` | v7 동작 | → v8 |
|---|---|---|
| `0` | 사용 안함 | `CanSort: 0` |
| `1` (기본) | Sort 기능 사용 | `CanSort: 1` — v8 기본값이라 **생략 가능** |
| `2` | Sort 아이콘만 표시(정렬 안 됨) | `HeaderSortMode: 2` (클릭 시 아이콘만 변경, 실제 소팅 안 함) |
| `3` | colSpan 아닌 헤더 셀만 Sort 사용 | ⚠️ **대응 단일 속성 없음.** 헤더 행/열 단위 `CanSort`를 개별 지정해 구현(`CanSort row` / `CanSort col`) |

`HeaderSortActionMode`는 **이 매핑과 무관하다** — v8에서도 이름 그대로 존재하며
클릭/Ctrl+클릭의 단일·다중 소팅 선택 옵션이다(v7 동명 속성과 대응).

**`UseDefaultSortImage` → `SortIcons`** 는 올바른 매핑이지만 타입이 확장된다:
v7 boolean(0=사용 안함(기본) / 1=사용) → v8 number 0~3. `UseDefaultSortImage: 1` → `SortIcons: 1`,
`0` → `SortIcons: 0`(아이콘 숨김, 셀 클릭으로 정렬)으로 옮기면 의미가 유지된다.

```js
// IBSheet7
Cfg: {
  HeaderSort: 2,            // 아이콘만 표시, 실제 정렬 안 함
  UseDefaultSortImage: 1
}

// IBSheet8
Cfg: {
  CanSort: 1,
  HeaderSortMode: 2,        // HeaderSort:2 → 아이콘만 변경
  SortIcons: 1              // UseDefaultSortImage:1 → 아이콘 표시
}
```

---

## 추가 Cfg 속성

위 Cfg 대조표에 없던 항목이다. 대부분 IBSheet8에서 제거되거나 렌더링 방식 변경으로 불필요해진 것들이다.

> 아래 표의 타깃 이름은 **IBSheet8 매뉴얼 개별 페이지로 검증**했다.
> `✅` = 매뉴얼에 해당 속성/함수/이벤트가 존재함 확인 · `⚠️` = 매뉴얼에서 확인되지 않음(적용 전 검증 필요)
> `❌` = 대응 없음. **`⚠️`는 그대로 쓰지 말고 매뉴얼·실제 동작으로 확인한 뒤 적용한다.**
> 값 정의·레벨까지 검증한 것은 아니므로, 위쪽 본 대조표의 항목보다 신뢰도가 낮다.

| IBSheet7 | IBSheet8 | 검증 | 비고 |
|---|---|---|---|
| `ChildGrid` | ❌ 대응 없음 | ❌ | 미지원 |
| `ChildPage` | ❌ 대응 없음 | ❌ | 미지원 렌더링 방식 변경 |
| `ClearFilterOff` | `(Cfg)ClearFilterOff` | ✅ |  |
| `ClearRowBackColorUID` | ❌ 대응 없음 | ❌ | 미지원 |
| `ColPage` | `(cfg) ColPage` + `(cfg) ColPageLength` | ⚠️ | **동명이지만 값의 의미가 다르다 — 하나가 둘로 갈린다.** v7 `ColPage`는 **한번에 표시할 컬럼의 개수**(`SetConfig`, default 사용안함)이고, v8 `ColPage`는 **컬럼 가상 렌더링 사용 여부**다. 개수는 `ColPageLength` 로 옮긴다 → `ColPage:5` ⇒ `ColPage:1` + `ColPageLength:5`. ★v8 제약: `SearchMode:0`·`2` 에서만 쓸 수 있고 **Merge 와 함께 쓸 수 없다**. 이전에 "미지원"으로 적혀 있었다 — 2026-08-04 정정 |
| `DataRowMerge` | `(cfg) DataMerge` | ⚠️ | v7 은 **가로(좌우) 병합 허용** 여부(default `0`)인데, v8 은 가로·열 병합이 `DataMerge` **하나로 합쳐져 있다**(`props/cfg/data-merge.md`). ★그래서 `MergeSheet` 매핑이 정한 `DataMerge` 값과 **충돌한다** — 어느 쪽이 맞는지 화면을 보고 정해야 하고 자동 변환하지 않는다. v8 은 행의 `RowMerge` default 가 `1` 이라 `DataMerge` 를 켜면 모든 행이 병합된다(뺄 행은 `RowMerge:0`). 생성 후 변경은 `setAutoMerge()` 의 `dataMerge` 인자 |
| `CookieInfoSave` | ❌ 대응 없음 | ❌ | 미지원 쿠키 사용 X |
| `DragRowSection` | ❌ 대응 없음 | ❌ | 미지원 |
| `FastRender` | ❌ 대응 없음 | ❌ | 미지원 |
| `FilterOperator` | ❌ 대응 없음 | ❌ | 미지원 |
| `FrozenColRight` | `RightCols` (초기화 구조 최상위 키) | ✅ | Cfg가 아니라 **초기화 옵션 최상위**에 `LeftCols`/`RightCols` 배열로 선언한다(벤더 초기화 구조 문서). 생성 후 변경은 `setFixedCols()`·`setFixedRight()` |
| `InvalidInputCallBack` | `onResultMask` 이벤트 | ✅ | 마스크 검사 결과 콜백은 `onResultMask`(`events/on-result-mask.md`)로 대체 |
| `NoFocusMode` | `(Def Row,Def Col)CanFocus` | ✅ |  |
| `SeqColMerge` | ❌ 대응 없음 | ❌ | 미지원 |
| `SizeMode` | `(Cfg)NoVScroll, NoHScroll` | ✅ |  |
| `SPage` | ❌ 대응 없음 | ❌ | 미지원 |
| `TabStop` | `(Cfg)TabStop` | ✅ |  |
| `TableCaption` | ❌ 대응 없음 | ❌ | 미지원 |
| `TableSummary` | ❌ 대응 없음 | ❌ | 미지원 |
| `UseChildGrid` | ❌ 대응 없음 | ❌ | 미지원 |
| `UseHiddenFilter` | `setFilter()` 메서드 | ✅ | 필터행 표시와 무관하게 필터를 걸 수 있다(`funcs/core/set-filter.md`) → IBSheet7 의 숨은 필터 용도를 대체 |
| `VscrollMode` | ❌ 대응 없음 | ❌ | 미지원 |


---

## 추가 Col 속성

IBSheet7 `InitColumns` 인자 중 위 Col 대조표에 없던 항목이다.

> 아래 표의 타깃 이름은 **IBSheet8 매뉴얼 개별 페이지로 검증**했다.
> `✅` = 매뉴얼에 해당 속성/함수/이벤트가 존재함 확인 · `⚠️` = 매뉴얼에서 확인되지 않음(적용 전 검증 필요)
> `❌` = 대응 없음. **`⚠️`는 그대로 쓰지 말고 매뉴얼·실제 동작으로 확인한 뒤 적용한다.**
> 값 정의·레벨까지 검증한 것은 아니므로, 위쪽 본 대조표의 항목보다 신뢰도가 낮다.

| IBSheet7 | IBSheet8 | 검증 | 비고 |
|---|---|---|---|
| `AcceptKeys` | `(Col)EditMask` | ✅ | 입력 허용 문자를 정규식으로 옮긴다(`props/col/edit-mask.md`) |
| `AllowNull` | `(Col)CanEmpty` | ✅ | v7 "숫자계열 컬럼에 빈값 허용 여부"(`funcs/init/InitColumns.md`) = v8 `Int`·`Float`·`Bool`·`Date` 에서 빈값 표시 허용(`props/col/can-empty.md`). `CanEmpty:0` 이면 값을 지울 수 없다 |
| `ApproximateType` | `(cfg/col/cell)DecimalAdjust` | ✅ | xlsx 는 `ko.js` 전역 설정만 가능하다고 안내하지만, **v8 에 `DecimalAdjust` 속성이 Cfg·Col·Cell 레벨로 존재**한다(`props/cfg/decimal-adjust.md`) → 컬럼별 지정 가능 |
| `ButtonUrl` | `(Col)Button` | ✅ |  |
| `CalcLogic` | `(Col)Formula` | ✅ |  |
| `Chart` | ❌ 대응 없음 | ❌ | 미지원 Html 타입으로 SVG차트 표현 |
| `CheckSaveName` | `doSave`/`getSaveString` 의 `saveAttr` 인자 | ✅ | `saveAttr:"<tree컬럼명>Checked"` 로 지정하면 그 이름으로 전송된다(`funcs/core/do-save.md`) |
| `ClassName` | `(Col)Class` | ✅ |  |
| `ColSpan` | `(Col)RecordColSpan` | ✅ |  |
| `ComboDisalbed` | ❌ 대응 없음 | ❌ | 미지원 |
| `ComboFilter` | `(Col)Defaults` | ✅ |  |
| `CopyFormat` | ❌ 대응 없음 | ❌ | 미지원 숫자형은 포멧 없이 복사됨 |
| `CopyPaste` | `(Col)CanCopyPaste` | ✅ |  |
| `CustomDate` | ❌ 대응 없음 | ❌ | 미지원 |
| `DefaultValue` | `(Col)DefaultValue` | ✅ |  |
| `Edit` | `(Col)CanEdit` | ✅ | v7 "편집가능 여부"(`funcs/init/InitColumns.md`) = v8 `props/col/can-edit.md`. ★v8 은 우선순위가 `Cell` > `Row` > `Col` 이고 default 가 `1` 이다 |
| `EditLen` | `(Col)Size` | ✅ | v7 "편집 시 입력 최대 허용 길이"(`funcs/init/InitColumns.md`) = v8 "열에 입력가능한 글자수"(`props/col/size.md`). ★`cfg.UnicodeByteMode` 를 켜면 v8 은 한글을 **바이트로** 계산하므로 기준이 달라진다 |
| `EditPointCount` | `(Col)EditMask` | ✅ | **정정** — 이전에는 "대응 없음"으로 적었다. 편집 시 소수점 **입력 제한**은 `EditMask` 정규식으로 처리한다(`props/col/edit-mask.md`). 예 `{Type:"Float", EditMask:"^-?\d*(\.\d{0,2})?$"}` = 소수점 2자리까지. 표시 자리수는 `Format` (→ `PointCount` 행) |
| `EmptyToReplaceChar` | `(Col)CanEmpty` | ✅ |  |
| `ExceptKeys` | `(Col)EditMask` | ✅ | 입력 **제외** 문자는 정규식 부정 클래스로 옮긴다(`props/col/edit-mask.md`) |
| `ExcludeEmpty` | `(col) ExcludeEmpty` | ✅ | **동명·동일 의미.** v7 은 `InitColumns` 의 컬럼 속성(`AutoSum` 타입·소계행 평균 계산 시 빈 값 제외), v8 은 `col` 속성으로 합계·소계/누계행의 평균·건수 계산에서 `0`/빈 값 포함 여부를 정한다. 이전에 "미지원"으로 적혀 있었다 — 2026-08-04 정정 |
| `FullInput` | ❌ 대응 없음 | ❌ | 미지원 |
| `GroupSumType` | `(Col)GroupSubTotal` | ✅ |  |
| `HoverUnderline` | `(Col)Class` | ✅ |  |
| `ImgAlign` | ❌ 대응 없음 | ❌ | 미지원 |
| `KeyField` | `(Col)Required` | ✅ | v7 "필수 입력 여부"(`funcs/init/InitColumns.md`) = v8 "데이터의 필수 입력 항목 여부"(`props/col/required.md`). 짝 속성 `KeyFieldPosition`→`RequiredPosition` 은 이미 있었는데 **이 속성 자체가 빠져 있었다**(2026-08-05 실제 고객 화면에서 발견). 표시 위치는 `RequiredPosition` |
| `ImgHeight` | ❌ 대응 없음 | ❌ | 미지원 조회 데이터에 포함시켜야 함 |
| `ImgWidth` | ❌ 대응 없음 | ❌ | 미지원 조회 데이터에 포함시켜야 함 |
| `InputCaseSensitive` | ❌ 대응 없음 | ❌ | 미지원 |
| `ItemCode` | `(Col)EnumKeys` | ✅ |  |
| `ItemText` | `(Col)Enum` | ✅ |  |
| `LevelSaveName` | 저장 함수의 `useLevel` + locale `TreeLevelName` | ⚠️ | ★**컬럼 속성이 아니다.** `getSaveJson`/`getSaveString`/`doSave` 의 `useLevel`(default `1`)로 각 행에 레벨 값이 함께 실려 나가고, **키 이름은 우리가 정하지 않고 locale 파일의 `TreeLevelName` 값**이 된다. ★**값을 가정하지 말고 고객이 쓰는 배포본의 locale 파일을 열어 확인한다** — 배포본마다 다르다. 원래 값이 `"tLELVEL"`(오타)이었고 벤더가 수정본을 배포해 `"tLEVEL"` 이 됐는데(2026-08-14), **현장에는 옛 배포본이 아직 남아 있어 두 값이 공존한다.** 서버가 받는 이름이라 어긋나면 값을 못 받는다. 바꾸려면 locale 파일의 그 키를 고친다. ★★**`saveMode:0` 으로 추출할 때만 실제 레벨/계층이 나오고, 다른 `saveMode` 에서는 값이 전부 `1`** 이 된다 — v7 처럼 임의 이름으로 레벨을 받던 서버는 **이름과 조건이 모두 달라지므로** 서버 쪽과 함께 확인한다. (`funcs/core/get-save-json.md`·`do-save.md` 의 `useLevel`, 벤더 확인 2026-08-14) |
| `MaxCheck` | `(Col)Range` + `onBeforeChange` | ⚠️ | 단일 대응 속성 없음. `Range`(`props/col/range.md`)로 범위를 두고 `onBeforeChange`(`events/on-before-change.md`)에서 선택 개수를 제어한다 |
| `MenuFilter` | `Def.Filter.<컬럼>.MenuItems` | ✅ | 필터 셀의 `MenuItems` 속성으로 지정(`props/cell/menu-items.md`). 예 `Def:{Filter:{colName:{MenuItems:"0,1,2"}}}` |
| `MinLen` | JSON 이벤트 `onChange` 에서 구현 | ⚠️ | 대응 속성 없음. `props/event/on-change.md` 의 JSON 이벤트에서 길이를 검사한다 |
| `MinWidth` | `(Col)MinWidth` | ✅ |  |
| `MultiLineText` | `Type:"Lines"` | ✅ | 여러 줄 입력은 `Lines` 타입 사용. 행 높이가 가변이면 `Cfg.AutoRowHeight` 동반 필요 |
| `NumberSort` | `(Col)NumberSort` | ✅ |  |
| `PhoneMask` | `(Col)CustomFormat` | ✅ |  |
| `PointCount` | `(Col)Format` | ✅ | 소수점 자리수는 `Format` 패턴으로 지정(예 `#,##0.00`) |
| `PopupCode` | `(Col)Menu` | ✅ |  |
| `PopupText` | `(Col)Menu` | ✅ |  |
| `RadioIcon` | `BoolIcon` | ✅ |  |
| `RowSpan` | `RecordRowSpan` | ✅ |  |
| `StaticPassword` | ❌ 대응 없음 | ❌ | 미지원 |
| `SumType` | `(Col)FormulaRow` | ✅ |  |
| `TreeCol` | `(Cfg)MainCol` | ✅ |  |
| `ZeroToReplaceChar` | ❌ 대응 없음 | ❌ | 미지원 Format에서 설정 가능 |

---

## 추가 컬럼 Type 대응

위 타입 치환 규칙에 없던 항목이다.

> 아래 표의 타깃 이름은 **IBSheet8 매뉴얼 개별 페이지로 검증**했다.
> `✅` = 매뉴얼에 해당 속성/함수/이벤트가 존재함 확인 · `⚠️` = 매뉴얼에서 확인되지 않음(적용 전 검증 필요)
> `❌` = 대응 없음. **`⚠️`는 그대로 쓰지 말고 매뉴얼·실제 동작으로 확인한 뒤 적용한다.**
> 값 정의·레벨까지 검증한 것은 아니므로, 위쪽 본 대조표의 항목보다 신뢰도가 낮다.

| IBSheet7 | IBSheet8 | 검증 | 비고 |
|---|---|---|---|
| `DummyCheck` | `Bool` | ✅ | (Col)NoChanged:1 사용 |
| `Radio` | `Radio` | ✅ | (Col) HRadio:0 을 설정해야 컬럼 내에서 1개만 선택 가능해 짐 |
| `Pass` | `Pass` | ✅ |  |

---

## Format 대응 (IBSheet7 Format 키워드 → IBSheet8)

> **`CustomFormat` 제약:** `Type` 이 `Text` 또는 `Lines` 인 열에서만 쓸 수 있다.
> 예약어는 `#`(그대로) · `*`(마스킹) · `PostNo` · `IdNo` · `IdNoMask` · `SaupNo` · `CardNo` · `PhoneNo` 이며
> `|` 로 여러 개를 지정하거나 사용자 정의 함수를 넘길 수 있다. 근거 `props/col/custom-format.md`.


IBSheet7은 `Format:"Ymd"` 처럼 키워드를 썼지만 IBSheet8은 **`Extend:IB_Preset.*` 프리셋**을 쓰거나
패턴 문자열을 직접 지정한다.

> **★ v7 `Format` 이 전부 v8 `Format` 으로 옮겨지는 것은 아니다** (벤더 확인 2026-08-11).
>
> - **숫자형은 `Type` 만으로 기본 포맷이 자동 적용**된다 — `Int` → `#,##0`,
>   `Float` → `#,##0.######` (근거: v8 `appx/format.md` 「기본 포맷」).
>   **그 형식이면 `Format` 을 적지 않아도 된다.** v7 의 `Integer`·`Float` 계열 지정은
>   대개 옮길 필요가 없다 — 자리수·통화 등 **기본과 다를 때만** `Format:"#,##0.00"` 처럼 쓴다.
> - **★`Null` 이 붙은 프리셋(`NullInteger`·`NullFloat`)은 `CanEmpty:1` 이 함께 설정돼야 한다.**
>   `CanEmpty:0` 인 열은 값을 지우거나 빈 값으로 둘 수 없다
>   (근거: v8 `props/col/can-empty.md`). 빈 값을 그대로 보여줘야 하는 열이라면
>   프리셋만 바꾸고 `CanEmpty` 를 빠뜨리면 **v7 과 다르게 0 이 채워져 보인다.**

> **★ `IB_Preset` 은 `plugins/ibsheet-common.js` 에 정의된 전역 객체(`window.IB_Preset`)다.**
> IBSheet8 본체(`ibsheet.js`)에는 없으므로, 프리셋을 쓰려면 **`ibsheet-common.js` 를 함께 로드**해야 한다.
> 근거: 배포본 `plugins/ibsheet-common.js` 의 `window.IB_Preset` 정의 + 벤더 확인.
> 매뉴얼 `appx/format.md` 에는 `YMD` 만 예시로 나와 있다.
>
> **★ 프리셋은 프로젝트에서 추가·수정할 수 있다**(벤더 확인) — `ibsheet-common.js` 안의 정의를
> 고치거나 항목을 더할 수 있다. 아래 27개는 **배포본 기본값**이므로, 사내 표준 포맷이 있으면
> 프리셋으로 추가해 쓰는 것이 낫다. 단 파일을 고쳤다면 **배포본 갱신 시 다시 반영**해야 한다.

날짜/시간 프리셋은 `Type:"Date"` 와 `Format`·`DataFormat`·`EditFormat`·`Size`·`EmptyValue` 를
한 묶음으로 제공한다. 그래서 프리셋을 쓰면 **서버 전송값 포맷(`DataFormat`)까지 함께 맞춰진다** —
`Format` 만 직접 지정하면 그 부분이 빠진다.

배포본 기본 프리셋(27개): 날짜/시간 `YMD` `YM` `MD` `HMS` `HM` `YMDHMS` `YMDHM` `MDY` `DMY` ·
숫자 `Integer` `NullInteger` `Float` `NullFloat` `Number` · 마스킹 `IdNo` `SaupNo` `PostNo` `CardNo` `PhoneNo` ·
기타 `Popup` `STATUS` `DelCheck` · 트리 집계 `TreeSumFormula` `TreeAvgFormula` `TreeCountFormula`
`TreeMaxFormula` `TreeMinFormula`

> **★ 매핑은 `ibsheet-common.js` 에 실제로 있는 프리셋에 대해서만 한다** (벤더 확인 2026-08-12).
>
> 근거를 매뉴얼이 아니라 **배포본 라이브러리**에 둔다.
>
> ★매뉴얼 예제에 나오는 프리셋이 곧 **배포본 목록은 아니다.** `props/col/extend.md`·
> `start/col.md` 의 `IB_Preset.USD`·`IB_Preset.REGD` 는 배포본에 없는데, 이는 문서 오류가
> 아니라 **"프로젝트가 쓰고 싶은 프리셋을 직접 추가해 쓸 수 있다"** 를 보여주는 예시다
> (벤더 확인 2026-08-12). 컬럼 속성 여러 개를 이름 하나로 묶어 두는 용법을 설명한 것이지,
> **일반적인 변환 대상이 아니다.** 예제를 그대로 따라 쓰면 정의하지 않은 프리셋을 걸게 된다.
>
> 그래서 **우리가 변환에서 권하는 프리셋은 배포본에 있는 것으로 한정**한다.
> 감사 도구 `preset_check.py` 가 우리가 안내하는 모든 `IB_Preset.*` 을 배포본과 대조한다.
> (고객 프로젝트가 자체 프리셋을 추가하는 것은 별개다 — 그건 권장 사항이지 변환 규칙이 아니다.)
>
> **★ v7 `Format` 키워드가 모두 프리셋으로 덮이는 것도 아니다.** 아래 표에 없는 키워드는
> 대응을 지어내지 말고 **그대로 두고 확인 대상으로 남긴다.**

> 아래 표의 타깃 이름은 **IBSheet8 매뉴얼 개별 페이지로 검증**했다.
> `✅` = 매뉴얼에 해당 속성/함수/이벤트가 존재함 확인 · `⚠️` = 매뉴얼에서 확인되지 않음(적용 전 검증 필요)
> `❌` = 대응 없음. **`⚠️`는 그대로 쓰지 말고 매뉴얼·실제 동작으로 확인한 뒤 적용한다.**
> 값 정의·레벨까지 검증한 것은 아니므로, 위쪽 본 대조표의 항목보다 신뢰도가 낮다.

| IBSheet7 | IBSheet8 | 검증 | 비고 |
|---|---|---|---|
| `Ymd` | `Extend:IB_Preset.YMD` | ✅ | 프리셋 사용 권장. `Type:"Date"`·`Format`·`DataFormat`·`EditFormat`·`Size`·`EmptyValue` 가 함께 들어 있다. 직접 지정하려면 `Format:"yyyy/MM/dd"` + `DataFormat:"yyyyMMdd"`(서버 전송값) |
| `Ym` | `Extend:IB_Preset.YM` | ✅ | 프리셋 사용 권장. `Type:"Date"`·`Format`·`DataFormat`·`EditFormat`·`Size`·`EmptyValue` 가 함께 들어 있다. 직접 지정하려면 `Format:"yyyy/MM"` + `DataFormat:"yyyyMM"`(서버 전송값) |
| `Md` | `Extend:IB_Preset.MD` | ✅ | 프리셋 사용 권장. `Type:"Date"`·`Format`·`DataFormat`·`EditFormat`·`Size`·`EmptyValue` 가 함께 들어 있다. 직접 지정하려면 `Format:"MM/dd"` + `DataFormat:"MMdd"`(서버 전송값) |
| `Hms` | `Extend:IB_Preset.HMS` | ✅ | 프리셋 사용 권장. `Type:"Date"`·`Format`·`DataFormat`·`EditFormat`·`Size`·`EmptyValue` 가 함께 들어 있다. 직접 지정하려면 `Format:"HH:mm:ss"` + `DataFormat:"HHmmss"`(서버 전송값) |
| `Hm` | `Extend:IB_Preset.HM` | ✅ | 프리셋 사용 권장. `Type:"Date"`·`Format`·`DataFormat`·`EditFormat`·`Size`·`EmptyValue` 가 함께 들어 있다. 직접 지정하려면 `Format:"HH:mm"` + `DataFormat:"HHmm"`(서버 전송값) |
| `YmdHms` | `Extend:IB_Preset.YMDHMS` | ✅ | 프리셋 사용 권장. `Type:"Date"`·`Format`·`DataFormat`·`EditFormat`·`Size`·`EmptyValue` 가 함께 들어 있다. 직접 지정하려면 `Format:"yyyy/MM/dd HH:mm:ss"` + `DataFormat:"yyyyMMddHHmmss"`(서버 전송값) |
| `YmdHm` | `Extend:IB_Preset.YMDHM` | ✅ | 프리셋 사용 권장. `Type:"Date"`·`Format`·`DataFormat`·`EditFormat`·`Size`·`EmptyValue` 가 함께 들어 있다. 직접 지정하려면 `Format:"yyyy/MM/dd HH:mm"` + `DataFormat:"yyyyMMddHHmm"`(서버 전송값) |
| `Integer` | **대개 생략 가능** (`Type:"Int"` 기본 포맷이 `#,##0`) | ✅ | ★`Type:"Int"` 면 v8 이 `#,##0` 을 자동 적용하므로 **`Format` 을 옮기지 않아도 된다**(벤더 확인 · `appx/format.md` 「기본 포맷」). 기본과 다른 형식일 때만 지정한다. 빈값을 표시해야 하면 `NullInteger` + `CanEmpty:1` |
| `Float` | **대개 생략 가능** (`Type:"Float"` 기본 포맷이 `#,##0.######`) | ✅ | `Integer` 와 같다. 프리셋 `IB_Preset.Float` 도 있으나(`Type`·`Align:"Right"`·`Format`·`Width:100`) 기본 포맷과 같은 값이라 **포맷 때문에 쓸 이유는 없다**. 빈값을 표시해야 하면 `NullFloat` + `CanEmpty:1` |
| `NullInteger` | `Extend:IB_Preset.NullInteger` (또는 `Format:"#,###"`) | ⚠️ | ★**`CanEmpty:1` 을 함께 설정해야 한다**(벤더 확인). **프리셋 자체에는 `CanEmpty` 가 없다** — 배포본 정의는 `Type`·`Align`·`Format:"#,###"`·`Width` 뿐이다(라이브러리 직접 확인). 프리셋만 걸고 넘어가면 `CanEmpty:0` 이라 빈 값으로 둘 수 없어 **0 이 채워져 보인다**(`props/col/can-empty.md`) |
| `NullFloat` | `Extend:IB_Preset.NullFloat` (또는 `Format:"#,###.##"`) | ⚠️ | ★**`CanEmpty:1` 을 함께 설정해야 한다**(벤더 확인) — 위 `NullInteger` 와 같고, 이 프리셋에도 `CanEmpty` 가 없다 |
| `IdNo` | `(Col)CustomFormat:"IdNo"` | ✅ | 예약어는 **`IdNo`**(전체 표시). 뒤 6자리를 마스킹하려면 **`IdNoMask`**. 근거 `props/col/custom-format.md` |
| `SaupNo` | `(Col)CustomFormat:"SaupNo"` | ✅ | 예약어 확인 (`props/col/custom-format.md`) |
| `PostNo` | `(Col)CustomFormat:"PostNo"` | ✅ | 예약어 확인 |
| `CardNo` | `(Col)CustomFormat:"CardNo"` | ✅ | 예약어 확인 |
| `PhoneNo` | `(Col)CustomFormat:"PhoneNo"` | ✅ | 예약어 확인. 휴대폰·안심번호 포함 |
| `Number` | `(Col)EditMask:"^\d*$"` | ✅ | ★**표시 서식이 아니라 입력 제한**이다. 고객 코드에서 `Type:"Text"` 컬럼에 붙여 **숫자만 입력**받고 있었다(헤더가 "숫자만입력"). v8 은 정규식을 받으며 `"^\d*$"` 가 매뉴얼에 **"숫자만 입력 가능"** 으로 명시돼 있다(`props/col/edit-mask.md`). 프리셋 `IB_Preset.Number` 는 **정의가 빈 객체(`{}`)** 라 걸어도 아무 설정이 안 들어간다 — 프리셋으로 옮기지 말 것. 숫자 **타입** 컬럼에 붙어 있다면 표시 의도일 수 있으니 그때만 `Type`·`Format` 을 확인한다 |

**표에 없는 v7 `Format` 키워드**는 대응을 지어내지 않는다. 실측에서 `email`·`Text` 처럼
프리셋도 예약어도 없는 값이 나온다 — v8 이 모르는 키워드는 **무시되어 서식이 사라진다.**
그대로 두지 말고 `Type`·`Format` 을 직접 지정하거나 벤더에 확인한다.

**실측** — v7 초기화가 있는 고객 화면 **5,019개**(코퍼스 3곳)에서 쓰인 `Format` 키워드 **20종**:

| 키워드 | 화면수 | | 키워드 | 화면수 | | 키워드 | 화면수 |
|---|---:|---|---|---:|---|---|---:|
| `Ymd` | **464** | | `PostNo` | 113 | | `Hms` | 26 |
| `Integer` | 317 | | `IdNo` | 79 | | `Number` | 7 |
| `NullFloat` | 190 | | `YmdHms` | 78 | | `YmdHm` | 5 |
| `Float` | **177** | | `Hm` | 69 | | `email` | 3 |
| `NullInteger` | 145 | | `Md` | 62 | | `ymd` | 2 |
| `CardNo` | 58 | | `Ym` | 32 | | `Text` | 1 |
| `PhoneNo` | 53 | | `SaupNo` | 27 | | | |

> 이 표를 만들면서 두 가지가 드러났다(2026-08-12) —
> **① `Float` 이 177개 화면에 쓰이는데 위 대조표에 없었다**(추가함).
> **②`ymd` 처럼 소문자로 쓴 화면이 있다.** v7 이 받아 줬다는 뜻이므로, 변환할 때
> 대소문자를 구분해 찾으면 놓친다.
> 값 문자열이 `yyyyMMdd`·`yyyyMM` 인 화면도 있다 — 이건 키워드가 아니라 패턴이라 그대로 둔다.
