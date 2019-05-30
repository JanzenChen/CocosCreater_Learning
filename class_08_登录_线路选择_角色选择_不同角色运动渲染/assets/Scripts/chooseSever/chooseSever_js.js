// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import LoginModel from 'loginModel';

cc.Class({
    extends: cc.Component,

    properties: {
        layout : {
            type : cc.Layout,
            default : null,
        },
        severItem : {
            type : cc.Prefab,
            default : null,
        },
        prePage : {
            type : cc.Button,
            default : null,
        },
        nextPage : {
            type : cc.Button,
            default : null,
        },
        commitBtn : {
            type : cc.Button,
            default : null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.prePage.node.active = false;
        this.nextPage.node.active = false;
        this.commitBtn.node.active = false;

        this.page = 0;

        var loginModel = new LoginModel(window.userInfo_hero.userId, window.userInfo_hero.userSign);
        window.socket.emit('severLists',loginModel);

        window.socket.on('severListsResult',(data)=>{
            if (1 != data.code) {
                Alert.show('获取服务器列表失败!',null,false);
                return;
            }

            // cc.log(data.severLists)
            this.severLists = data.severLists;

            if (0 != this.severLists) {
                this.updateSeverItems();
            }
        });
    },

    updateSeverItems () {
        if (null == this.layout) {
            return;
        }
        this.layout.node.removeAllChildren(true);

        for (let index = 0 ; index < 18; index++) {
            let newIndex = index + this.page * 18;
            if (newIndex >= this.severLists.length) {
                this.prePage.node.active = (0 != this.page);
                this.nextPage.node.active = false;
                return;
            }
            
            var severItem = cc.instantiate(this.severItem);
            var itemData = this.severLists[newIndex];
            if (null == itemData) {
                continue;
            }

            var callback = function(selected,item,severId){
                if (!selected) {
                    this.selectedItem = null;
                    this.severId = null;
                    this.commitBtn.node.active = false;
                    return;
                }

                if (this.selectedItem) {
                    this.selectedItem.getComponent('severItem_js').updateItemSelectedState(false,false);
                }

                this.selectedItem = item;
                this.severId = severId,

                this.commitBtn.node.active = true;
            }.bind(this);

            severItem.getComponent('severItem_js').setSeverItemData(this.severId,itemData,callback);

            this.layout.node.addChild(severItem);
        }

        this.prePage.node.active = (0 != this.page);
        cc.log(((this.page + 1) * 18));
        this.nextPage.node.active = (this.severLists.length > ((this.page + 1) * 18));
    },

    prePageAction() {
        --this.page;
        this.page = this.page < 0 ? 0 : this.page;
        
        this.updateSeverItems();
    },

    nextPageAction(){
        ++this.page;
        
        this.updateSeverItems();
    },

    commitAction(){
        cc.director.loadScene('ChooseHero',(err,scene)=>{
            if (err) {
                Alert.show('场景加载失败!',null,false);
                return;
            }

            let canvasNode = scene.getChildByName('Canvas');
            // cc.log('22222' + this.severId);
            canvasNode.getComponent('chooseHero_js').setSeverSelected(this.severId);

        });
    },

    start () {

    },

    // update (dt) {},
});
