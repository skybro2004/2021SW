const canvas = document.getElementsByTagName("canvas")
for(const element of canvas){
    element.width = element.parentElement.clientWidth
    element.height = element.parentElement.clientHeight
}

window.onresize = function(){
    const canvas = document.getElementsByTagName("canvas")
    for(const element of canvas){
        element.width = element.parentElement.clientWidth
        element.height = element.parentElement.clientHeight
    }
}



function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}



Chart.defaults.font.size = 18;

function drawChart(id, type, title, data){
    new Chart(document.getElementById(id), {
        type: type,
        data: data,
        options : {
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            }
        }
    });
}


var mealList = []


/*var url = "https://api.skybro2004.com"
url += "/meal"
url += "?date=" + getFormatDate(new Date())

fetch(url)
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)

    })*/



var url = "https://api.skybro2004.com"
url += "/mealSurvey"
url += "?date=" + getFormatDate(new Date())

fetch(url)
    .then(res => {
        console.log(res)
        return res.json()
    })
    .then(data => {
        console.log(data)

        if(data.header.code==404){
            var temp = document.getElementsByClassName("content-container")
            for(const element of temp){
                element.classList.add("disable")
            }
            document.getElementsByClassName("card-not-available")[0].classList.remove("disable")

            return
        }

        drawChart("meal-quantity", "pie", "급식의 양", {
            labels: [
                "너무 적음",
                "적음",
                "적당함",
                "많음",
                "너무 많음"
            ],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850"
                ],
                borderColor: "rgb(255, 255, 255, 0.2)",
                data: data.data.quantity
            }]
        })

        drawChart("meal-quality", "pie", "급식의 간", {
            labels: [
                "너무 싱거움",
                "싱거움",
                "적당함",
                "짬",
                "너무 짬"
            ],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850"
                ],
                borderColor: "rgb(255, 255, 255, 0.2)",
                data: data.data.quality
            }]
        })

        var mealList = []
        for(const item of data.header.meal.meal){
            mealList.push(item.name)
        }

        new Chart(document.getElementById("menu"), {
            type: 'bar',
            data: {
                labels: mealList,
                datasets: [{
                    label: "만족도(5점만점)",
                    backgroundColor: [
                        "#3e95cd",
                        "#8e5ea2",
                        "#3cba9f",
                        "#e8c3b9",
                        "#c45850",
                        "#2184bf",
                        "#f4c6dc",
                    ],
                    data: data.data.menuRate
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "메뉴 만족도"
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        min:0,
                        max:5
                    }
                }
            }
        });

    })


/*
drawChart("voted", "line", "주간 투표율", {
    labels: ["월", "화", "수", "목", "금"],
    datasets: [
        {
            data : [12, 20, 16, 14, 36],
            label: "투표율",
            borderColor: "#3e95cd",
            fill: true,
            tension: 0.2
        }
    ]
})
*/



/*
new Chart(document.getElementById("allergy"), {
    type: 'polarArea',
    data: {
        labels: [
            "메밀",
            "대두",
            "게",
            "새우",
            "복숭아",
            "호두",
            "조개류",
            "굴",
        ],
        datasets: [{
            label: "Population (millions)",
            backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
            ],
            borderColor: "rgb(255, 255, 255, 0.2)",
            data: [
                1,
                3,
                2,
                2,
                1,
                4,
                3,
                2,
            ]
        }]
    },
    options: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: '알레르기'
        }
    }
});
*/



var url = "https://api.skybro2004.com"
url += "/mealMsg"
url += "?date=" + getFormatDate(new Date())

fetch(url)
    .then(res => {
        console.log(res)
        return res.json()
    })
    .then(data => {
        if(data.data.msgList==[]){
            document.getElementsByClassName("messages")[0].classList.add("disable")
            return
        }
        var msgList = document.getElementsByClassName("message-list")[0]
        for(const msg of data.data.msgList){
            var temp = document.createElement("li")
            temp.innerHTML = msg
            msgList.appendChild(temp)
        }
    })