/**
 * @file multiPage.ts 多页面
 
 * @author: tommy 
 * 
 * @created: 2018.6.2
 */


/*
msg_content
msg_last_time
*/

export abstract class multipage {

    static readonly msg_last_time = "msg_last_time";
    static readonly msg_content = "msg_content";
    static maxLength: number = 20;

    static init() {
        if (!localStorage)
            return;

        //调整长度
        let contents = this.getContent();
        if (contents.length > this.maxLength) {
            contents.slice(0, this.maxLength);
            this.setContent(contents);
        }

        //注册通知事件
    }

    static setContent(data: any[]) {
        try {
            localStorage.setItem(this.msg_content, JSON.stringify(data));
        }
        catch (ex) {
            console.log(ex.message);
        }
    }

    static getContent(): any[] {
        let content = localStorage.getItem(this.msg_content);
        try {
            return JSON.parse(content) as any[];
        }
        catch (ex) {
            console.log(ex.message);
        }
    }

    static lastTime(): number {
        try {
            let t = localStorage.getItem(this.msg_last_time);
            if (!t)
                return 0;

            return parseInt(t);
        }
        catch (ex) {
            console.log(ex.message);
        }
    }

}