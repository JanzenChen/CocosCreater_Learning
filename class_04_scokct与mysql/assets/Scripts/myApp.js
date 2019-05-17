import { request } from "http";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        label : {
            type : cc.Label,
            default : null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let self = this;

        if (cc.sys.isNative) {
            window.io = SocketIO;
        } else {
            request('socket.io');
            // window.io = request('socket.io');
        }

        var socket = io('http://localhost:8000/');

        var User = require('user');
        var user = new User('wxq520818','wxq5201314');

        // 登录请求
        socket.emit('login',user);

        // 监听后台传来的登录结果
        socket.on('loginResult',function(msg){
            self.label.string = msg;
        });
    },

    start () {

    },

    // update (dt) {},
});
