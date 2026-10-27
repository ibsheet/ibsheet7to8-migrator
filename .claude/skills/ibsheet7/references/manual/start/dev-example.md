# 개발 실습

Oracle DB를 기본적으로 가지고 있는 EMP 테이블을 기준으로 화면을 구성하는 실습 예제입니다.

## 1. IBSheet7 객체 생성 및 기본 속성 설정하기
`ibsheetinfo.js` 내의 `createIBSheet` 함수를 사용하여 IBSheet 객체를 생성하고 body의 OnLoad 이벤트에서 생성된 객체에 대한 기본 속성을 설정합니다.<br>

```html
<body onload="LoadPage()">
  <script type="text/javascript">
    createIBSheet("mySheet", "100%", "100%");
  </script>
</body>
```
[**객체 생성하기**]


```html
<script type="text/javascript" src="/js/ibsheet/ibsheet.js"></script>
<script type="text/javascript" src="/js/ibsheet/ibsheetinfo.js"></script>
<script type="text/javascript">
function LoadPage() {
  var cfg = {FrozenCol:3,MergeSheet:msHeaderOnly };
  mySheet.SetConfig(cfg);
  var header = [
    {Text:"상태|삭제|직책|부서코드|ID|이름|입사일|책임자|급여|COMM",Align:"Center"}
  ];
  var info = {Sort:0,ColMove:1,ColResize:1};
  mySheet.InitHeaders(header,info);
  var cols = [
    {Type:"Status",Width:60,SaveName:"sStatus",Align:"Center"},
    {Type:"DelCheck",Width:60,SaveName:"sDelete",Align:"Center"},
    {Type:"Text",Width:100,SaveName:"JOB",Align:"Center"},
    {Type:"Text",Width:100,SaveName:"DEPTNO",Align:"Center"},
    {Type:"Text",Width:60,SaveName:"EMPNO",Align:"Center"},
    {Type:"Text",Width:150,SaveName:"ENAME",Align:""},
    {Type:"Date",Width:120,SaveName:"HIREDATE",Format:"Ymd",Align:"Center",EditLen:8},
    {Type:"Text",Width:120,SaveName:"MGR",Align:"Center"},
    {Type:"Int",Width:120,SaveName:"SAL",Align:"Right",Format:"NullInteger"},
    {Type:"Int",Width:60,SaveName:"COMM",Align:"Right",Format:"Integer"}
  ];
  mySheet.InitColumns(cols);
}
</script>
```
[**기본 속성 설정하기**]

위와 같이 소스를 생성하고 실행하면 아래와 같은 모습의 오브젝트가 생성됩니다.<br>
![s](/assets/imgs/ibsheet7_ex1.png)<br>

## 2. 각종 기능 구현하기

트랜잭션과 관련된 각종 기능 버튼을 생성하고 기능버튼이 처리해야할 작업을 자바스크립트 함수로 구현합니다. 입력과 행 복사 기능을 다음과 같이 구현합니다.

```javascript
function doAction(sAction) {
  switch(sAction) {
  case "Insert": //입력
    mySheet.DataInsert();
    break;
  case "Copy"://행 복사
    mySheet.DataCopy();
    break;
  }
}

// 입력, 행 복사 버튼
<input type="button" value="입력" onClick="doAction('Insert')">
<input type="button" value="행복사" onClick="doAction('Copy')">

<table cellpadding="0" cellspacing="1" border="0" width="100%">
  <tr>
    <td bgcolor="#FFFFFF">Employee Name</td>
    <td bgcolor="#FFFFFF">
      <input type="text" name="sa_name">
    </td>
    <td bgcolor="#FFFFFF">Salary</td>
    <td bgcolor="#FFFFFF">
      <input type="text" class="on_curr1" name="sal" value="0">
    </td>
    <td bgcolor="#FFFFFF">HireDate</td>
    <td bgcolor="#FFFFFF">
      <input type="text" class="on_date" name="hdate" >
    </td>
  </tr>
</table>
```

## 3. 조회하기
IBSheet7에서는 조회 기능을 처리 하기 위해서는 다음의 4가지 과정을 처리합니다.
-	조회 함수 사용하기 `(필수)`
-	다음 페이지 조회 이벤트 처리하기 <span style="color:blue;">(선택)</span>
-	조회 XML or JSON 생성하기 `(필수)`
-	조회 완료 이벤트 처리하기 <span style="color:blue;">(선택)</span>

* 조회 함수 사용하기 `(필수)`

```javascript
function doSearch() {
  //조회조건
  var param =  "sa_name="+document.frm.sa_name.value+"&sal=" + document.frm.sal.value+"&hdate=" + document.frm.hdate.value;

  //조회하기 (페이지명, 조회조건);
  mySheet.DoSearch("dataList.jsp",param);
}
```
조회 조건 인자는 여러 개 조회 조건을 조건명과 조건값을 `"="`로 연결하고, 여러 개 조건이 사용될 경우 `"&"`로 연결하여 다음과 같이 구성합니다.
**조건1=값1&조건2=값2&조건3=값3**

