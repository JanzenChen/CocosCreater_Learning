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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    sceneTransform:function(callback){
        let canvas = cc.find('Canvas');

        let action_1 = cc.rotateTo(1, 180).easing(cc.easeElasticInOut(1.0));
        let action_2 = cc.scaleTo(1, -1,0).easing(cc.easeElasticInOut(1.0));

        let action_1_2 = cc.spawn(action_1,action_2);
        let finish = cc.callFunc(()=>{
            if (null != callback) {
                callback();
            }
        });
        canvas.runAction(cc.sequence(action_1_2,finish));
    },
    
    toSimpleScene(){
        cc.director.preloadScene('simple-action',null,(error, assset)=>{
            if (null == error) {
                this.sceneTransform(()=>{
                    cc.director.loadScene('simple-action');
                });
            }
        });
    },
    
    toEasingScene(){
        cc.director.preloadScene('easing-action',null,(error, assset)=>{
            if (null == error) {
                this.sceneTransform(()=>{
                    cc.director.loadScene('easing-action');
                });
            }
        });
        // this.sceneTransform();
        // setTimeout(function() {cc.director.loadScene('easing-action');}, 500);
    },
    
    toSystemScene(){
        cc.director.preloadScene('sys-on-emit',null,(error, assset)=>{
            if (null == error) {
                this.sceneTransform(()=>{
                    cc.director.loadScene('sys-on-emit');
                });
            }
        });
        // this.sceneTransform();
        // setTimeout(function() {cc.director.loadScene('sys-on-emit');}, 500);
    },
    
    toCusScene(){
        cc.director.preloadScene('cus-on-emit',null,(error, assset)=>{
            if (null == error) {
                this.sceneTransform(()=>{
                    cc.director.loadScene('cus-on-emit');
                });
            }
        });
        // this.sceneTransform();
        // setTimeout(function() {cc.director.loadScene('cus-on-emit');}, 500);
    },

    start () {

    },

    // update (dt) {},
});
