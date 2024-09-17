document.body.onload = main;


var winningColor = "#280b42";

var boxes = document.getElementsByClassName("boxes");
var board = document.getElementsByClassName("board")[0];
var words = document.getElementsByClassName("words");
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
var pC;
var myTurn;
var roundTurn = 1;
var t = new Date();
function rand2(){
    return Math.ceil(Math.random()*100)%arr.length;
}

function fill(){
    // getCode();
for(let i = 0; i < boxes.length; i++){
    let x = rand2();
    boxes[i].innerHTML = arr[x];
    remove(arr, x);
}
}

async function eye(){
for(let i = 0; i < 100; i--){
    await sleep(2000);
 
    let inc = isWinning();
    if(inc>0)
   words[inc-1].style.color = "wheat"; 
    if(inc>=5){
        socket.emit("gotWinner",myTurn);
        alert("You Won");
        location.reload();
    }
   var myttt =  document.getElementsByClassName("myttttt")[0];
    if(myTurn==roundTurn){
        myttt.textContent = "Turn: 🟢";
        // board.classList.remove("no-animation");
    } else{
         myttt.textContent = "Turn: 🔴";
        // board.classList.add("no-animation");
    }
}


}




function main(){
fill();
eye();
}


function remove(x, idx){
    for(let i = idx; i < x.length-1; i++){
        x[i] = x[i+1];
    }
    x.pop();
}


for(let i = 0; i < boxes.length; i++){
    boxes[i].addEventListener("click", event=>{

        if(myTurn!=roundTurn) return;
        if(boxes[i].innerHTML==="") return;

        boxes[i].style.backgroundColor = "purple";
        let cc = (pairCode!=undefined) ? pairCode : pC;
        socket.emit("gameBox", [boxes[i].innerHTML, cc]);
        boxes[i].innerHTML = "";
    })
}


function getCode(){
let string = window.location.href;
let x = "";
for(let i = string.length-1; i>=0; i--){
    if(string[i]==='=') break;
     x = string[i]+x;
}
console.log(x);
pairCode = parseInt(x);
}



socket.on("removeValue", val=>{
    // console.log("yes");
    for(let i = 0; i < boxes.length; i++){
        if(boxes[i].innerHTML===val){
            boxes[i].innerHTML = "";
            boxes[i].style.backgroundColor = "purple";
            break;
        }
    }
})


socket.on("turnChange", mess=>{
    roundTurn = mess;
})


// 00 01 02 03 04
// 05 06 07 08 09
// 10 11 12 13 14
// 15 16 17 18 19
// 20 21 22 23 24



function isWinning(){
    let totalSum = 0;
    for(let i = 0; i < 5; i++){
        let sum = 0;
        for(let j = i*5; j < ((i*5)+5); j++){
            if(boxes[j].style.backgroundColor==="purple")sum++;
        }
        if(sum==5) totalSum++;
    }


    for(let i = 0; i < 5; i++){
        let sum = 0;
        for(let j = i; j <= (i+20); j+=5){
            if(boxes[j].style.backgroundColor==="purple")sum++;
        }
        if(sum==5) totalSum++;
    }

     let x = 0;
     for(let i = 0; i < 25; i+=6){
        if(boxes[i].style.backgroundColor==="purple")x++;
     }
     if(x==5)totalSum++;
     x = 0;
     for(let i = 4; i <= 20; i+=4){
        if(boxes[i].style.backgroundColor==="purple")x++;
     }
     if(x==5)totalSum++;


  return totalSum;
}




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }