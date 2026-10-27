# 메소드 사용하기

> IBSheet7에서 제공하는 Method를 사용하기 위해서는 아래와 같은 Syntax를 통해 사용할 수 있습니다.

### Syntax
```javascript
오브젝트ID.메소드명();
```

* Method의 인자 중 선택 인자는 설정하지 않고 호출할 경우 Default 값 적용을 받아 메소드가 처리됩니다.

## Example
* 트랜잭션과 관련된 각종 기능 버튼을 생성하고 기능버튼이 처리해야할 작업을 자바스크립트 함수로 구현합니다. 입력, 행 복사 기능을 아래 같이 구현할 수 있습니다. (예시)

```javascript
function doAction(sAction) {
  switch(sAction) {
    case "Insert"://입력
      mySheet.DataInsert();
      break;
    case "Copy"://행복사
      mySheet.DataCopy();
      break;
  }
}

<html>
  <input type="button" value="입력" onClick="doAction('Insert')"> //
  <input type="button" value="행 복사" onClick="doAction('Copy')">
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
</html>
```
