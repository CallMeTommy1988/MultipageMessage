var express = require('express');  
var app = express();  
var expressWs = require('express-ws')(app);  
var util = require('util');  
app.use(express.static('./static'));  
app.ws('/ws', function(ws, req) {  
  util.inspect(ws);  
  ws.on('message', function(msg) {  
    console.log('_message');  
    console.log(msg);  
    ws.send('echo:' + msg);  
  });  
})  

app.get('/',function(req,res) {
    res.send(`
    <html id="html" manifest="offlintab.appcache">
  <meta charset="utf-8">
  <title>新标签页</title>
  
  <body id="body">
    
  </body>
</html>

<script>
    let ws = new WebSocket("ws://localhost:3000/ws");

      ws.onmessage=function(e){  
        console.log('_message');  
        console.log(e.data);  
      };  
      ws.onerror=function(err){  
        console.log('_error');  
        console.log(err);  
      };  
      ws.onopen=function(){  
        console.log('_connect')  
      };  
      ws.onclose=function(){  
        console.log('_close');  
      };  

   setInterval(function() {
       ws.send(Date.now());
   },5000);
</script>

    `);
});

app.get('/ajax',function(req,res) {
    res.json(Date.now());
})

app.listen(3000); 