* 조회 XML 생성하기 `(필수)`

조회 함수에서 설정한 조회 XML 페이지를 구성합니다. 아래는 datalist.jsp를 구현한 샘플 페이지 입니다.
```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="java.sql.*,java.util.*,com.fasterxml.jackson.databind.ObjectMapper,com.fasterxml.jackson.databind.ObjectWriter "%>
<%
  Connection conn = null;
  PreparedStatement pstmt = null;
  ResultSet rs = null;
  Map data = new HashMap();
  String url = "jdbc:oracle:thin:@localhost:1521:xe";
  String id = "scott";
  String pwd = "tiger";
  String driver = "oracle.jdbc.driver.OracleDriver";
  String query = + "SELECT "
    + "EMPNO,ENAME,JOB,MGR "
    + ",HIREDATE,SAL,COMM,DEPTNO "
    + ",CASE  "
    + "	WHEN SAL>4500 THEN '#FF0000' "
    + "	ELSE  '#0000FF' "
    + "	END AS \"sal#FontColor\" "
    + ",CASE "
    + "	WHEN MGR IS NULL THEN '0' "
    + "	ELSE '1' "
    + "	END AS \"Edit\" "
    + "	FROM EMP WHERE 1 = 1 "
    + " AND ENAME like '%'||?";
  try {
    Class.forName(driver);
    conn = DriverManager.getConnection(url,id,pwd);
    pstmt = conn.prepareStatement(query);
    pstmt.setString(1, request.getParameter("sa_name"));
    rs = pstmt.executeQuery();
    List li = Result2List(rs); //ResultSet을 List<Map>으로 치환
    data.put("Data",li);
    //List내용을 JSON string으로 치환.
    String rtnJSON = new ObjectMapper().writer().writeValueAsString(data);
    out.println(rtnJSON);
  } catch(Exception ex) {
    Map rtnMap = new HashMap();
    Map result = new HashMap();
    //오류 발생
    result.put("Code",-1);
    result.put("Message","오류가 발생하였습니다.");
    rtnMap.put("Result" , result );
    String rtnJSON = new ObjectMapper().writer().writeValueAsString(rtnMap);
    out.println(rtnJSON);
  } finally {
    rs.close();
    pstmt.close();
    conn.close();
  }
%>
<%!
public List Result2List(ResultSet rs) throws Exception {
	List list = new ArrayList();
	ResultSetMetaData rsmd = rs.getMetaData();

	while(rs.next()) {
	  int numColumns = rsmd.getColumnCount();
	  Map obj = new HashMap();
	  for( int i=1; i<numColumns+1; i++) {
	    String column_name = rsmd.getColumnName(i);
	    switch( rsmd.getColumnType( i ) ) {
	      case java.sql.Types.ARRAY:
	        obj.put(column_name, rs.getArray(column_name));     break;
	      case java.sql.Types.BIGINT:
	        obj.put(column_name, rs.getInt(column_name));       break;
	      case java.sql.Types.BOOLEAN:
	        obj.put(column_name, rs.getBoolean(column_name));   break;
	      case java.sql.Types.BLOB:
	        obj.put(column_name, rs.getBlob(column_name));      break;
	      case java.sql.Types.DOUBLE:
	        obj.put(column_name, rs.getDouble(column_name));    break;
	      case java.sql.Types.FLOAT:
	        obj.put(column_name, rs.getFloat(column_name));     break;
	      case java.sql.Types.INTEGER:
	        obj.put(column_name, rs.getInt(column_name));       break;
	      case java.sql.Types.NVARCHAR:
	        obj.put(column_name, rs.getNString(column_name));   break;
	      case java.sql.Types.VARCHAR:
	        obj.put(column_name, rs.getString(column_name));    break;
	      case java.sql.Types.TINYINT:
	        obj.put(column_name, rs.getInt(column_name));       break;
	      case java.sql.Types.SMALLINT:
	        obj.put(column_name, rs.getInt(column_name));       break;
	      case java.sql.Types.DATE:
          obj.put(column_name, ""+rs.getDate(column_name));   break;
	      case java.sql.Types.TIMESTAMP:
	        obj.put(column_name, rs.getTimestamp(column_name)); break;
	      default:
	        obj.put(column_name, rs.getObject(column_name));    break;
	    }
	  }
	  list.add(obj);
	}
	return list;
}
%>
```

위와 같이 작성된 페이지는 웹서버에서 컴파일이 완료되어 아래와 같은 형태로 나타나게 됩니다.

