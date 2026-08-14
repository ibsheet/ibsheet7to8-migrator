# IBSheet7 → IBSheet8 이벤트 바인딩 패턴

> 대응표 근거: IBSheet8 매뉴얼 `docs/ibsheet8-manual/` — 이벤트 대응은 벤더 마이그레이션 지침,
> 개별 이벤트의 실재·동작은 `events/*.md`.
> 아래 **★ 표시 항목은 이름만 바꾸면 동작이 달라진다.**
>
> **근거 우선순위:** 근거는 항상 **개별 이벤트 페이지**를 먼저 본다.
> 예전에 참고하던 벤더 마이그레이션 요약 부록은 **없어졌다**(2026-08-11 확인) —
> 그것만 근거였던 항목은 모두 개별 페이지로 다시 확인했다.
> **요약·부록은 낡거나 사라질 수 있다.**
> 예로 `OnBeforeDownload`→`onBeforeDownload`로 적혀 있지만 그 이벤트 페이지는 존재하지 않고
> 실제로는 `onBeforeExport`다. 부록과 개별 페이지가 어긋나면 **개별 `events/*.md`·`props/**/*.md`를 따른다.

---

## 이벤트 대응표 (공식)

| IBSheet7 | IBSheet8 | 주의 |
|---|---|---|
| `OnAfterEdit` | `onAfterEdit` | |
| `OnBeforeCheck` | `onBeforeChange` | ★CheckBox 전용 이벤트 없음 — 모든 타입 컬럼에서 발생 |
| `OnBeforeDownload` | **`onBeforeExport`** | 실제 이벤트는 `onBeforeExport` — 개별 페이지 `events/on-before-export.md` 로 확인. (예전 벤더 요약 부록은 `onBeforeDownload`로 적고 있었으나 **그 부록은 없어졌다**) |
| `OnBeforePaste` | `onBeforePaste` | |
| `OnButtonClick` | `onClick` / `onAfterClick` | ★Button 전용 이벤트 없음 — **컬럼 가드 필수** |
| `OnChange` | `onAfterChange` | ★`setValue()` 등 외부 함수 변경에서는 **발생 안 함** |
| `OnClick` | **`onAfterClick`** | ★v8 `onClick`은 **발생 시점이 더 앞섬** → `onAfterClick` 사용 |
| `OnDblClick` | `onDblClick` | |
| `OnDownFinish` | `onExportFinish` | 명칭 변경 |
| `OnKeyUp` / `OnKeyDown` | `onKeyUp` / `onKeyDown` | |
| `OnLoad` | `onRenderFirstFinish` | ★발생 시점 다름(최초 1회 발생만 동일) |
| `OnLoadData` | `onBeforeDataLoad` | 명칭 변경 |
| `OnLoadExcel` / `OnLoadText` | `onImportFinish` | 단일 이벤트로 통합 |
| `OnMouseDown/Up/Move` | `onMouseDown/Up/Move` | |
| `OnMovePage` | `onBeforeGoToPage` | 명칭 변경 |
| `OnRowSearchEnd` | `onRowLoad` | 명칭 변경 |
| `OnSaveEnd` | `onAfterSave` | ★v7=반영·렌더링 후 / v8=**서버 응답 직후** |
| `OnSearchEnd` | `onSearchFinish` + **`onBeforeDataLoad`/`onDataLoad`** | ★**이름만 바꾸면 오류 처리가 사라진다.** v8 `onSearchFinish` 는 **조회 실패 시 발생하지 않는다**(`events/on-search-finish.md`). v7 은 실패해도 발생해 `Code<0` 으로 오류를 처리했으므로 **오류 판정은 `onBeforeDataLoad`/`onDataLoad` 로 옮긴다** — 그 이벤트가 `result`(0 이상 정상 / 음수 오류)와 `message` 를 준다(`events/on-data-load.md`). 전제: **서버 응답에 `IO` 속성**이 있어야 `result`·`message` 가 전달된다(벤더 확인 2026-08-06). ★오류일 때 v8 이 **에러 메시지를 자동 표시**하므로 기존 `alert(Msg)` 는 중복 — 지울지 검토. 정상 조회 시 메시지 표시가 필요하면 `onDataLoad` 에서 직접 처리. 인자: `Response`→`evtParam.response` / `Code`·`Msg`→`result`·`message`(위 이벤트 쪽) / `StCode`·`StMsg` 는 대응 없음 |
| `OnSelectCell` | `onFocus` | 명칭 변경 |
| `OnSelectMenu` | `onSelectMenu` | |
| `OnSort` | `onAfterSort` | 명칭 변경 |
| `OnHScroll` / `OnVScroll` | `onScroll` | 단일 이벤트로 통합 |

