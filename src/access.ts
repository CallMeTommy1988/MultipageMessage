/**
 * @file access.ts 访问抽象类
 * 
 * @author: tommy 
 * 
 * @created: 2018.6.2
 */

import { AccessOptions } from "./interface";
import listeners from "./listeners";
import factory from "./factory";

interface FactorysInterface {
    [key: string]: any;
}

abstract class Access extends listeners {

    static _factorys: FactorysInterface = {};

    static register(name: string, renderClass: any) {
        Access._factorys[name] = renderClass;
    }

    static getFactoryInstance(name: string, options: AccessOptions): Access {
        let func = Access._factorys[name];
        if (!func) {
            throw new Error(`Missing render : ${name}`);
        }

        return new func(options);
    }

    private buildId() {
        
    }

    protected static lv: number = -1;
    protected options: AccessOptions;
    protected id:string;
    constructor(options: AccessOptions) {

        super();

        //默认值
        if (options.now === undefined)
            options.now = true;

        this.options = options;

        //生成唯一id

        //初始化页面间通信
    }
}

export default Access;