```xml
<!--조회된 내역이 없는 경우 -->
{"Data":[]}

<!--조회된 내역이 있는 경우 -->
{ "Data":
  [
    {"EMPNO":7499,"ENAME":"ALLEN","JOB":"CLERK","MGR":7698,"HIREDATE":1371567600000,"SAL":1600,"COMM":300,"DEPTNO":70,"SAL#FontColor":"#0000FF","Edit":"1"},
    {"EMPNO":7521,"ENAME":"JAMES","JOB":"SALESMAN","MGR":7698,"HIREDATE":351615600000,"SAL":1250,"COMM":500,"DEPTNO":30,"SAL#FontColor":"#0000FF","Edit":"1"},
    {"EMPNO":7566,"ENAME":"SUDAN","JOB":"SALESMAN","MGR":7839,"HIREDATE":354985200000,"SAL":2975,"COMM":0,"DEPTNO":40,"SAL#FontColor":"#0000FF","Edit":"1"},
    {"EMPNO":7654,"ENAME":"MARTIN","JOB":"SALESMAN","MGR":7698,"HIREDATE":370450800000,"SAL":1250,"COMM":1400,"DEPTNO":30,"SAL#FontColor":"#0000FF","Edit":"1"},
    {"EMPNO":7698,"ENAME":"MIKE","JOB":"MANAGER","MGR":7839,"HIREDATE":357490800000,"SAL":2850,"COMM":0,"DEPTNO":40,"Sal#FontColor":"#0000FF","Edit":"1"},
    {"EMPNO":7782,"ENAME":"clack","JOB":"MANAGER","MGR":7839,"HIREDATE":360860400000,"SAL":2450,"COMM":0,"DEPTNO":40,"SAL#FontColor":"#0000FF","Edit":"1"},
    {"EMPNO":7788,"ENAME":"SCOTT1","JOB":"ANALYST","MGR":7566,"HIREDATE":552492000000,"SAL":99999,"COMM":0,"DEPTNO":30,"SAL#FontColor":"#FF0000","Edit":"1"},
    {"EMPNO":7839,"ENAME":"king","JOB":"PRESIDENT","HIREDATE":374770800000,"SAL":5000,"COMM":0,"DEPTNO":10,"SAL#FONTCOlor":"#FF0000","Edit":"0"},
    {"EMPNO":7844,"ENAME":"TURNER","JOB":"SALESMAN","MGR":7698,"HIREDATE":368722800000,"SAL":1500,"COMM":0,"DEPTNO":30,"SAL#FontColor":"#0000FF","Edit":"1"},
    {"EMPNO":7902,"ENAME":"FORD","JOB":"ANALYST","MGR":7566,"HIREDATE":376153200000,"SAL":3000,"COMM":100,"DEPTNO":20,"SAL#FontColor":"#0000FF","Edit":"1"},
    {"EMPNO":7934,"ENAME":"MILLER","JOB":"CLERK","MGR":7782,"HIREDATE":380559600000,"SAL":1300,"COMM":200,"DEPTNO":20,"SAL#FontColor":"#0000FF","Edit":"1"}
  ]
}
```

* 조회 완료 이벤트 처리하기 <span style="color:blue;">(선택)</span>

조회가 완료되고 그 뒤에 어떤 로직 처리가 필요한 경우 완료 이벤트에 대한 처리를 구현합니다.

```javascript
function mySheet_OnSearchEnd(code, msg) {
  if(msg!=""){
    alert(msg);
  }
}
```

위와 같이 조회 기능을 완료하여 처리하면 아래와 같은 화면이 생성됩니다.<br>
![s](/assets/imgs/ibsheet7-searchresult.png)<br>


## 4. 저장하기
저장 기능을 처리 하기 위해서는 다음의 4가지 과정을 처리한다.
-	저장 함수 호출하기 `(필수)`
-	Validation 확인하기 <span style="color:blue;">(선택)</span>
-	저장 JSON 생성하기 `(필수)`
-	저장 완료 이벤트 처리하기 <span style="color:blue;">(선택)</span>

* 저장 함수 호출하기 `(필수)`

```javascript
function doSave(){
  //저장하기 (페이지명, 저장추가정보);
  var param = FormQueryStringEnc(document.frm);
  mySheet.DoSave("save.jsp",param);
}
```
저장 처리할 페이지명을 설정하고 추가 저장할 정보를 설정하여 조회 함수를 호출하면 내부적으로 트랜잭션 상태가 "조회"가 아닌 행의 값을 해당 데이터의 SaveName 으로 조합하여 저장 페이지로 넘깁니다. (SaveName은 `InitColumns` 함수를 통해서 설정)

* Validation 확인하기 <span style="color:blue;">(선택)</span>

