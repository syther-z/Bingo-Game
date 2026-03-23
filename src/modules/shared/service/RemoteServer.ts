import { io, Socket } from "socket.io-client";
import { Const } from '../static/constants';
// import { resolve } from "path";
class RemoteServer{
    #socket: Socket;
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
        return await new Promise((res, rej) => {
            this.#socket.connect();
            this.#socket.on("connect", () => {
                console.log("Connected to Server");
                res(0);
            });
            this.#socket.on("connect_error", rej);
        });
    }

    close(){
        if(!this.isConnected()) return null;
        console.log("Disconnected to Server");
        return this.#socket.disconnect();
    }

    isConnected = () => this.#socket.connected;
}

export default new RemoteServer(Const.connectionString);