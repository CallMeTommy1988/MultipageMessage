/**
 * @file index.ts 主体
 * 
 * @author: tommy 
 * 
 * @created: 2018.6.2
 */

import Device from "./device";
import { AjaxAccess } from "./ajaxAccess";
import { ScoketAccess } from "./scoketAccess";
import Access from "./access"
import { ICommunication, AccessUrlOptions } from "./interface";


Access.register("ajax", AjaxAccess);
Access.register("webscoket", ScoketAccess);

function lv(type: string) {
    switch (type) {
        case "ajax":
            return 5;
        case "scoket":
            return 9;
        default:
            return -1;
    }
}

export class tCommunication {


    static Device = new Device(window);

    constructor(options: ICommunication) {

        let currentUrl: AccessUrlOptions;
        for (let key in options.accessOptions) {
            let url = options.accessOptions[key];

            //浏览器支持
            if ((url.type == "ajax" && !tCommunication.Device.ajax) ||
                (url.type == "webscoket" && !tCommunication.Device.webscoket)) {
                return;
            }
            
            if (!currentUrl)
                currentUrl = url;
            else {
                if (lv(currentUrl.type) < lv(url.type))
                    currentUrl = url;
            }
        }

        let access = Access.getFactoryInstance(currentUrl.type, {
            url: currentUrl,
            now: options.now
        });

        if (tCommunication.Device.webscoket && options.accessOptions.url.) {

        }
        else if (tCommunication.Device.ajax && options.ajaxOptions.url) {
            new ajaxAccess({
                url: {
                    address: options.ajaxOptions.url,
                    type: RequestType.ajax,
                    method: options.ajaxOptions.method
                }
            }, {});
        }
        else {
            throw new Error(" init error. ");
        }

        f.addListener()
    }
}