/**
 * @file: timer.js 关于访问的计时器
 * @class timer
 *
 * @author: Tommy
 * @created: 2018-6-2
 */

 import { TimerOptions } from "./interface";
import listeners from "./listeners";



export class Timer extends listeners {

    static DefaultOptions: TimerOptions  = {
        autoTime: true,
        autoTimeInterval:3,
        interval:8,
        maxTime:60
    }

    private options: TimerOptions;
    private interval: number;
    private restartEnable: boolean = false;

    constructor(options: TimerOptions) {

        super();

        this.options = {
            ...Timer.DefaultOptions,
            ...options
        };

        this.interval = this.options.interval;
        setTimeout(this.timerHander, this.interval);
    }

    private timerHander() {
        if(!this._listeners.length)
        {
            setTimeout(this.timerHander, this.options.interval);
            return;
        }

        for(let func of this._listeners)  {
            func();
        }

        if(this.restartEnable) {
            this.interval = this.options.interval;
        }
        else if(this.options.autoTime) {
            this.interval += this.options.autoTimeInterval;
        }
        setTimeout(this.timerHander,this.interval);
    }   

    public restart() {
        this.restartEnable = true;
    }
}