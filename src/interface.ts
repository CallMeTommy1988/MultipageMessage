

import { RequestType } from "./enums";


/* -------------- option -------------- */
export interface TimerOptions {
    interval?: number;
    maxTime?: number;
    autoTime? : boolean;
    autoTimeInterval? : number;
}


export interface AccessOptions {
    url: AccessUrlOptions;
    now? : boolean;
}

export interface AccessUrlOptions {
    address:string;
    type:RequestType;
}

export interface Options extends TimerOptions {

}

/* -------------- communication -------------- */

export interface ICommunication {
    
}


/* -------------- common -------------- */

export interface IListener {
    addListener(func:Function);
    removeLinstener(func:Function);
}