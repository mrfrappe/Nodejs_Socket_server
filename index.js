var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var myNumber = Math.floor((Math.random() * 10000) + 1);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})
http.listen(3000, function() {
  console.log('listening on *:3000');
  console.log(myNumber);
});
io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    console.log('recive: ' + msg);
    if (msg > myNumber) {
      socket.emit('serverAns', msg, "down");
      console.log("number is lower");
    } else if (msg < myNumber) {
      socket.emit('serverAns', msg, "up");
      console.log("number is higher")
    } else if (msg == myNumber) {
      socket.emit('serverAns', msg, "True");
      console.log("True")
    }
  });
});
