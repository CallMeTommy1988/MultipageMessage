/**
 * @file ajax.ts ajax的封裝.
 * 
 * @author: tommy 
 * 
 * @created: 2018.6.2
 */

import { ajaxOptions } from "./interface";

const defaultOptions: ajaxOptions = {
    success: () => { },
    error: () => { },
    method: "GET",
    url: "",
    async: true,
    data: {}
};

export function ajax(options: ajaxOptions) {

    options = {
        ...options,
        ...defaultOptions
    };

    let http = new XMLHttpRequest();

    let params = [];
    for (let key in options.data) {
        params.push(key + '=' + options.data[key]);
    }
    let postData = params.join('&');

    if (options.method.toUpperCase() === 'POST') {
        http.open(options.method, options.url, options.async);
        http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        http.send(postData);
    }
    else if (options.method.toUpperCase() === 'GET') {
        http.open(options.method, options.url + '?' + postData, options.async);
        http.send(null);
    }
    http.onreadystatechange = function () {

        if (http.readyState == 4) {
            var status = http.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(http.responseText, http.responseXML);
            } else {
                options.error && options.error(status);
            }
        }
    };
} 