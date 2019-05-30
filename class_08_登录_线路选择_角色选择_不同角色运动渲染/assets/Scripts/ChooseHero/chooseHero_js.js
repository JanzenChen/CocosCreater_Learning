// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import LoginModel from 'LoginModel';

cc.Class({
    extends: cc.Component,

    properties: {
        chooseHero_left: {
            type : cc.Node,
            default : null,
        },
        chooseHero_right : {
            type : cc.Node,
            default : null,
        },
        severId : {
            type : cc.Integer,
            default : 0,
            visible:false,
        },
    },

    setSeverSelected(severId) {
        this.severId = severId;
        cc.log('33333 - ' + severId);
    },

    backAction(){
        cc.director.loadScene('ChooseSever');
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.log('111111');
    },

    start () {
        cc.log('4444444');

        var loginModel = new LoginModel(window.userInfo_hero.userId, window.userInfo_hero.userSign);

        cc.log(window.userInfo_hero.userId +' -- '+window.userInfo_hero.userSign + ' -- ' + this.severId);
        window.socket.emit('loginOnSever',{loginModel:loginModel,severId:this.severId});

        window.socket.on('loginOnSeverResult',(data)=>{
            if (1 != data.code) {
                Alert.show('获取角色列表失败!',null,false);
                return;
            }

            var heroLists = data.heroLists;

            if (0 != heroLists.length) {
                cc.log('null != heroLists');
                if (2 == heroLists.length) {
                    cc.log('2 == heroLists.length');
                    var hero_1 = heroLists[0];
                    if(null == this.chooseHero_left) return;
                    this.chooseHero_left.getComponent('heroInfo').setHeroInfo(hero_1);

                    if(null == this.chooseHero_right) return;
                    var hero_2 = heroLists[1];
                    this.chooseHero_right.getComponent('heroInfo').setHeroInfo(hero_2);
                } else if(1 == heroLists.length) {
                    cc.log('1 == heroLists.length');
                    var hero_1 = heroLists[0];
                    if(null == this.chooseHero_left) return;
                    this.chooseHero_left.getComponent('heroInfo').setHeroInfo(hero_1);
                }
            }

            Loading.hidden();
        });
    },

    // update (dt) {},
});