`OnBeforeEdit` → `onStartEdit`, `OnBeforeSave` → `onBeforeSave`는 공식 표에는 없으나
v8에 해당 이벤트가 존재한다(`events/on-start-edit.md`, `events/on-before-save.md`).

---

## 핵심 변경사항

IBSheet7은 전역 함수 명명 규칙 방식, IBSheet8은 **Events 객체** 또는 **bind() 메서드** 방식 사용.

---

## 패턴 1: 전역함수 → Events 객체로 변환

```js
// ❌ IBSheet7 — 전역 함수 명명 규칙: {sheetId}_{EventName}
function sheet_OnLoad()               { sheet.DoSearch(); }
function sheet_OnClick(row, col, val) { console.log(val); }
function sheet_OnChange(row, col, val){ console.log("변경:", val); }
function sheet_OnSelectCell(row, col) { console.log("선택:", col); }

// ✅ IBSheet8 — Events 객체에 camelCase 이벤트명 사용
var OPT = {
  ...,
  Events: {
    onRenderFirstFinish: function(evtParam) {
      evtParam.sheet.doSearch();
    },
    onClick: function(evtParam) {
      console.log(evtParam.val);
    },
    onAfterChange: function(evtParam) {
      console.log("변경:", evtParam.val);
    },
    onFocus: function(evtParam) {
      console.log("선택:", evtParam.col);
    }
  }
};
```

---

## 패턴 2: 외부 bind() 방식

```js
// ✅ IBSheet8 — 외부에서 이벤트 등록/해제
sheet.bind("onClick", function(evtParam) {
  console.log(evtParam.val);
});

// 이벤트 해제
sheet.unbind("onClick");

// 특정 핸들러만 해제
var handler = function(evtParam) { ... };
sheet.bind("onClick", handler);
sheet.unbind("onClick", handler);
```

---

## 패턴 3: evtParam 파라미터 구조

IBSheet8의 모든 이벤트 핸들러는 단일 `evtParam` 객체를 받는다.

```js
// IBSheet7 — 이벤트마다 파라미터 시그니처가 다름
function sheet_OnClick(row, col, value) { ... }
function sheet_OnChange(row, col, value, oldValue) { ... }
function sheet_OnBeforeEdit(row, col) { ... }

// IBSheet8 — 공통 evtParam 객체 + 이벤트별 추가 속성
Events: {
  onClick: function(evtParam) {
    var sheet  = evtParam.sheet;   // 시트 객체
    var row    = evtParam.row;     // 행 객체
    var col    = evtParam.col;     // 컬럼명 (문자열)
    var val    = evtParam.val;     // 현재 셀 값
  },
  onAfterChange: function(evtParam) {
    var sheet  = evtParam.sheet;
    var row    = evtParam.row;
    var col    = evtParam.col;
    var val    = evtParam.val;     // 변경된 값
    var oldVal = evtParam.oldVal;  // 이전 값
  },
  onBeforeSave: function(evtParam) {
    // return false 시 저장 취소
    if (!confirm("저장하시겠습니까?")) return false;
  },
  onStartEdit: function(evtParam) {
    // return false 시 편집 취소
    var row = evtParam.row;
    var col = evtParam.col;
  }
}
```

---

## 패턴 4: 이벤트에서 return 처리

```js
// ❌ IBSheet7
function sheet_OnBeforeEdit(row, col) {
  if (col === "readOnly") return false;  // 편집 취소
}

// ✅ IBSheet8 — 동일하게 return false 사용
Events: {
  onStartEdit: function(evtParam) {
    if (evtParam.col === "readOnly") return false;
  }
}
```

---

## 패턴 5: 자주 변환되는 이벤트 패턴

### OnChange → onAfterChange (가장 흔한 변환)

