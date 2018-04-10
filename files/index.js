window.onload = function() {

  var socket = io();
  var newHTML = "";
  var a = 1;
  var b = 10000;
  var isNumber = Math.floor((Math.random() * b) + a);
  var myUl = document.getElementById("messages");

  socket.emit('message', isNumber);

  socket.on('serverAns', (number, data) => {
    if (data == "True") {
      newHTML += '<li>' + number + ' True </li></br>';
    } else {
      if (data == "down") {
        if (b > number && number > a) {
          newHTML += '<li>Number ' + number + ' is to big </li></br>';
          b = number;
        };

        socket.emit('message', Math.floor((Math.random() * (b - a + 1)) + a));

      } else if (data == "up") {
        if (a < number && number < b) {
          newHTML += '<li>Number ' + number + ' is to small </li></br>';
          a = number;
        };

        socket.emit('message', Math.floor((Math.random() * (b - a + 1)) + a));

      };
    }

    myUl.innerHTML = newHTML;

  });

}
