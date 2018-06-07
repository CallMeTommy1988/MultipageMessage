/**
 * @file index.ts 主体
 * 
 * @author: tommy 
 * 
 * @created: 2018.6.2
 */

import Device from "./device";
import { ajaxAccess } from "./ajaxAccess";
import { ICommunication } from "./interface";

export class tCommunication {


    static Device = new Device(window);

    constructor(options: ICommunication) {


        if (tCommunication.Device.webscoket && options.webscoketOptions.url) {

        }
        else if (tCommunication.Device.ajax && options.ajaxOptions.url) {
             //new ajaxAccess()
        }
        else {
            throw new Error(" init error. ");
        }
    }
}