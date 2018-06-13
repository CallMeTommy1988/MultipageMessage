/**
* 
* @file localStorageMultiPage.ts 多页面通信 localstorage 版本
* 
* @author: tommy 
* 
* @created: 2018.6.9
*
*/

import Multipage from "./multiPage";

export default class LocalStorageMultiPage extends Multipage {

    static readonly msg_last_time = "msg_last_time";
    static readonly msg_content = "msg_content";
    static readonly msg_page_id = "msg_page_id";

    private maxTimeInterval: number = 30;
    private dataMaxLength: number = 20;

    constructor(options: { maxTimeInterval: number, dataMaxLength: number }) {
        super(options);

        //init
        if (!window.localStorage)
            throw new Error(" not support localstorage ");

        //注册事件
        window.addEventListener("storage", (data) => {
            if (!this._listeners.length)
                return;

            for (let f of this._listeners) {
                f(data.newValue);
            }
        });

        this.maxTimeInterval = options.maxTimeInterval;
        this.dataMaxLength = options.dataMaxLength;
    }

    public get needEable(): boolean {

        //lastTime && pageid

        let localPageId = window.localStorage.getItem(LocalStorageMultiPage.msg_page_id);
        let localLastTime = window.localStorage.getItem(LocalStorageMultiPage.msg_last_time);

        if (!localPageId || localPageId == this.pageId) return true;

        if (!localLastTime) return true;

        try {

            let localTimeSpan = parseInt(localLastTime);
            let s = ((new Date()).getTime() - localTimeSpan) / 1000;

            console.log(s);
            if (s > this.maxTimeInterval)
                return true;

        }
        catch (ex) {

            //出错，清空数据
            console.log(ex.message);
            console.log("localLastTime", localLastTime)
            console.log("localPageId", localPageId);

            window.localStorage.removeItem(LocalStorageMultiPage.msg_page_id);
            window.localStorage.removeItem(LocalStorageMultiPage.msg_last_time);

            throw ex;
        }

        return false;
    }

    protected setPageId(id: string) {
        window.localStorage.setItem(LocalStorageMultiPage.msg_page_id, id);
        window.localStorage.setItem(LocalStorageMultiPage.msg_last_time, (new Date()).getTime().toString());
    }

    public get content(): any[] {

        try {
            let contentString = window.localStorage.getItem(LocalStorageMultiPage.msg_content);
            if (contentString == null)
                return [];

            let contentArr = JSON.parse(contentString);
            return contentArr;
        }
        catch (ex) {
            console.log("content", window.localStorage.getItem(LocalStorageMultiPage.msg_content));
            window.localStorage.removeItem(LocalStorageMultiPage.msg_content);
            throw ex;
        }
    }

    public set content(data: any[]) {
        let contentArr = this.content;
        contentArr.push(...data);

        //最大不能超过max length
        if (contentArr.length > this.dataMaxLength) {
            contentArr.splice(0, contentArr.length - this.dataMaxLength)
        }

        let contentString = JSON.stringify(contentArr);
        window.localStorage.setItem(LocalStorageMultiPage.msg_content, contentString);
    }

    public clearContent() {
        window.localStorage.removeItem(LocalStorageMultiPage.msg_content);
        console.log("clear content");
    }

}
