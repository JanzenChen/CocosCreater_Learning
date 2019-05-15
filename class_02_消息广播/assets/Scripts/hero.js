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
        A: false, // 是否监听A
        B: false, // 是否监听B
        C: false, // ...
        D: false,
        E: false,
        F: false,
        G: false,
        H: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 绑定点击事件
        this.node.on(cc.Node.EventType.TOUCH_END,(event)=>{
            this.sayHello();
        });

        // 如果需要监听A
        if (this.A) {
            // 查找A节点对象
            var heroA = cc.find('Canvas/Bg/A');
            // 绑定监听
            heroA.on('sayHello',(event)=>{
                if (heroA.uuid === this.node.uuid) return;
                // 听到问候 - 做出响应
                this.hearHello();
            });
        }

        if (this.B) {
            var heroB = cc.find('Canvas/Bg/B');
            heroB.on('sayHello',(event)=>{
                if (heroB.uuid === this.node.uuid) return;
                // 听到问候 - 做出响应
                this.hearHello();
            });
        }

        if (this.C) {
            var heroC = cc.find('Canvas/Bg/C');
            heroC.on('sayHello',(event)=>{
                if (heroC.uuid === this.node.uuid) return;
                // 听到问候 - 做出响应
                this.hearHello();
            });
        }

        if (this.D) {
            var heroD = cc.find('Canvas/Bg/D');
            heroD.on('sayHello',(event)=>{
                if (heroD.uuid === this.node.uuid) return;
                // 听到问候 - 做出响应
                this.hearHello();
            });
        }

        if (this.E) {
            var heroE = cc.find('Canvas/Bg/E');
            heroE.on('sayHello',(event)=>{
                if (heroE.uuid === this.node.uuid) return;
                // 听到问候 - 做出响应
                this.hearHello();
            });
        }

        if (this.F) {
            var heroF = cc.find('Canvas/Bg/F');
            heroF.on('sayHello',(event)=>{
                if (heroF.uuid === this.node.uuid) return;
                // 听到问候 - 做出响应
                this.hearHello();
            });
        }

        if (this.G) {
            var heroG = cc.find('Canvas/Bg/G');
            heroG.on('sayHello',(event)=>{
                if (heroG.uuid === this.node.uuid) return;
                // 听到问候 - 做出响应
                this.hearHello();
            });
        }

        if (this.H) {
            var heroH = cc.find('Canvas/Bg/H');
            heroH.on('sayHello',(event)=>{
                if (heroH.uuid === this.node.uuid) return;
                // 听到问候 - 做出响应
                this.hearHello();
            });
        }
    },

    sayHello () {
        this.node.emit('sayHello');
    },
    
    hearHello () {
        // 旋转响应
        this.node.runAction(cc.rotateBy(0.5,360));
    },

    start () {

    },

    // update (dt) {},
});
