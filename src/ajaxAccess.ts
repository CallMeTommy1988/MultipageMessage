
/**
 * @file access.ts 
 * 
 * @author: tommy 
 * 
 * @created: 2018.6.2
 */

import Access from "./access";
import { AccessOptions, TimerOptions, IResult } from "./interface";
import { Timer } from "./timer";
import { ajax } from "./ajax";
import { Result } from "./enums";

export class AjaxAccess extends Access {

    private t: Timer;
    
    constructor(accessOptions: AccessOptions, timerOptions: TimerOptions) {

        super(accessOptions);

        //ajax 特殊引入timer
        this.t = new Timer(timerOptions);
        this.t.addListener(this.timerhandler);
    }

    private timerhandler() {
        if (!this._listeners.length)
            return;

        //写入数据
        

        this.data().then((r: IResult) => {
            for (let listener of this._listeners) {
                listener(r);
            }
        });
    }

    private data(): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                url: this.options.url.address,
                method: this.options.url.method,
                data: this.options.url.data,
                success: (data) => {
                    resolve({
                        status: Result.success,
                        data: data
                    });
                },
                error: (err) => {
                    reject({
                        status: Result.error,
                        data: err
                    });
                }
            });
        });
    }
}