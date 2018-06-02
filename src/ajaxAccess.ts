
/**
 * @file access.ts 
 * 
 * @author: tommy 
 * 
 * @created: 2018.6.2
 */

import access from "./access";
import { AccessOptions, TimerOptions } from "./interface";
import { Timer } from "./timer";

export class ajaxAccess extends access {

    private t: Timer;
    constructor(accessOptions:AccessOptions,timerOptions:TimerOptions) {

        super(accessOptions);

        //ajax 特殊引入timer
        this.t = new Timer(timerOptions);
        this.t.addListener(this.timerhandler);
    }

    private timerhandler() {
        if(!this._listeners.length)
            return;
        

    }

    private data(): Promise<any>
    {
        return new Promise(null);
    }

}