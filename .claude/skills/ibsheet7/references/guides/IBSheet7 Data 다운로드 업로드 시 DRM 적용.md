# IBSheet7 Data 다운로드 업로드 시 DRM 적용

IBSheet7   Data 다운로드/업로드 (excel,txt) 시 DRM 모듈 사용법

ibsheet는 javascript 기반의 제품으로 엑셀 다운로드/업로드 시 서버에서 엑셀 파일을 생성하거나 읽어 들이게 된다.

먼저 다운로드 과정은 다음과 같다.

위와 같이 xls,xlsx 파일을 서버측에서 생성이 이루어진다. 따라서 DRM 모듈을 적용시키려면 생성된 엑셀 파일을 클라이언트로 다운로드 하기 전에 암호화 모듈로 파일을 암호화 시켜면 된다.

서버의 Down2Excel.jsp 파일을 열어 다음 부분에 DRM 업체에서 제공하는 암호화 모듈을 삽입한다.

Down2Excel.jsp 파일에 180~245 line 소스 코드

... 상단 생략 ... 

if (bToken) {

   // 파라메터 정보를 얻음

    String data = ibExcel.getData();

    // 파라메터 정보를 다시 설정함 (예, 암호화된 파라메터를 복호화 처리를 하여 다시 설정)

    ibExcel.setData(data);

    // ExtendParam 사용 가능

    //String exParam = ibExcel.getExtendParam();

    // 엑셀 워크북을 생성

    Workbook workbook = ibExcel.makeExcel();

    //IllegalStateException 예방 코드를 response.getOutputStream(); 호출 전 시점으로 이동

out.clear();

out = pageContext.pushBody();

/* //다운로드 1 을 주석 처리한다.

    // 다운로드 1. 생성된 엑셀 문서를 바로 다운로드 받음

    ServletOutputStream out2 = response.getOutputStream();

    //POI 3.10 엑셀 암호 기능 구현 버전 사용 시, 아래 "workbook.write(out2);"을 하단 주석처리된 코드로 대체한다.

    workbook.write(out2);

    //com.ibleaders.ibsheet7.ibsheet.excel.ProtectXLSX.encryptXLSX("d:/", ibExcel.getWorkbookPassword(), workbook, out2);

    out2.flush();

    out2.close();

*/

    // 다운로드 2. 생성된 엑셀 문서를 서버에 저장

    // 다운로드 2를 주석 해제 한다.

    // 1. 엑셀 파일 생성

    String fileName = ibExcel.getDownloadFileName();

    FileOutputStream out2 = new FileOutputStream (webRootPath + "/" + fileName);

    workbook.write(out2);

    out2.close();

    //2. 생성한 파일을 암호화 한다.

//DRM 업체에서 제공하는 모듈을 여기에 넣어서 webRootPath + "/" + fileName 파일을 암호화 한다.

//예상 코드File ff = new File(webRootPath + "/" + fileName);

product.Encrypt(ff);  //<--DRM 업체에서 제공하는 암호화 함수로 파일을 암호화 하자

    //3. 파일 다운로드 로직.

    File file = new File( webRootPath + "/" + fileName ); 

    int fileLength = (int)file.length();

    response.setContentLength(fileLength);

    try {

        if (file.isFile()) {

            FileInputStream fileIn = new FileInputStream(file);

            ServletOutputStream out3 = response.getOutputStream();

            byte[] outputByte = new byte[fileLength];

            while (fileIn.read(outputByte, 0, fileLength) != -1) {

                out3.write(outputByte, 0, fileLength);

            }

            fileIn.close();

            out3.flush();;

            out3.close();

        } 

    } finally {

        file.delete();

    }

    // 엑셀 다운 완료 후 싱크 객체로 할당받은 권한을 반환한다.

    Synchronizer.release();

    bToken = false;

}

.... 이하 생략 ....

파일 업로드시 과정은 다음과 같다.

여기서는 사용자가 선택한 엑셀 파일을 서버에서 파싱하기 전에 복호화 해야 한다.

따라서 LoadExcel.jsp 에서 복호화를 하기위한 구간을 두고 있다.

LoadExcel.jsp (93~106 라인 소스)

... 이상 생략   ...

if ("".equals(frm)) {

<w:t>// 서버에 저장된 파일명

<w:t xml:space="preserve">String uploadFileName = ibExcel.getUploadFileName();

</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>System.out.println("uploadFileName : " + uploadFileName);

</w:r><w:r w:rsidRPr="0074748A"><w:rPr><w:b/><w:color w:val="FF0000"/></w:rPr><w:t>// TODO

<w:t>// 업로드된 엑셀 파일을 가공함 (예, 엑셀문서를 DRM 처리함)

        //클라이언트에서 가져온 엑셀 파일을 복호화 해야만 파싱이 가능하다.

        //예상 코드        File fi = new File("uploadFileName : " + uploadFileName);

        product.DecriptyFile(fi); //사용자 파일을 암호화 시킴

</w:r><w:proofErr w:type="gramStart"/><w:r><w:t>// 사용자가 업로드한 파일 파싱..

<w:t xml:space="preserve">String uploadFileNameOrg = ibExcel.getUploadFileNameOrg();

</w:r><w:proofErr w:type="spellStart"/><w:r><w:t>out.print(ibExcel.LoadExcelFile(false));

}

...  이하 생략 ...