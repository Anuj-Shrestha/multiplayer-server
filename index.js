var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let numberOfUsers = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('user connected');

  numberOfUsers++;

  io.emit('new user', `User ${numberOfUsers} has logged in`)
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
    numberOfUsers--;
  });
});