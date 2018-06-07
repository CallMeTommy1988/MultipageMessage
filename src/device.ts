/**
 * @file device.ts 关于浏览器支持
 * 
 * @author: tommy 
 * 
 * @created: 2018.6.2
 */


export default class Device {

    public readonly ajax: boolean;
    public readonly webscoket: boolean;
    public readonly worker: boolean;

    constructor(global) {
        this.ajax = !!global.XMLHttpRequest;
        this.webscoket = !!global.WebSocket;
        this.worker = !!global.Worker;
    }
}