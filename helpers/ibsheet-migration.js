// =============================================================================
// IBSheet7 → IBSheet8 마이그레이션 표준 헬퍼 (브릿지 함수 모음)
// -----------------------------------------------------------------------------
// IBSheet7 API가 IBSheet8로 1:1 매핑되지 않는 부분(인덱스 체계 차이, 반환값 의미
// 변경 등)을 흡수하기 위한 브릿지다. 변환 대상 프로젝트에 이 파일을 포함해 사용한다.
//
// 함수 섹션:
//   0. 초기화 / 전역
//   1. 행 인덱스 ↔ 행 객체   (getFixedTop, getRowByIndex7, getRowIndex7)
//   2. 열 인덱스 ↔ 열 이름   (getColByIndex7, getColIndex7)
//   3. 값 읽기 / 쓰기         (getValue2, setValue2)
//   4. 속성 / 행 상태         (setAttribute2, clearRowStatus)
//   5. 행 추가 / 삭제         (addRow2, removeRow2)
//   6. 집계                   (computeSum)
//   7. 부가 데이터(EtcData)   (getEtcData)
//   8. 시트 크기              (setSheetWidth, get/setSheetHeight)
//   9. 액션 메뉴              (setActionMenu)
//   10. 포맷 유틸             (convertCustomFormat)
// =============================================================================


// -----------------------------------------------------------------------------
// 0. 초기화 / 전역
// -----------------------------------------------------------------------------

// IBSheet 내부에서 호출하는 전역 디버그 함수 (미정의 시 ReferenceError 발생 방지)
if (typeof window.DebugMsg === 'undefined') {
    window.DebugMsg = function() {};
}

// 모든 시트 인스턴스가 공유하는 프로토타입. 여기에 정의한 함수는 sheet.xxx() 로 호출된다.
const fn = IBSheet["Plugins"];


// -----------------------------------------------------------------------------
// 1. 행 인덱스 ↔ 행 객체
//    IBSheet7 인덱스는 헤더/필터/상단합계행까지 포함하지만, IBSheet8 인덱스는
//    데이터행만 센다. 두 체계 사이의 오프셋을 보정한다.
// -----------------------------------------------------------------------------

/**
 * Head로 추가하거나 setFixedTop()으로 상단에 고정된 행을 배열로 반환한다.
 * @returns {Array} 상단 고정 행(Head/Data Kind) 객체 배열
 */
fn.getFixedTop = function () {
  var row = this.Head.firstChild;
  var rows = [];
  while (row) {
    if (row.Fixed == "Head" && (row.Kind == "Head" || row.Kind == "Data")) rows.push(row);
    row = row.nextSibling;
  }
  return rows;
}

/**
 * IBSheet7 기준 행 인덱스를 받아 해당하는 행 객체를 반환한다.
 * IBSheet7 인덱스에는 헤더행·필터행·상단(Head) 합계행이 포함되므로 데이터행 앞
 * 오프셋을 계산해 IBSheet8 데이터행 인덱스로 변환한다.
 * @param {number} rowIndex IBSheet7 기준 행 인덱스
 * @returns {object|null} 행 객체(헤더/필터/합계/데이터/푸터), 범위를 벗어나면 null
 */
fn.getRowByIndex7 = function (rowIndex) {
  // rowIndex가 공백/비숫자인 경우 오류 → null
  if (rowIndex === "" || rowIndex === null || rowIndex === undefined || typeof rowIndex != 'number') return null;

  const headerCnt = this.getHeaderRows().length; // 헤더행 수

  // IBSheet7 인덱스에는 필터행·상단(Head) 합계행도 포함되므로 데이터행 앞 오프셋에 반영
  const filterCnt      = this.Filter?.Visible ? 1 : 0;
  const headFormulaCnt = (this.FormulaRow?.Fixed == "Head") ? 1 : 0;

  // 마지막 데이터 행의 index (헤더 + 필터 + 상단합계 + 데이터행수 - 1)
  const lastDataRowIdx = headerCnt + filterCnt + headFormulaCnt + (this.getDataRows().length - 1);

  let ibsheet8RowIndex = rowIndex - headerCnt;
  if( rowIndex < headerCnt ) {
    // 헤더행인 경우
    return this.getHeaderRows()[rowIndex];
  } else if (rowIndex >  lastDataRowIdx) {
    // Foot 영역 (합계)
    const frows = this.getFooterRows().filter(r=>r.Visible);
    if(frows.length >= rowIndex - lastDataRowIdx ) {
      return frows[rowIndex - lastDataRowIdx - 1];
    }
  } else {
    // 필터 행이 보여지는지 여부 (IBSheet7에서는 필터행도 index를 가짐)
    if(this.Filter?.Visible) {
      ibsheet8RowIndex--;
      if( rowIndex === headerCnt ) {
        // 필터행인 경우
        return this.Filter;
      }
    }
    // 합계행이 상단(Head)에 위치하는 경우
    if(this.FormulaRow?.Fixed == "Head") {
      ibsheet8RowIndex--;
      if(!this.Filter?.Visible && rowIndex === headerCnt ) {
        // (필터행 없음) 합계행인 경우
        return this.FormulaRow;
      } else if(this.Filter?.Visible && rowIndex === headerCnt + 1 ) {
        // (필터행 다음) 합계행인 경우
        return this.FormulaRow;
      }
    }
    return this.getDataRows()[ibsheet8RowIndex];
  }
  return null;
}

