# 전자 정부 표준 프레임 웍에서 ajax Error 처리

전자 정부 표준 프레임 웍에서 ajax Error 처리

서버사이드 error handler 설정전자정부 표준프레임웍에서 error 발생시 처리 페이지는 dispatcher-servlet.xml 파일에 정의 되어있다.

    <bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">

        <property name="defaultErrorView" value="cmmn/bizError"/>

        <property name="exceptionMappings">

            <props>

                <prop key="org.springframework.dao.DataAccessException">cmmn/dataAccessFailure</prop>

                <prop key="org.springframework.transaction.TransactionException">cmmn/transactionFailure</prop>

                <prop key="egovframework.rte.fdl.cmmn.exception.EgovBizException">cmmn/egovError</prop>

                <prop key="org.springframework.security.AccessDeniedException">cmmn/egovError</prop>

            </props>

        </property>

    </bean>

[기본 설정 내용]

위와 같은 설정은 일반적인 웹페이지에서는 크게 문제가 되지 않으나 IBSheet의 조회/저장과 같은 Ajax 통신을 사용시에는 문제가 된다. Ajax 통신은 서버로부터 xml이나 json 자료구조를 받기를 기대하는데, 위와 같은 에러페이지는html형식의 데이터를 리턴함으로 ajax 통신 후 정확한 에러메세지를 받아 참조하기 어렵게 된다. 따라서 프레임웍을 호출하는 reqeust의 헤더 내용을 기준으로 현재 호출이 ajax인지 아닌지 여부를 판별하여 그에 맞는 결과를 리턴해 주도록 한다.

<bean class="org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerExceptionResolver" p:order="1" />

    <bean id="handlerExceptionResolver" class="egovframework.ib.util.IBExceptionHandler" p:order="2" >

    <!-- from ExceptionHandler -->

        <property name="ajaxErrorView" value="cmmn/ajaxException" />

        <!-- from SimpleMappingExceptionResolver -->

        <property name="defaultErrorView" value="cmmn/egovError"/>

        <property name="exceptionMappings">

            <props>

                <prop key="org.springframework.dao.DataAccessException">cmmn/dataAccessFailure</prop>

                <prop key="org.springframework.transaction.TransactionException">cmmn/transactionFailure</prop>

                <prop key="egovframework.rte.fdl.cmmn.exception.EgovBizException">cmmn/egovError</prop>

                <prop key="org.springframework.security.AccessDeniedException">cmmn/egovError</prop>

            </props>

        </property>

    </bean>

[변경된 에러 핸들러]

위 내용을 보면 IBExceptionHandler에서 Request의 내용을 판별하여 ajax인 경우에는 ajaxException.jsp 페이지로 포워딩하고, 그렇지 않은 경우에는 일반적인 에러헨들러 내용을 따르도록 하고 있다.

package egovframework.ib.util;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

public class IBExceptionHandler extends SimpleMappingExceptionResolver {

    private String ajaxErrorView;

    @Override

    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object o, Exception e) {

        if( isAjax(request) ) {

            String exceptionMessage =  "ERROR OCCOR!!!\n" + getExceptionMessage(e);

            ModelAndView m = new ModelAndView(ajaxErrorView);

            m.addObject("exceptionMessage", exceptionMessage);

//            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

            return m;

        } else {

            return super.resolveException(request, response, o, e);

        }

    }

    private String getExceptionMessage(Throwable e) {

        String message = "";

        while( e != null ) {

            message += e.getMessage() + "\n";

            e = e.getCause();

        }

        return message;

    }

    //헤더에 X-Requested-With 값이 XMLHttpRequest인 경우 AJAX 통신으로 간주한다.

    private boolean isAjax(HttpServletRequest request) {

        return "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));

    }

    public void setAjaxErrorView(String ajaxErrorView) {

        this.ajaxErrorView = ajaxErrorView;

    }

    public String getAjaxErrorView() {

        return ajaxErrorView;

    }

}

[IBExceptionHandler.java]ajaxException.jsp 페이지에서 전달받은 에러 메세지를 json 형식으로 출력한다.

<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%><%@ page import="java.util.HashMap,org.json.simple.JSONValue" %><% HashMap mp = new HashMap();

mp.put("Code", -1);

mp.put("Message",request.getAttribute("exceptionMessage")+"");

out.println("{'Result':"+JSONValue.toJSONString(mp)+"}" );

%>

[ajaxException.jsp]

2. 리턴된 error json 에 대한 시트 처리

조회 저장이 이루어진 이후에 OnSearchEnd()나 OnSaveEnd() 이벤트를 통해 error json의 code나 message 값이 리턴되는데, 이 이벤트를 오버라이드 하는 형태로 에러 발생시 alert으로 메세지 내용을 출력하게 한다.

ibsheetinfo.js 에서 OnSearchEnd()이벤트나 OnSaveEnd()이벤트를 오버라이드 한다.

/** IBSheet를 생성(호출 위치에서 동적 생성)*/function createIBSheet(sheetid, width, height, locale) {    var div_str = "";    if (!locale) locale = "";    Grids.Locale = locale;    div_str += "<div id='DIV_" + sheetid + "' style='width:" + width + ";height:" + height + ";'>";    div_str += "<script> IBSheet('<ibsheet Sync=\"1\" Data_Sync=\"0\"> </ibsheet>',\"DIV_" + sheetid + "\", \"" + sheetid + "\"); </script>"    div_str += "</div>\n";    //<![CDATA[    document.write(div_str);    //]]>      OnSearchEndOverRide (sheetid); //추가

OnSaveEndOverRide(sheetid);//추가

}

//추가 메서드

function OnSearchEndOverRide(id){

    try{

        var dummySearchEnd=null;

        //OnSearchEnd 를 dummySearchEnd 담는다.

        if(typeof(window[id+"_OnSearchEnd"])!="undefined"){ 

            if(typeof window[id+"_OnSearchEnd"] == "function"){

                dummySearchEnd = window[id+"_OnSearchEnd"];

            }

        }

        //SearchEnd 오버라이드

        window[id+"_OnSearchEnd"] = function(Code, Msg, StCode, StMsg, Response) {

          //오류가 있을때 alert으로 메세지를 띄운다.

          if(Code <0){

             alert(Msg);

}

            if(dummySearchEnd){

              //화면에서 정의한 OnSearchEnd구문을 동작시킨다.

                dummySearchEnd(Code, Msg, StCode, StMsg, Response);            }

        }

    }catch(e){

    }

}

function OnSaveEndOverRide(id){

    try{

        var dummySaveEnd=null;

        //OnSaveEnd 를 dummyResize 담는다.

        if(typeof(window[id+"_OnSaveEnd"])!="undefined"){ 

            if(typeof window[id+"_OnSaveEnd"] == "function"){

                dummySaveEnd = window[id+"_OnSaveEnd"];

            }

        }

        //SaveEnd 오버라이드

        window[id+"_OnSaveEnd"] = function(Code, Msg, StCode, StMsg, Response) {

//오류가 있을때 alert으로 메세지를 띄운다.

          if(Code <0){

             alert(Msg);

}

            if(dummySaveEnd){

             //기존에 정의한 OnSaveEnd구문을 동작시킨다.

                dummySaveEnd(Code, Msg, StCode, StMsg, Response); 

            }

        }

    }catch(e){

    }

}