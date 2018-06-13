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

        try {
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

            let access = Access.getFactoryInstance(currentUrl.type,  {
                accessOptions: {
                    url: currentUrl,
                    now: options.now
                },
                timerOptions: {}
            });

            if (currentUrl.success)
                access.addListener(currentUrl.success);
        }
        catch (ex) {
            throw ex;
        }
    }
}
