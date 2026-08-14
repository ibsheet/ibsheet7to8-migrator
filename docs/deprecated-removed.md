# IBSheet7 미지원/삭제 API 목록

Claude가 아래 항목을 만나면 **자동변환하지 않고** TODO 주석을 삽입한다.

---

## TODO 주석 삽입 형식

```js
// TODO [IBSheet8-Migration]: IBSheet7의 '{API명}'은(는) IBSheet8에서 미지원.
// 대안: {대안 설명 또는 '수동 구현 필요'}
// 원본: {원본 코드}
```

---

## ❌ 미지원 메서드 (자동변환 불가)

| IBSheet7 API | 대안 |
|-------------|------|
| `AutoRowHeight` | ❌ 삭제 아님 — v8 에도 **동명 `(cfg) AutoRowHeight`** 가 있다. `property-mapping.md` 참고(★default 반대) |
| `CheckReverse` | 직접 반복문으로 체크/언체크 구현 |
| `ComputeSum` | **표준 헬퍼 `computeSum(col, startRow, endRow, isFullSum)`** (`helpers/ibsheet-migration.js`). 또는 `FormulaRow` 사용 |
| `DoRowSearch` | 미지원. doSearch 또는 클라이언트 필터링으로 대체 |
| `DoSearchChild` | 미지원. loadSearchChildData 방식 검토 |
| `EditArrowBehavior` | 미지원. 키보드 이벤트 onKeyDown에서 직접 처리 |
| `EditTabBehavior` | 미지원 |
| `Ellipsis` | CSS `text-overflow: ellipsis` 직접 적용 |
| `FitSize` | 미지원. 개별 컬럼 `fitColWidth()` 사용 |
| `GetColMaxValue` | `getDataRows()`로 직접 max 계산 |
| `GetColMinValue` | `getDataRows()`로 직접 min 계산 |
| `GetSheetHtml` | 미지원 |
| `HeaderCursor` | 미지원 |
| `ImageList` | 미지원. 개별 셀에 이미지 직접 설정 |
| `KeyFieldImage` | 미지원 |
| `MaximumValue` | 미지원 |
| `MinimumValue` | 미지원 |
| `MoveColumnFail` | 미지원 |
| `RangeBackColor` | 직접 반복문으로 setAttribute 적용 |
| `RangeFontBold` | 직접 반복문으로 setCellStyle 적용 |
| `RangeFontColor` | 직접 반복문으로 setCellStyle 적용 |
| `RangeText` | 직접 반복문으로 getString 적용 |
| `RangeValue` | 직접 반복문으로 getValue 적용 |
| `RemoveEtcData` | 미지원 |
| `RowHeightMin` | 미지원 |
| `SearchRows` | doSearch/loadSearchData로 대체 |
| `SetClickHeaderMappingColor` | 미지원 |
| `SetDown2TextConfig` | 미지원. `down2Text` 파라미터로 직접 설정 (★`plugins/ibsheet-excel.js` 로드 + 서버 모듈 필요) |
| `SetFindDialog` | `showFindDialog()` 사용 (ibsheet-dialog.js 필요) |
| `ShowButtonImage` | 미지원 |
| `ShowPivotSumRatio` | 미지원 |
| `ShowTreeSubSum` | 미지원. FormulaRow로 유사 구현 |
| `TabBehavior` | 미지원 |
| `TreeCheckEditable` | 미지원 |
| `TreeCheckRowEditable` | 미지원 |
| `TreeChildSort` | 미지원 |
| `UnicodeByte` | `(cfg) UnicodeByteMode` 로 대체 가능 |
| `UseDefaultTime` | `(cfg) EditMaskFunc` 활용 필요 |

---

## ❌ 미지원 이벤트 (TODO 주석 처리)

| IBSheet7 이벤트 | 대안 |
|---------------|------|
| `OnBeforeColumnMove` | 미지원. onAfterColMove로 이동 후 처리 |
| `OnDebugMsg` | 미지원 |
| `OnDecryption` | 미지원 |
| `OnEncryption` | 미지원 |
| `OnExportEncryption` | 미지원 |
| `OnPageRequest` | 미지원. onBeforeDataLoad로 대체 |
| `OnSmartResize` | 미지원. onResize 사용 |
| `OnTab` | 미지원. onKeyDown에서 Tab 키 처리 |
| `OnTreeChild` | 미지원. loadSearchChildData 이벤트 사용 |
| `OnWaitTimeOut` | 미지원 |

