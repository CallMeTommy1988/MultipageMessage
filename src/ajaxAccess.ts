
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
import LocalStorageMultiPage from "./localStorageMultiPage"

export class AjaxAccess extends Access {

    private t: Timer;
    private m: LocalStorageMultiPage;

    constructor(accessOptions: AccessOptions, timerOptions: TimerOptions) {

        super(accessOptions);

        //初始化 timer
        this.t = new Timer(timerOptions);
        this.t.addListener(this.timerHandler.bind(this));

        //初始化 local 
        this.m = new LocalStorageMultiPage({
            maxTimeInterval: Timer.DefaultOptions.maxTime,
            dataMaxLength: 20
        });

        this.m.addListener(this.dataHandler.bind(this));
    }

    private dataHandler(data) {

        if (!this._listeners.length)
            return;

        for (let listener of this._listeners) {
            listener(data);
        }
    }

    private timerHandler() {
        if (!this._listeners.length)
            return;

        if (!this.m.needEable) {
            this.dataHandler(this.m.content);
            return;
        }
        
        this.m.buildPageId();
        this.data().then((r: IResult) => {
            for (let listener of this._listeners) {
                listener(r.data);
                this.m.content = (r.data instanceof Array) ? r.data : [r.data];
            }
        });
    }

    private data(): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                url: this.options.url.address,
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