import { io, Socket } from "socket.io-client";
import { Const } from '../static/constants';
// import { resolve } from "path";
class RemoteServer{
    #socket: Socket;
    #latency = -1;
    #interval :ReturnType<typeof setInterval>|undefined;
    constructor(connectionString : string){
        this.#socket = io(connectionString, {
            autoConnect: false
        });
    }

    getID = () => this.#socket.id;

    emit(key : string, value : any){
        return this.#socket.emit(key, value);
    }

    on(key : string, callback : (...args: any[]) => void){
        this.#socket.on(key, callback);
        return () => {
            this.off(key, callback);
        }
    }

    off(key : string, callback ? : (...args: any[]) => void){
        return this.#socket.off(key, callback);
    }

    once(key : string, callback : (...args: any[]) => void){
        this.#socket.once(key, callback);

        return () => {
            this.off(key, callback);
        }
    }

    async connect(){
        if(this.isConnected()) return -1;
        clearInterval(this.#interval);
        return await new Promise((res, rej) => {
            try {
                this.#socket.connect();
            } catch (error) {
                // console.log(error);
            }
            this.#socket.on("connect", () => {
                console.log("Connected to Server");
                this.checkPing();
                this.#interval = setInterval(this.checkPing, 5000);
                res(0);
            });
            this.#socket.on("connect_error", rej);
        });
    }

    close(){
        if(!this.isConnected()) return null;
        console.log("Disconnected to Server");
        clearInterval(this.#interval);
        this.#latency = -1;
        return this.#socket.disconnect();
    }

    checkPing = () => {
        if(!this.isConnected()){
            this.#latency = -1;
            clearInterval(this.#interval);
            return;
        }
        let start = Date.now();
        this.#socket.emit('ping', start, () => {
                this.#latency = Date.now() - start;
            });
    }
    getPing = () => this.#latency;
    isConnected = () => this.#socket.connected;
}

export default new RemoteServer(Const.connectionString);