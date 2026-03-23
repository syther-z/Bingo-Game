import { Const } from "../static/constants";

class TimeHanlder{
    #interval: (null|number) = null;
    #duration;
    #offset = 1000;
    constructor(duration: number){
        this.#duration = duration;
    }


    exec(callback: (args: number) => void){
        if(this.#interval) return;
        let counter = this.#duration;
        this.#interval = setInterval(() => {
            if(counter <= 0) {
                clearInterval(this.#interval!);
                this.#interval = null;
                return;
            }
            counter--;
            callback(counter);
        }, this.#offset);
    }

    isRunning(){
        return this.#interval !== null;
    }

    shutDown(){
        if(!this.isRunning()) return;
        clearInterval(this.#interval!);
        this.#interval = null;
    }

};


export default TimeHanlder;