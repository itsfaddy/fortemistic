var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketList = [];
var user_index=0;
var fs = require('fs');
var util = require('util');
var Twitterref = require("Twitter");

var Twitter = new Twitterref({
  consumer_key:'6uHk3BhJD9dWzyDmlCB6P8eoh',
  consumer_secret:'ErihmIJ7Xw7vaCbrwucK5F4QbDWtvbOevcDDF5TgxDlAL6edAg',
  access_token_key:'3420592594-QtJcqyidDTIxue7UQKnuEyTMyQ2GMCeJFN6XuMN',
  access_token_secret:'Krrpb6FyYXh2vsFRfjvUBwn96ARkRv7TUjwAZIWtkLj7L'
});

http.listen(3000,'127.0.0.1',function(){
  console.log("Listening to - http://127.0.0.1:3000");
  user_index=1;
});

app.get('/',function(req,res){
  console.log('GET '/' Request received!');
  io.on("connection",function(socket){
    console.log("+ Socket Connected");
    socket.on("disconnect",function(socket){
    console.log("- Socket Disconnected");
    });
    console.log('Twitter Stream initiating');
    Twitter.stream(
      'statuses/filter',
      {track:'india'},
      function(stream){
        stream.on("data",function(data,error){
          if(error) console.log("Error during streaming!");
          io.emit('chat message',data.text);
          console.log(data.text);
        });
        stream.on("error",function(error){
          console.log("Error in streaming",error);
          process.exit();
      }
    );
  });
});
  // res.send("<h1>Hello World!</h1>");
  res.sendFile(__dirname + '/index.html');
})
