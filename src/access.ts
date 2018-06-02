

import { AccessOptions } from "./interface";
import listeners from "./listeners";

abstract class access extends listeners {

    protected options: AccessOptions;
    constructor(options: AccessOptions) {
        
        super();

        //默认值
        if(options.now === undefined)
            options.now = true;   
        
        this.options = options;
    }
}

export default access;