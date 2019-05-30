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
        hero_icon : {
            type : cc.Sprite,
            default : null,
        },
        nameLabel : {
            type : cc.Label,
            default : null,
        },
        levelLabel : {
            type : cc.Label,
            default : null,
        },
        loginCountLabel : {
            type : cc.Label,
            default : null,
        },
        jonLabel : {
            type : cc.Label,
            default : null,
        },
        heroAnimate : {
            type : cc.Sprite,
            default : null,
        },
        chooseBtn : {
            type : cc.Button,
            default : null,
        },
        chooseSpritFrame: {
            type : cc.SpriteFrame,
            default : null,
        },
        creatSpritFrame: {
            type : cc.SpriteFrame,
            default : null,
        },
    },

    setHeroInfo(heroInfo) {
        this.heroInfo = heroInfo;
        if (null == heroInfo || undefined == heroInfo) {
            this.refresh(false);
            return;
        }

        cc.log(heroInfo.severId + '--'
             + heroInfo.heroName + '--' 
             + heroInfo.heroLevel + '--' 
             + heroInfo.loginCount + '--'
             + heroInfo.job + '--'
             + heroInfo.heroIcon + '--'
             + heroInfo.heroClip);

        cc.loader.loadRes("image/chooseHero/head300", cc.SpriteAtlas, (err, atlas)=>{
            if (err) return;
            var frame = atlas.getSpriteFrame(heroInfo.heroIcon);
            this.hero_icon.spriteFrame = frame;
        });

        var animaClipName = "animation/" + heroInfo.heroClip;
        cc.loader.loadRes(animaClipName, (err, clip)=>{
            if (err) return;
            var heroAnimateCom = this.heroAnimate.getComponent(cc.Animation);
            // 添加帧动画
            heroAnimateCom.addClip(clip, heroInfo.heroClip);
            // 设置为默认帧动画
            heroAnimateCom.defaultClip =  clip;
            // 播放帧动画
            heroAnimateCom.play(heroInfo.heroClip);
        });

        this.nameLabel.string = heroInfo.heroName;
        this.levelLabel.string = heroInfo.heroLevel;
        this.loginCountLabel.string = heroInfo.loginCount;
        this.jonLabel.string = heroInfo.job;
        this.refresh(true);
    },

    refresh (hasData) {
        this.hero_icon.node.active = hasData;
        this.nameLabel.node.active = hasData;
        this.levelLabel.node.active = hasData;
        this.loginCountLabel.node.active = hasData;
        this.jonLabel.node.active = hasData;
        this.heroAnimate.node.active = hasData;
        var b_spriteFrame = hasData ? this.chooseSpritFrame : this.creatSpritFrame;
        this.chooseBtn.normalSprite = b_spriteFrame;
        this.chooseBtn.hoverSprite = b_spriteFrame;
        this.chooseBtn.pressedSprite = b_spriteFrame;
        this.chooseBtn.disabledSprite = b_spriteFrame;
        //getComponentInChildren 递归查找所有子节点中第一个匹配指定类型的组件。
        var label = this.chooseBtn.node.getComponentInChildren(cc.Label);
        label.string = !hasData ? '新建' : '选择';
    },

    chooseAction(){
        
        if (null != this.heroInfo) {
            var severId = this.heroInfo.severId;
            var heroId = this.heroInfo.heroId;

            cc.director.loadScene('GameScene',(err,scene)=>{

                cc.log('--->severId: ' + severId + ' - ' + heroId);

                if (err) {
                    Alert.show('场景加载失败!',null,false);
                    return;
                }
    
                let canvasNode = scene.getChildByName('Canvas');
                var loginOnModel = {
                    userId : window.userInfo_hero.userId,
                    severId : severId,
                    heroId : heroId,
                    userSign :  window.userInfo_hero.userSign,
                };
                canvasNode.getComponent('GameApp').loginHeroOnSever(loginOnModel);
            });
        } else {
            cc.log('新建英雄');
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.heroInfo = null;
        this.refresh(false);
    },

    start () {

    },

    // update (dt) {},
});
