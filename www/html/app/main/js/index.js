function expand(element){
    element.classList.toggle('rotate')
    element.parentNode.nextElementSibling.classList.toggle("expanded")
}


function expandd(element){
    element.classList.toggle('rotate')
    element.parentNode.parentNode.classList.toggle("expanded")
}

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