var webViewString = JSON.parse(window.AppInventor.getWebViewString())
var setting = JSON.parse(webViewString.settings)



var basicSetting = setting.basic
if(basicSetting.darkmode==true){
    document.getElementById('switch-darkmode').children[0].checked = true
}
if(basicSetting.notifications==true){
    document.getElementById('switch-notification').children[0].checked = true
}



var schedularSetting = setting.schedular
document.getElementById("select-grade").children[schedularSetting.grade - 1].setAttribute('selected', '')
document.getElementById("select-class").children[schedularSetting.class - 1].setAttribute('selected', '')

const selects = ["A", "C", "D", "E", "F"]

for(const select of selects){
    if(schedularSetting["select" + select]!="none"){
        var element = document.getElementById("select-select" + select)
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
    document.getElementById('switch-allergy-' + allergyNo).children[0].checked = true
}



function toggled(element){
    var string = "optChange-" + element.parentElement.getAttribute("id")
    if (element.checked) {
        string += "-true"
    }
    else {
        string += "-false"
    }
    alert(string)
    window.AppInventor.setWebViewString(string)
}