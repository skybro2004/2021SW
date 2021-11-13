var webViewString = JSON.parse(window.AppInventor.getWebViewString())
var setting = webViewString.settings



var basicSetting = setting.basic
if(basicSetting.darkmode==true){
    document.getElementById('switch-basic-darkmode').children[0].checked = true
}
if(basicSetting.notifications==true){
    document.getElementById('switch-basic-notifications').children[0].checked = true
}


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




var mealSetting = setting.meal
for(const allergyNo of mealSetting.allergy){
    document.getElementById('switch-meal-allergy-' + allergyNo).children[0].checked = true
}



function toggled(element){
    var string = "optChange-" + element.parentElement.getAttribute("id")
    if (element.checked) {
        string += "-true"
    }
    else {
        string += "-false"
    }
    window.AppInventor.setWebViewString(string)
}


function selected(element){
    var string = "optChange-" + element.getAttribute("id") + "-" + element.value
    alert(string)
    window.AppInventor.setWebViewString(string)
}