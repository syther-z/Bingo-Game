import RemoteServer from "../service/RemoteServer";
import TimeHandler from "./TimeHandler";

type callbackType = (data ?: any) => void;
RemoteServer.connect();
const GameEvent = {
    SHOST: 's-host-game',
    RHOST: 'r-host-game',
    SJOIN: 's-join-game',
    RJOIN: 'r-join-game',
    SSTARTGAME: 's-start-game',
    RSTARTGAME: 'r-start-game',
    SMARKNUM: 's-mark-num',
    RMARKNUM: 'r-mark-num',
    RCURRENTTURN: 'r-current-turn',
    RWINNER: 'r-winner',
    RPLAYERJOIN: 'r-player-join',
    PLAYERCOUNT: 'player-count',
    STURNCHANGE: 's-turn-change',
    RTURNCHANGE: 'r-turn-change',
    SWINNER: 's-winner',
    RALERT: 'r-alert'
};

class GameHandler{
    #roomID: number = -1;
    #turn: number = -1;
    #currentTurn: number = -1;
    #name: (null|string) = null;
    #latency = 0;
    getName = () => {
        this.hydrateFromStorage();
        return this.#name;
    };
    getRoomID = () => this.#roomID;
    getTurn = () => this.#turn;
    getCurrentTurn = () => this.#currentTurn;

    hydrateFromStorage() {
        this.#name = localStorage.getItem('player-name') || `Player-${(Math.random() * 10000).toFixed(0)}`;
        localStorage.setItem('player-name', this.#name);
    }

    async hostGame(roomID: number){
        if(roomID < 100000) return false;
        this.#roomID = roomID;
        this.hydrateFromStorage();
        // const res = await RemoteServer.connect();
        RemoteServer.emit(GameEvent.SHOST, {
            roomID: this.getRoomID(),
            name: this.getName(),
            startTime: Date.now()
        });

        // RemoteServer.once(GameEvent.RHOST, data => {
            
        // });
    }


    async joinRoom(roomID: number, callback: any){
        if(roomID < 100000) return false;
        this.#roomID = roomID;
        
        try {
            this.hydrateFromStorage();
            // const res = await RemoteServer.connect();
            RemoteServer.emit(GameEvent.SJOIN, {
                roomID: this.getRoomID(),
                name: this.getName(),
                startTime: Date.now()
            });

            RemoteServer.on(GameEvent.RJOIN, data => {
                callback();
            });
        } catch (error) {
            console.log(error);
        }
    }

    startGame(){
        RemoteServer.emit(GameEvent.SSTARTGAME, {
            roomID: this.getRoomID()
        });
    }

    markNumber(num: number){
        if(num < 1 || num > 25) return false;
        if(this.getTurn() !== this.getCurrentTurn()) return false;
        RemoteServer.emit(GameEvent.SMARKNUM, {
            roomID: this.getRoomID(),
            num
        });
    }

    skipMyTurn(){
        RemoteServer.emit(GameEvent.STURNCHANGE, {
            roomID: this.getRoomID()
        });
    }

    iAmWinner(){
        return RemoteServer.emit(GameEvent.SWINNER, {
            roomID: this.getRoomID()
        });
    }

    // onTurnChange

    onMarkNumber(callback: callbackType){
        return RemoteServer.on(GameEvent.RMARKNUM, data => {
            const { currentTurn } = data;
            this.#currentTurn = currentTurn;
            callback(data);
        });
    }

    onStartGame(callback: callbackType){
        return RemoteServer.once(GameEvent.RSTARTGAME, data => {
            const { turn, currentTurn } = data;
            this.#turn = turn;
            this.#currentTurn = currentTurn;
            callback(data);
        });
    }

    onPlayerChange(callback: callbackType){
        RemoteServer.emit(GameEvent.PLAYERCOUNT, {
            roomID: this.getRoomID()
        });
        return RemoteServer.on(GameEvent.RPLAYERJOIN, data => {
            callback(data);
        });
    }

    onTurnChange(callback: callbackType){
        return RemoteServer.on(GameEvent.RTURNCHANGE, data => {
            const { currentTurn } = data;
            this.#currentTurn = currentTurn;
            callback(data);
        });
    }

    onWinnerChange(callback: callbackType){
        return RemoteServer.once(GameEvent.RWINNER, data => {
            callback(data);
        });
    }

    onAlertChange(callback: callbackType){
        return RemoteServer.on(GameEvent.RALERT, data => {
            callback(data);
        });
    }

    isMyTurn = () => this.getTurn() === this.getCurrentTurn();

}

export default new GameHandler();