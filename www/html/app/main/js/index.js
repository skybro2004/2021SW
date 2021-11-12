/*
function showTime(element){
    element.nextElementSibling.classList.toggle("show")
}

function now(element){
    element.parentNode.classList.toggle("now")
}

function breakk(element){
    element.parentNode.classList.toggle("now")
    element.parentNode.classList.toggle("break")
}


function nextPeriod(presPeriod){
    element.parentNode.classList.toggle("break")
    presPeriod
    document.getElementsByClassName("period")
}

var period = 0
var isBreak = false
function butn() {
    var periods = document.getElementsByClassName("period")
    if(isBreak==false){
        periods[period].classList.toggle("now")
        periods[period].classList.toggle("break")
        isBreak = true
    }
    else{
        periods[period].classList.toggle("break")
        if(period==6){
            period = 0
        }
        else{
            period += 1
        }
        periods[period].classList.toggle("now")
        isBreak = false
    }
}
*/


var webViewString = JSON.parse(window.AppInventor.getWebViewString())
if(webViewString.id=="logout"){
    document.getElementById("login").classList.toggle("disable")
}


function locate(element) {
    var addr = element.getAttribute('id')
    window.AppInventor.setWebViewString("locate-" + addr)
}
document.getElementById("test").innerHTML = window.AppInventor.getWebViewString()