document.body.onload = main;


var winningColor = "#280b42";

var mid_color = "rgb(168, 161, 230)";
var final_color = "rgb(32, 85, 4)";

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

function eye(){
// for(let i = 0; i < 100; i--){
//     await sleep(2000);
 
    let inc = isWinning();
    if(inc>0)
   words[inc-1].style.color = "wheat"; 
    if(inc>=5){
        socket.emit("gotWinner",myTurn);
        alert("You Won");
        location.reload();
    }
   var myttt =  document.getElementsByClassName("myttttt")[0];
    myttt.textContent = "Turn: 🔴";
// }

}

socket.on("winnnerAnn", mess=>{
    alert("Player Wons "+mess);
    location.reload();
})




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
        // if(boxes[i].innerHTML==="") return;
        // console.log(boxes[i].style.backgroundColor);
        if(boxes[i].style.backgroundColor!=="") return;

        boxes[i].style.backgroundColor = mid_color;
        let cc = (pairCode!=undefined) ? pairCode : pC;
        socket.emit("gameBox", [boxes[i].innerHTML, cc]);
        // boxes[i].innerHTML = "";
        eye();
    })
}


function getCode(){
let string = window.location.href;
let x = "";
for(let i = string.length-1; i>=0; i--){
    if(string[i]==='=') break;
     x = string[i]+x;
}
// console.log(x);
pairCode = parseInt(x);
}



socket.on("removeValue", val=>{
    // console.log("yes");
    for(let i = 0; i < boxes.length; i++){
        if(boxes[i].innerHTML===val){
            // boxes[i].innerHTML = "";
            if(boxes[i].style.backgroundColor=="")boxes[i].style.backgroundColor = mid_color;
            break;
        }
    }
    eye();
})


socket.on("turnChange", mess=>{
    roundTurn = mess;
    var myttt =  document.getElementsByClassName("myttttt")[0];
    myttt.textContent  = (myTurn==mess) ? "Turn: 🟢" : "Turn: 🔴";
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
            if(boxes[j].style.backgroundColor===mid_color || boxes[j].style.backgroundColor===final_color)sum++;
        }
        if(sum==5){ totalSum++;
            for(let j = i*5; j < ((i*5)+5); j++){
               boxes[j].style.backgroundColor=final_color;
            }
        }
    }


    for(let i = 0; i < 5; i++){
        let sum = 0;
        for(let j = i; j <= (i+20); j+=5){
            if(boxes[j].style.backgroundColor===mid_color || boxes[j].style.backgroundColor===final_color)sum++;
        }
        if(sum==5){ totalSum++;
            for(let j = i; j <= (i+20); j+=5){
                boxes[j].style.backgroundColor=final_color;
            }
        }
    }

     let x = 0;
     for(let i = 0; i < 25; i+=6){
        if(boxes[i].style.backgroundColor===mid_color || boxes[i].style.backgroundColor===final_color)x++;
     }
     if(x==5){totalSum++;
        for(let i = 0; i < 25; i+=6){
           boxes[i].style.backgroundColor=final_color;
         }
     }
     x = 0;
     for(let i = 4; i <= 20; i+=4){
        if(boxes[i].style.backgroundColor===mid_color || boxes[i].style.backgroundColor===final_color)x++;
     }
     if(x==5){totalSum++;
        for(let i = 4; i <= 20; i+=4){
            boxes[i].style.backgroundColor=final_color;
         }
     }


  return totalSum;
}




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }