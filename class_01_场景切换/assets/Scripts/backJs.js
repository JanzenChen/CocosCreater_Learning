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
        progressBar : {
            type : cc.ProgressBar,
            default : null,
        },
        testLabel : {
            type : cc.Label,
            default : null,
        },
        data:'Scene_02',
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.nowTime = 0;
        this.progressBar.progress = 0;
    },

    start () {
        this.testLabel.string = this.data;
        // 场景预加载
        cc.director.preloadScene('Scene_01',(completedCount, totalCount, item)=>{
            // this.progressBar.progress = parseFloat(completedCount/totalCount);
            // cc.log(parseFloat(completedCount/totalCount));
            // cc.log('预加载加载进度' + completedCount + '  ' + totalCount + '  ' + item);
        },(error,asset)=>{
            if (null === error) {
                cc.log('预加载加载完成' + error + '  ' + asset);
            } else {
                cc.log('预加载加载失败' + error + '  ' + asset);
            }
        });
    },

    backDefauultSecene () {
        // 切换场景
        cc.director.loadScene('Scene_01');
    },

    update (dt) {
        this.nowTime += dt;

        if (this.nowTime >= 0.5) {
            cc.log(this.progressBar,this.progressBar.progress);
            this.nowTime = 0;
            if (1 == this.progressBar.progress) return;
            var progress = this.progressBar.progress;
            progress = (progress + 0.05) > 1 ? 1 : (progress + 0.05);
            this.progressBar.progress = progress;
        }
    },
});
