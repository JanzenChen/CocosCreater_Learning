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
        isHero_A : false,
        isHero_B : false,
        hero_A: {
            type : cc.Node,
            default : null,
        },
        hero_B: { 
            type : cc.Node,
            default : null,
        },
        msgLabel : {
            type : cc.Label,
            default : null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (this.isHero_A) { // A - 鼠标事件
            // 鼠标点击
            this.hero_A.on(cc.Node.EventType.MOUSE_DOWN,this.eventMouseDownCallBack,this);

            // 鼠标进入 - 当鼠标移入目标节点区域时触发，不论是否按下
            this.hero_A.on(cc.Node.EventType.MOUSE_ENTER,this.eventMouseEnterCallBack,this);

            // 鼠标移动 - 当鼠标在目标节点在目标节点区域中移动时触发，不论是否按下
            this.hero_A.on(cc.Node.EventType.MOUSE_MOVE,this.eventMouseMoveCallBack,this);

            // 鼠标离开 - 当鼠标移出目标节点区域时触发，不论是否按下
            this.hero_A.on(cc.Node.EventType.MOUSE_LEAVE,this.eventMouseLeaveCallBack,this);

            // 鼠标抬起 - 当鼠标从按下状态松开时触发一次
            this.hero_A.on(cc.Node.EventType.MOUSE_UP,this.eventMouseUpCallBack,this);

            // 鼠标滚轮滚动	当鼠标滚轮滚动时触发
            this.hero_A.on(cc.Node.EventType.MOUSE_WHEEL,this.eventMouseWheelCallBack,this);

        } else if (this.isHero_B){ // B - 触摸事件

            // 开始点击 - 当手指触摸到屏幕时
            this.hero_B.on(cc.Node.EventType.TOUCH_START,this.eventTouchStartCallBack,this);

            // 触摸手指移动 - 当手指在屏幕上目标节点区域内移动时
            this.hero_B.on(cc.Node.EventType.TOUCH_MOVE,this.eventTouchMoveCallBack,this);

            // 结束触摸 - 当手指在目标节点区域内离开屏幕时
            this.hero_B.on(cc.Node.EventType.TOUCH_END,this.eventTouchEndCallBack,this);

            // 取消触摸 - 当手指在目标节点区域外离开屏幕时
            this.hero_B.on(cc.Node.EventType.TOUCH_CANCEL,this.eventTouchCancelCallBack,this);
        }
    },

    // eventTouchStartCallBack
    // eventTouchMoveCallBack
    // eventTouchEndCallBack
    // eventTouchCancelCallBack

    //鼠标类型事件回调
    //'mousedown'  当鼠标按下时触发一次
    eventMouseDownCallBack(event) {
        // cc.log(event);
        this.hero_A.runAction(cc.scaleTo(0.5, 0.6));//尺寸缩小为原来60%
        this.showEventInfo(event);
    },
    
    //鼠标类型事件回调
    //'mouseEnter'  当鼠标按下时触发一次
    eventMouseEnterCallBack(event) {
        // cc.log(event);
        this.hero_A.runAction(cc.rotateTo(0.5, 180));//旋转180度
        this.showEventInfo(event);
    },
    
    //鼠标类型事件回调
    //'mouseMove'  当鼠标按下时触发一次
    eventMouseMoveCallBack(event) {
        // cc.log(event);
        let action_1 = cc.rotateBy(0.5,10);
        let action_2 = cc.rotateBy(0.5,0,10);

        this.hero_A.runAction(cc.sequence([action_1,action_2]));//移动
        this.showEventInfo(event);
    },
        
    //鼠标类型事件回调
    //'mouseLeave'  当鼠标按下时触发一次
    eventMouseLeaveCallBack(event) {
        // cc.log(event);
        let action_1 = cc.scaleTo(0.5,1.2);
        let action_2 = cc.scaleTo(0.5,1.0);

        this.hero_A.runAction(cc.sequence([action_1,action_2]));//放大后缩小
        this.showEventInfo(event);
    },

    //鼠标类型事件回调
    //'mouseup'	   当鼠标从按下状态松开时触发一次
    eventMouseUpCallBack(event) {
                // cc.log(event);
        let action_1 = cc.scaleTo(0.5,0.6);
        let action_2 = cc.scaleTo(0.5,1.0);

        this.hero_A.runAction(cc.sequence([action_1,action_2]));//缩小后放大
        this.showEventInfo(event);
    },

    //鼠标类型事件回调
    //'mouseup'	   当鼠标从按下状态松开时触发一次
    eventMouseUpCallBack(event) {

        this.hero_A.runAction(cc.scaleTo(0.5,1.0));//还原大小
        this.showEventInfo(event);
    },

    //鼠标类型事件回调
    //'mousewheel'	   当鼠标从按下状态松开时触发一次
    eventMouseWheelCallBack(event) {
        // cc.log(event);
        this.hero_A.runAction(cc.scaleTo(0.2,event.getScrollY()/120));//获取滚动值来设置大小
        this.showEventInfo(event);
    },

    //触摸类型事件回调
    //'touchstart'	当手指触摸到屏幕时
    eventTouchStartCallBack(event) {

        // 记录当前位置
        this.hero_B_position = this.hero_B.position;

        let action_1 = cc.rotateTo(0.5,180);//旋转180度
        let action_2 = cc.scaleTo(0.5, 0.6);//尺寸缩小为原来80%
        this.hero_B.runAction(cc.sequence([action_1,action_2]));
        this.showEventInfo(event);
    },

    //触摸类型事件回调
    //'touchmove'	当手指在屏幕上目标节点区域内移动时
    eventTouchMoveCallBack(event) {

        cc.log('~~~~~' + this.hero_B.position);
        var location = event.touch.getLocationInView();
        var pos = this.hero_B.parent.convertToNodeSpaceAR(location);
        cc.log('======' + pos);
        
        let vec = pos.sub(this.hero_B_position); // 两点向量
        cc.log('=======' + vec.mag());
        if (vec.mag() <= 400) { // 向量长度
            this.hero_B.runAction(cc.place(cc.v2(pos.x,-pos.y)));
        }
        this.showEventInfo(event);
    },

    //触摸类型事件回调
    //'touchend'	当手指在目标节点区域内离开屏幕时
    eventTouchEndCallBack(event) {
        let action_1 = cc.rotateTo(0.5,180);//旋转180度
        let action_2 = cc.scaleTo(0.5, 1.0);//尺寸还原
        this.hero_B.runAction(cc.sequence([action_1,action_2]));
        this.showEventInfo(event);
    },

    //触摸类型事件回调
    //'touchcancel'	当手指在目标节点区域外离开屏幕时
    eventTouchCancelCallBack(event) {
        let action_1 = cc.rotateTo(0.5,180);//旋转180度
        let action_2 = cc.scaleTo(0.5, 1.5);//尺寸变大
        this.hero_B.runAction(cc.sequence([action_1,action_2]));
        this.showEventInfo(event);
    },

    //事件机制说明：
    //一句话,事件机制可以解决这种需求：某个条件达成才做某事
    //参数一：eventName 事件名 用于区别监听的事件类型
    //参数二: callback 回调函数 当事件名所描述的条件发生时，触发该函数
    //参数三：target 调用者， 指定调用该回调函数的调用者,通常是回调函数所处的这个对象(this),也可以动态指定别的对象来调用回调函数。
    //node.on('eventName',callback,target);
        
    showEventInfo (event) {
        let msg = null;
        if (this.isHero_A) {
            let type = event.type;
            let delta = event.getDelta();
            let deltaX = event.getDeltaX();
            let deltaY = event.getDeltaY();
            let location = event.getLocation();
            let locationX = event.getLocationX();
            let locationY = event.getLocationY();
            let locationInView = event.getLocationInView();
            let scrollX = event.getScrollX();
            let scrollY = event.getScrollY();
                
            //鼠标事件回调函数callback
            //参数一 event 事件触发时的现场信息
            //event.getDelta();  返回和上一次触发时鼠标位置的差值 返回值类型: cc.Vec2();  可以通过event.getDelta().x,event.getDelta().y获取
            //event.getDeltaX(); 返回和上一次触发时鼠标位置在X方向上的差值 返回值类型 Number 和上面一样
            //event.getDeltaY(); 返回和上一次触发时鼠标位置在Y方向上的差值 返回值类型 Number 和上面一样
            //event.getLocation(); 返回以当前节点的锚点为坐标原点的鼠标坐标 返回值类型: cc.Vec2(); 可以通过event.getLocation().x,event.getLocation().y获取
            //event.getLocationX(); 返回以当前节点的锚点为坐标原点在X方向上的鼠标坐标 返回值类型 Number 和上面一样
            //event.getLocationY(); 返回以当前节点的锚点为坐标原点在Y方向上的鼠标坐标 返回值类型 Number 和上面一样
            //event.getLocationInView(); 返回以手机屏幕左上(左下？)为坐标原点的鼠标坐标 返回值类型 cc.Vec2(); 可以通过event.getLocationInView().x,event.getLocationInView().y获取
            //event.getScrollX(); 用于'mousewheel'事件 获取鼠标滚轮滚动X差值？鼠标滚轮只能上下滚，也不知道这个怎么用 默认为0
            //event.getScrollY(); 用于'mousewheel'事件 获取鼠标滚轮滚动Y差值？我的鼠标上滚动值为120,下滚动值为-120
            
            msg = 'event.type: ' + type + '\n'
                + 'event.getDelta().x: '+ delta.x + '\n'
                + 'event.getDelta().y: '+ delta.y + '\n'
                + 'event.getDeltaX(): '+ deltaX + '\n'
                + 'event.getDeltaY(): '+ deltaY + '\n'
                + 'event.getLocation().x: '+ location.x + '\n'
                + 'event.getLocation().y: '+ location.y + '\n'
                + 'event.getLocationX(): '+ locationX + '\n'
                + 'event.getLocationY(): '+ locationY + '\n'
                + 'event.getLocationInView().x: '+ locationInView.x  + '\n'
                + 'event.getLocationInView().y: '+ locationInView.y  + '\n'
                + 'event.getScrollX(): '+ scrollX + '\n'
                + 'event.getScrollY(): '+ scrollY + '\n';
        } else if (this.isHero_B) {
            let type = event.type;
            let delta = event.touch.getDelta();
            let location = event.touch.getLocation();
            let locationX = event.touch.getLocationX();
            let locationY = event.touch.getLocationY();
            let locationInView = event.touch.getLocationInView();
            let previousLocation = event.touch.getPreviousLocation();
            let previousLocationInView = event.touch.getPreviousLocationInView();
            let startLocation = event.touch.getStartLocation();
            let startLocationInView = event.touch.getStartLocationInView();
                    
            // event.touch.getLocation 获取当前触点位置。
            // event.touch.getLocationX 获取当前触点 X 轴位置。
            // event.touch.getLocationY 获取当前触点 Y 轴位置。
            // event.touch.getPreviousLocation 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
            // event.touch.getStartLocation 获获取触点落下时的位置对象，对象包含 x 和 y 属性。
            // event.touch.getDelta 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
            // event.touch.getLocationInView 获取当前事件在游戏窗口内的坐标位置对象，对象包含 x 和 y 属性。
            // event.touch.getPreviousLocationInView 获取触点在上一次事件时在游戏窗口中的位置对象，对象包含 x 和 y 属性。
            // event.touch.getStartLocationInView 获取触点落下时在游戏窗口中的位置对象，对象包含 x 和 y 属性。
            // event.touch.getID 触点的标识 ID，可以用来在多点触摸中跟踪触点。

            msg = 'event.type: ' + type + '\n'
                    + 'event.touch.getDelta().x: '+ delta.x + '\n'
                    + 'event.touch.getDelta().y: '+ delta.y + '\n'
                    + 'event.touch.getLocation().x: '+ location.x + '\n'
                    + 'event.touch.getLocation().y: '+ location.y + '\n'
                    + 'event.touch.getLocationX(): '+ locationX + '\n'
                    + 'event.touch.getLocationY(): '+ locationY + '\n'
                    + 'event.touch.getLocationInView().x: '+ locationInView.x  + '\n'
                    + 'event.touch.getLocationInView().y: '+ locationInView.y  + '\n'
                    + 'event.touch.getPreviousLocation().x: '+ previousLocation.x  + '\n'
                    + 'event.touch.getPreviousLocation().y: '+ previousLocation.y  + '\n'
                    + 'event.touch.getPreviousLocationInView().x: '+ previousLocationInView.x  + '\n'
                    + 'event.touch.getPreviousLocationInView().y: '+ previousLocationInView.y  + '\n'
                    + 'event.touch.getStartLocation().x: '+ startLocation.x  + '\n'
                    + 'event.touch.getStartLocation().y: '+ startLocation.y  + '\n'
                    + 'event.touch.getStartLocationInView().x: '+ startLocationInView.x  + '\n'
                    + 'event.touch.getStartLocationInView().y: '+ startLocationInView.y  + '\n'
        }
                
        this.msgLabel.string = msg;
     },

    start () {

    },

    // update (dt) {},
});
