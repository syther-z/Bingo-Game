var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var mainWindow = document.getElementsByClassName("layout")[0];
var hostWindow = document.getElementById("hostWindow");
var joinWindow = document.getElementById("joinWindow");
var hostCode = document.getElementById("hostCode");
var joinCode = document.getElementById("joinCode");
var start = document.getElementById("start");
var noOfPlayer = document.getElementsByClassName("noOfPlayer")[0];
var noOfPlaye = document.getElementsByClassName("noOfPlaye")[0];
var pairCode;
var submit = document.getElementById("submit");
var container = document.getElementsByClassName("container")[0];
var conclusion = document.getElementsByClassName("conclusion")[0];
var result = document.getElementsByClassName("result")[0];
var goToHome = document.getElementById("goToHome");
var gameTitle = document.getElementsByClassName('titleContainer')[0];
var timeCounter = document.getElementsByClassName("timer")[0];
var timerCircle = document.getElementsByClassName("timerCircle")[0];
const socket = io();

btn1.addEventListener("click", event=>{
hostWindow.style.display = "flex";
mainWindow.style.display = "none";
pairCode = rand();
hostCode.innerHTML = pairCode;
myTurn = 1;
socket.emit("leader", pairCode);
})


btn2.addEventListener("click", event=>{
joinWindow.style.display = "flex";
mainWindow.style.display = "none";
})

submit.addEventListener("click", event=>{
    socket.emit("joincode", joinCode.value);
    pC = parseInt(joinCode.value);
})


socket.on("joinresponse", val=>{
    myTurn = val[1];
    // alert(val[0]+" "+myTurn);
    if(val[0]){
       submit.style.display = "none";
       joinCode.style.display = "none";
       noOfPlaye.style.display = "block";
    }
})

socket.on("canStart", mess=>{
    if(mess){ 
    start.style.display = "block";
    // start.innerHTML = `<a href="/game?id=${pairCode}">START </a>`;
}
})

socket.on("metaRefresh", mess=>{
   container.style.display = mess;
})
 
start.addEventListener("click", event=>{
    socket.emit("allStart", pairCode);
    // container.style.display = "flex";
    timeTerminater = false;
        timerCircle.style.display = "flex";
       
})


socket.on("noOfPlayer", mess=>{
    noOfPlayer.innerHTML = "No. of Player: "+mess;
    noOfPlaye.innerHTML = "No. of Player: "+mess;
})



function rand(){
    return Math.ceil(Math.random()*1000000);
}


socket.on("shiftTurn", (e)=>{
     myTurn--;
})


// socket.on("winnerAnn", mess=>{
//     // alert("Player "+mess);
//    resultMessage(mess);
// })

goToHome.addEventListener("click", event=>{
    location.reload();
});

function resultMessage(mess){
    conclusion.style.display = "flex";
    result.innerHTML = mess;
}



async function writingEffect (ms){
    word = "BINGO...";
//    gameTitle.innerHTML = "";
    for(let i = 0; i < 10; i--){
        if(i==-100) i = 0;
        for(let j = 0; j < word.length; j++){
            gameTitle.textContent+=word[j];
           await sleep(ms);
        }
        await sleep(2*ms);
        gameTitle.textContent = "";
    }
}