

import { RequestType, Result } from "./enums";


/* -------------- option -------------- */
export interface TimerOptions {
    interval?: number;
    maxTime?: number;
    autoTime?: boolean;
    autoTimeInterval?: number;
}


export interface AccessOptions {
    url: AccessUrlOptions;
    now?: boolean;
}

export interface AccessUrlOptions {
    address: string;
    type: RequestType;
    method?: string;
    data?: {}
}

export interface ajaxOptions {
    method?: string;
    url?: string;
    async?: boolean;
    data?: {};
    success?: Function;
    error?: Function;
}

export interface webscoketOptions {
    url?: string;
    data?: {},
    success?: Function;
    error?: Function;
}

/* -------------- communication -------------- */

export interface ICommunication {
    ajaxOptions: ajaxOptions;
    webscoketOptions: webscoketOptions;
}


/* -------------- common -------------- */

export interface IListener {
    addListener(func: Function);
    removeLinstener(func: Function);
}

export interface IResult {
    status: Result;
    data: any
}