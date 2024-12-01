const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const fs = require("path");
const server = http.createServer(app);
const io = new Server(server);
var socketList = [];    //stores all socket of players according to pair code
var pairCodeList = []; //multiple game handling via pairCode
app.use(express.static("public"));
var playerTurn = [];

io.on("connection", socket => {
    // console.log(socket.id);
    socket.on("leader", code => {
        socketList[code] = []; 
        playerTurn[code] = []; 
        socketList[code].push(socket);
        pairCodeList.push(code);
        playerTurn[code] = 1;
        socket.emit("noOfPlayer", socketList[code].length);
    })

})


io.on("connection", socket => {
    let x = false;
    let temp;
    socket.on("joincode", code => {
        x = pairCodeList.includes(parseInt(code));
        if (x) {
            socketList[parseInt(code)].push(socket);
            temp = parseInt(code);
            socketList[temp][0].emit("canStart", true);
            socket.emit("joinresponse", [x, socketList[parseInt(code)].length]);

            //player update
            for (let i = 0; i < socketList[parseInt(code)].length; i++) {
                socketList[parseInt(code)][i].emit("noOfPlayer", socketList[parseInt(code)].length);
            }

        }

    })


})



io.on("connection", socket => {
    socket.on("allStart", code => {
        for (let i = 0; i < socketList[code].length; i++) { //1 -> 0
            socketList[code][i].emit("metaRefresh", "flex");
        }
        socket.emit("turnChange", playerTurn[code]);
        socket.emit("startTimer", 1);
    })

   // runs to mark box checked and change the turn
    socket.on("gameBox", mess => {
        // console.log(mess);
        if (pairCodeList.includes(mess[1])) {
            playerTurn[mess[1]]++;
            if (playerTurn[mess[1]] > socketList[mess[1]].length) playerTurn[mess[1]] = 1;
            for (let i = 0; i < socketList[mess[1]].length; i++) {
                if(mess[0]!=undefined)socketList[mess[1]][i].emit("removeValue", mess[0]);
                socketList[mess[1]][i].emit("turnChange", playerTurn[mess[1]]);
                socketList[mess[1]][i].emit("startTimer", playerTurn[mess[1]]);
                // socketList[mess[1]][i].emit("startTimer", ((i+1)%socketList[mess[1]].length));
            }
            
        }
    })

})


//starting point of server
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
})


// app.get("/game", (req, res) => {
//     let temp = fs.join(__dirname, "/public/game.html");
//     res.sendFile(temp);
// })


server.listen(3000, () => {
    console.log("Port is Working");
})



function removeUser(list, idx) {
    for (let i = idx; i < list.length - 1; i++) {
        list[i] = list[i + 1];
    }
    list.pop();
}


io.on("connection", socket => {
    //checking for left users
    socket.on("disconnect", () => {
        for (let i = 0; i < pairCodeList.length; i++) {
            let x = pairCodeList[i];
            if (socketList[x].length == 0) {
                // delete socketList[x];
                //removing them
                removeUser(pairCodeList, i);
            }
            for (let j = 0; j < socketList[x].length; j++) {
                if (socketList[x][j] === socket) {
                    removeUser(socketList[x], j);
                    for (let k = 0; k < socketList[x].length; k++) {
                        socketList[x][k].emit("noOfPlayer", socketList[x].length);
                        if (k >= j)
                            socketList[x][k].emit("shiftTurn", -1);
                    }
                }
            }
        }
    })


    //received winner
    socket.on("gotWinner", winNumber => {
        for (let i = 0; i < pairCodeList.length; i++) {
            let num = pairCodeList[i];
            if (socketList[num].includes(socket)) {
                for (let j = 0; j < socketList[num].length; j++) {
                    if (socket != socketList[num][j])
                        socketList[num][j].emit("winnerAnnouncement", winNumber);
                }

                break;
            }
        }
    })

})