```js
// ❌ IBSheet7
function sheet_OnChange(row, col, value) {
  if (col === "qty" || col === "price") {
    var qty   = sheet.CellValue(row, "qty");
    var price = sheet.CellValue(row, "price");
    sheet.SetCellValue(row, "amount", qty * price);
  }
}

// ✅ IBSheet8
onAfterChange: function(evtParam) {
  var sheet = evtParam.sheet;
  var row   = evtParam.row;
  var col   = evtParam.col;
  if (col === "qty" || col === "price") {
    var qty   = sheet.getValue2(row, "qty");
    var price = sheet.getValue2(row, "price");
    // ★변경 핸들러 안에서의 파생값 쓰기는 공식 setValue를 쓴다 (아래 주의 참고)
    sheet.setValue(row, "amount", qty * price);
  }
}
```

> **★ v8 `onAfterChange`는 `setValue()` 같은 외부 함수를 통한 변경에서는 발생하지 않는다**
> (벤더 지침: 벤더 마이그레이션 지침). IBSheet7 `OnChange`는 발생했다.
> 이것이 브릿지 `setValue2`가 `onAfterChange`를 강제 호출하는 이유다 — v7의 "값을 바꾸면 통지된다"는
> 전제에 의존하는 코드가 조용히 죽는 것을 막는다.

> **★ 변경 핸들러 안에서는 `setValue2`를 쓰지 않는다.** `setValue2`는 `IBSheet.OnAfterValueChanged`를 강제 호출하므로, 값 변경 핸들러 안에서 파생 컬럼을 쓰면 변경 통지가 연쇄될 수 있다. 핸들러 내부의 파생값 계산은 공식 `setValue`(또는 `setValue2(..., 0)`)를 쓴다.
> 읽기는 `getValue2`로 통일해도 안전하다.

### OnSelectCell → onFocus

```js
// ❌ IBSheet7
function sheet_OnSelectCell(row, col) {
  var val = sheet.CellValue(row, col);
  document.getElementById("display").innerText = val;
}

// ✅ IBSheet8
onFocus: function(evtParam) {
  var val = evtParam.sheet.getValue2(evtParam.row, evtParam.col);
  document.getElementById("display").innerText = val;
}
```

### OnLoad → onRenderFirstFinish

```js
// ❌ IBSheet7
function sheet_OnLoad() {
  sheet.DoSearch();
}

// ✅ IBSheet8
onRenderFirstFinish: function(evtParam) {
  evtParam.sheet.doSearch();
}
```

### OnBeforeSave → onBeforeSave

```js
// ❌ IBSheet7
function sheet_OnBeforeSave(save_str) {
  if (sheet.GetDataRows("I").length === 0 &&
      sheet.GetDataRows("U").length === 0 &&
      sheet.GetDataRows("D").length === 0) {
    alert("변경된 데이터가 없습니다.");
    return false;
  }
}

// ✅ IBSheet8
onBeforeSave: function(evtParam) {
  var sheet = evtParam.sheet;
  if (sheet.getDataRows("I").length === 0 &&
      sheet.getDataRows("U").length === 0 &&
      sheet.getDataRows("D").length === 0) {
    alert("변경된 데이터가 없습니다.");
    return false;
  }
}
```

### OnClick → **onAfterClick** (★`onClick`이 아니다)

> **벤더 지침:** IBSheet8의 `onClick`은 IBSheet7의 동명 이벤트보다 **발생 시점이 앞선다.**
> 그래서 마이그레이션에는 **`onAfterClick`을 사용해야 한다.**
> (근거: IBSheet8 매뉴얼 벤더 마이그레이션 지침 이벤트 대응표)
>
> `onClick`으로 옮기면 에러 없이 동작하지만 **클릭 처리 시점이 당겨져** 셀 값·포커스가
> 아직 확정되지 않은 상태에서 핸들러가 돌 수 있다.

```js
// ❌ IBSheet7
function sheet_OnClick(row, col, value) {
  if (col === "btnDetail") {
    openDetailPopup(sheet.CellValue(row, "id"));
  }
}

// ✅ IBSheet8 — onAfterClick
onAfterClick: function(evtParam) {
  var sheet = evtParam.sheet;
  if (evtParam.col === "btnDetail") {
    openDetailPopup(sheet.getValue2(evtParam.row, "id"));
  }
}
```

### OnButtonClick → onClick / onAfterClick (★컬럼 가드 필수)

IBSheet8에는 **`Button` 타입에서만 발생하는 이벤트가 없다.** 클릭 이벤트가 **모든 타입의 컬럼에서**
발생하므로, IBSheet7에서 "버튼만 눌린다"는 전제로 짠 핸들러는 **일반 셀 클릭에도 실행된다.**

```js
// ❌ IBSheet7 — Button 컬럼에서만 발생하므로 가드가 없어도 됐다
function sheet_OnButtonClick(row, col) {
  openPopup(sheet.CellValue(row, "id"));
}

// ✅ IBSheet8 — 반드시 컬럼(또는 Type)으로 가드
onAfterClick: function(evtParam) {
  if (evtParam.col !== "btnDetail") return;   // ★없으면 모든 셀 클릭에 반응
  openPopup(evtParam.sheet.getValue2(evtParam.row, "id"));
}
```

> 버튼 안의 특정 영역만 잡아야 하면 JSON 이벤트 `onClickSide`(`props/event/on-click-side`)도 쓸 수 있다.

### OnSaveEnd → onAfterSave (★발생 시점 차이)

| | 발생 시점 |
|---|---|
| IBSheet7 `OnSaveEnd` | 저장 후 **데이터 반영·렌더링까지 끝난** 상태 |
| IBSheet8 `onAfterSave` | 저장 데이터를 **서버에서 전송받은 직후** |

핸들러에서 저장 결과가 화면에 반영됐다고 가정하고 행을 다시 읽거나 렌더링 상태에 의존하는 코드가
있으면 **그 전제가 깨진다.** 반영 후 처리가 필요하면 렌더링 완료 계열 이벤트로 옮기거나
`applySaveResult()` 이후로 미룬다.

---

## 추가 이벤트 대응

본 대응표에 없던 IBSheet7 이벤트들이다.

> 아래 표의 타깃 이름은 **IBSheet8 매뉴얼 개별 페이지로 검증**했다.
> `✅` = 매뉴얼에 해당 속성/함수/이벤트가 존재함 확인 · `⚠️` = 매뉴얼에서 확인되지 않음(적용 전 검증 필요)
> `❌` = 대응 없음. **`⚠️`는 그대로 쓰지 말고 매뉴얼·실제 동작으로 확인한 뒤 적용한다.**
> 값 정의·레벨까지 검증한 것은 아니므로, 위쪽 본 대조표의 항목보다 신뢰도가 낮다.

