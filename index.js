var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var util = require('util');

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static('./static'));
app.ws('/ws', function (ws, req) {
  util.inspect(ws);
  ws.on('message', function (msg) {

  });

  setInterval(() => {
    ws.send((new Date()).getTime());
  }, 10000);
});



app.get('/', function (req, res) {
  res.render("index", {});
});

app.get('/ajax', function (req, res) {
  res.json(Date.now());
})

app.listen(3000); 