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
        fore : {
            type : cc.Node, // 前置队员
            default : null,
        },
        numberLabel : {
            type : cc.Label,
            default : null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //自定义事件
        //自定义事件和系统事件不同的是
        //需要在代码中手动触发
        //其他的和系统事件没有区别
        //node.emit('eventName',message);
        //node.on('eventName',callBack,target);
        //callBack(event){
        //      (event.detail === message) //true!    
        //}

        if (this.fore) { // 如果前面有人
            // 监听来自前面的人的消息
            // this.fore.on('number_off_notic',this.doAction,this);
            //或者
            this.fore.on('number_off_notic',(event)=>{
                this.doAction(event);
            },this);
        }

        // this.node.on(cc.Node.EventType.TOUCH_END,()=>{
        //     this.numberOffAction(1);
        // });
        this.node.on(cc.Node.EventType.TOUCH_END,function(){
            this.numberOffAction(1);
        },this);
    },

    doAction (event) {
        // 开始动画
        // 缩放,简单动画,模式为easeBackOut
        let action_1 = cc.scaleTo(0.1,-1,0).easing(cc.easeBackOut());
        // 旋转,简单动画,模式为easeBackOut
        let action_2 = cc.rotateBy(0.1,360).easing(cc.easeBackOut());
        // 合并动画组
        let action_1_2 = cc.spawn(action_1,action_2);
        
        // 动画执行完成的回调
        let callNext = cc.callFunc(this.callNext,this,event);

        // 结束动画
        let action_3 = cc.scaleTo(0.1,1,1).easing(cc.easeBackOut());
        let action_4 = cc.rotateBy(0.1,-360).easing(cc.easeBackOut());
        let action_3_4 = cc.spawn(action_3,action_4);

        // 顺序执行,执行action_1_2完成后回调callNext并执行action_3_4
        this.node.runAction(cc.sequence(action_1_2,callNext,action_3_4));

    },

    numberOffAction (number) {
        // 向身后的人发送消息, 点击者从1开始报数
        this.node.emit('number_off_notic',number);
        //异步信息用 dispatchEvent

        // 点击者从1开始报数
        // this.node.getChildByName('numberLabel').getComponent(cc.Label).string = 1;
        //或者绑定属性引入
        this.numberLabel.string = number;
    },

    callNext (caller,event) {
        // 报数数字 + 1;
        this.numberOffAction((event + 1));
    },

    start () {

    },

    // update (dt) {},
});
