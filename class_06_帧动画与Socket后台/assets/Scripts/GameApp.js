import {
    request
} from "http";

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
        ServerState: {
            default: null,
            type: cc.Label,
        },
        background: {
            default: null,
            type: cc.Node,
        },
        myHero : {
            type : cc.Sprite,
            default : null,
        },
        otherHero: {
            default: null,
            type: cc.Prefab,
        },

        radio: 2,

        myID: 0,

        userList: [],
    },

    _drawUser(posX, posY, user) {
        var otherhero = cc.instantiate(this.otherHero);
        otherhero.getComponent('myOtherHero').setHeroName(user.userName);
        var otherHeroName = user.userName  + '_' + user.userId;
        this.background.addChild(otherhero, user.userId, otherHeroName);
        otherhero.setPosition(posX, posY);
    },

    checkPassword(userName,password,callback) {
        var User = require('user');
        var user = new User(userName, password);
        cc.log(userName + ' -22- ' + password);

        if (cc.sys.isNative) {
            window.io = SocketIO;
        } else {
            window.io = require('socket.io');
            // window.io = require('socket.io');
        }

        let socket = io('http://localhost:8000/');

        this.socket = socket;

        // 校验密码
        socket.emit('checkPassword', user);

        // 监听后台传来的校验密码结果
        socket.on('checkPasswordResult', (data)=>{
            // cc.log('data.code-' + data.code + ' ' + 'data.userId-' + data.userId + ' ' + 'data.userSign' + ' ' + data.userSign);
            if (0 == data.code) {
                if (callback) {
                    callback(0);
                }
                return;
            }

            if (callback) {

                cc.log('data.code-' + data.code + ' ' + 'data.userId-' + data.userId + ' ' + 'data.userSign' + ' ' + data.userSign);
                // 全局记录登录用户UI与登录sign
                window.userInfo_hero = {userId:data.userId,userSign:data.userSign};
                callback(1);
            }
        });
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        let self = this;

        var myUtil = require('myUtil');
        var util = new myUtil();

        let socket = this.socket;

        var LoginModel = require('loginModel');
        var loginModel = new LoginModel(window.userInfo_hero.userId, window.userInfo_hero.userSign);
        cc.log(loginModel.userId + ' ' + loginModel.userSign);
        // 登录请求
        socket.emit('login', loginModel);

        // 监听后台传来的登录结果
        socket.on('loginResult', function (data) {

            if (0 == data.code) {
                cc.log('登录失败');
                return;
            }

            self.myID = data.userId;
            self.userName = data.userName;

            self.ServerState.string = 'your ID: ' + data.userId;
            self.userList = data.userList; //获取原有用户列表
            self.myHero.getComponent('myHero').setHeroName(self.userName);
            cc.log(self.userList);
            if (0 == self.userList.length) return;
            for (var user of self.userList) { //画到背景
                if (null == user || user == undefined || user.userId == data.userId) continue;

                var pos = util.convertFrom45(cc.v2(user.curTileX, user.curTileY));
                cc.log('pos-->' + pos);
                self._drawUser(pos.x, pos.y, user);
            }
        });

        //begin-----------------新增处理-----------------------//

        socket.on('newUser', function (data) {
            self.ServerState.string = 'new user: ' + data.userId;
            self.userList.push(data); //加到列表
            self._drawUser(688, -504, data); //画到背景
        });

        //end-------------------新增处理-----------------------//

        //end-------------------离开处理-----------------------//

        socket.on('userLeave', function (data) {
            if (data.userId == self.myID) {
                cc.log('被挤出');
                return;
            }

            cc.log(data.userId + '?---?' + data.userName);
            if (null == data.userId || undefined == data.userId || null == data.userName || undefined == data.userName) return;
            self.ServerState.string = 'user leave: ' + data.userId;
            self.userList = data.userList;
            var otherHeroName = data.userName + '_' + data.userId;
            var target = self.background.getChildByName(otherHeroName);
            self.background.removeChild(target); //从背景移除
        });

        //end-------------------离开处理-----------------------//

        //begin-------------------移动发出处理-----------------------//

        var myGround = this.background.getComponent('myGround');
        var curTileX = myGround.curTileX;
        var curTileY = myGround.curTileY;
        self.node.on('myClick', (event) => {
            socket.emit('move', {
                userId: self.myID,
                userName:self.userName,
                curTileX: curTileX,
                curTileY: curTileY,
                newPos: util.convertTo45(event.detail),
            });
        });

        //end---------------------移动发出处理-----------------------//

        //begin-------------------移动收到处理-----------------------//

        socket.on('move', function (data) {

            var otherHeroName = data.userName + '_' + data.userId;
            var target = self.background.getChildByName(otherHeroName).getComponent('myOtherHero');
            var Path = util.convertToPath(data.newPos, data.curTileX, data.curTileY);
            var asc = [];

            target.path = Path;

            for (var dir of Path) {
                asc.push(cc.callFunc(target.toWalk, target));
                asc.push(cc.moveBy(
                    self.radio * ((dir.dx != 0) && (dir.dy != 0) ? 1.4 : 1) / 10,
                    (dir.dy + dir.dx) * 32,
                    (dir.dx - dir.dy) * 24
                ));
            }

            asc.push(cc.callFunc(target.toStand, target));

            target.node.runAction(cc.sequence(asc));
        });

    },

    start() {

    },

    update() {
        // cc.log('bg position -- ' + this.background.position);
        // 695,509 -> 12 40
    }
});