/**
 * 행 객체를 받아 IBSheet7 기준 행 인덱스를 반환한다. (getRowByIndex7의 역함수)
 * 필터행/상단 합계행 판정 기준을 getRowByIndex7과 동일하게 맞춰 두 함수가 대칭이 되게 한다.
 * @param {object} row 행 객체
 * @returns {number} IBSheet7 기준 행 인덱스
 */
fn.getRowIndex7 = function(row) {
	var rtnRowIdx = 0;
	rtnRowIdx += this.getHeaderRows().length;
	// 필터행이 보여지고 있는 경우
	if(this.Filter?.Visible) rtnRowIdx++;
	// 합계행이 상단(Head)에 있는 경우
	if(this.FormulaRow?.Fixed == "Head") rtnRowIdx++;
	return this.getRowIndex(row) + rtnRowIdx - 1;
}


// -----------------------------------------------------------------------------
// 2. 열 인덱스 ↔ 열 이름
//    IBSheet7 열 인덱스는 0부터 시작하고 숨김 컬럼을 포함한다. IBSheet8은 1부터
//    시작하며, SEQ 자동 컬럼(VPos === -1: 미표시) 유무에 따라 보정이 필요하다.
// -----------------------------------------------------------------------------

/**
 * IBSheet7 기준 열 인덱스를 받아 해당하는 열의 Name을 반환한다.
 * 문자열에 '|'가 있으면 배열로, 숫자/숫자문자열이면 SEQ 보정 후 이름으로 변환한다.
 * @param {number|string} colIndex 열 인덱스(숫자) 또는 '|' 구분 인덱스 문자열, 또는 이미 열 Name
 * @returns {string|string[]} 열 Name (또는 '|' 입력 시 이름 배열)
 */
fn.getColByIndex7 = function (colIndex) {
  // colIndex가 공백인 경우 오류 → ''
  if (colIndex === "" || colIndex === null || colIndex === undefined) return '';

  // SEQ 컬럼이 자동 생성(미표시, VPos === -1)된 경우 인덱스를 1 보정. (SEQ 없으면 옵셔널 체이닝으로 0)
  var seqOffset = (this.Cols["SEQ"]?.VPos === -1) ? 1 : 0;

  if (typeof colIndex == "string") {
    // '|' 문자가 포함된 경우 배열로 반환
    if (colIndex.indexOf("|") != -1) {
      var cols = colIndex.split("|");
      return cols.map(c => this.getColByIndex7(c));
    }
    // 문자열이지만 숫자인 경우
    if (!isNaN(colIndex)) {
      return this.getCols()[parseInt(colIndex) + seqOffset];
    }
    // 그냥 Name 문자열인 경우 그대로 반환
    return colIndex;
  }
  // 숫자(또는 그 외 타입) 인덱스인 경우
  return this.getCols()[colIndex + seqOffset];
}

/**
 * IBSheet7 기준 열 Name을 받아 해당하는 열의 IBSheet7 인덱스를 반환한다.
 * IBSheet7은 colIndex가 0부터, IBSheet8은 1부터 시작하므로 -1, SEQ 자동컬럼이 있으면 추가 -1.
 * @param {string} colName 열 Name
 * @returns {number} IBSheet7 기준 열 인덱스
 */
fn.getColIndex7 = function (colName) {
  return this.getColIndex(colName, 1) - 1 - ((this.Cols["SEQ"]?.VPos === -1) ? 1 : 0);
}


// -----------------------------------------------------------------------------
// 3. 값 읽기 / 쓰기
// -----------------------------------------------------------------------------

