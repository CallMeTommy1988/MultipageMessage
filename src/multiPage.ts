/**
 * @file multiPage.ts 多页面的抽象类
 *
 * @description 需要生成pageId以便和时间一起确认是否应该
 * 
 * @author: tommy 
 * 
 * @created: 2018.6.2
 */

import listeners from "./listeners";

export default abstract class Multipage extends listeners {

    constructor(options: { maxTimeInterval: number, dataMaxLength: number }) {
        super();
    }

    private _pageId: string;

    public get pageId() {
        return this._pageId;
    }

    public buildPageId() {
        if (this.needEable && !this._pageId) {
            this._pageId = ((new Date()).getTime() + Math.random()).toString();
        }

        if (this._pageId)
            this.setPageId(this._pageId);
    }

    protected setPageId(id: string) {
        throw new Error("setPageId no function");
    }

    public get needEable(): boolean {
        throw new Error("needEable no function");
    }

    public get content(): any[] {
        throw new Error("get content no function");
    }

    public set content(data: any[]) {
        throw new Error("set content no function");
    }

    public clearContent() {
        throw new Error("clearContent no function");
    }
}