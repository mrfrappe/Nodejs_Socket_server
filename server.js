var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('files'))

var myNumber = Math.floor((Math.random() * 10000) + 1);
var stepCounter = 0

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

http.listen(3000, function() {
  console.log('listening on *:3000');
  console.log("Generated number: " + myNumber);
});

io.on('connection', function(socket) {
  socket.on('message', function(number) {
    stepCounter += 1;
    if (number > myNumber) {
      socket.emit('serverAns', number, "down");
      console.log("Number " + number + " is smaller");
    } else if (number < myNumber) {
      socket.emit('serverAns', number, "up");
      console.log("Number " + number + " is bigger")
    } else if (number == myNumber) {
      socket.emit('serverAns', number, "True");
      console.log("Number: " + number + " True")
      console.log(stepCounter);
    }
  });

});
