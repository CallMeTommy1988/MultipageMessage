

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

    setTimeout(function () {

        var last_time,over_time;

        //调用store.
        //store结构
        //message_data
        //message_time
        last_time = store.get(time);

        if (!last_time) {
            over_time = true;
        } else {
            //判断是否超过20s
            
        }

        if(over_time) {
            
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