---

## ❌ 미지원 속성(Property) (TODO 주석 처리)

| IBSheet7 속성 | 대안 |
|-------------|------|
| `CalButtonAlign` | 미지원 |
| `CheckActionKey` | 기본: space, enter 동작 |
| `ComboSettingMode` | 미지원 |
| `Convert2ByteChar` | 미지원 |
| `DocIODelimMode` | 미지원 |
| `DownloadImage` | 미지원 |
| `EditArrowBehavior` | 미지원 |
| `EditLenMode` | 미지원 |
| `EditTabBehavior` | 미지원 |
| `EditTabInsert` | 미지원 |
| `EnhancedFloatSum` | 미지원 |
| `FilterComboSort` | 미지원 |
| `FilteredCountFormat` | 미지원 |
| `FilterDateType` | 미지원 |
| `FilterInputPopup` | 미지원 |
| `FitSizeColHeaderMode` | 미지원 |
| `FitSizeColMode` | 미지원 |
| `ibEditTitle` | 미지원 |
| `InvalidInputBehavior` | 미지원 |
| `InvalidPasteMsgMode` | 미지원 |
| `JustCheck` | 미지원 |
| `JustCheckSize` | 미지원 |
| `MultiCheckValue` | 미지원 |
| `NextPageCall` | 미지원 |
| `NewRowDeleteMode` | 미지원 |
| `NullLastOnAscOrder` | 미지원 |
| `PasteToNumberFormat` | 미지원 |
| `PopupCheckEditMode` | 미지원 |
| `RefreshHeaderMode` | 미지원 |
| `ReverseSortOrder` | 미지원 |
| `SaveValidationMode` | 미지원 |
| `ScrollOverSheet` | 미지원 |
| `SelectCellEventMode` | 미지원 |
| `SelectionRowsMode` | 미지원 |
| `SumZeroValue` | 미지원 |
| `SyncPaste` | 미지원 |
| `TapHoldTreshold` | 미지원 |
| `TreeNodeToggleMode` | 미지원 |
| `UseCache` | 미지원 |
| `UseEmptyMerge` | IBSheet8은 공백 머지가 기본 |
| `UseTableSuffix` | 미지원 |
| `UserAgent` | 미지원 |

---

## 🚫 불필요 항목 (코드에서 제거)

아래는 IBSheet8에서 **기능 자체가 제거되거나 불필요**해진 항목.  
코드에서 해당 코드 라인을 제거하거나 주석 처리.

```
BasicImeMode           - IE 전용 기능 (IE 지원 종료)
CheckActionMode        - onClick / onAfterClick으로 대체됨
CellItemsSeparator     - 불필요
CellItemsKeyValueSeparator - 불필요
ComboOpenMode          - 기본적으로 클릭 시 오픈
CreatePivotTable       - makePivotTable() 또는 showPivotDialog()  ★showPivotDialog 는 plugins/ibsheet-dialog.js 로드 필요
CreateUniteTable       - 불필요
CssImageUrl            - 불필요 (CSS 직접 관리)
CssUrl                 - 불필요 (CSS 직접 관리)
Data2Clipboard         - 불필요
DataBackColor          - 불필요
DataLinkMouse          - 불필요
DeferredHScroll        - 불필요
DeferredScrollTime     - 불필요
DeferredVScroll        - 불필요
DirectDownMode         - 불필요
DownloadingImage       - 불필요
EventCacheMode         - 불필요
HeaderEventMode        - 불필요
InitRender             - 불필요
InvalidArgsReturnValue - 불필요
JsonAttributeDelimiter - 불필요
MousePointer           - 불필요
SaveImage              - 불필요
SavingImage            - 불필요
ScrollInfoFormat       - 불필요
ScrollInfoPosition     - 불필요
SearchImage            - 불필요
SearchingImage         - 불필요
SearchXMLbyColOrder    - 불필요
SkipDefaultTheme       - 불필요
SmartResize            - 불필요
SortEventMode          - 불필요
SparklineColor         - 불필요
SparklineNegativeColor - 불필요
ThemeVersion           - 불필요
TreeActionMode         - 불필요
UploadImage            - 불필요
UploadingImage         - 불필요
ValidateFail           - 불필요
WaitImage              - 불필요
```
