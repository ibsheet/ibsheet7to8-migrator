# 시트의 구조

## 1. Client Running 구조
* Load 과정<br>
![시트의 구조](/assets/imgs/ibsheet7_sheetstructure.png)<br>

IBSheet7가 포함된 페이지를 PC에서 열 경우 별도의 프로그램 또는 컨테이너 없이 Sheet가 `동적 HTML`로 구성되어 Load 됩니다.

## 2. 데이터 조회 / 저장 과정

①	`Data Request` : IBSheet7의 조회/저장 함수를 이용하여 데이터를 요청합니다.<br>
②	`DB Data Request` : 요청을 받은 서버는 FrameWork를 통해 SQL QueryString을 구성하여 DBMS에 데이터를 요청합니다.<br>
③	DBMS는 QueryString을 해석하여 DataSet객체를 FrameWork에 반환합니다.<br>
④	FrameWork는 받은 DataSet을 정적인 Collection객체(List,Map등)로 변환하여 `XML` 또는 `JSON` 형태를 생성해주는 Page(혹은 servlet이나 dll)로 전달합니다.<br>
⑤	XML 또는 JSON 형태로 데이터 생성이 완료되면 IBSheet7으로 반환합니다.<br>
⑥	IBSheet7는 받은 XML 또는 JSON 데이터를 파싱하여 화면에 표시합니다.
