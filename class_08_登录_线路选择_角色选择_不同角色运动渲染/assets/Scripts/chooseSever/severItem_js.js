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
        titleLabel:{
            type : cc.Label,
            default : null,
        },
        normalFrame: {
            type : cc.SpriteFrame,
            default : null,
        },
        selectedFrame: {
            type : cc.SpriteFrame,
            default : null,
        },
    },

    setSeverItemData(selectedIndex,data,callback) {
        this.titleLabel.string = data.severId + ' ' + data.severName;
        this.severId = data.severId;
        if (null != selectedIndex && selectedIndex == data.severId) {
            this.selected = true;
        } else {
            this.selected = false;
        }

        this.callback = callback;

        this.updateItemSelectedState(this.selected,false);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END,(event)=>{
            //更新样式
            this.updateItemSelectedState(!this.selected,true);
        });
    },

    updateItemSelectedState(selected,needCall){
        this.selected = selected;
        this.node.getComponent(cc.Sprite).spriteFrame = selected ? this.selectedFrame : this.normalFrame;
        if (this.callback && needCall) {
            this.callback(this.selected,this.node,this.severId);
        }
    },

    start () {

    },

    // update (dt) {},
});