/**
 * getValue 브릿지. FormatFix:1 컬럼은 getValue도 Format이 적용된 문자열을 반환하도록 getString으로 위임.
 * @param {...*} args (row, col) — 둘 중 하나라도 없으면 undefined
 * @returns {*} 셀 값 (FormatFix 컬럼은 표시 문자열)
 */
fn.getValue2 = function(...args) {
	// row, col 중에 하나라도 없으면 return
	if(!args[0] || !args[1] ) return;
	// FormatFix:1 인 경우 getValue에 대해서도 Format이 적용된 문자열을 리턴
	if(this.Cols[args[1]] && this.Cols[args[1]]?.FormatFix) {
		return this.getString(...args);
	}
	return this.getValue(...args);
}

/**
 * setValue 브릿지. 값 수정 시 onAfterChange 이벤트를 강제 발생시키고,
 * Status 컬럼(orgType)·Enum 컬럼에 대한 특수 처리를 수행한다.
 * @param {object} r 행 객체
 * @param {string} c 열 Name
 * @param {*} v 설정할 값
 * @param {number|boolean} [evt] 0/false면 onAfterChange 이벤트를 발생시키지 않음
 */
fn.setValue2 = function(r, c, v, evt) {
	if(!r || !c) {
		return;
	}
  // 상태(Status) 컬럼에 대한 대응: 행 상태를 값에 맞게 재설정
  if(this.Cols[c]?.orgType && this.Cols[c]?.orgType == "Status"){
    // 상태를 클리어 한다.
    this.clearRowStatus(r);
    switch(v) {
      case "I":
        this.setAttribute(r, null, "Added", 1);
        break;
      case "U":
        this.setAttribute(r, null, "Changed", 1);
        break;
      case "D":
        this.deleteRow(r, 1);
        break;
    }
  }else{
	const type = this.getType(r, c);
	switch(type) {
		case "Enum":
			// v가 화면표시값(Enum)으로 넘어온 경우, 저장값(EnumKeys)으로 교체 후 설정
			const en = this.getAttribute(r, c, "Enum") ? this.getAttribute(r, c, "Enum") : this.getAttribute(null, c, "Enum");
			const enkey = this.getAttribute(r, c, "EnumKeys") ? this.getAttribute(r, c, "EnumKeys") : this.getAttribute(null, c, "EnumKeys");
			// v가 EnumKeys에 없으면서 Enum에 있는 경우
			if(!enkey.substr(1).split(enkey[0]).includes(v) && en.substr(1).split(en[0]).includes(v)) {
				// 실제 입력 전에 EnumKeys값으로 교체해주자.
				v = enkey.substr(1).split(enkey[0]) [ en.substr(1).split(en[0]).indexOf(v) ] ;
			}
			break;
		case "Date":
			break;
	}

    this.setValue(r, c, v);
    if(evt !== 0 && evt !== false) {
      // 강제로 onAfterChange 이벤트를 발생 시킴
      typeof IBSheet.OnAfterValueChanged == "function" && IBSheet.OnAfterValueChanged(this, r, c, v);
    }
  }
}


// -----------------------------------------------------------------------------
// 4. 속성 / 행 상태
// -----------------------------------------------------------------------------

/**
 * setAttribute 브릿지. IBSheet7의 CanEdit는 IBSheet8에서 ChangeEdit/AddEdit로 분리되었고,
 * Button 컬럼은 Disabled로 표현되므로 이를 흡수한다.
 * @param {...*} args (row, col, attr, val)
 */
fn.setAttribute2 = function(...args) {
	var row = args[0], col = args[1], attr = args[2], val = args[3];
	if(attr === "CanEdit") {
		if(row && col) {
			this.setAttribute(row, col, "ChangeEdit", val);
			this.setAttribute(row, col, "AddEdit", val);

			if(this.getType(row, col) == "Button") {
				this.setAttribute(row, col, "Disabled", !val);
				return;
			}
		}
	}
	this.setAttribute(...args);
}

/**
 * 행의 상태(Added/Changed/Deleted/Moved)를 모두 클리어한다.
 * @param {object} r 행 객체
 */
fn.clearRowStatus = function(r) {
  this.setAttribute(r, null, "Added", 0, 0 );
  this.setAttribute(r, null, "Changed", 0, 0 );
  this.setAttribute(r, null, "Deleted", 0, 0 );
  this.setAttribute(r, null, "Moved", 0, 0 );
  this.refreshRow(r);
  this.calculate(); // 여러번 호출시 성능 저하가 있을 수 있음.
}


