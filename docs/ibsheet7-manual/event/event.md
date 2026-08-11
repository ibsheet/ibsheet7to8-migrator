# event 사용법 기초 ***(event)***

> 사용자가 원하는 기능을 추가 또는 변경 처리할 수 있도록 다양한 이벤트를 제공합니다.<br>
> 이벤트의 사용 방법은 아래와 같습니다.

### Syntax
```javascript
function 오브젝트ID_이벤트명(파라미터, …) {}

//예를 들어 IBSheet ObjectID를 "mySheet"라 하고, OnChange 이벤트에 대해 기능 처리를 해야 한다면 아래와 같이 기술할 수 있습니다.

function mySheet_OnChange(Row, Col, Value) {
   alert(Row + "," + Col + "의 값이 변경되었습니다.");
}
```