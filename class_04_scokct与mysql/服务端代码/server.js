
// server.js

// 获取web框架构造方法
var express = require('express');

// 调用构造方法 app就是一个服务器
var app = express();

// 加载安装包
var http = require('http').Server(app);

// 装饰模式
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/publish'));

io.on('connection',function(socket) {
    console.log('a user connected');
    // socket.emit('connected','你连我干嘛');

    socket.on('login',function(user){
        var db_connect = require('db_connect');
        db_connect.login(user,socket);
    });
});

http.listen(8000,function(){
    console.log('listening on : 8000');
});


// var http = require("http");
 
// http.createServer(function(request, response) {
//   response.writeHead(200, {
//     "Content-Type" : "text/plain"
//   });
//   response.write("Welcome to Nodejs");
//   response.end();
// }).listen(8000, "127.0.0.1");
 
// console.log("Creat server on http://127.0.0.1:8000/");