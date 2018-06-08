/**
 * @file factory.ts 实例化
 * 
 * @author: tommy 
 * 
 * @created: 2018.6.8
 */


interface FactorysInterface {
    [key: string]: any;
}

export default class Factory {
    static _factorys: FactorysInterface = {};

    static register(name: string, renderClass: any) {
        Factory._factorys[name] = renderClass;
    }

    static getRenderInstance(name: string, options) {
        let func = Factory._factorys[name];
        if (!func) {
            throw new Error(`Missing render : ${name}`);
        }

        return new func(options);
    }
}