// -----------------------------------------------------------------------------
// 5. 행 추가 / 삭제
// -----------------------------------------------------------------------------

/**
 * removeRow 브릿지. 삭제 전 onRowDelete 이벤트를 발생시킨다.
 * @param {...*} args (row) 또는 ({row: ...})
 */
fn.removeRow2 = function(...args) {
  if(!args.length) return;
  if(this?.options?.Events?.onRowDelete) {
    this.options.Events.onRowDelete({sheet: this, row: args[0]["Kind"] == "Data" ? args[0] : args["row"] });
  }
  this.removeRow(...args);
}

/**
 * IBSheet7의 DataInsert를 대신한다. 인덱스 위치에 따라 addRow 파라미터(next/parent)를 구성한다.
 * @param {number} [row] IBSheet7 기준 삽입 위치 인덱스(생략 시 포커스 행 아래)
 * @param {number} [lvl] 트리 레벨(계층 행 추가 시)
 * @returns {object} 추가된 행 객체
 */
fn.addRow2 = function(row, lvl) {
	var param = {}, targetRow;
	if(typeof row == "undefined") { // 현재 포커스 된 행에 신규행 추가
		// 포커스 된 행 아래 신규행 추가
		if(this.getFocusedRow() && this.getNextRow(this.getFocusedRow())) {
			targetRow = this.getFocusedRow();
			param.next = this.getNextRow(this.getFocusedRow());
		}
	}else if(row == this.getHeaderRows().length - 1) { // 맨 위에 신규행 추가
		param.targetRow = null;
		if(this.getFirstRow()) {
			param.next = this.getFirstRow();
		}
	}else if(row > this.getHeaderRows().length - 1) { // 특정 행 아래에 신규행 추가
		if(this.getNextRow(this.getRowByIndex(row))) {
			targetRow = this.getRowByIndex(row);
			param.next = this.getNextRow(this.getRowByIndex(row));
		}
	}
	if( lvl ) {
		if(targetRow && targetRow.Level ) {
			if(targetRow.Level == lvl ) {
				param.parent = targetRow.parentNode.Kind == "Data" ? targetRow.parentNode : null;
			}else if(targetRow.Level < lvl ){
				param.parent = targetRow;
			}
		}
	}
	if(Object.keys(param).length !== 0) {
		return this.addRow(param);
	}else {
		return this.addRow();
	}
}


// -----------------------------------------------------------------------------
// 6. 집계
// -----------------------------------------------------------------------------

/**
 * 단일 숫자 컬럼에 대해 지정 행 범위의 합계를 계산한다.
 * startRow/endRow는 IBSheet7 인덱스(number) 또는 행 객체 둘 다 허용한다.
 * @param {string} col 대상 컬럼 Name (Int/Float 타입)
 * @param {number|object} [startRow] 시작 행(기본: 첫 데이터 행 객체)
 * @param {number|object} [endRow]   끝 행(기본: 마지막 데이터 행 객체)
 * @param {boolean} [isFullSum] true면 SubSum 행도 합산에 포함
 * @returns {number|null} 합계, 오류 시 null
 */
fn.computeSum = function(col, startRow = this.getFirstRow(), endRow = this.getLastRow(), isFullSum) {
	if(!this.getCols().includes(col)) {
		console.log("computeSum error! : not exist col.");
		return null;
	}
	if(this.Cols[col].Type != "Int" && this.Cols[col].Type != "Float") {
		console.log("computeSum error! : need number Type.");
		return null;
	}
	var sum = 0;
	// number로 들어온 경우에만 IBSheet7 인덱스 → 행 객체로 변환. (기본값은 이미 행 객체)
	if(typeof startRow == "number") startRow = this.getRowByIndex7(startRow);
	if(typeof endRow == "number")   endRow = this.getRowByIndex7(endRow);
	if(!startRow || !endRow) return null;
	for(var row = startRow; row && row.HasIndex<=endRow.HasIndex ; row = this.getNextRow(row)) {
		if(row.Name && row.Name == "SubSum" && !isFullSum) continue;
		sum += parseFloat(this.getValue(row, col)) || 0;
	}
	return sum;
}


// -----------------------------------------------------------------------------
// 7. 부가 데이터 (EtcData)
// -----------------------------------------------------------------------------

/**
 * IBSheet7 GetEtcData 브릿지. IBSheet8은 부가 데이터를 공개 속성 sheet.etc에 담는다.
 * (conventions.md · method-mapping.md 기준: sheet.etc.키)
 * @param {string} key 부가 데이터 키
 * @returns {*} sheet.etc[key] 값
 */
