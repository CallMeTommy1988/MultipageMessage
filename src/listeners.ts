/**
 * @file listeners.ts 监听的抽象类
 
 * @author: tommy 
 * 
 * @created: 2018.6.2
 */



import { IListener } from "./interface";

export default abstract class listener implements IListener {

    constructor() {
        this._listeners = [];
    }

    protected _listeners : Function[];

    public addListener(func:Function) {
        if(func) {
            let i: number = this._listeners.indexOf(func);
            if(i == -1)
                this._listeners.push(func);
        }
    }

    public removeLinstener(func: Function) {
        if(func) {
            let i: number = this._listeners.indexOf(func);
            if(i > -1) {
                this._listeners.splice(i, 1);
            }
        }
    }
}