저장 함수를 이용하여 저장 하기 전에 각 데이터에 대한 Validation 확인을 OnValidation 이벤트에 정의합니다.<br>
업무에 따라 발생할 수 있는 각종 Validation은 이 이벤트에 구현합니다.

```javascript
function mySheet_OnValidation(Row, Col, Value) {
  switch(Col) {
    case 8:
        if (Value > 1000 ) {
          alert("1000 이상을 설정할 수 없습니다.");
          mySheet.ValidateFail(1);
          mySheet.SetSelectCell(Row, 8);
        }
    break;
  }
}
```

* 저장 JSON 생성하기 `(필수)`

저장할 데이터가 유효하다면 다음과 같이 저장 처리 페이지를 구성합니다. 결과 컬럼에 저장 처리 결과를 설정하는 방식의 저장 XML을 다음과 같이 구성합니다.

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="java.sql.*"
%>
<%
  //디비 접속 관련
  Connection conn = null;
  PreparedStatement pstmt = null;
  ResultSet rs = null;
  String url = "jdbc:oracle:thin:@localhost:1521:xe";
  String id = "scott";
  String pwd = "tiger";
  String driver = "oracle.jdbc.driver.OracleDriver";

  //쿼리들
  String insertQ = "insert into emp(job,deptno,empno,ename,hiredate,mgr,sal,comm) values (?,?,?,?,to_date(?,'YYYYMMDD'),?,?,?)";
  String updateQ = "update emp set hiredate = to_date(?,'YYYYMMDD'),sal=?,comm=? where empno = ?";
  String deleteQ = "delete from emp where empno = ?";

  //시트로부터 넘어온 내용들
  String[] sStatus    = request.getParameterValues("sStatus");
  String[] JOB        = request.getParameterValues("JOB");
  String[] DEPTNO     = request.getParameterValues("DEPTNO");
  String[] EMPNO      = request.getParameterValues("EMPNO");
  String[] ENAME      = request.getParameterValues("ENAME");
  String[] HIREDATE   = request.getParameterValues("HIREDATE");
  String[] MGR        = request.getParameterValues("MGR");
  String[] SAL        = request.getParameterValues("SAL");
  String[] COMM       = request.getParameterValues("COMM");
  try{
    Class.forName(driver);
    conn = DriverManager.getConnection(url,id,pwd);
    conn.setAutoCommit(false);
    //상태 컬럼의 값은 "I" ,"U" ,"D" 로 넘어온다.
    for(int row=0;row<sStatus.length;row++){
      if("I".equals(sStatus[row])){
        pstmt = conn.prepareStatement(insertQ);
        pstmt.setString(1, JOB[row]);
        pstmt.setString(2, DEPTNO[row]);
        pstmt.setString(3, EMPNO[row]);
        pstmt.setString(4, ENAME[row]);
        pstmt.setString(5, HIREDATE[row]);
        pstmt.setString(6, MGR[row]);
        pstmt.setString(7, SAL[row]);
        pstmt.setString(8, COMM[row]);
      }else if("U".equals(sStatus[row])){
        pstmt = conn.prepareStatement(updateQ);
        pstmt.setString(1, HIREDATE[row]);
        pstmt.setString(2, SAL[row]);
        pstmt.setString(3, COMM[row]);
        pstmt.setString(4, EMPNO[row]);
      }else{
        pstmt = conn.prepareStatement(deleteQ);
        pstmt.setString(1, EMPNO[row]);
      }
      pstmt.executeUpdate();
      pstmt.clearParameters();
    }
    conn.commit();
  %>
  {
    "Result" : {"Code":0, "Message":"저장 되었습니다."}
  }
  <%
  }catch(Exception ex){
    String msg = ex.getMessage();
  %>
  {
  "Result" : {"Code":-1, "Message":"오류가 발생하였습니다." }
  }
  <%
  }finally{
    pstmt.close();
    conn.close();
  }
%>
```

데이터에 대해 저장 처리가 완료되면 다음과 같이 최종적으로 생성됩니다.

``` json
// 저장 성공시
{
  "Result" : {"Code":0, "Message":"저장 되었습니다."}
}
// 저장 오류시
{
  "Result" : {"Code":-1, "Message":"오류가 발생하였습니다."}
}
```

* 저장 완료 이벤트 처리하기 <span style="color:blue;">(선택)</span>

저장 처리가 완료되면 [OnSaveEnd](/docs/event/OnSaveEnd) 이벤트가 발생합니다. <br>
이 이벤트는 저장이 성공하든 실패하든 저장처리가 끝나면 발생하는 이벤트로 에러 메시지가 있는 경우 인자로 설정되어 이벤트가 발생합니다.

```javascript
function mySheet_OnSaveEnd(code,msg) {
  if (code < 0) {
    alert(msg);
  }
}
```