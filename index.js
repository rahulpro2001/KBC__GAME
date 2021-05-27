
function deleteElement(ans, n) {
    var index = ans.indexOf(n);
    if (index > -1) {
        ans.splice(index, 1);
    }
}

var currBtn;
var allOptions = new Array();
var shuffledOptions = new Array(4);
var totalCorrectAns = 0;
var flipUsed = 0;
var reasonForQuit;
var money;
var options = ["OptionA", "OptionB", "OptionC", "OptionD"];
var amts = ['0', '1,000', '2,000', '3,000', '5,000', '10,000', '20,000', '40,000', '80,000', '1,60,000',
    '3,20,000', '6,40,000', '12,50,000', '25,00,000', '50,00,000', '1 Crore', '7 Crore'];

var downloadTimer;
function timer(time) {
    var timeleft = time;

    downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("timerSlot").innerHTML = "0";
            reasonForQuit = 'timeout';
            document.getElementById("lckBtn").disabled = true;
            ansWrong();
        } else {
            document.getElementById("timerSlot").innerHTML = timeleft;
        }
        timeleft -= 1;
    }, 1000);
}

function rem50() {

    document.getElementById("50-50img").src = "./img/fifty_fifty-cross.png";
    document.getElementById("50-50").disabled = true;
    var optionRejected = new Array();
    options.forEach(element => {
        optionRejected.push(element);
    });
    var t = 0;
    while (t < 2) {
        var item = optionRejected[Math.floor(Math.random() * optionRejected.length)];
        var option_to_Delete = document.getElementById(item).innerHTML;
        if (option_to_Delete != allOptions[0]) {
            document.getElementById(item).disabled = true;
            document.getElementById(item).innerHTML = "";
            deleteElement(optionRejected, item);
            t++;
        }
    }
}

function flipTheQuestion() {
    clearInterval(downloadTimer);
    document.getElementById("flipTheQuestion-img").src = "./img/flip_the_question-cross.png";
    document.getElementById("flipTheQuestion").disabled = true;
    flipUsed = 1;
    ansCorrect();

}

function audiencePoll() {
    document.getElementById("audiencePoll-img").src = "./img/audience_poll-cross.png";
    document.getElementById("audiencePoll").disabled = true;
    const container = document.querySelector(".data-container");
    var correctOption;
    var percentages = new Array(4);
    for (var i = 0; i < 4; i++) {
        if (shuffledOptions[i] == allOptions[0]) {
            correctOption = i;
        }
        if (i % 2 == 0) {
            percentages[i] = Math.floor(Math.random() * 20) + 1;
        }
        else {
            percentages[i] = 20 - percentages[i - 1];
        }
    }
    percentages[correctOption] += 60;



    for (let i = 0; i < 4; i += 1) {
        const value = percentages[i];
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value * 3 + "px";
        bar.style.transform = "translateX(" + i * 50 + "px)";
        const barLabel = document.createElement("label");
        barLabel.classList.add("bar_id");
        barLabel.innerHTML = value;
        bar.appendChild(barLabel);
        container.appendChild(bar);
    }

}

function askTheExpert() {
    document.getElementById("askTheExpert-img").src = "./img/ask_the_expert-cross.png";
    document.getElementById("askTheExpert").disabled = true;
    document.getElementById('expertAns').innerHTML = allOptions[0];
}

function clicked(option) {
    document.getElementById('lckBtn').disabled = false;
    options.forEach(element => {
        document.getElementById(element).style.backgroundColor = "#3c1053";
    });
    if (option == "OptionA") {
        document.getElementById("OptionA").style.backgroundColor = "blue";
        currBtn = 0;
    }
    else if (option == "OptionB") {
        document.getElementById("OptionB").style.backgroundColor = "blue";
        currBtn = 1;
    }
    else if (option == "OptionC") {
        document.getElementById("OptionC").style.backgroundColor = "blue";
        currBtn = 2;
    }
    else {
        document.getElementById("OptionD").style.backgroundColor = "blue";
        currBtn = 3;
    }
}

function clickedlck() {
    document.getElementById("lckBtn").disabled = true;
    clearInterval(downloadTimer);
    options.forEach(element => {
        document.getElementById(element).disabled = false;
    });
    document.getElementById(options[currBtn]).style.backgroundColor = "#3c1053";
    if (shuffledOptions[currBtn] != allOptions[0]) {
        reasonForQuit = 'wrongAns';
        ansWrong();
    }
    else {
        totalCorrectAns++;
        ansCorrect();
    }
}

