

// setInterval。
// 1. 检查 store > message_time 时间是否超过 20s

// 2. 没有超过 20s -> 1.

// 3. 超过 20s. -> 4

// 4. 封装一个参数地址一个是 webscoket 和 ajax 应该是同一个地址，然后重新修改格式
// 5. 在方法内查看是否支持 webscoket
// 6. 支持webscoket -> 建立连接

// 检测是否支持 webscoket
// 检测

function pageMessage(url, interval, callback) {
    var data = "message_data";
    var time = "message_time";
    var maxInterval = 20;

    function calcSecond(startTime) {
        if (typeof startTime !== "number")
            return;
        return Math.abs((startTime - (new Date()).getTime())) / (1000)
    }

    function localStore() {
        if (!window.localStorage) {
            console.log('localStorage not support');
            return;
        }

        var s = window.localStorage;

        return {
            set: function (key, value) {
                try {
                    s.setItem(key, value);
                } catch (oException) {
                    if (oException.name == 'QuotaExceededError') {
                        console.log('Exceeding the local storage quota!');
                        localStorage.clear();
                        localStorage.setItem(key, value);
                    }
                }
            },
            remove: function (key) {
                s.removeItem(key);
            },
            clear: function () {
                s.clear();
            },
            size: function () {
                return s.length;
            },
            get: function (key) {
                return s.getItem();
            },
            event: function (func) {
                window.addEventListener("storage", func);
            }
        }
    }

    function connect(uri) {
        //check webscoket
        if(WebSocket) {
            return new function() {

                let ws = new WebSocket("ws://"+ uri +"/ws");

                ws.onmessage=function(e){  
                    //
                };  
                
                ws.onerror=function(err){  
                  console.log('_error');  
                  console.log(err);  
                };  

                ws.onopen=function(){  
                  console.log('webscoket _connect')  
                }; 

                ws.onclose=function(){  
                  console.log('webscoket _close');  
                };  

                return {
                    
                }
            }
        }
        else {
            //ajax
        }
    }

    var store = localStore();
    setTimeout(function () {

        var last_time, over_time;
        last_time = store.get(message_time)

        if (!last_time) {
            over_time = true;
        } else {
            //判断是否超过20s
            try {
                over_time = calcSecond(parseInt(last_time)) > maxInterval
            }
            catch (ex) {
                console.log(ex.message);
            }
        }

        if (over_time) {
            
        }
        else {
            //获取最新数据
            var data = store.get(data);
            callback(data);
        }

    }, 1000);

    return {
        stop: function () {

        }
    }
}

