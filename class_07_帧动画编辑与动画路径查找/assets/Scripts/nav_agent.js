// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// import map_gen from 'map_gen';
var map_gen = require('map_gen');

cc.Class({
    extends: cc.Component,

    properties: {
        map : {
            type : map_gen,
            default : null,
        },
        speed:100,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.isWalk = false;
        this.map_data = this.map.get_road_set();// 获取路径数据
        this.index_1 = false;
        this.walk_on_index(this.index_1 ? 1 : 0);
    },

    walk_on_index(index) {
        if (index < 0 || index >= this.map_data.length) {
            return;
        }

        this.road_data = this.map_data[index];
        if (this.road_data.length < 2) {
            return;
        }

        this.node.setPosition(this.road_data[0]);

        cc.log('0-->' + this.road_data[0]);
        this.next_step = 1;
        this.walk_to_next();
    },

    walk_to_next () {
        if (this.next_step >= this.road_data.length) {
            this.index_1 = !this.index_1;
            this.is_walking = false;
            this.walk_on_index(this.index_1 ? 1 : 0);
            return;
        }

        var src = this.node.getPosition();// 当前点
        var dist = this.road_data[this.next_step]; // 下个点
        cc.log(this.next_step + '-->' + dist);
        var dir = dist.sub(src); // 两点向量
        var len = dir.mag();  // 两点距离
        if (len <= 0) {
            return;
        }

        this.total_time = len / this.speed;
        this.now_time = 0;

        this.vx = this.speed * dir.x/len; // x轴移动速度
        this.vy = this.speed * dir.y/len;// y轴移动速度
        this.isWalk = true;
    },

    update (dt) {
        if (false === this.isWalk) {
            return;
        }

        this.now_time += dt;

        if (this.now_time > this.total_time) {
            dt -= (this.now_time - this.total_time);
        }

        this.node.x += this.vx * dt;
        this.node.y += this.vy * dt;

        if (this.now_time >= this.total_time) {
            this.next_step++;
            this.walk_to_next();
        }
    },
});
