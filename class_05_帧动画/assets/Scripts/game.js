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
        hero : {
            type : cc.Node,
            default : null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN,(event)=>{
            var visibleSize = cc.winSize;

            var indexX = Math.floor(event.getLocationX() * 3 / visibleSize.width);
            var indexY = 2 - Math.floor(event.getLocationY() * 3 / visibleSize.height);

            var dir = indexX + indexY;

            if (1 == indexX && 1 == indexY) return;

            if (indexX < indexY) {
                dir = 8 - dir;
            }
            cc.log('---' + dir);
            this.hero.getComponent('myHero').changeDirection(dir);
        });
    },

    start () {

    },

    // update (dt) {},
});
