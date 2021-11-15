var pageIndex = 0



function rate(score){
    var element = document.getElementsByClassName("star-inner")
    for(var i=0; i<score; i++){
        element[pageIndex*5 + i].classList.add("star-enable")
        element[pageIndex*5 + i].classList.remove("star-disable")
    }
    for(var i=4; score<=i; i--){
        element[pageIndex*5 + i].classList.add("star-disable")
        element[pageIndex*5 + i].classList.remove("star-enable")
    }
    document.getElementsByClassName("star-score")[pageIndex].innerHTML = score + "/5"
    document.getElementsByClassName("btn-next")[pageIndex].classList.remove("disable")
}


function next(){
    document.getElementsByClassName("container")[pageIndex].classList.add("disable")
    setTimeout(function(index){
        document.getElementsByClassName("container")[index].classList.add("display-none");
    }, 300, pageIndex)

    pageIndex += 1

    document.getElementsByClassName("container")[pageIndex].classList.remove("display-none");
    setTimeout(function(index){
        document.getElementsByClassName("container")[index].classList.remove("disable")
    }, 300, pageIndex)
}