function clickedQuit() {
    clearInterval(downloadTimer);
    if (reasonForQuit == 'wonGame') {
        document.getElementById('gameOverId').innerHTML = "CONGRATULATIONS!! 🎉✨";
        document.getElementById('reasonForQuit').innerHTML = "You've won the Game!!";
        document.getElementById('quitGame').innerHTML = money;
    }
    else if (reasonForQuit == 'wrongAns') {
        document.getElementById('reasonForQuit').innerHTML = 'WRONG ANSWER!! <br> The correct answer was  "' + allOptions[0] + '"';
        document.getElementById('quitGame').innerHTML = money;
    }
    else if (reasonForQuit == 'timeout') {
        document.getElementById('reasonForQuit').innerHTML = 'TIMEOUT!! <br> The correct answer was  "' + allOptions[0] + '"';
        document.getElementById('quitGame').innerHTML = money;
    }
    else {
        document.getElementById("quitBtn").disabled = true;
        options.forEach(option => {
            document.getElementById(option).disabled = true;
        });
        document.getElementById('quitGame').innerHTML = amts[totalCorrectAns];
    }
}

function ansWrong() {
    money = '0';
    if (totalCorrectAns >= 16) money = amts[16];
    else if (totalCorrectAns >= 10) money = amts[10];
    else if (totalCorrectAns >= 5) money = amts[5];
    options.forEach(option => {
        document.getElementById(option).disabled = true;
    });
    document.getElementById("quitBtn").click();
    // console.log(money);
}

urlEasy = "https://opentdb.com/api.php?amount=6&difficulty=easy&type=multiple";
urlMed = "https://opentdb.com/api.php?amount=6&difficulty=medium&type=multiple";
urlHard = "https://opentdb.com/api.php?amount=7&difficulty=hard&type=multiple";

function ansCorrect() {
    if (totalCorrectAns) document.getElementById('dot' + totalCorrectAns).style.color = 'green';
    if (totalCorrectAns >= 16) {
        reasonForQuit = 'wonGame';
        ansWrong();
    }
    else if (totalCorrectAns >= 10) {
        fetchData(urlHard, totalCorrectAns - 10 + flipUsed);
        document.getElementById('timerSlot').innerHTML = "";
    }
    else if (totalCorrectAns >= 5) {
        fetchData(urlMed, totalCorrectAns - 5 + flipUsed);
        timer(60);
    }
    else {
        fetchData(urlEasy, totalCorrectAns + flipUsed);
        timer(30);
    }
}

function fetchData(url, SNo) {
    var ans = new Array();

    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        document.getElementById('QId').innerHTML = data["results"][SNo]["question"];
        ans.push(data["results"][SNo]["correct_answer"]);
        ans.push(data["results"][SNo]["incorrect_answers"][0]);
        ans.push(data["results"][SNo]["incorrect_answers"][1]);
        ans.push(data["results"][SNo]["incorrect_answers"][2]);
        allOptions = [];
        for (var i = 0; i < ans.length; i++) {
            allOptions.push(ans[i]);
        }
        // console.log(allOptions[0]);           // 0th index of allOptions contains correct ans
        // console.log(SNo);

        var item1 = ans[Math.floor(Math.random() * ans.length)];
        document.getElementById('OptionA').innerHTML = item1;
        shuffledOptions[0] = item1;
        deleteElement(ans, item1);

        var item2 = ans[Math.floor(Math.random() * ans.length)];
        document.getElementById('OptionB').innerHTML = item2;
        shuffledOptions[1] = item2;
        deleteElement(ans, item2);

        var item3 = ans[Math.floor(Math.random() * ans.length)];
        document.getElementById('OptionC').innerHTML = item3;
        shuffledOptions[2] = item3;
        deleteElement(ans, item3);

        var item4 = ans[Math.floor(Math.random() * ans.length)];
        document.getElementById('OptionD').innerHTML = item4;
        shuffledOptions[3] = item4;
        deleteElement(ans, item4);
        // console.log(shuffledOptions);

    })
}
ansCorrect();

