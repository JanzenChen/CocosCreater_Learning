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
        heroSprite : {
            type : cc.Node,
            default : null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.isFlipX = false;
        this.isFlipY = false;
    },

    start () {

    },

    // 暂停动作
    pauseAllRunningActionsFunc(){
        var actionManager = cc.director.getActionManager();
        var nodeArr = actionManager.pauseAllRunningActions();

        cc.log(nodeArr);
    },
    // 恢复动作
    resumeTargetsFunc() {
        var actionManager = cc.director.getActionManager();
        actionManager.resumeTargets([this.heroSprite]);
    },

 /**
  * 即时动作
  *  */
    flipXAction () {
        //x轴翻转 -> cc.flipX()
        this.isFlipX = !this.isFlipX;
        this.heroSprite.runAction(cc.flipX(this.isFlipX));
    },

    flipYAction () {
        //x轴翻转 -> cc.flipY()
        this.isFlipY = !this.isFlipY;
        this.heroSprite.runAction(cc.flipY(this.isFlipY));
    },

    showAction () {
        //显示节点 -> cc.show()
        this.heroSprite.runAction(cc.show());
    },

    hideAction () {
        //隐藏节点 -> cc.hide()
        this.heroSprite.runAction(cc.hide());
    },

    toggleVisibilityAction() {
        //显隐状态切换 -> cc.toggleVisibility()
        this.heroSprite.runAction(cc.toggleVisibility()) 
    },

    placeAction () {
        // 放置在目标位置 -> cc.place()
        this.heroSprite.runAction(cc.place(Math.floor(Math.random() * 200),Math.floor(Math.random() * 200))) 
    },

    callFuncAction () {
        // 执行回调函数 -> cc.callFunc()
        this.heroSprite.runAction(cc.callFunc(this.callbackFunc,this,{a:'callFunc',b:' Action'}));
    },

    callbackFunc(caller,datas) {
        this.heroSprite.runAction(cc.repeat(cc.rotateBy(1,60),6));
        console.log(datas.a + datas.b);
    },  

    sequenceAction() {
        // 顺序动画 -> cc.sequence()

        let action_1 = cc.rotateTo(1,Math.floor(Math.random() * 360));
        let action_2 = cc.moveTo(0.5,cc.v2(Math.floor(Math.random() * 200),Math.floor(Math.random() * 200)));

        let actionArr = [action_1, action_2];

        this.heroSprite.runAction(cc.sequence(actionArr));
    },

    repeatAction() {
        // 重复动画 -> cc.rotateBy()
        //参数一 action 需要执行的动画
        //参数二 times  执行次数
        //cc.repeat(action,times);
        this.heroSprite.runAction(cc.repeat(cc.rotateBy(1,60),6));
    },

    spawnAction() {
        //并行动画,同步执行  -> cc.rotateBy()
        //参数一 tempArray 需要同时执行的一组动画
        let action1 = cc.rotateBy(1,90);
        let action2 = cc.scaleTo(1,1.5);
         //可以单独传
        //this.node.runAction(cc.spawn(action1,action2));
        //也可以扔一个数组
        //cc.spawn(tempArray);
        let actionsArray = [action1,action2];
        this.heroSprite.runAction(cc.spawn(actionsArray));
    },

    rotateToAction() {
        //绝对旋转
        //参数一 duration 持续时间
        //参数二 deltaAngleX X方向旋转角度 
        //tips: 旋转角度计算规律 最终角度angle为 angle = inputAngle%360>180?inputAngle%360-180:inputAngle%360
        //参数三 [deltaAngleY ] Y方向旋转角度 
        //cc.rotateTo(duration,deltaAngleX,[deltaAngleY ]);
        this.heroSprite.runAction(cc.rotateTo(1,180,50)); //一秒转到180度
    },

    rotateByAction() {
       //相对旋转
        //参数一 duration 持续时间
        //参数二 deltaAngleX X方向旋转角度 好像是顺时针
        //参数三 [deltaAngleY ] Y方向旋转角度 
        //cc.rotateBy(duration,deltaAngleX,[deltaAngleY ]);
        this.heroSprite.runAction(cc.rotateBy(1.0,90,20));
    },

    moveToAction() {
        //绝对移动
        //参数一 duration 持续时间
        //参数二 position cc.Vec2()类型 绝对目标位置
        //参数三 [y ] 绝对目标位置y值 
        //解释 也就是说可以用下面两种方式
        //cc.moveTo(duration,position,[y ])
        //this.node.runAction(cc.moveTo(cc.v2(150,150)));
        this.heroSprite.runAction(cc.moveTo(1,60,120));  //一秒内移到(50px,50px)的位置    
    },

    moveByAction() {
        //相对移动
        //参数一 duration 持续时间
        //参数二 position cc.Vec2()类型 相对目标位置
        //参数三 [y ] 相对目标位置y值 
        //解释 也就是说可以用下面两种方式
        //cc.moveBy(duration,position,[y ])
        //this.node.runAction(cc.moveBy(cc.v2(150,150)));
        this.heroSprite.runAction(cc.moveBy(1,30,40));
    },

    repeatForeverAction() {
        //无限重复动画
        //参数一 action 需要执行的动画
        //cc.repeatForever(action)
        this.heroSprite.runAction(cc.repeatForever(cc.rotateBy(1,60)));
    },

    

    // update (dt) {},
});
