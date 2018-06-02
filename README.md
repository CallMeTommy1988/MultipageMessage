# 多页面通信

### 目的

工作中需要一个消息通知的功能。
之前因为时间所限只能做了一个ajax轮询。 
打开多少页面就有多少轮询实在是有些烦人

现在有时间了，做一个基于 `websocket` + `ajax`。
如果能加上`webworker`然更好了.


### 思路

1. 参数
2. 判断浏览器支持情况
3. 实例化对应的方法。
4. 传入参数
5. 开始工作

### 1.参数

* address:  **ws**和 **http**
* type: ajax 或 webscoket
* now: `boolean` 默认`true`
* autoTime: `boolean` 否自动增加时间，比如第一次十秒，没有消息，第二次15s
* autoTimeIntInterval: **autoTime** 为 `true` 才能触发。单位**s**
* Interval: 间隔时间 单位**s**

### 2. 浏览器支持情况

**device** 需要判断的。
* websocket
* localstorage(必须)
* ajax(必须)
* webworker

返回一个对象。

### 3. ajax & webscoket 封装

### 4. localstorage || webworker


### 相关查询

**关于 instanceof**

instanceof判断一个对象是否是另一个对象的实例，而数字1是基本数据类型，不是对象，

```
1 instanceof Number //false
var a = new Number(1);
a instanceof Number // true
```

