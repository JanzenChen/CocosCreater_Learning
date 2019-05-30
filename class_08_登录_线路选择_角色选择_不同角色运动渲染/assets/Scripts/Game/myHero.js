cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel:{
            type : cc.Label,
            default : null,
        },
        StandAnimName : '',
        WalkAnimName : '',
        curDir : '',
        

    },

    setHeroName (name) {
        this.nameLabel.string = name;
    },
    
    toStand (){
        this.getComponent(cc.Animation).play(this.StandAnimName + this.curDir);
    },
    
    toWalk (dir){
        //console.log(dir);
        if(dir == this.curDir) return;
        this.curDir = dir;
        cc.log('walkName->' + (this.WalkAnimName + dir));
        this.getComponent(cc.Animation).play(this.WalkAnimName + dir);
    },
    // use this for initialization
    onLoad () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