fn.getEtcData = function(key) {
	return this?.etc?.[key];
}


// -----------------------------------------------------------------------------
// 8. 시트 크기
// -----------------------------------------------------------------------------

/**
 * 시트 객체의 너비를 변경한다.
 * @param {number|string} w 너비(숫자면 px 부여, 문자열이면 그대로)
 */
fn.setSheetWidth = function(w) {
  this.MainTag.style.width = isNaN(w) ? w : w + "px";
}

/**
 * 시트 객체의 현재 높이를 반환한다.
 * @returns {number} 높이(px)
 */
fn.GetSheetHeight = fn.getSheetHeight = function() {
	return this.MainTag.getBoundingClientRect().height;
}

/**
 * 시트 객체의 높이를 변경하고 다시 렌더링한다.
 * @param {number|string} h 높이(숫자면 px 부여)
 */
fn.SetSheetHeight = fn.setSheetHeight = function(h) {
	if(!isNaN(h)) h = h + "px";
	this.MainTag.style.height = h;
	this.rerender();
}


// -----------------------------------------------------------------------------
// 9. 액션 메뉴
// -----------------------------------------------------------------------------

/**
 * IBSheet7 SetActionMenu 호환 브릿지.
 * IBSheet7의 "|" 구분 메뉴 문자열을 IBSheet8의 Def.Row.Menu.Items 배열로 변환한다.
 *
 * 지원하는 메뉴 항목 (아래 액션명은 onSelectMenu 분기의 Value로 매핑된다):
 *   행추가, 행복사, 삭제, 엑셀내려받기, 전체내려받기, 엑셀올리기
 *   *- (구분선), - (구분선)
 *
 * @param {string} menuText "|" 구분 메뉴 문자열 (예: "행추가|행복사|*-|엑셀내려받기")
 */
fn.setActionMenu = fn.SetActionMenu = function(menuText) {
	if(!menuText) return;

	var sheet = this;
	var items = menuText.split("|");
	var menuItems = [];

	for(var i = 0; i < items.length; i++) {
		var name = items[i].trim();
		if(!name) continue;

		// 구분선
		if(name === "*-" || name === "-") {
			menuItems.push({Name: "*-"});
			continue;
		}

		// 메뉴 항목 → onSelectMenu의 switch/case Value로 매핑
		var menuItem = {Name: name};
		switch(name) {
			case "행추가":
				menuItem.Value = "addRow-below";
				break;
			case "행복사":
				menuItem.Value = "copyRow";
				break;
			case "삭제":
				menuItem.Value = "removeRow";
				break;
			case "엑셀내려받기":
			case "페이지내려받기":
				menuItem.Value = "down2Excel";
				break;
			case "전체내려받기":
			case "전체조회":
				menuItem.Value = "allDown2Excel";
				break;
			case "엑셀올리기":
				menuItem.Value = "loadExcel";
				break;
			default:
				menuItem.Value = name;
				break;
		}
		menuItems.push(menuItem);
	}

	// 시트의 Def.Row.Menu를 동적으로 교체
	if(sheet.Def && sheet.Def.Row) {
		sheet.Def.Row.Menu = {Items: menuItems};
	}
};


// -----------------------------------------------------------------------------
// 10. 포맷 유틸
// -----------------------------------------------------------------------------

/**
 * 사용자 정의 포맷 문자열에 맞춰 값을 변환한다.
 *   '#' = 숫자 자리, '*' = 마스킹 자리(숫자 소비 후 * 표시), 그 외 = 구분자 그대로.
 * @param {string} val 원본 값(숫자 외 문자는 무시)
 * @param {string} format 포맷 문자열 (예: "###-**-####")
 * @returns {string} 변환된 문자열
 */
fn.convertCustomFormat = function(val, format) {
  // 숫자만 추출
  const digits = val.replace(/\D/g, "");

  let digitIndex = 0;
  let result = "";

  for (const char of format) {
    if (char === "#") {
      // 숫자 자리: 실제 숫자 삽입
      if (digitIndex < digits.length) {
        result += digits[digitIndex++];
      }
    } else if (char === "*") {
      // 마스킹 자리: 숫자를 소비하고 * 표시
      if (digitIndex < digits.length) {
        digitIndex++;
        result += "*";
      }
    } else {
      // 구분자 (-, 공백 등): 그대로 삽입
      result += char;
    }
  }

  return result;
}