| IBSheet7 | IBSheet8 | 검증 | 비고 |
|---|---|---|---|
| `OnAfterColumnMove` | `onAfterColMove` | ✅ |  |
| `OnAfterPaste` | `onAfterPaste` | ✅ |  |
| `OnAfterExpand` | `onAfterExpand` | ✅ |  |
| `OnBeforeCheckAll` | `onBeforeCheckAll` | ✅ |  |
| `OnBeforeExpand` | `onBeforeExpand` | ✅ |  |
| `OnBeforeMovePage` | `onBeforeGoToPage` | ✅ |  |
| `OnBeforeSearch` | `onSearchStart` | ✅ |  |
| `OnBeforeSort` | `onBeforeSort` | ✅ |  |
| `OnBeforeTab` | `onKeyDown` | ✅ | function mySheet_OnBeforeTab(row,col,orow,ocol) {    // AAA열의 값이 1000보다 큰 경우, tab키를 통한 이동을 막음    if(mySheet.ColSaveName(ocol) == 'AAA' && mySheet.GetCellValue(orow,ocol)  |
| `OnCellDropEnd` | `onEndDragCell` | ✅ |  |
| `OnChangeFilter` | `onAfterFilter` | ✅ |  |
| `OnChangeSum` | ❌ 대응 없음 | ❌ | 미지원 지원안함 |
| `OnCheckAllEnd` | `onCheckAllFinish` | ✅ |  |
| `OnColumnSort` | `onAfterSort` | ✅ |  |
| `OnDragStart` | `onStartDrag` | ✅ |  |
| `OnDropEnd` | `onEndDrag` | ✅ |  |
| `OnEditValidation` | `onBeforeChange` | ✅ | function mySheet_OnEditValidation(Row, Col, Value) {    // QT열의 값이 "현행"인 경우 ITEM_CD 열의 값을 수정시 수정 불가    if(mySheet.ColSaveName(Col)=="ITMS_CD"){      if(mySheet.GetCellVal |
| `OnFilterEnd` | `onAfterFilter` | ✅ |  |
| `OnGroupFinish` | `onAfterGroup` | ✅ |  |
| `OnGroupStart` | `onBeforeGroup` | ✅ |  |
| `OnLoadFileSelect` | `onSelectFile` | ✅ |  |
| `OnMessage` | `onShowMessage` | ✅ |  |
| `OnMouseMove` | `onMouseMove` | ✅ |  |
| `OnMouseUp` | `onMouseUp` | ✅ |  |
| `OnPopupClick` | `onButtonClick` | ✅ |  |
| `OnResize` | `onResize` | ✅ |  |
| `OnRowDelete` | ❌ 대응 없음 | ❌ | 미지원 지원안함 |
| `OnSelectEnd` | `onSelectEnd` | ✅ |  |
| `OnTreeCheckChange` | `(JSON)OnClickSide` | ✅ | // 체크 한 행의 자식행이 있는 경우 자식행에 값을 변경  function mySheet_OnTreeCheckChange(row, col, value, level, hasChild) {    var childRows = [];    // 자식행이 있는 경우    if (hasChild) {      / |
| `OnUserResize` | `onAfterColResize` | ✅ |  |
| `OnValidation` | `onBeforeSave` | ✅ |  |
| `OnBeforeColumnMove` | `onBeforeColMove` | ✅ | 컬럼 이동 시작 시점. v7 은 마우스 드래그와 `MoveColumnPos()` 호출 모두에서 발생했다. 인자는 `evt.col`·`evt.toCol` |
| `OnSmartResize` | `onResize` | ⚠️ | **발생 시점이 다르다.** v7 `OnSmartResize` 는 크기 변경이 멈춘 뒤(300ms 무변경) 한 번 발생하는 디바운스 이벤트인데, v8 `onResize` 는 그런 보장이 없다. 무거운 작업을 넣었다면 **직접 디바운스**를 걸 것. 인자는 `evt.Width`·`evt.Height` |
| `OnTreeChild` | `onBeforeExpand` | ⚠️ | v7 은 **자식을 아직 조회하지 않은 부모 노드를 펼칠 때만** 발생했다(지연 로딩 트리거). v8 `onBeforeExpand` 는 펼침 시 항상 발생하므로 **"자식이 없는 경우"를 직접 판별**해야 한다. 인자는 `evt.row` |
| `OnPageRequest` | ❌ 대응 없음 | ❌ | 서버 페이징에서 스크롤로 새 페이지를 서버에 요청할 때 발생. v8 은 `doSearchPaging()` 흐름으로 처리한다 |
| `OnTab` | ❌ 대응 없음 | ❌ | 탭 키 입력 이벤트. v8 은 `onKeyDown` 에서 키를 판별해 처리한다 |
| `OnWaitTimeOut` | ❌ 대응 없음 | ❌ | 서버 처리 시간 초과로 중단된 경우 발생. v8 은 ajax 타임아웃을 호출 측에서 다룬다 |
| `OnDebugMsg` | ❌ 대응 없음 | ❌ | 내부 디버깅 메시지 이벤트 |
| `OnDecryption` | ❌ 대응 없음 | ❌ | 조회 데이터를 셀에 넣기 전 가공·복호화용. **v8 은 `onDataLoad`/`onBeforeDataLoad` 에서 같은 목적을 처리**한다 |
| `OnEncryption` | ❌ 대응 없음 | ❌ | 저장 QueryString 을 만들 때 암호화·값 변경용. **v8 은 `onSave`/`onBeforeSave` 에서 처리**한다 |
| `OnExportEncryption` | ❌ 대응 없음 | ❌ | 엑셀·텍스트 내보낼 때 셀 데이터 수집 시점. **v8 은 `(cell) ExportValue` 속성으로 내보낼 값을 지정**한다 |
