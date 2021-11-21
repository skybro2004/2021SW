//앱 내 설정 불러오기
var webViewString = JSON.parse(window.AppInventor.getWebViewString())
var setting = webViewString.settings



//설정 적용
var basicSetting = setting.basic

//기본설정
if(basicSetting.darkmode==true){
    document.getElementById('switch-basic-darkmode').children[0].checked = true
}
if(basicSetting.notifications==true){
    document.getElementById('switch-basic-notifications').children[0].checked = true
}

//시간표
var schedularSetting = setting.schedular
document.getElementById("select-schedular-grade").children[schedularSetting.grade - 1].setAttribute('selected', '')
document.getElementById("select-schedular-class").children[schedularSetting.class - 1].setAttribute('selected', '')

const selects = ["A", "C", "D", "E", "F"]

for(const select of selects){
    if(schedularSetting["select" + select]!="none"){
        var element = document.getElementById("select-schedular-select" + select)
        for(var i=0; i<element.children.length; i++){
            if(element.children[i].getAttribute("value")==schedularSetting["select" + select]){
                element.children[i].setAttribute('selected', '')
                break
            }
        }
    }
}

//알레르기
var mealSetting = setting.meal
for(const allergyNo of mealSetting.allergy){
    document.getElementById('switch-meal-allergy-' + allergyNo).children[0].checked = true
}



//스위치 눌렀을때
function toggled(element){
    if(element.parentElement.getAttribute("id")=="switch-basic-darkmode"){
        alert("다크모드는 준비중이에요!")
        element.checked = false
        return
    }
    if(element.parentElement.getAttribute("id")=="switch-basic-notifications"){
        alert("알림 기능은 준비중이에요!")
        element.checked = false
        return
    }


    var string = "optChange-" + element.parentElement.getAttribute("id")
    if (element.checked) {
        string += "-true"
    }
    else {
        string += "-false"
    }
    window.AppInventor.setWebViewString(string)
}



//셀렉트박스 선택했을때
function selected(element){
    var string = "optChange-" + element.getAttribute("id") + "-" + element.value
    window.AppInventor.setWebViewString(string)
}