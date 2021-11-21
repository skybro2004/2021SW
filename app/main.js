function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}



//앱 설정 가져옴
var webViewString = JSON.parse(window.AppInventor.getWebViewString())
var setting = webViewString.settings



/*
if(webViewString.id=="logout"){
    document.getElementById("login").classList.remove("disable")
}
*/



//날짜 정하기(주말일경우, 다음주 월요일 날짜 시간표/급식 표시 등)
var date = new Date()
const weekdays = ["월", "화", "수", "목", "금"]


if(17<date.getHours()){
    date.setDate(date.getDate() + 1)
}

if(date.getDay()==0){
    date.setDate(date.getDate() + 1)
}
else if(date.getDay()==6){
    date.setDate(date.getDate() + 2)
}



//api 엔드포인트
var endpoint = "https://api.skybro2004.com"



//시간표 불러오는 코드
var schedularSetting = setting.schedular

var url = endpoint + "/schedular"
url += "?officeCode=" + "J10"
url += "&schlCode=" + "7530081"
url += "&grade=" + schedularSetting.grade
url += "&class=" + schedularSetting.class
url += "&date=" + getFormatDate(date)

fetch(url)
    .then(res => {
        return res.json()
    })
    .then(data => {
        document.getElementsByClassName("timetable-header")[0].innerHTML = weekdays[date.getDay() - 1] + "요일 시간표"

        if(data.code==200){
            for(var i=0; i<data.data.length; i++){
                var item = data.data[i].item
                if(item=="선택 A" && schedularSetting.selectA!="none"){
                    item = schedularSetting.selectA
                }
                else if(item=="선택 C" && schedularSetting.selectC!="none"){
                    item = schedularSetting.selectC
                }
                else if(item=="선택 D" && schedularSetting.selectD!="none"){
                    item = schedularSetting.selectD
                }
                else if(item=="선택 E" && schedularSetting.selectE!="none"){
                    item = schedularSetting.selectE
                }
                else if(item=="선택 F" && schedularSetting.selectF!="none"){
                    item = schedularSetting.selectF
                }
                document.getElementsByClassName("lessonName")[i].innerHTML = item
            }
        }
        else if(data.code==404){
            document.getElementsByClassName("timetable-header")[0].innerHTML = "시간표가 없어요!"
            document.getElementsByClassName("timetable")[0].innerHTML = "(err no : 404)"
        }
        else{
            document.getElementsByClassName("timetable-header")[0].innerHTML = "알 수 없는 에러가 발생했습니다"
            document.getElementsByClassName("timetable")[0].innerHTML = "(err no : " + data.code + ")"
        }
    })
    .catch(err => {
        document.getElementsByClassName("timetable-header")[0].innerHTML = "알 수 없는 에러가 발생했습니다"
        document.getElementsByClassName("timetable")[0].innerHTML = err
    })


//현재 몇교신지 표시
var temp = document.getElementsByClassName("now")
for(const element of temp){
    element.classList.remove("now")
}
var temp = document.getElementsByClassName("break")
for(const element of temp){
    element.classList.remove("break")
}
var currentDate = new Date()
var currentTime = 100*currentDate.getHours() + currentDate.getMinutes()
var period = -1
var isBreak = false
if(0<currentDate.getDay()<6){
    if(0900<=currentTime && currentTime<0950){
        period = 0
        isBreak = false
    }
    else if(0950<=currentTime && currentTime<1000){
        period = 0
        isBreak = true
    }
    else if(1000<=currentTime && currentTime<1050){
        period = 1
        isBreak = false
    }
    else if(1050<=currentTime && currentTime<1100){
        period = 1
        isBreak = true
    }
    else if(1100<=currentTime && currentTime<1150){
        period = 2
        isBreak = false
    }
    else if(1150<=currentTime && currentTime<1200){
        period = 2
        isBreak = true
    }
    else if(1200<=currentTime && currentTime<1250){
        period = 3
        isBreak = false
    }
    else if(1250<=currentTime && currentTime<1350){
        period = 4
        isBreak = false
    }
    else if(1350<=currentTime && currentTime<1440){
        period = 5
        isBreak = false
    }
    else if(1440<=currentTime && currentTime<1450){
        period = 5
        isBreak = true
    }
    else if(1450<=currentTime && currentTime<1540){
        period = 6
        isBreak = false
    }
    else if(1540<=currentTime && currentTime<1550){
        period = 6
        isBreak = true
    }
    else if(1550<=currentTime && currentTime<1640){
        period = 7
        isBreak = false
    }
    else{
        period = -1
    }
}
else{
    period = -1
}

if(period==-1){
    
}
else{
    if(isBreak){
        document.getElementsByClassName("period")[period].classList.add("break")
    }
    else{
        document.getElementsByClassName("period")[period].classList.add("now")
    }
}



//급식 먹고 나서 팝업버튼 띄움
if((0<currentDate.getDay()<6) && (1250<=currentTime && currentTime<1800) && webViewString.lastSurvey!=getFormatDate(currentDate)){
    document.getElementById("vote").classList.remove("disable")
}
else{
    document.getElementById("vote").classList.add("disable")
}



//급식 표시하는 코드
var mealSetting = setting.meal

var url = endpoint + "/meal"
url += "?officeCode=" + "J10"
url += "&schlCode=" + "7530081"
url += "&date=" + getFormatDate(date)

var meals = []

fetch(url)
    .then(res => {
        return res.json()
    })
    .then(data => {
        var mealList = document.getElementsByClassName("mealList")[0]
        if(data.code==200){
            var allergy = mealSetting.allergy
            for(const item of data.meal){
                meals.push(item.name)
                var temp = document.createElement("li")
                for(const allergyNo of item.allergy){
                    if(allergy.includes(allergyNo)){
                        temp.classList.add("allergy")
                    }
                }
                temp.innerHTML = item.name
                mealList.appendChild(temp)
            }
            window.AppInventor.setWebViewString("meals-" + JSON.stringify(meals))
        }
        else if(data.code==404){
            mealList.innerHTML = "급식이 없어요!"
            document.getElementsByClassName("mealList-footer")[0].innerHTML = ""
        }
        else{
            mealList.innerHTML = "알 수 없는 에러가 발생했습니다<br>(err no : " + data.code + ")"
            document.getElementsByClassName("mealList-footer")[0].innerHTML = ""
        }
    })



//앱 내에서 스크린 이동
function locate(element) {
    var addr = element.getAttribute('id')
    window.AppInventor.setWebViewString("locate-" + addr)
}



//앱 내에서 외부링크 이동
function externalLink(element) {
    window.AppInventor.setWebViewString("open-" + element.getAttribute("href"))
}