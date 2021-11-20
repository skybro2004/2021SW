function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}





var pageIndex = 0
var data = []
var temp = 0


var mealList = JSON.parse(window.AppInventor.getWebViewString())
var randIndex = Math.floor(Math.random() * mealList.length)
var randMeal = mealList[randIndex]

document.getElementById("randMeal").innerHTML = randMeal + "은(는) 어땠나요?"


function rate(score){
    temp = score

    var element = document.getElementsByClassName("star-inner")
    for(var i=0; i<score; i++){
        element[i].classList.add("star-enable")
        element[i].classList.remove("star-disable")
    }
    for(var i=4; score<=i; i--){
        element[i].classList.add("star-disable")
        element[i].classList.remove("star-enable")
    }

    var footer = document.getElementsByClassName("rate-footer")[pageIndex]
    for(var i=0; i<footer.children.length; i++){
        footer.children[i].classList.add("disable")
    }
    footer.children[score - 1].classList.remove("disable")
    document.getElementsByClassName("star-score")[0].innerHTML = score + "/5"
    document.getElementsByClassName("btn-next")[pageIndex].disabled = false
}


function slide(element) {
    temp = element.value

    var value = element.value
    var footer = document.getElementsByClassName("rate-footer")[pageIndex]
    for(var i=0; i<footer.children.length; i++){
        footer.children[i].classList.add("disable")
    }
    footer.children[parseInt(value) + 2].classList.remove("disable")
    document.getElementsByClassName("btn-next")[pageIndex].disabled = false
}


function next(){
    data.push(temp)

    document.getElementsByClassName("container")[pageIndex].classList.add("disable")

    pageIndex += 1

    document.getElementsByClassName("container")[pageIndex].classList.remove("invisible")
}



function done() {
    next()
    alert("send => " + data + randIndex)
    var url = "https://api.skybro2004.com"
    url += "/mealSurvey"
    url += "?date=" + getFormatDate(new Date)

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            quantity:data[0],
            quality:data[1],
            menuIndex:randIndex,
            menuName:randMeal,
            menuRate:data[2]
        })
    })


    window.AppInventor.setWebViewString("lastSurvey-" + getFormatDate(new Date))
}



function sendMsg() {
    var msg = document.getElementsByClassName("textbox-send")[0].value
    if(msg==""){
        document.getElementsByClassName("textbox-send")[0].blur()
        return
    }
    alert("POST => " + msg)
    
    var url = "https://api.skybro2004.com"
    url += "/mealMsg"
    url += "?date=" + getFormatDate(new Date)

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            msg: msg,
        })
    })

    document.getElementsByClassName("textbox-send")[0].value = ""
    document.getElementsByClassName("textbox-send")[0].blur()

    closeScreen()
}



function closeScreen() {
    window.AppInventor.setWebViewString("close")
}