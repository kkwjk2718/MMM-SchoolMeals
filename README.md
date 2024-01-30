# MMM-SchoolMeals

neis 급식api를 사용하여 학교 급식을 받아와 매직미러에 표시해주는 모듈입니다.<br/>
<img width="960" alt="image" src="https://github.com/kkwjk2718/MMM-SchoolMeals/assets/158192089/4fbf9c6c-7e29-4064-b7c7-eb2597ecdd37">

config.js파일은 아래와 같이 추가합니다.<br/>
--------------------------------------------------------------------------------------------------------------
        {
            module: "MMM-SchoolMeals",
            position: "center",
            config: {
                apiKey: "your_api_key", //neis에서 api키를 발급받아주세요 .
                atptOfcdcScCode: "시도교육청코드", //학교가 위치한 지역의 교육청 코드를 입력해주세요.
                sdSchulCode: "학교코드" //학교 코드를 입력해주세요.
            }
        }
--------------------------------------------------------------------------------------------------------------

<설치 방법><br/>
1.나이스 급식정보링크에 접속하여 api키를 발급받습니다.(https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17320190722180924242823&infSeq=2)<br/>
2.나이스 급식정보링크에 접속하여 아래로 스크롤하면 Sheet를 발견할 수 있습니다. 그곳에서 본인의 학교를 입력하여 시도교육청 코드와 학교명을 확인합니다. ex) 시도교육청코드: S10, 학교코드: 9010033<br/>
3. /magicmirror2/modules 폴더로 이동한 다음 git clone https://github.com/kkwjk2718/MMM-SchoolMeals.git 를 입력하여 코드를 다운받습니다.<br/>
4. chmod -R 777 MMM-SchoolMeals 을 입력하여 모듈 폴더의 권한을 설정합니다.<br/>
5. npm install request 를 입력하여 설치합니다.<br/>
6. config.js파일로 이동하여 설정을 구성합니다.<br/>

--------------------------------------------------------------------------------------------------------------

@ made by kkw
